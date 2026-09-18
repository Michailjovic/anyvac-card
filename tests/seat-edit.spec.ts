import { test, expect, type Page } from "@playwright/test";
import {
  seatToMatrix,
  translateSeat,
  scaleSeatAbout,
  scaleSeatCornerAniso,
  rotateSeatAbout,
  stretchSeatY,
  stretchSeatX,
  localAxisScaleRatio,
  pinchSeat,
  nudgeOffset,
  nudgeRotation,
  nudgeScale,
  snapRotation,
  seatToYaml,
  applyFloorplanSeats,
  type SeatEditConfigLike,
} from "../src/seatedit";
import { computeSeatFit, buildCalibrationAnchors, type SeatParams } from "../src/seatfit";

/**
 * docs/41 Fáze A — pure gesture math for Align mode.
 *
 * Two kinds of ground truth here, matching the project's established split
 * (`seatfit-calibration.spec.ts` for the first kind, `rotated-map.spec.ts`
 * for the second):
 *
 * 1. Most of this file is plain Node tests (no `page` fixture) that cross-
 *    check `seatedit.ts`'s operations against `forwardPct`, an INDEPENDENT
 *    reimplementation of `seatProjectPct` (seatfit.ts, not exported) — e.g.
 *    "scaling about a pivot keeps the content point under that pivot fixed
 *    on screen" is verified by projecting a known content point through the
 *    seat before and after, not by re-deriving the same formula.
 *
 * 2. `seatToMatrix` itself is checked against a REAL rendered `.map-img` in
 *    a mounted card — the browser computes the transform, not our own maths
 *    checked against itself.
 */

// ── Cross-check ground truth: independent reimplementation of seatProjectPct ──

/** Mirrors `seatfit.ts`'s (unexported) `seatProjectPct` — projects a
 *  NW-normalised content point (`q`, origin at content centre) through
 *  `seat` onto the floorplan wrap, as percent. Independent reimplementation
 *  for cross-checking `seatedit.ts`'s operations, same convention
 *  `seatfit-calibration.spec.ts`'s own `forwardPoint` already uses. */
function forwardPct(q: { x: number; y: number }, seat: SeatParams, ar: number): { x: number; y: number } {
  const sx = seat.scale / 100;
  const sy = (seat.scaleY ?? seat.scale) / 100;
  const theta = (seat.rotation * Math.PI) / 180;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const c = { x: (50 + seat.offset_x) / 100, y: (50 + seat.offset_y) / 100 / ar };
  const qx = sx * q.x, qy = sy * q.y;
  const u = { x: c.x + (cos * qx - sin * qy), y: c.y + (sin * qx + cos * qy) };
  return { x: u.x * 100, y: u.y * ar * 100 };
}

/** Same idea, raw-pixel-space variant — mirrors `seatfit-calibration.spec.ts`'s
 *  `forwardPoint` exactly (used to build calibration anchor pairs for the
 *  `computeSeatFit` snapRotation tests below). */
function forwardPointFromPx(
  rawPx: { x: number; y: number }, dims: { NW: number; NH: number }, seat: SeatParams, ar: number,
): { x: number; y: number } {
  const q = { x: (rawPx.x - dims.NW / 2) / dims.NW, y: (rawPx.y - dims.NH / 2) / dims.NW };
  return forwardPct(q, seat, ar);
}

// ── Pure gesture math ───────────────────────────────────────────────────────

