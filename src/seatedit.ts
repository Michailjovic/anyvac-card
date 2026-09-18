/**
 * docs/41 Fáze A — pure gesture math for Align mode's manual floorplan seating.
 *
 * No Lit/HA imports (kept dependency-free, same convention `seatfit.ts` uses)
 * so this module can be unit-tested as plain Node code and, later, shared
 * between the card's align-overlay portal and the editor's gizmo (docs/41 §4).
 *
 * Everything here composes on top of the ALREADY-SHIPPED seat model in
 * `seatfit.ts` (`SeatParams`, `seatProjectPct`, `seatFromFrame`,
 * `seatRotateScaleCss`) rather than re-deriving the geometry (docs/14 rule 1):
 *
 * - `seatToMatrix` is the same point transform `seatProjectPct` computes,
 *   restated as a `DOMMatrix` over NATURAL PIXEL content coordinates (the
 *   `rooms[].bbox_px`/`vacuum_position_px` space) instead of NW-normalised
 *   fractions — algebraically equivalent, verified against a real rendered
 *   `.map-img` element in `tests/seat-edit.spec.ts` (ground truth is the
 *   browser's own layout, never our own maths checked against itself — same
 *   discipline `rotated-map.spec.ts` established).
 * - The pivot/nudge/pinch helpers below work in the same ISOTROPIC
 *   "wrap-width-normalised" centre space `seatFromFrame`/`seatProjectPct`
 *   already use internally (`seatCentreFrac`/`frameToOffset` are that
 *   centre<->offset conversion, factored out so there is one copy of it, not
 *   a second one living only in this module).
 */

import type { SeatParams } from "./seatfit";
import { resolveImageBaseSrc } from "./seatfit";

const RAD = Math.PI / 180;

// ── Align-overlay session/view types (docs/41 §4.2) ────────────────────────
// Data-only — no Lit/HA import — so the card's align-overlay portal AND
// (from Fáze E) the editor's point-pairing tool can share one shape without
// either depending on the other's runtime.

/** View of the scene — pan/zoom/rotate-of-VIEW, kept strictly separate from
 *  the seat being edited (docs/41 risk #4: seat is always represented/edited
 *  at 0° of view; only the on-screen presentation rotates). Never persisted
 *  — resets every time the overlay opens, same as the editor's own
 *  Swap ↔/↕ view toggle. */
export interface AlignViewState {
  zoom: number;
  panX: number;
  panY: number;
  /** View-only rotation in 90° steps — NOT the seat's own `rotation`. */
  rot: 0 | 90 | 180 | 270;
}

/** Which overlay tool is active. Only `"transform"` (the gizmo) exists
 *  through Fáze C; `"pairs"` (point-pairing) arrives in Fáze E. */
export type AlignTool = "transform" | "pairs";

/** One open Align-mode editing session for a single vacuum's seat against a
 *  single floorplan. `start` is captured ONCE, from the vacuum's effective
 *  seat at the moment the overlay opens (auto-fit or manual, whichever was
 *  actually showing) — `draft` evolves from there via the gizmo and is what
 *  actually renders in the overlay. Neither is ever written back through
 *  `_effectiveSeat`/`_seatMemo` (docs/41 risk #5): the draft is its own,
 *  separate piece of state for the life of the session. */
export interface AlignSession {
  /** Entity id of the vacuum whose seat is being edited. */
  vacuum: string;
  /** `image_base.src` — the floorplan identity (docs/41 §4.6 key). */
  floorplan: string;
  start: SeatParams;
  draft: SeatParams;
  history: SeatParams[];
  future: SeatParams[];
  layers: {
    floor: number;
    rawMap: number;
    dry: boolean;
    wet: boolean;
    rooms: boolean;
    staticRooms: boolean;
    others: boolean;
  };
  snap90: boolean;
  /** Keyboard/toolbar nudge step-size tier — see `NudgeTier` below. */
  nudgeTier: NudgeTier;
}

/** Keyboard/visual nudge step-size tier: "fine" = x0.1, "normal" = x1,
 *  "jump" = x10 of the base nudge amounts (0.1% offset, 0.5deg rotation,
 *  0.5% scale — docs/41 SS4.4). Selected persistently via the toolbar's
 *  Jemne/Krok/Skok toggle (touch-friendly, no keyboard required); Ctrl/
 *  Shift held during a keyboard nudge MOMENTARILY override it to
 *  "fine"/"jump" without changing the toggle's own selection (avoids
 *  Ctrl+WASD-style browser-shortcut collisions — see the arrow/bracket/
 *  comma-period key layout below, none of which collide with a browser or
 *  OS shortcut when combined with Ctrl or Shift). */
