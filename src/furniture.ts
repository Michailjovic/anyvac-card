// docs/51 §1 — furniture as movable image layers on the floorplan.
//
// Pure, dependency-free helpers (no Lit, no hass) so the geometry is unit
// tested on its own (tests/furniture.spec.ts) and shared by the card's
// renderer and the Visual editor's Furniture tool (docs/14 rule 1: one copy
// of the math).
//
// Coordinates. A piece is stored in PERCENT of the floorplan image — `x`/`w`
// of its width, `y`/`h` of its height, `x`/`y` being the centre — the same
// convention room rects use (`map_x…map_h`). Rotation is about the centre.
// Rotating in that anisotropic percent space would shear the piece, so every
// rotation-aware operation works in the floorplan's "unit space" instead:
// width 100, height 100 / ar (ar = floorplan width / height). That space is
// isotropic (one unit is the same distance on both axes), and it is exactly
// the `viewBox` both renderers draw the pieces in.

export interface FurnitureItem {
  /** Stable id within one floorplan — key for selection and undo. */
  id: string;
  /** Image URL, normally `/local/anyvac/furniture/<file>`. */
  src: string;
  /** Centre, % of floorplan width / height. */
  x: number;
  y: number;
  /** Size, % of floorplan width / height. */
  w: number;
  h: number;
  /** Degrees, clockwise, about the centre. */
  rot?: number;
  /** 0..1, default 1. */
  opacity?: number;
  /** Mirror horizontally (in the piece's own frame, before rotation). */
  flip?: boolean;
}

export type FurnitureCorner = "nw" | "ne" | "sw" | "se";

/** Smallest piece the editor lets a resize produce, in unit space. */
export const MIN_SIZE_UNIT = 0.5;
/** Rotation snap step (Alt disables it in the editor). */
export const ROT_SNAP_DEG = 15;

/** Piece in unit space: centre, size, rotation. */
export interface UnitBox {
  cx: number;
  cy: number;
  w: number;
  h: number;
  rot: number;
}

const round2 = (v: number): number => Math.round(v * 100) / 100;
const num = (v: unknown, d: number): number => (typeof v === "number" && Number.isFinite(v) ? v : d);

/** Drops malformed entries and fills defaults — config is hand-written YAML
 *  as often as it is editor output. Never throws. */
export function normalizeFurniture(list: unknown): FurnitureItem[] {
  if (!Array.isArray(list)) return [];
  const out: FurnitureItem[] = [];
  const seen = new Set<string>();
  list.forEach((raw, i) => {
    if (!raw || typeof raw !== "object") return;
    const r = raw as Record<string, unknown>;
    if (typeof r.src !== "string" || !r.src) return;
    const w = num(r.w, 0), h = num(r.h, 0);
    if (w <= 0 || h <= 0) return;
    let id = typeof r.id === "string" && r.id ? r.id : `item_${i + 1}`;
    while (seen.has(id)) id += "_";
    seen.add(id);
    const item: FurnitureItem = { id, src: r.src, x: num(r.x, 50), y: num(r.y, 50), w, h };
    const rot = num(r.rot, 0);
    if (rot) item.rot = rot;
    if (typeof r.opacity === "number" && r.opacity >= 0 && r.opacity < 1) item.opacity = r.opacity;
    if (r.flip === true) item.flip = true;
    out.push(item);
  });
  return out;
}

export function toUnit(it: FurnitureItem, ar: number): UnitBox {
  return { cx: it.x, cy: it.y / ar, w: it.w, h: it.h / ar, rot: it.rot ?? 0 };
}

/** Writes a unit-space box back onto an item (rounded to 0.01 %). */
export function fromUnit(it: FurnitureItem, b: UnitBox, ar: number): FurnitureItem {
  const next: FurnitureItem = {
    ...it,
    x: round2(b.cx), y: round2(b.cy * ar), w: round2(b.w), h: round2(b.h * ar),
  };
  const rot = round2(normDeg(b.rot));
  if (rot) next.rot = rot;
  else delete next.rot;
  return next;
}

