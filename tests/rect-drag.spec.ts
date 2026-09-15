import { test, expect } from "@playwright/test";
import { moveRect, resizeRect, type RectPct } from "../src/rectdrag";
import { placeRoomsInCrop, placeRoomInCrop, canvasScaleForCrop, roomBboxToRect, seatRotateScaleCss } from "../src/seatfit";

/**
 * docs/38 §3/§5 — pure-geometry regression tests for the editor's room-rect
 * drag/resize and the crop-box room placement. These are plain Node tests
 * (no `page` fixture used anywhere in this file, so Playwright never spins
 * up a browser for them) — the point is exercising `rectdrag.ts`/
 * `seatfit.ts` directly, the same way `layout.ts`'s pure helpers could be,
 * without the mock-HA-DOM harness the browser specs need.
 */

test.describe("rectdrag: moveRect", () => {
  test("moves the centre by the delta from drag start, not to the pointer's absolute position", () => {
    // The exact shape from the docs/38 §1 field report (Living room, a large
    // off-centre rectangle in a tall preview) — this is precisely the case
    // where the OLD "write the absolute cursor position" code snapped the
    // rect's centre by up to ~250px the instant a drag started.
    const orig: RectPct = { x: 48, y: 20, w: 91, h: 37 };
    expect(moveRect(orig, 5, 5)).toEqual({ map_x: 53, map_y: 25 });
  });

  test("the result depends only on the delta, never on where in the rect the drag started", () => {
    // moveRect's signature has no notion of a grab point at all — the same
    // (orig, dx, dy) always produces the same result regardless of which
    // part of the rectangle a real pointerdown landed on.
    const orig: RectPct = { x: 48, y: 20, w: 91, h: 37 };
    const a = moveRect(orig, -12.3, 7.8);
    const b = moveRect({ ...orig }, -12.3, 7.8);
    expect(a).toEqual(b);
    expect(a).toEqual({ map_x: 35.7, map_y: 27.8 });
  });

  test("rounds to 0.1% and clamps to the 0-100% bounds", () => {
    expect(moveRect({ x: 10, y: 10, w: 5, h: 5 }, 0.03, 0.07)).toEqual({ map_x: 10, map_y: 10.1 });
    expect(moveRect({ x: 98, y: 2, w: 5, h: 5 }, 10, -10)).toEqual({ map_x: 100, map_y: 0 });
  });
});

test.describe("rectdrag: resizeRect", () => {
  test("se: the opposite corner (nw) stays anchored", () => {
    const orig: RectPct = { x: 50, y: 50, w: 20, h: 10 };
    const result = resizeRect(orig, "se", 4, 2);
    expect(result).toEqual({ map_x: 52, map_y: 51, map_w: 24, map_h: 12 });
    const anchor = { x: result.map_x - result.map_w / 2, y: result.map_y - result.map_h / 2 };
    expect(anchor).toEqual({ x: 40, y: 45 });
  });

  test("nw: the opposite corner (se) stays anchored", () => {
    const orig: RectPct = { x: 50, y: 50, w: 20, h: 10 };
    const result = resizeRect(orig, "nw", 4, 2);
    const anchor = { x: result.map_x + result.map_w / 2, y: result.map_y + result.map_h / 2 };
    expect(anchor).toEqual({ x: 60, y: 55 });
  });

  test("clamps to a 2% minimum without flipping sides when dragged onto the anchor", () => {
    const orig: RectPct = { x: 50, y: 50, w: 20, h: 10 };
    // The se corner starts at (60, 55); this delta drags it exactly onto the
    // anchor (the nw corner, at (40, 45)) — a real drag going further still
    // would cross to the other side, but the anchor itself already collapses
    // the raw size to 0, which is where the 2% floor has to hold.
    const result = resizeRect(orig, "se", -20, -10);
    expect(result).toEqual({ map_x: 40, map_y: 45, map_w: 2, map_h: 2 });
  });

  test("always computed from orig, never from an already-moved intermediate state", () => {
    const orig: RectPct = { x: 50, y: 50, w: 20, h: 10 };
    const first = resizeRect(orig, "se", 4, 2);
    // A second call with a bigger delta but the SAME orig must anchor on
    // exactly the same opposite corner as the first — a real drag loop
    // always re-derives from `orig`, never from a previous call's result.
    const second = resizeRect(orig, "se", 8, 4);
    const anchor1 = { x: first.map_x - first.map_w / 2, y: first.map_y - first.map_h / 2 };
    const anchor2 = { x: second.map_x - second.map_w / 2, y: second.map_y - second.map_h / 2 };
    expect(anchor1).toEqual(anchor2);
    expect(anchor1).toEqual({ x: 40, y: 45 });
  });
});

