/**
 * layout.ts — two-profile percentage-grid layout runtime (docs/18).
 *
 * Model: two complete layout profiles (portrait / landscape), picked by the
 * aspect ratio of the available viewport — never by device type and never by
 * width breakpoints. Each profile is a CSS grid whose tracks are percentages
 * of the available viewport; the UI is a set of named regions placed into the
 * grid per profile. A region not placed in a profile is not rendered there.
 */

export type LayoutProfile = "portrait" | "landscape";

export interface RegionPlace {
  /** Grid line or span, CSS grid-line syntax: 2 or "1/4". */
  row?: number | string;
  col?: number | string;
  overflow?: "hidden" | "auto";
  align?: "stretch" | "start" | "center" | "end";
}

/** Rotated-map fit (docs/19 follow-up). Portrait's 90°-rotated map defaults to
 *  "contain" — fits entirely inside the measured map region, which can leave
 *  empty bars alongside it when the region's aspect ratio doesn't match the
 *  floorplan's. "cover" fills the region completely instead, cropping the
 *  overflow; offset_x/offset_y pan within that overflow so the user controls
 *  what gets cropped rather than it always centering. */
export interface MapCropConfig {
  fit?: "contain" | "cover";
  /** -100..100, 0 = centered. Only meaningful with fit: "cover". */
  offset_x?: number;
  offset_y?: number;
  /** docs/25 §4. "auto" (default) computes whether rotating the floorplan 90°
   *  gives a bigger fit inside the portrait map region than leaving it
   *  upright, and picks whichever wins — replacing the old "portrait always
   *  rotates" rule, which only happened to work because it was tuned against
   *  one specific (wide) floorplan. "normal"/"rotated" force a side, for
   *  edge cases the computed rule doesn't call the way the user wants. */
  mapOrientation?: "auto" | "normal" | "rotated";
}

/** docs/25 §4 — compute whether rotating the floorplan 90° fits the portrait
 *  map region better than leaving it upright. Pure geometry: for each
 *  orientation, "how big could the floorplan render inside this box" is the
 *  contain-fit scale (`min(boxW/contentW, boxH/contentH)`); pick whichever
 *  orientation yields the larger rendered map (bigger = more legible rooms,
 *  bigger tap targets). Ties (near-square floorplans, where it barely
 *  matters either way) default to NOT rotating — it's the cheaper option
 *  (no counter-rotating on-map labels via `.avc-rot`).
 *
 *  `floorplanAR` = floorplan width / height. `boxW`/`boxH` = the measured
 *  portrait map region. Returns `undefined` when there isn't enough data to
 *  decide yet (region not measured) — callers should keep their previous
 *  answer rather than flicker on an unmeasured 0×0 box. */
export function shouldRotateMap(floorplanAR: number, boxW: number, boxH: number): boolean | undefined {
  if (boxW <= 4 || boxH <= 4 || floorplanAR <= 0) return undefined;
  // Normalize floorplan height to 1 → width is floorplanAR. Contain-fit scale
  // is min(boxAxis / contentAxis) per axis; rotating swaps which axis is which.
  const scaleUpright = Math.min(boxW / floorplanAR, boxH);
  const scaleRotated = Math.min(boxW, boxH / floorplanAR);
  // Equal scale (or upright wins/ties) → don't rotate.
  return scaleRotated > scaleUpright;
}

/** docs/25 §7c — portrait map/dock topology as a computed choice, generalizing
 *  `shouldRotateMap()` (§4) from "which way is the floorplan rotated" up one
 *  level to "which overall arrangement fits the floorplan better":
 *
 *  - "split": today's default (`DEFAULT_PROFILES.portrait`) — map and dock
 *    side by side, map gets the full available height, its width follows its
 *    own aspect ratio (post §4 rotation choice).
 *  - "stack": map full-width on top, dock/vacuum row/START below it full-width.
 *    Map gets the full available width, height follows its aspect ratio
 *    (capped so the dock doesn't get squeezed to a sliver).
 *
 *  Same contain-fit-scale comparison as `shouldRotateMap()`: for each
 *  candidate arrangement, compute how big the floorplan could render inside
 *  the box that arrangement gives it, and pick whichever renders it bigger.
 *  Fixes the field-observed problem (2026-07-23 screenshot, a 3-storey
 *  narrow floorplan) where a fixed split left the dock column wide and mostly
 *  empty because its width was whatever the map didn't need, not what the
 *  dock's own content needed.
 *
 *  **Model correction (2026-07-24 field feedback):** the first version
 *  reserved the SAME FRACTION of the box for both candidates (dock keeps
 *  `dockFrac` of width in split, `dockFrac` of height in stack) — wrong,
 *  because it made stack's reservation scale up with box height, while a
 *  real dock's content (icon strip + layer toggles + mode row, now that the
 *  room list is hidden by default, docs/25 §7c/§7e) is a roughly FIXED pixel
 *  height regardless of how tall the box is. That bias meant split won by
 *  this formula for basically any tall/narrow floorplan even when it
 *  visually left the dock mostly empty (confirmed live: a user's 4-storey
 *  narrow floorplan scored split as "better fitting" while looking
 *  obviously worse once forced into stack via the manual override).
 *  `dockHeightPx` replaces the height-side fraction with that fixed
 *  estimate — as the box gets taller, stack's map keeps almost all of the
 *  extra height (dock cost stays flat) instead of losing a growing
 *  fraction to it. `dockWidthFrac` stays a fraction for the split
 *  candidate — a column's width genuinely does scale with the box, unlike
 *  a stacked row's height, matching `columns: [72, 28]`.
 *
 *  `floorplanAR` = floorplan width / height (post-rotation, i.e. whatever
 *  `_narrow`/`shouldRotateMap` already decided to actually render).
 *  `boxW`/`boxH` = the full portrait content box (map + dock combined, minus
 *  START bar). Returns `undefined` when there isn't enough data yet, same
 *  convention as `shouldRotateMap()`. */
