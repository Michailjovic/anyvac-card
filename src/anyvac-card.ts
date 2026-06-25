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
  GlobalAction,
  GlobalActionCall,
  NotifyTemplates,
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

console.info(
  `%c ROBOROCK-VACUUM-CARD %c v${CARD_VERSION} `,
  "background:#2196F3;color:#fff;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px",
  "background:#1a1a1a;color:#fff;font-weight:400;padding:2px 4px;border-radius:0 3px 3px 0"
);

type InFlightCleaning = {
  rooms: Array<{
    key: string;
    name: string;
    last_clean_entity?: string;
    clean_time_entity?: string;
  }>;
  expectedMs: number;
  startTime: number;
  /** Timestamp of the very first pass — used for total time in notifications */
  originalStartTime: number;
  vacLabel: string;
  cleanType: "wet" | "dry";
  /** Passes remaining after the current one (native-area software repeat) */
  repeatRemaining: number;
  /** Resolved area IDs — stored for restarting repeat passes */
  areaIds?: string[];
};

@customElement(CARD_NAME)
export class AnyVacCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  /** Set by Lovelace when the dashboard is in edit mode */
  @property({ attribute: false }) editMode = false;
  @state() private _config!: AnyVacCardConfig;
  @state() private _shownSet = new Set<number>([0]);
  /** ID of the button currently being held — drives the fill animation */
  @state() private _holdId: string | null = null;
  @state() private _mapMode: "normal" | "pin" | "calib" | "zone" = "normal";
  @state() private _modeEntity: string | null = null;
  @state() private _calibStep = 0;
  private _calibPts: Array<{ map: { x: number; y: number }; vacuum: { x: number; y: number } }> = [];
  private readonly _calibTargets = [
    { x: 25500, y: 25500 },
    { x: 27000, y: 25500 },
    { x: 25500, y: 26500 },
  ];
  @state() private _calibMsg = "";
  private _calibCur = { x: 25500, y: 25500 };
  private _calibCandIdx = 0;
  @state() private _calibCircle = { x: 50, y: 50 };
  private _calibContent = { x: 50, y: 50 };
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
  /** Aktivní úklidy — sledování průběhu pro vyhodnocení úspěchu */
  private _inFlight = new Map<string, InFlightCleaning>();
  private _prevVacStates = new Map<string, string>();
  private _prevRoomStates = new Map<string, string>();
  /** Auto-calibration: timestamp when vacuum entered each room (key = vacEntity:roomName) */
  private _roomEnterTimes = new Map<string, number>();

  private _holdTimer: ReturnType<typeof setTimeout> | null = null;
  private _initialized = false;
  /** Entities whose state changes should trigger a re-render */
  private _watched: Set<string> | null = null;
  /** roborock_card_event subscription (blueprint → card sync) */
  private _unsubEvents: Promise<() => void> | null = null;

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
    this._ensureSubscribed();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cancelHold();
    if (this._unsubEvents) {
      this._unsubEvents.then((unsub) => unsub()).catch(() => { /* connection gone */ });
      this._unsubEvents = null;
    }
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
        vac.error_entity, vac.map?.entity, ...Object.values(this._autoEntities(vac))]) {
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
    this._watched = s;
    return s;
  }

  private _ensureSubscribed(): void {
    if (this._unsubEvents || !this.hass?.connection?.subscribeEvents) return;
    try {
      this._unsubEvents = this.hass.connection.subscribeEvents(
        (ev) => this._onCardEvent(ev.data ?? {}),
        "roborock_card_event"
      );
    } catch {
      this._unsubEvents = null;
    }
  }

  /**
   * Blueprint fired cleaning_finished — clear the room selection for that
   * vacuum on every device with an open dashboard, and drop any stale
   * in-flight record (e.g. when this tab missed the docked transition).
   */
  private _onCardEvent(data: Record<string, unknown>): void {
    if (data["action"] !== "cleaning_finished" || data["source"] !== "blueprint") return;
    const vacEntity = String(data["vacuum_entity"] ?? "");
    if (!this._config?.vacuums.some((v) => v.entity === vacEntity)) return;
    this._inFlight.delete(vacEntity);
    const keys = Array.isArray(data["rooms"]) ? (data["rooms"] as unknown[]).map(String) : [];
    if (!keys.length) return;
    const next = new Map(this._localRoomSel);
    for (const k of keys) next.delete(vacEntity + ":" + k);
    this._localRoomSel = next;
    this._saveRoomSel(vacEntity);
  }

  protected updated(changed: PropertyValues): void {
    this._ensureSubscribed();
    if (!changed.has("hass") || !this.hass || !this._config) return;
    for (const vac of this._config.vacuums) {
      const newState = this.hass.states[vac.entity]?.state ?? "";
      const prevState = this._prevVacStates.get(vac.entity) ?? newState;
      // Přechod do docked/charging při aktivním úklidu → vyhodnoť
      if (prevState !== newState &&
          (newState === "docked" || newState === "charging") &&
          this._inFlight.has(vac.entity)) {
        const flight = this._inFlight.get(vac.entity)!;
        this._inFlight.delete(vac.entity);
        this._evalCleaningComplete(vac.entity, flight);
      }
      this._prevVacStates.set(vac.entity, newState);
      // room_entered event + auto-calibration tracking
      if (vac.current_room_entity && this._inFlight.has(vac.entity)) {
        const newRoom = this.hass.states[vac.current_room_entity]?.state ?? "";
        const prevRoom = this._prevRoomStates.get(vac.entity) ?? "";
        if (newRoom && newRoom !== prevRoom &&
            newRoom !== "unknown" && newRoom !== "unavailable") {
          if (prevRoom) {
            const enterKey = vac.entity + ":" + prevRoom;
            const enterTime = this._roomEnterTimes.get(enterKey);
            if (enterTime) {
              const elapsedMins = (Date.now() - enterTime) / 60_000;
              this._updateRoomCleanTime(vac, prevRoom, elapsedMins);
              this._roomEnterTimes.delete(enterKey);
            }
          }
          this._roomEnterTimes.set(vac.entity + ":" + newRoom, Date.now());
          this._fireHAEvent({
            action: "room_entered",
            vacuum_entity: vac.entity,
            vacuum_label: vac.name ?? vac.entity,
            clean_type: this._deriveCleanType(vac),
            room_name: newRoom,
          });
        }
        this._prevRoomStates.set(vac.entity, newRoom);
      }
    }
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

  private _isRoomSelected(room: RoomConfig, vac: VacuumConfig): boolean {
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
    // 3) Fallback: derive from the clean action.
    return this._deriveCleanType(vac);
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

  private _deriveCleanType(vac: VacuumConfig): "wet" | "dry" {
    if (vac.clean_action?.type === "native" ||
        vac.clean_action?.type === "native-area" ||
        vac.clean_action?.type === "native-auto") {
      const na = vac.clean_action as NativeCleanAction | NativeAreaCleanAction | NativeAutoCleanAction;
      if (na.mop_mode_entity || na.mop_intensity_entity) return "wet";
    }
    return "dry";
  }

  private _fireHAEvent(data: Record<string, unknown>): void {
    try {
      this.hass.connection.sendMessage({
        type: "fire_event",
        event_type: "roborock_card_event",
        event_data: data,
      });
    } catch (err) {
      console.error("[anyvac-card] fire_event failed:", err);
    }
  }

  private async _updateRoomCleanTime(
    vac: VacuumConfig, roomName: string, elapsedMins: number
  ): Promise<void> {
    if (elapsedMins < 0.5 || elapsedMins > 120) return;
    const room = (this._roomsFor(vac)).find(
      r => r.name === roomName || r.key === roomName
    );
    if (!room?.clean_time_entity) return;
    const currentVal = parseFloat(this.hass.states[room.clean_time_entity]?.state ?? "0");
    const newAvg = currentVal > 0
      ? Math.round(0.7 * currentVal + 0.3 * elapsedMins)
      : Math.round(elapsedMins);
    await this._call("input_number", "set_value", {
      entity_id: room.clean_time_entity,
      value: newAvg,
    });
  }

  private async _evalCleaningComplete(
    vacEntity: string, flight: InFlightCleaning
  ): Promise<void> {
    const actualMs = Date.now() - flight.startTime;
    const actualMins = Math.round(actualMs / 60_000);
    const success = flight.expectedMs === 0 || actualMs >= flight.expectedMs * 0.5;

    // Software repeat — restart if more passes remaining
    if (success && flight.repeatRemaining > 0 && flight.areaIds) {
      try {
        await this.hass.callService(
          "vacuum", "clean_area",
          { cleaning_area_id: flight.areaIds },
          { entity_id: vacEntity },
        );
      } catch (err) {
        console.error("[anyvac-card] repeat restart failed:", err);
        return;
      }
      this._inFlight.set(vacEntity, {
        ...flight,
        startTime: Date.now(),
        repeatRemaining: flight.repeatRemaining - 1,
      });
      return; // timestamps + notification fire only after last pass
    }

    // Auto-calibration: handle last room (no room_entered transition at session end)
    const lastRoom = this._prevRoomStates.get(vacEntity) ?? "";
    if (lastRoom) {
      const enterKey = vacEntity + ":" + lastRoom;
      const enterTime = this._roomEnterTimes.get(enterKey);
      if (enterTime) {
        const vacConf = this._config.vacuums.find(v => v.entity === vacEntity);
        if (vacConf) {
          const elapsedMins = (Date.now() - enterTime) / 60_000;
          await this._updateRoomCleanTime(vacConf, lastRoom, elapsedMins);
        }
        this._roomEnterTimes.delete(enterKey);
      }
    }

    const totalActualMins = Math.round((Date.now() - flight.originalStartTime) / 60_000);

    if (success) {
      const dt = new Date().toISOString().replace("T", " ").slice(0, 19);
      for (const room of flight.rooms) {
        if (room.last_clean_entity) {
          await this._call("input_datetime", "set_datetime", {
            entity_id: room.last_clean_entity,
            datetime: dt,
          });
        }
      }
      // Single-room time calibration: a run with exactly one room measures
      // that room's real total duration (incl. repeat passes) — store it
      // directly as the new estimate when the option is enabled.
      if (this._config.single_room_time && flight.rooms.length === 1) {
        const only = flight.rooms[0];
        if (only.clean_time_entity && totalActualMins >= 1 && totalActualMins <= 180) {
          await this._call("input_number", "set_value", {
            entity_id: only.clean_time_entity,
            value: totalActualMins,
          });
        }
      }
      // Clear room selection for this vacuum after successful clean
      const nextSel = new Map(this._localRoomSel);
      for (const room of flight.rooms) nextSel.delete(vacEntity + ":" + room.key);
      this._localRoomSel = nextSel;
      this._saveRoomSel(vacEntity);
    }
    this._fireHAEvent({
      action: "cleaning_finished",
      vacuum_entity: vacEntity,
      vacuum_label: flight.vacLabel,
      clean_type: flight.cleanType,
      rooms: flight.rooms.map(r => r.key),
      room_labels: flight.rooms.map(r => r.name).join(", "),
      estimated_mins: Math.round(flight.expectedMs / 60_000),
      actual_mins: totalActualMins,
      success,
    });
    await this._sendNotify(this._config.notify?.on_finish, {
      vacuum_label: flight.vacLabel,
      vacuum_entity: vacEntity,
      room_labels: flight.rooms.map(r => r.name).join(", "),
      room_keys: flight.rooms.map(r => r.key).join(", "),
      estimated_mins: Math.round(flight.expectedMs / 60_000),
      actual_mins: totalActualMins,
      clean_type: flight.cleanType,
      success: String(success),
    });
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

  // ── Notifications ──────────────────────────────────────────────────────

  private _resolveTemplate(tmpl: string, tokens: Record<string, string | number>): string {
    return tmpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => String(tokens[k] ?? ""));
  }

  private async _sendNotify(
    template: NotifyTemplates | undefined,
    tokens: Record<string, string | number>
  ): Promise<void> {
    const cfg = this._config.notify;
    if (!cfg || !template) return;
    const isWet = tokens["clean_type"] === "wet";
    const color = isWet ? (cfg.color_wet ?? "#2196F3") : (cfg.color_dry ?? "#4CAF50");
    const icon  = isWet ? "mdi:mop" : "mdi:robot-vacuum";
    const tag   = (cfg.tag_prefix ?? "roborock") + "-" + String(tokens["vacuum_entity"] ?? "");
    try {
      await this.hass.callService("ticker", "notify", {
        category: cfg.category,
        title:    template.title   ? this._resolveTemplate(template.title,   tokens) : undefined,
        message:  template.message ? this._resolveTemplate(template.message, tokens) : undefined,
        data: { data: { notification_icon: icon, color, priority: "high", tag } },
      });
    } catch (err) {
      console.error("[anyvac-card] notify failed:", err);
    }
  }

  private _pause(vac: VacuumConfig): void {
    this._call("vacuum", "pause", { entity_id: vac.entity });
  }

  private _resume(vac: VacuumConfig): void {
    this._call("vacuum", "start", { entity_id: vac.entity });
  }

  private _dock(vac: VacuumConfig): void {
    // Manual dock = user cancelled — never restart remaining software-repeat passes
    const flight = this._inFlight.get(vac.entity);
    if (flight && flight.repeatRemaining > 0) {
      this._inFlight.set(vac.entity, { ...flight, repeatRemaining: 0 });
    }
    this._call("vacuum", "return_to_base", { entity_id: vac.entity });
  }

  private _toggleRoom(room: RoomConfig, vac: VacuumConfig): void {
    const k = vac.entity + ":" + room.key;
    const next = new Map(this._localRoomSel);
    next.set(k, !(next.get(k) ?? false));
    this._localRoomSel = next;
    this._saveRoomSel(vac.entity);
  }
  private _isRoomSelectedAny(key: string, vacs: VacuumConfig[]): boolean {
    return vacs.some((v) => this._localRoomSel.get(v.entity + ":" + key) ?? false);
  }
  /** Merged mode: toggle a room across every shown vacuum that has it (one rectangle -> both controllers). */
  private _toggleRoomAcross(key: string, vacs: VacuumConfig[]): void {
    const target = !this._isRoomSelectedAny(key, vacs);
    const next = new Map(this._localRoomSel);
    for (const v of vacs) {
      if (this._roomsFor(v).some((r) => r.key === key)) next.set(v.entity + ":" + key, target);
    }
    this._localRoomSel = next;
    for (const v of vacs) this._saveRoomSel(v.entity);
  }

  private _selectAll(vac: VacuumConfig): void {
    const next = new Map(this._localRoomSel);
    for (const r of this._roomsFor(vac)) next.set(vac.entity + ":" + r.key, true);
    this._localRoomSel = next;
    this._saveRoomSel(vac.entity);
  }

  private _deselectAll(vac: VacuumConfig): void {
    const next = new Map(this._localRoomSel);
    for (const r of this._roomsFor(vac)) next.delete(vac.entity + ":" + r.key);
    this._localRoomSel = next;
    this._saveRoomSel(vac.entity);
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
      // Uses HA vacuum.clean_area — area_id resolved via area_mappings
      try {
        await this.hass.callService(
          "vacuum", "clean_area",
          { cleaning_area_id: selected.map((r) =>
              r.area_id ?? this._config.area_mappings?.[r.key] ?? r.key) },
          { entity_id: vac.entity },
        );
      } catch (err) {
        console.error("[anyvac-card] vacuum.clean_area failed:", err);
        return; // don't register in-flight for a clean that never started
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
    // Register in-flight + fire event (shared for both native variants)
    const totalMins = this._totalCleanMins(vac);
    const vacLabel = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
    const isNativeArea = vac.clean_action.type === "native-area";
    const nativeAreaAct = isNativeArea ? vac.clean_action as NativeAreaCleanAction : null;
    const areaIds = isNativeArea
      ? selected.map(r => r.area_id ?? this._config.area_mappings?.[r.key] ?? r.key)
      : undefined;
    const repeatRemaining = (nativeAreaAct?.repeat ?? 1) > 1
      ? (nativeAreaAct!.repeat!) - 1
      : 0;
    const now = Date.now();
    this._inFlight.set(vac.entity, {
      rooms: selected.map(r => ({ key: r.key, name: r.name, last_clean_entity: r.last_clean_entity, clean_time_entity: r.clean_time_entity })),
      expectedMs: totalMins * 60_000,
      startTime: now,
      originalStartTime: now,
      vacLabel,
      cleanType: this._deriveCleanType(vac),
      repeatRemaining,
      areaIds,
    });
    // Call notify_script if configured
    const nsCfg = this._config.notify_script;
    if (nsCfg?.entity) {
      const nsv = nsCfg.vars ?? {};
      const scriptVars: Record<string, string | number> = { vacuum_entity: vac.entity };
      if (nsv.vacuum_label   !== false) scriptVars.vacuum_label   = vacLabel;
      if (nsv.room_labels    !== false) scriptVars.room_labels    = selected.map(r => r.name).join(", ");
      if (nsv.room_keys      === true ) scriptVars.room_keys      = selected.map(r => r.key).join(", ");
      if (nsv.estimated_mins !== false) scriptVars.estimated_mins = Math.round(totalMins);
      if (nsv.clean_type     !== false) scriptVars.clean_type     = this._deriveCleanType(vac);
      await this._call("script", "turn_on", { entity_id: nsCfg.entity, variables: scriptVars });
    }
    this._fireHAEvent({
      action: "cleaning_started",
      vacuum_entity: vac.entity,
      vacuum_label: vacLabel,
      clean_type: this._deriveCleanType(vac),
      rooms: selected.map(r => r.key),
      room_labels: selected.map(r => r.name).join(", "),
      estimated_mins: Math.round(totalMins),
      // Helper entity IDs — consumed by the cleaning-tracker blueprint
      last_clean_entities: selected.map(r => r.last_clean_entity).filter((e): e is string => !!e),
      clean_time_entities: selected.map(r => r.clean_time_entity).filter((e): e is string => !!e),
    });
    await this._sendNotify(this._config.notify?.on_start, {
      vacuum_label: vacLabel,
      vacuum_entity: vac.entity,
      room_labels: selected.map(r => r.name).join(", "),
      room_keys: selected.map(r => r.key).join(", "),
      estimated_mins: Math.round(totalMins),
      clean_type: this._deriveCleanType(vac),
    });
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

  // ── Calibration + pin & go (Milestone 2, v1; localStorage) ───────────────────
  private _calibKey(entity: string): string { return "anyvac_calib_" + entity; }
  private _loadCalib(entity: string): Array<{ map: { x: number; y: number }; vacuum: { x: number; y: number } }> | null {
    if (this._mapMode === "calib" && this._modeEntity === entity && this._calibPts.length >= 3) return this._calibPts;
    try { const raw = window.localStorage.getItem(this._calibKey(entity)); return raw ? JSON.parse(raw) : null; } catch { return null; }
  }
  private _saveCalib(entity: string, pts: Array<{ map: { x: number; y: number }; vacuum: { x: number; y: number } }>): void {
    try { window.localStorage.setItem(this._calibKey(entity), JSON.stringify(pts)); } catch { /* ignore */ }
  }
  private _solve3(m: number[][], r: number[]): number[] | null {
    const d = (a: number[][]) => a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1]) - a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0]) + a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]);
    const D = d(m); if (Math.abs(D) < 1e-9) return null;
    const col = (i: number) => m.map((row, ri) => row.map((v, ci) => (ci === i ? r[ri] : v)));
    return [d(col(0)) / D, d(col(1)) / D, d(col(2)) / D];
  }
  private _affine(pts: Array<{ map: { x: number; y: number }; vacuum: { x: number; y: number } }>) {
    if (pts.length < 3) return null;
    const M = pts.slice(0, 3).map((p) => [p.map.x, p.map.y, 1]);
    const ab = this._solve3(M, pts.slice(0, 3).map((p) => p.vacuum.x));
    const cd = this._solve3(M, pts.slice(0, 3).map((p) => p.vacuum.y));
    if (!ab || !cd) return null;
    return { a: ab[0], b: ab[1], e: ab[2], c: cd[0], d: cd[1], f: cd[2] };
  }
  private _mapToVac(entity: string, x: number, y: number): { x: number; y: number } | null {
    const pts = this._loadCalib(entity); if (!pts) return null;
    const t = this._affine(pts); if (!t) return null;
    return { x: t.a * x + t.b * y + t.e, y: t.c * x + t.d * y + t.f };
  }
  private async _gotoMm(entity: string, mm: { x: number; y: number }): Promise<void> {
    try { await this.hass.callService("vacuum", "send_command", { entity_id: entity, command: "app_goto_target", params: [Math.round(mm.x), Math.round(mm.y)] }); }
    catch (e) { console.error("[anyvac-card] goto failed:", e); }
  }
  private _toggleMode(entity: string, mode: "pin" | "calib" | "zone"): void {
    if (this._mapMode === mode && this._modeEntity === entity) { this._mapMode = "normal"; this._modeEntity = null; }
    else { this._mapMode = mode; this._modeEntity = entity; }
  }
  private _startCalib(vac: VacuumConfig): void {
    this._calibPts = []; this._calibStep = 0; this._calibMsg = ""; this._calibCandIdx = 0;
    this._calibCircle = { x: 50, y: 50 };
    this._calibCur = { ...this._calibTargets[0] };
    this._mapMode = "calib"; this._modeEntity = vac.entity;
  }
  private _refreshMap(vac: VacuumConfig): void {
    const ent = vac.map?.entity;
    if (ent) void this.hass.callService("homeassistant", "update_entity", { entity_id: ent });
  }
  private _calibCandidate(): { x: number; y: number } {
    const dock = this._calibTargets[0];
    const radii = [1600, 1100, 2300];
    let dirs: number[][];
    if (this._calibStep >= 2) {
      // Point 3: only PERPENDICULAR to point 2's actual direction -> never collinear.
      const p2 = this._calibPts[1]?.vacuum ?? { x: dock.x + 2200, y: dock.y };
      let vx = p2.x - dock.x, vy = p2.y - dock.y;
      const len = Math.hypot(vx, vy) || 1; vx /= len; vy /= len;
      dirs = [[-vy, vx], [vy, -vx]];
    } else {
      dirs = [[1, 0], [0, 1], [-1, 0], [0, -1], [0.71, 0.71], [-0.71, 0.71], [0.71, -0.71], [-0.71, -0.71]];
    }
    const total = dirs.length * radii.length;
    const i = ((this._calibCandIdx % total) + total) % total;
    const r = radii[Math.floor(i / dirs.length)];
    const d = dirs[i % dirs.length];
    return { x: Math.round(dock.x + d[0] * r), y: Math.round(dock.y + d[1] * r) };
  }
  private _calibProbe(vac: VacuumConfig): void {
    this._calibCur = this._calibCandidate();
    void this._gotoMm(vac.entity, this._calibCur);
    // Auto-refresh the map a few times while the robot drives (no manual Refresh needed).
    [4000, 8000, 13000, 18000, 24000].forEach((t) =>
      window.setTimeout(() => {
        if (this._mapMode === "calib" && this._modeEntity === vac.entity) this._refreshMap(vac);
      }, t));
  }
  private _calibAnother(vac: VacuumConfig): void {
    this._calibCandIdx += 1;
    this._calibProbe(vac);
  }
  private _calibConfirm(vac: VacuumConfig): void {
    const newPt = { map: { ...this._calibContent }, vacuum: { ...this._calibCur } };
    if (this._calibStep >= 2) {
      const pts = [...this._calibPts, newPt];
      const [a, b, c] = pts.map((p) => p.vacuum);
      const area = Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
      if (area < 400000) {
        this._calibMsg = "Points too aligned - use 'try another spot', then Confirm.";
        return;
      }
      this._calibPts = pts;
      this._saveCalib(vac.entity, pts);
      this._calibStep = 3; this._calibMsg = "";
      this._mapMode = "normal"; this._modeEntity = null;
    } else {
      this._calibPts = [...this._calibPts, newPt];
      this._calibStep += 1;
      this._calibMsg = "";
      this._calibCircle = { x: 50, y: 50 };
      this._calibCandIdx = 0;
      this._calibProbe(vac);
    }
  }
  private _onMapClick(vac: VacuumConfig, e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement; const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const content = this._clickToContent(vac, e.clientX, e.clientY) ?? { x, y };
    if (this._mapMode === "pin") {
      const mm = this._cmdMm(vac, content);
      this._dbg = "px " + content.x.toFixed(1) + "%," + content.y.toFixed(1) + "% -> mm " + (mm ? Math.round(mm.x) + "," + Math.round(mm.y) : "(no calib)");
      if (mm) void this._gotoMm(vac.entity, mm);
      this._mapMode = "normal"; this._modeEntity = null;
    } else if (this._mapMode === "calib") {
      this._calibCircle = { x, y };
      this._calibContent = { ...content };
    }
  }
  // Map a viewport click into the clicked layer's own content space (undo its
  // rotation/scale/offset) so calibration & pin&go are seating-independent and
  // consistent across the image base and the map overlay (combined mode).
  private _clickToContent(vac: VacuumConfig, clientX: number, clientY: number): { x: number; y: number } | null {
    // The map is the coordinate authority (robot + mm live there); the floorplan is decoration.
    const mapEl = vac.map?.entity ? (this.renderRoot?.querySelector(".map-img") as HTMLElement | null) : null;
    const el = mapEl ?? (this.renderRoot?.querySelector(".image-base-img") as HTMLElement | null);
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
  /** mm for a click, preferring the accurate integration calibration over the manual one. */
  private _cmdMm(vac: VacuumConfig, content: { x: number; y: number }): { x: number; y: number } | null {
    if (vac.integration_entity) { const m = this._intMapToVac(vac, content); if (m) return m; }
    return this._mapToVac(vac.entity, content.x, content.y);
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
    const ma = ca ? this._cmdMm(vac, ca) : null;
    const mb = cb ? this._cmdMm(vac, cb) : null;
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
    const hasCalib = !!this._loadCalib(vac.entity);
    const canCmd = hasCalib || !!vac.integration_entity;
    const mode = this._modeEntity === vac.entity ? this._mapMode : "normal";
    return html`
      <div class="map-tools">
        ${vac.map?.entity ? html`<button class="mtbtn" @click=${() => this._refreshMap(vac)} title="Refresh map">
          <ha-icon icon="mdi:refresh"></ha-icon><span>Refresh</span>
        </button>` : nothing}
        <button class="mtbtn ${mode === "pin" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._toggleMode(vac.entity, "pin")} title="Pin & Go">
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${mode === "zone" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._toggleMode(vac.entity, "zone")} title="Zone clean">
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        <button class="mtbtn ${mode === "calib" ? "on" : ""}" @click=${() => this._startCalib(vac)}>
          <ha-icon icon="mdi:crosshairs-gps"></ha-icon><span>${hasCalib ? "Recalibrate" : "Calibrate"}</span>
        </button>
        ${this._dbg ? html`<span style="font-size:11px;opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>` : nothing}
      </div>
      ${mode === "calib"
        ? html`<div class="calib-panel">
            <div>${this._calibStep === 0
              ? "Step 1/3: tap to place the circle on the DOCK, align its edges, then Confirm."
              : "Step " + (this._calibStep + 1) + "/3: tap to place the circle on the ROBOT, align its edges, then Confirm."}</div>
            <div class="calib-actions">
              <button class="mtbtn on" @click=${() => this._calibConfirm(vac)}>Confirm point</button>
              ${this._calibStep > 0 ? html`
                <button class="mtbtn" @click=${() => this._refreshMap(vac)}>Refresh map</button>
                <button class="mtbtn" @click=${() => this._calibAnother(vac)}>Didn't reach - try another spot</button>
              ` : nothing}
            </div>
          </div>`
        : nothing}
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
    if (!Array.isArray(cal) || cal.length < 3) return null;
    try {
      const M = cal.slice(0, 3).map((p: any) => [p.vacuum.x, p.vacuum.y, 1]);
      const abc = this._solve3(M, cal.slice(0, 3).map((p: any) => p.map.x));
      const def = this._solve3(M, cal.slice(0, 3).map((p: any) => p.map.y));
      if (!abc || !def) return null;
      return { a: abc[0], b: abc[1], c: abc[2], d: def[0], e: def[1], f: def[2] };
    } catch { return null; }
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
    // Dry layer draws the vacuum trace (path); wet layer draws the mop trace
    // (mop_path) as a wider translucent "wet sheen" band under the line. A run that
    // both vacuums and mops therefore shows the thin line riding on the band.
    const showDry = this._layers.dry && ct.dry;
    const showWet = this._layers.wet && ct.wet;
    const dryStr = showDry ? toPts(at.path) : "";
    const wetStr = showWet ? toPts(at.mop_path) : "";
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
    const bw = (pw * 2.6).toFixed(2);
    const wetColor = vac.mop_path_color || "#40a9ff";
    const mopBand = wetStr
      ? svg`<polyline points=${wetStr} fill="none" stroke=${wetColor} stroke-width=${bw} stroke-linejoin="round" stroke-linecap="round" opacity="0.28"></polyline>`
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
              <span class="rl-age"><ha-icon icon="mdi:broom"></ha-icon><b style=${styleMap({ color: this._colorForAgeDays(dry) })}>${badge(dry)}</b></span>
              <span class="rl-age"><ha-icon icon="mdi:water"></ha-icon><b style=${styleMap({ color: this._colorForAgeDays(wet) })}>${badge(wet)}</b></span>
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
          <img class="${imgClass}" src=${ib!.src!} alt="Floorplan"
            style=${styleMap({
              transform: "translate(" + (ib?.offset_x ?? 0) + "%," + (ib?.offset_y ?? 0) + "%) rotate(" + (ib?.rotation ?? 0) + "deg) scale(" + ((ib?.scale ?? 100) / 100) + ")",
            })} />
        ` : nothing}
        ${shown.map((v, idx) => {
          const mUrl = v.map?.entity ? this._mapUrl(v.map.entity) : null;
          if (!mUrl || v.hide_map) return nothing;
          const mm = v.map;
          const overlay = hasImage || idx > 0;
          return html`<img class="map-img ${overlay ? "map-img--overlay" : ""}" src=${mUrl} alt="Vacuum map"
            style=${styleMap({
              left: (50 + (mm?.offset_x ?? 0)) + "%",
              top: (50 + (mm?.offset_y ?? 0)) + "%",
              width: (mm?.scale ?? 100) + "%",
              transform: "translate(-50%,-50%) rotate(" + (mm?.rotation ?? 0) + "deg)",
              opacity: String((v.overlay_opacity ?? (overlay ? 55 : 100)) / 100),
              mixBlendMode: v.overlay_blend ?? "normal",
            })} />`;
        })}
        ${shown.map((v) => (v.integration_entity ? this._renderIntegrationOverlay(v, v.map) : nothing))}
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

    const m = vac.map;
    const fixedH = typeof vac.base_height === "number" && vac.base_height > 0;
    const wrapClass = fixedH ? "map-wrap--fixed" : (showImage ? "map-wrap--image" : "");
    const wrapStyle = styleMap(fixedH ? { height: (vac.base_height ?? 0) + "px" } : {});
    const imgClass = "image-base-img" + (fixedH ? " image-base-img--fit" : "");
    return html`
      <div class="map-wrap ${wrapClass}" style=${wrapStyle}>
        ${showImage ? html`
          <img class="${imgClass}" src=${imgSrc!} alt="Floorplan"
            style=${styleMap({
              transform: "translate(" + (ib?.offset_x ?? 0) + "%," + (ib?.offset_y ?? 0) + "%) rotate(" + (ib?.rotation ?? 0) + "deg) scale(" + ((ib?.scale ?? 100) / 100) + ")",
            })} />
        ` : nothing}
        ${showMap ? html`
          <img class="map-img ${showImage ? "map-img--overlay" : ""}" src=${mapUrl!} alt="Vacuum map"
            style=${styleMap({
              left: (50 + (m?.offset_x ?? 0)) + "%",
              top:  (50 + (m?.offset_y ?? 0)) + "%",
              width: (m?.scale ?? 100) + "%",
              transform: "translate(-50%,-50%) rotate(" + (m?.rotation ?? 0) + "deg)",
              ...(vac.hide_map ? { opacity: "0" } : (showImage ? { opacity: String((vac.overlay_opacity ?? 55) / 100), mixBlendMode: vac.overlay_blend ?? "normal" } : {})),
            })} />
        ` : nothing}
        ${showMap ? this._renderIntegrationOverlay(vac, m) : nothing}
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
        ${this._mapMode === "calib" && this._modeEntity === vac.entity
          ? html`<div class="calib-circle" style=${styleMap({ left: this._calibCircle.x + "%", top: this._calibCircle.y + "%" })}></div>`
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
        </div>
      </div>
    `;
  }

  // ── Main render ─────────────────────────────────────────────────────────

  render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <ha-card>
        ${this.editMode ? html`<div class="version-chip">v${CARD_VERSION}</div>` : nothing}
        <div class="badges-row">
          ${this._config.vacuums.map((v, i) => this._renderBadge(v, i))}
          ${(this._config.global_actions ?? []).map((ga, i) => this._renderGlobalBadge(ga, i))}
        </div>
        ${this._config.map_mode === "merged"
          ? html`
              ${this._renderMergedMap()}
              ${[...this._shownSet].filter(i => i < this._config.vacuums.length).map(i => html`
                ${this._renderMapTools(this._config.vacuums[i])}
                ${this._renderStatusCard(this._config.vacuums[i], i)}
              `)}
            `
          : [...this._shownSet]
              .filter(i => i < this._config.vacuums.length)
              .map(i => html`
                ${this._renderMap(this._config.vacuums[i])}
                ${this._renderMapTools(this._config.vacuums[i])}
                ${this._renderStatusCard(this._config.vacuums[i], i)}
              `)}
      </ha-card>
    `;
  }

  // ── Styles ──────────────────────────────────────────────────────────────

  static styles = css`
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
    .calib-circle { position: absolute; width: 40px; height: 40px; border: 2px solid #00e5ff; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 8px #00e5ff, inset 0 0 6px rgba(0,229,255,0.5); pointer-events: none; z-index: 6; }
    .calib-circle::after { content: ""; position: absolute; left: 50%; top: 50%; width: 3px; height: 3px; background: #00e5ff; border-radius: 50%; transform: translate(-50%, -50%); }
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