test.describe("seatfit: placeRoomsInCrop", () => {
  const crop = { x0: 400, y0: 400, x1: 800, y1: 1200 };
  const intRooms = [
    { name: "Kitchen", bbox_px: { x0: 400, y0: 400, x1: 600, y1: 600 } },
    { name: "Bedroom", bbox_px: { x0: 600, y0: 800, x1: 800, y1: 1200 } },
    { name: "Hall", bbox_px: null },
  ];

  test("an existing room of the same name gets new geometry but keeps its other fields", () => {
    const existing = [
      {
        key: "Kitchen", name: "Kitchen", icon: "mdi:fridge", clean_time_dry: 12,
        icon_anchor: "tl", map_x: 1, map_y: 1, map_w: 1, map_h: 1,
      },
    ];
    const { rooms, placed, added } = placeRoomsInCrop(intRooms, crop, existing, () => "mdi:numeric-1-circle");
    expect(placed).toBe(1);
    expect(added).toBe(1); // Bedroom is new
    const kitchen = rooms.find((r) => r.key === "Kitchen")!;
    expect(kitchen.icon).toBe("mdi:fridge");
    expect(kitchen.clean_time_dry).toBe(12);
    expect(kitchen.icon_anchor).toBe("tl");
    expect(kitchen.map_x).not.toBe(1);
  });

  test("a missing room is added with the given icon", () => {
    const { rooms, added } = placeRoomsInCrop(intRooms, crop, [], (i) => `icon-${i}`);
    expect(added).toBe(2);
    const bedroom = rooms.find((r) => r.key === "Bedroom")!;
    expect(bedroom.name).toBe("Bedroom");
    expect(bedroom.icon).toBe("icon-1");
  });

  test("a room without bbox_px is skipped and any existing entry is left untouched", () => {
    const existing = [{ key: "Hall", name: "Hall", map_x: 42, map_y: 42 }];
    const { rooms, placed, added } = placeRoomsInCrop(intRooms, crop, existing, () => "mdi:square");
    const hall = rooms.find((r) => r.key === "Hall")!;
    expect(hall.map_x).toBe(42);
    expect(hall.map_y).toBe(42);
    expect(placed).toBe(0); // Hall itself never matches (no bbox_px)
    expect(added).toBe(2); // Kitchen + Bedroom
  });

  test("matches placeRoomInCrop's own numbers for the same bbox/crop", () => {
    const { rooms } = placeRoomsInCrop(intRooms, crop, [], (i) => `icon-${i}`);
    const kitchen = rooms.find((r) => r.key === "Kitchen")!;
    const direct = placeRoomInCrop(intRooms[0].bbox_px!, crop)!;
    expect(kitchen.map_x).toBe(direct.map_x);
    expect(kitchen.map_y).toBe(direct.map_y);
    expect(kitchen.map_w).toBe(direct.map_w);
    expect(kitchen.map_h).toBe(direct.map_h);
  });
});

test.describe("seatfit: canvasScaleForCrop (docs/40 §5.A.1)", () => {
  test("a near-exact match (≤2px per axis) reports scale 1, not a fractional rounding artifact", () => {
    const crop = { x0: 10, y0: 20, x1: 410, y1: 220 }; // 400x200
    expect(canvasScaleForCrop({ w: 401, h: 199 }, crop)).toBe(1);
    expect(canvasScaleForCrop({ w: 400, h: 200 }, crop)).toBe(1);
  });

  test("a uniform 2× re-export (same aspect ratio, doubled resolution) is recognized, not flagged", () => {
    const crop = { x0: 0, y0: 0, x1: 600, y1: 400 }; // AR 1.5
    expect(canvasScaleForCrop({ w: 1200, h: 800 }, crop)).toBe(2);
  });

  test("a uniform re-export at an odd factor still resolves to one consistent scale", () => {
    const crop = { x0: 0, y0: 0, x1: 300, y1: 900 }; // AR 1/3
    // 0.6x on both axes.
    expect(canvasScaleForCrop({ w: 180, h: 540 }, crop)).toBeCloseTo(0.6, 5);
  });

  test("docs/40's own counter-example (351×1317 vs crop 352×1308, AR off by ~1%) is a real mismatch, not a re-export", () => {
    const crop = { x0: 0, y0: 0, x1: 352, y1: 1308 };
    expect(canvasScaleForCrop({ w: 351, h: 1317 }, crop)).toBeNull();
  });

  test("null/zero-sized inputs never crash and are treated as no scale relation", () => {
    const crop = { x0: 0, y0: 0, x1: 400, y1: 200 };
    expect(canvasScaleForCrop(null, crop)).toBeNull();
    expect(canvasScaleForCrop({ w: 400, h: 200 }, null)).toBeNull();
    expect(canvasScaleForCrop({ w: 0, h: 200 }, crop)).toBeNull();
    expect(canvasScaleForCrop({ w: 400, h: 200 }, { x0: 0, y0: 0, x1: 0, y1: 200 })).toBeNull();
  });
});

