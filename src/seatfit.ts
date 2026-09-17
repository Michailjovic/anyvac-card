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
  /** Independent Y-axis scale (manual-only override; same "% of wrap width"
   *  unit as `scale`). Undefined = isotropic (use `scale` for both axes) —
   *  auto-fit (`computeSeatFit`) never sets this, it only ever solves a
   *  uniform similarity transform. Applied in LOCAL space, before `rotation`
   *  (see `seatProjectPct`). */
  scaleY?: number;
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
  map_x?: number;
  map_y?: number;
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

// ── Shared seat resolution (card + editor) ───────────────────────────────────

/** Minimal shapes needed to resolve a seat — deliberately structural rather than
 *  importing the full config types, so `seatfit.ts` stays dependency-free. */
interface SeatVacuumLike {
  map?: { seat?: string; rotation?: number; scale?: number; scale_y?: number; offset_x?: number; offset_y?: number };
  image_base?: { src?: string; crop_box?: CropBoxLike };
  rooms?: CardRoomLike[];
}
interface SeatConfigLike {
  map_mode?: string;
  image_base?: { src?: string; crop_box?: CropBoxLike };
  rooms?: CardRoomLike[];
  vacuums?: SeatVacuumLike[];
}

export type ResolvedSeat = SeatParams & {
  auto: boolean;
  residual?: number;
  anchorCount?: number;
};

/** Which floorplan image a vacuum is seated against.
 *
 *  Merged mode prefers the card-level `image_base`, then falls back to the first
 *  vacuum that has one — that fallback covers pre-docs/08 configs where the
 *  floorplan still lives on a vacuum. Split mode uses the vacuum's own. */
export function resolveImageBaseSrc(
  config: SeatConfigLike, vac: SeatVacuumLike | undefined,
): string | undefined {
  const merged = config.map_mode === "merged";
  const ib = merged
    ? (config.image_base ?? (config.vacuums ?? []).find((v) => v.image_base?.src)?.image_base)
    : vac?.image_base;
  return ib?.src;
}

/** The config-authored rooms that act as fit anchors: card-level `rooms` when
 *  the merged config defines them, else the vacuum's own. Never the live
 *  integration view — those un-pinned rooms are computed FROM the fit, so
 *  feeding them back in would be circular (docs/20 §5). */
export function resolveStaticRooms(
  config: SeatConfigLike, vac: SeatVacuumLike | undefined,
): CardRoomLike[] {
  return (config.rooms?.length ? config.rooms : vac?.rooms) ?? [];
}

/**
 * Effective map seating: auto-fitted from room anchors (rooms drawn on the
 * floorplan, matched by name against the integration's room bboxes) when
 * possible, else the manual slider values. Recomputed from live attributes, so
 * it self-heals when the robot remaps or the map trim changes.
 *
 * Shared by the card and the editor since 1.1.0. They had grown two independent
 * copies that had quietly diverged in both inputs: the editor had no
 * first-vacuum `image_base` fallback (so a merged config with the floorplan on a
 * vacuum auto-seated at runtime but fell back to manual in the editor preview),
 * and it picked anchors by `map_mode` while the card picked them by whether
 * card-level `rooms` were defined (so a split config with card-level rooms
 * disagreed the other way). Either way the editor showed the user a different
 * placement than the card would actually render — during the one workflow, room
 * anchoring, where the preview is the whole point.
 *
 * `attrs` must already be schema-gated by the caller (the card gates via
 * `_intAttrs`, the editor checks `schema_version` itself).
 */
export function resolveSeat(
  config: SeatConfigLike,
  vac: SeatVacuumLike | undefined,
  attrs: Record<string, any> | undefined,
  ar: number,
): ResolvedSeat {
  const m = vac?.map;
  const manual: ResolvedSeat = {
    rotation: m?.rotation ?? 0, scale: m?.scale ?? 100, scaleY: m?.scale_y,
    offset_x: m?.offset_x ?? 0, offset_y: m?.offset_y ?? 0, auto: false,
  };
  if (!vac || m?.seat === "manual") return manual;
  // Auto-seating only means anything against a floorplan reference; a map-only
  // base IS the reference, so it keeps its manual (default) seat.
  if (!resolveImageBaseSrc(config, vac)) return manual;
  if (!attrs) return manual;
  const fit = computeSeatFit(assembleAnchors(resolveStaticRooms(config, vac), attrs, ar), ar);
  if (!fit) return manual;
  return {
    rotation: fit.rotation, scale: fit.scale,
    offset_x: fit.offset_x, offset_y: fit.offset_y,
    auto: true, residual: fit.residual_pct, anchorCount: fit.anchors,
  };
}

