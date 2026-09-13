import { test, expect } from "@playwright/test";
import { buildCalibrationAnchors, computeSeatFit, type SeatParams } from "../src/seatfit";

/**
 * docs/39 — pure-geometry regression tests for the 2-point manual seat
 * calibration. Plain Node tests (no `page` fixture anywhere in this file,
 * so Playwright never spins up a browser for them), same pattern as
 * `tests/rect-drag.spec.ts`.
 *
 * `forwardPoint` mirrors the exact point-transform `roomBboxToRect` (seatfit.ts)
 * already uses in production, to build a raw-map/floorplan point pair for a
 * KNOWN seat — so a round trip through `buildCalibrationAnchors` +
 * `computeSeatFit` can be checked against that known answer.
 */
function forwardPoint(
  rawPx: { x: number; y: number },
  dims: { NW: number; NH: number },
  seat: SeatParams,
  ar: number,
): { x: number; y: number } {
  const q = { x: (rawPx.x - dims.NW / 2) / dims.NW, y: (rawPx.y - dims.NH / 2) / dims.NW };
  const s = seat.scale / 100;
  const theta = (seat.rotation * Math.PI) / 180;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const c = { x: (50 + seat.offset_x) / 100, y: (50 + seat.offset_y) / 100 / ar };
  const u = { x: c.x + s * (cos * q.x - sin * q.y), y: c.y + s * (sin * q.x + cos * q.y) };
  return { x: u.x * 100, y: u.y * ar * 100 };
}

