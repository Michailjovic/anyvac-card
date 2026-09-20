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
import type { RectPct } from "./rectdrag";

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

/** docs/42 §1/§4.3 — which of the Visual editor's three TOOLS is active
 *  (not to be confused with `AlignTool` above, which is an internal detail
 *  of the Floorplan & Calibrate tool's own calibration state — "transform"
 *  vs. "pairs" within calibration, once that tool exists). Persisted
 *  per-browser as "last used tool" (docs/42 §4.5/§8 bod 4), same precedent
 *  as `_flipLive` — see `anyvac-card.ts`'s `_storeKey`/`_readStored`. Only
 *  `"seat"` has a real implementation through docs/42 fáze H; `"rooms"`/
 *  `"floorplan"` render a placeholder until fáze I/J. */
export type VisualEditorTool = "seat" | "rooms" | "floorplan";

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
  /** `image_base.src` CURRENTLY IN EFFECT — used to render the floorplan
   *  image itself (`<img src>`) and to match "other vacuums sharing this
   *  floorplan" (`resolveImageBaseSrc(this._config, ...)`). Captured once at
   *  open time like everything else here, but — unlike `floorplanKey` below
   *  — also updated in place whenever a fáze J4 snapshot/acquisition action
   *  writes a NEW `image_base.src` within this same session, so the overlay
   *  keeps showing the right picture without needing a close/reopen. */
  floorplan: string;
  /** docs/42 §9 fáze J4 — the STABLE floorplan-identity key every
   *  `anyvac.set_floorplan_seat` call's `floorplan:` parameter must use,
   *  resolved from `_rawConfig` (`resolveImageBaseSrc(this._rawConfig, vac)`)
   *  rather than the live/effective `_config`. Fixed for the life of the
   *  session — NEVER updated, even when `floorplan` above changes — because
   *  `applyFloorplanSeats`'s own lookup (`seatedit.ts`) always keys off the
   *  raw, YAML-declared `image_base.src`, not whatever a card-side override
   *  currently resolves to. Before fáze J4 the Visual editor never wrote a
   *  new `src` at all, so `floorplan`/`floorplanKey` always coincided and
   *  this distinction was moot (see `_fiducialSnapshotPath`'s doc comment
   *  for the exact divergence this field exists to prevent); J4's snapshot
   *  buttons are the first card-side writes that change `src`, so from here
   *  on every `set_floorplan_seat` call must send THIS field, never
   *  `floorplan`, or a snapshot taken today would silently orphan every
   *  override written in a LATER session under an unreachable key. */
  floorplanKey: string;
  start: SeatParams;
  draft: SeatParams;
  history: SeatParams[];
  future: SeatParams[];
  /** docs/42 §9 fáze H — the Seat & Appearance tool's Appearance half.
   *  Seeded ONCE from the vacuum's current effective appearance when the
   *  session opens (`start`), edited by the form fields (`draft`), same
   *  "start captured once, draft evolves independently" discipline as the
   *  seat geometry above (docs/41 risk #5) — except there is no undo/redo
   *  for it: these are plain form fields, not gestures, so `_alignSession
   *  .history`/`.future` stay geometry-only (same precedent as `layers`/
   *  `nudgeTier` below, which also don't participate in undo). Always
   *  fully populated (all 11 `AppearanceOverride` keys) rather than a
   *  partial diff, because Save always sends the WHOLE appearance dict
   *  (docs/42 §8 bod 3 "no sentinel" — see `_alignSave`). */
  appearanceStart: AppearanceOverride;
  appearanceDraft: AppearanceOverride;
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

// ── Rooms tool session (docs/42 §3.3/§4.3, fáze I) ─────────────────────────
// Replicates the Seat & Appearance tool's session shape above — draft/undo/
// redo/Reset/Copy YAML "same mechanics, just replicated" (§4.3) — rather
// than inventing a new editing lifecycle for a second tool.

/** One room's draft state in the Rooms tool — `RectPct` (`x`/`y`/`w`/`h`,
 *  container-% centre+size, docs/38) IS `map_x/map_y/map_w/map_h` under
 *  different field names (`roomBboxToRect`/the live `.room-overlay` CSS
 *  both already treat them as the same centre-based space, docs/14 rule 1 —
 *  reusing `rectdrag.ts`'s `RectPct` here rather than a parallel shape). */
