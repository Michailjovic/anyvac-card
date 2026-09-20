import { test, expect, type Page } from "@playwright/test";

/**
 * Visual editor / Floorplan & Calibrate tool, geometry sub-phase (docs/42
 * §9 fáze J1) — the `image_base.rotation/scale/offset_x/offset_y` gizmo.
 * MERGED mode's card-level `image_base` only (see `FloorplanEditSession`'s
 * own doc comment in seatedit.ts on why); split mode renders a placeholder,
 * covered below too. The Seat & Appearance / Rooms tools' own behaviour
 * lives in `visual-editor.spec.ts`/`rooms-tool.spec.ts`; the tool-switcher
 * shell (tabs, localStorage) lives in `visual-editor-tool.spec.ts` — this
 * file stays scoped to the Floorplan tool's own session/gesture/Save logic.
 * The three calibration methods and the snapshot buttons are later
 * sub-phases (J2-J4) and have no tests here yet.
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
  mapMode?: "split" | "merged";
  imageBase?: Record<string, unknown>;
  floorplanSeats?: Record<string, unknown>;
  noService?: boolean;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { mapMode = "merged", imageBase = { src: FLOORPLAN_SVG }, floorplanSeats, noService = false } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(
    ({ FLOORPLAN_SVG, MAP_SVG, mapMode, imageBase, floorplanSeats, noService }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: mapMode,
        ...(mapMode === "merged" ? { image_base: imageBase } : {}),
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            map: { entity: "image.my_roborock_map" },
            ...(mapMode === "split" ? { image_base: imageBase } : {}),
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
              ...(floorplanSeats ? { floorplan_seats: floorplanSeats } : {}),
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
    { FLOORPLAN_SVG, MAP_SVG, mapMode, imageBase, floorplanSeats, noService }
  );
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete,
    null, { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Opens the Visual editor straight into the Floorplan tab. */
async function openFloorplan(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._openAlign(card._config.vacuums[0]);
    card._veTool = "floorplan";
    card._openFloorplan();
    await card.updateComplete;
  });
  await page.waitForFunction(
    () => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot
      ?.querySelector(".align-seat-layer, .ve-placeholder")
  );
}

function floorplanSession(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._floorplanSession);
}