// ── Forward transform (room import) ──────────────────────────────────────────

/**
 * Transform an integration room bbox (rendered-map px, `bbox_px`) into floorplan
 * rectangle percentages, given a seat (auto-fitted or manual) — used by the
 * editor's room import.
 */
/**
 * Place a room bbox onto a KNOWN crop of the same image (docs/30 §8) — used
 * right after `anyvac.snapshot_map_as_floorplan`, whose response includes
 * the exact (px) crop box it applied. Unlike `roomBboxToRect` this needs no
 * seat/rotation/AR at all: the saved floorplan file IS that crop, displayed
 * un-rotated, so a room's position within it is a plain re-normalisation of
 * `bbox_px` by the crop's own origin and size — no fit, no anchors, no
 * ambiguity. Only valid for the SAME vacuum the floorplan was snapshotted
 * from; other vacuums have unrelated coordinate systems and still need the
 * existing anchor-based auto-fit (`assembleAnchors`/`computeSeatFit`).
 */
export function placeRoomInCrop(
  bp: { x0: number; y0: number; x1: number; y1: number },
  crop: { x0: number; y0: number; x1: number; y1: number },
): { map_x: number; map_y: number; map_w: number; map_h: number } | null {
  const cropW = crop.x1 - crop.x0;
  const cropH = crop.y1 - crop.y0;
  if (!(cropW > 0) || !(cropH > 0)) return null;
  const cx = (bp.x0 + bp.x1) / 2 - crop.x0;
  const cy = (bp.y0 + bp.y1) / 2 - crop.y0;
  const w = bp.x1 - bp.x0;
  const h = bp.y1 - bp.y0;
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  return {
    map_x: clamp(Math.round((cx / cropW) * 1000) / 10, 0, 100),
    map_y: clamp(Math.round((cy / cropH) * 1000) / 10, 0, 100),
    map_w: clamp(Math.round((w / cropW) * 1000) / 10, 2, 100),
    map_h: clamp(Math.round((h / cropH) * 1000) / 10, 2, 100),
  };
}

/** Minimal room-config shape `placeRoomsInCrop` needs: a `key` to match
 *  against the integration's room names, plus an index signature so every
 *  other card-authored field (icon, thresholds, clean-time overrides, …) on
 *  an EXISTING room passes through untouched — this function only ever
 *  touches `map_x/y/w/h` on a matched room, never anything else. Structural
 *  like the rest of this file's types, so `RoomConfig` from `types.ts`
 *  satisfies it without either file importing the other. */
export interface RoomConfigLike {
  key: string;
  name?: string;
  [extra: string]: unknown;
}

/**
 * Place every room of `intRooms` (the integration's live room list) onto a
 * known crop of the floorplan file (docs/30 §8 / docs/38 §4.2) — the same
 * calculation as `placeRoomInCrop` above, run over a whole room list and
 * merged into `existing` by name:
 *
 * - a room already in `existing` with a matching `key` gets NEW geometry
 *   (`map_x/y/w/h`) but keeps every other field as-is — a new floorplan
 *   crop means new geometry, but the user's icon/thresholds/clean-time
 *   overrides for that room are unrelated to which file it's drawn on;
 * - a room not yet in `existing` is appended, named after the integration's
 *   room name, with an icon from `iconFor(currentLength)` (docs/30's
 *   numbered-icon cycle);
 * - a room with no `bbox_px` (not on this map, or not yet reported) is
 *   skipped outright — it neither updates nor adds anything.
 *
 * Pure re-normalisation, no fit/rotation/ambiguity — see `placeRoomInCrop`.
 */