export interface RoomDraft extends RectPct {
  areaId: string | null;
  /** No matching config-authored room existed for this key when the
   *  session opened — created from the Visual editor itself (docs/42 §3.3/
   *  §8 bod 5 "založit novou místnost"). Only a room with this set can be
   *  deleted OUTRIGHT from the Rooms tool (clearing its override removes it
   *  entirely, since it never existed anywhere else) — deleting an
   *  EXISTING config-authored `RoomConfig` needs a real YAML write, which
   *  the Visual editor cannot do (docs/41 §0); that stays a Config editor
   *  action (`editor.ts`'s own room list) until a future phase gives this
   *  tool an "adopt/remove from config" path of its own. */
  isNew: boolean;
}

/** One open Rooms-tool editing session — mirrors `AlignSession`'s
 *  start-once/draft-evolves discipline (docs/41 risk #5), just for a whole
 *  room map instead of one seat. */
export interface RoomsEditSession {
  /** `image_base.src` currently in effect — same LIVE semantics as
   *  `AlignSession.floorplan` (see its doc comment); mutated in place by a
   *  fáze J4 snapshot action, never used as a `set_floorplan_seat` key. */
  floorplan: string;
  /** Same STABLE identity key as `AlignSession.floorplanKey` — see its doc
   *  comment. Always copied from `_alignSession.floorplanKey` at open time
   *  (`_openRooms`) and never updated afterwards; this is what every
   *  `set_floorplan_seat` call this session makes must send as `floorplan:`. */
  floorplanKey: string;
  /** Set in split mode (this session edits ONE vacuum's own `rooms[]`);
   *  undefined in merged mode (the card-level shared `rooms[]`). */
  vacuum?: string;
  /** room_key -> draft, seeded ONCE from every room effectively showing for
   *  this floorplan/vacuum when the session opened (config manual + auto +
   *  any existing override — already merged into `_config` by
   *  `applyFloorplanSeats` by the time the session reads it). */
  rooms: Record<string, RoomDraft>;
  /** Snapshot of `rooms` at open time — never mutated, used by Reset/change
   *  detection. Deliberately a plain object copy, not a `history[0]`, so
   *  Reset stays O(1) regardless of how long the undo stack has grown. */
  start: Record<string, RoomDraft>;
  selected: string | null;
  history: Record<string, RoomDraft>[];
  future: Record<string, RoomDraft>[];
  styleStart: { border_normal: number; border_selected: number };
  styleDraft: { border_normal: number; border_selected: number };
  /** Armed by the toolbar's "Add room" button — the next click-drag on
   *  empty canvas defines the new room's rect (docs/42 §3.3 "nakreslení
   *  nového rectu"), then this clears back to false. */
  drawingNew: boolean;
}

/** Effective (defaulted) room border-width style, mirroring
 *  `effectiveAppearance`'s "always fully populated" discipline — the
 *  Rooms tool session always seeds/sends both fields, never a partial
 *  dict, same "no sentinel" reasoning `room_style` follows on the backend
 *  (see `RoomStyleOverride`'s own doc comment). Defaults match `types.ts`'s
 *  `room_border_normal`/`room_border_selected` field comments (2px/4px) —
 *  the SAME defaults `anyvac-card.ts`'s live `_renderRoomOverlay` already
 *  falls back to (`?? 2`/`?? 4`), not a second, independently-drifting copy. */
export function effectiveRoomStyle(config: {
  room_border_normal?: number;
  room_border_selected?: number;
}): { border_normal: number; border_selected: number } {
  return {
    border_normal: config.room_border_normal ?? 2,
    border_selected: config.room_border_selected ?? 4,
  };
}

// ── Floorplan & Calibrate tool: geometry session (docs/42 §3.3/§9, fáze J1) ─
// J1 ships ONLY the geometry gizmo (`image_base.rotation/scale/offset_x/
// offset_y`). The three calibration methods (docs/39 2/N-point, docs/40 §5.B
// home-frame pairing, fiducials) and the three snapshot/acquisition buttons
// ("Snapshot map as floorplan"/"Snapshot home frame as floorplan"/"Export
// guide layers") the user asked to have ported into the Visual editor too
// are later sub-phases (J2-J4) — docs/42 §9's own phase-table convention of
// shipping one complete, tested slice at a time (H, I, J1, ...) rather than
// one giant phase.

