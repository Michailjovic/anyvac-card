import { test, expect, type Page } from "@playwright/test";
import { tintPixels, cornerBackground, hexToRgb } from "../src/maptint";

/**
 * docs/44 F7 — Visual editor redesign (card 1.44.0).
 *
 * What would regress silently:
 *  - V1: themed editors paint an opaque canvas (the dashboard must not show
 *    through); legacy keeps its translucent scrim;
 *  - one top bar: vacuum chips with avatars, the tool tabs, Cancel/Save —
 *    no separate title row / tool row any more;
 *  - V2: room labels carry the room's display name in full, narrow rooms
 *    show it only on selection/hover (plus a tooltip), and the side panel
 *    edits the selected room's exact geometry as undoable steps;
 *  - V3: the Seat tool's raw maps are tinted into the vacuum's colour with
 *    the background keyed out — switchable, and never on `legacy`.
 */

test("tintPixels keys the background out and recolours the rest by luminance", () => {
  const bg = [19, 87, 148] as const;
  // 2×2: two background pixels, one light room, one dark wall.
  const d = new Uint8ClampedArray([
    19, 87, 148, 255, 20, 88, 150, 255,
    240, 200, 180, 255, 60, 60, 60, 255,
  ]);
  expect(cornerBackground(d, 2, 2)).toEqual(bg); // no majority → top-left wins
  tintPixels(d, bg, hexToRgb("#6FBF73")!);
  expect([d[3], d[7]]).toEqual([0, 0]); // background → transparent
  const room = [d[8], d[9], d[10]], wall = [d[12], d[13], d[14]];
  // Same hue as the vacuum colour (green channel dominant), room lighter than wall.
  expect(room[1]).toBeGreaterThan(room[0]);
  expect(room[1]).toBeGreaterThan(room[2]);
  expect(room[1]).toBeGreaterThan(wall[1]);
  expect(d[11]).toBe(255);
  expect(hexToRgb("green")).toBeNull();
});

const FLOOR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'><rect width='800' height='400' fill='#eee'/></svg>");
// A real file, not a data: URL — the card appends a cache-busting query to
// map URLs, which a data: URL doesn't survive.
const MAP = "/tests/harness/_floor.webp";

