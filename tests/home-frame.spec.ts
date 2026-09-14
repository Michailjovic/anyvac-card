import { test, expect, type Page } from "@playwright/test";

/**
 * Home frame identity rendering + click geometry (docs/40 §4.4, Fáze 3).
 *
 * Kontrakt v3 pre-transforms every home-frame-registered vacuum's marker/
 * path/room geometry into ONE shared `*_home_px` space (Fáze 1 registration).
 * Merged mode's card-side consequence (this file's whole subject): a
 * home-frame-eligible vacuum needs no per-vacuum seat at all — just its own
 * identity crop (`homeFrameCropFor`, seatfit.ts) — while a vacuum that is
 * NOT registered into the configured frame keeps rendering through the
 * legacy per-vacuum seat, automatically, in the very same merged map. Both
 * halves of that sentence are pinned down here:
 *
 * 1. `_renderHomeFrameOverlay`'s `<svg>` viewBox is the crop's own px extent
 *    (not the legacy per-image NW/NH), and its marker sits exactly at
 *    `vacuum_position_home_px` minus the crop origin — ground truth computed
 *    by hand from the mounted config, not the card's own maths checked
 *    against itself.
 * 2. A room's rectangle + real outline come from `bbox_home_px`/
 *    `outline_home_px` through `placeRoomInCrop`/`outlineInCrop`, matching a
 *    hand-computed expectation.
 * 3. Pin & Go / Zone clicks for a home-frame vacuum resolve to `frame:
 *    "home"` + `x_home_px`/`y_home_px` (`goto`)/`x1_home_px`… (`zone_clean`)
 *    service calls, via the same DOMMatrix-inversion + probe technique
 *    `rotated-map.spec.ts` uses for the legacy per-vacuum path — ground
 *    truth is the browser's own layout, not the card's own inverse checked
 *    against itself.
 * 4. A second, NOT-registered vacuum sharing the same merged map keeps
 *    rendering via its own legacy per-vacuum seat (`_effectiveSeat` /
 *    `_renderIntegrationOverlay`) — the eligibility check is genuinely
 *    per-vacuum, not a card-wide mode switch.
 */

const BASE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='500'>" +
      "<rect width='1000' height='500' fill='#222'/></svg>"
  );
const MAP_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'>" +
      "<rect width='40' height='20' fill='#444'/></svg>"
  );

/** Home frame crop: `x0,y0,x1,y1` in the frame's own px space. cropW=1000,
 *  cropH=500 — deliberately NOT matching either vacuum's own legacy
 *  `image_dims` (NW/NH below), so a viewBox/marker computed from the wrong
 *  space is caught, not accidentally right by coincidence. */
const CROP = { frame_id: "hf1", x0: 100, y0: 50, x1: 1100, y1: 550 };
const CROP_W = CROP.x1 - CROP.x0;
const CROP_H = CROP.y1 - CROP.y0;