/** docs/42 §3.3/§9 (fáze J1) — the Floorplan & Calibrate tool's geometry
 *  sub-session: `image_base.rotation/scale/offset_x/offset_y`, edited via a
 *  gizmo mechanically identical to the Seat & Appearance tool's own (docs/14
 *  rule 1 — `image_base` has no `scale_y` field, `types.ts`, so its geometry
 *  is exactly a `SeatParams` with `scaleY` always left `undefined`; every
 *  pure gizmo primitive in this file — `seatToMatrix`, `translateSeat`,
 *  `scaleSeatAbout`, `rotateSeatAbout`, `nudgeOffset/Rotation/Scale` — is
 *  reused UNCHANGED). No pinch/anisotropic-stretch gesture: those primitives
 *  (`scaleSeatCornerAniso`/`stretchSeatX/Y`/`localAxisScaleRatio`) exist to
 *  unlock an independent Y scale image_base doesn't have, so the floorplan
 *  gizmo only offers drag/rotate/uniform-scale — same mechanics the Seat
 *  tool's OWN corner handles already fall back to whenever `scaleY` is
 *  unset.
 *
 *  Scope: MERGED mode's card-level `image_base` only. The backend override
 *  this session Saves through (`anyvac.set_floorplan_seat`'s `image_base`
 *  key, `services.py`) is card-level-only by contract — there is no
 *  per-vacuum `image_base` override slot the way `map`/`appearance`/`rooms`
 *  each have one (`FloorplanSeatOverride`/`FloorplanSeatVacuumOverride`
 *  above). Split mode's own per-vacuum `image_base` therefore stays a
 *  Config-editor-only field (its existing numeric sliders) until/unless a
 *  later phase extends that backend contract itself; `anyvac-card.ts`
 *  renders an explanatory placeholder instead of this session there. */
export interface FloorplanEditSession {
  /** `image_base.src` currently in effect — same LIVE semantics as
   *  `AlignSession.floorplan` (see its doc comment); mutated in place by a
   *  fáze J4 snapshot action (and echoed back into `image_base.src` on every
   *  Save — see `_floorplanSave`/`_saveHomeAnchors`/`_clearHomeAnchors`),
   *  never used as a `set_floorplan_seat` key. */
  floorplan: string;
  /** Same STABLE identity key as `AlignSession.floorplanKey` — see its doc
   *  comment. Always copied from `_alignSession.floorplanKey` at open time
   *  (`_openFloorplan`) and never updated afterwards; this is what every
   *  `set_floorplan_seat` call this session makes must send as `floorplan:`. */
  floorplanKey: string;
  start: SeatParams;
  draft: SeatParams;
  history: SeatParams[];
  future: SeatParams[];
  /** Every OTHER key already on `image_base` (`crop_box`, `home_anchors`,
   *  `home_anchors_frame_id`, and anything a future phase adds) — carried
   *  through UNCHANGED on Save. Save resends the WHOLE `image_base` record
   *  (docs/42 §8 bod 3 "no sentinel"), and this sub-phase only edits
   *  geometry. */
  rest: Record<string, unknown>;
}

/** Defaults for `image_base`'s geometry fields — the SAME defaults the
 *  Config editor's own "Floorplan position" sliders already use inline
 *  (`editor.ts`'s `_numberSlider` calls for `ib?.rotation ?? 0` etc.,
 *  docs/14 rule 1: one copy of this default table, not two). `scaleY` is
 *  never set (`image_base` has no `scale_y` field). */
export function effectiveFloorplanGeometry(ib: {
  rotation?: number; scale?: number; offset_x?: number; offset_y?: number;
} | undefined | null): SeatParams {
  return {
    rotation: ib?.rotation ?? 0,
    scale: ib?.scale ?? 100,
    offset_x: ib?.offset_x ?? 0,
    offset_y: ib?.offset_y ?? 0,
  };
}