/** (-180, 180]. */
export function normDeg(d: number): number {
  let r = ((d % 360) + 360) % 360;
  if (r > 180) r -= 360;
  return r;
}

const rad = (d: number): number => (d * Math.PI) / 180;
function rotVec(x: number, y: number, deg: number): [number, number] {
  const c = Math.cos(rad(deg)), s = Math.sin(rad(deg));
  return [x * c - y * s, x * s + y * c];
}

/** Sign of a corner relative to the centre, in the piece's own frame. */
export function cornerSign(c: FurnitureCorner): [number, number] {
  return [c === "ne" || c === "se" ? 1 : -1, c === "sw" || c === "se" ? 1 : -1];
}

/** Corner position in unit space. */
export function cornerPoint(b: UnitBox, c: FurnitureCorner): [number, number] {
  const [sx, sy] = cornerSign(c);
  const [dx, dy] = rotVec((sx * b.w) / 2, (sy * b.h) / 2, b.rot);
  return [b.cx + dx, b.cy + dy];
}

/** Move by a unit-space delta. */
export function moveBox(b: UnitBox, du: number, dv: number): UnitBox {
  return { ...b, cx: b.cx + du, cy: b.cy + dv };
}

/**
 * Corner resize with the OPPOSITE corner pinned (same feel as the Seat tool's
 * side handles since 1.51.3). `p` is the pointer in unit space. With
 * `keepAspect` the piece scales uniformly by whichever axis the pointer
 * pushed further; otherwise each axis follows the pointer independently.
 * Dragging past the pinned corner never flips the piece — it clamps at
 * `MIN_SIZE_UNIT` instead (use the Flip control to mirror on purpose).
 */
export function resizeBoxCorner(
  start: UnitBox, corner: FurnitureCorner, p: [number, number], keepAspect: boolean,
): UnitBox {
  const [sx, sy] = cornerSign(corner);
  const opp: FurnitureCorner = sx > 0 ? (sy > 0 ? "nw" : "sw") : (sy > 0 ? "ne" : "se");
  const [fx, fy] = cornerPoint(start, opp);
  const [lx, ly] = rotVec(p[0] - fx, p[1] - fy, -start.rot);
  let w = Math.max(MIN_SIZE_UNIT, lx * sx);
  let h = Math.max(MIN_SIZE_UNIT, ly * sy);
  if (keepAspect && start.w > 0 && start.h > 0) {
    const k = Math.max(w / start.w, h / start.h);
    w = Math.max(MIN_SIZE_UNIT, start.w * k);
    h = Math.max(MIN_SIZE_UNIT, start.h * k);
  }
  const [dx, dy] = rotVec((sx * w) / 2, (sy * h) / 2, start.rot);
  return { ...start, cx: fx + dx, cy: fy + dy, w, h };
}

/** Rotation handle sits straight "above" the piece, so the angle of the
 *  pointer around the centre plus 90° is the new rotation. Snaps to
 *  `ROT_SNAP_DEG` unless `snap` is false. */
export function rotateBoxTo(start: UnitBox, p: [number, number], snap: boolean): UnitBox {
  let deg = (Math.atan2(p[1] - start.cy, p[0] - start.cx) * 180) / Math.PI + 90;
  if (snap) deg = Math.round(deg / ROT_SNAP_DEG) * ROT_SNAP_DEG;
  return { ...start, rot: normDeg(deg) };
}

/** SVG `transform` for a piece's group: centre, then rotation. The image
 *  inside is drawn at (-w/2, -h/2) and carries its own `scale(-1 1)` when
 *  flipped, so handles drawn in the same group never mirror. */
export function groupTransform(b: UnitBox): string {
  return `translate(${b.cx} ${b.cy}) rotate(${b.rot})`;
}

/** A new piece for `src` at `centre` (% of the floorplan), `widthPct` wide,
 *  height from the image's natural aspect (`nw`×`nh` px; square when
 *  unknown), with an id unique among `existing`. */