export type NudgeTier = "fine" | "normal" | "jump";

export function nudgeTierMultiplier(tier: NudgeTier): number {
  return tier === "fine" ? 0.1 : tier === "jump" ? 10 : 1;
}

export function defaultAlignView(): AlignViewState {
  return { zoom: 1, panX: 0, panY: 0, rot: 0 };
}

export function defaultAlignLayers(): AlignSession["layers"] {
  return { floor: 1, rawMap: 1, dry: true, wet: true, rooms: true, staticRooms: true, others: true };
}

// ── Low-level centre/point conversions (shared by every op below) ─────────

/** Seat's centre in isotropic wrap-WIDTH-normalised fraction units (both axes
 *  measured as a fraction of wrap width) — the space `seatProjectPct` computes
 *  internally before converting the y axis to a height-percent via `ar`.
 *  Working here lets rotation/scale-about-a-point use plain trigonometry
 *  without any aspect-ratio distortion. Mirrors `seatProjectPct`'s own `c`. */
function seatCentreFrac(seat: SeatParams, ar: number): { x: number; y: number } {
  return { x: (50 + seat.offset_x) / 100, y: (50 + seat.offset_y) / 100 / ar };
}

/** Inverse of `seatCentreFrac` — the exact formula `computeSeatFit`'s
 *  `seatFromFrame` (seatfit.ts) uses to turn a solved centre back into
 *  `offset_x`/`offset_y`. One centre<->offset conversion, not two. */
function frameToOffset(c: { x: number; y: number }, ar: number): { offset_x: number; offset_y: number } {
  return { offset_x: c.x * 100 - 50, offset_y: c.y * ar * 100 - 50 };
}

/** A "percent" point — same units as `offset_x`/`offset_y` (x in %wrap-width,
 *  y in %wrap-height): what a pointer/pivot position is naturally expressed
 *  in — converted to the isotropic frac space above, and back. */
function pctToFrac(p: { x: number; y: number }, ar: number): { x: number; y: number } {
  return { x: p.x / 100, y: p.y / 100 / ar };
}
function fracToPct(f: { x: number; y: number }, ar: number): { x: number; y: number } {
  return { x: f.x * 100, y: f.y * ar * 100 };
}

function rotatePoint(p: { x: number; y: number }, deg: number): { x: number; y: number } {
  const t = deg * RAD;
  const cos = Math.cos(t), sin = Math.sin(t);
  return { x: cos * p.x - sin * p.y, y: sin * p.x + cos * p.y };
}

function normDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// ── Content-space -> screen-space matrix (the DOM-verified primitive) ─────

/**
 * Affine map from a seated layer's NATURAL PIXEL content coordinates (origin
 * top-left of the vacuum's own map image, 0..NW / 0..NH — the space
 * `rooms[].bbox_px` and `vacuum_position_px` are published in) to
 * wrap-relative CSS pixels (origin top-left of `.map-wrap`), for a concrete
 * wrap pixel size.
 *
 * Derived directly from the shipped `left/top/width/aspect-ratio` styling +
 * `seatRotateScaleCss`'s `translate(-50%,-50%) rotate() [scale(1,ratio)]`
 * (anyvac-card.ts, `seatfit.ts`'s `seatProjectPct`) — not re-guessed. Ground
 * truth for this exact algebra is a real rendered `.map-img` in
 * `tests/seat-edit.spec.ts`.
 *
 * `wrapW`/`wrapH` are the `.map-wrap` box's pixel size; `NW`/`NH` are the
 * vacuum map's natural pixel dimensions (`mapPxDims` in `seatfit.ts`).
 */
export function seatToMatrix(
  seat: SeatParams, wrapW: number, wrapH: number, NW: number, NH: number,
): DOMMatrix {
  const cxPx = ((50 + seat.offset_x) / 100) * wrapW;
  const cyPx = ((50 + seat.offset_y) / 100) * wrapH;
  const kx = (seat.scale / 100) * (wrapW / NW);
  const ky = ((seat.scaleY ?? seat.scale) / 100) * (wrapW / NW);
  return new DOMMatrix()
    .translate(cxPx, cyPx)
    .rotate(seat.rotation)
    .scale(kx, ky)
    .translate(-NW / 2, -NH / 2);
}

