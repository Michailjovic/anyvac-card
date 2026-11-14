import { test, expect, type Page } from "@playwright/test";

/**
 * docs/49 F1 — the landscape plan column keeps a stable height.
 *
 * Its list used to be as tall as the picked rooms, and the map above it gave way
 * in a fixed-height card (323 → 434 → 393 → 323 px for 0 / 1 / 3 / 5 picked
 * rooms). The list now reserves room for the configured rooms and scrolls inside.
 */
const FLOOR = "/tests/harness/_floor.webp";
const ROOMS = ["Hall","Kitchen","Bathroom","Bedroom","Office","Pantry"];
async function mount(page: Page, select: string[]) {
  await page.setViewportSize({ width: 1270, height: 714 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ select, FLOOR, ROOMS }) => {
    const win = window as any;
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, ct: string) => ({ entity: "vacuum." + id, name, clean_type: ct, integration_entity: "sensor.anyvac_" + id, clean_action: { type: "native" } });
    card.setConfig({ type: "custom:anyvac-card", theme: "dark", map_mode: "merged", layout: {}, image_base: { src: FLOOR },
      rooms: ROOMS.map((r: string, i: number) => ({ key: r, name: r, map_x: 10 + i * 15, map_y: 50, map_w: 12, map_h: 90 })),
      vacuums: [vac("s6","S6","dry"), vac("s7","S7","dry"), vac("s8","S8","wet")] });
    const now = new Date().toISOString();
    const st: Record<string, unknown> = {};
    for (const id of ["s6","s7","s8"]) {
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: "docked", attributes: { battery_level: 80 }, last_changed: now, last_updated: now };
      st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", last_changed: now, last_updated: now,
        attributes: { schema_version: 2, job_progress: { active: false }, ...(select.length ? { selected_rooms: select } : {}) } };
    }
    card.hass = { states: st, localize: (k: string) => k, language: "en",
      callService: async (d: string, s: string, data: any) => {
        if (d === "anyvac" && s === "plan") {
          const rs = data.rooms as string[];
          const tl: Record<string, number> = {}; const tw: Record<string, number> = {};
          rs.forEach((r, i) => { tl[r] = 10 + i * 8; tw[r] = 20 + i * 8; });
          return { response: { plan: { dry: { "vacuum.s6": rs }, wet: { "vacuum.s8": rs }, eta_min: 10 + rs.length * 9, timeline: { dry: tl, wet: tw }, unsequenced: [] } } };
        }
      }, callWS: async () => ({}) };
    win.__mockHa.cardWrap.style.width = "1270px"; win.__mockHa.cardWrap.style.height = "714px";
    win.__mockHa.cardWrap.appendChild(card); win.__card = card;
  }, { select, FLOOR, ROOMS });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(700);
}
const geo = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  const h = (sel: string) => Math.round(root.querySelector(sel)?.getBoundingClientRect().height ?? -1);
  const rows = root.querySelector(".plan-rows") as HTMLElement;
  return { map: h(".map-wrap"), dock: h(".avc-region--dock"), rows: h(".plan-rows"), scrolls: rows.scrollHeight > rows.clientHeight + 1 };
});

test("the map does not move with the number of picked rooms", async ({ page }) => {
  const seen: Array<{ n: number; map: number; dock: number; rows: number }> = [];
  for (const n of [0, 1, 3, 5]) {
    await mount(page, ROOMS.slice(0, n));
    const g = await geo(page);
    seen.push({ n, map: g.map, dock: g.dock, rows: g.rows });
  }
  for (const g of seen) {
    expect(g.map, `map height with ${g.n} picked`).toBe(seen[0].map);
    expect(g.dock, `dock height with ${g.n} picked`).toBe(seen[0].dock);
    expect(g.rows, `plan list height with ${g.n} picked`).toBe(6 * 35);
  }
});
