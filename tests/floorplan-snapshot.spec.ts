import { test, expect, type Page } from "@playwright/test";

/**
 * Visual editor / Floorplan & Calibrate tool, snapshot/acquisition (docs/42
 * §9 fáze J4) — the three buttons ported from the Config editor's Maps tab
 * ("Snapshot map as floorplan", "Snapshot home frame as floorplan", "Export
 * guide layers"), plus the identity-key stability fix that makes it safe for
 * the Visual editor to change `image_base.src` for the first time at all.
 *
 * The fix (see `AlignSession.floorplanKey`'s own doc comment in
 * seatedit.ts): every `set_floorplan_seat` call must send the STABLE,
 * `_rawConfig`-derived identity (`session.floorplanKey`), never the LIVE/
 * effective `session.floorplan` — `applyFloorplanSeats` always looks
 * overrides up by the raw, YAML-declared `image_base.src`, so a write keyed
 * by anything else would silently create an unreachable, orphaned entry the
 * next time the override is looked up. Before fáze J4 the two values always
 * coincided (nothing ever changed `src`), so this was previously untested —
 * the first test below reproduces the exact divergence a prior card-side (or
 * Config-editor) `src` change would otherwise cause, and asserts every write
 * still targets the ORIGINAL raw key.
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
const NEW_SNAPSHOT_PATH = "/local/anyvac/roborock_snapshot_2.png";

interface MountOpts {
  imageBase?: Record<string, unknown>;
  floorplanSeats?: Record<string, unknown>;
  intRooms?: Array<Record<string, unknown>>;
  cardRooms?: Array<Record<string, unknown>>;
  noServices?: boolean;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const {
    imageBase = { src: FLOORPLAN_SVG },
    floorplanSeats = {},
    intRooms = [],
    cardRooms,
    noServices = false,
  } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(
    ({ FLOORPLAN_SVG, MAP_SVG, imageBase, floorplanSeats, intRooms, cardRooms, noServices }) => {
      const w = window as any;
      w.__calls = [];
      w.__serviceHandlers = {};
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: "merged",
        image_base: imageBase,
        ...(cardRooms ? { rooms: cardRooms } : {}),
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
              rooms: intRooms,
              floorplan_seats: floorplanSeats,
            },
            last_changed: now, last_updated: now,
          },
        },
        services: noServices ? {} : {
          anyvac: {
            set_floorplan_seat: {},
            snapshot_map_as_floorplan: {},
            export_map_guide: {},
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
    { FLOORPLAN_SVG, MAP_SVG, imageBase, floorplanSeats, intRooms, cardRooms, noServices }
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

/** Opens the Visual editor straight into the Floorplan tab's Geometry sub-tab. */
async function openGeoTool(page: Page): Promise<void> {
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

function calls(page: Page): Promise<any[]> {
  return page.evaluate(() => (window as any).__calls);
}
function alignSession(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._alignSession);
}
function floorplanSession(page: Page): Promise<any> {
  return page.evaluate(() => (window as any).__card._floorplanSession);
}

test.describe("Visual editor Floorplan & Calibrate tool: identity-key stability (docs/42 §9 fáze J4)", () => {
  test("floorplanKey stays the RAW config src even when an existing override already diverged the LIVE src", async ({ page }) => {
    // Simulates exactly what fáze J4's own snapshot buttons are now able to
    // do for the first time: an earlier write (this test doesn't care
    // whether from the Config editor or a previous Visual-editor snapshot)
    // already changed the EFFECTIVE image_base.src away from the raw,
    // YAML-declared one, by storing an override keyed by the RAW src whose
    // OWN `image_base.src` field points at a different file.
    await mountCard(page, {
      imageBase: { src: FLOORPLAN_SVG },
      floorplanSeats: {
        [FLOORPLAN_SVG]: { image_base: { src: NEW_SNAPSHOT_PATH, rotation: 7 } },
      },
    });
    // Sanity: the effective/live config really did diverge from the raw one.
    const liveSrc = await page.evaluate(() => (window as any).__card._config.image_base?.src);
    const rawSrc = await page.evaluate(() => (window as any).__card._rawConfig.image_base?.src);
    expect(liveSrc).toBe(NEW_SNAPSHOT_PATH);
    expect(rawSrc).toBe(FLOORPLAN_SVG);

    await openGeoTool(page);
    const session = await alignSession(page);
    // `.floorplan` is the LIVE value (what actually renders as the image).
    expect(session.floorplan).toBe(NEW_SNAPSHOT_PATH);
    // `.floorplanKey` is the STABLE value (what a save must target).
    expect(session.floorplanKey).toBe(FLOORPLAN_SVG);

    // A plain geometry Save (fáze J1, nothing to do with J4) must still key
    // its write by the STABLE identity, or it would create a second,
    // unreachable `floorplan_seats` entry instead of updating the one
    // `applyFloorplanSeats` will actually look up next time.
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._floorGeoSetField("rotation", "42");
      await card._floorplanSave();
    });
    const c = await calls(page);
    const save = c.find((x) => x.service === "set_floorplan_seat");
    expect(save.data.floorplan).toBe(FLOORPLAN_SVG);
    expect(save.data.vacuum).toBeUndefined();
  });

  test("the Rooms and Seat & Appearance tools' saves also key off the stable identity, not the live src", async ({ page }) => {
    await mountCard(page, {
      imageBase: { src: FLOORPLAN_SVG },
      floorplanSeats: { [FLOORPLAN_SVG]: { image_base: { src: NEW_SNAPSHOT_PATH } } },
    });
    await openGeoTool(page);
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._alignSetField("rotation", "12");
      await card._alignSave();
    });
    const seatSave = (await calls(page)).find((x) => x.service === "set_floorplan_seat");
    expect(seatSave.data.floorplan).toBe(FLOORPLAN_SVG);
    expect(seatSave.data.vacuum).toBe("vacuum.my_roborock");
  });
});

