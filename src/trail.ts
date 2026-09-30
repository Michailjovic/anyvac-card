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