test.describe("seatfit: roomBboxToRect with an anisotropic manual seat (2026-09-15 field report)", () => {
  // A precisely-measured external floorplan can still disagree with the
  // robot's own raw map proportions — a single uniform `scale` can't reach
  // that, hence `scaleY`: an independent Y-axis stretch applied in the
  // robot's own LOCAL space, before `rotation` turns it into place (same
  // order the CSS transform composes in — `rotate(...) scale(sx,sy)`).
  const at = { image_dims: { width: 1000, height: 1000, scale: 1, rotation: 0 } };

  test("scaleY unset behaves exactly like the old uniform `scale` (regression pin)", () => {
    const ir = { bbox_px: { x0: 400, y0: 400, x1: 600, y1: 600 } }; // centred, 0.2x0.2
    const seat = { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 };
    expect(roomBboxToRect(ir, at, seat, 1)).toEqual({ map_x: 50, map_y: 50, map_w: 20, map_h: 20 });
  });

  test("scaleY stretches only the room's height at rotation 0, not its width or position (centred bbox)", () => {
    const ir = { bbox_px: { x0: 400, y0: 400, x1: 600, y1: 600 } };
    const seat = { rotation: 0, scale: 100, scaleY: 200, offset_x: 0, offset_y: 0 };
    expect(roomBboxToRect(ir, at, seat, 1)).toEqual({ map_x: 50, map_y: 50, map_w: 20, map_h: 40 });
  });

  test("an off-centre bbox is repositioned by scaleY too, not just resized (it's a real axis stretch of the whole map)", () => {
    const ir = { bbox_px: { x0: 600, y0: 700, x1: 800, y1: 900 } }; // centre (700,800), 0.2x0.2
    const seat = { rotation: 0, scale: 100, scaleY: 150, offset_x: 0, offset_y: 0 };
    expect(roomBboxToRect(ir, at, seat, 1)).toEqual({ map_x: 70, map_y: 95, map_w: 20, map_h: 30 });
  });

  test("at 90° rotation, scale/scaleY swap which SCREEN axis they affect (they're the robot's own local axes, rotation is a separate later step)", () => {
    const ir = { bbox_px: { x0: 400, y0: 400, x1: 600, y1: 600 } }; // centred, local 0.2x0.2
    const seat = { rotation: 90, scale: 100, scaleY: 200, offset_x: 0, offset_y: 0 };
    // Local X (scale=100%) -> screen height; local Y (scaleY=200%) -> screen width.
    expect(roomBboxToRect(ir, at, seat, 1)).toEqual({ map_x: 50, map_y: 50, map_w: 40, map_h: 20 });
  });
});

test.describe("seatfit: seatRotateScaleCss (2026-09-15 field report)", () => {
  test("no scaleY -> plain rotate, no scale() term added", () => {
    expect(seatRotateScaleCss(0, 100)).toBe("rotate(0deg)");
  });

  test("scaleY equal to scale -> still plain rotate (isotropic, no visible/DOM change)", () => {
    expect(seatRotateScaleCss(90, 100, 100)).toBe("rotate(90deg)");
  });

  test("scaleY greater than scale -> appends a Y-only scale() after rotate", () => {
    expect(seatRotateScaleCss(0, 100, 150)).toBe("rotate(0deg) scale(1,1.5)");
  });

  test("the ratio is scaleY/scale, not scaleY alone", () => {
    expect(seatRotateScaleCss(45, 200, 100)).toBe("rotate(45deg) scale(1,0.5)");
  });

  test("scale of 0 never divides by zero -- falls back to plain rotate", () => {
    expect(seatRotateScaleCss(0, 0, 150)).toBe("rotate(0deg)");
  });
});
