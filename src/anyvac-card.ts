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
  type SeatParams,
} from "./seatfit";
import {
  pickProfile,
  resolveProfile,
  gridRootStyles,
  regionStyles,
  type LayoutProfile,
  type LayoutConfig,
  type ProfileGridConfig,
} from "./layout";

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
  /** Frozen copy of `_zoneDrag` at drop time, in the same wrap-relative % — kept
   *  around purely so the drawn rectangle stays visible while `_zonePending` is
   *  awaiting a per-vacuum confirm (drag itself is cleared right away to fix the
   *  "won't let go" bug, but the box shouldn't just vanish on release). */
  @state() private _zoneRectShown: { x0: number; y0: number; x1: number; y1: number } | null = null;
  /** Pending zone(s) awaiting per-vacuum confirmation, keyed by entity_id (docs/19
   *  §Pin&Go/Zone fix). Legacy single-target flow (split mode / per-vacuum tools)
   *  only ever populates one key; the merged multi-candidate flow (meta bar) may
   *  populate several at once — the user confirms on whichever vacuum's own
   *  status card they want to execute it. */
  @state() private _zonePending: Record<string, { x1: number; y1: number; x2: number; y2: number }> | null = null;
  /** Whether the current `_zoneRectShown`/`_zonePending` capture is the merged
   *  multi-candidate flow (meta bar, "*") vs. the legacy single-target flow
   *  (per-vacuum tools / split mode). Set once at draw time so post-drop editing
   *  (move/resize, docs/19 follow-up) knows how to recompute `_zonePending`
   *  without depending on `_modeEntity`, which is already reset to null by then. */
  private _zoneMulti = false;
  /** Active move/resize drag on an already-drawn `_zoneRectShown`, distinct from
   *  `_zoneDrag` (drawing a brand new rectangle). `move` carries the grab offset
   *  from the box's top-left corner plus its fixed width/height; the corner
   *  variants just say which corner is being dragged. */
  @state() private _zoneEdit:
    | { type: "move"; offsetX: number; offsetY: number; width: number; height: number }
    | { type: "nw" | "ne" | "sw" | "se" }
    | null = null;
  /** Pending pin(s) awaiting per-vacuum confirmation, keyed by entity_id — same
   *  shape/reasoning as `_zonePending`, but for Pin & Go. */
  @state() private _pinPending: Record<string, { x: number; y: number }> | null = null;
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
  /** Active layout profile (docs/18) — picked by viewport aspect ratio. */
  @state() private _profile: LayoutProfile = "landscape";
  /** Measured inner box of the map region (grid mode) for the exact rotated fit. */
  @state() private _mapRegW = 0;
  @state() private _mapRegH = 0;
  /** Portrait only: the map's last computed fitted width (`_renderResponsive`),
   *  fed into `_refineGridColumns` to override the map/dock column split so the
   *  sidebar gets whatever width the height-fitted map doesn't need. Plain
   *  field (not @state) — read post-render in `updated()`, never drives a
   *  render itself. */
  private _lastPortraitFitW = 0;
  private _ro: ResizeObserver | null = null;
  private _onWinResize: (() => void) | null = null;
  private _measureRaf = 0;
  /** docs/21 §5a: `setTimeout` handle used instead of `_measureRaf` when the
   *  tab is backgrounded (`document.hidden`) — `requestAnimationFrame` never
   *  fires on an inactive tab (kiosk/wall-mounted tablets, `browser_mod`
   *  popups), so a card measure scheduled while hidden would otherwise hang
   *  forever. Only one of `_measureRaf`/`_measureTimer` is ever active. */
  private _measureTimer: number | null = null;
  /** docs/21 §5b/§5c: nearest `hui-panel-view` ancestor observer. HA
   *  reparents the card into `hui-card-options` on edit-mode toggle without
   *  firing any event, and the host's own box doesn't always change size
   *  when that happens — `ResizeObserver(this)` alone can miss it. `_warned`
   *  is a one-shot flag so a missing ancestor (internal HA DOM, not public
   *  API) logs once, not on every failed lookup. */
  private _panelViewMo: MutationObserver | null = null;
  private _panelViewWarned = false;
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
      window.addEventListener("orientationchange", this._onWinResize, { passive: true });
    }
    this._setupPanelViewObserver();
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

  /** Coalesce all width re-measures into one tick (RO + window resize +
   *  orientationchange + edit-mode reparenting, docs/21 §5b). Also re-picks
   *  the layout profile (docs/18) and refines the grid height.
   *
   *  docs/21 §5a: `requestAnimationFrame` never fires on a backgrounded tab
   *  (kiosk/wall-mounted tablets, `browser_mod` popups, a second window) —
   *  confirmed live, not just in theory. Fall back to `setTimeout(fn, 0)`
   *  while `document.hidden`, so a measure scheduled in the background still
   *  actually runs instead of hanging until the tab regains focus. */
  private _scheduleMeasure(): void {
    if (this._measureRaf || this._measureTimer !== null) return;
    const run = (): void => {
      this._measureRaf = 0;
      this._measureTimer = null;
      this._doMeasure();
    };
    if (typeof document !== "undefined" && document.hidden) {
      this._measureTimer = window.setTimeout(run, 0);
    } else {
      this._measureRaf = requestAnimationFrame(run);
    }
  }

  /** docs/21 §5f: pick the layout profile from the card's OWN measured box,
   *  not `window.innerWidth`/`innerHeight`. The card previously used the
   *  full browser viewport for this — correct only when the card happens to
   *  span the whole window. On any dashboard where it doesn't (two cards
   *  side by side, a sections/grid view, a sidebar, split-screen), the
   *  viewport's aspect ratio can disagree with the card's own box, picking
   *  the wrong profile regardless of how correct the profile's own grid math
   *  is. `_cardW` already tracks the real width (ResizeObserver on `this`);
   *  this adds the matching height side. */
  private _doMeasure(): void {
    const rect = this.getBoundingClientRect();
    const w = Math.round(rect.width);
    if (w && Math.abs(w - this._cardW) >= 2) this._cardW = w;
    const lay = this._config?.layout;
    if (lay) {
      const availW = this._cardW || w || window.innerWidth;
      const availH = this._availableHeight(lay, rect);
      const p = pickProfile(lay, availW, availH);
      if (p !== this._profile) this._profile = p;
      this._refineGridHeight();
    }
  }

  /** Available height for profile picking (docs/21 §5f) — mirrors the height
   *  mode `resolveHeightCss`/`_refineGridHeight` already use, just applied
   *  one tick earlier (profile choice happens before the grid root can be
   *  measured on first paint, so it can't read `.avc-grid` yet). `"container"`
   *  = the card's own rendered height (whatever its parent actually gave
   *  it). `"viewport"` (default) and any custom CSS length: window bottom
   *  minus the card's own top — the same technique `_refineGridHeight` uses
   *  for the grid height itself, so profile picking and final sizing agree. */
  private _availableHeight(lay: LayoutConfig, rect: DOMRect): number {
    if ((lay.height ?? "viewport") === "container") {
      return rect.height > 1 ? Math.round(rect.height) : window.innerHeight;
    }
    const top = rect.top;
    if (top >= 0 && top < window.innerHeight) {
      return Math.max(1, Math.round(window.innerHeight - top - this._editBarHeight()));
    }
    return window.innerHeight;
  }

  /** docs/21 §5b follow-up (2026-07-17, ported from a sibling project's
   *  battle-tested fix — room-overlay-card v5.0): HA's edit-mode "Move /
   *  Edit / Delete" actions bar renders as a REAL sibling inside
   *  `hui-card-options`' OWN shadow root — a separate shadow tree from both
   *  the card's own and `hui-panel-view`'s, and NOT an overlay. A card
   *  pinned to the full viewport height without reserving room for it gets
   *  its content pushed under/behind that bar. Measure the bar's REAL
   *  rendered height (never hardcoded — it isn't a constant across HA
   *  versions/themes) so callers can subtract exactly that much. Internal
   *  HA DOM, best-effort: any miss just returns 0 (today's behavior). */
  private _editBarHeight(): number {
    try {
      const opts = this._findCardOptionsAncestor();
      if (!opts?.shadowRoot) return 0;
      const bar = opts.shadowRoot.querySelector(".card-actions") as HTMLElement | null;
      if (!bar) return 0;
      const br = bar.getBoundingClientRect();
      if (!(br.height > 0)) return 0;
      const bcs = getComputedStyle(bar);
      return Math.ceil(br.height + (parseFloat(bcs.marginTop) || 0) + (parseFloat(bcs.marginBottom) || 0));
    } catch {
      return 0;
    }
  }

  /** docs/21 §5b, widened 2026-07-17: find the nearest `hui-panel-view` OR
   *  `hui-view` ancestor across shadow root boundaries (HA nests the card
   *  several shadow roots deep). Watching both, not just `hui-panel-view`,
   *  is a lesson learned the hard way in a sibling project — which HA
   *  dashboard/view type resolves to which tag varies, and a card that only
   *  ever checks one can silently never find its ancestor. Internal HA DOM,
   *  not public API — callers must degrade loudly (§5c), not assume it's
   *  always found. */
  private _findPanelViewAncestor(): Element | null {
    let node: Node | null = this.parentElement ?? (this.getRootNode() as ShadowRoot).host ?? null;
    let hops = 0;
    while (node && hops++ < 20) {
      if (node instanceof Element && (node.tagName === "HUI-PANEL-VIEW" || node.tagName === "HUI-VIEW")) return node;
      const el = node as Element;
      node = el.parentElement ?? (el.getRootNode() as ShadowRoot)?.host ?? null;
    }
    return null;
  }

  /** Nearest `hui-card-options` ancestor, if the card is currently wrapped
   *  in one (edit mode). Its actions bar lives in ITS OWN shadow root — a
   *  separate tree from `hui-panel-view`'s — so it needs to be watched
   *  (and re-found) independently; see `_setupPanelViewObserver`. */
  private _findCardOptionsAncestor(): Element | null {
    let node: Node | null = this.parentElement ?? (this.getRootNode() as ShadowRoot).host ?? null;
    let hops = 0;
    while (node && hops++ < 12) {
      if (node instanceof Element && node.tagName === "HUI-CARD-OPTIONS") return node;
      const el = node as Element;
      node = el.parentElement ?? (el.getRootNode() as ShadowRoot)?.host ?? null;
    }
    return null;
  }

  /** docs/21 §5b: HA reparents the card into `hui-card-options` on edit-mode
   *  toggle without firing any event, and the host's own box doesn't always
   *  change size when it happens — `ResizeObserver(this)` can miss it. Watch
   *  the nearest panel-view ancestor (and its shadow root, if any) for DOM
   *  mutations and force a remeasure on any change. `_scheduleMeasure` is
   *  itself coalesced, so an extra call here is cheap.
   *
   *  2026-07-17: also (re-)adopt `hui-card-options`' own shadow root on every
   *  mutation — its actions bar (whose height `_editBarHeight` reserves) is
   *  a separate shadow tree that can appear/change after the wrapper itself
   *  shows up, and re-observing an already-observed target is a cheap
   *  no-op, so this is safe to do unconditionally rather than only once. */
  private _setupPanelViewObserver(): void {
    if (this._panelViewMo || typeof MutationObserver === "undefined") return;
    const panelView = this._findPanelViewAncestor();
    if (!panelView) {
      if (!this._panelViewWarned) {
        this._panelViewWarned = true;
        try {
          console.warn(
            "[anyvac-card] hui-panel-view/hui-view ancestor not found (HA internal DOM may " +
            "have changed) — edit-mode layout refresh via MutationObserver is disabled; " +
            "resize-based refresh still works."
          );
        } catch { /* noop */ }
      }
      return;
    }
    const mo = new MutationObserver(() => {
      this._scheduleMeasure();
      const opts = this._findCardOptionsAncestor();
      if (opts?.shadowRoot) {
        try { mo.observe(opts.shadowRoot, { childList: true, subtree: true }); } catch { /* noop */ }
      }
    });
    try { mo.observe(panelView, { childList: true, subtree: true }); } catch { /* noop */ }
    if (panelView.shadowRoot) {
      try { mo.observe(panelView.shadowRoot, { childList: true, subtree: true }); } catch { /* noop */ }
    }
    const initialOpts = this._findCardOptionsAncestor();
    if (initialOpts?.shadowRoot) {
      try { mo.observe(initialOpts.shadowRoot, { childList: true, subtree: true }); } catch { /* noop */ }
    }
    this._panelViewMo = mo;
  }

  /** Measured refinement of the grid height: innerHeight − rootTop beats the raw
   *  `calc(100svh − header)` when the root is offset (padding, safe-area). Applied
   *  directly to the element on top of `gridRootStyles()`'s declarative fallback
   *  (see that function's doc comment re: the 0.59.0 mobile-crash revert — this
   *  layered approach, not sole JS ownership, is the confirmed-stable one).
   *  2026-07-17: also reserves room for the edit-mode actions bar (`_editBarHeight`)
   *  so entering edit mode doesn't push it under/behind the pinned-height grid. */
  private _refineGridHeight(): void {
    const lay = this._config?.layout;
    if (!lay) return;
    const root = this.renderRoot?.querySelector<HTMLElement>(".avc-grid");
    if (!root) return;
    if ((lay.height ?? "viewport") === "viewport") {
      const top = root.getBoundingClientRect().top;
      if (top >= 0 && top < window.innerHeight) {
        const h = Math.round(window.innerHeight - top - this._editBarHeight());
        if (h > 120) root.style.height = h + "px";
      }
    }
    // Measure the map region for the exact rotated-map fit (docs/18 §7). Guarded
    // by a ±2 px threshold so the update→measure cycle settles instead of looping.
    const reg = this.renderRoot?.querySelector<HTMLElement>(".avc-region--map");
    if (reg) {
      const w = Math.round(reg.clientWidth);
      const h2 = Math.round(reg.clientHeight);
      if (w && Math.abs(w - this._mapRegW) >= 2) this._mapRegW = w;
      if (h2 && Math.abs(h2 - this._mapRegH) >= 2) this._mapRegH = h2;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cancelHold();
    if (this._measureRaf) { cancelAnimationFrame(this._measureRaf); this._measureRaf = 0; }
    if (this._measureTimer !== null) { clearTimeout(this._measureTimer); this._measureTimer = null; }
    if (this._tickTimer) { clearInterval(this._tickTimer); this._tickTimer = null; }
    if (this._onWinResize) {
      window.removeEventListener("resize", this._onWinResize);
      window.removeEventListener("orientationchange", this._onWinResize);
      this._onWinResize = null;
    }
    if (this._ro) { this._ro.disconnect(); this._ro = null; }
    // _panelViewWarned is intentionally NOT reset here — if the panel-view
    // ancestor lookup already failed once, a reconnect (HA can disconnect +
    // reconnect the card) shouldn't spam a second identical warning.
    if (this._panelViewMo) { this._panelViewMo.disconnect(); this._panelViewMo = null; }
  }

  protected firstUpdated(): void {
    // Seed the width immediately; the ResizeObserver may not fire before the
    // first paint (and never fires if the host has no layout box yet).
    const w = Math.round(this.getBoundingClientRect().width);
    if (w) this._cardW = w;
    this._scheduleMeasure();
  }

  protected updated(): void {
    // Grid mode: re-apply the measured height after every render (the declarative
    // svh calc stays as the pre-measure fallback).
    this._refineGridHeight();
    this._refineGridColumns();
    // docs/21 §5b: re-attempt the panel-view observer hookup on every render,
    // not just connectedCallback — HA can disconnect/reconnect the card, and
    // the ancestor may not have been in the tree yet on the very first
    // connectedCallback. No-op once _panelViewMo is set.
    if (!this._panelViewMo) this._setupPanelViewObserver();
  }

  /** Portrait only (docs/19 follow-up): the map is height-fit
   *  (`_renderResponsive`), which usually leaves it narrower than the fixed
   *  72% column — override the actual column split so `dock` picks up
   *  whatever `map` doesn't need, instead of that width sitting empty. A CSS
   *  "auto" track can't do this on its own: the fitted width lives on an
   *  absolutely-positioned inner div specifically so it doesn't feed back
   *  into layout, which also means it carries no intrinsic-size signal for
   *  track auto-sizing — so the split is measured and applied directly, same
   *  as `_refineGridHeight` does for the root height.
   *
   *  History (2026-07-16, all same day): tried capping `dock` to its own
   *  content width (first via live `width:max-content`, then via a detached
   *  clone measurement) because a flat `1fr` handed it every px the map's
   *  fit didn't need. Neither showed any visible effect in the field, which
   *  led to a theory that Lit's `styleMap` (which also lists
   *  `gridTemplateColumns` in `gridRootStyles()`) was re-applying the
   *  static declarative value over this function's override on every
   *  render — so `gridTemplateColumns`/`height` were pulled out of
   *  `gridRootStyles()` entirely to make this function+`_refineGridHeight`
   *  the sole owners. That "fix" (0.59.0) is what crashed the HA mobile
   *  companion app (user-confirmed bisection: 0.55.0–0.58.0 fine, 0.59.0
   *  first to crash) — reverted back to layering on top of the declarative
   *  value (see `gridRootStyles()`'s doc comment), and the dock-content-cap
   *  measurement is dropped too (parked, not reproduced as the crash cause
   *  but not worth the added DOM-clone risk while re-verifying). Net effect
   *  right now: same simple map-only fit as 0.56.0 (`mapW = rW`, `dock`
   *  stays `1fr`) — the sidebar-overshoot cosmetic issue is back, on
   *  purpose, in exchange for confirmed mobile stability. */
  /** 2026-07-16 addendum: dropped the idea of auto-shrinking `dock` to its
   *  own "natural" content width entirely — `.dock-row` uses `flex-wrap:
   *  wrap` in portrait (deliberately, so long room names/badges reflow
   *  instead of overflowing), which means it doesn't HAVE a fixed natural
   *  width the way non-wrapping content would: any max-content-style
   *  measurement returns the *unwrapped* single-line size, which is often
   *  wider than the space actually available, i.e. never smaller than
   *  what's already allocated — that's almost certainly why every earlier
   *  attempt measured "no room to spare" and left the split unchanged, not
   *  a bug in the measurement itself. There's no single objectively-right
   *  split to compute here; it's a visual trade-off. So: respect an
   *  explicit `layout.portrait.columns` in the user's own config as a
   *  manual override (skip the dynamic fit entirely, let the declarative
   *  value stand) — that's the fast, safe way to actually tune this to
   *  taste, instead of chasing an auto-computed number that doesn't really
   *  exist for wrapping content. */
  private _refineGridColumns(): void {
    if (this._profile !== "portrait" || !this._lastPortraitFitW) return;
    if (this._config.layout?.portrait?.columns?.length) return;
    const root = this.renderRoot?.querySelector<HTMLElement>(".avc-grid");
    if (!root) return;
    const total = root.clientWidth;
    const gapPx = parseFloat(getComputedStyle(root).columnGap || "0") || 0;
    const avail = total - gapPx;
    let mapW = Math.round(this._lastPortraitFitW);
    if (avail > 0) mapW = Math.min(mapW, avail);
    const want = Math.round(mapW) + "px 1fr";
    if (root.style.gridTemplateColumns !== want) root.style.gridTemplateColumns = want;
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
        vac.error_entity, vac.map?.entity, this._intEntity(vac),
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

  /** Integration sensor for a vacuum: explicit config, else auto-resolved from the
   *  entity registry — the AnyVac map sensor sits on the SAME device as the vacuum
   *  entity (platform "anyvac"), so no manual plumbing is needed (docs/14 Fáze 3). */
  private _intCache = new Map<string, string | undefined>();
  private _intEntity(vac: VacuumConfig): string | undefined {
    if (vac.integration_entity) return vac.integration_entity;
    const reg = (this.hass as any)?.entities as Record<string, any> | undefined;
    if (!reg || !vac.entity) return undefined;
    if (this._intCache.has(vac.entity)) return this._intCache.get(vac.entity);
    const dev = reg[vac.entity]?.device_id;
    const found = dev
      ? Object.keys(reg).find(
          (id) => reg[id]?.device_id === dev && reg[id]?.platform === "anyvac" && id.startsWith("sensor.")
        )
      : undefined;
    this._intCache.set(vac.entity, found);
    return found;
  }

  /** Kontrakt v2 gate: attributes of the vacuum's integration sensor, only when the
   *  integration speaks schema_version ≥ 2. Older backends → smart features off. */
  private _intAttrs(vac: VacuumConfig): Record<string, any> | undefined {
    const ent = this._intEntity(vac);
    const at = ent ? (this.hass.states[ent]?.attributes as Record<string, any> | undefined) : undefined;
    if (!at) return undefined;
    return (at.schema_version ?? 0) >= 2 ? at : undefined;
  }

  /** Human-readable warning when an integration sensor exists but speaks an old schema. */
  private _schemaWarning(): string | null {
    for (const v of this._config?.vacuums ?? []) {
      const ent = this._intEntity(v);
      const at = ent ? (this.hass.states[ent]?.attributes as Record<string, any> | undefined) : undefined;
      if (at && (at.schema_version ?? 0) < 2) {
        return `AnyVac integration is too old for this card (schema ${at.schema_version ?? 1} < 2). ` +
          "Update the anyvac integration to ≥ 0.18.0.";
      }
    }
    return null;
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

  /** True when the vacuum's error entity/attribute reports an active error
   *  (shared by the status card error row and the map robot-error halo). */
  private _hasError(vac: VacuumConfig): boolean {
    const erid = this._ent(vac, "error");
    const errState = erid ? this.hass.states[erid]?.state : null;
    return !!errState && errState !== "none" && errState !== "unknown" && errState !== "unavailable";
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
      const ent = this._intEntity(v);
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

  /** Effective dry/wet layer visibility: the backend-shared state when the integration
   *  provides it (persists refreshes + syncs across devices, like the room selection),
   *  else the local component state. */
  private _layersEff(): { dry: boolean; wet: boolean } {
    const ent = this._selSensor();
    const vl = ent ? (this.hass.states[ent]?.attributes?.view_layers as any) : undefined;
    if (vl && typeof vl.dry === "boolean" && typeof vl.wet === "boolean") {
      return { dry: vl.dry, wet: vl.wet };
    }
    return this._layers;
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
    const ct = this._intAttrs(vac)?.clean_type as string | undefined;
    if (ct === "wet" || ct === "dry") return ct;
    // 3) Fallback: the vacuum's configured role (wet-only robots default to wet).
    const role = this._vacCleanType(vac);
    return role.wet && !role.dry ? "wet" : "dry";
  }

  /** Self-calibrated clean-time estimate learned by the backend integration,
   *  per room name + type (dry/wet). Null when no integration / no learned value. */
  private _backendEstimate(vac: VacuumConfig, room: RoomConfig, kind: "dry" | "wet"): number | null {
    const re = this._intAttrs(vac)?.rooms_estimate as Record<string, any> | undefined;
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
    const rlc = this._intAttrs(vac)?.rooms_last_cleaned as Record<string, any> | undefined;
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
        const L = this._layersEff();
        const dOn = L.dry, wOn = L.wet;
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
    const rp = this._intAttrs(vac)?.rooms_progress as Record<string, any> | undefined;
    if (!rp) return null;
    return (rp[room.key] ?? rp[room.name ?? ""] ?? null) as any;
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

  /** Dry + wet mini gauges in the room's corner (debug_room_progress). Values are
   *  aggregated ACROSS the given vacuums — in merged mode the old single gauge read
   *  only the representative (first) vacuum, so most rooms showed nothing (docs/16 §1).
   *  Dry ring wears the best dry vacuum's colour; wet ring is always wet-blue. */
  private _renderRoomGauge(vacs: VacuumConfig[], room: RoomConfig) {
    if (!this._config.debug_room_progress) return nothing;
    const dry = this._roomProgForType(room, vacs, "dry");
    const wet = this._roomProgForType(room, vacs, "wet");
    if (!dry && !wet) return nothing;
    const g = (pct: number, title: string, ring: string, calibrating: boolean) => html`
      <span class="room-gauge" title=${title}
        style=${styleMap({ background: `conic-gradient(${ring} ${pct * 3.6}deg, rgba(255,255,255,0.12) 0)` })}>
        <span>${pct}${calibrating ? "~" : ""}</span>
      </span>`;
    return html`<div class="room-gauges">
      ${dry ? g(dry.pct, "dry · " + dry.title, dry.color, dry.calibrating) : nothing}
      ${wet ? g(wet.pct, "wet · " + wet.title, "#40a9ff", wet.calibrating) : nothing}
    </div>`;
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
    // Portrait grid = single-vacuum focus (docs/18 §7b): a badge tap SWITCHES the
    // focused vacuum instead of toggling set membership — no room for more on a phone.
    if (this._config.layout && this._profile === "portrait") {
      this._shownSet = new Set([index]);
      this._saveShown();
      return;
    }
    this._toggleShownMulti(index);
  }

  /** Plain multi-select membership toggle (add/remove from `_shownSet`, never
   *  collapsing to single-focus) — always keeps at least one vacuum shown.
   *  Used directly by contexts that need "hide just this one" regardless of
   *  profile, e.g. the portrait vac-icon-strip hold gesture, which must be
   *  able to hide one of three merged-map vacuums while leaving the other
   *  two visible (docs/19 follow-up, field feedback 2026-07-17). */
  private _toggleShownMulti(index: number): void {
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
  // ── Clean intent → backend planner (kontrakt v2, docs/14 §3.7) ─────────────
  /** Per-kind vacuum restriction for anyvac.clean/plan, from the configured roles —
   *  preserves the user's dry/wet split even when a robot is both-capable. */
  private _v2Vacuums(): { dry: string[]; wet: string[] } {
    const dry: string[] = [], wet: string[] = [];
    for (const v of this._config.vacuums) {
      const role = this._vacCleanType(v);
      if (role.dry) dry.push(v.entity);
      if (role.wet) wet.push(v.entity);
    }
    return { dry, wet };
  }
  /** Per-kind settings for anyvac.clean, from the first capable vacuum's matching
   *  preset (fan speed / mop mode / mop intensity / repeat). */
  private _v2Settings(): Record<string, Record<string, unknown>> | undefined {
    const isWet = (p: SettingPreset) =>
      (p.mop_intensity != null && p.mop_intensity !== "" && p.mop_intensity !== "off") || !!p.mop_mode;
    const out: Record<string, Record<string, unknown>> = {};
    for (const kind of ["dry", "wet"] as const) {
      for (const v of this._config.vacuums) {
        const role = this._vacCleanType(v);
        if (!(kind === "dry" ? role.dry : role.wet)) continue;
        const presets = this._settingPresets(v);
        const pick = presets.find((p) => (kind === "wet" ? isWet(p) : !isWet(p))) ?? presets[0];
        if (!pick) continue;
        const s: Record<string, unknown> = {};
        if (pick.suction_level) s.fan_speed = pick.suction_level;
        if (kind === "wet" && pick.mop_mode) s.mop_mode = pick.mop_mode;
        if (kind === "wet" && pick.mop_intensity) s.mop_intensity = pick.mop_intensity;
        if (pick.repeat && pick.repeat > 1) s.repeat = pick.repeat;
        if (Object.keys(s).length) { out[kind] = s; break; }
      }
    }
    return Object.keys(out).length ? out : undefined;
  }
  /** Backend plan preview (anyvac.plan, response-only): room key -> vacuum entity,
   *  plus the sequence-aware ETA (docs/19) computed server-side from the real
   *  per-robot assignment + the Roborock app's room order (room_sequence). */
  @state() private _planPreview: {
    key: string; dry: Map<string, string>; wet: Map<string, string>;
    eta: number | null; unsequenced: string[];
  } | null = null;
  private _planFetchKey = "";
  private _fetchPlan(selKeys: string[], mode: "dry" | "wet" | "both"): void {
    const key = JSON.stringify([selKeys, mode, this._v2Vacuums()]);
    if (key === this._planFetchKey) return;
    this._planFetchKey = key;
    void (async () => {
      try {
        const res = await (this.hass as any).callService(
          "anyvac", "plan",
          { rooms: selKeys, mode, vacuums: this._v2Vacuums() },
          undefined, false, true,
        ) as { response?: { plan?: Record<string, any> } } | void;
        if (this._planFetchKey !== key) return;  // stale response
        const plan = (res as any)?.response?.plan ?? {};
        const inv = (m: Record<string, string[]> | undefined) => {
          const out = new Map<string, string>();
          for (const [ent, rooms] of Object.entries(m ?? {})) for (const r of rooms) out.set(r, ent);
          return out;
        };
        this._planPreview = {
          key, dry: inv(plan.dry), wet: inv(plan.wet),
          eta: typeof plan.eta_min === "number" ? plan.eta_min : null,
          unsequenced: Array.isArray(plan.unsequenced) ? plan.unsequenced : [],
        };
      } catch (err) {
        console.warn("[anyvac-card] anyvac.plan preview failed:", err);
        if (this._planFetchKey === key) this._planPreview = { key, dry: new Map(), wet: new Map(), eta: null, unsequenced: [] };
      }
    })();
  }
  /** Selection time estimate: prefer the backend's sequence-aware ETA (anyvac.plan,
   *  docs/19) when the integration is present; otherwise (degraded mode — no
   *  backend to ask) fall back to the rough client-side sum (docs/14 §8, direct
   *  vac.* calls / local estimates are the accepted degraded-mode behavior). */
  private _etaFor(selKeys: string[], mode: "dry" | "wet" | "both", hasInt: boolean): number {
    if (hasInt && selKeys.length) this._fetchPlan(selKeys, mode);
    const fromPlan = this._planPreview?.eta;
    if (hasInt && fromPlan != null) return fromPlan;
    return this._selEstMins(selKeys);
  }
  /** Send the clean intent — planning (capability, LPT assignment, segment resolve,
   *  dry→wet gating, repeat) is entirely backend-side now (anyvac.clean, docs/14
   *  §3.7). The old client-side plan builder + run_job assembly was deleted. */
  private async _runOrchestrated(roomKeys: string[], mode: "dry" | "wet" | "both"): Promise<void> {
    if (!roomKeys.length) return;
    await this._call("anyvac", "clean", {
      rooms: roomKeys,
      mode,
      vacuums: this._v2Vacuums(),
      ...(this._v2Settings() ? { settings: this._v2Settings() } : {}),
    });
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
    // The preview is the BACKEND's real assignment (anyvac.plan, response-only) —
    // the card no longer computes plans locally (docs/14 §3.7). Debounced by key;
    // until the response lands the cells show "—".
    this._fetchPlan(selKeys, mode);
    const dryOf = this._planPreview?.dry ?? new Map<string, string>();
    const wetOf = this._planPreview?.wet ?? new Map<string, string>();
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

  // ── Dock & START regions (docs/18 Fáze B) ────────────────────────────────

  /** Shared per-room vacuum pins from the integration sensor (anyvac.pin_room). */
  private _pinsAttr(): Record<string, string> {
    const ent = this._selSensor();
    const rp = ent ? (this.hass.states[ent]?.attributes?.room_pins as Record<string, string> | undefined) : undefined;
    return rp && typeof rp === "object" ? rp : {};
  }
  /** Vacuums that could clean this room at all (know the room key). */
  private _pinCandidates(key: string): VacuumConfig[] {
    return this._config.vacuums.filter((v) => this._roomsFor(v).some((r) => r.key === key));
  }
  /** Cycle the room's pin: auto → vac1 → vac2 → … → auto (docs/18 §7e). The pin is
   *  stored backend-side (anyvac.pin_room) so every browser sees the same override;
   *  the planner treats it as the default and it auto-clears after the clean. */
  private _cycleRoomPin(key: string): void {
    const cands = this._pinCandidates(key);
    if (cands.length < 2) return; // nothing to choose from
    const cur = this._pinsAttr()[key];
    const idx = cands.findIndex((v) => v.entity === cur);
    const next = idx < 0 ? cands[0] : idx + 1 < cands.length ? cands[idx + 1] : null;
    void this._call("anyvac", "pin_room", next ? { room: key, vacuum: next.entity } : { room: key });
  }
  /** Small vacuum-abbrev chip; `pinned` gets a solid ring + pin glyph. */
  private _vacChip(entity: string | undefined, pinned: boolean, onTap?: (e: Event) => void) {
    const v = this._config.vacuums.find((x) => x.entity === entity);
    if (!v) {
      return html`<span class="dock-chip dock-chip--empty" @click=${onTap ?? nothing}>—</span>`;
    }
    const c = this._color(v);
    return html`<span class="dock-chip ${pinned ? "dock-chip--pinned" : ""}"
      style="color:#fff;background:${c}30;border-color:${c}"
      title=${(v.name ?? v.entity) + (pinned ? " · pinned — tap to change" : " · tap to pin")}
      @click=${onTap ?? nothing}>${pinned ? html`<ha-icon icon="mdi:pin" style="--mdc-icon-size:10px"></ha-icon>` : nothing}${this._vacAbbrev(v)}</span>`;
  }

  private _batteryPct(vac: VacuumConfig): number | null {
    if (vac.battery_entity) {
      const v = Number(this.hass.states[vac.battery_entity]?.state);
      if (Number.isFinite(v)) return v;
    }
    const bl = Number((this.hass.states[vac.entity]?.attributes as Record<string, unknown> | undefined)?.battery_level);
    return Number.isFinite(bl) ? bl : null;
  }
  /** DEGRADED-MODE FALLBACK ONLY (no integration → no backend to ask): per room
   *  the worst (max) estimate across vacuums, summed with no notion of sequence,
   *  parallelism or dry→wet gating. With the integration present, `_etaFor` uses
   *  the backend's sequence-aware `eta_min` instead (docs/19) — this function
   *  assumes a simultaneous dry/wet start, which is wrong, but there is no
   *  backend to compute the real timeline for in degraded mode. */
  private _selEstMins(selKeys: string[]): number {
    let sum = 0;
    for (const k of selKeys) {
      let best = 0;
      for (const v of this._config.vacuums) {
        const r = this._roomsFor(v).find((x) => x.key === k);
        if (r) best = Math.max(best, this._roomCleanMins(r, v));
      }
      sum += best;
    }
    return Math.round(sum);
  }
  /** Glanceable stats trio (grid badges region): selected rooms · est time · min battery. */
  private _renderStatsTrio() {
    const vacs = this._config.vacuums;
    const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, vacs));
    const hasInt = vacs.some((v) => this._intAttrs(v));
    const est = this._etaFor(selKeys, this._planMode, hasInt);
    const batts = vacs.map((v) => this._batteryPct(v)).filter((x): x is number => x !== null);
    const minB = batts.length ? Math.min(...batts) : null;
    return html`
      <div class="stats-trio">
        <span class="stat"><ha-icon icon="mdi:floor-plan"></ha-icon><b>${selKeys.length}</b></span>
        ${est > 0 ? html`<span class="stat"><ha-icon icon="mdi:clock-outline"></ha-icon><b>${est}</b><small>min</small></span>` : nothing}
        ${minB !== null ? html`<span class="stat"><ha-icon icon="mdi:battery"></ha-icon><b>${Math.round(minB)}</b><small>%</small></span>` : nothing}
      </div>
    `;
  }

  /** Dock region (docs/12 §3 + docs/18 §3): selection, plan preview and pinning in
   *  one block. Row = room (tap toggles selection); the avatar shows the BACKEND's
   *  real assignment per pass; tapping the avatar cycles the room's vacuum pin.
   *  `withRun` adds the orchestrated run footer (landscape — no `start` region). */
  /** Emergency manual-control strip (portrait-only, docs/19 follow-up): small
   *  icon-only vacuum buttons at the top of the dock column, spread across the
   *  full width (one equal-width slot per vacuum, same idea as the mode
   *  buttons in `.dock-head` right below). Tap opens that vacuum's more-info
   *  dialog (glanceable status, not a pseudo-controller — docs/18 §10b field
   *  note). Hold toggles it in/out of `_shownSet` — merged mode's map DOES
   *  filter its overlaid map/path/room layers by `_shownSet` (`_renderMergedMap`),
   *  so this is a real "hide this robot's clutter off the shared floorplan"
   *  action (field feedback 2026-07-17: 3 overlaid maps in portrait is too
   *  much to read at once), not just a focus switch — deliberately NOT routed
   *  through `_toggleShown`, whose portrait branch collapses to a single
   *  shown vacuum (that's for split mode's per-vacuum status-card focus,
   *  docs/18 §7b, a different concern). Landscape keeps the full `picker`
   *  region instead (name + live status, docs/19 A5). */
  private _renderVacuumIconStrip() {
    if (this._profile !== "portrait") return nothing;
    const vacs = this._config.vacuums;
    if (!vacs.length) return nothing;
    return html`
      <div class="vac-icon-strip">
        ${vacs.map((v, i) => {
          const shown = this._shownSet.has(i);
          const holdId = "vacicon-" + i;
          const holding = this._holdId === holdId;
          return html`
            <div class="vac-icon-slot">
              <button class="vac-icon-btn ${holding ? "vac-icon-btn--holding" : ""} ${shown ? "" : "vac-icon-btn--hidden"}"
                style=${styleMap({ borderColor: this._color(v) + "80" })}
                @pointerdown=${(e: PointerEvent) => {
                  e.preventDefault();
                  this._cancelHold();
                  this._holdId = holdId;
                  this._holdTimer = setTimeout(() => {
                    this._holdTimer = null;
                    this._holdId = null;
                    this._toggleShownMulti(i);
                  }, HOLD_DURATION_MS);
                }}
                @pointerup=${() => {
                  if (this._holdTimer !== null) {
                    this._cancelHold();
                    this._fireMoreInfo(v.entity);
                  } else {
                    this._holdId = null;
                  }
                }}
                @pointerleave=${this._holdEnd}
                @pointercancel=${this._holdEnd}
                title=${v.name ?? v.entity} aria-label=${v.name ?? v.entity}
                aria-pressed=${shown ? "true" : "false"}>
                <div class="hold-ring"></div>
                ${v.image
                  ? html`<img src=${v.image} alt="" />`
                  : html`<ha-icon icon="mdi:robot-vacuum" style=${styleMap({ color: this._color(v) })}></ha-icon>`}
              </button>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderDock(withRun: boolean) {
    const vacs = this._config.vacuums;
    const rooms = this._mergedRoomDefs(vacs);
    if (!rooms.length) return nothing;
    const hasInt = vacs.some((v) => this._intAttrs(v));
    const mode = this._planMode;
    const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, vacs));
    if (hasInt && selKeys.length) this._fetchPlan(selKeys, mode);
    const dryOf = this._planPreview?.dry ?? new Map<string, string>();
    const wetOf = this._planPreview?.wet ?? new Map<string, string>();
    // Sequence hint (docs/19 follow-up, TODO #2) — see _renderMetaBar for the
    // same idea in the landscape meta bar; here it's per-row instead of a count.
    const unsequenced = new Set(hasInt ? (this._planPreview?.unsequenced ?? []) : []);
    const pins = this._pinsAttr();
    const showDry = mode !== "wet";
    const showWet = mode !== "dry";
    const badge = (d: number | null) => (d === null ? "—" : d < 1 ? "<1d" : Math.round(d) + "d");
    const modeBtn = (m: "dry" | "wet" | "both", icon: string, label: string) => html`
      <button class="dock-mode ${mode === m ? "on" : ""}"
        @click=${(e: Event) => { e.stopPropagation(); this._planMode = m; }}>
        <ha-icon icon=${icon}></ha-icon><span>${label}</span>
      </button>`;
    const runHid = "dock-run";
    return html`
      <div class="dock">
        ${this._renderVacuumIconStrip()}
        ${/* Dry/wet PATH visibility on the map (view_layers) — a different concern
             from the dock-mode buttons below (which pick what to CLEAN). Landscape
             already gets this from the meta bar's `tools` region (docs/19 A4), but
             portrait has no `tools` region at all, so it silently had no way to
             toggle path visibility (field feedback 2026-07-17). Reuses the same
             compact toggle, just placed in the dock column instead of a meta bar. */
          this._profile === "portrait" ? html`
            <div class="dock-layers">${this._renderLayerToggleCompact(vacs)}</div>
          ` : nothing}
        <div class="dock-head">
          ${modeBtn("dry", "mdi:broom", "Dry")}${modeBtn("wet", "mdi:water", "Wet")}${modeBtn("both", "mdi:water-plus", "Both")}
        </div>
        <div class="dock-rows">
          ${rooms.map(({ r, v }) => {
            const rec = this._intRoomRec(v, r);
            const dry = this._ageDaysFromIso(rec?.dry);
            const wet = this._ageDaysFromIso(rec?.wet);
            const sel = this._isRoomSelectedAny(r.key, vacs);
            const pinned = pins[r.key];
            const pinTap = this._pinCandidates(r.key).length > 1
              ? (e: Event) => { e.stopPropagation(); this._cycleRoomPin(r.key); }
              : undefined;
            const locked = this._mapMode !== "normal";
            return html`
              <button class="dock-row ${sel ? "on" : ""} ${locked ? "room-overlay--locked" : ""}" ?disabled=${locked}
                title=${locked ? "Room selection is off while placing a pin/zone" : ""}
                @click=${() => { if (!locked) this._toggleRoomAcross(r.key, vacs); }}>
                <ha-icon class="dock-ric" icon=${r.icon ?? "mdi:square"}></ha-icon>
                <span class="dock-name">${r.name ?? r.key}</span>
                ${sel && unsequenced.has(r.key) ? html`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                  title="No cleaning order set for this room — the time estimate may be off. Set the order in the card editor's Maps tab."></ha-icon>` : nothing}
                <span class="dock-ages">
                  <span class="dock-age">${this._renderProgChip(this._roomProgForType(r, vacs, "dry"))}<ha-icon icon="mdi:broom"></ha-icon><b style=${styleMap({ color: this._colorForAgeDays(dry) })}>${badge(dry)}</b></span>
                  <span class="dock-age">${this._renderProgChip(this._roomProgForType(r, vacs, "wet"))}<ha-icon icon="mdi:water"></ha-icon><b style=${styleMap({ color: this._colorForAgeDays(wet) })}>${badge(wet)}</b></span>
                </span>
                ${hasInt && sel ? html`
                  <span class="dock-avatars">
                    ${showDry ? this._vacChip(dryOf.get(r.key), pinned === dryOf.get(r.key) && !!pinned, pinTap) : nothing}
                    ${showWet ? this._vacChip(wetOf.get(r.key), pinned === wetOf.get(r.key) && !!pinned, pinTap) : nothing}
                  </span>` : nothing}
              </button>`;
          })}
        </div>
        ${withRun && hasInt ? html`
          <div class="dock-foot">
            <span class="dock-est">${selKeys.length ? selKeys.length + " rooms · ~" + this._etaFor(selKeys, mode, hasInt) + " min" : "Select rooms"}
              ${unsequenced.size ? html`<ha-icon class="dock-unseq" icon="mdi:sort-variant-off"
                title="${unsequenced.size} selected room${unsequenced.size > 1 ? "s have" : " has"} no cleaning order set — the time above may be off. Set the order in the card editor's Maps tab."></ha-icon>` : nothing}</span>
            <button class="action-btn ${this._holdId === runHid ? "action-btn--holding" : ""}"
              style="flex:0 0 auto;padding:7px 14px;background:rgba(82,196,26,0.14);border:1px solid rgba(82,196,26,0.55);color:#fff"
              ?disabled=${!selKeys.length}
              @pointerdown=${selKeys.length ? this._holdStart(runHid, () => this._runOrchestrated(selKeys, this._planMode)) : nothing}
              @pointerup=${this._holdEnd}
              @pointerleave=${this._holdEnd}
              @pointercancel=${this._holdEnd}>
              <div class="hold-ring"></div>
              <ha-icon icon="mdi:play" style="--mdc-icon-size:16px"></ha-icon>
              <span style="font-size:12px">Start · hold</span>
            </button>
          </div>` : nothing}
      </div>
    `;
  }

  /** START region (portrait bottom bar, docs/18 §7d): ALWAYS the orchestrated
   *  intent (anyvac.clean); while anything runs it flips to a cancel bar. */
  private _renderStartBar() {
    const vacs = this._config.vacuums;
    const hasInt = vacs.some((v) => this._intAttrs(v));
    const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, vacs));
    const anyCleaning = vacs.some((v) => this._isCleaning(v));
    const hid = "startbar";
    if (anyCleaning) {
      return html`
        <button class="start-bar start-bar--cancel ${this._holdId === hid ? "action-btn--holding" : ""}"
          @pointerdown=${this._holdStart(hid, () => {
            if (hasInt) void this._call("anyvac", "cancel", {});
            else for (const v of vacs) { if (this._isCleaning(v)) void this._pause(v); }
          })}
          @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
          <div class="hold-ring"></div>
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>CANCEL · hold</span>
        </button>`;
    }
    const canStart = hasInt && selKeys.length > 0;
    const est = this._etaFor(selKeys, this._planMode, hasInt);
    return html`
      <button class="start-bar ${canStart && this._holdId === hid ? "action-btn--holding" : ""}"
        ?disabled=${!canStart}
        title=${hasInt ? "" : "Requires the AnyVac integration"}
        @pointerdown=${canStart ? this._holdStart(hid, () => this._runOrchestrated(selKeys, this._planMode)) : nothing}
        @pointerup=${this._holdEnd} @pointerleave=${this._holdEnd} @pointercancel=${this._holdEnd}>
        <div class="hold-ring"></div>
        <ha-icon icon="mdi:rocket-launch"></ha-icon>
        <span>START${selKeys.length ? " · " + selKeys.length + (est ? " · ~" + est + " min" : "") : ""}</span>
      </button>`;
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
    const selected = (this._roomsFor(vac)).filter((r) => this._isRoomSelected(r, vac));
    if (selected.length === 0) return;

    // ── Kontrakt v2: with the integration present, the START button sends an
    // INTENT restricted to THIS vacuum — segment resolve, settings application and
    // session tracking are backend-side (anyvac.clean, docs/14 §3.7). No in-flight
    // tracking, events or notifications here (docs/14 §3.1, §3.10).
    if (this._intAttrs(vac)) {
      const ap = this._activePreset(vac);
      const mode = this._liveCleanType(vac);
      const s: Record<string, unknown> = {};
      if (ap.suction_level) s.fan_speed = ap.suction_level;
      if (mode === "wet" && ap.mop_mode) s.mop_mode = ap.mop_mode;
      if (mode === "wet" && ap.mop_intensity) s.mop_intensity = ap.mop_intensity;
      if (ap.repeat && ap.repeat > 1) s.repeat = ap.repeat;
      await this._call("anyvac", "clean", {
        rooms: selected.map((r) => r.key),
        mode,
        vacuums: [vac.entity],
        ...(Object.keys(s).length ? { settings: { [mode]: s } } : {}),
      });
      return;
    }

    // ── Degraded mode (no integration, docs/14 §8): dumb direct commands. ──
    if (!vac.clean_action) return;

    // Script strategy
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
      // Uses HA vacuum.clean_area — area_id resolved via area_mappings. No repeat
      // (docs/13 A1); repeat lives server-side in anyvac.clean (docs/14 §3.8).
      try {
        await this.hass.callService(
          "vacuum", "clean_area",
          { cleaning_area_id: selected.map((r) =>
              r.area_id ?? this._config.area_mappings?.[r.key] ?? r.key) },
          { entity_id: vac.entity },
        );
      } catch (err) {
        console.error("[anyvac-card] vacuum.clean_area failed:", err);
      }
    } else {
      // "native" / "native-auto" — segment IDs from the room config. The old
      // native-auto dynamic resolve (roborock.get_maps) was DELETED with the plan
      // builder (docs/14 §3.7): with an integration the backend resolves segments,
      // without one the card only knows its configured segment_ids.
      const action = vac.clean_action as NativeCleanAction | NativeAutoCleanAction;
      const segments = selected.map((r) => r.segment_id).filter((id): id is number => id !== undefined);
      if (!segments.length) {
        console.error("[anyvac-card] no configured segment_ids for the selection; aborting");
        return;
      }
      await this._call("vacuum", "send_command", {
        entity_id: vac.entity,
        command: "app_segment_clean",
        params: [{ segments, repeat: action.repeat ?? 1 }],
      });
    }
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

  /** Landscape-only `picker` region (docs/19 A5): slim vertical vacuum
   *  selector, right column, directly above the room-list `dock`. Reuses
   *  `_renderBadge` (same tap-to-focus / hold-to-multiselect behaviour as the
   *  old horizontal badge-row tabs) just stacked vertically instead. */
  private _renderVacuumPicker() {
    const vacs = this._config.vacuums;
    if (!vacs.length) return nothing;
    return html`<div class="vac-picker">${vacs.map((v, i) => this._renderBadge(v, i))}</div>`;
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

  // ── Pin & go / zone (integration-only; docs/14 §3.6, kontrakt v2) ────────────
  // The card sends clicks as PERCENT of the map image to anyvac.goto /
  // anyvac.zone_clean; the pct→px→mm conversion is backend-side. All client-side
  // affine math (solve3 / _affine / _intMapToVac / _gotoMm) was deleted — mm no
  // longer exist in the card.
  private _toggleMode(entity: string, mode: "pin" | "zone"): void {
    if (this._mapMode === mode && this._modeEntity === entity) { this._mapMode = "normal"; this._modeEntity = null; }
    else { this._mapMode = mode; this._modeEntity = entity; }
  }
  /** Arm Pin & Go / Zone from the consolidated meta bar (docs/19) — a "*" sentinel
   *  instead of one hard-coded vacuum. In merged mode this defers the target choice:
   *  the capture (click/drag) happens once on the shared map, then the user picks
   *  which vacuum executes it on that vacuum's own status card (`_confirmPin`/
   *  `_confirmZone`). In split mode each vacuum has its own separate map region, so
   *  "*" just means "whichever map you click into" — unambiguous, same immediate
   *  execution as the legacy per-vacuum tools. Distinct from `_toggleMode`, which
   *  still drives the legacy single-target flow untouched. */
  private _armMode(mode: "pin" | "zone"): void {
    if (this._mapMode === mode && this._modeEntity === "*") { this._mapMode = "normal"; this._modeEntity = null; }
    else {
      this._mapMode = mode; this._modeEntity = "*"; this._pinPending = null;
      this._zonePending = null; this._zoneRectShown = null; this._zoneEdit = null;
    }
  }
  /** Candidate vacuums for a merged-mode multi-candidate Pin & Go / Zone capture —
   *  anything with the integration + its own map entity (each has its own
   *  auto-seated transform, so one screen point/rectangle translates independently
   *  per vacuum via `_clickToContent`). */
  private _modeCandidates(): VacuumConfig[] {
    return this._config.vacuums.filter((v) => this._intAttrs(v) && v.map?.entity);
  }
  /** Whether this vacuum's map should render the click-catch / zone-rect layer:
   *  either it's the legacy hard-coded single target, or mode is armed "*" (meta
   *  bar) and this vacuum is a valid candidate. */
  private _isModeCandidate(v: VacuumConfig): boolean {
    return this._modeEntity === v.entity || (this._modeEntity === "*" && !!this._intAttrs(v) && !!v.map?.entity);
  }
  /** Whether `v` still has a stake in the current zone capture once arming has
   *  already ended — i.e. it's awaiting confirm (`_zonePending`) or it's still
   *  mid-draw (`_isModeCandidate`). Needed because move/resize editing of an
   *  already-drawn box (below) must keep working after the merged multi-candidate
   *  flow resets `_mapMode`/`_modeEntity` to normal/null on drop. */
  private _hasZoneEditTarget(v: VacuumConfig): boolean {
    return this._isModeCandidate(v) || !!this._zonePending?.[v.entity];
  }
  /** Hit-test a point (wrap-relative %) against a frozen zone box: a corner
   *  (within `H` percent) wins for resize, otherwise inside the box means move,
   *  otherwise null (click missed the box — caller should start a fresh draw). */
  private _zoneHit(
    box: { x0: number; y0: number; x1: number; y1: number }, x: number, y: number
  ): "nw" | "ne" | "sw" | "se" | "move" | null {
    const minX = Math.min(box.x0, box.x1), maxX = Math.max(box.x0, box.x1);
    const minY = Math.min(box.y0, box.y1), maxY = Math.max(box.y0, box.y1);
    const H = 4;
    const corners: Array<["nw" | "ne" | "sw" | "se", number, number]> = [
      ["nw", minX, minY], ["ne", maxX, minY], ["sw", minX, maxY], ["se", maxX, maxY],
    ];
    for (const [name, cx, cy] of corners) {
      if (Math.abs(x - cx) <= H && Math.abs(y - cy) <= H) return name;
    }
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) return "move";
    return null;
  }
  /** Purely visual corner squares on a drawn zone box — the actual drag/resize
   *  hit-testing happens in `_onZoneDown` via `_zoneHit` against the overlaying
   *  `.map-clickcatch`, so these carry no pointer handlers of their own
   *  (`pointer-events: none`, same as `.zone-rect` itself). */
  private _renderZoneHandles() {
    return html`
      <div class="zone-handle zone-handle--nw"></div>
      <div class="zone-handle zone-handle--ne"></div>
      <div class="zone-handle zone-handle--sw"></div>
      <div class="zone-handle zone-handle--se"></div>
    `;
  }
  /** The rectangle to draw for this vacuum's map: the live drag while dragging,
   *  or the frozen box while a zone is pending confirm. Merged mode's multi
   *  candidate capture resets `_mapMode`/`_modeEntity` the instant the drag ends
   *  (§`_onZoneUp`), so the frozen box can't reuse `_isModeCandidate` — it's no
   *  longer "armed", it's "awaiting confirm". All candidates share the exact
   *  same on-screen rect there (that's the premise of merged mode), so it's
   *  drawn once, on the first shown vacuum; split mode draws it on whichever
   *  vacuum's own map it was actually dragged on. */
  private _zoneRectFor(v: VacuumConfig, isFirstShown: boolean): { x0: number; y0: number; x1: number; y1: number } | null {
    if (this._mapMode === "zone" && this._isModeCandidate(v) && this._zoneDrag) return this._zoneDrag;
    if (!this._zoneRectShown) return null;
    if (this._config.map_mode === "merged") return isFirstShown ? this._zoneRectShown : null;
    return this._zonePending?.[v.entity] ? this._zoneRectShown : null;
  }
  private _refreshMap(vac: VacuumConfig): void {
    const ent = vac.map?.entity;
    if (ent) void this.hass.callService("homeassistant", "update_entity", { entity_id: ent });
  }
  private _clampPct(v: number): number {
    return Math.min(100, Math.max(0, v));
  }
  private _onMapClick(vac: VacuumConfig, e: MouseEvent): void {
    if (this._mapMode !== "pin") return;
    if (!this._isModeCandidate(vac)) return;
    if (this._modeEntity === "*" && this._config.map_mode === "merged") {
      // Merged multi-candidate: capture the SAME screen point through every
      // candidate vacuum's own map transform. Nothing is sent yet — the user picks
      // who actually goes there next, on that vacuum's own status card.
      const pts: Record<string, { x: number; y: number }> = {};
      for (const cand of this._modeCandidates()) {
        const c = this._clickToContent(cand, e.clientX, e.clientY);
        if (c) pts[cand.entity] = { x: this._clampPct(c.x), y: this._clampPct(c.y) };
      }
      this._pinPending = Object.keys(pts).length ? pts : null;
      this._mapMode = "normal"; this._modeEntity = null;
      return;
    }
    // Legacy single-target immediate send (per-vacuum tools, and "*" in split mode
    // where each map is its own on-screen region — clicking it IS the unambiguous
    // choice of vacuum, so there's nothing to defer).
    const content = this._clickToContent(vac, e.clientX, e.clientY);
    this._dbg = content
      ? "goto " + content.x.toFixed(1) + "%, " + content.y.toFixed(1) + "%"
      : "(map element not found)";
    if (content) {
      void this._call("anyvac", "goto", {
        entity_id: vac.entity,
        x_pct: this._clampPct(content.x),
        y_pct: this._clampPct(content.y),
      });
    }
    this._mapMode = "normal"; this._modeEntity = null;
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
  private _onZoneDown(vac: VacuumConfig, e: PointerEvent): void {
    const editing = !!this._zoneRectShown && this._hasZoneEditTarget(vac);
    if (!editing && (this._mapMode !== "zone" || !this._isModeCandidate(vac))) return;
    const el = e.currentTarget as HTMLElement;
    (el as any).setPointerCapture?.(e.pointerId);
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    if (this._zoneRectShown) {
      const hit = this._zoneHit(this._zoneRectShown, x, y);
      if (hit) {
        const b = this._zoneRectShown;
        const minX = Math.min(b.x0, b.x1), maxX = Math.max(b.x0, b.x1);
        const minY = Math.min(b.y0, b.y1), maxY = Math.max(b.y0, b.y1);
        // Normalize to x0<x1 / y0<y1 so resize below can address each corner
        // as one fixed field instead of re-deriving min/max on every move.
        this._zoneRectShown = { x0: minX, y0: minY, x1: maxX, y1: maxY };
        this._zoneEdit = hit === "move"
          ? { type: "move", offsetX: x - minX, offsetY: y - minY, width: maxX - minX, height: maxY - minY }
          : { type: hit };
        return;
      }
      // Missed the box. Once dropped and awaiting confirm, `_mapMode` may
      // already be back to "normal" (merged multi-candidate flow) — a stray
      // click there shouldn't silently discard the pending zone, Cancel is
      // explicit for that. Only actively-armed drawing (`_mapMode === "zone"`)
      // may start a fresh rectangle over an old one.
      if (this._mapMode !== "zone") return;
    }
    // Start a fresh rectangle, same as before move/resize existed.
    this._zonePending = null;
    this._zoneRectShown = null;
    this._zoneEdit = null;
    this._zoneMulti = this._modeEntity === "*" && this._config.map_mode === "merged";
    this._zoneDrag = { x0: x, y0: y, x1: x, y1: y };
  }
  private _onZoneMove(vac: VacuumConfig, e: PointerEvent): void {
    if (this._zoneEdit && this._zoneRectShown) {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      const MIN = 3; // smallest box side, in %, so a resize can't collapse to a point
      const edit = this._zoneEdit;
      if (edit.type === "move") {
        const { offsetX, offsetY, width, height } = edit;
        const nx0 = Math.min(100 - width, Math.max(0, x - offsetX));
        const ny0 = Math.min(100 - height, Math.max(0, y - offsetY));
        this._zoneRectShown = { x0: nx0, y0: ny0, x1: nx0 + width, y1: ny0 + height };
      } else {
        let { x0, y0, x1, y1 } = this._zoneRectShown;
        const cx = this._clampPct(x), cy = this._clampPct(y);
        if (edit.type === "nw") { x0 = Math.min(cx, x1 - MIN); y0 = Math.min(cy, y1 - MIN); }
        else if (edit.type === "ne") { x1 = Math.max(cx, x0 + MIN); y0 = Math.min(cy, y1 - MIN); }
        else if (edit.type === "sw") { x0 = Math.min(cx, x1 - MIN); y1 = Math.max(cy, y0 + MIN); }
        else /* se */ { x1 = Math.max(cx, x0 + MIN); y1 = Math.max(cy, y0 + MIN); }
        this._zoneRectShown = { x0, y0, x1, y1 };
      }
      return;
    }
    if (!this._zoneDrag || this._mapMode !== "zone" || !this._isModeCandidate(vac)) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    this._zoneDrag = { x0: this._zoneDrag.x0, y0: this._zoneDrag.y0,
      x1: ((e.clientX - r.left) / r.width) * 100, y1: ((e.clientY - r.top) / r.height) * 100 };
  }
  private _onZoneUp(vac: VacuumConfig, e: PointerEvent): void {
    const el = e.currentTarget as HTMLElement;
    if (this._zoneEdit) {
      this._zoneEdit = null;
      this._commitZoneRect(vac, el);
      return;
    }
    if (!this._zoneDrag || this._mapMode !== "zone" || !this._isModeCandidate(vac)) return;
    const big = Math.abs(this._zoneDrag.x1 - this._zoneDrag.x0) > 2 || Math.abs(this._zoneDrag.y1 - this._zoneDrag.y0) > 2;
    // Freeze the drawn box (so it stays visible while pending) before dropping
    // the LIVE drag state — the live state is what used to only clear on cancel,
    // so releasing the pointer left `_zoneDrag` set and `_onZoneMove` (which only
    // gates on it being non-null, not on the button still being down) kept
    // resizing the rectangle on every subsequent mouse move (bugfix, docs/19).
    this._zoneRectShown = big ? this._zoneDrag : null;
    this._zoneDrag = null;
    if (!big) return;
    const multi = this._zoneMulti;
    if (multi) { this._mapMode = "normal"; this._modeEntity = null; }
    this._commitZoneRect(vac, el);
  }
  /** Convert the current `_zoneRectShown` (wrap-relative %) back to screen
   *  coordinates via `el`'s rect, then project through each relevant vacuum's
   *  own map transform (`_clickToContent`) into `_zonePending`. Shared by the
   *  initial draw-drop and by every subsequent move/resize edit, so a box can
   *  be nudged into place after the fact without redrawing it from scratch. */
  private _commitZoneRect(vac: VacuumConfig, el: HTMLElement): void {
    const box = this._zoneRectShown; if (!box) return;
    const r = el.getBoundingClientRect();
    const ax = r.left + (Math.min(box.x0, box.x1) / 100) * r.width;
    const ay = r.top + (Math.min(box.y0, box.y1) / 100) * r.height;
    const bx = r.left + (Math.max(box.x0, box.x1) / 100) * r.width;
    const by = r.top + (Math.max(box.y0, box.y1) / 100) * r.height;
    if (this._zoneMulti) {
      // Merged multi-candidate: same two screen corners, translated through every
      // candidate vacuum's own map transform. Nothing sent yet — confirm per
      // vacuum on its own status card.
      const rects: Record<string, { x1: number; y1: number; x2: number; y2: number }> = {};
      for (const cand of this._modeCandidates()) {
        const ca = this._clickToContent(cand, ax, ay);
        const cb = this._clickToContent(cand, bx, by);
        if (ca && cb) {
          rects[cand.entity] = {
            x1: this._clampPct(Math.min(ca.x, cb.x)), y1: this._clampPct(Math.min(ca.y, cb.y)),
            x2: this._clampPct(Math.max(ca.x, cb.x)), y2: this._clampPct(Math.max(ca.y, cb.y)),
          };
        }
      }
      this._zonePending = Object.keys(rects).length ? rects : null;
      return;
    }
    // Legacy single-target (per-vacuum tools, and "*" in split mode — each map is
    // its own on-screen region, so the vacuum that received the drag IS the
    // unambiguous choice).
    const ca = this._clickToContent(vac, ax, ay);
    const cb = this._clickToContent(vac, bx, by);
    if (ca && cb) {
      this._zonePending = {
        [vac.entity]: {
          x1: this._clampPct(Math.min(ca.x, cb.x)), y1: this._clampPct(Math.min(ca.y, cb.y)),
          x2: this._clampPct(Math.max(ca.x, cb.x)), y2: this._clampPct(Math.max(ca.y, cb.y)),
        },
      };
    }
  }
  private _confirmZone(vac: VacuumConfig): void {
    const z = this._zonePending?.[vac.entity]; if (!z) return;
    // Bugfix 2026-07-16 (field test): this hardcoded `repeat: 1`, silently
    // ignoring the vacuum's own configured pass count (`clean_action.repeat`,
    // e.g. 2) — a zone clean ran with only one pass regardless of what the
    // user set up. Zone clean is a WHERE action (docs/07 UX canon), it should
    // still run with the vacuum's normal HOW settings, same as room cleaning
    // does via `_settingPresets`/`clean_action`.
    const ca = vac.clean_action as Partial<NativeAutoCleanAction> | undefined;
    void this._call("anyvac", "zone_clean", {
      entity_id: vac.entity,
      x1_pct: z.x1, y1_pct: z.y1, x2_pct: z.x2, y2_pct: z.y2,
      repeat: ca?.repeat ?? 1,
    });
    if (this._zonePending) {
      const next = { ...this._zonePending };
      delete next[vac.entity];
      this._zonePending = Object.keys(next).length ? next : null;
      if (!this._zonePending) this._zoneRectShown = null;
    }
    this._zoneDrag = null;
    this._zoneEdit = null;
    this._mapMode = "normal"; this._modeEntity = null;
  }
  private _confirmPin(vac: VacuumConfig): void {
    const p = this._pinPending?.[vac.entity]; if (!p) return;
    void this._call("anyvac", "goto", { entity_id: vac.entity, x_pct: p.x, y_pct: p.y });
    if (this._pinPending) {
      const next = { ...this._pinPending };
      delete next[vac.entity];
      this._pinPending = Object.keys(next).length ? next : null;
    }
  }
  private _cancelPin(): void { this._pinPending = null; }
  private _cancelZone(): void {
    this._zonePending = null; this._zoneDrag = null; this._zoneRectShown = null; this._zoneEdit = null;
  }

  /** Refresh-all button in the badges row (grid mode) — the map corner variant
   *  floated in dead space (field feedback 2026-07-11). */
  private _renderBadgesRefresh() {
    const withMap = this._config.vacuums.filter((v) => v.map?.entity);
    if (!withMap.length) return nothing;
    return html`<button class="mtbtn badges-refresh" title="Refresh maps"
      @click=${() => { for (const v of withMap) this._refreshMap(v); }}>
      <ha-icon icon="mdi:refresh"></ha-icon>
    </button>`;
  }

  /** Grid mode's consolidated meta bar (docs/19 A4) — replaces the old per-vacuum
   *  Refresh/Pin & Go/Zone header rows (one row × N vacuums) AND the badges
   *  region's stats-trio + refresh button with ONE row: Pin & Go, Zone, dry/wet
   *  layer visibility + oldest age, selected room count, ETA, refresh. Legacy
   *  (no `layout:` block) is untouched — `_renderMapTools`/`_renderStatsTrio`/
   *  `_renderBadgesRefresh` below still exist for it. */
  private _renderMetaBar(vacs: VacuumConfig[]) {
    const withMap = vacs.filter((v) => v.map?.entity);
    if (!withMap.length) return nothing;
    // Pin & Go / Zone here is armed for ALL candidates at once ("*", `_armMode`) —
    // in merged mode the capture (click/drag) happens once on the shared map and
    // the choice of WHICH vacuum executes it is made afterwards on that vacuum's
    // own status card (`_confirmPin`/`_confirmZone`, docs/19). No single
    // auto-picked target here anymore — that was the bug (immediate send with no
    // way to choose the robot).
    const candidates = this._modeCandidates();
    const canCmd = candidates.length > 0 && !this._narrow;
    const cmdTitle = this._narrow
      ? "Not available in the rotated mobile view"
      : !canCmd ? "Requires the AnyVac integration (≥ 0.18) + map entity" : "";
    const mode = this._modeEntity === "*" ? this._mapMode : "normal";
    const selKeys = this._allRoomKeys().filter((k) => this._isRoomSelectedAny(k, vacs));
    const hasInt = vacs.some((v) => this._intAttrs(v));
    const est = this._etaFor(selKeys, this._planMode, hasInt);
    // Sequence hint (docs/19 follow-up, TODO #2): the backend's ETA is only as
    // good as `room_sequence` (the Roborock app's own room order, which the
    // firmware follows regardless of what order HA sends). Rooms missing from
    // it come back in `plan.unsequenced` — surface that instead of silently
    // showing a number the user has no reason to trust.
    const unsequenced = hasInt ? (this._planPreview?.unsequenced ?? []) : [];
    const pinCount = this._pinPending ? Object.keys(this._pinPending).length : 0;
    const zoneCount = this._zonePending ? Object.keys(this._zonePending).length : 0;
    return html`
      <div class="meta-bar">
        <button class="mtbtn ${mode === "pin" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._armMode("pin")} title=${cmdTitle || "Pin & Go"}>
          <ha-icon icon="mdi:map-marker-radius"></ha-icon><span>Pin &amp; Go</span>
        </button>
        <button class="mtbtn ${mode === "zone" ? "on" : ""}" ?disabled=${!canCmd}
          @click=${() => this._armMode("zone")} title=${cmdTitle || "Zone clean"}>
          <ha-icon icon="mdi:select-drag"></ha-icon><span>Zone</span>
        </button>
        ${this._renderLayerToggleCompact(vacs)}
        <span class="mtbtn mtbtn--stat" title="Selected rooms">
          <ha-icon icon="mdi:floor-plan"></ha-icon><b>${selKeys.length}</b>
        </span>
        ${est > 0 ? html`<span class="mtbtn mtbtn--stat" title="Estimated time">
          <ha-icon icon="mdi:clock-outline"></ha-icon><b>${est}</b><small>min</small>
        </span>` : nothing}
        ${unsequenced.length ? html`<span class="mtbtn mtbtn--stat mtbtn--warn"
            title="${unsequenced.length} selected room${unsequenced.length > 1 ? "s have" : " has"} no cleaning order set — the time above may be off. Set the order in the card editor's Maps tab.">
          <ha-icon icon="mdi:sort-variant-off"></ha-icon><b>${unsequenced.length}</b>
        </span>` : nothing}
        <button class="mtbtn mtbtn--push" title="Refresh maps"
          @click=${() => { for (const v of withMap) this._refreshMap(v); }}>
          <ha-icon icon="mdi:refresh"></ha-icon>
        </button>
      </div>
      ${/* Capture finishes (and resets _mapMode to normal) the instant a click/drag
           lands — so pending state, not the armed mode, drives this panel. Only the
           "arm but haven't captured yet" hint depends on `mode`. */
        zoneCount ? html`<div class="calib-panel">
          <div>Zone ready for ${zoneCount} vacuum${zoneCount > 1 ? "s" : ""} — drag the box or its corners to adjust, then pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${() => this._cancelZone()}>Cancel</button></div>
        </div>` : mode === "zone" ? html`<div class="calib-panel">Drag a rectangle on the map to set a cleaning zone.</div>` : nothing}
      ${pinCount ? html`<div class="calib-panel">
          <div>Pin ready for ${pinCount} vacuum${pinCount > 1 ? "s" : ""} — pick one on its status card below.</div>
          <div class="calib-actions"><button class="mtbtn" @click=${() => this._cancelPin()}>Cancel</button></div>
        </div>` : mode === "pin" ? html`<div class="calib-panel">Tap the map to drop a pin.</div>` : nothing}
    `;
  }

  private _renderMapTools(vac: VacuumConfig) {
    if (!vac.map && !vac.image_base) return nothing;
    // Map commands need the integration's calibration AND this vacuum's map element
    // for the click geometry. Disabled in the rotated (narrow) view — the click
    // inversion does not account for the wrapper rotation yet (docs/13 A5).
    const canCmd = !!this._intAttrs(vac) && !!vac.map?.entity && !this._narrow;
    const cmdTitle = this._narrow
      ? "Not available in the rotated mobile view"
      : (!this._intAttrs(vac) || !vac.map?.entity)
        ? "Requires the AnyVac integration (≥ 0.18) + map entity"
        : "";
    const mode = this._modeEntity === vac.entity ? this._mapMode : "normal";
    return html`
      <div class="map-tools">
        ${this._config.layout && this._config.vacuums.length > 1
          ? html`<span class="map-tools-label">${vac.name ?? vac.entity}</span>` : nothing}
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
        ${this._dbg && (this._config.debug || !this._config.layout) ? html`<span style="font-size:11px;opacity:0.65;align-self:center;font-family:monospace">${this._dbg}</span>` : nothing}
      </div>
      ${mode === "pin" ? html`<div class="calib-panel">Tap the map to send the robot there.</div>` : nothing}
      ${mode === "zone" ? html`<div class="calib-panel">
        ${this._zonePending?.[vac.entity]
          ? html`<div>Clean this zone? Drag the box or its corners to adjust.</div>
              <div class="calib-actions">
                <button class="mtbtn on" @click=${() => this._confirmZone(vac)}>Clean zone</button>
                <button class="mtbtn" @click=${() => this._cancelZone()}>Cancel</button>
              </div>`
          : html`Drag a rectangle on the map to set a cleaning zone.`}
      </div>` : nothing}
    `;
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
    if (!ib?.src) return manual;
    // Kontrakt v2: anchors come from rooms[].bbox_px (integration ≥ 0.18).
    const at = this._intAttrs(vac);
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

  /** Integration mode: draw the robot + cleaning path as a vector overlay from the
   *  px-space attributes (kontrakt v2: vacuum_position_px, path_dry_px, path_wet_px
   *  — already in rendered-map pixels, no client-side mm math). */
  private _renderIntegrationOverlay(vac: VacuumConfig, m: any) {
    const at = this._intAttrs(vac);
    if (!at) return nothing;
    const dims = at.image_dims;
    if (!dims) return nothing;
    const sc = dims.scale ?? 1;
    let NW = (dims.width ?? 0) * sc;
    let NH = (dims.height ?? 0) * sc;
    const rot = dims.rotation ?? 0;
    if (rot === 90 || rot === 270) { const tmp = NW; NW = NH; NH = tmp; }
    if (!NW || !NH) return nothing;
    const color = this._color(vac);
    const rr = Math.max(NW, NH) / 55;
    const toPts = (arr: any) => (Array.isArray(arr) ? arr : []).map((p: any) => p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
    const ct = this._vacCleanType(vac);
    // Dry layer draws the SEGMENTED dry trace (path_dry_px — cleaning-only points,
    // no transit / mop-wash driving). Wet layer draws the mop trace as a wider
    // translucent "wet sheen" band under the line.
    const layersOn = this._layersEff();
    const showDry = layersOn.dry && ct.dry;
    const showWet = layersOn.wet && ct.wet;
    // path_dry_px is a list of contiguous segments (docs/14 §3.9 — the backend never
    // bridges an excluded transit/mop-wash gap with a straight line, so the card must
    // not either). One <polyline> per segment; a single flat polyline across all
    // segments used to draw a spurious diagonal line at every room transition, which
    // is why a finished multi-room trace used to look like a scribble while the live
    // in-progress trace (still one segment) looked clean (fixed 2026-07-15).
    const drySegs: string[] = showDry && Array.isArray(at.path_dry_px)
      ? at.path_dry_px.map((seg: any) => toPts(seg)).filter((s: string) => s.length > 0)
      : [];
    const wetStr = showWet ? toPts(at.path_wet_px) : "";
    const vp = at.vacuum_position_px;
    const rob = vp ? { x: vp.x as number, y: vp.y as number } : null;
    let head: { x: number; y: number } | null = null;
    if (rob && vp.a != null) {
      // Heading: the angle is reported in vacuum space; the mm→px transform flips
      // the y axis, so the px-space direction is (cos a, −sin a).
      const arad = (vp.a * Math.PI) / 180;
      head = { x: rob.x + rr * 1.3 * Math.cos(arad), y: rob.y - rr * 1.3 * Math.sin(arad) };
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
    const traceT = drySegs.length
      ? svg`${drySegs.map((s) => svg`<polyline points=${s} fill="none" stroke=${vac.path_color || color} stroke-width=${sw} stroke-linejoin="round" stroke-linecap="round" opacity="0.85"></polyline>`)}`
      : nothing;
    const useImg = !!(vac.robot_image_on_map && vac.image);
    const robSize = rr * 2.6 * ((vac.robot_size ?? 100) / 100);
    const robA = (vp && vp.a != null ? vp.a : 0) + (vac.robot_image_rotation ?? 0);
    const robotT = rob
      ? (useImg
          ? svg`<image href=${vac.image!} x=${(rob.x - robSize / 2).toFixed(1)} y=${(rob.y - robSize / 2).toFixed(1)} width=${robSize.toFixed(1)} height=${robSize.toFixed(1)} preserveAspectRatio="xMidYMid meet" transform=${"rotate(" + robA + " " + rob.x.toFixed(1) + " " + rob.y.toFixed(1) + ")"}></image>`
          : svg`${head ? svg`<line x1=${rob.x.toFixed(1)} y1=${rob.y.toFixed(1)} x2=${head.x.toFixed(1)} y2=${head.y.toFixed(1)} stroke="#ffffff" stroke-width=${(rr * 0.3).toFixed(2)} stroke-linecap="round"></line>` : nothing}<circle cx=${rob.x.toFixed(1)} cy=${rob.y.toFixed(1)} r=${rr.toFixed(1)} fill=${color} stroke="#ffffff" stroke-width=${(rr * 0.18).toFixed(2)}></circle>`)
      : nothing;
    // Robot-error halo: a soft pulsing red glow behind the robot marker, so an
    // active error is visible directly on the map, not just in the status card.
    // Filter id is per-vacuum-entity to avoid collisions between multiple <svg>
    // overlays (merged mode renders one per vacuum, all in the same shadow root).
    const hasErr = rob && this._hasError(vac);
    const errFilterId = "avc-err-blur-" + vac.entity.replace(/[^a-zA-Z0-9]/g, "-");
    const errHalo = hasErr
      ? svg`<defs><filter id=${errFilterId} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation=${(rr * 0.5).toFixed(2)}></feGaussianBlur>
            </filter></defs>
            <circle class="avc-err-halo" cx=${rob!.x.toFixed(1)} cy=${rob!.y.toFixed(1)} r=${(rr * 2.2).toFixed(1)}
              fill="#ff3b30" filter=${"url(#" + errFilterId + ")"}></circle>`
      : nothing;
    return html`<svg class="map-vector" viewBox="0 0 ${NW} ${NH}" preserveAspectRatio="none" style=${styleMap(seat)}>${mopBand}${mopLine}${traceT}${errHalo}${robotT}</svg>`;
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
    const cur = this._layersEff();
    const next = { ...cur, [type]: !cur[type] };
    const ent = this._selSensor();
    if (ent && this.hass.states[ent]?.attributes?.view_layers) {
      // Backend-shared view state — persists refreshes, syncs across devices.
      this._call("anyvac", "set_layers", next);
    } else {
      this._layers = next;
    }
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

  /** Oldest per-type (dry/wet) last-cleaned age across a set of vacuums \u2014 shared
   *  by the legacy floating pill and the grid meta bar's compact toggle. */
  private _oldestAgeDays(vacs: VacuumConfig[], type: "dry" | "wet"): number | null {
    let max: number | null = null;
    for (const v of vacs) {
      if (!this._intAttrs(v)) continue;
      const rlc = this._intAttrs(v)?.rooms_last_cleaned as Record<string, any> | undefined;
      if (!rlc) continue;
      for (const rec of Object.values(rlc)) {
        const d = this._ageDaysFromIso((rec as any)?.[type]);
        if (d !== null && (max === null || d > max)) max = d;
      }
    }
    return max;
  }
  private _ageBadgeStr(d: number | null): string {
    return d === null ? "\u2014" : d < 1 ? "<1d" : Math.round(d) + "d";
  }
  /** Compact dry/wet visibility toggle for the grid meta bar (docs/19 A4) \u2014 a
   *  plain click-to-toggle icon+age chip, no hold-to-open per-room menu: that
   *  menu duplicated the always-visible dock room list in landscape. The
   *  legacy floating `_renderLayerToggles` (below) keeps its hold-menu \u2014 the
   *  canon commitment is that render without a `layout:` block never changes. */
  private _renderLayerToggleCompact(vacs: VacuumConfig[]) {
    const withInt = vacs.filter((v) => this._intAttrs(v));
    if (!withInt.length) return nothing;
    const L = this._layersEff();
    return html`
      <button class="mtbtn ${L.dry ? "on" : ""}" title="Dry layer visibility \u2014 tap to toggle"
        @click=${() => this._onLayerClick("dry")}>
        <ha-icon icon="mdi:broom"></ha-icon><span>${this._ageBadgeStr(this._oldestAgeDays(withInt, "dry"))}</span>
      </button>
      <button class="mtbtn ${L.wet ? "on" : ""}" title="Wet layer visibility \u2014 tap to toggle"
        @click=${() => this._onLayerClick("wet")}>
        <ha-icon icon="mdi:water"></ha-icon><span>${this._ageBadgeStr(this._oldestAgeDays(withInt, "wet"))}</span>
      </button>
    `;
  }

  private _renderLayerToggles(vacs: VacuumConfig[]) {
    const withInt = vacs.filter((v) => this._intAttrs(v));
    if (!withInt.length) return nothing;
    const oldest = (type: "dry" | "wet") => this._oldestAgeDays(withInt, type);
    const badge = (d: number | null) => this._ageBadgeStr(d);
    const L = this._layersEff();
    return html`
      <div class="layer-toggles">
        <button class="layer-btn ${L.dry ? "on" : ""}" title="Dry \u2014 tap to toggle, hold for rooms"
          @pointerdown=${() => this._onLayerDown("dry")} @pointerup=${() => this._onLayerUp()} @pointerleave=${() => this._onLayerUp()}
          @click=${() => this._onLayerClick("dry")}>
          <ha-icon icon="mdi:broom"></ha-icon><span>${badge(oldest("dry"))}</span>
        </button>
        <button class="layer-btn ${L.wet ? "on" : ""}" title="Wet \u2014 tap to toggle, hold for rooms"
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
    if (!shown.some((v) => this._intAttrs(v))) return nothing;
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
          const locked = this._mapMode !== "normal";
          return html`
            <button class="room-row ${sel ? "on" : ""} ${locked ? "room-overlay--locked" : ""}" ?disabled=${locked}
              title=${locked ? "Room selection is off while placing a pin/zone" : ""}
              @click=${() => { if (!locked) this._toggleRoomAcross(r.key, shown); }}>
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

  /** Narrow (mobile) card → rotate the map to portrait (auto, unless disabled).
   *  With a layout: block the portrait PROFILE drives the rotation (docs/18);
   *  without one the legacy card-width heuristic applies. */
  private get _narrow(): boolean {
    const mr = this._config.mobile_rotate as string | undefined;
    if (mr === "off") return false;
    if (mr === "always" || mr === "on") return true;  // force (good for testing)
    if (this._config.layout) return this._profile === "portrait";
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
   *  phone instead of a thin letterbox. Controls outside the map-wrap stay upright.
   *  In grid mode (docs/18 §7) the rotated map is fitted EXACTLY into the measured
   *  map-region box instead of the legacy width × cap heuristic — no scroll, no cap. */
  private _renderResponsive(mapHtml: unknown) {
    if (!this._config.layout) {
      // Legacy (no `layout:` block) — completely unchanged, width×cap heuristic.
      if (!this._narrow) return mapHtml;
      const ar = this._mapAR > 0.1 ? this._mapAR : 3.636;
      const W = this._cardW || this.clientWidth || 360;
      const capH = (typeof window !== "undefined" ? window.innerHeight : 800) * 1.4;
      const visH = W * ar;
      const scale = visH > capH ? capH / visH : 1;
      const rW = Math.round(W * scale);
      const rH = Math.round(visH * scale);
      return html`
        <div class="avc-rot" style="position:relative;width:${rW}px;height:${rH}px;margin:0 auto;overflow:hidden">
          <div style="position:absolute;top:0;left:0;width:${rH}px;height:${rW}px;transform-origin:top left;transform:translateX(${rW}px) rotate(90deg)">
            ${mapHtml}
          </div>
        </div>
      `;
    }

    // Grid mode (docs/19 follow-up): fit the map into the measured region box —
    // exact, since the box is whatever the grid ACTUALLY allocated, not a guess
    // (this is what fixes landscape cropping content that didn't fit the "auto"
    // row's real height). Portrait rotates 90° first; landscape doesn't.
    if (this._mapRegW <= 4 || this._mapRegH <= 4) return mapHtml; // not measured yet
    const ar = this._mapAR > 0.1 ? this._mapAR : 3.636;
    const rotate = this._narrow;
    // Content aspect AS IT SITS IN THE BOX: rotating a wide (ar > 1) floorplan
    // makes it tall, i.e. 1/ar. General contain/cover formula below is the same
    // shape either way with this one term swapped (verified against the
    // previously-shipped rotated-only version, which is the ar_eff = 1/ar case).
    const arEff = rotate ? 1 / ar : ar;
    // "contain" (default) sizes the content to exactly fit the box — no
    // cropping, but a mismatched aspect ratio leaves empty bars on whichever
    // axis isn't the constraining one. "cover" makes the content the box's
    // size or BIGGER in both axes so it always fills the region; offset_x/
    // offset_y then pick what gets cropped (0 = centered) — note this can
    // ONLY move the crop, not remove it: filling the previously-short axis
    // necessarily overflows the other one when the aspect ratios don't match
    // (uniform scaling can't do otherwise without distorting the image).
    const crop = this._config.layout[this._profile]?.crop;
    const cover = crop?.fit === "cover";
    const boxW = this._mapRegW, boxH = this._mapRegH;
    let rW: number, rH: number;
    if (cover) { rW = Math.max(boxW, boxH * arEff); rH = Math.max(boxH, rW / arEff); }
    else { rW = Math.min(boxW, boxH * arEff); rH = Math.min(boxH, rW / arEff); }
    rW = Math.floor(rW);
    rH = Math.floor(rH);
    // The content (rW×rH on screen) may now be bigger than the clipping box
    // (boxW×boxH) in one axis — center it there by default, offset by the
    // configured pan. When rW===boxW and rH===boxH (the default contain case,
    // whichever axis is the constraining one) this is exactly 0, so nothing
    // shifts.
    const panX = -(rW - boxW) / 2 + ((crop?.offset_x ?? 0) / 100) * ((rW - boxW) / 2);
    const panY = -(rH - boxH) / 2 + ((crop?.offset_y ?? 0) / 100) * ((rH - boxH) / 2);

    if (rotate) {
      // Stashed for `_refineGridColumns` (portrait's map/dock column split) —
      // plain field, doesn't trigger a render itself.
      this._lastPortraitFitW = rW;
      // .avc-rot lets CSS counter-rotate small on-map chips (gauges, prog
      // chips, room icons) so their text stays upright while the map itself
      // is rotated.
      return html`
        <div class="avc-rot" style="position:relative;width:${boxW}px;height:${boxH}px;margin:0 auto;overflow:hidden">
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;transform:translate(${panX}px,${panY}px)">
            <div style="position:absolute;top:0;left:0;width:${rH}px;height:${rW}px;transform-origin:top left;transform:translateX(${rW}px) rotate(90deg)">
              ${mapHtml}
            </div>
          </div>
        </div>
      `;
    }
    return html`
      <div style="position:relative;width:${boxW}px;height:${boxH}px;margin:0 auto;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:${rW}px;height:${rH}px;transform:translate(${panX}px,${panY}px)">
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
        ${shown.map((v) => (this._intAttrs(v) ? this._renderIntegrationOverlay(v, this._effectiveSeat(v)) : nothing))}
        ${this._config.layout ? nothing : this._renderLayerToggles(shown)}
        ${this._renderMergedRooms(shown)}
        ${/* Pin & Go / Zone interaction layer — merged mode used to render NONE of
           this (only split-mode _renderMap had it), so clicks fell straight through
           to room-select regardless of the active mode (bugfix, docs/19). Mirrors
           _renderMap 1:1, just scoped per shown vacuum since merged mode overlays
           several .map-img elements in one wrapper. Also stays mounted once a zone
           box exists and is still awaiting confirm (`_hasZoneEditTarget`), even
           after mode resets to normal, so the box can still be dragged/resized. */
        shown.map((v) => (this._mapMode !== "normal" && this._isModeCandidate(v)) || (this._zoneRectShown && this._hasZoneEditTarget(v))
          ? html`<div class="map-clickcatch" style="touch-action:none"
              @click=${(e: MouseEvent) => this._onMapClick(v, e)}
              @pointerdown=${(e: PointerEvent) => this._onZoneDown(v, e)}
              @pointermove=${(e: PointerEvent) => this._onZoneMove(v, e)}
              @pointerup=${(e: PointerEvent) => this._onZoneUp(v, e)}></div>`
          : nothing)}
        ${shown.map((v, idx) => {
          const box = this._zoneRectFor(v, idx === 0);
          return box ? html`<div class="zone-rect" style=${styleMap({
              left: Math.min(box.x0, box.x1) + "%",
              top: Math.min(box.y0, box.y1) + "%",
              width: Math.abs(box.x1 - box.x0) + "%",
              height: Math.abs(box.y1 - box.y0) + "%",
            })}>${this._renderZoneHandles()}</div>` : nothing;
        })}
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
        ${this._config.layout ? nothing : this._renderLayerToggles([vac])}
        ${(this._roomsFor(vac)).map((r) => this._renderRoomOverlay(r, vac))}
        ${(this._mapMode !== "normal" && this._isModeCandidate(vac)) || (this._zoneRectShown && this._hasZoneEditTarget(vac))
          ? html`<div class="map-clickcatch" style="touch-action:none"
              @click=${(e: MouseEvent) => this._onMapClick(vac, e)}
              @pointerdown=${(e: PointerEvent) => this._onZoneDown(vac, e)}
              @pointermove=${(e: PointerEvent) => this._onZoneMove(vac, e)}
              @pointerup=${(e: PointerEvent) => this._onZoneUp(vac, e)}></div>`
          : nothing}
        ${(() => {
          const box = this._zoneRectFor(vac, true);
          return box ? html`<div class="zone-rect" style=${styleMap({
              left: Math.min(box.x0, box.x1) + "%",
              top: Math.min(box.y0, box.y1) + "%",
              width: Math.abs(box.x1 - box.x0) + "%",
              height: Math.abs(box.y1 - box.y0) + "%",
            })}>${this._renderZoneHandles()}</div>` : nothing;
        })()}
      </div>
    `;
  }

  private _renderRoomOverlay(room: RoomConfig, vac: VacuumConfig, opts?: { vacs?: VacuumConfig[] }) {
    const selected = opts?.vacs ? this._isRoomSelectedAny(room.key, opts.vacs) : this._isRoomSelected(room, vac);
    const ageColor = this._roomBorderColor(room, vac);
    const anchor = room.icon_anchor ?? "c";
    // Mutual exclusion (docs/19 A3): while Pin & Go / Zone is active, room
    // selection is a different, contradictory intent (targeting a point/zone,
    // not a whole room) — disable it entirely rather than let both interpret
    // the same click.
    const locked = this._mapMode !== "normal";
    // Selection = a neutral highlight, never a vacuum's identity color (docs/19
    // A1): the old `this._color(vac)` fill collided with the age-gradient (S6's
    // green == "cleaned <2 days ago" green) and, in merged mode, was arbitrary
    // anyway — `vac` here is whichever vacuum's room list happened to define
    // this room, not necessarily who actually cleans it. Who's assigned is now
    // shown via avatar chips (reused from the dock) instead of area tinting.
    const SEL = "#ffffff";
    // Selected border as white with a crisp light-blue accent right in the
    // middle (user's revived idea, refined: a thin bright seam reads better at
    // this size than a broad 50% blend) — via `border-image` (needs a real
    // border shorthand for width/style first; unselected rooms keep a flat colour).
    const SEL_GRADIENT = "linear-gradient(135deg, #ffffff 0%, #ffffff 46%, #8ecbff 50%, #ffffff 54%, #ffffff 100%) 1";

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
      const borderC = selected ? SEL + "E0" : ageColor;
      const bg = selected ? SEL + "22" : "rgba(0,0,0,0.06)";
      const shadow = selected ? "0 0 18px rgba(255,255,255,0.7)" : "none";
      // Who's assigned (dry/wet), from the backend plan preview — only known
      // once selected (the preview is computed for the current selection).
      const dryEnt = selected ? this._planPreview?.dry.get(room.key) : undefined;
      const wetEnt = selected ? this._planPreview?.wet.get(room.key) : undefined;
      return html`
        <button
          class="room-overlay ${locked ? "room-overlay--locked" : ""}"
          ?disabled=${locked}
          style=${styleMap({
            left: room.map_x + "%", top: room.map_y + "%",
            width: room.map_w + "%", height: room.map_h + "%",
            border: borderW + " solid " + borderC,
            borderImage: selected ? SEL_GRADIENT : "none",
            background: bg, boxShadow: shadow,
            justifyContent: jc, alignItems: ai,
          })}
          @click=${() => { if (!locked) (opts?.vacs ? this._toggleRoomAcross(room.key, opts.vacs) : this._toggleRoom(room, vac)); }}
          title=${locked ? "Room selection is off while placing a pin/zone" : room.name} aria-label=${room.name}
          aria-pressed=${selected ? "true" : "false"}
        >
          ${!this._config.room_icon_hidden && anchor !== "none" && room.icon ? html`
            <ha-icon icon=${room.icon}
              style=${styleMap({ color: selected ? "white" : ageColor, "--mdc-icon-size": "16px" })}>
            </ha-icon>
          ` : nothing}
          ${/* Portrait's rotated map makes these tiny and sideways, and the
               same assignment is already legible in the dock room list right
               next to it — only show them where there's room to read them. */
            (dryEnt || wetEnt) && this._profile !== "portrait" ? html`
            <span class="room-overlay-assign">
              ${dryEnt ? this._vacChip(dryEnt, false) : nothing}
              ${wetEnt ? this._vacChip(wetEnt, false) : nothing}
            </span>
          ` : nothing}
          ${this._renderRoomGauge(opts?.vacs ?? [vac], room)}
        </button>
      `;
    }

    // ── Point mód (legacy) ──────────────────────────────────────
    const bg = selected ? SEL + "A8" : "rgba(0,0,0,0.55)";
    const shadow = selected ? "0 0 12px rgba(255,255,255,0.8)" : "none";
    return html`
      <button
        class="room-btn ${locked ? "room-overlay--locked" : ""}"
        ?disabled=${locked}
        style=${styleMap({
          left: room.map_x + "%", top: room.map_y + "%",
          background: bg,
          border: "4px solid " + (selected ? SEL : ageColor),
          borderImage: selected ? SEL_GRADIENT : "none",
          boxShadow: shadow,
        })}
        @click=${() => { if (!locked) (opts?.vacs ? this._toggleRoomAcross(room.key, opts.vacs) : this._toggleRoom(room, vac)); }}
        title=${locked ? "Room selection is off while placing a pin/zone" : room.name} aria-label=${room.name}
        aria-pressed=${selected ? "true" : "false"}
      >
        ${!this._config.room_icon_hidden ? html`
          <ha-icon icon=${room.icon || "mdi:square"}
            style=${styleMap({ color: selected ? "white" : "rgba(255,255,255,0.5)" })}>
          </ha-icon>
        ` : nothing}
        ${this._renderRoomGauge(opts?.vacs ?? [vac], room)}
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
    const hasError = this._hasError(vac);

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
    const color = this._color(vac);
    const ck = this._colorKey(vac);

    // Pending Pin & Go / Zone for THIS vacuum (docs/19 meta bar fix): the START
    // slot itself becomes the mode-aware action — "send here" / "clean zone
    // here" — instead of a separate banner stacked above the controller. Takes
    // priority over the normal start/pause/resume states: picking a vacuum for
    // a pin/zone is itself the intent, and in practice the vacuum is idle
    // whenever this is relevant.
    const pin = this._pinPending?.[vac.entity];
    const zone = this._zonePending?.[vac.entity];
    if (pin || zone) {
      const hId = "modeaction-" + vacIdx;
      const label = zone ? "Clean zone" : "Send here";
      const icon = zone ? "mdi:select-drag" : "mdi:map-marker-radius";
      const action = () => { if (zone) this._confirmZone(vac); else this._confirmPin(vac); };
      return html`
        <div class="actions">
          <button
            class="action-btn ${this._holdId === hId ? "action-btn--holding" : ""}"
            style=${styleMap({ background: COLOR_BG[ck], border: "1px solid " + color + "80" })}
            @pointerdown=${this._holdStart(hId, action)}
            @pointerup=${this._holdEnd}
            @pointerleave=${this._holdEnd}
            @pointercancel=${this._holdEnd}
          >
            <div class="hold-ring"></div>
            <ha-icon icon=${icon} style=${styleMap({ color })}></ha-icon>
            <span>${label}</span>
          </button>
        </div>
      `;
    }

    const cleaning = this._isCleaning(vac);
    const paused = this._isPaused(vac);
    const hasRooms = this._hasSelectedRooms(vac);
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
    return this._intAttrs(vac)?.vacuum_room_name as string | undefined;
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
    const ent = this._intEntity(vac);
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

  /** Vacuum indexes shown in the grid. Portrait split = single-vacuum focus
   *  (docs/18 §7b): only the first of the shown set renders; badges switch it. */
  private _gridShown(): number[] {
    const shown = [...this._shownSet].filter((i) => i < this._config.vacuums.length);
    if (this._profile === "portrait" && this._config.map_mode !== "merged" && shown.length > 1) {
      return shown.slice(0, 1);
    }
    return shown;
  }

  /** Named region template (docs/18 §3), built on demand — a region not placed
   *  in the active profile is never even computed. */
  private _regionTemplate(name: string, prof: Required<Omit<ProfileGridConfig, "crop">>): unknown {
    const shown = this._gridShown();
    const merged = this._config.map_mode === "merged";
    const vacsOf = (idxs: number[]) => idxs.map((i) => this._config.vacuums[i]);
    switch (name) {
      case "badges":
        // Stats/refresh/layer-toggles moved into the consolidated meta bar
        // (docs/19 A4, `tools` region). Landscape also moves vacuum picking
        // into the vertical `picker` region (docs/19 A5) — badges there is
        // global actions only; portrait keeps vacuum badges as its
        // single-focus switcher (no `picker` region placed there).
        return html`<div class="badges-row badges-row--grid">
          ${this._profile === "landscape" ? nothing : this._config.vacuums.map((v, i) => this._renderBadge(v, i))}
          ${(this._config.global_actions ?? []).map((ga, i) => this._renderGlobalBadge(ga, i))}
        </div>`;
      case "autobar":
        return this._renderAutoBar();
      case "plan":
        return this._renderPlanPreview();
      case "picker":
        return this._renderVacuumPicker();
      case "map": {
        // Layer toggles + refresh + Pin&go/zone all moved into the `tools`
        // region's consolidated meta bar (docs/19 A4) — the map region is
        // just the map(s) now.
        return merged
          ? this._renderResponsive(this._renderMergedMap())
          : html`${shown.map((i) => this._renderResponsive(this._renderMap(this._config.vacuums[i])))}`;
      }
      case "tools":
        return this._renderMetaBar(vacsOf(shown));
      case "dock":
        // The dock carries the orchestrated run footer when no `start` region is
        // placed in this profile (landscape, docs/18 §7d).
        return this._renderDock(!("start" in prof.place));
      case "start":
        return this._renderStartBar();
      case "status":
        return html`${shown.map((i) => this._renderStatusCard(this._config.vacuums[i], i))}`;
      default:
        return null;
    }
  }

  /** Grid render path (docs/18): active only with a `layout:` config block. */
  private _renderGrid(lay: LayoutConfig) {
    const prof = resolveProfile(lay, this._profile);
    const schemaWarn = this._schemaWarning();
    return html`
      <ha-card style="padding:0;display:block">
        ${this.editMode ? html`<div class="version-chip">v${CARD_VERSION} · ${Math.round(this._cardW)}w · ${this._profile}</div>` : nothing}
        <div class="avc-grid avc-grid--${this._profile}" style=${styleMap(gridRootStyles(lay, prof))}>
          ${schemaWarn ? html`<div class="avc-schemawarn">
            <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${schemaWarn}</span>
          </div>` : nothing}
          ${Object.entries(prof.place).map(([name, pl]) => {
            const tpl = this._regionTemplate(name, prof);
            if (tpl == null || tpl === nothing) return nothing;
            return html`<div class="avc-region avc-region--${name}" style=${styleMap(regionStyles(pl))}>${tpl}</div>`;
          })}
        </div>
      </ha-card>
    `;
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    if (this._config.layout) return this._renderGrid(this._config.layout);

    const schemaWarn = this._schemaWarning();
    return html`
      <ha-card>
        ${this.editMode ? html`<div class="version-chip">v${CARD_VERSION} · ${Math.round(this._cardW)}w</div>` : nothing}
        ${schemaWarn ? html`<div style="margin:0 4px;padding:8px 12px;border-radius:12px;border:1px solid rgba(250,173,20,0.55);background:rgba(250,173,20,0.12);color:#faad14;font-size:12px;display:flex;align-items:center;gap:8px">
          <ha-icon icon="mdi:alert" style="--mdc-icon-size:18px"></ha-icon><span>${schemaWarn}</span>
        </div>` : nothing}
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

    /* ── Grid layout (docs/18) ───────────────────────────────────────── */
    .badges-row--grid {
      align-items: center;
      padding: 4px 6px;
    }

    .stats-trio {
      display: flex;
      gap: 10px;
      margin-left: auto;
      align-items: center;
      padding-right: 4px;
    }
    .stat {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.75);
    }
    .stat ha-icon { --mdc-icon-size: 15px; color: rgba(255, 255, 255, 0.4); }
    .stat b { font-weight: 700; }
    .stat small { font-size: 10px; color: rgba(255, 255, 255, 0.4); }

    /* Emergency manual-control icon strip (docs/19 follow-up, portrait only).
       Full-width, one flex slot per vacuum (mirrors .dock-head/.dock-mode
       below it). The slot shares available width equally (n=2 → wide slots,
       n=4 → narrower) and the button fills its slot (width: 100%, capped by
       min/max-width) with aspect-ratio 1:1 keeping it a circle at any size —
       so the strip actually uses the space it has instead of staying pinned
       at a fixed 34px regardless of vacuum count (field feedback
       2026-07-17). */
    .vac-icon-strip { display: flex; gap: 6px; margin-bottom: 6px; }
    .vac-icon-slot { flex: 1; min-width: 0; display: flex; justify-content: center; }
    .vac-icon-btn {
      position: relative;
      width: 100%; min-width: 28px; max-width: 64px; aspect-ratio: 1 / 1; height: auto;
      border-radius: 50%; padding: 0; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.2); cursor: pointer;
      transition: opacity 0.15s ease;
    }
    .vac-icon-btn img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
    .vac-icon-btn ha-icon { --mdc-icon-size: 20px; }
    .vac-icon-btn--hidden { opacity: 0.35; }

    /* Vacuum picker (docs/19 A5): landscape's vertical replacement for the
     *  horizontal badge-row tabs, sits right above the dock room-list. */
    .vac-picker {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 6px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
    }
    .vac-picker .badge { width: 100%; box-sizing: border-box; }

    /* Dock (docs/12 §3): selection + plan + pinning in one column */
    .dock {
      display: flex;
      flex-direction: column;
      gap: 6px;
      height: 100%;
      padding: 6px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
    }
    /* Portrait-only dry/wet path visibility row (see _renderDock) — reuses
       .mtbtn from the meta bar, wrapped to full width like .dock-head below. */
    .dock-layers { display: flex; gap: 4px; margin-bottom: 4px; }
    .dock-layers .mtbtn { flex: 1; justify-content: center; }
    .dock-head { display: flex; gap: 4px; }
    .dock-mode {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 4px;
      border-radius: 9px;
      cursor: pointer;
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.5);
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .dock-mode ha-icon { --mdc-icon-size: 15px; }
    .dock-mode.on {
      color: #fff;
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.5);
    }
    .dock-rows {
      display: flex;
      flex-direction: column;
      gap: 3px;
      overflow-y: auto;
      min-height: 0;
      flex: 1;
    }
    .dock-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 7px;
      border-radius: 9px;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      color: rgba(255, 255, 255, 0.85);
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);
    }
    .dock-row.on {
      background: rgba(82, 196, 26, 0.1);
      border-color: rgba(82, 196, 26, 0.5);
    }
    .dock-ric { --mdc-icon-size: 16px; color: rgba(255, 255, 255, 0.55); flex-shrink: 0; }
    .dock-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      font-weight: 600;
    }
    /* Sequence hint (docs/19 follow-up, TODO #2) — amber, not red: it's a
       heads-up about ETA accuracy, not an error blocking the clean. */
    .dock-unseq { --mdc-icon-size: 13px; color: #d4a017; flex-shrink: 0; margin: 0 2px; }
    .dock-ages { display: inline-flex; gap: 6px; flex-shrink: 0; }
    .dock-age { display: inline-flex; align-items: center; gap: 2px; font-size: 10px; }
    .dock-age ha-icon { --mdc-icon-size: 12px; color: rgba(255, 255, 255, 0.3); }
    .dock-avatars { display: inline-flex; gap: 3px; flex-shrink: 0; }
    .dock-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 1px;
      min-width: 24px;
      height: 17px;
      padding: 0 5px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 700;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .dock-chip--empty { color: rgba(255, 255, 255, 0.25); border-color: rgba(255, 255, 255, 0.15); }
    .dock-chip--pinned { box-shadow: 0 0 0 1.5px currentColor; }
    .dock-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 6px;
    }
    .dock-est { font-size: 11px; color: rgba(255, 255, 255, 0.45); }

    /* START bar (portrait bottom, docs/18 §7d) */
    .start-bar {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 14px;
      cursor: pointer;
      font-family: inherit;
      font-size: 15px;
      font-weight: 800;
      color: #fff;
      background: rgba(82, 196, 26, 0.16);
      border: 1px solid rgba(82, 196, 26, 0.6);
    }
    .start-bar:disabled {
      cursor: default;
      color: rgba(255, 255, 255, 0.25);
      background: rgba(60, 60, 60, 0.4);
      border-color: rgba(255, 255, 255, 0.1);
    }
    .start-bar ha-icon { --mdc-icon-size: 22px; position: relative; z-index: 1; }
    .start-bar span { position: relative; z-index: 1; }
    .start-bar--cancel {
      background: rgba(250, 173, 20, 0.16);
      border-color: rgba(250, 173, 20, 0.6);
    }

    /* Grid badges-row extras */
    .badges-refresh { margin-left: auto; flex-shrink: 0; padding: 8px; }
    .stats-trio + .badges-refresh { margin-left: 6px; }
    .map-tools-label {
      font-size: 11px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.45);
      align-self: center;
      min-width: 64px;
    }

    /* Counter-rotate small on-map chips inside the rotated portrait map so their
     *  text stays upright (the rotation wrapper adds .avc-rot). */
    .avc-rot .room-gauge { transform: rotate(-90deg); }
    .avc-rot .rl-prog { transform: rotate(-90deg); }
    .avc-rot .room-btn > ha-icon,
    .avc-rot .room-overlay > ha-icon { transform: rotate(-90deg); }

    /* Portrait grid: compact badges (horizontal scroll, no wrap) + compact dock */
    .avc-grid--portrait .badges-row--grid {
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .avc-grid--portrait .badges-row--grid::-webkit-scrollbar { display: none; }
    .avc-grid--portrait .badge { padding: 4px 10px 4px 4px; gap: 6px; flex-shrink: 0; }
    .avc-grid--portrait .badge-img { width: 30px; height: 30px; }
    .avc-grid--portrait .badge-icon { --mdc-icon-size: 26px; }
    .avc-grid--portrait .badge-name { font-size: 11px; }
    .avc-grid--portrait .dock { padding: 4px; gap: 4px; }
    .avc-grid--portrait .dock-mode { padding: 6px 2px; }
    .avc-grid--portrait .dock-mode span { display: none; }
    .avc-grid--portrait .dock-name { display: none; }
    .avc-grid--portrait .dock-row { padding: 5px 5px; gap: 4px; flex-wrap: wrap; justify-content: center; }
    .avc-grid--portrait .dock-ages { gap: 3px; }
    .avc-grid--portrait .dock-age { font-size: 9px; }
    .avc-grid--portrait .dock-age ha-icon { --mdc-icon-size: 10px; }

    .avc-schemawarn {
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      padding: 8px 12px;
      border-radius: 12px;
      border: 1px solid rgba(250, 173, 20, 0.55);
      background: rgba(250, 173, 20, 0.12);
      color: #faad14;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: 90%;
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
    .badge--holding .hold-ring,
    .vac-icon-btn--holding .hold-ring {
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
    .avc-err-halo { animation: avc-err-pulse 1.3s ease-in-out infinite; }
    @keyframes avc-err-pulse { 0%,100% { opacity: 0.18; } 50% { opacity: 0.6; } }
    .zone-rect { position: absolute; border: 2px solid #fff; background: rgba(255,255,255,0.15); border-radius: 4px; pointer-events: none; box-shadow: 0 0 0 1px rgba(0,0,0,0.45); }
    /* Move/resize handles (docs/19 follow-up) — decoration only, no pointer
       handlers: the overlaying .map-clickcatch does the actual hit-testing
       (_zoneHit) so a drag anywhere near a corner resizes, and inside the box
       moves the whole rectangle. */
    .zone-handle { position: absolute; width: 12px; height: 12px; margin: -6px; border-radius: 50%; background: #fff; border: 2px solid rgba(0,0,0,0.45); pointer-events: none; }
    .zone-handle--nw { left: 0; top: 0; }
    .zone-handle--ne { left: 100%; top: 0; }
    .zone-handle--sw { left: 0; top: 100%; }
    .zone-handle--se { left: 100%; top: 100%; }
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
    /* Mutual exclusion: room selection disabled while Pin & Go / Zone is active
       (docs/19 A3) — dim + not-allowed cursor, no color-only distinction so it
       reads even on the age-gradient border colors. */
    .room-overlay--locked { opacity: 0.4; cursor: not-allowed; }
    /* Who's assigned to a selected room (docs/19 A1) — small chips, not area
       tinting, so assignment doesn't fight with the selection highlight or the
       age-gradient colors. */
    .room-overlay-assign {
      position: absolute;
      bottom: 2px;
      left: 2px;
      display: flex;
      gap: 2px;
      pointer-events: none;
      z-index: 4;
    }

    /* ── Debug per-room progress gauges (dry + wet) ──────────────────── */
    .room-gauges {
      position: absolute;
      top: 2px;
      right: 2px;
      display: flex;
      gap: 2px;
      pointer-events: none;
      z-index: 4;
    }
    .room-gauge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
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
    .mtbtn--stat { cursor: default; background: transparent; border-color: transparent; gap: 3px; padding: 5px 6px; }
    .mtbtn--stat b { font-weight: 700; }
    .mtbtn--stat small { opacity: 0.7; font-weight: 500; }
    /* Sequence hint (docs/19 follow-up, TODO #2) — amber to read as "heads up",
       distinct from the neutral stat pills either side of it. */
    .mtbtn--warn { color: #d4a017; }
    .mtbtn--warn ha-icon { color: #d4a017; }
    .mtbtn--push { margin-left: auto; }
    .meta-bar { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; padding: 4px 0; }
    .mode-action { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .mode-action .mtbtn { width: 100%; justify-content: center; box-sizing: border-box; animation: avc-mode-action-pulse 1.6s ease-in-out infinite; }
    @keyframes avc-mode-action-pulse { 0%,100% { box-shadow: 0 0 0 rgba(59,130,246,0); } 50% { box-shadow: 0 0 12px rgba(59,130,246,0.55); } }
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
