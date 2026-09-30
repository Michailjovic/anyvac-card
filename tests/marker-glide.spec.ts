import { test, expect, type Page } from "@playwright/test";
import { traceSince, pointAtFraction, glideKeyframes, arcLength, type Pt } from "../src/trail";

/**
 * docs/44 marker-on-trail (card 1.47.0).
 *
 * What would regress silently:
 *  - the marker cuts straight across the room again (the 1.41–1.46 CSS
 *    transition) instead of following the trail drawn since the last poll;
 *  - a boustrophedon lane next door, or an older pass through the same spot,
 *    wins the search and the marker replays the wrong stretch;
 *  - a position landing mid-glide snaps the marker instead of continuing;
 *  - `marker_glide_s`, reduce motion, legacy and re-projection stop being
 *    respected (no glide at all in those cases).
 */

test("traceSince follows the line, bounded by how much the trail grew", () => {
  // Lanes 10 apart: →, down, ←, down, →. The robot was at the end of lane 2.
  const seg: Pt[] = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 10 }, { x: 0, y: 10 }, { x: 0, y: 20 }, { x: 100, y: 20 }];
  const from = { x: 0, y: 10 }, to = { x: 100, y: 20 };
  const r = traceSince(seg, from, to, 110 + 8, 6)!;
  expect(r).toEqual([{ x: 0, y: 10 }, { x: 0, y: 20 }, { x: 100, y: 20 }]);
  // A point next to lane 1 but grown only along lane 3: the window keeps lane 1 out.
  expect(traceSince(seg, { x: 50, y: 1 }, to, 60, 6)).toBeNull();
  // Old position off the trail (transit, new segment) → null → straight move.
  expect(traceSince(seg, { x: 50, y: 50 }, to, 1000, 6)).toBeNull();
  // Mid-edge start is interpolated onto the line; the route ends AT the robot.
  const m = traceSince(seg, { x: 60, y: 11 }, { x: 101, y: 21 }, 200, 6)!;
  expect(m[0]).toEqual({ x: 60, y: 10 });
  expect(m[m.length - 1]).toEqual({ x: 101, y: 21 });
});

test("pointAtFraction and glideKeyframes: even speed along the route", () => {
  const route: Pt[] = [{ x: 0, y: 0 }, { x: 30, y: 0 }, { x: 30, y: 10 }];
  expect(pointAtFraction(route, 0.5)).toEqual({ pt: { x: 20, y: 0 }, next: 1 });
  expect(pointAtFraction(route, 0.875)).toEqual({ pt: { x: 30, y: 5 }, next: 2 });
  expect(pointAtFraction(route, 1).pt).toEqual({ x: 30, y: 10 });
  const kf = glideKeyframes(route, 1);
  expect(kf.map((k) => k.offset)).toEqual([0, 0.75, 1]);
  expect(kf[1].transform).toBe("translate(30.0px, 0.0px)");
  const long = Array.from({ length: 500 }, (_, i) => ({ x: i, y: (i % 2) * 2 }));
  const thin = glideKeyframes(long, 1, 50);
  expect(thin).toHaveLength(50);
  expect(thin[0].offset).toBe(0);
  expect(thin[49].offset).toBe(1);
  expect(thin.every((k, i) => i === 0 || (k.offset as number) >= (thin[i - 1].offset as number))).toBe(true);
  expect(arcLength(route)).toBe(40);
});

const FLOOR = "/tests/harness/_floor.webp";
const OLD = [{ x: 100, y: 200 }, { x: 300, y: 200 }];
const NEW = [...OLD, { x: 300, y: 260 }, { x: 100, y: 260 }];

async function mount(page: Page, o: { theme?: string; glide?: number; reduce?: boolean; reducedMedia?: boolean } = {}) {
  const { theme = "dark", glide, reduce = false, reducedMedia = false } = o;
  if (reducedMedia) await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1270, height: 714 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, glide, reduce, FLOOR, OLD }) => {
    const w = window as any;
    const card = document.createElement("anyvac-card") as any;
    card.setConfig({
      type: "custom:anyvac-card", theme, map_mode: "merged",
      layout: { orientation: "landscape", landscape: { crop: { mapOrientation: "normal" } } },
      image_base: { src: FLOOR }, ...(glide != null ? { marker_glide_s: glide } : {}), ...(reduce ? { reduce_motion: true } : {}),
      rooms: [{ key: "Hall", name: "Hall", map_x: 47, map_y: 53, map_w: 16, map_h: 24 }],
      vacuums: [{ entity: "vacuum.a", name: "S6", color: "#6FBF73", clean_type: "dry",
        integration_entity: "sensor.anyvac_a", clean_action: { type: "native" } }],
    });
    const now = new Date().toISOString();
    const attrs = (pos: { x: number; y: number }, seg: unknown[]) => ({
      schema_version: 3, image_dims: { top: 0, left: 0, width: 100, height: 50, scale: 10, rotation: 0 },
      vacuum_position_px: { ...pos, a: 0 }, path_dry_px: [seg], path_wet_px: [], job_progress: { active: false } });
    w.__set = (pos: { x: number; y: number }, seg: unknown[]) => {
      const st = { ...card.hass.states };
      st["sensor.anyvac_a"] = { ...st["sensor.anyvac_a"], attributes: attrs(pos, seg) };
      card.hass = { ...card.hass, states: st };
    };
    card.hass = {
      states: {
        "vacuum.a": { entity_id: "vacuum.a", state: "cleaning", attributes: {}, last_changed: now, last_updated: now },
        "sensor.anyvac_a": { entity_id: "sensor.anyvac_a", state: "0", last_changed: now, last_updated: now, attributes: attrs(OLD[1], OLD) },
      },
      localize: (k: string) => k, language: "en", callService: async () => {}, callWS: async () => ({}),
    };
    w.__mockHa.cardWrap.style.width = "1270px";
    w.__mockHa.cardWrap.style.height = "714px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { theme, glide, reduce, FLOOR, OLD });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(600);
}