async function mount(page: Page, theme = "dark"): Promise<void> {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, FLOOR, MAP }) => {
    const w = window as any;
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, color: string) => ({
      entity: "vacuum." + id, name, color, integration_entity: "sensor.anyvac_" + id,
      map: { entity: "image." + id + "_map" }, base: "map", rooms: [],
    });
    card.setConfig({
      type: "custom:anyvac-card", theme, map_mode: "merged", image_base: { src: FLOOR },
      rooms: [
        { key: "Hall", name: "Entrance hall", map_x: 40, map_y: 50, map_w: 40, map_h: 40 },
        { key: "WC", name: "Toilet", map_x: 80, map_y: 50, map_w: 3, map_h: 20 },
      ],
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
    w.__mockHa.cardWrap.style.width = "1200px";
    w.__mockHa.cardWrap.style.height = "400px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { theme, FLOOR, MAP });
  await page.evaluate(async () => {
    const card = (window as any).__card;
    await card.updateComplete;
    card._openAlign(card._config.vacuums[0]);
    card._veTool = "seat";
    await card.updateComplete;
  });
  await page.waitForFunction(() => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot?.querySelector(".ve-topbar"));
}

const ve = <T,>(page: Page, fn: (root: ShadowRoot) => T) =>
  page.evaluate(`(${fn.toString()})(document.querySelector("anyvac-visual-editor").shadowRoot)`) as Promise<T>;

test("V1 + top bar: opaque canvas, one bar with avatar chips, tool tabs and Save", async ({ page }) => {
  await mount(page);
  const r = await ve(page, (root) => {
    const bar = root.querySelector(".ve-topbar")!;
    const bg = getComputedStyle(root.querySelector(".align-overlay")!).backgroundColor;
    return {
      bg,
      chips: Array.from(bar.querySelectorAll(".align-vac-chip")).map((c) => (c.textContent ?? "").trim() + (c.querySelector(".ve-chip-avatar") ? "+avatar" : "")),
      tabs: Array.from(bar.querySelectorAll(".ve-tool-row .ve-tool-tab")).length,
      save: !!bar.querySelector(".align-save-btn"),
      oldTitle: !!root.querySelector(".align-toolbar-title"),
      bars: root.querySelectorAll(".align-toolbar").length,
    };
  });
  expect(r.bg).toMatch(/^rgb\(/); // no alpha → nothing shows through
  expect(r.chips).toEqual(["S6+avatar", "S8+avatar"]);
  expect(r.tabs).toBe(3);
  expect(r.save).toBe(true);
  expect(r.oldTitle).toBe(false);
  expect(r.bars).toBe(1);
  await mount(page, "legacy");
  expect(await ve(page, (root) => getComputedStyle(root.querySelector(".align-overlay")!).backgroundColor)).toMatch(/^rgba\(.*0\.92\)$/);
});

test("V3: the Seat tool shows the raw maps tinted, switchable, never on legacy", async ({ page }) => {
  await mount(page);
  const src = () => ve(page, (root) => (root.querySelector(".align-seat-layer .align-seat-img") as HTMLImageElement).src);
  await page.waitForFunction(() => (document.querySelector("anyvac-visual-editor") as any).shadowRoot
    .querySelector(".align-seat-layer .align-seat-img")?.src.startsWith("blob:"));
  expect(await src()).toMatch(/^blob:/);
  // …ghost (the other vacuum on the same floorplan) too.
  expect(await ve(page, (root) => (root.querySelector(".align-ghost .align-seat-img") as HTMLImageElement | null)?.src ?? "")).toMatch(/^(blob:|$)/);
  await page.evaluate(async () => { const c = (window as any).__card; c._veTint = false; await c.updateComplete; });
  expect(await src()).toMatch(/_floor\.webp/);
  await mount(page, "legacy");
  await page.waitForTimeout(400);
  expect(await src()).toMatch(/_floor\.webp/);
});

test("V2: full room names, narrow rooms only on selection, exact geometry from the side panel", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    c._veTool = "rooms"; c._openRooms(); await c.updateComplete;
  });
  await page.waitForFunction(() => !!(document.querySelector("anyvac-visual-editor") as any).shadowRoot.querySelector(".rooms-rect"));
  const labels = () => ve(page, (root) => Array.from(root.querySelectorAll(".rooms-rect")).map((r) => ({
    title: r.getAttribute("title"), text: (r.querySelector(".rooms-rect-label")?.textContent ?? "").trim(),
    shown: getComputedStyle(r.querySelector(".rooms-rect-label")!).display !== "none",
  })));
  let l = await labels();
  expect(l.find((x) => x.text === "Entrance hall")).toMatchObject({ title: "Entrance hall", shown: true });
  expect(l.find((x) => x.text === "Toilet")).toMatchObject({ title: "Toilet", shown: false });
  await page.evaluate(async () => {
    const c = (window as any).__card;
    c._roomsSession = { ...c._roomsSession, selected: "WC" };
    await c.updateComplete;
  });
  l = await labels();
  expect(l.find((x) => x.text === "Toilet")?.shown).toBe(true);
  // Side panel: display name as title + exact geometry, one undo step each.
  const panel = await ve(page, (root) => ({
    title: (root.querySelector(".align-side-panel .section-title:last-of-type")?.textContent ?? "").trim(),
    fields: Array.from(root.querySelectorAll(".align-side-panel .align-field-row label")).map((x) => (x.textContent ?? "").replace(/\s+/g, " ").trim()),
  }));
  expect(panel.fields).toEqual(expect.arrayContaining(["Centre X%", "Centre Y%", "Width%", "Height%"]));
  const before = await page.evaluate(() => (window as any).__card._roomsSession.history.length);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    c._roomsSetGeom("WC", "w", "12.5");
    c._roomsSetGeom("WC", "h", "0");
    await c.updateComplete;
  });
  const s = await page.evaluate(() => { const r = (window as any).__card._roomsSession; return { w: r.rooms.WC.w, h: r.rooms.WC.h, n: r.history.length }; });
  expect(s).toEqual({ w: 12.5, h: 1, n: before + 2 });
});
