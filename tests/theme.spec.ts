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
  /**
   * What the Home Assistant dashboard behind the card looks like (docs/49 E4).
   * Reproduces the two things a real HA gives a card: `hass.themes.darkMode`
   * and the page colours — `ha-card { color: var(--primary-text-color) }` is
   * inherited by everything the card does not colour itself, which is how the
   * mismatch bug hid from the older tests.
   */
  ha?: "light" | "dark";
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { width = 1200, height = 800, config = {}, state = "docked", ha } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ width, height, config, state, PIXEL, ha }) => {
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
        ...(ha ? { themes: { darkMode: ha === "dark" } } : {}),
      };
      if (ha) {
        const wrap = w.__mockHa.cardWrap as HTMLElement;
        const dark = ha === "dark";
        wrap.style.setProperty("--primary-text-color", dark ? "#e1e1e1" : "#212121");
        wrap.style.background = dark ? "#111111" : "#fafafa";
        // What <ha-card> gives its children: inherited text colour.
        wrap.style.color = "var(--primary-text-color)";
      }
      w.__mockHa.cardWrap.style.width = width + "px";
      w.__mockHa.cardWrap.style.height = height + "px";
      w.__mockHa.cardWrap.appendChild(card);
    },
    { width, height, config, state, PIXEL, ha }
  );
}

/**
 * WCAG contrast of an element's text against what is really painted behind it:
 * its ancestors' backgrounds (across shadow boundaries) composited over white.
 * Returns null when the element is not rendered.
 */
