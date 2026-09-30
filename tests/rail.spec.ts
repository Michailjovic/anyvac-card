import { test, expect, type Page } from "@playwright/test";
import { shouldStackLayout, withoutRegion, DEFAULT_PROFILES, RAIL_MIN_PX } from "../src/layout";

/**
 * docs/44 F3 — portrait "rail" (card 1.40.0).
 *
 * What would regress silently:
 *  - the split/stack decision: the reference boxes that needed `stackBias`
 *    1.5 to flip to stack (docs/25 §7c, 0.73.x) now pick the rail, while
 *    `theme: legacy` keeps its old answer;
 *  - the map never takes the width the rail needs, and is never clipped by
 *    its own (JS-narrowed) column;
 *  - an empty hero leaves no empty grid track behind;
 *  - the rail's own behaviour: tap → robot sheet, hold → hide on the map,
 *    Clear, the running plan straight from `job_progress`, sheets in place.
 */

const ROOMS = [
  { key: "Living room", a: [1.4, 4], b: [38.9, 96] },
  { key: "Hall", a: [38.9, 41.8], b: [54.5, 65.2] },
  { key: "Bathroom", a: [39, 16.7], b: [54, 42.6] },
  { key: "Kitchen", a: [54.2, 4], b: [73.1, 96] },
  { key: "Bedroom", a: [73.3, 4], b: [99.3, 96] },
];

interface Opts { theme?: string; width?: number; height?: number; integration?: boolean; job?: Record<string, unknown> | null }

async function mount(page: Page, opts: Opts = {}): Promise<void> {
  const { theme = "dark", width = 412, height = 780, integration = true, job = null } = opts;
  await page.setViewportSize({ width, height });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, width, height, integration, job, ROOMS }) => {
    const w = window as any;
    w.__calls = [];
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, ct: string) => ({
      entity: "vacuum." + id, name, clean_type: ct,
      ...(integration ? { integration_entity: "sensor.anyvac_" + id } : {}),
      clean_action: { type: "native" },
    });
    card.setConfig({
      type: "custom:anyvac-card", layout: {}, theme, map_mode: "merged",
      image_base: { src: "/tests/harness/_floor.webp" },
      rooms: ROOMS.map((r) => ({ key: r.key, name: r.key,
        map_x: (r.a[0] + r.b[0]) / 2, map_y: (r.a[1] + r.b[1]) / 2, map_w: r.b[0] - r.a[0], map_h: r.b[1] - r.a[1] })),
      vacuums: [vac("a", "S6", "dry"), vac("b", "S8", "wet")],
    });
    const now = new Date().toISOString();
    const st: Record<string, unknown> = {};
    for (const id of ["a", "b"]) {
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: job ? "cleaning" : "docked", attributes: { battery_level: 80 }, last_changed: now, last_updated: now };
      if (integration) st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0",
        attributes: { schema_version: 2, job_progress: job ?? { active: false } }, last_changed: now, last_updated: now };
    }
    card.hass = { states: st, localize: (k: string) => k, language: "en",
      callService: async (d: string, s: string, data: unknown) => { w.__calls.push([d, s, data]); }, callWS: async () => ({}) };
    w.__mockHa.cardWrap.style.width = width + "px";
    w.__mockHa.cardWrap.style.height = height + "px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { theme, width, height, integration, job, ROOMS });
  // Floorplan load → rotation → topology → column refine all settle by now.
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(900);
}

const geom = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  const r = (sel: string) => {
    const el = root.querySelector(sel);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { l: Math.round(b.left), r: Math.round(b.right), t: Math.round(b.top), b: Math.round(b.bottom), w: Math.round(b.width) };
  };
  return {
    grid: r(".avc-grid"), hero: r(".avc-region--hero"), map: r(".avc-region--map"),
    fit: r(".avc-region--map .avc-rot"), dock: r(".avc-region--dock"),
    rail: !!root.querySelector(".rail"), strip: !!root.querySelector(".vac-icon-strip"),
  };
});

test("decision: the 0.73.x reference boxes now pick split/rail; legacy keeps stack", () => {
  const ar = 0.27; // the narrow 4-storey floorplan, rotated
  for (const [w, h] of [[360, 514], [360, 580], [390, 700]]) {
    expect(shouldStackLayout(ar, w, h)).toBe(false);
    expect(shouldStackLayout(ar, w, h, { stackBias: 1.5, dockMinPx: 0 })).toBe(true);
  }
  // A wide-ish rotated map in a phone box still stacks: the rail would leave it too narrow.
  expect(shouldStackLayout(0.6, 390, 700)).toBe(true);
  expect(RAIL_MIN_PX).toBeGreaterThanOrEqual(160);
});

test("withoutRegion drops the hero track and shifts the rows below it", () => {
  const p = withoutRegion(DEFAULT_PROFILES.portrait, "hero");
  expect(p.rows).toEqual(["minmax(0, 1fr)", "auto"]);
  expect(p.place.map.row).toBe(1);
  expect(p.place.dock.row).toBe(1);
  expect(p.place.start.row).toBe(2);
  expect("hero" in p.place).toBe(false);
  // A region spanning the hero's row keeps the track (only the region goes).
  const spanned = withoutRegion({ ...DEFAULT_PROFILES.portrait,
    place: { ...DEFAULT_PROFILES.portrait.place, map: { row: "1/3", col: 1 } } }, "hero");
  expect(spanned.rows.length).toBe(3);
});

