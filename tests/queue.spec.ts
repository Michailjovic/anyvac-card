import { test, expect, type Page } from "@playwright/test";

/**
 * docs/52 (card 1.62.0) — the room-by-room queue while a job runs, and
 * service points.
 *
 * What would regress silently:
 *  - the queue stops reading `job_progress.queues` (lanes or times the card
 *    made up, a wet room not marked as waiting for its dry pass);
 *  - a row action calls the wrong `anyvac.edit_job` shape (move index, pin,
 *    remove, retry) — the backend would refuse it or edit the wrong room;
 *  - a tap on a room during a job selects it instead of offering to add it;
 *  - Go is offered while the robot still has rooms (the backend refuses it).
 */

const FLOOR = "/tests/harness/_floor.webp";
const Q = (id: string, room: string, kind: string, state: string, extra: Record<string, unknown> = {}) => ({
  id, room, rooms: [room], kind, state, pct: state === "done" ? 100 : 0,
  start_at: "2030-01-01T16:10:00Z", finish_at: "2030-01-01T16:20:00Z", ...extra,
});
const JOB = {
  active: true, schema: 2, job_id: "j1", finish_at: "2030-01-01T16:40:00Z", eta_min_left: 31,
  rooms_total: 3, rooms_done: 1, passes_total: 6, passes_done: 1,
  vacuums: { "vacuum.s7": { room: "Kitchen", kind: "dry", pct: 64 } },
  rooms: [],
  warnings: [],
  queues: {
    "vacuum.s6": { mode: "rooms", state: "idle", items: [Q("d1", "Hall", "dry", "done")] },
    "vacuum.s7": { mode: "rooms", state: "cleaning", items: [
      Q("d2", "Kitchen", "dry", "active", { pct: 64 }),
      Q("d3", "Bathroom", "dry", "queued", { start_at: "2030-01-01T16:12:00Z" }),
      Q("d4", "Hall", "dry", "removed"),
    ] },
    "vacuum.s8": { mode: "rooms", state: "idle", items: [
      Q("w1", "Hall", "wet", "blocked", { reason: "water_shortage" }),
      Q("w2", "Kitchen", "wet", "queued", { waits_for: ["vacuum.s7"], start_at: "2030-01-01T16:25:00Z" }),
      Q("w3", "Bathroom", "wet", "queued", { waits_for: ["vacuum.s7"], start_at: "2030-01-01T16:30:00Z" }),
    ] },
  },
};
const SP = [{ name: "Trash bin", x: 1200, y: 900, px: { x: 200, y: 150 }, home_px: null, room: "Kitchen" }];

async function mount(page: Page, o: { width?: number; height?: number; job?: boolean; points?: boolean; view?: string } = {}) {
  const { width = 1270, height = 714, job = true, points = false, view } = o;
  await page.setViewportSize({ width, height });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ width, height, job, points, view, FLOOR, JOB, SP }) => {
    const win = window as any;
    win.__calls = [];
    try { localStorage.clear(); } catch { /* */ }
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, ct: string) => ({
      entity: "vacuum." + id, name, clean_type: ct, integration_entity: "sensor.anyvac_" + id, clean_action: { type: "native" },
    });
    card.setConfig({
      type: "custom:anyvac-card", theme: "dark", map_mode: "merged", layout: {}, image_base: { src: FLOOR },
      ...(view ? { queue_view: view } : {}),
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
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: job && id === "s7" ? "cleaning" : "docked", attributes: { battery_level: 80 }, last_changed: now, last_updated: now };
      st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", last_changed: now, last_updated: now,
        attributes: { schema_version: 2, job_progress: job ? JOB : { active: false },
          ...(points && id === "s6" ? { service_points: SP, vacuum_position_px: { x: 200, y: 200 }, image_dims: { width: 400, height: 300, scale: 1 } } : {}) } };
    }
    card.hass = { states: st, localize: (k: string) => k, language: "en",
      services: { anyvac: { edit_job: {}, set_service_point: {}, go_to_service_point: {}, remove_service_point: {}, plan: {} } },
      callService: async (d: string, s: string, data: any) => { win.__calls.push([d, s, data]); },
      callWS: async () => ({}) };
    win.__mockHa.cardWrap.style.width = width + "px";
    win.__mockHa.cardWrap.style.height = height + "px";
    win.__mockHa.cardWrap.appendChild(card);
    win.__card = card;
  }, { width, height, job, points, view, FLOOR, JOB, SP });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(500);
}

