/**
 * AnyVac — universal contract (Milestone 0).
 *
 * Two halves:
 *   1. Authoring-time CARD CONFIG — what the user writes / the GUI editor produces.
 *   2. Runtime VACUUM MODEL — the vendor-agnostic shape the card consumes. Per-vendor
 *      logic (Roborock for now) produces this model and fulfils the unified commands.
 *
 * Design rules (see docs/00-analyza.md sections 5/12/13):
 *   - The card never knows the vendor — only this model + capability flags.
 *   - Room cleaning is calibration-free (HA Areas via vacuum.clean_area). Calibration
 *     (px<->mm) is OPTIONAL and only needed for the advanced map (zones / pin & go /
 *     live position) — Milestone 2.
 *   - The map source is format-agnostic (raster / svg / stream) and multi-source.
 *   - A formal VacuumAdapter interface is intentionally deferred until vendor #2
 *     (decision 2026-06-14) — for MVP the Roborock path is wired directly.
 */

// ===========================================================================
// Home Assistant core types
// ===========================================================================

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HassServiceTarget {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  /** Areas registry (HA Areas -> used for calibration-free room cleaning). */
  areas?: Record<string, { area_id: string; name: string }>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: HassServiceTarget,
    notifyOnError?: boolean,
    returnResponse?: boolean,
  ): Promise<unknown>;
  /** Raw WebSocket command (optional — used for advanced/back-end calls). */
  callWS?<T = unknown>(message: Record<string, unknown>): Promise<T>;
  hassUrl?(path?: string): string;
  [key: string]: unknown;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: AnyVacCardConfig): void;
  getCardSize?(): number | Promise<number>;
}

// ===========================================================================
// 1. CARD CONFIG (authoring-time)
// ===========================================================================

/** Base visual layer of the card. */
export type BaseLayerKind = "image" | "map" | "combined";

/** How the clean command is issued. Default "area" = native HA Areas (calibration-free). */
export type CleanStrategy = "area" | "segment" | "script";

export interface AnyVacCardConfig {
  type: string;
  /** Card-level default base layer; can be overridden per vacuum. */
  base?: BaseLayerKind;
  vacuums?: VacuumCardConfig[];
  /** Shared room-overlay appearance. */
  region_border_normal?: number;
  region_border_selected?: number;
  region_icon_hidden?: boolean;
  /** Lovelace adds arbitrary keys (view_layout, ...). */
  [key: string]: unknown;
}

export interface VacuumCardConfig {
  /** The official integration's vacuum.* entity. */
  entity: string;
  name?: string;
  /** Decorative robot image shown in the status panel (cosmetic, not the base layer). */
  image?: string;
  /** Per-vacuum override of the base layer. */
  base?: BaseLayerKind;

  /** Configurable image base (custom photo / SVG floorplan). */
  image_base?: ImageBaseConfig;
  /** Format-agnostic vacuum-map source (optional; for "map"/"combined" base). */
  map_source?: MapSourceConfig;

  /** Clickable rooms placed on the base layer (calibration-free). */
  regions?: RegionConfig[];
  /** 1-3 user-prepared presets ("how" to clean), decoupled from room selection ("where"). */
  presets?: CleanPreset[];

  /** How room cleaning is issued. Default "area". */
  clean_strategy?: CleanStrategy;
  /** Used when clean_strategy = "script". */
  clean_script?: string;

  /** Optional entity overrides for status readouts (else derived from the vacuum entity). */
  status_entity?: string;
  battery_entity?: string;
  error_entity?: string;
  current_room_entity?: string;
  progress_entity?: string;

  [key: string]: unknown;
}

/** Custom image base — a photo or SVG floorplan the user supplies (the moat). */
export interface ImageBaseConfig {
  /** URL, e.g. /local/anyvac/flat.svg */
  src: string;
  /** Display transforms applied to the image. */
  rotation?: number;
  scale?: number;
  offset_x?: number;
  offset_y?: number;
}

/**
 * Format-agnostic map source. Read calibration/segments from EXISTING entities
 * (official Roborock image, Xiaomi Cloud Map Extractor, Valetudo bridge) — we do
 * not build our own extractor (docs/00-analyza.md section 13).
 */
export interface MapSourceConfig {
  kind: MapSourceKind;
  /** camera/image entity holding the rendered map. */
  entity: string;
  format?: MapFormat;
  /** Optional — only required for the advanced calibrated map (Milestone 2). */
  calibration?: MapCalibration;
  rotation?: number;
  scale?: number;
  offset_x?: number;
  offset_y?: number;
}

export type MapSourceKind =
  | "roborock_image"   // official Roborock integration image entity
  | "camera"           // generic camera entity
  | "image_entity"     // generic image entity
  | "cloud_extractor"  // PiotrMachowski Xiaomi Cloud Map Extractor
  | "valetudo";        // valetudo_vacuum_camera bridge

export type MapFormat = "raster" | "svg" | "stream";

/** Affine calibration: 3 point pairs mapping map pixels <-> vacuum coordinates (mm). */
export interface MapCalibration {
  points: [CalibrationPoint, CalibrationPoint, CalibrationPoint];
}

export interface CalibrationPoint {
  /** Pixel position on the map image. */
  map: Point2D;
  /** Corresponding vacuum coordinate (mm). */
  vacuum: Point2D;
}