/** docs/42 §4.3 "Copy YAML zůstávají per-nástroj stejná mechanika" — the
 *  Floorplan tool's ALWAYS-available fallback, mirroring `seatToYaml`
 *  exactly but for `image_base`'s geometry fields only (never `src`/
 *  `crop_box`/`home_anchors` — those are unaffected by this sub-phase and
 *  already sit in the user's own config, same "just the changed fragment"
 *  precedent `seatToYaml` set for `map:`/`appearance:`). Rounded to 0.01,
 *  same precision `seatToYaml` uses. */
export function floorplanGeometryToYaml(geo: SeatParams): string {
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return [
    "image_base:",
    `  rotation: ${r2(geo.rotation)}`,
    `  scale: ${r2(geo.scale)}`,
    `  offset_x: ${r2(geo.offset_x)}`,
    `  offset_y: ${r2(geo.offset_y)}`,
  ].join("\n");
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
 *  doladění without visible "steps" after save). Optionally followed by an
 *  `appearance:` fragment (docs/42 §9 fáze H) when an appearance draft is
 *  given — this is the Copy YAML ALWAYS-available fallback (works with no
 *  service, no HA version requirement), so it needs to carry both halves
 *  of what Save would otherwise send through `anyvac.set_floorplan_seat`. A
 *  `null`/`undefined` field is skipped (not written as a bare key with no
 *  value); an explicit `null` string value (only `path_color`/
 *  `mop_path_color` can be that) is written as `null` so a user pasting
 *  this into config sees the same "no color override" the backend would
 *  store, rather than accidentally clearing the field's YAML entirely. */
export function seatToYaml(seat: SeatParams, appearance?: AppearanceOverride | null): string {
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const lines = [
    "map:",
    `  seat: "manual"`,
    `  rotation: ${r2(seat.rotation)}`,
    `  scale: ${r2(seat.scale)}`,
  ];
  if (seat.scaleY != null) lines.push(`  scale_y: ${r2(seat.scaleY)}`);
  lines.push(`  offset_x: ${r2(seat.offset_x)}`, `  offset_y: ${r2(seat.offset_y)}`);
  if (appearance) {
    const yamlVal = (v: unknown): string | null => {
      if (v === undefined) return null;
      if (v === null) return "null";
      if (typeof v === "string") return `"${v}"`;
      return String(v);
    };
    const order: (keyof AppearanceOverride)[] = [
      "hide_map", "overlay_opacity", "overlay_blend", "path_color", "path_width",
      "mop_path_color", "mop_band_opacity", "mop_band_width",
      "robot_image_on_map", "robot_size", "robot_image_rotation",
    ];
    const appLines = order
      .map((k) => [k, yamlVal(appearance[k])] as const)
      .filter(([, v]) => v !== null)
      .map(([k, v]) => `  ${k}: ${v}`);
    if (appLines.length) lines.push("", "appearance:", ...appLines);
  }
  return lines.join("\n");
}

/** docs/42 §4.3 "Copy YAML zůstávají per-nástroj stejná mechanika" — the
 *  Rooms tool's ALWAYS-available fallback (works with no service, no HA
 *  version requirement), same precedent as `seatToYaml`. Emits a `rooms:`
 *  list (the same shape whether it belongs at the card's top level in
 *  merged mode or under one `vacuums[].rooms` in split mode — the caller
 *  pastes it at the right nesting, this only formats the list itself) plus,
 *  when `style` is given, the two global border-width fields as bare
 *  top-level keys (merged mode only — see `RoomStyleOverride`'s own doc
 *  comment on why these are card-level-only). Rooms are emitted in a stable
 *  order (sorted by key) so repeated copies of an unchanged session produce
 *  byte-identical YAML. */
