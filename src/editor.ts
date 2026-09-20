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
  type RoomConfigLike,
} from "./seatfit";

// ── Tab type ─────────────────────────────────────────────────────────────────

type ActiveTab = "vacuums" | "global" | "debug";

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
  @state() private _openMap     = new Set<number>();
  @state() private _openPresets = new Set<number>();
  @state() private _openAction  = new Set<number>();
  @state() private _openGlobal  = new Set<number>();
  // Per-vacuum: which roomIdx is open (null = none)
  @state() private _openRoom = new Map<number, number | null>();

  // Per-vacuum floorplan tools (fáze L: relocated out of the removed Maps tab
  // into each vacuum's own "Map & floorplan" section, Vacuums tab)
  /** Manual override for every horizontal/vertical (↔/↕) slider
   *  label in that section (Rotation, Scale, Offset).
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

  /** "Use this vacuum's current map as floorplan" (docs/30 §4a field follow-up,
   *  2026-07-30) — merged mode's per-vacuum auto-seat fit needs a shared
   *  floorplan image, which today meant manually saving a map picture out of
   *  HA and re-uploading it into config/www/. Calls the backend's
   *  `anyvac.snapshot_map_as_floorplan` (integration ≥ 0.88.0) instead. */
  @state() private _floorplanSnapshotBusy = false;
  @state() private _floorplanSnapshotError = "";

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
      const selfIdx = this._config.vacuums.findIndex((v) => v.entity === vac.entity);
      this._setEditedImageBase(
        crop ? { src: path, crop_box: { entity: vac.entity, ...crop } } : { src: path },
        selfIdx >= 0 ? selfIdx : undefined,
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
   *  different entity, or none at all, is left for the backend to derive.
   *  `vacIdx` (fáze L) selects whose `image_base` to read the crop from —
   *  this vacuum's own in split mode, ignored in merged mode
   *  (`_currentImageBase` itself branches on `_mergedEdit`). */
  private async _exportMapGuide(vac: VacuumConfig, vacIdx: number): Promise<void> {
    const entity = this._mapEntityFor(vac);
    if (!entity) return;
    this._guideExportBusy = true;
    this._guideExportError = "";
    this._guideExportResult = null;
    const cropBox = this._currentImageBase(vacIdx)?.crop_box;
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
  /** Rooms currently being edited: the shared merged-mode list, or one
   *  vacuum's own (`vacIdx`, split mode) — the vacuum index used to come from
   *  the removed Maps tab's own vacuum-picker pills (`_mapVac`); every
   *  remaining call site has its own index in scope instead (e.g. a vacuum
   *  accordion's own `idx`), so it's threaded through as a parameter. Ignored
   *  in merged mode, where `_config.rooms` is the single shared list. */
  private _editRooms(vacIdx = 0): RoomConfig[] {
    if (this._mergedEdit) return this._config.rooms ?? [];
    const vac = this._config.vacuums[Math.min(vacIdx, this._config.vacuums.length - 1)];
    return vac?.rooms ?? [];
  }
  private _setEditedRoom(roomIdx: number, updates: Partial<RoomConfig>, vacIdx = 0): void {
    if (this._mergedEdit) {
      const rooms = [...(this._config.rooms ?? [])];
      rooms[roomIdx] = { ...rooms[roomIdx], ...updates };
      this._setConfig({ rooms });
    } else {
      this._setRoom(Math.min(vacIdx, this._config.vacuums.length - 1), roomIdx, updates);
    }
  }
  private _addEditedRoom(vacIdx = 0): void {
    if (this._mergedEdit) {
      const existing = this._config.rooms ?? [];
      const rooms = [...existing, { ...DEFAULT_ROOM, icon: _roomIconFor(existing.length) }];
      this._setConfig({ rooms });
    } else {
      this._addRoom(Math.min(vacIdx, this._config.vacuums.length - 1));
    }
  }
  private _deleteEditedRoom(roomIdx: number, vacIdx = 0): void {
    if (this._mergedEdit) {
      const rooms = (this._config.rooms ?? []).filter((_, i) => i !== roomIdx);
      this._setConfig({ rooms });
    } else {
      this._deleteRoom(Math.min(vacIdx, this._config.vacuums.length - 1), roomIdx);
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
  /** `vacIdx` (split mode only) used to default to whichever vacuum was
   *  selected via the removed Maps tab's own vacuum-picker pills (`_mapVac`);
   *  its one remaining split-mode caller (`_snapshotFloorplan`) now passes
   *  the vacuum's own index explicitly. */
  private _setEditedImageBase(updates: Partial<NonNullable<VacuumConfig["image_base"]>>, vacIdx?: number): void {
    if (this._mergedEdit) {
      this._setConfig({ image_base: { ...(this._config.image_base ?? { src: "" }), ...updates } });
    } else if (vacIdx !== undefined) {
      this._setImageBase(Math.min(vacIdx, this._config.vacuums.length - 1), updates);
    }
  }
  /** The `image_base` in effect — card-level in merged mode, else a vacuum's
   *  own (docs/38 §4). `vacIdx` used to default to the removed Maps tab's
   *  own vacuum-picker selection (`_mapVac`); its remaining split-mode
   *  callers (`_exportMapGuide`, `_placeRoomsFromCropBox`) have no vacuum of
   *  their own in scope any more, so this defaults to the first vacuum. */
  private _currentImageBase(vacIdx = 0): NonNullable<VacuumConfig["image_base"]> | undefined {
    const vacuums = this._config.vacuums;
    if (!vacuums.length) return undefined;
    const mapVac = Math.min(vacIdx, vacuums.length - 1);
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

  private _toggleMap(vacIdx: number): void {
    const s = new Set(this._openMap);
    if (s.has(vacIdx)) s.delete(vacIdx); else s.add(vacIdx);
    this._openMap = s;
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
            ${this._renderMapSection(idx, vac)}
            ${this._renderCleanActionSection(idx, vac)}
            ${this._renderPresetsSection(idx, vac)}

            ${this._mergedEdit ? html`
              <div class="section-title">Rooms</div>
              <p class="hint map-hint" @click=${() => { this._tab = "global"; }}>
                Merged mode shares one room list across every vacuum — edit it in
                <strong>Global tab → Rooms (shared)</strong> →
              </p>
            ` : html`
              <div class="section-title">Rooms (${(vac.rooms ?? []).length})</div>
              ${this._intEntityFor(vac)
                ? html`<p class="hint">With the AnyVac integration, rooms appear automatically from
                    this vacuum's own map — you don't need to add them here. Add a room below only to
                    override its icon/display name, or to position it on a custom floorplan.</p>`
                : html`<p class="hint">Add one entry per room this vacuum can clean.</p>`}
              ${(vac.rooms ?? []).map((r, ri) => this._renderRoomAccordion(r, idx, ri))}
              <button class="btn btn--add" @click=${() => this._addRoom(idx)}>
                <ha-icon icon="mdi:plus"></ha-icon> Add room
              </button>
            `}

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

  /** Per-vacuum map & floorplan settings (fáze L relocation, docs/42): the
   *  map-image-entity/integration-sensor overrides always apply. "Base
   *  layer" and the fixed stage height are split-mode-only concepts — in
   *  merged mode there's one shared card-level floorplan/height instead
   *  (Global tab), so those two + the floorplan-tools block below are
   *  hidden here (mirrors the old Maps tab's own `_mergedEdit` gate). */
  private _renderMapSection(vacIdx: number, vac: VacuumConfig) {
    const isOpen = this._openMap.has(vacIdx);
    return html`
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => this._toggleMap(vacIdx)}>
          <span class="collapsible-title">Map &amp; floorplan</span>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="collapsible-body">
            ${this._entityPicker("Map image entity (override)", vac.map?.entity, ["image"],
              v => this._setMap(vacIdx, { entity: v }))}
            <p class="hint">Leave blank to auto-resolve the AnyVac map image entity from this vacuum's device.</p>
            ${this._entityPicker("AnyVac sensor (override)", vac.integration_entity, ["sensor"],
              v => this._setVacuum(vacIdx, { integration_entity: v || undefined }))}
            <p class="hint">Leave blank to auto-resolve the AnyVac companion sensor from this vacuum's device.</p>
            ${this._mergedEdit ? html`
              <p class="hint">Base layer and stage height are set once for the whole card — see
                <strong>Global tab → Floorplan</strong> in merged mode.</p>
            ` : html`
              ${this._selectField<"image" | "map" | "combined">("Base layer", vac.base ?? "map",
                [{ value: "map", label: "Live map only" },
                 { value: "image", label: "Custom floorplan image" },
                 { value: "combined", label: "Floorplan + map overlay" }],
                v => this._setVacuum(vacIdx, { base: v }))}
              ${this._numberSlider("Stage height (0 = auto)", vac.base_height ?? 0, 0, 1200, 10,
                v => this._setVacuum(vacIdx, { base_height: v > 0 ? v : undefined }), " px")}
              ${(vac.base === "image" || vac.base === "combined")
                ? this._renderFloorplanTools(vacIdx, vac)
                : nothing}
            `}
          </div>
        ` : nothing}
      </div>`;
  }

  /** THIS vacuum's own floorplan image tooling (docs/38, docs/37) — snapshot
   *  from its live map, export tracing guide layers, record/clear the crop
   *  the saved file was cut from, place its rooms from that crop, and the
   *  image_base rotation/scale/offset fields. Split-mode-only: it edits
   *  `vac.image_base`, which has no Visual-editor equivalent at all (the
   *  backend's `set_floorplan_seat` override has no per-vacuum `image_base`
   *  slot — docs/42 fáze L). Note: the busy/error/result state fields this
   *  reads (`_floorplanSnapshotBusy` etc.) are shared across every vacuum's
   *  accordion rather than keyed per-vacuum — a carry-over from when only one
   *  vacuum's tools could ever be on screen at once (the old Maps tab's
   *  picker pills). Harmless in practice (the busy state is transient and
   *  each write still targets the right `vacIdx`), but two of these sections
   *  open at once will visually share one busy/error/result line. */
  private _renderFloorplanTools(vacIdx: number, vac: VacuumConfig) {
    const ib = this._currentImageBase(vacIdx);
    const cropBox = ib?.crop_box;
    const vacCrop = cropBox && "entity" in cropBox && cropBox.entity === vac.entity ? cropBox : undefined;
    const mapEntity = this._mapEntityFor(vac);
    const swap = this._hvSwap;
    const guideResult = this._guideExportResult && this._guideExportResult.entity === vac.entity
      ? this._guideExportResult : null;
    return html`
      <div class="sub-section">
        <div class="sub-title">Floorplan image</div>
        ${mapEntity ? html`
          <button class="btn btn--sm" ?disabled=${this._floorplanSnapshotBusy}
            @click=${() => this._snapshotFloorplan(vac)}>
            <ha-icon icon="mdi:camera"></ha-icon>
            ${this._floorplanSnapshotBusy ? "Snapshotting…" : "Use this vacuum's current map as floorplan"}
          </button>
          ${this._floorplanSnapshotError
            ? html`<p class="hint" style="color:#ff4d4f">${this._floorplanSnapshotError}</p>` : nothing}
        ` : html`<p class="hint">No map image entity found for this vacuum — set one above, or make
            sure its device exposes one.</p>`}

        ${this._textField("Image src (URL)", ib?.src,
          v => this._setEditedImageBase({ src: v }, vacIdx), "/local/anyvac/flat.svg")}
        ${ib?.src ? html`
          <img src=${ib.src} alt="Floorplan preview" style="max-width:100%;border-radius:8px;margin:4px 0;display:block"
            @load=${(e: Event) => {
              const im = e.target as HTMLImageElement;
              if (im.naturalWidth && im.naturalHeight
                && (this._pvNat?.w !== im.naturalWidth || this._pvNat?.h !== im.naturalHeight)) {
                this._pvNat = { w: im.naturalWidth, h: im.naturalHeight };
                this._pvAR = im.naturalHeight > 0 ? im.naturalWidth / im.naturalHeight : 0;
              }
            }} />
        ` : nothing}
        <div class="field field--row">
          <label>Swap ↔/↕ slider labels</label>
          <label class="toggle-wrap">
            <input type="checkbox" class="toggle-input" .checked=${swap}
              @change=${(e: Event) => { this._hvSwap = (e.target as HTMLInputElement).checked; }} />
            <span class="toggle-track"></span>
          </label>
        </div>
        ${this._numberSlider("Rotation", ib?.rotation ?? 0, -180, 180, 1,
          v => this._setEditedImageBase({ rotation: v }, vacIdx), "°")}
        ${this._numberSlider("Scale", ib?.scale ?? 100, 10, 400, 1,
          v => this._setEditedImageBase({ scale: v }, vacIdx), "%")}
        ${this._numberSlider(swap ? "Offset ↕" : "Offset ↔", ib?.offset_x ?? 0, -100, 100, 0.5,
          v => this._setEditedImageBase({ offset_x: v }, vacIdx), "%")}
        ${this._numberSlider(swap ? "Offset ↔" : "Offset ↕", ib?.offset_y ?? 0, -100, 100, 0.5,
          v => this._setEditedImageBase({ offset_y: v }, vacIdx), "%")}

        ${mapEntity ? html`
          <div class="sub-title">Guide layers</div>
          <p class="hint">Draws room-boundary/dry/wet-path guides in the same pixel canvas as the
            floorplan snapshot above, for tracing furniture in an external image editor.</p>
          <button class="btn btn--sm" ?disabled=${this._guideExportBusy}
            @click=${() => this._exportMapGuide(vac, vacIdx)}>
            <ha-icon icon="mdi:layers-outline"></ha-icon>
            ${this._guideExportBusy ? "Exporting…" : "Export guide layers"}
          </button>
          ${this._guideExportError
            ? html`<p class="hint" style="color:#ff4d4f">${this._guideExportError}</p>` : nothing}
          ${guideResult ? html`
            <p class="hint">Exported (${guideResult.size.w}×${guideResult.size.h}px):
              ${Object.keys(guideResult.paths).map(k => html`<code>${k}</code> `)}
              — trace furniture over them, then set the traced file as the Image src above.</p>
            ${guideResult.crop ? html`
              <span class="footer-link"
                @click=${() => this._setEditedImageBase(
                  { crop_box: { entity: vac.entity, ...guideResult.crop! } }, vacIdx)}>
                Use this crop for the floorplan
              </span>
            ` : nothing}
          ` : nothing}
        ` : nothing}

        ${vacCrop ? html`
          <div class="sub-title">Crop box</div>
          <p class="hint">This floorplan was cut from (${vacCrop.x0}, ${vacCrop.y0}) – (${vacCrop.x1}, ${vacCrop.y1})px
            of this vacuum's own map.
            <span class="footer-link" @click=${() => this._setEditedImageBase({ crop_box: undefined }, vacIdx)}>Clear</span>
          </p>
          ${this._pvNat && (Math.round(this._pvNat.w) !== Math.round(vacCrop.x1 - vacCrop.x0)
            || Math.round(this._pvNat.h) !== Math.round(vacCrop.y1 - vacCrop.y0))
            ? html`<p class="hint" style="color:#ff4d4f">The saved image (${this._pvNat.w}×${this._pvNat.h}px) doesn't
                match this crop box (${Math.round(vacCrop.x1 - vacCrop.x0)}×${Math.round(vacCrop.y1 - vacCrop.y0)}px) —
                it may have been trimmed/re-exported since. Re-snapshot or re-export the guide layers above.</p>`
            : nothing}
          <button class="btn btn--sm" @click=${() => this._placeRoomsFromCropBox()}>
            Place rooms from crop box
          </button>
          ${this._placeRoomsResult
            ? html`<p class="hint">Placed ${this._placeRoomsResult.placed}, added ${this._placeRoomsResult.added} room(s).</p>`
            : nothing}
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

  /** Icon, icon-anchor and dry/wet clean-time estimate fields — shared between
   *  the per-vacuum room accordion (split mode, `vac.rooms`) and the shared
   *  room accordion (merged mode, `_config.rooms`, Global tab). These three
   *  fields used to be editable only from the now-removed Maps tab (fáze L,
   *  docs/42) — there is no Visual-editor equivalent (`RoomsEditSession`'s
   *  `styleDraft` only carries the global border widths, never a per-room
   *  icon), so they need a home here regardless of which room list is being
   *  edited. `onChange` merges into whichever list (`vac.rooms` or
   *  `_config.rooms`) the caller is actually editing. */
  private _renderRoomMetaFields(room: RoomConfig, onChange: (u: Partial<RoomConfig>) => void) {
    return html`
      ${this._iconPickerField(room.icon, v => onChange({ icon: v || undefined }))}
      ${this._selectField<"none" | "tl" | "t" | "tr" | "l" | "c" | "r" | "bl" | "b" | "br">(
        "Icon anchor", room.icon_anchor ?? "c",
        [
          { value: "none", label: "Hidden" },
          { value: "tl", label: "Top-left" }, { value: "t", label: "Top" }, { value: "tr", label: "Top-right" },
          { value: "l", label: "Left" }, { value: "c", label: "Centre (default)" }, { value: "r", label: "Right" },
          { value: "bl", label: "Bottom-left" }, { value: "b", label: "Bottom" }, { value: "br", label: "Bottom-right" },
        ],
        v => onChange({ icon_anchor: v === "c" ? undefined : v }))}
      ${this._numberSlider("Est. dry clean time", room.clean_time_dry ?? 0, 0, 120, 1,
        v => onChange({ clean_time_dry: v > 0 ? v : undefined }), " min")}
      ${this._numberSlider("Est. wet clean time", room.clean_time_wet ?? 0, 0, 120, 1,
        v => onChange({ clean_time_wet: v > 0 ? v : undefined }), " min")}
      <p class="hint">Dry/wet estimates feed the controller's remaining-time readout for this
        room when the AnyVac integration hasn't learned its own yet — leave at 0 to use the
        integration's learned estimate (or the legacy fallback below, for setups without it).</p>`;
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
            ${this._renderRoomMetaFields(room, u => this._setRoom(vacIdx, roomIdx, u))}
            <p class="hint">Cleaning sequence is a shared, backend-owned reorderable list
              (requires the AnyVac integration + merged mode) — reorder it in the
              <strong>Global tab → Rooms (shared)</strong> section once merged mode is on,
              or in the Roborock app otherwise.</p>
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
            <p class="hint">Position and size are set in the Visual editor's Rooms
              tool, not here — open it from the card's own "Align"/edit entry point.</p>
          </div>
        ` : nothing}
      </div>`;
  }

  /** Shared-room accordion for merged mode (`_config.rooms`, Global tab) —
   *  mirrors `_renderRoomAccordion`'s per-vacuum version above. A merged room
   *  isn't "owned" by any one vacuum, so the segment-ID/native-area/legacy
   *  fallback block below uses the FIRST configured vacuum as a stand-in for
   *  "is there an AnyVac integration / native-area strategy in play at all" —
   *  accurate for the common case (every vacuum sharing one merged floorplan
   *  also shares one integration setup); a mixed fleet isn't modelled here,
   *  same as it wasn't in the old Maps tab. Reuses the existing `_openRoom`/
   *  `_dragRoom` state maps under a `-1` vacIdx slot (never a real vacuum
   *  index) rather than adding new state just for this one list. */
  private _renderMergedRoomAccordion(room: RoomConfig, roomIdx: number) {
    const MERGED = -1;
    const isOpen = (this._openRoom.get(MERGED) ?? null) === roomIdx;
    const rep = this._config.vacuums[0];
    const repIntEntity = rep ? this._intEntityFor(rep) : undefined;
    return html`
      <div class="room-acc"
        style=${this._dragRoom && this._dragRoom.vac === MERGED && this._dragRoom.idx !== roomIdx
          ? styleMap({ outline: "2px dashed var(--primary-color,#3b82f6)", outlineOffset: "-2px" }) : nothing}
        @dragover=${(e: DragEvent) => { if (this._dragRoom && this._dragRoom.vac === MERGED) e.preventDefault(); }}
        @drop=${(e: DragEvent) => {
          e.preventDefault();
          if (this._dragRoom && this._dragRoom.vac === MERGED) this._moveMergedRoom(this._dragRoom.idx, roomIdx);
          this._dragRoom = null;
        }}>
        <div class="room-acc-header" @click=${() => this._toggleRoom(MERGED, roomIdx)}>
          <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
            @click=${(e: Event) => e.stopPropagation()}
            @dragstart=${(e: DragEvent) => { this._dragRoom = { vac: MERGED, idx: roomIdx }; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }}
            @dragend=${() => { this._dragRoom = null; }}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${room.icon || "mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${room.name || room.key || "Unnamed room"}</span>
          </div>
          <button class="icon-btn icon-btn--danger icon-btn--sm"
            @click=${(e: Event) => { e.stopPropagation(); this._deleteEditedRoom(roomIdx); }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="room-acc-body">
            ${this._textField("Key (unique ID)", room.key,
              v => this._setEditedRoom(roomIdx, { key: v }), "e.g. bedroom")}
            <p class="hint">Tip: keep this identical to the room's name in the Roborock app — the AnyVac integration matches rooms by this name (auto-seating, live positions from the integration, room pinning).</p>
            ${this._textField("Display name", room.name,
              v => this._setEditedRoom(roomIdx, { name: v }), "e.g. Bedroom")}
            ${this._renderRoomMetaFields(room, u => this._setEditedRoom(roomIdx, u))}
            ${repIntEntity
              ? html`<p class="hint">Segment resolution, timing and clean history are handled
                  server-side by the AnyVac integration — nothing to set here.</p>`
              : rep?.clean_action?.type === "native-area"
                ? html`
                  <div class="field field--row">
                    <label>Effective area</label>
                    <strong style="font-size:13px">${
                      /* must mirror the card's resolution order */
                      room.area_id ?? this._config.area_mappings?.[room.key] ?? room.key
                    }</strong>
                  </div>
                  <p class="hint">Set in <strong>Area mappings</strong>, further down this tab.</p>`
                : html`
                  <div class="field field--row">
                    <label>Segment ID</label>
                    <input class="text-input text-input--sm" type="number"
                      .value=${String(room.segment_id ?? "")} placeholder="e.g. 16"
                      @change=${(e: Event) => {
                        const v = parseInt((e.target as HTMLInputElement).value);
                        this._setEditedRoom(roomIdx, { segment_id: isNaN(v) ? undefined : v });
                      }} />
                  </div>
                  <p class="hint">Find IDs: Developer Tools → Actions → roborock.get_maps</p>
                  ${this._numberSlider("Est. clean time (fallback)", room.clean_time_mins ?? 0, 0, 120, 1,
                    v => this._setEditedRoom(roomIdx, { clean_time_mins: v > 0 ? v : undefined }), " min")}
                  ${this._entityPicker("Clean time fallback (input_number, legacy)", room.clean_time_entity, ["input_number"],
                    v => this._setEditedRoom(roomIdx, { clean_time_entity: v || undefined }))}
                  ${this._entityPicker("Last clean fallback (input_datetime, legacy)", room.last_clean_entity, ["input_datetime"],
                    v => this._setEditedRoom(roomIdx, { last_clean_entity: v || undefined }))}
                  <p class="hint">Legacy read-only fallbacks for setups without the AnyVac
                    integration — the card never writes these helpers.</p>`}
            <p class="hint">Position and size are set in the Visual editor's Rooms
              tool, not here — open it from the card's own "Align"/edit entry point.</p>
          </div>
        ` : nothing}
      </div>`;
  }

  private _moveMergedRoom(from: number, to: number): void {
    if (from === to) return;
    const rooms = [...(this._config.rooms ?? [])];
    if (from < 0 || from >= rooms.length || to < 0 || to >= rooms.length) return;
    const [moved] = rooms.splice(from, 1);
    rooms.splice(to, 0, moved);
    this._setConfig({ rooms });
  }

  /** Backend-owned cleaning-sequence reorder list (docs/19), relocated out of
   *  the removed Maps tab (fáze L) — merged mode only (the sequence is
   *  card-wide, not per-vacuum) and only shown once an integration sensor is
   *  actually available to read/write it from. */
  private _renderSequenceSection() {
    const seqVac = this._config.vacuums.find(v => this._intEntityFor(v));
    if (!seqVac) return nothing;
    const rooms = this._config.rooms ?? [];
    if (!rooms.length) return nothing;
    const seqMap = this._roomSequence(seqVac);
    const ordered = this._roomsInSequenceOrder(rooms, seqMap);
    return html`
      <div class="section-title" style="margin-top:4px">Cleaning sequence</div>
      <p class="hint">The order rooms clean in, shared across every vacuum (backend-owned —
        drag to reorder here, or in the Roborock app).</p>
      ${ordered.map((r, i) => html`
        <div class="var-row"
          style=${this._dragSeq !== null && this._dragSeq !== i
            ? styleMap({ outline: "2px dashed var(--primary-color,#3b82f6)", outlineOffset: "-2px" }) : nothing}
          @dragover=${(e: DragEvent) => { if (this._dragSeq !== null) e.preventDefault(); }}
          @drop=${(e: DragEvent) => {
            e.preventDefault();
            if (this._dragSeq !== null) this._moveSequence(seqVac, ordered, this._dragSeq, i);
            this._dragSeq = null;
          }}>
          <ha-icon icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true" style="cursor:grab;opacity:0.5;--mdc-icon-size:18px;flex-shrink:0"
            @dragstart=${(e: DragEvent) => { this._dragSeq = i; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }}
            @dragend=${() => { this._dragSeq = null; }}></ha-icon>
          <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:18px;flex-shrink:0"></ha-icon>
          <span style="flex:1">${r.name || r.key}</span>
          <span style="font-size:11px;color:var(--secondary-text-color)">${i + 1}</span>
        </div>
      `)}
    `;
  }

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

        ${this._mergedEdit ? html`
          <div class="section-title" style="margin-top:4px">Floorplan</div>
          ${this._textField("Image src (URL)", this._config.image_base?.src,
            v => this._setConfig({ image_base: { ...(this._config.image_base ?? { src: "" }), src: v } }),
            "/local/anyvac/flat.svg")}
          <p class="hint">${this._config.image_base?.src
            ? html`Rotation/scale/position and room layout are set in the Visual editor
                (open it from the card) — this field is only for pointing at a new file
                (e.g. after snapshotting or tracing one externally).`
            : html`Set this once to bootstrap the shared floorplan — after that, use the
                Visual editor's own "Snapshot" buttons or this field again to replace the
                file; rotation/scale/position are then set in the Visual editor.`}</p>
          ${this._numberSlider("Stage height (0 = auto)", this._config.base_height ?? 0, 0, 1200, 10,
            v => this._setConfig({ base_height: v > 0 ? v : undefined }), " px")}

          <div class="section-title" style="margin-top:4px">Rooms (shared)</div>
          <p class="hint">Merged mode shares one room list across every vacuum.
            ${this._config.vacuums.some(v => this._intEntityFor(v))
              ? " With the AnyVac integration, rooms appear automatically from the shared floorplan — add a room below only to override its icon/display name or clean-time estimates."
              : " Add one entry per room."}</p>
          ${(this._config.rooms ?? []).map((r, ri) => this._renderMergedRoomAccordion(r, ri))}
          <button class="btn btn--add" @click=${() => this._addEditedRoom()}>
            <ha-icon icon="mdi:plus"></ha-icon> Add room
          </button>
          ${this._renderSequenceSection()}
        ` : nothing}

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
          ${(["vacuums", "global"] as const).map(t => html`
            <button class="tab-btn ${this._tab === t ? "tab-btn--active" : ""}"
              @click=${() => { this._tab = t; }}>
              ${{ vacuums: "🤖 Vacuums", global: "⚙ Global" }[t]}
            </button>`)}
        </div>
        ${this._tab === "vacuums" ? this._renderVacuumsTab()
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