export function shouldStackLayout(
  floorplanAR: number,
  boxW: number,
  boxH: number,
  opts: { dockWidthFrac?: number; dockHeightPx?: number } = {},
): boolean | undefined {
  // ~150px estimate: vac-icon-strip (~50-64px) + dock-layers row (~30px) +
  // dock-head mode row (~40px) + dock container padding/gaps (~24px), per
  // today's minimalist portrait dock (docs/25 §7c/§7e — no permanent room
  // list). Only needs to be roughly right: the actual STACK_PORTRAIT_PROFILE
  // dock row is CSS "auto" (sized to real content, not this estimate) — this
  // number only steers the split-vs-stack DECISION, not final layout.
  const { dockWidthFrac = 0.28, dockHeightPx = 150 } = opts;
  if (boxW <= 4 || boxH <= 4 || floorplanAR <= 0) return undefined;
  const splitMapW = boxW * (1 - dockWidthFrac);
  const scaleSplit = Math.min(splitMapW / floorplanAR, boxH);
  const stackMapH = Math.max(boxH - dockHeightPx, 0);
  const scaleStack = Math.min(boxW / floorplanAR, stackMapH);
  // Ties (near-identical fit either way) default to split — it's today's
  // shipped behavior, cheaper to keep than to flip for a marginal gain.
  return scaleStack > scaleSplit;
}

export interface ProfileGridConfig {
  /** Track sizes: numbers are % of available viewport, strings pass through
   *  ("1fr", "auto", "120px"). */
  columns?: Array<number | string>;
  rows?: Array<number | string>;
  place?: Record<string, RegionPlace>;
  crop?: MapCropConfig;
  /** docs/25 §7c. "auto" (default, portrait only) computes split vs. stack
   *  from `shouldStackLayout()`. "split"/"stack" force a side — same escape
   *  hatch pattern as `crop.mapOrientation`. Any explicit `columns`/`rows`/
   *  `place` on this profile already opts out of the computed choice
   *  entirely (the card treats a manual layout as intentional) — this field
   *  only matters when none of those are set. */
  topology?: "auto" | "split" | "stack";
}

/** `columns`/`rows`/`place` filled in; `crop`/`topology` stay optional/absent
 *  (no default data to fall back to — see `resolveProfile`'s doc comment). */
export type ResolvedProfileGrid = Required<Omit<ProfileGridConfig, "crop" | "topology">>;

/** docs/25 §7c — the "stack" portrait arrangement (map full-width on top,
 *  dock/vacuum-row/START stacked full-width below it), used in place of
 *  `DEFAULT_PROFILES.portrait` when `shouldStackLayout()` (or a manual
 *  `topology: "stack"` override) picks it. `rows: ["1fr", "auto", "auto"]`
 *  mirrors the landscape pattern (docs/19 A5 addendum) — the map takes
 *  whatever's left after dock/start size to their own content, not the
 *  other way around. */
export const STACK_PORTRAIT_PROFILE: ResolvedProfileGrid = {
  columns: [100],
  rows: ["1fr", "auto", "auto"],
  place: {
    map: { row: 1, col: 1 },
    dock: { row: 2, col: 1, overflow: "auto" },
    start: { row: 3, col: 1 },
  },
};

export interface LayoutConfig {
  /** availW/availH below this → portrait. Default 1.0. */
  threshold?: number;
  /** Force a profile; "auto" (default) picks by aspect ratio. */
  orientation?: "auto" | LayoutProfile;
  gap?: string;
  /** "viewport" (default) | "container" | any CSS length. */
  height?: string;
  portrait?: ProfileGridConfig;
  landscape?: ProfileGridConfig;
}

