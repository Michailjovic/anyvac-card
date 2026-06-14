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
  normalizeActivity,
} from "./const";
import type {
  HomeAssistant,
  AnyVacCardConfig,
  VacuumCardConfig,
  RegionConfig,
  CleanPreset,
} from "./types";

console.info(
  `%c ${CARD_NAME} %c v${CARD_VERSION} `,
  "color:#fff;background:#3b82f6;font-weight:700;border-radius:3px 0 0 3px;padding:2px 4px;",
  "color:#3b82f6;background:#0f172a;border-radius:0 3px 3px 0;padding:2px 4px;",
);

@customElement(CARD_TAG)
export class AnyVacCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: AnyVacCardConfig;
  /** entity_id -> selected region ids */
  @state() private _selected: Record<string, string[]> = {};
  /** entity_id -> active preset id */
  @state() private _preset: Record<string, string> = {};

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
    return 6;
  }

  // ── selection / preset state ───────────────────────────────────────────────

  private _selectedIds(vac: VacuumCardConfig): string[] {
    return this._selected[vac.entity] ?? [];
  }

  private _toggleRegion(vac: VacuumCardConfig, region: RegionConfig): void {
    const cur = new Set(this._selectedIds(vac));
    if (cur.has(region.id)) cur.delete(region.id);
    else cur.add(region.id);
    this._selected = { ...this._selected, [vac.entity]: [...cur] };
  }

  private _selectAll(vac: VacuumCardConfig): void {
    const ids = (vac.regions ?? []).map((r) => r.id);
    this._selected = { ...this._selected, [vac.entity]: ids };
  }

  private _clearSel(vac: VacuumCardConfig): void {
    this._selected = { ...this._selected, [vac.entity]: [] };
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
      const segments = regions
        .map((r) => r.segment_id)
        .filter((n): n is number => typeof n === "number");
      if (!segments.length) return;
      await this._svc("vacuum", "send_command", {
        entity_id: vac.entity,
        command: "app_segment_clean",
        params: [{ segments, repeat }],
      });
      return;
    }
    // "area" — native HA Areas, calibration-free (preferred)
    const areaIds = regions.map((r) => r.area_id ?? r.id);
    if (!areaIds.length) return;
    await this._svc("vacuum", "clean_area", { cleaning_area_id: areaIds }, { entity_id: vac.entity });
  }

  private async _start(vac: VacuumCardConfig): Promise<void> {
    const ids = this._selectedIds(vac);
    if (!ids.length) {
      await this._svc("vacuum", "start", {}, { entity_id: vac.entity });
      return;
    }
    const regions = (vac.regions ?? []).filter((r) => ids.includes(r.id));
    const preset = this._currentPreset(vac);
    await this._applyPreset(vac, preset);
    await this._clean(vac, regions, preset);
  }

  private _pause(vac: VacuumCardConfig) { void this._svc("vacuum", "pause", {}, { entity_id: vac.entity }); }
  private _stop(vac: VacuumCardConfig) { void this._svc("vacuum", "stop", {}, { entity_id: vac.entity }); }
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
    const s = this.hass?.states[vac.entity]?.state ?? "";
    return normalizeActivity(s) === "cleaning";
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
    const st = this.hass?.states[ms.entity];
    const ep = st?.attributes["entity_picture"];
    return typeof ep === "string" ? ep : undefined;
  }

  private _transform(t?: { rotation?: number; scale?: number }): string {
    const r = t?.rotation ?? 0;
    const s = t?.scale ?? 100;
    return `rotate(${r}deg) scale(${s / 100})`;
  }

  // ── render ────────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const vacuums = this._config.vacuums ?? [];
    return html`
      <ha-card>
        ${vacuums.length
          ? vacuums.map((v) => this._renderVacuum(v))
          : html`<div class="empty">${CARD_NAME}: add a vacuum in the editor.</div>`}
      </ha-card>
    `;
  }

  private _renderVacuum(vac: VacuumCardConfig) {
    const cleaning = this._isCleaning(vac);
    const name = vac.name ?? vac.entity.split(".")[1] ?? vac.entity;
    const border = cleaning ? `1px solid ${ACCENT}` : "1px solid rgba(127,127,127,0.18)";
    const shadow = cleaning ? `0 0 18px ${ACCENT}33` : "none";
    return html`
      <div class="vac" style=${styleMap({ border, boxShadow: shadow })}>
        <div class="vac-head">${name}</div>
        ${this._renderBase(vac)}
        ${this._renderPresets(vac)}
        ${this._renderStatus(vac)}
        ${this._renderActions(vac)}
      </div>
    `;
  }

  private _renderBase(vac: VacuumCardConfig) {
    const base = vac.base ?? this._config?.base ?? "image";
    const imgSrc = this._imageBaseSrc(vac);
    const mapUrl = this._mapUrl(vac);
    const showImage = (base === "image" || base === "combined") && !!imgSrc;
    const showMap = (base === "map" || base === "combined") && !!mapUrl;

    if (!showImage && !showMap) {
      return html`<div class="stage placeholder">
        <ha-icon icon="mdi:floor-plan"></ha-icon>
        <span>Set an image base or map source</span>
      </div>`;
    }

    const primaryIsImage = showImage;
    return html`
      <div class="stage">
        ${showImage
          ? html`<img
              class="layer ${primaryIsImage ? "primary" : "overlay"}"
              src=${imgSrc as string}
              alt="floorplan"
              style=${styleMap({ transform: this._transform(vac.image_base) })}
            />`
          : nothing}
        ${showMap
          ? html`<img
              class="layer ${primaryIsImage ? "overlay map" : "primary"}"
              src=${mapUrl as string}
              alt="vacuum map"
              style=${styleMap({ transform: this._transform(vac.map_source) })}
            />`
          : nothing}
        <div class="regions">
          ${(vac.regions ?? []).map((r) => this._renderRegion(vac, r))}
        </div>
      </div>
    `;
  }

  private _renderRegion(vac: VacuumCardConfig, region: RegionConfig) {
    const selected = this._selectedIds(vac).includes(region.id);
    const bn = this._config?.region_border_normal ?? 2;
    const bs = this._config?.region_border_selected ?? 4;
    const bw = (selected ? bs : bn) + "px";
    const bc = selected ? ACCENT : "rgba(255,255,255,0.5)";
    const iconHidden = this._config?.region_icon_hidden ?? false;
    const shape = region.shape;

    if (shape.kind === "rect") {
      return html`
        <button
          class="region rect"
          style=${styleMap({
            left: shape.x + "%",
            top: shape.y + "%",
            width: shape.w + "%",
            height: shape.h + "%",
            border: `${bw} solid ${bc}`,
            background: selected ? ACCENT + "44" : "rgba(0,0,0,0.04)",
          })}
          @click=${() => this._toggleRegion(vac, region)}
          title=${region.name}
          aria-pressed=${selected ? "true" : "false"}
        >
          ${!iconHidden && region.icon
            ? html`<ha-icon icon=${region.icon} style=${styleMap({ color: selected ? "#fff" : bc })}></ha-icon>`
            : nothing}
        </button>
      `;
    }
    return html`
      <button
        class="region point"
        style=${styleMap({
          left: shape.x + "%",
          top: shape.y + "%",
          border: `${bw} solid ${bc}`,
          background: selected ? ACCENT + "cc" : "rgba(0,0,0,0.5)",
        })}
        @click=${() => this._toggleRegion(vac, region)}
        title=${region.name}
        aria-pressed=${selected ? "true" : "false"}
      >
        ${!iconHidden
          ? html`<ha-icon icon=${region.icon ?? "mdi:map-marker"}></ha-icon>`
          : nothing}
      </button>
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
            <button
              class="chip ${on ? "active" : ""}"
              style=${on ? styleMap({ borderColor: col, color: col }) : nothing}
              @click=${() => this._setPreset(vac, p.id)}
              title=${p.name}
            >
              ${p.icon ? html`<ha-icon icon=${p.icon}></ha-icon>` : nothing}
              <span>${p.name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderStatus(vac: VacuumCardConfig) {
    const [label, color] = this._statusInfo(vac);
    const bat = this._battery(vac);
    const room = this._currentRoom(vac);
    const err = this._error(vac);
    const prog = this._progress(vac);
    return html`
      <div class="status">
        <div class="status-line">
          <span class="dot" style=${styleMap({ background: color })}></span>
          <span class="label" style=${styleMap({ color })}>${label}</span>
          ${bat != null
            ? html`<span class="bat"><ha-icon icon=${this._batIcon(bat)}></ha-icon>${bat}%</span>`
            : nothing}
        </div>
        ${room ? html`<div class="sub">Room: ${room}</div>` : nothing}
        ${err
          ? html`<div class="err"><ha-icon icon="mdi:alert-circle"></ha-icon><span>${err}</span></div>`
          : nothing}
        ${prog != null
          ? html`<div class="progress"><div class="fill" style=${styleMap({ width: prog + "%", background: color })}></div></div>`
          : nothing}
      </div>
    `;
  }

  private _renderActions(vac: VacuumCardConfig) {
    const selCount = this._selectedIds(vac).length;
    const hasRegions = (vac.regions ?? []).length > 0;
    const startLabel = selCount ? `Clean ${selCount} room${selCount > 1 ? "s" : ""}` : "Start";
    return html`
      <div class="actions">
        <button class="act primary" style=${styleMap({ background: ACCENT })} @click=${() => this._start(vac)}>
          <ha-icon icon="mdi:play"></ha-icon><span>${startLabel}</span>
        </button>
        <button class="act" @click=${() => this._pause(vac)} title="Pause"><ha-icon icon="mdi:pause"></ha-icon></button>
        <button class="act" @click=${() => this._stop(vac)} title="Stop"><ha-icon icon="mdi:stop"></ha-icon></button>
        <button class="act" @click=${() => this._dock(vac)} title="Dock"><ha-icon icon="mdi:home-import-outline"></ha-icon></button>
        <button class="act" @click=${() => this._locate(vac)} title="Locate"><ha-icon icon="mdi:map-marker"></ha-icon></button>
        ${hasRegions
          ? html`<button class="act ghost" @click=${() => (selCount ? this._clearSel(vac) : this._selectAll(vac))}>
              ${selCount ? "Clear" : "All"}
            </button>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    ha-card {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: transparent;
      border: none;
      box-shadow: none;
    }
    .empty {
      padding: 24px;
      text-align: center;
      opacity: 0.7;
    }
    .vac {
      border-radius: 14px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: border 0.3s, box-shadow 0.3s;
    }
    .vac-head {
      font-weight: 700;
      font-size: 1.05rem;
    }
    .stage {
      position: relative;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      background: rgba(127, 127, 127, 0.06);
    }
    .stage.placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 140px;
      opacity: 0.6;
    }
    .stage.placeholder ha-icon {
      --mdc-icon-size: 40px;
    }
    .layer {
      transform-origin: center center;
    }
    .layer.primary {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
    }
    .layer.overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .layer.overlay.map {
      opacity: 0.55;
      pointer-events: none;
    }
    .regions {
      position: absolute;
      inset: 0;
    }
    .region {
      position: absolute;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, border 0.2s, box-shadow 0.2s;
    }
    .region.rect {
      border-radius: 8px;
    }
    .region.point {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
    .region ha-icon {
      --mdc-icon-size: 18px;
      color: #fff;
    }
    .presets {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 10px;
      border-radius: 999px;
      border: 1px solid rgba(127, 127, 127, 0.4);
      background: rgba(127, 127, 127, 0.08);
      color: var(--primary-text-color, inherit);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .chip.active {
      background: rgba(59, 130, 246, 0.12);
      border-width: 2px;
    }
    .chip ha-icon {
      --mdc-icon-size: 16px;
    }
    .status {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .status-line {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .bat {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 13px;
      opacity: 0.85;
    }
    .bat ha-icon {
      --mdc-icon-size: 18px;
    }
    .sub {
      font-size: 12px;
      opacity: 0.7;
    }
    .err {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #ff4d4f;
      font-size: 12px;
      font-weight: 600;
    }
    .err ha-icon {
      --mdc-icon-size: 16px;
    }
    .progress {
      height: 5px;
      border-radius: 3px;
      background: rgba(127, 127, 127, 0.18);
      overflow: hidden;
    }
    .progress .fill {
      height: 100%;
      transition: width 0.4s;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }
    .act {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      height: 38px;
      min-width: 38px;
      padding: 0 10px;
      border: none;
      border-radius: 10px;
      background: rgba(127, 127, 127, 0.14);
      color: var(--primary-text-color, inherit);
      cursor: pointer;
      font-weight: 700;
      font-size: 14px;
    }
    .act.primary {
      color: #fff;
      flex: 1 1 auto;
    }
    .act.ghost {
      background: transparent;
      border: 1px solid rgba(127, 127, 127, 0.4);
      margin-left: auto;
    }
    .act ha-icon {
      --mdc-icon-size: 20px;
    }
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
