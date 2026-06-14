import type { VacuumActivity } from "./types";

/** Card build version — must match card/package.json. */
export const CARD_VERSION = "0.1.0";

/** Custom element tags. */
export const CARD_TAG = "anyvac-card";
export const EDITOR_TAG = "anyvac-card-editor";

/** Human-friendly name shown in the card picker. */
export const CARD_NAME = "AnyVac Card";
export const CARD_DESCRIPTION =
  "Modern, universal card for robot vacuums — configurable image base, interactive map, value-add insights.";

/** Default accent colour. */
export const ACCENT = "#3b82f6";

/** Hold duration (ms) reserved for hold-to-confirm actions. */
export const HOLD_DURATION_MS = 500;

/**
 * Raw vendor status string -> [label, accent colour].
 * Roborock-centric for the MVP (S6 / S7 / S8). Unknown statuses fall back to
 * the raw string + default accent.
 */
export const STATUS_MAP: Readonly<Record<string, readonly [string, string]>> = {
  cleaning:                    ["Cleaning", "#52c41a"],
  segment_cleaning:            ["Cleaning rooms", "#52c41a"],
  zoned_cleaning:              ["Zone cleaning", "#52c41a"],
  spot_cleaning:               ["Spot cleaning", "#52c41a"],
  starting:                    ["Starting", "#52c41a"],
  segment_mopping:             ["Mopping rooms", "#40a9ff"],
  zoned_mopping:               ["Zone mopping", "#40a9ff"],
  robot_status_mopping:        ["Mopping", "#40a9ff"],
  clean_mop_cleaning:          ["Vacuuming + mopping", "#52c41a"],
  clean_mop_mopping:           ["Vacuuming + mopping", "#52c41a"],
  washing_the_mop:             ["Washing mop", "#9254de"],
  going_to_wash_the_mop:       ["Going to wash mop", "#9254de"],
  air_drying_stopping:         ["Drying mop", "#9254de"],
  returning_home:              ["Returning home", "#faad14"],
  docking:                     ["Docking", "#faad14"],
  going_to_target:             ["Going to target", "#40a9ff"],
  charging:                    ["Charging", "rgba(160,160,160,0.9)"],
  charging_complete:           ["Fully charged", "#52c41a"],
  docked:                      ["Docked", "rgba(160,160,160,0.9)"],
  emptying_the_bin:            ["Emptying bin", "#faad14"],
  idle:                        ["Idle", "rgba(160,160,160,0.7)"],
  paused:                      ["Paused", "#faad14"],
  mapping:                     ["Mapping", "#40a9ff"],
  updating:                    ["Updating", "#faad14"],
  error:                       ["Error", "#ff4d4f"],
  charging_problem:            ["Charging problem", "#ff4d4f"],
  locked:                      ["Locked", "#ff4d4f"],
  device_offline:              ["Offline", "#ff4d4f"],
};

/** Vendor states that count as "actively cleaning". */
export const CLEANING_STATES: ReadonlySet<string> = new Set([
  "cleaning", "segment_cleaning", "zoned_cleaning", "spot_cleaning",
  "segment_mopping", "zoned_mopping", "robot_status_mopping",
  "clean_mop_cleaning", "clean_mop_mopping", "starting",
]);

/** Map a raw vendor status onto the normalized VacuumActivity. */
export function normalizeActivity(status: string): VacuumActivity {
  if (CLEANING_STATES.has(status)) return "cleaning";
  switch (status) {
    case "paused":
      return "paused";
    case "returning_home":
    case "docking":
    case "going_to_wash_the_mop":
      return "returning";
    case "charging":
    case "charging_complete":
      return "charging";
    case "docked":
      return "docked";
    case "idle":
      return "idle";
    case "error":
    case "charging_problem":
    case "locked":
    case "device_offline":
      return "error";
    default:
      return "unknown";
  }
}