export function placeRoomsInCrop(
  intRooms: Array<{ name?: string; bbox_px?: { x0: number; y0: number; x1: number; y1: number } | null }>,
  crop: { x0: number; y0: number; x1: number; y1: number },
  existing: RoomConfigLike[],
  iconFor: (index: number) => string,
): { rooms: RoomConfigLike[]; placed: number; added: number } {
  const rooms = existing.map((r) => ({ ...r }));
  const indexByKey = new Map<string, number>();
  rooms.forEach((r, i) => indexByKey.set(r.key, i));
  let placed = 0;
  let added = 0;
  for (const ir of intRooms) {
    const nm = ir?.name;
    const bp = ir?.bbox_px;
    if (!nm || !bp) continue;
    const rect = placeRoomInCrop(bp, crop);
    if (!rect) continue;
    const idx = indexByKey.get(nm);
    if (idx !== undefined) {
      rooms[idx] = { ...rooms[idx], ...rect };
      placed++;
    } else {
      const room: RoomConfigLike = { key: nm, name: nm, icon: iconFor(rooms.length), ...rect };
      rooms.push(room);
      indexByKey.set(nm, rooms.length - 1);
      added++;
    }
  }
  return { rooms, placed, added };
}

// ── 2-point manual calibration (docs/39) ─────────────────────────────────────

/**
 * Build fit anchors for the 2-point manual calibration flow (docs/39): the
 * user clicks the SAME two physical points once on the vacuum's own raw map
 * preview and once on the floorplan photo. Two point-pairs are exactly the
 * `anchors.length >= 2` case `computeSeatFit` already handles — feeding them
 * straight in gets the identical least-squares rotation/scale/offset solve
 * the room-anchor auto-fit uses, just bootstrapped from clicks instead of
 * name-matched room bboxes. No new maths, no duplicate implementation.
 *
 * Unit conventions mirror `assembleAnchors` exactly: `rawPts` are in the raw
 * map's own NATURAL PIXEL space (same space `bbox_px` is measured in — i.e.
 * the pixel size of the actual image file the reference `<img>` loaded, not
 * a CSS/displayed size), `floorPts` are floorplan-container percentages
 * (same convention as `RoomConfig.map_x`/`map_y`: x = left%, y = top%).
 * `rawPts[i]` and `floorPts[i]` must be the SAME physical point.
 */
export function buildCalibrationAnchors(
  rawPts: Array<{ x: number; y: number }>,
  floorPts: Array<{ x: number; y: number }>,
  rawDims: { NW: number; NH: number },
  ar: number,
): SeatAnchor[] {
  const { NW, NH } = rawDims;
  if (!(NW > 0) || !(NH > 0) || !(ar > 0)) return [];
  const n = Math.min(rawPts.length, floorPts.length);
  const out: SeatAnchor[] = [];
  for (let i = 0; i < n; i++) {
    const r = rawPts[i], f = floorPts[i];
    out.push({
      q: { x: (r.x - NW / 2) / NW, y: (r.y - NH / 2) / NW },
      a: { x: f.x / 100, y: f.y / 100 / ar },
    });
  }
  return out;
}

// ── Home frame (docs/40 §4.3-4.4, Fáze 3): identity crop, no fit/rotation ────
//
// Kontrakt v3 publishes every vacuum registered into a shared "home frame"
// pre-transformed into ONE shared px space (`vacuum_position_home_px`,
// `path_dry_home_px`/`path_wet_home_px`, `rooms[].bbox_home_px`/
// `outline_home_px`) — unlike the legacy per-vacuum `*_px` fields, these
// numbers already agree across every robot in that frame, by construction
// (Fáze 1's registration). Placing them onto the shared floorplan is
// therefore NOT a fit problem at all: it's the exact same "known crop, no
// rotation" re-normalisation `placeRoomInCrop` already does for a bbox, just
// for a single point (`pointInCrop`) or a whole polygon (`outlineInCrop`) —
// one shared implementation, reused by rooms, markers, paths AND (inverted,
// `pctToCropPoint`) by a Pin&Go/Zone click's home-frame coordinates.

export interface CropBox { x0: number; y0: number; x1: number; y1: number }

