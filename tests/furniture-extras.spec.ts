import { test, expect, type Page } from "@playwright/test";

/**
 * docs/51 — the rest of the plan: furniture sizes in centimetres (from
 * `anyvac.floorplan_scale`), uploading furniture from the studio
 * (`anyvac.upload_asset`), and the reach mask on home-frame floorplans
 * (cesta A crop and cesta B anchors).
 */

const FLOOR = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'><rect width='800' height='400' fill='#eee'/></svg>");
const MAP = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='#369'/></svg>");
const REACH = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'><rect width='800' height='400' fill='#f80'/></svg>");
const PNG_1PX = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

interface Opts {
  imageBase?: Record<string, unknown>;
  scale?: number | null;
  homeFrame?: Record<string, unknown> | null;
  reach?: Record<string, unknown> | null;
  services?: string[];
}

async function mount(page: Page, o: Opts = {}): Promise<void> {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async ({ FLOOR, MAP, REACH, o }) => {
    await customElements.whenDefined("anyvac-card");
    const w = window as any;
    w.__calls = [];
    const now = new Date().toISOString();
    const card = document.createElement("anyvac-card") as any;
    card.setConfig({
      type: "custom:anyvac-card", map_mode: "merged", image_base: { src: FLOOR, ...(o.imageBase ?? {}) },
      vacuums: [{ entity: "vacuum.r", name: "S8", integration_entity: "sensor.a", map: { entity: "image.m" }, base: "map", hide_map: true }],
    });
    const svc: Record<string, object> = { set_floorplan_seat: {}, list_assets: {} };
    for (const s of o.services ?? ["floorplan_scale", "upload_asset"]) svc[s] = {};
    card.hass = {
      states: {
        "vacuum.r": { entity_id: "vacuum.r", state: "docked", attributes: { friendly_name: "S8" }, last_changed: now, last_updated: now },
        "image.m": { entity_id: "image.m", state: now, attributes: { entity_picture: MAP }, last_changed: now, last_updated: now },
        "image.s8_reach_mask_home": { entity_id: "image.s8_reach_mask_home", state: now, attributes: { entity_picture: REACH }, last_changed: now, last_updated: now },
        "sensor.a": { entity_id: "sensor.a", state: "0", attributes: {
          schema_version: 3, image_dims: { top: 0, left: 0, width: 200, height: 200, scale: 1, rotation: 0 }, rooms: [],
          ...(o.homeFrame ? { home_frame: o.homeFrame } : {}),
          ...(o.reach ? { reach: o.reach } : {}),
        }, last_changed: now, last_updated: now },
      },
      services: { anyvac: svc },
      hassUrl: (p: string) => p, localize: (k: string) => k, language: "en", areas: {},
      callService: async (_d: string, s: string, data: any) => {
        w.__calls.push({ service: s, data });
        if (s === "list_assets") return { response: { assets: [] } };
        if (s === "floorplan_scale") return { response: { mm_per_unit: o.scale ?? null, source: "crop_frame" } };
        if (s === "upload_asset") return { response: { name: "sofa.png", url: "/local/anyvac/furniture/sofa.png", width: 200, height: 100 } };
        return undefined;
      },
      callWS: async () => ({}),
    };
    w.__mockHa.cardWrap.style.width = "900px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
    await card.updateComplete;
    for (let i = 0; i < 50 && Math.abs(card._mapAR - 2) > 0.01; i++) await new Promise((r) => setTimeout(r, 20));
  }, { FLOOR, MAP, REACH, o });
}

async function openFurniture(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const c = (window as any).__card;
    c._openAlign(c._config.vacuums[0]);
    c._setVeTool("furniture");
    await c.updateComplete;
    for (let i = 0; i < 20; i++) { await new Promise((r) => setTimeout(r, 10)); await c.updateComplete; }
  });
}

const ve = (page: Page, body: string) => page.evaluate((body) => {
  const sr = (document.querySelector("anyvac-visual-editor") as any)?.shadowRoot;
  return new Function("sr", body)(sr);
}, body);

const PIECE = { id: "sofa", src: "/local/x.png", x: 50, y: 50, w: 10, h: 20 };

test("cm fields use the integration's floorplan scale", async ({ page }) => {
  await mount(page, { imageBase: { crop_box: { frame_id: "f1", x0: 0, y0: 0, x1: 800, y1: 400 }, furniture: [PIECE] }, scale: 50 });
  await openFurniture(page);
  const call = await page.evaluate(() => (window as any).__calls.find((c: any) => c.service === "floorplan_scale"));
  expect(call.data.crop_box).toEqual({ frame_id: "f1", x0: 0, y0: 0, x1: 800, y1: 400 });
  await page.evaluate(async () => { const c = (window as any).__card; c._furnSelect("sofa"); await c.updateComplete; });
  // w = 10 units, h = 20 % of a 2:1 floorplan = 10 units -> 10 x 50 mm = 50 cm each
  const vals = await ve(page, "return [...sr.querySelectorAll('.align-field-row')].filter((r) => r.querySelector('label span')?.textContent === 'cm').map((r) => r.querySelector('input').value)");
  expect(vals).toEqual(["50", "50"]);
  await page.evaluate(async () => { const c = (window as any).__card; c._furnSetCm("sofa", "w", "100"); c._furnSetCm("sofa", "h", "150"); await c.updateComplete; });
  const it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
  expect(it).toMatchObject({ w: 20, h: 60 }); // 150 cm = 30 units = 60 % of the height
});

