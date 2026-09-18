import { test, expect, type Page } from "@playwright/test";

/**
 * Align mode (docs/41), C2b coverage — the six checks docs/41 §7 names for
 * `tests/align-overlay.spec.ts`: open, portal-on-body, drag → expected Δ,
 * Save payload 1:1, override precedence, Reset, disabled Save without the
 * `anyvac.set_floorplan_seat` service.
 *
 * Writing the drag test is what caught a real C2a bug: `_alignPointToWrapPct`
 * queried `this.renderRoot` (the card's OWN shadow root) for `.align-scene`,
 * but the overlay renders into the `_alignHost` PORTAL's shadow root
 * (docs/41 §4.1) — so the query always missed, every gesture silently
 * no-opped, and nothing before this test exercised the actual pointer path
 * end-to-end. Fixed in the same C2b batch as this file (see anyvac-card.ts,
 * `_alignPointToWrapPct`).
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
  /** `floorplan_seats` attribute to publish on the integration sensor
   *  (docs/41 §4.6 store shape) — omitted means no backend override. */
  floorplanSeats?: Record<string, unknown>;
  /** Card-authored manual seat on the vacuum, before any override. */
  manualMap?: { rotation: number; scale: number; offset_x: number; offset_y: number };
  /** Omit `anyvac.set_floorplan_seat` from `hass.services` (docs/41 §4.8
   *  integration < 2.0.0 degradation — Save disabled, Copy YAML still works). */
  withService?: boolean;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { floorplanSeats, manualMap, withService = true } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ FLOORPLAN_SVG, MAP_SVG, floorplanSeats, manualMap, withService }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: "split",
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            map: { entity: "image.my_roborock_map", ...(manualMap ? { ...manualMap, seat: "manual" } : {}) },
            image_base: { src: FLOORPLAN_SVG },
            base: "map",
            rooms: [],
          },
        ],
      });
      const now = new Date().toISOString();
      card.hass = {
        states: {
          "vacuum.my_roborock": {
            entity_id: "vacuum.my_roborock",
            state: "docked",
            attributes: { friendly_name: "Roborock" },
            last_changed: now,
            last_updated: now,
          },
          "image.my_roborock_map": {
            entity_id: "image.my_roborock_map",
            state: now,
            attributes: { entity_picture: MAP_SVG },
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
        // docs/41 §4.6 gating: `hass.services.anyvac?.set_floorplan_seat`.
        services: withService ? { anyvac: { set_floorplan_seat: {} } } : {},
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
    { FLOORPLAN_SVG, MAP_SVG, floorplanSeats, manualMap, withService }
  );
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete,
    null,
    { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Opens Align mode for the (only) configured vacuum and waits for the
 *  portal to mount + render. */
async function openAlign(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._openAlign(card._config.vacuums[0]);
    await card.updateComplete;
  });
  await page.waitForFunction(
    () => !!(document.querySelector("anyvac-align-overlay") as any)?.shadowRoot?.querySelector(".align-overlay")
  );
}

function session(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._alignSession);
}

