import { test, expect, type Page } from "@playwright/test";

/**
 * docs/41 follow-up (1.13.0) — the editor's Maps-tab seat controls used to
 * be completely blind to a live backend `floorplan_seats` override: its own
 * preview/fit hint read raw YAML (`_editorSeat` → `this._config` directly),
 * and its sliders/"Finish calibration" always wrote straight back to YAML,
 * even though `applyFloorplanSeats` makes a backend override win over YAML
 * UNCONDITIONALLY at render time (the card's own `_syncEffectiveConfig`).
 * So a value set in the editor could be instantly and silently shadowed by
 * the backend, with nothing in the UI explaining why.
 *
 * This file covers the fix: `_editorSeat`/`_effectiveConfig` now resolve
 * against the override-merged config (read side), and `_commitSeat` now
 * redirects the sliders' commit + `_finishCalibration` to
 * `anyvac.set_floorplan_seat` when it's registered, stripping the stale
 * YAML geometry fields once that write succeeds (write side) — see
 * `editor.ts`'s own doc comments on each for the full reasoning.
 *
 * Exercises the editor's private methods directly (`editor._xxx`), same
 * convention `align-overlay.spec.ts` uses for the card — the Maps tab's
 * slider DOM itself is exercised indirectly through `_numberSlider`'s own
 * `onCommit` plumbing, which these methods sit behind.
 */

const FLOORPLAN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>" +
      "<rect width='800' height='400' fill='#eee'/></svg>"
  );

interface MountOpts {
  /** `floorplan_seats` attribute to publish on the integration sensor
   *  (docs/41 §4.6 store shape) — omitted means no backend override. */
  floorplanSeats?: Record<string, unknown>;
  /** Card-authored manual seat on the vacuum, before any override. */
  manualMap?: { rotation: number; scale: number; offset_x: number; offset_y: number; scale_y?: number };
  /** A "map image entity" override, unrelated to seat geometry (docs/38
   *  §4.1) — should survive a geometry strip, unlike the geometry fields. */
  mapEntity?: string;
  /** Omit `anyvac.set_floorplan_seat` from `hass.services`. */
  withService?: boolean;
}

async function mountEditor(page: Page, opts: MountOpts = {}): Promise<void> {
  const { floorplanSeats, manualMap, mapEntity, withService = true } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card-editor");
  });
  await page.evaluate(
    ({ FLOORPLAN_SVG, floorplanSeats, manualMap, mapEntity, withService }) => {
      const w = window as any;
      w.__calls = [];
      w.__fired = [];
      const editor = document.createElement("anyvac-card-editor") as any;
      editor.setConfig({
        type: "custom:anyvac-card",
        map_mode: "split",
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            map: { ...(mapEntity ? { entity: mapEntity } : {}), ...(manualMap ? { ...manualMap, seat: "manual" } : {}) },
            image_base: { src: FLOORPLAN_SVG },
            base: "map",
            rooms: [],
          },
        ],
      });
      const now = new Date().toISOString();
      editor.hass = {
        states: {
          "vacuum.my_roborock": {
            entity_id: "vacuum.my_roborock",
            state: "docked",
            attributes: { friendly_name: "Roborock" },
            last_changed: now,
            last_updated: now,
          },
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock",
            state: "0",
            attributes: {
              schema_version: 2,
              image_dims: { top: 0, left: 0, width: 100, height: 400, scale: 4, rotation: 0 },
              vacuum_position_px: { x: 200, y: 800, a: 0 },
              rooms: [],
              ...(floorplanSeats ? { floorplan_seats: floorplanSeats } : {}),
            },
            last_changed: now,
            last_updated: now,
          },
        },
        services: withService ? { anyvac: { set_floorplan_seat: {} } } : {},
        hassUrl: (path: string) => path,
        localize: (k: string) => k,
        language: "en",
        callService: async (domain: string, service: string, data: unknown) => {
          w.__calls.push({ domain, service, data });
        },
        callWS: async () => ({}),
      };
      editor.addEventListener("config-changed", (e: any) => { w.__fired.push(e.detail.config); });
      document.body.appendChild(editor);
      w.__editor = editor;
    },
    { FLOORPLAN_SVG, floorplanSeats, manualMap, mapEntity, withService }
  );
  await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
}