export function roomsSessionToYaml(
  rooms: Record<string, RoomDraft>,
  style?: { border_normal: number; border_selected: number } | null,
): string {
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const lines: string[] = [];
  const keys = Object.keys(rooms).sort();
  if (keys.length) {
    lines.push("rooms:");
    for (const key of keys) {
      const d = rooms[key];
      lines.push(`  - key: "${key}"`);
      lines.push(`    map_x: ${r1(d.x)}`);
      lines.push(`    map_y: ${r1(d.y)}`);
      lines.push(`    map_w: ${r1(d.w)}`);
      lines.push(`    map_h: ${r1(d.h)}`);
      if (d.areaId != null) lines.push(`    area_id: "${d.areaId}"`);
    }
  }
  if (style) {
    if (lines.length) lines.push("");
    lines.push(`room_border_normal: ${style.border_normal}`);
    lines.push(`room_border_selected: ${style.border_selected}`);
  }
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
/** docs/42 §9 (fáze pre-H) — the Seat & Appearance tool's Appearance
 *  fields, persisted through the SAME backend override as the seat
 *  geometry (`anyvac.set_floorplan_seat`'s `appearance` key), not a new
 *  mechanism. A distinct type from `SeatParams` on purpose — appearance is
 *  a different category of data (map-overlay style, not geometry) even
 *  though both live on the same per-vacuum override entry. Field set
 *  mirrors `VacuumConfig`'s Appearance fields 1:1 (types.ts) — nothing
 *  computed here, only carried through. */
export interface AppearanceOverride {
  hide_map?: boolean;
  overlay_opacity?: number;
  overlay_blend?: string;
  path_color?: string | null;
  path_width?: number;
  mop_path_color?: string | null;
  mop_band_opacity?: number;
  mop_band_width?: number;
  robot_image_on_map?: boolean;
  robot_size?: number;
  robot_image_rotation?: number;
}

/** Minimal vacuum-config shape `effectiveAppearance` reads from — same 11
 *  fields `AppearanceOverride` carries, all still optional (this IS the
 *  as-configured/as-overridden `VacuumConfig`, before any default is
 *  applied). */
export interface AppearanceConfigLike {
  hide_map?: boolean;
  overlay_opacity?: number;
  overlay_blend?: string;
  path_color?: string;
  path_width?: number;
  mop_path_color?: string;
  mop_band_opacity?: number;
  mop_band_width?: number;
  robot_image_on_map?: boolean;
  robot_size?: number;
  robot_image_rotation?: number;
}

/** The Seat & Appearance tool's session-open seeding — every field
 *  defaulted, exactly the same defaults the pre-H Config editor's Maps tab
 *  used inline (`editor.ts`'s `_numberSlider`/`_selectField` calls, now
 *  moved here — docs/42 §9 fáze H, docs/14 rule 1: one copy of the default
 *  table, not two). Always returns all 11 keys — `AlignSession
 *  .appearanceDraft` is never partial (docs/42 §8 bod 3 "no sentinel": Save
 *  always sends the whole dict). */
export function effectiveAppearance(vac: AppearanceConfigLike): Required<Omit<AppearanceOverride, "path_color" | "mop_path_color">> & Pick<AppearanceOverride, "path_color" | "mop_path_color"> {
  return {
    hide_map: vac.hide_map ?? false,
    overlay_opacity: vac.overlay_opacity ?? 55,
    overlay_blend: vac.overlay_blend ?? "normal",
    path_color: vac.path_color ?? null,
    path_width: vac.path_width ?? 100,
    mop_path_color: vac.mop_path_color ?? null,
    mop_band_opacity: vac.mop_band_opacity ?? 28,
    mop_band_width: vac.mop_band_width ?? 100,
    robot_image_on_map: vac.robot_image_on_map ?? false,
    robot_size: vac.robot_size ?? 100,
    robot_image_rotation: vac.robot_image_rotation ?? 0,
  };
}

/** docs/42 §4.4/§8 bod 1 (fáze K) — one room's Rooms-tool override, mirroring
 *  the card's `RoomConfig` rect/anchor fields 1:1 (`map_x/map_y/map_w/map_h`,
 *  `area_id`) — never `outline_pct` (computed-only, never editable/overridable,
 *  docs/40 §4.4) and never `name`/`icon`/`clean_time_*` (per-room METADATA,
 *  §3.2, stays a Config editor field). All optional — a caller may set only
 *  geometry, only `area_id`, or both. */
export interface RoomOverride {
  map_x?: number;
  map_y?: number;
  map_w?: number;
  map_h?: number;
  area_id?: string | null;
}

/** docs/42 §3.3/§9 (fáze I addendum) — the Rooms tool's two GLOBAL
 *  border-width sliders, persisted the same override way as `image_base`
 *  (card-level only, whole-record "no sentinel"), NOT per room_key like
 *  `RoomOverride` above — see `AnyVacCoordinator.set_floorplan_seat`'s
 *  docstring in the integration for why the two follow different contracts. */
export interface RoomStyleOverride {
  border_normal?: number;
  border_selected?: number;
}

/** One per-vacuum override entry — `map` (seat geometry) and `appearance`
 *  (map-overlay style) are independently optional, matching exactly how
 *  the backend stores them (`AnyVacCoordinator.set_floorplan_seat`,
 *  docs/42 §9 fáze pre-H): a vacuum can have only a seat override, only an
 *  appearance override, both, or (once cleared) neither, at which point the
 *  backend drops the entry entirely. `rooms` (fáze K) is independent again,
 *  with its own per-room_key merge semantics — see `RoomOverride` above and
 *  `applyFloorplanSeats`'s room-merging below. */
export interface FloorplanSeatVacuumOverride {
  map?: SeatParams | null;
  appearance?: AppearanceOverride | null;
  rooms?: Record<string, RoomOverride | null | undefined>;
}

export interface FloorplanSeatOverride {
  vacuums?: Record<string, FloorplanSeatVacuumOverride | null | undefined>;
  image_base?: Record<string, unknown> | null;
  /** docs/42 §4.4 (fáze K) — card-level rooms (merged mode), sibling of
   *  `image_base` on the floorplan entry itself rather than nested under a
   *  vacuum — same "vacuum given = per-vacuum, omitted = card-level" split
   *  `image_base` already uses. */
  rooms?: Record<string, RoomOverride | null | undefined>;
  /** docs/42 §3.3/§9 (fáze I addendum) — card-level only, see
   *  `RoomStyleOverride` above. */
  room_style?: RoomStyleOverride;
  updated?: string;
}
export type FloorplanSeats = Record<string, FloorplanSeatOverride | undefined>;

/** Structural room shape this module reads/writes when merging `RoomOverride`
 *  onto a config's `rooms[]` array — only the fields the merge itself
 *  touches (mirrors `RoomConfig`'s rect/anchor fields in `types.ts`, kept
 *  separate/duplicated here per the SAME "dependency-free" convention the
 *  rest of this module's structural types use, docs/14 rule 1 is about not
 *  re-deriving GEOMETRY, not about a second copy of a plain field list). */
export interface SeatEditRoomLike {
  key: string;
  map_x?: number;
  map_y?: number;
  map_w?: number;
  map_h?: number;
  area_id?: string;
  [k: string]: unknown;
}

/** Minimal config shapes this module touches — structural, not the full card
 *  config types (keeps `seatedit.ts` dependency-free), same convention
 *  `seatfit.ts`'s `SeatConfigLike`/`SeatVacuumLike` already use. */
export interface SeatEditVacuumLike {
  entity: string;
  map?: SeatParams & { seat?: "auto" | "manual" };
  image_base?: { src?: string; [k: string]: unknown };
  rooms?: SeatEditRoomLike[];
  [k: string]: unknown;
}
export interface SeatEditConfigLike {
  map_mode?: string;
  image_base?: { src?: string; [k: string]: unknown };
  vacuums?: SeatEditVacuumLike[];
  rooms?: SeatEditRoomLike[];
  room_border_normal?: number;
  room_border_selected?: number;
  [k: string]: unknown;
}

/** docs/42 §4.4/§3.3 — applies one floorplan's `rooms` override map onto a
 *  `RoomConfig[]`-like array, by room_key. A room_key already present in
 *  `rooms` gets its override fields layered on top (geometry/`area_id`
 *  override always wins, same "override > config manual" precedence
 *  `applyFloorplanSeats` already uses for `map`); a room_key with NO
 *  matching config room is a room CREATED entirely from the Visual editor's
 *  Rooms tool (docs/42 §3.3/§8 bod 5 "založit novou místnost") — synthesized
 *  as a minimal room object (its key doubles as display name via the same
 *  `name ?? key` fallback every room-name read site already has, until the
 *  user gives it a proper `name`/icon by adopting it into Config editor —
 *  "dál doladitelné v Config editoru"). Returns the SAME array reference
 *  when the override has nothing to apply (no keys, or keys all `null`/
 *  undefined — the read side never actually publishes a `null` room value,
 *  see `RoomOverride`'s own doc comment, but this stays defensive). */
function mergeRoomOverrides(
  rooms: SeatEditRoomLike[] | undefined,
  overrides: Record<string, RoomOverride | null | undefined> | undefined,
): SeatEditRoomLike[] | undefined {
  if (!overrides) return rooms;
  const base = rooms ? [...rooms] : [];
  const indexByKey = new Map(base.map((r, i) => [r.key, i] as const));
  let changed = false;
  for (const [key, ov] of Object.entries(overrides)) {
    if (!ov) continue;
    changed = true;
    const patch: Partial<SeatEditRoomLike> = {};
    if (ov.map_x !== undefined) patch.map_x = ov.map_x;
    if (ov.map_y !== undefined) patch.map_y = ov.map_y;
    if (ov.map_w !== undefined) patch.map_w = ov.map_w;
    if (ov.map_h !== undefined) patch.map_h = ov.map_h;
    if ("area_id" in ov) patch.area_id = ov.area_id ?? undefined;
    const idx = indexByKey.get(key);
    if (idx !== undefined) {
      base[idx] = { ...base[idx], ...patch };
    } else {
      indexByKey.set(key, base.length);
      base.push({ key, ...patch });
    }
  }
  return changed ? base : rooms;
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
    let next = vac;
    if (override.map) {
      changed = true;
      next = { ...next, map: { ...override.map, seat: "manual" as const } };
    }
    if (override.appearance) {
      changed = true;
      // Appearance fields are flat top-level VacuumConfig fields (types.ts),
      // not nested under a sub-key — same spread-onto-config shape the rest
      // of the card already reads them from.
      next = { ...next, ...override.appearance };
    }
    // docs/42 §4.4 (fáze K) — per-vacuum room overrides (split mode's own
    // rooms). Applies regardless of `map_mode`, same as `map`/`appearance`
    // above — a merged-mode vacuum simply has no `rooms` array of its own
    // for this to touch (`mergeRoomOverrides` is a no-op on `undefined`
    // unless the override itself creates a brand new room).
    if (override.rooms) {
      const mergedRooms = mergeRoomOverrides(next.rooms, override.rooms);
      if (mergedRooms !== next.rooms) {
        changed = true;
        next = { ...next, rooms: mergedRooms };
      }
    }
    return next;
  });
  let imageBase = config.image_base;
  let rooms = config.rooms;
  let roomBorderNormal = config.room_border_normal;
  let roomBorderSelected = config.room_border_selected;
  if (config.map_mode === "merged" && config.image_base?.src) {
    const entry = floorplanSeats[config.image_base.src];
    const ov = entry?.image_base;
    if (ov) {
      imageBase = { ...config.image_base, ...ov };
      changed = true;
    }
    // docs/42 §4.4 (fáze K) — card-level rooms (merged mode's shared room
    // list), sibling of `image_base` on the same floorplan entry.
    if (entry?.rooms) {
      const mergedRooms = mergeRoomOverrides(rooms, entry.rooms);
      if (mergedRooms !== rooms) {
        changed = true;
        rooms = mergedRooms;
      }
    }
    // docs/42 §3.3/§9 (fáze I addendum) — the Rooms tool's global
    // border-width sliders, card-level only, same floorplan-keyed entry.
    if (entry?.room_style) {
      if (entry.room_style.border_normal !== undefined) {
        roomBorderNormal = entry.room_style.border_normal;
        changed = true;
      }
      if (entry.room_style.border_selected !== undefined) {
        roomBorderSelected = entry.room_style.border_selected;
        changed = true;
      }
    }
  }
  if (!changed) return config;
  return {
    ...config,
    vacuums,
    image_base: imageBase,
    rooms,
    room_border_normal: roomBorderNormal,
    room_border_selected: roomBorderSelected,
  };
}
