import { test, expect, type Page } from "@playwright/test";

/**
 * docs/46 G2 — the landscape right column (card 1.49.0).
 *
 * What would regress silently:
 *  - the column stops reading the backend plan: rows out of the timeline's
 *    order, avatars not from `anyvac.plan`, a finish time the card made up;
 *  - while a job runs it shows anything but `job_progress` (and no CANCEL);
 *  - the robot picker pills or the permanent room list come back, or the
 *    hold-to-hide they did gets lost on the tiles that replace them;
 *  - `legacy` loses its old column.
 */

const FLOOR = "/tests/harness/_floor.webp";
const PLAN = {
  dry: { "vacuum.s6": ["Hall", "Bathroom"], "vacuum.s7": ["Kitchen"] },
  wet: { "vacuum.s8": ["Hall", "Kitchen", "Bathroom"] },
  eta_min: 52,
  timeline: { dry: { Hall: 12, Kitchen: 31, Bathroom: 21 }, wet: { Hall: 24, Kitchen: 52, Bathroom: 40 } },
  unsequenced: [],
};
const JOB = {
  active: true, finish_at: "2030-01-01T16:40:00Z", eta_min_left: 31,
  rooms_total: 3, rooms_done: 1, passes_total: 4, passes_done: 1,
  vacuums: { "vacuum.s7": { room: "Kitchen", kind: "dry", pct: 64 } },
  rooms: [
    { room: "Hall", kind: "dry", vacuum: "vacuum.s6", state: "done", pct: 100 },
    { room: "Kitchen", kind: "dry", vacuum: "vacuum.s7", state: "active", pct: 64 },
    { room: "Hall", kind: "wet", vacuum: "vacuum.s8", state: "active", pct: 38 },
    { room: "Kitchen", kind: "wet", vacuum: "vacuum.s8", state: "queued", pct: 0 },
  ],
};

async function mount(page: Page, o: { theme?: string; job?: boolean; select?: string[]; dense?: boolean } = {}) {
  const { theme = "dark", job = false, select = [], dense = false } = o;
  await page.setViewportSize({ width: 1270, height: 714 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, job, select, dense, FLOOR, PLAN, JOB }) => {
    const win = window as any;
    win.__calls = [];
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, ct: string) => ({
      entity: "vacuum." + id, name, clean_type: ct, integration_entity: "sensor.anyvac_" + id, clean_action: { type: "native" },
    });
    card.setConfig({
      type: "custom:anyvac-card", theme, map_mode: "merged", layout: {}, image_base: { src: FLOOR },
      ...(dense ? { debug_dense_dock: true } : {}),
      rooms: [
        { key: "Hall", name: "Hall", map_x: 20, map_y: 50, map_w: 30, map_h: 90 },
        { key: "Kitchen", name: "Kitchen", map_x: 55, map_y: 50, map_w: 30, map_h: 90 },
        { key: "Bathroom", name: "Bathroom", map_x: 85, map_y: 50, map_w: 20, map_h: 90 },
      ],
      vacuums: [vac("s6", "S6", "dry"), vac("s7", "S7", "dry"), vac("s8", "S8", "wet")],
    });
    const now = new Date().toISOString();
    const st: Record<string, unknown> = {};
    for (const id of ["s6", "s7", "s8"]) {
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: job && id !== "s6" ? "cleaning" : "docked", attributes: { battery_level: 80 }, last_changed: now, last_updated: now };
      st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", last_changed: now, last_updated: now,
        attributes: { schema_version: 2, job_progress: job ? JOB : { active: false },
          ...(select.length ? { selected_rooms: select } : {}) } };
    }
    card.hass = { states: st, localize: (k: string) => k, language: "en",
      callService: async (d: string, s: string, data: any) => {
        win.__calls.push([d, s, data]);
        if (d === "anyvac" && s === "plan") {
          const rooms = new Set(data.rooms as string[]);
          const keep = (m: Record<string, string[]>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [k, v.filter((r) => rooms.has(r))]));
          return { response: { plan: { ...PLAN, dry: keep(PLAN.dry), wet: keep(PLAN.wet) } } };
        }
      },
      callWS: async () => ({}) };
    win.__mockHa.cardWrap.style.width = "1270px";
    win.__mockHa.cardWrap.style.height = "714px";
    win.__mockHa.cardWrap.appendChild(card);
    win.__card = card;
  }, { theme, job, select, dense, FLOOR, PLAN, JOB });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(600);
}