// ── Editing primitives (all operate on percent-space points/deltas — the ──
// ── same units `offset_x`/`offset_y` already use) ──────────────────────

/** Pure translate — `dxPct`/`dyPct` add directly to `offset_x`/`offset_y`
 *  (already in the right units, no conversion needed). */
export function translateSeat(seat: SeatParams, dxPct: number, dyPct: number): SeatParams {
  return { ...seat, offset_x: seat.offset_x + dxPct, offset_y: seat.offset_y + dyPct };
}

/** Uniform scale by factor `k` about an arbitrary pivot point (percent-space
 *  — a corner-handle drag pivots about the OPPOSITE corner, not the centre).
 *  `scaleY` (if the seat has an anisotropic stretch) scales by the same `k`
 *  so the stretch ratio is preserved. */
export function scaleSeatAbout(
  seat: SeatParams, k: number, pivotPct: { x: number; y: number }, ar: number,
): SeatParams {
  const pivot = pctToFrac(pivotPct, ar);
  const c = seatCentreFrac(seat, ar);
  const newC = { x: pivot.x + k * (c.x - pivot.x), y: pivot.y + k * (c.y - pivot.y) };
  const off = frameToOffset(newC, ar);
  const next: SeatParams = { ...seat, scale: seat.scale * k, offset_x: off.offset_x, offset_y: off.offset_y };
  if (seat.scaleY != null) next.scaleY = seat.scaleY * k;
  return next;
}

/** Anisotropic (independent X/Y) corner-handle scale — used instead of the
 *  uniform `scaleSeatAbout` once the seat already has an independent Y
 *  scale (`scaleY != null`), so a corner drag can change the layer's aspect
 *  ratio instead of only resizing it uniformly (field report 2026-09-18:
 *  corner handles stayed aspect-locked even with "Independent Y scale" on —
 *  gating which of the two this function/`scaleSeatAbout` gets called is
 *  `_alignGestureMove`'s job, keyed off `g.startSeat.scaleY`).
 *
 *  `s0Pct`/`s1Pct` are the dragged pointer's start/live wrap-percent
 *  positions, `pivotPct` the OPPOSITE corner (fixed for the whole gesture,
 *  same convention as `scaleSeatAbout`). The pivot->pointer vector is
 *  decomposed onto the seat's own (rotated) local axes — scaling each axis
 *  independently there, then rotating back, is what keeps the pivot corner
 *  fixed while X and Y stretch by different amounts. Reduces to exactly
 *  `scaleSeatAbout`'s own math when kx == ky (uniform scale commutes with
 *  rotation), so this is a strict superset, not a parallel path.
 *
 *  Always resolves `scaleY` from `scale` first when it was still `null` —
 *  only reachable once Independent Y is already on in practice, but stays
 *  well-defined either way. A ~0 start offset on an axis (degenerate —
 *  shouldn't happen for a real corner handle, whose local offset from the
 *  opposite corner is always the layer's own full width/height on both
 *  axes) leaves that axis' factor at 1 instead of dividing by ~0. */
export function scaleSeatCornerAniso(
  seat: SeatParams,
  s0Pct: { x: number; y: number }, s1Pct: { x: number; y: number },
  pivotPct: { x: number; y: number }, ar: number,
): SeatParams {
  const pivot = pctToFrac(pivotPct, ar);
  const f0 = pctToFrac(s0Pct, ar), f1 = pctToFrac(s1Pct, ar);
  const rel0 = rotatePoint({ x: f0.x - pivot.x, y: f0.y - pivot.y }, -seat.rotation);
  const rel1 = rotatePoint({ x: f1.x - pivot.x, y: f1.y - pivot.y }, -seat.rotation);
  const kx = Math.abs(rel0.x) > 1e-6 ? rel1.x / rel0.x : 1;
  const ky = Math.abs(rel0.y) > 1e-6 ? rel1.y / rel0.y : 1;
  const c = seatCentreFrac(seat, ar);
  const relC = rotatePoint({ x: c.x - pivot.x, y: c.y - pivot.y }, -seat.rotation);
  const scaledRelC = rotatePoint({ x: relC.x * kx, y: relC.y * ky }, seat.rotation);
  const newC = { x: pivot.x + scaledRelC.x, y: pivot.y + scaledRelC.y };
  const off = frameToOffset(newC, ar);
  const scaleY = seat.scaleY ?? seat.scale;
  return { ...seat, scale: seat.scale * kx, scaleY: scaleY * ky, offset_x: off.offset_x, offset_y: off.offset_y };
}