test.describe("seatfit: buildCalibrationAnchors + computeSeatFit round-trip", () => {
  test("recovers a known rotation/scale/offset from 2 clicked point pairs", () => {
    const dims = { NW: 1200, NH: 900 };
    const ar = 1.5;
    const knownSeat: SeatParams = { rotation: 180, scale: 120, offset_x: 0, offset_y: 0 };
    const rawPts = [{ x: 400, y: 300 }, { x: 900, y: 700 }];
    const floorPts = rawPts.map((p) => forwardPoint(p, dims, knownSeat, ar));

    const anchors = buildCalibrationAnchors(rawPts, floorPts, dims, ar);
    expect(anchors).toHaveLength(2);
    const fit = computeSeatFit(anchors, ar);
    expect(fit).not.toBeNull();
    expect(fit!.rotation).toBe(180);
    expect(fit!.scale).toBeCloseTo(120, 3);
    expect(fit!.offset_x).toBeCloseTo(0, 3);
    expect(fit!.offset_y).toBeCloseTo(0, 3);
    // Two points fully determine the transform — the least-squares fit should
    // reproduce them essentially exactly (mod the 90° rotation snap, which is
    // exact here since 180° already lands on a snap point).
    expect(fit!.residual_pct).toBeLessThan(0.01);
    expect(fit!.anchors).toBe(2);
  });

  test("recovers a non-trivial rotation/scale/offset seat", () => {
    const dims = { NW: 1000, NH: 800 };
    const ar = 2;
    const knownSeat: SeatParams = { rotation: 90, scale: 150, offset_x: -10, offset_y: 5 };
    const rawPts = [{ x: 120, y: 640 }, { x: 860, y: 90 }];
    const floorPts = rawPts.map((p) => forwardPoint(p, dims, knownSeat, ar));

    const fit = computeSeatFit(buildCalibrationAnchors(rawPts, floorPts, dims, ar), ar);
    expect(fit).not.toBeNull();
    expect(fit!.rotation).toBe(90);
    expect(fit!.scale).toBeCloseTo(150, 3);
    expect(fit!.offset_x).toBeCloseTo(-10, 3);
    expect(fit!.offset_y).toBeCloseTo(5, 3);
    expect(fit!.residual_pct).toBeLessThan(0.01);
  });

  for (const rotation of [0, 90, 180, 270] as const) {
    test(`snaps to ${rotation}° even with a little click noise`, () => {
      const dims = { NW: 1000, NH: 1000 };
      const ar = 1;
      const knownSeat: SeatParams = { rotation, scale: 100, offset_x: 0, offset_y: 0 };
      const rawPts = [{ x: 200, y: 300 }, { x: 800, y: 650 }];
      const floorPts = rawPts.map((p) => forwardPoint(p, dims, knownSeat, ar));
      // A click is never pixel-perfect — jitter each floorplan point by a small
      // amount (well under half the gap to the next 90° step) and confirm the
      // snap still lands on the same rotation.
      const jittered = floorPts.map((p, i) => ({ x: p.x + (i === 0 ? 0.3 : -0.2), y: p.y + (i === 0 ? -0.25 : 0.3) }));

      const fit = computeSeatFit(buildCalibrationAnchors(rawPts, jittered, dims, ar), ar);
      expect(fit).not.toBeNull();
      expect(fit!.rotation).toBe(rotation);
    });
  }

  test("extra point-pairs average down click imprecision (docs/39 §8 field report)", () => {
    // Field report: a careful 2-point click still landed at ~4% fit error.
    // With exactly 2 points the fit has no redundancy — any click wobble gets
    // read as if it were part of the true rotation/scale/offset, with nothing
    // to reveal it as noise. More points can't all be satisfied by a single
    // rigid transform that also matches the noise, so the SOLVED transform
    // ends up closer to the true seat — this is the regression check for that:
    // the same per-point wobble, spread over 4 points instead of 2, should
    // solve a seat closer to ground truth, not just report a smaller number.
    const dims = { NW: 1200, NH: 1200 };
    const ar = 1;
    const knownSeat: SeatParams = { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 };
    const rawPts = [
      { x: 150, y: 200 }, { x: 1050, y: 300 }, { x: 250, y: 1000 }, { x: 900, y: 950 },
    ];
    const exactFloor = rawPts.map((p) => forwardPoint(p, dims, knownSeat, ar));
    // A deterministic "click wobble" pattern (±0.4% of wrap width) applied to
    // every point — not random, so the test is stable, but present on all of
    // them the way real click imprecision would be.
    const noise = [{ x: 0.4, y: -0.3 }, { x: -0.35, y: 0.4 }, { x: 0.3, y: 0.35 }, { x: -0.4, y: -0.4 }];
    const noisyFloor = exactFloor.map((p, i) => ({ x: p.x + noise[i].x, y: p.y + noise[i].y }));

    const fit2 = computeSeatFit(buildCalibrationAnchors(rawPts.slice(0, 2), noisyFloor.slice(0, 2), dims, ar), ar);
    const fit4 = computeSeatFit(buildCalibrationAnchors(rawPts, noisyFloor, dims, ar), ar);
    expect(fit2).not.toBeNull();
    expect(fit4).not.toBeNull();
    const deviationFromTruth = (fit: SeatParams) =>
      Math.abs(fit.scale - knownSeat.scale) + Math.abs(fit.offset_x) + Math.abs(fit.offset_y);
    expect(deviationFromTruth(fit4!)).toBeLessThan(deviationFromTruth(fit2!));
  });

  test("two identical points (degenerate click) can't determine a transform", () => {
    const dims = { NW: 1000, NH: 1000 };
    const ar = 1;
    const rawPts = [{ x: 500, y: 500 }, { x: 500, y: 500 }];
    const floorPts = [{ x: 50, y: 50 }, { x: 50, y: 50 }];
    const fit = computeSeatFit(buildCalibrationAnchors(rawPts, floorPts, dims, ar), ar);
    expect(fit).toBeNull();
  });

  test("mismatched point-pair counts are truncated to the shorter list, never crash", () => {
    const dims = { NW: 1000, NH: 1000 };
    const anchors = buildCalibrationAnchors(
      [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }],
      [{ x: 10, y: 10 }],
      dims, 1,
    );
    expect(anchors).toHaveLength(1);
  });

  test("returns no anchors for invalid dims/ar", () => {
    expect(buildCalibrationAnchors([{ x: 1, y: 1 }], [{ x: 1, y: 1 }], { NW: 0, NH: 100 }, 1)).toEqual([]);
    expect(buildCalibrationAnchors([{ x: 1, y: 1 }], [{ x: 1, y: 1 }], { NW: 100, NH: 100 }, 0)).toEqual([]);
  });
});
