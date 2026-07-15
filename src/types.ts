import type { LayoutConfig } from "./layout";

// ── Home Assistant core types ─────────────────────────────────────────────

export interface HassConnection {
  sendMessage(message: Record<string, unknown>): void;
  subscribeEvents(
    callback: (event: { data?: Record<string, unknown> }) => void,
    eventType?: string
  ): Promise<() => void>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  connection: HassConnection;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<void>;
  /** Raw WebSocket command (blueprint/save, input_datetime/create, …) */
  callWS<T = unknown>(message: Record<string, unknown>): Promise<T>;
  /** REST API call (config/automation/config/<id>, …) */
  callApi<T = unknown>(method: string, path: string, parameters?: unknown): Promise<T>;
  hassUrl(path?: string): string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

// ── Card config types ─────────────────────────────────────────────────────

export interface MapConfig {
  entity: string;
  rotation: number;
  scale: number;
  offset_x: number;
  offset_y: number;
  /** Seating mode (docs/15): "auto" (default — fitted from room anchors when the
   *  integration + a floorplan + at least one matched room are available) or
   *  "manual" (use the rotation/scale/offset values above). */
  seat?: "auto" | "manual";
}

export interface ImageBaseConfig {
  src: string;
  rotation?: number;
  scale?: number;
  offset_x?: number;
  offset_y?: number;
}

export interface RoomThreshold {
  days: number;
  color: string;
}

export interface RoomConfig {
  key: string;
  name: string;
  icon?: string;                     // volitelné v rectangle módu
  icon_anchor?: "none"|"tl"|"t"|"tr"|"l"|"c"|"r"|"bl"|"b"|"br";
  segment_id?: number;
  area_id?: string;
  clean_time_mins?: number;
  /** Estimated minutes for a DRY clean of this room (used when the vacuum's role is dry). */
  clean_time_dry?: number;
  /** Estimated minutes for a WET (mop) clean of this room (used when the vacuum's role is wet). */
  clean_time_wet?: number;            // odhadovaný čas úklidu (minuty) — fallback when no entity
  /** Legacy input_number, READ-ONLY fallback estimate. The card never writes it —
   *  estimates are learned by the anyvac integration (docs/14 §3.2). */
  clean_time_entity?: string;
  /** Legacy input_datetime, READ-ONLY fallback for room age. The card never writes it —
   *  history is stamped by the anyvac integration (docs/14 §3.3). */
  last_clean_entity?: string;
  map_x: number;
  map_y: number;
  map_w?: number;                    // šířka % → aktivuje rectangle mód
  map_h?: number;                    // výška %
}

// ── Clean action strategies ───────────────────────────────────────────────

export interface NativeCleanAction {
  type: "native";
  repeat?: number;
  suction_level?: string;  // option from vacuum entity's fan_speed_list
  mop_mode_entity?: string;
  mop_mode?: string;
  mop_intensity_entity?: string;
  mop_intensity?: string;
}

/**
 * Uses the newer HA vacuum.clean_area action.
 * room.key is sent directly as cleaning_area_id -- no segment_id needed.
 * Repeat is implemented in software: the card restarts cleaning after each
 * pass (the integration does not accept a times/repeat parameter).
 */
export interface NativeAreaCleanAction {
  type: "native-area";
  repeat?: number;         // software repeat -- card restarts after each pass
  suction_level?: string;
  mop_mode_entity?: string;
  mop_mode?: string;
  mop_intensity_entity?: string;
  mop_intensity?: string;
}

/**
 * Uses roborock.get_maps to dynamically resolve segment IDs, then calls
 * vacuum.send_command with app_segment_clean + repeat (same as native).
 * No segment_id needed per room -- matching is done via area_mappings.
 */
export interface NativeAutoCleanAction {
  type: "native-auto";
  repeat?: number;
  suction_level?: string;
  mop_mode_entity?: string;
  mop_mode?: string;
  mop_intensity_entity?: string;
  mop_intensity?: string;
}

export interface ScriptCleanAction {
  type: "script";
  entity_id: string;
  variables?: Record<string, string>;
}

export type CleanAction = NativeCleanAction | NativeAreaCleanAction | NativeAutoCleanAction | ScriptCleanAction;

// ── Presets & orchestration (docs/11) ─────────────────────────────────────

/**
 * A named "how" bundle for a single vacuum (Manual mode). The user picks one on
 * the vacuum's controller, then picks rooms on the map. Values are applied via
 * the vacuum's clean_action plumbing (mop_mode_entity / mop_intensity_entity /
 * set_fan_speed). Clean type (dry/wet/both) is DERIVED from these, never stored.
 */
export interface SettingPreset {
  /** Stable id (used for backend estimate keying / referencing). */
  id: string;
  label: string;
  icon?: string;
  suction_level?: string;
  mop_mode?: string;
  mop_intensity?: string;
  repeat?: number;
}

/** One step of a (possibly multi-step) targeted clean. */
export interface CleanStep {
  /** Room keys; empty/omitted = all rooms in scope. */
  rooms?: string[];
  suction_level?: string;
  mop_mode?: string;
  mop_intensity?: string;
  repeat?: number;
}

/** Orchestrator policy (Auto mode). Global default on the card; optional per-preset override. */
export interface OrchestratorPolicy {
  /** Never run dry and wet on the same area at the same time. Default true. */
  avoid_dry_wet_collision?: boolean;
  /** Optimisation priority. */
  priority?: "speed" | "fewer_robots";
}

/**
 * A card-level targeted clean (Auto mode). The user taps it; the integration
 * orchestrates which robots, in which order, with what timing. `scope` = what to
 * clean; the orchestrator decides who/how.
 */
export interface GlobalPreset {
  id: string;
  label: string;
  icon?: string;
  /** "all" = whole flat, "select" = pick rooms on the map at run time, or fixed room keys. */
  scope: "all" | "select" | string[];
  /** dry pass only / wet pass only / dry then wet (wet follows dry per room). Default "dry". */
  mode?: "dry" | "wet" | "both";
  /** Optional ordered steps (e.g. a dry pass then a wet pass). */
  steps?: CleanStep[];
  /** Per-preset override of the orchestrator policy. */
  policy?: OrchestratorPolicy;
}

// ── Global action ─────────────────────────────────────────────────────────

/**
 * A badge that triggers a single action across all vacuums.
 * Typical use-case: "Clean whole flat" button.
 * The badge glows when any of watch_entities is in a cleaning state.
 */
export interface GlobalActionScript {
  type: "script";
  entity_id: string;
  variables?: Record<string, string>;
}

export interface GlobalActionService {
  type: "service";
  /** Format: "domain.service", e.g. "script.turn_on" */
  service: string;
  data?: Record<string, unknown>;
}

export type GlobalActionCall = GlobalActionScript | GlobalActionService;

export interface GlobalAction {
  /** Display name shown in the badge */
  name: string;
  /** Optional image path, e.g. /local/Dashboards/Vacuum/celybyt.png */
  image?: string;
  /** Accent colour. Defaults to "orange". */
  color?: VacuumColor;
  /**
   * Entity IDs to watch. When any is cleaning, the badge shows
   * active glow. When all are idle, the badge is dimmed.
   */
  watch_entities?: string[];
  /** What to trigger on hold-to-activate */
  action: GlobalActionCall;
}

// ── Vacuum & card config ──────────────────────────────────────────────────

export type VacuumColor = "green" | "blue" | "orange";

export interface VacuumConfig {
  entity: string;
  name?: string;
  image?: string;
  color?: VacuumColor;
  status_entity?: string;
  battery_entity?: string;
  last_clean_entity?: string;
  progress_entity?: string;
  base?: "image" | "map" | "combined";
  image_base?: ImageBaseConfig;
  /** Fixed base/stage height in px (controls card size). 0/undefined = auto. */
  base_height?: number;
  /** Overlay map opacity in combined mode (0-100). */
  overlay_opacity?: number;
  /** CSS mix-blend-mode for the map overlay in combined mode (e.g. 'lighten' to isolate the path). */
  overlay_blend?: string;
  /** Entity id of the AnyVac companion sensor (sensor.*_anyvac_map) for integration mode. */
  integration_entity?: string;
  /** Vacuum's clean-type role for the dry/wet layers; derived from clean_action if unset. */
  clean_type?: "dry" | "wet" | "both";
  /** Manual-mode setting presets (named "how" bundles). Legacy clean_action = presets[0] if unset. */
  presets?: SettingPreset[];
  /** Integration mode: hide the Roborock map image, show only the floorplan + vector robot/path. */
  hide_map?: boolean;
  /** Integration vector: path stroke colour (defaults to the vacuum colour). */
  path_color?: string;
  /** Integration vector: mop (wet) trace band colour (defaults to a wet blue). */
  mop_path_color?: string;
  /** Integration vector: mop band opacity 0-100 (default 28). */
  mop_band_opacity?: number;
  /** Integration vector: mop band width, percent of default (default 100). */
  mop_band_width?: number;
  /** Integration vector: path stroke width, percent of default (default 100). */
  path_width?: number;
  /** Integration vector: draw the configured robot image (vac.image) as the map marker. */
  robot_image_on_map?: boolean;
  /** Integration vector: robot image size, percent of default (default 100). */
  robot_size?: number;
  /** Integration vector: extra rotation (deg) added to the robot image to correct its orientation. */
  robot_image_rotation?: number;
  map?: MapConfig;
  rooms?: RoomConfig[];
  clean_action?: CleanAction;
  current_room_entity?: string;
  error_entity?: string;
}

export interface AnyVacCardConfig {
  type: string;
  vacuums: VacuumConfig[];
  /** Render one shared map with all vacuums (merged), or one map per vacuum (split, default). */
  map_mode?: "split" | "merged";
  /** Merged mode: shared custom floorplan, set once on the card (not per vacuum). */
  image_base?: ImageBaseConfig;
  /** Merged mode: shared card height. */
  base_height?: number;
  /** Merged mode: shared room list, defined once on the card (not per vacuum). */
  rooms?: RoomConfig[];
  /** Optional extra badges for whole-flat or cross-vacuum actions */
  global_actions?: GlobalAction[];
  /** Shared room overlay appearance — applies to all vacuums */
  room_border_normal?: number;    // border width when room is not selected, default 2
  room_border_selected?: number;  // border width when room is selected, default 4
  room_thresholds?: RoomThreshold[];
  room_icon_hidden?: boolean;     // hide all room overlay icons globally
  /**
   * Global room-key → HA area_id mapping for native-area strategy.
   * Defined once here; all vacuums share it.
   * Per-room area_id overrides this when set.
   */
  area_mappings?: Record<string, string>;
  /** Controller surface: "auto" = single orchestrated controller, "manual" = per-robot controllers. Default auto. */
  ui_mode?: "auto" | "manual";
  /** Rotate the map to portrait: "auto" (default, on narrow card width) / "always" / "off". */
  mobile_rotate?: "auto" | "always" | "off";
  /** Card-level targeted cleans for Auto mode (orchestrated across robots). */
  global_presets?: GlobalPreset[];
  /** Default orchestrator policy (overridable per global preset). */
  orchestrator?: OrchestratorPolicy;
  /** Debug: draw a per-room cleaning-progress gauge on the map (reads the integration's
   *  rooms_progress). Off by default — a testing aid, not for everyday cards. */
  debug_room_progress?: boolean;
  /** Two-profile percentage-grid layout (docs/18). Omitted = today's stacked
   *  render, unchanged. Present = the card becomes a viewport-sized grid with
   *  named regions placed per portrait/landscape profile. */
  layout?: LayoutConfig;
  /** Show debug details (raw geometry readouts etc.) in the production grid UI.
   *  Off by default (docs/18 §7c) — debug data moves behind this toggle. */
  debug?: boolean;
}
