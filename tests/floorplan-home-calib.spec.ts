import { test, expect, type Page } from "@playwright/test";

/**
 * Visual editor / Floorplan & Calibrate tool, home-frame N-point pairing +
 * fiducial markers (docs/42 §9 fáze J3, docs/40 §5.B/§5.A.2) — consolidated
 * from the Config editor's own `_homeCalib`/`_fiducialKnown` state machines
 * (`editor.ts`). Unlike fáze J2's `_floorCalib` (a per-VACUUM seat), this
 * calibrates the shared CARD-LEVEL floorplan itself against the home
 * frame's stable px space (`image_base.home_anchors`/`home_anchors_frame_id`).
 *
 * Scope decision (see `_fiducialSnapshotPath`'s own doc comment in
 * anyvac-card.ts): unlike editor.ts's config-editor form, the fiducial
 * snapshot step does NOT write the returned path into `image_base.src` —
 * doing so from the Visual editor would fork the stored `floorplan_seats`
 * override onto a new key on the NEXT session open (`resolveImageBaseSrc`
 * computes that key from the CURRENT effective src at open time, not the
 * original declared one). The path is shown as plain informational text
 * instead, and pointing the floorplan at it stays a Config-editor step.
 */

const FLOORPLAN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>" +
      "<rect width='800' height='400' fill='#eee'/></svg>"
  );
const HOME_SNAPSHOT_URL = "/local/anyvac/home_frame_calib.png";

interface MountOpts {
  imageBase?: Record<string, unknown>;
  noServices?: boolean;
  homeFrame?: { id: string; width_px: number; height_px: number } | null;
  floorplanSeats?: Record<string, unknown>;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const {
    imageBase = { src: FLOORPLAN_SVG },
    noServices = false,
    homeFrame = { id: "frame1", width_px: 1000, height_px: 800 },
    floorplanSeats = {},
  } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(
    ({ FLOORPLAN_SVG, imageBase, noServices, homeFrame, floorplanSeats }) => {
      const w = window as any;
      w.__calls = [];
      w.__serviceHandlers = {};
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: "merged",
        image_base: imageBase,
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            map: { entity: "image.my_roborock_map" },
            base: "map",
          },
        ],
      });
      const now = new Date().toISOString();
      card.hass = {
        states: {
          "vacuum.my_roborock": {
            entity_id: "vacuum.my_roborock", state: "docked",
            attributes: { friendly_name: "Roborock" }, last_changed: now, last_updated: now,
          },
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock", state: "0",
            attributes: {
              schema_version: 2,
              image_dims: { top: 0, left: 0, width: 100, height: 400, scale: 4, rotation: 0 },
              vacuum_position_px: { x: 200, y: 800, a: 0 },
              rooms: [],
              ...(homeFrame ? { home_frame: homeFrame } : {}),
              floorplan_seats: floorplanSeats,
            },
            last_changed: now, last_updated: now,
          },
        },
        services: noServices ? {} : {
          anyvac: {
            set_floorplan_seat: {},
            snapshot_map_as_floorplan: {},
            snap_wall_corner: {},
            detect_floorplan_fiducials: {},
          },
        },
        hassUrl: (path: string) => path,
        localize: (k: string) => k,
        language: "en",
        callService: async (
          domain: string, service: string, data: unknown,
          _target?: unknown, _blocking?: boolean, _returnResponse?: boolean,
        ) => {
          w.__calls.push({ domain, service, data });
          const handler = w.__serviceHandlers[service];
          return handler ? handler(data) : undefined;
        },
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = "1200px";
      w.__mockHa.cardWrap.style.height = "400px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { FLOORPLAN_SVG, imageBase, noServices, homeFrame, floorplanSeats }
  );
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete,
    null, { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Registers a per-service response handler for the mock `callService`. */
async function setServiceHandler(page: Page, service: string, fn: string): Promise<void> {
  await page.evaluate(
    ({ service, fn }) => { (window as any).__serviceHandlers[service] = new Function("data", `return (${fn})(data)`); },
    { service, fn }
  );
}

async function openHomeTool(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._openAlign(card._config.vacuums[0]);
    card._veTool = "floorplan";
    card._openFloorplan();
    card._setFloorplanMode("home");
    await card.updateComplete;
  });
  await page.waitForFunction(
    () => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot
      ?.querySelector(".align-canvas")
  );
}

function homeCalibState(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._homeCalib);
}

