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
  VacuumColor,
  GlobalAction,
  GlobalActionCall,
  RoomThreshold,
} from "./types";
import {
  EDITOR_NAME,
  CARD_VERSION,
  COLOR_HEX,
} from "./const";
import {
  assembleAnchors,
  computeSeatFit,
  roomBboxToRect,
  type SeatParams,
} from "./seatfit";

// ── Tab type ─────────────────────────────────────────────────────────────────

type ActiveTab = "vacuums" | "maps" | "global" | "debug";

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_VACUUM: VacuumConfig = {
  entity: "", name: "", color: "green", rooms: [],
  clean_action: { type: "native" },
};

const DEFAULT_ROOM: RoomConfig = {
  key: "", name: "", icon: "mdi:square", map_x: 50, map_y: 50,
};

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
  /** Floorplan natural aspect ratio (W/H) learned from the preview image — used by
   *  the auto-seat fit and to give the preview the correct proportions. */
  @state() private _pvAR = 0;

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
  private _addEditedRoom(): void {
    if (this._mergedEdit) {
      const rooms = [...(this._config.rooms ?? []), { ...DEFAULT_ROOM }];
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
  private _setEditedImageBase(updates: Partial<NonNullable<VacuumConfig["image_base"]>>): void {
    if (this._mergedEdit) {
      this._setConfig({ image_base: { ...(this._config.image_base ?? { src: "" }), ...updates } });
    } else {
      this._setImageBase(Math.min(this._mapVac, this._config.vacuums.length - 1), updates);
    }
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

  /** Editor-side view of the effective seat (mirrors the card's _effectiveSeat). */
  private _editorSeat(vacIdx: number): SeatParams & {
    auto: boolean; residual?: number; anchorCount?: number;
  } {
    const vac = this._config.vacuums[vacIdx];
    const m = vac?.map;
    const manual = {
      rotation: m?.rotation ?? 0, scale: m?.scale ?? 100,
      offset_x: m?.offset_x ?? 0, offset_y: m?.offset_y ?? 0, auto: false,
    };
    if (!vac || m?.seat === "manual") return manual;
    const merged = this._config.map_mode === "merged";
    const ib = merged ? this._config.image_base : vac.image_base;
    if (!ib?.src) return manual;
    const ie = this._intEntityFor(vac);
    const at = ie ? (this.hass?.states?.[ie]?.attributes as Record<string, any> | undefined) : undefined;
    // Kontrakt v2: anchors need rooms[].bbox_px (integration ≥ 0.18).
    if (!at || (at.schema_version ?? 0) < 2) return manual;
    const ar = this._editorAR();
    const rooms = merged ? (this._config.rooms ?? []) : (vac.rooms ?? []);
    const fit = computeSeatFit(assembleAnchors(rooms as any, at, ar), ar);
    if (!fit) return manual;
    return {
      rotation: fit.rotation, scale: fit.scale,
      offset_x: fit.offset_x, offset_y: fit.offset_y,
      auto: true, residual: fit.residual_pct, anchorCount: fit.anchors,
    };
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
      target.push({ key: nm, name: nm, icon: "mdi:floor-plan", ...rect });
      have.add(nm);
      added++;
    }
    if (!added) return;
    if (this._mergedEdit) this._setConfig({ rooms: target });
    else this._setVacuum(vacIdx, { rooms: target });
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
    const rooms = [...(this._config.vacuums[vacIdx].rooms ?? []), { ...DEFAULT_ROOM }];
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

  private _numberSlider(label: string, value: number | undefined, min: number, max: number, step: number,
    onChange: (v: number) => void, suffix = "") {
    const cur = value ?? 0;
    return html`
      <div class="field field--row">
        <label>${label}</label>
        <div class="slider-wrap">
          <input type="range" class="slider" min=${min} max=${max} step=${step} .value=${String(cur)}
            @input=${(e: Event) => onChange(Number((e.target as HTMLInputElement).value))} />
          <span class="slider-val">${cur}${suffix}</span>
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
    const color = COLOR_HEX[vac.color ?? "green"];
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
            ${this._selectField<VacuumColor>("Accent colour", vac.color ?? "green",
              [{ value: "green", label: "Green" }, { value: "blue", label: "Blue" }, { value: "orange", label: "Orange" }],
              v => this._setVacuum(idx, { color: v }))}
            ${this._selectField<"auto" | "dry" | "wet" | "both">("Clean type (time estimate & layers)", vac.clean_type ?? "auto",
              [{ value: "auto", label: "Auto-detect from clean action" },
               { value: "dry", label: "Dry only" },
               { value: "wet", label: "Wet only" },
               { value: "both", label: "Both — follow live mode" }],
              v => this._setVacuum(idx, { clean_type: v === "auto" ? undefined : v }))}
            <p class="hint">Controls which time estimate and which dry/wet layer the vacuum uses. "Both" follows the live water mode (needs the integration sensor).</p>

            ${this._renderSensorsSection(idx, vac)}
            ${this._renderCleanActionSection(idx, vac)}
            ${this._renderPresetsSection(idx, vac)}

            <div class="section-title">Rooms (${(vac.rooms ?? []).length})</div>
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
                ${this._textField("Label", p.label, v => this._setPreset(vacIdx, pi, { label: v }), "e.g. Suchý")}
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
      ${this._selectField<"native" | "native-area" | "native-auto" | "script">("Strategy", action.type,
        [{ value: "native",      label: "Native (vacuum.send_command + segment IDs)" },
         { value: "native-auto", label: "Native auto (deprecated — same as Native without the integration)" },
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
          ? html`<p class="hint">Deprecated: the <code>roborock.get_maps</code> auto-resolve was removed (docs/14 §3.7). With the AnyVac integration the backend resolves segments; without it this behaves like Native and needs configured <code>segment_id</code>s.</p>`
          : nothing;
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
            ${room.segment_id !== undefined
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
            <p class="hint">Tip: keep this identical to the room's name in the Roborock app — the <code>native-auto</code> strategy pairs rooms by this name.</p>
            ${this._textField("Display name", room.name,
              v => this._setRoom(vacIdx, roomIdx, { name: v }), "e.g. Bedroom")}
            <p class="hint">Cleaning sequence moved to a shared, backend-owned reorderable
              list — see the <strong>Maps tab</strong> (requires the AnyVac integration + merged mode).</p>
            ${(this._config.vacuums[vacIdx]?.clean_action?.type === "native-area" ||
               this._config.vacuums[vacIdx]?.clean_action?.type === "native-auto")
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
                <p class="hint">Find IDs: Developer Tools → Actions → roborock.get_maps</p>`}
            ${this._numberSlider("Est. clean time (fallback)", room.clean_time_mins ?? 0, 0, 120, 1,
              v => this._setRoom(vacIdx, roomIdx, { clean_time_mins: v > 0 ? v : undefined }), " min")}
            ${this._entityPicker("Clean time fallback (input_number, legacy)", room.clean_time_entity, ["input_number"],
              v => this._setRoom(vacIdx, roomIdx, { clean_time_entity: v || undefined }))}
            ${this._entityPicker("Last clean fallback (input_datetime, legacy)", room.last_clean_entity, ["input_datetime"],
              v => this._setRoom(vacIdx, roomIdx, { last_clean_entity: v || undefined }))}
            <p class="hint">Legacy read-only fallbacks for setups without the AnyVac integration.
              With the integration, clean-time estimates and last-clean history are learned and
              stored server-side — the card never writes these helpers.</p>
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
    const mapUrl = map.entity
      ? ((this.hass.states[map.entity]?.attributes["entity_picture"] as string) ?? "") : "";
    const base = vac.base ?? "map";
    const ib = this._config.map_mode === "merged" ? this._config.image_base : vac.image_base;
    const useImg = this._config.map_mode === "merged" ? !!ib?.src : ((base === "image" || base === "combined") && !!ib?.src);
    const previewUrl = useImg ? (ib!.src) : mapUrl;
    const pvRot   = useImg ? (ib!.rotation ?? 0)  : (map.rotation ?? 0);
    const pvScale = useImg ? (ib!.scale ?? 100)   : (map.scale ?? 100);
    const pvOx    = useImg ? (ib!.offset_x ?? 0)  : (map.offset_x ?? 0);
    const pvOy    = useImg ? (ib!.offset_y ?? 0)  : (map.offset_y ?? 0);
    const rooms = this._editRooms();
    const es = this._editorSeat(mapVac);

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

        ${this._selectField<"split" | "merged">("Map mode (all vacuums)", this._config.map_mode ?? "split",
          [{ value: "split", label: "Split — one map per vacuum" }, { value: "merged", label: "Merged — all in one map" }],
          v => this._setConfig({ map_mode: v === "merged" ? "merged" : undefined }))}

        ${this._mergedEdit ? nothing : this._selectField("Base layer", (vac.base ?? "map"),
          [{ value: "map", label: "Vacuum map" }, { value: "combined", label: "Image + map" }],
          v => this._setVacuum(mapVac, { base: v }))}

        ${this._entityPicker("AnyVac integration sensor", vac.integration_entity, ["sensor"],
          v => this._setVacuum(mapVac, { integration_entity: v }))}

        ${(this._intEntityFor(vac) || this._config.map_mode === "merged") ? this._selectField("Hide vacuum map (show only floorplan + robot/path)", vac.hide_map ? "yes" : "no",
          [{ value: "no", label: "no" }, { value: "yes", label: "yes" }],
          v => this._setVacuum(mapVac, { hide_map: v === "yes" })) : nothing}

        ${this._intEntityFor(vac) ? html`
          ${this._textField("Path colour (hex)", vac.path_color, v => this._setVacuum(mapVac, { path_color: v || undefined }), "#69d2ff")}
          ${this._numberSlider("Path width", vac.path_width ?? 100, 20, 300, 10, v => this._setVacuum(mapVac, { path_width: v }), "%")}
          ${this._textField("Mop band colour (hex)", vac.mop_path_color, v => this._setVacuum(mapVac, { mop_path_color: v || undefined }), "#40a9ff")}
          ${this._numberSlider("Mop band opacity", vac.mop_band_opacity ?? 28, 0, 100, 5, v => this._setVacuum(mapVac, { mop_band_opacity: v }), "%")}
          ${this._numberSlider("Mop band width", vac.mop_band_width ?? 100, 20, 400, 10, v => this._setVacuum(mapVac, { mop_band_width: v }), "%")}
          ${vac.image ? this._selectField("Robot image on map (uses status image)", vac.robot_image_on_map ? "yes" : "no",
            [{ value: "no", label: "no" }, { value: "yes", label: "yes" }],
            v => this._setVacuum(mapVac, { robot_image_on_map: v === "yes" })) : nothing}
          ${vac.robot_image_on_map ? this._numberSlider("Robot image size", vac.robot_size ?? 100, 40, 220, 10, v => this._setVacuum(mapVac, { robot_size: v }), "%") : nothing}
          ${vac.robot_image_on_map ? this._numberSlider("Robot image rotation", vac.robot_image_rotation ?? 0, -180, 180, 15, v => this._setVacuum(mapVac, { robot_image_rotation: v }), "°") : nothing}
        ` : nothing}

        ${this._numberSlider("Card height (0=auto)", (this._config.map_mode === "merged" ? this._config.base_height : vac.base_height) ?? 0, 0, 700, 10,
          v => this._config.map_mode === "merged" ? this._setConfig({ base_height: v > 0 ? v : undefined }) : this._setVacuum(mapVac, { base_height: v > 0 ? v : undefined }), "px")}

        ${(vac.base === "combined" || this._config.map_mode === "merged") ? html`
          ${this._numberSlider("Overlay opacity", vac.overlay_opacity ?? 55, 0, 100, 5,
            v => this._setVacuum(mapVac, { overlay_opacity: v }), "%")}
          ${this._selectField("Overlay blend", (vac.overlay_blend ?? "normal"),
            [{ value: "normal", label: "normal" }, { value: "lighten", label: "lighten (isolate path)" }, { value: "screen", label: "screen" }, { value: "plus-lighter", label: "plus-lighter" }],
            v => this._setVacuum(mapVac, { overlay_blend: v }))}
        ` : nothing}

        ${vac.base === "image" || vac.base === "combined" || this._config.map_mode === "merged" ? html`
          ${this._config.map_mode === "merged" ? html`<div class="section-title">Shared floorplan (all vacuums)</div>` : nothing}
          ${this._textField("Image src (URL)", ib?.src, v => this._setEditedImageBase({ src: v }), "/local/anyvac/flat.svg")}
          ${this._numberSlider("Image rotation", ib?.rotation ?? 0, 0, 360, 90, v => this._setEditedImageBase({ rotation: v }), "°")}
          ${this._numberSlider("Image scale", ib?.scale ?? 100, 50, 200, 5, v => this._setEditedImageBase({ scale: v }), "%")}
          ${this._numberSlider("Image offset X", ib?.offset_x ?? 0, -50, 50, 1, v => this._setEditedImageBase({ offset_x: v }), "%")}
          ${this._numberSlider("Image offset Y", ib?.offset_y ?? 0, -50, 50, 1, v => this._setEditedImageBase({ offset_y: v }), "%")}
        ` : nothing}

        ${this._entityPicker("Map image entity", map.entity, ["image"],
          v => this._setMap(mapVac, { entity: v }))}

        ${previewUrl ? html`
          <div class="map-pos-container ${this._mapRoom !== null ? "map-pos-container--active" : ""}"
            @click=${(e: MouseEvent) => {
              if (this._mapRoom === null) return;
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
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
                  }
                }}
                style=${styleMap({
                  left:      (50 + pvOx) + "%",
                  top:       (50 + pvOy) + "%",
                  width:     pvScale + "%",
                  transform: "translate(-50%,-50%) rotate(" + pvRot + "deg)",
                })} />
              ${this._mergedEdit && useImg && mapUrl ? html`<img class="map-preview-img" src=${mapUrl} alt="Native map"
                style=${styleMap({
                  left:      (50 + es.offset_x) + "%",
                  top:       (50 + es.offset_y) + "%",
                  width:     es.scale + "%",
                  transform: "translate(-50%,-50%) rotate(" + es.rotation + "deg)",
                  opacity:   "0.5",
                })} />` : nothing}
              ${rooms.map((r, ri) => html`
                <div class="pos-dot ${ri === this._mapRoom ? "pos-dot--active" : ""}"
                  style=${styleMap({ left: (r.map_x ?? 0) + "%", top: (r.map_y ?? 0) + "%" })}
                  @click=${(e: Event) => { e.stopPropagation(); this._mapRoom = ri === this._mapRoom ? null : ri; }}>
                  <ha-icon icon=${r.icon || "mdi:square"} style="--mdc-icon-size:14px"></ha-icon>
                </div>`)}
            </div>
          </div>

          <div class="section-title">Map seating ${this._mergedEdit ? "(this vacuum)" : ""}</div>
          ${this._selectField<"auto" | "manual">("Seating", (map.seat === "manual" ? "manual" : "auto"),
            [{ value: "auto", label: "Auto — fit from rooms" },
             { value: "manual", label: "Manual — sliders" }],
            v => this._setMap(mapVac, { seat: v === "manual" ? "manual" : undefined }))}
          ${map.seat !== "manual" ? (es.auto ? html`
            <p class="hint">✅ Auto-fit from <strong>${es.anchorCount}</strong> room${(es.anchorCount ?? 0) > 1 ? "s" : ""}:
              rot ${es.rotation}° · scale ${es.scale.toFixed(1)}% · offset ${es.offset_x.toFixed(1)}/${es.offset_y.toFixed(1)}%
              · fit error ${(es.residual ?? 0).toFixed(1)}%${(es.residual ?? 0) > 3 ? " ⚠️ check room rectangles / keys" : ""}${
              es.anchorCount === 1 ? " (single room — orientation estimated from its shape)" : ""}.
              Recomputed live — self-heals after the robot remaps.</p>
          ` : html`
            <p class="hint">Auto-fit inactive — it needs the integration sensor, a floorplan and at least one
              room rectangle whose key matches a room name on this robot's map. Using the manual values below.</p>
          `) : nothing}
          ${(map.seat === "manual" || !es.auto) ? html`
            ${this._numberSlider("Rotation",  map.rotation  ?? 0,    0, 360, 90, v => this._setMap(mapVac, { rotation:  v }), "°")}
            ${this._numberSlider("Scale",     map.scale     ?? 100, 50, 200,  5, v => this._setMap(mapVac, { scale:     v }), "%")}
            ${this._numberSlider("Offset X",  map.offset_x  ?? 0,  -50,  50,  1, v => this._setMap(mapVac, { offset_x:  v }), "%")}
            ${this._numberSlider("Offset Y",  map.offset_y  ?? 0,  -50,  50,  1, v => this._setMap(mapVac, { offset_y:  v }), "%")}
          ` : nothing}
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
              ? "Click the map to move the selected room. Click the dot to deselect."
              : "Select a room below, then click the map to set its position."}</p>
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
              ${this._numberSlider("X", rooms[this._mapRoom]?.map_x ?? 50, 0, 100, 1,
                v => this._setEditedRoom(this._mapRoom!, { map_x: v }), "%")}
              ${this._numberSlider("Y", rooms[this._mapRoom]?.map_y ?? 50, 0, 100, 1,
                v => this._setEditedRoom(this._mapRoom!, { map_y: v }), "%")}

              <div class="section-title" style="margin-top:4px">Overlay mode</div>
              ${(() => {
                const room = rooms[this._mapRoom!];
                return room?.map_w !== undefined ? html`
                  ${this._numberSlider("Width",  room.map_w,        1, 100, 1, v => this._setEditedRoom(this._mapRoom!, { map_w: v }), "%")}
                  ${this._numberSlider("Height", room.map_h ?? 15,  1, 100, 1, v => this._setEditedRoom(this._mapRoom!, { map_h: v }), "%")}
                  <button class="btn btn--sm" style="align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom!, { map_w: undefined, map_h: undefined })}>
                    Switch to point mode
                  </button>
                ` : html`
                  <button class="btn btn--add btn--sm" style="align-self:flex-start"
                    @click=${() => this._setEditedRoom(this._mapRoom!, { map_w: 20, map_h: 15 })}>
                    <ha-icon icon="mdi:rectangle-outline"></ha-icon> Enable rectangle overlay
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

        <div class="section-title">Controller</div>
        ${this._selectField<"auto" | "manual">("Mode", this._config.ui_mode ?? "auto",
          [{ value: "auto", label: "Auto — one orchestrated controller" },
           { value: "manual", label: "Manual — per-robot controllers" }],
          v => this._setConfig({ ui_mode: v }))}

        <div class="section-title" style="margin-top:4px">Global presets (Auto mode)</div>
        <p class="hint">Targeted whole-home cleans for Auto mode (e.g. "Po večeři", "Celý byt"). The integration decides which robots and the order; you pick the scope.</p>
        ${(this._config.global_presets ?? []).map((gp, i) => html`
          <div class="sub-section">
            <div class="sub-title" style="display:flex;align-items:center;justify-content:space-between">
              <span>${gp.label || gp.id}</span>
              <button class="icon-btn icon-btn--danger" title="Delete preset"
                @click=${() => this._deleteGlobalPreset(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._textField("Label", gp.label, v => this._setGlobalPreset(i, { label: v }), "e.g. Po večeři")}
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
          (<code>anyvac_clean_started</code>, <code>anyvac_clean_finished</code>,
          <code>anyvac_room_done</code>, <code>anyvac_vacuum_error</code>) — the
          integration ships ready-made automation blueprints for them
          (Settings → Automations → Create with blueprint). The card no longer sends
          notifications itself.
        </p>

        ${(() => {
          const usesAreaMappings = this._config.vacuums.some(v =>
            v.clean_action?.type === "native-area" || v.clean_action?.type === "native-auto");
          if (!usesAreaMappings) return nothing;
          const allKeys = [...new Set(
            this._config.vacuums.flatMap(v => (v.rooms ?? []).map(r => r.key)).filter(Boolean)
          )].sort();
          const mappings = this._config.area_mappings ?? {};
          return html`
            <div class="section-title" style="margin-top:4px">Area mappings</div>
            <p class="hint">Maps room keys to HA areas for the <strong>native-area</strong> and <strong>native-auto</strong> strategies. Set once here — applies to all vacuums.</p>
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
    const color = COLOR_HEX[ga.color ?? "orange"];
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
            ${this._selectField<VacuumColor>("Accent colour", ga.color ?? "orange",
              [{ value: "green", label: "Green" }, { value: "blue", label: "Blue" }, { value: "orange", label: "Orange" }],
              v => this._setGlobal(idx, { color: v }))}

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
          ${(["vacuums", "maps", "global", "debug"] as const).map(t => html`
            <button class="tab-btn ${this._tab === t ? "tab-btn--active" : ""}"
              @click=${() => { this._tab = t; }}>
              ${{ vacuums: "🤖 Vacuums", maps: "🗺 Maps", global: "⚙ Global", debug: "🐞 Debug" }[t]}
            </button>`)}
        </div>
        ${this._tab === "vacuums" ? this._renderVacuumsTab()
          : this._tab === "maps"    ? this._renderMapsTab()
          : this._tab === "debug"   ? this._renderDebugTab()
          : this._renderGlobalTab()}
        <div class="editor-footer">anyvac-card v${CARD_VERSION}</div>
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
      color:rgba(255,255,255,.7); cursor:pointer;
    }
    .pos-dot--active { background:rgba(33,150,243,.75); border-color:#2196F3; color:white; }

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
    .slider-val { width:52px; text-align:right; font-size:13px; font-weight:600; color:var(--primary-color); flex-shrink:0; }

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
      font-size:11px; text-align:right;
      color:var(--secondary-text-color); opacity:.7;
    }

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
  `;
}
