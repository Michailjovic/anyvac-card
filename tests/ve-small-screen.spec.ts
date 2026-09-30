import { test, expect, type Page } from "@playwright/test";

/**
 * Card 1.47.1 — the Visual editor is mouse work and doesn't fit a phone
 * (field report 2026-10-01). Its entry button opens it only where it fits
 * (≥ 760 px wide and a fine pointer somewhere); elsewhere a notice explains
 * why, with "Open anyway" for a big touch-only tablet.
 */

const MAP = "/tests/harness/_floor.webp";

async function mount(page: Page, w: number, h: number): Promise<void> {
  await page.setViewportSize({ width: w, height: h });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ w, h, MAP }) => {
    const win = window as any;
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, color: string) => ({
      entity: "vacuum." + id, name, color, integration_entity: "sensor.anyvac_" + id,
      map: { entity: "image." + id + "_map" }, base: "map", rooms: [],
    });
    card.setConfig({
      type: "custom:anyvac-card", map_mode: "merged", layout: {}, image_base: { src: MAP },
      rooms: [{ key: "Hall", name: "Hall", map_x: 40, map_y: 50, map_w: 40, map_h: 40 }],
      vacuums: [vac("a", "S6", "#6FBF73"), vac("b", "S8", "#4DA3E8")],
    });
    const now = new Date().toISOString();
    const st: Record<string, unknown> = {};
    for (const id of ["a", "b"]) {
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: "docked", attributes: {}, last_changed: now, last_updated: now };
      st["image." + id + "_map"] = { entity_id: "image." + id + "_map", state: now, attributes: { entity_picture: MAP }, last_changed: now, last_updated: now };
      st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", last_changed: now, last_updated: now,
        attributes: { schema_version: 2, image_dims: { top: 0, left: 0, width: 50, height: 50, scale: 4, rotation: 0 }, vacuum_position_px: { x: 100, y: 100, a: 0 }, rooms: [] } };
    }
    card.hass = { states: st, services: { anyvac: { set_floorplan_seat: {} } }, hassUrl: (p: string) => p,
      localize: (k: string) => k, language: "en", callService: async () => {}, callWS: async () => ({}) };
    win.__mockHa.cardWrap.style.width = w + "px";
    win.__mockHa.cardWrap.style.height = h + "px";
    win.__mockHa.cardWrap.appendChild(card);
    win.__card = card;
  }, { w, h, MAP });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(500);
}

const state = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  return { notice: !!root.querySelector(".ve-notice"), portal: !!document.querySelector("anyvac-visual-editor") };
});
const tapAlign = (page: Page) => page.evaluate(async () => {
  const c = (window as any).__card;
  (c.shadowRoot.querySelector('[title^="Align"]') as HTMLElement).click();
  await c.updateComplete;
});

test("phone: the entry button explains instead of opening; Open anyway still opens", async ({ page }) => {
  await mount(page, 412, 780);
  await tapAlign(page);
  expect(await state(page)).toEqual({ notice: true, portal: false });
  await page.evaluate(async () => {
    const c = (window as any).__card;
    (c.shadowRoot.querySelector(".ve-notice-anyway") as HTMLElement).click();
    await c.updateComplete;
  });
  expect(await state(page)).toEqual({ notice: false, portal: true });
});

test("phone: OK just closes the notice", async ({ page }) => {
  await mount(page, 412, 780);
  await tapAlign(page);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    (c.shadowRoot.querySelector(".ve-notice-ok") as HTMLElement).click();
    await c.updateComplete;
  });
  expect(await state(page)).toEqual({ notice: false, portal: false });
});

test("computer: opens straight away", async ({ page }) => {
  await mount(page, 1280, 720);
  await tapAlign(page);
  expect(await state(page)).toEqual({ notice: false, portal: true });
});
