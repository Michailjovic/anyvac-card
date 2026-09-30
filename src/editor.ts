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
  /** docs/44 F6: at most one vacuum expanded (null = all collapsed). */
  @state() private _openVac: number | null = null;
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

  /** docs/44 F6: HA's form elements — null while loading, false when they
   *  aren't available (plain inputs then), true once `ha-selector` exists. */
  @state() private _ha: boolean | null = null;
  /** Open ⋮ row menu and the row whose delete is being confirmed. */
  @state() private _menu: string | null = null;
  @state() private _confirm: string | null = null;
  /** Hints whose long text is expanded (keyed by their short text). */
  @state() private _hintsOpen = new Set<string>();
  private _hintSeq = 0;

  connectedCallback(): void {
    super.connectedCallback();
    void this._ensureHaElements();
  }

  setConfig(config: AnyVacCardConfig): void {
    this._config = config;
    if (!this._initialized) {
      this._initialized = true;
      this._openVac = (config.vacuums ?? []).length === 1 ? 0 : null;
    }
  }

  protected updated(changed: PropertyValues): void {
    if ((changed.has("hass") || changed.has("_ha")) && this.hass && this._ha === false) {
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
    if (this._openVac === idx) this._openVac = target;
    else if (this._openVac === target) this._openVac = idx;
  }

  private _addVacuum(): void {
    const vacuums = [...this._config.vacuums, { ...DEFAULT_VACUUM }];
    const next = { ...this._config, vacuums };
    this._config = next; this._fire(next);
    this._openVac = vacuums.length - 1;
  }

  private _deleteVacuum(idx: number): void {
    const vacuums = this._config.vacuums.filter((_, i) => i !== idx);
    const next = { ...this._config, vacuums };
    this._config = next; this._fire(next);
    if (this._openVac === idx) this._openVac = null;
    else if (this._openVac !== null && this._openVac > idx) this._openVac--;
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

  /** docs/44 F6: one vacuum expanded at a time — three fully expanded
   *  vacuums used to be a wall of fields (docs/43 E3). */
  private _toggleVac(idx: number): void {
    this._openVac = this._openVac === idx ? null : idx;
    this._menu = null;
  }

  private _toggleRoom(vacIdx: number, roomIdx: number): void {
    const m = new Map(this._openRoom);
    const cur = m.get(vacIdx) ?? null;
    m.set(vacIdx, cur === roomIdx ? null : roomIdx);
    this._openRoom = m;
  }

  private _toggleIn(set: Set<number>, idx: number, open?: boolean): Set<number> {
    const s = new Set(set);
    const want = open ?? !s.has(idx);
    if (want) s.add(idx); else s.delete(idx);
    return s;
  }
  private _toggleSensors(vacIdx: number, open?: boolean): void { this._openSensors = this._toggleIn(this._openSensors, vacIdx, open); }
  private _toggleMap(vacIdx: number, open?: boolean): void { this._openMap = this._toggleIn(this._openMap, vacIdx, open); }
  private _toggleAction(vacIdx: number, open?: boolean): void { this._openAction = this._toggleIn(this._openAction, vacIdx, open); }
  private _togglePresets(vacIdx: number, open?: boolean): void { this._openPresets = this._toggleIn(this._openPresets, vacIdx, open); }
  private _toggleGlobal(idx: number): void { this._openGlobal = this._toggleIn(this._openGlobal, idx); }

  // ── HA form elements (docs/44 F6) ─────────────────────────────────────────

  /**
   * `ha-selector` / `ha-expansion-panel` are lazy-loaded by Home Assistant —
   * they only exist once some built-in editor has been opened. The usual
   * trick: ask the card helpers for a stock card and load ITS config
   * element, which pulls the form elements in. Outside Home Assistant (no
   * `loadCardHelpers`, e.g. the test harness) or if they never show up, the
   * editor keeps its own plain inputs — every field works either way, the
   * HA path just looks and behaves like the rest of HA.
   */
  private async _ensureHaElements(): Promise<void> {
    if (this._ha !== null) return;
    // `ha-selector` is what matters; `ha-expansion-panel` is optional (the
    // editor's own collapsible stands in for it, see `_panel`).
    const ready = () => !!customElements.get("ha-selector");
    if (ready()) { this._ha = true; return; }
    const w = window as any;
    if (typeof w.loadCardHelpers !== "function") { this._ha = false; return; }
    try {
      const helpers = await w.loadCardHelpers();
      for (const type of ["entities", "tile"]) {
        const card = await helpers.createCardElement({ type, entities: [], entity: "sun.sun" });
        await (card?.constructor as any)?.getConfigElement?.();
        if (ready()) break;
      }
      await Promise.race([
        customElements.whenDefined("ha-selector"),
        new Promise((r) => setTimeout(r, 4000)),
      ]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[anyvac-card] couldn't load HA form elements, using plain inputs:", err);
    }
    this._ha = ready();
  }

  /** One HA selector field. `label` is an attribute on purpose (Lit maps it
   *  to the property) so labels stay visible in the rendered markup.
   *  `required` MUST be a property binding: `ha-selector` defaults it to
   *  true, so a merely absent boolean attribute would leave every optional
   *  field required (not clearable, marked with *). The
   *  selector's `value-changed` is stopped here — only `config-changed`
   *  should leave this editor. */
  private _sel(
    label: string, selector: Record<string, unknown>, value: unknown,
    onChange: (v: any) => void, opts: { required?: boolean; placeholder?: string } = {},
  ) {
    return html`<ha-selector class="sel" .hass=${this.hass} .selector=${selector} .value=${value}
      label=${label} .required=${!!opts.required} .placeholder=${opts.placeholder}
      @value-changed=${(e: CustomEvent) => { e.stopPropagation(); onChange(e.detail?.value); }}></ha-selector>`;
  }

  // ── Shared field helpers ──────────────────────────────────────────────────

  private _entityPicker(label: string, value: string | undefined, domains: string[],
    onChange: (v: string) => void, required = false) {
    if (this._ha) {
      return this._sel(label, { entity: { domain: domains.length === 1 ? domains[0] : domains } },
        value || undefined, (v) => onChange(v ?? ""), { required });
    }
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
    if (this._ha) return this._sel(label, { text: {} }, value ?? "", (v) => onChange(v ?? ""), { placeholder });
    return html`
      <div class="field">
        <label>${label}</label>
        <input class="text-input" type="text" .value=${value ?? ""} placeholder=${placeholder}
          @change=${(e: Event) => onChange((e.target as HTMLInputElement).value)} />
      </div>`;
  }

  /** Resolves a VacuumColor (legacy preset name or custom hex) to a CSS colour
   *  string — mirrors `_resolveColor` in anyvac-card.ts. */
  private _resolveColor(raw: string | undefined, fallback: string): string {
    const c = raw ?? fallback;
    return COLOR_HEX[c] ?? c;
  }

  /** docs/44 F6: colour = a palette of swatches plus a custom one (native
   *  colour picker). HA has no hex-string selector (`color_rgb` stores an
   *  [r,g,b] list, which would change the config format), so this stays a
   *  small control of the editor's own. Writes `#rrggbb`, like before. */
  private _colorField(label: string, value: string | undefined, palette: ReadonlyArray<{ hex: string; label?: string }>,
    onChange: (v: string | undefined) => void, fallback: string) {
    const cur = (value ?? "").toLowerCase();
    const custom = /^#[0-9a-f]{6}$/.test(cur) && !palette.some((p) => p.hex.toLowerCase() === cur);
    return html`
      <div class="field">
        <span class="field-label">${label}</span>
        <div class="swatches" role="radiogroup" aria-label=${label}>
          ${palette.map((p) => html`<button type="button" class="swatch ${p.hex.toLowerCase() === cur ? "swatch--on" : ""}"
              role="radio" aria-checked=${p.hex.toLowerCase() === cur ? "true" : "false"}
              title=${p.label ?? p.hex} aria-label=${p.label ?? p.hex}
              style=${styleMap({ background: p.hex })} @click=${() => onChange(p.hex)}></button>`)}
          <label class="swatch swatch--custom ${custom ? "swatch--on" : ""}" title="Custom colour"
            style=${styleMap({ background: custom ? cur : "transparent" })}>
            ${custom ? nothing : html`<ha-icon icon="mdi:palette-outline"></ha-icon>`}
            <input type="color" .value=${/^#[0-9a-f]{6}$/.test(cur) ? cur : fallback}
              @input=${(e: Event) => onChange((e.target as HTMLInputElement).value)} />
          </label>
          ${value ? html`<button type="button" class="link-btn" @click=${() => onChange(undefined)}>Default</button>` : nothing}
        </div>
      </div>`;
  }

  private _numberSlider(label: string, value: number | undefined, min: number, max: number, step: number,
    onChange: (v: number) => void, suffix = "") {
    const cur = value ?? 0;
    if (this._ha) {
      return this._sel(label,
        { number: { min, max, step, mode: "slider", ...(suffix.trim() ? { unit_of_measurement: suffix.trim() } : {}) } },
        cur, (v) => { const n = Number(v); if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n))); });
    }
    // Typed entry alongside the slider (2026-09-15 field report): clamped to
    // [min,max] but NOT snapped to `step` (typing an exact value is the point).
    const commit = (raw: string) => {
      const n = Number(raw);
      if (Number.isNaN(n)) return;
      onChange(Math.min(max, Math.max(min, n)));
    };
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${min} max=${max} step=${step} .value=${String(cur)}
            @input=${(e: Event) => onChange(Number((e.target as HTMLInputElement).value))} />
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

  /** Plain number box (segment ID, threshold days). Empty → undefined. */
  private _numberBox(label: string, value: number | undefined, onChange: (v: number | undefined) => void,
    opts: { min?: number; max?: number; placeholder?: string } = {}) {
    if (this._ha) {
      return this._sel(label, { number: { mode: "box", step: 1, ...(opts.min !== undefined ? { min: opts.min } : {}), ...(opts.max !== undefined ? { max: opts.max } : {}) } },
        value, (v) => { const n = typeof v === "number" ? v : parseInt(String(v ?? "")); onChange(Number.isNaN(n) ? undefined : n); },
        { placeholder: opts.placeholder });
    }
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <input class="text-input text-input--sm" type="number" min=${opts.min ?? ""} max=${opts.max ?? ""}
          .value=${String(value ?? "")} placeholder=${opts.placeholder ?? ""}
          @change=${(e: Event) => {
            const v = parseInt((e.target as HTMLInputElement).value);
            onChange(isNaN(v) ? undefined : v);
          }} />
      </div>`;
  }

  private _selectField<T extends string>(label: string, value: T,
    options: Array<{ value: T; label: string }>, onChange: (v: T) => void) {
    if (this._ha) {
      return this._sel(label, { select: { mode: "dropdown", options } }, value, (v) => { if (v != null) onChange(v as T); }, { required: true });
    }
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <select class="select-input" @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value as T)}>
          ${options.map(o => html`<option value=${o.value} ?selected=${o.value === value}>${o.label}</option>`)}
        </select>
      </div>`;
  }

  /** docs/44 F6: a short choice among a few values as a segmented control
   *  (Role, Scope, Mode) instead of a dropdown. Same control in both paths —
   *  it is plain buttons styled with HA's own variables. */
  private _segmented<T extends string>(label: string, value: T,
    options: Array<{ value: T; label: string; icon?: string }>, onChange: (v: T) => void) {
    return html`
      <div class="field">
        <span class="field-label">${label}</span>
        <div class="segmented" role="radiogroup" aria-label=${label}>
          ${options.map((o) => html`<button type="button" role="radio" aria-checked=${o.value === value ? "true" : "false"}
              class="seg ${o.value === value ? "seg--on" : ""}" @click=${() => { if (o.value !== value) onChange(o.value); }}>
              ${o.icon ? html`<ha-icon icon=${o.icon}></ha-icon>` : nothing}<span>${o.label}</span></button>`)}
        </div>
      </div>`;
  }

  private _optionSelectFromList(label: string, opts: string[], value: string | undefined,
    onChange: (v: string) => void) {
    if (this._ha) {
      return this._sel(label,
        { select: { mode: "dropdown", options: [{ value: "", label: "— none —" }, ...opts.map((o) => ({ value: o, label: o }))] } },
        value ?? "", (v) => onChange(v ?? ""));
    }
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
    return this._optionSelectFromList(label, opts, value, onChange);
  }

  private _iconPickerField(value: string | undefined, onChange: (v: string) => void, label = "Icon") {
    if (this._ha) return this._sel(label, { icon: {} }, value ?? "", (v) => onChange(v ?? ""));
    return html`
      <div class="field">
        <label>${label}</label>
        <ha-icon-picker .value=${value ?? "mdi:square"}
          @value-changed=${(e: CustomEvent) => onChange(e.detail.value)}
        ></ha-icon-picker>
      </div>`;
  }

  private _areaPicker(label: string, value: string | undefined, onChange: (v: string) => void) {
    if (this._ha) return this._sel(label, { area: {} }, value ?? "", (v) => onChange(v ?? ""));
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

  private _toggle(label: string, checked: boolean, onChange: (v: boolean) => void) {
    if (this._ha) return this._sel(label, { boolean: {} }, checked, (v) => onChange(!!v));
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <label class="toggle-wrap">
          <input type="checkbox" class="toggle-input" .checked=${checked}
            @change=${(e: Event) => onChange((e.target as HTMLInputElement).checked)} />
          <span class="toggle-track"></span>
        </label>
      </div>`;
  }

  /** docs/44 F6 (E3): hints are one line; the longer explanation sits behind
   *  an (i) that expands it in place — a tooltip alone doesn't exist on a
   *  phone. */
  private _hint(short: unknown, more?: unknown) {
    if (!more) return html`<p class="hint">${short}</p>`;
    const key = typeof short === "string" ? short : String(this._hintSeq++);
    const open = this._hintsOpen.has(key);
    return html`<p class="hint">${short}
      <button type="button" class="hint-more" aria-expanded=${open ? "true" : "false"} aria-label="More"
        @click=${() => { const s = new Set(this._hintsOpen); if (open) s.delete(key); else s.add(key); this._hintsOpen = s; }}>
        <ha-icon icon=${open ? "mdi:chevron-up" : "mdi:information-outline"}></ha-icon></button>
      ${open ? html`<span class="hint-long">${more}</span>` : nothing}</p>`;
  }

  /** A collapsible sub-panel: `ha-expansion-panel` (outlined, with a one-line
   *  summary) when HA's elements are available, the editor's own otherwise.
   *  The body is only built while open. */
  private _panel(title: string, secondary: string | undefined, open: boolean,
    onToggle: (open: boolean) => void, body: () => unknown) {
    if (this._ha && customElements.get("ha-expansion-panel")) {
      return html`<ha-expansion-panel outlined class="panel" header=${title} secondary=${secondary ?? ""}
          .expanded=${open}
          @expanded-will-change=${(e: CustomEvent) => { if (e.target === e.currentTarget) onToggle(!!e.detail?.expanded); }}
          @expanded-changed=${(e: CustomEvent) => { if (e.target === e.currentTarget && !!e.detail?.expanded !== open) onToggle(!!e.detail?.expanded); }}>
        ${open ? html`<div class="panel-body">${body()}</div>` : nothing}
      </ha-expansion-panel>`;
    }
    return html`
      <div class="collapsible">
        <div class="collapsible-header" @click=${() => onToggle(!open)}>
          <span class="collapsible-title">${title}</span>
          ${secondary ? html`<span class="badge">${secondary}</span>` : nothing}
          <ha-icon icon=${open ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${open ? html`<div class="collapsible-body">${body()}</div>` : nothing}
      </div>`;
  }

  /** docs/44 F6: ⋮ row menu (move / delete) instead of a permanent red bin
   *  per row. Delete asks for confirmation inside the menu. */
  private _rowMenu(id: string, name: string, items: Array<{ label: string; icon: string; action: () => void; disabled?: boolean }>,
    onDelete?: () => void) {
    const open = this._menu === id;
    const confirming = this._confirm === id;
    return html`
      <span class="menu-wrap" @click=${(e: Event) => e.stopPropagation()}>
        <button type="button" class="icon-btn" aria-label="More actions" aria-haspopup="menu" aria-expanded=${open ? "true" : "false"}
          @click=${() => { this._menu = open ? null : id; this._confirm = null; }}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>
        ${open ? html`
          <div class="menu" role="menu">
            ${confirming ? html`
              <div class="menu-confirm">Delete ${name}?</div>
              <div class="menu-confirm-row">
                <button type="button" class="menu-btn" @click=${() => { this._menu = null; this._confirm = null; }}>Cancel</button>
                <button type="button" class="menu-btn menu-btn--danger"
                  @click=${() => { this._menu = null; this._confirm = null; onDelete?.(); }}>Delete</button>
              </div>`
            : html`
              ${items.map((it) => html`<button type="button" role="menuitem" class="menu-item" ?disabled=${!!it.disabled}
                  @click=${() => { this._menu = null; it.action(); }}>
                  <ha-icon icon=${it.icon}></ha-icon><span>${it.label}</span></button>`)}
              ${onDelete ? html`<button type="button" role="menuitem" class="menu-item menu-item--danger"
                  @click=${() => { this._confirm = id; }}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon><span>Delete</span></button>` : nothing}`}
          </div>` : nothing}
      </span>`;
  }

  // ── Tab: Vacuums ──────────────────────────────────────────────────────────

  private _renderVacuumsTab() {
    return html`
      <div class="tab-body">
        ${this._config.vacuums.length === 0
          ? this._hint("No vacuums yet. Add one below.")
          : this._config.vacuums.map((vac, i) => this._renderVacuumAccordion(vac, i))}
        <button class="btn btn--add" @click=${() => this._addVacuum()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add vacuum
        </button>
      </div>`;
  }

  private _roleLabel(ct: VacuumConfig["clean_type"]): string {
    return ct === "dry" ? "Dry" : ct === "wet" ? "Wet" : ct === "both" ? "Dry + wet" : "Auto role";
  }

  private _renderVacuumAccordion(vac: VacuumConfig, idx: number) {
    const color = this._resolveColor(vac.color, DEFAULT_VACUUM_PALETTE[idx % DEFAULT_VACUUM_PALETTE.length]);
    const isOpen = this._openVac === idx;
    const last = this._config.vacuums.length - 1;
    const name = vac.name || vac.entity || "Unnamed vacuum";
    return html`
      <div class="acc-row ${isOpen ? "acc-row--open" : ""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${isOpen ? "true" : "false"}
          @click=${() => this._toggleVac(idx)}
          @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this._toggleVac(idx); } }}>
          <span class="acc-avatar" style=${styleMap({ borderColor: color })}>
            ${vac.image
              ? html`<img src=${vac.image} alt="" />`
              : html`<ha-icon icon="mdi:robot-vacuum" style=${styleMap({ color })}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name"><span class="acc-dot" style=${styleMap({ background: color })}></span>${name}</span>
            <span class="acc-sub">${this._roleLabel(vac.clean_type)} · ${vac.entity || "no entity"}</span>
          </div>
          ${this._rowMenu("vac-" + idx, name, [
            { label: "Move up", icon: "mdi:arrow-up", action: () => this._moveVacuum(idx, -1), disabled: idx === 0 },
            { label: "Move down", icon: "mdi:arrow-down", action: () => this._moveVacuum(idx, 1), disabled: idx === last },
          ], () => this._deleteVacuum(idx))}
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>

        ${isOpen ? html`
          <div class="acc-body">
            ${this._entityPicker("Vacuum entity", vac.entity, ["vacuum"],
              v => this._setVacuum(idx, { entity: v }), true)}
            ${this._textField("Display name", vac.name,
              v => this._setVacuum(idx, { name: v }), "e.g. S8")}
            ${this._textField("Image path", vac.image,
              v => this._setVacuum(idx, { image: v }), "/local/...")}
            ${this._colorField("Colour", vac.color ? this._resolveColor(vac.color, "green") : undefined,
              DEFAULT_VACUUM_PALETTE.map((hex) => ({ hex })),
              v => this._setVacuum(idx, { color: v || undefined }), DEFAULT_VACUUM_PALETTE[idx % DEFAULT_VACUUM_PALETTE.length])}
            ${this._segmented<"auto" | "dry" | "wet" | "both">("Role", vac.clean_type ?? "auto",
              [{ value: "auto", label: "Auto" },
               { value: "dry", label: "Dry", icon: "mdi:broom" },
               { value: "wet", label: "Wet", icon: "mdi:water" },
               { value: "both", label: "Both", icon: "mdi:water-plus" }],
              v => this._setVacuum(idx, { clean_type: v === "auto" ? undefined : v }))}
            ${this._hint("What this robot can do — not the Dry/Wet choice for a run.",
              html`Controls which time estimate and which dry/wet layer it uses. "Auto" detects it
                from the clean action; "Both" follows the live water mode (needs the integration
                sensor). The run-time Dry/Wet/Both choice is made on the card.`)}

            ${this._renderSensorsSection(idx, vac)}
            ${this._renderMapSection(idx, vac)}
            ${this._renderCleanActionSection(idx, vac)}
            ${this._renderPresetsSection(idx, vac)}

            ${this._mergedEdit ? html`
              <p class="hint link" @click=${() => { this._tab = "global"; }}>
                Rooms (shared) are edited once for all vacuums on the Global tab →
              </p>
            ` : this._renderSplitRooms(idx, vac)}
          </div>
        ` : nothing}
      </div>`;
  }

  private _renderSplitRooms(idx: number, vac: VacuumConfig) {
    const rooms = vac.rooms ?? [];
    const withInt = !!this._intEntityFor(vac);
    return html`
      <div class="section-title">Rooms (${rooms.length})</div>
      ${withInt
        ? this._hint("Rooms come from this vacuum's map automatically.",
            html`Add a room here only to override its icon/display name, or to position it on a custom floorplan.`)
        : this._hint("Add one entry per room this vacuum can clean.")}
      ${rooms.map((r, ri) => this._renderRoomAccordion(r, idx, ri))}
      <button class="btn btn--add" @click=${() => this._addRoom(idx)}>
        <ha-icon icon="mdi:plus"></ha-icon> Add room
      </button>`;
  }

  private _renderSensorsSection(vacIdx: number, vac: VacuumConfig) {
    const configured = [vac.status_entity, vac.battery_entity, vac.last_clean_entity,
      vac.progress_entity, vac.current_room_entity, vac.error_entity].filter(Boolean).length;
    return this._panel("Sensors",
      configured ? `${configured} set manually, the rest found automatically` : "Found automatically on the vacuum's device",
      this._openSensors.has(vacIdx), (o) => this._toggleSensors(vacIdx, o), () => html`
        ${this._hint("Leave blank to use the vacuum's own sensors.")}
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
          v => this._setVacuum(vacIdx, { error_entity: v || undefined }))}`);
  }

  /** Per-vacuum map & floorplan settings (fáze L relocation, docs/42): the
   *  map-image-entity/integration-sensor overrides always apply. "Base
   *  layer" and the fixed stage height are split-mode-only concepts — in
   *  merged mode there's one shared card-level floorplan/height instead
   *  (Global tab), so those two + the floorplan-tools block below are
   *  hidden here. */
  private _renderMapSection(vacIdx: number, vac: VacuumConfig) {
    const auto = this._mapEntityFor(vac);
    const summary = vac.map?.entity ? vac.map.entity : auto ? `Found automatically: ${auto}` : "No map image found";
    return this._panel("Map & floorplan", summary,
      this._openMap.has(vacIdx), (o) => this._toggleMap(vacIdx, o), () => html`
        ${this._entityPicker("Map image entity (override)", vac.map?.entity, ["image"],
          v => this._setMap(vacIdx, { entity: v }))}
        ${this._entityPicker("AnyVac sensor (override)", vac.integration_entity, ["sensor"],
          v => this._setVacuum(vacIdx, { integration_entity: v || undefined }))}
        ${this._hint("Leave both blank to find them on the vacuum's device.")}
        ${this._mergedEdit ? this._hint(html`Base layer and stage height are set once for the whole card —
            <strong>Global tab → Floorplan</strong>.`) : html`
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
        `}`);
  }

  /** THIS vacuum's own floorplan image tooling (docs/38, docs/37) — snapshot
   *  from its live map, export tracing guide layers, record/clear the crop
   *  the saved file was cut from, place its rooms from that crop, and the
   *  image_base rotation/scale/offset fields. Split-mode-only (see docs/42
   *  fáze L). The busy/error/result state is shared across vacuums — harmless,
   *  only one vacuum is expanded at a time now (docs/44 F6). */
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
            ? html`<p class="hint hint--error">${this._floorplanSnapshotError}</p>` : nothing}
        ` : this._hint("No map image entity found for this vacuum — set one above.")}

        ${this._textField("Image src (URL)", ib?.src,
          v => this._setEditedImageBase({ src: v }, vacIdx), "/local/anyvac/flat.svg")}
        ${ib?.src ? html`
          <img class="fp-preview" src=${ib.src} alt="Floorplan preview"
            @load=${(e: Event) => {
              const im = e.target as HTMLImageElement;
              if (im.naturalWidth && im.naturalHeight
                && (this._pvNat?.w !== im.naturalWidth || this._pvNat?.h !== im.naturalHeight)) {
                this._pvNat = { w: im.naturalWidth, h: im.naturalHeight };
                this._pvAR = im.naturalHeight > 0 ? im.naturalWidth / im.naturalHeight : 0;
              }
            }} />
        ` : nothing}
        ${this._toggle("Swap ↔/↕ slider labels", swap, (v) => { this._hvSwap = v; })}
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
          ${this._hint("Room/path guides for tracing furniture in an image editor.",
            html`Drawn in the same pixel canvas as the floorplan snapshot above, as transparent PNGs.`)}
          <button class="btn btn--sm" ?disabled=${this._guideExportBusy}
            @click=${() => this._exportMapGuide(vac, vacIdx)}>
            <ha-icon icon="mdi:layers-outline"></ha-icon>
            ${this._guideExportBusy ? "Exporting…" : "Export guide layers"}
          </button>
          ${this._guideExportError
            ? html`<p class="hint hint--error">${this._guideExportError}</p>` : nothing}
          ${guideResult ? html`
            <p class="hint">Exported (${guideResult.size.w}×${guideResult.size.h}px):
              ${Object.keys(guideResult.paths).map(k => html`<code>${k}</code> `)}
              — trace furniture over them, then set the traced file as the Image src above.</p>
            ${guideResult.crop ? html`
              <button type="button" class="link-btn"
                @click=${() => this._setEditedImageBase(
                  { crop_box: { entity: vac.entity, ...guideResult.crop! } }, vacIdx)}>
                Use this crop for the floorplan
              </button>
            ` : nothing}
          ` : nothing}
        ` : nothing}

        ${vacCrop ? html`
          <div class="sub-title">Crop box</div>
          <p class="hint">Cut from (${vacCrop.x0}, ${vacCrop.y0}) – (${vacCrop.x1}, ${vacCrop.y1})px of this vacuum's map.
            <button type="button" class="link-btn" @click=${() => this._setEditedImageBase({ crop_box: undefined }, vacIdx)}>Clear</button>
          </p>
          ${this._pvNat && (Math.round(this._pvNat.w) !== Math.round(vacCrop.x1 - vacCrop.x0)
            || Math.round(this._pvNat.h) !== Math.round(vacCrop.y1 - vacCrop.y0))
            ? html`<p class="hint hint--error">The saved image (${this._pvNat.w}×${this._pvNat.h}px) doesn't
                match this crop box (${Math.round(vacCrop.x1 - vacCrop.x0)}×${Math.round(vacCrop.y1 - vacCrop.y0)}px) —
                re-snapshot or re-export the guide layers above.</p>`
            : nothing}
          <button class="btn btn--sm" @click=${() => this._placeRoomsFromCropBox()}>
            Place rooms from crop box
          </button>
          ${this._placeRoomsResult
            ? this._hint(`Placed ${this._placeRoomsResult.placed}, added ${this._placeRoomsResult.added} room(s).`)
            : nothing}
        ` : nothing}
      </div>`;
  }

  private _renderPresetsSection(vacIdx: number, vac: VacuumConfig) {
    const presets = vac.presets ?? [];
    const speeds: string[] = (this.hass.states[vac.entity]?.attributes["fan_speed_list"] as string[]) ?? [];
    const ca = vac.clean_action as Partial<NativeAutoCleanAction> | undefined;
    const mopModeEnt = ca?.mop_mode_entity;
    const mopIntEnt = ca?.mop_intensity_entity;
    return this._panel("Setting presets",
      presets.length ? `${presets.length} preset${presets.length > 1 ? "s" : ""}` : "None — the clean action's defaults are used",
      this._openPresets.has(vacIdx), (o) => this._togglePresets(vacIdx, o), () => html`
        ${this._hint("Named “how” bundles picked on the robot sheet.",
          html`Mop entities come from Clean action above; presets only set the values. With fewer
            than 2 presets no chips are shown and the Clean action's defaults are used.`)}
        ${presets.map((p, pi) => html`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${p.label || p.id}</span>
              ${this._rowMenu(`preset-${vacIdx}-${pi}`, p.label || p.id, [], () => this._deletePreset(vacIdx, pi))}
            </div>
            ${this._textField("Label", p.label, v => this._setPreset(vacIdx, pi, { label: v }), "e.g. Dry")}
            ${this._iconPickerField(p.icon, v => this._setPreset(vacIdx, pi, { icon: v || undefined }))}
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
        </button>`);
  }

  /** docs/44 F6 (E4): the removed `native-auto` value shows as plain
   *  "native" — it behaves identically and is no longer offered. */
  private _actionSummary(action: CleanAction): string {
    if (action.type === "script") return "Script" + ((action as ScriptCleanAction).entity_id ? ": " + (action as ScriptCleanAction).entity_id : "");
    if (action.type === "native-area") return "Native area (vacuum.clean_area)";
    return "Native (segments)";
  }

  private _renderCleanActionSection(vacIdx: number, vac: VacuumConfig) {
    const action = vac.clean_action ?? { type: "native" as const };
    return this._panel("Clean action", this._actionSummary(action),
      this._openAction.has(vacIdx), (o) => this._toggleAction(vacIdx, o),
      () => this._renderCleanActionEditor(vacIdx, vac));
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

  /** Shared editor for all native strategies — only the hint differs */
  private _renderNativeOptions(
    vacIdx: number,
    action: NativeCleanAction | NativeAutoCleanAction | NativeAreaCleanAction
  ) {
    const hint = action.type === "native-area"
      ? this._hint(html`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,
          html`Calls <code>vacuum.clean_area</code>. No repeat; repeat lives server-side in <code>anyvac.clean</code>.`)
      : this._hint(html`Used without the integration only — with it, START sends <code>anyvac.clean</code>.`,
          html`<code>anyvac.clean</code> resolves segments server-side.${action.type === "native-auto"
            ? html` This vacuum still carries the retired value <code>native-auto</code>; it behaves exactly
                like Native and is rewritten the next time you pick a strategy.` : nothing}`);
    const speeds: string[] = (this.hass.states[this._config.vacuums[vacIdx]?.entity]
      ?.attributes["fan_speed_list"] as string[]) ?? [];
    return html`
      <div class="sub-section">
        ${hint}
        ${this._numberSlider("Repeat passes", action.repeat ?? 1, 1, 3, 1,
          v => this._setCleanAction(vacIdx, { repeat: v }))}
        ${speeds.length
          ? this._optionSelectFromList("Suction (optional)", speeds, action.suction_level,
              v => this._setCleanAction(vacIdx, { suction_level: v || undefined }))
          : this._textField("Suction (optional)", action.suction_level,
              v => this._setCleanAction(vacIdx, { suction_level: v || undefined }), "e.g. balanced")}
        ${this._entityPicker("Mop mode entity (optional)", action.mop_mode_entity, ["select"],
          v => this._setCleanAction(vacIdx, { mop_mode_entity: v || undefined }))}
        ${action.mop_mode_entity ? this._optionSelect("Mop mode", action.mop_mode_entity, action.mop_mode,
          v => this._setCleanAction(vacIdx, { mop_mode: v || undefined })) : nothing}
        ${this._entityPicker("Mop intensity entity (optional)", action.mop_intensity_entity, ["select"],
          v => this._setCleanAction(vacIdx, { mop_intensity_entity: v || undefined }))}
        ${action.mop_intensity_entity ? this._optionSelect("Mop intensity", action.mop_intensity_entity, action.mop_intensity,
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
        ${this._hint("Variables passed to the script.",
          html`Tokens: {{ entity }}, {{ selected_segments }}, {{ selected_room_keys }}, {{ selected_area_ids }}`)}
        ${entries.map(([key, val], vi) => html`
          <div class="var-row">
            ${this._textField("Name", key, (newKey) => {
              const newVars = Object.fromEntries(entries.map(([k, v], i) => [i === vi ? newKey : k, v]));
              this._setCleanAction(vacIdx, { variables: newVars });
            }, "name")}
            <span class="var-sep">&#8594;</span>
            ${this._textField("Value", val, (nv) => {
              this._setCleanAction(vacIdx, { variables: { ...vars, [key]: nv } });
            }, "{{ entity }}")}
            <button class="icon-btn icon-btn--sm" aria-label="Remove variable"
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
   *  room accordion (merged mode, `_config.rooms`, Global tab). `onChange`
   *  merges into whichever list the caller is actually editing. */
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
      ${this._hint("Leave at 0 to use the integration's learned estimate.",
        html`Used for this room's remaining time until the AnyVac integration has learned its own
          (or the legacy fallback below, for setups without it).`)}`;
  }

  /** The fallback block shared by both room accordions: segment ID +
   *  legacy helpers without the integration, the effective area for the
   *  native-area strategy, nothing at all with the integration. */
  private _renderRoomBackendFields(room: RoomConfig, rep: VacuumConfig | undefined,
    onChange: (u: Partial<RoomConfig>) => void, areaHint: unknown) {
    if (rep && this._intEntityFor(rep)) {
      return this._hint("Segments, timing and history are handled by the AnyVac integration.");
    }
    if (rep?.clean_action?.type === "native-area") {
      return html`
        <div class="field field--row">
          <label>Effective area</label>
          <strong class="value">${
            /* must mirror the card's resolution order */
            room.area_id ?? this._config.area_mappings?.[room.key] ?? room.key
          }</strong>
        </div>
        ${areaHint}`;
    }
    return html`
      ${this._numberBox("Segment ID", room.segment_id, (v) => onChange({ segment_id: v }), { min: 0, placeholder: "e.g. 16" })}
      ${this._hint(html`Find IDs: Developer Tools → Actions → <code>roborock.get_maps</code>`)}
      ${this._numberSlider("Est. clean time (fallback)", room.clean_time_mins ?? 0, 0, 120, 1,
        v => onChange({ clean_time_mins: v > 0 ? v : undefined }), " min")}
      ${this._entityPicker("Clean time fallback (input_number, legacy)", room.clean_time_entity, ["input_number"],
        v => onChange({ clean_time_entity: v || undefined }))}
      ${this._entityPicker("Last clean fallback (input_datetime, legacy)", room.last_clean_entity, ["input_datetime"],
        v => onChange({ last_clean_entity: v || undefined }))}
      ${this._hint("Legacy read-only fallbacks for setups without the integration.")}`;
  }

  private _roomRow(room: RoomConfig, key: number, roomIdx: number, isOpen: boolean,
    onToggle: () => void, onDelete: () => void, onDrop: (from: number) => void, meta: unknown, body: () => unknown) {
    const dragOver = this._dragRoom && this._dragRoom.vac === key && this._dragRoom.idx !== roomIdx;
    return html`
      <div class="room-acc ${dragOver ? "room-acc--drop" : ""}"
        @dragover=${(e: DragEvent) => { if (this._dragRoom && this._dragRoom.vac === key) e.preventDefault(); }}
        @drop=${(e: DragEvent) => { e.preventDefault(); if (this._dragRoom && this._dragRoom.vac === key) onDrop(this._dragRoom.idx); this._dragRoom = null; }}>
        <div class="room-acc-header" @click=${onToggle}>
          <ha-icon class="drag" icon="mdi:drag-horizontal-variant" title="Drag to reorder"
            draggable="true"
            @click=${(e: Event) => e.stopPropagation()}
            @dragstart=${(e: DragEvent) => { this._dragRoom = { vac: key, idx: roomIdx }; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }}
            @dragend=${() => { this._dragRoom = null; }}></ha-icon>
          <ha-icon class="room-acc-icon" icon=${room.icon || "mdi:square"}></ha-icon>
          <div class="room-acc-info">
            <span class="room-acc-name">${room.name || room.key || "Unnamed room"}</span>
            ${meta}
          </div>
          ${this._rowMenu(`room-${key}-${roomIdx}`, room.name || room.key || "this room", [], onDelete)}
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`<div class="room-acc-body">${body()}</div>` : nothing}
      </div>`;
  }

  private _renderRoomAccordion(room: RoomConfig, vacIdx: number, roomIdx: number) {
    const isOpen = (this._openRoom.get(vacIdx) ?? null) === roomIdx;
    const vac = this._config.vacuums[vacIdx];
    const set = (u: Partial<RoomConfig>) => this._setRoom(vacIdx, roomIdx, u);
    return this._roomRow(room, vacIdx, roomIdx, isOpen,
      () => this._toggleRoom(vacIdx, roomIdx),
      () => this._deleteRoom(vacIdx, roomIdx),
      (from) => this._moveRoom(vacIdx, from, roomIdx),
      room.segment_id !== undefined && !this._intEntityFor(vac)
        ? html`<span class="room-acc-meta">seg ${room.segment_id}</span>` : nothing,
      () => html`
        ${this._textField("Key (unique ID)", room.key, v => set({ key: v }), "e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.",
          "The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name", room.name, v => set({ name: v }), "e.g. Bedroom")}
        ${this._renderRoomMetaFields(room, set)}
        ${this._renderRoomBackendFields(room, vac, set,
          html`<p class="hint link" @click=${() => { this._tab = "global"; }}>Set in Global tab → Area mappings →</p>`)}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.",
          "The cleaning sequence is shared and backend-owned — reorder it on the Global tab in merged mode, or in the Roborock app.")}`);
  }

  /** Shared-room accordion for merged mode (`_config.rooms`, Global tab). A
   *  merged room isn't "owned" by any one vacuum, so the backend-fields block
   *  uses the FIRST configured vacuum as a stand-in for "is there an AnyVac
   *  integration / native-area strategy in play at all". Reuses the
   *  `_openRoom`/`_dragRoom` state under a `-1` vacIdx slot. */
  private _renderMergedRoomAccordion(room: RoomConfig, roomIdx: number) {
    const MERGED = -1;
    const isOpen = (this._openRoom.get(MERGED) ?? null) === roomIdx;
    const set = (u: Partial<RoomConfig>) => this._setEditedRoom(roomIdx, u);
    return this._roomRow(room, MERGED, roomIdx, isOpen,
      () => this._toggleRoom(MERGED, roomIdx),
      () => this._deleteEditedRoom(roomIdx),
      (from) => this._moveMergedRoom(from, roomIdx),
      nothing,
      () => html`
        ${this._textField("Key (unique ID)", room.key, v => set({ key: v }), "e.g. bedroom")}
        ${this._hint("Keep it identical to the room's name in the Roborock app.",
          "The AnyVac integration matches rooms by this name (auto-seating, live positions, room pinning).")}
        ${this._textField("Display name", room.name, v => set({ name: v }), "e.g. Bedroom")}
        ${this._renderRoomMetaFields(room, set)}
        ${this._renderRoomBackendFields(room, this._config.vacuums[0], set,
          this._hint("Set in Area mappings, further down this tab."))}
        ${this._hint("Position and size are set in the Visual editor's Rooms tool.")}`);
  }

  private _moveMergedRoom(from: number, to: number): void {
    if (from === to) return;
    const rooms = [...(this._config.rooms ?? [])];
    if (from < 0 || from >= rooms.length || to < 0 || to >= rooms.length) return;
    const [moved] = rooms.splice(from, 1);
    rooms.splice(to, 0, moved);
    this._setConfig({ rooms });
  }

  /** Backend-owned cleaning-sequence reorder list (docs/19) — merged mode
   *  only, and only once an integration sensor exists to read/write it. */
  private _renderSequenceSection() {
    const seqVac = this._config.vacuums.find(v => this._intEntityFor(v));
    if (!seqVac) return nothing;
    const rooms = this._config.rooms ?? [];
    if (!rooms.length) return nothing;
    const seqMap = this._roomSequence(seqVac);
    const ordered = this._roomsInSequenceOrder(rooms, seqMap);
    return html`
      <div class="section-title">Cleaning sequence</div>
      ${this._hint("Shared by every vacuum — drag to reorder.", "Backend-owned; the Roborock app's room order is the same list.")}
      <div class="seq-list">
        ${ordered.map((r, i) => html`
          <div class="seq-row ${this._dragSeq !== null && this._dragSeq !== i ? "seq-row--drop" : ""}"
            @dragover=${(e: DragEvent) => { if (this._dragSeq !== null) e.preventDefault(); }}
            @drop=${(e: DragEvent) => {
              e.preventDefault();
              if (this._dragSeq !== null) this._moveSequence(seqVac, ordered, this._dragSeq, i);
              this._dragSeq = null;
            }}>
            <ha-icon class="drag" icon="mdi:drag-horizontal-variant" title="Drag to reorder"
              draggable="true"
              @dragstart=${(e: DragEvent) => { this._dragSeq = i; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }}
              @dragend=${() => { this._dragSeq = null; }}></ha-icon>
            <ha-icon class="seq-icon" icon=${r.icon || "mdi:square"}></ha-icon>
            <span class="seq-name">${r.name || r.key}</span>
            <span class="seq-pos">${i + 1}</span>
          </div>
        `)}
      </div>`;
  }

  private _dbgRow(label: string, value: unknown) {
    return html`<div class="field field--row">
      <label>${label}</label>
      <span class="mono">${
        value === undefined || value === null || value === "" ? "—" : String(value)
      }</span>
    </div>`;
  }

  private _renderDebugTab() {
    const fmt = (v: unknown) => { try { return JSON.stringify(v, null, 1); } catch { return String(v); } };
    return html`
      <div class="tab-body">
        ${this._hint("Live values from Home Assistant, read-only.")}
        ${this._toggle("Room progress gauges on map", this._config.debug_room_progress ?? false,
          (v) => this._setConfig({ debug_room_progress: v || undefined }))}
        ${this._hint("A small % gauge on each room.",
          "Spatial coverage — approximate: the room box includes furniture, so it plateaus below 100%.")}
        ${this._toggle("Dense portrait room list", this._config.debug_dense_dock ?? false,
          (v) => this._setConfig({ debug_dense_dock: v || undefined }))}
        ${this._hint("The old portrait room list instead of the rail.",
          "Name, age, pin and assigned vacuum per room. Independent of the gauges toggle above.")}
        ${this._config.vacuums.map((vac) => {
          const ie = this._intEntityFor(vac);
          const st = ie ? this.hass.states[ie] : undefined;
          const at = (st?.attributes ?? {}) as Record<string, any>;
          const ms = (at.mop_signal ?? {}) as Record<string, any>;
          return html`
            <div class="section-title">${vac.name ?? vac.entity}</div>
            <div class="sub-section">
              ${!ie
                ? this._hint("No AnyVac integration sensor found — backend values unavailable.")
                : !st
                  ? this._hint(html`Sensor <code>${ie}</code> not found.`)
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
                    <pre class="pre">${fmt(at.calib_debug)}</pre>
                    <div class="sub-title">rooms_estimate (per vacuum)</div>
                    <pre class="pre">${fmt(at.rooms_estimate)}</pre>
                    <div class="sub-title">rooms_last_cleaned (cross-vacuum)</div>
                    <pre class="pre">${fmt(at.rooms_last_cleaned)}</pre>
                    <div class="sub-title">rooms_progress — spatial % + time ratio (live)</div>
                    <pre class="pre">${fmt(at.rooms_progress)}</pre>
                    <div class="sub-title">job_progress (live)</div>
                    <pre class="pre">${fmt(at.job_progress)}</pre>
                    <div class="sub-title">rooms (geometry — for spatial coverage)</div>
                    <pre class="pre">${fmt((at.rooms ?? []).map((r: any) => ({ name: r.name, bbox_px: r.bbox_px, x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1 })))}</pre>
                    <details><summary class="hint">Raw attributes</summary><pre class="pre">${fmt(at)}</pre></details>
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
          [{ value: "dark", label: "Dark" },
           { value: "light", label: "Light" },
           { value: "auto", label: "Auto — follow the system" },
           { value: "legacy", label: "Legacy — the pre-1.2.0 look" }],
          v => this._setConfig({ theme: v === DEFAULT_THEME ? undefined : v }))}
        ${this._colorField("Accent colour", this._config.accent, ACCENT_PRESETS,
          v => this._setConfig({ accent: v || undefined }), DEFAULT_ACCENT)}
        ${this._hint("START, room selection and focus rings.",
          "Status colours are deliberately left alone — their saturation carries meaning (cleaning / mopping / error).")}
        ${this._toggle("Calm resting state", this._config.calm_state !== false,
          (v) => this._setConfig({ calm_state: v ? undefined : false }))}
        ${this._hint("Idle: the leftover trace and secondary numbers step back.", "Nothing is hidden or disabled — it's purely de-emphasis.")}
        ${this._toggle("Reduce motion", !!this._config.reduce_motion,
          (v) => this._setConfig({ reduce_motion: v ? true : undefined }))}
        ${this._hint("Turns off animations on the map and the start sequence.",
          "The operating system's own \"reduce motion\" setting already does this — this is for switching them off without changing that.")}
        ${this._numberSlider("Robot marker glide", this._config.marker_glide_s ?? 1.5, 0, 25, 0.5,
          (v) => this._setConfig({ marker_glide_s: v === 1.5 ? undefined : v }), " s")}
        ${this._hint("How long the robot takes to drive its new trail after each update. 0 = jump.",
          "Positions arrive about every 30 s. Short (1–2 s) replays the new stretch quickly; long (up to 25 s) keeps the robot moving almost all the time, but it then trails reality by that long.")}

        <div class="section-title">Layout</div>
        ${this._toggle("Fit card to available screen space", !!this._config.layout,
          (v) => this._setConfig({ layout: v ? (this._config.layout ?? {}) : undefined }))}
        ${this._hint("Recommended — portrait/landscape profiles sized to the screen.",
          "Off keeps the older rendering that grows as tall as its content. Per-profile tuning (columns/rows, crop, orientation, topology) is YAML-only.")}
        ${this._config.layout ? html`
          ${this._toggle("Flip portrait map 180°", this._config.layout.portrait?.crop?.flip === true,
            (v) => this._setLayoutFlip("portrait", v))}
          ${this._toggle("Flip landscape map 180°", this._config.layout.landscape?.crop?.flip === true,
            (v) => this._setLayoutFlip("landscape", v))}
          ${this._hint("A saved default; the map toolbar's Flip is a quick, unsaved try-out.")}
        ` : nothing}

        <div class="section-title">Controller</div>
        ${this._segmented<"auto" | "manual">("Mode", this._config.ui_mode ?? "auto",
          [{ value: "auto", label: "Auto — one START" },
           { value: "manual", label: "Manual — per robot" }],
          v => this._setConfig({ ui_mode: v }))}

        ${this._mergedEdit ? html`
          <div class="section-title">Floorplan</div>
          ${this._textField("Image src (URL)", this._config.image_base?.src,
            v => this._setConfig({ image_base: { ...(this._config.image_base ?? { src: "" }), src: v } }),
            "/local/anyvac/flat.svg")}
          ${this._hint("Rotation, scale and room layout are set in the Visual editor.",
            this._config.image_base?.src
              ? "This field is only for pointing at a new file (e.g. after snapshotting or tracing one externally)."
              : "Set this once to bootstrap the shared floorplan — after that, the Visual editor's Snapshot buttons can replace it.")}
          ${this._numberSlider("Stage height (0 = auto)", this._config.base_height ?? 0, 0, 1200, 10,
            v => this._setConfig({ base_height: v > 0 ? v : undefined }), " px")}

          <div class="section-title">Rooms (shared)</div>
          ${this._config.vacuums.some(v => this._intEntityFor(v))
            ? this._hint("Rooms come from the integration automatically.",
                "Add a room here only to override its icon/display name or clean-time estimates.")
            : this._hint("One list for every vacuum — add one entry per room.")}
          ${(this._config.rooms ?? []).map((r, ri) => this._renderMergedRoomAccordion(r, ri))}
          <button class="btn btn--add" @click=${() => this._addEditedRoom()}>
            <ha-icon icon="mdi:plus"></ha-icon> Add room
          </button>
          ${this._renderSequenceSection()}
        ` : nothing}

        <div class="section-title">Global presets (Auto mode)</div>
        ${this._hint("Targeted whole-home cleans, e.g. “After dinner”.", "The integration decides which robots and the order; you pick the scope and mode.")}
        ${(this._config.global_presets ?? []).map((gp, i) => html`
          <div class="sub-section">
            <div class="sub-title sub-title--row">
              <span>${gp.label || gp.id}</span>
              ${this._rowMenu("gp-" + i, gp.label || gp.id, [], () => this._deleteGlobalPreset(i))}
            </div>
            ${this._textField("Label", gp.label, v => this._setGlobalPreset(i, { label: v }), "e.g. After dinner")}
            ${this._iconPickerField(gp.icon, v => this._setGlobalPreset(i, { icon: v || undefined }))}
            ${this._segmented<"all" | "select">("Scope", (gp.scope === "all" ? "all" : "select"),
              [{ value: "all", label: "Whole home" }, { value: "select", label: "Pick on map" }],
              v => this._setGlobalPreset(i, { scope: v }))}
            ${this._segmented<"dry" | "wet" | "both">("Mode", gp.mode ?? "dry",
              [{ value: "dry", label: "Dry", icon: "mdi:broom" },
               { value: "wet", label: "Wet", icon: "mdi:water" },
               { value: "both", label: "Both", icon: "mdi:water-plus" }],
              v => this._setGlobalPreset(i, { mode: v }))}
          </div>
        `)}
        <button class="btn btn--add" @click=${() => this._addGlobalPreset()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global preset
        </button>

        <div class="section-title">Global actions</div>
        ${this._hint("Badges that run a script across all vacuums.")}
        ${globals.map((ga, i) => this._renderGlobalAccordion(ga, i))}
        <button class="btn btn--add" @click=${() => this._addGlobal()}>
          <ha-icon icon="mdi:plus"></ha-icon> Add global action
        </button>

        <div class="section-title">Room appearance</div>
        ${this._toggle("Hide room icons", this._config.room_icon_hidden ?? false,
          (v) => this._setConfig({ room_icon_hidden: v || undefined }))}
        ${this._numberSlider("Border (idle)",     this._config.room_border_normal   ?? 2, 0, 12, 1,
          v => this._setConfig({ room_border_normal: v }), "px")}
        ${this._numberSlider("Border (selected)", this._config.room_border_selected ?? 4, 0, 12, 1,
          v => this._setConfig({ room_border_selected: v }), "px")}

        <div class="section-title">Thresholds</div>
        ${this._hint("Room age colours — first match wins, beyond the last is red.")}
        ${ths.map((th, ti) => html`
          <div class="var-row threshold-row">
            <span class="threshold-label">≤</span>
            ${this._numberBox("Days", th.days, (days) => {
              const next = ths.map((t, i) => i === ti ? { ...t, days: days ?? t.days } : t);
              this._setConfig({ room_thresholds: next });
            }, { min: 0, max: 365 })}
            <input type="color" class="threshold-color" aria-label="Colour" .value=${th.color}
              @input=${(e: Event) => {
                const color = (e.target as HTMLInputElement).value;
                const next = ths.map((t, i) => i === ti ? { ...t, color } : t);
                this._setConfig({ room_thresholds: next });
              }} />
            <button class="icon-btn icon-btn--sm" aria-label="Remove threshold"
              @click=${() => {
                const next = ths.filter((_, i) => i !== ti);
                this._setConfig({ room_thresholds: next.length ? next : undefined });
              }}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>`)}
        <div class="btn-row">
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

        <div class="section-title">Notifications</div>
        ${this._hint("Built from the integration's events with ready-made blueprints.",
          html`Settings → Automations → Create with blueprint: <strong>Clean finished</strong>
            (<code>anyvac_clean_finished</code>), <strong>Vacuum error</strong> (the Roborock error sensor)
            and <strong>Room overdue</strong> (hourly check against a day threshold).
            <code>anyvac_clean_started</code> and <code>anyvac_room_done</code> have no blueprint yet.`)}

        ${(() => {
          const usesAreaMappings = this._config.vacuums.some(v => v.clean_action?.type === "native-area");
          if (!usesAreaMappings) return nothing;
          const allKeys = [...new Set(
            this._config.vacuums.flatMap(v => (v.rooms ?? []).map(r => r.key)).filter(Boolean)
          )].sort();
          const mappings = this._config.area_mappings ?? {};
          return html`
            <div class="section-title">Area mappings</div>
            ${this._hint("Room key → HA area, for the native-area strategy.",
              "Used without the AnyVac integration only. Applies to all vacuums.")}
            ${allKeys.length === 0
              ? this._hint("No rooms configured yet.")
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
      <div class="acc-row ${isOpen ? "acc-row--open" : ""}">
        <div class="acc-header" role="button" tabindex="0" aria-expanded=${isOpen ? "true" : "false"}
          @click=${() => this._toggleGlobal(idx)}
          @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this._toggleGlobal(idx); } }}>
          <span class="acc-avatar" style=${styleMap({ borderColor: color })}>
            ${ga.image
              ? html`<img src=${ga.image} alt="" />`
              : html`<ha-icon icon="mdi:home-floor-a" style=${styleMap({ color })}></ha-icon>`}
          </span>
          <div class="acc-info">
            <span class="acc-name">${ga.name || "Unnamed action"}</span>
            <span class="acc-sub">${action.type === "script" ? action.entity_id : (action as any).service}</span>
          </div>
          ${this._rowMenu("ga-" + idx, ga.name || "this action", [], () => this._deleteGlobal(idx))}
          <ha-icon icon=${isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="acc-chevron"></ha-icon>
        </div>
        ${isOpen ? html`
          <div class="acc-body">
            ${this._textField("Display name", ga.name,
              v => this._setGlobal(idx, { name: v }), "e.g. Whole flat")}
            ${this._textField("Image path", ga.image,
              v => this._setGlobal(idx, { image: v || undefined }), "/local/...")}
            ${this._colorField("Colour", ga.color ? this._resolveColor(ga.color, "orange") : undefined,
              DEFAULT_VACUUM_PALETTE.map((hex) => ({ hex })),
              v => this._setGlobal(idx, { color: v || undefined }), "#faad14")}
            ${this._ha
              ? this._sel("Watch entities (badge glows while any is cleaning)",
                  { entity: { domain: "vacuum", multiple: true } }, watches,
                  (v) => this._setGlobal(idx, { watch_entities: (Array.isArray(v) ? v : []).filter(Boolean) }))
              : html`
                <div class="sub-title">Watch entities (badge glows while any is cleaning)</div>
                ${watches.map((e, wi) => html`
                  <div class="var-row">
                    ${this._entityPicker("Vacuum", e, ["vacuum"], (v) => {
                      const updated = [...watches];
                      updated[wi] = v;
                      this._setGlobal(idx, { watch_entities: updated.filter(Boolean) });
                    })}
                    <button class="icon-btn icon-btn--sm" aria-label="Remove"
                      @click=${() => this._setGlobal(idx, { watch_entities: watches.filter((_, i) => i !== wi) })}>
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                  </div>`)}
                <button class="btn btn--add btn--sm"
                  @click=${() => this._setGlobal(idx, { watch_entities: [...watches, ""] })}>
                  <ha-icon icon="mdi:plus"></ha-icon> Add entity
                </button>`}

            <div class="sub-title">Action (hold to run)</div>
            ${this._segmented<"script" | "service">("Type", action.type,
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
    // docs/44 F6: wait (briefly) for HA's form elements instead of flashing
    // the plain inputs first; `_ensureHaElements` settles within ~4 s at worst.
    if (this._ha === null) return html`<div class="loading">Loading…</div>`;
    this._hintSeq = 0;
    return html`
      ${this._ha ? nothing : html`<datalist id="ha-entities"></datalist>`}
      <div class="editor-root" @click=${() => { if (this._menu) { this._menu = null; this._confirm = null; } }}>
        <div class="tabs-bar" role="tablist">
          ${(["vacuums", "global"] as const).map(t => html`
            <button class="tab-btn ${this._tab === t ? "tab-btn--active" : ""}" role="tab"
              aria-selected=${this._tab === t ? "true" : "false"}
              @click=${() => { this._tab = t; }}>
              <ha-icon icon=${t === "vacuums" ? "mdi:robot-vacuum" : "mdi:tune-variant"}></ha-icon>
              ${{ vacuums: "Vacuums", global: "Global" }[t]}
            </button>`)}
        </div>
        ${this._tab === "vacuums" ? this._renderVacuumsTab()
          : this._tab === "debug"   ? this._renderDebugTab()
          : this._renderGlobalTab()}
        <div class="editor-footer">
          <button type="button" class="link-btn" @click=${() => { this._tab = this._tab === "debug" ? "vacuums" : "debug"; }}>
            ${this._tab === "debug" ? "← Back" : "Debug info"}
          </button>
          <span>anyvac-card v${CARD_VERSION}</span>
        </div>
      </div>`;
  }

  // ── Styles ────────────────────────────────────────────────────────────────
  // docs/44 F6 (E5): Home Assistant's own variables only — the editor lives in
  // HA's dialog, not on the card, so the card's design tokens don't apply.

  static styles = css`
    :host { display: block; }
    .editor-root { display: flex; flex-direction: column; }
    .loading { padding: 16px 0; color: var(--secondary-text-color); font-size: 14px; }

    /* ── Tabs ── */
    .tabs-bar { display: flex; border-bottom: 1px solid var(--divider-color); margin-bottom: 4px; }
    .tab-btn {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 12px 4px; background: none; border: none; cursor: pointer;
      font: inherit; font-size: 14px; font-weight: 500;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: 18px; }
    .tab-btn--active { color: var(--primary-color); border-bottom-color: var(--primary-color); }

    .tab-body { display: flex; flex-direction: column; gap: 12px; padding: 12px 0 4px; }

    /* ── Vacuum / global-action rows ── */
    .acc-row {
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
    }
    .acc-row--open { border-color: var(--primary-color); }
    .acc-header {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 8px 10px 12px; cursor: pointer; border-radius: inherit;
    }
    .acc-header:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
    .acc-avatar {
      width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid var(--divider-color); box-sizing: border-box;
      background: var(--secondary-background-color);
    }
    .acc-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .acc-info { flex: 1; display: flex; flex-direction: column; min-width: 0; gap: 2px; }
    .acc-name { display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 15px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--primary-text-color); }
    .acc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .acc-sub { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .acc-chevron { color: var(--secondary-text-color); flex-shrink: 0; }
    .acc-body {
      padding: 12px; display: flex; flex-direction: column; gap: 12px;
      border-top: 1px solid var(--divider-color);
    }

    /* ── Sub-panels ── */
    .panel { display: block; --expansion-panel-summary-padding: 0 12px; }
    .panel-body { display: flex; flex-direction: column; gap: 12px; padding: 4px 0 8px; }
    .collapsible { border-radius: 8px; border: 1px solid var(--divider-color); }
    .collapsible-header { display: flex; align-items: center; gap: 8px; padding: 10px 12px; cursor: pointer; }
    .collapsible-title { flex: 1; font-size: 14px; font-weight: 500; color: var(--primary-text-color); }
    .collapsible-body { padding: 4px 12px 12px; display: flex; flex-direction: column; gap: 12px; }
    .badge {
      font-size: 12px; padding: 2px 8px; border-radius: 10px; max-width: 55%;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      background: var(--secondary-background-color); color: var(--secondary-text-color);
    }

    /* ── ⋮ menu ── */
    .menu-wrap { position: relative; display: inline-flex; }
    .menu {
      position: absolute; right: 0; top: 100%; z-index: 10; min-width: 170px;
      display: flex; flex-direction: column; padding: 4px 0;
      background: var(--card-background-color); color: var(--primary-text-color);
      border: 1px solid var(--divider-color); border-radius: 8px;
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .menu-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px;
      background: none; border: none; cursor: pointer; text-align: left;
      font: inherit; font-size: 14px; color: inherit;
    }
    .menu-item ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color); }
    .menu-item:hover:not(:disabled) { background: var(--secondary-background-color); }
    .menu-item:disabled { opacity: 0.4; cursor: default; }
    .menu-item--danger, .menu-item--danger ha-icon { color: var(--error-color); }
    .menu-confirm { padding: 10px 14px 6px; font-size: 14px; }
    .menu-confirm-row { display: flex; justify-content: flex-end; gap: 4px; padding: 4px 8px 6px; }
    .menu-btn { padding: 6px 12px; border: none; border-radius: 6px; background: none; cursor: pointer;
      font: inherit; font-size: 14px; font-weight: 500; color: var(--primary-color); }
    .menu-btn--danger { color: var(--error-color); }

    /* ── Rooms ── */
    .room-acc { border-radius: 8px; border: 1px solid var(--divider-color); }
    .room-acc--drop, .seq-row--drop { outline: 2px dashed var(--primary-color); outline-offset: -2px; }
    .room-acc-header { display: flex; align-items: center; gap: 8px; padding: 6px 6px 6px 8px; cursor: pointer; }
    .room-acc-icon { flex-shrink: 0; color: var(--secondary-text-color); }
    .room-acc-info { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .room-acc-name { font-weight: 500; font-size: 14px; color: var(--primary-text-color); }
    .room-acc-meta { font-size: 12px; color: var(--secondary-text-color); }
    .room-acc-body { padding: 12px; display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--divider-color); }
    .drag { cursor: grab; color: var(--secondary-text-color); --mdc-icon-size: 18px; flex-shrink: 0; }

    .seq-list { display: flex; flex-direction: column; gap: 4px; }
    .seq-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color); }
    .seq-icon { --mdc-icon-size: 18px; flex-shrink: 0; color: var(--secondary-text-color); }
    .seq-name { flex: 1; font-size: 14px; }
    .seq-pos { font-size: 12px; color: var(--secondary-text-color); }

    /* ── Fields ── */
    .sel { display: block; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field--row { flex-direction: row; align-items: center; gap: 8px; }
    .field--row label { width: 130px; flex-shrink: 0; }
    label, .field-label { font-size: 14px; color: var(--secondary-text-color); }
    .required { color: var(--error-color); }
    .value { font-size: 14px; color: var(--primary-text-color); }
    .mono { font-size: 12px; font-family: var(--code-font-family, monospace); word-break: break-all; }
    .pre {
      font-size: 11px; font-family: var(--code-font-family, monospace); white-space: pre-wrap; word-break: break-all;
      background: var(--secondary-background-color); padding: 6px; border-radius: 6px; margin: 0; max-height: 220px; overflow: auto;
    }

    .segmented {
      display: flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden;
    }
    .seg {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 8px 6px; border: none; background: none; cursor: pointer;
      font: inherit; font-size: 13px; color: var(--primary-text-color);
    }
    .seg + .seg { border-left: 1px solid var(--divider-color); }
    .seg ha-icon { --mdc-icon-size: 16px; }
    .seg--on { background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15); color: var(--primary-color); font-weight: 500; }
    .seg:focus-visible, .swatch:focus-visible, .link-btn:focus-visible, .icon-btn:focus-visible, .hint-more:focus-visible {
      outline: 2px solid var(--primary-color); outline-offset: 1px;
    }

    .swatches { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
    .swatch {
      position: relative; width: 28px; height: 28px; border-radius: 50%; padding: 0; cursor: pointer;
      border: 2px solid transparent; box-shadow: 0 0 0 1px var(--divider-color); box-sizing: border-box;
      display: inline-flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .swatch--on { border-color: var(--card-background-color); box-shadow: 0 0 0 2px var(--primary-color); }
    .swatch--custom ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); }
    .swatch--custom input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }

    /* Plain-input fallback (no HA form elements) */
    .text-input {
      width: 100%; box-sizing: border-box; padding: 8px 10px;
      border: 1px solid var(--divider-color); border-radius: 6px;
      background: var(--card-background-color); color: var(--primary-text-color);
      font: inherit; font-size: 14px;
    }
    .text-input--sm { width: auto; flex: 1; }
    .select-input {
      flex: 1; padding: 6px 8px; border: 1px solid var(--divider-color); border-radius: 6px;
      background: var(--card-background-color); color: var(--primary-text-color); font: inherit; font-size: 14px;
    }
    .slider-wrap { display: flex; align-items: center; gap: 8px; flex: 1; }
    .slider { flex: 1; accent-color: var(--primary-color); }
    .slider-val-wrap { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
    .slider-val-input {
      width: 48px; text-align: right; font: inherit; font-size: 14px; font-weight: 500; color: var(--primary-color);
      border: none; border-radius: 4px; background: transparent; padding: 2px 3px; -moz-appearance: textfield;
    }
    .slider-val-input:hover, .slider-val-input:focus { background: var(--secondary-background-color); outline: none; }
    .slider-val-input::-webkit-outer-spin-button,
    .slider-val-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .slider-val-suffix { font-size: 14px; font-weight: 500; color: var(--primary-color); }
    .toggle-wrap { position: relative; display: inline-flex; align-items: center; cursor: pointer; }
    .toggle-input { position: absolute; opacity: 0; width: 0; height: 0; }
    .toggle-track { width: 36px; height: 20px; border-radius: 10px; background: var(--divider-color); position: relative; }
    .toggle-track::after {
      content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%;
      background: var(--card-background-color); transition: transform 0.2s;
    }
    .toggle-input:checked + .toggle-track { background: var(--primary-color); }
    .toggle-input:checked + .toggle-track::after { transform: translateX(16px); }

    /* ── Sections ── */
    .section-title {
      font-size: 14px; font-weight: 500; color: var(--primary-text-color);
      padding-top: 8px; border-top: 1px solid var(--divider-color);
    }
    .tab-body > .section-title:first-child { border-top: none; padding-top: 0; }
    .sub-section { display: flex; flex-direction: column; gap: 12px; padding-left: 12px; border-left: 2px solid var(--divider-color); }
    .sub-title { font-size: 13px; font-weight: 500; color: var(--secondary-text-color); }
    .sub-title--row { display: flex; align-items: center; justify-content: space-between; }
    .fp-preview { max-width: 100%; border-radius: 8px; display: block; }

    /* ── Buttons ── */
    .btn {
      display: flex; align-items: center; gap: 6px; align-self: flex-start;
      padding: 8px 14px; border-radius: 8px; cursor: pointer;
      font: inherit; font-size: 14px; font-weight: 500;
      border: 1px solid var(--divider-color); background: none; color: var(--primary-text-color);
    }
    .btn:disabled { opacity: 0.5; cursor: default; }
    .btn--add { color: var(--primary-color); border-style: dashed; border-color: var(--primary-color); }
    .btn--sm { padding: 6px 10px; font-size: 13px; }
    .btn-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .icon-btn {
      display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%;
      cursor: pointer; background: transparent; border: none; color: var(--secondary-text-color); flex-shrink: 0;
    }
    .icon-btn:hover { background: var(--secondary-background-color); }
    .icon-btn--sm { width: 28px; height: 28px; }
    .link-btn {
      background: none; border: none; padding: 0; cursor: pointer; font: inherit; font-size: 13px;
      color: var(--primary-color); text-decoration: underline; text-underline-offset: 2px;
    }

    /* ── Hints ── */
    .hint { font-size: 13px; line-height: 1.4; color: var(--secondary-text-color); margin: 0; }
    .hint--error { color: var(--error-color); }
    .hint.link { cursor: pointer; color: var(--primary-color); }
    .hint-more {
      display: inline-flex; vertical-align: middle; padding: 0; margin-left: 2px; border: none; background: none;
      cursor: pointer; color: var(--secondary-text-color); border-radius: 50%;
    }
    .hint-more ha-icon { --mdc-icon-size: 16px; }
    .hint-long { display: block; margin-top: 4px; }
    summary.hint { cursor: pointer; }

    .editor-footer {
      margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--divider-color);
      font-size: 12px; color: var(--secondary-text-color);
      display: flex; align-items: center; justify-content: space-between; gap: 8px;
    }

    .var-row { display: flex; align-items: center; gap: 6px; }
    .var-row > .sel, .var-row > .field { flex: 1; min-width: 0; }
    .var-sep { color: var(--secondary-text-color); flex-shrink: 0; }
    .threshold-row .sel, .threshold-row .field { flex: 1; }
    .threshold-label { font-size: 14px; color: var(--secondary-text-color); flex-shrink: 0; }
    .threshold-color {
      width: 40px; height: 32px; padding: 2px; border-radius: 6px; cursor: pointer;
      border: 1px solid var(--divider-color); background: var(--card-background-color);
    }
  `;
}
