import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { EDITOR_TAG, CARD_VERSION } from "./const";
import type {
  HomeAssistant,
  AnyVacCardConfig,
  VacuumCardConfig,
  RegionConfig,
  RegionShape,
  CleanPreset,
  BaseLayerKind,
  CleanStrategy,
  MapSourceKind,
} from "./types";

type Tab = "vacuums" | "map" | "presets" | "global";

@customElement(EDITOR_TAG)
export class AnyVacCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: AnyVacCardConfig;
  @state() private _tab: Tab = "vacuums";
  @state() private _vacIndex = 0;

  public setConfig(config: AnyVacCardConfig): void {
    this._config = config;
  }

  // ── config mutation ─────────────────────────────────────────────────────────

  private _emit(config: AnyVacCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }),
    );
  }

  private _update(patch: Partial<AnyVacCardConfig>): void {
    this._emit({ ...(this._config as AnyVacCardConfig), ...patch });
  }

  private _vacs(): VacuumCardConfig[] {
    return this._config?.vacuums ?? [];
  }

  private _cfgVac(i: number): VacuumCardConfig {
    return this._vacs()[i];
  }

  private _updateVac(i: number, patch: Partial<VacuumCardConfig>): void {
    const vacs = [...this._vacs()];
    vacs[i] = { ...vacs[i], ...patch };
    this._update({ vacuums: vacs });
  }

  private _addVac(): void {
    const vacs = [...this._vacs(), { entity: "" } as VacuumCardConfig];
    this._update({ vacuums: vacs });
    this._vacIndex = vacs.length - 1;
  }

  private _removeVac(i: number): void {
    const vacs = [...this._vacs()];
    vacs.splice(i, 1);
    this._update({ vacuums: vacs });
    if (this._vacIndex >= vacs.length) this._vacIndex = Math.max(0, vacs.length - 1);
  }

  private _updateMapSource(i: number, patch: Record<string, unknown>): void {
    const v = this._cfgVac(i);
    const ms = { kind: "roborock_image" as MapSourceKind, entity: "", ...(v.map_source ?? {}), ...patch };
    this._updateVac(i, { map_source: ms });
  }

  private _updateImageBase(i: number, patch: Record<string, unknown>): void {
    const v = this._cfgVac(i);
    const ib = { src: "", ...(v.image_base ?? {}), ...patch };
    this._updateVac(i, { image_base: ib });
  }

  // regions
  private _regions(vi: number): RegionConfig[] {
    return this._cfgVac(vi)?.regions ?? [];
  }
  private _updateRegion(vi: number, ri: number, patch: Partial<RegionConfig>): void {
    const regs = [...this._regions(vi)];
    regs[ri] = { ...regs[ri], ...patch };
    this._updateVac(vi, { regions: regs });
  }
  private _setShapeKind(vi: number, ri: number, kind: "rect" | "point"): void {
    const cur = this._regions(vi)[ri].shape;
    const shape: RegionShape =
      kind === "rect"
        ? { kind: "rect", x: cur.x, y: cur.y, w: cur.kind === "rect" ? cur.w : 20, h: cur.kind === "rect" ? cur.h : 20 }
        : { kind: "point", x: cur.x, y: cur.y };
    this._updateRegion(vi, ri, { shape });
  }
  private _setShapeCoord(vi: number, ri: number, key: "x" | "y" | "w" | "h", val: number): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sh: any = { ...this._regions(vi)[ri].shape };
    sh[key] = val;
    this._updateRegion(vi, ri, { shape: sh as RegionShape });
  }
  private _addRegion(vi: number): void {
    const regs = [...this._regions(vi)];
    const n = regs.length + 1;
    regs.push({ id: `room_${n}`, name: `Room ${n}`, shape: { kind: "rect", x: 10, y: 10, w: 25, h: 25 } });
    this._updateVac(vi, { regions: regs });
  }
  private _removeRegion(vi: number, ri: number): void {
    const regs = [...this._regions(vi)];
    regs.splice(ri, 1);
    this._updateVac(vi, { regions: regs });
  }

  // presets
  private _presets(vi: number): CleanPreset[] {
    return this._cfgVac(vi)?.presets ?? [];
  }
  private _updatePreset(vi: number, pi: number, patch: Partial<CleanPreset>): void {
    const ps = [...this._presets(vi)];
    ps[pi] = { ...ps[pi], ...patch };
    this._updateVac(vi, { presets: ps });
  }
  private _addPreset(vi: number): void {
    const ps = [...this._presets(vi)];
    const n = ps.length + 1;
    ps.push({ id: `preset_${n}`, name: `Preset ${n}`, default: ps.length === 0 });
    this._updateVac(vi, { presets: ps });
  }
  private _removePreset(vi: number, pi: number): void {
    const ps = [...this._presets(vi)];
    ps.splice(pi, 1);
    this._updateVac(vi, { presets: ps });
  }

  // ── input helpers ───────────────────────────────────────────────────────────

  private _val(e: Event): string {
    return (e.target as HTMLInputElement | HTMLSelectElement).value;
  }
  private _checked(e: Event): boolean {
    return (e.target as HTMLInputElement).checked;
  }
  private _num(e: Event): number {
    const n = Number((e.target as HTMLInputElement).value);
    return isNaN(n) ? 0 : n;
  }

  // ── render ──────────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config) return nothing;
    return html`
      <div class="editor">
        <div class="tabs">
          ${(["vacuums", "map", "presets", "global"] as Tab[]).map(
            (t) => html`<button class="tab ${this._tab === t ? "on" : ""}" @click=${() => (this._tab = t)}>${t}</button>`,
          )}
          <span class="ver">v${CARD_VERSION}</span>
        </div>
        ${this._tab === "vacuums" ? this._renderVacuums() : nothing}
        ${this._tab === "map" ? this._renderMap() : nothing}
        ${this._tab === "presets" ? this._renderPresets() : nothing}
        ${this._tab === "global" ? this._renderGlobal() : nothing}
      </div>
    `;
  }

  private _vacPicker() {
    const vacs = this._vacs();
    if (vacs.length <= 1) return nothing;
    return html`
      <label class="row">
        <span>Vacuum</span>
        <select @change=${(e: Event) => (this._vacIndex = Number(this._val(e)))}>
          ${vacs.map((v, i) => html`<option value=${i} ?selected=${i === this._vacIndex}>${v.name ?? v.entity}</option>`)}
        </select>
      </label>
    `;
  }

  private _renderVacuums() {
    const vacs = this._vacs();
    return html`
      ${vacs.map(
        (v, i) => html`
          <div class="block">
            <div class="block-head">
              <strong>${v.name ?? (v.entity || `Vacuum ${i + 1}`)}</strong>
              <button class="mini danger" @click=${() => this._removeVac(i)}>Remove</button>
            </div>
            <label class="row"><span>Entity</span>
              <input type="text" .value=${v.entity ?? ""} placeholder="vacuum.s8"
                @input=${(e: Event) => this._updateVac(i, { entity: this._val(e) })} /></label>
            <label class="row"><span>Name</span>
              <input type="text" .value=${v.name ?? ""}
                @input=${(e: Event) => this._updateVac(i, { name: this._val(e) })} /></label>
            <label class="row"><span>Base</span>
              <select @change=${(e: Event) => this._updateVac(i, { base: this._val(e) as BaseLayerKind })}>
                ${(["image", "map", "combined"] as BaseLayerKind[]).map(
                  (b) => html`<option value=${b} ?selected=${(v.base ?? "image") === b}>${b}</option>`,
                )}
              </select></label>
            <label class="row"><span>Image src</span>
              <input type="text" .value=${v.image_base?.src ?? ""} placeholder="/local/anyvac/flat.svg"
                @input=${(e: Event) => this._updateImageBase(i, { src: this._val(e) })} /></label>
            <label class="row"><span>Map entity</span>
              <input type="text" .value=${v.map_source?.entity ?? ""} placeholder="camera.s8_map"
                @input=${(e: Event) => this._updateMapSource(i, { entity: this._val(e) })} /></label>
            <label class="row"><span>Map kind</span>
              <select @change=${(e: Event) => this._updateMapSource(i, { kind: this._val(e) as MapSourceKind })}>
                ${(["roborock_image", "camera", "image_entity", "cloud_extractor", "valetudo"] as MapSourceKind[]).map(
                  (k) => html`<option value=${k} ?selected=${(v.map_source?.kind ?? "roborock_image") === k}>${k}</option>`,
                )}
              </select></label>
            <label class="row"><span>Clean strategy</span>
              <select @change=${(e: Event) => this._updateVac(i, { clean_strategy: this._val(e) as CleanStrategy })}>
                ${(["area", "segment", "script"] as CleanStrategy[]).map(
                  (s) => html`<option value=${s} ?selected=${(v.clean_strategy ?? "area") === s}>${s}</option>`,
                )}
              </select></label>
            ${(v.clean_strategy ?? "area") === "script"
              ? html`<label class="row"><span>Clean script</span>
                  <input type="text" .value=${v.clean_script ?? ""} placeholder="script.clean_s8"
                    @input=${(e: Event) => this._updateVac(i, { clean_script: this._val(e) })} /></label>`
              : nothing}
          </div>
        `,
      )}
      <button class="add" @click=${() => this._addVac()}>+ Add vacuum</button>
    `;
  }

  private _renderMap() {
    if (!this._vacs().length) return html`<p class="hint">Add a vacuum first.</p>`;
    const vi = this._vacIndex;
    const ms = this._cfgVac(vi)?.map_source;
    const regs = this._regions(vi);
    return html`
      ${this._vacPicker()}
      <div class="block">
        <div class="block-head"><strong>Map transform — rotate &amp; seat</strong></div>
        <p class="hint">Live preview on the right updates as you change these.</p>
        <div class="grid4">
          <label><span>rotation°</span><input type="number" .value=${String(ms?.rotation ?? 0)}
            @input=${(e: Event) => this._updateMapSource(vi, { rotation: this._num(e) })} /></label>
          <label><span>scale %</span><input type="number" .value=${String(ms?.scale ?? 100)}
            @input=${(e: Event) => this._updateMapSource(vi, { scale: this._num(e) })} /></label>
          <label><span>offset x %</span><input type="number" .value=${String(ms?.offset_x ?? 0)}
            @input=${(e: Event) => this._updateMapSource(vi, { offset_x: this._num(e) })} /></label>
          <label><span>offset y %</span><input type="number" .value=${String(ms?.offset_y ?? 0)}
            @input=${(e: Event) => this._updateMapSource(vi, { offset_y: this._num(e) })} /></label>
        </div>
      </div>
      <p class="hint">Place clickable rooms on the base (percent of width/height). Map each to a HA Area for calibration-free cleaning.</p>
      ${regs.map(
        (r, ri) => html`
          <div class="block">
            <div class="block-head">
              <strong>${r.name || r.id}</strong>
              <button class="mini danger" @click=${() => this._removeRegion(vi, ri)}>Remove</button>
            </div>
            <label class="row"><span>Id</span>
              <input type="text" .value=${r.id}
                @input=${(e: Event) => this._updateRegion(vi, ri, { id: this._val(e) })} /></label>
            <label class="row"><span>Name</span>
              <input type="text" .value=${r.name}
                @input=${(e: Event) => this._updateRegion(vi, ri, { name: this._val(e) })} /></label>
            <label class="row"><span>HA Area id</span>
              <input type="text" .value=${r.area_id ?? ""} placeholder="kitchen"
                @input=${(e: Event) => this._updateRegion(vi, ri, { area_id: this._val(e) })} /></label>
            <label class="row"><span>Segment id</span>
              <input type="number" .value=${r.segment_id ?? ""} placeholder="(fallback)"
                @input=${(e: Event) => this._updateRegion(vi, ri, { segment_id: this._num(e) })} /></label>
            <label class="row"><span>Icon</span>
              <input type="text" .value=${r.icon ?? ""} placeholder="mdi:silverware-fork-knife"
                @input=${(e: Event) => this._updateRegion(vi, ri, { icon: this._val(e) })} /></label>
            <label class="row"><span>Shape</span>
              <select @change=${(e: Event) => this._setShapeKind(vi, ri, this._val(e) as "rect" | "point")}>
                <option value="rect" ?selected=${r.shape.kind === "rect"}>rect</option>
                <option value="point" ?selected=${r.shape.kind === "point"}>point</option>
              </select></label>
            <div class="grid4">
              <label><span>x%</span><input type="number" .value=${String(r.shape.x)}
                @input=${(e: Event) => this._setShapeCoord(vi, ri, "x", this._num(e))} /></label>
              <label><span>y%</span><input type="number" .value=${String(r.shape.y)}
                @input=${(e: Event) => this._setShapeCoord(vi, ri, "y", this._num(e))} /></label>
              ${r.shape.kind === "rect"
                ? html`
                    <label><span>w%</span><input type="number" .value=${String(r.shape.w)}
                      @input=${(e: Event) => this._setShapeCoord(vi, ri, "w", this._num(e))} /></label>
                    <label><span>h%</span><input type="number" .value=${String(r.shape.h)}
                      @input=${(e: Event) => this._setShapeCoord(vi, ri, "h", this._num(e))} /></label>
                  `
                : nothing}
            </div>
          </div>
        `,
      )}
      <button class="add" @click=${() => this._addRegion(vi)}>+ Add room</button>
    `;
  }

  private _renderPresets() {
    if (!this._vacs().length) return html`<p class="hint">Add a vacuum first.</p>`;
    const vi = this._vacIndex;
    const ps = this._presets(vi);
    return html`
      ${this._vacPicker()}
      <p class="hint">1–3 presets per vacuum. "How" to clean, prepared once. Mark one as default.</p>
      ${ps.map(
        (p, pi) => html`
          <div class="block">
            <div class="block-head">
              <strong>${p.name || p.id}</strong>
              <button class="mini danger" @click=${() => this._removePreset(vi, pi)}>Remove</button>
            </div>
            <label class="row"><span>Name</span>
              <input type="text" .value=${p.name}
                @input=${(e: Event) => this._updatePreset(vi, pi, { name: this._val(e) })} /></label>
            <label class="row"><span>Icon</span>
              <input type="text" .value=${p.icon ?? ""} placeholder="mdi:water"
                @input=${(e: Event) => this._updatePreset(vi, pi, { icon: this._val(e) })} /></label>
            <label class="row"><span>Suction (fan_speed)</span>
              <input type="text" .value=${p.suction ?? ""} placeholder="max"
                @input=${(e: Event) => this._updatePreset(vi, pi, { suction: this._val(e) })} /></label>
            <label class="row"><span>Mop mode</span>
              <input type="text" .value=${p.mop_mode ?? ""}
                @input=${(e: Event) => this._updatePreset(vi, pi, { mop_mode: this._val(e) })} /></label>
            <label class="row"><span>Mop mode entity</span>
              <input type="text" .value=${p.mop_mode_entity ?? ""} placeholder="select.s8_mop_mode"
                @input=${(e: Event) => this._updatePreset(vi, pi, { mop_mode_entity: this._val(e) })} /></label>
            <label class="row"><span>Water</span>
              <input type="text" .value=${p.water ?? ""}
                @input=${(e: Event) => this._updatePreset(vi, pi, { water: this._val(e) })} /></label>
            <label class="row"><span>Water entity</span>
              <input type="text" .value=${p.water_entity ?? ""} placeholder="select.s8_water"
                @input=${(e: Event) => this._updatePreset(vi, pi, { water_entity: this._val(e) })} /></label>
            <label class="row"><span>Repeats</span>
              <input type="number" min="1" .value=${String(p.repeats ?? 1)}
                @input=${(e: Event) => this._updatePreset(vi, pi, { repeats: this._num(e) })} /></label>
            <label class="row check"><span>Default</span>
              <input type="checkbox" .checked=${p.default ?? false}
                @change=${(e: Event) => this._updatePreset(vi, pi, { default: this._checked(e) })} /></label>
          </div>
        `,
      )}
      <button class="add" @click=${() => this._addPreset(vi)}>+ Add preset</button>
    `;
  }

  private _renderGlobal() {
    const c = this._config as AnyVacCardConfig;
    return html`
      <label class="row"><span>Region border (normal)</span>
        <input type="number" .value=${String(c.region_border_normal ?? 2)}
          @input=${(e: Event) => this._update({ region_border_normal: this._num(e) })} /></label>
      <label class="row"><span>Region border (selected)</span>
        <input type="number" .value=${String(c.region_border_selected ?? 4)}
          @input=${(e: Event) => this._update({ region_border_selected: this._num(e) })} /></label>
      <label class="row check"><span>Hide region icons</span>
        <input type="checkbox" .checked=${c.region_icon_hidden ?? false}
          @change=${(e: Event) => this._update({ region_icon_hidden: this._checked(e) })} /></label>
    `;
  }

  static styles = css`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 4px; }
    .tabs { display: flex; gap: 4px; align-items: center; border-bottom: 1px solid rgba(127,127,127,0.25); padding-bottom: 6px; }
    .tab { text-transform: capitalize; background: transparent; border: none; padding: 6px 10px; border-radius: 8px; cursor: pointer; font-weight: 600; color: inherit; opacity: 0.6; }
    .tab.on { opacity: 1; background: rgba(59,130,246,0.12); }
    .ver { margin-left: auto; font-size: 11px; opacity: 0.5; }
    .block { border: 1px solid rgba(127,127,127,0.22); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
    .block-head { display: flex; align-items: center; justify-content: space-between; }
    .row { display: flex; align-items: center; gap: 8px; }
    .row > span { flex: 0 0 130px; font-size: 13px; opacity: 0.85; }
    .row.check { justify-content: flex-start; }
    input, select { flex: 1 1 auto; padding: 6px 8px; border-radius: 7px; border: 1px solid rgba(127,127,127,0.35); background: var(--card-background-color, #fff); color: inherit; font: inherit; }
    input[type="checkbox"] { flex: 0 0 auto; }
    .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
    .grid4 label { display: flex; flex-direction: column; gap: 2px; font-size: 12px; }
    .grid4 span { opacity: 0.7; }
    .add { align-self: flex-start; padding: 7px 12px; border-radius: 8px; border: 1px dashed rgba(127,127,127,0.5); background: transparent; color: inherit; cursor: pointer; font-weight: 600; }
    .mini { padding: 3px 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; }
    .mini.danger { background: rgba(255,77,79,0.15); color: #ff4d4f; }
    .hint { margin: 0; font-size: 12px; opacity: 0.7; }
  `;
}
