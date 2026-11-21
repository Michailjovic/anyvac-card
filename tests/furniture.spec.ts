import { test, expect, type Page } from "@playwright/test";
import {
  normalizeFurniture, toUnit, fromUnit, cornerPoint, resizeBoxCorner, rotateBoxTo, moveBox,
  newFurnitureItem, remapFurnitureCrop, cropsCompatible, furnitureToYaml, slugFromSrc, uniqueId,
  type FurnitureItem,
} from "../src/furniture";

/**
 * docs/51 §1 — furniture as movable image layers on the floorplan.
 * Pure geometry first (no browser), then the card's render layer, then the
 * Visual editor's Furniture tool (gestures + Save through
 * `anyvac.set_floorplan_seat`).
 */

const close = (a: number, b: number, eps = 0.02) => expect(Math.abs(a - b)).toBeLessThan(eps);

test.describe("furniture.ts geometry", () => {
  test("normalize drops malformed pieces and fills defaults", () => {
    const out = normalizeFurniture([
      { src: "/local/a.webp", x: 10, y: 20, w: 5, h: 6, rot: 0, opacity: 1 },
      { src: "", w: 1, h: 1 },
      { src: "/local/b.webp", w: 0, h: 3 },
      null,
      { id: "dup", src: "/local/c.webp", w: 2, h: 2 },
      { id: "dup", src: "/local/d.webp", w: 2, h: 2, flip: true, opacity: 0.4 },
    ]);
    expect(out.map((i) => i.id)).toEqual(["item_1", "dup", "dup_"]);
    expect(out[0]).toEqual({ id: "item_1", src: "/local/a.webp", x: 10, y: 20, w: 5, h: 6 });
    expect(out[2]).toMatchObject({ x: 50, y: 50, flip: true, opacity: 0.4 });
    expect(normalizeFurniture("nope")).toEqual([]);
  });

  test("unit space round-trips and is isotropic", () => {
    const it: FurnitureItem = { id: "a", src: "s", x: 30, y: 40, w: 10, h: 20, rot: 30 };
    const b = toUnit(it, 2);
    expect(b).toEqual({ cx: 30, cy: 20, w: 10, h: 10, rot: 30 });
    expect(fromUnit(it, b, 2)).toEqual(it);
  });

  test("corner resize pins the opposite corner, also when rotated", () => {
    for (const rot of [0, 37, -120]) {
      const start = { cx: 50, cy: 20, w: 10, h: 6, rot };
      const pinned = cornerPoint(start, "nw");
      const [sx, sy] = cornerPoint(start, "se");
      const b = resizeBoxCorner(start, "se", [sx + 3, sy + 1], false);
      const after = cornerPoint(b, "nw");
      close(after[0], pinned[0], 1e-9);
      close(after[1], pinned[1], 1e-9);
      expect(b.rot).toBe(rot);
    }
  });

  test("free resize follows the pointer on both axes in the piece's own frame", () => {
    const b = resizeBoxCorner({ cx: 50, cy: 20, w: 10, h: 6, rot: 0 }, "se", [60, 30], false);
    // NW corner (45, 17) stays, SE goes to the pointer (60, 30)
    expect(b).toEqual({ cx: 52.5, cy: 23.5, w: 15, h: 13, rot: 0 });
  });

  test("aspect-locked resize scales uniformly by the larger push", () => {
    const b = resizeBoxCorner({ cx: 50, cy: 20, w: 10, h: 5, rot: 0 }, "se", [65, 23], true);
    close(b.w / b.h, 2, 1e-9);
    close(b.w, 20, 1e-9);
  });

  test("dragging past the pinned corner clamps instead of flipping", () => {
    const b = resizeBoxCorner({ cx: 50, cy: 20, w: 10, h: 6, rot: 0 }, "se", [10, 0], false);
    expect(b.w).toBe(0.5);
    expect(b.h).toBe(0.5);
  });

  test("rotation handle: pointer to the right of the centre = 90°, snapped to 15°", () => {
    const s = { cx: 50, cy: 20, w: 10, h: 6, rot: 0 };
    expect(rotateBoxTo(s, [80, 20], true).rot).toBe(90);
    expect(rotateBoxTo(s, [50, 0], true).rot).toBe(0);
    expect(rotateBoxTo(s, [80, 21], true).rot).toBe(90);
    const free = rotateBoxTo(s, [80, 21], false).rot;
    expect(free).toBeGreaterThan(90);
    expect(free).toBeLessThan(93);
    expect(moveBox(s, 1, -2)).toMatchObject({ cx: 51, cy: 18 });
  });

  test("new piece keeps the file's aspect ratio and gets a unique id", () => {
    const a = newFurnitureItem("/local/anyvac/furniture/Velký%20gauč.webp", 2, [], { nw: 200, nh: 100 });
    expect(a).toEqual({ id: "velky_gauc", src: "/local/anyvac/furniture/Velký%20gauč.webp", x: 50, y: 50, w: 15, h: 15 });
    // 15 unit wide x 7.5 unit tall = 2:1 like the file; 7.5 unit = 15 % of a 2:1 floorplan's height.
    const b = newFurnitureItem(a.src, 2, [a], {});
    expect(b.id).toBe("velky_gauc_2");
    expect(b.h).toBe(30); // unknown size -> square
    expect(slugFromSrc("/x/.webp")).toBe("item");
    expect(uniqueId("x", [{ ...a, id: "x" }, { ...a, id: "x_2" }])).toBe("x_3");
  });

  test("re-crop keeps every piece on the same physical spot", () => {
    const old = { entity: "vacuum.s6", x0: 100, y0: 100, x1: 300, y1: 200 };
    const neu = { entity: "vacuum.s6", x0: 50, y0: 80, x1: 450, y1: 280 };
    const it: FurnitureItem = { id: "a", src: "s", x: 50, y: 50, w: 10, h: 20, rot: 15 };
    const [r] = remapFurnitureCrop([it], old, neu);
    // physical centre (200, 150) px, size 20 x 20 px
    expect(r).toEqual({ id: "a", src: "s", x: 37.5, y: 35, w: 5, h: 10, rot: 15 });
    expect(remapFurnitureCrop([it], old, { ...neu, entity: "vacuum.s7" })).toEqual([it]);
    expect(cropsCompatible({ frame_id: "f1", x0: 0, y0: 0, x1: 1, y1: 1 }, { frame_id: "f1", x0: 0, y0: 0, x1: 2, y1: 2 })).toBe(true);
    expect(cropsCompatible({ frame_id: "f1", x0: 0, y0: 0, x1: 1, y1: 1 }, old)).toBe(false);
    expect(cropsCompatible(undefined, old)).toBe(false);
  });

  test("Copy YAML lists only the set optional fields", () => {
    expect(furnitureToYaml([])).toBe("image_base:\n  furniture: []");
    expect(furnitureToYaml([{ id: "a", src: "/local/a.webp", x: 1, y: 2, w: 3, h: 4, flip: true }])).toBe(
      "image_base:\n  furniture:\n    - id: a\n      src: /local/a.webp\n      x: 1\n      y: 2\n      w: 3\n      h: 4\n      flip: true",
    );
  });
});

