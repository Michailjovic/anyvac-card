import { test, expect, type Page } from "@playwright/test";

/**
 * Visual editor / Rooms tool (docs/42 §9 fáze I) — room rect create/move/
 * resize/delete, area_id, and the two global border-width sliders. The
 * Seat & Appearance tool's own behaviour lives in `visual-editor.spec.ts`;
 * the tool-switcher shell (tabs, localStorage) lives in
 * `visual-editor-tool.spec.ts` — this file stays scoped to the Rooms tool's
 * own session/gesture/Save logic.
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
  /** Static (config-authored) rectangle-mode rooms, per-vacuum (split) or
   *  card-level (merged) depending on `mapMode`. */
  rooms?: Array<{ key: string; name: string; map_x: number; map_y: number; map_w: number; map_h: number; area_id?: string }>;
  floorplanSeats?: Record<string, unknown>;
  roomBorderNormal?: number;
  roomBorderSelected?: number;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { mapMode = "split", rooms = [], floorplanSeats, roomBorderNormal, roomBorderSelected } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(
    ({ FLOORPLAN_SVG, MAP_SVG, mapMode, rooms, floorplanSeats, roomBorderNormal, roomBorderSelected }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: mapMode,
        ...(mapMode === "merged" ? { image_base: { src: FLOORPLAN_SVG }, rooms } : {}),
        ...(roomBorderNormal !== undefined ? { room_border_normal: roomBorderNormal } : {}),
        ...(roomBorderSelected !== undefined ? { room_border_selected: roomBorderSelected } : {}),
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            map: { entity: "image.my_roborock_map" },
            ...(mapMode === "split" ? { image_base: { src: FLOORPLAN_SVG }, rooms } : {}),
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
        services: { anyvac: { set_floorplan_seat: {} } },
        hassUrl: (path: string) => path,
        localize: (k: string) => k,
        language: "en",
        areas: { living_room: { area_id: "living_room", name: "Living room" }, kitchen: { area_id: "kitchen", name: "Kitchen" } },
        callService: async (domain: string, service: string, data: unknown) => { w.__calls.push({ domain, service, data }); },
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = "1200px";
      w.__mockHa.cardWrap.style.height = "400px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { FLOORPLAN_SVG, MAP_SVG, mapMode, rooms, floorplanSeats, roomBorderNormal, roomBorderSelected }
  );
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete,
    null, { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Opens the Visual editor straight into the Rooms tab. */
async function openRooms(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._openAlign(card._config.vacuums[0]);
    card._veTool = "rooms";
    card._openRooms();
    await card.updateComplete;
  });
  await page.waitForFunction(
    () => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot?.querySelector(".rooms-rect, .rooms-side-note")
  );
}

function roomsSession(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._roomsSession);
}

const oneRoom = [{ key: "living_room", name: "Living room", map_x: 30, map_y: 40, map_w: 20, map_h: 15 }];

