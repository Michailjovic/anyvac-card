import { test, expect, type Page } from "@playwright/test";

/**
 * docs/21 §5e — layout hardening regression tests, run against the mock HA
 * DOM harness (tests/harness/mock-ha.html). Deliberately narrow scope: these
 * cover the geometric regressions the layout-hardening pass (docs/21 §5a/§5b/
 * §5f) targets, not the whole card. See docs/21 for why jsdom is unusable
 * here (no layout engine) and why a real browser is required.
 */

interface MockConfig {
  width: number;
  height: number;
}

/** Minimal HA-shaped config/hass needed for a grid-mode render (`layout: {}`
 *  activates the profile-picking code path under test) — the exact shape was
 *  verified empirically against the real bundle, not guessed. */
async function mountCard(page: Page, opts: MockConfig): Promise<void> {
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(({ width, height }) => {
    const w = window as any;
    const card = document.createElement("anyvac-card") as any;
    const config = {
      type: "custom:anyvac-card",
      layout: {},
      vacuums: [
        { entity: "vacuum.my_roborock", name: "Roborock", color: "green", rooms: [], clean_action: { type: "native" } },
      ],
    };
    const hass = {
      states: {
        "vacuum.my_roborock": {
          entity_id: "vacuum.my_roborock",
          state: "docked",
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
    card.setConfig(config);
    card.hass = hass;
    card.editMode = true;
    w.__mockHa.cardWrap.style.width = width + "px";
    w.__mockHa.cardWrap.style.height = height + "px";
    w.__mockHa.cardWrap.appendChild(card);
  }, opts);
}

function chipText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const card = ((window as any).__mockHa.cardWrap.querySelector("anyvac-card")) as any;
    const chip = card?.shadowRoot?.querySelector(".version-chip");
    return chip ? (chip.textContent ?? "") : "";
  });
}

function gridHeight(page: Page): Promise<number | null> {
  return page.evaluate(() => {
    const card = ((window as any).__mockHa.cardWrap.querySelector("anyvac-card")) as any;
    const grid = card?.shadowRoot?.querySelector(".avc-grid") as HTMLElement | null;
    return grid ? grid.getBoundingClientRect().height : null;
  });
}

test.describe("layout hardening (docs/21)", () => {
  test("5f: profile is picked from the card's own box, not the window", async ({ page }) => {
    // Wide+short window, but the card itself sits in a narrow, tall box —
    // the kind of embedding (two cards side by side, sections view, sidebar)
    // window.innerWidth/innerHeight couldn't see before this fix.
    await page.setViewportSize({ width: 1600, height: 900 });
    await mountCard(page, { width: 300, height: 700 });
    await expect.poll(() => chipText(page)).toContain("portrait");
  });

  test("5f: a landscape-shaped card box still picks landscape", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await mountCard(page, { width: 1200, height: 800 });
    await expect.poll(() => chipText(page)).toContain("landscape");
  });

  test("5b: grid stays healthy across simulated HA edit-mode reparenting", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await mountCard(page, { width: 1200, height: 800 });
    await expect.poll(() => chipText(page)).toContain("landscape");

    const before = await gridHeight(page);
    expect(before).not.toBeNull();
    expect(before as number).toBeGreaterThan(120);

    // HA reparents the card into hui-card-options — same slot, same
    // ancestor chain, no window resize, no event fired.
    await page.evaluate(() => (window as any).__mockHa.enterEdit());
    await page.waitForTimeout(200);

    const duringEdit = await gridHeight(page);
    expect(duringEdit).not.toBeNull();
    expect(duringEdit as number).toBeGreaterThan(120);
    // 2026-07-17 follow-up: the mock's hui-card-options actions bar is 32px
    // tall (tests/harness/mock-ha.html) — _editBarHeight() should reserve
    // roughly that much, not just avoid collapsing to zero.
    const shrink = (before as number) - (duringEdit as number);
    expect(shrink).toBeGreaterThanOrEqual(25);
    expect(shrink).toBeLessThanOrEqual(40);

    await page.evaluate(() => (window as any).__mockHa.exitEdit());
    await page.waitForTimeout(200);

    const after = await gridHeight(page);
    expect(after).not.toBeNull();
    expect(after as number).toBeGreaterThan(120);
    // Regression guard for the 0.59.0-0.61.0 class of bug: the grid must
    // never collapse to a degenerate height after an edit-mode transition.
    expect(Math.abs((after as number) - (before as number))).toBeLessThan(50);
  });

  test("5a: measurement completes on a backgrounded tab (rAF neutered + document.hidden)", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await mountCard(page, { width: 1200, height: 800 });
    await expect.poll(() => chipText(page)).toContain("landscape");

    await page.evaluate(() => {
      const w = window as any;
      // Simulate the real, observed kiosk/background-tab behavior: rAF is
      // schedulable but its callback never actually runs. The pre-5a code
      // (pure rAF) would hang forever here; the fix takes the
      // document.hidden -> setTimeout branch instead.
      w.__origRAF = window.requestAnimationFrame;
      window.requestAnimationFrame = () => {
        w.__rafBlockedCalls = (w.__rafBlockedCalls || 0) + 1;
        return 0;
      };
      Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
    });

    // Resize the card's own box while "hidden" — must still be picked up
    // (via setTimeout(fn, 0)), not hang until the tab regains focus.
    await page.evaluate(() => {
      (window as any).__mockHa.cardWrap.style.width = "300px";
      (window as any).__mockHa.cardWrap.style.height = "700px";
    });

    await expect.poll(() => chipText(page), { timeout: 3000 }).toContain("portrait");

    // The fix branches on document.hidden BEFORE ever calling
    // requestAnimationFrame — so the neutered rAF mock above should never
    // even be invoked while hidden. This is the real assertion: the
    // setTimeout branch was taken, not rAF (which the resize's chip update
    // above already proves succeeded despite rAF being unusable).
    const blockedRafCalls = await page.evaluate(() => (window as any).__rafBlockedCalls ?? 0);
    expect(blockedRafCalls).toBe(0);
  });
});