// ── Browser: card layer + Visual editor ─────────────────────────────────────

const FLOORPLAN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'><rect width='800' height='400' fill='#eee'/></svg>");
const MAP_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='#369'/></svg>");
const SOFA_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='#a52'/></svg>");

interface MountOpts {
  imageBase?: Record<string, unknown>;
  baseHeight?: number;
  floorplanSeats?: Record<string, unknown>;
  mapMode?: "merged" | "split";
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHa !== undefined && (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
  await page.evaluate(({ FLOORPLAN_SVG, MAP_SVG, SOFA_SVG, opts }) => {
    const w = window as any;
    w.__calls = [];
    const mapMode = opts.mapMode ?? "merged";
    const ib = { src: FLOORPLAN_SVG, ...(opts.imageBase ?? {}) };
    const card = document.createElement("anyvac-card") as any;
    card.setConfig({
      type: "custom:anyvac-card",
      map_mode: mapMode,
      ...(mapMode === "merged" ? { image_base: ib } : {}),
      ...(opts.baseHeight ? { base_height: opts.baseHeight } : {}),
      vacuums: [{
        entity: "vacuum.my_roborock", name: "Roborock",
        integration_entity: "sensor.anyvac_my_roborock",
        map: { entity: "image.my_roborock_map" }, hide_map: true,
        ...(mapMode === "split" ? { image_base: ib, base: "image", ...(opts.baseHeight ? { base_height: opts.baseHeight } : {}) } : { base: "map" }),
      }],
    });
    const now = new Date().toISOString();
    const sensorAttrs = (seats?: unknown) => ({
      schema_version: 2,
      image_dims: { top: 0, left: 0, width: 100, height: 400, scale: 4, rotation: 0 },
      vacuum_position_px: { x: 200, y: 800, a: 0 },
      rooms: [],
      ...(seats ? { floorplan_seats: seats } : {}),
    });
    w.__makeHass = (seats?: unknown) => ({
      states: {
        "vacuum.my_roborock": { entity_id: "vacuum.my_roborock", state: "docked", attributes: { friendly_name: "Roborock" }, last_changed: now, last_updated: now },
        "image.my_roborock_map": { entity_id: "image.my_roborock_map", state: now, attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now },
        "sensor.anyvac_my_roborock": { entity_id: "sensor.anyvac_my_roborock", state: "0", attributes: sensorAttrs(seats), last_changed: now, last_updated: new Date().toISOString() },
      },
      services: { anyvac: { set_floorplan_seat: {}, list_assets: {} } },
      hassUrl: (p: string) => p,
      localize: (k: string) => k,
      language: "en",
      areas: {},
      callService: async (domain: string, service: string, data: unknown) => {
        w.__calls.push({ domain, service, data });
        if (service === "list_assets") {
          return { response: { folder: "www/anyvac/furniture", assets: [{ name: "sofa.svg", url: SOFA_SVG, width: 200, height: 100, bytes: 1, mtime: 1 }] } };
        }
        return undefined;
      },
      callWS: async () => ({}),
    });
    card.hass = w.__makeHass(opts.floorplanSeats);
    w.__mockHa.cardWrap.style.width = "1200px";
    w.__mockHa.cardWrap.style.height = "700px";
    w.__mockHa.cardWrap.appendChild(card);
    w.__card = card;
  }, { FLOORPLAN_SVG, MAP_SVG, SOFA_SVG, opts });
  await page.evaluate(async () => {
    const card = (window as any).__card;
    await card.updateComplete;
    // wait for the floorplan to load so `_mapAR` is the real 2:1
    for (let i = 0; i < 50 && Math.abs(card._mapAR - 2) > 0.01; i++) await new Promise((r) => setTimeout(r, 20));
    await card.updateComplete;
  });
}

async function furnBox(page: Page, root: "card" | "ve", id: string) {
  return page.evaluate(({ root, id }) => {
    const w = window as any;
    const sr = root === "card" ? w.__card.renderRoot : (document.querySelector("anyvac-visual-editor") as any).shadowRoot;
    const img = sr.querySelector(`.furn-item[data-id="${id}"] image`) as SVGImageElement | null;
    const fp = sr.querySelector(root === "card" ? ".image-base-img" : ".align-floorplan-img") as HTMLElement;
    if (!img) return null;
    const r = img.getBoundingClientRect();
    const f = fp.getBoundingClientRect();
    return { x: r.left - f.left, y: r.top - f.top, w: r.width, h: r.height, fw: f.width, fh: f.height };
  }, { root, id });
}

const PIECE = { id: "sofa", src: SOFA_SVG, x: 25, y: 50, w: 10, h: 20 };

test.describe("card render layer", () => {
  test("a piece sits where its percentages say on the floorplan image", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [PIECE] } });
    const b = (await furnBox(page, "card", "sofa"))!;
    expect(b).not.toBeNull();
    close(b.fw / b.fh, 2, 0.01);
    close(b.x, 0.2 * b.fw, 1); close(b.y, 0.4 * b.fh, 1); close(b.w, 0.1 * b.fw, 1); close(b.h, 0.2 * b.fh, 1);
  });

  test("follows image_base offset/rotation/scale like the floorplan does", async ({ page }) => {
    await mountCard(page, { imageBase: { offset_x: 10, furniture: [PIECE] } });
    const b = (await furnBox(page, "card", "sofa"))!;
    // the floorplan img moved by 120 px too, so relative to it nothing changed
    close(b.x, 0.2 * b.fw, 1); close(b.y, 0.4 * b.fh, 1);
  });

  test("base_height letterboxing matches object-fit: contain", async ({ page }) => {
    await mountCard(page, { baseHeight: 300, imageBase: { furniture: [PIECE] } });
    const b = (await furnBox(page, "card", "sofa"))!;
    // img element is the whole W x 300 wrap; its content is 600 x 300, centred
    close(b.fh, 300, 1);
    const left = (b.fw - 600) / 2;
    close(b.x, left + 150 - 30, 1); close(b.y, 150 - 30, 1); close(b.w, 60, 1); close(b.h, 60, 1);
  });

  test("rotation is about the centre in true pixels (no shear)", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [{ ...PIECE, w: 20, h: 10, rot: 90 }] } });
    const b = (await furnBox(page, "card", "sofa"))!;
    // 0.2W x 0.1H (= 4:1 in true px) rotated 90° -> 0.1H x 0.2W bbox, same centre
    close(b.w, 0.1 * b.fh, 1); close(b.h, 0.2 * b.fw, 1);
    close(b.x + b.w / 2, 0.25 * b.fw, 1); close(b.y + b.h / 2, 0.5 * b.fh, 1);
  });

  test("never catches pointer events", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [PIECE] } });
    const pe = await page.evaluate(() => {
      const l = (window as any).__card.renderRoot.querySelector(".furniture-layer") as HTMLElement;
      return getComputedStyle(l).pointerEvents;
    });
    expect(pe).toBe("none");
  });

  test("split mode renders the vacuum's own floorplan furniture", async ({ page }) => {
    await mountCard(page, { mapMode: "split", imageBase: { furniture: [PIECE] } });
    const b = (await furnBox(page, "card", "sofa"))!;
    expect(b).not.toBeNull();
    close(b.x / b.fw, 0.2, 0.01);
  });

  test("a saved override replaces the YAML list", async ({ page }) => {
    await mountCard(page, {
      imageBase: { furniture: [PIECE] },
      floorplanSeats: { [FLOORPLAN_SVG]: { vacuums: {}, image_base: { src: FLOORPLAN_SVG, furniture: [{ ...PIECE, id: "bed", x: 75 }] } } },
    });
    expect(await furnBox(page, "card", "sofa")).toBeNull();
    const b = (await furnBox(page, "card", "bed"))!;
    close(b.x, 0.7 * b.fw, 1);
  });
});