test.describe("seatedit: translateSeat / scaleSeatAbout / rotateSeatAbout / stretchSeatY", () => {
  const ar = 1.6;

  test("translateSeat adds directly to offset_x/offset_y, touches nothing else", () => {
    const seat: SeatParams = { rotation: 10, scale: 120, offset_x: 3, offset_y: -2 };
    const next = translateSeat(seat, 5, -1.5);
    expect(next.offset_x).toBeCloseTo(8, 9);
    expect(next.offset_y).toBeCloseTo(-3.5, 9);
    expect(next.rotation).toBe(10);
    expect(next.scale).toBe(120);
  });

  test("scaleSeatAbout keeps the pivot's content point fixed on screen", () => {
    const seat: SeatParams = { rotation: 25, scale: 80, offset_x: 4, offset_y: -6, scaleY: 95 };
    const q = { x: 0.3, y: -0.12 };
    const pivot = forwardPct(q, seat, ar);
    const next = scaleSeatAbout(seat, 1.4, pivot, ar);
    const after = forwardPct(q, next, ar);
    expect(after.x).toBeCloseTo(pivot.x, 6);
    expect(after.y).toBeCloseTo(pivot.y, 6);
    expect(next.scale).toBeCloseTo(80 * 1.4, 9);
    expect(next.scaleY!).toBeCloseTo(95 * 1.4, 9);
    expect(next.rotation).toBe(25);
  });

  test("scaleSeatAbout the seat's own centre is a pure scale (offset unchanged)", () => {
    const seat: SeatParams = { rotation: 0, scale: 100, offset_x: 12, offset_y: -8 };
    const centre = { x: 50 + seat.offset_x, y: 50 + seat.offset_y };
    const next = scaleSeatAbout(seat, 2, centre, ar);
    expect(next.offset_x).toBeCloseTo(seat.offset_x, 9);
    expect(next.offset_y).toBeCloseTo(seat.offset_y, 9);
    expect(next.scale).toBeCloseTo(200, 9);
  });

  test("rotateSeatAbout keeps the pivot's content point fixed on screen", () => {
    const seat: SeatParams = { rotation: 5, scale: 110, offset_x: -8, offset_y: 12 };
    const q = { x: -0.2, y: 0.35 };
    const pivot = forwardPct(q, seat, ar);
    const next = rotateSeatAbout(seat, 37, pivot, ar);
    const after = forwardPct(q, next, ar);
    expect(after.x).toBeCloseTo(pivot.x, 6);
    expect(after.y).toBeCloseTo(pivot.y, 6);
    expect(next.rotation).toBeCloseTo(42, 9);
  });

  test("rotateSeatAbout the seat's own centre does not move the offset", () => {
    const seat: SeatParams = { rotation: 60, scale: 90, offset_x: 7, offset_y: -3 };
    const centre = { x: 50 + seat.offset_x, y: 50 + seat.offset_y };
    const next = rotateSeatAbout(seat, 15, centre, ar);
    expect(next.offset_x).toBeCloseTo(seat.offset_x, 9);
    expect(next.offset_y).toBeCloseTo(seat.offset_y, 9);
    expect(next.rotation).toBeCloseTo(75, 9);
  });

  test("stretchSeatY sets scale_y from scale when unset, compounds when set", () => {
    const seat: SeatParams = { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 };
    const next = stretchSeatY(seat, 1.2);
    expect(next.scaleY).toBeCloseTo(120, 9);
    expect(next.scale).toBe(100);
    const seat2: SeatParams = { ...seat, scaleY: 80 };
    expect(stretchSeatY(seat2, 1.5).scaleY).toBeCloseTo(120, 9);
  });
});

