import { test, expect, type Page } from "@playwright/test";

/**
 * docs/44 F2 — hero bar, robot tiles and the robot sheet (card 1.39.0).
 *
 * What would regress silently:
 *  - per-robot START moved from the tile into the sheet: an idle tile must not
 *    carry it, the sheet must;
 *  - the states that need an immediate answer stay ON the tile — above all a
 *    pending Pin & Go / Zone pick (docs/19), which is confirmed per robot;
 *  - the hero only formats what the integration publishes (`job_progress`),
 *    never computes a time itself;
 *  - themed cards use the calmer status palette, legacy keeps the old one.
 */

const PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

interface Opts {
  theme?: string;
  state?: string;
  job?: Record<string, unknown> | null;
  width?: number;
  height?: number;
}

async function mount(page: Page, opts: Opts = {}): Promise<void> {
  const { theme = "dark", state = "docked", job = null, width = 1270, height = 714 } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHa !== undefined && (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, state, job, width, height, PIXEL }) => {
    const w = window as any;
    w.__moreInfo = [];
    const card = document.createElement("anyvac-card") as any;
    const iso = (d: number) => new Date(Date.now() - d * 86400000).toISOString();
    card.setConfig({
      type: "custom:anyvac-card", layout: {}, theme, map_mode: "merged",
      image_base: { src: PIXEL },
      rooms: [{ key: "Hall", name: "Hall", map_x: 50, map_y: 50, map_w: 20, map_h: 20 }],
      vacuums: [
        { entity: "vacuum.a", name: "S6", color: "#6FBF73", clean_type: "dry", integration_entity: "sensor.anyvac_a",
          battery_entity: "sensor.a_battery", clean_action: { type: "native" } },
        { entity: "vacuum.b", name: "S8", color: "#2196F3", clean_type: "wet", integration_entity: "sensor.anyvac_b",
          clean_action: { type: "native" } },
      ],
    });
    const now = new Date().toISOString();
    const intAttrs = {
      schema_version: 2,
      rooms_last_cleaned: { Hall: { dry: iso(9), wet: iso(15) } },
      ...(job ? { job_progress: job } : { job_progress: { active: false } }),
    };
    const st: Record<string, unknown> = {
      "vacuum.a": { entity_id: "vacuum.a", state, attributes: { friendly_name: "S6" }, last_changed: now, last_updated: now },
      "vacuum.b": { entity_id: "vacuum.b", state: "docked", attributes: { friendly_name: "S8" }, last_changed: now, last_updated: now },
      "sensor.a_battery": { entity_id: "sensor.a_battery", state: "86", attributes: {}, last_changed: now, last_updated: now },
      "sensor.anyvac_a": { entity_id: "sensor.anyvac_a", state: "0", attributes: intAttrs, last_changed: now, last_updated: now },
      "sensor.anyvac_b": { entity_id: "sensor.anyvac_b", state: "0", attributes: intAttrs, last_changed: now, last_updated: now },
    };
    card.hass = { states: st, localize: (k: string) => k, language: "en", callService: async () => {}, callWS: async () => ({}) };
    card.addEventListener("hass-more-info", (e: any) => w.__moreInfo.push(e.detail?.entityId));
    w.__mockHa.cardWrap.style.width = width + "px";
    w.__mockHa.cardWrap.style.height = height + "px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { theme, state, job, width, height, PIXEL });
  await page.waitForFunction(() => !!(window as any).__card?.shadowRoot?.querySelector(".avc-grid"));
  await page.waitForTimeout(300);
}

const q = (page: Page, sel: string) =>
  page.evaluate((sel) => {
    const root = (window as any).__card.shadowRoot as ShadowRoot;
    return Array.from(root.querySelectorAll(sel)).map((e) => (e.textContent ?? "").replace(/\s+/g, " ").trim());
  }, sel);

