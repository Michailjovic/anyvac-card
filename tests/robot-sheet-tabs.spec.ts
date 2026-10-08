import { test, expect, type Page } from "@playwright/test";

/**
 * docs/46 G1 — care and dock per robot (card 1.48.0).
 *
 * What would regress silently:
 *  - a tab shown for hardware the robot doesn't have (S6 has no dock, an
 *    empty-only dock can only Empty) or hidden for hardware it does;
 *  - the "needs attention" dot landing on the wrong robot, the wrong tab, or
 *    ignoring `care_warn_pct`;
 *  - the Care list not being worst-first;
 *  - the old global dock (START-bar segment, landscape Dock button) coming back.
 */

const FLOOR = "/tests/harness/_floor.webp";

interface Opts { w?: number; h?: number; warn?: number; dirtyTank?: boolean; filterH?: number; dockErr?: boolean }

async function mount(page: Page, o: Opts = {}): Promise<void> {
  const { w = 1270, h = 714, warn, dirtyTank = false, filterH = 12, dockErr = false } = o;
  await page.setViewportSize({ width: w, height: h });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ w, h, warn, dirtyTank, filterH, dockErr, FLOOR }) => {
    const win = window as any;
    win.__calls = [];
    const card = document.createElement("anyvac-card") as any;
    const vac = (id: string, name: string, ct: string) => ({
      entity: "vacuum." + id, name, clean_type: ct, integration_entity: "sensor.anyvac_" + id,
      clean_action: { type: "native" },
    });
    card.setConfig({
      type: "custom:anyvac-card", map_mode: "merged", layout: {}, image_base: { src: FLOOR },
      ...(warn != null ? { care_warn_pct: warn } : {}),
      rooms: [{ key: "Hall", name: "Hall", map_x: 47, map_y: 53, map_w: 16, map_h: 24 }],
      vacuums: [vac("s6", "S6", "dry"), vac("s7", "S7", "dry"), vac("s8", "S8", "wet")],
    });
    const now = new Date().toISOString();
    const st: Record<string, unknown> = {};
    const ent = (id: string, state: string, attrs: Record<string, unknown> = {}) => {
      st[id] = { entity_id: id, state, attributes: attrs, last_changed: now, last_updated: now };
    };
    const features: Record<string, unknown> = {
      s6: { has_dock: false, is_collectable: false, is_washable: false, is_dryable: false },
      s7: { has_dock: true, is_collectable: true, is_washable: false, is_dryable: false },
      s8: { has_dock: true, is_collectable: true, is_washable: true, is_dryable: true },
    };
    for (const id of ["s6", "s7", "s8"]) {
      ent("vacuum." + id, "docked", { battery_level: 90 });
      const err = dockErr && id === "s8";
      ent("sensor.anyvac_" + id, "0", { schema_version: 2, dock_status: {
        features: features[id], dock_error_status: err ? 38 : 0, dock_error: err ? "water_empty" : null } });
    }
    // Registry: S6 has its own body consumables, S7 none, S8 body + dock parts.
    const entities: Record<string, unknown> = {};
    const devices: Record<string, unknown> = {};
    const reg = (id: string, dev: string, tk?: string) => { entities[id] = { entity_id: id, device_id: dev, translation_key: tk }; };
    for (const id of ["s6", "s7", "s8"]) {
      devices["d_" + id] = { id: "d_" + id, identifiers: [["roborock", "duid_" + id]] };
      reg("vacuum." + id, "d_" + id);
    }
    devices["d_s8_dock"] = { id: "d_s8_dock", identifiers: [["roborock", "duid_s8_dock"]] };
    reg("sensor.s6_main_brush", "d_s6", "main_brush_time_left"); ent("sensor.s6_main_brush", "240", { unit_of_measurement: "h" });
    reg("button.s6_reset_main", "d_s6", "reset_main_brush_consumable"); ent("button.s6_reset_main", "unknown");
    reg("sensor.s8_main_brush", "d_s8", "main_brush_time_left"); ent("sensor.s8_main_brush", "192", { unit_of_measurement: "h" });
    reg("sensor.s8_side_brush", "d_s8", "side_brush_time_left"); ent("sensor.s8_side_brush", "54", { unit_of_measurement: "h" });
    reg("sensor.s8_filter", "d_s8", "filter_time_left"); ent("sensor.s8_filter", String(filterH), { unit_of_measurement: "h" });
    reg("button.s8_reset_filter", "d_s8", "reset_air_filter_consumable"); ent("button.s8_reset_filter", "unknown");
    reg("sensor.s8_dock_brush", "d_s8_dock", "cleaning_brush_time_left"); ent("sensor.s8_dock_brush", "212", { unit_of_measurement: "h" });
    reg("binary_sensor.s8_dirty_box", "d_s8_dock", "dirty_box_full"); ent("binary_sensor.s8_dirty_box", dirtyTank ? "on" : "off");
    card.hass = { states: st, entities, devices, localize: (k: string) => k, language: "en",
      callService: async (d: string, s: string, data: unknown) => { win.__calls.push([d, s, data]); }, callWS: async () => ({}) };
    win.__mockHa.cardWrap.style.width = w + "px";
    win.__mockHa.cardWrap.style.height = h + "px";
    win.__mockHa.cardWrap.appendChild(card);
    win.__card = card;
  }, { w, h, warn, dirtyTank, filterH, dockErr, FLOOR });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(400);
}

