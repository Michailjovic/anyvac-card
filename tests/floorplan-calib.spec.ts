import { test, expect, type Page } from "@playwright/test";

/**
 * Visual editor / Floorplan & Calibrate tool, 2/N-point calibration
 * sub-phase (docs/42 §9 fáze J2, docs/39) — consolidated from the Config
 * editor's own `_calib` state machine (`editor.ts`). Scope ratified in
 * conversation: (1) the floorplan click surface shares this tool's own
 * pan/zoom/rotate view transform via `_alignPointToWrapPct`, instead of
 * editor.ts's separate fixed full-viewport overlay with its own
 * un-transformed click math; (2) the reference vacuum's raw map gets its
 * own inset panel with its own (simple, un-transformed) click mapping.
 * The geometry gizmo sub-view is covered in `floorplan-tool.spec.ts`; this
 * file stays scoped to `_floorCalib`'s own state machine and Save.
 */

const FLOORPLAN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>" +
      "<rect width='800' height='400' fill='#eee'/></svg>"
  );
const MAP_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
      "<rect width='200' height='200' fill='#369'/></svg>"
  );

interface MountOpts {
  imageBase?: Record<string, unknown>;
  noService?: boolean;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { imageBase = { src: FLOORPLAN_SVG }, noService = false } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(
    ({ FLOORPLAN_SVG, MAP_SVG, imageBase, noService }) => {
      const w = window as any;
      w.__calls = [];
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
          "image.my_roborock_map": {
            entity_id: "image.my_roborock_map", state: now,
            attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now,
          },
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock", state: "0",
            attributes: {
              schema_version: 2,
              image_dims: { top: 0, left: 0, width: 100, height: 400, scale: 4, rotation: 0 },
              vacuum_position_px: { x: 200, y: 800, a: 0 },
              rooms: [],
            },
            last_changed: now, last_updated: now,
          },
        },
        services: noService ? {} : { anyvac: { set_floorplan_seat: {} } },
        hassUrl: (path: string) => path,
        localize: (k: string) => k,
        language: "en",
        callService: async (domain: string, service: string, data: unknown) => { w.__calls.push({ domain, service, data }); },
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = "1200px";
      w.__mockHa.cardWrap.style.height = "400px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { FLOORPLAN_SVG, MAP_SVG, imageBase, noService }
  );
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete,
    null, { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Opens the Visual editor straight into the Floorplan tab's calibration
 *  sub-view, with a fake natural size for the reference map already seeded
 *  (bypassing the inset `<img>`'s own `@load`, same shortcut the geometry
 *  tests take for gizmo state rather than waiting on real image decode). */
async function openCalibration(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._openAlign(card._config.vacuums[0]);
    card._veTool = "floorplan";
    card._openFloorplan();
    card._setFloorplanMode("calib");
    card._floorCalibRefNat = { w: 200, h: 200 };
    await card.updateComplete;
  });
  await page.waitForFunction(
    () => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot
      ?.querySelector(".align-canvas")
  );
}

function calibState(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._floorCalib);
}