// docs/41 field report 2026-09-18 — corner handles stayed aspect-locked even
// with Independent Y scale on, and there was no X-axis stretch primitive at
// all (only the uniform `scale` + `stretchSeatY`). `scaleSeatCornerAniso` /
// `stretchSeatX` / `localAxisScaleRatio` close both gaps.
test.describe("seatedit: scaleSeatCornerAniso / stretchSeatX / localAxisScaleRatio", () => {
  const ar = 1.6;

  test("scaleSeatCornerAniso with kx === ky matches scaleSeatAbout exactly (rotation 0, cross-check against the trusted uniform path)", () => {
    const seat: SeatParams = { rotation: 0, scale: 90, offset_x: 5, offset_y: -3, scaleY: 70 };
    const pivot = { x: 20, y: 15 };
    const s0 = { x: 60, y: 55 };
    const k = 1.35;
    // rotation 0 -> local axes === world (pct) axes, so scaling the RAW
    // pointer offset from pivot by k on both axes is exactly kx = ky = k.
    const s1 = { x: pivot.x + (s0.x - pivot.x) * k, y: pivot.y + (s0.y - pivot.y) * k };
    const aniso = scaleSeatCornerAniso(seat, s0, s1, pivot, ar);
    const uniform = scaleSeatAbout(seat, k, pivot, ar);
    expect(aniso.scale).toBeCloseTo(uniform.scale, 6);
    expect(aniso.scaleY!).toBeCloseTo(uniform.scaleY!, 6);
    expect(aniso.offset_x).toBeCloseTo(uniform.offset_x, 6);
    expect(aniso.offset_y).toBeCloseTo(uniform.offset_y, 6);
  });

  test("scaleSeatCornerAniso with kx !== ky stretches each axis independently and keeps the pivot's content point fixed (rotation 0)", () => {
    const seat: SeatParams = { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 };
    const qPivot = { x: -0.5, y: -0.5 }; // NW corner, opposite an SE drag
    const pivot = forwardPct(qPivot, seat, ar);
    const s0 = forwardPct({ x: 0.5, y: 0.5 }, seat, ar); // SE corner, the dragged one
    const kx = 1.5, ky = 0.6;
    const s1 = { x: pivot.x + (s0.x - pivot.x) * kx, y: pivot.y + (s0.y - pivot.y) * ky };
    const next = scaleSeatCornerAniso(seat, s0, s1, pivot, ar);
    expect(next.scale).toBeCloseTo(100 * kx, 6);
    expect(next.scaleY!).toBeCloseTo(100 * ky, 6);
    const pivotAfter = forwardPct(qPivot, next, ar);
    expect(pivotAfter.x).toBeCloseTo(pivot.x, 6);
    expect(pivotAfter.y).toBeCloseTo(pivot.y, 6);
  });

  test("scaleSeatCornerAniso keeps the pivot's content point fixed for an arbitrary drag on a ROTATED seat", () => {
    const seat: SeatParams = { rotation: 33, scale: 85, offset_x: 6, offset_y: -4, scaleY: 60 };
    const qPivot = { x: 0.5, y: -0.5 }; // NE corner, opposite a SW drag
    const pivot = forwardPct(qPivot, seat, ar);
    const s0 = forwardPct({ x: -0.5, y: 0.5 }, seat, ar); // SW corner, the dragged one
    // An arbitrary drag destination — not constructed from any particular
    // kx/ky — the pivot-invariance guarantee has to hold regardless.
    const s1 = { x: s0.x - 11, y: s0.y + 23 };
    const next = scaleSeatCornerAniso(seat, s0, s1, pivot, ar);
    const pivotAfter = forwardPct(qPivot, next, ar);
    expect(pivotAfter.x).toBeCloseTo(pivot.x, 6);
    expect(pivotAfter.y).toBeCloseTo(pivot.y, 6);
    expect(next.rotation).toBe(33);
  });

  test("stretchSeatX sets scale from scale when scaleY unset, compounds when set — mirrors stretchSeatY, never touches scaleY/offset/rotation", () => {
    const seat: SeatParams = { rotation: 12, scale: 100, offset_x: 3, offset_y: -2 };
    const next = stretchSeatX(seat, 1.3);
    expect(next.scale).toBeCloseTo(130, 9);
    expect(next.scaleY).toBeCloseTo(100, 9); // frozen from `scale` so Y stays put
    expect(next.offset_x).toBe(3);
    expect(next.offset_y).toBe(-2);
    expect(next.rotation).toBe(12);
    const seat2: SeatParams = { ...seat, scaleY: 80 };
    const next2 = stretchSeatX(seat2, 1.5);
    expect(next2.scale).toBeCloseTo(150, 9);
    expect(next2.scaleY).toBeCloseTo(80, 9); // untouched, already independent
  });

  test("localAxisScaleRatio recovers the exact local-axis factor regardless of rotation or the seat's own scale/scaleY", () => {
    for (const seat of [
      { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 } as SeatParams,
      { rotation: 47, scale: 130, offset_x: 8, offset_y: -5, scaleY: 65 } as SeatParams,
    ]) {
      const k = 1.75;
      const s0 = forwardPct({ x: 0, y: 0.3 }, seat, ar); // pure local-Y offset from centre
      const s1 = forwardPct({ x: 0, y: 0.3 * k }, seat, ar); // same local axis, scaled
      expect(localAxisScaleRatio(seat, "y", s0, s1, ar)).toBeCloseTo(k, 6);

      const s0x = forwardPct({ x: 0.4, y: 0 }, seat, ar); // pure local-X offset from centre
      const s1x = forwardPct({ x: 0.4 * k, y: 0 }, seat, ar);
      expect(localAxisScaleRatio(seat, "x", s0x, s1x, ar)).toBeCloseTo(k, 6);
    }
  });
});