test.describe("Align mode overlay (docs/41, C2b)", () => {
  test("opening Align mode mounts the overlay as a portal on document.body", async ({ page }) => {
    await mountCard(page);
    // Not open yet — no portal.
    expect(await page.evaluate(() => !!document.querySelector("anyvac-align-overlay"))).toBe(false);

    await openAlign(page);

    const info = await page.evaluate(() => {
      const host = document.querySelector("anyvac-align-overlay");
      return {
        onBody: host?.parentElement === document.body,
        hasOverlay: !!host?.shadowRoot?.querySelector(".align-overlay"),
        hasToolbar: !!host?.shadowRoot?.querySelector(".align-toolbar"),
        hasSidePanel: !!host?.shadowRoot?.querySelector(".align-side-panel"),
      };
    });
    expect(info.onBody).toBe(true);
    expect(info.hasOverlay).toBe(true);
    expect(info.hasToolbar).toBe(true);
    expect(info.hasSidePanel).toBe(true);
  });

  test("a drag on the seat layer moves the draft by the expected Δ (wrap %)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);
    const before = await session(page);
    expect(before.draft.offset_x).toBe(before.start.offset_x);
    expect(before.draft.offset_y).toBe(before.start.offset_y);

    const dxPx = 37, dyPx = -21;
    const result = await page.evaluate(
      ({ dxPx, dyPx }) => {
        const card = (window as any).__card;
        const host = document.querySelector("anyvac-align-overlay") as any;
        const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
        const layer = host.shadowRoot.querySelector(".align-seat-layer") as any;
        layer.setPointerCapture = () => {};
        const r = scene.getBoundingClientRect();
        const x0 = r.left + r.width * 0.5, y0 = r.top + r.height * 0.5;
        const ev = (x: number, y: number) => ({
          currentTarget: layer, clientX: x, clientY: y, pointerId: 1,
          stopPropagation: () => {}, preventDefault: () => {},
        } as any);
        card._alignStartGesture(ev(x0, y0), "drag");
        card._alignGestureMove(ev(x0 + dxPx, y0 + dyPx));
        card._alignGestureEnd(ev(x0 + dxPx, y0 + dyPx));
        return { sceneW: scene.offsetWidth, sceneH: scene.offsetHeight };
      },
      { dxPx, dyPx }
    );
    const after = await session(page);
    const expectedDx = (dxPx / result.sceneW) * 100;
    const expectedDy = (dyPx / result.sceneH) * 100;
    expect(after.draft.offset_x - before.start.offset_x).toBeCloseTo(expectedDx, 1);
    expect(after.draft.offset_y - before.start.offset_y).toBeCloseTo(expectedDy, 1);
    // Rotation/scale untouched by a pure drag.
    expect(after.draft.rotation).toBe(before.start.rotation);
    expect(after.draft.scale).toBe(before.start.scale);
    // One history entry pushed for the whole gesture, not per pointermove.
    expect(after.history.length).toBe(before.history.length + 1);
  });

  test("Save sends the draft 1:1 as the map payload, rounded to 0.01", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      const s = card._alignSession;
      card._alignSession = {
        ...s,
        draft: { rotation: 12.3456, scale: 143.21, offset_x: -2.5001, offset_y: 4.999 },
      };
    });
    await page.evaluate(async () => {
      const card = (window as any).__card;
      await card._alignSave();
    });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls.length).toBe(1);
    expect(calls[0].domain).toBe("anyvac");
    expect(calls[0].service).toBe("set_floorplan_seat");
    expect(calls[0].data.vacuum).toBe("vacuum.my_roborock");
    expect(calls[0].data.map).toEqual({
      rotation: 12.35, scale: 143.21, offset_x: -2.5, offset_y: 5,
    });
    // A successful Save closes the session (docs/41 §4.4).
    expect(await session(page)).toBeNull();
  });

  test("a backend floorplan_seats override wins over the card's own manual seat", async ({ page }) => {
    await mountCard(page, {
      manualMap: { rotation: 10, scale: 100, offset_x: 0, offset_y: 0 },
      floorplanSeats: {
        [FLOORPLAN_SVG]: {
          vacuums: {
            "vacuum.my_roborock": { rotation: 42, scale: 150, offset_x: 5, offset_y: -3 },
          },
        },
      },
    });
    // Precedence (docs/41 §4.6): override > config manual > auto — reflected
    // in the merged `_config` before Align mode is even opened.
    const merged = await page.evaluate(() => (window as any).__card._config.vacuums[0].map);
    expect(merged.rotation).toBe(42);
    expect(merged.scale).toBe(150);

    // And Align mode's `start`/`draft` are captured from that SAME merged
    // (effective) seat — docs/41 risk #5, `_openAlign` reads `_effectiveSeat`
    // exactly once.
    await openAlign(page);
    const s = await session(page);
    expect(s.start).toEqual({ rotation: 42, scale: 150, scaleY: undefined, offset_x: 5, offset_y: -3 });
    expect(s.draft).toEqual(s.start);
  });

  test("Reset restores the draft to the values the session was opened with", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      const s = card._alignSession;
      card._alignSession = { ...s, draft: { ...s.draft, rotation: 77, offset_x: 12.5 } };
    });
    let s = await session(page);
    expect(s.draft.rotation).toBe(77);
    expect(s.draft).not.toEqual(s.start);

    await page.evaluate(() => (window as any).__card._alignReset());
    s = await session(page);
    expect(s.draft).toEqual(s.start);
  });

  test("Save is disabled (and a no-op) without anyvac.set_floorplan_seat", async ({ page }) => {
    await mountCard(page, { withService: false });
    await openAlign(page);

    expect(await page.evaluate(() => (window as any).__card._alignServiceAvailable())).toBe(false);

    const btnDisabled = await page.evaluate(() => {
      const host = document.querySelector("anyvac-align-overlay") as any;
      const btn = host.shadowRoot.querySelector(".align-save-btn") as HTMLButtonElement;
      return btn?.disabled;
    });
    expect(btnDisabled).toBe(true);

    await page.evaluate(async () => { await (window as any).__card._alignSave(); });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls.length).toBe(0);
    // Copy YAML keeps working regardless (docs/41 §4.8 — P3 always present).
    expect(await page.evaluate(() => typeof (window as any).__card._alignCopyYaml)).toBe("function");
  });

  test("layer opacity sliders default to 100% and drive the floorplan/raw-map <img> opacity live, without touching undo history", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    const before = await session(page);
    expect(before.layers.floor).toBe(1);
    expect(before.layers.rawMap).toBe(1);

    const opacities = await page.evaluate(() => {
      const h = document.querySelector("anyvac-align-overlay") as any;
      const fp = h.shadowRoot.querySelector(".align-floorplan-img") as HTMLElement;
      const rm = h.shadowRoot.querySelector(".align-seat-img") as HTMLElement;
      return { floor: fp.style.opacity, rawMap: rm.style.opacity };
    });
    expect(opacities.floor).toBe("1");
    expect(opacities.rawMap).toBe("1");

    // Dragging the "Vacuum map" slider to 40% updates layers.rawMap and the
    // <img>'s live opacity — but must NOT push a history entry (docs/41
    // §4.2: layers are a view-only preference, not an undoable seat edit).
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._alignSetLayerOpacity("rawMap", "40");
    });
    const after = await session(page);
    expect(after.layers.rawMap).toBeCloseTo(0.4, 5);
    expect(after.layers.floor).toBe(1);
    expect(after.history.length).toBe(before.history.length);
    expect(after.draft).toEqual(before.draft);

    const rmOpacityAfter = await page.evaluate(() => {
      const h = document.querySelector("anyvac-align-overlay") as any;
      return (h.shadowRoot.querySelector(".align-seat-img") as HTMLElement).style.opacity;
    });
    expect(rmOpacityAfter).toBe("0.4");
  });

  test("the four side handles (top/bottom/left/right) render with the correct data-side attributes", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);
    const sides = await page.evaluate(() => {
      const host = document.querySelector("anyvac-align-overlay") as any;
      return [...host.shadowRoot.querySelectorAll(".align-handle--side")]
        .map((el: any) => el.dataset.side).sort();
    });
    expect(sides).toEqual(["e", "n", "s", "w"]);
  });

  test("corner-handle scale stays uniform (scaleY undefined) with Independent Y off, but goes independent once it's on (field report 2026-09-18)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    // Independent Y off (default) — a corner "scale" gesture must not set scaleY.
    await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-align-overlay") as any;
      const layer = host.shadowRoot.querySelector(".align-seat-layer") as any;
      layer.setPointerCapture = () => {};
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const r = scene.getBoundingClientRect();
      const x0 = r.left + r.width * 0.9, y0 = r.top + r.height * 0.9;
      const ev = (x: number, y: number) => ({
        currentTarget: layer, clientX: x, clientY: y, pointerId: 1,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      card._alignStartGesture(ev(x0, y0), "scale", { x: 10, y: 10 });
      card._alignGestureMove(ev(x0 + 15, y0 + 30));
      card._alignGestureEnd(ev(x0 + 15, y0 + 30));
    });
    let s = await session(page);
    expect(s.draft.scaleY).toBeUndefined();
    expect(s.draft.scale).not.toBeCloseTo(s.start.scale, 6);

    // Turn Independent Y on (freezes scaleY from the current scale) and repeat
    // an asymmetric corner drag — scale and scaleY must now move by different
    // ratios instead of staying locked together.
    await page.evaluate(() => (window as any).__card._alignToggleScaleY(true));
    s = await session(page);
    expect(s.draft.scaleY).not.toBeUndefined();

    await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-align-overlay") as any;
      const layer = host.shadowRoot.querySelector(".align-seat-layer") as any;
      layer.setPointerCapture = () => {};
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const r = scene.getBoundingClientRect();
      const x0 = r.left + r.width * 0.9, y0 = r.top + r.height * 0.9;
      const ev = (x: number, y: number) => ({
        currentTarget: layer, clientX: x, clientY: y, pointerId: 2,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      card._alignStartGesture(ev(x0, y0), "scale", { x: 10, y: 10 });
      card._alignGestureMove(ev(x0 + 60, y0 + 5));
      card._alignGestureEnd(ev(x0 + 60, y0 + 5));
    });
    const after = await session(page);
    const scaleRatio = after.draft.scale / s.draft.scale;
    const scaleYRatio = after.draft.scaleY / s.draft.scaleY;
    expect(Math.abs(scaleRatio - scaleYRatio)).toBeGreaterThan(0.05);
  });

  test("a drag on the top side handle stretches scaleY only (offset and scale untouched) and enables Independent Y", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);
    const before = await session(page);
    expect(before.draft.scaleY).toBeUndefined();

    await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-align-overlay") as any;
      const nHandle = host.shadowRoot.querySelector('.align-handle--side[data-side="n"]') as any;
      nHandle.setPointerCapture = () => {};
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const r = scene.getBoundingClientRect();
      const cx = r.left + r.width * 0.5, cy = r.top + r.height * 0.5;
      const ev = (x: number, y: number) => ({
        currentTarget: nHandle, clientX: x, clientY: y, pointerId: 3,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      // Start on the local Y axis above centre, drag further away (bigger
      // |y - centre|) -> scaleY grows, scale/offset stay put.
      card._alignStartGesture(ev(cx, cy - 20), "stretchY");
      card._alignGestureMove(ev(cx, cy - 40));
      card._alignGestureEnd(ev(cx, cy - 40));
    });
    const after = await session(page);
    expect(after.draft.scaleY).not.toBeUndefined();
    expect(after.draft.scaleY!).toBeGreaterThan(after.draft.scale);
    expect(after.draft.scale).toBeCloseTo(before.draft.scale, 6);
    expect(after.draft.offset_x).toBeCloseTo(before.draft.offset_x, 6);
    expect(after.draft.offset_y).toBeCloseTo(before.draft.offset_y, 6);
  });
});
