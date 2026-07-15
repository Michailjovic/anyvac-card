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

export interface ProfileGridConfig {
  /** Track sizes: numbers are % of available viewport, strings pass through
   *  ("1fr", "auto", "120px"). */
  columns?: Array<number | string>;
  rows?: Array<number | string>;
  place?: Record<string, RegionPlace>;
}

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
export const DEFAULT_PROFILES: Record<LayoutProfile, Required<Omit<ProfileGridConfig, never>>> = {
  landscape: {
    // Phase C (docs/19 A5): map + meta bar go full-width — the map is the main
    // instrument, not a 70%-column tenant. Below that the cockpit splits in
    // two: left column = per-robot status/controller cards (unchanged);
    // right column = a slim vertical vacuum picker (replaces the old
    // horizontal badge-row tabs for this purpose) with the room list docked
    // directly beneath it.
    columns: [70, 30],
    rows: [9, "auto", "auto", "auto", "1fr"],
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

/** Merge the profile's grid config with the built-in defaults. */
export function resolveProfile(cfg: LayoutConfig, profile: LayoutProfile): Required<ProfileGridConfig> {
  const p = cfg[profile] ?? {};
  const d = DEFAULT_PROFILES[profile];
  return {
    columns: p.columns?.length ? p.columns : d.columns,
    rows: p.rows?.length ? p.rows : d.rows,
    place: p.place && Object.keys(p.place).length ? p.place : d.place,
  };
}

function track(v: number | string): string {
  return typeof v === "number" ? v + "%" : v;
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

/** Inline styles for the grid root (static styles can't express a dynamic grid). */
export function gridRootStyles(cfg: LayoutConfig, prof: Required<ProfileGridConfig>): Record<string, string> {
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