/** Minimal shape of `image_base.crop_box` this file needs — either flavour
 *  from `types.ts` (`VacuumCropBox` legacy / `HomeFrameCropBox`), kept
 *  structural like the rest of this file. */
interface CropBoxLike extends CropBox { frame_id?: string; entity?: string }

/** A point in a known px-space crop (a home frame's own px space, or any
 *  other crop of that same space) → wrap-container percent (0..100). Same
 *  maths as `placeRoomInCrop`'s centre-point step, standalone for a single
 *  point (a vacuum marker) or reused per-point by `outlineInCrop` below. */
export function pointInCrop(p: { x: number; y: number }, crop: CropBox): { x: number; y: number } | null {
  const cropW = crop.x1 - crop.x0;
  const cropH = crop.y1 - crop.y0;
  if (!(cropW > 0) || !(cropH > 0)) return null;
  return { x: ((p.x - crop.x0) / cropW) * 100, y: ((p.y - crop.y0) / cropH) * 100 };
}

/** Inverse of `pointInCrop` — wrap-container percent → a point back in the
 *  crop's own px space. Used to turn a Pin&Go/Zone click's on-screen percent
 *  into `x_home_px`/`y_home_px` for the `frame: "home"` service call. */
export function pctToCropPoint(pct: { x: number; y: number }, crop: CropBox): { x: number; y: number } | null {
  const cropW = crop.x1 - crop.x0;
  const cropH = crop.y1 - crop.y0;
  if (!(cropW > 0) || !(cropH > 0)) return null;
  return { x: crop.x0 + (pct.x / 100) * cropW, y: crop.y0 + (pct.y / 100) * cropH };
}

/** Same re-normalisation as `pointInCrop`, for a whole polygon at once —
 *  `rooms[].outline_home_px` (kontrakt v3), used to draw a room's real
 *  traced shape instead of just its bounding rectangle (docs/40 §4.4).
 *  Points are NOT clamped to 0..100 (unlike `placeRoomInCrop`'s rect) so a
 *  shape that grazes the crop edge keeps its true form — the SVG it's drawn
 *  into clips to the wrap regardless. */
export function outlineInCrop(
  points: Array<[number, number] | { x: number; y: number }> | undefined | null,
  crop: CropBox,
): Array<{ x: number; y: number }> | null {
  if (!points?.length) return null;
  const cropW = crop.x1 - crop.x0;
  const cropH = crop.y1 - crop.y0;
  if (!(cropW > 0) || !(cropH > 0)) return null;
  return points.map((p) => {
    const x = Array.isArray(p) ? p[0] : p.x;
    const y = Array.isArray(p) ? p[1] : p.y;
    return { x: ((x - crop.x0) / cropW) * 100, y: ((y - crop.y0) / cropH) * 100 };
  });
}

/**
 * Is `vac` rendered via the shared home frame right now? Requires BOTH: the
 * config names a home frame to crop to (`image_base.crop_box.frame_id`, set
 * once by "Snapshot home frame as floorplan" — `anyvac.snapshot_map_as_
 * floorplan` with `frame: "home"`), AND this vacuum's OWN sensor currently
 * reports a MATCHING `home_frame.id`. A vacuum on a different/no frame
 * (different floor, just restarted, map failed the decoder self-test) has no
 * matching id here and automatically falls back to its own legacy
 * per-vacuum seat (`resolveSeat`) instead — no separate config for that
 * case, docs/40 §4.4 "legacy fallback, když ne [nese home_frame]".
 *
 * `attrs` must already be schema-gated by the caller, same convention as
 * `resolveSeat` (the card gates via `_intAttrs`).
 */
export function homeFrameCropFor(
  config: SeatConfigLike,
  vac: SeatVacuumLike | undefined,
  attrs: Record<string, any> | undefined,
): CropBox | null {
  const merged = config.map_mode === "merged";
  const ib = merged ? config.image_base : vac?.image_base;
  const cb = ib?.crop_box;
  if (!cb?.frame_id || cb.x1 == null || cb.y1 == null) return null;
  const hf = attrs?.home_frame as { id?: string } | null | undefined;
  if (!hf?.id || hf.id !== cb.frame_id) return null;
  return { x0: cb.x0, y0: cb.y0, x1: cb.x1, y1: cb.y1 };
}

