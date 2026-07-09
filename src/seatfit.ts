/**
 * Auto-seating maths (docs/15): fit each vacuum map onto the shared floorplan
 * automatically, using the card's room rectangles as anchors.
 *
 * Anchor pairing is by NAME (card room key == the room name in the Roborock app ==
 * the integration's room name), so no manual clicking is needed. Each vacuum is
 * fitted INDEPENDENTLY against the floorplan — hand-drawn room differences between
 * robots don't matter, they just yield slightly different per-robot transforms and
 * show up in the residual.
 *
 * Unit convention: all fitting happens in "wrap units" where the floorplan wrap is
 * 1.0 wide and 1/AR tall (AR = wrap width/height). Map pixels are normalised by the
 * rendered map width NW, so the fitted scale is directly the CSS `width` fraction.
 */

export interface SeatParams {
  rotation: number;   // deg (snapped to 0/90/180/270)
  scale: number;      // % of wrap width
  offset_x: number;   // % (same semantics as MapConfig.offset_x)
  offset_y: number;   // %
}

export interface SeatFitResult extends SeatParams {
  /** RMS anchor error as % of wrap width — quality signal (lower is better). */
  residual_pct: number;
  /** Number of room anchors used. 1 = orientation estimated from a single bbox. */
  anchors: number;
  /** Unsnapped fitted angle (deg) — for debugging non-axis-aligned floorplans. */
  raw_rotation: number;
}

export interface SeatAnchor {
  /** Map point in NW-normalised units, origin at map centre. */
  q: { x: number; y: number };
  /** Floorplan point in wrap units (x: pct/100, y: pct/100/AR). */
  a: { x: number; y: number };
  /** Optional matched sizes (same units) for the 1-anchor scale/orientation guess. */
  sizeQ?: { w: number; h: number };
  sizeA?: { w: number; h: number };
}

// ── Geometry helpers (kontrakt v2: the integration publishes px, no mm here) ──

/** Rendered map pixel dimensions (rotation-aware) from the sensor's image_dims. */
export function mapPxDims(dims: any): { NW: number; NH: number } | null {
  if (!dims) return null;
  const sc = dims.scale ?? 1;
  let NW = (dims.width ?? 0) * sc;
  let NH = (dims.height ?? 0) * sc;
  const rot = dims.rotation ?? 0;
  if (rot === 90 || rot === 270) { const t = NW; NW = NH; NH = t; }
  return NW > 0 && NH > 0 ? { NW, NH } : null;
}

// ── Anchor assembly ───────────────────────────────────────────────────────────

interface CardRoomLike {
  key: string;
  name?: string;
  map_x: number;
  map_y: number;
  map_w?: number;
  map_h?: number;
}

/**
 * Build fit anchors by pairing the card's floorplan rooms with the integration
 * sensor's room bboxes. Kontrakt v2: bboxes come pre-transformed in rendered-map
 * pixels (`rooms[].bbox_px`, integration ≥ 0.18) — the card does no mm math.
 */
export function assembleAnchors(
  cardRooms: CardRoomLike[],
  at: Record<string, any> | undefined,
  ar: number,
): SeatAnchor[] {
  if (!at) return [];
  const dims = mapPxDims(at.image_dims);
  const intRooms: Array<Record<string, any>> = Array.isArray(at.rooms) ? at.rooms : [];
  if (!dims || !intRooms.length) return [];
  const { NW, NH } = dims;
  const out: SeatAnchor[] = [];
  for (const cr of cardRooms) {
    if (cr.map_x == null || cr.map_y == null) continue;
    const ir = intRooms.find((r) => r.name === cr.key) ?? intRooms.find((r) => r.name === cr.name);
    const bp = ir?.bbox_px as { x0: number; y0: number; x1: number; y1: number } | undefined | null;
    if (!bp || [bp.x0, bp.y0, bp.x1, bp.y1].some((v) => v == null)) continue;
    const cxPx = (bp.x0 + bp.x1) / 2;
    const cyPx = (bp.y0 + bp.y1) / 2;
    const anchor: SeatAnchor = {
      q: { x: (cxPx - NW / 2) / NW, y: (cyPx - NH / 2) / NW },
      a: { x: cr.map_x / 100, y: cr.map_y / 100 / ar },
    };
    if (cr.map_w != null && cr.map_h != null && cr.map_w > 0 && cr.map_h > 0) {
      anchor.sizeQ = { w: (bp.x1 - bp.x0) / NW, h: (bp.y1 - bp.y0) / NW };
      anchor.sizeA = { w: cr.map_w / 100, h: cr.map_h / 100 / ar };
    }
    out.push(anchor);
  }
  return out;
}

// ── The fit ───────────────────────────────────────────────────────────────────

const RAD = Math.PI / 180;

function seatFromFrame(
  theta: number, s: number, c: { x: number; y: number },
  ar: number, residual: number, n: number, rawTheta: number,
): SeatFitResult {
  let rot = Math.round(theta / RAD) % 360;
  if (rot < 0) rot += 360;
  return {
    rotation: rot,
    scale: s * 100,
    offset_x: c.x * 100 - 50,
    offset_y: c.y * ar * 100 - 50,
    residual_pct: residual * 100,
    anchors: n,
    raw_rotation: Math.round((rawTheta / RAD) * 10) / 10,
  };
}

/**
 * Least-squares similarity fit (rotation snapped to 90° steps) mapping map anchors
 * onto floorplan anchors. Returns null when the anchors cannot determine a seat.
 */
