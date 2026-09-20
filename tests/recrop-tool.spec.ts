import { test, expect, type Page } from "@playwright/test";
import { recropFromGesture } from "../src/seatfit";

/**
 * Visual editor / Floorplan & Calibrate tool, Re-crop (docs/42 §9 fáze N,
 * docs/41 §4.5 "cesta A"). Unlike fáze J1's Geometry gizmo (which edits
 * `image_base.rotation/scale/offset_x/offset_y` — fields a cesta-A
 * floorplan's rooms/markers never consult, `placeRoomInCrop`/`pointInCrop`
 * going straight from `crop_box`, seatfit.ts), this tool fixes a stale
 * `crop_box` after the floorplan FILE itself gets re-cropped/re-exported:
 * the picture stays put, and the user drags/scales the OLD ghost overlay
 * (every home-frame-registered vacuum's rooms/markers) into alignment with
 * it. `tests/recrop-fit.spec.ts` covers `recropFromGesture`'s own geometry
 * in isolation; this file covers the tool's session/gesture/Save wiring.
 */

const FLOORPLAN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>" +
      "<rect width='800' height='400' fill='#eee'/></svg>"
  );
const OLD_CROP = { frame_id: "frame1", x0: 100, y0: 200, x1: 900, y1: 600 };

interface MountOpts {
  imageBase?: Record<string, unknown>;
  homeFrame?: { id: string; width_px: number; height_px: number } | null;
  noService?: boolean;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const {
    imageBase = { src: FLOORPLAN_SVG, crop_box: OLD_CROP },
    homeFrame = { id: "frame1", width_px: 1000, height_px: 800 },
    noService = false,
  } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(
    ({ FLOORPLAN_SVG, imageBase, homeFrame, noService }) => {
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
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock", state: "0",
            attributes: {
              schema_version: 2,
              ...(homeFrame ? { home_frame: homeFrame } : {}),
              vacuum_position_home_px: { x: 500, y: 400, a: 0 },
              rooms: [{ name: "Bedroom", bbox_home_px: { x0: 300, y0: 250, x1: 500, y1: 400 } }],
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
    { FLOORPLAN_SVG, imageBase, homeFrame, noService }
  );
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete,
    null, { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

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
      ?.querySelector(".align-seat-layer, .ve-placeholder, .recrop-ghost, .align-body")
  );
}

function shadowHtml(page: Page): Promise<string> {
  return page.evaluate(() => (document.querySelector("anyvac-visual-editor") as any).shadowRoot.innerHTML);
}

test.describe("Visual editor Floorplan & Calibrate tool: Re-crop (docs/42 §9 fáze N)", () => {
  test("a cesta-A floorplan (crop_box.frame_id) gets the Re-crop tool instead of the free-drag gizmo", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    const html = await shadowHtml(page);
    expect(html).toContain("Re-crop");
    expect(html).not.toContain(">Geometry<");
    expect(html).toContain("recrop-ghost");
    // The old ghost overlay actually renders the registered vacuum's room.
    expect(html).toContain("Bedroom");
  });

  test("a foreign-origin floorplan (no crop_box) keeps the ordinary Geometry gizmo — no regression", async ({ page }) => {
    await mountCard(page, { imageBase: { src: FLOORPLAN_SVG }, homeFrame: null });
    await openFloorplan(page);
    const html = await shadowHtml(page);
    expect(html).toContain(">Geometry<");
    expect(html).not.toContain("recrop-ghost");
  });

  test("no vacuum currently registered to the frame shows a placeholder note, not a broken drag surface", async ({ page }) => {
    await mountCard(page, { homeFrame: null });
    await openFloorplan(page);
    const html = await shadowHtml(page);
    expect(html).toContain("Re-crop");
    expect(html).toContain("nothing live to drag against");
    expect(html).not.toContain("recrop-ghost");
  });

  test("dragging the ghost overlay updates _recropDraft by the expected Δ (wrap %), never touches the floorplan session's own draft", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    const beforeSession = await page.evaluate(() => (window as any).__card._floorplanSession.draft);

    const dxPx = 24, dyPx = -10;
    const result = await page.evaluate(
      ({ dxPx, dyPx }) => {
        const card = (window as any).__card;
        const host = document.querySelector("anyvac-visual-editor") as any;
        const scene = host.shadowRoot.querySelector(".align-scene") as HTMLElement;
        const ghost = host.shadowRoot.querySelector(".recrop-ghost") as any;
        ghost.setPointerCapture = () => {};
        const r = scene.getBoundingClientRect();
        const x0 = r.left + r.width * 0.5, y0 = r.top + r.height * 0.5;
        const ev = (x: number, y: number) => ({
          currentTarget: ghost, clientX: x, clientY: y, pointerId: 1,
          stopPropagation: () => {}, preventDefault: () => {},
        } as any);
        card._recropStartGesture(ev(x0, y0), "drag");
        card._recropGestureMove(ev(x0 + dxPx, y0 + dyPx));
        card._recropGestureEnd(ev(x0 + dxPx, y0 + dyPx));
        return { sceneW: scene.offsetWidth, sceneH: scene.offsetHeight };
      },
      { dxPx, dyPx }
    );
    const draft = await page.evaluate(() => (window as any).__card._recropDraft);
    const expectedDx = (dxPx / result.sceneW) * 100;
    const expectedDy = (dyPx / result.sceneH) * 100;
    expect(draft.offset_x).toBeCloseTo(expectedDx, 1);
    expect(draft.offset_y).toBeCloseTo(expectedDy, 1);
    expect(draft.scale).toBe(100);

    // The Geometry-gizmo fields (`image_base` itself) never moved.
    const afterSession = await page.evaluate(() => (window as any).__card._floorplanSession.draft);
    expect(afterSession).toEqual(beforeSession);
  });

  test("Undo/Redo/Reset operate on the recrop draft's own history, independent of the floorplan session", async ({ page }) => {
    await mountCard(page);
    await openFloorplan(page);
    await page.evaluate(() => { (window as any).__card._recropSetField("offset_x", "5"); });
    expect(await page.evaluate(() => (window as any).__card._recropDraft.offset_x)).toBe(5);
    await page.evaluate(() => { (window as any).__card._recropUndo(); });
    expect(await page.evaluate(() => (window as any).__card._recropDraft.offset_x)).toBe(0);
    await page.evaluate(() => { (window as any).__card._recropRedo(); });
    expect(await page.evaluate(() => (window as any).__card._recropDraft.offset_x)).toBe(5);
    await page.evaluate(() => { (window as any).__card._recropReset(); });
    const draft = await page.evaluate(() => (window as any).__card._recropDraft);
    expect(draft).toEqual({ rotation: 0, scale: 100, offset_x: 0, offset_y: 0 });
  });

  test("Save resends the whole image_base with a crop_box recomputed via recropFromGesture, geometry fields untouched", async ({ page }) => {
    await mountCard(page, { imageBase: { src: FLOORPLAN_SVG, crop_box: OLD_CROP, rotation: 3 } });
    await openFloorplan(page);
    await page.evaluate(() => {
      const card = (window as any).__card;
      card._recropSetField("offset_x", "-12.5");
      card._recropSetField("offset_y", "6.25");
      card._recropSetField("scale", "82");
    });
    await page.evaluate(async () => {
      await (window as any).__card._recropSave();
    });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls).toHaveLength(1);
    expect(calls[0].service).toBe("set_floorplan_seat");
    const ib = calls[0].data.image_base;
    // Geometry fields resent verbatim — the Re-crop tool never touches them.
    expect(ib.rotation).toBe(3);
    expect(ib.scale).toBe(100);
    expect(ib.offset_x).toBe(0);
    expect(ib.offset_y).toBe(0);
    // crop_box recomputed — same `recropFromGesture` `tests/recrop-fit.spec.ts`
    // verifies in isolation, checked here end-to-end through the real Save path.
    expect(ib.crop_box.frame_id).toBe("frame1");
    const expected = recropFromGesture(
      { x0: OLD_CROP.x0, y0: OLD_CROP.y0, x1: OLD_CROP.x1, y1: OLD_CROP.y1 },
      { offset_x: -12.5, offset_y: 6.25, scale: 82 },
    )!;
    expect(ib.crop_box.x0).toBe(Math.round(expected.x0));
    expect(ib.crop_box.y0).toBe(Math.round(expected.y0));
    expect(ib.crop_box.x1).toBe(Math.round(expected.x1));
    expect(ib.crop_box.y1).toBe(Math.round(expected.y1));
  });

  test("Save is unavailable without anyvac.set_floorplan_seat, same as the ordinary Geometry tool", async ({ page }) => {
    await mountCard(page, { noService: true });
    await openFloorplan(page);
    await page.evaluate(() => { (window as any).__card._recropSetField("offset_x", "5"); });
    await page.evaluate(async () => { await (window as any).__card._recropSave(); });
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls).toHaveLength(0);
  });
});