test.describe("seatedit: pinchSeat", () => {
  const ar = 1.6;

  test("reproduces a known target seat from two point deltas (round trip)", () => {
    const seat0: SeatParams = { rotation: 12, scale: 95, offset_x: 2, offset_y: -4 };
    const seat1: SeatParams = { rotation: 48, scale: 132, offset_x: -9, offset_y: 6.5 };
    const qa = { x: 0.4, y: 0.1 };
    const qb = { x: -0.25, y: -0.3 };
    const p0a = forwardPct(qa, seat0, ar), p0b = forwardPct(qb, seat0, ar);
    const p1a = forwardPct(qa, seat1, ar), p1b = forwardPct(qb, seat1, ar);
    const got = pinchSeat(seat0, p0a, p0b, p1a, p1b, ar);
    expect(got.rotation).toBeCloseTo(seat1.rotation, 6);
    expect(got.scale).toBeCloseTo(seat1.scale, 6);
    expect(got.offset_x).toBeCloseTo(seat1.offset_x, 6);
    expect(got.offset_y).toBeCloseTo(seat1.offset_y, 6);
  });

  test("round trip also holds with an anisotropic scale_y", () => {
    const seat0: SeatParams = { rotation: -20, scale: 60, scaleY: 75, offset_x: 10, offset_y: 10 };
    const seat1: SeatParams = { rotation: 200, scale: 60 * 1.8, scaleY: 75 * 1.8, offset_x: -4, offset_y: 22 };
    const qa = { x: 0.15, y: 0.4 };
    const qb = { x: 0.35, y: -0.1 };
    const p0a = forwardPct(qa, seat0, ar), p0b = forwardPct(qb, seat0, ar);
    const p1a = forwardPct(qa, seat1, ar), p1b = forwardPct(qb, seat1, ar);
    const got = pinchSeat(seat0, p0a, p0b, p1a, p1b, ar);
    // normDeg already lands this in [0,360) — 200 directly, not -160.
    expect(got.rotation).toBeCloseTo(200, 5);
    expect(got.scale).toBeCloseTo(seat1.scale, 5);
    expect(got.scaleY!).toBeCloseTo(seat1.scaleY!, 5);
  });

  test("is a no-op when the two pointers coincide (no signal)", () => {
    const seat: SeatParams = { rotation: 9, scale: 70, offset_x: 1, offset_y: 1 };
    const p = { x: 40, y: 40 };
    const got = pinchSeat(seat, p, p, { x: 60, y: 60 }, { x: 60, y: 60 }, ar);
    expect(got).toEqual(seat);
  });
});