/** docs/40 §5.A.1: is a saved floorplan file's actual pixel size still a valid
 * match for the crop box it's supposedly cut from — either exactly (the
 * common case), or as a uniform re-export at a different resolution (e.g. the
 * user opened the saved PNG in an image editor and exported it at 2×, or a
 * screenshot tool captured it at a different DPI)? A re-export keeps the
 * crop's own ASPECT RATIO exactly (it's a uniform scale, not a re-crop), so
 * that's the signal this checks for — a real mismatch (a stale crop box left
 * over from a different floorplan, or a file that was actually re-cropped)
 * changes the aspect ratio too and is correctly rejected.
 *
 * Returns the detected scale factor (`nat` pixels per crop pixel — `1` for an
 * exact/near-exact match) when the file is still a valid match, or `null`
 * when it genuinely doesn't correspond to this crop box any more. There is
 * nothing to DO with the returned scale at render time — every consumer of a
 * crop box (`pointInCrop` and friends) only ever normalises to a 0..100
 * percent of the wrap container, never against the loaded file's own pixel
 * dimensions — so this exists purely to tell a real mismatch apart from a
 * harmless re-export for the editor's own diagnostic hint. */
export function canvasScaleForCrop(
  nat: { w: number; h: number } | null | undefined,
  crop: CropBox | null | undefined,
): number | null {
  if (!nat || !crop) return null;
  const cropW = crop.x1 - crop.x0;
  const cropH = crop.y1 - crop.y0;
  if (!(cropW > 0) || !(cropH > 0) || !(nat.w > 0) || !(nat.h > 0)) return null;
  // Near-exact match (today's ±2px absolute tolerance, kept as-is so a file
  // that's pixel-identical bar rounding never reports a "2.003×" scale).
  if (Math.abs(nat.w - cropW) <= 2 && Math.abs(nat.h - cropH) <= 2) return 1;
  // Otherwise: same aspect ratio within ±0.3% -> uniform re-export. The two
  // per-axis scale estimates (w/cropW, h/cropH) necessarily agree closely
  // whenever the aspect-ratio check passes, so either one alone would do;
  // averaging just keeps the reported number stable against which axis the
  // ±0.3% tolerance happened to bite on.
  const arNat = nat.w / nat.h;
  const arCrop = cropW / cropH;
  if (Math.abs(arNat / arCrop - 1) > 0.003) return null;
  return (nat.w / cropW + nat.h / cropH) / 2;
}

/** Projects one point already expressed in a seat's own "q" space (NW-
 *  normalised, origin at the source content's centre) onto the floorplan
 *  wrap, as percent (0..100 on both axes) — "apply an already-solved seat
 *  to a point", the shared last step behind `roomBboxToRect`'s bbox-centre
 *  placement below and `projectHomePxThroughFit` (docs/40 §5.B): one
 *  implementation of that projection, not two (docs/14 rule 1). */
function seatProjectPct(q: { x: number; y: number }, seat: SeatParams, ar: number): { x: number; y: number } {
  // Anisotropic scale (manual-only `scaleY`): each local axis is scaled
  // independently BEFORE rotating — the same order the CSS transform
  // composes in (`rotate(...) scale(sx,sy)` applies scale to local content
  // first, then spins the whole thing). Reduces to the old uniform formula
  // bit-for-bit whenever `scaleY` is unset (sy === sx).
  const sx = seat.scale / 100;
  const sy = (seat.scaleY ?? seat.scale) / 100;
  const theta = seat.rotation * RAD;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const c = { x: (50 + seat.offset_x) / 100, y: (50 + seat.offset_y) / 100 / ar };
  const qx = sx * q.x, qy = sy * q.y;
  const u = { x: c.x + (cos * qx - sin * qy), y: c.y + (sin * qx + cos * qy) };
  return { x: u.x * 100, y: u.y * ar * 100 };
}

