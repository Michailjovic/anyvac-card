export const CARD_NAME = "anyvac-card";
export const EDITOR_NAME = "anyvac-card-editor";
export const CARD_VERSION = "1.2.3";

/** Hold duration in ms required to trigger START / PAUSE actions */
export const HOLD_DURATION_MS = 600;

/** docs/25 §10 field report (2026-07-25): Android's swipe-up-from-bottom-edge
 *  gesture (app switcher / gesture nav) starts its touch on whatever's under
 *  the finger — often the START bar in portrait, since it sits flush against
 *  the screen's bottom edge. Touch pointers get implicit capture to their
 *  initial target, so `pointerleave`/`pointercancel` never fire as the finger
 *  slides upward mid-swipe; only `pointermove` does. This is the movement
 *  threshold (px) beyond which a hold-in-progress is treated as a drag/swipe
 *  and cancelled instead of left to fire after HOLD_DURATION_MS. */
export const HOLD_MOVE_CANCEL_PX = 12;

/**
 * Maps Roborock status strings to [human-readable label, accent colour].
 * This unified map covers S6 / S7 / S8 MaxV Ultra.
 */
export const STATUS_MAP: Readonly<Record<string, readonly [string, string]>> = {
  // ── Dry cleaning ──────────────────────────────────────────────────────
  cleaning:                         ["🧹 Cleaning",              "#52c41a"],
  segment_cleaning:                 ["🧹 Cleaning rooms",        "#52c41a"],
  zoned_cleaning:                   ["🧹 Zone cleaning",         "#52c41a"],
  spot_cleaning:                    ["🎯 Spot cleaning",         "#52c41a"],
  starting:                         ["▶️ Starting",              "#52c41a"],
  // ── Wet / mop ────────────────────────────────────────────────────────
  segment_mopping:                  ["🫧 Mopping rooms",         "#40a9ff"],
  zoned_mopping:                    ["🫧 Zone mopping",          "#40a9ff"],
  robot_status_mopping:             ["🫧 Mopping",               "#40a9ff"],
  // ── Combined dry + wet ───────────────────────────────────────────────
  clean_mop_cleaning:               ["🧹🫧 Vacuuming+mopping",  "#52c41a"],
  clean_mop_mopping:                ["🧹🫧 Vacuuming+mopping",  "#52c41a"],
  segment_clean_mop_cleaning:       ["🧹🫧 Rooms (vac)",        "#52c41a"],
  segment_clean_mop_mopping:        ["🧹🫧 Rooms (mop)",        "#52c41a"],
  zoned_clean_mop_cleaning:         ["🧹🫧 Zones (vac)",        "#52c41a"],
  zoned_clean_mop_mopping:          ["🧹🫧 Zones (mop)",        "#52c41a"],
  // ── Mop washing ──────────────────────────────────────────────────────
  washing_the_mop:                  ["🚿 Washing mop",           "#9254de"],
  washing_the_mop_2:                ["🚿 Washing mop",           "#9254de"],
  going_to_wash_the_mop:            ["🚿 Going to wash mop",    "#9254de"],
  air_drying_stopping:              ["💨 Drying mop",            "#9254de"],
  back_to_dock_washing_duster:      ["🏠 Dock + washing",       "#faad14"],
  // ── Navigation ───────────────────────────────────────────────────────
  returning_home:                   ["🏠 Returning home",        "#faad14"],
  docking:                          ["🏠 Docking",               "#faad14"],
  going_to_target:                  ["🎯 Going to target",       "#40a9ff"],
  // ── Docked / idle ────────────────────────────────────────────────────
  // The neutral (non-semantic) states resolve through the ink channel token
  // instead of a hardcoded white, so they stay legible when the card runs on a
  // light theme (v1.2.0). `--avc-ink-rgb` is `255,255,255` on every dark theme
  // including `legacy`, so this is byte-identical to the old literal there.
  // Safe as a CSS var specifically because `_statusInfo(...)[1]` is only ever
  // consumed as a whole colour value (borderColor / labelColor / statusColor) —
  // the `+ "80"` hex-alpha suffix trick elsewhere in the card operates on the
  // vacuum's IDENTITY colour (`_color`), never on this one.
  charging:                         ["⚡ Charging",              "rgba(var(--avc-ink-rgb),0.75)"],
  charging_complete:                ["✅ Fully charged",          "#52c41a"],
  docked:                           ["✅ Docked",                "rgba(var(--avc-ink-rgb),0.75)"],
  charger_disconnected:             ["🔌 Charger disconnected",  "#faad14"],
  emptying_the_bin:                 ["🗑️ Emptying bin",          "#faad14"],
  idle:                             ["💤 Idle",                  "rgba(var(--avc-ink-rgb),0.45)"],
  paused:                           ["⏸️ Paused",                "#faad14"],
  // ── Special ──────────────────────────────────────────────────────────
  mapping:                          ["🗺️ Mapping",               "#40a9ff"],
  remote_control_active:            ["🕹️ Remote control",       "#40a9ff"],
  manual_mode:                      ["🕹️ Manual mode",          "#40a9ff"],
  updating:                         ["⬆️ Updating",              "#faad14"],
  in_call:                          ["📞 In call",               "#faad14"],
  shutting_down:                    ["⏹️ Shutting down",        "rgba(var(--avc-ink-rgb),0.4)"],
  // ── Error states ─────────────────────────────────────────────────────
  error:                            ["❌ Error",                 "#ff4d4f"],
  charging_problem:                 ["⚠️ Charging problem",     "#ff4d4f"],
  locked:                           ["🔒 Locked",                "#ff4d4f"],
  device_offline:                   ["📴 Offline",               "#ff4d4f"],
};

