/**
 * docs/48 — live extension of the integration's last full-map snapshot.
 *
 * The backend publishes `live` on the map sensor: the robot's position and
 * the newest part of its trace from the robot's local `get_dynamic_map_diff`,
 * already in the same px spaces as the snapshot (`*_px` and `*_home_px`,
 * docs/14 — the card does no geometry). This only merges it into the
 * attributes the overlay renderers already read:
 *
 *  - only when `live.base_points === path_points` — the trail belongs to the
 *    snapshot being shown; a newer snapshot already contains those points;
 *  - position replaced, trace segments appended; `*_continues` = the first
 *    live segment continues the snapshot's last segment (no new polyline,
 *    docs/27 — never bridge a gap the backend did not bridge).
 */

type Seg = unknown[];

function join(base: unknown, tail: unknown, continues: unknown): unknown {
  const b = Array.isArray(base) ? (base as Seg[]) : [];
  if (!Array.isArray(tail) || !tail.length) return base;
  const t = tail as Seg[];
  if (continues && b.length) {
    return [...b.slice(0, -1), [...b[b.length - 1], ...t[0]], ...t.slice(1)];
  }
  return [...b, ...t];
}

const cache = new WeakMap<object, Record<string, any>>();

export function mergeLive<T extends Record<string, any> | null | undefined>(at: T): T {
  if (!at) return at;
  const live = at.live;
  if (!live || typeof live !== "object" || live.base_points !== at.path_points) return at;
  const hit = cache.get(at);
  if (hit) return hit as T;
  const out: Record<string, any> = {
    ...at,
    vacuum_position_px: live.pos_px ?? at.vacuum_position_px,
    vacuum_position_home_px: live.pos_home_px ?? at.vacuum_position_home_px,
    path_dry_px: join(at.path_dry_px, live.dry_px, live.dry_continues),
    path_wet_px: join(at.path_wet_px, live.wet_px, live.wet_continues),
    path_dry_home_px: join(at.path_dry_home_px, live.dry_home_px, live.dry_continues),
    path_wet_home_px: join(at.path_wet_home_px, live.wet_home_px, live.wet_continues),
  };
  cache.set(at, out);
  return out as T;
}