test("themed portrait renders the rail beside a fully visible map", async ({ page }) => {
  await mount(page);
  const g = await geom(page);
  expect(g.rail).toBe(true);
  expect(g.strip).toBe(false);
  expect(g.hero).not.toBeNull();
  expect(g.hero!.b).toBeLessThanOrEqual(g.map!.t);
  expect(g.dock!.w).toBeGreaterThanOrEqual(RAIL_MIN_PX);
  // The fitted map sits inside its own column — nothing clipped on either side.
  expect(g.fit!.l).toBeGreaterThanOrEqual(g.map!.l);
  expect(g.fit!.r).toBeLessThanOrEqual(g.map!.r);
  expect(g.fit!.w).toBeGreaterThan(g.map!.w - 4);
});

test("legacy portrait keeps the old column (icon strip), no rail", async ({ page }) => {
  await mount(page, { theme: "legacy" });
  const g = await geom(page);
  expect(g.rail).toBe(false);
  expect(g.strip).toBe(true);
});

test("no integration: no hero region and no empty track above the map", async ({ page }) => {
  await mount(page, { integration: false });
  const g = await geom(page);
  expect(g.hero).toBeNull();
  expect(g.map!.t).toBe(g.grid!.t);
});

test("rail tile: tap opens the robot sheet, hold hides the robot on the map", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const card = (window as any).__card;
    const t = card.shadowRoot.querySelectorAll(".rail-tile")[1] as HTMLElement;
    t.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    t.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    await card.updateComplete;
  });
  expect(await page.evaluate(() => (window as any).__card._robotSheet)).toBe(1);
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._robotSheet = null;
    await card.updateComplete;
    const t = card.shadowRoot.querySelectorAll(".rail-tile")[0] as HTMLElement;
    t.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
  });
  await page.waitForTimeout(900); // > HOLD_DURATION_MS
  await page.evaluate(async () => {
    const card = (window as any).__card;
    (card.shadowRoot.querySelectorAll(".rail-tile")[0] as HTMLElement).dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    await card.updateComplete;
  });
  const out = await page.evaluate(() => {
    const card = (window as any).__card;
    return { sheet: card._robotSheet, hidden: card.shadowRoot.querySelectorAll(".rail-tile--hidden").length };
  });
  expect(out.sheet).toBeNull();
  expect(out.hidden).toBe(1);
});

test("rail selection card: names the picked rooms and Clear empties the pick", async ({ page }) => {
  await mount(page);
  const text = () => page.evaluate(() => ((window as any).__card.shadowRoot.querySelector(".rail-sel")?.textContent ?? "").replace(/\s+/g, " "));
  expect(await text()).toContain("Whole home");
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._toggleRoomAcross("Hall", card._config.vacuums);
    card._toggleRoomAcross("Kitchen", card._config.vacuums);
    await card.updateComplete;
  });
  expect(await text()).toContain("2 rooms");
  expect(await text()).toContain("Hall");
  await page.evaluate(async () => {
    const card = (window as any).__card;
    (card.shadowRoot.querySelector(".rail-clear") as HTMLElement).click();
    await card.updateComplete;
  });
  expect(await text()).toContain("Whole home");
});

test("while a job runs the rail lists its passes exactly as published", async ({ page }) => {
  const job = {
    active: true, finish_at: new Date(Date.now() + 30 * 60000).toISOString(), eta_min_left: 30,
    rooms_total: 2, rooms_done: 1, passes_total: 3, passes_done: 1,
    vacuums: { "vacuum.a": { room: "Hall", kind: "dry", pct: 42, next_room: null } },
    rooms: [
      { room: "Kitchen", kind: "dry", vacuum: "vacuum.a", state: "done", pct: 100 },
      { room: "Hall", kind: "dry", vacuum: "vacuum.a", state: "active", pct: 42 },
      { room: "Hall", kind: "wet", vacuum: "vacuum.b", state: "queued", pct: 0 },
    ],
  };
  await mount(page, { job });
  const rows = await page.evaluate(() => Array.from((window as any).__card.shadowRoot.querySelectorAll(".rail-plan-row"))
    .map((e: any) => e.className.match(/rail-plan-row--(\w+)/)[1] + ":" + e.textContent.replace(/\s+/g, " ").trim()));
  expect(rows).toEqual(["done:Kitchen", "active:Hall 42 %", "queued:Hall"]);
  const head = await page.evaluate(() => (window as any).__card.shadowRoot.querySelector(".rail-plan .rail-card-head").textContent.replace(/\s+/g, " ").trim());
  expect(head).toContain("1/3");
});

test("the START bar's mode sheet takes over the rail while open", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const card = (window as any).__card;
    (card.shadowRoot.querySelector(".start-seg--mode") as HTMLElement).click();
    await card.updateComplete;
  });
  const s = await page.evaluate(() => {
    const root = (window as any).__card.shadowRoot;
    return { sheet: !!root.querySelector(".rail--sheet .dock-mode"), tiles: root.querySelectorAll(".rail-tile").length };
  });
  expect(s.sheet).toBe(true);
  expect(s.tiles).toBe(0);
});