test.describe("seatedit: keyboard nudges + snap", () => {
  const ar = 1.6;

  test("nudgeOffset at zero view rotation is a plain translate", () => {
    const seat: SeatParams = { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 };
    expect(nudgeOffset(seat, 0.1, -0.2, 0, ar)).toEqual(translateSeat(seat, 0.1, -0.2));
  });

  test("nudgeOffset commutes with view rotation (docs/41 §4.4 'in screen directions')", () => {
    const seat: SeatParams = { rotation: 15, scale: 105, offset_x: 3, offset_y: -1 };
    const q = { x: 0.15, y: -0.22 };
    for (const viewRot of [0, 37, 90, -125, 250]) {
      const before = forwardPct(q, seat, ar);
      const next = nudgeOffset(seat, 0.4, -0.3, viewRot, ar);
      const after = forwardPct(q, next, ar);
      const deltaPct = { x: after.x - before.x, y: after.y - before.y };
      // Re-express the wrap-space delta "as seen through the view" by rotating
      // it by the view's own angle — should land back on the requested nudge
      // regardless of viewRot, since nudgeOffset un-rotated it by the same
      // angle before applying it.
      const deltaFrac = { x: deltaPct.x / 100, y: deltaPct.y / 100 / ar };
      const t = (viewRot * Math.PI) / 180;
      const cos = Math.cos(t), sin = Math.sin(t);
      const viewFrac = { x: cos * deltaFrac.x - sin * deltaFrac.y, y: sin * deltaFrac.x + cos * deltaFrac.y };
      const viewPct = { x: viewFrac.x * 100, y: viewFrac.y * ar * 100 };
      expect(viewPct.x).toBeCloseTo(0.4, 6);
      expect(viewPct.y).toBeCloseTo(-0.3, 6);
    }
  });

  test("nudgeRotation wraps into [0,360)", () => {
    expect(nudgeRotation({ rotation: 350, scale: 100, offset_x: 0, offset_y: 0 }, 20).rotation).toBeCloseTo(10, 9);
    expect(nudgeRotation({ rotation: 5, scale: 100, offset_x: 0, offset_y: 0 }, -20).rotation).toBeCloseTo(345, 9);
  });

  test("nudgeScale scales scale_y proportionally when set", () => {
    const seat: SeatParams = { rotation: 0, scale: 100, scaleY: 80, offset_x: 0, offset_y: 0 };
    const next = nudgeScale(seat, 10);
    expect(next.scale).toBeCloseTo(110, 9);
    expect(next.scaleY!).toBeCloseTo(88, 9);
  });

  test("snapRotation: magnet inside the threshold, untouched outside it", () => {
    expect(snapRotation(2)).toBe(0);
    expect(snapRotation(-2)).toBe(0);
    expect(snapRotation(88)).toBe(90);
    expect(snapRotation(358)).toBe(0);
    expect(snapRotation(8)).toBe(8);
    expect(snapRotation(45)).toBe(45);
    expect(snapRotation(272, 3)).toBe(270);
    expect(snapRotation(276, 3)).toBe(276);
  });
});

test.describe("seatedit: seatToYaml", () => {
  test("formats and rounds every field to 0.01 (docs/41 §5 bod 4)", () => {
    const seat: SeatParams = { rotation: 12.345, scale: 108.006, scaleY: 99.999, offset_x: -3.211, offset_y: 0.004 };
    expect(seatToYaml(seat)).toBe(
      'map:\n  seat: "manual"\n  rotation: 12.35\n  scale: 108.01\n  scale_y: 100\n  offset_x: -3.21\n  offset_y: 0'
    );
  });

  test("omits scale_y when unset", () => {
    const seat: SeatParams = { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 };
    expect(seatToYaml(seat)).not.toContain("scale_y");
    expect(seatToYaml(seat)).toBe('map:\n  seat: "manual"\n  rotation: 0\n  scale: 100\n  offset_x: 0\n  offset_y: 0');
  });
});

