import { test, expect } from "@playwright/test";
import { homeAnchorFit, projectHomePxThroughFit, unprojectPctThroughFit, type SeatParams } from "../src/seatfit";

/**
 * docs/40 §5.B — pure-geometry regression tests for cesta B's card-level
 * `home_anchors` fit. Plain Node tests (no `page` fixture), same pattern as
 * `tests/seatfit-calibration.spec.ts`, whose `forwardPoint` helper is
 * reused here unchanged to build known-answer anchor pairs.
 */
function forwardPoint(
  homePx: { x: number; y: number },
  dims: { NW: number; NH: number },
  seat: SeatParams,
  ar: number,
): { x: number; y: number } {
  const q = { x: (homePx.x - dims.NW / 2) / dims.NW, y: (homePx.y - dims.NH / 2) / dims.NW };
  const s = seat.scale / 100;
  const theta = (seat.rotation * Math.PI) / 180;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const c = { x: (50 + seat.offset_x) / 100, y: (50 + seat.offset_y) / 100 / ar };
  const u = { x: c.x + s * (cos * q.x - sin * q.y), y: c.y + s * (sin * q.x + cos * q.y) };
  return { x: u.x * 100, y: u.y * ar * 100 };
}

test.describe("seatfit: homeAnchorFit + projectHomePxThroughFit (docs/40 §5.B)", () => {
  test("recovers a known rotation/scale/offset from 2 anchor pairs", () => {
    const dims = { NW: 1000, NH: 800 };
    const ar = 1.25;
    const knownSeat: SeatParams = { rotation: 90, scale: 140, offset_x: 5, offset_y: -8 };
    const homePts = [{ x: 300, y: 400 }, { x: 700, y: 150 }];
    const anchors = homePts.map((p) => ({ home_px: p, floor_pct: forwardPoint(p, dims, knownSeat, ar) }));

    const fit = homeAnchorFit(anchors, dims, ar);
    expect(fit).not.toBeNull();
    expect(fit!.rotation).toBe(90);
    expect(fit!.scale).toBeCloseTo(140, 3);
    expect(fit!.offset_x).toBeCloseTo(5, 3);
    expect(fit!.offset_y).toBeCloseTo(-8, 3);
    expect(fit!.residual_pct).toBeLessThan(0.01);
  });

  test("projects a THIRD point (not an anchor) consistently with the known transform", () => {
    const dims = { NW: 1200, NH: 900 };
    const ar = 1.5;
    const knownSeat: SeatParams = { rotation: 0, scale: 100, offset_x: 0, offset_y: 0 };
    const homePts = [{ x: 200, y: 300 }, { x: 900, y: 700 }];
    const anchors = homePts.map((p) => ({ home_px: p, floor_pct: forwardPoint(p, dims, knownSeat, ar) }));
    const fit = homeAnchorFit(anchors, dims, ar)!;
    expect(fit).not.toBeNull();

    const query = { x: 550, y: 480 };
    const expected = forwardPoint(query, dims, knownSeat, ar);
    const got = projectHomePxThroughFit(query, dims, fit, ar);
    expect(got.x).toBeCloseTo(expected.x, 2);
    expect(got.y).toBeCloseTo(expected.y, 2);
  });

  test("survives the home frame growing: a query point lands at the same floor_pct " +
    "before and after re-fitting against a larger frame size (docs/40 §5.B self-heal)", () => {
    const ar = 1.0;
    const knownSeat: SeatParams = { rotation: 180, scale: 120, offset_x: -4, offset_y: 6 };
    // Anchors' home_px are ABSOLUTE and unaffected by frame growth (backend
    // `grow_frame_canvas`: origin_mm untouched, only width/height extend) —
    // and floor_pct describes a fixed point on the (unrelated) floorplan
    // image, so it doesn't change either. Only `frameDims` (the frame's own
    // width_px/height_px, re-read live every render) grows.
    const dimsBefore = { NW: 1000, NH: 1000 };
    const dimsAfter = { NW: 1600, NH: 1400 }; // grew toward +x/+y
    const homePts = [{ x: 100, y: 900 }, { x: 850, y: 200 }];
    const anchors = homePts.map((p) => ({
      home_px: p, floor_pct: forwardPoint(p, dimsBefore, knownSeat, ar),
    }));

    const fitBefore = homeAnchorFit(anchors, dimsBefore, ar);
    const fitAfter = homeAnchorFit(anchors, dimsAfter, ar);
    expect(fitBefore).not.toBeNull();
    expect(fitAfter).not.toBeNull();

    // A 2-point fit has zero residual regardless of dims — both refits must
    // still reproduce the anchors' own floor_pct exactly.
    for (const p of homePts) {
      const want = forwardPoint(p, dimsBefore, knownSeat, ar);
      const before = projectHomePxThroughFit(p, dimsBefore, fitBefore!, ar);
      const after = projectHomePxThroughFit(p, dimsAfter, fitAfter!, ar);
      expect(before.x).toBeCloseTo(want.x, 6);
      expect(before.y).toBeCloseTo(want.y, 6);
      expect(after.x).toBeCloseTo(want.x, 6);
      expect(after.y).toBeCloseTo(want.y, 6);
    }

    // The real regression check: a THIRD point never used as an anchor must
    // land at the SAME floor_pct whichever frame size it's projected
    // through — the underlying home_px -> floor_pct mapping is one fixed
    // physical relationship; `frameDims` is only an internal normalisation,
    // not part of that relationship.
    const query = { x: 500, y: 500 };
    const viaBefore = projectHomePxThroughFit(query, dimsBefore, fitBefore!, ar);
    const viaAfter = projectHomePxThroughFit(query, dimsAfter, fitAfter!, ar);
    expect(viaAfter.x).toBeCloseTo(viaBefore.x, 4);
    expect(viaAfter.y).toBeCloseTo(viaBefore.y, 4);
  });

  test("returns null below 2 anchors", () => {
    expect(homeAnchorFit([], { NW: 100, NH: 100 }, 1)).toBeNull();
    expect(homeAnchorFit([{ home_px: { x: 1, y: 1 }, floor_pct: { x: 1, y: 1 } }], { NW: 100, NH: 100 }, 1)).toBeNull();
  });

  test("returns null for a missing/undefined frame size", () => {
    const anchors = [
      { home_px: { x: 1, y: 1 }, floor_pct: { x: 1, y: 1 } },
      { home_px: { x: 2, y: 2 }, floor_pct: { x: 2, y: 2 } },
    ];
    expect(homeAnchorFit(anchors, null, 1)).toBeNull();
    expect(homeAnchorFit(anchors, undefined, 1)).toBeNull();
  });

  test("returns null/undefined anchors list gracefully", () => {
    expect(homeAnchorFit(null, { NW: 100, NH: 100 }, 1)).toBeNull();
    expect(homeAnchorFit(undefined, { NW: 100, NH: 100 }, 1)).toBeNull();
  });

  test("unprojectPctThroughFit is the exact inverse of projectHomePxThroughFit " +
    "(Pin&Go/Zone click-chain round trip)", () => {
    const dims = { NW: 900, NH: 700 };
    const ar = 1.4;
    const fit: SeatParams & { residual_pct: number; anchors: number; raw_rotation: number } = {
      rotation: 270, scale: 88, offset_x: 12, offset_y: -6,
      residual_pct: 0, anchors: 2, raw_rotation: 270,
    };
    for (const homePx of [{ x: 100, y: 100 }, { x: 800, y: 50 }, { x: 450, y: 650 }]) {
      const pct = projectHomePxThroughFit(homePx, dims, fit, ar);
      const back = unprojectPctThroughFit(pct, dims, fit, ar);
      expect(back.x).toBeCloseTo(homePx.x, 6);
      expect(back.y).toBeCloseTo(homePx.y, 6);
    }
  });
});
