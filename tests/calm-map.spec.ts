import { test, expect, type Page } from "@playwright/test";

/**
 * docs/44 F1 — "calm map". Pins down the four behaviour changes of card 1.38.0,
 * each of which would regress silently (nothing errors, the map just gets loud
 * again):
 *
 *  - whole-home (nothing selected) no longer outlines every room in themed mode,
 *  - an explicit pick is an accent inner edge, not the white gradient frame,
 *  - rooms carry a name + freshness-dot label instead of bare icon + corner dots,
 *    while `theme: legacy` keeps exactly the previous markup,
 *  - status labels carry no emoji, and the trail toggles no age text.
 */

const PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

const ROOMS = [
  { key: "Living room", map_x: 20, map_y: 50, map_w: 38, map_h: 92 },
  { key: "Hall", map_x: 47, map_y: 53, map_w: 8, map_h: 23 },
  { key: "Kitchen", map_x: 64, map_y: 50, map_w: 19, map_h: 92 },
];

async function mount(page: Page, theme: string, select: string[] = []): Promise<void> {
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, ROOMS, PIXEL }) => {
    const w = window as any;
    const card = document.createElement("anyvac-card") as any;
    const iso = (d: number) => new Date(Date.now() - d * 86400000).toISOString();
    const rlc: Record<string, unknown> = {};
    for (const r of ROOMS) rlc[r.key] = { dry: iso(3), wet: iso(12) };
    card.setConfig({
      type: "custom:anyvac-card", layout: {}, theme, map_mode: "merged",
      image_base: { src: PIXEL }, room_border_normal: 0, room_border_selected: 4,
      rooms: ROOMS.map((r) => ({ ...r, name: r.key, icon: "mdi:square" })),
      vacuums: [
        { entity: "vacuum.a", name: "A", clean_type: "dry", integration_entity: "sensor.anyvac_a", clean_action: { type: "native" } },
        { entity: "vacuum.b", name: "B", clean_type: "wet", integration_entity: "sensor.anyvac_b", clean_action: { type: "native" } },
      ],
    });
    const now = new Date().toISOString();
    const states: Record<string, unknown> = {};
    for (const id of ["a", "b"]) {
      states["vacuum." + id] = { entity_id: "vacuum." + id, state: "docked", attributes: { friendly_name: id, battery_level: 90 }, last_changed: now, last_updated: now };
      states["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", attributes: { schema_version: 2, rooms_last_cleaned: rlc }, last_changed: now, last_updated: now };
    }
    card.hass = { states, localize: (k: string) => k, language: "en", callService: async () => {}, callWS: async () => ({}) };
    w.__mockHa.cardWrap.style.width = "1270px";
    w.__mockHa.cardWrap.style.height = "714px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { theme, ROOMS, PIXEL });
  await page.waitForFunction(() => !!(window as any).__card?.shadowRoot?.querySelector(".room-overlay"));
  if (select.length) {
    await page.evaluate(async (select) => {
      const card = (window as any).__card;
      for (const k of select) card._toggleRoomAcross(k, card._config.vacuums);
      await card.updateComplete;
    }, select);
    // .room-overlay transitions border/box-shadow (0.3s) — read settled values.
    await page.waitForTimeout(450);
  }
}

function room(page: Page, key: string) {
  return page.evaluate((key) => {
    const card = (window as any).__card;
    const el = card.shadowRoot.querySelector(`.room-overlay[aria-label="${key}"]`) as HTMLElement;
    const cs = getComputedStyle(el);
    const label = el.querySelector(".room-label");
    return {
      borderW: parseFloat(cs.borderTopWidth),
      borderImage: cs.borderImageSource,
      boxShadow: cs.boxShadow,
      hasLabel: !!label,
      labelName: label?.querySelector(".room-label-name")?.textContent?.trim() ?? null,
      labelDots: label ? label.querySelectorAll(".room-label-dot").length : 0,
      cornerDots: el.querySelectorAll(".room-age-dot").length,
    };
  }, key);
}

test("themed whole-home: rooms are not outlined and carry a name + dry/wet label", async ({ page }) => {
  await mount(page, "dark");
  const r = await room(page, "Living room");
  expect(r.borderW).toBe(0); // room_border_normal, no whole-home 3px bump
  expect(r.boxShadow).toBe("none"); // no white glow
  expect(r.hasLabel).toBe(true);
  expect(r.labelName).toBe("Living room");
  expect(r.labelDots).toBe(2); // fleet = dry-only + wet-only → both dots
  expect(r.cornerDots).toBe(0);
});

test("themed selection is an accent inner edge, not the white gradient frame", async ({ page }) => {
  await mount(page, "dark", ["Kitchen"]);
  const r = await room(page, "Kitchen");
  expect(r.borderW).toBe(4); // room_border_selected still honoured
  expect(r.borderImage).toBe("none");
  expect(r.boxShadow).toContain("inset");
});

test("legacy theme keeps the previous map markup and whole-home frame", async ({ page }) => {
  await mount(page, "legacy");
  const r = await room(page, "Living room");
  expect(r.hasLabel).toBe(false);
  expect(r.borderW).toBe(3); // the 0.68.3 whole-home bump
  expect(r.boxShadow).not.toBe("none");
  await mount(page, "legacy", ["Kitchen"]);
  const s = await room(page, "Kitchen");
  expect(s.borderImage).toContain("gradient");
});

test("status labels carry no emoji and trail toggles carry no age text", async ({ page }) => {
  await mount(page, "dark");
  const out = await page.evaluate(() => {
    const root = (window as any).__card.shadowRoot as ShadowRoot;
    return {
      status: Array.from(root.querySelectorAll(".status-label")).map((e) => e.textContent ?? ""),
      toggles: Array.from(root.querySelectorAll(".mtbtn--icon")).map((e) => (e.textContent ?? "").trim()),
    };
  });
  expect(out.status.length).toBeGreaterThan(0);
  for (const t of out.status) expect(t).not.toMatch(/\p{Extended_Pictographic}/u);
  for (const t of out.toggles) expect(t).toBe("");
});