const q = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  const t = (el: Element | null | undefined) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
  return {
    head: t(root.querySelector(".q-col .plan-head span")),
    lanes: Array.from(root.querySelectorAll(".q-lane")).map((l) => ({
      name: (() => { const n = l.querySelector(".q-lane-name")?.cloneNode(true) as Element | undefined; n?.querySelector("small")?.remove(); return t(n); })(),
      sub: t(l.querySelector(".q-lane-name small")),
      rows: Array.from(l.querySelectorAll(".q-row")).map((r) => ({ name: t(r.querySelector(".q-name")), right: t(r.querySelector(".q-right")), cls: r.className })),
    })),
    secs: Array.from(root.querySelectorAll(".q-sec")).map((s) => ({
      title: t(s.querySelector(".q-sec-title")),
      rows: Array.from(s.querySelectorAll(".q-name")).map((n) => t(n)),
    })),
    alerts: t(root.querySelector(".q-alerts")),
  };
});
const calls = (page: Page, svc: string) => page.evaluate((svc) => (window as any).__calls.filter((c: any) => c[1] === svc).map((c: any) => c[2]), svc);
const shadow = (page: Page, sel: string) => page.locator("anyvac-card").locator(sel);

test("lanes by robot: states from job_progress.queues, removed rows gone, wet waits for its dry pass", async ({ page }) => {
  await mount(page);
  const s = await q(page);
  expect(s.head).toBe("Queue · 1 of 3 rooms done");
  expect(s.lanes.map((l) => l.name)).toEqual(["S6", "S7", "S8"]);
  expect(s.lanes.map((l) => l.sub)).toEqual(["done", "Kitchen", "waiting"]);
  expect(s.lanes[1].rows.map((r) => r.name)).toEqual(["Kitchen", "Bathroom"]); // d4 removed
  expect(s.lanes[1].rows[0].right).toBe("64 %");
  expect(s.lanes[2].rows[1].right).toBe("after S7");
  expect(s.lanes[2].rows[0].cls).toContain("q-row--blocked");
  expect(s.alerts).toContain("S8: Hall (wet) — water tank empty");
});

test("the view toggle switches to Now / Next / Done and is remembered", async ({ page }) => {
  await mount(page);
  await shadow(page, '.q-view[aria-label="By time"]').click();
  const s = await q(page);
  expect(s.secs.map((x) => x.title)).toEqual(["Now", "Done", "Next"]);
  expect(s.secs[2].rows[0]).toContain("Hall"); // blocked first
  expect(s.secs[2].rows.slice(1).map((r) => r.split(" ")[0])).toEqual(["Bathroom", "Kitchen", "Bathroom"]);
  const stored = await page.evaluate(() => Object.keys(localStorage).find((k) => k.startsWith("anyvac-card:queue-view:")));
  expect(stored).toBeTruthy();
});

test("config queue_view: time is the default", async ({ page }) => {
  await mount(page, { view: "time" });
  expect((await q(page)).secs.length).toBeGreaterThan(0);
});

test("row actions send edit_job: move, give to another robot, remove, retry", async ({ page }) => {
  await mount(page);
  const bath = shadow(page, ".q-lane").nth(1).locator(".q-row").nth(1);
  await bath.click();
  await expect(shadow(page, ".q-actions")).toHaveCount(1);
  await expect(shadow(page, '.q-act[aria-label="Move up"]')).toBeDisabled(); // first queued
  await shadow(page, '.q-act[title="Give it to S6"]').click();
  expect((await calls(page, "edit_job")).pop()).toEqual({ pin: { Bathroom: { dry: "vacuum.s6" } } });
  await shadow(page, ".q-lane").nth(2).locator(".q-row").nth(2).click();
  await shadow(page, '.q-act[aria-label="Move up"]').click();
  expect((await calls(page, "edit_job")).pop()).toEqual({ move: { room: "Bathroom", kind: "wet", index: 0 } });
  await shadow(page, ".q-lane").nth(2).locator(".q-row").nth(1).click();
  await shadow(page, '.q-act[aria-label="Remove from the queue"]').click();
  expect((await calls(page, "edit_job")).pop()).toEqual({ remove: ["Kitchen"], mode: "wet" });
  await shadow(page, ".q-retry").click();
  expect((await calls(page, "edit_job")).pop()).toEqual({ retry: ["Hall"], mode: "wet" });
});