/** Rotate by `dDeg` about an arbitrary pivot point (percent-space) — the
 *  rotation handle pivots about the layer's own centre (`pivotPct` = centre
 *  in that case), but this stays general since a future "rotate about the
 *  cursor" (Alt+wheel, docs/41 §4.4) needs an arbitrary pivot too. */
export function rotateSeatAbout(
  seat: SeatParams, dDeg: number, pivotPct: { x: number; y: number }, ar: number,
): SeatParams {
  const pivot = pctToFrac(pivotPct, ar);
  const c = seatCentreFrac(seat, ar);
  const rel = rotatePoint({ x: c.x - pivot.x, y: c.y - pivot.y }, dDeg);
  const newC = { x: pivot.x + rel.x, y: pivot.y + rel.y };
  const off = frameToOffset(newC, ar);
  return { ...seat, rotation: normDeg(seat.rotation + dDeg), offset_x: off.offset_x, offset_y: off.offset_y };
}

/** Independent Y-axis stretch (`scale_y`) by factor `k` — local axis, before
 *  rotation, same convention `seatProjectPct`/`roomBboxToRect` already use.
 *  Does not touch rotation/offset/scale. */
export function stretchSeatY(seat: SeatParams, k: number): SeatParams {
  const base = seat.scaleY ?? seat.scale;
  return { ...seat, scaleY: base * k };
}

/** Independent X-axis stretch by factor `k`, local axis, centred (offset
 *  untouched — mirrors `stretchSeatY` exactly). The local X axis IS `scale`
 *  already (docs/14 rule 1 — one seat model, not a separate `scale_x`
 *  field), so this freezes `scaleY` from its current effective value first
 *  (same as `stretchSeatY` freezing from `scale`) — that's what keeps Y
 *  visually fixed while X changes independently, and it's also what the
 *  left/right side handles use to make X-only stretch possible at all
 *  (field report 2026-09-18: there was no X-axis stretch primitive, only
 *  the uniform `scale` + `stretchSeatY`). */
export function stretchSeatX(seat: SeatParams, k: number): SeatParams {
  const scaleY = seat.scaleY ?? seat.scale;
  return { ...seat, scale: seat.scale * k, scaleY };
}

/** Local-axis (pre-rotation) scale ratio for a centre-anchored side-handle
 *  drag — `axis` picks which local axis the handle moves along ("x" for
 *  the left/right handles -> `stretchSeatX`, "y" for top/bottom ->
 *  `stretchSeatY`). `s0Pct`/`s1Pct` are the dragged pointer's start/live
 *  wrap-percent positions; signed (not abs), so dragging a handle back
 *  through the layer's own centre flips that axis, same as a corner drag
 *  crossing `scaleSeatCornerAniso`'s pivot — not specially guarded against,
 *  same as every other gizmo ratio here. Same ~0-start-offset guard as
 *  `scaleSeatCornerAniso`. */
export function localAxisScaleRatio(
  seat: SeatParams, axis: "x" | "y",
  s0Pct: { x: number; y: number }, s1Pct: { x: number; y: number }, ar: number,
): number {
  const c = seatCentreFrac(seat, ar);
  const f0 = pctToFrac(s0Pct, ar), f1 = pctToFrac(s1Pct, ar);
  const rel0 = rotatePoint({ x: f0.x - c.x, y: f0.y - c.y }, -seat.rotation);
  const rel1 = rotatePoint({ x: f1.x - c.x, y: f1.y - c.y }, -seat.rotation);
  const v0 = axis === "x" ? rel0.x : rel0.y;
  const v1 = axis === "x" ? rel1.x : rel1.y;
  return Math.abs(v0) > 1e-6 ? v1 / v0 : 1;
}

/** Solves the similarity transform (rotation + uniform scale + translation)
 *  mapping percent-space point `a0`->`b0` and `a1`->`b1` — closed-form via
 *  complex division, the 2-point case of the same least-squares idea
 *  `computeSeatFit` (seatfit.ts) uses for N anchors. Returns `null` when the
 *  two source points coincide (no orientation/scale signal). */
