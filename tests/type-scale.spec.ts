import { test, expect, type Page } from "@playwright/test";

/**
 * docs/44 K8 — one type scale and one radius scale (card 1.46.0).
 *
 * What would regress silently: a new rule (or an inline style) written with
 * a literal `font-size`/`border-radius` renders fine and passes every other
 * test, it just sits off the scale again. So instead of listing selectors,
 * this walks EVERYTHING the card renders in a themed card — landscape with a
 * running job, the portrait rail, the open sheets, the Visual editor — and
 * asserts every computed value is a scale step. `theme: legacy` must keep its
 * old literals, which the last test pins on a few known ones.
 */

const FS = new Set([10, 11, 12, 13, 15, 20]); // micro, xs, s, m, l, xl
const R = new Set(["0px", "6px", "10px", "16px", "999px", "50%"]); // + inherit resolves to one of these

const ROOMS = [
  { key: "Living room", name: "Living room", map_x: 20, map_y: 50, map_w: 37, map_h: 92 },
  { key: "Hall", name: "Hall", map_x: 47, map_y: 53, map_w: 16, map_h: 24 },
  { key: "Kitchen", name: "Kitchen", map_x: 64, map_y: 50, map_w: 19, map_h: 92 },
  { key: "WC", name: "WC", map_x: 86, map_y: 50, map_w: 3, map_h: 20 },
];

const JOB = {
  active: true, finish_at: new Date(Date.now() + 20 * 60000).toISOString(), eta_min_left: 20,
  rooms_total: 2, rooms_done: 0, passes_total: 2, passes_done: 0,
  vacuums: { "vacuum.a": { room: "Hall", kind: "dry", pct: 40, next_room: "Kitchen" } },
  rooms: [
    { room: "Hall", kind: "dry", vacuum: "vacuum.a", state: "active", pct: 40 },
    { room: "Kitchen", kind: "wet", vacuum: "vacuum.b", state: "queued", pct: 0 },
  ],
};

async function mount(page: Page, o: { theme?: string; w?: number; h?: number; running?: boolean } = {}) {
  const { theme = "dark", w = 1270, h = 714, running = true } = o;
  await page.setViewportSize({ width: w, height: h });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, w, h, running, ROOMS, JOB }) => {
    const win = window as any;
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, ct: string, color: string) => ({
      entity: "vacuum." + id, name, clean_type: ct, color, integration_entity: "sensor.anyvac_" + id,
      clean_action: { type: "native" },
      presets: [{ id: "p1", label: "Quick" }, { id: "p2", label: "Deep" }],
    });
    card.setConfig({
      type: "custom:anyvac-card", theme, map_mode: "merged", layout: {},
      image_base: { src: "/tests/harness/_floor.webp" }, rooms: ROOMS,
      vacuums: [vac("a", "S6", "dry", "#6FBF73"), vac("b", "S8", "wet", "#4DA3E8")],
    });
    const now = new Date().toISOString();
    const old = new Date(Date.now() - 9 * 86400000).toISOString();
    const seg = [...Array.from({ length: 40 }, (_, i) => ({ x: 100 + i * 4, y: 200 + (i % 2) * 3 })), { x: 400, y: 200 }, { x: 400, y: 320 }];
    const st: Record<string, unknown> = {};
    for (const id of ["a", "b"]) {
      const cleaning = running && id === "a";
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: cleaning ? "cleaning" : "docked",
        attributes: { battery_level: 64 }, last_changed: now, last_updated: now };
      st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", last_changed: now, last_updated: now,
        attributes: {
          schema_version: 3, image_dims: { top: 0, left: 0, width: 100, height: 50, scale: 10, rotation: 0 },
          vacuum_position_px: { x: 400, y: 320, a: 90 }, path_dry_px: cleaning ? [seg] : [], path_wet_px: [],
          rooms: ROOMS.map((r, i) => ({ name: r.key, segment_id: 16 + i, last_clean_dry: old, last_clean_wet: old })),
          rooms_progress: cleaning ? { Hall: { dry_pct: 40, active: true } } : {},
          rooms_coverage: { Kitchen: { dry: 83, wet: 100 } },
          job_progress: running ? JOB : { active: false },
        } };
    }
    card.hass = { states: st, localize: (k: string) => k, language: "en", hassUrl: (p: string) => p,
      services: { anyvac: { set_floorplan_seat: {} } },
      callService: async () => {}, callWS: async () => ({}) };
    win.__mockHa.cardWrap.style.width = w + "px";
    win.__mockHa.cardWrap.style.height = h + "px";
    win.__mockHa.cardWrap.appendChild(card);
    win.__card = card;
  }, { theme, w, h, running, ROOMS, JOB });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(700);
}