test("a tap on a room during a job opens Add a room for it", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    const vac = c._config.vacuums[0];
    const room = c._roomsFor(vac).find((r: any) => r.key === "Bathroom");
    c._holdTimer = setTimeout(() => {}, 1000);
    c._onRoomPointerUp(room, vac, c._config.vacuums, false)();
    await c.updateComplete;
  });
  await expect(shadow(page, ".q-add")).toHaveCount(1);
  // Bathroom has both passes queued → nothing to add in Both; Dry is taken too.
  await expect(shadow(page, '.q-room:has-text("Bathroom")')).toBeDisabled();
  await shadow(page, '.q-add .dock-mode:has-text("Wet")').click();
  await shadow(page, '.q-room:has-text("Hall")').click(); // the blocked wet Hall may be added again
  await shadow(page, ".q-add-go").click();
  expect((await calls(page, "edit_job")).pop()).toEqual({ add: ["Hall"], mode: "wet" });
  const sel = await calls(page, "select_rooms");
  expect(sel.length).toBe(0);
});

test("portrait: the hero opens the queue as a sheet", async ({ page }) => {
  await mount(page, { width: 390, height: 844 });
  const opener = shadow(page, ".meta-hero--open, .rail-plan--open").first();
  await opener.click();
  await expect(shadow(page, ".q-sheet")).toHaveCount(1);
  await expect(shadow(page, ".q-sheet .q-lanes--sheet")).toHaveCount(1);
});

test("service point: Go is refused in the card while the robot has rooms, offered when it has none", async ({ page }) => {
  await mount(page, { points: true });
  await page.evaluate(async () => { const c = (window as any).__card; c._robotSheet = 1; await c.updateComplete; }); // S7 (no points)
  await expect(shadow(page, ".sp-row")).toHaveCount(0);
  await expect(shadow(page, ".sp-add")).toHaveCount(1);
  await page.evaluate(async () => { const c = (window as any).__card; c._robotSheet = 0; await c.updateComplete; }); // S6, done
  await expect(shadow(page, ".sp-row")).toHaveCount(1);
  await expect(shadow(page, ".sp-go")).toBeEnabled();
  await shadow(page, ".sp-go").click();
  expect((await calls(page, "go_to_service_point")).pop()).toEqual({ entity_id: "vacuum.s6", name: "Trash bin" });
});

test("service point: busy robot gets a disabled Go with the reason", async ({ page }) => {
  await mount(page, { points: true });
  await page.evaluate(async () => {
    const c = (window as any).__card;
    const st = c.hass.states["sensor.anyvac_s6"];
    st.attributes.job_progress = { ...st.attributes.job_progress, queues: { ...st.attributes.job_progress.queues,
      "vacuum.s6": { items: [{ id: "x", room: "Kitchen", rooms: ["Kitchen"], kind: "dry", state: "queued" }] } } };
    for (const id of ["s7", "s8"]) c.hass.states["sensor.anyvac_" + id].attributes.job_progress = st.attributes.job_progress;
    c.hass = { ...c.hass };
    c._robotSheet = 0;
    await c.updateComplete;
  });
  await expect(shadow(page, ".sp-go")).toBeDisabled();
  await expect(shadow(page, ".sp-why")).toHaveCount(1);
});