test.describe("Visual editor Floorplan & Calibrate tool, 2/N-point calibration (docs/42 §9 fáze J2)", () => {
  test("entering calibration mode seeds an empty raw-phase session", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    expect(await page.evaluate(() => (window as any).__card._floorplanMode)).toBe("calib");
    expect(await calibState(page)).toEqual({ phase: "raw", rawPts: [], floorPts: [] });
  });

  test("entering calibration mode is a no-op for a read-only (home-frame) vacuum", async ({ page }) => {
    await mountCard(page);
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._openAlign(card._config.vacuums[0]);
      card._veTool = "floorplan";
      card._openFloorplan();
      // Monkeypatch, same shortcut as exercising a private gate directly
      // rather than fully mocking a home-frame sensor attribute.
      card._alignReadOnly = () => true;
      card._setFloorplanMode("calib");
      await card.updateComplete;
    });
    expect(await page.evaluate(() => (window as any).__card._floorplanMode)).toBe("geo");
    expect(await calibState(page)).toBeNull();
  });

  test("a raw-map click records a point in natural-pixel space and hands control to the floor phase", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const inset = host.shadowRoot.querySelector(".floor-calib-inset") as HTMLElement;
      const r = inset.getBoundingClientRect();
      // Click at 25%/75% of the inset panel's own rect.
      const ev = { currentTarget: inset, clientX: r.left + r.width * 0.25, clientY: r.top + r.height * 0.75 } as any;
      card._floorCalibRawClick(ev);
    });
    const s = await calibState(page);
    expect(s.phase).toBe("floor");
    expect(s.rawPts.length).toBe(1);
    expect(s.rawPts[0].x).toBeCloseTo(200 * 0.25, 0);
    expect(s.rawPts[0].y).toBeCloseTo(200 * 0.75, 0);
    expect(s.floorPts.length).toBe(0);
  });

  test("a floorplan click goes through _alignPointToWrapPct — correct even when the view is panned/zoomed", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    // Arm phase "floor" with one raw point first (mirrors the real flow).
    await page.evaluate(() => {
      (window as any).__card._floorCalib = { phase: "floor", rawPts: [{ x: 10, y: 10 }], floorPts: [] };
    });
    // Pan the view, same as a user scrolling/dragging to line up a precise click.
    await page.evaluate(() => {
      (window as any).__card._alignView = { ...(window as any).__card._alignView, panX: 37, panY: -14, zoom: 1.6 };
    });
    const { recorded, expected } = await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const r = scene.getBoundingClientRect();
      const clientX = r.left + r.width * 0.6, clientY = r.top + r.height * 0.3;
      // The exact same conversion the tool itself uses — this test asserts
      // `_floorCalibFloorClick` doesn't reimplement its own (unpanned) math,
      // the one thing editor.ts's fixed full-viewport overlay never had to
      // account for.
      const expected = card._alignPointToWrapPct(clientX, clientY);
      card._floorCalibFloorClick({ clientX, clientY } as any);
      return { recorded: card._floorCalib.floorPts[0], expected };
    });
    expect(recorded.x).toBeCloseTo(expected.x, 5);
    expect(recorded.y).toBeCloseTo(expected.y, 5);
    const s = await calibState(page);
    expect(s.phase).toBe("raw");
    expect(s.rawPts.length).toBe(1);
    expect(s.floorPts.length).toBe(1);
  });

  test("Undo point removes the last click on whichever surface it's on", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    await page.evaluate(() => {
      // Realistic mid-flow state: one complete pair, plus a second raw
      // click already placed (phase flips to "floor" as soon as a raw
      // click lands, `_floorCalibRawClick`) with no matching floor click
      // yet — Undo should drop that dangling raw click first.
      (window as any).__card._floorCalib = {
        phase: "floor", rawPts: [{ x: 1, y: 1 }, { x: 2, y: 2 }], floorPts: [{ x: 10, y: 10 }],
      };
    });
    await page.evaluate(() => (window as any).__card._floorCalibUndoPoint());
    let s = await calibState(page);
    expect(s.phase).toBe("raw");
    expect(s.rawPts.length).toBe(1);
    expect(s.floorPts.length).toBe(1);
    // Now a complete pair — Undo removes the last floor click instead.
    await page.evaluate(() => (window as any).__card._floorCalibUndoPoint());
    s = await calibState(page);
    expect(s.rawPts.length).toBe(1);
    expect(s.floorPts.length).toBe(0);
  });

  test("the live fit-error preview appears once 2 complete pairs exist, matching seatfit's own maths", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    await page.evaluate(() => {
      // Two well-separated point pairs on a horizontal line on BOTH images
      // (matching `y`s on each side) — a pure scale+offset, 0° rotation
      // (the default-snapped rotation nearest to what these points already
      // imply), so the fit is exact and residual stays ≈ 0. A pair implying
      // some OTHER angle would genuinely need rotation to fit — snapping
      // that away on purpose is exactly the docs/39 §8 field report this
      // whole point-pairs (vs. a bare 2) design responds to, not something
      // to route around in a test with a diagonal pair.
      (window as any).__card._floorCalib = {
        phase: "raw",
        rawPts: [{ x: 20, y: 100 }, { x: 180, y: 100 }],
        floorPts: [{ x: 30, y: 30 }, { x: 70, y: 30 }],
      };
    });
    const preview = await page.evaluate(() => {
      const card = (window as any).__card;
      return card._floorCalibPreview(card._floorCalib);
    });
    expect(preview).not.toBeNull();
    expect(preview.residual_pct).toBeLessThan(1);
  });

  test("Save needs at least 2 complete pairs — fewer leaves an error and makes no service call", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    await page.evaluate(() => {
      (window as any).__card._floorCalib = { phase: "raw", rawPts: [{ x: 5, y: 5 }], floorPts: [] };
    });
    await page.evaluate(async () => { await (window as any).__card._floorCalibSave(); });
    expect(await page.evaluate(() => (window as any).__calls.length)).toBe(0);
    expect(await page.evaluate(() => (window as any).__card._floorCalibError)).toContain("at least 2");
  });

  test("Save solves the fit and writes it as a manual seat via set_floorplan_seat, resending the current appearance", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._alignSession = { ...card._alignSession, appearanceDraft: { ...card._alignSession.appearanceDraft, robot_size: 42 } };
      card._floorCalib = {
        phase: "raw",
        rawPts: [{ x: 20, y: 20 }, { x: 180, y: 20 }],
        floorPts: [{ x: 30, y: 30 }, { x: 70, y: 30 }],
      };
    });
    await page.evaluate(async () => { await (window as any).__card._floorCalibSave(); });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls.length).toBe(1);
    expect(calls[0].service).toBe("set_floorplan_seat");
    expect(calls[0].data.floorplan).toBe(FLOORPLAN_SVG);
    expect(calls[0].data.vacuum).toBe("vacuum.my_roborock");
    expect(calls[0].data.map.rotation).toBeCloseTo(0, 0);
    expect(typeof calls[0].data.map.scale).toBe("number");
    expect(typeof calls[0].data.map.offset_x).toBe("number");
    expect(typeof calls[0].data.map.offset_y).toBe("number");
    // "no sentinel" — appearance is resent in full from the (always-open)
    // Seat & Appearance session's own draft, same discipline `_alignSave`
    // itself follows, so a calibration Save can never silently clear it.
    expect(calls[0].data.appearance.robot_size).toBe(42);
    // Closes the whole overlay on success, same as every other Save here.
    expect(await page.evaluate(() => (window as any).__card._alignSession)).toBeNull();
    expect(await page.evaluate(() => (window as any).__card._floorCalib)).toBeNull();
  });

  test("Save is a no-op without anyvac.set_floorplan_seat — points are not lost", async ({ page }) => {
    await mountCard(page, { noService: true });
    await openCalibration(page);
    await page.evaluate(() => {
      (window as any).__card._floorCalib = {
        phase: "raw",
        rawPts: [{ x: 20, y: 20 }, { x: 180, y: 20 }],
        floorPts: [{ x: 30, y: 30 }, { x: 70, y: 30 }],
      };
    });
    await page.evaluate(async () => { await (window as any).__card._floorCalibSave(); });
    expect(await page.evaluate(() => (window as any).__calls.length)).toBe(0);
    expect(await page.evaluate(() => (window as any).__card._floorCalib.rawPts.length)).toBe(2);
  });

  test("Cancel drops the calibration state and returns to the geometry sub-view", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    await page.evaluate(() => {
      (window as any).__card._floorCalib = { phase: "raw", rawPts: [{ x: 1, y: 1 }], floorPts: [] };
    });
    await page.evaluate(() => (window as any).__card._floorCalibCancel());
    expect(await calibState(page)).toBeNull();
    expect(await page.evaluate(() => (window as any).__card._floorplanMode)).toBe("geo");
    // The geometry session itself is untouched by a calibration cancel.
    expect(await page.evaluate(() => (window as any).__card._floorplanSession)).not.toBeNull();
  });

  test("the raw-map point cap stops recording once FLOOR_CALIB_MAX_PAIRS is hit", async ({ page }) => {
    await mountCard(page);
    await openCalibration(page);
    await page.evaluate(() => {
      const pt = { x: 1, y: 1 };
      (window as any).__card._floorCalib = {
        phase: "raw",
        rawPts: [pt, pt, pt, pt, pt, pt], // 6 = FLOOR_CALIB_MAX_PAIRS
        floorPts: [pt, pt, pt, pt, pt, pt],
      };
    });
    await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const inset = host.shadowRoot.querySelector(".floor-calib-inset") as HTMLElement;
      const r = inset.getBoundingClientRect();
      card._floorCalibRawClick({ currentTarget: inset, clientX: r.left + 5, clientY: r.top + 5 } as any);
    });
    const s = await calibState(page);
    expect(s.rawPts.length).toBe(6);
  });
});
