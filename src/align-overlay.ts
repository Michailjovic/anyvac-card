/**
 * docs/41 §4.1 — the Align-mode overlay's `document.body` portal: mount,
 * unmount, and enough style plumbing that content rendered inside it looks
 * exactly like it does inside the card (docs/14 rule 1: one theme system,
 * not two). This module owns NONE of the overlay's actual UI or state —
 * "portal je jen hostitel + styly" — that stays in `anyvac-card.ts`
 * (`_renderAlignOverlay()`), which Lit-`render()`s its template straight
 * into the host's shadow root from `updated()`. Kept dependency-free (no
 * Lit import) on purpose: mounting a portal is DOM plumbing, not a
 * component.
 *
 * z-index and stacking approach (`document.body` + very high z-index, no
 * source changes to HA itself) were confirmed against the user's real HA
 * instance via a live Claude-in-Chrome test (Session C, Krok 1) — see
 * docs/41 §5 bod 1: correctly covers the HA header/sidebar AND a genuinely
 * open `ha-dialog` more-info window, zero console errors.
 */

const TAG = "anyvac-align-overlay";

/** Bare host element. No shadow-DOM content of its own beyond what
 *  `mountAlignOverlay` sets up — the card owns everything rendered inside. */
export class AnyVacAlignOverlayHost extends HTMLElement {
  connectedCallback(): void {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
  }
}
if (!customElements.get(TAG)) customElements.define(TAG, AnyVacAlignOverlayHost);

/** HA/theme custom properties that genuinely need copying onto the portal —
 *  everything the card's OWN `--avc-*` tokens resolve to comes along for
 *  free via `adoptedStyleSheets` + the theme class (docs/41 §6 risk 7); a
 *  shadow tree only blocks SELECTOR rules from another shadow tree, never
 *  inherited custom-property VALUES, so most HA tokens set on `:root`/`html`
 *  already reach a `document.body` portal on their own — this allowlist is
 *  just insurance for the few genuinely useful ones a stray rule inside the
 *  card's stylesheet might reference directly (icon color fallbacks, HA's
 *  own font stack) rather than through an `--avc-*` indirection. */
const HA_TOKEN_ALLOWLIST = [
  "--primary-text-color",
  "--secondary-text-color",
  "--primary-background-color",
  "--card-background-color",
  "--primary-color",
  "--accent-color",
  "--divider-color",
  "--paper-font-body1_-_font-family",
  "--mdc-icon-font",
];

/**
 * Mounts a fresh portal host onto `document.body`. `sheets` are adopted
 * as-is into the portal's own shadow root (pass the CARD's own
 * `elementStyles`-derived `CSSStyleSheet[]` so every existing `.avc-*`/
 * `.align-*` rule is available unchanged — one stylesheet, not a forked
 * copy, docs/14 rule 1). `styleSource` is the card's own host element
 * (`this` from `anyvac-card.ts`) — its resolved HA tokens are copied onto
 * the portal (see `HA_TOKEN_ALLOWLIST`). The template itself is rendered
 * separately, into `host.shadowRoot`, by the caller (Lit's `render()`).
 */
export function mountAlignOverlay(sheets: CSSStyleSheet[], styleSource: Element): AnyVacAlignOverlayHost {
  const host = document.createElement(TAG) as AnyVacAlignOverlayHost;
  // Confirmed z-index (docs/41 §5 bod 1 live test) — above HA's header,
  // sidebar, and a real open `ha-dialog`.
  host.style.cssText = "position:fixed;inset:0;z-index:2147483647;";
  document.body.appendChild(host);
  const root = host.shadowRoot;
  if (root) {
    if (sheets.length && "adoptedStyleSheets" in root) {
      (root as ShadowRoot & { adoptedStyleSheets: CSSStyleSheet[] }).adoptedStyleSheets = sheets;
    }
    const cs = getComputedStyle(styleSource);
    for (const name of HA_TOKEN_ALLOWLIST) {
      const v = cs.getPropertyValue(name);
      if (v) host.style.setProperty(name, v);
    }
  }
  return host;
}

export function unmountAlignOverlay(host: AnyVacAlignOverlayHost | null | undefined): void {
  host?.remove();
}
