import { test, expect, type Page } from "@playwright/test";
// docs/49 F5: touch targets in portrait.
const FLOOR = "/tests/harness/_floor.webp";
const ROOMS = ["Hall","Kitchen","Bathroom","Bedroom"];
const JOB = { active: true, finish_at: "2030-01-01T16:40:00Z", eta_min_left: 31, rooms_total: 3, rooms_done: 1, passes_total: 4, passes_done: 1,
  vacuums: { "vacuum.s7": { room: "Kitchen", kind: "dry", pct: 64 } },
  rooms: [ { room: "Hall", kind: "dry", vacuum: "vacuum.s6", state: "done", pct: 100 }, { room: "Kitchen", kind: "dry", vacuum: "vacuum.s7", state: "active", pct: 64 }, { room: "Hall", kind: "wet", vacuum: "vacuum.s8", state: "active", pct: 38 }, { room: "Kitchen", kind: "wet", vacuum: "vacuum.s8", state: "queued", pct: 0 } ] };
async function run(page: Page, w: number, h: number, job: boolean, theme: string, label: string) {
  await page.setViewportSize({ width: w, height: h });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ w, h, job, theme, FLOOR, ROOMS, JOB }) => {
    const win = window as any;
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, ct: string) => ({ entity: "vacuum." + id, name, clean_type: ct, integration_entity: "sensor.anyvac_" + id, clean_action: { type: "native" } });
    card.setConfig({ type: "custom:anyvac-card", theme, map_mode: "merged", layout: {}, image_base: { src: FLOOR },
      rooms: ROOMS.map((r: string, i: number) => ({ key: r, name: r, map_x: 12 + i * 22, map_y: 50, map_w: 20, map_h: 90 })),
      vacuums: [vac("s6","S6","dry"), vac("s7","S7","dry"), vac("s8","S8","wet")] });
    const now = new Date().toISOString(); const st: Record<string, unknown> = {};
    for (const id of ["s6","s7","s8"]) {
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: job && id !== "s6" ? "cleaning" : "docked", attributes: { battery_level: 80 }, last_changed: now, last_updated: now };
      st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", last_changed: now, last_updated: now, attributes: { schema_version: 2, job_progress: job ? JOB : { active: false } } };
    }
    card.hass = { states: st, localize: (k: string) => k, language: "en", themes: { darkMode: theme === "dark" },
      callService: async (d: string, s: string, data: any) => { if (d === "anyvac" && s === "plan") { const rs = data.rooms as string[]; const tl: any = {}; rs.forEach((r, i) => tl[r] = 10 + i * 8);
        return { response: { plan: { dry: { "vacuum.s6": rs }, wet: { "vacuum.s8": rs }, eta_min: 52, timeline: { dry: tl, wet: tl }, unsequenced: [] } } }; } }, callWS: async () => ({}) };
    win.__mockHa.cardWrap.style.width = w + "px"; win.__mockHa.cardWrap.style.height = h + "px";
    win.__mockHa.cardWrap.appendChild(card);
  }, { w, h, job, theme, FLOOR, ROOMS, JOB });
  await page.waitForTimeout(1200);
  const res = await page.evaluate(() => {
    const card = (window as any).__mockHa.cardWrap.querySelector("anyvac-card") as any;
    const out: string[] = [];
    card.shadowRoot.querySelectorAll("button, [role=button], .dock-chip, .room-overlay > *").forEach((el: HTMLElement) => {
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      if (el.closest(".room-overlay") && !el.matches("button")) return;
      const label = (el.getAttribute("aria-label") || el.textContent || "").trim();
      if (!label && !el.getAttribute("title")) out.push("unnamed ." + el.className);
      if (r.width < 44 || r.height < 44) out.push(Math.round(r.width) + "x" + Math.round(r.height) + " ." + el.className + " '" + label.slice(0, 24) + "' title=" + !!el.getAttribute("title") + " aria=" + !!el.getAttribute("aria-label"));
    });
    return out;
  });
  expect(res, label).toEqual([]);
}
test("portrait: every button is a >=44 px touch target and has a name (docs/49 F5)", async ({ page }) => {
  await run(page, 420, 900, false, "light", "port-idle-light");
  await run(page, 420, 900, true, "light", "port-job-light");
});
