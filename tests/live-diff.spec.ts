import { test, expect, type Page } from "@playwright/test";
import { mergeLive } from "../src/live";

/**
 * docs/48 — live position from the robot's local diff (card 1.51.0).
 *
 * What would regress silently:
 *  - a live trail applied to a NEWER snapshot (points drawn twice / out of
 *    place) — it must only apply when `base_points === path_points`;
 *  - a gap bridged with a straight line — `*_continues` false must start a
 *    new segment;
 *  - the marker not moving with `live.pos_px`.
 */

const SEG = [{ x: 1, y: 1 }, { x: 2, y: 2 }];

test("mergeLive: continues, starts new segments, ignores a stale trail", () => {
  const at = {
    path_points: 10, vacuum_position_px: { x: 2, y: 2 },
    path_dry_px: [SEG], path_wet_px: [SEG],
    live: {
      base_points: 10, pos_px: { x: 5, y: 5, a: 0 },
      dry_px: [[{ x: 3, y: 3 }, { x: 5, y: 5 }]], dry_continues: true,
      wet_px: [[{ x: 4, y: 4 }]], wet_continues: false,
    },
  };
  const m = mergeLive(at)!;
  expect(m.vacuum_position_px).toEqual({ x: 5, y: 5, a: 0 });
  expect(m.path_dry_px).toEqual([[...SEG, { x: 3, y: 3 }, { x: 5, y: 5 }]]);
  expect(m.path_wet_px).toEqual([SEG, [{ x: 4, y: 4 }]]);
  expect(at.path_dry_px).toEqual([SEG]); // input untouched
  expect(mergeLive(at)).toBe(m); // memoised per attributes object

  const stale = { ...at, path_points: 15 };
  expect(mergeLive(stale)).toBe(stale);
  const none = { ...at, live: null };
  expect(mergeLive(none)).toBe(none);
  expect(mergeLive(undefined)).toBeUndefined();
});

const FLOOR = "/tests/harness/_floor.webp";

async function mount(page: Page, live: Record<string, unknown> | null): Promise<void> {
  await page.setViewportSize({ width: 1270, height: 714 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ live, FLOOR }) => {
    const w = window as any;
    const card = document.createElement("anyvac-card") as any;
    card.setConfig({
      type: "custom:anyvac-card", theme: "dark", map_mode: "merged",
      layout: { orientation: "landscape", landscape: { crop: { mapOrientation: "normal" } } },
      image_base: { src: FLOOR },
      rooms: [{ key: "Hall", name: "Hall", map_x: 47, map_y: 53, map_w: 16, map_h: 24 }],
      vacuums: [{ entity: "vacuum.a", name: "S8", color: "#6FBF73", clean_type: "dry",
        integration_entity: "sensor.anyvac_a", clean_action: { type: "native" } }],
    });
    const now = new Date().toISOString();
    card.hass = {
      states: {
        "vacuum.a": { entity_id: "vacuum.a", state: "cleaning", attributes: {}, last_changed: now, last_updated: now },
        "sensor.anyvac_a": { entity_id: "sensor.anyvac_a", state: "0", last_changed: now, last_updated: now, attributes: {
          schema_version: 3, image_dims: { top: 0, left: 0, width: 100, height: 50, scale: 10, rotation: 0 },
          path_points: 870, vacuum_position_px: { x: 400, y: 320, a: 90 },
          path_dry_px: [[{ x: 100, y: 200 }, { x: 400, y: 320 }]], path_wet_px: [],
          live, job_progress: { active: false } } },
      },
      localize: (k: string) => k, language: "en", callService: async () => {}, callWS: async () => ({}),
    };
    w.__mockHa.cardWrap.style.width = "1270px";
    w.__mockHa.cardWrap.style.height = "714px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { live, FLOOR });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(2200); // let the marker glide finish
}

const marker = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  const dry = Array.from(root.querySelectorAll("polyline")).map((p) => p.getAttribute("points") ?? "");
  const dot = root.querySelector(".avc-marker-dot") as SVGCircleElement;
  const svg = dot.ownerSVGElement!;
  const m = dot.getCTM()!;
  const inv = svg.getCTM()!.inverse().multiply(m);
  const p = new DOMPoint(Number(dot.getAttribute("cx") ?? 0), Number(dot.getAttribute("cy") ?? 0)).matrixTransform(inv);
  return { x: Math.round(p.x), y: Math.round(p.y), lines: dry };
});

test("the marker and the trace follow the live trail of the shown snapshot", async ({ page }) => {
  await mount(page, null);
  const before = await marker(page);
  expect([before.x, before.y]).toEqual([400, 320]);

  await mount(page, { base_points: 870, pos_px: { x: 520, y: 330, a: 0 },
    dry_px: [[{ x: 460, y: 325 }, { x: 520, y: 330 }]], dry_continues: true, wet_px: [], wet_continues: false });
  const after = await marker(page);
  expect([after.x, after.y]).toEqual([520, 330]);
  expect(after.lines.some((l) => l.includes("400.0,320.0") && l.includes("520.0,330.0"))).toBe(true);

  // A trail of an older snapshot is ignored.
  await mount(page, { base_points: 800, pos_px: { x: 520, y: 330, a: 0 }, dry_px: [], dry_continues: false,
    wet_px: [], wet_continues: false });
  const stale = await marker(page);
  expect([stale.x, stale.y]).toEqual([400, 320]);
});