export function newFurnitureItem(
  src: string, ar: number, existing: FurnitureItem[],
  opts: { nw?: number | null; nh?: number | null; centre?: { x: number; y: number }; widthPct?: number } = {},
): FurnitureItem {
  const wUnit = opts.widthPct ?? 15;
  const aspect = opts.nw && opts.nh && opts.nw > 0 && opts.nh > 0 ? opts.nh / opts.nw : 1;
  const hUnit = wUnit * aspect;
  const c = opts.centre ?? { x: 50, y: 50 };
  return {
    id: uniqueId(slugFromSrc(src), existing),
    src, x: round2(c.x), y: round2(c.y), w: round2(wUnit), h: round2(hUnit * ar),
  };
}

export function slugFromSrc(src: string): string {
  const file = decodeURIComponent((src.split("?")[0].split("/").pop() ?? "").replace(/\.[a-z0-9]+$/i, ""));
  const slug = file.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return slug || "item";
}

export function uniqueId(base: string, existing: FurnitureItem[]): string {
  const taken = new Set(existing.map((e) => e.id));
  if (!taken.has(base)) return base;
  for (let i = 2; ; i++) if (!taken.has(`${base}_${i}`)) return `${base}_${i}`;
}

interface CropLike {
  entity?: string;
  frame_id?: string;
  x0: number; y0: number; x1: number; y1: number;
}

/** Whether two crop boxes live in the same pixel space (same vacuum's map,
 *  or the same home frame) — only then can positions be carried across. */
export function cropsCompatible(a: CropLike | null | undefined, b: CropLike | null | undefined): boolean {
  if (!a || !b) return false;
  if (a.frame_id || b.frame_id) return !!a.frame_id && a.frame_id === b.frame_id;
  return !!a.entity && a.entity === b.entity;
}

/**
 * docs/51 §1.5 — a snapshot floorplan re-cut with a different crop shifts
 * every percentage. Both crops are known in the same pixel space, so each
 * piece is re-expressed against the new crop: same physical place, same
 * physical size. Incompatible or degenerate crops leave the list untouched.
 */
export function remapFurnitureCrop(
  items: FurnitureItem[], oldCrop: CropLike | null | undefined, newCrop: CropLike | null | undefined,
): FurnitureItem[] {
  if (!items.length || !cropsCompatible(oldCrop, newCrop)) return items;
  const o = oldCrop!, n = newCrop!;
  const ow = o.x1 - o.x0, oh = o.y1 - o.y0, nw = n.x1 - n.x0, nh = n.y1 - n.y0;
  if (ow <= 0 || oh <= 0 || nw <= 0 || nh <= 0) return items;
  if (o.x0 === n.x0 && o.y0 === n.y0 && o.x1 === n.x1 && o.y1 === n.y1) return items;
  return items.map((it) => ({
    ...it,
    x: round2(((o.x0 + (it.x / 100) * ow - n.x0) / nw) * 100),
    y: round2(((o.y0 + (it.y / 100) * oh - n.y0) / nh) * 100),
    w: round2((it.w * ow) / nw),
    h: round2((it.h * oh) / nh),
  }));
}

/** Copy-YAML fallback — an `image_base:` fragment with just `furniture:`. */
export function furnitureToYaml(items: FurnitureItem[]): string {
  if (!items.length) return "image_base:\n  furniture: []";
  const lines = ["image_base:", "  furniture:"];
  for (const it of items) {
    lines.push(`    - id: ${it.id}`);
    lines.push(`      src: ${it.src}`);
    lines.push(`      x: ${it.x}`, `      y: ${it.y}`, `      w: ${it.w}`, `      h: ${it.h}`);
    if (it.rot) lines.push(`      rot: ${it.rot}`);
    if (it.opacity !== undefined && it.opacity < 1) lines.push(`      opacity: ${it.opacity}`);
    if (it.flip) lines.push("      flip: true");
  }
  return lines.join("\n");
}