test.describe("Visual editor Floorplan & Calibrate tool, home-frame calibration (docs/42 §9 fáze J3)", () => {
  test("_anyHomeFrameCard picks the frame the most configured vacuums are registered into", async ({ page }) => {
    await mountCard(page, { homeFrame: { id: "frameA", width_px: 1200, height_px: 900 } });
    const frame = await page.evaluate(() => (window as any).__card._anyHomeFrameCard());
    expect(frame).toEqual({ id: "frameA", w: 1200, h: 900 });
  });

  test("_anyHomeFrameCard is null when no configured vacuum reports a home_frame", async ({ page }) => {
    await mountCard(page, { homeFrame: null });
    const frame = await page.evaluate(() => (window as any).__card._anyHomeFrameCard());
    expect(frame).toBeNull();
  });

  test("the 'Home frame' sub-tab is offered when a home frame exists and this floorplan has no home-frame crop", async ({ page }) => {
    await mountCard(page);
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._openAlign(card._config.vacuums[0]);
      card._veTool = "floorplan";
      card._openFloorplan();
      await card.updateComplete;
    });
    const host = page.locator("anyvac-visual-editor");
    await expect(host.locator(".ve-subtab", { hasText: "Home frame" })).toHaveCount(1);
  });

  test("the 'Home frame' sub-tab is hidden once this floorplan already IS a home-frame identity crop (cesta A)", async ({ page }) => {
    await mountCard(page, {
      imageBase: { src: FLOORPLAN_SVG, crop_box: { frame_id: "frame1", x0: 0, y0: 0, x1: 100, y1: 100 } },
    });
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._openAlign(card._config.vacuums[0]);
      card._veTool = "floorplan";
      card._openFloorplan();
      await card.updateComplete;
    });
    const host = page.locator("anyvac-visual-editor");
    await expect(host.locator(".ve-subtab", { hasText: "Home frame" })).toHaveCount(0);
  });

  test("the 'Home frame' sub-tab is hidden when no vacuum reports a home_frame registration", async ({ page }) => {
    await mountCard(page, { homeFrame: null });
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._openAlign(card._config.vacuums[0]);
      card._veTool = "floorplan";
      card._openFloorplan();
      await card.updateComplete;
    });
    const host = page.locator("anyvac-visual-editor");
    await expect(host.locator(".ve-subtab", { hasText: "Home frame" })).toHaveCount(0);
  });

  test("entering 'home' mode starts on the landing view (no _homeCalib seeded)", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    expect(await page.evaluate(() => (window as any).__card._floorplanMode)).toBe("home");
    expect(await homeCalibState(page)).toBeNull();
  });

  test("_startHomeCalibration fetches a scratch snapshot and seeds the frame-phase click flow", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await setServiceHandler(page, "snapshot_map_as_floorplan", `
      (data) => data.fiducials ? undefined : {
        response: { path: ${JSON.stringify(HOME_SNAPSHOT_URL)}, frame_id: "frame1", crop: { x0: 0, y0: 0, x1: 1000, y1: 800 } },
      }
    `);
    await page.evaluate(async () => { await (window as any).__card._startHomeCalibration(); });
    const s = await homeCalibState(page);
    expect(s).toEqual({ phase: "frame", homePts: [], floorPts: [] });
    expect(await page.evaluate(() => (window as any).__card._homeCalibSnapshotUrl)).toBe(HOME_SNAPSHOT_URL);
    expect(await page.evaluate(() => (window as any).__card._homeCalibFrameId)).toBe("frame1");
    expect(await page.evaluate(() => (window as any).__card._homeCalibCrop)).toEqual({ x0: 0, y0: 0, x1: 1000, y1: 800 });
  });

  test("_startHomeCalibration surfaces an error and never seeds a flow on an incomplete response", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await setServiceHandler(page, "snapshot_map_as_floorplan", `(data) => ({ response: {} })`);
    await page.evaluate(async () => { await (window as any).__card._startHomeCalibration(); });
    expect(await homeCalibState(page)).toBeNull();
    expect(await page.evaluate(() => (window as any).__card._homeCalibError)).toContain("home-frame registration");
  });

  test("a frame-snapshot click snaps via anyvac.snap_wall_corner and hands control to the floor phase", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._homeCalib = { phase: "frame", homePts: [], floorPts: [] };
      card._homeCalibCrop = { x0: 0, y0: 0, x1: 1000, y1: 800 };
      card._homeCalibFrameId = "frame1";
    });
    await setServiceHandler(page, "snap_wall_corner", `
      (data) => ({ response: { x_home_px: data.x_home_px + 5, y_home_px: data.y_home_px - 5 } })
    `);
    await page.evaluate(async () => {
      const card = (window as any).__card;
      // A click at 25%/75% of a 400x320 rect maps (via pctToCropPoint on the
      // {x0:0,y0:0,x1:1000,y1:800} crop) to raw home px (250, 600), snapped
      // by our handler above to (255, 595).
      const ev = {
        currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 320 }) },
        clientX: 100, clientY: 240,
      } as any;
      await card._onHomeCalibFrameClick(ev);
    });
    const s = await homeCalibState(page);
    expect(s.phase).toBe("floor");
    expect(s.homePts).toEqual([{ x: 255, y: 595 }]);
  });

  test("a frame-snapshot click falls back to the unsnapped point when snap_wall_corner fails", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._homeCalib = { phase: "frame", homePts: [], floorPts: [] };
      card._homeCalibCrop = { x0: 0, y0: 0, x1: 1000, y1: 800 };
      card._homeCalibFrameId = "frame1";
    });
    await setServiceHandler(page, "snap_wall_corner", `(data) => { throw new Error("boom"); }`);
    await page.evaluate(async () => {
      const card = (window as any).__card;
      const ev = {
        currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 320 }) },
        clientX: 100, clientY: 240,
      } as any;
      await card._onHomeCalibFrameClick(ev);
    });
    const s = await homeCalibState(page);
    expect(s.phase).toBe("floor");
    expect(s.homePts).toEqual([{ x: 250, y: 600 }]);
  });

  test("a floorplan click goes through _alignPointToWrapPct, same as fáze J2's own floor click", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._homeCalib = { phase: "floor", homePts: [{ x: 10, y: 10 }], floorPts: [] };
    });
    const { recorded, expected } = await page.evaluate(() => {
      const card = (window as any).__card;
      const clientX = 111, clientY = 222;
      const expected = card._alignPointToWrapPct(clientX, clientY);
      card._onHomeCalibFloorClick({ clientX, clientY } as any);
      return { recorded: card._homeCalib.floorPts[0], expected };
    });
    // Recorded values are rounded to 1 decimal (`round1`, same as J2's own
    // floor click) before being stored, so compare at that precision rather
    // than the raw unrounded `_alignPointToWrapPct` output.
    expect(recorded.x).toBeCloseTo(expected.x, 1);
    expect(recorded.y).toBeCloseTo(expected.y, 1);
    const s = await homeCalibState(page);
    expect(s.phase).toBe("frame");
    expect(s.homePts.length).toBe(1);
    expect(s.floorPts.length).toBe(1);
  });

  test("Undo point removes the last click on whichever surface it's on", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._homeCalib = {
        phase: "floor", homePts: [{ x: 1, y: 1 }, { x: 2, y: 2 }], floorPts: [{ x: 10, y: 10 }],
      };
    });
    await page.evaluate(() => (window as any).__card._undoHomeCalibPoint());
    let s = await homeCalibState(page);
    expect(s.phase).toBe("frame");
    expect(s.homePts.length).toBe(1);
    expect(s.floorPts.length).toBe(1);
    await page.evaluate(() => (window as any).__card._undoHomeCalibPoint());
    s = await homeCalibState(page);
    expect(s.homePts.length).toBe(1);
    expect(s.floorPts.length).toBe(0);
  });

  test("the live fit-error preview appears once 2 complete pairs exist", async ({ page }) => {
    await mountCard(page, { homeFrame: { id: "frame1", width_px: 1000, height_px: 800 } });
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._homeCalib = {
        phase: "frame",
        homePts: [{ x: 100, y: 400 }, { x: 900, y: 400 }],
        floorPts: [{ x: 20, y: 20 }, { x: 80, y: 20 }],
      };
    });
    const preview = await page.evaluate(() => {
      const card = (window as any).__card;
      return card._homeCalibPreview(card._homeCalib);
    });
    expect(preview).not.toBeNull();
    expect(preview.residual_pct).toBeLessThan(1);
  });

  test("Finish needs at least 2 complete pairs — fewer leaves an error and makes no service call", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._homeCalib = { phase: "frame", homePts: [{ x: 5, y: 5 }], floorPts: [] };
    });
    await page.evaluate(async () => { await (window as any).__card._finishHomeCalibration(); });
    expect(await page.evaluate(() => (window as any).__calls.length)).toBe(0);
    expect(await page.evaluate(() => (window as any).__card._homeCalibError)).toContain("at least 2");
  });

  test("Finish solves the fit, writes home_anchors + home_anchors_frame_id, cascades hide_map, and stays open", async ({ page }) => {
    await mountCard(page, { homeFrame: { id: "frame1", width_px: 1000, height_px: 800 } });
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._homeCalib = {
        phase: "frame",
        homePts: [{ x: 100, y: 400 }, { x: 900, y: 400 }],
        floorPts: [{ x: 20, y: 20 }, { x: 80, y: 20 }],
      };
    });
    await page.evaluate(async () => { await (window as any).__card._finishHomeCalibration(); });
    const calls = await page.evaluate(() => (window as any).__calls);
    // Call 1: the card-level home_anchors write. Call 2: the hide_map
    // cascade's one-vacuum-strong loop (only one configured vacuum here).
    expect(calls.length).toBe(2);
    expect(calls[0].service).toBe("set_floorplan_seat");
    expect(calls[0].data.floorplan).toBe(FLOORPLAN_SVG);
    expect(calls[0].data.vacuum).toBeUndefined();
    expect(calls[0].data.image_base.home_anchors.length).toBe(2);
    expect(calls[0].data.image_base.home_anchors_frame_id).toBe("frame1");
    expect(calls[0].data.image_base.src).toBe(FLOORPLAN_SVG);
    expect(calls[1].service).toBe("set_floorplan_seat");
    expect(calls[1].data.vacuum).toBe("vacuum.my_roborock");
    expect(calls[1].data.appearance.hide_map).toBe(true);
    // Does NOT close the overlay (unlike J1/J2's Save) — the result banner
    // is shown inline instead.
    expect(await page.evaluate(() => (window as any).__card._alignSession)).not.toBeNull();
    expect(await homeCalibState(page)).toBeNull();
    const result = await page.evaluate(() => (window as any).__card._homeCalibResult);
    expect(result.residual_pct).toBeLessThan(1);
  });

  test("the hide_map cascade resends an existing per-vacuum map override verbatim instead of clearing it", async ({ page }) => {
    const existingMap = { rotation: 0, scale: 100, offset_x: 1, offset_y: 2 };
    await mountCard(page, {
      homeFrame: { id: "frame1", width_px: 1000, height_px: 800 },
      floorplanSeats: { [FLOORPLAN_SVG]: { vacuums: { "vacuum.my_roborock": { map: existingMap } } } },
    });
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._homeCalib = {
        phase: "frame",
        homePts: [{ x: 100, y: 400 }, { x: 900, y: 400 }],
        floorPts: [{ x: 20, y: 20 }, { x: 80, y: 20 }],
      };
    });
    await page.evaluate(async () => { await (window as any).__card._finishHomeCalibration(); });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls[1].data.map).toEqual(existingMap);
  });

  test("Cancel drops the calibration state and returns to the landing view", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate((url) => {
      (window as any).__card._homeCalib = { phase: "frame", homePts: [{ x: 1, y: 1 }], floorPts: [] };
      (window as any).__card._homeCalibSnapshotUrl = url;
    }, HOME_SNAPSHOT_URL);
    await page.evaluate(() => (window as any).__card._cancelHomeCalibration());
    expect(await homeCalibState(page)).toBeNull();
    expect(await page.evaluate(() => (window as any).__card._homeCalibSnapshotUrl)).toBe("");
    expect(await page.evaluate(() => (window as any).__card._floorplanMode)).toBe("home");
  });

  test("the point cap stops recording homePts once FLOOR_CALIB_MAX_PAIRS is hit", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(() => {
      const pt = { x: 1, y: 1 };
      const card = (window as any).__card;
      card._homeCalib = { phase: "frame", homePts: [pt, pt, pt, pt, pt, pt], floorPts: [pt, pt, pt, pt, pt, pt] };
      card._homeCalibCrop = { x0: 0, y0: 0, x1: 100, y1: 100 };
    });
    await page.evaluate(async () => {
      const card = (window as any).__card;
      const ev = {
        currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) },
        clientX: 10, clientY: 10,
      } as any;
      await card._onHomeCalibFrameClick(ev);
    });
    const s = await homeCalibState(page);
    expect(s.homePts.length).toBe(6);
  });
});