/**
 * Canonical docs/18 §4 default profiles (Phase B). Landscape = cockpit: map left
 * (scrolls in split mode, §7b), dock (selection + plan + orchestrated run, §7d)
 * and per-robot status cards right. Portrait = docs/12: slim badges bar, tall
 * rotated map, right thumb dock, full-width START bar. Overridable per config.
 */
export const DEFAULT_PROFILES: Record<LayoutProfile, ResolvedProfileGrid> = {
  landscape: {
    // Phase C (docs/19 A5): map + meta bar go full-width — the map is the main
    // instrument, not a 70%-column tenant. Below that the cockpit splits in
    // two: left column = per-robot status/controller cards (unchanged);
    // right column = a slim vertical vacuum picker (replaces the old
    // horizontal badge-row tabs for this purpose) with the room list docked
    // directly beneath it.
    // Row 1 is "auto", not a fixed %: badges only ever holds global-action
    // badges now (vacuum picking moved to `picker`, docs/19 A5) — a hardcoded
    // percentage reserved dead black space whenever no global_actions are
    // configured (field-caught 2026-07-15). "auto" collapses to whatever the
    // row actually contains, same as the tools/status/picker/dock rows below.
    // The "1fr" lives on the MAP's row instead (field feedback from a tall
    // panel-view page 2026-07-15): everything below the map should size to
    // its own natural content height, and the map should get whatever's left
    // over — not the other way around, which is what put the flex on the
    // status/dock row before and left the map a fixed, often-too-small size
    // on tall viewports.
    columns: [70, 30],
    rows: ["auto", "1fr", "auto", "auto", "auto"],
    place: {
      badges: { row: 1, col: "1/3" },
      map: { row: 2, col: "1/3" },
      tools: { row: 3, col: "1/3", align: "start" },
      status: { row: "4/6", col: 1, overflow: "auto" },
      picker: { row: 4, col: 2, align: "start" },
      dock: { row: 5, col: 2, overflow: "auto" },
    },
  },
  portrait: {
    // Phase C follow-up (docs/19): the top badges row is dropped — merged mode
    // has no split-mode "shown" focus to switch, so it was only costing height.
    // The map takes that space back; each vacuum's emergency more-info access
    // moves into a small icon strip at the top of the dock column instead
    // (`_renderVacuumIconStrip`, portrait-only).
    // Declarative fallback columns (used until the first fit measurement lands,
    // see `_refineGridColumns`): the map is height-fit (fills row 1's full
    // height, `_renderResponsive`), which usually leaves it NARROWER than a
    // fixed 72% column. A CSS "auto" track can't pick that up on its own — the
    // fitted width lives on an absolutely-positioned inner div precisely so it
    // does NOT feed back into layout/reflow, which also means it carries no
    // intrinsic-size signal for track auto-sizing. So the actual column split
    // is measured-and-applied in JS instead (same settle-and-stop pattern as
    // `_refineGridHeight`), col2 = 1fr picks up whatever col1 doesn't need
    // (field feedback 2026-07-15: "the freed-up width should go to the
    // sidebar, not sit empty").
    columns: [72, 28],
    rows: [90, 10],
    place: {
      map: { row: 1, col: 1 },
      dock: { row: 1, col: 2, overflow: "auto" },
      start: { row: 2, col: "1/3" },
    },
  },
};

/** Pick the active profile from the available viewport. */
export function pickProfile(cfg: LayoutConfig | undefined, availW: number, availH: number): LayoutProfile {
  const o = cfg?.orientation;
  if (o === "portrait" || o === "landscape") return o;
  if (!availW || !availH) return "landscape";
  return availW / availH < (cfg?.threshold ?? 1.0) ? "portrait" : "landscape";
}