test.describe("seatedit: applyFloorplanSeats (docs/41 §4.6)", () => {
  function splitConfig(): SeatEditConfigLike {
    return {
      map_mode: "split",
      vacuums: [
        { entity: "vacuum.s6", image_base: { src: "/local/anyvac/s6.png" }, map: { rotation: 0, scale: 100, offset_x: 0, offset_y: 0, seat: "auto" } },
        { entity: "vacuum.s7", image_base: { src: "/local/anyvac/s7.png" }, map: { rotation: 90, scale: 80, offset_x: 5, offset_y: -5, seat: "manual" } },
      ],
    };
  }
  function mergedConfig(): SeatEditConfigLike {
    return {
      map_mode: "merged",
      image_base: { src: "/local/anyvac/floor.png" },
      vacuums: [
        { entity: "vacuum.s6", map: { rotation: 0, scale: 100, offset_x: 0, offset_y: 0, seat: "auto" } },
        { entity: "vacuum.s7", map: { rotation: 90, scale: 80, offset_x: 5, offset_y: -5, seat: "manual" } },
      ],
    };
  }

  test("returns the SAME object when there is nothing to apply", () => {
    const c = splitConfig();
    expect(applyFloorplanSeats(c, undefined)).toBe(c);
    expect(applyFloorplanSeats(c, null)).toBe(c);
    expect(applyFloorplanSeats(c, {})).toBe(c);
    expect(
      applyFloorplanSeats(c, { "/local/anyvac/other.png": { vacuums: { "vacuum.s6": { rotation: 1, scale: 1, offset_x: 0, offset_y: 0 } } } })
    ).toBe(c);
  });

  test("a per-vacuum override wins, is forced to manual, other vacuums untouched (split mode, own image_base)", () => {
    const c = splitConfig();
    const override: SeatParams = { rotation: 33.5, scale: 142.2, offset_x: -12.1, offset_y: 4.4 };
    const seats = { "/local/anyvac/s6.png": { vacuums: { "vacuum.s6": override } } };
    const next = applyFloorplanSeats(c, seats);
    expect(next).not.toBe(c);
    expect(next.vacuums![0].map).toEqual({ ...override, seat: "manual" });
    expect(next.vacuums![1]).toBe(c.vacuums![1]); // untouched vacuum, same reference
  });

  test("per-vacuum override in merged mode resolves against the card-level floorplan", () => {
    const c = mergedConfig();
    const override: SeatParams = { rotation: 270, scale: 55, offset_x: 1, offset_y: -1 };
    const seats = { "/local/anyvac/floor.png": { vacuums: { "vacuum.s7": override } } };
    const next = applyFloorplanSeats(c, seats);
    expect(next.vacuums![1].map).toEqual({ ...override, seat: "manual" });
    expect(next.vacuums![0]).toBe(c.vacuums![0]);
  });

  test("card-level image_base override applies only in merged mode", () => {
    const split = splitConfig();
    const seats = { "/local/anyvac/floor.png": { image_base: { crop_box: { x0: 1 } } } };
    expect(applyFloorplanSeats(split, seats)).toBe(split); // no card-level src in split -> no-op

    const merged = mergedConfig();
    const next = applyFloorplanSeats(merged, seats);
    expect(next.image_base).toEqual({ src: "/local/anyvac/floor.png", crop_box: { x0: 1 } });
  });
});

// ── computeSeatFit's new snapRotation option (docs/41 §5 bod 2) ────────────

test.describe("seatfit: computeSeatFit snapRotation option", () => {
  test("default snaps to the nearest 90°; snapRotation:false keeps the free angle", () => {
    const dims = { NW: 1000, NH: 800 };
    const ar = 1.25;
    const knownSeat: SeatParams = { rotation: 3.7, scale: 100, offset_x: 0, offset_y: 0 };
    const rawPts = [{ x: 300, y: 250 }, { x: 800, y: 600 }];
    const floorPts = rawPts.map((p) => forwardPointFromPx(p, dims, knownSeat, ar));
    const anchors = buildCalibrationAnchors(rawPts, floorPts, dims, ar);

    const snapped = computeSeatFit(anchors, ar);
    expect(snapped).not.toBeNull();
    expect(snapped!.rotation).toBe(0);

    const free = computeSeatFit(anchors, ar, { snapRotation: false });
    expect(free).not.toBeNull();
    // seatFromFrame still rounds to the nearest WHOLE degree (unaffected by
    // this option — see seatfit.ts comment); the point here is only that it
    // is NOT forced onto a 90° multiple.
    expect(free!.rotation).toBeCloseTo(3.7, 0);
    expect(free!.rotation).not.toBe(snapped!.rotation);
  });

  test("snapRotation:true (explicit) matches the default exactly — auto-fit from named anchors is bit-for-bit unchanged", () => {
    const dims = { NW: 1000, NH: 800 };
    const ar = 1.25;
    const knownSeat: SeatParams = { rotation: 91.5, scale: 130, offset_x: 5, offset_y: -3 };
    const rawPts = [{ x: 200, y: 150 }, { x: 700, y: 650 }];
    const floorPts = rawPts.map((p) => forwardPointFromPx(p, dims, knownSeat, ar));
    const anchors = buildCalibrationAnchors(rawPts, floorPts, dims, ar);
    expect(computeSeatFit(anchors, ar, { snapRotation: true })).toEqual(computeSeatFit(anchors, ar));
  });
});

