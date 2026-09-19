import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import type {
  HomeAssistant,
  AnyVacCardConfig,
  VacuumConfig,
  RoomConfig,
  MapConfig,
  CleanAction,
  NativeCleanAction,
  NativeAreaCleanAction,
  NativeAutoCleanAction,
  ScriptCleanAction,
  SettingPreset,
  GlobalPreset,
  GlobalAction,
  GlobalActionCall,
  RoomThreshold,
  HomeFrameAnchor,
} from "./types";
import {
  EDITOR_NAME,
  CARD_VERSION,
  COLOR_HEX,
  DEFAULT_VACUUM_PALETTE,
  ACCENT_PRESETS,
  DEFAULT_ACCENT,
  DEFAULT_THEME,
} from "./const";
import type { CardTheme } from "./const";
import {
  placeRoomInCrop,
  placeRoomsInCrop,
  resolveSeat,
  resolveImageBaseSrc,
  roomBboxToRect,
  buildCalibrationAnchors,
  computeSeatFit,
  canvasScaleForCrop,
  pctToCropPoint,
  homeAnchorFit,
  seatRotateScaleCss,
  isRot90,
  type SeatParams,
  type ResolvedSeat,
  type RoomConfigLike,
} from "./seatfit";
import {
  applyFloorplanSeats,
  effectiveAppearance,
  type FloorplanSeats,
  type SeatEditConfigLike,
} from "./seatedit";
import {
  moveRect,
  resizeRect,
  round1,
  clampPct,
  type Corner,
  type RectPct,
} from "./rectdrag";

// ── Tab type ─────────────────────────────────────────────────────────────────

type ActiveTab = "vacuums" | "maps" | "global" | "debug";

/** Manual seat calibration flow state (docs/39 §8 revision) — see the `_calib`
 *  field docstring on `AnyVacCardEditor` for the full rationale.
 *
 *  N point-pairs, not fixed at 2: with EXACTLY 2 points the transform has no
 *  slack to average out click imprecision — a click a few px off directly
 *  becomes rotation/scale/offset error (field report: a careful 2-point click
 *  still landed at ~4% fit error, visibly "close but not exact"). Extra pairs
 *  feed the SAME least-squares fit (`computeSeatFit` already handles any
 *  `anchors.length >= 2`) and average the noise down — this only changes how
 *  many clicks feed it, not the maths. `phase` says which image accepts the
 *  next click; a pair is complete once `floorPts.length` catches up with
 *  `rawPts.length`. */
type CalibState = {
  vacIdx: number;
  phase: "raw" | "floor";
  rawPts: { x: number; y: number }[];
  floorPts: { x: number; y: number }[];
};

/** Soft cap on calibration point-pairs — plenty for averaging out click
 *  noise; mainly guards the UI against an unbounded list of markers. */
const MAX_CALIB_PAIRS = 6;

/** Cesta B calibration flow state (docs/40 §5.B) — the `CalibState` above's
 *  twin for a FOREIGN-origin floorplan calibrated against the shared home
 *  frame instead of one vacuum's own raw map. Three differences from
 *  `CalibState`, all from docs/40 §5.B: (1) the "raw" side is an on-demand
 *  snapshot of the home frame itself (`_homeCalibSnapshotUrl`/`_homeCalibCrop`/
 *  `_homeCalibFrameId`, fetched once per flow via `_startHomeCalibration`),
 *  shared across every vacuum rather than tied to one — hence this whole
 *  flow lives OUTSIDE `CalibState`'s per-`vacIdx` shape; (2) each frame-side
 *  click is snapped to the nearest wall corner by the backend
 *  (`anyvac.snap_wall_corner`) before it's recorded, so `homePts` already
 *  holds SNAPPED home-frame px, not raw click coordinates; (3) `_finish
 *  HomeCalibration` writes the raw anchor PAIRS to `image_base.home_anchors`
 *  (+ `home_anchors_frame_id`), never a solved seat — the fit is re-run live
 *  every render (`homeAnchorFit`, seatfit.ts) against the frame's CURRENT
 *  size, so it self-heals as the frame grows without asking the user to
 *  re-click. `phase`/pairing convention otherwise mirrors `CalibState`
 *  exactly (a pair completes once `floorPts` catches up with `homePts`). */
type HomeCalibState = {
  phase: "frame" | "floor";
  homePts: { x: number; y: number }[];
  floorPts: { x: number; y: number }[];
};

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_VACUUM: VacuumConfig = {
  entity: "", name: "", color: "green", rooms: [],
  clean_action: { type: "native" },
};

const DEFAULT_ROOM: RoomConfig = {
  key: "", name: "", icon: "mdi:square", map_x: 50, map_y: 50,
};

/** Distinct default icons cycled across newly added/imported rooms (field
 *  report 2026-07-30: every room defaulted to the SAME icon — `mdi:square`
 *  manually, `mdi:floor-plan` on import — making adjacent/overlapping room
 *  rectangles impossible to tell apart while anchoring them on the
 *  floorplan). Numbered rather than thematic (sofa/bed/etc.): there's no
 *  reliable way to guess a room's real type from its name alone, and a
 *  wrong guess (e.g. "bed" on what's actually the kitchen) would confuse
 *  more than a neutral number does. Purely a starting point — `_hexColorField`-
 *  style, the user can still pick any icon per room afterwards. */
const ROOM_ICON_PALETTE = [
  "mdi:numeric-1-circle", "mdi:numeric-2-circle", "mdi:numeric-3-circle",
  "mdi:numeric-4-circle", "mdi:numeric-5-circle", "mdi:numeric-6-circle",
  "mdi:numeric-7-circle", "mdi:numeric-8-circle", "mdi:numeric-9-circle",
  "mdi:numeric-9-plus-circle",
];
function _roomIconFor(index: number): string {
  return ROOM_ICON_PALETTE[Math.min(index, ROOM_ICON_PALETTE.length - 1)];
}

const DEFAULT_MAP: MapConfig = {
  entity: "", rotation: 0, scale: 100, offset_x: 0, offset_y: 0,
};

const DEFAULT_GLOBAL: GlobalAction = {
  name: "Whole flat", color: "orange",
  watch_entities: [],
  action: { type: "script", entity_id: "" },
};

/** Must match the card's built-in defaults in _roomBorderColor() */
const DEFAULT_THRESHOLDS: RoomThreshold[] = [
  { days: 2, color: "#2ecc71" },
  { days: 5, color: "#faad14" },
  { days: 10, color: "#ff9800" },
];

// ── Editor ───────────────────────────────────────────────────────────────────

