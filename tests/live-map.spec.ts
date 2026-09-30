import { test, expect, type Page } from "@playwright/test";
import { trailTail, arcLength, fmtPts } from "../src/trail";

/**
 * docs/44 F4 — the living map (card 1.41.0).
 *
 * What would regress silently:
 *  - the trail head is measured ALONG the line (arc length), not by points,
 *    so its length doesn't jump with the backend's RDP simplification;
 *  - on every map rotation (0/90/180/270) the head ends exactly under the
 *    robot marker on screen;
 *  - the head, the sonar ring and the room fill exist only while a robot is
 *    cleaning / a job runs, never in `theme: legacy`;
 *  - the room fill follows `job_progress` verbatim and the one-shot sheen
 *    only plays for a room that finished while the card was watching;
 *  - reduced motion turns every animation off.
 */

test("trailTail: arc length, not point count", () => {
  const coarse = [{ x: 0, y: 0 }, { x: 100, y: 0 }];
  const fine = Array.from({ length: 101 }, (_, i) => ({ x: i, y: 0 }));
  for (const seg of [coarse, fine]) {
    const t = trailTail(seg, 30);
    expect(arcLength(t)).toBeCloseTo(30, 6);
    expect(t[t.length - 1]).toEqual({ x: 100, y: 0 });
    expect(t[0].x).toBeCloseTo(70, 6);
  }
  // Around a corner: 10 up the last leg, the rest back along the first.
  const bent = [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 10 }];
  const b = trailTail(bent, 25);
  expect(arcLength(b)).toBeCloseTo(25, 6);
  expect(b).toEqual([{ x: 35, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 10 }]);
  // Shorter than asked → whole line; degenerate input → nothing.
  expect(trailTail(bent, 1000)).toEqual(bent);
  expect(trailTail([{ x: 1, y: 1 }], 5)).toEqual([]);
  expect(trailTail(bent, 0)).toEqual([]);
  expect(fmtPts([{ x: 1.234, y: 5 }], 1)).toBe("1.2,5.0");
});

const FLOOR = "/tests/harness/_floor.webp";

interface Opts {
  theme?: string; state?: string; job?: Record<string, unknown> | null;
  orient?: "normal" | "rotated"; flip?: boolean; reduced?: boolean;
}

async function mount(page: Page, o: Opts = {}): Promise<void> {
  const { theme = "dark", state = "cleaning", job = null, orient = "normal", flip = false, reduced = false } = o;
  if (reduced) await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1270, height: 714 });
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ theme, state, job, orient, flip, FLOOR }) => {
    const w = window as any;
    const card = document.createElement("anyvac-card") as any;
    card.setConfig({
      type: "custom:anyvac-card", theme, map_mode: "merged",
      layout: { orientation: "landscape", landscape: { crop: { mapOrientation: orient, flip } } },
      image_base: { src: FLOOR },
      rooms: [
        { key: "Hall", name: "Hall", map_x: 47, map_y: 53, map_w: 16, map_h: 24 },
        { key: "Kitchen", name: "Kitchen", map_x: 64, map_y: 50, map_w: 19, map_h: 92 },
      ],
      vacuums: [{ entity: "vacuum.a", name: "S6", color: "#6FBF73", clean_type: "dry",
        integration_entity: "sensor.anyvac_a", clean_action: { type: "native" } }],
    });
    // A dense run and a coarse (RDP-simplified) stretch, ending at the robot.
    const seg = [...Array.from({ length: 40 }, (_, i) => ({ x: 100 + i * 4, y: 200 + (i % 2) * 3 })), { x: 400, y: 200 }, { x: 400, y: 320 }];
    const now = new Date().toISOString();
    w.__setJob = (j: unknown) => {
      const st = { ...card.hass.states };
      st["sensor.anyvac_a"] = { ...st["sensor.anyvac_a"], attributes: { ...st["sensor.anyvac_a"].attributes, job_progress: j ?? { active: false } } };
      card.hass = { ...card.hass, states: st };
    };
    card.hass = {
      states: {
        "vacuum.a": { entity_id: "vacuum.a", state, attributes: {}, last_changed: now, last_updated: now },
        "sensor.anyvac_a": { entity_id: "sensor.anyvac_a", state: "0", last_changed: now, last_updated: now, attributes: {
          schema_version: 3, image_dims: { top: 0, left: 0, width: 100, height: 50, scale: 10, rotation: 0 },
          vacuum_position_px: { x: 400, y: 320, a: 90 }, path_dry_px: [seg], path_wet_px: [],
          job_progress: job ?? { active: false } } },
      },
      localize: (k: string) => k, language: "en", callService: async () => {}, callWS: async () => ({}),
    };
    w.__mockHa.cardWrap.style.width = "1270px";
    w.__mockHa.cardWrap.style.height = "714px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { theme, state, job, orient, flip, FLOOR });
  await page.waitForFunction(() => (window as any).__card?._mapAR > 1);
  await page.waitForTimeout(700);
}

const q = (page: Page) => page.evaluate(() => {
  const root = (window as any).__card.shadowRoot as ShadowRoot;
  const fill = root.querySelector('.room-overlay[aria-label="Hall"] .room-fill') as HTMLElement | null;
  return {
    heads: root.querySelectorAll(".avc-trail-head").length,
    sonar: root.querySelectorAll(".avc-sonar").length,
    marker: root.querySelectorAll(".avc-marker").length,
    fill: fill ? parseFloat(fill.style.opacity) : null,
    fillBg: fill ? getComputedStyle(fill).backgroundColor : null,
    sheen: root.querySelectorAll(".room-sheen").length,
  };
});

