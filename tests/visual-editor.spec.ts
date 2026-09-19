import { test, expect, type Page } from "@playwright/test";

/**
 * Visual editor / Seat & Appearance tool (docs/41, docs/42 §9 fáze H) —
 * the six checks docs/41 §7 originally named for this file (as
 * `align-overlay.spec.ts`, renamed docs/42 §8 bod 2): open, portal-on-body,
 * drag → expected Δ, Save payload 1:1 (now map AND appearance), override
 * precedence (now the nested `{map, appearance}` per-vacuum shape,
 * docs/42 §9 fáze pre-H), Reset, disabled Save without the
 * `anyvac.set_floorplan_seat` service. Tool-switcher/localStorage coverage
 * for the OTHER two tools lives in `visual-editor-tool.spec.ts` instead —
 * this file stays scoped to the Seat & Appearance tool's own behaviour.
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
    () => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot?.querySelector(".align-overlay")
  );
}

function session(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._alignSession);
}

test.describe("Align mode overlay (docs/41, C2b)", () => {
  test("opening Align mode mounts the overlay as a portal on document.body", async ({ page }) => {
    await mountCard(page);
    // Not open yet — no portal.
    expect(await page.evaluate(() => !!document.querySelector("anyvac-visual-editor"))).toBe(false);

    await openAlign(page);

    const info = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor");
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
        const host = document.querySelector("anyvac-visual-editor") as any;
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
    // docs/42 §8 bod 3 "no sentinel": appearance is ALWAYS sent alongside
    // map, defaulted (no override existed yet, so this is
    // `effectiveAppearance`'s own default table).
    expect(calls[0].data.appearance).toEqual({
      hide_map: false, overlay_opacity: 55, overlay_blend: "normal",
      path_color: null, path_width: 100, mop_path_color: null,
      mop_band_opacity: 28, mop_band_width: 100,
      robot_image_on_map: false, robot_size: 100, robot_image_rotation: 0,
    });
    // A successful Save closes the session (docs/41 §4.4).
    expect(await session(page)).toBeNull();
  });

  test("Save resends an existing appearance override unchanged when only the seat moved", async ({ page }) => {
    await mountCard(page, {
      floorplanSeats: {
        [FLOORPLAN_SVG]: {
          vacuums: {
            "vacuum.my_roborock": {
              appearance: { path_color: "#4fc3f7", overlay_opacity: 80 },
            },
          },
        },
      },
    });
    await openAlign(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      const s = card._alignSession;
      card._alignSession = { ...s, draft: { ...s.draft, rotation: 45 } };
    });
    await page.evaluate(async () => { await (window as any).__card._alignSave(); });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls[0].data.appearance.path_color).toBe("#4fc3f7");
    expect(calls[0].data.appearance.overlay_opacity).toBe(80);
  });

  test("a backend floorplan_seats override wins over the card's own manual seat", async ({ page }) => {
    await mountCard(page, {
      manualMap: { rotation: 10, scale: 100, offset_x: 0, offset_y: 0 },
      floorplanSeats: {
        [FLOORPLAN_SVG]: {
          vacuums: {
            "vacuum.my_roborock": { map: { rotation: 42, scale: 150, offset_x: 5, offset_y: -3 } },
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
      const host = document.querySelector("anyvac-visual-editor") as any;
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
      const h = document.querySelector("anyvac-visual-editor") as any;
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
      const h = document.querySelector("anyvac-visual-editor") as any;
      return (h.shadowRoot.querySelector(".align-seat-img") as HTMLElement).style.opacity;
    });
    expect(rmOpacityAfter).toBe("0.4");
  });

  test("the four side handles (top/bottom/left/right) render with the correct data-side attributes", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);
    const sides = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
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
      const host = document.querySelector("anyvac-visual-editor") as any;
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
      const host = document.querySelector("anyvac-visual-editor") as any;
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
      const host = document.querySelector("anyvac-visual-editor") as any;
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

  test("a focused side-panel field defers only the arrow keys to its own native behavior — ,/.[ ] still nudge the seat (field report 2026-09-18)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);
    const before = await session(page);

    const after = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const rangeInput = host.shadowRoot.querySelector('input[type="range"]') as HTMLInputElement;
      rangeInput.focus();
      // Arrow key: deferred to the field (its own native slider-step
      // behavior) — must NOT nudge the seat.
      rangeInput.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true }));
      // "," has no native meaning in a range input — still reaches the
      // gizmo's scale-nudge even though the field is focused.
      rangeInput.dispatchEvent(new KeyboardEvent("keydown", { key: ",", bubbles: true, cancelable: true }));
      return (window as any).__card._alignSession;
    });
    expect(after.draft.offset_x).toBeCloseTo(before.draft.offset_x, 6);
    expect(after.draft.scale).toBeLessThan(before.draft.scale);
  });

  test("starting a canvas/gizmo gesture returns keyboard focus to the overlay even when a side-panel field was focused (field report 2026-09-18)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    const stillOnInput = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const rangeInput = host.shadowRoot.querySelector('input[type="range"]') as HTMLInputElement;
      rangeInput.focus();
      return host.shadowRoot.activeElement === rangeInput;
    });
    expect(stillOnInput).toBe(true);

    const refocused = await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const layer = host.shadowRoot.querySelector(".align-seat-layer") as any;
      layer.setPointerCapture = () => {};
      const ev = {
        currentTarget: layer, clientX: 10, clientY: 10, pointerId: 9,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any;
      card._alignStartGesture(ev, "drag");
      const overlayRoot = host.shadowRoot.querySelector(".align-overlay");
      return host.shadowRoot.activeElement === overlayRoot;
    });
    expect(refocused).toBe(true);
  });

  test("side-handle arrow icons and cursors rotate with the seat, and Offset X/Y get their own wrap-aligned hint arrows (field report 2026-09-18)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    // Unrotated (rotation 0): W/E (Scale X) handles read as horizontal
    // drag, N/S (Scale Y) as vertical — matching their baseline icons.
    let info = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const w = host.shadowRoot.querySelector('.align-handle--side[data-side="w"]') as HTMLElement;
      const n = host.shadowRoot.querySelector('.align-handle--side[data-side="n"]') as HTMLElement;
      return {
        wCursor: w.style.cursor,
        nCursor: n.style.cursor,
        wIconRotate: (w.querySelector("ha-icon") as HTMLElement).style.transform,
      };
    });
    expect(info.wCursor).toBe("ew-resize");
    expect(info.nCursor).toBe("ns-resize");
    expect(info.wIconRotate).toBe("rotate(0deg)");

    // Offset X/Y hint arrows exist, sit near centre, and are NOT rotated by
    // the seat (offset_x/offset_y are wrap-aligned, not seat-local).
    const hints = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const x = host.shadowRoot.querySelector(".align-axis-hint--x") as HTMLElement;
      const y = host.shadowRoot.querySelector(".align-axis-hint--y") as HTMLElement;
      return { xIcon: !!x?.querySelector("ha-icon"), yIcon: !!y?.querySelector("ha-icon") };
    });
    expect(hints.xIcon).toBe(true);
    expect(hints.yIcon).toBe(true);

    // Rotate the seat 90° -> the "Scale X" (w/e) handles now read as a
    // vertical drag on screen, so their cursor/icon must follow.
    await page.evaluate(() => {
      const card = (window as any).__card;
      const s = card._alignSession;
      card._alignSession = { ...s, draft: { ...s.draft, rotation: 90 } };
    });
    info = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const w = host.shadowRoot.querySelector('.align-handle--side[data-side="w"]') as HTMLElement;
      const xHint = host.shadowRoot.querySelector(".align-axis-hint--x ha-icon") as HTMLElement;
      return { wCursor: w.style.cursor, wIconRotate: (w.querySelector("ha-icon") as HTMLElement).style.transform, xHintRotate: xHint.style.transform };
    });
    expect(info.wCursor).toBe("ns-resize");
    expect(info.wIconRotate).toBe("rotate(90deg)");
    expect(info.xHintRotate).toBe(""); // offset hint stays wrap-aligned, no rotate transform
  });

  test("side-handle cursor also accounts for the separate view rotation, not just the seat's own rotation (field report 2026-09-18 follow-up)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    // Seat unrotated, view unrotated: baseline, as in the previous test.
    let wCursor = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const w = host.shadowRoot.querySelector('.align-handle--side[data-side="w"]') as HTMLElement;
      return w.style.cursor;
    });
    expect(wCursor).toBe("ew-resize");

    // Seat still unrotated, but the "Rotate view 90°" toolbar button was
    // used (_alignView.rot, a purely screen-side rotation of the whole
    // .align-scene, entirely separate from the seat's own draft.rotation).
    // On screen the W handle now reads as a vertical drag, so its cursor
    // must follow the VIEW rotation too, exactly as nudgeOffset() already
    // does for keyboard arrow nudges.
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._alignView = { ...card._alignView, rot: 90 };
    });
    wCursor = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const w = host.shadowRoot.querySelector('.align-handle--side[data-side="w"]') as HTMLElement;
      return w.style.cursor;
    });
    expect(wCursor).toBe("ns-resize");

    // Seat rotation and view rotation combine: 90° seat + 90° view = 180°,
    // which is back to the horizontal bucket (180 mod 180 === 0).
    await page.evaluate(() => {
      const card = (window as any).__card;
      const s = card._alignSession;
      card._alignSession = { ...s, draft: { ...s.draft, rotation: 90 } };
    });
    wCursor = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const w = host.shadowRoot.querySelector('.align-handle--side[data-side="w"]') as HTMLElement;
      return w.style.cursor;
    });
    expect(wCursor).toBe("ew-resize");
  });
  test("side-panel field labels carry a rotation-aware arrow instead of a fixed X/Y letter (field report 2026-09-19)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    // Independent Y scale must be on for the axis-specific "Scale" rows
    // (with arrows) to exist at all -- baseline "Scale" (uniform, no
    // scaleY) intentionally carries no arrow, there's no single axis to
    // point at.
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._alignToggleScaleY(true);
    });

    const readArrows = () => page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const rows = [...host.shadowRoot.querySelectorAll(".align-field-row")];
      const byLabelText = (want: string) => rows.find(
        (r: any) => (r.querySelector("label")?.textContent ?? "").trim().startsWith(want),
      );
      const arrowRotate = (row: any) => {
        const icon = row?.querySelector(".align-field-arrow");
        return icon ? icon.style.transform : null;
      };
      return {
        scaleX: arrowRotate(byLabelText("Scale")), // first "Scale" row = X
        offsetX: arrowRotate(byLabelText("Offset")),
      };
    });

    // Rotation 0, view 0: Scale (X) and Offset (X) arrows both point along
    // 0deg -- no rotation applied.
    let a = await readArrows();
    expect(a.scaleX).toBe("rotate(0deg)");
    expect(a.offsetX).toBe("rotate(0deg)");

    // Seat rotation 90deg, view still 0: Scale X's arrow follows the SEAT
    // (it's a local axis) -> rotate(90deg). Offset X is wrap-relative, not
    // seat-rotated -> stays at rotate(0deg).
    await page.evaluate(() => {
      const card = (window as any).__card;
      const s = card._alignSession;
      card._alignSession = { ...s, draft: { ...s.draft, rotation: 90 } };
    });
    a = await readArrows();
    expect(a.scaleX).toBe("rotate(90deg)");
    expect(a.offsetX).toBe("rotate(0deg)");

    // Also rotate the VIEW 90deg: Scale X now carries BOTH (seat 90 + view
    // 90 = 180), Offset X carries just the view (90).
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._alignView = { ...card._alignView, rot: 90 };
    });
    a = await readArrows();
    expect(a.scaleX).toBe("rotate(180deg)");
    expect(a.offsetX).toBe("rotate(90deg)");
  });
  test("every align-btn toolbar icon resolves to a real, non-empty mdi: icon (field report 2026-09-19 -- 'Rotate view 90°' shipped with a typo'd, nonexistent icon name)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    const icons = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      const btns = [...host.shadowRoot.querySelectorAll(".align-toolbar button.align-btn")];
      return btns.map((b: any) => ({
        title: b.title,
        icon: b.querySelector("ha-icon")?.getAttribute("icon") ?? null,
      }));
    });

    for (const { title, icon } of icons) {
      expect(icon, `button "${title}" should have an icon`).toBeTruthy();
      expect(icon, `button "${title}" icon should be an mdi: icon`).toMatch(/^mdi:/);
    }

    // Pin the exact fix: "mdi:screen-rotate" isn't a real MDI icon name (the
    // real one is "mdi:screen-rotation") -- HA's icon resolver just renders
    // nothing for an unknown name, no console error, so this silently shipped
    // blank in 1.11.4/1.11.5/1.11.6 until the field report.
    const rotateView = icons.find((i) => i.title === "Rotate view 90°");
    expect(rotateView?.icon).toBe("mdi:screen-rotation");
  });
  test("wheel-zoom is anchored on the cursor -- the wrap point under the pointer stays fixed as zoom changes (field report 2026-09-19)", async ({ page }) => {
    await mountCard(page);
    await openAlign(page);

    // Pick some off-centre screen point inside the canvas and read what wrap
    // point it currently corresponds to (_alignPointToWrapPct is the card's
    // own screen->wrap-% conversion, already inverting the FULL view
    // transform -- pan/zoom/rotate -- so it's a faithful oracle here).
    const probe = { x: 620, y: 260 };
    const before = await page.evaluate((p) => {
      const card = (window as any).__card;
      return card._alignPointToWrapPct(p.x, p.y);
    }, probe);
    expect(before).not.toBeNull();

    // Zoom in around that exact screen point (a real WheelEvent-shaped
    // object, same style the gesture tests use for fake PointerEvents).
    await page.evaluate((p) => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const canvas = host.shadowRoot.querySelector(".align-canvas");
      const ev = { clientX: p.x, clientY: p.y, deltaY: -400, preventDefault: () => {} } as any;
      Object.defineProperty(ev, "currentTarget", { value: canvas });
      card._alignWheel(ev);
    }, probe);

    const viewAfterZoomIn = await page.evaluate(() => (window as any).__card._alignView);
    expect(viewAfterZoomIn.zoom).toBeGreaterThan(1); // actually zoomed

    const afterZoomIn = await page.evaluate((p) => {
      const card = (window as any).__card;
      return card._alignPointToWrapPct(p.x, p.y);
    }, probe);
    expect(afterZoomIn).not.toBeNull();
    // The wrap point under the cursor is unchanged (small tolerance for
    // floating point / sub-pixel rect measurement).
    expect(Math.abs(afterZoomIn.x - before.x)).toBeLessThan(0.05);
    expect(Math.abs(afterZoomIn.y - before.y)).toBeLessThan(0.05);

    // Zoom back out around a DIFFERENT screen point -- same invariant holds
    // for that new anchor, proving this isn't just an artifact of one point.
    const probe2 = { x: 900, y: 500 };
    const before2 = await page.evaluate((p) => {
      const card = (window as any).__card;
      return card._alignPointToWrapPct(p.x, p.y);
    }, probe2);
    await page.evaluate((p) => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const canvas = host.shadowRoot.querySelector(".align-canvas");
      const ev = { clientX: p.x, clientY: p.y, deltaY: 250, preventDefault: () => {} } as any;
      Object.defineProperty(ev, "currentTarget", { value: canvas });
      card._alignWheel(ev);
    }, probe2);
    const after2 = await page.evaluate((p) => {
      const card = (window as any).__card;
      return card._alignPointToWrapPct(p.x, p.y);
    }, probe2);
    expect(Math.abs(after2.x - before2.x)).toBeLessThan(0.05);
    expect(Math.abs(after2.y - before2.y)).toBeLessThan(0.05);
  });
});