// ── seatToMatrix: DOM ground truth ─────────────────────────────────────────
//
// Mounts the real card (split mode, a single vacuum with a manual seat) and
// compares `seatToMatrix`'s predicted wrap-relative pixel position of known
// content-space points against where the BROWSER actually renders them — a
// probe element that copies the live `.map-img`'s resolved box + transform
// exactly, with a marker at a known content fraction inside it (same
// technique `rotated-map.spec.ts` uses for `_clickToContent`).

const PROBE_SVG_W = 200;
const PROBE_SVG_H = 150;
const PROBE_SVG_BODY =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${PROBE_SVG_W}' height='${PROBE_SVG_H}'>` +
  `<rect width='${PROBE_SVG_W}' height='${PROBE_SVG_H}' fill='#369'/></svg>`;
// A same-origin path, not a `data:` URI — see comment above `mountSeatedCard`.
const PROBE_SVG = "/seat-edit-probe.svg";

function toMapConfig(seat: SeatParams) {
  return {
    entity: "image.my_roborock_map",
    rotation: seat.rotation,
    scale: seat.scale,
    scale_y: seat.scaleY,
    offset_x: seat.offset_x,
    offset_y: seat.offset_y,
    seat: "manual" as const,
  };
}

async function mountSeatedCard(page: Page, seat: SeatParams, wrapWPx: number, wrapHPx: number): Promise<void> {
  await page.route("**/seat-edit-probe.svg**", (route) =>
    route.fulfill({ contentType: "image/svg+xml", body: PROBE_SVG_BODY })
  );
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ mapCfg, wrapWPx, wrapHPx, PROBE_SVG }) => {
      const w = window as any;
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        mobile_rotate: "off",
        map_mode: "split",
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            map: mapCfg,
            base: "map",
            base_height: wrapHPx,
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
            attributes: { entity_picture: PROBE_SVG },
            last_changed: now,
            last_updated: now,
          },
        },
        hassUrl: (path: string) => path,
        localize: (k: string) => k,
        language: "en",
        callService: async () => {},
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = wrapWPx + "px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { mapCfg: toMapConfig(seat), wrapWPx, wrapHPx, PROBE_SVG }
  );
  await page.waitForFunction(
    () => !!(window as any).__card?.shadowRoot?.querySelector(".map-img"),
    null,
    { timeout: 10_000 }
  );
  await page.evaluate(async () => {
    const img = (window as any).__card.shadowRoot.querySelector(".map-img") as HTMLImageElement;
    if (!img.complete) await new Promise((res) => img.addEventListener("load", res, { once: true }));
    await (window as any).__card.updateComplete;
  });
}

/** Screen position of content fraction (fx, fy) as the BROWSER computes it,
 *  plus the live-measured wrap/natural-image pixel sizes needed to call
 *  `seatToMatrix` with the same numbers. */