for (const [orient, flip, deg] of [["normal", false, 0], ["rotated", false, 90], ["normal", true, 180], ["rotated", true, 270]] as const) {
  test(`trail head ends under the marker on screen at ${deg}°`, async ({ page }) => {
    await mount(page, { orient, flip });
    const r = await page.evaluate(() => {
      const card = (window as any).__card;
      const root = card.shadowRoot as ShadowRoot;
      const head = root.querySelector(".avc-trail-head") as SVGPolylineElement;
      const pts = head.getAttribute("points")!.trim().split(/\s+/).map((p) => p.split(",").map(Number));
      const [ex, ey] = pts[pts.length - 1];
      let len = 0;
      for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      // Probe the head's end point on screen with a zero-size circle in the same SVG.
      const probe = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      probe.setAttribute("cx", String(ex)); probe.setAttribute("cy", String(ey)); probe.setAttribute("r", "0.01");
      head.ownerSVGElement!.appendChild(probe);
      const pb = probe.getBoundingClientRect();
      probe.remove();
      const db = (root.querySelector(".avc-marker-dot") as SVGCircleElement).getBoundingClientRect();
      return { deg: card._mapRotationDeg(), dx: (pb.left + pb.right) / 2 - (db.left + db.right) / 2,
        dy: (pb.top + pb.bottom) / 2 - (db.top + db.bottom) / 2, len, rr: 1000 / 55 };
    });
    expect(r.deg).toBe(deg);
    expect(Math.hypot(r.dx, r.dy)).toBeLessThan(1.5);
    expect(r.len).toBeCloseTo(r.rr * 3.2, 1); // TRAIL_HEAD_RR marker radii, along the line
  });
}

test("head and sonar only while cleaning; legacy has neither", async ({ page }) => {
  await mount(page);
  expect(await q(page)).toMatchObject({ heads: 1, sonar: 1, marker: 1 });
  await mount(page, { state: "docked" });
  expect(await q(page)).toMatchObject({ heads: 0, sonar: 0, marker: 1 });
  await mount(page, { theme: "legacy" });
  expect(await q(page)).toMatchObject({ heads: 0, sonar: 0, marker: 0 });
});

const JOB = (hallState: string, hallPct: number) => ({
  active: true, finish_at: new Date(Date.now() + 20 * 60000).toISOString(), eta_min_left: 20,
  rooms_total: 2, rooms_done: hallState === "done" ? 1 : 0, passes_total: 2, passes_done: hallState === "done" ? 1 : 0,
  vacuums: { "vacuum.a": { room: hallState === "done" ? "Kitchen" : "Hall", kind: "dry", pct: hallPct, next_room: null } },
  rooms: [
    { room: "Hall", kind: "dry", vacuum: "vacuum.a", state: hallState, pct: hallPct },
    { room: "Kitchen", kind: "dry", vacuum: "vacuum.a", state: hallState === "done" ? "active" : "queued", pct: 0 },
  ],
});

test("room fill follows job_progress; the sheen plays only for a room finished while watching", async ({ page }) => {
  await mount(page, { job: JOB("active", 50) });
  let s = await q(page);
  expect(s.fill).toBeCloseTo(0.04 + 0.18 * 0.5, 3);
  expect(s.fillBg).toBe("rgb(111, 191, 115)"); // the robot's own colour
  expect(s.sheen).toBe(0);
  await page.evaluate(async (j) => { (window as any).__setJob(j); await (window as any).__card.updateComplete; }, JOB("done", 100));
  s = await q(page);
  expect(s.fill).toBeCloseTo(0.22, 3);
  expect(s.sheen).toBe(1);
  // Opening the card when the room is already done: calm tone, no sheen.
  await mount(page, { job: JOB("done", 100) });
  s = await q(page);
  expect(s.fill).toBeCloseTo(0.22, 3);
  expect(s.sheen).toBe(0);
  // Queued rooms get no fill at all; legacy never does.
  await mount(page, { theme: "legacy", job: JOB("active", 50) });
  expect((await q(page)).fill).toBeNull();
});

test("reduced motion: no marker glide, no sonar pulse, no sheen", async ({ page }) => {
  await mount(page, { reduced: true, job: JOB("active", 40) });
  await page.evaluate(async (j) => { (window as any).__setJob(j); await (window as any).__card.updateComplete; }, JOB("done", 100));
  const r = await page.evaluate(() => {
    const root = (window as any).__card.shadowRoot as ShadowRoot;
    const m = root.querySelector(".avc-marker") as Element;
    const sonar = root.querySelector(".avc-sonar") as Element;
    const sheen = root.querySelector(".room-sheen") as Element;
    return {
      transition: getComputedStyle(m).transitionDuration,
      sonar: sonar ? getComputedStyle(sonar).display : "absent",
      sheen: sheen ? getComputedStyle(sheen).display : "absent",
    };
  });
  expect(r.transition).toBe("0s");
  expect(r.sonar).toBe("none");
  expect(r.sheen).toBe("none");
});
