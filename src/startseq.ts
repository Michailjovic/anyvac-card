/**
 * startseq.ts — the script of the start sequence (docs/44 F5, W7), kept free
 * of Lit/DOM so it can be tested on its own.
 */

/** docs/44 F5: rooms in the backend timeline's order and each robot's first
 *  room, from an `anyvac.plan` response. Pure reordering of what the backend
 *  computed (`timeline` = per-room finish minutes, sequence-aware, docs/19) —
 *  no estimate of the card's own. */
export function planOrder(plan: Record<string, any>): { order: string[]; first: Map<string, string>; finish: Map<string, number> } {
  const tl = (plan?.timeline ?? {}) as { dry?: Record<string, number>; wet?: Record<string, number> };
  const fin = new Map<string, number>();
  for (const kind of ["dry", "wet"] as const) {
    for (const [room, t] of Object.entries(tl[kind] ?? {})) {
      if (typeof t !== "number") continue;
      fin.set(room, Math.min(fin.get(room) ?? Infinity, t));
    }
  }
  const order = [...fin.keys()].sort((a, b) => fin.get(a)! - fin.get(b)!);
  // docs/46 G2: when each room is DONE (its last pass), for the plan column.
  const finish = new Map<string, number>();
  for (const kind of ["dry", "wet"] as const) {
    for (const [room, t] of Object.entries(tl[kind] ?? {})) {
      if (typeof t !== "number") continue;
      finish.set(room, Math.max(finish.get(room) ?? -Infinity, t));
    }
  }
  const first = new Map<string, string>();
  for (const kind of ["dry", "wet"] as const) {
    for (const [ent, rooms] of Object.entries((plan?.[kind] ?? {}) as Record<string, string[]>)) {
      if (first.has(ent) || !Array.isArray(rooms) || !rooms.length) continue;
      const t = tl[kind] ?? {};
      const best = [...rooms].sort((a, b) => (t[a] ?? Infinity) - (t[b] ?? Infinity))[0];
      first.set(ent, best);
    }
  }
  return { order, first, finish };
}