test("service point: placing one — map tap, name, Save sends set_service_point; rename keeps the point", async ({ page }) => {
  await mount(page, { points: true, job: false });
  await page.evaluate(async () => { const c = (window as any).__card; c._spStart(0, "Door"); await c.updateComplete; });
  await expect(shadow(page, ".sp-bar")).toHaveCount(1);
  await expect(shadow(page, ".sp-save")).toBeDisabled();
  await page.evaluate(async () => { const c = (window as any).__card; c._spSet = { ...c._spSet, point: { x: 12.5, y: 40 } }; await c.updateComplete; });
  await shadow(page, ".sp-save").click();
  expect((await calls(page, "set_service_point")).pop()).toEqual({ entity_id: "vacuum.s6", name: "Door", x_pct: 12.5, y_pct: 40 });
  await expect(shadow(page, ".sp-bar")).toHaveCount(0);
  await page.evaluate(async () => { const c = (window as any).__card; c._spStart(0, "Trash bin", "Trash bin", true); await c.updateComplete; });
  await shadow(page, ".sp-name-input").fill("Bin");
  await shadow(page, ".sp-save").click();
  expect((await calls(page, "set_service_point")).pop()).toEqual({ entity_id: "vacuum.s6", name: "Bin", from_name: "Trash bin" });
});

test("service points: hidden until the toolbar flag shows them; a tap on one offers to send the robot", async ({ page }) => {
  await mount(page, { points: true, job: false });
  await page.evaluate(() => { try { localStorage.clear(); } catch { /* */ } });
  await expect(shadow(page, "g.avc-sp")).toHaveCount(0);
  const toggle = shadow(page, 'button[aria-label="Service points"]');
  await expect(toggle).toHaveCount(1);
  await toggle.click();
  await expect(shadow(page, "g.avc-sp")).toHaveCount(1);
  // A real tap reaches the flag (the room buttons are below it).
  const hit = await page.evaluate(() => {
    const r = (window as any).__card.shadowRoot as ShadowRoot;
    const g = r.querySelector("g.avc-sp--tap") as SVGGElement;
    const b = g.getBoundingClientRect();
    const el = r.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2);
    return !!el && g.contains(el) ? true : [el?.tagName, (el as any)?.className?.baseVal ?? (el as any)?.className, b.x, b.y, b.width];
  });
  expect(hit).toBe(true);
  await shadow(page, "g.avc-sp--tap").dispatchEvent("click");
  await expect(shadow(page, ".sp-bar")).toHaveCount(1);
  await shadow(page, ".sp-bar .sp-save").click();
  expect((await calls(page, "go_to_service_point")).pop()).toEqual({ entity_id: "vacuum.s6", name: "Trash bin" });
  await toggle.click();
  await expect(shadow(page, "g.avc-sp")).toHaveCount(0);
});

test("map entity: the integration's map_entity picks between two live maps", async ({ page }) => {
  await mount(page, { job: false });
  const got = await page.evaluate(() => {
    const c = (window as any).__card;
    const now = new Date().toISOString();
    const img = (id: string) => ({ entity_id: id, state: now, attributes: { entity_picture: "/api/image_proxy/" + id }, last_changed: now, last_updated: now });
    c.hass.states["image.s7_a"] = img("image.s7_a");
    c.hass.states["image.s7_b"] = img("image.s7_b");
    c.hass.entities = { "vacuum.s7": { device_id: "d7" }, "image.s7_a": { device_id: "d7" }, "image.s7_b": { device_id: "d7" } };
    const vac = c._config.vacuums[1];
    const before = c._mapEntityFor(vac);
    c.hass.states["sensor.anyvac_s7"].attributes.map_entity = "image.s7_b";
    return [before, c._mapEntityFor(vac)];
  });
  expect(got).toEqual([undefined, "image.s7_b"]);
});

test("service point flags stay upright whatever angle the vacuum's map is seated at", async ({ page }) => {
  await mount(page, { points: true, job: false });
  const angles = await page.evaluate(async () => {
    const c = (window as any).__card;
    c._spShow = true;
    const out: number[] = [];
    for (const rot of [0, 37, 90, 180, 251]) {
      c._effectiveSeat = () => ({ offset_x: 0, offset_y: 0, scale: 100, rotation: rot, scaleY: rot === 37 ? 130 : undefined });
      c.requestUpdate();
      await c.updateComplete;
      const path = c.shadowRoot.querySelector("g.avc-sp path") as SVGGraphicsElement;
      const m = path.getScreenCTM()!;
      // Upright: no rotation and no shear in the flag's own screen matrix.
      out.push(Math.round((Math.atan2(m.b, m.a) * 180) / Math.PI) + 0, Math.round(Math.abs(m.a * m.c + m.b * m.d) * 1000) + 0);
    }
    return out;
  });
  expect(angles).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});
