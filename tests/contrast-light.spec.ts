import { test, expect, type Page } from "@playwright/test";
// docs/49 F4: in a light theme every plain text element on the card panel clears 4.5:1.
// Elements darkened through a CSS filter (status colours) are measured by the filter, not here.
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
    const parse = (c: string): number[] => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return [0,0,0,0]; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0],p[1],p[2],p.length>3?p[3]:1]; };
    const lum = (c: number[]) => { const f = c.map(v => { const x=v/255; return x<=0.03928? x/12.92 : Math.pow((x+0.055)/1.055,2.4);}); return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2]; };
    const out: string[] = [];
    card.shadowRoot.querySelectorAll("*").forEach((el: HTMLElement) => {
      const own = Array.from(el.childNodes).filter(n => n.nodeType === 3 && (n.textContent||"").trim()).map(n => n.textContent!.trim()).join(" ");
      if (!own) return;
      if (getComputedStyle(el).filter !== "none") return;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      const chain: HTMLElement[] = []; let n: Element | null = el;
      while (n) { chain.push(n as HTMLElement); const p: Element | null = n.parentElement; n = p ?? ((n.getRootNode() as ShadowRoot).host ?? null); }
      let bg = [255,255,255];
      for (const e of chain.reverse()) { const [rr,g,b,a] = parse(getComputedStyle(e).backgroundColor); if (a>0) bg = [rr*a+bg[0]*(1-a), g*a+bg[1]*(1-a), b*a+bg[2]*(1-a)]; }
      const [fr,fg,fb,fa] = parse(getComputedStyle(el).color);
      const fgc = [fr*fa+bg[0]*(1-fa), fg*fa+bg[1]*(1-fa), fb*fa+bg[2]*(1-fa)];
      const l1 = lum(fgc), l2 = lum(bg); const c = (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
      if (c < 4.5) out.push(c.toFixed(2) + "  ." + (el.className||el.tagName) + "  '" + own.slice(0,28) + "'");
    });
    return out;
  });
  expect(res, label).toEqual([]);
}
test("light theme: text contrast on the card panel", async ({ page }) => {
  await run(page, 1270, 714, false, "light", "land-idle-light");
  await run(page, 1270, 714, true, "light", "land-job-light");
  await run(page, 420, 900, false, "light", "port-idle-light");
  await run(page, 420, 900, true, "light", "port-job-light");
});