/**
 * A clickable room placed on the base layer. Calibration-free: position is a
 * percentage region on the image, cleaning is triggered via the HA Area.
 */
export interface RegionConfig {
  id: string;
  name: string;
  /** HA Area id — used by vacuum.clean_area (preferred, calibration-free). */
  area_id?: string;
  /** Raw segment id — fallback for app_segment_clean. */
  segment_id?: number;
  icon?: string;
  icon_anchor?: IconAnchor;
  /** Placement on the image base, in percentages. */
  shape: RegionShape;
}

export type IconAnchor =
  | "none" | "tl" | "t" | "tr" | "l" | "c" | "r" | "bl" | "b" | "br";

export type RegionShape =
  | { kind: "rect"; x: number; y: number; w: number; h: number } // %
  | { kind: "point"; x: number; y: number };                     // %

/** Type of cleaning a preset performs. */
export type CleanType = "dry" | "wet" | "both";

/**
 * A named bundle of "how" settings, prepared once and reused. Applied before the
 * clean is issued (set_fan_speed + select_option for mop/water, then clean).
 * The 1-3 limit is deliberate (docs/00-analyza.md section 12.3).
 */
export interface CleanPreset {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  /** Marks this as the per-vacuum default (used when the user just picks rooms). */
  default?: boolean;

  clean_type?: CleanType;
  /** fan_speed option (applied via vacuum.set_fan_speed). */
  suction?: string;
  /** Repeats per room. */
  repeats?: number;

  /** Mop/water target values (applied via select.select_option on the bound entities). */
  mop_mode?: string;
  mop_intensity?: string;
  water?: string;
  /** Entity bindings for the select-based settings above (vendor-specific selects). */
  mop_mode_entity?: string;
  mop_intensity_entity?: string;
  water_entity?: string;
}

// ===========================================================================
// 2. RUNTIME VACUUM MODEL (vendor-agnostic; what the card consumes)
// ===========================================================================

export interface VacuumModel {
  identity: VacuumIdentity;
  capabilities: VacuumCapabilities;
  state: VacuumState;
  map?: VacuumMap;
}

export type ConnectionKind = "cloud" | "local" | "mqtt";

export interface VacuumIdentity {
  id: string;
  name: string;
  vendor: string;          // "roborock" | "valetudo" | ... (card stays agnostic)
  model?: string;
  connection: ConnectionKind;
}

/** Capability flags + available level lists. Card features degrade against these. */
export interface VacuumCapabilities {
  segment_clean: boolean;
  zone_clean: boolean;
  goto: boolean;
  spot_clean: boolean;
  no_go_zones: boolean;
  virtual_walls: boolean;
  multi_map: boolean;
  locate: boolean;
  manual_control: boolean;
  dnd: boolean;
  schedules: boolean;
  fan_levels: string[];
  mop_modes: string[];
  water_levels: string[];
  consumables: string[];
}

/** Normalized activity (vendor status strings are mapped onto this). */
export type VacuumActivity =
  | "idle" | "cleaning" | "paused" | "returning"
  | "docked" | "charging" | "error" | "unknown";

export interface VacuumState {
  /** Raw vendor status string (for display/mapping). */
  status: string;
  activity: VacuumActivity;
  battery?: number;
  fan?: string;
  mop?: string;
  water?: string;
  error?: string | null;
  current_segment?: string | null;
}

export interface VacuumMap {
  image: MapImage;
  /** Present only when a calibrated source is configured (Milestone 2). */
  calibration?: MapCalibration;
  segments: Segment[];
  robot?: Pose;
  charger?: Point2D;
  no_go?: Zone[];
  walls?: Wall[];
  path?: Point2D[];
}

export interface MapImage {
  src: string;
  format: MapFormat;
}

export interface Segment {
  id: number | string;
  name?: string;
  /** Mapped HA Area, when known. */
  area_id?: string;
}

/** Coordinates are in mm (vacuum space) unless stated otherwise. */
export interface Point2D {
  x: number;
  y: number;
}

export interface Pose extends Point2D {
  angle: number;
}

export interface Zone {
  x1: number; y1: number; x2: number; y2: number;
}

export interface Wall {
  x1: number; y1: number; x2: number; y2: number;
}

// ===========================================================================
// Unified command surface (what the Roborock path fulfils for MVP)
// ===========================================================================

/** Per-clean overrides — typically derived from the selected CleanPreset. */
export interface CleanOptions {
  repeats?: number;
  fanLevel?: string;
  mopMode?: string;
  waterLevel?: string;
}

/**
 * Unified commands the card invokes. For MVP these are implemented directly
 * against the official Roborock integration; the formal per-vendor adapter
 * interface lands with vendor #2.
 */
export interface UnifiedCommands {
  start(): Promise<void>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  dock(): Promise<void>;
  locate(): Promise<void>;
  cleanSpot(): Promise<void>;
  /** Room cleaning — ids are HA Area ids ("area" strategy) or segment ids. */
  cleanSegments(ids: Array<string | number>, opts?: CleanOptions): Promise<void>;
  cleanZones(rectsMm: Zone[], opts?: CleanOptions): Promise<void>;
  goto(pointMm: Point2D): Promise<void>;
  setFan(level: string): Promise<void>;
  setMop(mode: string): Promise<void>;
  setWater(level: string): Promise<void>;
}
