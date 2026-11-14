import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "fs";

// docs/50 (block G): the card speaks Czech when HA does, English otherwise, and
// formats clock times by the user's 12/24 h profile setting in one place.
const FLOOR = "/tests/harness/_floor.webp";
const ROOMS = ["Hall", "Kitchen", "Bathroom"];

async function mount(page: Page, hass: Record<string, unknown>, job = false) {
  await page.setViewportSize({ width: 1270, height: 714 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ FLOOR, ROOMS, hass, job }) => {
    const win = window as any;
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string) => ({ entity: "vacuum." + id, name, clean_type: "dry", integration_entity: "sensor.anyvac_" + id, clean_action: { type: "native" } });
    card.setConfig({ type: "custom:anyvac-card", theme: "dark", map_mode: "merged", layout: {}, image_base: { src: FLOOR },
      rooms: ROOMS.map((r: string, i: number) => ({ key: r, name: r, map_x: 12 + i * 22, map_y: 50, map_w: 20, map_h: 90 })),
      vacuums: [vac("s7", "S7")] });
    const now = new Date().toISOString();
    const jp = job ? { active: true, finish_at: "2030-01-01T16:40:00Z", eta_min_left: 31, rooms_total: 3, rooms_done: 1, passes_total: 2, passes_done: 1,
      vacuums: { "vacuum.s7": { room: "Kitchen", kind: "dry", pct: 64 } },
      rooms: [{ room: "Hall", kind: "dry", vacuum: "vacuum.s7", state: "done", pct: 100 }, { room: "Kitchen", kind: "dry", vacuum: "vacuum.s7", state: "active", pct: 64 }] } : { active: false };
    const st: Record<string, unknown> = {
      "vacuum.s7": { entity_id: "vacuum.s7", state: job ? "cleaning" : "docked", attributes: { battery_level: 80 }, last_changed: now, last_updated: now },
      "sensor.anyvac_s7": { entity_id: "sensor.anyvac_s7", state: "0", last_changed: now, last_updated: now, attributes: { schema_version: 2, job_progress: jp } },
    };
    card.hass = { states: st, localize: (k: string) => k, callService: async () => ({}), callWS: async () => ({}), ...hass };
    win.__mockHa.cardWrap.style.width = "1270px"; win.__mockHa.cardWrap.style.height = "714px";
    win.__mockHa.cardWrap.appendChild(card);
  }, { FLOOR, ROOMS, hass, job });
  await page.waitForTimeout(900);
}
const text = (page: Page) => page.evaluate(() => (window as any).__mockHa.cardWrap.querySelector("anyvac-card").shadowRoot.textContent.replace(/\s+/g, " "));

test("Czech HA language -> Czech UI", async ({ page }) => {
  await mount(page, { language: "cs", locale: { language: "cs", time_format: "24" } });
  const t = await text(page);
  expect(t).toContain("V doku");
  expect(t).toContain("Start · podrž");
  expect(t).not.toContain("Start · hold");
});

test("English HA language -> English UI", async ({ page }) => {
  await mount(page, { language: "en", locale: { language: "en" } });
  const t = await text(page);
  expect(t).toContain("Docked");
  expect(t).toContain("Start · hold");
});

test("unknown language falls back to English", async ({ page }) => {
  await mount(page, { language: "de", locale: { language: "de" } });
  expect(await text(page)).toContain("Docked");
});

test("running plan in Czech: plural and clock honour the language and 12/24 h", async ({ page }) => {
  await mount(page, { language: "cs", locale: { language: "cs", time_format: "twenty_four" } }, true);
  const t24 = await text(page);
  expect(t24).toContain("Hotovo kolem");
  expect(t24).toMatch(/Plán · hotovo 1 z 2 průchodů/);
  expect(t24).toMatch(/(?<!\d)(1[0-9]|2[0-3]|0\d):\d\d(?! ?[AP]M)/);
  await page.reload();
  await mount(page, { language: "en", locale: { language: "en", time_format: "am_pm" } }, true);
  expect(await text(page)).toMatch(/\d{1,2}:\d\d\s?[AP]M/);
  await page.reload();
  await mount(page, { language: "en", locale: { language: "en", time_format: "twenty_four" } }, true);
  expect(await text(page)).not.toMatch(/\d:\d\d\s?[AP]M/);
});

// Static guard: every key the card passes to _t()/_pl() has a Czech entry, and
// the placeholders match. Adding a string without translating it fails here.
test("every translatable string has a Czech entry with the same placeholders", () => {
  const card = readFileSync("src/anyvac-card.ts", "utf8");
  const dict = readFileSync("src/i18n.ts", "utf8");
  const table = dict.slice(dict.indexOf("const CS_TABLE"));
  const entries = new Map<string, string>();
  for (const m of table.matchAll(/^\s*"((?:[^"\\]|\\.)*)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) entries.set(m[1], m[2]);
  const keys = new Set<string>();
  for (const m of card.matchAll(/_(?:t|pl)\(\s*"((?:[^"\\]|\\.)*)"/g)) keys.add(m[1]);
  for (const m of card.matchAll(/_t\([^()]*?\?\s*"([^"]+)"\s*:\s*"([^"]+)"/g)) { keys.add(m[1]); keys.add(m[2]); }
  const consts = readFileSync("src/const.ts", "utf8");
  const a = consts.indexOf("export const STATUS_MAP");
  for (const m of consts.slice(a, consts.indexOf("};", a)).matchAll(/\["([^"]+)",\s*"/g)) keys.add(m[1]);
  const ph = (s: string) => (s.match(/\{\w+\}/g) || []).sort().join(",");
  const problems: string[] = [];
  for (const k of keys) {
    const cs = entries.get(k);
    if (cs === undefined) problems.push("missing: " + k);
    else if (ph(cs) !== ph(k)) problems.push("placeholders differ: " + k);
  }
  expect(problems).toEqual([]);
});