/** Colour hex values for VacuumColor variants */
export const COLOR_HEX: Record<string, string> = {
  green:  "#52c41a",
  blue:   "#2196F3",
  orange: "#faad14",
};

/**
 * Default accent-colour palette assigned by a vacuum's position in the
 * `vacuums` array when it has no explicit `color` set — so a fresh
 * multi-vacuum config gets visually distinct vehicles out of the box instead
 * of every vacuum silently falling back to the same "green" (field report
 * 2026-07-31). The first three entries intentionally match the legacy
 * green/blue/orange presets, so a single-vacuum config with no `color` set
 * still looks exactly as it always has. `color` on a vacuum always overrides
 * this — it's purely a starting point, same spirit as `_hexColorField`'s
 * placeholder swatches.
 */
export const DEFAULT_VACUUM_PALETTE: string[] = [
  "#52c41a", // green
  "#2196F3", // blue
  "#faad14", // orange
  "#eb2f96", // magenta
  "#722ed1", // purple
  "#13c2c2", // cyan
  "#fa541c", // volcano
  "#a0d911", // lime
];

/** rgba versions with reduced opacity for backgrounds */
export const COLOR_BG: Record<string, string> = {
  green:  "rgba(46,204,113,0.18)",
  blue:   "rgba(33,150,243,0.18)",
  orange: "rgba(250,173,20,0.18)",
};

export const COLOR_BG_ACTIVE: Record<string, string> = {
  green:  "rgba(46,204,113,0.30)",
  blue:   "rgba(33,150,243,0.30)",
  orange: "rgba(250,173,20,0.30)",
};

/**
 * Converts a "#rgb" or "#rrggbb" hex string to an rgba(...) string at the
 * given alpha. Used to derive a background tint for a custom (non-preset)
 * VacuumColor hex, since COLOR_BG/COLOR_BG_ACTIVE above only cover the three
 * legacy named presets. Falls back to a neutral white wash for anything that
 * doesn't parse (e.g. a CSS colour keyword some old config might still use).
 */
export function hexToRgba(hex: string, alpha: number): string {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
  if (!m) return `rgba(255,255,255,${alpha})`;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── Theming (v1.2.0, docs/35) ─────────────────────────────────────────── */

/**
 * Theme keys accepted by the `theme` config option.
 *
 *  - `dark`   the v1.2.0 look: lifted surfaces, soft elevation, no hairline
 *             grid. This is the default.
 *  - `light`  same structure on a porcelain surface, for dashboards running a
 *             light HA theme (before v1.2.0 the card was unusable there — it
 *             painted white text and white-alpha panels unconditionally).
 *  - `auto`   `dark`, flipping to `light` under `prefers-color-scheme: light`.
 *  - `legacy` the pre-1.2.0 appearance, kept as an escape hatch for dashboards
 *             already tuned around it. Every token in this theme is the exact
 *             literal the 1.1.0 stylesheet used, so it renders unchanged.
 */
export const CARD_THEMES = ["dark", "light", "auto", "legacy"] as const;
export type CardTheme = (typeof CARD_THEMES)[number];
export const DEFAULT_THEME: CardTheme = "dark";

/**
 * Curated accent colours for the `accent` config option. The accent drives the
 * primary action (START), room selection and focus rings — i.e. the parts of
 * the card that carry intent rather than status. Status colours (`STATUS_MAP`)
 * deliberately stay out of it: their saturation is reserved for meaning, per
 * docs/25 §6.
 *
 * Any hex works; these are just the presets offered in the GUI editor, chosen
 * to hold up on both the dark and the light surface (mid-lightness, moderate
 * chroma — a neon accent reads fine on near-black and screams on porcelain).
 */
export const ACCENT_PRESETS: ReadonlyArray<{ id: string; label: string; hex: string }> = [
  { id: "sage",       label: "Sage",       hex: "#6FBF73" },
  { id: "ocean",      label: "Ocean",      hex: "#4FA5C7" },
  { id: "terracotta", label: "Terracotta", hex: "#D98A6A" },
  { id: "plum",       label: "Plum",       hex: "#A87CC0" },
  { id: "amber",      label: "Amber",      hex: "#D9A441" },
  { id: "graphite",   label: "Graphite",   hex: "#8E97A8" },
];

/** Accent used when `accent` is unset — the sage green START has carried since docs/25 §6. */
export const DEFAULT_ACCENT = "#6FBF73";

/**
 * "R, G, B" (no wrapper) for use inside `rgba(var(--x), a)`. Returns null for
 * anything that isn't a plain 3/6-digit hex, so callers can fall back rather
 * than emitting an invalid custom-property value that would poison every rule
 * referencing it.
 */
export function hexToRgbChannel(hex: string): string | null {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(", ");
}

/**
 * States that count as "actively cleaning".
 * NOTE (docs/14 rule 4): since HA 2025 the VACUUM ENTITY state is only ever a
 * VacuumActivity enum value — of these entries it can only match "cleaning", and a
 * mid-clean mop wash even reports "docked". Never use the vacuum entity state for
 * end-of-clean detection. The raw Roborock states below remain for STATUS SENSORS
 * watched via global_actions.watch_entities.
 */
export const CLEANING_STATES = new Set([
  "cleaning",
  "segment_cleaning",
  "zoned_cleaning",
  "spot_cleaning",
  "segment_mopping",
  "zoned_mopping",
  "robot_status_mopping",
  "clean_mop_cleaning",
  "clean_mop_mopping",
  "segment_clean_mop_cleaning",
  "segment_clean_mop_mopping",
  "zoned_clean_mop_cleaning",
  "zoned_clean_mop_mopping",
]);