test("idle tile carries no START; tapping it opens the robot sheet which does", async ({ page }) => {
  await mount(page);
  const tiles = await q(page, ".status-tile");
  expect(tiles.length).toBe(2);
  expect(await q(page, ".status-tile .action-btn")).toEqual([]);
  await page.evaluate(async () => {
    const card = (window as any).__card;
    (card.shadowRoot.querySelector(".status-tile .tile-main") as HTMLElement).click();
    await card.updateComplete;
  });
  const sheet = await q(page, ".robot-sheet");
  expect(sheet.length).toBe(1);
  expect(sheet[0]).toContain("S6");
  // No rooms selected → the START slot says so instead of being a dead button.
  expect((await q(page, ".robot-sheet .action-btn")).join(" ")).toContain("Select rooms");
});

test("the sheet's (i) button is the HA more-info escape hatch, and the scrim closes it", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._robotSheet = 0;
    await card.updateComplete;
    (card.shadowRoot.querySelector('.robot-sheet-icon[aria-label^="Open"]') as HTMLElement).click();
    (card.shadowRoot.querySelector(".robot-sheet-scrim") as HTMLElement).click();
    await card.updateComplete;
  });
  expect(await page.evaluate(() => (window as any).__moreInfo)).toEqual(["vacuum.a"]);
  expect(await q(page, ".robot-sheet")).toEqual([]);
});

test("a pending Pin & Go pick stays on the tile itself", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._pinPending = { "vacuum.a": { x: 10, y: 10 } };
    await card.updateComplete;
  });
  const btns = await q(page, ".status-tile .action-btn");
  expect(btns.join(" ")).toContain("Send here");
});

test("hero formats the integration's job_progress, it never computes the time", async ({ page }) => {
  const finish = new Date(Date.now() + 58 * 60000);
  await mount(page, {
    state: "cleaning",
    job: {
      active: true, finish_at: finish.toISOString(), eta_min_left: 58, rooms_total: 5, rooms_done: 2,
      vacuums: { "vacuum.a": { room: "Hall", kind: "dry", pct: 64, next_room: "Living room" } },
      rooms: [],
    },
  });
  const hero = (await q(page, ".meta-hero"))[0];
  const hhmm = finish.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
  expect(hero).toContain("done around " + hhmm);
  expect(hero).toContain("58 min left");
  expect(hero).toContain("S6 in Hall");
  expect(hero).toContain("2/5");
  const tile = (await q(page, ".status-tile"))[0];
  expect(tile).toContain("64");
  expect(tile).toContain("Next: Living room");
});

test("idle hero reports the oldest room ages", async ({ page }) => {
  await mount(page);
  const hero = (await q(page, ".meta-hero"))[0];
  expect(hero).toContain("Home is calm");
  expect(hero).toContain("vacuumed 9 d ago");
  expect(hero).toContain("mopped 15 d ago");
});

test("themed status colours are the calmer palette; legacy keeps the old one", async ({ page }) => {
  const colorOf = () => page.evaluate(() => {
    const el = (window as any).__card.shadowRoot.querySelector(".status-tile .tile-status") as HTMLElement;
    return getComputedStyle(el).color;
  });
  await mount(page, { state: "cleaning", theme: "dark" });
  expect(await colorOf()).toBe("rgb(93, 187, 106)");
  await mount(page, { state: "cleaning", theme: "legacy" });
  expect(await colorOf()).toBe("rgb(82, 196, 26)");
});

// Stack topology here (square test floorplan); the rail tile has the same
// gesture and is covered in rail.spec.ts.
test("portrait: tapping a robot in the icon strip opens its sheet", async ({ page }) => {
  await mount(page, { width: 390, height: 780 });
  await page.evaluate(async () => {
    const card = (window as any).__card;
    const btn = card.shadowRoot.querySelectorAll(".vac-icon-btn, .rail-tile")[1] as HTMLElement;
    btn.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    btn.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    await card.updateComplete;
  });
  const sheet = await q(page, ".robot-sheet");
  expect(sheet.length).toBe(1);
  expect(sheet[0]).toContain("S8");
});