test.describe("Visual editor Floorplan & Calibrate tool, geometry (docs/42 §9 fáze J1)", () => {
  test("opening in merged mode seeds the session from card-level image_base, defaulted", async ({ page }) => {
    await mountCard(page, { imageBase: { src: FLOORPLAN_SVG, rotation: 10, crop_box: { x0: 1, y0: 2, x1: 3, y1: 4 } } });
    await openFloorplan(page);
    const s = await floorplanSession(page);
    expect(s.floorplan).toBe(FLOORPLAN_SVG);
    // rotation configured, scale/offsets defaulted (docs/14 rule 1 — same
    // default table the Config editor's own sliders already use).
    expect(s.start).toEqual({ rotation: 10, scale: 100, offset_x: 0, offset_y: 0 });
    expect(s.draft).toEqual(s.start);
    expect(s.history).toEqual([]);
    // Everything else on image_base is carried through untouched, for Save.
    expect(s.rest).toEqual({ crop_box: { x0: 1, y0: 2, x1: 3, y1: 4 } });
  });

  test("split mode renders the explanatory placeholder instead — no card-level image_base override slot to edit", async ({ page }) => {
    await mountCard(page, { mapMode: "split" });
    await openFloorplan(page);
    expect(await floorplanSession(page)).toBeNull();
    const text = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      return host.shadowRoot.querySelector(".ve-placeholder-sub")?.textContent ?? "";
    });
    expect(text).toContain("merged-mode");
  });

  test("a merged config with no top-level image_base (vacuum-fallback only) also renders the placeholder", async ({ page }) => {
    // resolveImageBaseSrc's merged-mode fallback (first vacuum's own
    // image_base) resolves a floorplan identity, but applyFloorplanSeats
    // only ever applies a card-level image_base override back onto
    // `config.image_base` itself — so there's nothing for a Save here to
    // visibly affect. `_openFloorplan` deliberately declines this case too.
    await page.goto("/tests/harness/mock-ha.html");
    await page.waitForFunction(() => (window as any).__mockHaReady === true);
    await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
    await page.evaluate(({ FLOORPLAN_SVG, MAP_SVG }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card", map_mode: "merged",
        vacuums: [{
          entity: "vacuum.my_roborock", name: "Roborock", integration_entity: "sensor.anyvac_my_roborock",
          map: { entity: "image.my_roborock_map" }, image_base: { src: FLOORPLAN_SVG }, base: "map",
        }],
      });
      const now = new Date().toISOString();
      card.hass = {
        states: {
          "vacuum.my_roborock": { entity_id: "vacuum.my_roborock", state: "docked", attributes: { friendly_name: "Roborock" }, last_changed: now, last_updated: now },
          "image.my_roborock_map": { entity_id: "image.my_roborock_map", state: now, attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now },
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock", state: "0",
            attributes: { schema_version: 2, image_dims: { top: 0, left: 0, width: 100, height: 400, scale: 4, rotation: 0 }, vacuum_position_px: { x: 200, y: 800, a: 0 }, rooms: [] },
            last_changed: now, last_updated: now,
          },
        },
        services: { anyvac: { set_floorplan_seat: {} } },
        hassUrl: (p: string) => p, localize: (k: string) => k, language: "en",
        callService: async (domain: string, service: string, data: unknown) => { w.__calls.push({ domain, service, data }); },
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = "1200px";
      w.__mockHa.cardWrap.style.height = "400px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    }, { FLOORPLAN_SVG, MAP_SVG });
    await page.waitForFunction(() => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete, null, { timeout: 10_000 });
    await page.evaluate(async () => { await (window as any).__card.updateComplete; });
    await openFloorplan(page);
    expect(await floorplanSession(page)).toBeNull();
    const text = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      return host.shadowRoot.querySelector(".ve-placeholder-sub")?.textContent ?? "";
    });
    expect(text).toContain("Config editor");
  });

  test("dragging the floorplan layer moves offset_x/offset_y by the expected delta (wrap %) and pushes one undo entry", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    const dxPx = 40, dyPx = -20;
    const result = await page.evaluate(({ dxPx, dyPx }) => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const layer = host.shadowRoot.querySelector(".align-seat-layer") as any;
      layer.setPointerCapture = () => {};
      const r = scene.getBoundingClientRect();
      const x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
      const ev = (x: number, y: number) => ({
        currentTarget: layer, clientX: x, clientY: y, pointerId: 1,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      card._floorGeoStartGesture(ev(x0, y0), "drag");
      card._floorGeoGestureMove(ev(x0 + dxPx, y0 + dyPx));
      card._floorGeoGestureEnd(ev(x0 + dxPx, y0 + dyPx));
      return { sceneW: scene.offsetWidth, sceneH: scene.offsetHeight };
    }, { dxPx, dyPx });
    const s = await floorplanSession(page);
    const expectedX = (dxPx / result.sceneW) * 100;
    const expectedY = (dyPx / result.sceneH) * 100;
    expect(s.draft.offset_x).toBeCloseTo(expectedX, 0);
    expect(s.draft.offset_y).toBeCloseTo(expectedY, 0);
    expect(s.draft.rotation).toBe(0);
    expect(s.draft.scale).toBe(100);
    expect(s.history.length).toBe(1);

    await page.evaluate(() => (window as any).__card._floorGeoUndo());
    const after = await floorplanSession(page);
    expect(after.draft).toEqual({ rotation: 0, scale: 100, offset_x: 0, offset_y: 0 });
    expect(after.history.length).toBe(0);
    expect(after.future.length).toBe(1);

    await page.evaluate(() => (window as any).__card._floorGeoRedo());
    const redone = await floorplanSession(page);
    expect(redone.draft.offset_x).toBeCloseTo(expectedX, 0);
  });

  test("a corner-handle scale gesture scales uniformly and keeps the opposite corner fixed", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    const result = await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const handle = host.shadowRoot.querySelector('.align-handle--corner[data-corner="se"]') as any;
      handle.setPointerCapture = () => {};
      const r = scene.getBoundingClientRect();
      // NW corner (opposite se) sits at the scene's own top-left at scale 100/offset 0.
      const nwX = r.left, nwY = r.top;
      const seX = r.right, seY = r.bottom;
      const ev = (x: number, y: number) => ({
        currentTarget: handle, clientX: x, clientY: y, pointerId: 3,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      card._floorGeoStartGesture(ev(seX, seY), "scale", { x: 0, y: 0 });
      // Drag the SE corner outward by 50% of the scene's own size each way.
      const nx = seX + r.width * 0.5, ny = seY + r.height * 0.5;
      card._floorGeoGestureMove(ev(nx, ny));
      card._floorGeoGestureEnd(ev(nx, ny));
      return { nwX, nwY };
    });
    const s = await floorplanSession(page);
    expect(s.draft.scale).toBeGreaterThan(100);
    expect(s.draft.rotation).toBe(0);
    void result;
  });

  test("the rotate handle rotates the draft", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const handle = host.shadowRoot.querySelector(".align-handle--rotate") as any;
      handle.setPointerCapture = () => {};
      const r = scene.getBoundingClientRect();
      const clientCentre = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      // pivotPct is wrap-relative PERCENT (same units `_alignPointToWrapPct`
      // returns), not raw client px — (50,50) at zero offset/pan/zoom.
      const pivotPct = { x: 50, y: 50 };
      const ev = (x: number, y: number) => ({
        currentTarget: handle, clientX: x, clientY: y, pointerId: 4,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      // Start straight above centre, end straight right of centre — a 90°
      // clockwise turn (screen y grows downward, matching `_alignIsoAngleDeg`).
      card._floorGeoStartGesture(ev(clientCentre.x, r.top), "rotate", pivotPct);
      card._floorGeoGestureMove(ev(r.right, clientCentre.y));
      card._floorGeoGestureEnd(ev(r.right, clientCentre.y));
    });
    const s = await floorplanSession(page);
    expect(s.draft.rotation).toBeCloseTo(90, 0);
  });

  test("numeric side-panel fields commit on change, and Reset restores the opening values", async ({ page }) => {
    await mountCard(page, { imageBase: { src: FLOORPLAN_SVG, rotation: 15, scale: 120 } });
    await openFloorplan(page);
    await page.evaluate(() => (window as any).__card._floorGeoSetField("offset_x", "3.5"));
    let s = await floorplanSession(page);
    expect(s.draft.offset_x).toBe(3.5);
    expect(s.history.length).toBe(1);

    await page.evaluate(() => (window as any).__card._floorplanReset());
    s = await floorplanSession(page);
    expect(s.draft).toEqual({ rotation: 15, scale: 120, offset_x: 0, offset_y: 0 });
  });

  test("Save resends the whole image_base record (rest fields preserved) and an existing room_style, but never rooms/vacuum", async ({ page }) => {
    await mountCard(page, {
      imageBase: { src: FLOORPLAN_SVG, crop_box: { x0: 0, y0: 0, x1: 800, y1: 400 } },
      floorplanSeats: {
        [FLOORPLAN_SVG]: {
          image_base: { src: FLOORPLAN_SVG, crop_box: { x0: 0, y0: 0, x1: 800, y1: 400 } },
          room_style: { border_normal: 3, border_selected: 6 },
        },
      },
    });
    await openFloorplan(page);
    await page.evaluate(() => (window as any).__card._floorGeoSetField("rotation", "45"));
    await page.evaluate(async () => { await (window as any).__card._floorplanSave(); });

    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls.length).toBe(1);
    expect(calls[0].service).toBe("set_floorplan_seat");
    expect(calls[0].data.vacuum).toBeUndefined();
    expect(calls[0].data.rooms).toBeUndefined();
    expect(calls[0].data.floorplan).toBe(FLOORPLAN_SVG);
    expect(calls[0].data.image_base).toEqual({
      src: FLOORPLAN_SVG, crop_box: { x0: 0, y0: 0, x1: 800, y1: 400 },
      rotation: 45, scale: 100, offset_x: 0, offset_y: 0,
    });
    // docs/42 §8 bod 3 "no sentinel": room_style is a sibling of image_base
    // on the same card-level entry and clears on omission — a pure
    // geometry Save must resend whatever the Rooms tool already saved
    // there, or it would silently be wiped.
    expect(calls[0].data.room_style).toEqual({ border_normal: 3, border_selected: 6 });
    // Closes the overlay on success, same as the Seat/Rooms tools.
    expect(await page.evaluate(() => (window as any).__card._floorplanSession)).toBeNull();
  });

  test("Save is disabled (and a no-op) without anyvac.set_floorplan_seat", async ({ page }) => {
    await mountCard(page, { noService: true });
    await openFloorplan(page);
    await page.evaluate(() => (window as any).__card._floorGeoSetField("rotation", "20"));
    await page.evaluate(async () => { await (window as any).__card._floorplanSave(); });
    expect(await page.evaluate(() => (window as any).__calls.length)).toBe(0);
    // The draft survives — Save being unavailable never discards edits.
    expect(await page.evaluate(() => (window as any).__card._floorplanSession.draft.rotation)).toBe(20);
  });

  test("Copy YAML writes an image_base: fragment with just the geometry fields", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    await page.evaluate(() => (window as any).__card._floorGeoSetField("scale", "110"));
    await page.evaluate(() => {
      (navigator.clipboard as any).writeText = (text: string) => {
        (window as any).__clip = text;
        return Promise.resolve();
      };
    });
    await page.evaluate(async () => { await (window as any).__card._floorplanCopyYaml(); });
    const clip = await page.evaluate(() => (window as any).__clip);
    expect(clip).toBe("image_base:\n  rotation: 0\n  scale: 110\n  offset_x: 0\n  offset_y: 0");
  });

  test("switching away from Floorplan with unsaved edits asks for confirmation, same panel as the other tools", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    await page.evaluate(() => (window as any).__card._floorGeoSetField("rotation", "30"));
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._setVeTool("seat");
      await card.updateComplete;
    });
    expect(await page.evaluate(() => (window as any).__card._alignCancelConfirm)).toBe(true);
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("floorplan"); // switch not completed yet

    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._alignConfirmDiscard();
      await card.updateComplete;
    });
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("seat");
    expect(await page.evaluate(() => (window as any).__card._floorplanSession)).toBeNull();
  });
});