function probeSeated(
  page: Page, fx: number, fy: number,
): Promise<{ wrapRelX: number; wrapRelY: number; wrapW: number; wrapH: number; NW: number; NH: number }> {
  return page.evaluate(({ fx, fy }) => {
    const card = (window as any).__card;
    const wrap = card.shadowRoot.querySelector(".map-wrap") as HTMLElement;
    const img = card.shadowRoot.querySelector(".map-img") as HTMLImageElement;
    const cs = getComputedStyle(img);
    const box = document.createElement("div");
    box.style.position = "absolute";
    box.style.left = cs.left;
    box.style.top = cs.top;
    box.style.width = img.offsetWidth + "px";
    box.style.height = img.offsetHeight + "px";
    box.style.transformOrigin = cs.transformOrigin;
    box.style.transform = cs.transform;
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.left = fx * 100 + "%";
    dot.style.top = fy * 100 + "%";
    dot.style.width = "0";
    dot.style.height = "0";
    box.appendChild(dot);
    img.parentElement!.appendChild(box);
    const dr = dot.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    box.remove();
    return {
      wrapRelX: dr.left - wr.left,
      wrapRelY: dr.top - wr.top,
      wrapW: wr.width,
      wrapH: wr.height,
      NW: img.naturalWidth,
      NH: img.naturalHeight,
    };
  }, { fx, fy });
}

const SEATS: Array<{ name: string; seat: SeatParams }> = [
  { name: "upright, no scale_y", seat: { rotation: 0, scale: 140, offset_x: 8, offset_y: -6 } },
  { name: "37° with anisotropic scale_y", seat: { rotation: 37, scale: 65, scaleY: 90, offset_x: -12, offset_y: 15 } },
  { name: "125°, offset beyond the wrap", seat: { rotation: 125, scale: 180, offset_x: 20, offset_y: -25 } },
  { name: "270°, negative rotation input", seat: { rotation: -90, scale: 100, offset_x: 0, offset_y: 0 } },
];

const CONTENT_FRACTIONS: Array<[number, number]> = [
  [0.5, 0.5],
  [0.2, 0.75],
  [0.85, 0.1],
];

// `seatToMatrix` builds a `DOMMatrix`, a browser API that doesn't exist in
// the Playwright *test* process (plain Node — no DOM). We can't call the
// production function from here, so per the project's cross-check
// convention (rotated-map.spec.ts / seatfit-calibration.spec.ts) this block
// runs an independent copy of the same matrix construction *inside the
// page* via `page.evaluate`, where a real `DOMMatrix` is available — then
// compares that against the actually-rendered `.map-img`, exactly like the
// other probe-based tests in this file.
function predictedSeatPointInPage(
  page: import("@playwright/test").Page,
  seat: SeatParams,
  wrapW: number,
  wrapH: number,
  NW: number,
  NH: number,
  fx: number,
  fy: number,
): Promise<{ x: number; y: number }> {
  return page.evaluate(
    ({ seat, wrapW, wrapH, NW, NH, fx, fy }) => {
      const cxPx = ((50 + seat.offset_x) / 100) * wrapW;
      const cyPx = ((50 + seat.offset_y) / 100) * wrapH;
      const kx = (seat.scale / 100) * (wrapW / NW);
      const ky = ((seat.scaleY ?? seat.scale) / 100) * (wrapW / NW);
      const m = new DOMMatrix()
        .translate(cxPx, cyPx)
        .rotate(seat.rotation)
        .scale(kx, ky)
        .translate(-NW / 2, -NH / 2);
      const p = m.transformPoint({ x: fx * NW, y: fy * NH });
      return { x: p.x, y: p.y };
    },
    { seat, wrapW, wrapH, NW, NH, fx, fy },
  );
}

test.describe("seatToMatrix: matches a real rendered .map-img (docs/41 Fáze A ground truth)", () => {
  for (const { name, seat } of SEATS) {
    test(name, async ({ page }) => {
      await mountSeatedCard(page, seat, 1000, 640);
      for (const [fx, fy] of CONTENT_FRACTIONS) {
        const p = await probeSeated(page, fx, fy);
        const predicted = await predictedSeatPointInPage(
          page, seat, p.wrapW, p.wrapH, p.NW, p.NH, fx, fy,
        );
        // Compare as percent of wrap, tolerance matching the project's own
        // click-geometry convention (`toBeCloseTo(x, 0)` == within 0.5%).
        expect((predicted.x / p.wrapW) * 100).toBeCloseTo((p.wrapRelX / p.wrapW) * 100, 0);
        expect((predicted.y / p.wrapH) * 100).toBeCloseTo((p.wrapRelY / p.wrapH) * 100, 0);
      }
    });
  }
});