test.describe("Visual editor Floorplan & Calibrate tool: 'Snapshot map as floorplan' (docs/42 §9 fáze J4)", () => {
  test("re-snapshots the vacuum's map, writes image_base via the stable key, keeps existing rest fields, and updates the live session in place", async ({ page }) => {
    await mountCard(page, {
      imageBase: { src: FLOORPLAN_SVG, home_anchors: [{ home_px: { x: 1, y: 2 }, floor_pct: { x: 3, y: 4 } }], home_anchors_frame_id: "frame1" },
    });
    await setServiceHandler(page, "snapshot_map_as_floorplan", `
      (data) => ({ response: { path: "${NEW_SNAPSHOT_PATH}", crop: { x0: 0, y0: 0, x1: 200, y1: 200 } } })
    `);
    await openGeoTool(page);
    await page.evaluate(async () => { await (window as any).__card._snapshotMapAsFloorplan(); });

    const c = await calls(page);
    const snap = c.find((x) => x.service === "snapshot_map_as_floorplan");
    expect(snap.data.image_entity).toBe("image.my_roborock_map");
    expect(snap.data.name).toBe("Roborock");

    const seatCalls = c.filter((x) => x.service === "set_floorplan_seat");
    const write = seatCalls.find((x) => (x.data.image_base as any)?.src === NEW_SNAPSHOT_PATH);
    expect(write).toBeTruthy();
    expect(write.data.floorplan).toBe(FLOORPLAN_SVG); // stable key, unaffected by the new src
    expect(write.data.image_base.crop_box).toEqual({ entity: "vacuum.my_roborock", x0: 0, y0: 0, x1: 200, y1: 200 });
    // "no sentinel": the pre-existing home_anchors calibration is carried
    // through untouched even though it no longer matches the new file —
    // same merge-not-replace behaviour editor.ts's own version has.
    expect(write.data.image_base.home_anchors_frame_id).toBe("frame1");

    // hide_map cascade fired for the (only) configured vacuum.
    const hideCall = seatCalls.find((x) => x.data.vacuum === "vacuum.my_roborock" && x.data.appearance?.hide_map === true);
    expect(hideCall).toBeTruthy();

    // Live session state now points at the new file, without a close/reopen.
    const session = await alignSession(page);
    expect(session.floorplan).toBe(NEW_SNAPSHOT_PATH);
    expect(session.floorplanKey).toBe(FLOORPLAN_SVG);
    const fs = await floorplanSession(page);
    expect(fs.floorplan).toBe(NEW_SNAPSHOT_PATH);
    expect(fs.rest.home_anchors_frame_id).toBe("frame1");
  });

  test("places this vacuum's own rooms onto the new crop, by name, without touching an unrelated existing room", async ({ page }) => {
    await mountCard(page, {
      cardRooms: [
        { key: "Kitchen", name: "Kitchen", icon: "mdi:chef-hat", map_x: 10, map_y: 10, map_w: 20, map_h: 20 },
        { key: "Custom room", name: "Custom room", map_x: 90, map_y: 90, map_w: 5, map_h: 5 },
      ],
      intRooms: [
        { name: "Kitchen", bbox_px: { x0: 0, y0: 0, x1: 100, y1: 100 } },
        { name: "Bedroom", bbox_px: { x0: 100, y0: 100, x1: 200, y1: 200 } },
      ],
    });
    await setServiceHandler(page, "snapshot_map_as_floorplan", `
      (data) => ({ response: { path: "${NEW_SNAPSHOT_PATH}", crop: { x0: 0, y0: 0, x1: 200, y1: 200 } } })
    `);
    await openGeoTool(page);
    await page.evaluate(async () => { await (window as any).__card._snapshotMapAsFloorplan(); });

    const c = await calls(page);
    const write = c.find((x) => x.service === "set_floorplan_seat" && (x.data.image_base as any)?.src === NEW_SNAPSHOT_PATH);
    expect(write.data.rooms.Kitchen).toBeTruthy();
    expect(write.data.rooms.Kitchen.map_x).toBeCloseTo(25, 1); // centre of {0,0,100,100} in a {0,0,200,200} crop
    expect(write.data.rooms.Bedroom).toBeTruthy(); // newly appended, no matching card room
    expect(write.data.rooms["Custom room"]).toBeUndefined(); // untouched, not in this poll — no key sent

    const placeResult = await page.evaluate(() => (window as any).__card._placeRoomsResult);
    expect(placeResult).toEqual({ placed: 1, added: 1 });
  });

  test("does nothing without both snapshot_map_as_floorplan and set_floorplan_seat registered", async ({ page }) => {
    await mountCard(page, { noServices: true });
    await openGeoTool(page);
    await page.evaluate(async () => { await (window as any).__card._snapshotMapAsFloorplan(); });
    expect(await calls(page)).toEqual([]);
  });
});

