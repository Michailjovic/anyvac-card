import { test, expect, type Page } from "@playwright/test";
import { planOrder } from "../src/startseq";

/**
 * docs/44 F5 — start sequence W7 (card 1.42.0).
 *
 * What would regress silently:
 *  - the `anyvac.clean` call must go out BEFORE anything animates, and
 *    regardless of whether the animation can play at all;
 *  - rooms light up in the backend timeline's order, avatars land on each
 *    robot's first room, the whole thing clears itself;
 *  - `legacy`, `reduce_motion` and a missing plan preview play nothing;
 *  - the avatars launch from below the map AS SEEN ON SCREEN, rotated or not.
 */

const PLAN = {
  dry: { "vacuum.a": ["Kitchen", "Hall", "Bedroom"] },
  wet: { "vacuum.b": ["Hall"] },
  eta_min: 40, unsequenced: [],
  timeline: { dry: { Hall: 10, Kitchen: 25, Bedroom: 35 }, wet: { Hall: 22 } },
};

test("planOrder: timeline order and each robot's first room, straight from the plan", () => {
  const { order, first } = planOrder(PLAN);
  expect(order).toEqual(["Hall", "Kitchen", "Bedroom"]);
  expect([...first.entries()]).toEqual([["vacuum.a", "Hall"], ["vacuum.b", "Hall"]]);
  expect(planOrder({}).order).toEqual([]);
});

interface Opts { theme?: string; reduce?: boolean; planOk?: boolean; orient?: "normal" | "rotated" }

async function mount(page: Page, o: Opts = {}): Promise<void> {
  const { theme = "dark", reduce = false, planOk = true, orient = "normal" } = o;
  await page.setViewportSize({ width: 1270, height: 714 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, reduce, planOk, orient, PLAN }) => {
    const w = window as any;
    w.__calls = [];
    const card = document.createElement("anyvac-card") as any;
    card.setConfig({
      type: "custom:anyvac-card", theme, map_mode: "merged", reduce_motion: reduce,
      layout: { orientation: "landscape", landscape: { crop: { mapOrientation: orient } } },
      image_base: { src: "/tests/harness/_floor.webp" },
      rooms: [
        { key: "Kitchen", name: "Kitchen", map_x: 64, map_y: 50, map_w: 19, map_h: 92 },
        { key: "Hall", name: "Hall", map_x: 47, map_y: 53, map_w: 16, map_h: 24 },
        { key: "Bedroom", name: "Bedroom", map_x: 86, map_y: 50, map_w: 26, map_h: 92 },
      ],
      vacuums: [
        { entity: "vacuum.a", name: "S6", color: "#6FBF73", clean_type: "dry", integration_entity: "sensor.anyvac_a", clean_action: { type: "native" } },
        { entity: "vacuum.b", name: "S8", color: "#2196F3", clean_type: "wet", integration_entity: "sensor.anyvac_b", clean_action: { type: "native" } },
      ],
    });
    const now = new Date().toISOString();
    const st: any = {};
    for (const id of ["a", "b"]) {
      st["vacuum." + id] = { entity_id: "vacuum." + id, state: "docked", attributes: {}, last_changed: now, last_updated: now };
      st["sensor.anyvac_" + id] = { entity_id: "sensor.anyvac_" + id, state: "0", attributes: { schema_version: 2 }, last_changed: now, last_updated: now };
    }
    card.hass = {
      states: st, localize: (k: string) => k, language: "en", callWS: async () => ({}),
      callService: async (d: string, s: string, data: unknown) => {
        w.__calls.push({ d, s, seqAtCall: !!card._startSeq });
        if (d === "anyvac" && s === "plan") {
          if (!planOk) throw new Error("no plan");
          return { response: { plan: PLAN } };
        }
      },
    };
    w.__mockHa.cardWrap.style.width = "1270px";
    w.__mockHa.cardWrap.style.height = "714px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { theme, reduce, planOk, orient, PLAN });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(500);
}

const start = (page: Page) => page.evaluate(async () => {
  const card = (window as any).__card;
  void card._runOrchestrated(card._allRoomKeys(), card._planMode);
  await card.updateComplete;
  const root = card.shadowRoot as ShadowRoot;
  return {
    clean: (window as any).__calls.filter((c: any) => c.s === "clean"),
    lights: Array.from(root.querySelectorAll(".room-seq")).map((e: any) =>
      e.closest(".room-overlay").getAttribute("aria-label") + "@" + e.style.animationDelay),
    avatars: Array.from(root.querySelectorAll(".seq-avatar")).map((e: any) => ({
      entity: e.dataset.entity, room: e.dataset.room,
      fx: e.style.getPropertyValue("--fx"), fy: e.style.getPropertyValue("--fy"),
      tx: e.style.getPropertyValue("--tx"), ty: e.style.getPropertyValue("--ty"),
      ml: e.style.marginLeft, mt: e.style.marginTop,
    })),
  };
});

test("START: the service goes out first, then rooms light up in plan order and avatars land", async ({ page }) => {
  await mount(page);
  const r = await start(page);
  expect(r.clean).toEqual([{ d: "anyvac", s: "clean", seqAtCall: false }]);
  expect(r.lights.sort()).toEqual(["Bedroom@0.6s", "Hall@0s", "Kitchen@0.3s"]);
  expect(r.avatars).toEqual([
    // Two robots start in the Hall → side by side, not stacked.
    { entity: "vacuum.a", room: "Hall", fx: "50.00%", fy: "112.00%", tx: "47%", ty: "53%", ml: "-20px", mt: "0px" },
    { entity: "vacuum.b", room: "Hall", fx: "50.00%", fy: "112.00%", tx: "47%", ty: "53%", ml: "20px", mt: "0px" },
  ]);
  // …and it clears itself (≤ 2.6 s).
  await page.waitForTimeout(2700);
  const left = await page.evaluate(() => (window as any).__card.shadowRoot.querySelectorAll(".room-seq, .seq-avatar").length);
  expect(left).toBe(0);
});

test("a rotated map still launches the avatars from below the map on screen", async ({ page }) => {
  await mount(page, { orient: "rotated" });
  expect(await page.evaluate(() => (window as any).__card._mapRotationDeg())).toBe(90);
  const r = await start(page);
  // Screen "down" at 90° is the wrap's own +x.
  expect(r.avatars[0]).toMatchObject({ fx: "112.00%", fy: "50.00%" });
  // …and "side by side" is screen-horizontal too, i.e. the wrap's own ∓y.
  expect(r.avatars.map((a) => [a.ml, a.mt])).toEqual([["0px", "20px"], ["0px", "-20px"]]);
});

for (const [label, opts] of [
  ["legacy theme", { theme: "legacy" }],
  ["reduce_motion", { reduce: true }],
  ["no plan preview", { planOk: false }],
] as const) {
  test(`${label}: START still sends, nothing plays`, async ({ page }) => {
    await mount(page, opts);
    const r = await start(page);
    expect(r.clean.length).toBe(1);
    expect(r.lights).toEqual([]);
    expect(r.avatars).toEqual([]);
  });
}