@customElement(EDITOR_NAME)
export class AnyVacCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AnyVacCardConfig;

  // ── Navigation state ──────────────────────────────────────────────────────
  @state() private _tab: ActiveTab = "vacuums";
  @state() private _dragRoom: { vac: number; idx: number } | null = null;
  // Cleaning-sequence reorder drag state (docs/19) — separate from _dragRoom
  // since this list is keyed by position in the backend-owned room_sequence,
  // not by index into a vacuum's own `rooms` config array.
  @state() private _dragSeq: number | null = null;

  // Accordion open state — always create new instances to trigger Lit reactivity
  @state() private _openVac     = new Set<number>();
  @state() private _openSensors = new Set<number>();
  @state() private _openPresets = new Set<number>();
  @state() private _openAction  = new Set<number>();
  @state() private _openGlobal  = new Set<number>();
  // Per-vacuum: which roomIdx is open (null = none)
  @state() private _openRoom = new Map<number, number | null>();

  // Maps tab state
  @state() private _mapVac  = 0;
  @state() private _mapRoom: number | null = null;
  /** Maps tab: manual override for every horizontal/vertical (↔/↕) slider
   *  label in this tab (Scale, Offset, Image offset, Room position/size).
   *  Editor-local UI state only — never written to config, resets on reload.
   *
   *  Why this exists (2026-09-17 field report): the card auto-rotates its
   *  whole map area 90° when its own rendered box is narrow
   *  (`_mapRotationDeg()`, anyvac-card.ts), independently of any per-vacuum
   *  Rotation value. HA's card-config dialog renders this tab's live preview
   *  in a box of whatever width THAT dialog happens to use, which can easily
   *  differ from the card's real width on the user's own dashboard — so the
   *  preview and the real dashboard can pick different ambient rotations and
   *  disagree on which way is "horizontal". This editor is a separate
   *  component from the live card and has no reliable way to know the real
   *  dashboard's width, so rather than guess, the ↔/↕ labels below default
   *  to tracking Rotation alone (correct whenever both places agree, the
   *  common case) and this toggle lets the user correct all of them at once
   *  when they don't. */
  @state() private _hvSwap = false;
  /** Floorplan natural aspect ratio (W/H) learned from the preview image — used by
   *  the auto-seat fit and to give the preview the correct proportions. */
  @state() private _pvAR = 0;
  /** Floorplan natural pixel size (docs/38 §4.4) — same `@load` handler as `_pvAR`
   *  above, kept alongside it so the crop-box section can warn when the PNG the
   *  user actually saved doesn't match the crop box it's supposedly cut from
   *  (a trimmed/re-exported file, or a crop box left over from a different
   *  floorplan) instead of silently placing rooms that don't line up. */
  @state() private _pvNat: { w: number; h: number } | null = null;
  /** Snapshot of the selected vacuum's live map `entity_picture` (2026-07-26 field
   *  report — flashing risk). Home Assistant rotates this URL on essentially every
   *  entity update, and `hass` itself is a reactive property that re-renders this
   *  editor on every dashboard-wide state change, not just this vacuum's — binding
   *  an `<img src>` straight to the live value made the map preview / reference
   *  overlay reload (visibly flash) constantly while editing, unrelated to what the
   *  user was actually doing. Captured explicitly (tab/vacuum switch, or the
   *  "Refresh reference map" button) instead of read fresh on every render —
   *  see `_snapshotRefMap`. */
  @state() private _refMapUrl = "";
  private _refMapVac = -1;

  /** "Use this vacuum's current map as floorplan" (docs/30 §4a field follow-up,
   *  2026-07-30) — merged mode's per-vacuum auto-seat fit needs a shared
   *  floorplan image, which today meant manually saving a map picture out of
   *  HA and re-uploading it into config/www/. Calls the backend's
   *  `anyvac.snapshot_map_as_floorplan` (integration ≥ 0.88.0) instead. */
  @state() private _floorplanSnapshotBusy = false;
  @state() private _floorplanSnapshotError = "";

  /** "Snapshot home frame as floorplan" (docs/40 §4.4, Fáze 3) — the
   *  home-frame equivalent of `_snapshotFloorplan` above: instead of one
   *  vacuum's own map, renders a composite of every vacuum currently
   *  registered into the shared home frame (`anyvac.snapshot_map_as_
   *  floorplan`, `frame: "home"`, integration ≥ 1.8.0) and records the
   *  frame-shaped `crop_box` (`{frame_id, ...}`) that unlocks the card's
   *  identity rendering for every such vacuum — no per-vacuum seating at
   *  all (`homeFrameCropFor`, seatfit.ts). */
  @state() private _homeFrameSnapshotBusy = false;
  @state() private _homeFrameSnapshotError = "";

  /** "Export guide layers" (docs/37, 2026-09-10) — draws room-boundary/dry/
   *  wet-path guides as transparent PNGs in the SAME pixel canvas as the
   *  floorplan snapshot above, for tracing furniture in an external image
   *  editor (the gaps inside the drawn path are where furniture stands).
   *  Pure drawing aid: unlike `_snapshotFloorplan`, this never touches
   *  config (no `image_base`, no `hide_map`, no `rooms` — docs/37 §2.4). */
  @state() private _guideExportBusy = false;
  @state() private _guideExportError = "";
  @state() private _guideExportResult:
    {
      paths: Record<string, string>; size: { w: number; h: number };
      /** The crop this export actually used, and the entity it was for —
       *  present whenever the integration reports one (≥ 1.5.0). Lets the
       *  "Use this crop for the floorplan" button (docs/38 §4.3) write a
       *  `crop_box` without re-deriving it, and lets the hint show it. */
      crop?: { x0: number; y0: number; x1: number; y1: number };
      entity: string;
    } | null = null;

  /** Result of the last "Place rooms from crop box" click (docs/38 §4.4) —
   *  shown as a one-line confirmation, cleared implicitly on the next click
   *  (a `null` result renders nothing, so there's nothing to reset). */
  @state() private _placeRoomsResult: { placed: number; added: number } | null = null;

  /** Manual seat calibration from clicked points (docs/39) — a narrow
   *  one-time bootstrap for when NO vacuum's auto-fit can converge because the
   *  room anchors on the shared floorplan don't (yet) match any robot's real
   *  room proportions. The user clicks the SAME physical point once on this
   *  vacuum's own raw map, then once on the floorplan photo — repeated for at
   *  least 2 points (more allowed, up to `MAX_CALIB_PAIRS`). Any 2+ point-pairs
   *  fully determine a similarity transform (rotation + one uniform scale +
   *  offset), solved by the exact same least-squares maths the room-anchor
   *  auto-fit already uses (`computeSeatFit`/`buildCalibrationAnchors`,
   *  seatfit.ts) — just fed clicked points instead of name-matched room
   *  bboxes. Originally fixed at exactly 2 points; a field report (a careful
   *  2-point click still landing at ~4% fit error) showed a bare 2 points
   *  leaves no slack to average out click imprecision, so the flow now lets
   *  extra points feed the SAME fit and shows the live fit-error effect of
   *  each one before committing (`_renderCalibStep`). The result is written
   *  as `map.seat: "manual"` with the SOLVED values, not guessed ones, so the
   *  existing "Import missing rooms" button can then place every room
   *  correctly in one click, and (once the floorplan's anchors are accurate)
   *  every other vacuum's own auto-fit self-heals too.
   *
   *  Deliberately distinct from the old removed 3-point align tool (docs/03
   *  "Milník 2", superseded by docs/15 auto-seating): this isn't a persistent
   *  parallel calibration layer, it's a once-per-floorplan bootstrap that
   *  hands off to the existing auto-fit/import pipeline immediately after
   *  solving — nothing about it is saved except the resulting seat. */
  @state() private _calib: CalibState | null = null;

  /** Natural pixel size of the raw reference map image while calibrating —
   *  captured the same way as `_pvNat`, needed to convert a click's
   *  container-relative position into the pixel coordinates
   *  `buildCalibrationAnchors` expects (same space as `bbox_px`). */
  @state() private _refNat: { w: number; h: number } | null = null;

  /** Outcome of the last calibration attempt — a result banner (mirrors
   *  `_placeRoomsResult`) or an error, cleared implicitly on the next attempt. */
  @state() private _calibResult: { residual_pct: number } | null = null;
  @state() private _calibError = "";

  /** Set by `_commitSeat` when a backend `set_floorplan_seat` write fails
   *  (docs/41 follow-up, 1.13.0) — shown near the seating sliders. Left
   *  populated until the next commit attempt; never triggers a silent
   *  fallback to a YAML write, so a failed backend save can't look like it
   *  quietly succeeded elsewhere. */
  @state() private _seatSaveError = "";

  /** Live drag preview for the seat-geometry sliders (1.13.0) — component
   *  state only, never written to `_config`/YAML during a drag. Needed
   *  because once a vacuum's seat is backend-managed, `applyFloorplanSeats`
   *  makes the EFFECTIVE config ignore whatever raw YAML briefly holds
   *  mid-drag (a live backend override always wins, unconditionally) — so
   *  the old "write each `@input` tick straight to YAML, let it re-render"
   *  trick can't drive live visual feedback any more. This holds the
   *  in-progress values instead; `_commitSeat` (on drag-release/blur)
   *  clears it once the real write — backend or YAML fallback — lands. */
  @state() private _seatDraft: {
    vacIdx: number; rotation: number; scale: number; scale_y?: number; offset_x: number; offset_y: number;
  } | null = null;

  /** Cesta B calibration from clicked points against the home frame (docs/40
   *  §5.B) — a card-level flow (not tied to one `vacIdx`, unlike `_calib`
   *  above), since `image_base.home_anchors` lives on the shared floorplan,
   *  not on any one vacuum. See `HomeCalibState`'s own docstring for the
   *  three differences from the docs/39 flow. */
  @state() private _homeCalib: HomeCalibState | null = null;
  /** On-demand home-frame snapshot fetched by `_startHomeCalibration` —
   *  a SCRATCH reference image to click on, never written to `image_base`
   *  (unlike the "Snapshot home frame as floorplan" button, which saves
   *  its snapshot as the floorplan itself for cesta A). `_homeCalibCrop` is
   *  the px extent (home-frame space) that snapshot actually renders —
   *  needed to convert a click on the displayed image back into home-frame
   *  px via `pctToCropPoint`, same re-normalisation `_clickToHomePx` (card)
   *  uses for the same response shape. */
  @state() private _homeCalibSnapshotUrl = "";
  @state() private _homeCalibCrop: { x0: number; y0: number; x1: number; y1: number } | null = null;
  @state() private _homeCalibFrameId = "";
  @state() private _homeCalibBusy = false;
  @state() private _homeCalibError = "";
  @state() private _homeCalibResult: { residual_pct: number } | null = null;

  /** Fiducial-marker workflow (docs/40 §5.A.2) — a third, zero-click way to
   *  populate `image_base.home_anchors`, alongside cesta A's identity crop
   *  and cesta B's manual N-point calibration above. Deliberately deferred
   *  behind both of those ("cheap hack" in the original ratification): a
   *  home-frame snapshot embeds 4 invisible markers in its own padding
   *  border (`anyvac.snapshot_map_as_floorplan`, `fiducials: true`), the
   *  user crops/resizes/ROTATES that file in an external editor same as
   *  any other floorplan photo, and `anyvac.detect_floorplan_fiducials`
   *  resolves the exact resulting scale+offset+rotation with zero clicks —
   *  PROVIDED the file's alpha channel survives the edit intact (a
   *  flattened image, or one re-exported as JPEG, loses the markers).
   *  Writes the SAME `home_anchors`/`home_anchors_frame_id` shape cesta B's
   *  own calibration produces (docs/14 rule 1 — `_renderHomeAnchorOverlay`
   *  and every other cesta B code path need no changes at all here).
   *  `_fiducialKnown` remembers the `{id, home_px}` list the snapshot
   *  step returned, so the later detect step can pass it straight through
   *  unmodified rather than re-deriving it. */
  @state() private _fiducialKnown:
    { frameId: string; markers: { id: string; home_px: { x: number; y: number } }[] } | null = null;
  @state() private _fiducialSnapshotBusy = false;
  @state() private _fiducialSnapshotError = "";
  @state() private _fiducialDetectBusy = false;
  @state() private _fiducialDetectError = "";
  @state() private _fiducialDetectResult: { found: number; missing: string[] } | null = null;

  /** Active drag on a room's position dot / rectangle (2026-07-26 — was
   *  sliders-only, no way to see or drag the actual rectangle extent on the
   *  floorplan preview). `orig` is the room's state at drag START (not updated
   *  mid-drag) so a resize always computes from the anchor corner, not from an
   *  already-moved intermediate value. `seat` is the Maps-tab native-map overlay's
   *  seat, ALSO frozen at drag start (docs/38 §3.3) — `_editorSeat` reads `_config`,
   *  and every pointermove below writes into `_config`, so without a frozen
   *  snapshot the reference the user is aligning against would recompute (and
   *  visibly move) on every single pointermove. */
  private _rectDrag: {
    ri: number;
    mode: "move" | "resize-nw" | "resize-ne" | "resize-sw" | "resize-se";
    container: DOMRect;
    orig: RectPct;
    startClientX: number;
    startClientY: number;
    moved: boolean;
    wasSelected: boolean;
    seat: ResolvedSeat;
  } | null = null;

  private _initialized = false;

  setConfig(config: AnyVacCardConfig): void {
    this._config = config;
    if (!this._initialized) {
      this._initialized = true;
      this._openVac = new Set((config.vacuums ?? []).map((_, i) => i));
    }
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass) {
      const dl = this.shadowRoot?.getElementById("ha-entities") as HTMLDataListElement | null;
      if (dl && !dl.options.length) {
        dl.innerHTML = Object.keys(this.hass.states).sort()
          .map(id => "<option value=\"" + id + "\">")
          .join("");
      }
    }
    // Deliberately keyed off _tab/_mapVac only, NEVER _config or hass — this is
    // what stops the reference map from reloading/flashing on every edit (see
    // `_refMapUrl` docstring). Also covers the very first time the Maps tab is
    // opened (nothing to snapshot yet).
    if (this._tab === "maps" && (changed.has("_tab") || changed.has("_mapVac"))) {
      this._snapshotRefMap();
    }
    // docs/39: an in-progress calibration is tied to one vacuum's raw map —
    // switching tabs or vacuums mid-flow would silently mix two vacuums'
    // points (or leave the banner showing over an unrelated preview), so
    // cancel it outright rather than trying to carry it across.
    if ((changed.has("_tab") || changed.has("_mapVac")) && this._calib) {
      this._calib = null;
    }
    // 1.13.0: a live seat-slider drag preview (`_seatDraft`) is likewise
    // tied to one vacuum — same reasoning as `_calib` above.
    if ((changed.has("_tab") || changed.has("_mapVac")) && this._seatDraft) {
      this._seatDraft = null;
    }
    // docs/40 §5.B: card-level, not tied to `_mapVac` — only cancel on
    // leaving the Maps tab entirely, not on switching which vacuum pill is
    // selected (unlike `_calib` above).
    if (changed.has("_tab") && this._homeCalib) {
      this._homeCalib = null;
    }
    // docs/40 §5.A.2: `_fiducialKnown` only makes sense against the snapshot
    // it was just returned for — leaving the Maps tab and coming back later
    // to a possibly-different `image_base.src` shouldn't silently try to
    // match markers from an unrelated snapshot (a clean "not found" error is
    // still safe, but there's no reason to invite it).
    if (changed.has("_tab") && this._fiducialKnown) {
      this._fiducialKnown = null;
    }
  }

  /** Explicitly (re-)captures the selected vacuum's live map preview URL — see
   *  `_refMapUrl`. Called on Maps-tab/vacuum-selection changes and from the
   *  "Refresh reference map" button; never from a plain re-render. */
  private _snapshotRefMap(): void {
    const vacuums = this._config.vacuums;
    if (!vacuums.length) { this._refMapUrl = ""; this._refMapVac = -1; return; }
    const mapVac = Math.min(this._mapVac, vacuums.length - 1);
    const entity = this._mapEntityFor(vacuums[mapVac]);
    this._refMapUrl = entity
      ? ((this.hass.states[entity]?.attributes["entity_picture"] as string) ?? "") : "";
    this._refMapVac = mapVac;
  }

  /** Snapshots `vac`'s currently-resolved map image entity to a static file via
   *  the backend and sets it as the shared floorplan (`image_base.src`) — see
   *  `_floorplanSnapshotBusy` above for why this exists. Uses the SAME entity
   *  the preview above is already showing (`_mapEntityFor`), so what gets
   *  saved always matches what the user was just looking at. */
  private async _snapshotFloorplan(vac: VacuumConfig): Promise<void> {
    const entity = this._mapEntityFor(vac);
    if (!entity) return;
    this._floorplanSnapshotBusy = true;
    this._floorplanSnapshotError = "";
    try {
      const res = (await (this.hass as any).callService(
        "anyvac", "snapshot_map_as_floorplan",
        { image_entity: entity, name: vac.name || vac.entity },
        undefined, false, true,
      )) as { response?: { path?: string; crop?: { x0: number; y0: number; x1: number; y1: number } } } | undefined;
      const path = res?.response?.path;
      if (!path) throw new Error("no path in service response");
      const crop = res?.response?.crop;
      // docs/38 §4.2: record exactly which crop this floorplan file was cut
      // from (px space, same as rooms[].bbox_px) — read back by "Place rooms
      // from crop box" and passed as `crop` to `anyvac.export_map_guide`, so
      // a later regeneration lines up without asking the user to re-snapshot.
      // Only written when the response actually carries one: an older
      // integration without it leaves any EXISTING crop_box alone rather
      // than clobbering it with nothing.
      this._setEditedImageBase(
        crop ? { src: path, crop_box: { entity: vac.entity, ...crop } } : { src: path },
      );
      // A floorplan photo + everyone's raw map blended on top at once is a
      // wall of noise for a first-time result (field report 2026-07-30) —
      // once a floorplan exists there's nothing the raw map overlay adds
      // that the robot position/path don't already show on their own, so
      // hide it for whoever now shares this floorplan. One-shot side effect
      // of this explicit button click only; never touches existing configs.
      if (this._mergedEdit) {
        const vacuums = this._config.vacuums.map((v) => ({ ...v, hide_map: true }));
        this._setConfig({ vacuums });
      } else {
        const idx = this._config.vacuums.findIndex((v) => v.entity === vac.entity);
        if (idx >= 0) this._setVacuum(idx, { hide_map: true });
      }
      // docs/30 §8 / docs/38 §4.2: place this vacuum's OWN rooms exactly onto
      // the crop we just got back — no dragging needed, and it hands every
      // other vacuum sharing this floorplan real anchors to auto-fit against
      // (by name). Overwrites any existing room of the same name, since a
      // new floorplan crop means new geometry — see `_placeOwnRooms`.
      if (crop) {
        const idx = this._config.vacuums.findIndex((v) => v.entity === vac.entity);
        if (idx >= 0) this._placeOwnRooms(idx, crop);
      }
    } catch (err) {
      this._floorplanSnapshotError =
        "Couldn't snapshot this vacuum's map — make sure the anyvac integration " +
        "is updated to at least 0.88.0, then try again.";
      // eslint-disable-next-line no-console
      console.error("[anyvac-card] snapshot_map_as_floorplan failed:", err);
    } finally {
      this._floorplanSnapshotBusy = false;
    }
  }

  /** Home-frame equivalent of `_snapshotFloorplan` above (docs/40 §4.4,
   *  Fáze 3) — no `image_entity`: the backend renders a composite of every
   *  vacuum currently registered into the shared home frame instead of one
   *  vacuum's own map. No room placement afterwards, unlike the legacy
   *  flow above — a home-frame vacuum's rooms are computed live from
   *  `bbox_home_px`/`outline_home_px` every render (`homeFrameCropFor`,
   *  seatfit.ts), never a one-shot static placement. */
  private async _snapshotHomeFrame(): Promise<void> {
    this._homeFrameSnapshotBusy = true;
    this._homeFrameSnapshotError = "";
    try {
      const res = (await (this.hass as any).callService(
        "anyvac", "snapshot_map_as_floorplan",
        { frame: "home", name: "home_frame" },
        undefined, false, true,
      )) as {
        response?: {
          path?: string; frame_id?: string;
          crop?: { x0: number; y0: number; x1: number; y1: number };
        };
      } | undefined;
      const path = res?.response?.path;
      const frameId = res?.response?.frame_id;
      const crop = res?.response?.crop;
      if (!path || !frameId || !crop) throw new Error("incomplete response — integration too old?");
      this._setEditedImageBase({ src: path, crop_box: { frame_id: frameId, ...crop } });
      // Same rationale as `_snapshotFloorplan`: once the shared floorplan
      // shows every registered vacuum's floor/walls already, each vacuum's
      // own raw map overlay adds nothing but noise on top of it.
      const vacuums = this._config.vacuums.map((v) => ({ ...v, hide_map: true }));
      this._setConfig({ vacuums });
    } catch (err) {
      this._homeFrameSnapshotError =
        "Couldn't snapshot the home frame — make sure at least two vacuums have a " +
        "home-frame registration (integration ≥ 1.8.0, check the 'registration' " +
        "sensor attribute), then try again.";
      // eslint-disable-next-line no-console
      console.error("[anyvac-card] snapshot_map_as_floorplan (frame: home) failed:", err);
    } finally {
      this._homeFrameSnapshotBusy = false;
    }
  }

  /** Step 1 of the fiducial-marker workflow (docs/40 §5.A.2): snapshots the
   *  home frame the SAME way `_snapshotHomeFrame` does, but with
   *  `fiducials: true` — the response's `fiducials` list (where the 4
   *  markers were actually placed, in home px) is remembered in
   *  `_fiducialKnown` for `_detectFiducials` below. Sets it as the
   *  floorplan `src` (same as `_snapshotHomeFrame`) so the user has
   *  something to open and edit externally — unlike cesta A, it does NOT
   *  set a `crop_box`: the whole point is that the file gets
   *  cropped/resized/rotated afterwards, so any crop_box recorded now
   *  would immediately go stale. */
  private async _snapshotHomeFrameWithFiducials(): Promise<void> {
    this._fiducialSnapshotBusy = true;
    this._fiducialSnapshotError = "";
    this._fiducialDetectResult = null;
    try {
      const res = (await (this.hass as any).callService(
        "anyvac", "snapshot_map_as_floorplan",
        { frame: "home", name: "home_frame_fiducial", fiducials: true },
        undefined, false, true,
      )) as {
        response?: {
          path?: string; frame_id?: string;
          fiducials?: { id: string; home_px: { x: number; y: number } }[];
        };
      } | undefined;
      const path = res?.response?.path;
      const frameId = res?.response?.frame_id;
      const markers = res?.response?.fiducials;
      if (!path || !frameId || !markers?.length) throw new Error("incomplete response — integration too old?");
      this._fiducialKnown = { frameId, markers };
      this._setEditedImageBase({ src: path });
    } catch (err) {
      this._fiducialSnapshotError =
        "Couldn't snapshot the home frame with markers — requires anyvac integration ≥ 1.9.0 " +
        "with at least one registered vacuum.";
      // eslint-disable-next-line no-console
      console.error("[anyvac-card] snapshot_map_as_floorplan (fiducials) failed:", err);
    } finally {
      this._fiducialSnapshotBusy = false;
    }
  }

  /** Step 2: scans the CURRENT `image_base.src` (the file the user has since
   *  cropped/resized/rotated externally) for the markers `_fiducialKnown`
   *  says were embedded, and writes whatever it finds as `home_anchors` —
   *  the exact config shape cesta B's own manual calibration produces, so
   *  nothing downstream (`_renderHomeAnchorOverlay`, Pin&Go/zone inversion,
   *  room rendering) needs to know which of the two ever produced it.
   *  Requires `_fiducialKnown` from step 1 in THIS editing session — the
   *  card never stores it in config (it's derivable again any time by
   *  re-running step 1, and storing it would mean one more thing to keep in
   *  sync with the frame as it grows). */
  private async _detectFiducials(): Promise<void> {
    const known = this._fiducialKnown;
    const src = this._config.image_base?.src;
    if (!known || !src) return;
    this._fiducialDetectBusy = true;
    this._fiducialDetectError = "";
    this._fiducialDetectResult = null;
    try {
      const res = (await (this.hass as any).callService(
        "anyvac", "detect_floorplan_fiducials",
        { path: src, fiducials: known.markers },
        undefined, false, true,
      )) as {
        response?: {
          home_anchors?: { home_px: { x: number; y: number }; floor_pct: { x: number; y: number } }[];
          found?: number; missing?: string[];
        };
      } | undefined;
      const anchors = res?.response?.home_anchors;
      if (!anchors?.length) throw new Error("no markers detected");
      this._setEditedImageBase({ home_anchors: anchors, home_anchors_frame_id: known.frameId });
      // Same rationale as `_snapshotHomeFrame`/`_finishHomeCalibration`: once
      // home_anchors resolve every vacuum's position on the shared
      // floorplan, each vacuum's own raw map overlay is redundant.
      const vacuums = this._config.vacuums.map((v) => ({ ...v, hide_map: true }));
      this._setConfig({ vacuums });
      this._fiducialDetectResult = {
        found: res?.response?.found ?? anchors.length,
        missing: res?.response?.missing ?? [],
      };
    } catch (err) {
      this._fiducialDetectError =
        "Couldn't detect markers — make sure the file above still has its alpha channel " +
        "(stayed PNG, wasn't flattened/re-exported as JPEG) and at least 2 of the 4 " +
        "corners survived the crop.";
      // eslint-disable-next-line no-console
      console.error("[anyvac-card] detect_floorplan_fiducials failed:", err);
    } finally {
      this._fiducialDetectBusy = false;
    }
  }

  /** Calls `anyvac.export_map_guide` (docs/37) for `vac`'s currently-resolved
   *  map image entity — the same entity `_snapshotFloorplan` above uses, so
   *  the guide layers line up with the floorplan photo it produced. No
   *  config side effects: unlike `_snapshotFloorplan` this never sets
   *  `image_base`, `hide_map`, or `rooms` (docs/37 §2.4).
   *
   *  docs/38 §4.3: when the currently-viewed floorplan already has a
   *  `crop_box` for THIS SAME entity, that exact crop is sent along so the
   *  layers line up with the saved PNG even if the robot has remapped since
   *  (a different crop box means a different pixel space — docs/37 §6's
   *  "sedí na floorplan, i když robot mezitím přemapoval"). A crop_box for a
   *  different entity, or none at all, is left for the backend to derive. */
  private async _exportMapGuide(vac: VacuumConfig): Promise<void> {
    const entity = this._mapEntityFor(vac);
    if (!entity) return;
    this._guideExportBusy = true;
    this._guideExportError = "";
    this._guideExportResult = null;
    const cropBox = this._currentImageBase()?.crop_box;
    const sendCrop = cropBox && "entity" in cropBox && cropBox.entity === vac.entity
      ? { x0: cropBox.x0, y0: cropBox.y0, x1: cropBox.x1, y1: cropBox.y1 }
      : undefined;
    try {
      const data: Record<string, unknown> = { image_entity: entity, name: vac.name || vac.entity };
      if (sendCrop) data.crop = sendCrop;
      const res = (await (this.hass as any).callService(
        "anyvac", "export_map_guide", data, undefined, false, true,
      )) as {
        response?: {
          paths?: Record<string, string>; size?: { w: number; h: number };
          crop?: { x0: number; y0: number; x1: number; y1: number };
        };
      } | undefined;
      const paths = res?.response?.paths;
      const size = res?.response?.size;
      if (!paths || !size || !Object.keys(paths).length) {
        throw new Error("no guide layers in service response");
      }
      this._guideExportResult = { paths, size, crop: res?.response?.crop, entity: vac.entity };
    } catch (err) {
      this._guideExportError =
        "Couldn't export guide layers — make sure the anyvac integration " +
        "is updated to at least 1.4.0, then try again.";
      // eslint-disable-next-line no-console
      console.error("[anyvac-card] export_map_guide failed:", err);
    } finally {
      this._guideExportBusy = false;
    }
  }

  // ── Config helpers ────────────────────────────────────────────────────────

  private _fire(config: AnyVacCardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  private _setConfig(updates: Partial<AnyVacCardConfig>): void {
    const next = { ...this._config, ...updates };
    this._config = next; this._fire(next);
  }

  private _setVacuum(idx: number, updates: Partial<VacuumConfig>): void {
    const vacuums = [...this._config.vacuums];
    vacuums[idx] = { ...vacuums[idx], ...updates };
    const next = { ...this._config, vacuums };
    this._config = next; this._fire(next);
  }

  private _setMap(vacIdx: number, updates: Partial<MapConfig>): void {
    const existing = this._config.vacuums[vacIdx].map ?? { ...DEFAULT_MAP };
    this._setVacuum(vacIdx, { map: { ...existing, ...updates } });
  }

  private _setImageBase(vacIdx: number, updates: Partial<NonNullable<VacuumConfig["image_base"]>>): void {
    const existing = this._config.vacuums[vacIdx].image_base ?? { src: "" };
    this._setVacuum(vacIdx, { image_base: { ...existing, ...updates } });
  }

  private get _mergedEdit(): boolean { return this._config.map_mode === "merged"; }
  private _editRooms(): RoomConfig[] {
    if (this._mergedEdit) return this._config.rooms ?? [];
    const vac = this._config.vacuums[Math.min(this._mapVac, this._config.vacuums.length - 1)];
    return vac?.rooms ?? [];
  }
  private _setEditedRoom(roomIdx: number, updates: Partial<RoomConfig>): void {
    if (this._mergedEdit) {
      const rooms = [...(this._config.rooms ?? [])];
      rooms[roomIdx] = { ...rooms[roomIdx], ...updates };
      this._setConfig({ rooms });
    } else {
      this._setRoom(Math.min(this._mapVac, this._config.vacuums.length - 1), roomIdx, updates);
    }
  }
  /** Pointer down on a room's dot/rectangle on the map preview (2026-07-26 —
   *  was slider-only, no way to see OR drag the actual rectangle extent).
   *  Selects the room immediately (so a plain tap still works like the old
   *  click-to-select) and arms a potential drag; `pointermove`/`pointerup`
   *  (below) decide whether it turns into an actual move/resize or stays a
   *  tap. Pointer capture on the element itself means drags that leave its
   *  bounds keep being tracked, without needing a full-container overlay. */
  private _onRoomPointerDown(
    ri: number,
    mode: "move" | "resize-nw" | "resize-ne" | "resize-sw" | "resize-se",
    room: RoomConfig,
    e: PointerEvent,
  ): void {
    e.stopPropagation();
    const container = (e.currentTarget as HTMLElement).closest(".map-pos-container");
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const wasSelected = this._mapRoom === ri;
    this._mapRoom = ri;

    // The corner-handle dots (`.room-rect-handle`) only render once a room is
    // already selected/"active" — kept that way so the preview doesn't grow
    // four extra dots on every room at once. That means a user's very FIRST
    // press near a corner of a not-yet-selected room always landed on the
    // room BODY (mode "move"), since there was no handle there yet to
    // actually grab — reported field confusion 2026-07-30 ("grabbing a
    // corner moves the whole thing, not just that corner"). Fix: detect a
    // near-corner press on the body itself (same ~16px radius as the real
    // handle dot) and treat it as a resize of that corner instead, so the
    // very first press already behaves correctly.
    let effectiveMode = mode;
    if (mode === "move" && room.map_w != null) {
      const px = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const py = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      const cx = room.map_x ?? 50, cy = room.map_y ?? 50;
      const halfW = room.map_w / 2, halfH = (room.map_h ?? 15) / 2;
      const rX = (16 / containerRect.width) * 100, rY = (16 / containerRect.height) * 100;
      const nearLeft = Math.abs(px - (cx - halfW)) <= rX;
      const nearRight = Math.abs(px - (cx + halfW)) <= rX;
      const nearTop = Math.abs(py - (cy - halfH)) <= rY;
      const nearBottom = Math.abs(py - (cy + halfH)) <= rY;
      if (nearLeft && nearTop) effectiveMode = "resize-nw";
      else if (nearRight && nearTop) effectiveMode = "resize-ne";
      else if (nearLeft && nearBottom) effectiveMode = "resize-sw";
      else if (nearRight && nearBottom) effectiveMode = "resize-se";
    }

    const mapVac = Math.min(this._mapVac, this._config.vacuums.length - 1);
    this._rectDrag = {
      ri, mode: effectiveMode,
      container: containerRect,
      orig: { x: room.map_x ?? 50, y: room.map_y ?? 50, w: room.map_w ?? 0, h: room.map_h ?? 0 },
      startClientX: e.clientX, startClientY: e.clientY,
      moved: false, wasSelected,
      // docs/38 §3.3 — see the `_rectDrag` field docstring above.
      seat: this._editorSeat(mapVac),
    };
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }

  private _onRoomPointerMove(e: PointerEvent): void {
    const d = this._rectDrag;
    if (!d) return;
    if (!d.moved) {
      // A few px of slop before committing to "this is a drag, not a tap" —
      // avoids the pointerdown's small inevitable jitter re-writing config
      // (and re-rendering) on every single click.
      if (Math.hypot(e.clientX - d.startClientX, e.clientY - d.startClientY) < 3) return;
      d.moved = true;
    }
    // docs/38 §3.1/§3.2: delta from pointerdown, as % of the container —
    // NEVER the pointer's absolute position. The old code wrote the
    // absolute cursor position straight into map_x/map_y, which snapped the
    // rect's CENTRE under the cursor the instant a drag started anywhere
    // off-centre (the "bboxy poskakují" field report, docs/38 §1). The
    // actual move/resize math (including rounding + clamping) now lives in
    // rectdrag.ts, unit-tested independently of this pointer plumbing.
    const dx = ((e.clientX - d.startClientX) / d.container.width) * 100;
    const dy = ((e.clientY - d.startClientY) / d.container.height) * 100;
    if (d.mode === "move") {
      const { map_x, map_y } = moveRect(d.orig, dx, dy);
      this._setEditedRoom(d.ri, { map_x, map_y });
      return;
    }
    const corner = d.mode.slice("resize-".length) as Corner;
    const { map_x, map_y, map_w, map_h } = resizeRect(d.orig, corner, dx, dy);
    this._setEditedRoom(d.ri, { map_x, map_y, map_w, map_h });
  }

  private _onRoomPointerUp(): void {
    const d = this._rectDrag;
    if (d && !d.moved && d.wasSelected) {
      // A genuine tap (no drag) on an already-selected room deselects it —
      // matches the old dot's click-to-toggle behaviour.
      this._mapRoom = null;
    }
    // docs/38 §3.3: the native-map overlay froze at pointerdown (`d.seat`).
    // Force a re-render now so it re-fits against the room's final position
    // instead of staying stuck at that frozen snapshot until some unrelated
    // `hass` update happens to come through.
    if (d?.moved) this.requestUpdate();
    this._rectDrag = null;
  }

  private _addEditedRoom(): void {
    if (this._mergedEdit) {
      const existing = this._config.rooms ?? [];
      const rooms = [...existing, { ...DEFAULT_ROOM, icon: _roomIconFor(existing.length) }];
      this._setConfig({ rooms });
      this._mapRoom = rooms.length - 1;
    } else {
      this._addRoom(Math.min(this._mapVac, this._config.vacuums.length - 1));
      this._mapRoom = (this._config.vacuums[this._mapVac]?.rooms?.length ?? 1) - 1;
    }
  }
  private _deleteEditedRoom(roomIdx: number): void {
    if (this._mergedEdit) {
      const rooms = (this._config.rooms ?? []).filter((_, i) => i !== roomIdx);
      this._setConfig({ rooms });
      if (this._mapRoom === roomIdx) this._mapRoom = null;
    } else {
      this._deleteRoom(Math.min(this._mapVac, this._config.vacuums.length - 1), roomIdx);
    }
  }
  /** docs/32 follow-up: GUI toggle for the persisted `layout.<profile>.crop.flip`
   *  default — merges rather than replacing, so it never clobbers other crop
   *  fields (`fit`/`offset_x`/`offset_y`/`mapOrientation`) that only YAML sets
   *  today. `flip: false` is written as `undefined` to keep the config clean
   *  (matches the field's own `=== true` default-off semantics). */
  private _setLayoutFlip(profile: "portrait" | "landscape", flip: boolean): void {
    const layout = this._config.layout ?? {};
    const profileCfg = layout[profile] ?? {};
    const crop = { ...(profileCfg.crop ?? {}), flip: flip ? true : undefined };
    this._setConfig({ layout: { ...layout, [profile]: { ...profileCfg, crop } } });
  }
  private _setEditedImageBase(updates: Partial<NonNullable<VacuumConfig["image_base"]>>): void {
    if (this._mergedEdit) {
      this._setConfig({ image_base: { ...(this._config.image_base ?? { src: "" }), ...updates } });
    } else {
      this._setImageBase(Math.min(this._mapVac, this._config.vacuums.length - 1), updates);
    }
  }
  /** The `image_base` currently in view in the Maps tab — card-level in
   *  merged mode, else the selected vacuum's own (docs/38 §4: one shared
   *  accessor so the crop-box status line, "Place rooms from crop box"
   *  gating, and the guide-export `crop` parameter all agree on which
   *  floorplan is on screen, rather than three call sites redoing the same
   *  merged/split branch). */
  private _currentImageBase(): NonNullable<VacuumConfig["image_base"]> | undefined {
    const vacuums = this._config.vacuums;
    if (!vacuums.length) return undefined;
    const mapVac = Math.min(this._mapVac, vacuums.length - 1);
    return this._mergedEdit ? this._config.image_base : vacuums[mapVac].image_base;
  }
  // ── Auto-seating (docs/15) ────────────────────────────────────────────────
  // NOTE: the old 3-point align tool (v0.17) was removed — it was orphaned code
  // (never wired into the UI, which is why it "never worked"). Its similarity-fit
  // maths lives on in seatfit.ts, now fed automatically by room anchors.

  private _editorAR(): number {
    return this._pvAR > 0.1 ? this._pvAR : 3.636;
  }

  /** Integration sensor for a vacuum: explicit config, else auto-resolved from the
   *  entity registry — the AnyVac map sensor sits on the same device as the vacuum
   *  entity (platform "anyvac"; same rule as the card, docs/14 Fáze 3). */
  private _intEntityFor(vac: { entity: string; integration_entity?: string } | undefined): string | undefined {
    if (!vac) return undefined;
    if (vac.integration_entity) return vac.integration_entity;
    const reg = (this.hass as any)?.entities as Record<string, any> | undefined;
    const dev = reg?.[vac.entity]?.device_id;
    return dev
      ? Object.keys(reg!).find(
          (id) => reg![id]?.device_id === dev && reg![id]?.platform === "anyvac" && id.startsWith("sensor.")
        )
      : undefined;
  }

  /** Mirrors the card's `_mapEntityFor` (2026-07-30 onboarding audit, docs/30 §2.1)
   *  so the Maps tab preview/hints reflect the same auto-resolved entity the card
   *  will actually use, not just what's explicitly typed into the picker below. */
  private _mapEntityFor(vac: { entity: string; map?: { entity: string } } | undefined): string | undefined {
    if (!vac) return undefined;
    if (vac.map?.entity) return vac.map.entity;
    const reg = (this.hass as any)?.entities as Record<string, any> | undefined;
    const dev = reg?.[vac.entity]?.device_id;
    if (!dev) return undefined;
    const candidates = Object.keys(reg!).filter(
      (id) => reg![id]?.device_id === dev && id.startsWith("image.")
    );
    const live = candidates.filter((id) => {
      const st = this.hass.states[id];
      return !!st && st.state !== "unavailable" && st.state !== "unknown" && !!st.attributes["entity_picture"];
    });
    return live.length === 1 ? live[0] : (candidates.length === 1 ? candidates[0] : undefined);
  }

  /** The home frame to calibrate cesta B against (docs/40 §5.B) — mirrors
   *  the card's own `_homeFrameDims()` (anyvac-card.ts) exactly: the frame
   *  with the most currently-registered vacuums, read off each configured
   *  vacuum's `home_frame` sensor attribute. No `home_anchors_frame_id`
   *  override here (unlike the card) — that field only exists once cesta B
   *  has already been calibrated once, and this is what establishes it. */
  private _anyHomeFrame(): { id: string; w: number; h: number } | null {
    const byId = new Map<string, { w: number; h: number; count: number }>();
    for (const v of this._config.vacuums ?? []) {
      const ie = this._intEntityFor(v);
      const hf = (ie ? (this.hass.states[ie]?.attributes as Record<string, any> | undefined) : undefined)
        ?.home_frame as { id?: string; width_px?: number; height_px?: number } | null | undefined;
      if (!hf?.id || !(hf.width_px! > 0) || !(hf.height_px! > 0)) continue;
      const cur = byId.get(hf.id);
      if (cur) cur.count++;
      else byId.set(hf.id, { w: hf.width_px!, h: hf.height_px!, count: 1 });
    }
    let best: { id: string; w: number; h: number; count: number } | null = null;
    for (const [id, f] of byId) if (!best || f.count > best.count) best = { id, ...f };
    return best ? { id: best.id, w: best.w, h: best.h } : null;
  }

  /** Backend-owned room cleaning sequence (docs/19): {room_key: 1-based position},
   *  read from the AnyVac sensor. It's coordinator-wide (same value on every
   *  vacuum's sensor), so any vacuum with the integration works as the source. */
  private _roomSequence(vac: { entity: string; integration_entity?: string } | undefined): Record<string, number> {
    const ie = this._intEntityFor(vac);
    const at = ie ? (this.hass?.states?.[ie]?.attributes as Record<string, any> | undefined) : undefined;
    return (at?.room_sequence as Record<string, number> | undefined) ?? {};
  }

  /** Rooms ordered for display in the sequence list: sequenced ones first (by
   *  position), then anything not yet sequenced in its existing config order. */
  private _roomsInSequenceOrder(rooms: RoomConfig[], seqMap: Record<string, number>): RoomConfig[] {
    return rooms
      .map((r, i) => ({ r, i, s: r.key ? seqMap[r.key] ?? Infinity : Infinity }))
      .sort((a, b) => (a.s !== b.s ? a.s - b.s : a.i - b.i))
      .map((x) => x.r);
  }

  /** Reorder the sequence list and push the whole new order to the backend
   *  (anyvac.set_room_sequence) — it's coordinator state, not card config, so
   *  there's nothing to write to `_config` here (docs/19, mirrors room_pins). */
  private _moveSequence(vac: { entity: string; integration_entity?: string }, ordered: RoomConfig[], from: number, to: number): void {
    if (from === to) return;
    const keys = ordered.map((r) => r.key).filter((k): k is string => !!k);
    if (from < 0 || from >= keys.length || to < 0 || to >= keys.length) return;
    const [moved] = keys.splice(from, 1);
    keys.splice(to, 0, moved);
    void this.hass.callService("anyvac", "set_room_sequence", { rooms: keys });
  }

  /** Editor-side view of the effective seat.
   *
   *  Delegates to the SAME `resolveSeat()` the card runs (1.1.0). This used to be
   *  a parallel implementation and had drifted from the card's in two ways — no
   *  first-vacuum `image_base` fallback, and anchors chosen by `map_mode` rather
   *  than by whether card-level `rooms` exist — so the preview here could show a
   *  different placement than the card actually rendered. */
  private _editorSeat(vacIdx: number): SeatParams & {
    auto: boolean; residual?: number; anchorCount?: number;
  } {
    // 1.13.0: resolves against the EFFECTIVE (backend-override-merged)
    // config, not the raw one — see `_effectiveConfig`'s docstring for why.
    // Before this fix, this preview (and the "Auto-fit"/sliders hint text
    // below it) was blind to a live backend seat: it could show a manual
    // fit that visually contradicted what the card itself was rendering,
    // which is what prompted this whole sync feature.
    const cfg = this._effectiveConfig();
    const vac = cfg.vacuums[vacIdx];
    const ie = this._intEntityFor(vac);
    const at = ie ? (this.hass?.states?.[ie]?.attributes as Record<string, any> | undefined) : undefined;
    // Kontrakt v2 gate: anchors need rooms[].bbox_px (integration ≥ 0.18). The
    // card applies the same gate inside `_intAttrs`; here it's explicit.
    const gated = at && (at.schema_version ?? 0) >= 2 ? at : undefined;
    return resolveSeat(cfg, vac, gated, this._editorAR());
  }

  /** Availability gate for the backend seat-geometry service — mirrors the
   *  card's own `_alignServiceAvailable` (anyvac-card.ts) exactly, same
   *  existence-check HA's more-info dialogs use for "is this service
   *  registered right now". */
  private _seatServiceAvailable(): boolean {
    return !!this.hass?.services?.["anyvac"]?.["set_floorplan_seat"];
  }

  /** The backend's current `floorplan_seats` overrides dict, read the same
   *  way the card's `_syncEffectiveConfig` (anyvac-card.ts) does: any one
   *  configured vacuum with a live integration sensor carries the whole
   *  dict as an attribute, so the first one found is enough. */
  private _floorplanSeatsNow(): FloorplanSeats | undefined {
    for (const vac of this._config.vacuums) {
      const ie = this._intEntityFor(vac);
      const at = ie ? (this.hass?.states?.[ie]?.attributes as Record<string, any> | undefined) : undefined;
      const fs = at?.floorplan_seats as FloorplanSeats | undefined;
      if (fs) return fs;
    }
    return undefined;
  }

  /** `this._config` merged with any live backend `floorplan_seats`
   *  override, via the SAME `applyFloorplanSeats` the card itself uses
   *  (`_syncEffectiveConfig`, anyvac-card.ts) — for DISPLAY/PREVIEW only
   *  (`_editorSeat`'s fit + the Maps-tab overlay it feeds). Never assign
   *  this to `this._config` and never pass it to `_fire` — doing so would
   *  silently bake backend-owned values into the saved YAML, exactly the
   *  dual-source-of-truth confusion this feature exists to remove. Cheap
   *  to call per-render: `applyFloorplanSeats` returns the SAME object
   *  unchanged when nothing in this config has a live override. */
  private _effectiveConfig(): AnyVacCardConfig {
    const seats = this._floorplanSeatsNow();
    if (!seats) return this._config;
    return applyFloorplanSeats(this._config as unknown as SeatEditConfigLike, seats) as unknown as AnyVacCardConfig;
  }

  /** True once this vacuum's seat is actually backend-managed (a live
   *  override exists for it on its current floorplan) — as opposed to the
   *  backend merely being *available* (service registered, but nothing
   *  saved there for this vacuum yet). Drives the Maps-tab banner and
   *  which seating controls still make sense to show. */
  private _hasBackendSeat(vacIdx: number): boolean {
    const vac = this._config.vacuums[vacIdx];
    const src = resolveImageBaseSrc(this._config, vac);
    if (!src) return false;
    const seats = this._floorplanSeatsNow();
    return !!seats?.[src]?.vacuums?.[vac.entity];
  }

  /** Strips this vacuum's manual geometry fields from YAML — called once a
   *  backend write for them has succeeded, so there is exactly one place
   *  they live from then on. Keeps `map.entity` (the unrelated "map image
   *  entity" override, docs/38 §4.1) when set; drops the whole `map:`
   *  block when nothing else is left in it. */
  private _stripSeatGeometry(vacIdx: number): void {
    const vac = this._config.vacuums[vacIdx];
    const existing = vac.map;
    if (!existing) return;
    this._setVacuum(vacIdx, { map: existing.entity ? { entity: existing.entity } : undefined });
  }

  /** Redirects manual seat-geometry writes — the sliders' drag-release/blur
   *  commit and "Finish calibration" — to the backend when
   *  `anyvac.set_floorplan_seat` is registered, instead of this card's own
   *  YAML `map:` fields (docs/41 follow-up, 1.13.0).
   *
   *  Why: `applyFloorplanSeats` (used by the card's `_syncEffectiveConfig`
   *  and now by this editor's own `_effectiveConfig`) always lets a live
   *  backend override win over whatever YAML says — unconditionally, with
   *  no check of this vacuum's own `seat` field. So a value written only to
   *  YAML while a backend override exists was already being silently
   *  shadowed, with nothing in the UI explaining why — the exact confusion
   *  the user flagged. Now there is exactly one writer at a time: once the
   *  service call below succeeds, the just-written YAML geometry fields are
   *  stripped (`_stripSeatGeometry`) so the backend becomes the only place
   *  they live going forward.
   *
   *  On failure, YAML is left exactly as the drag/typing already wrote it
   *  (each slider's own live `@input`/`@change` handler, unchanged) and
   *  `_seatSaveError` is set — no silent fallback write, so a failed
   *  backend save can never look like it quietly succeeded as a YAML edit
   *  instead. Falls back to a direct YAML write ONLY when the service isn't
   *  registered at all (older backend, or no anyvac integration configured)
   *  — same gate Align mode's own Save button already uses. */
  private async _commitSeat(
    vacIdx: number,
    geometry: { rotation: number; scale: number; scale_y?: number; offset_x: number; offset_y: number },
    opts: { forceManualYaml?: boolean } = {},
  ): Promise<void> {
    const vac = this._config.vacuums[vacIdx];
    const src = resolveImageBaseSrc(this._config, vac);
    if (this._seatServiceAvailable() && src) {
      const map: Record<string, number> = {
        rotation: Math.round(geometry.rotation * 100) / 100,
        scale: Math.round(geometry.scale * 100) / 100,
        offset_x: Math.round(geometry.offset_x * 100) / 100,
        offset_y: Math.round(geometry.offset_y * 100) / 100,
      };
      if (geometry.scale_y != null) map.scale_y = Math.round(geometry.scale_y * 100) / 100;
      // docs/42 §8 bod 3 "no sentinel": the backend clears `appearance`
      // whenever a call omits it, so a seat-only commit from here MUST
      // resend whatever appearance is CURRENTLY in effect (from the
      // override-merged vacuum, `_effectiveConfig` — not raw YAML, which
      // would resend stale values whenever a live override differs from
      // it) or it would silently wipe out any Appearance customisation
      // made through the Visual editor's Seat & Appearance tool the next
      // time a Maps-tab slider commits a seat change.
      const effectiveVac = this._effectiveConfig().vacuums[vacIdx] ?? vac;
      const appearance = effectiveAppearance(effectiveVac);
      try {
        await this.hass.callService("anyvac", "set_floorplan_seat", {
          floorplan: src, vacuum: vac.entity, map, appearance,
        });
        this._seatSaveError = "";
        this._stripSeatGeometry(vacIdx);
      } catch (err) {
        console.warn("[anyvac-card] editor: set_floorplan_seat call failed", err);
        this._seatSaveError = "Couldn't save to the backend — try again. The values shown are unchanged.";
      }
      return;
    }
    const updates: Partial<MapConfig> = { ...geometry };
    if (opts.forceManualYaml) updates.seat = "manual";
    this._setMap(vacIdx, updates);
  }

  /** Import rooms this vacuum's map knows that are missing on the floorplan —
   *  placed through the vacuum's current (auto or manual) seat. Works both for the
   *  initial import from the reference robot and for supplementing rooms only
   *  another robot has (its seat must exist: shared rooms or manual seating). */
  private _importRooms(vacIdx: number): void {
    const vac = this._config.vacuums[vacIdx];
    const ie = this._intEntityFor(vac);
    const at = ie ? (this.hass.states[ie]?.attributes as Record<string, any> | undefined) : undefined;
    const intRooms: Array<Record<string, any>> = Array.isArray(at?.rooms) ? at!.rooms : [];
    // Kontrakt v2: the import places rooms via bbox_px (integration ≥ 0.18).
    if (!at || (at.schema_version ?? 0) < 2 || !intRooms.length) return;
    const ar = this._editorAR();
    const seat = this._editorSeat(vacIdx);
    const target = this._mergedEdit ? [...(this._config.rooms ?? [])] : [...(vac.rooms ?? [])];
    const have = new Set(target.map((r) => r.key));
    let added = 0;
    for (const ir of intRooms) {
      const nm = ir?.name as string | undefined;
      if (!nm || have.has(nm)) continue;
      const rect = roomBboxToRect(ir, at, seat, ar);
      if (!rect) continue;
      target.push({ key: nm, name: nm, icon: _roomIconFor(target.length), ...rect });
      have.add(nm);
      added++;
    }
    if (!added) return;
    if (this._mergedEdit) this._setConfig({ rooms: target });
    else this._setVacuum(vacIdx, { rooms: target });
  }

  // ── Manual calibration from clicked points (docs/39) ──────────────────────

  /** Starts the click flow for `vacIdx` — see `_calib` field docstring. */
  private _startCalibration(vacIdx: number): void {
    this._calib = { vacIdx, phase: "raw", rawPts: [], floorPts: [] };
    this._calibResult = null;
    this._calibError = "";
    this._mapRoom = null;
  }

  private _cancelCalibration(): void {
    this._calib = null;
  }

  /** Click on the raw-map calibration preview (`phase === "raw"`) — records
   *  the click in the raw map's own natural pixel space via `_refNat`, same
   *  convention `buildCalibrationAnchors` expects. Silently ignored if the
   *  reference image hasn't reported its natural size yet (its `@load` hasn't
   *  fired) — practically instant, but avoids recording a garbage point. */
  private _onCalibRawClick(e: MouseEvent): void {
    const c = this._calib;
    if (!c || c.phase !== "raw" || !this._refNat || c.rawPts.length >= MAX_CALIB_PAIRS) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const pt = { x: nx * this._refNat.w, y: ny * this._refNat.h };
    this._calib = { ...c, rawPts: [...c.rawPts, pt], phase: "floor" };
  }

  /** Click on the floorplan calibration preview (`phase === "floor"`) —
   *  same container-percentage convention as room placement (0.1% precision,
   *  docs/38 §2). Completes the pair and hands control back to the "raw"
   *  phase — the decision to add another pair or save is the user's, made
   *  from the live fit-error preview (`_renderCalibStep`), not automatic. */
  private _onCalibFloorClick(e: MouseEvent): void {
    const c = this._calib;
    if (!c || c.phase !== "floor") return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = round1(clampPct(((e.clientX - rect.left) / rect.width) * 100));
    const y = round1(clampPct(((e.clientY - rect.top) / rect.height) * 100));
    this._calib = { ...c, floorPts: [...c.floorPts, { x, y }], phase: "raw" };
  }

  /** Removes the last CLICKED point (whichever image it's on) — lets a
   *  mis-click be corrected without restarting the whole flow. */
  private _undoCalibPoint(): void {
    const c = this._calib;
    if (!c) return;
    if (c.phase === "floor" && c.rawPts.length > c.floorPts.length) {
      this._calib = { ...c, rawPts: c.rawPts.slice(0, -1), phase: "raw" };
    } else if (c.floorPts.length > 0) {
      this._calib = { ...c, floorPts: c.floorPts.slice(0, -1) };
    }
  }

  /** Live fit-error preview over whatever complete pairs exist so far — lets
   *  the user see the effect of adding one more point BEFORE committing to
   *  anything (docs/39 §8 revision). Returns `null` below 2 complete pairs
   *  (nothing to fit yet). */
  private _calibPreview(calib: CalibState): { residual_pct: number } | null {
    const n = Math.min(calib.rawPts.length, calib.floorPts.length);
    if (n < 2 || !this._refNat) return null;
    const ar = this._editorAR();
    const anchors = buildCalibrationAnchors(
      calib.rawPts.slice(0, n), calib.floorPts.slice(0, n),
      { NW: this._refNat.w, NH: this._refNat.h }, ar,
    );
    const fit = computeSeatFit(anchors, ar);
    return fit ? { residual_pct: Math.round(fit.residual_pct * 10) / 10 } : null;
  }

  /** Solves the similarity transform from every complete pair collected so
   *  far and writes it as a manual seat. Reuses `computeSeatFit` unchanged —
   *  it already least-squares-fits any `anchors.length >= 2` — so 2 pairs
   *  behave exactly as the original design, and each extra pair just adds
   *  another row to that same fit, averaging down click imprecision (the
   *  field report this revision responds to: a careful 2-point click still
   *  landed at ~4% fit error). The result behaves exactly like a well-fitted
   *  auto seat (same rotation-snap-to-90° convention), just bootstrapped from
   *  clicks instead of room names. */
  private _finishCalibration(): void {
    const c = this._calib;
    if (!c) return;
    const n = Math.min(c.rawPts.length, c.floorPts.length);
    this._calib = null;
    if (!this._refNat || n < 2) {
      this._calibError = "Need at least 2 complete point pairs — try again.";
      return;
    }
    const ar = this._editorAR();
    const anchors = buildCalibrationAnchors(
      c.rawPts.slice(0, n), c.floorPts.slice(0, n), { NW: this._refNat.w, NH: this._refNat.h }, ar,
    );
    const fit = computeSeatFit(anchors, ar);
    if (!fit) {
      this._calibError = "Couldn't compute a calibration from those points — " +
        "make sure they're clearly apart, then try again.";
      return;
    }
    this._calibError = "";
    // 1.13.0: redirected through `_commitSeat` — writes to the backend when
    // `anyvac.set_floorplan_seat` is available (same as the manual sliders
    // below), falling back to the old direct-YAML write (with `seat:
    // "manual"` forced, as calibration always intended) only when it isn't.
    void this._commitSeat(c.vacIdx, {
      rotation: fit.rotation,
      scale: Math.round(fit.scale * 10) / 10,
      offset_x: Math.round(fit.offset_x * 10) / 10,
      offset_y: Math.round(fit.offset_y * 10) / 10,
    }, { forceManualYaml: true });
    this._calibResult = { residual_pct: Math.round(fit.residual_pct * 10) / 10 };
  }

  /** Renders the calibration flow as a fixed full-viewport overlay (docs/39
   *  §9) — the raw map (`phase === "raw"`) or the floorplan (`phase ===
   *  "floor"`), each with a click handler that records a point and a banner
   *  naming what to do next. Full-viewport, not inline in the Maps-tab column,
   *  because that column can be a few hundred px wide (or less on mobile) —
   *  the click-handling math is a plain ratio of the clicked element's own
   *  rect, so rendering it at screen size instead of column size is a pure
   *  display change, zero risk to the geometry. Once ≥ 2 complete pairs
   *  exist, the raw-map step's banner also shows the live fit-error preview
   *  and a "Save" button, so adding a point and its effect on the fit are
   *  seen before committing to anything. `pvOx/pvOy/pvScale/pvRot` are the
   *  SAME floorplan placement values the normal preview uses
   *  (`_renderMapsTab`), so the floorplan step shows it exactly where the
   *  user already sees it, not a re-centred copy. */
  private _renderCalibStep(
    calib: CalibState, mapUrl: string, previewUrl: string,
    pvOx: number, pvOy: number, pvScale: number, pvRot: number,
  ) {
    const isRaw = calib.phase === "raw";
    const pairs = Math.min(calib.rawPts.length, calib.floorPts.length);
    const nextPoint = pairs + 1;
    const preview = this._calibPreview(calib);
    const rawAR = this._refNat && this._refNat.h > 0 ? this._refNat.w / this._refNat.h : 0;
    const stageAR = isRaw ? rawAR : this._pvAR;
    const atCap = calib.rawPts.length >= MAX_CALIB_PAIRS;
    return html`
      <div class="calib-overlay">
        <div class="calib-banner">
          <span>
            ${isRaw
              ? (atCap
                  ? html`<strong>${MAX_CALIB_PAIRS} points</strong> — that's the max. Save below, or Cancel.`
                  : html`<strong>Point ${nextPoint}</strong> — click a distinctive spot (e.g. a room corner)
                    on this vacuum's OWN map${pairs > 0 ? ", away from the points already placed" : ""}.`)
              : html`<strong>Point ${pairs + 1}</strong> — click the SAME physical point on the floorplan.`}
            ${preview ? html` Current fit error with ${pairs} point${pairs > 1 ? "s" : ""}:
              <strong>${preview.residual_pct}%</strong>.` : nothing}
          </span>
          <span style="display:flex;gap:6px;flex-shrink:0">
            ${(calib.rawPts.length > 0 || calib.floorPts.length > 0) ? html`
              <button class="btn btn--sm" @click=${() => this._undoCalibPoint()}>Undo point</button>
            ` : nothing}
            ${pairs >= 2 ? html`
              <button class="btn btn--add btn--sm" @click=${() => this._finishCalibration()}>Save</button>
            ` : nothing}
            <button class="btn btn--sm" @click=${() => this._cancelCalibration()}>Cancel</button>
          </span>
        </div>
        <div class="calib-stage" style=${styleMap({ "--calib-ar": String(stageAR > 0.1 ? stageAR : 1.5) })}>
          ${isRaw ? html`
            <div class="map-pos-container">
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${mapUrl} alt="Raw vacuum map"
                  @load=${(e: Event) => {
                    const im = e.target as HTMLImageElement;
                    if (im.naturalWidth && im.naturalHeight
                      && (this._refNat?.w !== im.naturalWidth || this._refNat?.h !== im.naturalHeight)) {
                      this._refNat = { w: im.naturalWidth, h: im.naturalHeight };
                    }
                  }}
                  style=${styleMap({ left: "0", top: "0", width: "100%", transform: "none" })}
                  @click=${(e: MouseEvent) => this._onCalibRawClick(e)} />
                ${calib.rawPts.map((p, i) => this._refNat ? html`
                  <div class="calib-marker"
                    style=${styleMap({
                      left: (p.x / this._refNat!.w * 100) + "%",
                      top:  (p.y / this._refNat!.h * 100) + "%",
                    })}>${i + 1}</div>
                ` : nothing)}
              </div>
            </div>
          ` : html`
            <div class="map-pos-container" @click=${(e: MouseEvent) => this._onCalibFloorClick(e)}>
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${previewUrl} alt="Floorplan"
                  style=${styleMap({
                    left:      (50 + pvOx) + "%",
                    top:       (50 + pvOy) + "%",
                    width:     pvScale + "%",
                    transform: "translate(-50%,-50%) rotate(" + pvRot + "deg)",
                  })} />
                ${calib.floorPts.map((p, i) => html`
                  <div class="calib-marker" style=${styleMap({ left: p.x + "%", top: p.y + "%" })}>${i + 1}</div>
                `)}
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // ── Cesta B calibration against the home frame (docs/40 §5.B) ─────────────

  /** Starts the flow: fetches an on-demand home-frame snapshot to click
   *  against (SCRATCH reference, never saved to `image_base` — see
   *  `_homeCalibSnapshotUrl`'s docstring) via the same `anyvac.snapshot_map_
   *  as_floorplan` / `frame: "home"` call `_snapshotHomeFrame` uses to build
   *  the cesta A floorplan itself. */
  private async _startHomeCalibration(): Promise<void> {
    const frame = this._anyHomeFrame();
    if (!frame) return;
    this._homeCalibError = "";
    this._homeCalibResult = null;
    this._homeCalibBusy = true;
    try {
      const res = (await (this.hass as any).callService(
        "anyvac", "snapshot_map_as_floorplan",
        { frame: "home", name: "home_frame_calib" },
        undefined, false, true,
      )) as {
        response?: {
          path?: string; frame_id?: string;
          crop?: { x0: number; y0: number; x1: number; y1: number };
        };
      } | undefined;
      const path = res?.response?.path;
      const frameId = res?.response?.frame_id;
      const crop = res?.response?.crop;
      if (!path || !frameId || !crop) throw new Error("incomplete response — integration too old?");
      this._homeCalibSnapshotUrl = path;
      this._homeCalibCrop = crop;
      this._homeCalibFrameId = frameId;
      this._homeCalib = { phase: "frame", homePts: [], floorPts: [] };
      this._mapRoom = null;
    } catch (err) {
      this._homeCalibError =
        "Couldn't snapshot the home frame for calibration — make sure at least one vacuum has a " +
        "home-frame registration (check its 'home_frame' sensor attribute) and the anyvac " +
        "integration is at least 1.9.0, then try again.";
      // eslint-disable-next-line no-console
      console.error("[anyvac-card] snapshot_map_as_floorplan (frame: home, calib) failed:", err);
    } finally {
      this._homeCalibBusy = false;
    }
  }

  private _cancelHomeCalibration(): void {
    this._homeCalib = null;
  }

  /** Click on the home-frame snapshot (`phase === "frame"`) — converts the
   *  click into home-frame px via `pctToCropPoint` against `_homeCalibCrop`
   *  (the exact px extent that snapshot rendered, same re-normalisation the
   *  card's `_clickToHomePx` uses for the same response shape), then snaps
   *  it to the nearest wall corner via the backend `anyvac.snap_wall_corner`
   *  service (docs/40 §5.B) before recording it — this is what removes most
   *  of the click noise docs/39 §8-9 otherwise fights statistically. A
   *  failed/unavailable snap falls back to the unsnapped point rather than
   *  losing the click outright (an older integration without the service,
   *  or a frame with no wall data yet — `_snap_wall_corner`'s own
   *  `snapped: false` echo covers the latter and never reaches here as an
   *  error at all). */
  private async _onHomeCalibFrameClick(e: MouseEvent): Promise<void> {
    const c = this._homeCalib;
    const crop = this._homeCalibCrop;
    if (!c || c.phase !== "frame" || !crop || c.homePts.length >= MAX_CALIB_PAIRS || this._homeCalibBusy) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pct = { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 };
    const raw = pctToCropPoint(pct, crop);
    if (!raw) return;
    this._homeCalibBusy = true;
    try {
      const res = (await (this.hass as any).callService(
        "anyvac", "snap_wall_corner",
        { frame_id: this._homeCalibFrameId, x_home_px: raw.x, y_home_px: raw.y },
        undefined, false, true,
      )) as { response?: { x_home_px?: number; y_home_px?: number } } | undefined;
      const px = res?.response?.x_home_px ?? raw.x;
      const py = res?.response?.y_home_px ?? raw.y;
      this._homeCalib = { ...c, homePts: [...c.homePts, { x: px, y: py }], phase: "floor" };
    } catch (err) {
      this._homeCalib = { ...c, homePts: [...c.homePts, raw], phase: "floor" };
      // eslint-disable-next-line no-console
      console.error("[anyvac-card] snap_wall_corner failed, using unsnapped click:", err);
    } finally {
      this._homeCalibBusy = false;
    }
  }

  /** Click on the floorplan calibration preview (`phase === "floor"`) —
   *  identical container-percentage convention to `_onCalibFloorClick`. */
  private _onHomeCalibFloorClick(e: MouseEvent): void {
    const c = this._homeCalib;
    if (!c || c.phase !== "floor") return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = round1(clampPct(((e.clientX - rect.left) / rect.width) * 100));
    const y = round1(clampPct(((e.clientY - rect.top) / rect.height) * 100));
    this._homeCalib = { ...c, floorPts: [...c.floorPts, { x, y }], phase: "frame" };
  }

  /** Removes the last clicked point, whichever image it's on — mirrors
   *  `_undoCalibPoint`. */
  private _undoHomeCalibPoint(): void {
    const c = this._homeCalib;
    if (!c) return;
    if (c.phase === "floor" && c.homePts.length > c.floorPts.length) {
      this._homeCalib = { ...c, homePts: c.homePts.slice(0, -1), phase: "frame" };
    } else if (c.floorPts.length > 0) {
      this._homeCalib = { ...c, floorPts: c.floorPts.slice(0, -1) };
    }
  }

  /** Live fit-error preview over whatever complete pairs exist so far —
   *  mirrors `_calibPreview`, but calls `homeAnchorFit` directly (the exact
   *  function the card re-solves live every render, seatfit.ts) instead of
   *  `buildCalibrationAnchors`+`computeSeatFit` separately, since the
   *  persisted shape here already IS `{home_px, floor_pct}` anchor pairs —
   *  one hop closer to what actually gets saved (docs/14 rule 1). */
  private _homeCalibPreview(calib: HomeCalibState): { residual_pct: number } | null {
    const n = Math.min(calib.homePts.length, calib.floorPts.length);
    const frame = this._anyHomeFrame();
    if (n < 2 || !frame) return null;
    const anchors: HomeFrameAnchor[] = calib.homePts.slice(0, n).map((p, i) => ({ home_px: p, floor_pct: calib.floorPts[i] }));
    const fit = homeAnchorFit(anchors, { NW: frame.w, NH: frame.h }, this._editorAR());
    return fit ? { residual_pct: Math.round(fit.residual_pct * 10) / 10 } : null;
  }

  /** Writes every complete pair collected so far as `image_base.home_anchors`
   *  (+ `home_anchors_frame_id`) — the raw PAIRS, never a solved seat (docs/40
   *  §5.B: the fit is re-run live every render against the frame's CURRENT
   *  size, so it survives the frame growing without re-clicking). Also turns
   *  "Hide vacuum map" on for every vacuum, same one-shot side effect
   *  `_snapshotHomeFrame` already applies for cesta A — once the floorplan is
   *  calibrated against the home frame, every registered vacuum's own raw
   *  map overlay is redundant noise on top of it. */
  private _finishHomeCalibration(): void {
    const c = this._homeCalib;
    if (!c) return;
    const n = Math.min(c.homePts.length, c.floorPts.length);
    this._homeCalib = null;
    if (n < 2) {
      this._homeCalibError = "Need at least 2 complete point pairs — try again.";
      return;
    }
    const frame = this._anyHomeFrame();
    if (!frame) {
      this._homeCalibError = "No home frame available anymore — try again.";
      return;
    }
    const anchors: HomeFrameAnchor[] = c.homePts.slice(0, n).map((p, i) => ({ home_px: p, floor_pct: c.floorPts[i] }));
    const fit = homeAnchorFit(anchors, { NW: frame.w, NH: frame.h }, this._editorAR());
    if (!fit) {
      this._homeCalibError = "Couldn't compute a calibration from those points — " +
        "make sure they're clearly apart, then try again.";
      return;
    }
    this._setEditedImageBase({ home_anchors: anchors, home_anchors_frame_id: frame.id });
    const vacuums = this._config.vacuums.map((v) => ({ ...v, hide_map: true }));
    this._setConfig({ vacuums });
    this._homeCalibError = "";
    this._homeCalibResult = { residual_pct: Math.round(fit.residual_pct * 10) / 10 };
  }

  /** Renders the cesta B calibration flow as the same fixed full-viewport
   *  overlay as `_renderCalibStep` (docs/39 §9) — the home-frame snapshot
   *  (`phase === "frame"`) or the floorplan (`phase === "floor"`), each with
   *  a click handler and a banner naming what to do next + the live
   *  fit-error preview once ≥ 2 complete pairs exist. `pvOx/pvOy/pvScale/
   *  pvRot` are the same floorplan placement values the normal preview uses,
   *  same reasoning as `_renderCalibStep`. */
  private _renderHomeCalibStep(
    calib: HomeCalibState, previewUrl: string,
    pvOx: number, pvOy: number, pvScale: number, pvRot: number,
  ) {
    const isFrame = calib.phase === "frame";
    const pairs = Math.min(calib.homePts.length, calib.floorPts.length);
    const nextPoint = pairs + 1;
    const preview = this._homeCalibPreview(calib);
    const crop = this._homeCalibCrop;
    const frameAR = crop && (crop.y1 - crop.y0) > 0 ? (crop.x1 - crop.x0) / (crop.y1 - crop.y0) : 0;
    const stageAR = isFrame ? frameAR : this._pvAR;
    const atCap = calib.homePts.length >= MAX_CALIB_PAIRS;
    return html`
      <div class="calib-overlay">
        <div class="calib-banner">
          <span>
            ${isFrame
              ? (atCap
                  ? html`<strong>${MAX_CALIB_PAIRS} points</strong> — that's the max. Save below, or Cancel.`
                  : html`<strong>Point ${nextPoint}</strong> — click a distinctive spot (e.g. a wall corner) on
                    the home frame${pairs > 0 ? ", away from the points already placed" : ""}.
                    ${this._homeCalibBusy ? " Snapping…" : ""}`)
              : html`<strong>Point ${pairs + 1}</strong> — click the SAME physical point on the floorplan.`}
            ${preview ? html` Current fit error with ${pairs} point${pairs > 1 ? "s" : ""}:
              <strong>${preview.residual_pct}%</strong>.` : nothing}
          </span>
          <span style="display:flex;gap:6px;flex-shrink:0">
            ${(calib.homePts.length > 0 || calib.floorPts.length > 0) ? html`
              <button class="btn btn--sm" @click=${() => this._undoHomeCalibPoint()}>Undo point</button>
            ` : nothing}
            ${pairs >= 2 ? html`
              <button class="btn btn--add btn--sm" @click=${() => this._finishHomeCalibration()}>Save</button>
            ` : nothing}
            <button class="btn btn--sm" @click=${() => this._cancelHomeCalibration()}>Cancel</button>
          </span>
        </div>
        <div class="calib-stage" style=${styleMap({ "--calib-ar": String(stageAR > 0.1 ? stageAR : 1.5) })}>
          ${isFrame ? html`
            <div class="map-pos-container">
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${this._homeCalibSnapshotUrl} alt="Home frame"
                  style=${styleMap({ left: "0", top: "0", width: "100%", transform: "none" })}
                  @click=${(e: MouseEvent) => this._onHomeCalibFrameClick(e)} />
                ${calib.homePts.map((p, i) => crop ? html`
                  <div class="calib-marker"
                    style=${styleMap({
                      left: (((p.x - crop.x0) / (crop.x1 - crop.x0)) * 100) + "%",
                      top:  (((p.y - crop.y0) / (crop.y1 - crop.y0)) * 100) + "%",
                    })}>${i + 1}</div>
                ` : nothing)}
              </div>
            </div>
          ` : html`
            <div class="map-pos-container" @click=${(e: MouseEvent) => this._onHomeCalibFloorClick(e)}>
              <div class="map-preview-wrap">
                <img class="map-preview-img" src=${previewUrl} alt="Floorplan"
                  style=${styleMap({
                    left:      (50 + pvOx) + "%",
                    top:       (50 + pvOy) + "%",
                    width:     pvScale + "%",
                    transform: "translate(-50%,-50%) rotate(" + pvRot + "deg)",
                  })} />
                ${calib.floorPts.map((p, i) => html`
                  <div class="calib-marker" style=${styleMap({ left: p.x + "%", top: p.y + "%" })}>${i + 1}</div>
                `)}
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  /** docs/30 §8 "big seating rework" / docs/38 §4.2: places THIS vacuum's own
   *  rooms exactly onto a KNOWN floorplan crop — no seat, no dragging, no
   *  ambiguity, since the crop box is in the same bbox_px pixel space this
   *  vacuum's own rooms already report and the saved file IS that crop
   *  (`placeRoomsInCrop`, seatfit.ts). Once these carry real map_x/map_y
   *  they act as anchors for every OTHER vacuum sharing this floorplan whose
   *  own room names match (existing `assembleAnchors`/`computeSeatFit`
   *  auto-fit, unaffected by this) — so this one call is usually the entire
   *  multi-vacuum seating step, not just this vacuum's.
   *
   *  Unlike the pre-docs/38 version, an EXISTING room of the same name is
   *  overwritten (new geometry, same icon/thresholds/clean-time overrides)
   *  rather than skipped — the two callers this feeds are both cases where
   *  the geometry is meant to change: a freshly (re)snapshotted floorplan
   *  (`_snapshotFloorplan`) or an explicit "Place rooms from crop box"
   *  click. Returns null when there was nothing to place (no integration
   *  rooms at all) so callers can tell "did nothing" from "placed zero". */
  private _placeOwnRooms(
    vacIdx: number,
    crop: { x0: number; y0: number; x1: number; y1: number },
  ): { placed: number; added: number } | null {
    const vac = this._config.vacuums[vacIdx];
    const ie = this._intEntityFor(vac);
    const at = ie ? (this.hass.states[ie]?.attributes as Record<string, any> | undefined) : undefined;
    const intRooms: Array<Record<string, any>> = Array.isArray(at?.rooms) ? at!.rooms : [];
    if (!intRooms.length) return null;
    const existing = this._mergedEdit ? (this._config.rooms ?? []) : (vac.rooms ?? []);
    const { rooms, placed, added } = placeRoomsInCrop(
      intRooms, crop, existing as unknown as RoomConfigLike[], _roomIconFor,
    );
    if (placed || added) {
      const nextRooms = rooms as unknown as RoomConfig[];
      if (this._mergedEdit) this._setConfig({ rooms: nextRooms });
      else this._setVacuum(vacIdx, { rooms: nextRooms });
    }
    return { placed, added };
  }

  /** "Place rooms from crop box" button (docs/38 §4.4): re-derives the
   *  vacuum from `crop_box.entity`, deliberately NOT from whichever pill is
   *  currently selected in the Maps tab — the floorplan file came from a
   *  specific vacuum's map, and that's the one whose rooms the crop box
   *  describes, regardless of which vacuum the user happens to be looking
   *  at right now. */
  private _placeRoomsFromCropBox(): void {
    const cb = this._currentImageBase()?.crop_box;
    if (!cb || !("entity" in cb)) return; // home-frame crop: rooms come live, no static placement
    const idx = this._config.vacuums.findIndex((v) => v.entity === cb.entity);
    if (idx < 0) return;
    const result = this._placeOwnRooms(idx, cb);
    if (result) this._placeRoomsResult = result;
  }

  /** docs/30 §4b: room pairing across vacuums is by NAME, and a mismatch
   *  (e.g. "Living room" on one robot's app vs. "Living Room" on another's)
   *  fails silently — the room just never gets an anchor/auto-fit and there's
   *  no error anywhere. Lists this vacuum's own room names that don't match
   *  any room already on the shared floorplan, so the editor can surface it
   *  instead of the user having to notice a missing/misplaced room. A name
   *  showing up here isn't necessarily wrong — it may just be a room only
   *  this vacuum covers (the normal case Import is for) — so this is a
   *  pointer to go check the Roborock app, not an error state. */
  private _unmatchedOwnRoomNames(vacIdx: number): string[] {
    const vac = this._config.vacuums[vacIdx];
    const ie = this._intEntityFor(vac);
    const at = ie ? (this.hass.states[ie]?.attributes as Record<string, any> | undefined) : undefined;
    const intRooms: Array<Record<string, any>> = Array.isArray(at?.rooms) ? at!.rooms : [];
    if (!intRooms.length) return [];
    const known = new Set(this._editRooms().map((r) => r.key));
    const out: string[] = [];
    for (const ir of intRooms) {
      const nm = ir?.name as string | undefined;
      if (nm && !known.has(nm)) out.push(nm);
    }
    return out;
  }

  private _setRoom(vacIdx: number, roomIdx: number, updates: Partial<RoomConfig>): void {
    const rooms = [...(this._config.vacuums[vacIdx].rooms ?? [])];
    rooms[roomIdx] = { ...rooms[roomIdx], ...updates };
    this._setVacuum(vacIdx, { rooms });
  }

  private _setCleanAction(vacIdx: number, updates: Partial<CleanAction>): void {
    const existing = this._config.vacuums[vacIdx].clean_action ?? { type: "native" };
    this._setVacuum(vacIdx, { clean_action: { ...existing, ...updates } as CleanAction });
  }

  private _togglePresets(vacIdx: number): void {
    const s = new Set(this._openPresets);
    if (s.has(vacIdx)) s.delete(vacIdx); else s.add(vacIdx);
    this._openPresets = s;
  }
  private _setPreset(vacIdx: number, presetIdx: number, updates: Partial<SettingPreset>): void {
    const presets = [...(this._config.vacuums[vacIdx].presets ?? [])];
    presets[presetIdx] = { ...presets[presetIdx], ...updates };
    this._setVacuum(vacIdx, { presets });
  }
  private _addPreset(vacIdx: number): void {
    const existing = this._config.vacuums[vacIdx].presets ?? [];
    const presets = [...existing, { id: "preset" + (existing.length + 1), label: "New preset" }];
    this._setVacuum(vacIdx, { presets });
    this._openPresets = new Set([...this._openPresets, vacIdx]);
  }
  private _deletePreset(vacIdx: number, presetIdx: number): void {
    const presets = (this._config.vacuums[vacIdx].presets ?? []).filter((_, i) => i !== presetIdx);
    this._setVacuum(vacIdx, { presets });
  }

  private _setGlobal(idx: number, updates: Partial<GlobalAction>): void {
    const global_actions = [...(this._config.global_actions ?? [])];
    global_actions[idx] = { ...global_actions[idx], ...updates };
    const next = { ...this._config, global_actions };
    this._config = next; this._fire(next);
  }

  private _setGlobalAction(idx: number, updates: Partial<GlobalActionCall>): void {
    const existing = this._config.global_actions?.[idx]?.action ?? { type: "script", entity_id: "" };
    this._setGlobal(idx, { action: { ...existing, ...updates } as GlobalActionCall });
  }

  // ── List mutations ────────────────────────────────────────────────────────

  private _moveVacuum(idx: number, dir: -1 | 1): void {
    const target = idx + dir;
    const vacuums = [...this._config.vacuums];
    if (target < 0 || target >= vacuums.length) return;
    [vacuums[idx], vacuums[target]] = [vacuums[target], vacuums[idx]];
    const next = { ...this._config, vacuums };
    this._config = next; this._fire(next);
  }

  private _addVacuum(): void {
    const vacuums = [...this._config.vacuums, { ...DEFAULT_VACUUM }];
    const next = { ...this._config, vacuums };
    this._config = next; this._fire(next);
    const newIdx = vacuums.length - 1;
    this._openVac = new Set([...this._openVac, newIdx]);
  }

  private _deleteVacuum(idx: number): void {
    const vacuums = this._config.vacuums.filter((_, i) => i !== idx);
    const next = { ...this._config, vacuums };
    this._config = next; this._fire(next);
    const s = new Set(this._openVac); s.delete(idx);
    this._openVac = s;
  }

  private _addRoom(vacIdx: number): void {
    const existing = this._config.vacuums[vacIdx].rooms ?? [];
    const rooms = [...existing, { ...DEFAULT_ROOM, icon: _roomIconFor(existing.length) }];
    this._setVacuum(vacIdx, { rooms });
    const m = new Map(this._openRoom);
    m.set(vacIdx, rooms.length - 1);
    this._openRoom = m;
  }

  private _moveRoom(vacIdx: number, from: number, to: number): void {
    if (from === to) return;
    const rooms = [...(this._config.vacuums[vacIdx].rooms ?? [])];
    if (from < 0 || from >= rooms.length || to < 0 || to >= rooms.length) return;
    const [moved] = rooms.splice(from, 1);
    rooms.splice(to, 0, moved);
    this._setVacuum(vacIdx, { rooms });
  }

  private _deleteRoom(vacIdx: number, roomIdx: number): void {
    const rooms = (this._config.vacuums[vacIdx].rooms ?? []).filter((_, i) => i !== roomIdx);
    this._setVacuum(vacIdx, { rooms });
    const openIdx = this._openRoom.get(vacIdx);
    if (openIdx === roomIdx) {
      const m = new Map(this._openRoom); m.set(vacIdx, null);
      this._openRoom = m;
    }
    if (this._mapRoom === roomIdx) this._mapRoom = null;
  }

  private _setGlobalPreset(idx: number, updates: Partial<GlobalPreset>): void {
    const global_presets = [...(this._config.global_presets ?? [])];
    global_presets[idx] = { ...global_presets[idx], ...updates };
    this._setConfig({ global_presets });
  }
  private _addGlobalPreset(): void {
    const existing = this._config.global_presets ?? [];
    const global_presets = [...existing, { id: "gp" + (existing.length + 1), label: "New clean", scope: "select" as const }];
    this._setConfig({ global_presets });
  }
  private _deleteGlobalPreset(idx: number): void {
    const global_presets = (this._config.global_presets ?? []).filter((_, i) => i !== idx);
    this._setConfig({ global_presets });
  }

  private _addGlobal(): void {
    const global_actions = [...(this._config.global_actions ?? []), { ...DEFAULT_GLOBAL }];
    const next = { ...this._config, global_actions };
    this._config = next; this._fire(next);
    const newIdx = global_actions.length - 1;
    this._openGlobal = new Set([...this._openGlobal, newIdx]);
  }

  private _deleteGlobal(idx: number): void {
    const global_actions = (this._config.global_actions ?? []).filter((_, i) => i !== idx);
    const next = { ...this._config, global_actions };
    this._config = next; this._fire(next);
    const s = new Set(this._openGlobal); s.delete(idx);
    this._openGlobal = s;
  }

  // ── Accordion toggle helpers ──────────────────────────────────────────────

  private _toggleVac(idx: number): void {
    const s = new Set(this._openVac);
    if (s.has(idx)) s.delete(idx); else s.add(idx);
    this._openVac = s;
  }

  private _toggleRoom(vacIdx: number, roomIdx: number): void {
    const m = new Map(this._openRoom);
    const cur = m.get(vacIdx) ?? null;
    m.set(vacIdx, cur === roomIdx ? null : roomIdx);
    this._openRoom = m;
  }

  private _toggleSensors(vacIdx: number): void {
    const s = new Set(this._openSensors);
    if (s.has(vacIdx)) s.delete(vacIdx); else s.add(vacIdx);
    this._openSensors = s;
  }

  private _toggleAction(vacIdx: number): void {
    const s = new Set(this._openAction);
    if (s.has(vacIdx)) s.delete(vacIdx); else s.add(vacIdx);
    this._openAction = s;
  }

  private _toggleGlobal(idx: number): void {
    const s = new Set(this._openGlobal);
    if (s.has(idx)) s.delete(idx); else s.add(idx);
    this._openGlobal = s;
  }

  // ── Shared field helpers ──────────────────────────────────────────────────

  private _entityPicker(label: string, value: string | undefined, domains: string[],
    onChange: (v: string) => void, required = false) {
    const ph = domains.length ? domains.join(" / ") : "entity_id";
    const isSingle = domains.length === 1;
    const listId = isSingle ? "ha-ents-" + domains[0] : "ha-entities";
    const filtered = isSingle
      ? Object.keys(this.hass?.states ?? {}).filter(id => id.startsWith(domains[0] + ".")).sort()
      : null;
    return html`
      ${filtered ? html`<datalist id=${listId}>${filtered.map(id => html`<option value=${id}>`)}</datalist>` : nothing}
      <div class="field">
        <label>${label}${required ? html`<span class="required"> *</span>` : nothing}</label>
        <input class="text-input" type="text" list=${listId}
          .value=${value ?? ""} placeholder=${ph}
          @input=${(e: Event) => { const v = (e.target as HTMLInputElement).value;
            if (v === "" || this.hass.states[v]) onChange(v); }}
          @change=${(e: Event) => onChange((e.target as HTMLInputElement).value)} />
      </div>`;
  }

  private _textField(label: string, value: string | undefined, onChange: (v: string) => void, placeholder = "") {
    return html`
      <div class="field">
        <label>${label}</label>
        <input class="text-input" type="text" .value=${value ?? ""} placeholder=${placeholder}
          @change=${(e: Event) => onChange((e.target as HTMLInputElement).value)} />
      </div>`;
  }

  /** Resolves a VacuumColor (legacy preset name or custom hex) to a CSS colour
   *  string — mirrors `_resolveColor` in anyvac-card.ts. Used for accordion
   *  accent borders and to seed the hex swatch with the right colour even
   *  when the stored value is still one of the three legacy names. */
  private _resolveColor(raw: string | undefined, fallback: string): string {
    const c = raw ?? fallback;
    return COLOR_HEX[c] ?? c;
  }

  /** Hex colour field with a native colour-picker swatch alongside the text input —
   *  the swatch writes back as a hex string, so both stay interchangeable. Falls
   *  back to the placeholder colour for the swatch when the current value isn't a
   *  valid #rrggbb (empty, or a CSS variable/name some configs still use). */
  private _hexColorField(label: string, value: string | undefined, onChange: (v: string) => void, placeholder: string) {
    const swatch = /^#[0-9a-fA-F]{6}$/.test(value ?? "") ? (value as string) : placeholder;
    return html`
      <div class="field">
        <label>${label} (hex)</label>
        <div class="hex-color-row">
          <input type="color" class="threshold-color" .value=${swatch}
            @input=${(e: Event) => onChange((e.target as HTMLInputElement).value)} />
          <input class="text-input" type="text" .value=${value ?? ""} placeholder=${placeholder}
            @change=${(e: Event) => onChange((e.target as HTMLInputElement).value)} />
        </div>
      </div>`;
  }

  private _numberSlider(label: string, value: number | undefined, min: number, max: number, step: number,
    onChange: (v: number) => void, suffix = "", onCommit?: (v: number) => void) {
    const cur = value ?? 0;
    // Typed entry alongside the slider (2026-09-15 field report): dragging a slider whose
    // range spans hundreds of % over a ~150px track can't reach a precise value, so the
    // shown number is now an editable field, not just a label — clamped to [min,max] but
    // NOT snapped to `step` (typing an exact value is the whole point).
    const commit = (raw: string) => {
      const n = Number(raw);
      if (Number.isNaN(n)) return;
      (onCommit ?? onChange)(Math.min(max, Math.max(min, n)));
    };
    // `onCommit` (1.13.0), when given, fires once per interaction instead of
    // once per drag tick — on the range's `change` (fires on mouse-up/drag
    // release, same event browsers already use for exactly this) and on the
    // number field's existing blur/Enter commit. `onChange` still drives
    // `input` alone for live visual feedback while dragging. Seat-geometry
    // sliders use this split to send a backend service call once per
    // gesture rather than once per pixel; every other caller leaves
    // `onCommit` unset and keeps today's per-tick behavior unchanged.
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${min} max=${max} step=${step} .value=${String(cur)}
            @input=${(e: Event) => onChange(Number((e.target as HTMLInputElement).value))}
            @change=${(e: Event) => (onCommit ?? onChange)(Number((e.target as HTMLInputElement).value))} />
          <span class="slider-val-wrap">
            <input type="number" class="slider-val-input" min=${min} max=${max} step=${step}
              .value=${String(cur)}
              @change=${(e: Event) => commit((e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }} />
            ${suffix ? html`<span class="slider-val-suffix">${suffix}</span>` : nothing}
          </span>
        </div>
      </div>`;
  }

  private _selectField<T extends string>(label: string, value: T,
    options: Array<{ value: T; label: string }>, onChange: (v: T) => void) {
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input" @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value as T)}>
          ${options.map(o => html`<option value=${o.value} ?selected=${o.value === value}>${o.label}</option>`)}
        </select>
      </div>`;
  }

  private _optionSelectFromList(label: string, opts: string[], value: string | undefined,
    onChange: (v: string) => void) {
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input"
          @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
          <option value="">— none —</option>
          ${opts.map(o => html`<option value=${o} ?selected=${o === value}>${o}</option>`)}
        </select>
      </div>`;
  }

  private _optionSelect(label: string, entity: string | undefined,
    value: string | undefined, onChange: (v: string) => void) {
    const opts: string[] = entity
      ? ((this.hass.states[entity]?.attributes["options"] as string[]) ?? [])
      : [];
    if (!opts.length) return this._textField(label, value, onChange, "e.g. balanced");
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input"
          @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
          <option value="">— none —</option>
          ${opts.map(o => html`<option value=${o} ?selected=${o === value}>${o}</option>`)}
        </select>
      </div>`;
  }

  private _iconPickerField(value: string | undefined, onChange: (v: string) => void) {
    return html`
      <div class="field">
        <label>Icon</label>
        <ha-icon-picker .value=${value ?? "mdi:square"}
          @value-changed=${(e: CustomEvent) => onChange(e.detail.value)}
        ></ha-icon-picker>
      </div>`;
  }


  private _areaPicker(label: string, value: string | undefined, onChange: (v: string) => void) {
    const areas = Object.values((this.hass as any)?.areas ?? {}) as Array<{area_id: string; name: string}>;
    if (!areas.length) return this._textField(label, value, onChange, "e.g. living_room");
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input"
          @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
          <option value="">— not mapped —</option>
          ${[...areas].sort((a, b) => a.name.localeCompare(b.name)).map(a =>
            html`<option value=${a.area_id} ?selected=${a.area_id === value}>${a.name}</option>`)}
        </select>
      </div>`;
  }

  // ── Tab: Vacuums ──────────────────────────────────────────────────────────

  private _renderVacuumsTab() {
    return html`
      <div class="tab-body">
        ${this._config.vacuums.length === 0
          ? html`<p class="hint">No vacuums yet. Add one below.</p>`
          : this._config.vacuums.map((vac, i) => this._renderVacuumAccordion(vac, i))}
        <button class="btn btn--add" @click=${() => this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`;
  }

  private _renderVacuumAccordion(vac: VacuumConfig, idx: number) {
    const color = this._resolveColor(vac.color, "green");
    const isOpen = this._openVac.has(idx);
    return html`
      <div class="acc-row" style=${styleMap({ borderLeft: "3px solid " + color })}>
        <div class="acc-header" @click=${() => this._toggleVac(idx)}>
          ${vac.image
            ? html`<img class="acc-img" src=${vac.image} alt=${vac.name ?? ""} />`
            : html`<ha-icon icon="mdi:robot-vacuum" style=${styleMap({ color, width: "36px", height: "36px" })}></ha-icon>`}
          <div class="acc-info">
            <span class="acc-name">${vac.name || vac.entity || "Unnamed vacuum"}</span>
            <span class="acc-sub">${vac.entity}</span>
          </div>
          <button class="icon-btn" ?disabled=${idx === 0}
            @click=${(e: Event) => { e.stopPropagation(); this._moveVacuum(idx, -1); }}>
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button class="icon-btn" ?disabled=${idx === this._config.vacuums.length - 1}
            @click=${(e: Event) => { e.stopPropagation(); this._moveVacuum(idx, 1); }}>
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          <button class="icon-btn icon-btn--danger"
            @click=${(e: Event) => { e.stopPropagation(); this._deleteVacuum(idx); }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${isOpen ? html`
          <div class="acc-body">

            <div class="section-title">Basic</div>
            ${this._entityPicker("Vacuum entity", vac.entity, ["vacuum"],
              v => this._setVacuum(idx, { entity: v }), true)}
            ${this._textField("Display name", vac.name,
              v => this._setVacuum(idx, { name: v }), "e.g. S8")}
            ${this._textField("Image path", vac.image,
              v => this._setVacuum(idx, { image: v }), "/local/...")}
            ${this._hexColorField("Accent colour", vac.color ? this._resolveColor(vac.color, "green") : undefined,
              v => this._setVacuum(idx, { color: v || undefined }), DEFAULT_VACUUM_PALETTE[idx % DEFAULT_VACUUM_PALETTE.length])}
            ${this._selectField<"auto" | "dry" | "wet" | "both">("Role", vac.clean_type ?? "auto",
              [{ value: "auto", label: "Auto-detect from clean action" },
               { value: "dry", label: "Dry only" },
               { value: "wet", label: "Wet only" },
               { value: "both", label: "Both — follow live mode" }],
              v => this._setVacuum(idx, { clean_type: v === "auto" ? undefined : v }))}
            <p class="hint">This vacuum's capability — controls which time estimate and which dry/wet layer it uses. Not the run-time Dry/Wet/Both choice (that's made on the controller). "Both" follows the live water mode (needs the integration sensor).</p>

            ${this._renderSensorsSection(idx, vac)}
            ${this._renderCleanActionSection(idx, vac)}
            ${this._renderPresetsSection(idx, vac)}

            <div class="section-title">Rooms (${(vac.rooms ?? []).length})</div>
            ${this._intEntityFor(vac)
              ? html`<p class="hint">With the AnyVac integration, rooms appear automatically from
                  this vacuum's own map — you don't need to add them here. Add a room below only to
                  override its icon/display name, or to position it on a custom floorplan (Maps tab).</p>`
              : html`<p class="hint">Add one entry per room this vacuum can clean.</p>`}
            ${(vac.rooms ?? []).map((r, ri) => this._renderRoomAccordion(r, idx, ri))}
            <button class="btn btn--add" @click=${() => this._addRoom(idx)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add room
            </button>

          </div>
        ` : nothing}
      </div>`;
  }

  private _renderSensorsSection(vacIdx: number, vac: VacuumConfig) {
    const isOpen = this._openSensors.has(vacIdx);
    const configured = [vac.status_entity, vac.battery_entity, vac.last_clean_entity,
      vac.progress_entity, vac.current_room_entity, vac.error_entity].filter(Boolean).length;
    return html`
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => this._toggleSensors(vacIdx)}>
          <span class="collapsible-title">Sensors</span>
          ${configured ? html`<span class="badge">${configured} configured</span>` : nothing}
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="collapsible-body">
            <p class="hint">Leave the sensors below blank to auto-fill them from the vacuum's device (battery, status, last clean, progress, current room, error).</p>
            ${this._entityPicker("Status", vac.status_entity, ["sensor"],
              v => this._setVacuum(vacIdx, { status_entity: v || undefined }))}
            ${this._entityPicker("Battery", vac.battery_entity, ["sensor"],
              v => this._setVacuum(vacIdx, { battery_entity: v || undefined }))}
            ${this._entityPicker("Last clean end", vac.last_clean_entity, ["sensor"],
              v => this._setVacuum(vacIdx, { last_clean_entity: v || undefined }))}
            ${this._entityPicker("Progress", vac.progress_entity, ["sensor"],
              v => this._setVacuum(vacIdx, { progress_entity: v || undefined }))}
            ${this._entityPicker("Current room", vac.current_room_entity, ["sensor"],
              v => this._setVacuum(vacIdx, { current_room_entity: v || undefined }))}
            ${this._entityPicker("Error", vac.error_entity, ["sensor"],
              v => this._setVacuum(vacIdx, { error_entity: v || undefined }))}
          </div>
        ` : nothing}
      </div>`;
  }

  private _renderPresetsSection(vacIdx: number, vac: VacuumConfig) {
    const isOpen = this._openPresets.has(vacIdx);
    const presets = vac.presets ?? [];
    const speeds: string[] = (this.hass.states[vac.entity]?.attributes["fan_speed_list"] as string[]) ?? [];
    const ca = vac.clean_action as Partial<NativeAutoCleanAction> | undefined;
    const mopModeEnt = ca?.mop_mode_entity;
    const mopIntEnt = ca?.mop_intensity_entity;
    return html`
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => this._togglePresets(vacIdx)}>
          <span class="collapsible-title">Setting presets</span>
          ${presets.length ? html`<span class="badge">${presets.length}</span>` : nothing}
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="collapsible-body">
            <p class="hint">Named "how" bundles for Manual mode — the user picks one on the controller, then picks rooms. Mop entities come from Clean action above; presets only set the values. With fewer than 2 presets the controller shows no chips (a default from Clean action is used).</p>
            ${presets.map((p, pi) => html`
              <div class="sub-section">
                <div class="sub-title" style="display:flex;align-items:center;justify-content:space-between">
                  <span>${p.label || p.id}</span>
                  <button class="icon-btn icon-btn--danger" title="Delete preset"
                    @click=${() => this._deletePreset(vacIdx, pi)}>
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
                ${this._textField("Label", p.label, v => this._setPreset(vacIdx, pi, { label: v }), "e.g. Dry")}
                ${this._textField("Icon", p.icon, v => this._setPreset(vacIdx, pi, { icon: v || undefined }), "mdi:broom")}
                ${speeds.length
                  ? this._optionSelectFromList("Suction", speeds, p.suction_level,
                      v => this._setPreset(vacIdx, pi, { suction_level: v || undefined }))
                  : this._textField("Suction", p.suction_level,
                      v => this._setPreset(vacIdx, pi, { suction_level: v || undefined }), "e.g. max")}
                ${mopModeEnt ? this._optionSelect("Mop mode", mopModeEnt, p.mop_mode,
                  v => this._setPreset(vacIdx, pi, { mop_mode: v || undefined })) : nothing}
                ${mopIntEnt ? this._optionSelect("Mop intensity", mopIntEnt, p.mop_intensity,
                  v => this._setPreset(vacIdx, pi, { mop_intensity: v || undefined })) : nothing}
                ${this._numberSlider("Repeat passes", p.repeat ?? 1, 1, 3, 1,
                  v => this._setPreset(vacIdx, pi, { repeat: v }))}
              </div>
            `)}
            <button class="btn btn--add" @click=${() => this._addPreset(vacIdx)}>
              <ha-icon icon="mdi:plus"></ha-icon> Add preset
            </button>
          </div>
        ` : nothing}
      </div>`;
  }

  private _renderCleanActionSection(vacIdx: number, vac: VacuumConfig) {
    const isOpen = this._openAction.has(vacIdx);
    const action = vac.clean_action ?? { type: "native" as const };
    return html`
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => this._toggleAction(vacIdx)}>
          <span class="collapsible-title">Clean action</span>
          <span class="badge">${action.type}</span>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="collapsible-body">
            ${this._renderCleanActionEditor(vacIdx, vac)}
          </div>
        ` : nothing}
      </div>`;
  }

  private _renderCleanActionEditor(vacIdx: number, vac: VacuumConfig) {
    const action = vac.clean_action ?? { type: "native" as const };
    return html`
      ${this._selectField<"native" | "native-area" | "script">("Strategy",
        action.type === "native-auto" ? "native" : action.type,
        [{ value: "native",      label: "Native (vacuum.send_command + segment IDs)" },
         { value: "native-area", label: "Native area (vacuum.clean_area)" },
         { value: "script",      label: "Custom script" }],
        v => {
          if (v === "script") {
            this._setVacuum(vacIdx, { clean_action: { type: "script", entity_id: "" } });
            return;
          }
          // Carry shared settings over when switching between native variants
          const prev = this._config.vacuums[vacIdx]?.clean_action;
          const carry: Record<string, unknown> = {};
          if (prev && prev.type !== "script") {
            for (const k of ["repeat", "suction_level", "mop_mode_entity", "mop_mode",
              "mop_intensity_entity", "mop_intensity"] as const) {
              const val = (prev as unknown as Record<string, unknown>)[k];
              if (val !== undefined) carry[k] = val;
            }
          }
          this._setVacuum(vacIdx, { clean_action: { type: v, ...carry } as CleanAction });
        })}
      ${action.type === "script"
        ? this._renderScriptAction(vacIdx, action as ScriptCleanAction)
        : this._renderNativeOptions(vacIdx,
            action as NativeCleanAction | NativeAutoCleanAction | NativeAreaCleanAction)}`;
  }

  /** Shared editor for all three native strategies — only the hint differs */
  private _renderNativeOptions(
    vacIdx: number,
    action: NativeCleanAction | NativeAutoCleanAction | NativeAreaCleanAction
  ) {
    const hint =
      action.type === "native-area"
        ? html`<p class="hint">Calls <code>vacuum.clean_area</code> (degraded mode only — with the AnyVac integration the START button sends <code>anyvac.clean</code> instead). No repeat; repeat lives server-side in <code>anyvac.clean</code>.</p>`
        : action.type === "native-auto"
          ? html`<p class="hint">Legacy value, no longer offered above — behaves identically to <strong>Native</strong> (segment-based) both with and without the integration. Safe to leave as-is; re-selecting "Native" above rewrites it.</p>`
          : html`<p class="hint">Degraded mode only — with the AnyVac integration the START button always sends <code>anyvac.clean</code> instead, which resolves segments server-side.</p>`;
    return html`
      <div class="sub-section">
        ${hint}
        ${this._numberSlider("Repeat passes", action.repeat ?? 1, 1, 3, 1,
          v => this._setCleanAction(vacIdx, { repeat: v }))}
        <div class="sub-title">Suction level (optional)</div>
        ${(() => {
          const speeds: string[] = (this.hass.states[this._config.vacuums[vacIdx]?.entity]
            ?.attributes["fan_speed_list"] as string[]) ?? [];
          return speeds.length
            ? this._optionSelectFromList("Suction option", speeds, action.suction_level,
                v => this._setCleanAction(vacIdx, { suction_level: v || undefined }))
            : this._textField("Suction option", action.suction_level,
                v => this._setCleanAction(vacIdx, { suction_level: v || undefined }), "e.g. balanced");
        })()}
        <div class="sub-title">Mop mode (optional)</div>
        ${this._entityPicker("Mop mode entity", action.mop_mode_entity, ["select"],
          v => this._setCleanAction(vacIdx, { mop_mode_entity: v || undefined }))}
        ${action.mop_mode_entity ? this._optionSelect("Mop mode option", action.mop_mode_entity, action.mop_mode,
          v => this._setCleanAction(vacIdx, { mop_mode: v || undefined })) : nothing}
        <div class="sub-title">Mop intensity (optional)</div>
        ${this._entityPicker("Mop intensity entity", action.mop_intensity_entity, ["select"],
          v => this._setCleanAction(vacIdx, { mop_intensity_entity: v || undefined }))}
        ${action.mop_intensity_entity ? this._optionSelect("Mop intensity option", action.mop_intensity_entity, action.mop_intensity,
          v => this._setCleanAction(vacIdx, { mop_intensity: v || undefined })) : nothing}
      </div>`;
  }

  private _renderScriptAction(vacIdx: number, action: ScriptCleanAction) {
    const vars = action.variables ?? {};
    const entries = Object.entries(vars);
    return html`
      <div class="sub-section">
        ${this._entityPicker("Script entity", action.entity_id, ["script"],
          v => this._setCleanAction(vacIdx, { entity_id: v }))}
        <p class="hint">Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}</p>
        ${entries.map(([key, val], vi) => html`
          <div class="var-row">
            <input class="text-input text-input--half" .value=${key} placeholder="name"
              @change=${(e: Event) => {
                const newKey = (e.target as HTMLInputElement).value;
                const newVars = Object.fromEntries(entries.map(([k, v], i) => [i === vi ? newKey : k, v]));
                this._setCleanAction(vacIdx, { variables: newVars });
              }} />
            <span class="var-sep">&#8594;</span>
            <input class="text-input text-input--half" .value=${val} placeholder="{{ entity }}"
              @change=${(e: Event) => {
                const newVars = { ...vars, [key]: (e.target as HTMLInputElement).value };
                this._setCleanAction(vacIdx, { variables: newVars });
              }} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${() => {
                const newVars = Object.fromEntries(entries.filter((_, i) => i !== vi));
                this._setCleanAction(vacIdx, { variables: newVars });
              }}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <button class="btn btn--add btn--sm"
          @click=${() => this._setCleanAction(vacIdx, { variables: { ...vars, "": "" } })}>
          <ha-icon icon="mdi:plus"></ha-icon> Add variable
        </button>
      </div>`;
  }

  private _renderRoomAccordion(room: RoomConfig, vacIdx: number, roomIdx: number) {
    const isOpen = (this._openRoom.get(vacIdx) ?? null) === roomIdx;
    return html`
      <div class="room-acc"
        style=${this._dragRoom && this._dragRoom.vac === vacIdx && this._dragRoom.idx !== roomIdx
          ? styleMap({ outline: "2px dashed var(--primary-color,#3b82f6)", outlineOffset: "-2px" }) : nothing}
        @dragover=${(e: DragEvent) => { if (this._dragRoom && this._dragRoom.vac === vacIdx) e.preventDefault(); }}
        @drop=${(e: DragEvent) => { e.preventDefault(); if (this._dragRoom && this._dragRoom.vac === vacIdx) this._moveRoom(vacIdx, this._dragRoom.idx, roomIdx); this._dragRoom = null; }}>
        <div class="room-acc-header" @click=${() => this._toggleRoom(vacIdx, roomIdx)}>
          <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
            @click=${(e: Event) => e.stopPropagation()}
            @dragstart=${(e: DragEvent) => { this._dragRoom = { vac: vacIdx, idx: roomIdx }; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }}
            @dragend=${() => { this._dragRoom = null; }}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${room.icon || "mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${room.name || room.key || "Unnamed room"}</span>
            ${room.segment_id !== undefined && !this._intEntityFor(this._config.vacuums[vacIdx])
              ? html`<span class="room-acc-meta">seg ${room.segment_id}</span>` : nothing}
          </div>
          <button class="icon-btn icon-btn--danger icon-btn--sm"
            @click=${(e: Event) => { e.stopPropagation(); this._deleteRoom(vacIdx, roomIdx); }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="room-acc-body">
            ${this._textField("Key (unique ID)", room.key,
              v => this._setRoom(vacIdx, roomIdx, { key: v }), "e.g. bedroom")}
            <p class="hint">Tip: keep this identical to the room's name in the Roborock app — the AnyVac integration matches rooms by this name (auto-seating, live positions from the integration, room pinning).</p>
            ${this._textField("Display name", room.name,
              v => this._setRoom(vacIdx, roomIdx, { name: v }), "e.g. Bedroom")}
            <p class="hint">Cleaning sequence moved to a shared, backend-owned reorderable
              list — see the <strong>Maps tab</strong> (requires the AnyVac integration + merged mode).</p>
            ${this._intEntityFor(this._config.vacuums[vacIdx])
              ? html`<p class="hint">Segment resolution, timing and clean history are handled
                  server-side by the AnyVac integration for this vacuum — nothing to set here.</p>`
              : this._config.vacuums[vacIdx]?.clean_action?.type === "native-area"
                ? html`
                  <div class="field field--row">
                    <label>Effective area</label>
                    <strong style="font-size:13px">${
                      /* must mirror the card's resolution order */
                      room.area_id ?? this._config.area_mappings?.[room.key] ?? room.key
                    }</strong>
                  </div>
                  <p class="hint map-hint" @click=${() => { this._tab = "global"; }}>
                    Set in <strong>Global tab → Area mappings</strong> →
                  </p>`
                : html`
                  <div class="field field--row">
                    <label>Segment ID</label>
                    <input class="text-input text-input--sm" type="number"
                      .value=${String(room.segment_id ?? "")} placeholder="e.g. 16"
                      @change=${(e: Event) => {
                        const v = parseInt((e.target as HTMLInputElement).value);
                        this._setRoom(vacIdx, roomIdx, { segment_id: isNaN(v) ? undefined : v });
                      }} />
                  </div>
                  <p class="hint">Find IDs: Developer Tools → Actions → roborock.get_maps</p>
                  ${this._numberSlider("Est. clean time (fallback)", room.clean_time_mins ?? 0, 0, 120, 1,
                    v => this._setRoom(vacIdx, roomIdx, { clean_time_mins: v > 0 ? v : undefined }), " min")}
                  ${this._entityPicker("Clean time fallback (input_number, legacy)", room.clean_time_entity, ["input_number"],
                    v => this._setRoom(vacIdx, roomIdx, { clean_time_entity: v || undefined }))}
                  ${this._entityPicker("Last clean fallback (input_datetime, legacy)", room.last_clean_entity, ["input_datetime"],
                    v => this._setRoom(vacIdx, roomIdx, { last_clean_entity: v || undefined }))}
                  <p class="hint">Legacy read-only fallbacks for setups without the AnyVac
                    integration — the card never writes these helpers.</p>`}
            <p class="hint map-hint" @click=${() => { this._tab = "maps"; this._mapVac = vacIdx; this._mapRoom = roomIdx; }}>
              📍 Set position &amp; icon in the <strong>Maps tab</strong> →
            </p>
          </div>
        ` : nothing}
      </div>`;
  }

  // ── Tab: Maps ─────────────────────────────────────────────────────────────

  private _renderMapsTab() {
    const vacuums = this._config.vacuums;
    if (!vacuums.length) {
      return html`<div class="tab-body"><p class="hint">No vacuums configured. Add one in the Vacuums tab.</p></div>`;
    }
    const mapVac = Math.min(this._mapVac, vacuums.length - 1);
    const vac = vacuums[mapVac];
    const map = vac.map ?? { ...DEFAULT_MAP };
    // Snapshotted, not live (see `_refMapUrl`) — this is what stops the flash.
    // Populated by `updated()` right after the first render of this tab/vacuum
    // (a one-time empty frame, not a reload loop — deliberately NOT captured
    // here mid-render).
    const mapUrl = this._refMapVac === mapVac ? this._refMapUrl : "";
    const base = vac.base ?? "map";
    const ib = this._currentImageBase();
    const useImg = this._config.map_mode === "merged" ? !!ib?.src : ((base === "image" || base === "combined") && !!ib?.src);
    const previewUrl = useImg ? (ib!.src) : mapUrl;
    const pvRot    = useImg ? (ib!.rotation ?? 0) : (map.rotation ?? 0);
    const pvScale  = useImg ? (ib!.scale ?? 100)  : (map.scale ?? 100);
    const pvScaleY = useImg ? undefined           : map.scale_y;
    const pvOx     = useImg ? (ib!.offset_x ?? 0) : (map.offset_x ?? 0);
    const pvOy     = useImg ? (ib!.offset_y ?? 0) : (map.offset_y ?? 0);
    const rooms = this._editRooms();
    // docs/38 §3.3: `esLive` is the always-current fit (used for the text hint
    // and the manual-sliders gate — those should track `_config` immediately,
    // same as before). `esOverlay` is what the native-map overlay `<img>` below
    // is actually positioned with — frozen at `_rectDrag.seat` while a room rect
    // is being dragged, so the translucent reference doesn't itself become a
    // moving target the user is trying to align against (the whole point of
    // dragging a room is to match it to this overlay, which can't work if the
    // overlay keeps re-fitting to the very rect being moved on every pointermove).
    const esLive = this._editorSeat(mapVac);
    const seatDraftHere = this._seatDraft && this._seatDraft.vacIdx === mapVac ? this._seatDraft : null;
    const esOverlay = this._rectDrag?.seat ?? (seatDraftHere ? {
      rotation: seatDraftHere.rotation, scale: seatDraftHere.scale, scaleY: seatDraftHere.scale_y,
      offset_x: seatDraftHere.offset_x, offset_y: seatDraftHere.offset_y, auto: false,
    } : esLive);
    const cropBox = ib?.crop_box;
    // docs/40 §4.4-4.5 (Fáze 3): the two crop_box shapes drive very different
    // UI below — a home-frame crop (`frame_id`) replaces per-vacuum seating
    // entirely for whichever vacuums currently register into that frame,
    // while a legacy vacuum crop (`entity`) keeps today's auto/manual seat +
    // room-import flow untouched.
    const homeFrameCrop = cropBox && "frame_id" in cropBox ? cropBox : undefined;
    const vacCropBox = cropBox && "entity" in cropBox ? cropBox : undefined;
    const vacHomeFrame = (this._intEntityFor(vac)
      ? (this.hass.states[this._intEntityFor(vac)!]?.attributes as Record<string, any> | undefined)?.home_frame
      : undefined) as { id?: string } | null | undefined;
    // This specific vacuum is rendered via the shared home frame right now —
    // same test the card's own `homeFrameCropFor` (seatfit.ts) makes at
    // render time, so the editor's controls match what's actually drawn.
    const isHomeFrame = !!homeFrameCrop && !!vacHomeFrame?.id && vacHomeFrame.id === homeFrameCrop.frame_id;
    const registration = (this._intEntityFor(vac)
      ? (this.hass.states[this._intEntityFor(vac)!]?.attributes as Record<string, any> | undefined)?.registration
      : undefined) as { status?: string; rotation_deg?: number; score?: number } | null | undefined;
    // docs/40 §5.A.1: a uniform re-export (same aspect ratio, different pixel
    // size — the user re-saved the floorplan at 2×, or a different DPI) is
    // NOT a mismatch; only a genuinely different crop (aspect ratio changed
    // too) still warns. `canvasScaleForCrop` returns the detected scale
    // (harmless — nothing downstream reads it, see its own doc comment) or
    // `null` for a real mismatch.
    const vacCanvasScale = vacCropBox ? canvasScaleForCrop(this._pvNat, vacCropBox) : null;
    const cropMismatch = !!vacCropBox && !!this._pvNat && vacCanvasScale === null;
    const homeFrameCanvasScale = homeFrameCrop ? canvasScaleForCrop(this._pvNat, homeFrameCrop) : null;
    const homeFrameCropMismatch = !!homeFrameCrop && !!this._pvNat && homeFrameCanvasScale === null;
    const canPlaceFromCrop = !!vacCropBox
      && this._config.vacuums.some((v) => v.entity === vacCropBox.entity)
      && (() => {
        const cbVac = this._config.vacuums.find((v) => v.entity === vacCropBox.entity);
        const ie = this._intEntityFor(cbVac);
        const at = ie ? (this.hass.states[ie]?.attributes as Record<string, any> | undefined) : undefined;
        return Array.isArray(at?.rooms) && at!.rooms.some((r: any) => !!r?.bbox_px);
      })();

    return html`
      <div class="tab-body">

        ${vacuums.length > 1 ? html`
          <div class="pill-row">
            ${vacuums.map((v, i) => html`
              <button class="vac-pill ${i === mapVac ? "vac-pill--active" : ""}"
                @click=${() => { this._mapVac = i; this._mapRoom = null; }}>
                ${v.name || v.entity || "Vacuum " + (i + 1)}
              </button>`)}
          </div>
        ` : nothing}

        <div class="field field--row">
          <label>Swap ↔/↕ everywhere below</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._hvSwap}
              @change=${(e: Event) => { this._hvSwap = (e.target as HTMLInputElement).checked; }} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">HA's own edit-card dialog can render the preview above (and below) at a
          different width than your real dashboard — which can flip whether the map auto-rotates
          90°, independently of any Rotation field. If dragging a slider marked ↔ (horizontal)
          visibly moves something vertically — judge by your <strong>real dashboard</strong>, not
          this dialog — turn this on to fix every ↔/↕ label in this tab at once (Scale, Offset,
          Image offset, Room position/size).</p>

        ${this._selectField<"split" | "merged">("Map mode (all vacuums)", this._config.map_mode ?? "split",
          [{ value: "split", label: "Split — one map per vacuum" }, { value: "merged", label: "Merged — all in one map" }],
          v => this._setConfig({ map_mode: v === "merged" ? "merged" : undefined }))}

        ${this._mergedEdit && !this._config.image_base?.src ? html`
          <p class="hint">Merged needs a shared floorplan below or vacuums' raw maps just get laid on top of
            each other unaligned. No photo of your own? Pick a vacuum, scroll to "Shared floorplan" and use
            "Use this vacuum's current map as floorplan" — its own rooms place themselves automatically; every
            other vacuum whose room names match then auto-fits too, with nothing else to set.</p>
        ` : nothing}

        ${this._mergedEdit ? nothing : this._selectField("Base layer", (vac.base ?? "map"),
          [{ value: "map", label: "Vacuum map" }, { value: "combined", label: "Image + map" }],
          v => this._setVacuum(mapVac, { base: v }))}

        ${this._entityPicker("AnyVac integration sensor", vac.integration_entity, ["sensor"],
          v => this._setVacuum(mapVac, { integration_entity: v }))}

        <!-- docs/42 §3/§9 faze H: "Hide vacuum map"/Overlay opacity/Overlay
             blend moved to the Visual editor's Seat and Appearance tool -- they're
             backend-override-backed there now (anyvac.set_floorplan_seat's
             appearance key), not plain YAML fields, so editing them through THIS
             form would silently be shadowed by a live override the same way seat
             geometry used to be before docs/41's follow-up (_commitSeat). One
             hint line instead of a dead control. -->
        ${(this._intEntityFor(vac) || this._config.map_mode === "merged") ? html`
          <p class="hint">Map appearance (hide map, overlay opacity/blend, path/mop
            colours, robot image) is now set in the Visual editor's Seat &amp;
            Appearance tool, not here — open it from the card's own "Align"/edit
            entry point.</p>
        ` : nothing}

        ${vac.base === "image" || vac.base === "combined" || this._config.map_mode === "merged" ? html`
          ${this._config.map_mode === "merged" ? html`<div class="section-title">Shared floorplan (all vacuums)</div>` : nothing}
          ${this._config.map_mode === "merged" ? html`
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._homeFrameSnapshotBusy}
              @click=${() => this._snapshotHomeFrame()}>
              <ha-icon icon="mdi:vector-combine"></ha-icon>
              ${this._homeFrameSnapshotBusy ? "Snapshotting…" : "Snapshot home frame as floorplan"}
            </button>
            <p class="hint">Docs/40 Phase 3 — the recommended way to set up merged mode with 2+ vacuums:
              renders a composite of every vacuum currently registered into the shared "home frame"
              (see each vacuum's <code>registration</code> sensor attribute) and turns it into the
              floorplan below. No per-vacuum seating needed afterwards — a vacuum registered into this
              frame draws its robot/path/rooms at their exact real position automatically, and a vacuum
              that ISN'T (different floor, just restarted) falls back to the seating controls below on
              its own. Requires anyvac integration ≥ 1.8.0.</p>
            ${this._homeFrameSnapshotError ? html`<p class="hint" style="color:#ff6b6b">${this._homeFrameSnapshotError}</p>` : nothing}
            ${homeFrameCrop ? html`
              <p class="hint">Home frame: <code>${homeFrameCrop.frame_id}</code> ·
                ${homeFrameCrop.x0},${homeFrameCrop.y0}–${homeFrameCrop.x1},${homeFrameCrop.y1}
                (${homeFrameCrop.x1 - homeFrameCrop.x0}×${homeFrameCrop.y1 - homeFrameCrop.y0}px)
                <span class="footer-link" style="margin-left:6px" @click=${() => this._setEditedImageBase({ crop_box: undefined })}>Clear</span>
              </p>
              ${homeFrameCropMismatch && this._pvNat ? html`
                <p class="hint" style="color:#faad14">⚠️ The saved floorplan file is
                  ${this._pvNat.w}×${this._pvNat.h}px, which doesn't match this home frame's
                  ${homeFrameCrop.x1 - homeFrameCrop.x0}×${homeFrameCrop.y1 - homeFrameCrop.y0}px — rooms and
                  markers placed on it won't line up. Re-snapshot the home frame, or Clear it above.</p>
              ` : (homeFrameCanvasScale !== null && Math.abs(homeFrameCanvasScale - 1) > 0.01 ? html`
                <p class="hint">ℹ️ File is a ${homeFrameCanvasScale.toFixed(2)}× export of this home frame
                  (same shape, different resolution) — recognized automatically, no need to re-snapshot.</p>
              ` : nothing)}
            ` : nothing}
            <div class="section-title">or, a floorplan photo of your own</div>
          ` : nothing}

          ${this._mapEntityFor(vac) ? html`
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._floorplanSnapshotBusy}
              @click=${() => this._snapshotFloorplan(vac)}>
              <ha-icon icon="mdi:camera"></ha-icon>
              ${this._floorplanSnapshotBusy ? "Snapshotting…" : "Use this vacuum's current map as floorplan"}
            </button>
            <p class="hint">No floor plan photo of your own, and no home frame yet either? This saves
              ${vac.name || vac.entity}'s current map as a static image and sets it as the floorplan
              below — the easiest way to get auto-fit working across multiple vacuums. Also places
              ${vac.name || vac.entity}'s own rooms on it automatically (no dragging needed) and turns
              "Hide vacuum map" on for
              ${this._config.map_mode === "merged" ? "every vacuum sharing this floorplan" : "this vacuum"}.
              Pick your fullest-coverage vacuum for this step, then switch to each other vacuum below —
              any of its rooms whose name matches one already placed auto-fits with nothing else to do;
              use "Import" only for rooms exclusive to that vacuum. Requires anyvac integration ≥ 0.88.0.</p>
            ${this._floorplanSnapshotError ? html`<p class="hint" style="color:#ff6b6b">${this._floorplanSnapshotError}</p>` : nothing}
          ` : nothing}

          ${this._mapEntityFor(vac) && !homeFrameCrop ? html`
            <div class="section-title">Custom floorplan helper</div>
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._guideExportBusy}
              @click=${() => this._exportMapGuide(vac)}>
              <ha-icon icon="mdi:layers-outline"></ha-icon>
              ${this._guideExportBusy ? "Exporting…" : "Export guide layers"}
            </button>
            <p class="hint">Opens as layers over the floorplan snapshot in any image editor —
              the gaps inside the path are where your furniture stands. Requires anyvac
              integration ≥ 1.4.0.</p>
            ${this._guideExportError ? html`<p class="hint" style="color:#ff6b6b">${this._guideExportError}</p>` : nothing}
            ${this._guideExportResult ? html`
              <p class="hint">${this._guideExportResult.size.w}×${this._guideExportResult.size.h}px${
                this._guideExportResult.crop ? html` · crop ${this._guideExportResult.crop.x0},${this._guideExportResult.crop.y0}–${this._guideExportResult.crop.x1},${this._guideExportResult.crop.y1}` : nothing} —
                ${Object.entries(this._guideExportResult.paths).map(([layer, url], i) => html`${i > 0 ? " · " : ""}<a href=${url} target="_blank" rel="noopener">${layer}</a>`)}
              </p>
              ${this._guideExportResult.crop && (!vacCropBox || vacCropBox.entity !== this._guideExportResult.entity) ? html`
                <button class="btn btn--sm" style="align-self:flex-start"
                  @click=${() => this._setEditedImageBase({
                    crop_box: { entity: this._guideExportResult!.entity, ...this._guideExportResult!.crop! },
                  })}>
                  <ha-icon icon="mdi:crop"></ha-icon> Use this crop for the floorplan
                </button>
              ` : nothing}
            ` : nothing}

            ${vacCropBox ? html`
              <p class="hint">Crop box: <code>${vacCropBox.entity}</code> ·
                ${vacCropBox.x0},${vacCropBox.y0}–${vacCropBox.x1},${vacCropBox.y1}
                (${vacCropBox.x1 - vacCropBox.x0}×${vacCropBox.y1 - vacCropBox.y0}px)
                <span class="footer-link" style="margin-left:6px" @click=${() => this._setEditedImageBase({ crop_box: undefined })}>Clear</span>
              </p>
              ${cropMismatch && this._pvNat ? html`
                <p class="hint" style="color:#faad14">⚠️ The saved floorplan file is
                  ${this._pvNat.w}×${this._pvNat.h}px, which doesn't match this crop box's
                  ${vacCropBox.x1 - vacCropBox.x0}×${vacCropBox.y1 - vacCropBox.y0}px — rooms placed from it
                  won't line up. Re-snapshot the floorplan, or Clear the crop box above.</p>
              ` : (vacCanvasScale !== null && Math.abs(vacCanvasScale - 1) > 0.01 ? html`
                <p class="hint">ℹ️ File is a ${vacCanvasScale.toFixed(2)}× export of this crop
                  (same shape, different resolution) — recognized automatically, no need to re-snapshot.</p>
              ` : nothing)}
              <button class="btn btn--sm" style="align-self:flex-start"
                ?disabled=${!canPlaceFromCrop}
                title=${canPlaceFromCrop ? "" : "Needs the crop's own vacuum configured here, with the integration reporting at least one room"}
                @click=${() => this._placeRoomsFromCropBox()}>
                <ha-icon icon="mdi:vector-square"></ha-icon> Place rooms from crop box
              </button>
              ${this._placeRoomsResult ? html`
                <p class="hint">Placed ${this._placeRoomsResult.placed} room${this._placeRoomsResult.placed === 1 ? "" : "s"}
                  (${this._placeRoomsResult.added} added).</p>
              ` : nothing}
            ` : html`
              <p class="hint">No crop box yet — use "Use this vacuum's current map as floorplan" above
                (integration ≥ 1.5.0), or "Use this crop for the floorplan" after exporting guide layers below.</p>
            `}
          ` : nothing}

          ${this._textField("Image src (URL)", ib?.src, v => this._setEditedImageBase({ src: v }), "/local/anyvac/flat.svg")}
          ${this._numberSlider("Image rotation", ib?.rotation ?? 0, 0, 360, 90, v => this._setEditedImageBase({ rotation: v }), "°")}
          ${this._numberSlider("Image scale", ib?.scale ?? 100, 50, 200, 5, v => this._setEditedImageBase({ scale: v }), "%")}
          ${(() => {
            // Image offset moves the floorplan image in the PARENT (screen)
            // frame, before its own rotation is applied — unlike seat Scale,
            // it never swaps with Image rotation, only with the ambient
            // map-area rotation the "Swap ↔/↕" toggle above stands in for.
            const ibHField: "offset_x" | "offset_y" = this._hvSwap ? "offset_y" : "offset_x";
            const ibVField: "offset_x" | "offset_y" = this._hvSwap ? "offset_x" : "offset_y";
            const ibHVal = this._hvSwap ? (ib?.offset_y ?? 0) : (ib?.offset_x ?? 0);
            const ibVVal = this._hvSwap ? (ib?.offset_x ?? 0) : (ib?.offset_y ?? 0);
            return html`
              ${this._numberSlider("Image offset ↔ (horizontal)", ibHVal, -50, 50, 1, v => this._setEditedImageBase({ [ibHField]: v }), "%")}
              ${this._numberSlider("Image offset ↕ (vertical)",   ibVVal, -50, 50, 1, v => this._setEditedImageBase({ [ibVField]: v }), "%")}
            `;
          })()}

          ${this._config.map_mode === "merged" && !homeFrameCrop && ib?.src && this._anyHomeFrame() ? html`
            <div class="section-title">Calibrate against home frame (docs/40 §5.B)</div>
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._homeCalibBusy}
              @click=${() => this._startHomeCalibration()}>
              <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
              ${this._homeCalibBusy ? "Snapshotting…" : "Calibrate floorplan against home frame"}
            </button>
            <p class="hint">For a floorplan of your own (photo/drawing) rather than a home-frame
              snapshot: click the same physical point once on a live snapshot of the shared home
              frame (each click snaps to the nearest wall corner automatically) and once on the
              floorplan above, repeated for at least 2 points — spread them out, corners of
              different rooms work well. Unlike the floorplan photo itself, this calibration
              re-fits itself automatically as the home frame's canvas grows over time (the robots
              exploring further), so there's no need to re-click later. Also turns "Hide vacuum
              map" on for every vacuum, same as the snapshot button above. Requires anyvac
              integration ≥ 1.9.0 (the <code>anyvac.snap_wall_corner</code> service).</p>
            ${this._homeCalibError ? html`<p class="hint" style="color:#ff6b6b">${this._homeCalibError}</p>` : nothing}
            ${ib?.home_anchors?.length ? html`
              <p class="hint">Calibrated: <strong>${ib.home_anchors.length}</strong> anchor point${ib.home_anchors.length > 1 ? "s" : ""}
                against frame <code>${ib.home_anchors_frame_id}</code>
                <span class="footer-link" style="margin-left:6px"
                  @click=${() => this._setEditedImageBase({ home_anchors: undefined, home_anchors_frame_id: undefined })}>Clear</span>
              </p>
            ` : nothing}
            ${this._homeCalibResult ? html`
              <p class="hint">✅ Calibrated — fit error ${this._homeCalibResult.residual_pct}%.</p>
            ` : nothing}
          ` : nothing}

          ${this._config.map_mode === "merged" && !homeFrameCrop && this._anyHomeFrame() ? html`
            <div class="section-title">or, fiducial markers (docs/40 §5.A.2, advanced)</div>
            <button class="btn btn--sm" style="align-self:flex-start"
              ?disabled=${this._fiducialSnapshotBusy}
              @click=${() => this._snapshotHomeFrameWithFiducials()}>
              <ha-icon icon="mdi:crosshairs"></ha-icon>
              ${this._fiducialSnapshotBusy ? "Snapshotting…" : "1. Snapshot home frame with markers"}
            </button>
            <p class="hint">A third way to calibrate a floorplan of your own — skip this unless the
              tolerance check above and clicking through calibration both aren't enough (e.g. you
              need to rotate the file, not just crop/resize it). Saves a home-frame snapshot with 4
              invisible markers baked into its border, sets it as the floorplan below — now crop,
              resize and/or rotate that file in an external image editor as needed (GIMP etc.), keep
              it as PNG, and don't flatten it. Then set the floorplan src to your edited file (or
              overwrite the same file) and run step 2. Requires anyvac integration ≥ 1.9.0.</p>
            ${this._fiducialSnapshotError ? html`<p class="hint" style="color:#ff6b6b">${this._fiducialSnapshotError}</p>` : nothing}
            ${this._fiducialKnown ? html`
              <button class="btn btn--sm" style="align-self:flex-start"
                ?disabled=${this._fiducialDetectBusy || !ib?.src}
                @click=${() => this._detectFiducials()}>
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                ${this._fiducialDetectBusy ? "Detecting…" : "2. Detect markers in edited file"}
              </button>
              <p class="hint">Scans the floorplan src above (as it is now) for the markers step 1
                embedded and, once at least 2 of the 4 are found, calibrates from them — no
                clicking. Same self-healing <code>home_anchors</code> as manual calibration above,
                so it also survives the home frame's canvas growing later.</p>
              ${this._fiducialDetectError ? html`<p class="hint" style="color:#ff6b6b">${this._fiducialDetectError}</p>` : nothing}
              ${this._fiducialDetectResult ? html`
                <p class="hint">✅ Found ${this._fiducialDetectResult.found}/4 marker${this._fiducialDetectResult.found === 1 ? "" : "s"}${
                  this._fiducialDetectResult.missing.length ? html` (missing: ${this._fiducialDetectResult.missing.join(", ")})` : nothing}.</p>
              ` : nothing}
            ` : nothing}
            ${ib?.home_anchors?.length ? html`
              <p class="hint">Calibrated: <strong>${ib.home_anchors.length}</strong> anchor point${ib.home_anchors.length > 1 ? "s" : ""}
                against frame <code>${ib.home_anchors_frame_id}</code>
                <span class="footer-link" style="margin-left:6px"
                  @click=${() => this._setEditedImageBase({ home_anchors: undefined, home_anchors_frame_id: undefined })}>Clear</span>
              </p>
            ` : nothing}
          ` : nothing}
        ` : nothing}

        ${this._entityPicker("Map image entity", map.entity, ["image"],
          v => this._setMap(mapVac, { entity: v }))}
        ${!map.entity && this._mapEntityFor(vac) ? html`
          <p class="hint">Leave blank to auto-use <code>${this._mapEntityFor(vac)}</code> —
            found automatically on this vacuum's device. Set it explicitly only to
            override (e.g. a multi-map vacuum where the wrong floor's image was picked).</p>
        ` : nothing}
        ${this._mapEntityFor(vac) ? html`
          <button class="btn btn--sm" style="align-self:flex-start"
            @click=${() => this._snapshotRefMap()}>
            <ha-icon icon="mdi:refresh"></ha-icon> Refresh reference map
          </button>
          <p class="hint">The preview below is a frozen snapshot, not live — it used to
            reload (and visibly flash) on every edit, since Home Assistant refreshes this
            image's URL on nearly every state update. Use this button after the robot
            explores/remaps to update it.</p>
        ` : nothing}

        ${this._homeCalib ? this._renderHomeCalibStep(this._homeCalib, previewUrl, pvOx, pvOy, pvScale, pvRot)
        : this._calib && this._calib.vacIdx === mapVac ? this._renderCalibStep(this._calib, mapUrl, previewUrl, pvOx, pvOy, pvScale, pvRot)
        : previewUrl ? html`
          <div class="map-pos-container ${this._mapRoom !== null ? "map-pos-container--active" : ""}"
            @click=${(e: MouseEvent) => {
              if (this._mapRoom === null) return;
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              // docs/38 §2: 0.1% everywhere a room's geometry is written, to
              // match the precision `placeRoomInCrop`/`roomBboxToRect` already
              // write at — whole-percent click-to-place used to re-introduce a
              // visible snap even after the drag math (rectdrag.ts) was fixed.
              const x = round1(clampPct(((e.clientX - rect.left) / rect.width) * 100));
              const y = round1(clampPct(((e.clientY - rect.top) / rect.height) * 100));
              this._setEditedRoom(this._mapRoom, { map_x: x, map_y: y });
            }}>
            <div class="map-preview-wrap"
              style=${styleMap(this._pvAR > 0.1 ? { paddingTop: (100 / this._pvAR).toFixed(2) + "%" } : {})}>
              <img class="map-preview-img" src=${previewUrl} alt="Map preview"
                @load=${(e: Event) => {
                  const im = e.target as HTMLImageElement;
                  if (useImg && im.naturalWidth && im.naturalHeight) {
                    const arv = im.naturalWidth / im.naturalHeight;
                    if (Math.abs(arv - this._pvAR) > 0.01) this._pvAR = arv;
                    // docs/38 §4.4 — natural pixel size, for the crop-box size-
                    // mismatch warning above.
                    if (this._pvNat?.w !== im.naturalWidth || this._pvNat?.h !== im.naturalHeight) {
                      this._pvNat = { w: im.naturalWidth, h: im.naturalHeight };
                    }
                  }
                }}
                style=${styleMap({
                  left:      (50 + pvOx) + "%",
                  top:       (50 + pvOy) + "%",
                  width:     pvScale + "%",
                  transform: "translate(-50%,-50%) " + seatRotateScaleCss(pvRot, pvScale, pvScaleY),
                })} />
              ${this._mergedEdit && useImg && mapUrl ? html`<img class="map-preview-img" src=${mapUrl} alt="Native map"
                style=${styleMap({
                  left:      (50 + esOverlay.offset_x) + "%",
                  top:       (50 + esOverlay.offset_y) + "%",
                  width:     esOverlay.scale + "%",
                  transform: "translate(-50%,-50%) " + seatRotateScaleCss(esOverlay.rotation, esOverlay.scale, esOverlay.scaleY),
                  opacity:   "0.5",
                })} />` : nothing}
              ${rooms.map((r, ri) => {
                const active = ri === this._mapRoom;
                const cx = r.map_x ?? 50, cy = r.map_y ?? 50;
                // Rectangle overlay mode (map_w/map_h set, §"Enable rectangle overlay"
                // below): draw the ACTUAL box instead of just a centre dot, so its
                // extent is visible while dragging/resizing — the whole point of this
                // fix (2026-07-26 field report: sliders moved a box nobody could see).
                if (r.map_w != null) {
                  const w = r.map_w, h = r.map_h ?? 15;
                  return html`
                    <div class="room-rect ${active ? "room-rect--active" : ""}"
                      style=${styleMap({ left: cx + "%", top: cy + "%", width: w + "%", height: h + "%" })}
                      @pointerdown=${(e: PointerEvent) => this._onRoomPointerDown(ri, "move", r, e)}
                      @pointermove=${(e: PointerEvent) => this._onRoomPointerMove(e)}
                      @pointerup=${() => this._onRoomPointerUp()}
                      @click=${(e: Event) => e.stopPropagation()}>
                      <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                      ${active ? (["nw", "ne", "sw", "se"] as const).map(pos => html`
                        <div class="room-rect-handle room-rect-handle--${pos}"
                          @pointerdown=${(e: PointerEvent) => this._onRoomPointerDown(ri, ("resize-" + pos) as "resize-nw", r, e)}
                          @pointermove=${(e: PointerEvent) => this._onRoomPointerMove(e)}
                          @pointerup=${() => this._onRoomPointerUp()}
                          @click=${(e: Event) => e.stopPropagation()}></div>
                      `) : nothing}
                    </div>`;
                }
                return html`
                  <div class="pos-dot ${active ? "pos-dot--active" : ""}"
                    style=${styleMap({ left: cx + "%", top: cy + "%" })}
                    @pointerdown=${(e: PointerEvent) => this._onRoomPointerDown(ri, "move", r, e)}
                    @pointermove=${(e: PointerEvent) => this._onRoomPointerMove(e)}
                    @pointerup=${() => this._onRoomPointerUp()}
                    @click=${(e: Event) => e.stopPropagation()}>
                    <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                  </div>`;
              })}
            </div>
          </div>

          <div class="section-title">Map seating ${this._mergedEdit ? "(this vacuum)" : ""}</div>
          ${isHomeFrame ? html`
            <p class="hint">✅ Rendered via the shared home frame — no seating needed. Status:
              <strong>${registration?.status ?? "aligned"}</strong>${registration?.rotation_deg != null ? html` · rot ${registration.rotation_deg}°` : nothing}${
              registration?.score != null ? html` · score ${(registration.score * 100).toFixed(0)}%` : nothing}.
              Its rooms, robot position and cleaning path are drawn at their exact real position
              automatically (docs/40 kontrakt v3) — the auto/manual seating and room-import controls
              below don't apply to it while this stays true.</p>
          ` : html`
            ${homeFrameCrop ? html`
              <p class="hint">This vacuum isn't currently registered into the <code>${homeFrameCrop.frame_id}</code>
                home frame the floorplan above was snapshotted from${registration?.status ? html` (status:
                <strong>${registration.status}</strong>)` : nothing} — falling back to its own seating below.</p>
            ` : nothing}
            ${(() => {
              // docs/41 follow-up (1.13.0): a live backend override always wins
              // over whatever's in YAML (`applyFloorplanSeats`, unconditionally,
              // regardless of this vacuum's own `seat` field) — so once one
              // exists, the Auto/Manual toggle and the auto-fit-vs-inactive hint
              // below are no longer telling the truth about what's on screen;
              // they're replaced with this banner instead. The sliders below stay
              // visible either way — they keep working, just against the backend.
              const hasBackendSeat = this._hasBackendSeat(mapVac);
              const src = resolveImageBaseSrc(this._config, vac);
              if (hasBackendSeat) return html`
                <p class="hint">🔗 This vacuum's seating is saved in the backend, not this card's YAML —
                  the sliders below read and write it directly. Any old geometry left over in YAML is
                  ignored and gets cleared out automatically the next time you change something here.</p>
              `;
              if (this._seatServiceAvailable() && src) return html`
                <p class="hint">ℹ️ A backend is available for this floorplan — the first change you make
                  below will save into it instead of this card's YAML, and any manual geometry already in
                  YAML will be cleared out once that succeeds.</p>
              `;
              return nothing;
            })()}
            ${this._seatSaveError ? html`<p class="hint" style="color:#ff6b6b">${this._seatSaveError}</p>` : nothing}
            ${this._hasBackendSeat(mapVac) ? nothing : this._selectField<"auto" | "manual">("Seating", (map.seat === "manual" ? "manual" : "auto"),
              [{ value: "auto", label: "Auto — fit from rooms" },
               { value: "manual", label: "Manual — sliders" }],
              v => this._setMap(mapVac, { seat: v === "manual" ? "manual" : undefined }))}
            ${this._hasBackendSeat(mapVac) ? nothing : (map.seat !== "manual" ? (esLive.auto ? html`
              <p class="hint">✅ Auto-fit from <strong>${esLive.anchorCount}</strong> room${(esLive.anchorCount ?? 0) > 1 ? "s" : ""}:
                rot ${esLive.rotation}° · scale ${esLive.scale.toFixed(1)}% · offset ${esLive.offset_x.toFixed(1)}/${esLive.offset_y.toFixed(1)}%
                · fit error ${(esLive.residual ?? 0).toFixed(1)}%${(esLive.residual ?? 0) > 3 ? " ⚠️ check room rectangles / keys" : ""}${
                esLive.anchorCount === 1 ? " (single room — orientation estimated from its shape)" : ""}.
                Recomputed live — self-heals after the robot remaps.${this._rectDrag ? " (overlay preview above is frozen until you release the drag)" : ""}</p>
            ` : html`
              <p class="hint">Auto-fit inactive — it needs the integration sensor, a floorplan and at least one
                room rectangle whose key matches a room name on this robot's map. Using the manual values below.</p>
            `) : nothing)}
            ${mapUrl && previewUrl && useImg ? html`
              <button class="btn btn--sm" style="align-self:flex-start"
                @click=${() => this._startCalibration(mapVac)}>
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon> Calibrate from clicked points
              </button>
              <p class="hint">If auto-fit's fit error stays high no matter how the room rectangles are tuned,
                the rectangles' shapes likely don't match this robot's real rooms yet — no amount of rotation/
                scale can fix that. This bootstraps a correct seat instead: click the same physical point once
                on this vacuum's own map and once on the floorplan, repeated for at least 2 points — each pair
                you add shows its effect on the fit error live, so click a couple more if it's not tight enough
                yet (spread them out — corners of different rooms work well). Save once you're happy with the
                number, then use "Import missing rooms" below to place this vacuum's rooms correctly; other
                vacuums often auto-fit correctly too, once the floorplan's rectangles are accurate.</p>
            ` : nothing}
            ${this._calibResult ? html`
              <p class="hint">✅ Calibrated — fit error ${this._calibResult.residual_pct}%. Now use
                "Import missing rooms from this vacuum" below to place its rooms.</p>
            ` : nothing}
            ${this._calibError ? html`<p class="hint" style="color:#ff6b6b">${this._calibError}</p>` : nothing}
            ${vacuums.length > 1 && rooms.length > 0 ? (() => {
              const unmatched = this._unmatchedOwnRoomNames(mapVac);
              return unmatched.length ? html`
                <p class="hint" style="color:#faad14">⚠️ This vacuum reports room${unmatched.length > 1 ? "s" : ""}
                  not on the shared floorplan yet: <strong>${unmatched.join(", ")}</strong>. If any of these are the
                  same physical room as one already listed above under a different name, rename it to match in the
                  Roborock app (room pairing is by exact name across vacuums) — otherwise use Import below to add it.</p>
              ` : nothing;
            })() : nothing}
            ${(map.seat === "manual" || !esLive.auto) ? (() => {
              // Field report 2026-09-15/17: `scale`/`scale_y` are stored as the
              // robot's own LOCAL axes (pre-rotation — see seatfit.ts), which is
              // the only frame in which the geometry math stays simple at ANY
              // angle. But a person aligning a map by eye thinks in what they see
              // on screen, not the robot's un-rotated axes — and at 90°/270° those
              // disagree (local X ends up as the floorplan's vertical extent, not
              // horizontal). Rather than ask the user to hold that swap in their
              // head, these two sliders relabel themselves as "horizontal"/
              // "vertical" and swap which underlying field they read/write,
              // using the SAME rot90 test `roomBboxToRect` already uses for its
              // own axis swap (`isRot90`, seatfit.ts) — so the slider labelled
              // "horizontal" always does what it says, whatever Rotation is set
              // to. The stored config keys (`scale`/`scale_y`) are unchanged and
              // still mean "local X"/"local Y" if read directly from YAML.
              // Scale is stored in the robot's own LOCAL axes (pre-rotation,
              // see seatfit.ts), so it swaps with Rotation itself. Offset moves
              // the seat in the PARENT (floorplan) frame, before that local
              // rotation — it never swaps with Rotation, only with the ambient
              // map-area rotation the "Swap ↔/↕" toggle above stands in for.
              // XOR-ing the two swaps for Scale (and using the ambient one
              // alone for Offset) is what lets a single toggle correct every
              // ↔/↕ label in this tab at once, whatever each field's own
              // swap condition is.
              // 1.13.0: base geometry is the EFFECTIVE seat (`esLive`, already
              // backend-aware via `_editorSeat`) once backend-managed, since
              // raw YAML no longer has anything meaningful in it after the
              // first successful strip — falls back to raw `map` otherwise,
              // unchanged from before this feature. `seatDraftHere` (a live
              // drag in progress) overrides either, so the sliders track the
              // pointer instead of snapping back on every re-render — see
              // `_seatDraft`'s own doc comment for why raw-YAML-write-per-tick
              // can't drive that any more once a backend override exists.
              const backendManaged = this._hasBackendSeat(mapVac);
              const baseGeom = backendManaged
                ? { rotation: esLive.rotation, scale: esLive.scale, scale_y: esLive.scaleY,
                    offset_x: esLive.offset_x, offset_y: esLive.offset_y }
                : { rotation: map.rotation ?? 0, scale: map.scale ?? 100, scale_y: map.scale_y,
                    offset_x: map.offset_x ?? 0, offset_y: map.offset_y ?? 0 };
              const geom = seatDraftHere ?? baseGeom;
              const swapped = isRot90(geom.rotation) !== this._hvSwap;
              const hField: "scale" | "scale_y" = swapped ? "scale_y" : "scale";
              const vField: "scale" | "scale_y" = swapped ? "scale" : "scale_y";
              const hVal = swapped ? (geom.scale_y ?? geom.scale) : geom.scale;
              const vVal = swapped ? geom.scale : (geom.scale_y ?? geom.scale);
              const oHField: "offset_x" | "offset_y" = this._hvSwap ? "offset_y" : "offset_x";
              const oVField: "offset_x" | "offset_y" = this._hvSwap ? "offset_x" : "offset_y";
              const oHVal = this._hvSwap ? geom.offset_y : geom.offset_x;
              const oVVal = this._hvSwap ? geom.offset_x : geom.offset_y;
              // `onDrag` (every `@input` tick) only updates the local
              // `_seatDraft` preview — cheap, synchronous, no YAML/backend
              // write yet. `onCommit` (fires once, on drag-release/blur — see
              // `_numberSlider`'s own doc comment) is what actually persists,
              // via `_commitSeat` (backend when available, else the same
              // direct YAML write this used to do on every tick).
              type GeomField = "rotation" | "scale" | "scale_y" | "offset_x" | "offset_y";
              const onDrag = (field: GeomField) => (v: number) => {
                this._seatDraft = { ...geom, vacIdx: mapVac, [field]: v };
              };
              const onCommitField = (field: GeomField) => (v: number) => {
                const finalGeom = { ...geom, [field]: v };
                this._seatDraft = null;
                void this._commitSeat(mapVac, finalGeom);
              };
              return html`
                ${this._numberSlider("Rotation",  geom.rotation, 0, 360,  90,
                  onDrag("rotation"), "°", onCommitField("rotation"))}
                ${/* docs/39 §9: widened from 50-200 — a badly-fit auto-seat before calibration
                    (or a floorplan photographed at a very different scale from the robot's own
                    map) can genuinely need several hundred percent; the slider should be able to
                    show and adjust whatever calibration or auto-fit actually solved, not clamp it. */ nothing}
                ${this._numberSlider("Scale ↔ (horizontal)", hVal, 20, 800, 5,
                  onDrag(hField), "%", onCommitField(hField))}
                ${this._numberSlider("Scale ↕ (vertical)",   vVal, 20, 800, 5,
                  onDrag(vField), "%", onCommitField(vField))}
                ${this._numberSlider("Offset ↔ (horizontal)", oHVal, -150, 150,  1,
                  onDrag(oHField), "%", onCommitField(oHField))}
                ${this._numberSlider("Offset ↕ (vertical)",   oVVal, -150, 150,  1,
                  onDrag(oVField), "%", onCommitField(oVField))}
              `;
            })() : nothing}
            ${this._intEntityFor(vac) ? html`
              <button class="btn btn--add btn--sm" style="align-self:flex-start"
                @click=${() => this._importRooms(mapVac)}>
                <ha-icon icon="mdi:import"></ha-icon> Import missing rooms from this vacuum
              </button>
              <p class="hint">Adds rooms this robot's map knows that aren't on the floorplan yet
                (key = Roborock room name), placed through its current seat. Import from your
                reference (whole-home) robot first; then switch to another robot to supplement
                rooms only it has — it will be seated via the rooms you already share.</p>
            ` : nothing}
          `}

          ${(this._config.map_mode === "merged" && this._intEntityFor(vac) && rooms.length) ? (() => {
            const seqMap = this._roomSequence(vac);
            const ordered = this._roomsInSequenceOrder(rooms, seqMap);
            const unsequencedCount = rooms.filter((r) => !r.key || seqMap[r.key] === undefined).length;
            return html`
              <div class="section-title">Cleaning sequence</div>
              <p class="hint">The order configured in the Roborock app — it's dominant regardless of
                what HA sends, so the backend needs to know it to predict wet-clean timing correctly
                (docs/19). Drag to match your app's order. Shared across all vacuums/dashboards
                (backend-owned, like room pinning) — not saved in this card's config.</p>
              ${unsequencedCount ? html`<p class="hint" style="color:#faad14">⚠ ${unsequencedCount}
                room${unsequencedCount > 1 ? "s" : ""} not yet sequenced — dragged to the end,
                ETA will be a rough estimate for ${unsequencedCount > 1 ? "them" : "it"} until set.</p>` : nothing}
              <div class="seq-list">
                ${ordered.map((r, ri) => html`
                  <div class="seq-row ${this._dragSeq === ri ? "seq-row--dragging" : ""}"
                    @dragover=${(e: DragEvent) => { if (this._dragSeq !== null) e.preventDefault(); }}
                    @drop=${(e: DragEvent) => {
                      e.preventDefault();
                      if (this._dragSeq !== null) this._moveSequence(vac, ordered, this._dragSeq, ri);
                      this._dragSeq = null;
                    }}>
                    <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
                      draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
                      @dragstart=${(e: DragEvent) => { this._dragSeq = ri; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }}
                      @dragend=${() => { this._dragSeq = null; }}></ha-icon>
                    <span class="seq-pos">${ri + 1}</span>
                    <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:15px"></ha-icon>
                    <span class="seq-name">${r.name || r.key || "Room " + (ri + 1)}</span>
                    ${!r.key || seqMap[r.key] === undefined ? html`<span class="seq-flag" title="Not yet sequenced">?</span>` : nothing}
                  </div>`)}
              </div>
            `;
          })() : nothing}

          ${this._config.map_mode === "merged" ? html`<button class="btn btn--add btn--sm" style="align-self:flex-start;margin-top:4px" @click=${() => this._addEditedRoom()}><ha-icon icon="mdi:plus"></ha-icon> Add room</button>` : nothing}
          ${rooms.length ? html`
            <div class="section-title">Room positions</div>
            <p class="hint">${this._mapRoom !== null
              ? "Drag the dot/rectangle to move it (rectangle mode: drag a corner to resize). Tap it again to deselect, or click elsewhere on the map to jump the selected room there."
              : "Select a room below, then drag it on the map — or click the map to jump the selected room there."}</p>
            <div class="pill-row">
              ${rooms.map((r, ri) => html`
                <button class="room-pill ${ri === this._mapRoom ? "room-pill--active" : ""}"
                  @click=${() => { this._mapRoom = ri === this._mapRoom ? null : ri; }}>
                  <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:13px"></ha-icon>
                  ${r.name || r.key || "Room " + (ri + 1)}
                </button>`)}
            </div>

            ${this._mapRoom !== null ? html`
              ${this._config.map_mode === "merged" ? html`
                ${this._textField("Key (= Roborock room name)", rooms[this._mapRoom]?.key, v => this._setEditedRoom(this._mapRoom!, { key: v }), "Kitchen")}
                ${this._textField("Name", rooms[this._mapRoom]?.name, v => this._setEditedRoom(this._mapRoom!, { name: v }), "Kitchen")}
                ${this._numberSlider("Dry clean time", rooms[this._mapRoom]?.clean_time_dry ?? 0, 0, 120, 1, v => this._setEditedRoom(this._mapRoom!, { clean_time_dry: v > 0 ? v : undefined }), " min")}
                ${this._numberSlider("Wet clean time", rooms[this._mapRoom]?.clean_time_wet ?? 0, 0, 180, 1, v => this._setEditedRoom(this._mapRoom!, { clean_time_wet: v > 0 ? v : undefined }), " min")}
              ` : nothing}
              <div class="section-title" style="margin-top:4px">Position</div>
              ${(() => {
                // Room map_x/map_y are already stored in the shared floorplan's
                // own (screen) frame — like seat Offset, they never swap with
                // any vacuum's own Rotation, only with the ambient map-area
                // rotation the "Swap ↔/↕" toggle above stands in for.
                const r = rooms[this._mapRoom!];
                const rHField: "map_x" | "map_y" = this._hvSwap ? "map_y" : "map_x";
                const rVField: "map_x" | "map_y" = this._hvSwap ? "map_x" : "map_y";
                const rHVal = this._hvSwap ? (r?.map_y ?? 50) : (r?.map_x ?? 50);
                const rVVal = this._hvSwap ? (r?.map_x ?? 50) : (r?.map_y ?? 50);
                return html`
                  ${this._numberSlider("X ↔ (horizontal)", rHVal, 0, 100, 0.1,
                    v => this._setEditedRoom(this._mapRoom!, { [rHField]: round1(v) }), "%")}
                  ${this._numberSlider("Y ↕ (vertical)",   rVVal, 0, 100, 0.1,
                    v => this._setEditedRoom(this._mapRoom!, { [rVField]: round1(v) }), "%")}
                `;
              })()}

              <div class="section-title" style="margin-top:4px">Overlay mode</div>
              ${(() => {
                const room = rooms[this._mapRoom!];
                if (room?.map_w === undefined) return html`
                  <button class="btn btn--add btn--sm" style="align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom!, { map_w: 20, map_h: 15 })}>
                    <ha-icon icon="mdi:rectangle-outline"></ha-icon> Enable rectangle overlay
                  </button>
                `;
                // Same ambient-only swap as Position X/Y above — map_w/map_h are
                // the room rectangle's extents in that same floorplan frame.
                const wField: "map_w" | "map_h" = this._hvSwap ? "map_h" : "map_w";
                const hField: "map_w" | "map_h" = this._hvSwap ? "map_w" : "map_h";
                const wVal = this._hvSwap ? (room.map_h ?? 15) : room.map_w;
                const hVal = this._hvSwap ? room.map_w : (room.map_h ?? 15);
                return html`
                  ${this._numberSlider("Width ↔ (horizontal)",  wVal, 1, 100, 0.1, v => this._setEditedRoom(this._mapRoom!, { [wField]: round1(v) }), "%")}
                  ${this._numberSlider("Height ↕ (vertical)",   hVal, 1, 100, 0.1, v => this._setEditedRoom(this._mapRoom!, { [hField]: round1(v) }), "%")}
                  <button class="btn btn--sm" style="align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom!, { map_w: undefined, map_h: undefined })}>
                    Switch to point mode
                  </button>
                `;
              })()}

              <div class="section-title" style="margin-top:4px">Icon</div>
              ${this._iconPickerField(
                rooms[this._mapRoom!]?.icon,
                v => this._setEditedRoom(this._mapRoom!, { icon: v }))}
              ${rooms[this._mapRoom!]?.icon ? html`
                <div class="field">
                  <label>Icon position</label>
                  <div class="anchor-picker">
                    ${(["tl","t","tr","l","c","r","bl","b","br"] as const).map(pos => {
                      const lbl: Record<string,string> = {tl:"↖",t:"↑",tr:"↗",l:"←",c:"·",r:"→",bl:"↙",b:"↓",br:"↘"};
                      return html`<button
                        class="anchor-cell ${(rooms[this._mapRoom!]?.icon_anchor ?? "c") === pos ? "anchor-cell--active" : ""}"
                        title=${pos}
                        @click=${() => this._setEditedRoom(this._mapRoom!, { icon_anchor: pos })}>
                        ${lbl[pos]}
                      </button>`;
                    })}
                  </div>
                  <button class="btn btn--sm" style="margin-top:4px;align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom!, { icon_anchor: "none" as any })}>
                    Hide icon in overlay
                  </button>
                </div>
              ` : nothing}
              ${this._config.map_mode === "merged" ? html`<button class="btn btn--sm" style="align-self:flex-start;margin-top:6px" @click=${() => this._deleteEditedRoom(this._mapRoom!)}><ha-icon icon="mdi:delete"></ha-icon> Delete room</button>` : nothing}
            ` : nothing}
          ` : html`${this._config.map_mode === "merged" ? html`<p class="hint">No rooms yet — use "Add room" above.</p>` : html`<p class="hint">Add rooms in the Vacuums tab to position them here.</p>`}`}
        ` : html`<p class="hint">Select a map or image above to enable the placement preview.</p>`}

        <!-- docs/42 §3/§9 faze H: Path/mop colours+widths and the robot-image
             fields moved to the Visual editor's Seat and Appearance tool for the
             same reason as the Hide-map/Overlay block above -- they're
             backend-override-backed (anyvac.set_floorplan_seat's appearance key)
             now, not plain YAML fields on vac. -->
        ${this._intEntityFor(vac) ? html`
          <div class="section-title" style="margin-top:4px">Appearance</div>
          <p class="hint">Path/mop colours &amp; widths and the robot image on the
            map are now set in the Visual editor's Seat &amp; Appearance tool,
            not here — open it from the card's own "Align"/edit entry point.</p>
        ` : nothing}

        ${this._numberSlider("Card height (0=auto)", (this._config.map_mode === "merged" ? this._config.base_height : vac.base_height) ?? 0, 0, 700, 10,
          v => this._config.map_mode === "merged" ? this._setConfig({ base_height: v > 0 ? v : undefined }) : this._setVacuum(mapVac, { base_height: v > 0 ? v : undefined }), "px")}

      </div>`;
  }

  // ── Tab: Global ───────────────────────────────────────────────────────────

  private _dbgRow(label: string, value: unknown) {
    return html`<div class="field field--row">
      <label>${label}</label>
      <span style="font-size:12px;font-family:monospace;word-break:break-all">${
        value === undefined || value === null || value === "" ? "—" : String(value)
      }</span>
    </div>`;
  }

  private _renderDebugTab() {
    const fmt = (v: unknown) => { try { return JSON.stringify(v, null, 1); } catch { return String(v); } };
    const pre = "font-size:11px;font-family:monospace;white-space:pre-wrap;word-break:break-all;background:rgba(127,127,127,0.12);padding:6px;border-radius:6px;margin:0;max-height:220px;overflow:auto";
    return html`
      <div class="tab-body">
        <p class="hint">Live values from Home Assistant, read-only — to check the integration is writing data correctly.</p>
        <div class="field field--row">
          <label>Room progress gauges on map</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.debug_room_progress ?? false}
              @change=${(e: Event) => this._setConfig({ debug_room_progress: (e.target as HTMLInputElement).checked || undefined })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Draws a small % gauge on each room (spatial coverage). Spatial % is approximate — the room box includes furniture, so it plateaus below 100%.</p>
        <div class="field field--row">
          <label>Dense portrait room list</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.debug_dense_dock ?? false}
              @change=${(e: Event) => this._setConfig({ debug_dense_dock: (e.target as HTMLInputElement).checked || undefined })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Brings back the old portrait room list (name, age, pin, assigned vacuum) below the map — the minimalist cockpit (docs/25 §7c) drops it in favor of map-tap selection. Independent of the gauges toggle above — you can debug coverage % (which shows on the map either way) without this.</p>
        ${this._config.vacuums.map((vac) => {
          const ie = this._intEntityFor(vac);
          const st = ie ? this.hass.states[ie] : undefined;
          const at = (st?.attributes ?? {}) as Record<string, any>;
          const ms = (at.mop_signal ?? {}) as Record<string, any>;
          return html`
            <div class="section-title">${vac.name ?? vac.entity}</div>
            <div class="sub-section">
              ${!ie
                ? html`<p class="hint">No AnyVac integration sensor found (config or auto-resolve) — backend values unavailable.</p>`
                : !st
                  ? html`<p class="hint">Sensor <code>${ie}</code> not found.</p>`
                  : html`
                    ${this._dbgRow("sensor", `${ie} = ${st.state}`)}
                    ${this._dbgRow("schema_version", at.schema_version)}
                    ${this._dbgRow("pipeline_ok", at.pipeline_ok)}
                    ${this._dbgRow("clean_type", at.clean_type)}
                    ${this._dbgRow("in_cleaning", at.in_cleaning)}
                    ${this._dbgRow("vacuum_room_name", at.vacuum_room_name)}
                    ${this._dbgRow("water_mode_name", ms.water_mode_name)}
                    ${this._dbgRow("fan_speed_name", ms.fan_speed_name)}
                    ${this._dbgRow("path pts (decimated)", Array.isArray(at.path) ? at.path.length : "—")}
                    ${this._dbgRow("path pts (raw)", at.path_points)}
                    ${this._dbgRow("mop pts (raw)", at.mop_path_points)}
                    <div class="sub-title">calib — last single-room decision</div>
                    <pre style=${pre}>${fmt(at.calib_debug)}</pre>
                    <div class="sub-title">rooms_estimate (per vacuum)</div>
                    <pre style=${pre}>${fmt(at.rooms_estimate)}</pre>
                    <div class="sub-title">rooms_last_cleaned (cross-vacuum)</div>
                    <pre style=${pre}>${fmt(at.rooms_last_cleaned)}</pre>
                    <div class="sub-title">rooms_progress — spatial % + time ratio (live)</div>
                    <pre style=${pre}>${fmt(at.rooms_progress)}</pre>
                    <div class="sub-title">rooms (geometry — for spatial coverage)</div>
                    <pre style=${pre}>${fmt((at.rooms ?? []).map((r: any) => ({ name: r.name, bbox_px: r.bbox_px, x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1 })))}</pre>
                    <details><summary class="hint" style="cursor:pointer">Raw attributes</summary><pre style=${pre}>${fmt(at)}</pre></details>
                  `}
            </div>`;
        })}
      </div>
    `;
  }

  private _renderGlobalTab() {
    const globals = this._config.global_actions ?? [];
    const ths = this._config.room_thresholds ?? DEFAULT_THRESHOLDS;
    return html`
      <div class="tab-body">

        <div class="section-title">Appearance</div>
        ${this._selectField<CardTheme>("Theme", this._config.theme ?? DEFAULT_THEME,
          [{ value: "dark", label: "Dark — lifted surfaces, soft elevation" },
           { value: "light", label: "Light — for a light HA theme" },
           { value: "auto", label: "Auto — follow the system setting" },
           { value: "legacy", label: "Legacy — the pre-1.2.0 look" }],
          v => this._setConfig({ theme: v === DEFAULT_THEME ? undefined : v }))}
        <p class="hint">Before 1.2.0 the card was dark-only and unreadable on a light dashboard.
          "Legacy" is the exact previous appearance, kept as a way back if a dashboard was
          tuned around it.</p>

        ${this._hexColorField("Accent colour", this._config.accent,
          v => this._setConfig({ accent: v || undefined }), DEFAULT_ACCENT)}
        <div class="hex-color-row" style="flex-wrap:wrap;gap:6px;margin:-4px 0 0">
          ${ACCENT_PRESETS.map((p) => {
            const on = (this._config.accent ?? DEFAULT_ACCENT).toLowerCase() === p.hex.toLowerCase();
            return html`<button type="button" title=${p.label}
              style=${"width:24px;height:24px;padding:0;border-radius:50%;cursor:pointer;background:" + p.hex
                + ";border:2px solid " + (on ? "#fff" : "transparent")
                + ";box-shadow:0 0 0 1px rgba(0,0,0,0.35)"}
              @click=${() => this._setConfig({ accent: p.hex })}></button>`;
          })}
        </div>
        <p class="hint">Drives the primary action (START), room selection and focus rings.
          Status colours are deliberately left alone — their saturation carries meaning
          (cleaning / mopping / error), not taste.</p>

        <div class="field field--row">
          <label>Calm resting state</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.calm_state !== false}
              @change=${(e: Event) => this._setConfig({
                calm_state: (e.target as HTMLInputElement).checked ? undefined : false,
              })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">When nothing is running and nothing is selected, the leftover map trace
          and the secondary numbers step back so the one thing worth touching stands out.
          Nothing is hidden or disabled — it's purely de-emphasis.</p>

        <div class="field field--row">
          <label>Reduce motion</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${!!this._config.reduce_motion}
              @change=${(e: Event) => this._setConfig({
                reduce_motion: (e.target as HTMLInputElement).checked ? true : undefined,
              })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Turns off the press feedback and the live pulses. Your operating
          system's own "reduce motion" setting already does this on its own — this is for
          switching them off without changing that.</p>

        <div class="section-title" style="margin-top:4px">Layout</div>
        <div class="field field--row">
          <label>Fit card to available screen space</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${!!this._config.layout}
              @change=${(e: Event) => this._setConfig({
                layout: (e.target as HTMLInputElement).checked ? (this._config.layout ?? {}) : undefined,
              })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        <p class="hint">Recommended for most dashboards — the card sizes itself to fit the space
          it's given (portrait/landscape profiles, tuned spacing, responsive map rotation)
          instead of growing as tall as its content needs. Off keeps the older, simpler
          rendering for dashboards already tuned around it. Advanced per-profile tuning
          (column/row overrides, map crop, orientation) is still YAML-only — this toggle
          turns the system on with its built-in defaults; switch to YAML mode to fine-tune.</p>

        ${this._config.layout ? html`
          <div class="field field--row">
            <label>Flip portrait map 180°</label>
            <label class="toggle-wrap">
              <input type="checkbox" class="toggle-input"
                .checked=${this._config.layout.portrait?.crop?.flip === true}
                @change=${(e: Event) => this._setLayoutFlip("portrait", (e.target as HTMLInputElement).checked)} />
              <span class="toggle-track"></span>
            </label>
          </div>
          <div class="field field--row">
            <label>Flip landscape map 180°</label>
            <label class="toggle-wrap">
              <input type="checkbox" class="toggle-input"
                .checked=${this._config.layout.landscape?.crop?.flip === true}
                @change=${(e: Event) => this._setLayoutFlip("landscape", (e.target as HTMLInputElement).checked)} />
              <span class="toggle-track"></span>
            </label>
          </div>
          <p class="hint">Turns the map upside down if it doesn't match the compass direction
            you're used to (docs/32) — a persisted default for this card. There's also a
            "Flip map" button in the running card's map toolbar for a quick, unsaved
            per-screen try-out that doesn't touch this setting.</p>
        ` : nothing}

        <div class="section-title" style="margin-top:4px">Controller</div>
        ${this._selectField<"auto" | "manual">("Mode", this._config.ui_mode ?? "auto",
          [{ value: "auto", label: "Auto — one orchestrated controller" },
           { value: "manual", label: "Manual — per-robot controllers" }],
          v => this._setConfig({ ui_mode: v }))}

        <div class="section-title" style="margin-top:4px">Global presets (Auto mode)</div>
        <p class="hint">Targeted whole-home cleans for Auto mode (e.g. "After dinner", "Whole home"). The integration decides which robots and the order; you pick the scope.</p>
        ${(this._config.global_presets ?? []).map((gp, i) => html`
          <div class="sub-section">
            <div class="sub-title" style="display:flex;align-items:center;justify-content:space-between">
              <span>${gp.label || gp.id}</span>
              <button class="icon-btn icon-btn--danger" title="Delete preset"
                @click=${() => this._deleteGlobalPreset(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._textField("Label", gp.label, v => this._setGlobalPreset(i, { label: v }), "e.g. After dinner")}
            ${this._textField("Icon", gp.icon, v => this._setGlobalPreset(i, { icon: v || undefined }), "mdi:silverware-fork-knife")}
            ${this._selectField<"all" | "select">("Scope", (gp.scope === "all" ? "all" : "select"),
              [{ value: "all", label: "Whole flat" }, { value: "select", label: "Pick rooms on map" }],
              v => this._setGlobalPreset(i, { scope: v }))}
            ${this._selectField<"dry" | "wet" | "both">("Mode", gp.mode ?? "dry",
              [{ value: "dry", label: "Dry only" },
               { value: "wet", label: "Wet only" },
               { value: "both", label: "Dry then wet (wet follows dry)" }],
              v => this._setGlobalPreset(i, { mode: v }))}
          </div>
        `)}
        <button class="btn btn--add" @click=${() => this._addGlobalPreset()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global preset
        </button>

        <div class="section-title" style="margin-top:4px">Global actions</div>
        <p class="hint">Badges that trigger a script across all vacuums (e.g. "Clean whole flat").</p>
        ${globals.length === 0
          ? html`<p class="hint">None configured.</p>`
          : globals.map((ga, i) => this._renderGlobalAccordion(ga, i))}
        <button class="btn btn--add" @click=${() => this._addGlobal()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global action
        </button>

        <div class="section-title" style="margin-top:4px">Room appearance</div>
        <p class="hint">Applies to all vacuums.</p>
        <div class="field field--row">
          <label>Hide room icons</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input"
              .checked=${this._config.room_icon_hidden ?? false}
              @change=${(e: Event) => this._setConfig({ room_icon_hidden: (e.target as HTMLInputElement).checked || undefined })} />
            <span class="toggle-track"></span>
          </label>
        </div>
        ${this._numberSlider("Border (idle)",     this._config.room_border_normal   ?? 2, 0, 12, 1,
          v => this._setConfig({ room_border_normal: v }), "px")}
        ${this._numberSlider("Border (selected)", this._config.room_border_selected ?? 4, 0, 12, 1,
          v => this._setConfig({ room_border_selected: v }), "px")}

        <div class="section-title" style="margin-top:4px">Thresholds (border colour by last clean age)</div>
        <p class="hint">Rules ascending — first match wins. Beyond the last = red.</p>
        ${ths.map((th, ti) => html`
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            <input type="number" class="text-input text-input--sm threshold-days"
              min="0" max="365" .value=${String(th.days)}
              @change=${(e: Event) => {
                const days = parseInt((e.target as HTMLInputElement).value);
                const next = ths.map((t, i) => i === ti ? { ...t, days: isNaN(days) ? t.days : days } : t);
                this._setConfig({ room_thresholds: next });
              }} />
            <span class="threshold-label">days</span>
            <input type="color" class="threshold-color" .value=${th.color}
              @input=${(e: Event) => {
                const color = (e.target as HTMLInputElement).value;
                const next = ths.map((t, i) => i === ti ? { ...t, color } : t);
                this._setConfig({ room_thresholds: next });
              }} />
            <button class="icon-btn icon-btn--danger icon-btn--sm"
              @click=${() => {
                const next = ths.filter((_, i) => i !== ti);
                this._setConfig({ room_thresholds: next.length ? next : undefined });
              }}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn--add btn--sm" @click=${() =>
            this._setConfig({ room_thresholds: [...ths, { days: 14, color: "#ff4d4f" }] })}>
            <ha-icon icon="mdi:plus"></ha-icon> Add threshold
          </button>
          ${this._config.room_thresholds ? html`
            <button class="btn btn--sm" @click=${() => this._setConfig({ room_thresholds: undefined })}>
              Reset to defaults
            </button>
          ` : nothing}
        </div>

        <div class="section-title" style="margin-top:4px">Notifications</div>
        <p class="hint">
          Notifications are built from the AnyVac integration's server-side events
          three ready-made automation blueprints (Settings → Automations →
          Create with blueprint) — the card no longer sends notifications itself:
        </p>
        <ul style="margin:0;padding-left:18px;font-size:12px;color:var(--secondary-text-color);display:flex;flex-direction:column;gap:2px">
          <li><strong>Clean finished</strong> — fires on the integration's <code>anyvac_clean_finished</code> event.</li>
          <li><strong>Vacuum error</strong> — watches the official Roborock error sensor's state directly (not an AnyVac event).</li>
          <li><strong>Room overdue</strong> — polls an AnyVac per-room "last cleaned" timestamp sensor hourly against a day threshold you set.</li>
        </ul>
        <p class="hint">The integration also fires <code>anyvac_clean_started</code> and
          <code>anyvac_room_done</code> events, but neither has a shipped blueprint yet —
          build a custom automation on the event if you need one.</p>

        ${(() => {
          const usesAreaMappings = this._config.vacuums.some(v => v.clean_action?.type === "native-area");
          if (!usesAreaMappings) return nothing;
          const allKeys = [...new Set(
            this._config.vacuums.flatMap(v => (v.rooms ?? []).map(r => r.key)).filter(Boolean)
          )].sort();
          const mappings = this._config.area_mappings ?? {};
          return html`
            <div class="section-title" style="margin-top:4px">Area mappings</div>
            <p class="hint">Maps room keys to HA areas for the <strong>native-area</strong> strategy (degraded mode only — irrelevant once the AnyVac integration is active for a vacuum). Set once here — applies to all vacuums.</p>
            ${allKeys.length === 0
              ? html`<p class="hint">No rooms configured yet.</p>`
              : allKeys.map(key => this._areaPicker(key, mappings[key], v => {
                  const next = { ...mappings };
                  if (v) next[key] = v; else delete next[key];
                  this._setConfig({ area_mappings: Object.keys(next).length ? next : undefined });
                }))}
          `;
        })()}

      </div>`;
  }

  private _renderGlobalAccordion(ga: GlobalAction, idx: number) {
    const color = this._resolveColor(ga.color, "orange");
    const isOpen = this._openGlobal.has(idx);
    const action = ga.action;
    const watches = ga.watch_entities ?? [];
    return html`
      <div class="acc-row" style=${styleMap({ borderLeft: "3px solid " + color })}>
        <div class="acc-header" @click=${() => this._toggleGlobal(idx)}>
          ${ga.image
            ? html`<img class="acc-img" src=${ga.image} alt=${ga.name} />`
            : html`<ha-icon icon="mdi:home-floor-a" style=${styleMap({ color, width: "36px", height: "36px" })}></ha-icon>`}
          <div class="acc-info">
            <span class="acc-name">${ga.name || "Unnamed action"}</span>
            <span class="acc-sub">${action.type === "script" ? action.entity_id : (action as any).service}</span>
          </div>
          <button class="icon-btn icon-btn--danger"
            @click=${(e: Event) => { e.stopPropagation(); this._deleteGlobal(idx); }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="acc-body">
            ${this._textField("Display name", ga.name,
              v => this._setGlobal(idx, { name: v }), "e.g. Whole flat")}
            ${this._textField("Image path", ga.image,
              v => this._setGlobal(idx, { image: v || undefined }), "/local/...")}
            ${this._hexColorField("Accent colour", ga.color ? this._resolveColor(ga.color, "orange") : undefined,
              v => this._setGlobal(idx, { color: v || undefined }), "#faad14")}

            <div class="sub-title">Watch entities (badge glows when any is cleaning)</div>
            ${watches.map((e, wi) => html`
              <div class="var-row">
                <ha-entity-picker .hass=${this.hass} .value=${e} .includeDomains=${["vacuum"]}
                  allow-custom-entity style="flex:1"
                  @value-changed=${(ev: CustomEvent) => {
                    const updated = [...watches];
                    updated[wi] = ev.detail.value;
                    this._setGlobal(idx, { watch_entities: updated.filter(Boolean) });
                  }}></ha-entity-picker>
                <button class="icon-btn icon-btn--danger icon-btn--sm"
                  @click=${() => this._setGlobal(idx, { watch_entities: watches.filter((_, i) => i !== wi) })}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>`)}
            <button class="btn btn--add btn--sm"
              @click=${() => this._setGlobal(idx, { watch_entities: [...watches, ""] })}>
              <ha-icon icon="mdi:plus"></ha-icon> Add entity
            </button>

            <div class="sub-title">Action (hold-to-activate)</div>
            ${this._selectField<"script" | "service">("Type", action.type,
              [{ value: "script", label: "Script" }, { value: "service", label: "Service call" }],
              v => this._setGlobal(idx, { action: v === "script"
                ? { type: "script", entity_id: "" }
                : { type: "service", service: "" } }))}
            ${action.type === "script"
              ? this._entityPicker("Script entity", action.entity_id, ["script"],
                  v => this._setGlobalAction(idx, { entity_id: v }))
              : this._textField("Service", (action as any).service,
                  v => this._setGlobalAction(idx, { service: v }), "e.g. script.celkovy_uklid_bytu")}
          </div>
        ` : nothing}
      </div>`;
  }

  // ── Main render ───────────────────────────────────────────────────────────

  render() {
    if (!this._config) return nothing;
    return html`
      <datalist id="ha-entities"></datalist>
      <div class="editor-root">
        <div class="tabs-bar">
          ${(["vacuums", "maps", "global"] as const).map(t => html`
            <button class="tab-btn ${this._tab === t ? "tab-btn--active" : ""}"
              @click=${() => { this._tab = t; }}>
              ${{ vacuums: "🤖 Vacuums", maps: "🗺 Maps", global: "⚙ Global" }[t]}
            </button>`)}
        </div>
        ${this._tab === "vacuums" ? this._renderVacuumsTab()
          : this._tab === "maps"    ? this._renderMapsTab()
          : this._tab === "debug"   ? this._renderDebugTab()
          : this._renderGlobalTab()}
        <div class="editor-footer">
          <span class="footer-link" @click=${() => { this._tab = this._tab === "debug" ? "vacuums" : "debug"; }}>
            ${this._tab === "debug" ? "← Back" : "🐞 Show debug info"}
          </span>
          <span>anyvac-card v${CARD_VERSION}</span>
        </div>
      </div>`;
  }

  // ── Styles ────────────────────────────────────────────────────────────────

  static styles = css`
    .editor-root { display:flex; flex-direction:column; }

    /* ── Tabs ── */
    .tabs-bar {
      display:flex;
      border-bottom:1px solid var(--divider-color,rgba(0,0,0,.12));
      margin-bottom:2px;
    }
    .tab-btn {
      flex:1; padding:10px 4px; background:none; border:none; cursor:pointer;
      font-size:12px; font-weight:600; font-family:inherit;
      color:var(--secondary-text-color);
      border-bottom:2px solid transparent;
      transition:color .15s, border-color .15s;
    }
    .tab-btn--active { color:var(--primary-color); border-bottom-color:var(--primary-color); }

    /* ── Tab body ── */
    .tab-body { display:flex; flex-direction:column; gap:8px; padding:10px 0 4px; }

    /* ── YAML preview ── */
    .yaml-preview {
      background:var(--code-editor-background-color,#1e1e1e);
      color:var(--code-editor-foreground-color,#d4d4d4);
      padding:12px;
      border-radius:6px;
      font-size:11px;
      line-height:1.6;
      overflow-x:auto;
      white-space:pre;
      margin:0;
      font-family:monospace;
    }

    /* ── Vacuum accordion ── */
    .acc-row {
      border-radius:10px;
      border:1px solid var(--divider-color,rgba(0,0,0,.12));
      background:var(--secondary-background-color);
      overflow:hidden;
    }
    .acc-header {
      display:flex; align-items:center; gap:8px;
      padding:10px 10px 10px 12px; cursor:pointer;
    }
    .acc-header:hover { background:rgba(0,0,0,.03); }
    .acc-img  { width:36px; height:36px; border-radius:50%; object-fit:cover; flex-shrink:0; }
    .acc-info { flex:1; display:flex; flex-direction:column; min-width:0; }
    .acc-name { font-weight:600; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .acc-sub  { font-size:11px; color:var(--secondary-text-color); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .acc-chevron { color:var(--secondary-text-color); flex-shrink:0; }
    .acc-body {
      padding:12px; display:flex; flex-direction:column; gap:8px;
      border-top:1px solid var(--divider-color,rgba(0,0,0,.12));
    }

    /* ── Collapsible (sensors / clean action) ── */
    .collapsible {
      border-radius:6px; border:1px solid var(--divider-color,rgba(0,0,0,.1)); overflow:hidden;
    }
    .collapsible-header {
      display:flex; align-items:center; gap:8px; padding:8px 10px; cursor:pointer;
      background:rgba(0,0,0,.02);
    }
    .collapsible-header:hover { background:rgba(0,0,0,.05); }
    .collapsible-title {
      flex:1; font-size:11px; font-weight:700; letter-spacing:.7px;
      text-transform:uppercase; color:var(--primary-color);
    }
    .collapsible-body { padding:10px; display:flex; flex-direction:column; gap:8px; }

    .badge {
      font-size:10px; font-weight:600; padding:2px 7px; border-radius:10px;
      background:rgba(0,0,0,.07); color:var(--secondary-text-color);
    }

    /* ── Cleaning sequence list (docs/19) ── */
    .seq-list { display:flex; flex-direction:column; gap:2px; }
    .seq-row {
      display:flex; align-items:center; gap:8px; padding:6px 8px;
      border-radius:6px; border:1px solid var(--divider-color,rgba(0,0,0,.1));
      background:rgba(0,0,0,.015);
    }
    .seq-row--dragging { opacity:0.4; }
    .seq-pos {
      flex-shrink:0; width:20px; text-align:center; font-size:12px; font-weight:700;
      color:var(--secondary-text-color);
    }
    .seq-name { flex:1; font-size:13px; }
    .seq-flag {
      flex-shrink:0; width:16px; height:16px; border-radius:50%; background:#faad14;
      color:#000; font-size:11px; font-weight:700; display:flex; align-items:center;
      justify-content:center;
    }

    /* ── Room accordion ── */
    .room-acc {
      border-radius:6px; border:1px solid var(--divider-color,rgba(0,0,0,.1));
      background:rgba(0,0,0,.015); overflow:hidden;
    }
    .room-acc-header { display:flex; align-items:center; gap:8px; padding:8px 10px; cursor:pointer; }
    .room-acc-header:hover { background:rgba(0,0,0,.04); }
    .room-acc-icon { flex-shrink:0; }
    .room-acc-info { flex:1; display:flex; flex-direction:column; }
    .room-acc-name { font-weight:600; font-size:13px; }
    .room-acc-meta { font-size:11px; color:var(--secondary-text-color); }
    .room-acc-body {
      padding:10px; display:flex; flex-direction:column; gap:8px;
      border-top:1px solid var(--divider-color,rgba(0,0,0,.1));
    }

    /* ── Toggle switch ── */
    .toggle-wrap { position:relative; display:inline-flex; align-items:center; cursor:pointer; }
    .toggle-input { position:absolute; opacity:0; width:0; height:0; }
    .toggle-track {
      width:36px; height:20px; border-radius:10px;
      background:var(--divider-color,rgba(0,0,0,.2)); transition:background .2s; position:relative;
    }
    .toggle-track::after {
      content:""; position:absolute; top:2px; left:2px;
      width:16px; height:16px; border-radius:50%; background:white; transition:transform .2s;
    }
    .toggle-input:checked + .toggle-track { background:var(--primary-color); }
    .toggle-input:checked + .toggle-track::after { transform:translateX(16px); }

    /* ── Map hint link ── */
    .map-hint {
      cursor:pointer; color:var(--primary-color) !important;
      text-decoration:underline; text-underline-offset:2px;
    }
    .map-hint:hover { opacity:.8; }

    /* ── Pill rows (Maps tab vacuum/room selectors) ── */
    .pill-row { display:flex; gap:6px; flex-wrap:wrap; }
    .vac-pill {
      padding:5px 12px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer;
      border:1px solid var(--divider-color,rgba(0,0,0,.15));
      background:var(--secondary-background-color); color:var(--secondary-text-color);
      font-family:inherit;
    }
    .vac-pill--active { background:var(--primary-color); color:white; border-color:var(--primary-color); }
    .room-pill {
      display:flex; align-items:center; gap:4px;
      padding:4px 10px; border-radius:16px; font-size:12px; font-weight:500; cursor:pointer;
      border:1px solid var(--divider-color,rgba(0,0,0,.15));
      background:var(--secondary-background-color); color:var(--secondary-text-color);
      font-family:inherit;
    }
    .room-pill--active { background:rgba(33,150,243,.12); color:var(--primary-color); border-color:var(--primary-color); }

    /* ── Map preview ── */
    .map-pos-container { border-radius:8px; overflow:hidden; }
    .map-pos-container--active { cursor:crosshair; }
    .map-preview-wrap {
      position:relative; width:100%; padding-top:27.5%;
      overflow:hidden; border-radius:8px; background:rgba(0,0,0,.06);
    }
    .map-preview-img { position:absolute; transform-origin:center center; object-fit:cover; }

    .pos-dot {
      position:absolute; transform:translate(-50%,-50%);
      width:26px; height:26px; border-radius:6px;
      background:rgba(0,0,0,.55); border:2px solid rgba(255,255,255,.4);
      display:flex; align-items:center; justify-content:center;
      color:rgba(255,255,255,.7); cursor:grab;
      touch-action:none; -webkit-user-select:none; user-select:none;
    }
    .pos-dot--active { background:rgba(33,150,243,.75); border-color:#2196F3; color:white; }

    /* Rectangle overlay mode (map_w/map_h set) — draws the actual box instead of
       just a centre dot, with drag-to-move + corner handles to drag-to-resize
       (2026-07-26: sliders used to move a box nobody could see). */
    .room-rect {
      position:absolute; box-sizing:border-box; transform:translate(-50%,-50%);
      border:2px solid rgba(255,255,255,.55); border-radius:4px;
      background:rgba(0,0,0,.25);
      display:flex; align-items:center; justify-content:center;
      color:rgba(255,255,255,.8); cursor:grab;
      touch-action:none; -webkit-user-select:none; user-select:none;
    }
    .room-rect--active { border-color:#2196F3; background:rgba(33,150,243,.25); color:white; }
    .room-rect-handle {
      position:absolute; transform:translate(-50%,-50%);
      width:14px; height:14px; border-radius:50%;
      background:#2196F3; border:2px solid white;
      touch-action:none;
    }
    .room-rect-handle--nw { left:0%;   top:0%;   cursor:nwse-resize; }
    .room-rect-handle--se { left:100%; top:100%; cursor:nwse-resize; }
    .room-rect-handle--ne { left:100%; top:0%;   cursor:nesw-resize; }
    .room-rect-handle--sw { left:0%;   top:100%; cursor:nesw-resize; }

    /* ── Manual calibration from clicked points (docs/39) ──
       docs/39 §9: the click target needs to be BIG on screen — the editor's
       own column can be a few hundred px wide (or less on mobile), which
       turns any click imprecision into a proportionally large geometric
       error no amount of averaging fully cures. Rendered as a fixed
       full-viewport overlay instead of inline, so the image is as large as
       the whole screen allows regardless of how narrow the surrounding form
       is — the click-handling math (_onCalibRawClick/_onCalibFloorClick)
       is a plain ratio of the clicked element's own boundingClientRect, so
       it's completely unaffected by how big that rect actually renders. */
    .calib-overlay {
      position:fixed; inset:0; z-index:1000;
      background:rgba(0,0,0,.85);
      display:flex; flex-direction:column; gap:10px;
      padding:14px; box-sizing:border-box; overflow:auto;
    }
    .calib-banner {
      flex:0 0 auto;
      display:flex; align-items:center; justify-content:space-between; gap:8px;
      padding:8px 10px; border-radius:8px;
      background:rgba(250,173,20,.15); border:1px solid rgba(250,173,20,.4);
      font-size:12px; color:#fff;
    }
    .calib-stage {
      flex:1 1 auto; min-height:0;
      display:flex; align-items:center; justify-content:center;
    }
    /* Sized from the image's own aspect ratio (--calib-ar, set inline per
       render) via CSS alone — as wide/tall as the viewport allows (92vw by
       92vh, whichever the aspect ratio hits first), no JS measurement needed. */
    .calib-stage .map-preview-wrap {
      position:relative; overflow:hidden; border-radius:8px;
      background:rgba(255,255,255,.06);
      width:min(92vw, calc(88vh * var(--calib-ar, 1.5)));
      /* Overrides the base rule's padding-top aspect-ratio hack — this one
         uses the aspect-ratio property instead, driven by --calib-ar, so
         width can be computed from viewport units without any JS measuring. */
      padding-top:0;
      aspect-ratio:var(--calib-ar, 1.5);
    }
    .calib-marker {
      position:absolute; transform:translate(-50%,-50%);
      width:28px; height:28px; border-radius:50%;
      background:rgba(250,173,20,.85); border:2px solid white;
      display:flex; align-items:center; justify-content:center;
      color:#000; font-size:14px; font-weight:700;
      pointer-events:none;
    }

    .two-col { display:flex; gap:8px; }
    .two-col > * { flex:1; min-width:0; }

    /* ── Section title ── */
    .section-title {
      font-size:12px; font-weight:700; letter-spacing:.8px;
      text-transform:uppercase; color:var(--primary-color);
      border-bottom:1px solid var(--divider-color,rgba(0,0,0,.12));
      padding-bottom:4px; margin-bottom:2px;
    }
    .sub-section {
      display:flex; flex-direction:column; gap:8px;
      padding-left:8px; border-left:3px solid var(--divider-color,rgba(0,0,0,.1));
    }
    .sub-title { font-size:11px; font-weight:600; color:var(--secondary-text-color); margin-top:4px; }

    /* ── Fields ── */
    .field { display:flex; flex-direction:column; gap:4px; }
    .field--row { flex-direction:row; align-items:center; }
    .field--row label { width:130px; flex-shrink:0; }
    label { font-size:13px; color:var(--secondary-text-color); }
    .required { color:var(--error-color,#f44336); }

    .text-input {
      width:100%; box-sizing:border-box; padding:8px 10px;
      border:1px solid var(--divider-color,rgba(0,0,0,.2)); border-radius:6px;
      background:var(--card-background-color); color:var(--primary-text-color);
      font-size:13px; font-family:inherit;
    }
    .text-input--sm   { width:auto; flex:1; }
    .text-input--half { flex:1; min-width:0; }

    .select-input {
      flex:1; padding:6px 8px;
      border:1px solid var(--divider-color,rgba(0,0,0,.2)); border-radius:6px;
      background:var(--card-background-color); color:var(--primary-text-color);
      font-size:13px; font-family:inherit; cursor:pointer;
    }

    .slider-wrap { display:flex; align-items:center; gap:8px; flex:1; }
    .slider { flex:1; accent-color:var(--primary-color); }
    .slider-val-wrap { display:flex; align-items:center; gap:2px; flex-shrink:0; }
    .slider-val-input {
      width:48px; text-align:right; font-size:13px; font-weight:600; color:var(--primary-color);
      font-family:inherit; border:none; border-radius:4px; background:transparent; padding:2px 3px;
      -moz-appearance:textfield;
    }
    .slider-val-input:hover, .slider-val-input:focus {
      background:var(--secondary-background-color,rgba(127,127,127,.15)); outline:none;
    }
    .slider-val-input::-webkit-outer-spin-button,
    .slider-val-input::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }
    .slider-val-suffix { font-size:13px; font-weight:600; color:var(--primary-color); }

    /* ── Buttons ── */
    .btn {
      display:flex; align-items:center; gap:6px;
      padding:8px 14px; border-radius:8px;
      cursor:pointer; font-size:13px; font-weight:600; font-family:inherit; border:none;
    }
    .btn--add {
      background:rgba(33,150,243,.1); color:var(--primary-color);
      border:1px dashed var(--primary-color) !important;
    }
    .btn--sm { padding:4px 10px; font-size:12px; }

    .icon-btn {
      display:flex; align-items:center; justify-content:center;
      width:32px; height:32px; border-radius:6px;
      cursor:pointer; background:transparent; border:none; color:var(--secondary-text-color);
      flex-shrink:0;
    }
    .icon-btn:hover { background:rgba(0,0,0,.08); }
    .icon-btn:disabled { opacity:.35; cursor:default; }
    .icon-btn--danger { color:var(--error-color,#f44336); }
    .icon-btn--sm { width:24px; height:24px; }

    /* ── Misc ── */
    .hint { font-size:12px; color:var(--secondary-text-color); margin:0; }

    .editor-footer {
      margin-top:8px; padding-top:6px;
      border-top:1px solid var(--divider-color,rgba(0,0,0,.12));
      font-size:11px;
      color:var(--secondary-text-color); opacity:.7;
      display:flex; align-items:center; justify-content:space-between; gap:8px;
    }
    .footer-link { cursor:pointer; text-decoration:underline; text-underline-offset:2px; }
    .footer-link:hover { opacity:.8; }

    .var-row { display:flex; align-items:center; gap:6px; }
    .var-sep { color:var(--secondary-text-color); flex-shrink:0; }

    .anchor-picker { display:grid; grid-template-columns:repeat(3, 32px); gap:3px; }
    .anchor-cell {
      width:32px; height:32px; border-radius:6px; cursor:pointer;
      background:var(--secondary-background-color);
      border:1px solid var(--divider-color,rgba(0,0,0,.2));
      font-size:15px; display:flex; align-items:center; justify-content:center;
    }
    .anchor-cell--active { background:var(--primary-color); color:white; border-color:var(--primary-color); }

    .threshold-row { align-items:center; gap:6px; }
    .threshold-label { font-size:12px; color:var(--secondary-text-color); flex-shrink:0; }
    .threshold-days { width:56px !important; flex:none; padding:6px 8px; }
    .threshold-color {
      width:36px; height:28px; padding:2px; border-radius:6px;
      border:1px solid var(--divider-color,rgba(0,0,0,.2));
      background:var(--card-background-color); cursor:pointer;
    }

    .hex-color-row { display:flex; align-items:center; gap:6px; }
    .hex-color-row .text-input { flex:1; }
  `;
}