test.describe("Visual editor Floorplan & Calibrate tool: 'Snapshot home frame as floorplan' (docs/42 §9 fáze J4)", () => {
  test("re-snapshots the shared home frame, writes image_base with a frame_id crop_box via the stable key, no rooms diff", async ({ page }) => {
    await mountCard(page, { imageBase: { src: FLOORPLAN_SVG } });
    await setServiceHandler(page, "snapshot_map_as_floorplan", `
      (data) => data.frame === "home"
        ? { response: { path: "${NEW_SNAPSHOT_PATH}", frame_id: "frame1", crop: { x0: 0, y0: 0, x1: 300, y1: 300 } } }
        : { response: {} }
    `);
    await openGeoTool(page);
    await page.evaluate(async () => { await (window as any).__card._snapshotHomeFrameAsFloorplan(); });

    const c = await calls(page);
    const snap = c.find((x) => x.service === "snapshot_map_as_floorplan");
    expect(snap.data).toEqual({ frame: "home", name: "home_frame" });

    const write = c.find((x) => x.service === "set_floorplan_seat" && (x.data.image_base as any)?.src === NEW_SNAPSHOT_PATH);
    expect(write.data.floorplan).toBe(FLOORPLAN_SVG);
    expect(write.data.rooms).toBeUndefined();
    expect(write.data.image_base.crop_box).toEqual({ frame_id: "frame1", x0: 0, y0: 0, x1: 300, y1: 300 });

    const hideCall = c.find((x) => x.service === "set_floorplan_seat" && x.data.appearance?.hide_map === true);
    expect(hideCall).toBeTruthy();

    const session = await alignSession(page);
    expect(session.floorplan).toBe(NEW_SNAPSHOT_PATH);
    expect(session.floorplanKey).toBe(FLOORPLAN_SVG);
  });
});

test.describe("Visual editor Floorplan & Calibrate tool: 'Export guide layers' (docs/42 §9 fáze J4)", () => {
  test("calls export_map_guide with the current crop_box for this entity and shows the result, with no config side effects", async ({ page }) => {
    await mountCard(page, { imageBase: { src: FLOORPLAN_SVG, crop_box: { entity: "vacuum.my_roborock", x0: 1, y0: 2, x1: 3, y1: 4 } } });
    await setServiceHandler(page, "export_map_guide", `
      (data) => ({ response: { paths: { walls: "/local/anyvac/guide_walls.png" }, size: { w: 800, h: 400 } } })
    `);
    await openGeoTool(page);
    await page.evaluate(async () => { await (window as any).__card._exportGuideLayers(); });

    const c = await calls(page);
    expect(c.some((x) => x.service === "set_floorplan_seat")).toBe(false);
    const exp = c.find((x) => x.service === "export_map_guide");
    expect(exp.data).toEqual({ image_entity: "image.my_roborock_map", name: "Roborock", crop: { x0: 1, y0: 2, x1: 3, y1: 4 } });

    const result = await page.evaluate(() => (window as any).__card._guideExportResult);
    expect(result).toEqual({ paths: { walls: "/local/anyvac/guide_walls.png" }, size: { w: 800, h: 400 } });
  });

  test("does not send a crop_box that belongs to a different entity", async ({ page }) => {
    await mountCard(page, { imageBase: { src: FLOORPLAN_SVG, crop_box: { entity: "vacuum.someone_else", x0: 1, y0: 2, x1: 3, y1: 4 } } });
    await setServiceHandler(page, "export_map_guide", `
      (data) => ({ response: { paths: { walls: "/local/anyvac/guide_walls.png" }, size: { w: 800, h: 400 } } })
    `);
    await openGeoTool(page);
    await page.evaluate(async () => { await (window as any).__card._exportGuideLayers(); });
    const exp = (await calls(page)).find((x) => x.service === "export_map_guide");
    expect(exp.data.crop).toBeUndefined();
  });
});

test.describe("Visual editor Floorplan & Calibrate tool: snapshot section rendering (docs/42 §9 fáze J4)", () => {
  test("the Geometry sub-tab's side panel offers all three actions", async ({ page }) => {
    await mountCard(page);
    await openGeoTool(page);
    const labels = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor") as any;
      return Array.from(host.shadowRoot.querySelectorAll(".align-side-panel button.align-btn"))
        .map((b: any) => b.textContent.trim());
    });
    expect(labels.some((l) => l.includes("map as floorplan"))).toBe(true);
    expect(labels.some((l) => l.includes("home frame as floorplan"))).toBe(true);
    expect(labels.some((l) => l.includes("guide layers"))).toBe(true);
  });
});
