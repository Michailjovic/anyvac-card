import { test, expect, type Page } from "@playwright/test";

/**
 * Cesta B render + click geometry (docs/40 §5.B): a FOREIGN-origin floorplan
 * calibrated against the home frame via `image_base.home_anchors` (a small
 * set of `{home_px, floor_pct}` pairs), rather than snapshotted FROM the home
 * frame (`home-frame.spec.ts`'s `crop_box`, cesta A). There is no identity
 * crop here — every point goes through a live-solved similarity fit
 * (`homeAnchorFit`/`projectHomePxThroughFit`, seatfit.ts), re-run every
 * render against the home frame's CURRENT width_px/height_px so it survives
 * the frame growing (proven separately in `home-anchor-fit.spec.ts`). This
 * file pins down the CARD's wiring of that fit into rendering and clicks:
 *
 * 1. `_renderHomeAnchorOverlay`'s `<svg>` viewBox is `0 0 100 (100/ar)` (the
 *    wrap's own aspect, not any crop/image_dims extent), and its marker sits
 *    exactly at `vacuum_position_home_px` projected through the fit —
 *    ground truth computed by hand from the mounted config and the SAME
 *    fit-recovery arithmetic `home-anchor-fit.spec.ts` already proves
 *    `homeAnchorFit` performs, not the card's own maths checked against
 *    itself.
 * 2. A room's rectangle + real outline come from `bbox_home_px`/
 *    `outline_home_px` through the reshaped `roomBboxToRect`/
 *    `outlineThroughFit` calls (docs/40 §5.B reuses both UNCHANGED), matching
 *    hand-computed expectations.
 * 3. Pin & Go / Zone clicks resolve to `frame: "home"` + `x_home_px`/
 *    `y_home_px` (`goto`) / `x1_home_px`… (`zone_clean`) service calls, via
 *    `unprojectPctThroughFit` — the exact mathematical inverse already
 *    round-trip-tested in `home-anchor-fit.spec.ts` — wired through the same
 *    DOMMatrix-inversion + probe technique `home-frame.spec.ts` uses for
 *    cesta A.
 *
 * Anchors below are deliberately built by hand as the FORWARD image of an
 * identity seat (rotation 0, scale 100, offset 0/0) — chosen so `ar` (1.25,
 * fixed by the base floorplan's own natural 1000x800 pixel size, learned via
 * `_onFloorplanLoad`) enters every formula non-trivially (`pct.y`'s
 * coefficient is `125`, not `100`) while every expected value below stays a
 * plain, exactly hand-checked number — see the arithmetic in code comments
 * next to each anchor/query point.
 */

// Foreign floorplan (photo/drawing), NOT a home-frame snapshot — no crop_box.
// Natural size 1000x800 -> ar = 1.25 once `_onFloorplanLoad` measures it,
// matching the `ar` every expected value below is computed against.
const BASE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='800'>" +
      "<rect width='1000' height='800' fill='#222'/></svg>"
  );
const MAP_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'>" +
      "<rect width='40' height='20' fill='#444'/></svg>"
  );

const AR = 1.25;
// Home frame's own {width_px, height_px} (from the registered vacuum's
// `home_frame` sensor attribute) -> NW=1000, NH=800.
const DIMS = { NW: 1000, NH: 800 };

// Two anchor pairs whose floor_pct is the identity seat's forward image of
// their home_px (hand-derived, see module docstring):
//   q = ((home_px - dim/2) / NW_x, (home_py - NH/2) / NW)
//   pct.x = 50 + q.x*100 ; pct.y = 50 + q.y*100*AR  (identity seat, c=(0.5, 0.5/AR))
// p1=(300,300): q=(-0.2,-0.1)  -> pct=(30, 37.5)
// p2=(800,600): q=( 0.3, 0.2)  -> pct=(80, 75)
// (Recovery of rotation=0/scale=100/offset=0,0 from exactly these two pairs
// is hand-verified in this file's own comments and matches the general
// mechanism `home-anchor-fit.spec.ts` already proves for arbitrary seats.)
const HOME_ANCHORS = [
  { home_px: { x: 300, y: 300 }, floor_pct: { x: 30, y: 37.5 } },
  { home_px: { x: 800, y: 600 }, floor_pct: { x: 80, y: 75 } },
];