/** Whether a rotation angle is nearer a 90°/270° snap than a 0°/180° one —
 *  the point at which a seat's LOCAL x/y axes (pre-rotation) end up mapped
 *  onto the SCREEN's y/x axes instead of straight through. Shared by
 *  `roomBboxToRect`'s own w/h swap below and the editor's horizontal/
 *  vertical Scale slider relabelling (docs/14 rule 1 — one axis-swap test,
 *  not two that could quietly disagree at an odd typed angle). */
export function isRot90(rotationDeg: number): boolean {
  return Math.round(rotationDeg / 90) % 2 !== 0;
}

/** `scaleY`'s ratio to `scale` (1 when unset, equal, or `scale` is 0/falsy —
 *  every one of those means "no anisotropic stretch"). Shared by
 *  `seatRotateScaleCss` below and the integration-overlay robot marker's
 *  counter-scale (anyvac-card.ts) so both agree on exactly when a stretch is
 *  actually in effect (docs/14 rule 1). */
export function seatScaleYRatio(scale: number, scaleY?: number | null): number {
  if (scaleY == null || scaleY === scale || !scale) return 1;
  return scaleY / scale;
}

/** Builds the `rotate()[ scale(1,r)]` half of a seat's CSS transform string
 *  (the caller supplies its own `translate(...)` centring prefix, since not
 *  every seat-styled element uses `-50%,-50%`). Only emits the extra
 *  `scale(1,r)` term when `scaleY` actually diverges from `scale` — every
 *  element that renders a seat (`.map-img` in both render modes, the
 *  integration overlay SVG, the editor's two preview images) shares this one
 *  implementation (docs/14 rule 1), and every config written before
 *  `scale_y` existed produces a byte-identical style string through it. */
export function seatRotateScaleCss(rotationDeg: number, scale: number, scaleY?: number | null): string {
  const rot = "rotate(" + rotationDeg + "deg)";
  const r = seatScaleYRatio(scale, scaleY);
  return r === 1 ? rot : rot + " scale(1," + r + ")";
}

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
  const sx = seat.scale / 100;
  const sy = (seat.scaleY ?? seat.scale) / 100;
  // Scaled in LOCAL space (x by sx, y by sy) BEFORE the rot90 swap below —
  // same axis convention as `seatProjectPct`. Reduces to the old `s*w`/`s*h`
  // bit-for-bit when scaleY is unset (sx === sy).
  let w = ((bp.x1 - bp.x0) / NW) * sx;
  let h = ((bp.y1 - bp.y0) / NW) * sy;
  const pct = seatProjectPct(q, seat, ar);
  const rot90 = isRot90(seat.rotation);
  if (rot90) { const tmp = w; w = h; h = tmp; }
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  return {
    map_x: clamp(Math.round(pct.x * 10) / 10, 0, 100),
    map_y: clamp(Math.round(pct.y * 10) / 10, 0, 100),
    map_w: clamp(Math.round(w * 1000) / 10, 2, 100),
    map_h: clamp(Math.round(h * ar * 1000) / 10, 2, 100),
  };
}

// ── Cesta B: foreign floorplan calibrated against the home frame (docs/40 §5.B) ──
//
// Unlike docs/39's per-robot calibration (bootstraps ONE vacuum's own seat),
// cesta B calibrates the FLOORPLAN ITSELF against the home frame's shared
// mm-stable px space, once, card-level — `ImageBaseConfig.home_anchors`
// (types.ts). Anchors store the raw clicked PAIRS, not a solved seat: the
// fit is re-run live every render (`homeAnchorFit`) against the home
// frame's CURRENT width/height, so it self-heals as the frame grows
// (`grow_frame_canvas`, backend) without asking the user to re-click
// anything. Reuses `buildCalibrationAnchors`/`computeSeatFit` UNCHANGED —
// home-frame px plays exactly the role "raw map px" plays in docs/39, just
// normalised against the frame's own `{width_px, height_px}` instead of one
// vacuum's `image_dims` (docs/14 rule 1: one fit implementation).

interface HomeFrameAnchorLike {
  home_px: { x: number; y: number };
  floor_pct: { x: number; y: number };
}