async function mountCard(page: Page): Promise<void> {
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ BASE_SVG, MAP_SVG, CROP }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: "merged",
        image_base: { src: BASE_SVG, crop_box: CROP },
        vacuums: [
          {
            entity: "vacuum.a",
            name: "A (home frame)",
            integration_entity: "sensor.anyvac_a",
            map: { entity: "image.a_map" },
            base: "map",
            rooms: [],
          },
          {
            entity: "vacuum.b",
            name: "B (legacy)",
            integration_entity: "sensor.anyvac_b",
            map: { entity: "image.b_map" },
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
          "vacuum.b": {
            entity_id: "vacuum.b", state: "docked",
            attributes: { friendly_name: "B" }, last_changed: now, last_updated: now,
          },
          "image.a_map": {
            entity_id: "image.a_map", state: now,
            attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now,
          },
          "image.b_map": {
            entity_id: "image.b_map", state: now,
            attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now,
          },
          // Registered into "hf1" — every *_home_px field populated. NW/NH
          // (400x200) and vacuum_position_px (legacy decoy) deliberately
          // differ from the home-frame numbers so a wrongly-taken legacy
          // path is caught, not silently correct.
          "sensor.anyvac_a": {
            entity_id: "sensor.anyvac_a", state: "0",
            attributes: {
              schema_version: 3,
              image_dims: { top: 0, left: 0, width: 50, height: 25, scale: 8, rotation: 0 },
              vacuum_position_px: { x: 40, y: 20, a: 0 },
              home_frame: { id: "hf1", cell_mm: 50, scale: 1, width_px: 1200, height_px: 600 },
              vacuum_position_home_px: { x: 400, y: 200, a: 90 },
              path_dry_home_px: [[{ x: 400, y: 200 }, { x: 450, y: 200 }]],
              path_wet_home_px: [],
              rooms: [
                {
                  name: "Kitchen",
                  bbox_px: { x0: 0, y0: 0, x1: 40, y1: 20 },
                  bbox_home_px: { x0: 300, y0: 150, x1: 500, y1: 250 },
                  outline_home_px: [[300, 150], [500, 150], [400, 250]],
                },
              ],
            },
            last_changed: now, last_updated: now,
          },
          // NOT registered (no `home_frame` at all) — must keep rendering
          // through its own legacy per-vacuum seat in the very same map.
          "sensor.anyvac_b": {
            entity_id: "sensor.anyvac_b", state: "0",
            attributes: {
              schema_version: 3,
              image_dims: { top: 0, left: 0, width: 60, height: 30, scale: 5, rotation: 0 },
              vacuum_position_px: { x: 100, y: 50, a: 0 },
              rooms: [],
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
    { BASE_SVG, MAP_SVG, CROP }
  );
  await page.waitForFunction(
    () => !!(window as any).__card?.shadowRoot?.querySelector(".image-base-img"),
    null,
    { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Same probe technique as `rotated-map.spec.ts`: a sibling box copying the
 *  base image's resolved box + transform exactly, with a zero-size marker at
 *  a known fraction of it, measured on screen by the browser itself. */
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

test.describe("home frame identity rendering + click geometry (docs/40 §4.4, Fáze 3)", () => {
  test("a home-frame-registered vacuum's overlay viewBox is the crop's own extent, not its legacy image_dims", async ({ page }) => {
    await mountCard(page);
    const viewBoxes = await page.evaluate(() =>
      Array.from((window as any).__card.shadowRoot.querySelectorAll("svg.map-vector")).map(
        (s: any) => s.getAttribute("viewBox")
      )
    );
    expect(viewBoxes).toContain(`0 0 ${CROP_W} ${CROP_H}`);
    // Vacuum B (unregistered) still renders its own legacy NW/NH (300x150 —
    // width 60 * scale 5, height 30 * scale 5).
    expect(viewBoxes).toContain("0 0 300 150");
  });

  test("the robot marker sits at vacuum_position_home_px minus the crop origin", async ({ page }) => {
    await mountCard(page);
    const circle = await page.evaluate(() => {
      const svgs = Array.from((window as any).__card.shadowRoot.querySelectorAll("svg.map-vector")) as SVGElement[];
      for (const svg of svgs) {
        if (svg.getAttribute("viewBox")?.startsWith("0 0 1000 500")) {
          const c = svg.querySelector("circle");
          if (c) return { cx: c.getAttribute("cx"), cy: c.getAttribute("cy") };
        }
      }
      return null;
    });
    expect(circle).not.toBeNull();
    // vacuum_position_home_px = {x:400,y:200}; crop origin = {x0:100,y0:50}.
    expect(parseFloat(circle!.cx!)).toBeCloseTo(400 - CROP.x0, 1);
    expect(parseFloat(circle!.cy!)).toBeCloseTo(200 - CROP.y0, 1);
  });

  test("a room's rectangle comes from bbox_home_px through placeRoomInCrop, not bbox_px", async ({ page }) => {
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
    // bbox_home_px {x0:300,y0:150,x1:500,y1:250} through crop {100,50,1100,550}:
    // centre (400,200) -> local (300,150) -> 30%,30%; size (200,100) -> 20%,20%.
    expect(rect!.left).toBeCloseTo(30, 0);
    expect(rect!.top).toBeCloseTo(30, 0);
    expect(rect!.width).toBeCloseTo(20, 0);
    expect(rect!.height).toBeCloseTo(20, 0);
  });

  test("the room's real outline is drawn from outline_home_px, additive on top of the rectangle", async ({ page }) => {
    await mountCard(page);
    const points = await page.evaluate(() => {
      const poly = (window as any).__card.shadowRoot.querySelector("svg.room-outline-layer polygon");
      return poly?.getAttribute("points") ?? null;
    });
    expect(points).not.toBeNull();
    // outline_home_px [[300,150],[500,150],[400,250]] through the same crop:
    // (20,20) (40,20) (30,40) in wrap percent.
    const pts = points!.trim().split(/\s+/).map((p) => p.split(",").map(Number));
    expect(pts).toHaveLength(3);
    expect(pts[0][0]).toBeCloseTo(20, 1); expect(pts[0][1]).toBeCloseTo(20, 1);
    expect(pts[1][0]).toBeCloseTo(40, 1); expect(pts[1][1]).toBeCloseTo(20, 1);
    expect(pts[2][0]).toBeCloseTo(30, 1); expect(pts[2][1]).toBeCloseTo(40, 1);
    // Rectangle hit-target stays mounted regardless (additive, never a replacement).
    const hasRect = await page.evaluate(() =>
      !!Array.from((window as any).__card.shadowRoot.querySelectorAll(".room-overlay")).find(
        (b: any) => b.getAttribute("aria-label") === "Kitchen"
      )
    );
    expect(hasRect).toBe(true);
  });

  test("a Pin & Go click on a home-frame vacuum sends goto with frame: home + x_home_px/y_home_px", async ({ page }) => {
    await mountCard(page);
    const [fx, fy] = [0.3, 0.6];
    const pt = await probe(page, fx, fy);
    await page.evaluate(
      ({ x, y }) => {
        const card = (window as any).__card;
        const vac = card._config.vacuums[0]; // vacuum.a, home-frame registered
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
    // fx*CROP_W + x0, fy*CROP_H + y0.
    expect(call.data.x_home_px).toBeCloseTo(CROP.x0 + fx * CROP_W, 0);
    expect(call.data.y_home_px).toBeCloseTo(CROP.y0 + fy * CROP_H, 0);
  });

  test("a dragged zone on a home-frame vacuum sends zone_clean with frame: home + *_home_px corners", async ({ page }) => {
    await mountCard(page);
    const [fx0, fy0] = [0.2, 0.15];
    const [fx1, fy1] = [0.7, 0.55];
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
    expect(zone!.x1).toBeCloseTo(CROP.x0 + fx0 * CROP_W, 0);
    expect(zone!.y1).toBeCloseTo(CROP.y0 + fy0 * CROP_H, 0);
    expect(zone!.x2).toBeCloseTo(CROP.x0 + fx1 * CROP_W, 0);
    expect(zone!.y2).toBeCloseTo(CROP.y0 + fy1 * CROP_H, 0);

    await page.evaluate(() => {
      const card = (window as any).__card;
      card._confirmZone(card._config.vacuums[0]);
    });
    const call = await page.evaluate(() => (window as any).__calls.at(-1));
    expect(call.service).toBe("zone_clean");
    expect(call.data.frame).toBe("home");
    expect(call.data.x1_home_px).toBeCloseTo(CROP.x0 + fx0 * CROP_W, 0);
    expect(call.data.y2_home_px).toBeCloseTo(CROP.y0 + fy1 * CROP_H, 0);
  });

  test("the unregistered vacuum in the same merged map still clicks through its own legacy seat (x_pct/y_pct, no frame)", async ({ page }) => {
    await mountCard(page);
    const crop = await page.evaluate(() => {
      const card = (window as any).__card;
      return card._homeFrameCropFor(card._config.vacuums[1]);
    });
    expect(crop).toBeNull();
    const content = await page.evaluate(() => {
      const card = (window as any).__card;
      const vac = card._config.vacuums[1];
      const el = card.shadowRoot.querySelector('.map-img[data-entity="vacuum.b"]') as HTMLElement;
      const r = el.getBoundingClientRect();
      return card._clickToContent(vac, (r.left + r.right) / 2, (r.top + r.bottom) / 2);
    });
    expect(content).not.toBeNull();
    await page.evaluate(() => {
      const card = (window as any).__card;
      const vac = card._config.vacuums[1];
      card._mapMode = "pin";
      card._modeEntity = vac.entity;
      const el = card.shadowRoot.querySelector('.map-img[data-entity="vacuum.b"]') as HTMLElement;
      const r = el.getBoundingClientRect();
      card._onMapClick(vac, { clientX: (r.left + r.right) / 2, clientY: (r.top + r.bottom) / 2 } as MouseEvent);
    });
    const call = await page.evaluate(() => (window as any).__calls.at(-1));
    expect(call.data.entity_id).toBe("vacuum.b");
    expect(call.data.frame).toBeUndefined();
    expect(call.data.x_pct).toBeCloseTo(50, 0);
    expect(call.data.y_pct).toBeCloseTo(50, 0);
  });
});