/** Move the robot along NEW, then report the marker's running animation. */
const move = (page: Page, pos: Pt, seg: Pt[]) => page.evaluate(async ({ pos, seg }) => {
  const card = (window as any).__card;
  (window as any).__set(pos, seg);
  await card.updateComplete;
  const root = card.shadowRoot as ShadowRoot;
  const m = root.querySelector(".avc-marker") as SVGGElement | null;
  const anims = m ? m.getAnimations() : [];
  const trace = Array.from(root.querySelectorAll("svg.map-vector polyline")).find((p) => p.getAttribute("opacity") === "0.85");
  const tr = (t: string) => { const [x, y] = t.match(/-?[\d.]+/g)!.map(Number); return { x, y }; };
  return {
    count: anims.length,
    duration: anims[0] ? Number((anims[0].effect as KeyframeEffect).getTiming().duration) : 0,
    frames: anims[0] ? (anims[0].effect as KeyframeEffect).getKeyframes().map((k) => ({ ...tr(k.transform as string), o: k.computedOffset })) : [],
    trace: trace ? trace.getAttribute("points")!.trim().split(/\s+/).map((p) => { const [x, y] = p.split(",").map(Number); return { x, y }; }) : [],
    final: m ? tr(m.style.transform) : null,
  };
}, { pos, seg });

const distToPolyline = (p: Pt, line: Pt[]) => {
  let best = Infinity;
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1], b = line[i], dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
    const t = l2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
    best = Math.min(best, Math.hypot(p.x - (a.x + dx * t), p.y - (a.y + dy * t)));
  }
  return best;
};

test("a move glides along the new stretch of trail, ending at the reported position", async ({ page }) => {
  await mount(page);
  const r = await move(page, NEW[3], NEW);
  expect(r.count).toBe(1);
  expect(r.duration).toBe(1500); // default marker_glide_s
  // Every keyframe sits ON the drawn trail — the U-turn, not the diagonal.
  expect(r.frames.length).toBeGreaterThanOrEqual(3);
  for (const f of r.frames) expect(distToPolyline(f, r.trace)).toBeLessThan(0.2);
  expect({ x: r.frames[r.frames.length - 1].x, y: r.frames[r.frames.length - 1].y }).toEqual(r.final);
  // Halfway through the glide the marker is on the bottom lane, well away
  // from where a straight chord would put it.
  const mid = pointAtFraction(r.frames, 0.5).pt;
  const chordMid = { x: (r.frames[0].x + r.final!.x) / 2, y: (r.frames[0].y + r.final!.y) / 2 };
  expect(Math.hypot(mid.x - chordMid.x, mid.y - chordMid.y)).toBeGreaterThan(3);
});

test("a position landing mid-glide continues from where the marker is", async ({ page }) => {
  await mount(page, { glide: 10 });
  const a = await move(page, NEW[3], NEW);
  expect(a.duration).toBe(10000);
  const at = await page.evaluate(() => {
    const m = (window as any).__card.shadowRoot.querySelector(".avc-marker") as SVGGElement;
    const an = m.getAnimations()[0];
    an.pause();
    an.currentTime = 5000;
    const mx = new DOMMatrix(getComputedStyle(m).transform);
    return { x: mx.e, y: mx.f };
  });
  const further = [...NEW, { x: 100, y: 320 }];
  const b = await move(page, further[4], further);
  expect(b.count).toBe(1);
  expect(Math.hypot(b.frames[0].x - at.x, b.frames[0].y - at.y)).toBeLessThan(0.3);
  expect({ x: b.frames[b.frames.length - 1].x, y: b.frames[b.frames.length - 1].y }).toEqual(b.final);
});

test("no glide: marker_glide_s 0, reduce_motion, OS reduced motion, legacy", async ({ page }) => {
  for (const o of [{ glide: 0 }, { reduce: true }, { reducedMedia: true }, { theme: "legacy" }]) {
    await mount(page, o);
    expect((await move(page, NEW[3], NEW)).count, JSON.stringify(o)).toBe(0);
  }
});

test("re-projection of the same pose (flip) jumps, it never glides", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const c = (window as any).__card;
    c._flipLive = true;
    await c.updateComplete;
  });
  const n = await page.evaluate(() => ((window as any).__card.shadowRoot.querySelector(".avc-marker") as SVGGElement).getAnimations().length);
  expect(n).toBe(0);
});

test("no trail through the old position (transit, new segment) → straight glide", async ({ page }) => {
  await mount(page);
  const elsewhere = [{ x: 150, y: 300 }, { x: 250, y: 300 }];
  const r = await move(page, elsewhere[1], elsewhere);
  expect(r.count).toBe(1);
  expect(r.frames).toHaveLength(2);
  expect({ x: r.frames[1].x, y: r.frames[1].y }).toEqual(r.final);
});