test.describe("Visual editor Rooms tool (docs/42 §9 fáze I)", () => {
  test("opening seeds the session from static config rooms, marked NOT isNew", async ({ page }) => {
    await mountCard(page, { rooms: oneRoom });
    await openRooms(page);
    const s = await roomsSession(page);
    expect(s.vacuum).toBe("vacuum.my_roborock");
    expect(Object.keys(s.rooms)).toEqual(["living_room"]);
    expect(s.rooms.living_room).toMatchObject({ x: 30, y: 40, w: 20, h: 15, areaId: null, isNew: false });
  });

  test("a drag on a room rect moves it by the expected delta (wrap %) and pushes one undo entry", async ({ page }) => {
    await mountCard(page, { rooms: oneRoom });
    await openRooms(page);
    const dxPx = 25, dyPx = -10;
    const result = await page.evaluate(({ dxPx, dyPx }) => {
      const card = (window as any).__card;
      const host = document.querySelector("anyvac-visual-editor") as any;
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const rect = host.shadowRoot.querySelector(".rooms-rect") as any;
      rect.setPointerCapture = () => {};
      const r = scene.getBoundingClientRect();
      const x0 = r.left + r.width * 0.3, y0 = r.top + r.height * 0.4; // matches the room's own centre (30%,40%)
      const ev = (x: number, y: number) => ({
        currentTarget: rect, clientX: x, clientY: y, pointerId: 1,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      card._roomsStartGesture(ev(x0, y0), "living_room", "move");
      card._roomsGestureMove(ev(x0 + dxPx, y0 + dyPx));
      card._roomsGestureEnd();
      return { sceneW: scene.offsetWidth, sceneH: scene.offsetHeight };
    }, { dxPx, dyPx });
    const s = await roomsSession(page);
    const expectedX = 30 + (dxPx / result.sceneW) * 100;
    const expectedY = 40 + (dyPx / result.sceneH) * 100;
    expect(s.rooms.living_room.x).toBeCloseTo(expectedX, 0);
    expect(s.rooms.living_room.y).toBeCloseTo(expectedY, 0);
    expect(s.rooms.living_room.w).toBe(20);
    expect(s.rooms.living_room.h).toBe(15);
    expect(s.history.length).toBe(1);
    expect(s.selected).toBe("living_room");

    // Undo restores the exact pre-drag geometry.
    await page.evaluate(() => (window as any).__card._roomsUndo());
    const after = await roomsSession(page);
    expect(after.rooms.living_room).toEqual({ x: 30, y: 40, w: 20, h: 15, areaId: null, isNew: false });
  });

  test("setting area_id on an existing room is diffed and sent in full (all 4 geometry fields + area_id) on Save (split mode)", async ({ page }) => {
    await mountCard(page, { rooms: oneRoom });
    await openRooms(page);
    await page.evaluate(() => (window as any).__card._roomsSetAreaId("living_room", "kitchen"));
    await page.evaluate(async () => { await (window as any).__card._roomsSave(); });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls.length).toBe(1);
    expect(calls[0].data.vacuum).toBe("vacuum.my_roborock");
    expect(calls[0].data.rooms).toEqual({
      living_room: { map_x: 30, map_y: 40, map_w: 20, map_h: 15, area_id: "kitchen" },
    });
    // docs/42 §4.4 "no sentinel": map/appearance are resent in full even
    // though only a room's area_id changed this session.
    expect(calls[0].data.map).toBeTruthy();
    expect(calls[0].data.appearance).toBeTruthy();
  });

  test("drawing a new room creates an isNew room; it can be renamed and deleted, but a config-authored room cannot", async ({ page }) => {
    await mountCard(page, { rooms: oneRoom });
    await openRooms(page);

    // Config-authored room: delete is refused (isNew guard).
    await page.evaluate(() => (window as any).__card._roomsRequestDelete("living_room"));
    expect(await page.evaluate(() => (window as any).__card._roomsDeleteConfirm)).toBeNull();

    // Arm draw mode and drag out a new rect.
    const result = await page.evaluate(() => {
      const card = (window as any).__card;
      card._roomsArmDraw();
      const host = document.querySelector("anyvac-visual-editor") as any;
      const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
      const canvas = host.shadowRoot.querySelector(".align-canvas") as any;
      canvas.setPointerCapture = () => {};
      const r = scene.getBoundingClientRect();
      const ev = (x: number, y: number) => ({
        currentTarget: canvas, clientX: x, clientY: y, pointerId: 2,
        stopPropagation: () => {}, preventDefault: () => {},
      } as any);
      card._roomsCanvasPointerDown(ev(r.left + r.width * 0.6, r.top + r.height * 0.6));
      card._roomsCanvasPointerMove(ev(r.left + r.width * 0.8, r.top + r.height * 0.8));
      card._roomsCanvasPointerUp(ev(r.left + r.width * 0.8, r.top + r.height * 0.8));
      return { sceneW: scene.offsetWidth, sceneH: scene.offsetHeight };
    });
    let s = await roomsSession(page);
    expect(Object.keys(s.rooms).sort()).toEqual(["living_room", "new_room_1"]);
    expect(s.rooms.new_room_1.isNew).toBe(true);
    expect(s.selected).toBe("new_room_1");
    expect(result.sceneW).toBeGreaterThan(0);

    // Rename the new room's key.
    await page.evaluate(() => (window as any).__card._roomsRenameKey("new_room_1", "Hallway Nook!"));
    s = await roomsSession(page);
    expect(Object.keys(s.rooms).sort()).toEqual(["hallway_nook", "living_room"]);
    expect(s.selected).toBe("hallway_nook");

    // isNew room: delete works via the confirm flow.
    await page.evaluate(() => (window as any).__card._roomsRequestDelete("hallway_nook"));
    expect(await page.evaluate(() => (window as any).__card._roomsDeleteConfirm)).toBe("hallway_nook");
    await page.evaluate(() => (window as any).__card._roomsConfirmDelete());
    s = await roomsSession(page);
    expect(Object.keys(s.rooms)).toEqual(["living_room"]);
  });

  test("Save (merged/card-level mode) resends image_base and the full room_style draft alongside the rooms diff", async ({ page }) => {
    await mountCard(page, {
      mapMode: "merged", rooms: oneRoom, roomBorderNormal: 3, roomBorderSelected: 6,
      floorplanSeats: { [FLOORPLAN_SVG]: { image_base: { offset_x: 5 } } },
    });
    await openRooms(page);
    let s = await roomsSession(page);
    expect(s.vacuum).toBeUndefined(); // card-level session
    expect(s.styleDraft).toEqual({ border_normal: 3, border_selected: 6 });

    await page.evaluate(() => (window as any).__card._roomsSetStyle("border_selected", "8"));
    await page.evaluate(() => (window as any).__card._roomsSetAreaId("living_room", "kitchen"));
    await page.evaluate(async () => { await (window as any).__card._roomsSave(); });

    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls.length).toBe(1);
    expect(calls[0].data.vacuum).toBeUndefined();
    expect(calls[0].data.floorplan).toBe(FLOORPLAN_SVG);
    expect(calls[0].data.image_base).toEqual({ offset_x: 5 });
    expect(calls[0].data.room_style).toEqual({ border_normal: 3, border_selected: 8 });
    expect(calls[0].data.rooms).toEqual({
      living_room: { map_x: 30, map_y: 40, map_w: 20, map_h: 15, area_id: "kitchen" },
    });
  });

  test("switching away from Rooms with unsaved edits asks for confirmation, same panel as the Seat tool's Cancel", async ({ page }) => {
    await mountCard(page, { rooms: oneRoom });
    await openRooms(page);
    await page.evaluate(() => (window as any).__card._roomsSetAreaId("living_room", "kitchen"));
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._setVeTool("seat");
      await card.updateComplete;
    });
    expect(await page.evaluate(() => (window as any).__card._alignCancelConfirm)).toBe(true);
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("rooms");

    // Discarding completes the switch and drops the Rooms session.
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._alignConfirmDiscard();
      await card.updateComplete;
    });
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("seat");
    expect(await page.evaluate(() => (window as any).__card._roomsSession)).toBeNull();
  });
});
