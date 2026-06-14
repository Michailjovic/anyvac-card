import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  CARD_VERSION,
  CARD_TAG,
  EDITOR_TAG,
  CARD_NAME,
  CARD_DESCRIPTION,
  STATUS_MAP,
  ACCENT,
  HOLD_DURATION_MS,
  normalizeActivity,
} from "./const";
import type {
  HomeAssistant,
  AnyVacCardConfig,
  VacuumCardConfig,
  RegionConfig,
  CleanPreset,
  ImageBaseConfig,
  MapSourceConfig,
} from "./types";

const BADGE_BG = "rgba(30,30,30,0.85)";
const ACCENT_BG = "rgba(59,130,246,0.18)";
const ACCENT_BG_ACTIVE = "rgba(59,130,246,0.30)";

console.info(
  `%c ${CARD_NAME} %c v${CARD_VERSION} `,
  "color:#fff;background:#3b82f6;font-weight:700;border-radius:3px 0 0 3px;padding:2px 4px;",
  "color:#3b82f6;background:#0f172a;border-radius:0 3px 3px 0;padding:2px 4px;",
);

@customElement(CARD_TAG)
export class AnyVacCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: AnyVacCardConfig;
  @state() private _selected: Record<string, string[]> = {};
  @state() private _preset: Record<string, string> = {};
  @state() private _shown = 0;
  @state() private _holdId: string | null = null;
  private _holdTimer: ReturnType<typeof setTimeout> | null = null;

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(): AnyVacCardConfig {
    return { type: `custom:${CARD_TAG}`, base: "image", vacuums: [] };
  }

  public setConfig(config: AnyVacCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
  }

  public getCardSize(): number {
    return 7;
  }

  // ── hold-to-activate ────────────────────────────────────────────────────────

  private _holdStart(id: string, action: () => void) {
    return (e: PointerEvent) => {
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
  private _holdEnd = () => {
    this._cancelHold();
    this._holdId = null;
  };
  private _cancelHold() {
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  // ── selection / preset state ───────────────────────────────────────────────

  private _selectedIds(vac: VacuumCardConfig): string[] {
    return this._selected[vac.entity] ?? [];
  }
  private _hasSelection(vac: VacuumCardConfig): boolean {
    return this._selectedIds(vac).length > 0;
  }
  private _toggleRegion(vac: VacuumCardConfig, region: RegionConfig): void {
    const cur = new Set(this._selectedIds(vac));
    if (cur.has(region.id)) cur.delete(region.id);
    else cur.add(region.id);
    this._selected = { ...this._selected, [vac.entity]: [...cur] };
  }
  private _selectAll(vac: VacuumCardConfig): void {
    this._selected = { ...this._selected, [vac.entity]: (vac.regions ?? []).map((r) => r.id) };
  }
  private _clearSel(vac: VacuumCardConfig): void {
    this._selected = { ...this._selected, [vac.entity]: [] };
  }
  private _isRegionSelected(vac: VacuumCardConfig, region: RegionConfig): boolean {
    return this._selectedIds(vac).includes(region.id);
  }

  private _activePresetId(vac: VacuumCardConfig): string {
    const explicit = this._preset[vac.entity];
    if (explicit) return explicit;
    const ps = vac.presets ?? [];
    return (ps.find((p) => p.default) ?? ps[0])?.id ?? "";
  }
  private _setPreset(vac: VacuumCardConfig, id: string): void {
    this._preset = { ...this._preset, [vac.entity]: id };
  }
  private _currentPreset(vac: VacuumCardConfig): CleanPreset | undefined {
    const ps = vac.presets ?? [];
    const id = this._activePresetId(vac);
    return ps.find((p) => p.id === id) ?? ps.find((p) => p.default) ?? ps[0];
  }

  // ── commands ────────────────────────────────────────────────────────────────

  private async _svc(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ): Promise<void> {
    if (!this.hass) return;
    try {
      await this.hass.callService(domain, service, data, target);
    } catch (err) {
      console.error(`[anyvac-card] ${domain}.${service} failed:`, err);
    }
  }

  private async _applyPreset(vac: VacuumCardConfig, preset?: CleanPreset): Promise<void> {
    if (!preset) return;
    if (preset.suction)
      await this._svc("vacuum", "set_fan_speed", { entity_id: vac.entity, fan_speed: preset.suction });
    if (preset.mop_mode && preset.mop_mode_entity)
      await this._svc("select", "select_option", { entity_id: preset.mop_mode_entity, option: preset.mop_mode });
    if (preset.mop_intensity && preset.mop_intensity_entity)
      await this._svc("select", "select_option", { entity_id: preset.mop_intensity_entity, option: preset.mop_intensity });
    if (preset.water && preset.water_entity)
      await this._svc("select", "select_option", { entity_id: preset.water_entity, option: preset.water });
  }

  private async _clean(vac: VacuumCardConfig, regions: RegionConfig[], preset?: CleanPreset): Promise<void> {
    const strategy = vac.clean_strategy ?? "area";
    const repeat = preset?.repeats ?? 1;
    if (strategy === "script" && vac.clean_script) {
      await this._svc("script", "turn_on", {}, { entity_id: vac.clean_script });
      return;
    }
    if (strategy === "segment") {
      const segments = regions.map((r) => r.segment_id).filter((n): n is number => typeof n === "number");
      if (!segments.length) return;
      await this._svc("vacuum", "send_command", {
        entity_id: vac.entity,
        command: "app_segment_clean",
        params: [{ segments, repeat }],
      });
      return;
    }
    const areaIds = regions.map((r) => r.area_id ?? r.id);
    if (!areaIds.length) return;
    await this._svc("vacuum", "clean_area", { cleaning_area_id: areaIds }, { entity_id: vac.entity });
  }

  private async _startClean(vac: VacuumCardConfig): Promise<void> {
    const regions = (vac.regions ?? []).filter((r) => this._selectedIds(vac).includes(r.id));
    const preset = this._currentPreset(vac);
    await this._applyPreset(vac, preset);
    if (regions.length) await this._clean(vac, regions, preset);
    else await this._svc("vacuum", "start", {}, { entity_id: vac.entity });
  }
  private _pause(vac: VacuumCardConfig) { void this._svc("vacuum", "pause", {}, { entity_id: vac.entity }); }
  private _resume(vac: VacuumCardConfig) { void this._svc("vacuum", "start", {}, { entity_id: vac.entity }); }
  private _dock(vac: VacuumCardConfig) { void this._svc("vacuum", "return_to_base", {}, { entity_id: vac.entity }); }
  private _locate(vac: VacuumCardConfig) { void this._svc("vacuum", "locate", {}, { entity_id: vac.entity }); }

  // ── derived state ─────────────────────────────────────────────────────────

  private _statusInfo(vac: VacuumCardConfig): [string, string] {
    const ent = vac.status_entity ?? vac.entity;
    const s = this.hass?.states[ent]?.state ?? "unknown";
    const m = STATUS_MAP[s];
    return m ? [m[0], m[1]] : [s, ACCENT];
  }
  private _isCleaning(vac: VacuumCardConfig): boolean {
    return normalizeActivity(this.hass?.states[vac.entity]?.state ?? "") === "cleaning";
  }
  private _isPaused(vac: VacuumCardConfig): boolean {
    return (this.hass?.states[vac.entity]?.state ?? "") === "paused";
  }
  private _battery(vac: VacuumCardConfig): number | null {
    if (vac.battery_entity) {
      const v = Number(this.hass?.states[vac.battery_entity]?.state);
      return isNaN(v) ? null : v;
    }
    const lvl = this.hass?.states[vac.entity]?.attributes["battery_level"];
    const n = Number(lvl);
    return lvl != null && lvl !== "" && !isNaN(n) ? n : null;
  }
  private _batColor(b: number): string {
    if (b <= 20) return "#ff4d4f";
    if (b <= 50) return "#faad14";
    return "#52c41a";
  }
  private _batIcon(b: number): string {
    const r = Math.round(b / 10) * 10;
    if (r <= 0) return "mdi:battery-outline";
    if (r >= 100) return "mdi:battery";
    return `mdi:battery-${r}`;
  }
  private _currentRoom(vac: VacuumCardConfig): string | null {
    if (!vac.current_room_entity) return null;
    const s = this.hass?.states[vac.current_room_entity]?.state;
    return s && s !== "unknown" && s !== "unavailable" ? s : null;
  }
  private _error(vac: VacuumCardConfig): string | null {
    if (!vac.error_entity) return null;
    const s = this.hass?.states[vac.error_entity]?.state;
    return s && !["none", "unknown", "unavailable", ""].includes(s) ? s : null;
  }
  private _progress(vac: VacuumCardConfig): number | null {
    if (!vac.progress_entity) return null;
    const v = Number(this.hass?.states[vac.progress_entity]?.state);
    return isNaN(v) ? null : Math.max(0, Math.min(100, v));
  }
  private _imageBaseSrc(vac: VacuumCardConfig): string | undefined {
    return vac.image_base?.src;
  }
  private _mapUrl(vac: VacuumCardConfig): string | undefined {
    const ms = vac.map_source;
    if (!ms) return undefined;
    const ep = this.hass?.states[ms.entity]?.attributes["entity_picture"];
    return typeof ep === "string" ? ep : undefined;
  }
  private _imgTransform(t?: ImageBaseConfig): string {
    const r = t?.rotation ?? 0, s = t?.scale ?? 100, ox = t?.offset_x ?? 0, oy = t?.offset_y ?? 0;
    return `translate(${ox}%, ${oy}%) rotate(${r}deg) scale(${s / 100})`;
  }
  private _mapStyle(ms?: MapSourceConfig): Record<string, string> {
    const r = ms?.rotation ?? 0, s = ms?.scale ?? 100, ox = ms?.offset_x ?? 0, oy = ms?.offset_y ?? 0;
    return {
      left: 50 + ox + "%",
      top: 50 + oy + "%",
      width: s + "%",
      transform: `translate(-50%, -50%) rotate(${r}deg)`,
    };
  }

  // ── render ────────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const vacuums = this._config.vacuums ?? [];
    if (!vacuums.length) {
      return html`<ha-card><div class="empty">${CARD_NAME}: add a vacuum in the editor.</div></ha-card>`;
    }
    const shownIdx = Math.min(this._shown, vacuums.length - 1);
    const vac = vacuums[shownIdx];
    return html`
      <ha-card>
        ${vacuums.length > 1
          ? html`<div class="badges-row">${vacuums.map((v, i) => this._renderBadge(v, i, shownIdx))}</div>`
          : nothing}
        ${this._renderBase(vac)}
        ${this._renderStatusCard(vac, shownIdx)}
      </ha-card>
    `;
  }

  private _renderBadge(vac: VacuumCardConfig, i: number, shownIdx: number) {
    const active = i === shownIdx;
    const cleaning = this._isCleaning(vac);
    const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
    const bg = cleaning ? ACCENT_BG_ACTIVE : active ? ACCENT_BG : BADGE_BG;
    const border = cleaning
      ? `3px solid ${ACCENT}`
      : active
      ? `2px solid ${ACCENT}80`
      : "2px solid rgba(255,255,255,0.18)";
    const shadow = cleaning ? `0 0 18px ${ACCENT}B0` : active ? `0 0 8px ${ACCENT}50` : "none";
    return html`
      <button
        class="badge"
        style=${styleMap({ background: bg, border, boxShadow: shadow })}
        @click=${() => (this._shown = i)}
        aria-pressed=${active ? "true" : "false"}
        aria-label=${name}
      >
        ${vac.image
          ? html`<img class="badge-img" src=${vac.image} alt=${name} />`
          : html`<ha-icon class="badge-icon" icon="mdi:robot-vacuum" style=${styleMap({ color: ACCENT })}></ha-icon>`}
        <span class="badge-name" style=${styleMap({ color: active ? "white" : "rgba(255,255,255,0.55)" })}>${name}</span>
      </button>
    `;
  }

  private _renderBase(vac: VacuumCardConfig) {
    const base = vac.base ?? this._config?.base ?? "image";
    const imgSrc = this._imageBaseSrc(vac);
    const mapUrl = this._mapUrl(vac);
    const showImage = (base === "image" || base === "combined") && !!imgSrc;
    const showMap = (base === "map" || base === "combined") && !!mapUrl;
    if (!showImage && !showMap) {
      return html`<div class="map-wrap framed placeholder">
        <ha-icon icon="mdi:floor-plan"></ha-icon>
        <span>Set an image base or map source</span>
      </div>`;
    }
    const framed = !showImage;
    return html`
      <div class="map-wrap ${framed ? "framed" : ""}">
        ${showImage
          ? html`<img class="layer primary" src=${imgSrc as string} alt="floorplan"
              style=${styleMap({ transform: this._imgTransform(vac.image_base) })} />`
          : nothing}
        ${showMap
          ? html`<img class="layer map ${showImage ? "overlay" : "seat"}" src=${mapUrl as string} alt="vacuum map"
              style=${styleMap(this._mapStyle(vac.map_source))} />`
          : nothing}
        <div class="regions">${(vac.regions ?? []).map((r) => this._renderRegion(vac, r))}</div>
      </div>
    `;
  }

  private _renderRegion(vac: VacuumCardConfig, region: RegionConfig) {
    const selected = this._isRegionSelected(vac, region);
    const bn = this._config?.region_border_normal ?? 2;
    const bs = this._config?.region_border_selected ?? 4;
    const bw = (selected ? bs : bn) + "px";
    const bc = selected ? ACCENT : "rgba(255,255,255,0.5)";
    const iconHidden = this._config?.region_icon_hidden ?? false;
    const shape = region.shape;
    if (shape.kind === "rect") {
      return html`
        <button class="room-overlay" style=${styleMap({
            left: shape.x + "%", top: shape.y + "%", width: shape.w + "%", height: shape.h + "%",
            border: `${bw} solid ${bc}`,
            background: selected ? ACCENT + "44" : "rgba(0,0,0,0.04)",
            boxShadow: selected ? `0 0 16px ${ACCENT}60` : "none",
          })}
          @click=${() => this._toggleRegion(vac, region)} title=${region.name}
          aria-pressed=${selected ? "true" : "false"}>
          ${!iconHidden && region.icon
            ? html`<ha-icon icon=${region.icon} style=${styleMap({ color: selected ? "#fff" : bc })}></ha-icon>`
            : nothing}
        </button>
      `;
    }
    return html`
      <button class="room-btn" style=${styleMap({
          left: shape.x + "%", top: shape.y + "%",
          border: `${bw} solid ${bc}`,
          background: selected ? ACCENT + "cc" : "rgba(0,0,0,0.55)",
          boxShadow: selected ? `0 0 12px ${ACCENT}80` : "none",
        })}
        @click=${() => this._toggleRegion(vac, region)} title=${region.name}
        aria-pressed=${selected ? "true" : "false"}>
        ${!iconHidden ? html`<ha-icon icon=${region.icon ?? "mdi:map-marker"}></ha-icon>` : nothing}
      </button>
    `;
  }

  private _renderStatusCard(vac: VacuumCardConfig, idx: number) {
    const cleaning = this._isCleaning(vac);
    const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
    const cardBorder = cleaning ? `2px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.08)";
    const cardShadow = cleaning ? `0 0 22px ${ACCENT}40` : "none";
    const imgFilter = cleaning ? `drop-shadow(0 0 20px ${ACCENT}D8)` : `drop-shadow(0 4px 12px ${ACCENT}33)`;
    return html`
      <div class="status-card" style=${styleMap({ border: cardBorder, boxShadow: cardShadow })}>
        <div class="status-left" @click=${() => this._fireMoreInfo(vac.entity)} title="Open ${name}">
          <div class="model-label">${name}</div>
          ${vac.image
            ? html`<img class="vac-img" src=${vac.image} alt=${name}
                style=${styleMap({ opacity: cleaning ? "0.9" : "0.6", filter: imgFilter })} />`
            : html`<ha-icon class="vac-icon" icon="mdi:robot-vacuum"
                style=${styleMap({ color: ACCENT, opacity: cleaning ? "0.9" : "0.5" })}></ha-icon>`}
        </div>
        <div class="status-right">
          ${this._renderStatusRow(vac)}
          ${this._renderProgress(vac)}
          ${this._renderPresets(vac)}
          ${this._renderActions(vac, idx)}
        </div>
      </div>
    `;
  }

  private _fireMoreInfo(entity: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true }),
    );
  }

  private _renderStatusRow(vac: VacuumCardConfig) {
    const [label, labelColor] = this._statusInfo(vac);
    const bat = this._battery(vac);
    const room = this._currentRoom(vac);
    const err = this._error(vac);
    return html`
      ${err
        ? html`<div class="error-row">
            <ha-icon icon="mdi:alert-circle" style="color:#ff4d4f"></ha-icon>
            <span style="color:#ff4d4f;font-size:12px;font-weight:600">${err}</span>
          </div>`
        : nothing}
      <div class="status-row">
        <div class="status-main">
          <span class="status-label" style=${styleMap({ color: labelColor })}>${label}</span>
          ${room
            ? html`<span class="current-room">
                <ha-icon icon="mdi:map-marker" style="--mdc-icon-size:13px;color:rgba(255,255,255,0.4)"></ha-icon>${room}
              </span>`
            : nothing}
        </div>
        <div class="status-meta">
          ${bat !== null
            ? html`<div class="battery">
                <span style=${styleMap({ color: this._batColor(bat) })}>${bat}&thinsp;%</span>
                <ha-icon icon=${this._batIcon(bat)} style=${styleMap({ color: this._batColor(bat) })}></ha-icon>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderProgress(vac: VacuumCardConfig) {
    const prog = this._progress(vac);
    if (prog === null) return nothing;
    return html`
      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill" style=${styleMap({ width: prog + "%", background: ACCENT })}></div>
        </div>
        <span class="progress-label" style=${styleMap({ color: ACCENT })}>${prog}&thinsp;%</span>
      </div>
    `;
  }

  private _renderPresets(vac: VacuumCardConfig) {
    const ps = vac.presets ?? [];
    if (!ps.length) return nothing;
    const activeId = this._activePresetId(vac);
    return html`
      <div class="presets">
        ${ps.map((p) => {
          const on = p.id === activeId;
          const col = p.color ?? ACCENT;
          return html`
            <button class="chip ${on ? "active" : ""}"
              style=${on ? styleMap({ borderColor: col, color: "#fff", background: col + "33" }) : nothing}
              @click=${() => this._setPreset(vac, p.id)} title=${p.name}>
              ${p.icon ? html`<ha-icon icon=${p.icon}></ha-icon>` : nothing}<span>${p.name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderActions(vac: VacuumCardConfig, idx: number) {
    const holdMs = styleMap({ "--hold-ms": HOLD_DURATION_MS + "ms" });

    if (this._isPaused(vac)) {
      const hId = "resume-" + idx;
      return html`
        <div class="actions">
          <button class="action-btn ${this._holdId === hId ? "action-btn--holding" : ""}"
            style=${styleMap({ background: ACCENT_BG, border: `1px solid ${ACCENT}80`, "--hold-ms": HOLD_DURATION_MS + "ms" })}
            @pointerdown=${this._holdStart(hId, () => this._resume(vac))}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:play" style=${styleMap({ color: ACCENT })}></ha-icon><span>Resume</span>
          </button>
          <button class="action-btn action-btn--secondary" @click=${() => this._dock(vac)}>
            <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon><span>Dock</span>
          </button>
        </div>
      `;
    }

    if (this._isCleaning(vac)) {
      const hId = "pause-" + idx;
      return html`
        <div class="actions">
          <button class="action-btn action-btn--warn ${this._holdId === hId ? "action-btn--holding" : ""}"
            style=${holdMs}
            @pointerdown=${this._holdStart(hId, () => this._pause(vac))}
            @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
            <div class="hold-ring"></div>
            <ha-icon icon="mdi:pause" style="color:#faad14"></ha-icon><span>Pause</span>
          </button>
          <button class="action-btn action-btn--secondary" @click=${() => this._dock(vac)}>
            <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon><span>Dock</span>
          </button>
        </div>
      `;
    }

    // idle / docked
    const hId = "start-" + idx;
    const regions = vac.regions ?? [];
    const hasRegions = regions.length > 0;
    const hasSel = this._hasSelection(vac);
    const enabled = hasRegions ? hasSel : true;
    const startBg = enabled ? ACCENT_BG : "rgba(60,60,60,0.4)";
    const startBorder = enabled ? `1px solid ${ACCENT}80` : "1px solid rgba(255,255,255,0.1)";
    const startIconColor = enabled ? ACCENT : "rgba(255,255,255,0.2)";
    const startTextColor = enabled ? "white" : "rgba(255,255,255,0.25)";

    return html`
      <div class="actions">
        <button class="action-btn ${enabled && this._holdId === hId ? "action-btn--holding" : ""}"
          style=${styleMap({ background: startBg, border: startBorder, "--hold-ms": HOLD_DURATION_MS + "ms" })}
          ?disabled=${!enabled}
          @pointerdown=${enabled ? this._holdStart(hId, () => this._startClean(vac)) : nothing}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:rocket-launch" style=${styleMap({ color: startIconColor })}></ha-icon>
          <div class="start-body">
            <span style=${styleMap({ color: startTextColor })}>START</span>
            ${hasRegions
              ? html`<div class="room-icons">
                  ${regions.map((r) => html`<ha-icon icon=${r.icon || "mdi:square"}
                    style=${styleMap({ color: this._isRegionSelected(vac, r) ? ACCENT : "rgba(255,255,255,0.15)" })}></ha-icon>`)}
                </div>`
              : nothing}
            ${regions.length > 1
              ? html`<div class="sel-all-row">
                  <button class="sel-link" @click=${(e: Event) => { e.stopPropagation(); this._selectAll(vac); }}>all</button>
                  <span style="color:rgba(255,255,255,0.2)">·</span>
                  <button class="sel-link" @click=${(e: Event) => { e.stopPropagation(); this._clearSel(vac); }}>none</button>
                </div>`
              : nothing}
          </div>
        </button>
        <button class="action-btn action-btn--secondary" @click=${() => this._locate(vac)} title="Locate">
          <ha-icon icon="mdi:map-marker" style="color:rgba(64,169,255,0.6)"></ha-icon>
        </button>
        <button class="action-btn action-btn--secondary" @click=${() => this._dock(vac)} title="Dock">
          <ha-icon icon="mdi:home" style="color:rgba(64,169,255,0.6)"></ha-icon>
        </button>
      </div>
    `;
  }

  static styles = css`
    :host { --hold-ms: 500ms; }
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
    .empty { padding: 24px; text-align: center; opacity: 0.7; }

    /* ── Badges ─────────────────────────────────────────────────────────── */
    .badges-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .badge {
      position: relative; overflow: hidden; display: flex; align-items: center; gap: 10px;
      padding: 6px 18px 6px 6px; border-radius: 99px; cursor: pointer;
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      transition: background 0.3s, border 0.3s, box-shadow 0.3s;
    }
    .badge-img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .badge-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
    .badge-name { font-size: 15px; font-weight: 700; white-space: nowrap; transition: color 0.3s; }

    /* ── Map / base ─────────────────────────────────────────────────────── */
    .map-wrap {
      position: relative; width: 100%; overflow: hidden; border-radius: 12px;
      background: rgba(127,127,127,0.06);
    }
    .map-wrap.framed { padding-top: 60%; }
    .map-wrap.placeholder {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 6px; opacity: 0.55;
    }
    .map-wrap.placeholder.framed { padding-top: 0; min-height: 150px; }
    .map-wrap.placeholder ha-icon { --mdc-icon-size: 40px; }
    .layer { transform-origin: center center; }
    .layer.primary { position: relative; display: block; width: 100%; height: auto; }
    .layer.map { position: absolute; }
    .layer.map.overlay { opacity: 0.55; pointer-events: none; }
    .regions { position: absolute; inset: 0; }

    .room-overlay {
      position: absolute; border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; padding: 0;
      transition: background 0.2s, border 0.3s, box-shadow 0.3s;
    }
    .room-overlay ha-icon { --mdc-icon-size: 18px; }
    .room-btn {
      position: absolute; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center; padding: 0;
      transform: translate(-50%, -50%);
      transition: background 0.2s, box-shadow 0.2s;
    }
    .room-btn ha-icon { --mdc-icon-size: 20px; color: #fff; }

    /* ── Status card ────────────────────────────────────────────────────── */
    .status-card {
      display: grid; grid-template-columns: 140px 1fr;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-radius: 20px; overflow: hidden;
      transition: border 0.4s, box-shadow 0.4s;
    }
    .status-left {
      display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
      padding: 6px 0 8px; cursor: pointer;
    }
    .model-label {
      font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,0.3);
      text-transform: uppercase; text-align: center;
    }
    .vac-img { width: 105%; object-fit: contain; display: block; transition: opacity 0.5s, filter 0.5s; }
    .vac-icon { --mdc-icon-size: 76px; margin-top: 10px; }
    .status-right { display: flex; flex-direction: column; gap: 4px; padding-top: 4px; }

    .status-row { display: flex; align-items: flex-start; justify-content: space-between; padding: 8px 12px 4px 16px; }
    .error-row { display: flex; align-items: center; gap: 6px; padding: 4px 12px 0 16px; animation: pulse-error 2s ease-in-out infinite; }
    @keyframes pulse-error { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
    .status-main { display: flex; flex-direction: column; gap: 2px; }
    .status-label { font-size: 20px; font-weight: 700; }
    .current-room { display: flex; align-items: center; gap: 3px; font-size: 11px; color: rgba(255,255,255,0.45); }
    .status-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
    .battery { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
    .battery ha-icon { --mdc-icon-size: 15px; }

    /* ── Progress ───────────────────────────────────────────────────────── */
    .progress { display: flex; align-items: center; gap: 8px; padding: 0 16px 4px; }
    .progress-track { flex: 1; height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
    .progress-label { font-size: 11px; font-weight: 600; flex-shrink: 0; }

    /* ── Presets ────────────────────────────────────────────────────────── */
    .presets { display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 12px 4px; }
    .chip {
      display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 600; cursor: pointer;
      transition: background 0.2s, border 0.2s, color 0.2s;
    }
    .chip ha-icon { --mdc-icon-size: 15px; }

    /* ── Hold ring ──────────────────────────────────────────────────────── */
    .hold-ring {
      position: absolute; inset: 0; border-radius: inherit; background: rgba(255,255,255,0.18);
      transform: scaleX(0); transform-origin: left; pointer-events: none; z-index: 0;
    }
    .action-btn--holding .hold-ring { animation: hold-fill var(--hold-ms) linear forwards; }
    @keyframes hold-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }

    /* ── Actions ────────────────────────────────────────────────────────── */
    .actions { display: flex; gap: 8px; padding: 0 12px 14px; }
    .action-btn {
      position: relative; overflow: hidden; flex: 1;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 10px 14px; border-radius: 14px; cursor: pointer; transition: opacity 0.2s;
      font-family: inherit; background: rgba(127,127,127,0.14); border: 1px solid rgba(255,255,255,0.08);
    }
    .action-btn:disabled { cursor: default; opacity: 0.7; }
    .action-btn ha-icon { --mdc-icon-size: 22px; flex-shrink: 0; position: relative; z-index: 1; }
    .action-btn span { font-size: 14px; font-weight: 700; color: white; position: relative; z-index: 1; }
    .action-btn--secondary { flex: 0 0 auto; background: rgba(64,169,255,0.08); border: 1px solid rgba(64,169,255,0.2); }
    .action-btn--warn { background: rgba(250,173,20,0.18); border: 1px solid rgba(250,173,20,0.5); }

    .start-body { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; position: relative; z-index: 1; }
    .sel-all-row { display: flex; align-items: center; gap: 4px; margin-top: 1px; }
    .sel-link {
      background: none; border: none; cursor: pointer; padding: 0; font-size: 10px; font-family: inherit;
      color: rgba(255,255,255,0.3); transition: color .15s;
    }
    .sel-link:hover { color: rgba(255,255,255,0.7); }
    .room-icons { display: flex; align-items: center; gap: 4px; margin-top: 1px; }
    .room-icons ha-icon { --mdc-icon-size: 14px; }
  `;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: CARD_NAME,
    description: CARD_DESCRIPTION,
    preview: true,
    documentationURL: "https://github.com/Michailjovic/anyvac-card",
  });
}
