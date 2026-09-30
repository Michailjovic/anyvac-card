/**
 * trail.ts — pure geometry for the map's vector layers (docs/44 F4).
 *
 * The three overlay renderers in anyvac-card.ts (legacy per-vacuum seat,
 * home-frame crop, home-anchor fit) differ only in HOW a backend point is
 * projected into their own SVG user space; everything drawn from the
 * projected points goes through one shared renderer (`_renderVectorLayers`).
 * This module holds the parts of that which are plain arithmetic, so they
 * can be tested without a DOM.
 */

export interface Pt {
  x: number;
  y: number;
}

/** "x,y x,y …" for a <polyline points=…>, at a fixed precision. */
export function fmtPts(seg: readonly Pt[], digits: number): string {
  return seg.map((p) => p.x.toFixed(digits) + "," + p.y.toFixed(digits)).join(" ");
}

/** Arc length of a polyline, in its own units. */
export function arcLength(seg: readonly Pt[]): number {
  let len = 0;
  for (let i = 1; i < seg.length; i++) len += Math.hypot(seg[i].x - seg[i - 1].x, seg[i].y - seg[i - 1].y);
  return len;
}

/**
 * The last `length` units of a polyline, measured ALONG the line (arc
 * length), not by point count — the backend's RDP simplification leaves long
 * straight runs as two points and tight turns as many, so "the last N points"
 * would make the highlighted head jump in length from poll to poll.
 *
 * Returns the tail in forward order, starting with an interpolated point
 * exactly `length` before the end. A polyline shorter than `length` is
 * returned whole; fewer than two points (or a non-positive length) → [].
 */
export function trailTail(seg: readonly Pt[], length: number): Pt[] {
  if (seg.length < 2 || !(length > 0)) return [];
  const out: Pt[] = [seg[seg.length - 1]];
  let left = length;
  for (let i = seg.length - 1; i > 0; i--) {
    const a = seg[i - 1];
    const b = seg[i];
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    if (d >= left) {
      const t = d > 0 ? left / d : 0;
      out.push({ x: b.x + (a.x - b.x) * t, y: b.y + (a.y - b.y) * t });
      return out.reverse();
    }
    left -= d;
    out.push(a);
  }
  return out.reverse();
}

/** Closest point to `p` on segment a→b, and its distance. */
function closestOnEdge(a: Pt, b: Pt, p: Pt): { pt: Pt; d: number } {
  const dx = b.x - a.x, dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 > 0 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
  const pt = { x: a.x + dx * t, y: a.y + dy * t };
  return { pt, d: Math.hypot(p.x - pt.x, p.y - pt.y) };
}

/**
 * docs/44 marker-on-trail (card 1.47.0): the stretch of trail the robot drove
 * between the previous marker position `from` and the current one `to`, so
 * the marker can follow the drawn line instead of cutting straight across the
 * room (the 30 s poll makes the straight chord cross walls and furniture).
 *
 * `seg` is the trail's current last segment (it ends where the robot is). The
 * search walks back from its end over at most `window` units of arc length —
 * the length the trail grew since the previous marker position, plus a margin
 * — and picks the point closest to `from`. Bounding the walk by the growth,
 * not by distance, is what keeps a boustrophedon lane next door (≈ half a
 * robot width away) or an older pass through the same spot from winning.
 *
 * Returns the route `[start on the trail, …vertices…, to]`, or `null` when the
 * trail doesn't pass within `tol` of `from` (robot drove without drawing —
 * transit, a new segment the old position isn't on, a re-projection) — the
 * caller then falls back to a straight move.
 */
export function traceSince(seg: readonly Pt[], from: Pt, to: Pt, window: number, tol: number): Pt[] | null {
  if (seg.length < 2 || !(window > 0)) return null;
  let best: { i: number; pt: Pt; d: number } | null = null;
  let walked = 0;
  for (let i = seg.length - 1; i > 0 && walked <= window; i--) {
    const c = closestOnEdge(seg[i - 1], seg[i], from);
    if (!best || c.d < best.d) best = { i, pt: c.pt, d: c.d };
    walked += Math.hypot(seg[i].x - seg[i - 1].x, seg[i].y - seg[i - 1].y);
  }
  if (!best || best.d > tol) return null;
  const out: Pt[] = [best.pt, ...seg.slice(best.i)];
  const last = out[out.length - 1];
  if (Math.hypot(last.x - to.x, last.y - to.y) > 1e-6) out.push(to);
  return out;
}

/** Point at fraction `f` (0…1) of a polyline's arc length, plus the index of
 *  the vertex after it — used to continue an interrupted glide from where the
 *  marker currently is. */
export function pointAtFraction(route: readonly Pt[], f: number): { pt: Pt; next: number } {
  const total = arcLength(route);
  if (route.length === 0) return { pt: { x: 0, y: 0 }, next: 0 };
  if (!(total > 0) || f <= 0) return { pt: route[0], next: 1 };
  let left = Math.min(1, f) * total;
  for (let i = 1; i < route.length; i++) {
    const d = Math.hypot(route[i].x - route[i - 1].x, route[i].y - route[i - 1].y);
    if (d >= left) {
      const t = d > 0 ? left / d : 0;
      return { pt: { x: route[i - 1].x + (route[i].x - route[i - 1].x) * t, y: route[i - 1].y + (route[i].y - route[i - 1].y) * t }, next: i };
    }
    left -= d;
  }
  return { pt: route[route.length - 1], next: route.length };
}

/** WAAPI keyframes for a constant-speed glide along `route`: one keyframe per
 *  vertex with its arc-length offset, thinned evenly to at most `max`. */
export function glideKeyframes(route: readonly Pt[], digits: number, max = 120): Keyframe[] {
  let pts = route;
  if (pts.length > max) {
    const step = (pts.length - 1) / (max - 1);
    pts = Array.from({ length: max }, (_, k) => route[Math.round(k * step)]);
  }
  const total = arcLength(pts);
  let acc = 0;
  return pts.map((p, i) => {
    if (i > 0) acc += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y);
    return {
      transform: "translate(" + p.x.toFixed(digits) + "px, " + p.y.toFixed(digits) + "px)",
      offset: total > 0 ? acc / total : i / Math.max(1, pts.length - 1),
    };
  });
}