const openSheet = (page: Page, idx: number, tab?: string) => page.evaluate(async ({ idx, tab }) => {
  const c = (window as any).__card;
  if (tab) c._openRobotSheet(idx, tab); else c._robotSheet = idx;
  await c.updateComplete;
}, { idx, tab });

const sheet = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  const s = root.querySelector(".robot-sheet");
  if (!s) return null;
  const tabs = Array.from(s.querySelectorAll(".rs-tab")).map((t) =>
    (t.textContent ?? "").trim() + (t.classList.contains("on") ? "*" : "") + (t.querySelector(".rs-tab-dot") ? "!" : ""));
  return {
    tabs,
    actions: Array.from(s.querySelectorAll(".dock-sheet-action")).map((b) => (b.textContent ?? "").trim()),
    care: Array.from(s.querySelectorAll(".rs-care .dock-sheet-care-row")).map((r) =>
      (r.querySelector(".dock-sheet-care-label")?.textContent ?? "").trim() + " " + (r.querySelector(".dock-sheet-care-value")?.textContent ?? "").trim()
      + (r.classList.contains("low") ? " LOW" : "")),
    state: (s.querySelector(".rs-dock-state")?.textContent ?? "").replace(/\s+/g, " ").trim(),
    headDot: !!s.querySelector(".robot-sheet-head .vac-attn-dot"),
  };
});

test("tabs follow the hardware: S6 no dock, S7 empty-only, S8 full", async ({ page }) => {
  await mount(page);
  await openSheet(page, 0);
  expect((await sheet(page))!.tabs).toEqual(["Clean*", "Care"]);
  await openSheet(page, 1, "dock");
  const s7 = (await sheet(page))!;
  expect(s7.tabs).toEqual(["Clean", "Dock*"]);
  expect(s7.actions).toEqual(["Empty"]);
  await openSheet(page, 2, "dock");
  const s8 = (await sheet(page))!;
  expect(s8.tabs).toEqual(["Clean", "Dock*", "Care!"]);
  expect(s8.actions).toEqual(["Empty", "Wash", "Dry", "Pump", "Self-clean"]);
  expect(s8.state).toBe("Dock ready");
});

test("the sheet opens on Clean; the dot marks the right tab and the right robot", async ({ page }) => {
  await mount(page);
  // Only S8 (filter 12 h of 150 h = 8 %) needs care.
  const dots = await page.evaluate(() => Array.from((window as any).__card.shadowRoot.querySelectorAll(".vac-attn-dot"))
    .map((d: any) => d.getAttribute("aria-label")));
  expect(dots).toEqual(["Needs attention: care"]);
  await openSheet(page, 2);
  const s = (await sheet(page))!;
  expect(s.tabs).toEqual(["Clean*", "Dock", "Care!"]);
  expect(s.headDot).toBe(true);
  // Picking a tab sticks; closing resets it.
  await page.evaluate(async () => {
    const c = (window as any).__card;
    (Array.from(c.shadowRoot.querySelectorAll(".rs-tab")).find((t: any) => t.textContent.includes("Care")) as HTMLElement).click();
    await c.updateComplete;
  });
  expect((await sheet(page))!.tabs).toEqual(["Clean", "Dock", "Care*!"]);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    (c.shadowRoot.querySelector('.robot-sheet-icon[aria-label="Close"]') as HTMLElement).click();
    await c.updateComplete;
  });
  await openSheet(page, 2);
  expect((await sheet(page))!.tabs[0]).toBe("Clean*");
});