/** Read the HA header height (px) from the CSS variable, 0 when absent. */
export function headerPx(el: Element): number {
  try {
    const raw = getComputedStyle(el).getPropertyValue("--header-height").trim();
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

/** Merge the profile's grid config with the built-in defaults. `crop` isn't
 *  merged here (it has no "default profile" data to fall back to — it's just
 *  present or absent) — callers read `cfg[profile]?.crop` directly. */
export function resolveProfile(cfg: LayoutConfig, profile: LayoutProfile): ResolvedProfileGrid {
  const p = cfg[profile] ?? {};
  const d = DEFAULT_PROFILES[profile];
  return {
    columns: p.columns?.length ? p.columns : d.columns,
    rows: p.rows?.length ? p.rows : d.rows,
    place: p.place && Object.keys(p.place).length ? p.place : d.place,
  };
}

/** `fr`, not `%` — CSS Grid's `fr` unit distributes space AFTER subtracting
 *  `gap`, so proportional tracks never overflow their container by the gap
 *  amount. Plain `%` tracks summing to 100% do: any region spanning 2+
 *  tracks (e.g. `col: "1/3"`) then overflows the grid by (gaps spanned ×
 *  gap size) — confirmed live on a real dashboard 2026-07-17 (docs/21 §5b
 *  second follow-up): a landscape `columns: [70, 30]` with the default 6px
 *  gap overflowed `badges`/`map`/`tools` (all `col: "1/3"`) by exactly 6px,
 *  which cascaded into a page-level horizontal AND vertical scrollbar (the
 *  vertical one was a pure side effect — fixing the column unit alone
 *  removed both). Numerically identical ratio for the config author (a
 *  `70`/`30` split still renders 70:30); only the CSS unit changes. */
function track(v: number | string): string {
  return typeof v === "number" ? v + "fr" : v;
}

export function trackList(list: Array<number | string>): string {
  return list.map(track).join(" ");
}

/** CSS height for the grid root. The measured refinement (innerHeight − rootTop)
 *  is applied on top of this by the card; this is the declarative fallback.
 *  `svh` (not vh/dvh) so a mobile URL-bar show/hide doesn't make the layout jump. */
export function resolveHeightCss(cfg: LayoutConfig): string {
  const h = cfg.height ?? "viewport";
  if (h === "viewport") return "calc(100svh - var(--header-height, 0px))";
  if (h === "container") return "100%";
  return h;
}

/** Inline styles for the grid root (static styles can't express a dynamic grid).
 *
 *  REVERTED 2026-07-16 (mobile crash, card 0.59.0 → 0.61.0): `height` and
 *  `gridTemplateColumns` were pulled out of this object on the theory that
 *  Lit's `styleMap` re-applying every key on every render was silently
 *  fighting the JS-measured overrides in `updated()`. That was true (and
 *  is the reason portrait's column split never visibly changed across
 *  0.56–0.58), but the fix itself is what broke the HA mobile companion
 *  app — user bisected it precisely to 0.59.0, with 0.55.0–0.58.0 all
 *  confirmed non-crashing. Exact mechanism not fully confirmed, but the
 *  safe move is putting both properties back here and accepting that the
 *  JS refinement in `updated()` fights (and mostly loses) against this
 *  declarative object again — a cosmetic imperfection, not a crash. Do NOT
 *  remove these from styleMap again without a mobile-tested alternative. */
export function gridRootStyles(cfg: LayoutConfig, prof: ResolvedProfileGrid): Record<string, string> {
  return {
    display: "grid",
    width: "100%",
    height: resolveHeightCss(cfg),
    alignContent: "start",
    gridTemplateColumns: trackList(prof.columns),
    gridTemplateRows: trackList(prof.rows),
    gap: cfg.gap ?? "6px",
    boxSizing: "border-box",
  };
}

/** Inline styles for a region wrapper. `position:relative` keeps absolutely
 *  positioned children (map overlays, layer toggles) correct in both profiles. */
export function regionStyles(place: RegionPlace): Record<string, string> {
  const s: Record<string, string> = {
    gridRow: String(place.row ?? "auto"),
    gridColumn: String(place.col ?? "1"),
    overflow: place.overflow ?? "hidden",
    position: "relative",
    minWidth: "0",
    minHeight: "0",
  };
  if (place.align && place.align !== "stretch") s.alignSelf = place.align;
  return s;
}

// ── Per-profile scalars (instead of a second breakpoint system) ────────────

type PerProfile<T> = Partial<Record<LayoutProfile, T>>;

function isPerProfile<T>(v: unknown): v is PerProfile<T> {
  return (
    typeof v === "object" && v !== null && !Array.isArray(v) &&
    ("portrait" in (v as object) || "landscape" in (v as object))
  );
}

/** Resolve a scalar that may vary per profile:
 *  pval({portrait: "8px", landscape: "12px"}, profile) or pval("10px", profile). */
export function pval<T>(v: T | PerProfile<T>, profile: LayoutProfile): T | undefined {
  if (isPerProfile<T>(v)) {
    const p = v as PerProfile<T>;
    return p[profile] ?? p[profile === "portrait" ? "landscape" : "portrait"];
  }
  return v as T;
}

/** Overlay `item[profile]` onto the base object (shallow merge). */
export function papply<T extends Record<string, unknown>>(item: T & PerProfile<Partial<T>>, profile: LayoutProfile): T {
  const overlay = (item as PerProfile<Partial<T>>)[profile];
  const base: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(item)) {
    if (k === "portrait" || k === "landscape") continue;
    base[k] = v;
  }
  return (overlay ? { ...base, ...overlay } : base) as T;
}
