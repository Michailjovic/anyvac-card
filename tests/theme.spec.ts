import { test, expect, type Page } from "@playwright/test";

/**
 * docs/35 — theming regression tests, run against the same mock HA DOM harness
 * as tests/layout.spec.ts.
 *
 * The mechanism under test is deliberately indirect and therefore worth
 * pinning down: every colour in the stylesheet resolves through a small set of
 * channel tokens on the card root, and `.map-wrap` pins those channels back to
 * white-on-black so a light theme cannot reach the labels drawn on the vacuum's
 * own map bitmap. Nothing about that is visible by reading a single rule, and
 * getting it wrong fails in the one place a developer is least likely to look
 * (a light-theme dashboard, on the map, where every label goes invisible).
 */

const PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

interface MountOpts {
  width?: number;
  height?: number;
  /** Extra top-level card config merged over the base (theme, accent, ...). */
  config?: Record<string, unknown>;
  /** Vacuum entity state; "cleaning" takes the card out of its resting state. */
  state?: string;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { width = 1200, height = 800, config = {}, state = "docked" } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ width, height, config, state, PIXEL }) => {
      const w = window as any;
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        layout: {},
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            color: "green",
            rooms: [],
            // Gives the card a `.map-wrap` to render without needing a map
            // entity — that wrapper is what the on-map channel reset hangs off.
            image_base: { src: PIXEL },
            clean_action: { type: "native" },
          },
        ],
        ...config,
      });
      card.hass = {
        states: {
          "vacuum.my_roborock": {
            entity_id: "vacuum.my_roborock",
            state,
            attributes: { friendly_name: "Roborock", battery_level: 80 },
            last_changed: new Date().toISOString(),
            last_updated: new Date().toISOString(),
          },
        },
        localize: (k: string) => k,
        language: "en",
        callService: async () => {},
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = width + "px";
      w.__mockHa.cardWrap.style.height = height + "px";
      w.__mockHa.cardWrap.appendChild(card);
    },
    { width, height, config, state, PIXEL }
  );
}

/** Resolved value of a custom property at the given selector inside the card. */
function tokenAt(page: Page, selector: string, prop: string): Promise<string> {
  return page.evaluate(
    ({ selector, prop }) => {
      const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
      const el = card?.shadowRoot?.querySelector(selector) as HTMLElement | null;
      return el ? getComputedStyle(el).getPropertyValue(prop).trim() : "";
    },
    { selector, prop }
  );
}

function rootClass(page: Page): Promise<string> {
  return page.evaluate(() => {
    const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
    const root = card?.shadowRoot?.querySelector("ha-card") as HTMLElement | null;
    return root ? root.className : "";
  });
}

test.describe("theming (docs/35)", () => {
  test("defaults to the dark theme without any config", async ({ page }) => {
    await mountCard(page);
    await expect.poll(() => rootClass(page)).toContain("avc-theme--dark");
  });

  test("theme: legacy applies no theme class at all", async ({ page }) => {
    // The pre-1.2.0 look is the absence of a theme, not a theme of its own —
    // `:host` already carries those values. If a class ever appears here, the
    // escape hatch has quietly stopped being an escape hatch.
    await mountCard(page, { config: { theme: "legacy" } });
    await expect.poll(() => rootClass(page)).not.toContain("avc-theme");
    await expect.poll(() => tokenAt(page, "ha-card", "--avc-ink-rgb")).toBe("255, 255, 255");
  });

  test("theme: light flips the card's ink channel but never the map's", async ({ page }) => {
    await mountCard(page, { config: { theme: "light" } });
    // Card chrome goes dark-on-light...
    await expect.poll(() => tokenAt(page, "ha-card", "--avc-ink-rgb")).toBe("26, 29, 37");
    // ...while everything painted on the vacuum's own map bitmap stays white.
    // Without the .map-wrap reset this reads "26, 29, 37" too and every on-map
    // label disappears into the floorplan.
    await expect.poll(() => tokenAt(page, ".map-wrap", "--avc-ink-rgb")).toBe("255, 255, 255");
  });

  test("a painted colour resolves the channel per element, not once at :host", async ({ page }) => {
    // The stylesheet spells out rgb(var(--avc-ink-rgb)) at every use site
    // rather than aliasing it to a --avc-ink token, because a custom property
    // containing var() is substituted where it is DECLARED and inherits already
    // resolved — an alias would freeze at the :host value and silently ignore
    // both the theme class and the .map-wrap reset. This probes that with the
    // same construct the rules use, on a real painted property.
    await mountCard(page, { config: { theme: "light" } });
    await page.waitForFunction(() => {
      const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
      return !!card?.shadowRoot?.querySelector(".map-wrap");
    });
    const probed = await page.evaluate(() => {
      const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
      const root = card.shadowRoot as ShadowRoot;
      const probe = (host: Element) => {
        const s = document.createElement("span");
        s.style.color = "rgb(var(--avc-ink-rgb))";
        host.appendChild(s);
        const c = getComputedStyle(s).color;
        s.remove();
        return c;
      };
      return {
        chrome: probe(root.querySelector("ha-card")!),
        onMap: probe(root.querySelector(".map-wrap")!),
      };
    });
    expect(probed.chrome).toBe("rgb(26, 29, 37)");
    expect(probed.onMap).toBe("rgb(255, 255, 255)");
  });

  test("accent config reaches the accent channel; a bad value is dropped", async ({ page }) => {
    await mountCard(page, { config: { accent: "#A87CC0" } });
    await expect.poll(() => tokenAt(page, "ha-card", "--avc-accent-rgb")).toBe("168, 124, 192");

    // An unparseable accent must fall back to the token default rather than be
    // written through — an invalid custom-property value would poison every
    // rule referencing it, START included.
    await page.reload();
    await mountCard(page, { config: { accent: "not-a-colour" } });
    await expect.poll(() => tokenAt(page, "ha-card", "--avc-accent-rgb")).toBe("111, 191, 115");
  });

  test("calm state is on while docked and off while cleaning", async ({ page }) => {
    await mountCard(page, { state: "docked" });
    await expect.poll(() => rootClass(page)).toContain("avc-calm");

    await page.reload();
    await mountCard(page, { state: "cleaning" });
    await expect.poll(() => rootClass(page)).not.toContain("avc-calm");
  });

  test("reduce_motion disables the press feedback", async ({ page }) => {
    await mountCard(page, { config: { reduce_motion: true } });
    await expect.poll(() => rootClass(page)).toContain("avc-still");
    await expect.poll(() => tokenAt(page, "ha-card", "--avc-press")).toBe("1");
  });
});