test("Care is worst first, marks rows at or below care_warn_pct", async ({ page }) => {
  await mount(page);
  await openSheet(page, 2, "care");
  expect((await sheet(page))!.care).toEqual([
    "Filter 8 % LOW", "Side brush 27 %", "Main brush 64 %", "Dock brush 212 h left",
  ]);
  // Threshold from config: 5 % → nothing is low, no dots anywhere.
  await mount(page, { warn: 5 });
  await openSheet(page, 2, "care");
  const s = (await sheet(page))!;
  expect(s.care[0]).toBe("Filter 8 %");
  expect(s.tabs).toEqual(["Clean", "Dock", "Care*"]);
  expect(await page.evaluate(() => (window as any).__card.shadowRoot.querySelectorAll(".vac-attn-dot").length)).toBe(0);
});

test("a tank flag marks the Dock tab and says what to check", async ({ page }) => {
  await mount(page, { dirtyTank: true, filterH: 120 });
  await openSheet(page, 2);
  expect((await sheet(page))!.tabs).toEqual(["Clean*", "Dock!", "Care"]);
  await openSheet(page, 2, "dock");
  expect((await sheet(page))!.state).toBe("Dirty water tank — check");
});

test("a dock error names itself and offers Resolved (docs/47 §3)", async ({ page }) => {
  await mount(page, { dockErr: true, filterH: 120 });
  await openSheet(page, 2);
  expect((await sheet(page))!.tabs).toEqual(["Clean*", "Dock!", "Care"]);
  await openSheet(page, 2, "dock");
  expect((await sheet(page))!.state).toBe("Dock error: water empty Resolved");
  const calls = await page.evaluate(async () => {
    const c = (window as any).__card;
    (c.shadowRoot.querySelector(".robot-sheet .rs-dock-resolve") as HTMLElement).click();
    await c.updateComplete;
    return (window as any).__calls;
  });
  expect(calls).toContainEqual(["anyvac", "dock_resolve_error", { entity_id: "vacuum.s8" }]);
  // No error, no button.
  await mount(page);
  await openSheet(page, 2, "dock");
  expect(await page.evaluate(() => (window as any).__card.shadowRoot.querySelectorAll(".rs-dock-resolve").length)).toBe(0);
});

test("no global dock any more: no Dock segment, no Dock button, no dock sheet", async ({ page }) => {
  for (const [w, h] of [[1270, 714], [412, 780]]) {
    await mount(page, { w, h });
    const r = await page.evaluate(() => {
      const root = (window as any).__card.shadowRoot as ShadowRoot;
      return {
        seg: root.querySelectorAll(".start-seg--dock").length,
        btn: root.querySelectorAll(".dock-mode--dock").length,
        tabs: root.querySelectorAll(".dock-sheet-tab").length,
        startSegs: root.querySelectorAll(".start-row > *").length,
      };
    });
    expect(r.seg + r.btn + r.tabs, `${w}x${h}`).toBe(0);
  }
});

test("every tab stays on the K8 type and corner scale", async ({ page }) => {
  await mount(page, { dirtyTank: true, dockErr: true });
  for (const tab of ["clean", "dock", "care"]) {
    await openSheet(page, 2, tab);
    const off = await page.evaluate(() => {
      const s = (window as any).__card.shadowRoot.querySelector(".robot-sheet") as Element;
      const fs = new Set([10, 11, 12, 13, 15, 20]), rs = new Set(["0px", "6px", "10px", "16px", "999px", "50%"]);
      const out: string[] = [];
      for (const el of [s, ...Array.from(s.querySelectorAll("*"))] as HTMLElement[]) {
        if (el.closest("svg")) continue;
        const cs = getComputedStyle(el);
        const txt = Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent ?? "").trim());
        if (txt && !fs.has(parseFloat(cs.fontSize))) out.push("font " + cs.fontSize + " " + el.className);
        if (!rs.has(cs.borderTopLeftRadius) && !rs.has(cs.borderBottomLeftRadius)) out.push("radius " + cs.borderTopLeftRadius + " " + el.className);
      }
      return out;
    });
    expect(off, tab).toEqual([]);
  }
});
