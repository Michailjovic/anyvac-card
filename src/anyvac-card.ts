import { LitElement, html, svg, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import type {
  HomeAssistant,
  VacuumConfig,
  AnyVacCardConfig,
  RoomConfig,
  RoomThreshold,
  NativeCleanAction,
  NativeAreaCleanAction,
  NativeAutoCleanAction,
  ScriptCleanAction,
  SettingPreset,
  GlobalPreset,
  GlobalAction,
  GlobalActionCall,
} from "./types";
import {
  CARD_NAME,
  EDITOR_NAME,
  CARD_VERSION,
  HOLD_DURATION_MS,
  STATUS_MAP,
  COLOR_HEX,
  COLOR_BG,
  COLOR_BG_ACTIVE,
  CLEANING_STATES,
} from "./const";
import {
  assembleAnchors,
  computeSeatFit,
  affineFromCalibration,
  solve3,
  type SeatParams,
} from "./seatfit";

console.info(
  `%c ANYVAC-CARD %c v${CARD_VERSION} `,
  "background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px",
  "background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0"
);

@customElement(CARD_NAME)
export class AnyVacCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  /** Set by Lovelace when the dashboard is in edit mode */
  @property({ attribute: false }) editMode = false;
  @state() private _config!: AnyVacCardConfig;
  @state() private _shownSet = new Set<number>([0]);
  /** ID of the button currently being held — drives the fill animation */
  @state() private _holdId: string | null = null;
  @state() private _mapMode: "normal" | "pin" | "zone" = "normal";
  @state() private _modeEntity: string | null = null;
  @state() private _dbg = "";
  @state() private _zoneDrag: { x0: number; y0: number; x1: number; y1: number } | null = null;
  @state() private _zonePending: { x1: number; y1: number; x2: number; y2: number } | null = null;
  @state() private _layers: { dry: boolean; wet: boolean } = { dry: true, wet: false };
  @state() private _layerMenu: "dry" | "wet" | null = null;
  private _layerHoldTimer: number | null = null;
  private _layerHeld = false;
  /** Výběr místností — drží se lokálně v kartě (bez potřeby input_boolean helper entity) */
  @state() private _localRoomSel = new Map<string, boolean>();
  /** Active setting preset per vacuum (Manual mode): vac.entity -> preset id. */
  @state() private _activePresets = new Map<string, string>();
  /** Plan preview mode (Auto): which passes to plan/run. */
  @state() private _planMode: "dry" | "wet" | "both" = "both";
  /** Currently selected global preset id (Auto): tiles select, the plan runs. */
  @state() private _activeGlobalPreset: string | null = null;
  /** Responsive: measured card width + map aspect ratio (W/H) for portrait rotation. */
  @state() private _cardW = 0;
  @state() private _mapAR = 3.636;
  private _ro: ResizeObserver | null = null;
  private _onWinResize: (() => void) | null = null;
  private _measureRaf = 0;
  /** Per-second clock for the debug progress timers (mm:ss). Only ticks while a vacuum is
   *  cleaning/paused and debug_room_progress is on, so it does not re-render otherwise. */
  @state() private _now = Date.now();
  private _tickTimer: number | null = null;
  // NOTE (docs/14 canon): the card holds NO cleaning-session state. Tracking, history,
  // estimates and room detection live in the anyvac integration — the card only renders
  // sensor data and sends intents.

  private _holdTimer: ReturnType<typeof setTimeout> | null = null;
  private _initialized = false;
  /** Entities whose state changes should trigger a re-render */
  private _watched: Set<string> | null = null;

  // ── Lovelace card API ───────────────────────────────────────────────────

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(): AnyVacCardConfig {
    return {
      type: `custom:${CARD_NAME}`,
      vacuums: [
        {
          entity: "vacuum.my_roborock",
          name: "Roborock",
          color: "green",
          rooms: [],
          clean_action: { type: "native" },
        },
      ],
    };
  }

  setConfig(config: AnyVacCardConfig): void {
    if (!config.vacuums || !Array.isArray(config.vacuums) || config.vacuums.length === 0) {
      throw new Error("[anyvac-card] 'vacuums' must be a non-empty array");
    }
    this._config = config;
    this._watched = null;
    if (!this._initialized) {
      this._initialized = true;
      this._shownSet = this._loadShown();
      this._localRoomSel = this._loadRoomSel();
    } else {
      const valid = new Set<number>();
      for (const i of this._shownSet) { if (i < config.vacuums.length) valid.add(i); }
      this._shownSet = valid.size > 0 ? valid : new Set(config.vacuums.map((_, i) => i));
    }
  }

  getCardSize(): number {
    return 6;
  }

  // ── Lifecycle ───────────────────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();
    this.style.setProperty("--hold-ms", HOLD_DURATION_MS + "ms");
    if (!this._ro && typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver(() => this._scheduleMeasure());
      this._ro.observe(this);
    }
    if (!this._onWinResize) {
      this._onWinResize = () => this._scheduleMeasure();
      window.addEventListener("resize", this._onWinResize, { passive: true });
    }
    this._scheduleMeasure();
    if (!this._tickTimer) {
      this._tickTimer = window.setInterval(() => {
        // Only re-render (update the clock) when debug progress is on AND a vacuum is
        // mid-clean or paused — otherwise stay idle to avoid needless re-renders.
        if (this._config?.debug_room_progress &&
            (this._config.vacuums ?? []).some((v) => this._isCleaning(v) || this._isPaused(v))) {
          this._now = Date.now();
        }
      }, 1000);
    }
  }

  /** Coalesce all width re-measures into one rAF tick (RO + window resize). */
  private _scheduleMeasure(): void {
    if (this._measureRaf) return;
    this._measureRaf = requestAnimationFrame(() => {
      this._measureRaf = 0;
      const w = Math.round(this.getBoundingClientRect().width);
      if (w && Math.abs(w - this._cardW) >= 2) this._cardW = w;
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cancelHold();
    if (this._measureRaf) { cancelAnimationFrame(this._measureRaf); this._measureRaf = 0; }
    if (this._tickTimer) { clearInterval(this._tickTimer); this._tickTimer = null; }
    if (this._onWinResize) { window.removeEventListener("resize", this._onWinResize); this._onWinResize = null; }
    if (this._ro) { this._ro.disconnect(); this._ro = null; }
  }

  protected firstUpdated(): void {
    // Seed the width immediately; the ResizeObserver may not fire before the
    // first paint (and never fires if the host has no layout box yet).
    const w = Math.round(this.getBoundingClientRect().width);
    if (w) this._cardW = w;
  }

  /**
   * Re-render only when a relevant entity changed — the hass object is
   * replaced on every state change anywhere in HA.
   */
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!changed.has("hass") || changed.size > 1) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    if (!old || !this._config) return true;
    for (const id of this._watchedEntities()) {
      if (old.states[id] !== this.hass.states[id]) return true;
    }
    return false;
  }

  private _watchedEntities(): Set<string> {
    if (this._watched) return this._watched;
    const s = new Set<string>();
    for (const vac of this._config?.vacuums ?? []) {
      for (const id of [vac.entity, vac.status_entity, vac.battery_entity,
        vac.last_clean_entity, vac.progress_entity, vac.current_room_entity,
        vac.error_entity, vac.map?.entity, vac.integration_entity,
        ...Object.values(this._autoEntities(vac))]) {
        if (id) s.add(id);
      }
      for (const r of this._roomsFor(vac)) {
        if (r.last_clean_entity) s.add(r.last_clean_entity);
        if (r.clean_time_entity) s.add(r.clean_time_entity);
      }
    }
    for (const ga of this._config?.global_actions ?? []) {
      for (const e of ga.watch_entities ?? []) if (e) s.add(e);
    }
    // Don't freeze the list before the entity registry is loaded — the auto-resolved
    // sibling sensors (status/battery/room/error) would otherwise never be watched.
    if ((this.hass as any)?.entities) this._watched = s;
    return s;
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  private _color(vac: VacuumConfig): string {
    return COLOR_HEX[vac.color ?? "green"] ?? COLOR_HEX["green"];
  }

  private _colorKey(vac: VacuumConfig): string {
    return vac.color ?? "green";
  }

  private _autoCache = new Map<string, Record<string, string | undefined>>();
  /** Resolve a vacuum's sibling entities (battery/status/last-clean/progress/room/error) from its
   *  device, so the user does not have to fill them in. Matched by translation_key / device_class. */
  private _autoEntities(vac: VacuumConfig): Record<string, string | undefined> {
    const reg = (this.hass as any)?.entities as Record<string, any> | undefined;
    if (!reg || !vac.entity) return {};
    const cached = this._autoCache.get(vac.entity);
    if (cached) return cached;
    const dev = reg[vac.entity]?.device_id;
    if (!dev) return {};
    const sibs = Object.keys(reg).filter((id) => reg[id]?.device_id === dev);
    const byTk = (tk: string) => sibs.find((id) => reg[id]?.translation_key === tk);
    const byDc = (dc: string) => sibs.find((id) => this.hass.states[id]?.attributes?.device_class === dc);
    const out: Record<string, string | undefined> = {
      status: byTk("status"),
      battery: byDc("battery"),
      last_clean: byTk("last_clean_end"),
      progress: byTk("clean_percent"),
      current_room: byTk("current_room"),
      error: byTk("vacuum_error"),
    };
    this._autoCache.set(vac.entity, out);
    return out;
  }
  private _ent(vac: VacuumConfig, kind: "status" | "battery" | "last_clean" | "progress" | "current_room" | "error"): string | undefined {
    const explicit = (vac as any)[kind + "_entity"] as string | undefined;
    return explicit ?? this._autoEntities(vac)[kind];
  }

  private _statusInfo(vac: VacuumConfig): readonly [string, string] {
    const raw = this.hass.states[this._ent(vac, "status") ?? vac.entity]?.state ?? "unknown";
    return STATUS_MAP[raw] ?? [raw, "rgba(255,255,255,0.5)"];
  }

  private _isCleaning(vac: VacuumConfig): boolean {
    return CLEANING_STATES.has(this.hass.states[vac.entity]?.state ?? "");
  }

  private _isPaused(vac: VacuumConfig): boolean {
    return this.hass.states[vac.entity]?.state === "paused";
  }

  private _battery(vac: VacuumConfig): number | null {
    const bid = this._ent(vac, "battery");
    if (!bid) return null;
    const n = parseInt(this.hass.states[bid]?.state ?? "");
    return isNaN(n) ? null : n;
  }

  private _lastCleanStr(vac: VacuumConfig): string {
    const lid = this._ent(vac, "last_clean");
    const raw = lid ? this.hass.states[lid]?.state : undefined;
    if (!raw || raw === "unavailable" || raw === "unknown") return "—";
    const d = new Date(raw);
    const diff = Math.floor((Date.now() - d.getTime()) / 86_400_000);
    const t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diff === 0) return "Today · " + t;
    if (diff === 1) return "Yesterday · " + t;
    return d.toLocaleDateString([], { day: "2-digit", month: "2-digit" }) + " · " + t;
  }

  private _progress(vac: VacuumConfig): number | null {
    const pid = this._ent(vac, "progress");
    if (!pid) return null;
    const n = parseInt(this.hass.states[pid]?.state ?? "");
    return isNaN(n) || n === 0 ? null : n;
  }

  /** First integration sensor that exposes the shared (backend) selection. */
  private _selSensor(): string | undefined {
    for (const v of this._config.vacuums) {
      const ent = v.integration_entity;
      if (ent && Array.isArray(this.hass.states[ent]?.attributes?.selected_rooms)) return ent;
    }
    return undefined;
  }
  /** Shared room selection (card-level, by room key) from the backend, or null when
   *  no integration is available (then the card falls back to local state). */
  private _backendSel(): Set<string> | null {
    const ent = this._selSensor();
    if (!ent) return null;
    return new Set((this.hass.states[ent]?.attributes?.selected_rooms as string[]) ?? []);
  }
  private _setBackendSel(rooms: string[], mode: "set" | "toggle" | "clear"): void {
    this._call("anyvac", "select_rooms", { rooms, mode });
  }

  private _isRoomSelected(room: RoomConfig, vac: VacuumConfig): boolean {
    const be = this._backendSel();
    if (be) return be.has(room.key);
    return this._localRoomSel.get(vac.entity + ":" + room.key) ?? false;
  }

  /** Rooms for a vacuum: card-level `rooms` if defined (merged config), else the vacuum's own. */
  private _roomsFor(vac: VacuumConfig): RoomConfig[] {
    return (this._config.rooms?.length ? this._config.rooms : vac.rooms) ?? [];
  }
  private _hasSelectedRooms(vac: VacuumConfig): boolean {
    return (this._roomsFor(vac)).some((r) => this._isRoomSelected(r, vac));
  }

  /** Resolve a vacuum to a single current clean type ("dry"/"wet").
   *  Prefers the live backend signal (integration sensor `clean_type`, which
   *  follows the actual water mode), then the configured clean_action. This is
   *  what makes a dual-capable vacuum (clean_type: both) pick the right estimate. */
  private _liveCleanType(vac: VacuumConfig): "dry" | "wet" {
    // 1) When the vacuum has selectable presets, the active one is the user's
    //    current intent — derive its mode from its values (so picking "Mokrý"
    //    flips the estimate to wet immediately, before the clean even starts).
    if ((vac.presets?.length ?? 0) >= 2) {
      const ap = this._activePreset(vac);
      const wet = (ap.mop_intensity != null && ap.mop_intensity !== "" && ap.mop_intensity !== "off")
        || (ap.mop_mode != null && ap.mop_mode !== "");
      return wet ? "wet" : "dry";
    }
    // 2) Live backend signal (follows the actual water mode).
    const ent = vac.integration_entity;
    const ct = ent
      ? (this.hass.states[ent]?.attributes?.clean_type as string | undefined)
      : undefined;
    if (ct === "wet" || ct === "dry") return ct;
    // 3) Fallback: the vacuum's configured role (wet-only robots default to wet).
    const role = this._vacCleanType(vac);
    return role.wet && !role.dry ? "wet" : "dry";
  }

  /** Self-calibrated clean-time estimate learned by the backend integration,
   *  per room name + type (dry/wet). Null when no integration / no learned value. */
  private _backendEstimate(vac: VacuumConfig, room: RoomConfig, kind: "dry" | "wet"): number | null {
    const ent = vac.integration_entity;
    if (!ent) return null;
    const re = this.hass.states[ent]?.attributes?.rooms_estimate as Record<string, any> | undefined;
    if (!re) return null;
    const rec = re[room.name ?? ""] ?? re[room.key];
    const v = rec ? rec[kind] : undefined;
    return (typeof v === "number" && v > 0) ? v : null;
  }

  private _roomCleanMins(room: RoomConfig, vac: VacuumConfig): number {
    const ct = this._vacCleanType(vac);
    // Dual-capable vacuum (both dry+wet) must resolve to the CURRENT live mode,
    // otherwise a dry run falls back to the wet estimate (and vice versa).
    const useWet = (ct.wet && !ct.dry) ? true
                 : (ct.dry && !ct.wet) ? false
                 : (this._liveCleanType(vac) === "wet");
    // 1) Backend self-calibrated estimate (learned from real single-room cleans).
    const learned = this._backendEstimate(vac, room, useWet ? "wet" : "dry");
    if (learned != null) return learned;
    // 2) Static config for the matching type, then the other type as a last resort.
    const primary = useWet ? room.clean_time_wet : room.clean_time_dry;
    if (primary != null && primary > 0) return primary;
    const alt = useWet ? room.clean_time_dry : room.clean_time_wet;
    if (alt != null && alt > 0) return alt;
    if (room.clean_time_entity) {
      const val = parseFloat(this.hass.states[room.clean_time_entity]?.state ?? "");
      if (!isNaN(val) && val > 0) return val;
    }
    return room.clean_time_mins ?? 0;
  }

  private _totalCleanMins(vac: VacuumConfig): number {
    return (this._roomsFor(vac)).reduce((sum, r) => {
      if (!this._isRoomSelected(r, vac)) return sum;
      return sum + this._roomCleanMins(r, vac);
    }, 0);
  }

  private _intRoomRec(vac: VacuumConfig, room: RoomConfig): Record<string, string> | null {
    const ent = vac.integration_entity;
    if (!ent) return null;
    const rlc = this.hass.states[ent]?.attributes?.rooms_last_cleaned as Record<string, any> | undefined;
    if (!rlc) return null;
    return (rlc[room.key] ?? rlc[room.name ?? ""] ?? null) as Record<string, string> | null;
  }
  private _ageDaysFromIso(iso?: string): number | null {
    if (!iso) return null;
    const t = new Date(iso).getTime();
    return isNaN(t) ? null : (Date.now() - t) / 86_400_000;
  }
  /** Room age in days. With an integration sensor, uses last_dry/last_wet/any per the active
   *  layer(s) (both on -> the worse/older); otherwise falls back to the last_clean helper entity. */
  private _roomAgeDays(room: RoomConfig, vac?: VacuumConfig): number | null {
    if (vac) {
      const rec = this._intRoomRec(vac, room);
      if (rec) {
        const dry = this._ageDaysFromIso(rec.dry);
        const wet = this._ageDaysFromIso(rec.wet);
        const any = this._ageDaysFromIso(rec.any);
        const dOn = this._layers.dry, wOn = this._layers.wet;
        let d: number | null;
        if (dOn && wOn) d = Math.max(dry ?? 9999, wet ?? 9999);
        else if (dOn) d = dry;
        else if (wOn) d = wet;
        else d = any;
        if (d !== null) return d;
      }
    }
    if (!room.last_clean_entity) return null;
    const raw = this.hass.states[room.last_clean_entity]?.state;
    if (!raw || raw === "unavailable" || raw === "unknown") return null;
    return (Date.now() - new Date(raw).getTime()) / 86_400_000;
  }

  private _colorForAgeDays(d: number | null): string {
    if (d === null) return "rgba(255,77,77,0.85)";
    const ths: RoomThreshold[] = this._config.room_thresholds ?? [
      { days: 2, color: "rgba(46,204,113,0.85)" },
      { days: 5, color: "rgba(250,173,20,0.85)" },
      { days: 10, color: "rgba(255,152,0,0.85)" },
    ];
    const sorted = [...ths].sort((a, b) => a.days - b.days);
    for (const th of sorted) { if (d <= th.days) return th.color; }
    return "rgba(255,77,77,0.85)";
  }
  /** A vacuum's clean-type role (dry/wet) — explicit config, else derived from its clean_action. */
  private _vacCleanType(vac: VacuumConfig): { dry: boolean; wet: boolean } {
    if (vac.clean_type === "dry") return { dry: true, wet: false };
    if (vac.clean_type === "wet") return { dry: false, wet: true };
    if (vac.clean_type === "both") return { dry: true, wet: true };
    const ca = vac.clean_action as any;
    const wet = !!(ca && (ca.mop_mode || ca.mop_mode_entity || ca.mop_intensity || ca.mop_intensity_entity));
    const dry = !wet || (ca?.suction_level != null && ca.suction_level !== "off");
    return { dry, wet };
  }
  private _roomBorderColor(room: RoomConfig, vac: VacuumConfig): string {
    return this._colorForAgeDays(this._roomAgeDays(room, vac));
  }

  /** Debug: per-room cleaning progress from the integration (rooms_progress). */
  private _roomProgress(vac: VacuumConfig, room: RoomConfig): {
    spatial_pct: number | null; time_pct: number | null;
    dry_pct?: number | null; wet_pct?: number | null;
    dry_calibrating?: boolean; wet_calibrating?: boolean;
    visited_cells?: number; total_cells?: number; elapsed_s?: number | null; est_s?: number | null;
  } | null {
    const ent = vac.integration_entity;
    if (!ent) return null;
    const rp = this.hass.states[ent]?.attributes?.rooms_progress as Record<string, any> | undefined;
    if (!rp) return null;
    return (rp[room.key] ?? rp[room.name ?? ""] ?? null) as any;
  }

  /** Best progress % for a room: spatial coverage if available, else the time ratio.
   *  kind = "S" (spatial) / "T" (time). null when no data at all. */
  private _roomProgPct(vac: VacuumConfig, room: RoomConfig): { pct: number; kind: "S" | "T"; title: string } | null {
    const p = this._roomProgress(vac, room);
    if (!p) return null;
    const title = `spatial ${p.spatial_pct ?? "—"}% · time ${p.time_pct ?? "—"}%`;
    if (p.spatial_pct !== null && p.spatial_pct !== undefined) return { pct: p.spatial_pct, kind: "S", title };
    if (p.time_pct !== null && p.time_pct !== undefined) return { pct: p.time_pct, kind: "T", title };
    return null;
  }

  /** Per-clean-type coverage for a room (dry from the vacuum trace, wet from the mop
   *  trace), taken from whichever vacuum has the highest value and coloured by it. Used
   *  by the per-layer (dry/wet) room menus. */
  private _roomProgForType(
    room: RoomConfig, vacs: VacuumConfig[], type: "dry" | "wet",
  ): { pct: number; kind: "S" | "T"; title: string; color: string; calibrating: boolean } | null {
    let best: number | null = null;
    let bestVac: VacuumConfig | null = null;
    let bestCal = false;
    for (const v of vacs) {
      const p = this._roomProgress(v, room);
      if (!p) continue;
      const val = type === "dry" ? p.dry_pct : p.wet_pct;
      if (val !== null && val !== undefined && (best === null || val > best)) {
        best = val; bestVac = v; bestCal = !!(type === "dry" ? p.dry_calibrating : p.wet_calibrating);
      }
    }
    if (best === null || !bestVac) return null;
    return { pct: best, kind: "S", title: `${type} coverage ${best}%`, color: this._color(bestVac), calibrating: bestCal };
  }

  private _progColor(pct: number): string {
    return pct >= 90 ? "#52c41a" : pct >= 50 ? "#faad14" : "#40a9ff";
  }

  /** Small circular % gauge drawn on a room overlay when debug_room_progress is on. */
  private _renderRoomGauge(vac: VacuumConfig, room: RoomConfig) {
    if (!this._config.debug_room_progress) return nothing;
    const p = this._roomProgPct(vac, room);
    if (!p) return nothing;
    const ring = this._progColor(p.pct);
    return html`
      <div class="room-gauge" style=${styleMap({ background: `conic-gradient(${ring} ${p.pct * 3.6}deg, rgba(255,255,255,0.12) 0)` })}
        title=${p.title}>
        <span>${p.pct}</span>
      </div>
    `;
  }

  /** Inline % chip for the room menus (debug only). Coloured by the vacuum when provided. */
  private _renderProgChip(p: { pct: number; kind: "S" | "T"; title: string; color?: string; calibrating?: boolean } | null) {
    if (!this._config.debug_room_progress || !p) return nothing;
    return html`<span class="rl-prog" title=${p.title}
      style=${styleMap({ color: p.color ?? this._progColor(p.pct) })}>${p.pct}${p.calibrating ? "~" : ""}%<small>${p.kind}</small></span>`;
  }

  private _batIcon(pct: number): string {
    if (pct > 80) return "mdi:battery";
    if (pct > 50) return "mdi:battery-60";
    if (pct > 20) return "mdi:battery-30";
    return "mdi:battery-10";
  }

  private _batColor(pct: number): string {
    if (pct > 50) return "#52c41a";
    if (pct > 20) return "#faad14";
    return "#ff4d4f";
  }

  private _mapUrl(entity: string): string {
    const state = this.hass.states[entity];
    if (!state) return "";
    const pic = state.attributes["entity_picture"] as string;
    if (!pic) return "";
    const ts = new Date(state.last_updated).getTime();
    const sep = pic.includes("?") ? "&" : "?";
    return this.hass.hassUrl(pic + sep + "_t=" + ts);
  }

  private _timeStr(mins: number): string {
    const total = Math.round(mins);
    if (total <= 0) return "";
    if (total >= 60) {
      const h = Math.floor(total / 60);
      const m = total % 60;
      return m > 0 ? "~" + h + " h " + m + " min" : "~" + h + " h";
    }
    return "~" + total + " min";
  }

  // ── Global action helpers ───────────────────────────────────────────────

  /** True if any watched entity is in a cleaning state */
  private _isGlobalActive(ga: GlobalAction): boolean {
    return (ga.watch_entities ?? []).some((e) =>
      CLEANING_STATES.has(this.hass.states[e]?.state ?? "")
    );
  }

  private async _triggerGlobal(ga: GlobalAction): Promise<void> {
    const action = ga.action;
    try {
      if (action.type === "script") {
        await this.hass.callService("script", "turn_on", {
          entity_id: action.entity_id,
          variables: action.variables ?? {},
        });
      } else {
        const [domain, svc] = action.service.split(".");
        await this.hass.callService(domain, svc, action.data ?? {});
      }
    } catch (err) {
      console.error("[anyvac-card] global action failed:", err);
    }
  }

  // ── Hold-action helpers ─────────────────────────────────────────────────

  private _cancelHold(): void {
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    this._holdId = null;
  }

  /**
   * Returns a pointerdown handler that:
   *  1. Sets _holdId to `id` (triggers fill animation)
   *  2. Fires `action` after HOLD_DURATION_MS
   */
  private _holdStart(id: string, action: () => void) {
    return (e: PointerEvent): void => {
      e.preventDefault();
      this._cancelHold();
      this._holdId = id;
      this._holdTimer = setTimeout(() => {
        this._holdTimer = null;
        this._holdId = null;
        action();
      }, HOLD_DURATION_MS);
    };
  }

  private _holdEnd = (): void => {
    this._cancelHold();
  };

  private _toggleShown(index: number): void {
    const next = new Set(this._shownSet);
    if (next.has(index)) { if (next.size > 1) next.delete(index); }
    else { next.add(index); }
    this._shownSet = next;
    this._saveShown();
  }

  // ── Service calls ───────────────────────────────────────────────────────

  private async _call(domain: string, service: string, data: Record<string, unknown>): Promise<void> {
    try {
      await this.hass.callService(domain, service, data);
    } catch (err) {
      console.error("[anyvac-card] " + domain + "." + service + " failed:", err);
    }
  }

  private _fireMoreInfo(entityId: string): void {
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true, composed: true, detail: { entityId },
    }));
  }

  // ── localStorage persistence ──────────────────────────────────────────────

  private _saveShown(): void {
    try {
      const ids = [...this._shownSet].map(i => this._config.vacuums[i]?.entity).filter(Boolean);
      localStorage.setItem("roborock-card:shown", JSON.stringify(ids));
    } catch { /* storage unavailable */ }
  }

  private _loadShown(): Set<number> {
    try {
      const raw = localStorage.getItem("roborock-card:shown");
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const indices = ids
          .map(id => this._config.vacuums.findIndex(v => v.entity === id))
          .filter(i => i >= 0);
        if (indices.length > 0) return new Set(indices);
      }
    } catch { /* ignore */ }
    return new Set(this._config.vacuums.map((_, i) => i));
  }

  private _saveRoomSel(vacEntity: string): void {
    try {
      const prefix = vacEntity + ":";
      const sel: Record<string, boolean> = {};
      for (const [k, v] of this._localRoomSel.entries()) {
        if (k.startsWith(prefix)) sel[k.slice(prefix.length)] = v;
      }
      localStorage.setItem("roborock-card:sel:" + vacEntity, JSON.stringify(sel));
    } catch { /* ignore */ }
  }

  private _loadRoomSel(): Map<string, boolean> {
    const map = new Map<string, boolean>();
    try {
      for (const vac of this._config.vacuums) {
        const raw = localStorage.getItem("roborock-card:sel:" + vac.entity);
        if (raw) {
          const sel: Record<string, boolean> = JSON.parse(raw);
          for (const [k, v] of Object.entries(sel)) {
            if (v) map.set(vac.entity + ":" + k, true);
          }
        }
      }
    } catch { /* ignore */ }
    return map;
  }

  private _pause(vac: VacuumConfig): void {
    this._call("vacuum", "pause", { entity_id: vac.entity });
  }

  private _resume(vac: VacuumConfig): void {
    this._call("vacuum", "start", { entity_id: vac.entity });
  }

  private _dock(vac: VacuumConfig): void {
    this._call("vacuum", "return_to_base", { entity_id: vac.entity });
  }

  private _toggleRoom(room: RoomConfig, vac: VacuumConfig): void {
    if (this._backendSel()) { this._setBackendSel([room.key], "toggle"); return; }
    const k = vac.entity + ":" + room.key;
    const next = new Map(this._localRoomSel);
    next.set(k, !(next.get(k) ?? false));
    this._localRoomSel = next;
    this._saveRoomSel(vac.entity);
  }
  private _isRoomSelectedAny(key: string, vacs: VacuumConfig[]): boolean {
    const be = this._backendSel();
    if (be) return be.has(key);
    return vacs.some((v) => this._localRoomSel.get(v.entity + ":" + key) ?? false);
  }
  /** Merged mode: toggle a room across every shown vacuum that has it (one rectangle -> both controllers). */
  private _toggleRoomAcross(key: string, vacs: VacuumConfig[]): void {
    if (this._backendSel()) { this._setBackendSel([key], "toggle"); return; }
    const target = !this._isRoomSelectedAny(key, vacs);
    const next = new Map(this._localRoomSel);
    for (const v of vacs) {
      if (this._roomsFor(v).some((r) => r.key === key)) next.set(v.entity + ":" + key, target);
    }
    this._localRoomSel = next;
    for (const v of vacs) this._saveRoomSel(v.entity);
  }

  private _selectAll(vac: VacuumConfig): void {
    const be = this._backendSel();
    if (be) {
      for (const r of this._roomsFor(vac)) be.add(r.key);
      this._setBackendSel([...be], "set");
      return;
    }
    const next = new Map(this._localRoomSel);
    for (const r of this._roomsFor(vac)) next.set(vac.entity + ":" + r.key, true);
    this._localRoomSel = next;
    this._saveRoomSel(vac.entity);
  }

  private _deselectAll(vac: VacuumConfig): void {
    const be = this._backendSel();
    if (be) {
      for (const r of this._roomsFor(vac)) be.delete(r.key);
      this._setBackendSel([...be], "set");
      return;
    }
    const next = new Map(this._localRoomSel);
    for (const r of this._roomsFor(vac)) next.delete(vac.entity + ":" + r.key);
    this._localRoomSel = next;
    this._saveRoomSel(vac.entity);
  }

  // ── Auto mode: orchestrated cleans (naive fan-out v1) ─────────────────────
  /** All distinct room keys across vacuums. */
  private _allRoomKeys(): string[] {
    const keys = new Set<string>();
    for (const v of this._config.vacuums) for (const r of this._roomsFor(v)) keys.add(r.key);
    return [...keys];
  }
  /** Vacuums the plan/orchestrator may use = the currently shown (held) badges. */
  private _planVacuums(): VacuumConfig[] {
    const shown = this._config.vacuums.filter((_, i) => this._shownSet.has(i));
    return shown.length ? shown : this._config.vacuums;
  }
  /** duid of a vacuum (from its integration sensor) — used to gate wet tasks. */
  private _duidOf(vac: VacuumConfig): string | undefined {
    const ent = vac.integration_entity;
    return ent ? (this.hass.states[ent]?.attributes?.duid as string | undefined) : undefined;
  }
  /** Room name a vacuum reports for a key (must match anyvac_room_done's room). */
  private _intRoomName(vac: VacuumConfig, key: string): string {
    return this._roomsFor(vac).find((r) => r.key === key)?.name ?? key;
  }
  /** Largest per-room estimate across vacuums (for LPT ordering). */
  private _roomEstMax(key: string): number {
    let m = 0;
    for (const v of this._config.vacuums) {
      const r = this._roomsFor(v).find((x) => x.key === key);
      if (r) m = Math.max(m, this._roomCleanMins(r, v));
    }
    return m;
  }
  /** Distribute rooms across the capable owners to balance estimated time (LPT greedy:
   *  biggest room first → least-loaded capable owner), so the work is actually split
   *  between robots instead of dumped on the first owner. */
  private _assignByCap(
    roomKeys: string[],
    cap: (v: VacuumConfig) => boolean,
    vacuums: VacuumConfig[] = this._config.vacuums,
  ): Map<string, string[]> {
    const out = new Map<string, string[]>();
    const load = new Map<string, number>();
    const sorted = [...roomKeys].sort((a, b) => this._roomEstMax(b) - this._roomEstMax(a));
    for (const key of sorted) {
      const owners = vacuums.filter((v) => cap(v) && this._roomCleanableBy(v, key));
      if (!owners.length) continue;
      let best = owners[0];
      for (const v of owners) if ((load.get(v.entity) ?? 0) < (load.get(best.entity) ?? 0)) best = v;
      const arr = out.get(best.entity) ?? [];
      arr.push(key);
      out.set(best.entity, arr);
      const r = this._roomsFor(best).find((x) => x.key === key);
      // min weight 1 per room: with no estimates configured, this still round-robins
      // the rooms across robots instead of collapsing onto the first owner.
      load.set(best.entity, (load.get(best.entity) ?? 0) + Math.max(r ? this._roomCleanMins(r, best) : 0, 1));
    }
    return out;
  }
  private _segmentFor(vac: VacuumConfig, key: string): number | null {
    const r = this._roomsFor(vac).find((x) => x.key === key);
    if (r?.segment_id != null) return r.segment_id;
    const ent = vac.integration_entity;
    const rooms = ent ? (this.hass.states[ent]?.attributes?.rooms as Array<Record<string, any>> | undefined) : undefined;
    // The integration names rooms by the Roborock app name (== the card room KEY); match
    // by key first, then the display name as a fallback, then a numeric segment key.
    const match = rooms?.find((ir) => ir.name === key || ir.name === r?.name || String(ir.segment_id) === key);
    return (match?.segment_id as number | undefined) ?? null;
  }
  /** Whether this vacuum can actually clean a room — its map contains it. In merged mode
   *  every vacuum nominally "has" all card rooms, but a robot on a different map (or a
   *  different home) can't, so orchestration must not assign it that room. */
  private _roomCleanableBy(vac: VacuumConfig, key: string): boolean {
    const t = vac.clean_action?.type;
    if (t === "native" || t === "native-auto") return this._segmentFor(vac, key) != null;
    if (t === "native-area") {
      const ent = vac.integration_entity;
      const name = this._roomsFor(vac).find((x) => x.key === key)?.name ?? key;
      const rooms = ent ? (this.hass.states[ent]?.attributes?.rooms as Array<Record<string, any>> | undefined) : undefined;
      if (rooms) return rooms.some((ir) => ir.name === key || ir.name === name);
      return this._roomsFor(vac).some((x) => x.key === key);  // best-effort when no sensor
    }
    return false;
  }
  /** Build the clean service call for a vacuum + rooms, mirroring _startClean's strategy. */
  private _cleanCmdFor(vac: VacuumConfig, roomKeys: string[], repeat = 1): { service: string; service_data: Record<string, unknown> } | null {
    const ca = vac.clean_action;
    if (!ca) return null;
    const rep = Math.max(1, Math.round(repeat));
    if (ca.type === "native-area") {
      return { service: "vacuum.clean_area", service_data: {
        entity_id: vac.entity,
        cleaning_area_id: roomKeys.map((k) => {
          const r = this._roomsFor(vac).find((x) => x.key === k);
          return r?.area_id ?? this._config.area_mappings?.[k] ?? k;
        }),
      }};
    }
    if (ca.type === "native" || ca.type === "native-auto") {
      const segs = roomKeys.map((k) => this._segmentFor(vac, k)).filter((s): s is number => s != null);
      if (!segs.length) return null;
      return { service: "vacuum.send_command", service_data: {
        entity_id: vac.entity, command: "app_segment_clean",
        params: [{ segments: segs, repeat: rep }],
      }};
    }
    return null; // script strategy is not orchestrated in v1
  }
  /** Pre-clean settings (mop selects + fan speed) for a kind, from the matching preset. */
  private _settingsForKind(vac: VacuumConfig, kind: "dry" | "wet"): { selects: Array<{ entity_id: string; option: string }>; fan_speed?: string; repeat: number } {
    const presets = this._settingPresets(vac);
    const isWet = (p: SettingPreset) => (p.mop_intensity != null && p.mop_intensity !== "" && p.mop_intensity !== "off") || !!p.mop_mode;
    const pick = presets.find((p) => (kind === "wet" ? isWet(p) : !isWet(p))) ?? presets[0];
    const ca = vac.clean_action as Partial<NativeAutoCleanAction> | undefined;
    const selects: Array<{ entity_id: string; option: string }> = [];
    // A dry pass forces the mop off regardless of the preset, so a dry-typed vacuum
    // always cleans dry even when its only preset happens to be a wet one.
    if (kind === "wet" && ca?.mop_mode_entity && pick.mop_mode) {
      selects.push({ entity_id: ca.mop_mode_entity, option: pick.mop_mode });
    }
    if (ca?.mop_intensity_entity) {
      const opt = kind === "dry" ? "off" : pick.mop_intensity;
      if (opt) selects.push({ entity_id: ca.mop_intensity_entity, option: opt });
    }
    const ca2 = vac.clean_action as Partial<NativeAutoCleanAction> | undefined;
    return { selects, fan_speed: pick.suction_level, repeat: pick.repeat ?? ca2?.repeat ?? 1 };
  }
  /** Build a job (capability-aware assignment + dry→wet gating) and hand it to the
   *  backend anyvac.run_job service, which executes it server-side. */
  private async _runOrchestrated(roomKeys: string[], mode: "dry" | "wet" | "both"): Promise<void> {
    if (!roomKeys.length) return;
    const tasks: Array<Record<string, unknown>> = [];
    const roomToDryDuid = new Map<string, string | undefined>();
    // Orchestration spans ALL configured vacuums (not just the shown tab) — every
    // capable robot should take part in a whole-home clean.
    const dryAssign = mode !== "wet"
      ? this._assignByCap(roomKeys, (v) => this._vacCleanType(v).dry, this._config.vacuums)
      : new Map<string, string[]>();
    let i = 0;
    for (const [entity, keys] of dryAssign) {
      const vac = this._config.vacuums.find((v) => v.entity === entity);
      if (!vac) continue;
      const s = this._settingsForKind(vac, "dry");
      const cmd = this._cleanCmdFor(vac, keys, s.repeat);
      if (!cmd) continue;
      tasks.push({ id: "dry" + i++, vacuum: entity, selects: s.selects, fan_speed: s.fan_speed, service: cmd.service, service_data: cmd.service_data });
      const duid = this._duidOf(vac);
      for (const k of keys) roomToDryDuid.set(k, duid);
    }
    if (mode === "wet" || mode === "both") {
      let j = 0;
      for (const [entity, keys] of this._assignByCap(roomKeys, (v) => this._vacCleanType(v).wet, this._config.vacuums)) {
        const vac = this._config.vacuums.find((v) => v.entity === entity);
        if (!vac) continue;
        const s = this._settingsForKind(vac, "wet");
        const cmd = this._cleanCmdFor(vac, keys, s.repeat);
        if (!cmd) continue;
        // Gate on the dry vacuum finishing each room. The room in anyvac_room_done is the
        // integration's room name (= the card room KEY, kept identical to the Roborock app
        // name), NOT the display name — so gate by key, else the wet pass never releases.
        const after: Array<{ duid: string; room?: string }> = mode === "both"
          ? keys.map((k) => { const duid = roomToDryDuid.get(k); return duid ? { duid, room: k } : null; })
              .filter((a): a is { duid: string; room: string } => a != null)
          : [];
        // A both-capable robot does its dry pass first; its wet pass must wait for its
        // OWN dry session to finish — it can't clean wet while still cleaning dry.
        if (mode === "both" && dryAssign.has(entity)) {
          const selfDuid = this._duidOf(vac);
          if (selfDuid) after.push({ duid: selfDuid });
        }
        tasks.push({ id: "wet" + j++, vacuum: entity, selects: s.selects, fan_speed: s.fan_speed, service: cmd.service, service_data: cmd.service_data, after });
      }
    }
    if (!tasks.length) return;
    await this._call("anyvac", "run_job", { tasks });
  }
  /** Select a global preset (does NOT run): set the plan mode + apply its room scope,
   *  so the plan preview reflects it. The user runs it via the plan's "Spustit". */
  private _selectGlobalPreset(gp: GlobalPreset): void {
    this._activeGlobalPreset = gp.id;
    if (gp.mode) this._planMode = gp.mode;
    if (gp.scope === "all" || Array.isArray(gp.scope)) {
      const keys = gp.scope === "all" ? this._allRoomKeys() : gp.scope;
      // Backend-shared selection first (docs/14 §3.11); local only without integration.
      if (this._backendSel()) { this._setBackendSel(keys, "set"); return; }
      const sel = new Map(this._localRoomSel);
      for (const v of this._config.vacuums) for (const r of this._roomsFor(v)) sel.delete(v.entity + ":" + r.key);
      for (const k of keys) for (const v of this._config.vacuums) {
        if (this._roomsFor(v).some((r) => r.key === k)) sel.set(v.entity + ":" + k, true);
      }
      this._localRoomSel = sel;
      for (const v of this._config.vacuums) this._saveRoomSel(v.entity);
    }
    // scope "select" → keep the user's current room selection
  }
  /** Two-letter abbreviation for a vacuum (fallback when no icon). */
  private _vacAbbrev(vac: VacuumConfig): string {
    const n = vac.name ?? vac.entity.split(".")[1] ?? "";
    return (n.replace(/[^A-Za-z0-9]/g, "").slice(0, 2) || "??").toUpperCase();
  }
  /** Plan preview: per selected room, which vacuum cleans it dry / wet, with a
   *  dry/wet/both mode toggle and a hold-to-run button. Reacts to the selected
   *  (held) vacuum badges and the currently selected rooms. */
  private _renderPlanPreview() {
    if (this._config.ui_mode !== "auto") return nothing;
    const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, this._config.vacuums));
    if (!selKeys.length) return nothing;
    const mode = this._planMode;
    const apLabel = (this._config.global_presets ?? []).find((g) => g.id === this._activeGlobalPreset)?.label;
    const showDry = mode === "dry" || mode === "both";
    const showWet = mode === "wet" || mode === "both";
    const vacs = this._config.vacuums;  // plan across all robots, not just the shown tab
    const invert = (m: Map<string, string[]>) => {
      const out = new Map<string, string>();
      for (const [e, ks] of m) for (const k of ks) out.set(k, e);
      return out;
    };
    const dryOf = invert(this._assignByCap(selKeys, (v) => this._vacCleanType(v).dry, vacs));
    const wetOf = invert(this._assignByCap(selKeys, (v) => this._vacCleanType(v).wet, vacs));
    const roomDef = (k: string) => {
      for (const v of this._config.vacuums) { const r = this._roomsFor(v).find((x) => x.key === k); if (r) return r; }
      return undefined;
    };
    const cell = (entity?: string) => {
      const v = this._config.vacuums.find((x) => x.entity === entity);
      if (!v) return html`<span style="font-size:11px;opacity:.25">—</span>`;
      const c = this._color(v);
      return html`<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:17px;padding:0 5px;border-radius:9px;font-size:10px;font-weight:700;color:#fff;background:${c}30;border:1px solid ${c}">${this._vacAbbrev(v)}</span>`;
    };
    const modeBtn = (m: "dry" | "wet" | "both", label: string) => {
      const on = mode === m;
      return html`<button @click=${(e: Event) => { e.stopPropagation(); this._planMode = m; }}
        style="padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;border:1px solid ${on ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"};background:${on ? "rgba(255,255,255,0.12)" : "transparent"};color:${on ? "#fff" : "rgba(255,255,255,0.5)"}">${label}</button>`;
    };
    const runHid = "plan-run";
    return html`
      <div style="margin:0 4px 6px;padding:6px 8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:9px;font-weight:600;letter-spacing:.6px;color:rgba(255,255,255,.35)">PLÁN ÚKLIDU${apLabel ? " · " + apLabel.toUpperCase() : ""}</span>
          <div style="display:flex;gap:4px">${modeBtn("dry", "Sucho")}${modeBtn("wet", "Mokro")}${modeBtn("both", "Obojí")}</div>
        </div>
        <div style="display:flex;gap:6px;overflow-x:auto;align-items:center">
          <div style="display:flex;flex-direction:column;gap:3px;align-items:center;flex-shrink:0;padding-right:2px">
            <span style="height:18px"></span>
            ${showDry ? html`<ha-icon icon="mdi:broom" style="--mdc-icon-size:14px;color:rgba(255,255,255,.4)"></ha-icon>` : nothing}
            ${showWet ? html`<ha-icon icon="mdi:water" style="--mdc-icon-size:14px;color:rgba(64,169,255,.7)"></ha-icon>` : nothing}
          </div>
          ${selKeys.map((k) => {
            const r = roomDef(k);
            return html`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:32px;flex-shrink:0" title=${r?.name ?? k}>
              <ha-icon icon=${r?.icon || "mdi:floor-plan"} style="--mdc-icon-size:18px;color:rgba(255,255,255,.7)"></ha-icon>
              ${showDry ? cell(dryOf.get(k)) : nothing}
              ${showWet ? cell(wetOf.get(k)) : nothing}
            </div>`;
          })}
        </div>
        <button class="action-btn ${this._holdId === runHid ? "action-btn--holding" : ""}"
          style="flex:0 0 auto;align-self:flex-end;flex-direction:row;gap:6px;padding:7px 16px;background:rgba(82,196,26,0.14);border:1px solid rgba(82,196,26,0.55);color:#fff"
          @pointerdown=${this._holdStart(runHid, () => this._runOrchestrated(selKeys, this._planMode))}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:play" style="--mdc-icon-size:18px"></ha-icon>
          <span style="font-size:12px">Spustit · podrž</span>
        </button>
      </div>
    `;
  }
  private _renderAutoBar() {
    if (this._config.ui_mode !== "auto") return nothing;
    const gps = this._config.global_presets ?? [];
    if (!gps.length) return nothing;
    return html`
      <div style="display:flex;flex-wrap:wrap;gap:8px;padding:2px 4px 4px">
        ${gps.map((gp) => {
          const active = this._activeGlobalPreset === gp.id;
          return html`<button
            @click=${() => this._selectGlobalPreset(gp)}
            style="flex:0 1 auto;min-width:128px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;padding:9px 14px;border-radius:14px;cursor:pointer;font-family:inherit;color:white;background:${active ? "rgba(82,196,26,0.14)" : "rgba(255,255,255,0.05)"};border:1px solid ${active ? "rgba(82,196,26,0.6)" : "rgba(255,255,255,0.12)"}">
            <ha-icon icon=${gp.icon || "mdi:robot-vacuum-variant"} style="--mdc-icon-size:24px"></ha-icon>
            <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.15">
              <span style="font-size:13px;font-weight:700">${gp.label}</span>
              <small style="font-size:9px;font-weight:600;letter-spacing:.4px;color:rgba(255,255,255,0.4)">${
                gp.scope === "all" ? "CELÝ BYT" : gp.scope === "select" ? "VYBRANÉ" : "MÍSTNOSTI"
              }${gp.mode ? " · " + (gp.mode === "dry" ? "SUCHO" : gp.mode === "wet" ? "MOKRO" : "OBOJÍ") : ""}</small>
            </div>
          </button>`;
        })}
      </div>
    `;
  }

  /** Setting presets for a vacuum; falls back to a single default synthesized from clean_action. */
  private _settingPresets(vac: VacuumConfig): SettingPreset[] {
    if (vac.presets && vac.presets.length) return vac.presets;
    const ca = vac.clean_action as Partial<NativeAutoCleanAction> | undefined;
    return [{
      id: "default",
      label: "Default",
      suction_level: ca?.suction_level,
      mop_mode: ca?.mop_mode,
      mop_intensity: ca?.mop_intensity,
      repeat: ca?.repeat,
    }];
  }
  private _activePresetId(vac: VacuumConfig): string {
    const presets = this._settingPresets(vac);
    const sel = this._activePresets.get(vac.entity);
    if (sel && presets.some((p) => p.id === sel)) return sel;
    return presets[0]?.id ?? "default";
  }
  private _activePreset(vac: VacuumConfig): SettingPreset {
    const presets = this._settingPresets(vac);
    const id = this._activePresetId(vac);
    return presets.find((p) => p.id === id) ?? presets[0];
  }
  private _setActivePreset(vac: VacuumConfig, id: string): void {
    const next = new Map(this._activePresets);
    next.set(vac.entity, id);
    this._activePresets = next;
  }

  private _renderPresetChips(vac: VacuumConfig) {
    const presets = this._settingPresets(vac);
    if (presets.length < 2) return nothing;  // only when there is a real choice
    const activeId = this._activePresetId(vac);
    const color = this._color(vac);
    return html`
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;justify-content:center">
        ${presets.map((p) => {
          const active = p.id === activeId;
          return html`<button
            @click=${(e: Event) => { e.stopPropagation(); this._setActivePreset(vac, p.id); }}
            style=${styleMap({
              display: "inline-flex", alignItems: "center", gap: "4px",
              padding: "4px 10px", borderRadius: "14px", cursor: "pointer",
              fontSize: "12px", lineHeight: "1",
              border: "1px solid " + (active ? color : "rgba(255,255,255,0.15)"),
              background: active ? COLOR_BG[this._colorKey(vac)] : "rgba(255,255,255,0.04)",
              color: active ? "white" : "rgba(255,255,255,0.55)",
            })}
          >
            ${p.icon ? html`<ha-icon icon=${p.icon} style="--mdc-icon-size:14px"></ha-icon>` : nothing}
            <span>${p.label}</span>
          </button>`;
        })}
      </div>
    `;
  }

  private async _startClean(vac: VacuumConfig): Promise<void> {
    if (!vac.clean_action) return;

    const selected = (this._roomsFor(vac)).filter((r) => this._isRoomSelected(r, vac));
    if (selected.length === 0) return;

    // Script strategy -- no in-flight tracking
    if (vac.clean_action.type === "script") {
      const action = vac.clean_action as ScriptCleanAction;
      const variables: Record<string, unknown> = {};
      for (const [key, template] of Object.entries(action.variables ?? {})) {
        variables[key] = template
          .replace("{{ entity }}", vac.entity)
          .replace("{{ selected_segments }}", JSON.stringify(selected.map((r) => r.segment_id).filter(Boolean)))
          .replace("{{ selected_room_keys }}", JSON.stringify(selected.map((r) => r.key)))
          .replace("{{ selected_area_ids }}", JSON.stringify(selected.map((r) => r.area_id).filter(Boolean)));
      }
      await this._call("script", "turn_on", { entity_id: action.entity_id, variables });
      return;
    }

    // Native variants: pre-set fan / mop from the active setting preset (default
    // preset = the values from clean_action, so behaviour is unchanged when no
    // custom presets are defined), then call vacuum.
    const nativeAction = vac.clean_action as NativeCleanAction | NativeAreaCleanAction | NativeAutoCleanAction;
    const ap = this._activePreset(vac);
    const apMopMode = ap.mop_mode ?? nativeAction.mop_mode;
    const apMopInt = ap.mop_intensity ?? nativeAction.mop_intensity;
    const apSuction = ap.suction_level ?? nativeAction.suction_level;
    if (nativeAction.mop_mode_entity && apMopMode) {
      await this._call("select", "select_option", { entity_id: nativeAction.mop_mode_entity, option: apMopMode });
    }
    if (nativeAction.mop_intensity_entity && apMopInt) {
      await this._call("select", "select_option", { entity_id: nativeAction.mop_intensity_entity, option: apMopInt });
    }
    if (apSuction) {
      await this._call("vacuum", "set_fan_speed", { entity_id: vac.entity, fan_speed: apSuction });
    }

    if (vac.clean_action.type === "native-area") {
      // Uses HA vacuum.clean_area — area_id resolved via area_mappings.
      // NOTE: software repeat was removed (docs/13 A1 — restarting on a "docked"
      // transition fired during mid-clean mop washes); repeat returns server-side
      // with the anyvac.clean service (docs/14 §3.8).
      try {
        await this.hass.callService(
          "vacuum", "clean_area",
          { cleaning_area_id: selected.map((r) =>
              r.area_id ?? this._config.area_mappings?.[r.key] ?? r.key) },
          { entity_id: vac.entity },
        );
      } catch (err) {
        console.error("[anyvac-card] vacuum.clean_area failed:", err);
        return;
      }
    } else if (vac.clean_action.type === "native-auto") {
      // Dynamically resolve segment IDs from roborock.get_maps, then send_command
      const autoAction = vac.clean_action as NativeAutoCleanAction;
      let autoSegments: number[] = [];
      try {
        const mapResult = await (this.hass as any).callService(
          "roborock", "get_maps", {}, { entity_id: vac.entity }, false, true
        ) as { response?: Record<string, any> } | void;
        const maps = (mapResult as any)?.response?.[vac.entity]?.maps as
          Array<{ rooms?: Record<string, string> }> | undefined;
        const roomsMap: Record<string, string> = {};
        if (maps) {
          for (const m of maps) {
            if (m.rooms && Object.keys(m.rooms).length > 0) { Object.assign(roomsMap, m.rooms); break; }
          }
        }
        const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
        const slugMap: Record<string, number> = {};
        for (const [sid, name] of Object.entries(roomsMap)) slugMap[slugify(name)] = Number(sid);
        for (const room of selected) {
          // Match against the Roborock room NAME: the room key (our convention = Roborock name)
          // first, then the display name, then any explicit area mapping as a fallback.
          const sid =
            slugMap[slugify(room.key)] ??
            slugMap[slugify(room.name ?? "")] ??
            slugMap[String(room.area_id ?? this._config.area_mappings?.[room.key] ?? "")];
          if (sid !== undefined) {
            autoSegments.push(sid);
          } else if (room.segment_id !== undefined) {
            autoSegments.push(room.segment_id); // fallback to manual segment_id
          } else {
            console.warn("[anyvac-card] no segment for", room.key);
          }
        }
      } catch (err) {
        console.error("[anyvac-card] get_maps failed:", err);
        autoSegments = selected.map(r => r.segment_id).filter((id): id is number => id !== undefined);
      }
      if (autoSegments.length === 0) {
        console.error("[anyvac-card] native-auto: no segments resolved, aborting");
        return;
      }
      await this._call("vacuum", "send_command", {
        entity_id: vac.entity,
        command: "app_segment_clean",
        params: [{ segments: autoSegments, repeat: autoAction.repeat ?? 1 }],
      });
    } else {
      // type === "native" — segment IDs from room config
      const action = vac.clean_action as NativeCleanAction;
      const segments = selected.map((r) => r.segment_id).filter((id): id is number => id !== undefined);
      await this._call("vacuum", "send_command", {
        entity_id: vac.entity,
        command: "app_segment_clean",
        params: [{ segments, repeat: action.repeat ?? 1 }],
      });
    }
    // No in-flight tracking, events or notifications here (docs/14 §3.1, §3.10):
    // the integration tracks the session (`in_cleaning`, mop-wash aware), fires
    // anyvac_clean_started/finished/room_done, stamps history and clears the
    // shared room selection when the clean finishes.
  }

  // ── Render: badges ──────────────────────────────────────────────────────

  private _renderBadge(vac: VacuumConfig, index: number) {
    const active = this._shownSet.has(index);
    const cleaning = this._isCleaning(vac);
    const color = this._color(vac);
    const ck = this._colorKey(vac);
    const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
    const holding = this._holdId === "badge-" + index;

    const bg = cleaning ? COLOR_BG_ACTIVE[ck] : active ? COLOR_BG[ck] : "rgba(30,30,30,0.85)";
    const border = cleaning
      ? "3px solid " + color
      : active
      ? "2px solid " + color + "80"
      : "2px solid rgba(255,255,255,0.18)";
    const shadow = cleaning
      ? "0 0 18px " + color + "B0"
      : active
      ? "0 0 8px " + color + "50"
      : "none";

    return html`
      <button
        class="badge ${holding ? "badge--holding" : ""}"
        style=${styleMap({ background: bg, border, boxShadow: shadow })}
        @pointerdown=${(e: PointerEvent) => {
          e.preventDefault();
          this._cancelHold();
          this._holdId = "badge-" + index;
          this._holdTimer = setTimeout(() => {
            this._holdTimer = null;
            this._holdId = null;
            this._toggleShown(index);
          }, HOLD_DURATION_MS);
        }}
        @pointerup=${() => {
          if (this._holdTimer !== null) {
            this._cancelHold();
            this._shownSet = new Set([index]);
            this._saveShown();
          } else {
            this._holdId = null;
          }
        }}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-pressed=${active ? "true" : "false"}
        aria-label=${name}
      >
        <div class="hold-ring"></div>
        ${vac.image
          ? html`<img class="badge-img" src=${vac.image} alt=${name} />`
          : html`<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${styleMap({ color })}></ha-icon>`}
        <span class="badge-name" style=${styleMap({ color: active ? "white" : "rgba(255,255,255,0.55)" })}>
          ${name}
        </span>
      </button>
    `;
  }

  private _renderGlobalBadge(ga: GlobalAction, idx: number) {
    const active = this._isGlobalActive(ga);
    const color = COLOR_HEX[ga.color ?? "orange"];
    const ck = ga.color ?? "orange";
    const holdId = "global-" + idx;
    const holding = this._holdId === holdId;

    const bg = active ? COLOR_BG_ACTIVE[ck] : "rgba(30,30,30,0.85)";
    const border = active ? "3px solid " + color : "2px solid rgba(255,255,255,0.18)";
    const shadow = active ? "0 0 18px " + color + "B0" : "none";

    return html`
      <button
        class="badge badge--global ${holding ? "badge--holding" : ""}"
        style=${styleMap({ background: bg, border, boxShadow: shadow })}
        @pointerdown=${this._holdStart(holdId, () => this._triggerGlobal(ga))}
        @pointerup=${this._holdEnd}
        @pointerleave=${this._holdEnd}
        @pointercancel=${this._holdEnd}
        aria-label=${ga.name}
        title=${"Hold to trigger: " + ga.name}
      >
        <div class="hold-ring"></div>
        ${ga.image
          ? html`<img class="badge-img" src=${ga.image} alt=${ga.name} />`
          : html`<ha-icon class="badge-icon" icon="mdi:home-floor-a" style=${styleMap({ color })}></ha-icon>`}
        <span class="badge-name" style=${styleMap({ color: active ? "white" : "rgba(255,255,255,0.55)" })}>
          ${ga.name}
        </span>
      </button>
    `;
  }

  // ── Render: map ─────────────────────────────────────────────────────────

  // ── Pin & go / zone (integration-only; docs/14 §3.6) ─────────────────────────
  // The manual 3-point calibration (Milestone 2, localStorage) was removed: it assumed
  // the dock sits at map origin, trusted commanded goto targets over the robot's real
  // position, and duplicated maths the integration provides for free. Map commands now
  // require the integration's calibration_points.
  private _affine(pts: Array<{ map: { x: number; y: number }; vacuum: { x: number; y: number } }>) {
    if (pts.length < 3) return null;
    const M = pts.slice(0, 3).map((p) => [p.map.x, p.map.y, 1]);
    const ab = solve3(M, pts.slice(0, 3).map((p) => p.vacuum.x));
    const cd = solve3(M, pts.slice(0, 3).map((p) => p.vacuum.y));
    if (!ab || !cd) return null;
    return { a: ab[0], b: ab[1], e: ab[2], c: cd[0], d: cd[1], f: cd[2] };
  }
  private async _gotoMm(entity: string, mm: { x: number; y: number }): Promise<void> {
    try { await this.hass.callService("vacuum", "send_command", { entity_id: entity, command: "app_goto_target", params: [Math.round(mm.x), Math.round(mm.y)] }); }
    catch (e) { console.error("[anyvac-card] goto failed:", e); }
  }
  private _toggleMode(entity: string, mode: "pin" | "zone"): void {
    if (this._mapMode === mode && this._modeEntity === entity) { this._mapMode = "normal"; this._modeEntity = null; }
    else { this._mapMode = mode; this._modeEntity = entity; }
  }
  private _refreshMap(vac: VacuumConfig): void {
    const ent = vac.map?.entity;
    if (ent) void this.hass.callService("homeassistant", "update_entity", { entity_id: ent });
  }
  private _onMapClick(vac: VacuumConfig, e: MouseEvent): void {
    const content = this._clickToContent(vac, e.clientX, e.clientY);
    if (this._mapMode === "pin") {
      const mm = content ? this._intMapToVac(vac, content) : null;
      this._dbg = content
        ? "px " + content.x.toFixed(1) + "%," + content.y.toFixed(1) + "% -> mm " + (mm ? Math.round(mm.x) + "," + Math.round(mm.y) : "(no calibration data)")
        : "(map element not found)";
      if (mm) void this._gotoMm(vac.entity, mm);
      this._mapMode = "normal"; this._modeEntity = null;
    }
  }
  // Map a viewport click into THIS vacuum's map content space (undo its
  // rotation/scale/offset) so pin&go / zones are seating-independent.
  private _clickToContent(vac: VacuumConfig, clientX: number, clientY: number): { x: number; y: number } | null {
    // The map is the coordinate authority (mm live there). Select this vacuum's own
    // map element — with several vacuums shown there are several .map-img and the
    // first one may belong to a different robot with different seating (docs/13 A4).
    // The floorplan is NOT a valid fallback: its content space has no mm mapping.
    const el = vac.map?.entity
      ? (this.renderRoot?.querySelector(
          `.map-img[data-entity="${vac.entity.replace(/"/g, '\\"')}"]`
        ) as HTMLElement | null)
      : null;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
    const tr = getComputedStyle(el).transform;
    const m = new DOMMatrix(tr === "none" ? undefined : tr);
    const det = m.a * m.d - m.b * m.c;
    if (Math.abs(det) < 1e-9) return null;
    const dx = clientX - cx, dy = clientY - cy;
    const lx = (m.d * dx - m.c * dy) / det;
    const ly = (-m.b * dx + m.a * dy) / det;
    const w = el.offsetWidth || 1, h = el.offsetHeight || 1;
    return { x: (lx / w + 0.5) * 100, y: (ly / h + 0.5) * 100 };
  }
  private _intMapToVac(vac: VacuumConfig, content: { x: number; y: number }): { x: number; y: number } | null {
    const at = this.hass?.states?.[vac.integration_entity ?? ""]?.attributes as any;
    if (!at) return null;
    const t = this._affine(at.calibration_points);
    const dims = at.image_dims;
    if (!t || !dims) return null;
    let NW = (dims.width ?? 0) * (dims.scale ?? 1);
    let NH = (dims.height ?? 0) * (dims.scale ?? 1);
    const rot = dims.rotation ?? 0;
    if (rot === 90 || rot === 270) { const tmp = NW; NW = NH; NH = tmp; }
    if (!NW || !NH) return null;
    const px = (content.x / 100) * NW, py = (content.y / 100) * NH;
    return { x: t.a * px + t.b * py + t.e, y: t.c * px + t.d * py + t.f };
  }
  private _onZoneDown(vac: VacuumConfig, e: PointerEvent): void {
    if (this._mapMode !== "zone" || this._modeEntity !== vac.entity) return;
    const el = e.currentTarget as HTMLElement;
    (el as any).setPointerCapture?.(e.pointerId);
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    this._zonePending = null;
    this._zoneDrag = { x0: x, y0: y, x1: x, y1: y };
  }
  private _onZoneMove(vac: VacuumConfig, e: PointerEvent): void {
    if (!this._zoneDrag || this._mapMode !== "zone" || this._modeEntity !== vac.entity) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    this._zoneDrag = { x0: this._zoneDrag.x0, y0: this._zoneDrag.y0,
      x1: ((e.clientX - r.left) / r.width) * 100, y1: ((e.clientY - r.top) / r.height) * 100 };
  }
  private _onZoneUp(vac: VacuumConfig, e: PointerEvent): void {
    if (!this._zoneDrag || this._mapMode !== "zone" || this._modeEntity !== vac.entity) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const ax = r.left + (this._zoneDrag.x0 / 100) * r.width;
    const ay = r.top + (this._zoneDrag.y0 / 100) * r.height;
    const ca = this._clickToContent(vac, ax, ay);
    const cb = this._clickToContent(vac, e.clientX, e.clientY);
    const ma = ca ? this._intMapToVac(vac, ca) : null;
    const mb = cb ? this._intMapToVac(vac, cb) : null;
    const big = Math.abs(this._zoneDrag.x1 - this._zoneDrag.x0) > 2 || Math.abs(this._zoneDrag.y1 - this._zoneDrag.y0) > 2;
    if (ma && mb && big) {
      this._zonePending = {
        x1: Math.round(Math.min(ma.x, mb.x)), y1: Math.round(Math.min(ma.y, mb.y)),
        x2: Math.round(Math.max(ma.x, mb.x)), y2: Math.round(Math.max(ma.y, mb.y)),
      };
    } else {
      this._zoneDrag = null;
    }
  }
  private _confirmZone(vac: VacuumConfig): void {
    const z = this._zonePending; if (!z) return;
    void this.hass.callService("vacuum", "send_command", { entity_id: vac.entity, command: "app_zoned_clean", params: [[z.x1, z.y1, z.x2, z.y2, 1]] });
    this._zonePending = null; this._zoneDrag = null;
    this._mapMode = "normal"; this._modeEntity = null;
  }
  private _cancelZone(): void { this._zonePending = null; this._zoneDrag = null; }

  private _renderMapTools(vac: VacuumConfig) {
    if (!vac.map && !vac.image_base) return nothing;
    // Map commands need the integration's calibration AND this vacuum's map element
    // for the click geometry. Disabled in the rotated (narrow) view — the click
    // inversion does not account for the wrapper rotation yet (docs/13 A5).
    const canCmd = !!vac.integration_entity && !!vac.map?.entity && !this._narrow;
    const cmdTitle = this._narrow
      ? "Not available in the rotated mobile view"
      : (!vac.integration_entity || !vac.map?.entity)
        ? "Requires the AnyVac integration sensor + map entity"
        : "";
    const mode = this._modeEntity === vac.entity ? this._mapMode : "normal";
    return html`
      <div class="map-tools">
        ${vac.map?.entity ? html`<button class="mtbtn" @click=${() => this._refreshMap(vac)} title="Refresh map">
          <ha-icon icon="mdi:refresh"></ha-icon><span>Refresh</span>
        </button>` : nothing}
        <button class="mtbtn ${mode === "pin" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._toggleMode(vac.entity, "pin")} title=${cmdTitle || "Pin & Go"}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${mode === "zone" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._toggleMode(vac.entity, "zone")} title=${cmdTitle || "Zone clean"}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        ${this._dbg ? html`<span style="font-size:11px;opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>` : nothing}
      </div>
      ${mode === "pin" ? html`<div class="calib-panel">Tap the map to send the robot there.</div>` : nothing}
      ${mode === "zone" ? html`<div class="calib-panel">
        ${this._zonePending
          ? html`<div>Clean this zone? (${this._zonePending.x2 - this._zonePending.x1}&times;${this._zonePending.y2 - this._zonePending.y1}&nbsp;mm)</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${() => this._confirmZone(vac)}>Clean zone</button>
                <button class="mtbtn" @click=${() => this._cancelZone()}>Cancel</button>
              </div>`
          : html`Drag a rectangle on the map to set a cleaning zone.`}
      </div>` : nothing}
    `;
  }

  private _intAffine(cal: any): { a: number; b: number; c: number; d: number; e: number; f: number } | null {
    return affineFromCalibration(cal);
  }

  // ── Auto-seating (docs/15) ──────────────────────────────────────────────

  /** Aspect ratio (W/H) of the map wrap, for the seat fit's unit conversions. */
  private _wrapAspect(baseHeight?: number): number {
    if (typeof baseHeight === "number" && baseHeight > 0 && this._cardW > 0) {
      return Math.max(0.2, (this._cardW - 16) / baseHeight);
    }
    return this._mapAR > 0.1 ? this._mapAR : 3.636;
  }

  /** Effective map seating: auto-fitted from room anchors (rooms drawn on the
   *  floorplan matched by name against the integration's room bboxes) whenever
   *  possible, else the manual slider values. Recomputed from live attributes,
   *  so it self-heals when the robot remaps / the map trim changes. */
  private _effectiveSeat(vac: VacuumConfig): SeatParams & {
    auto: boolean; residual?: number; anchorCount?: number;
  } {
    const m = vac.map;
    const manual = {
      rotation: m?.rotation ?? 0, scale: m?.scale ?? 100,
      offset_x: m?.offset_x ?? 0, offset_y: m?.offset_y ?? 0, auto: false,
    };
    if (m?.seat === "manual") return manual;
    const merged = this._config.map_mode === "merged";
    const ib = merged
      ? (this._config.image_base ?? this._config.vacuums.find((v) => v.image_base?.src)?.image_base)
      : vac.image_base;
    // Auto-seat only makes sense against a floorplan reference; a map-only base
    // IS the reference itself and keeps its manual (default) seat.
    if (!ib?.src || !vac.integration_entity) return manual;
    const at = this.hass?.states?.[vac.integration_entity]?.attributes as Record<string, any> | undefined;
    if (!at) return manual;
    const bh = merged
      ? (this._config.base_height ?? this._config.vacuums.find((v) => v.base_height)?.base_height)
      : vac.base_height;
    const ar = this._wrapAspect(bh);
    const fit = computeSeatFit(assembleAnchors(this._roomsFor(vac), at, ar), ar);
    if (!fit) return manual;
    return {
      rotation: fit.rotation, scale: fit.scale,
      offset_x: fit.offset_x, offset_y: fit.offset_y,
      auto: true, residual: fit.residual_pct, anchorCount: fit.anchors,
    };
  }

  /** Integration mode: draw the robot + cleaning path as a vector overlay using
   *  the calibration_points (mm -> rendered-map px) exposed by the AnyVac sensor. */
  private _renderIntegrationOverlay(vac: VacuumConfig, m: any) {
    const ent = vac.integration_entity;
    if (!ent) return nothing;
    const at = this.hass?.states?.[ent]?.attributes as any;
    if (!at) return nothing;
    const t = this._intAffine(at.calibration_points);
    const dims = at.image_dims;
    if (!t || !dims) return nothing;
    const sc = dims.scale ?? 1;
    let NW = (dims.width ?? 0) * sc;
    let NH = (dims.height ?? 0) * sc;
    const rot = dims.rotation ?? 0;
    if (rot === 90 || rot === 270) { const tmp = NW; NW = NH; NH = tmp; }
    if (!NW || !NH) return nothing;
    const toPx = (x: number, y: number) => ({ x: t.a * x + t.b * y + t.c, y: t.d * x + t.e * y + t.f });
    const color = this._color(vac);
    const rr = Math.max(NW, NH) / 55;
    const toPts = (arr: any) => (Array.isArray(arr) ? arr : []).map((p: any) => { const q = toPx(p.x, p.y); return q.x.toFixed(1) + "," + q.y.toFixed(1); }).join(" ");
    const ct = this._vacCleanType(vac);
    // Dry layer draws the SEGMENTED dry trace (path_dry — cleaning-only points, no
    // transit / mop-wash driving; integration ≥0.12). Falls back to the legacy full
    // trajectory (path) on older integrations. Wet layer draws the mop trace as a
    // wider translucent "wet sheen" band under the line.
    const showDry = this._layers.dry && ct.dry;
    const showWet = this._layers.wet && ct.wet;
    const dryStr = showDry ? toPts(at.path_dry ?? at.path) : "";
    const wetStr = showWet ? toPts(at.path_wet ?? at.mop_path) : "";
    const vp = at.vacuum_position;
    const rob = vp ? toPx(vp.x, vp.y) : null;
    let head: { x: number; y: number } | null = null;
    if (vp && vp.a != null) {
      const ar = (vp.a * Math.PI) / 180;
      head = toPx(vp.x + 320 * Math.cos(ar), vp.y + 320 * Math.sin(ar));
    }
    const seat = {
      left: (50 + (m?.offset_x ?? 0)) + "%",
      top: (50 + (m?.offset_y ?? 0)) + "%",
      width: (m?.scale ?? 100) + "%",
      aspectRatio: NW + " / " + NH,
      transform: "translate(-50%,-50%) rotate(" + (m?.rotation ?? 0) + "deg)",
    };
    const pw = rr * 0.35 * ((vac.path_width ?? 100) / 100);
    const sw = pw.toFixed(2);
    const bw = (pw * 2.6 * ((vac.mop_band_width ?? 100) / 100)).toFixed(2);
    const bandOp = ((vac.mop_band_opacity ?? 28) / 100).toFixed(2);
    const wetColor = vac.mop_path_color || "#40a9ff";
    const mopBand = wetStr
      ? svg`<polyline points=${wetStr} fill="none" stroke=${wetColor} stroke-width=${bw} stroke-linejoin="round" stroke-linecap="round" opacity=${bandOp}></polyline>`
      : nothing;
    // Thin centre line down the mop band, so the wet trace reads as a path inside the sheen.
    const mopLine = wetStr
      ? svg`<polyline points=${wetStr} fill="none" stroke=${wetColor} stroke-width=${sw} stroke-linejoin="round" stroke-linecap="round" opacity="0.9"></polyline>`
      : nothing;
    const traceT = dryStr
      ? svg`<polyline points=${dryStr} fill="none" stroke=${vac.path_color || color} stroke-width=${sw} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`
      : nothing;
    const useImg = !!(vac.robot_image_on_map && vac.image);
    const robSize = rr * 2.6 * ((vac.robot_size ?? 100) / 100);
    const robA = (vp && vp.a != null ? vp.a : 0) + (vac.robot_image_rotation ?? 0);
    const robotT = rob
      ? (useImg
          ? svg`<image href=${vac.image!} x=${(rob.x - robSize / 2).toFixed(1)} y=${(rob.y - robSize / 2).toFixed(1)} width=${robSize.toFixed(1)} height=${robSize.toFixed(1)} preserveAspectRatio="xMidYMid meet" transform=${"rotate(" + robA + " " + rob.x.toFixed(1) + " " + rob.y.toFixed(1) + ")"}></image>`
          : svg`${head ? svg`<line x1=${rob.x.toFixed(1)} y1=${rob.y.toFixed(1)} x2=${head.x.toFixed(1)} y2=${head.y.toFixed(1)} stroke="#ffffff" stroke-width=${(rr * 0.3).toFixed(2)} stroke-linecap="round"></line>` : nothing}<circle cx=${rob.x.toFixed(1)} cy=${rob.y.toFixed(1)} r=${rr.toFixed(1)} fill=${color} stroke="#ffffff" stroke-width=${(rr * 0.18).toFixed(2)}></circle>`)
      : nothing;
    return html`<svg class="map-vector" viewBox="0 0 ${NW} ${NH}" preserveAspectRatio="none" style=${styleMap(seat)}>${mopBand}${mopLine}${traceT}${robotT}</svg>`;
  }

  private _onLayerDown(type: "dry" | "wet"): void {
    this._layerHeld = false;
    this._layerHoldTimer = window.setTimeout(() => {
      this._layerHeld = true;
      this._layerMenu = this._layerMenu === type ? null : type;
    }, 380);
  }
  private _onLayerUp(): void {
    if (this._layerHoldTimer !== null) { window.clearTimeout(this._layerHoldTimer); this._layerHoldTimer = null; }
  }
  private _onLayerClick(type: "dry" | "wet"): void {
    if (this._layerHeld) { this._layerHeld = false; return; }
    this._layers = { ...this._layers, [type]: !this._layers[type] };
    this._layerMenu = null;
  }
  /** Hold-expanded per-room ages for one layer (dry/wet). */
  private _renderLayerMenu(vacs: VacuumConfig[], type: "dry" | "wet") {
    const rooms = this._mergedRoomDefs(vacs);
    const badge = (d: number | null) => (d === null ? "\u2014" : d < 1 ? "<1d" : Math.round(d) + "d");
    return html`
      <div class="layer-menu">
        <div class="layer-menu-head">
          <ha-icon icon=${type === "dry" ? "mdi:broom" : "mdi:water"}></ha-icon>
          <span>${type === "dry" ? "Dry" : "Wet"} \u00b7 last cleaned</span>
        </div>
        ${rooms.map(({ r, v }) => {
          const rec = this._intRoomRec(v, r);
          const d = this._ageDaysFromIso(rec?.[type]);
          const sel = this._isRoomSelectedAny(r.key, vacs);
          return html`
            <button class="layer-menu-row ${sel ? "on" : ""}" @click=${() => this._toggleRoomAcross(r.key, vacs)}>
              <ha-icon icon=${r.icon ?? "mdi:square"}></ha-icon>
              <span class="lm-name">${r.name ?? r.key}</span>
              ${this._renderProgChip(this._roomProgForType(r, vacs, type))}
              <b style=${styleMap({ color: this._colorForAgeDays(d) })}>${badge(d)}</b>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderLayerToggles(vacs: VacuumConfig[]) {
    const withInt = vacs.filter((v) => v.integration_entity);
    if (!withInt.length) return nothing;
    const oldest = (type: "dry" | "wet"): number | null => {
      let max: number | null = null;
      for (const v of withInt) {
        const rlc = this.hass.states[v.integration_entity!]?.attributes?.rooms_last_cleaned as Record<string, any> | undefined;
        if (!rlc) continue;
        for (const rec of Object.values(rlc)) {
          const d = this._ageDaysFromIso((rec as any)?.[type]);
          if (d !== null && (max === null || d > max)) max = d;
        }
      }
      return max;
    };
    const badge = (d: number | null) => (d === null ? "\u2014" : d < 1 ? "<1d" : Math.round(d) + "d");
    return html`
      <div class="layer-toggles">
        <button class="layer-btn ${this._layers.dry ? "on" : ""}" title="Dry \u2014 tap to toggle, hold for rooms"
          @pointerdown=${() => this._onLayerDown("dry")} @pointerup=${() => this._onLayerUp()} @pointerleave=${() => this._onLayerUp()}
          @click=${() => this._onLayerClick("dry")}>
          <ha-icon icon="mdi:broom"></ha-icon><span>${badge(oldest("dry"))}</span>
        </button>
        <button class="layer-btn ${this._layers.wet ? "on" : ""}" title="Wet \u2014 tap to toggle, hold for rooms"
          @pointerdown=${() => this._onLayerDown("wet")} @pointerup=${() => this._onLayerUp()} @pointerleave=${() => this._onLayerUp()}
          @click=${() => this._onLayerClick("wet")}>
          <ha-icon icon="mdi:water"></ha-icon><span>${badge(oldest("wet"))}</span>
        </button>
        ${this._layerMenu ? this._renderLayerMenu(withInt, this._layerMenu) : nothing}
      </div>
    `;
  }

  /** Per-room status list (dry + wet age), deduped across vacuums; click selects across all. */
  private _renderRoomList(shown: VacuumConfig[]) {
    if (!shown.some((v) => v.integration_entity)) return nothing;
    const seen = new Set<string>();
    const rooms: Array<{ r: RoomConfig; v: VacuumConfig }> = [];
    for (const v of shown) for (const r of v.rooms ?? []) {
      if (r.key && !seen.has(r.key)) { seen.add(r.key); rooms.push({ r, v }); }
    }
    if (!rooms.length) return nothing;
    const badge = (d: number | null) => (d === null ? "\u2014" : d < 1 ? "<1d" : Math.round(d) + "d");
    return html`
      <div class="room-list">
        ${rooms.map(({ r, v }) => {
          const rec = this._intRoomRec(v, r);
          const dry = this._ageDaysFromIso(rec?.dry);
          const wet = this._ageDaysFromIso(rec?.wet);
          const sel = this._isRoomSelectedAny(r.key, shown);
          return html`
            <button class="room-row ${sel ? "on" : ""}" @click=${() => this._toggleRoomAcross(r.key, shown)}>
              <ha-icon class="rl-icon" icon=${r.icon ?? "mdi:square"}></ha-icon>
              <span class="rl-name">${r.name ?? r.key}</span>
              <span class="rl-age">${this._renderProgChip(this._roomProgForType(r, shown, "dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${styleMap({ color: this._colorForAgeDays(dry) })}>${badge(dry)}</b></span>
              <span class="rl-age">${this._renderProgChip(this._roomProgForType(r, shown, "wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${styleMap({ color: this._colorForAgeDays(wet) })}>${badge(wet)}</b></span>
            </button>
          `;
        })}
      </div>
    `;
  }

  /** Merged mode rooms: one rectangle per room key (deduped across vacuums); click selects across all. */
  /** Deduped room defs for merged mode: card-level rooms (rep = first vacuum) or per-vacuum dedup by key. */
  private _mergedRoomDefs(shown: VacuumConfig[]): Array<{ r: RoomConfig; v: VacuumConfig }> {
    const rep = shown[0];
    if (this._config.rooms?.length && rep) return this._config.rooms.map((r) => ({ r, v: rep }));
    const seen = new Set<string>();
    const out: Array<{ r: RoomConfig; v: VacuumConfig }> = [];
    for (const v of shown) for (const r of v.rooms ?? []) {
      if (r.key && !seen.has(r.key)) { seen.add(r.key); out.push({ r, v }); }
    }
    return out;
  }
  private _renderMergedRooms(shown: VacuumConfig[]) {
    return this._mergedRoomDefs(shown).map(({ r, v }) => this._renderRoomOverlay(r, v, { vacs: shown }));
  }

  /** Narrow (mobile) card → rotate the map to portrait (auto, unless disabled). */
  private get _narrow(): boolean {
    const mr = this._config.mobile_rotate as string | undefined;
    if (mr === "off") return false;
    if (mr === "always" || mr === "on") return true;  // force (good for testing)
    return this._cardW > 0 && this._cardW < 500;       // auto: by card width
  }
  /** Learn the floorplan's aspect ratio once it loads, for the rotation maths. */
  private _onFloorplanLoad = (e: Event): void => {
    const img = e.target as HTMLImageElement;
    if (img?.naturalWidth && img.naturalHeight) {
      const ar = img.naturalWidth / img.naturalHeight;
      if (ar > 0.1 && Math.abs(ar - this._mapAR) > 0.01) this._mapAR = ar;
    }
  };
  /** Wrap a map render in a 90° portrait rotation when the card is narrow. The map
   *  fills the card width and goes tall (capped), so the floorplan is readable on a
   *  phone instead of a thin letterbox. Controls outside the map-wrap stay upright. */
  private _renderResponsive(mapHtml: unknown) {
    if (!this._narrow) return mapHtml;
    const ar = this._mapAR > 0.1 ? this._mapAR : 3.636;
    const W = this._cardW || this.clientWidth || 360;
    const capH = (typeof window !== "undefined" ? window.innerHeight : 800) * 1.4;
    const visH = W * ar;
    const scale = visH > capH ? capH / visH : 1;
    const rW = Math.round(W * scale);
    const rH = Math.round(visH * scale);
    return html`
      <div style="position:relative;width:${rW}px;height:${rH}px;margin:0 auto;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${rH}px;height:${rW}px;transform-origin:top left;transform:translateX(${rW}px) rotate(90deg)">
          ${mapHtml}
        </div>
      </div>
    `;
  }

  private _renderMergedMap() {
    const shown = [...this._shownSet].filter((i) => i < this._config.vacuums.length).map((i) => this._config.vacuums[i]);
    if (!shown.length) return nothing;
    const primary = shown.find((v) => v.image_base?.src) ?? shown[0];
    const ib = this._config.image_base ?? primary.image_base;
    const hasImage = !!ib?.src;
    const bh = this._config.base_height ?? primary.base_height;
    const fixedH = typeof bh === "number" && bh > 0;
    const wrapClass = fixedH ? "map-wrap--fixed" : (hasImage ? "map-wrap--image" : "");
    const wrapStyle = styleMap(fixedH ? { height: (bh ?? 0) + "px" } : {});
    const imgClass = "image-base-img" + (fixedH ? " image-base-img--fit" : "");
    return html`
      <div class="map-wrap ${wrapClass}" style=${wrapStyle}>
        ${hasImage ? html`
          <img class="${imgClass}" src=${ib!.src!} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${styleMap({
              transform: "translate(" + (ib?.offset_x ?? 0) + "%," + (ib?.offset_y ?? 0) + "%) rotate(" + (ib?.rotation ?? 0) + "deg) scale(" + ((ib?.scale ?? 100) / 100) + ")",
            })} />
        ` : nothing}
        ${shown.map((v, idx) => {
          const mUrl = v.map?.entity ? this._mapUrl(v.map.entity) : null;
          if (!mUrl) return nothing;
          const seat = this._effectiveSeat(v);
          const overlay = hasImage || idx > 0;
          // hide_map renders the element at opacity 0 instead of skipping it — the
          // element IS the click-geometry anchor for pin&go / zones (docs/13 A4).
          return html`<img class="map-img ${overlay ? "map-img--overlay" : ""}" src=${mUrl} alt="Vacuum map"
            data-entity=${v.entity}
            style=${styleMap({
              left: (50 + seat.offset_x) + "%",
              top: (50 + seat.offset_y) + "%",
              width: seat.scale + "%",
              transform: "translate(-50%,-50%) rotate(" + seat.rotation + "deg)",
              opacity: v.hide_map ? "0" : String((v.overlay_opacity ?? (overlay ? 55 : 100)) / 100),
              mixBlendMode: v.overlay_blend ?? "normal",
            })} />`;
        })}
        ${shown.map((v) => (v.integration_entity ? this._renderIntegrationOverlay(v, this._effectiveSeat(v)) : nothing))}
        ${this._renderLayerToggles(shown)}
        ${this._renderMergedRooms(shown)}
      </div>
    `;
  }

  private _renderMap(vac: VacuumConfig) {
    const base = vac.base ?? (vac.image_base?.src && !vac.map?.entity ? "image" : "map");
    const ib = vac.image_base;
    const imgSrc = ib?.src;
    const mapEntity = vac.map?.entity;
    const mapUrl = mapEntity ? this._mapUrl(mapEntity) : null;
    const showImage = (base === "image" || base === "combined") && !!imgSrc;
    const showMap = (base === "map" || base === "combined") && !!mapUrl;
    if (!showImage && !showMap) return nothing;

    const seat = this._effectiveSeat(vac);
    const fixedH = typeof vac.base_height === "number" && vac.base_height > 0;
    const wrapClass = fixedH ? "map-wrap--fixed" : (showImage ? "map-wrap--image" : "");
    const wrapStyle = styleMap(fixedH ? { height: (vac.base_height ?? 0) + "px" } : {});
    const imgClass = "image-base-img" + (fixedH ? " image-base-img--fit" : "");
    return html`
      <div class="map-wrap ${wrapClass}" style=${wrapStyle}>
        ${showImage ? html`
          <img class="${imgClass}" src=${imgSrc!} alt="Floorplan" @load=${this._onFloorplanLoad}
            style=${styleMap({
              transform: "translate(" + (ib?.offset_x ?? 0) + "%," + (ib?.offset_y ?? 0) + "%) rotate(" + (ib?.rotation ?? 0) + "deg) scale(" + ((ib?.scale ?? 100) / 100) + ")",
            })} />
        ` : nothing}
        ${showMap ? html`
          <img class="map-img ${showImage ? "map-img--overlay" : ""}" src=${mapUrl!} alt="Vacuum map"
            data-entity=${vac.entity}
            style=${styleMap({
              left: (50 + seat.offset_x) + "%",
              top:  (50 + seat.offset_y) + "%",
              width: seat.scale + "%",
              transform: "translate(-50%,-50%) rotate(" + seat.rotation + "deg)",
              ...(vac.hide_map ? { opacity: "0" } : (showImage ? { opacity: String((vac.overlay_opacity ?? 55) / 100), mixBlendMode: vac.overlay_blend ?? "normal" } : {})),
            })} />
        ` : nothing}
        ${showMap ? this._renderIntegrationOverlay(vac, seat) : nothing}
        ${this._renderLayerToggles([vac])}
        ${(this._roomsFor(vac)).map((r) => this._renderRoomOverlay(r, vac))}
        ${this._mapMode !== "normal" && this._modeEntity === vac.entity
          ? html`<div class="map-clickcatch" style="touch-action:none"
              @click=${(e: MouseEvent) => this._onMapClick(vac, e)}
              @pointerdown=${(e: PointerEvent) => this._onZoneDown(vac, e)}
              @pointermove=${(e: PointerEvent) => this._onZoneMove(vac, e)}
              @pointerup=${(e: PointerEvent) => this._onZoneUp(vac, e)}></div>`
          : nothing}
        ${this._mapMode === "zone" && this._modeEntity === vac.entity && this._zoneDrag
          ? html`<div class="zone-rect" style=${styleMap({
              left: Math.min(this._zoneDrag.x0, this._zoneDrag.x1) + "%",
              top: Math.min(this._zoneDrag.y0, this._zoneDrag.y1) + "%",
              width: Math.abs(this._zoneDrag.x1 - this._zoneDrag.x0) + "%",
              height: Math.abs(this._zoneDrag.y1 - this._zoneDrag.y0) + "%",
            })}></div>`
          : nothing}
      </div>
    `;
  }

  private _renderRoomOverlay(room: RoomConfig, vac: VacuumConfig, opts?: { vacs?: VacuumConfig[] }) {
    const selected = opts?.vacs ? this._isRoomSelectedAny(room.key, opts.vacs) : this._isRoomSelected(room, vac);
    const color = this._color(vac);
    const ageColor = this._roomBorderColor(room, vac);
    const anchor = room.icon_anchor ?? "c";

    if (room.map_w !== undefined && room.map_h !== undefined) {
      // ── Rectangle mód ──────────────────────────────────────────
      const ANCHOR: Record<string, [string, string]> = {
        tl: ["flex-start","flex-start"], t:  ["center","flex-start"], tr: ["flex-end","flex-start"],
        l:  ["flex-start","center"],     c:  ["center","center"],     r:  ["flex-end","center"],
        bl: ["flex-start","flex-end"],   b:  ["center","flex-end"],   br: ["flex-end","flex-end"],
      };
      const [jc, ai] = ANCHOR[anchor] ?? ["center", "center"];
      const borderW = (selected
        ? (this._config.room_border_selected ?? 4)
        : (this._config.room_border_normal ?? 2)) + "px";
      const borderC = selected ? color + "E0" : ageColor;
      const bg = selected ? color + "44" : "rgba(0,0,0,0.06)";
      const shadow = selected ? "0 0 18px " + color + "60" : "none";
      return html`
        <button
          class="room-overlay"
          style=${styleMap({
            left: room.map_x + "%", top: room.map_y + "%",
            width: room.map_w + "%", height: room.map_h + "%",
            border: borderW + " solid " + borderC,
            background: bg, boxShadow: shadow,
            justifyContent: jc, alignItems: ai,
          })}
          @click=${() => (opts?.vacs ? this._toggleRoomAcross(room.key, opts.vacs) : this._toggleRoom(room, vac))}
          title=${room.name} aria-label=${room.name}
          aria-pressed=${selected ? "true" : "false"}
        >
          ${!this._config.room_icon_hidden && anchor !== "none" && room.icon ? html`
            <ha-icon icon=${room.icon}
              style=${styleMap({ color: selected ? "white" : ageColor, "--mdc-icon-size": "16px" })}>
            </ha-icon>
          ` : nothing}
          ${this._renderRoomGauge(vac, room)}
        </button>
      `;
    }

    // ── Point mód (legacy) ──────────────────────────────────────
    const bg = selected ? color + "A8" : "rgba(0,0,0,0.55)";
    const shadow = selected ? "0 0 12px " + color + "80" : "none";
    return html`
      <button
        class="room-btn"
        style=${styleMap({
          left: room.map_x + "%", top: room.map_y + "%",
          background: bg,
          border: "4px solid " + ageColor,
          boxShadow: shadow,
        })}
        @click=${() => (opts?.vacs ? this._toggleRoomAcross(room.key, opts.vacs) : this._toggleRoom(room, vac))}
        title=${room.name} aria-label=${room.name}
        aria-pressed=${selected ? "true" : "false"}
      >
        ${!this._config.room_icon_hidden ? html`
          <ha-icon icon=${room.icon || "mdi:square"}
            style=${styleMap({ color: selected ? "white" : "rgba(255,255,255,0.5)" })}>
          </ha-icon>
        ` : nothing}
        ${this._renderRoomGauge(vac, room)}
      </button>
    `;
  }

  // ── Render: status card ─────────────────────────────────────────────────

  private _renderStatusRow(vac: VacuumConfig) {
    const [label, labelColor] = this._statusInfo(vac);
    const bat = this._battery(vac);
    const lastClean = this._lastCleanStr(vac);

    // Current room
    const crid = this._ent(vac, "current_room");
    const roomState = crid ? this.hass.states[crid]?.state : null;
    const currentRoom = roomState && roomState !== "unknown" && roomState !== "unavailable"
      ? roomState : null;

    // Error
    const erid = this._ent(vac, "error");
    const errState = erid ? this.hass.states[erid]?.state : null;
    const hasError = errState && errState !== "none" && errState !== "unknown" && errState !== "unavailable";

    return html`
      ${hasError ? html`
        <div class="error-row">
          <ha-icon icon="mdi:alert-circle" style="color:#ff4d4f"></ha-icon>
          <span style="color:#ff4d4f;font-size:12px;font-weight:600">${errState}</span>
        </div>
      ` : nothing}
      <div class="status-row">
        <div class="status-main">
          <span class="status-label" style=${styleMap({ color: labelColor })}>${label}</span>
          ${currentRoom ? html`
            <span class="current-room">
              <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:13px;color:rgba(255,255,255,0.4)"></ha-icon>
              ${currentRoom}
            </span>
          ` : nothing}
        </div>
        <div class="status-meta">
          ${bat !== null ? html`
            <div class="battery">
              <span style=${styleMap({ color: this._batColor(bat) })}>${bat}&thinsp;%</span>
              <ha-icon icon=${this._batIcon(bat)} style=${styleMap({ color: this._batColor(bat) })}></ha-icon>
            </div>
          ` : nothing}
          <div class="last-clean">
            <span>${lastClean}</span>
            <ha-icon icon="mdi:history"></ha-icon>
          </div>
        </div>
      </div>
    `;
  }

  private _renderProgress(vac: VacuumConfig) {
    const prog = this._progress(vac);
    if (prog === null) return nothing;
    const color = this._color(vac);
    return html`
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${styleMap({ width: prog + "%", background: color })}></div>
        </div>
        <span class="progress-label" style=${styleMap({ color })}>${prog}&thinsp;%</span>
      </div>
    `;
  }

  private _renderActions(vac: VacuumConfig, vacIdx: number) {
    const cleaning = this._isCleaning(vac);
    const paused = this._isPaused(vac);
    const hasRooms = this._hasSelectedRooms(vac);
    const color = this._color(vac);
    const ck = this._colorKey(vac);
    const mins = this._totalCleanMins(vac);
    const timeStr = this._timeStr(mins);


    if (paused) {
      const hId = "resume-" + vacIdx;
      return html`
        <div class="actions">
          <button
            class="action-btn ${this._holdId === hId ? "action-btn--holding" : ""}"
            style=${styleMap({ background: COLOR_BG[ck], border: "1px solid " + color + "80" })}
            @pointerdown=${this._holdStart(hId, () => this._resume(vac))}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${styleMap({ color })}></ha-icon>
            <span>Resume</span>
          </button>
          <button
            class="action-btn action-btn--secondary"
            @click=${() => this._dock(vac)}
          >
            <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon>
            <span>Dock</span>
          </button>
        </div>
      `;
    }

    if (cleaning) {
      const hId = "pause-" + vacIdx;
      return html`
        <div class="actions">
          <button
            class="action-btn action-btn--warn ${this._holdId === hId ? "action-btn--holding" : ""}"
            @pointerdown=${this._holdStart(hId, () => this._pause(vac))}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:pause" style="color:#faad14"></ha-icon>
            <span>Pause</span>
          </button>
        </div>
      `;
    }

    const hId = "start-" + vacIdx;
    const startBg = hasRooms ? COLOR_BG[ck] : "rgba(60,60,60,0.4)";
    const startBorder = hasRooms ? "1px solid " + color + "80" : "1px solid rgba(255,255,255,0.1)";
    const startIconColor = hasRooms ? color : "rgba(255,255,255,0.2)";
    const startTextColor = hasRooms ? "white" : "rgba(255,255,255,0.25)";

    return html`
      <div class="actions">
        ${this._renderPresetChips(vac)}
        <button
          class="action-btn ${hasRooms && this._holdId === hId ? "action-btn--holding" : ""}"
          style=${styleMap({ background: startBg, border: startBorder })}
          ?disabled=${!hasRooms}
          @pointerdown=${hasRooms ? this._holdStart(hId, () => this._startClean(vac)) : nothing}
          @pointerup=${this._holdEnd}
          @pointerleave=${this._holdEnd}
          @pointercancel=${this._holdEnd}
        >
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:rocket-launch" style=${styleMap({ color: startIconColor })}></ha-icon>
          <div class="start-body">
            <span style=${styleMap({ color: startTextColor })}>START</span>
            ${(this._roomsFor(vac)).length > 0 ? html`
              <div class="room-icons">
                ${(this._roomsFor(vac)).map(r => html`
                  <ha-icon
                    icon=${r.icon || "mdi:square"}
                    style=${styleMap({ color: this._isRoomSelected(r, vac) ? color : "rgba(255,255,255,0.15)" })}
                  ></ha-icon>
                `)}
              </div>
            ` : nothing}
            ${timeStr ? html`<small style="color:rgba(255,255,255,0.4)">${timeStr}</small>` : nothing}
            ${(this._roomsFor(vac)).length > 1 ? html`
              <div class="sel-all-row">
                <button class="sel-link" @click=${(e: Event) => { e.stopPropagation(); this._selectAll(vac); }}>all</button>
                <span style="color:rgba(255,255,255,0.2)">·</span>
                <button class="sel-link" @click=${(e: Event) => { e.stopPropagation(); this._deselectAll(vac); }}>none</button>
              </div>
            ` : nothing}
          </div>
        </button>
      </div>
    `;
  }

  private _renderStatusCard(vac: VacuumConfig, vacIdx: number) {
    const cleaning = this._isCleaning(vac);
    const color = this._color(vac);
    const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;

    const cardBorder = cleaning ? "2px solid " + color : "1px solid rgba(255,255,255,0.08)";
    const cardShadow = cleaning ? "0 0 22px " + color + "40" : "none";
    const imgFilter = cleaning
      ? "drop-shadow(0 0 20px " + color + "D8)"
      : "drop-shadow(0 4px 12px " + color + "33)";

    return html`
      <div class="status-card" style=${styleMap({ border: cardBorder, boxShadow: cardShadow })}>
        <div class="status-left" style="cursor:pointer"
          @click=${() => this._fireMoreInfo(vac.entity)}
          title="Open ${name} info">
          <div class="model-label">${name}</div>
          ${vac.image ? html`
            <img class="vac-img" src=${vac.image} alt=${name}
              style=${styleMap({ opacity: cleaning ? "0.9" : "0.6", filter: imgFilter })}
            />
          ` : html`
            <ha-icon icon="mdi:robot-vacuum"
              style=${styleMap({ color, fontSize: "80px", opacity: cleaning ? "0.9" : "0.5" })}
            ></ha-icon>
          `}
        </div>
        <div class="status-right">
          ${this._renderStatusRow(vac)}
          ${this._renderProgress(vac)}
          ${this._renderActions(vac, vacIdx)}
          ${this._renderDebugProgress(vac)}
        </div>
      </div>
    `;
  }

  /** Small circular gauge for the debug strip (dry / wet coverage). `calibrating` adds a
   *  ~ to mark that it is still the raw bbox % (no learned baseline yet). */
  private _renderMiniGauge(pct: number, color: string, icon: string, calibrating: boolean) {
    return html`
      <span class="mini-gauge-wrap">
        <ha-icon class="mini-gauge-ico" icon=${icon} style=${styleMap({ color })}></ha-icon>
        <span class="mini-gauge" style=${styleMap({ background: `conic-gradient(${color} ${pct * 3.6}deg, rgba(255,255,255,0.12) 0)` })}>
          <span>${pct}${calibrating ? "~" : ""}</span>
        </span>
      </span>`;
  }

  /** Room the vacuum is currently in, per the integration (for live-ticking its timer). */
  private _currentRoomName(vac: VacuumConfig): string | undefined {
    const ent = vac.integration_entity;
    return ent ? (this.hass.states[ent]?.attributes?.vacuum_room_name as string | undefined) : undefined;
  }

  private _mmss(sec: number): string {
    const s = Math.max(0, Math.round(sec));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  /** Debug strip inside the status card: per-room dry + wet coverage gauges and the live
   *  time spent (mm:ss / mm:ss estimate). Shown whenever debug_room_progress is on. */
  private _renderDebugProgress(vac: VacuumConfig) {
    if (!this._config.debug_room_progress) return nothing;
    const rows = (this._roomsFor(vac))
      .map((r) => ({ r, p: this._roomProgress(vac, r) }))
      .filter((x) => x.p && (x.p!.dry_pct != null || x.p!.wet_pct != null || x.p!.elapsed_s != null));
    if (!rows.length) return nothing;
    const color = this._color(vac);
    const ent = vac.integration_entity;
    const sensorTs = ent ? Date.parse(this.hass.states[ent]?.last_updated ?? "") : NaN;
    const curRoom = this._currentRoomName(vac);
    const cleaning = this._isCleaning(vac);
    const paused = this._isPaused(vac);
    // Seconds since the sensor last updated — while cleaning this is live cleaning time;
    // while paused the sensor is frozen so it measures the pause length.
    const since = (cleaning || paused) && !isNaN(sensorTs) ? Math.max(0, (this._now - sensorTs) / 1000) : 0;
    return html`
      <div class="dbg-prog">
        ${rows.map(({ r, p }) => {
          const isCur = (r.key === curRoom || r.name === curRoom) && (cleaning || paused);
          // Elapsed ticks every second for the active room (and keeps moving while paused);
          // the estimate grows equally during a pause so "remaining" stays put.
          const elapsed = (p!.elapsed_s ?? 0) + (isCur ? since : 0);
          let est = p!.est_s ?? null;
          if (isCur && paused && est != null) est = est + since;
          const timeStr = est != null ? `${this._mmss(elapsed)}/${this._mmss(est)}` : this._mmss(elapsed);
          return html`
            <span class="dbg-prog-item" title=${`dry ${p!.dry_pct ?? "—"}% · wet ${p!.wet_pct ?? "—"}%`}>
              ${r.icon ? html`<ha-icon icon=${r.icon}></ha-icon>` : nothing}
              <span class="dbg-prog-name">${r.name ?? r.key}</span>
              ${p!.dry_pct != null ? this._renderMiniGauge(p!.dry_pct, color, "mdi:broom", !!p!.dry_calibrating) : nothing}
              ${p!.wet_pct != null ? this._renderMiniGauge(p!.wet_pct, "#40a9ff", "mdi:water", !!p!.wet_calibrating) : nothing}
              ${p!.elapsed_s != null ? html`<small>${timeStr}</small>` : nothing}
            </span>
          `;
        })}
      </div>
    `;
  }

  // ── Main render ─────────────────────────────────────────────────────────

  render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <ha-card>
        ${this.editMode ? html`<div class="version-chip">v${CARD_VERSION} · ${Math.round(this._cardW)}w</div>` : nothing}
        <div class="badges-row">
          ${this._config.vacuums.map((v, i) => this._renderBadge(v, i))}
          ${(this._config.global_actions ?? []).map((ga, i) => this._renderGlobalBadge(ga, i))}
        </div>
        ${this._renderAutoBar()}
        ${this._renderPlanPreview()}
        ${this._config.map_mode === "merged"
          ? html`
              ${this._renderResponsive(this._renderMergedMap())}
              ${[...this._shownSet].filter(i => i < this._config.vacuums.length).map(i => html`
                ${this._renderMapTools(this._config.vacuums[i])}
                ${this._renderStatusCard(this._config.vacuums[i], i)}
              `)}
            `
          : [...this._shownSet]
              .filter(i => i < this._config.vacuums.length)
              .map(i => html`
                ${this._renderResponsive(this._renderMap(this._config.vacuums[i]))}
                ${this._renderMapTools(this._config.vacuums[i])}
                ${this._renderStatusCard(this._config.vacuums[i], i)}
              `)}
      </ha-card>
    `;
  }

  // ── Styles ──────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    ha-card {
      position: relative;
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .version-chip {
      position: absolute;
      top: 0;
      right: 8px;
      font-size: 10px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.35);
      pointer-events: none;
      z-index: 2;
    }

    /* ── Badges ──────────────────────────────────────────────────────── */
    .badges-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .badge {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 18px 6px 6px;
      border-radius: 99px;
      cursor: pointer;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: background 0.3s, border 0.3s, box-shadow 0.3s;
    }

    .badge-img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .badge-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .badge-name {
      font-size: 15px;
      font-weight: 700;
      white-space: nowrap;
      transition: color 0.3s;
      position: relative;
      z-index: 1;
    }

    /* ── Hold ring (shared by badges and action buttons) ─────────────── */
    .hold-ring {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: rgba(255, 255, 255, 0.18);
      transform: scaleX(0);
      transform-origin: left;
      pointer-events: none;
      z-index: 0;
    }

    .action-btn--holding .hold-ring,
    .badge--holding .hold-ring {
      animation: hold-fill var(--hold-ms) linear forwards;
    }

    @keyframes hold-fill {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }

    /* ── Map ─────────────────────────────────────────────────────────── */
    .map-wrap {
      position: relative;
      width: 100%;
      padding-top: 27.5%;
      overflow: hidden;
      border-radius: 12px;
    }

    .map-img {
      position: absolute;
      transform-origin: center center;
      object-fit: cover;
    }

    .map-wrap--image { padding-top: 0; }
    .image-base-img { position: relative; display: block; width: 100%; height: auto; transform-origin: center center; }
    .map-img--overlay { opacity: 0.55; pointer-events: none; }
    .map-vector { position: absolute; transform-origin: center center; pointer-events: none; overflow: visible; }
    .zone-rect { position: absolute; border: 2px solid #fff; background: rgba(255,255,255,0.15); border-radius: 4px; pointer-events: none; box-shadow: 0 0 0 1px rgba(0,0,0,0.45); }
    .layer-toggles { position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; z-index: 3; }
    .layer-btn { display: flex; align-items: center; gap: 3px; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.45); color: rgba(255,255,255,0.55); font-size: 11px; font-weight: 600; cursor: pointer; --mdc-icon-size: 16px; user-select: none; -webkit-touch-callout: none; touch-action: manipulation; }
    .layer-btn.on { color: #fff; border-color: rgba(255,255,255,0.55); background: rgba(0,0,0,0.7); }
    .layer-menu { position: absolute; top: 38px; right: 0; min-width: 200px; max-width: 86vw; max-height: 60vh; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; padding: 6px; border-radius: 12px; background: rgba(15,15,18,0.96); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
    .layer-menu-head { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,0.5); padding: 2px 6px 5px; --mdc-icon-size: 14px; }
    .layer-menu-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: rgba(255,255,255,0.88); cursor: pointer; font-size: 13px; --mdc-icon-size: 16px; }
    .layer-menu-row.on { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.4); }
    .lm-name { flex: 1; text-align: left; }
    .layer-menu-row b { font-weight: 700; }
    .room-list { display: flex; flex-direction: column; gap: 4px; }
    .room-row { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.85); cursor: pointer; --mdc-icon-size: 18px; }
    .room-row.on { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.1); }
    .rl-icon { color: rgba(255,255,255,0.6); }
    .rl-name { flex: 1; text-align: left; font-size: 13px; }
    .rl-age { display: flex; align-items: center; gap: 3px; font-size: 12px; --mdc-icon-size: 14px; color: rgba(255,255,255,0.45); }
    .rl-age b { font-weight: 700; }
    .rl-prog { font-size: 12px; font-weight: 700; display: flex; align-items: baseline; gap: 1px; }
    .rl-prog small { font-size: 8px; opacity: 0.55; }
    .map-wrap--fixed { padding-top: 0; }
    .image-base-img--fit { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }

    /* ── Room buttons ────────────────────────────────────────────────── */
    .room-btn {
      position: absolute;
      width: 46px;
      height: 46px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      transition: background 0.2s, box-shadow 0.2s;
    }

    .room-btn ha-icon {
      --mdc-icon-size: 22px;
    }

    .room-overlay {
      position: absolute;
      transform: translate(-50%, -50%);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      padding: 3px;
      transition: background 0.2s, border 0.3s, box-shadow 0.3s;
    }

    /* ── Debug per-room progress gauge ───────────────────────────────── */
    .room-gauge {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 4;
    }
    .room-gauge span {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.82);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Status card ─────────────────────────────────────────────────── */
    .status-card {
      display: grid;
      grid-template-columns: 150px 1fr;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 20px;
      overflow: hidden;
      transition: border 0.4s, box-shadow 0.4s;
    }

    .status-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 4px 0 0;
    }

    .model-label {
      font-size: 10px;
      letter-spacing: 3px;
      color: rgba(255, 255, 255, 0.3);
      text-transform: uppercase;
      text-align: center;
      margin-bottom: -10px;
    }

    .vac-img {
      width: 110%;
      margin-bottom: -15px;
      object-fit: contain;
      display: block;
      transition: opacity 0.5s, filter 0.5s;
    }

    .status-right {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* ── Status row ──────────────────────────────────────────────────── */
    .status-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px 12px 4px 16px;
    }

    .error-row {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 12px 0 16px; animation: pulse-error 2s ease-in-out infinite;
    }
    @keyframes pulse-error { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

    .status-main { display: flex; flex-direction: column; gap: 2px; }
    .status-label { font-size: 20px; font-weight: 700; }
    .current-room { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.45); }

    .status-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
      flex-shrink: 0;
    }

    .battery { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
    .battery ha-icon { --mdc-icon-size: 15px; }

    .last-clean {
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; color: rgba(255, 255, 255, 0.45);
    }
    .last-clean ha-icon { --mdc-icon-size: 12px; color: rgba(255, 255, 255, 0.25); }

    /* ── Progress bar ────────────────────────────────────────────────── */
    .progress { display: flex; align-items: center; gap: 8px; padding: 0 16px 4px; }
    .progress-track {
      flex: 1; height: 3px;
      background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden;
    }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
    .progress-label { font-size: 11px; font-weight: 600; flex-shrink: 0; }

    /* ── Debug per-room progress strip ───────────────────────────────── */
    .dbg-prog { display: flex; flex-wrap: wrap; gap: 6px 12px; padding: 0 16px 12px; }
    .dbg-prog-item { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.55); --mdc-icon-size: 14px; }
    .dbg-prog-name { color: rgba(255,255,255,0.45); }
    .dbg-prog-item b { font-weight: 700; }
    .dbg-prog-item small { color: rgba(255,255,255,0.4); font-size: 10px; }
    .mini-gauge-wrap { display: inline-flex; align-items: center; gap: 2px; }
    .mini-gauge-ico { --mdc-icon-size: 12px; opacity: 0.8; }
    .mini-gauge { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
    .mini-gauge span { width: 16px; height: 16px; border-radius: 50%; background: rgba(0,0,0,0.82); color: #fff; font-size: 8px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

    /* ── Action buttons ──────────────────────────────────────────────── */
    .actions { display: flex; gap: 8px; padding: 0 12px 14px; }

    .action-btn {
      position: relative;
      overflow: hidden;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 14px;
      cursor: pointer;
      transition: opacity 0.2s;
      font-family: inherit;
    }

    .action-btn:disabled { cursor: default; opacity: 0.7; }

    .action-btn ha-icon { --mdc-icon-size: 22px; flex-shrink: 0; position: relative; z-index: 1; }
    .action-btn span { font-size: 14px; font-weight: 700; color: white; position: relative; z-index: 1; }

    .action-btn--secondary {
      background: rgba(64, 169, 255, 0.08);
      border: 1px solid rgba(64, 169, 255, 0.2) !important;
    }

    .action-btn--warn {
      background: rgba(250, 173, 20, 0.18);
      border: 1px solid rgba(250, 173, 20, 0.5) !important;
    }

    /* ── Start button body ───────────────────────────────────────────── */
    .start-body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      position: relative;
      z-index: 1;
    }

    .start-body small { font-size: 10px; }

    .sel-all-row {
      display: flex; align-items: center; gap: 4px; margin-top: 1px;
    }
    .sel-link {
      background: none; border: none; cursor: pointer; padding: 0;
      font-size: 10px; font-family: inherit;
      color: rgba(255,255,255,0.3); transition: color .15s;
    }
    .sel-link:hover { color: rgba(255,255,255,0.7); }

    .room-icons {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 1px;
    }

    .room-icons ha-icon { --mdc-icon-size: 14px; }
    .map-clickcatch { position: absolute; inset: 0; cursor: crosshair; z-index: 5; }
    .map-tools { display: flex; gap: 6px; margin: 6px 0 0; }
    .mtbtn { display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06); color: inherit; cursor: pointer; font-size: 12px; font-weight: 600; }
    .mtbtn.on { background: rgba(59,130,246,0.25); border-color: #3b82f6; }
    .mtbtn:disabled { opacity: 0.4; cursor: default; }
    .mtbtn ha-icon { --mdc-icon-size: 16px; }
    .calib-panel { margin-top: 4px; font-size: 12px; opacity: 0.9; padding: 6px 8px; background: rgba(59,130,246,0.12); border-radius: 8px; }
    .calib-panel > div { margin-bottom: 4px; }
    .calib-actions { display: flex; gap: 6px; flex-wrap: wrap; }
  `;
}

const customCards =
  ((window as Window & { customCards?: Array<Record<string, unknown>> }).customCards ??= []);
if (!customCards.some((c) => c["type"] === CARD_NAME)) {
  customCards.push({
    type: CARD_NAME,
    name: "AnyVac Card",
    description: "Feature-rich card for Roborock vacuums — map, room selection, multi-vacuum tabs, global actions.",
    preview: false,
    documentationURL: "https://github.com/Michailjovic/anyvac-card",
  });
}