test.describe("editor: backend-aware seat sync (docs/41 follow-up, 1.13.0)", () => {
  test("_editorSeat reads the raw YAML manual seat when no backend override exists", async ({ page }) => {
    await mountEditor(page, { manualMap: { rotation: 90, scale: 150, offset_x: 5, offset_y: -5 } });
    const seat = await page.evaluate(() => (window as any).__editor._editorSeat(0));
    expect(seat.auto).toBe(false);
    expect(seat.rotation).toBe(90);
    expect(seat.scale).toBe(150);
    expect(seat.offset_x).toBe(5);
    expect(seat.offset_y).toBe(-5);
  });

  test("_editorSeat prefers a live backend override over the raw YAML manual seat", async ({ page }) => {
    await mountEditor(page, {
      manualMap: { rotation: 90, scale: 150, offset_x: 5, offset_y: -5 },
      floorplanSeats: {
        [FLOORPLAN_SVG]: {
          vacuums: {
            "vacuum.my_roborock": { rotation: 180, scale: 80, offset_x: 12, offset_y: 3 },
          },
        },
      },
    });
    const seat = await page.evaluate(() => (window as any).__editor._editorSeat(0));
    // Backend values win, not the YAML ones passed at mount — this is exactly
    // the mismatch the editor used to be blind to.
    expect(seat.auto).toBe(false);
    expect(seat.rotation).toBe(180);
    expect(seat.scale).toBe(80);
    expect(seat.offset_x).toBe(12);
    expect(seat.offset_y).toBe(3);
  });

  test("_hasBackendSeat is true only when this vacuum has a live override on its own floorplan", async ({ page }) => {
    await mountEditor(page, {
      floorplanSeats: {
        [FLOORPLAN_SVG]: { vacuums: { "vacuum.my_roborock": { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 } } },
      },
    });
    expect(await page.evaluate(() => (window as any).__editor._hasBackendSeat(0))).toBe(true);

    await mountEditor(page, {
      floorplanSeats: {
        [FLOORPLAN_SVG]: { vacuums: { "vacuum.someone_else": { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 } } },
      },
    });
    expect(await page.evaluate(() => (window as any).__editor._hasBackendSeat(0))).toBe(false);

    await mountEditor(page, {});
    expect(await page.evaluate(() => (window as any).__editor._hasBackendSeat(0))).toBe(false);
  });

  test("_commitSeat writes to the backend service and strips the YAML geometry once it succeeds", async ({ page }) => {
    await mountEditor(page, {
      manualMap: { rotation: 45, scale: 120, offset_x: 1, offset_y: 2, scale_y: 130 },
      mapEntity: "image.my_roborock_map",
    });
    await page.evaluate(async () => {
      const editor = (window as any).__editor;
      await editor._commitSeat(0, { rotation: 33, scale: 90, offset_x: -4, offset_y: 6, scale_y: 95 });
    });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({
      domain: "anyvac",
      service: "set_floorplan_seat",
      data: {
        floorplan: FLOORPLAN_SVG,
        vacuum: "vacuum.my_roborock",
        map: { rotation: 33, scale: 90, offset_x: -4, offset_y: 6, scale_y: 95 },
      },
    });
    const editorState = await page.evaluate(() => {
      const editor = (window as any).__editor;
      return { map: editor._config.vacuums[0].map, error: editor._seatSaveError, fired: (window as any).__fired.length };
    });
    // Geometry stripped, `map.entity` (the unrelated map-image-entity
    // override) kept, no lingering error, and the strip went out as a
    // config-changed event (so the outer dialog's Save picks it up too).
    expect(editorState.map).toEqual({ entity: "image.my_roborock_map" });
    expect(editorState.error).toBe("");
    expect(editorState.fired).toBeGreaterThan(0);
  });

  test("_commitSeat drops the whole map: block when nothing but geometry was in it", async ({ page }) => {
    await mountEditor(page, { manualMap: { rotation: 45, scale: 120, offset_x: 1, offset_y: 2 } });
    await page.evaluate(async () => {
      await (window as any).__editor._commitSeat(0, { rotation: 10, scale: 100, offset_x: 0, offset_y: 0 });
    });
    const map = await page.evaluate(() => (window as any).__editor._config.vacuums[0].map);
    expect(map).toBeUndefined();
  });

  test("_commitSeat leaves YAML untouched and sets an error when the backend call fails — no silent fallback", async ({ page }) => {
    await mountEditor(page, { manualMap: { rotation: 45, scale: 120, offset_x: 1, offset_y: 2 } });
    await page.evaluate(() => {
      const editor = (window as any).__editor;
      editor.hass = { ...editor.hass, callService: async () => { throw new Error("boom"); } };
    });
    await page.evaluate(async () => {
      await (window as any).__editor._commitSeat(0, { rotation: 10, scale: 100, offset_x: 0, offset_y: 0 });
    });
    const state = await page.evaluate(() => {
      const editor = (window as any).__editor;
      return { map: editor._config.vacuums[0].map, error: editor._seatSaveError };
    });
    // The pre-existing manual YAML values are exactly as mounted — the failed
    // backend attempt never touched them.
    expect(state.map).toEqual({ rotation: 45, scale: 120, offset_x: 1, offset_y: 2, seat: "manual" });
    expect(state.error).not.toBe("");
  });

  test("_commitSeat falls back to a direct YAML write when the backend service isn't registered", async ({ page }) => {
    await mountEditor(page, { withService: false });
    await page.evaluate(async () => {
      await (window as any).__editor._commitSeat(0, { rotation: 77, scale: 60, offset_x: 8, offset_y: -8 });
    });
    const state = await page.evaluate(() => {
      const editor = (window as any).__editor;
      return { map: editor._config.vacuums[0].map, calls: (window as any).__calls.length };
    });
    expect(state.calls).toBe(0);
    expect(state.map).toMatchObject({ rotation: 77, scale: 60, offset_x: 8, offset_y: -8 });
    // Slider commits don't force `seat: "manual"` (matches the pre-1.13.0
    // behavior of the plain per-field YAML write) unless asked to.
    expect(state.map.seat).toBeUndefined();
  });

  test("_commitSeat's forceManualYaml option (used by calibration) sets seat: manual in the YAML fallback", async ({ page }) => {
    await mountEditor(page, { withService: false });
    await page.evaluate(async () => {
      await (window as any).__editor._commitSeat(
        0, { rotation: 77, scale: 60, offset_x: 8, offset_y: -8 }, { forceManualYaml: true },
      );
    });
    const seat = await page.evaluate(() => (window as any).__editor._config.vacuums[0].map.seat);
    expect(seat).toBe("manual");
  });

  test("_finishCalibration redirects to the backend when the service is available", async ({ page }) => {
    await mountEditor(page, { mapEntity: "image.my_roborock_map" });
    await page.evaluate(() => {
      const editor = (window as any).__editor;
      // Known seat + forward-projected click pairs (mirrors
      // seatfit-calibration.spec.ts's own `forwardPoint` helper) so the
      // solved fit is deterministic.
      const dims = { NW: 1200, NH: 900 };
      const ar = editor._editorAR();
      const knownSeat = { rotation: 90, scale: 140, offset_x: 2, offset_y: -3 };
      const forwardPoint = (rawPx: { x: number; y: number }) => {
        const q = { x: (rawPx.x - dims.NW / 2) / dims.NW, y: (rawPx.y - dims.NH / 2) / dims.NW };
        const s = knownSeat.scale / 100;
        const theta = (knownSeat.rotation * Math.PI) / 180;
        const cos = Math.cos(theta), sin = Math.sin(theta);
        const c = { x: (50 + knownSeat.offset_x) / 100, y: (50 + knownSeat.offset_y) / 100 / ar };
        const u = { x: c.x + s * (cos * q.x - sin * q.y), y: c.y + s * (sin * q.x + cos * q.y) };
        return { x: u.x * 100, y: u.y * ar * 100 };
      };
      const rawPts = [{ x: 400, y: 300 }, { x: 900, y: 700 }];
      const floorPts = rawPts.map(forwardPoint);
      editor._refNat = { w: dims.NW, h: dims.NH };
      editor._calib = { vacIdx: 0, phase: "raw", rawPts, floorPts };
      editor._finishCalibration();
    });
    // The backend call is fired inside an async `_commitSeat` that
    // `_finishCalibration` doesn't await — give its microtask a tick.
    await page.waitForFunction(() => (window as any).__calls?.length > 0);
    const result = await page.evaluate(() => {
      const editor = (window as any).__editor;
      return { calls: (window as any).__calls, calibResult: editor._calibResult, map: editor._config.vacuums[0].map };
    });
    expect(result.calls).toHaveLength(1);
    expect(result.calls[0].service).toBe("set_floorplan_seat");
    expect(result.calls[0].data.map.rotation).toBe(90);
    expect(result.calls[0].data.map.scale).toBeCloseTo(140, 1);
    expect(result.calibResult?.residual_pct).toBeLessThan(1);
    // Stripped down to just the map-image-entity override once the backend
    // write succeeded.
    expect(result.map).toEqual({ entity: "image.my_roborock_map" });
  });
});