async function openFurniture(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._openAlign(card._config.vacuums[0]);
    card._setVeTool("furniture");
    await card.updateComplete;
  });
  await page.waitForFunction(() => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot?.querySelector(".furn-svg"));
  await page.evaluate(async () => {
    const card = (window as any).__card;
    for (let i = 0; i < 50 && card._furnAssetsBusy; i++) await new Promise((r) => setTimeout(r, 20));
    await card.updateComplete;
  });
}

const veQ = (page: Page, sel: string) => page.evaluate((sel) => {
  const el = (document.querySelector("anyvac-visual-editor") as any).shadowRoot.querySelector(sel) as Element | null;
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
}, sel);

test.describe("Visual editor: Furniture tool", () => {
  test.use({ viewport: { width: 1400, height: 900 } });

  test("lists the folder and adds a piece with the file's aspect ratio", async ({ page }) => {
    await mountCard(page);
    await openFurniture(page);
    expect(await page.evaluate(() => (window as any).__calls.some((c: any) => c.service === "list_assets"))).toBe(true);
    const asset = await veQ(page, ".furn-asset");
    expect(asset).not.toBeNull();
    await page.mouse.click(asset!.cx, asset!.cy);
    await page.waitForFunction(() => (window as any).__card._furnSession?.items.length === 1);
    const it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
    expect(it).toMatchObject({ x: 50, y: 50, w: 15, h: 15 });
    const b = (await furnBox(page, "ve", it.id))!;
    close(b.w / b.h, 2, 0.02); // 200x100 file
  });

  test("drag moves, corner resizes with the opposite corner pinned, top handle rotates", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [{ ...PIECE, x: 40, y: 50, w: 20, h: 20 }] } });
    await openFurniture(page);
    const before = (await veQ(page, '.furn-item[data-id="sofa"] .furn-hit'))!;
    const unitPx = (await veQ(page, ".furn-svg"))!.w / 100;
    await page.mouse.move(before.cx, before.cy);
    await page.mouse.down();
    await page.mouse.move(before.cx + 60, before.cy + 30, { steps: 4 });
    await page.mouse.up();
    let it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
    close(it.x, 40 + 60 / unitPx, 0.15);
    close(it.y, 50 + (30 / unitPx) * 2, 0.3); // y % of a 2:1 floorplan height

    // corner: free resize (Shift), NW stays put
    const nw0 = (await veQ(page, ".furn-outline"))!;
    const se = (await veQ(page, ".furn-handle--se"))!;
    await page.keyboard.down("Shift");
    await page.mouse.move(se.cx, se.cy);
    await page.mouse.down();
    await page.mouse.move(se.cx + 40, se.cy + 10, { steps: 4 });
    await page.mouse.up();
    await page.keyboard.up("Shift");
    const nw1 = (await veQ(page, ".furn-outline"))!;
    close(nw1.x, nw0.x, 1.5); close(nw1.y, nw0.y, 1.5);
    close(nw1.w, nw0.w + 40, 1.5); close(nw1.h, nw0.h + 10, 1.5);

    // rotate: drag the top handle to the right of the centre -> 90°
    const rot = (await veQ(page, ".furn-handle--rot"))!;
    const c = (await veQ(page, ".furn-outline"))!;
    await page.mouse.move(rot.cx, rot.cy);
    await page.mouse.down();
    await page.mouse.move(c.cx + 200, c.cy, { steps: 4 });
    await page.mouse.up();
    it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
    expect(it.rot).toBe(90);

    // three gestures -> three undo steps back to the start
    await page.evaluate(() => { const c = (window as any).__card; c._furnUndo(); c._furnUndo(); c._furnUndo(); });
    it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
    expect(it).toMatchObject({ x: 40, y: 50, w: 20, h: 20 });
    expect(it.rot).toBeUndefined();
  });

  test("dragging still tracks the pointer with the view rotated 90°", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [{ ...PIECE, x: 50, y: 50, w: 20, h: 20 }] } });
    await openFurniture(page);
    await page.evaluate(async () => { const c = (window as any).__card; c._alignRotateView(); await c.updateComplete; });
    const svgBox = (await veQ(page, ".furn-svg"))!;
    const unitPx = svgBox.h / 100; // rotated: the svg's width now runs vertically
    const h = (await veQ(page, '.furn-item[data-id="sofa"] .furn-hit'))!;
    await page.mouse.move(h.cx, h.cy);
    await page.mouse.down();
    await page.mouse.move(h.cx + 60, h.cy, { steps: 4 });
    await page.mouse.up();
    const it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
    // screen right under a 90° clockwise view = up on the floorplan
    close(it.x, 50, 0.15);
    close(it.y, 50 - (60 / unitPx) * 2, 0.3);
  });

  test("a plain click only selects and leaves no undo step", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [PIECE] } });
    await openFurniture(page);
    const h = (await veQ(page, '.furn-item[data-id="sofa"] .furn-hit'))!;
    await page.mouse.click(h.cx, h.cy);
    const s = await page.evaluate(() => { const f = (window as any).__card._furnSession; return { sel: f.selected, hist: f.history.length }; });
    expect(s).toEqual({ sel: "sofa", hist: 0 });
  });

  test("keyboard: arrows nudge, Delete removes the selected piece", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [PIECE] } });
    await openFurniture(page);
    await page.evaluate(() => (window as any).__card._furnSelect("sofa"));
    await page.keyboard.press("ArrowRight");
    let it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
    expect(it.x).toBe(25.5);
    await page.keyboard.press("ArrowDown");
    it = await page.evaluate(() => (window as any).__card._furnSession.items[0]);
    expect(it.y).toBe(51); // 0.5 unit = 1 % of a 2:1 floorplan's height
    await page.keyboard.press("Delete");
    expect(await page.evaluate(() => (window as any).__card._furnSession.items.length)).toBe(0);
  });

  test("Save sends the whole image_base with the furniture, keeps room_style, and stays open", async ({ page }) => {
    await mountCard(page, {
      imageBase: { rotation: 0, crop_box: { entity: "vacuum.my_roborock", x0: 0, y0: 0, x1: 100, y1: 50 } },
      floorplanSeats: { [FLOORPLAN_SVG]: { vacuums: {}, room_style: { border_normal: 3, border_selected: 5 } } },
    });
    await openFurniture(page);
    await page.evaluate(async () => { await (window as any).__card._furnAdd("/local/anyvac/furniture/bed.webp", 100, 100); });
    await page.evaluate(async () => { await (window as any).__card._furnSave(); });
    const call = await page.evaluate(() => (window as any).__calls.filter((c: any) => c.service === "set_floorplan_seat").pop());
    expect(call.data.floorplan).toBe(FLOORPLAN_SVG);
    expect(call.data.room_style).toEqual({ border_normal: 3, border_selected: 5 });
    expect(call.data.image_base.src).toBe(FLOORPLAN_SVG);
    expect(call.data.image_base.crop_box).toEqual({ entity: "vacuum.my_roborock", x0: 0, y0: 0, x1: 100, y1: 50 });
    expect(call.data.image_base.furniture).toEqual([{ id: "bed", src: "/local/anyvac/furniture/bed.webp", x: 50, y: 50, w: 15, h: 30 }]);
    const open = await page.evaluate(() => { const c = (window as any).__card; return { tool: c._veTool, dirty: c._furnHasUnsavedChanges() }; });
    expect(open).toEqual({ tool: "furniture", dirty: false });
  });

  test("removing every piece saves an empty list (clears YAML pieces too)", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [PIECE] } });
    await openFurniture(page);
    await page.evaluate(async () => { const c = (window as any).__card; c._furnDelete("sofa"); await c._furnSave(); });
    const call = await page.evaluate(() => (window as any).__calls.filter((c: any) => c.service === "set_floorplan_seat").pop());
    expect(call.data.image_base.furniture).toEqual([]);
  });

  test("the Floorplan tool's Save carries the CURRENT furniture, not the copy from when it opened", async ({ page }) => {
    await mountCard(page, { imageBase: { furniture: [PIECE] } });
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._openAlign(card._config.vacuums[0]);
      card._setVeTool("floorplan");
      await card.updateComplete;
    });
    // furniture changes after the floorplan session captured its `rest`
    const moved = { ...PIECE, x: 70 };
    await page.evaluate(async ({ FLOORPLAN_SVG, moved }) => {
      const w = window as any;
      w.__card.hass = w.__makeHass({ [FLOORPLAN_SVG]: { vacuums: {}, image_base: { src: FLOORPLAN_SVG, furniture: [moved] } } });
      await w.__card.updateComplete;
      await w.__card._floorplanSave();
    }, { FLOORPLAN_SVG, moved });
    const call = await page.evaluate(() => (window as any).__calls.filter((c: any) => c.service === "set_floorplan_seat").pop());
    expect(call.data.image_base.furniture).toEqual([moved]);
  });

  test("switching away with unsaved pieces asks first", async ({ page }) => {
    await mountCard(page);
    await openFurniture(page);
    await page.evaluate(async () => { await (window as any).__card._furnAdd("/local/x.webp", 10, 10); });
    await page.evaluate(() => (window as any).__card._setVeTool("rooms"));
    const st = await page.evaluate(() => { const c = (window as any).__card; return { tool: c._veTool, confirm: c._alignCancelConfirm }; });
    expect(st).toEqual({ tool: "furniture", confirm: true });
  });

  test("split mode shows a placeholder instead of the tool", async ({ page }) => {
    await mountCard(page, { mapMode: "split" });
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._openAlign(card._config.vacuums[0]);
      card._setVeTool("furniture");
      await card.updateComplete;
    });
    const txt = await page.evaluate(() => (document.querySelector("anyvac-visual-editor") as any).shadowRoot.textContent as string);
    expect(txt).toContain("Furniture is only available for a shared (merged-mode) floorplan");
  });
});