async function mountCard(page: Page): Promise<void> {
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ BASE_SVG, MAP_SVG, HOME_ANCHORS }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: "merged",
        image_base: { src: BASE_SVG, home_anchors: HOME_ANCHORS, home_anchors_frame_id: "hf1" },
        vacuums: [
          {
            entity: "vacuum.a",
            name: "A (cesta B)",
            integration_entity: "sensor.anyvac_a",
            map: { entity: "image.a_map" },
            base: "map",
            rooms: [],
          },
        ],
      });
      const now = new Date().toISOString();
      card.hass = {
        states: {
          "vacuum.a": {
            entity_id: "vacuum.a", state: "docked",
            attributes: { friendly_name: "A" }, last_changed: now, last_updated: now,
          },
          "image.a_map": {
            entity_id: "image.a_map", state: now,
            attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now,
          },
          // Registered into "hf1". image_dims/vacuum_position_px are legacy
          // decoys, deliberately far from the *_home_px numbers so a
          // wrongly-taken legacy per-vacuum seat path is caught, not
          // accidentally right.
          "sensor.anyvac_a": {
            entity_id: "sensor.anyvac_a", state: "0",
            attributes: {
              schema_version: 3,
              image_dims: { top: 0, left: 0, width: 50, height: 25, scale: 8, rotation: 0 },
              vacuum_position_px: { x: 40, y: 20, a: 0 },
              home_frame: { id: "hf1", cell_mm: 50, scale: 1, width_px: 1000, height_px: 800 },
              vacuum_position_home_px: { x: 650, y: 500, a: 90 },
              path_dry_home_px: [],
              path_wet_home_px: [],
              rooms: [
                {
                  name: "Kitchen",
                  bbox_px: { x0: 0, y0: 0, x1: 40, y1: 20 },
                  bbox_home_px: { x0: 400, y0: 250, x1: 600, y1: 450 },
                  outline_home_px: [[400, 250], [600, 250], [500, 450]],
                },
              ],
            },
            last_changed: now, last_updated: now,
          },
        },
        hassUrl: (path: string) => path,
        localize: (k: string) => k,
        language: "en",
        callService: async (domain: string, service: string, data: unknown) => {
          w.__calls.push({ domain, service, data });
        },
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = "1200px";
      w.__mockHa.cardWrap.style.height = "400px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { BASE_SVG, MAP_SVG, HOME_ANCHORS }
  );
  await page.waitForFunction(
    () => !!(window as any).__card?.shadowRoot?.querySelector(".image-base-img"),
    null,
    { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
  // `_mapAR` updates asynchronously off the base image's own `load` event
  // (`_onFloorplanLoad`) — wait for it to actually settle at the floorplan's
  // real 1000x800 ratio (1.25) before reading anything ar-dependent, instead
  // of assuming load-event ordering.
  await page.waitForFunction(
    () => {
      const ar = (window as any).__card?._mapAR;
      return typeof ar === "number" && Math.abs(ar - 1.25) < 0.01;
    },
    null,
    { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Same probe technique as `home-frame.spec.ts`/`rotated-map.spec.ts`: a
 *  sibling box copying the base image's resolved box + transform exactly,
 *  with a zero-size marker at a known fraction of it, measured on screen by
 *  the browser itself. */
function probe(page: Page, fx: number, fy: number): Promise<{ x: number; y: number }> {
  return page.evaluate(({ fx, fy }) => {
    const card = (window as any).__card;
    const img = card.shadowRoot.querySelector(".image-base-img") as HTMLElement;
    const cs = getComputedStyle(img);
    const box = document.createElement("div");
    box.style.position = "absolute";
    box.style.left = cs.left;
    box.style.top = cs.top;
    box.style.width = img.offsetWidth + "px";
    box.style.height = img.offsetHeight + "px";
    box.style.transformOrigin = cs.transformOrigin;
    box.style.transform = cs.transform;
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.left = fx * 100 + "%";
    dot.style.top = fy * 100 + "%";
    dot.style.width = "0";
    dot.style.height = "0";
    box.appendChild(dot);
    img.parentElement!.appendChild(box);
    const r = dot.getBoundingClientRect();
    box.remove();
    return { x: r.left, y: r.top };
  }, { fx, fy });
}

test.describe("cesta B: floorplan calibrated against the home frame (docs/40 §5.B)", () => {
  test("the overlay viewBox is 0 0 100 (100/ar) -- the wrap's own aspect, not a crop/image_dims extent", async ({ page }) => {
    await mountCard(page);
    const viewBoxes = await page.evaluate(() =>
      Array.from((window as any).__card.shadowRoot.querySelectorAll("svg.map-vector")).map(
        (s: any) => s.getAttribute("viewBox")
      )
    );
    // 100 / 1.25 = 80.000 (`(100/ar).toFixed(3)`).
    expect(viewBoxes).toContain("0 0 100 80.000");
  });

  test("the robot marker sits at vacuum_position_home_px projected through the live anchor fit", async ({ page }) => {
    await mountCard(page);
    const circle = await page.evaluate(() => {
      const svgs = Array.from((window as any).__card.shadowRoot.querySelectorAll("svg.map-vector")) as SVGElement[];
      for (const svg of svgs) {
        const c = svg.querySelector("circle");
        if (c) return { cx: c.getAttribute("cx"), cy: c.getAttribute("cy") };
      }
      return null;
    });
    expect(circle).not.toBeNull();
    // vacuum_position_home_px=(650,500); fit recovered from HOME_ANCHORS is
    // exactly identity (rotation 0, scale 100, offset 0,0 -- hand-verified in
    // this file's own module docstring/comments):
    //   q = ((650-500)/1000, (500-400)/1000) = (0.15, 0.1)
    //   pct.x = 50 + 0.15*100 = 65 ; pct.y = 50 + 0.1*100*1.25 = 62.5
    // SVG coordinate divides y by ar: (65, 62.5/1.25) = (65, 50).
    expect(parseFloat(circle!.cx!)).toBeCloseTo(65, 1);
    expect(parseFloat(circle!.cy!)).toBeCloseTo(50, 1);
  });

  test("a room's rectangle comes from bbox_home_px through the reshaped roomBboxToRect, not bbox_px", async ({ page }) => {
    await mountCard(page);
    const rect = await page.evaluate(() => {
      const btn = Array.from((window as any).__card.shadowRoot.querySelectorAll(".room-overlay")).find(
        (b: any) => b.getAttribute("aria-label") === "Kitchen"
      ) as HTMLElement | undefined;
      if (!btn) return null;
      const s = btn.style;
      return { left: parseFloat(s.left), top: parseFloat(s.top), width: parseFloat(s.width), height: parseFloat(s.height) };
    });
    expect(rect).not.toBeNull();
    // bbox_home_px {400,250,600,450}, centre (500,350), size 200x200:
    //   q = ((500-500)/1000, (350-400)/1000) = (0, -0.05)
    //   pct.x = 50 ; pct.y = 50 + (-0.05)*100*1.25 = 43.75 -> displayed rounded
    //   to 1 decimal (43.7 or 43.8 depending on which side of the exact .75
    //   cusp floating-point roundoff lands on — precision 0 below checks the
    //   underlying placement, not that display rounding).
    //   w = h = 200/1000 = 0.2 ; map_w = 0.2*100 = 20 ; map_h = 0.2*1.25*100 = 25
    expect(rect!.left).toBeCloseTo(50, 0);
    expect(rect!.top).toBeCloseTo(43.75, 0);
    expect(rect!.width).toBeCloseTo(20, 0);
    expect(rect!.height).toBeCloseTo(25, 0);
  });

  test("the room's real outline is drawn from outline_home_px through the same fit, additive on top of the rectangle", async ({ page }) => {
    await mountCard(page);
    const points = await page.evaluate(() => {
      const poly = (window as any).__card.shadowRoot.querySelector("svg.room-outline-layer polygon");
      return poly?.getAttribute("points") ?? null;
    });
    expect(points).not.toBeNull();
    // outline_home_px [[400,250],[600,250],[500,450]]:
    //   (400,250): q=(-0.1,-0.15)  -> pct=(40, 50-18.75=31.25)
    //   (600,250): q=( 0.1,-0.15)  -> pct=(60, 31.25)
    //   (500,450): q=( 0  , 0.05)  -> pct=(50, 50+6.25=56.25)
    const pts = points!.trim().split(/\s+/).map((p) => p.split(",").map(Number));
    expect(pts).toHaveLength(3);
    expect(pts[0][0]).toBeCloseTo(40, 1); expect(pts[0][1]).toBeCloseTo(31.25, 1);
    expect(pts[1][0]).toBeCloseTo(60, 1); expect(pts[1][1]).toBeCloseTo(31.25, 1);
    expect(pts[2][0]).toBeCloseTo(50, 1); expect(pts[2][1]).toBeCloseTo(56.25, 1);
    const hasRect = await page.evaluate(() =>
      !!Array.from((window as any).__card.shadowRoot.querySelectorAll(".room-overlay")).find(
        (b: any) => b.getAttribute("aria-label") === "Kitchen"
      )
    );
    expect(hasRect).toBe(true);
  });

  test("a Pin & Go click sends goto with frame: home + x_home_px/y_home_px, inverted through the anchor fit", async ({ page }) => {
    await mountCard(page);
    // Query point (700,450), NOT one of the two calibration anchors:
    //   q = (0.2, 0.05) -> pct = (70, 50 + 0.05*100*1.25 = 56.25)
    const [fx, fy] = [0.7, 0.5625];
    const pt = await probe(page, fx, fy);
    await page.evaluate(
      ({ x, y }) => {
        const card = (window as any).__card;
        const vac = card._config.vacuums[0];
        card._mapMode = "pin";
        card._modeEntity = vac.entity;
        card._onMapClick(vac, { clientX: x, clientY: y } as MouseEvent);
      },
      pt
    );
    const call = await page.evaluate(() => (window as any).__calls.at(-1));
    expect(call.domain).toBe("anyvac");
    expect(call.service).toBe("goto");
    expect(call.data.entity_id).toBe("vacuum.a");
    expect(call.data.frame).toBe("home");
    expect(call.data.x_home_px).toBeCloseTo(700, 0);
    expect(call.data.y_home_px).toBeCloseTo(450, 0);
  });

  test("a dragged zone sends zone_clean with frame: home + *_home_px corners, inverted through the anchor fit", async ({ page }) => {
    await mountCard(page);
    // Corner 1 (350,320): q=(-0.15,-0.08) -> pct=(35, 50-10=40)
    // Corner 2 (750,550): q=( 0.25, 0.15) -> pct=(75, 50+18.75=68.75)
    const [fx0, fy0] = [0.35, 0.4];
    const [fx1, fy1] = [0.75, 0.6875];
    const a = await probe(page, fx0, fy0);
    const b = await probe(page, fx1, fy1);
    const zone = await page.evaluate(
      async ({ a, b }) => {
        const card = (window as any).__card;
        const vac = card._config.vacuums[0];
        card._mapMode = "zone";
        card._modeEntity = vac.entity;
        await card.updateComplete;
        const cc = card.shadowRoot.querySelector(".map-clickcatch") as any;
        if (!cc) throw new Error("no .map-clickcatch");
        cc.setPointerCapture = () => {};
        const ev = (p: { x: number; y: number }) =>
          ({ currentTarget: cc, clientX: p.x, clientY: p.y, pointerId: 1 } as any);
        card._onZoneDown(vac, ev(a));
        card._onZoneMove(vac, ev(b));
        card._onZoneUp(vac, ev(b));
        await card.updateComplete;
        return card._zonePending?.[vac.entity] ?? null;
      },
      { a, b }
    );
    expect(zone).not.toBeNull();
    expect(zone!.frame).toBe("home");
    expect(zone!.x1).toBeCloseTo(350, 0);
    expect(zone!.y1).toBeCloseTo(320, 0);
    expect(zone!.x2).toBeCloseTo(750, 0);
    expect(zone!.y2).toBeCloseTo(550, 0);

    await page.evaluate(() => {
      const card = (window as any).__card;
      card._confirmZone(card._config.vacuums[0]);
    });
    const call = await page.evaluate(() => (window as any).__calls.at(-1));
    expect(call.service).toBe("zone_clean");
    expect(call.data.frame).toBe("home");
    expect(call.data.x1_home_px).toBeCloseTo(350, 0);
    expect(call.data.y1_home_px).toBeCloseTo(320, 0);
    expect(call.data.x2_home_px).toBeCloseTo(750, 0);
    expect(call.data.y2_home_px).toBeCloseTo(550, 0);
  });
});