test("no scale -> no cm fields; cesta-B floorplans send anchors and the aspect", async ({ page }) => {
  const anchors = [{ home_px: { x: 0, y: 0 }, floor_pct: { x: 0, y: 0 } }, { home_px: { x: 10, y: 5 }, floor_pct: { x: 100, y: 100 } }];
  await mount(page, { imageBase: { home_anchors: anchors, furniture: [PIECE] }, scale: null });
  await openFurniture(page);
  const call = await page.evaluate(() => (window as any).__calls.find((c: any) => c.service === "floorplan_scale"));
  expect(call.data.home_anchors).toEqual(anchors);
  expect(call.data.aspect).toBeCloseTo(2, 2);
  await page.evaluate(async () => { const c = (window as any).__card; c._furnSelect("sofa"); await c.updateComplete; });
  const cm = await ve(page, "return [...sr.querySelectorAll('.align-field-row label span')].some((s) => s.textContent === 'cm')");
  expect(cm).toBe(false);
});

test("a plain floorplan never asks for a scale", async ({ page }) => {
  await mount(page, { imageBase: { furniture: [PIECE] }, scale: 50 });
  await openFurniture(page);
  expect(await page.evaluate(() => (window as any).__calls.some((c: any) => c.service === "floorplan_scale"))).toBe(false);
});

test("upload sends the file to anyvac.upload_asset and adds the piece", async ({ page }) => {
  await mount(page);
  await openFurniture(page);
  const input = page.locator("anyvac-visual-editor .furn-file-input");
  await input.setInputFiles({ name: "Sofa.png", mimeType: "image/png", buffer: Buffer.from(PNG_1PX, "base64") });
  await page.waitForFunction(() => (window as any).__card._furnSession?.items.length === 1);
  const call = await page.evaluate(() => (window as any).__calls.find((c: any) => c.service === "upload_asset"));
  expect(call.data.name).toBe("Sofa.png");
  expect(call.data.data.startsWith("data:image/png;base64,")).toBe(true);
  const it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
  expect(it).toMatchObject({ src: "/local/anyvac/furniture/sofa.png", w: 15, h: 15 });
});

test("no upload button without the service", async ({ page }) => {
  await mount(page, { services: [] });
  await openFurniture(page);
  expect(await ve(page, "return !!sr.querySelector('.furn-file-input')")).toBe(false);
});

const REACH_ATTR = { entity_id: "image.s8_reach_mask", home_entity_id: "image.s8_reach_mask_home", home_ready: true,
  updated: "2026-11-21T10:00:00+00:00", rooms: { Kitchen: { stale: false } } };

test("cesta A: the home-frame reach image is placed through the floorplan's crop", async ({ page }) => {
  await mount(page, {
    imageBase: { crop_box: { frame_id: "f1", x0: 100, y0: 50, x1: 500, y1: 250 } },
    homeFrame: { id: "f1", cell_mm: 50, scale: 4, width_px: 800, height_px: 600 },
    reach: REACH_ATTR,
  });
  await openFurniture(page);
  const r = await ve(page, `
    const img = sr.querySelector('.reach-home-img'); const fp = sr.querySelector('.align-floorplan-img');
    if (!img) return null;
    const a = img.getBoundingClientRect(), b = fp.getBoundingClientRect();
    return { x: (a.left - b.left) / b.width, y: (a.top - b.top) / b.height, w: a.width / b.width, h: a.height / b.height };
  `) as any;
  expect(r).not.toBeNull();
  expect(r.x).toBeCloseTo(-0.25, 2); expect(r.y).toBeCloseTo(-0.25, 2);
  expect(r.w).toBeCloseTo(2, 2); expect(r.h).toBeCloseTo(3, 2);
});

test("cesta B: the home-frame reach image follows the anchor fit", async ({ page }) => {
  // frame canvas 800 x 400 mapped 1:1 onto the 2:1 floorplan by its two corners
  const anchors = [{ home_px: { x: 0, y: 0 }, floor_pct: { x: 0, y: 0 } }, { home_px: { x: 800, y: 400 }, floor_pct: { x: 100, y: 100 } }];
  await mount(page, {
    imageBase: { home_anchors: anchors, home_anchors_frame_id: "f1" },
    homeFrame: { id: "f1", cell_mm: 50, scale: 4, width_px: 800, height_px: 400 },
    reach: REACH_ATTR,
  });
  await openFurniture(page);
  const r = await ve(page, `
    const img = sr.querySelector('.reach-home-img'); const fp = sr.querySelector('.align-floorplan-img');
    if (!img) return null;
    const a = img.getBoundingClientRect(), b = fp.getBoundingClientRect();
    return { dx: a.left - b.left, dy: a.top - b.top, dw: a.width - b.width, dh: a.height - b.height };
  `) as any;
  expect(r).not.toBeNull();
  for (const v of Object.values(r) as number[]) expect(Math.abs(v)).toBeLessThan(1.5);
});

test("a home-frame vacuum without a home raster shows no reach (not the map one misplaced)", async ({ page }) => {
  await mount(page, {
    imageBase: { crop_box: { frame_id: "f1", x0: 100, y0: 50, x1: 500, y1: 250 } },
    homeFrame: { id: "f1", cell_mm: 50, scale: 4, width_px: 800, height_px: 600 },
    reach: { ...REACH_ATTR, home_ready: false },
  });
  await openFurniture(page);
  expect(await ve(page, "return !!sr.querySelector('.reach-home-img, .align-reach-img')")).toBe(false);
});