function similarityFromTwoPoints(
  a0: { x: number; y: number }, a1: { x: number; y: number },
  b0: { x: number; y: number }, b1: { x: number; y: number },
): { rotationDeg: number; scale: number; translate: { x: number; y: number } } | null {
  const dax = a1.x - a0.x, day = a1.y - a0.y;
  const denom = dax * dax + day * day;
  if (denom < 1e-12) return null;
  const dbx = b1.x - b0.x, dby = b1.y - b0.y;
  // Complex division (dbx + i·dby) / (dax + i·day) — the unique
  // rotation+scale `m` for which m·(a1-a0) = (b1-b0).
  const mRe = (dbx * dax + dby * day) / denom;
  const mIm = (dby * dax - dbx * day) / denom;
  const scale = Math.hypot(mRe, mIm);
  if (scale < 1e-6) return null;
  const rotationDeg = Math.atan2(mIm, mRe) / RAD;
  const ma0x = mRe * a0.x - mIm * a0.y;
  const ma0y = mIm * a0.x + mRe * a0.y;
  return { rotationDeg, scale, translate: { x: b0.x - ma0x, y: b0.y - ma0y } };
}

/**
 * Two-finger pinch: given the two pointers' percent-space positions before
 * (`p0a`/`p0b`) and after (`p1a`/`p1b`) the move, applies the same rigid
 * similarity transform to the seat's centre/rotation/scale that those two
 * points themselves underwent — the whole layer moves as if the two content
 * points under the fingers stayed fixed to them. Returns `seat` unchanged if
 * the gesture carries no signal (pointers coincide).
 */
export function pinchSeat(
  seat: SeatParams,
  p0a: { x: number; y: number }, p0b: { x: number; y: number },
  p1a: { x: number; y: number }, p1b: { x: number; y: number },
  ar: number,
): SeatParams {
  const sim = similarityFromTwoPoints(
    pctToFrac(p0a, ar), pctToFrac(p0b, ar), pctToFrac(p1a, ar), pctToFrac(p1b, ar),
  );
  if (!sim) return seat;
  const c = seatCentreFrac(seat, ar);
  const mRe = sim.scale * Math.cos(sim.rotationDeg * RAD);
  const mIm = sim.scale * Math.sin(sim.rotationDeg * RAD);
  const newC = {
    x: mRe * c.x - mIm * c.y + sim.translate.x,
    y: mIm * c.x + mRe * c.y + sim.translate.y,
  };
  const off = frameToOffset(newC, ar);
  const next: SeatParams = {
    ...seat,
    rotation: normDeg(seat.rotation + sim.rotationDeg),
    scale: seat.scale * sim.scale,
    offset_x: off.offset_x,
    offset_y: off.offset_y,
  };
  if (seat.scaleY != null) next.scaleY = seat.scaleY * sim.scale;
  return next;
}

// ── Keyboard nudges (docs/41 §4.4) ─────────────────────────────────────────

/** Nudges the offset by a delta expressed in SCREEN directions (arrow keys
 *  move "right"/"down" on screen, not necessarily along the seat's own
 *  axes) — un-rotates the delta by the Align overlay's current view rotation
 *  (`viewRotDeg`, 0 when nothing rotates the view) before applying it. */
export function nudgeOffset(
  seat: SeatParams, dxScreenPct: number, dyScreenPct: number, viewRotDeg: number, ar: number,
): SeatParams {
  const v = pctToFrac({ x: dxScreenPct, y: dyScreenPct }, ar);
  const u = rotatePoint(v, -viewRotDeg);
  const d = fracToPct(u, ar);
  return translateSeat(seat, d.x, d.y);
}

export function nudgeRotation(seat: SeatParams, dDeg: number): SeatParams {
  return { ...seat, rotation: normDeg(seat.rotation + dDeg) };
}

export function nudgeScale(seat: SeatParams, dPct: number): SeatParams {
  const k = 1 + dPct / 100;
  const next: SeatParams = { ...seat, scale: seat.scale * k };
  if (seat.scaleY != null) next.scaleY = seat.scaleY * k;
  return next;
}

