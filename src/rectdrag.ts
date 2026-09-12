/**
 * Pure geometry for dragging/resizing a room rectangle in the editor's Maps
 * tab preview (docs/38 §3). No DOM, no lit, no HA types — importable from a
 * plain Node test (`tests/rect-drag.spec.ts`) without a browser.
 *
 * All coordinates are percentages of the floorplan preview container
 * (`.map-pos-container`), the same units as `RoomConfig.map_x/y/w/h`.
 */

/** A room rectangle: CENTRE (x, y) + size (w, h), all in container %. */
export interface RectPct {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Corner = "nw" | "ne" | "sw" | "se";

/** Round to one decimal place — the precision `placeRoomInCrop`/
 *  `roomBboxToRect` (seatfit.ts) already write at. Before docs/38, editor
 *  drag/resize/slider input rounded to whole percent while those wrote
 *  0.1% — 1% of a typical floorplan is well over 10px, which showed up as
 *  visible snapping and a fit residual (`_editorSeat`) that never dropped
 *  much below ~2% no matter how carefully a rectangle was placed by hand. */
export const round1 = (v: number): number => Math.round(v * 10) / 10;

/** Clamp to the 0–100% container bounds. */
export const clampPct = (v: number): number => Math.min(100, Math.max(0, v));

const MIN_SIZE_PCT = 2;
const MAX_SIZE_PCT = 100;
const clampSize = (v: number): number => Math.min(MAX_SIZE_PCT, Math.max(MIN_SIZE_PCT, v));

/** Sign of each axis for the corner being dragged, relative to the
 *  rectangle's centre — used to find both that corner's own position and
 *  its opposite (the resize anchor) from `orig` alone. */
const CORNER_SIGN: Record<Corner, { sx: 1 | -1; sy: 1 | -1 }> = {
  nw: { sx: -1, sy: -1 },
  ne: { sx: 1, sy: -1 },
  sw: { sx: -1, sy: 1 },
  se: { sx: 1, sy: 1 },
};

/**
 * Move a rectangle by a delta (in container %) from its state at the START
 * of the drag — NEVER the pointer's absolute position. Writing the cursor's
 * absolute position as the new centre is exactly the bug this replaces
 * (docs/38 §1, field report "bboxy poskakují"): grabbing the rect anywhere
 * off-centre snapped its centre under the cursor the instant a drag began,
 * by as much as the grab offset (up to ~250px on a large rectangle in a
 * tall preview).
 */
export function moveRect(orig: RectPct, dx: number, dy: number): { map_x: number; map_y: number } {
  return {
    map_x: round1(clampPct(orig.x + dx)),
    map_y: round1(clampPct(orig.y + dy)),
  };
}

/**
 * Resize a rectangle by dragging one `corner` by a delta (in container %)
 * from the drag's start. The OPPOSITE corner stays anchored in place —
 * computed from `orig`, never from an already-updated intermediate state,
 * or the anchor would itself drift as the drag progresses. Size is clamped
 * to a 2–100% range; dragging a corner past the anchor just clamps the
 * size, it never flips which side is which.
 */
export function resizeRect(
  orig: RectPct,
  corner: Corner,
  dx: number,
  dy: number,
): { map_x: number; map_y: number; map_w: number; map_h: number } {
  const halfW = orig.w / 2;
  const halfH = orig.h / 2;
  const { sx, sy } = CORNER_SIGN[corner];
  // The corner being dragged, and its opposite (the anchor), both derived
  // from `orig` alone — never from a previous call's result.
  const draggedX = orig.x + sx * halfW;
  const draggedY = orig.y + sy * halfH;
  const anchorX = orig.x - sx * halfW;
  const anchorY = orig.y - sy * halfH;
  const cornerX = draggedX + dx;
  const cornerY = draggedY + dy;
  return {
    map_x: round1(clampPct((cornerX + anchorX) / 2)),
    map_y: round1(clampPct((cornerY + anchorY) / 2)),
    map_w: round1(clampSize(Math.abs(cornerX - anchorX))),
    map_h: round1(clampSize(Math.abs(cornerY - anchorY))),
  };
}