/** Solves `home_anchors` into a live seat-shaped fit. `frameDims` must be
 *  the home frame's CURRENT `{width_px, height_px}` (from any registered
 *  vacuum's `home_frame` sensor attribute) — the same live re-read that
 *  makes this survive frame growth. `null` below 2 anchors or an unknown
 *  frame size (nothing to fit yet). */
export function homeAnchorFit(
  anchors: HomeFrameAnchorLike[] | undefined | null,
  frameDims: { NW: number; NH: number } | null | undefined,
  ar: number,
): SeatFitResult | null {
  if (!anchors || anchors.length < 2 || !frameDims) return null;
  const built = buildCalibrationAnchors(
    anchors.map((a) => a.home_px), anchors.map((a) => a.floor_pct), frameDims, ar,
  );
  return computeSeatFit(built, ar);
}

/** Projects one point in home-frame px (a vacuum marker, a path point, a
 *  room-outline vertex) through an already-solved `homeAnchorFit` result
 *  onto the floorplan wrap, as percent — cesta B's counterpart of
 *  `roomBboxToRect`'s bbox placement, sharing the same `seatProjectPct`
 *  last step. `frameDims` MUST be the same `{NW, NH}` `homeAnchorFit` was
 *  just solved against (both read live, same render pass) — a stale pair
 *  would silently mis-scale every point. */
export function projectHomePxThroughFit(
  p: { x: number; y: number },
  frameDims: { NW: number; NH: number },
  fit: SeatFitResult,
  ar: number,
): { x: number; y: number } {
  const q = { x: (p.x - frameDims.NW / 2) / frameDims.NW, y: (p.y - frameDims.NH / 2) / frameDims.NW };
  return seatProjectPct(q, fit, ar);
}

/** Inverse of `projectHomePxThroughFit` — floorplan wrap percent -> home-
 *  frame px. Used to turn a Pin&Go/Zone click's on-screen percent into
 *  `x_home_px`/`y_home_px` for the `frame: "home"` service call when a
 *  vacuum is rendered via cesta B's fit instead of cesta A's identity crop
 *  (mirrors `pctToCropPoint` being `pointInCrop`'s inverse for that case).
 *  `frameDims`/`fit`/`ar` must be the SAME triple the forward projection
 *  used — inverting against a stale fit or a different frame size silently
 *  lands on the wrong point. */
export function unprojectPctThroughFit(
  pct: { x: number; y: number },
  frameDims: { NW: number; NH: number },
  fit: SeatFitResult,
  ar: number,
): { x: number; y: number } {
  const u = { x: pct.x / 100, y: pct.y / 100 / ar };
  const s = fit.scale / 100;
  const theta = fit.rotation * RAD;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const c = { x: (50 + fit.offset_x) / 100, y: (50 + fit.offset_y) / 100 / ar };
  const dx = u.x - c.x, dy = u.y - c.y;
  const qx = (cos * dx + sin * dy) / s;
  const qy = (-sin * dx + cos * dy) / s;
  return { x: qx * frameDims.NW + frameDims.NW / 2, y: qy * frameDims.NW + frameDims.NH / 2 };
}

/** Same re-normalisation as `projectHomePxThroughFit`, for a whole polygon
 *  at once — `rooms[].outline_home_px` run through a cesta-B fit instead of
 *  cesta A's identity crop, mirroring `outlineInCrop`'s per-point-map shape
 *  exactly (docs/14 rule 1: `projectHomePxThroughFit` is the one point
 *  primitive both this and `outlineInCrop`'s crop-based sibling build on —
 *  the two differ only in what "known transform" a point goes through, an
 *  identity crop vs. a solved similarity fit). Not clamped, same reasoning
 *  as `outlineInCrop`. */
export function outlineThroughFit(
  points: Array<[number, number] | { x: number; y: number }> | undefined | null,
  frameDims: { NW: number; NH: number },
  fit: SeatFitResult,
  ar: number,
): Array<{ x: number; y: number }> | null {
  if (!points?.length) return null;
  return points.map((p) => {
    const x = Array.isArray(p) ? p[0] : p.x;
    const y = Array.isArray(p) ? p[1] : p.y;
    return projectHomePxThroughFit({ x, y }, frameDims, fit, ar);
  });
}