const col = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  const c = root.querySelector(".plan-col");
  const t = (el: Element | null | undefined) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
  return {
    exists: !!c,
    head: t(c?.querySelector(".plan-head")),
    rows: Array.from(c?.querySelectorAll(".plan-row") ?? []).map((r) => ({
      name: t(r.querySelector(".plan-name")),
      chips: Array.from(r.querySelectorAll(".dock-avatars > *")).map((x) => t(x)),
      when: t(r.querySelector(".plan-when")),
      state: r.className.replace(/.*plan-row--(\w+).*/, "$1"),
    })),
    sum: t(c?.querySelector(".plan-sum")),
    btn: t(c?.querySelector(".dock-run")),
    picker: root.querySelectorAll(".vac-picker").length,
    roomList: root.querySelectorAll(".dock-rows").length,
    modes: root.querySelectorAll(".plan-col .dock-mode").length,
  };
});

test("idle, whole home: rooms in the order they get done, assigned robots, START", async ({ page }) => {
  await mount(page);
  const c = await col(page);
  expect(c.exists).toBe(true);
  expect(c.head).toBe("Whole home · 3 rooms");
  expect(c.rows.map((r) => r.name)).toEqual(["Hall", "Bathroom", "Kitchen"]); // finish 24 / 40 / 52
  expect(c.rows[0].chips.length).toBe(2); // dry + wet in Both
  expect(c.sum).toMatch(/^Done around \S+/);
  expect(c.sum).toContain("dry S6 + S7, then wet S8");
  expect(c.btn).toBe("Hold to start");
  expect(c.modes).toBe(3);
  expect(c.picker + c.roomList).toBe(0);
});

test("a selection narrows the plan and offers Clear", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    c._toggleRoomAcross("Kitchen", c._config.vacuums);
    await c.updateComplete;
  });
  await page.waitForTimeout(200);
  const c = await col(page);
  expect(c.head).toBe("Selected · 1 room Clear · whole home");
  expect(c.rows.map((r) => r.name)).toEqual(["Kitchen"]);
  const plan = await page.evaluate(() => (window as any).__calls.filter((x: any) => x[1] === "plan").pop()[2]);
  expect(plan.rooms).toEqual(["Kitchen"]);
});

test("Dry mode shows only the dry robot per room", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => { const c = (window as any).__card; c._planMode = "dry"; await c.updateComplete; });
  await page.waitForTimeout(200);
  expect((await col(page)).rows[0].chips.length).toBe(1);
});

test("running: passes from job_progress, finish time, CANCEL", async ({ page }) => {
  await mount(page, { job: true });
  const c = await col(page);
  expect(c.head).toBe("Plan · 1 of 4 passes done");
  expect(c.rows.map((r) => `${r.name}:${r.state}:${r.when}`)).toEqual([
    "Hall:done:", "Kitchen:active:64 %", "Hall:active:38 %", "Kitchen:queued:",
  ]);
  expect(c.sum).toContain("~31 min left");
  expect(c.btn).toBe("Cancel · hold");
  expect(c.modes).toBe(0);
});

test("tile hold hides the robot on the map; a tap opens its sheet", async ({ page }) => {
  await mount(page);
  const tile = page.locator("anyvac-card .tile-main").nth(1);
  await tile.hover();
  await page.mouse.down();
  await page.waitForTimeout(900);
  await page.mouse.up();
  await page.waitForTimeout(100);
  let r = await page.evaluate(() => {
    const c = (window as any).__card;
    return { shown: [...c._shownSet].sort(), sheet: c._robotSheet, hidden: c.shadowRoot.querySelectorAll(".tile-main--hidden").length };
  });
  expect(r).toEqual({ shown: [0, 2], sheet: null, hidden: 1 });
  // The hidden robot keeps its (dimmed) tile, so the same hold brings it back.
  await tile.hover();
  await page.mouse.down();
  await page.waitForTimeout(900);
  await page.mouse.up();
  expect(await page.evaluate(() => [...(window as any).__card._shownSet].sort())).toEqual([0, 1, 2]);
  await tile.click();
  expect(await page.evaluate(() => (window as any).__card._robotSheet)).toBe(1);
});

test("legacy and debug_dense_dock keep the old column", async ({ page }) => {
  for (const o of [{ theme: "legacy" }, { dense: true }]) {
    await mount(page, o);
    const c = await col(page);
    expect(c.exists, JSON.stringify(o)).toBe(false);
    expect(c.roomList, JSON.stringify(o)).toBe(1);
  }
});