function contrastOf(page: Page, selector: string): Promise<number | null> {
  return page.evaluate((selector) => {
    const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
    const el = card?.shadowRoot?.querySelector(selector) as HTMLElement | null;
    if (!el) return null;
    const parse = (c: string): [number, number, number, number] => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return [0, 0, 0, 0];
      const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    };
    const chain: HTMLElement[] = [];
    let n: Element | null = el;
    while (n) {
      chain.push(n as HTMLElement);
      const parent: Element | null = n.parentElement;
      n = parent ?? ((n.getRootNode() as ShadowRoot).host ?? null);
    }
    let bg: [number, number, number] = [255, 255, 255];
    for (const e of chain.reverse()) {
      const [r, g, b, a] = parse(getComputedStyle(e).backgroundColor);
      if (a > 0) bg = [r * a + bg[0] * (1 - a), g * a + bg[1] * (1 - a), b * a + bg[2] * (1 - a)];
    }
    const [fr, fg, fb, fa] = parse(getComputedStyle(el).color);
    const fgc = [fr * fa + bg[0] * (1 - fa), fg * fa + bg[1] * (1 - fa), fb * fa + bg[2] * (1 - fa)];
    const lum = (c: number[]) => {
      const f = c.map((v) => {
        const x = v / 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    };
    const l1 = lum(fgc), l2 = lum(bg);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }, selector);
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
  test("defaults to auto without any config (R4, docs/49)", async ({ page }) => {
    await mountCard(page, { ha: "dark" });
    await expect.poll(() => rootClass(page)).toContain("avc-theme--auto");
  });

  test("auto follows Home Assistant, not the OS (docs/49 E3)", async ({ page }) => {
    // HA light + OS dark, and the reverse: the palette is HA's verdict.
    await page.emulateMedia({ colorScheme: "dark" });
    await mountCard(page, { ha: "light" });
    await expect.poll(() => rootClass(page)).toContain("avc-theme--light");
    await expect.poll(() => rootClass(page)).not.toContain("avc-theme--dark");
    await page.reload();
    await page.emulateMedia({ colorScheme: "light" });
    await mountCard(page, { ha: "dark" });
    await expect.poll(() => rootClass(page)).toContain("avc-theme--dark");
  });

  test("auto falls back to the OS preference when HA does not say", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await mountCard(page);
    await expect.poll(() => rootClass(page)).toContain("avc-theme--light");
    await page.reload();
    await page.emulateMedia({ colorScheme: "dark" });
    await mountCard(page);
    await expect.poll(() => rootClass(page)).toContain("avc-theme--dark");
  });

  // docs/49 E4 — the matrix the 1.51.5 audit measured by hand. Titles used to
  // inherit Home Assistant's text colour while the card painted its own panel,
  // so dark-on-dark / light-on-light was possible for any mismatch.
  for (const ha of ["light", "dark"] as const) {
    for (const theme of ["dark", "light", "auto"] as const) {
      for (const os of ["light", "dark"] as const) {
        test(`titles stay readable: HA ${ha} · theme ${theme} · OS ${os}`, async ({ page }) => {
          await page.emulateMedia({ colorScheme: os });
          await mountCard(page, { ha, config: { theme } });
          await expect.poll(() => rootClass(page)).toContain("avc-theme");
          let seen = 0;
          for (const sel of [".hero-title", ".tile-name", ".plan-name"]) {
            const c = await contrastOf(page, sel);
            if (c === null) continue;
            seen++;
            expect(c, `${sel} contrast`).toBeGreaterThanOrEqual(4.5);
          }
          expect(seen, "at least one title element rendered").toBeGreaterThan(0);
        });
      }
    }
  }

  test("what is painted on the map keeps its own white ink in a light theme", async ({ page }) => {
    await mountCard(page, { ha: "light", config: { theme: "light" } });
    await page.waitForFunction(() => {
      const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
      return !!card?.shadowRoot?.querySelector(".map-wrap");
    });
    const color = await page.evaluate(() => {
      const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
      return getComputedStyle(card.shadowRoot.querySelector(".map-wrap")).color;
    });
    expect(color).toBe("rgb(255, 255, 255)");
  });

  test("a themed card paints its own opaque base (docs/49 E2)", async ({ page }) => {
    await mountCard(page, { ha: "dark", config: { theme: "light" } });
    await expect
      .poll(() =>
        page.evaluate(() => {
          const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
          const root = card?.shadowRoot?.querySelector("ha-card") as HTMLElement | null;
          return root ? getComputedStyle(root).backgroundColor : "";
        })
      )
      .toBe("rgb(252, 252, 253)");
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

  /** Deepest active element, piercing shadow roots. */
  async function focusRing(page: Page): Promise<{ tag: string; cls: string; width: string; color: string }> {
    return page.evaluate(() => {
      let el: Element | null = document.activeElement;
      while ((el as HTMLElement | null)?.shadowRoot?.activeElement) {
        el = (el as HTMLElement).shadowRoot!.activeElement;
      }
      const s = el ? getComputedStyle(el) : null;
      return {
        tag: el ? el.tagName.toLowerCase() : "",
        cls: el ? el.className.toString() : "",
        width: s ? s.outlineWidth : "",
        color: s ? s.outlineColor : "",
      };
    });
  }

  // Tab from a fresh page — never click first, or the browser's own heuristic
  // decides the last interaction was a pointer and :focus-visible stops
  // matching, which is exactly the behaviour these rules rely on.
  async function tabToCardButton(page: Page) {
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      const r = await focusRing(page);
      if (r.tag === "button" && r.cls) return r;
    }
    throw new Error("no focusable card button reached via Tab");
  }

  test("keyboard focus draws an accent ring; a click does not", async ({ page }) => {
    await mountCard(page);
    const r = await tabToCardButton(page);
    expect(r.width).toBe("2px");
    expect(r.color).toBe("rgb(111, 191, 115)");

    // Same element, reached by pointer: :focus-visible must stop matching, or
    // every tap would leave a ring behind on touch devices. The press
    // feedback is what answers a tap.
    await page.evaluate(() => {
      let el: Element | null = document.activeElement;
      while ((el as HTMLElement | null)?.shadowRoot?.activeElement) {
        el = (el as HTMLElement).shadowRoot!.activeElement;
      }
      (el as HTMLElement).blur();
    });
    await page.mouse.click(5, 5);
    const after = await focusRing(page);
    expect(after.color).not.toBe("rgb(111, 191, 115)");
  });

  test("theme: legacy keeps the browser default focus ring", async ({ page }) => {
    // The focus styling is scoped to .avc-theme like every other 1.2.0 rule,
    // so `legacy` stays exactly what it was — unstyled, but still accessible.
    await mountCard(page, { config: { theme: "legacy" } });
    const r = await tabToCardButton(page);
    expect(r.color).not.toBe("rgb(111, 191, 115)");
  });

  test("reduce_motion disables the press feedback", async ({ page }) => {
    await mountCard(page, { config: { reduce_motion: true } });
    await expect.poll(() => rootClass(page)).toContain("avc-still");
    await expect.poll(() => tokenAt(page, "ha-card", "--avc-press")).toBe("1");
  });
});