/** Magnet to the nearest 0/90/180/270 when within `thresholdDeg`, otherwise
 *  the angle (normalised to [0,360)) is returned unchanged. */
export function snapRotation(deg: number, thresholdDeg = 3): number {
  const d = normDeg(deg);
  const nearest = (Math.round(d / 90) * 90) % 360;
  const diff = Math.min(Math.abs(d - nearest), 360 - Math.abs(d - nearest));
  return diff <= thresholdDeg ? nearest : d;
}

// ── YAML export (Copy YAML — always-available fallback, docs/41 §4.6) ─────

/** `map:` config fragment for a solved seat, rounded to 0.01 (docs/41 §5 bod
 *  4 — finer than the editor's existing 0.1, headroom for zoomed-in
 *  doladění without visible "steps" after save). */
export function seatToYaml(seat: SeatParams): string {
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const lines = [
    "map:",
    `  seat: "manual"`,
    `  rotation: ${r2(seat.rotation)}`,
    `  scale: ${r2(seat.scale)}`,
  ];
  if (seat.scaleY != null) lines.push(`  scale_y: ${r2(seat.scaleY)}`);
  lines.push(`  offset_x: ${r2(seat.offset_x)}`, `  offset_y: ${r2(seat.offset_y)}`);
  return lines.join("\n");
}

// ── Backend override merge (docs/41 §4.6) ──────────────────────────────────

/** One floorplan's saved Align-mode overrides, as the (Fáze B) `anyvac
 *  .set_floorplan_seat` store/attribute will shape them — `vacuums[entity]`
 *  is a solved `SeatParams`, `image_base` a partial card-level floorplan
 *  override (Fáze G scope: `crop_box`/`home_anchors`, not wired end-to-end
 *  yet). The backend deletes cleared entries rather than publishing `null`,
 *  but `applyFloorplanSeats` treats a `null`/missing entry the same way
 *  (defensive — costs nothing, matches the service contract's "null = clear"
 *  wording). */
export interface FloorplanSeatOverride {
  vacuums?: Record<string, SeatParams | null | undefined>;
  image_base?: Record<string, unknown> | null;
  updated?: string;
}
export type FloorplanSeats = Record<string, FloorplanSeatOverride | undefined>;

/** Minimal config shapes this module touches — structural, not the full card
 *  config types (keeps `seatedit.ts` dependency-free), same convention
 *  `seatfit.ts`'s `SeatConfigLike`/`SeatVacuumLike` already use. */
export interface SeatEditVacuumLike {
  entity: string;
  map?: SeatParams & { seat?: "auto" | "manual" };
  image_base?: { src?: string; [k: string]: unknown };
  [k: string]: unknown;
}
export interface SeatEditConfigLike {
  map_mode?: string;
  image_base?: { src?: string; [k: string]: unknown };
  vacuums?: SeatEditVacuumLike[];
  [k: string]: unknown;
}

/**
 * Merges backend `floorplan_seats` overrides onto a raw card config —
 * precedence override > config manual > auto (docs/41 §3 invariant 5/§4.6).
 * Never mutates its input; returns the SAME object when nothing applies (so
 * callers can cheaply skip a re-render). Per-vacuum overrides win whenever
 * present; the `image_base`-level override applies only in merged mode
 * against the card-level floorplan, resolved the SAME way the render path
 * already picks a vacuum's floorplan (`resolveImageBaseSrc`, seatfit.ts —
 * docs/14 rule 1: reused, not re-derived).
 */
export function applyFloorplanSeats<C extends SeatEditConfigLike>(
  config: C, floorplanSeats: FloorplanSeats | undefined | null,
): C {
  if (!floorplanSeats || !config?.vacuums?.length) return config;
  let changed = false;
  const vacuums = config.vacuums.map((vac) => {
    const src = resolveImageBaseSrc(config, vac);
    const override = src ? floorplanSeats[src]?.vacuums?.[vac.entity] : null;
    if (!override) return vac;
    changed = true;
    return { ...vac, map: { ...override, seat: "manual" as const } };
  });
  let imageBase = config.image_base;
  if (config.map_mode === "merged" && config.image_base?.src) {
    const ov = floorplanSeats[config.image_base.src]?.image_base;
    if (ov) {
      imageBase = { ...config.image_base, ...ov };
      changed = true;
    }
  }
  if (!changed) return config;
  return { ...config, vacuums, image_base: imageBase };
}
