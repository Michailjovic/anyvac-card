import { test, expect } from "@playwright/test";
import { recropFromGesture, pointInCrop, cropBoxToYaml, type CropBox } from "../src/seatfit";

/**
 * docs/42 §9 fáze N (docs/41 §4.5 "cesta A") — pure-geometry regression
 * tests for `recropFromGesture`, the linear inverse of `pointInCrop`/
 * `placeRoomInCrop` the Visual editor's Re-crop tool solves on Save. Plain
 * Node tests (no `page` fixture), same pattern as
 * `tests/seatfit-calibration.spec.ts`.
 *
 * The core property under test, for every case below: after re-cropping,
 * `pointInCrop(homePx, newCrop)` for an ARBITRARY home-frame point must
 * equal what dragging/scaling that same point's OLD placement
 * (`pointInCrop(homePx, oldCrop)`) by the gesture would have produced —
 * i.e. the ghost ends up exactly where the user put it, and never has to
 * move again after Save.
 */

function gestureT(pctOld: { x: number; y: number }, gesture: { offset_x: number; offset_y: number; scale: number }) {
  const s = gesture.scale / 100;
  return { x: (pctOld.x - 50) * s + 50 + gesture.offset_x, y: (pctOld.y - 50) * s + 50 + gesture.offset_y };
}

test.describe("seatfit: recropFromGesture (docs/42 §9 fáze N)", () => {
  const oldCrop: CropBox = { x0: 100, y0: 200, x1: 900, y1: 600 };

  test("identity gesture (no drag/scale) leaves the crop byte-for-byte unchanged", () => {
    const next = recropFromGesture(oldCrop, { offset_x: 0, offset_y: 0, scale: 100 });
    expect(next).toEqual(oldCrop);
  });

  test("a pure translate reproduces the dragged position for an arbitrary home-px point", () => {
    const gesture = { offset_x: 8, offset_y: -5, scale: 100 };
    const next = recropFromGesture(oldCrop, gesture)!;
    expect(next).not.toBeNull();
    for (const homePx of [{ x: 100, y: 200 }, { x: 900, y: 600 }, { x: 430, y: 355 }]) {
      const pctOld = pointInCrop(homePx, oldCrop)!;
      const pctNew = pointInCrop(homePx, next)!;
      const expected = gestureT(pctOld, gesture);
      expect(pctNew.x).toBeCloseTo(expected.x, 6);
      expect(pctNew.y).toBeCloseTo(expected.y, 6);
    }
  });

  test("a pure uniform scale (about the wrap centre) reproduces the scaled position", () => {
    const gesture = { offset_x: 0, offset_y: 0, scale: 140 };
    const next = recropFromGesture(oldCrop, gesture)!;
    for (const homePx of [{ x: 100, y: 200 }, { x: 900, y: 600 }, { x: 250, y: 450 }]) {
      const pctOld = pointInCrop(homePx, oldCrop)!;
      const pctNew = pointInCrop(homePx, next)!;
      const expected = gestureT(pctOld, gesture);
      expect(pctNew.x).toBeCloseTo(expected.x, 6);
      expect(pctNew.y).toBeCloseTo(expected.y, 6);
    }
  });

  test("a combined drag+scale (the real corner-handle gesture) still round-trips exactly", () => {
    const gesture = { offset_x: -12.5, offset_y: 6.25, scale: 82 };
    const next = recropFromGesture(oldCrop, gesture)!;
    for (const homePx of [{ x: 100, y: 200 }, { x: 900, y: 600 }, { x: 512, y: 480 }, { x: 730, y: 210 }]) {
      const pctOld = pointInCrop(homePx, oldCrop)!;
      const pctNew = pointInCrop(homePx, next)!;
      const expected = gestureT(pctOld, gesture);
      expect(pctNew.x).toBeCloseTo(expected.x, 6);
      expect(pctNew.y).toBeCloseTo(expected.y, 6);
    }
  });

  test("scaling up (>100%) shrinks the crop box; scaling down grows it", () => {
    const grown = recropFromGesture(oldCrop, { offset_x: 0, offset_y: 0, scale: 50 })!;
    expect(grown.x1 - grown.x0).toBeCloseTo((oldCrop.x1 - oldCrop.x0) / 0.5, 6);
    const shrunk = recropFromGesture(oldCrop, { offset_x: 0, offset_y: 0, scale: 200 })!;
    expect(shrunk.x1 - shrunk.x0).toBeCloseTo((oldCrop.x1 - oldCrop.x0) / 2, 6);
  });

  test("a degenerate old crop (zero/negative size) returns null", () => {
    expect(recropFromGesture({ x0: 10, y0: 10, x1: 10, y1: 20 }, { offset_x: 0, offset_y: 0, scale: 100 })).toBeNull();
    expect(recropFromGesture({ x0: 10, y0: 10, x1: 5, y1: 20 }, { offset_x: 0, offset_y: 0, scale: 100 })).toBeNull();
  });

  test("a non-positive gesture scale returns null (nothing to invert)", () => {
    expect(recropFromGesture(oldCrop, { offset_x: 0, offset_y: 0, scale: 0 })).toBeNull();
    expect(recropFromGesture(oldCrop, { offset_x: 0, offset_y: 0, scale: -50 })).toBeNull();
  });
});

test.describe("seatfit: cropBoxToYaml (docs/42 §9 fáze N)", () => {
  test("formats a rounded crop_box block with its frame_id quoted", () => {
    const yaml = cropBoxToYaml({ frame_id: "frame1", x0: 100.4, y0: 199.6, x1: 900.1, y1: 599.9 });
    expect(yaml).toBe(
      "image_base:\n  crop_box:\n    frame_id: \"frame1\"\n    x0: 100\n    y0: 200\n    x1: 900\n    y1: 600"
    );
  });
});