/** Every element under `root` (recursing into nested open shadow roots):
 *  text-bearing elements must be on the type scale, every element on the
 *  radius scale. Returns the offenders, described well enough to find them. */
async function offScale(page: Page, which: "card" | "ve" = "card") {
  return page.evaluate(({ which, FS, R }) => {
    const fs = new Set(FS), rs = new Set(R);
    const start = which === "card"
      ? (window as any).__card.shadowRoot
      : (document.querySelector("anyvac-visual-editor") as any).shadowRoot;
    const out: string[] = [];
    const walk = (root: ParentNode) => {
      for (const el of Array.from(root.querySelectorAll("*")) as HTMLElement[]) {
        if (el.shadowRoot) walk(el.shadowRoot);
        const cs = getComputedStyle(el);
        if (cs.display === "none" || el.closest("svg")) continue;
        const name = el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : "");
        const hasText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent ?? "").trim());
        if (hasText && !fs.has(parseFloat(cs.fontSize))) out.push(`font ${cs.fontSize} ${name} "${(el.textContent ?? "").trim().slice(0, 20)}"`);
        for (const c of ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"] as const) {
          const v = cs[c];
          if (!rs.has(v)) { out.push(`radius ${v} ${name}`); break; }
        }
      }
    };
    walk(start);
    return [...new Set(out)];
  }, { which, FS: [...FS], R: [...R] });
}

test("landscape, running job: everything on the scale (dark and light)", async ({ page }) => {
  await mount(page);
  expect(await offScale(page)).toEqual([]);
  await mount(page, { theme: "light", running: false });
  expect(await offScale(page)).toEqual([]);
});

test("portrait rail + robot sheet + mode sheet: everything on the scale", async ({ page }) => {
  await mount(page, { w: 412, h: 780 });
  expect(await offScale(page)).toEqual([]);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    c._robotSheet = 0;
    await c.updateComplete;
  });
  expect(await offScale(page)).toEqual([]);
});

test("Visual editor: everything on the scale", async ({ page }) => {
  await mount(page, { running: false });
  for (const tool of ["rooms", "seat", "floorplan"]) {
    await page.evaluate(async (tool) => {
      const c = (window as any).__card;
      if (!document.querySelector("anyvac-visual-editor")) c._openAlign(c._config.vacuums[0]);
      c._veTool = tool;
      await c.updateComplete;
    }, tool);
    await page.waitForFunction(() => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot?.querySelector(".ve-topbar"));
    expect(await offScale(page, "ve"), tool).toEqual([]);
  }
});

test("legacy keeps its literals", async ({ page }) => {
  await mount(page, { theme: "legacy" });
  const r = await page.evaluate(() => {
    const root = (window as any).__card.shadowRoot as ShadowRoot;
    const cs = (sel: string) => { const el = root.querySelector(sel); return el ? getComputedStyle(el) : null; };
    return {
      covFs: cs(".dock-cov")?.fontSize, rowR: cs(".dock-row")?.borderTopLeftRadius,
      mapR: cs(".map-wrap")?.borderTopLeftRadius, metaR: cs(".meta-bar")?.borderTopLeftRadius,
      roomR: cs(".room-overlay")?.borderTopLeftRadius,
    };
  });
  expect(r).toEqual({ covFs: "9px", rowR: "9px", mapR: "12px", metaR: "12px", roomR: "6px" });
});
