import { test, expect, type Page } from "@playwright/test";

/**
 * docs/51 §2.6 — the reach mask in the Visual editor: over the seated map in
 * the Seat tool (same seat, opacity slider) and under the pieces in the
 * Furniture tool. The integration publishes `reach` meta on the map sensor and
 * serves the raster from an `image` entity.
 */

const FLOORPLAN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'><rect width='800' height='400' fill='#eee'/></svg>");
const MAP_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='#369'/></svg>");
const REACH_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect x='20' y='20' width='160' height='160' fill='#f80'/></svg>");

async function mount(page: Page, reach: Record<string, unknown> | null): Promise<void> {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async ({ FLOORPLAN_SVG, MAP_SVG, REACH_SVG, reach }) => {
    await customElements.whenDefined("anyvac-card");
    const w = window as any;
    const now = new Date().toISOString();
    const card = document.createElement("anyvac-card") as any;
    card.setConfig({
      type: "custom:anyvac-card", map_mode: "merged", image_base: { src: FLOORPLAN_SVG },
      vacuums: [{ entity: "vacuum.r", name: "S8", integration_entity: "sensor.a", map: { entity: "image.m", scale: 40, offset_x: 5, offset_y: -3, rotation: 10, seat: "manual" }, base: "map" }],
    });
    card.hass = {
      states: {
        "vacuum.r": { entity_id: "vacuum.r", state: "docked", attributes: { friendly_name: "S8" }, last_changed: now, last_updated: now },
        "image.m": { entity_id: "image.m", state: now, attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now },
        "image.s8_reach_mask": { entity_id: "image.s8_reach_mask", state: now, attributes: { entity_picture: REACH_SVG }, last_changed: now, last_updated: now },
        "sensor.a": { entity_id: "sensor.a", state: "0", attributes: {
          schema_version: 2, image_dims: { top: 0, left: 0, width: 200, height: 200, scale: 1, rotation: 0 }, rooms: [],
          ...(reach ? { reach } : {}),
        }, last_changed: now, last_updated: now },
      },
      services: { anyvac: { set_floorplan_seat: {}, list_assets: {} } },
      hassUrl: (p: string) => p, localize: (k: string) => k, language: "en", areas: {},
      callService: async (_d: string, s: string) => (s === "list_assets" ? { response: { assets: [] } } : undefined),
      callWS: async () => ({}),
    };
    w.__mockHa.cardWrap.style.width = "900px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
    await card.updateComplete;
  }, { FLOORPLAN_SVG, MAP_SVG, REACH_SVG, reach });
}

const ve = (page: Page, fn: string) => page.evaluate((fn) => {
  const sr = (document.querySelector("anyvac-visual-editor") as any)?.shadowRoot;
  return new Function("sr", fn)(sr);
}, fn);

const LIVE = { entity_id: "image.s8_reach_mask", updated: "2026-11-21T10:00:00+00:00", rooms: { Kitchen: { stale: false, floor_pct: 96 } } };

test("Seat tool: the reach mask rides on the seated map with the same transform", async ({ page }) => {
  await mount(page, LIVE);
  await page.evaluate(async () => { const c = (window as any).__card; c._openAlign(c._config.vacuums[0]); c._setVeTool("seat"); await c.updateComplete; });
  const r = await ve(page, `
    const map = sr.querySelector('.align-seat-layer .align-seat-img:not(.align-reach-img)');
    const reach = sr.querySelector('.align-seat-layer .align-reach-img');
    if (!map || !reach) return null;
    const keys = ['left', 'top', 'width', 'transform'];
    return { same: keys.every((k) => map.style[k] === reach.style[k]), opacity: reach.style.opacity, pe: getComputedStyle(reach).pointerEvents,
             slider: [...sr.querySelectorAll('.align-field-row--opacity label')].map((l) => l.textContent.trim()) };
  `) as any;
  expect(r).not.toBeNull();
  expect(r.same).toBe(true);
  expect(r.opacity).toBe("0.6");
  expect(r.pe).toBe("none");
  expect(r.slider.some((t: string) => t.startsWith("Reach"))).toBe(true);
  // the slider drives it; 0 hides it
  await page.evaluate(async () => { const c = (window as any).__card; c._alignSetLayerOpacity("reach", "0"); await c.updateComplete; });
  expect(await ve(page, "return !!sr.querySelector('.align-reach-img')")).toBe(false);
});

test("Seat tool: no reach layer before the first recorded room, or when every room is stale", async ({ page }) => {
  for (const reach of [null, { ...LIVE, updated: null }, { ...LIVE, rooms: { Kitchen: { stale: true } } }]) {
    await mount(page, reach);
    await page.evaluate(async () => { const c = (window as any).__card; c._openAlign(c._config.vacuums[0]); c._setVeTool("seat"); await c.updateComplete; });
    const r = await ve(page, `return { img: !!sr.querySelector('.align-reach-img'),
      slider: [...sr.querySelectorAll('.align-field-row--opacity label')].some((l) => l.textContent.trim().startsWith('Reach')) }`);
    expect(r).toEqual({ img: false, slider: false });
  }
});

test("Furniture tool: reach under the pieces, switchable", async ({ page }) => {
  await mount(page, LIVE);
  await page.evaluate(async () => { const c = (window as any).__card; c._openAlign(c._config.vacuums[0]); c._setVeTool("furniture"); await c.updateComplete; });
  const r = await ve(page, `
    const img = sr.querySelector('.furn-reach-img');
    const fl = sr.querySelector('.furniture-layer--edit');
    return { img: !!img, before: !!img && !!fl && !!(img.compareDocumentPosition(fl) & Node.DOCUMENT_POSITION_FOLLOWING),
             toggle: !!sr.querySelector('.furn-check input') };
  `);
  expect(r).toEqual({ img: true, before: true, toggle: true });
  await page.evaluate(async () => { const c = (window as any).__card; c._furnShowReach = false; await c.updateComplete; });
  expect(await ve(page, "return !!sr.querySelector('.furn-reach-img')")).toBe(false);
});