export function computeSeatFit(anchors: SeatAnchor[], ar: number): SeatFitResult | null {
  if (!anchors.length || !(ar > 0)) return null;

  if (anchors.length >= 2) {
    const n = anchors.length;
    const qm = { x: 0, y: 0 }, am = { x: 0, y: 0 };
    for (const p of anchors) { qm.x += p.q.x; qm.y += p.q.y; am.x += p.a.x; am.y += p.a.y; }
    qm.x /= n; qm.y /= n; am.x /= n; am.y /= n;
    let numCos = 0, numSin = 0, denom = 0;
    for (const p of anchors) {
      const dqx = p.q.x - qm.x, dqy = p.q.y - qm.y;
      const dax = p.a.x - am.x, day = p.a.y - am.y;
      numCos += dqx * dax + dqy * day;
      numSin += dqx * day - dqy * dax;
      denom += dqx * dqx + dqy * dqy;
    }
    if (denom > 1e-8) {
      const rawTheta = Math.atan2(numSin, numCos);
      // Snap to the nearest 90° (Roborock maps and floorplans are axis-aligned),
      // then refit scale + translation with the snapped rotation.
      const theta = Math.round(rawTheta / (Math.PI / 2)) * (Math.PI / 2);
      const cos = Math.cos(theta), sin = Math.sin(theta);
      let num = 0;
      for (const p of anchors) {
        const dqx = p.q.x - qm.x, dqy = p.q.y - qm.y;
        const rx = cos * dqx - sin * dqy, ry = sin * dqx + cos * dqy;
        num += rx * (p.a.x - am.x) + ry * (p.a.y - am.y);
      }
      const s = num / denom;
      if (s > 1e-4) {
        const c = { x: am.x - s * (cos * qm.x - sin * qm.y), y: am.y - s * (sin * qm.x + cos * qm.y) };
        let err = 0;
        for (const p of anchors) {
          const rx = c.x + s * (cos * p.q.x - sin * p.q.y) - p.a.x;
          const ry = c.y + s * (sin * p.q.x + cos * p.q.y) - p.a.y;
          err += rx * rx + ry * ry;
        }
        return seatFromFrame(theta, s, c, ar, Math.sqrt(err / n), n, rawTheta);
      }
    }
    // Degenerate spread (coincident centres) → fall through to the 1-anchor path.
  }

  // Single usable anchor: translation from centres, scale from bbox↔rect sizes,
  // orientation by testing the four axis-aligned rotations for best size agreement.
  const p = anchors.find((x) => x.sizeQ && x.sizeA) ?? null;
  if (!p || !p.sizeQ || !p.sizeA || p.sizeQ.w < 1e-6 || p.sizeQ.h < 1e-6) return null;
  let best: { theta: number; s: number; mism: number } | null = null;
  for (const k of [0, 1, 2, 3]) {
    const theta = k * (Math.PI / 2);
    const w = k % 2 === 0 ? p.sizeQ.w : p.sizeQ.h;
    const h = k % 2 === 0 ? p.sizeQ.h : p.sizeQ.w;
    const sw = p.sizeA.w / w, sh = p.sizeA.h / h;
    if (!(sw > 0) || !(sh > 0)) continue;
    const s = Math.sqrt(sw * sh);
    const mism = Math.abs(Math.log(sw / sh));
    if (!best || mism < best.mism - 1e-9) best = { theta, s, mism };
  }
  if (!best) return null;
  const cos = Math.cos(best.theta), sin = Math.sin(best.theta);
  const c = {
    x: p.a.x - best.s * (cos * p.q.x - sin * p.q.y),
    y: p.a.y - best.s * (sin * p.q.x + cos * p.q.y),
  };
  return seatFromFrame(best.theta, best.s, c, ar, 0, 1, best.theta);
}

// ── Forward transform (room import) ──────────────────────────────────────────

/**
 * Transform an integration room bbox (rendered-map px, `bbox_px`) into floorplan
 * rectangle percentages, given a seat (auto-fitted or manual) — used by the
 * editor's room import.
 */
export function roomBboxToRect(
  ir: Record<string, any>,
  at: Record<string, any>,
  seat: SeatParams,
  ar: number,
): { map_x: number; map_y: number; map_w: number; map_h: number } | null {
  const dims = mapPxDims(at?.image_dims);
  const bp = ir?.bbox_px as { x0: number; y0: number; x1: number; y1: number } | undefined | null;
  if (!dims || !bp || [bp.x0, bp.y0, bp.x1, bp.y1].some((v) => v == null)) return null;
  const { NW, NH } = dims;
  const q = { x: ((bp.x0 + bp.x1) / 2 - NW / 2) / NW, y: ((bp.y0 + bp.y1) / 2 - NH / 2) / NW };
  let w = (bp.x1 - bp.x0) / NW;
  let h = (bp.y1 - bp.y0) / NW;
  const s = seat.scale / 100;
  const theta = seat.rotation * RAD;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const c = { x: (50 + seat.offset_x) / 100, y: (50 + seat.offset_y) / 100 / ar };
  const u = { x: c.x + s * (cos * q.x - sin * q.y), y: c.y + s * (sin * q.x + cos * q.y) };
  const rot90 = Math.round(seat.rotation / 90) % 2 !== 0;
  if (rot90) { const tmp = w; w = h; h = tmp; }
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  return {
    map_x: clamp(Math.round(u.x * 1000) / 10, 0, 100),
    map_y: clamp(Math.round(u.y * ar * 1000) / 10, 0, 100),
    map_w: clamp(Math.round(s * w * 1000) / 10, 2, 100),
    map_h: clamp(Math.round(s * h * ar * 1000) / 10, 2, 100),
  };
}