test.describe("Visual editor Floorplan & Calibrate tool, fiducial markers (docs/42 §9 fáze J3, docs/40 §5.A.2)", () => {
  test("step 1 snapshots the home frame with markers and remembers them, without writing image_base.src", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await setServiceHandler(page, "snapshot_map_as_floorplan", `
      (data) => data.fiducials ? {
        response: {
          path: "/local/anyvac/home_frame_fiducial.png", frame_id: "frame1",
          fiducials: [
            { id: "nw", home_px: { x: 0, y: 0 } }, { id: "ne", home_px: { x: 1000, y: 0 } },
            { id: "sw", home_px: { x: 0, y: 800 } }, { id: "se", home_px: { x: 1000, y: 800 } },
          ],
        },
      } : undefined
    `);
    await page.evaluate(async () => { await (window as any).__card._snapshotHomeFrameWithFiducials(); });
    expect(await page.evaluate(() => (window as any).__card._fiducialSnapshotPath)).toBe("/local/anyvac/home_frame_fiducial.png");
    const known = await page.evaluate(() => (window as any).__card._fiducialKnown);
    expect(known.frameId).toBe("frame1");
    expect(known.markers.length).toBe(4);
    // Never rewrites image_base.src — only the one snapshot call happened.
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls.length).toBe(1);
    expect(calls[0].service).toBe("snapshot_map_as_floorplan");
  });

  test("step 1 surfaces an error on an incomplete response and leaves _fiducialKnown unset", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await setServiceHandler(page, "snapshot_map_as_floorplan", `(data) => ({ response: {} })`);
    await page.evaluate(async () => { await (window as any).__card._snapshotHomeFrameWithFiducials(); });
    expect(await page.evaluate(() => (window as any).__card._fiducialKnown)).toBeNull();
    expect(await page.evaluate(() => (window as any).__card._fiducialSnapshotError)).toContain("integration");
  });

  test("step 2 detects markers against the current floorplan src and saves home_anchors + cascades hide_map", async ({ page }) => {
    await mountCard(page, { homeFrame: { id: "frame1", width_px: 1000, height_px: 800 } });
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._fiducialKnown = {
        frameId: "frame1",
        markers: [{ id: "nw", home_px: { x: 0, y: 0 } }],
      };
    });
    await setServiceHandler(page, "detect_floorplan_fiducials", `
      (data) => ({
        response: {
          found: 3, missing: ["se"],
          home_anchors: [
            { home_px: { x: 10, y: 10 }, floor_pct: { x: 5, y: 5 } },
            { home_px: { x: 990, y: 10 }, floor_pct: { x: 95, y: 5 } },
          ],
        },
      })
    `);
    await page.evaluate(async () => { await (window as any).__card._detectFiducials(); });
    const detectCall = await page.evaluate(() => (window as any).__calls[0]);
    expect(detectCall.service).toBe("detect_floorplan_fiducials");
    expect(detectCall.data.path).toBe(FLOORPLAN_SVG);
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls[1].service).toBe("set_floorplan_seat");
    expect(calls[1].data.image_base.home_anchors.length).toBe(2);
    expect(calls[1].data.image_base.home_anchors_frame_id).toBe("frame1");
    expect(calls[2].data.appearance.hide_map).toBe(true);
    const result = await page.evaluate(() => (window as any).__card._fiducialDetectResult);
    expect(result).toEqual({ found: 3, missing: ["se"] });
  });

  test("step 2 is a no-op before step 1 has run (_fiducialKnown unset)", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(async () => { await (window as any).__card._detectFiducials(); });
    expect(await page.evaluate(() => (window as any).__calls.length)).toBe(0);
  });

  test("step 2 surfaces an error when no markers are found", async ({ page }) => {
    await mountCard(page);
    await openHomeTool(page);
    await page.evaluate(() => {
      (window as any).__card._fiducialKnown = { frameId: "frame1", markers: [] };
    });
    await setServiceHandler(page, "detect_floorplan_fiducials", `(data) => ({ response: { home_anchors: [] } })`);
    await page.evaluate(async () => { await (window as any).__card._detectFiducials(); });
    expect(await page.evaluate(() => (window as any).__card._fiducialDetectError)).toContain("alpha channel");
    expect(await page.evaluate(() => (window as any).__card._fiducialDetectResult)).toBeNull();
  });
});
