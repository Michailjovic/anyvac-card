# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Rooms from the integration (real room polygons / names) for clickable cleaning on the floorplan.
- Milestone 3b: companion `anyvac` integration data layers (clean-history, statistics).

## [0.13.0] - 2026-06-20

### Added

- **Card-level floorplan for merged mode** (step 1 of the merged config rebuild) — `image_base` and
  `base_height` can now be set once at the top level of the card config and are used as the shared
  base in `merged` mode, instead of putting the custom floorplan on a vacuum. Falls back to the
  per-vacuum `image_base` when not set (backward compatible).

## [0.12.0] - 2026-06-19

### Changed

- **Per-room ages moved into the layer toggles** — instead of a permanent list under the map,
  **tap** a Dry/Wet chip to toggle the layer and **hold** it to expand a dropdown of every room's age
  for that layer (tap a row to select the room across vacuums). Cleaner, and compact on mobile.

## [0.11.0] - 2026-06-19

### Fixed

- **Traces follow the vacuum's clean type, not the path field** — a vacuum's trace now shows only under
  the layer matching its role (dry/wet), derived from its `clean_action` (mop settings → wet, suction →
  dry) or an explicit `clean_type` (`dry` / `wet` / `both`). A mop-only vacuum no longer draws a trace
  on the Dry layer.

### Added

- **Per-room status list** — below the merged map, each room is listed once (deduped across vacuums)
  with its **dry and wet age** (coloured by the thresholds). Tapping a row selects the room across all
  vacuums, the same as the map rectangle. This is the calibration-independent home for per-room state.

## [0.10.0] - 2026-06-19

### Added

- **Merged map: one rectangle per room, selected across vacuums** — in `merged` mode the room
  rectangles are now de-duplicated by `key`, so each physical room is drawn once. Clicking it selects
  that room on **every** vacuum that has it, so it lights up in both controllers and you choose who
  cleans it by pressing that vacuum's START (the manual precursor to auto-assign).

## [0.9.2] - 2026-06-19

### Fixed

- **Release workflow attaches the JS asset again** — the GitHub release action now receives the tag
  explicitly (`tag_name: ${{ github.event.release.tag_name }}`), fixing the "GitHub Releases requires a
  tag" failure so `dist/anyvac-card.js` is attached to each release automatically (no manual upload,
  HACS picks it up as before).

## [0.9.1] - 2026-06-19

### Fixed

- **`native-auto` now matches rooms by the Roborock room name** — it resolves each room's segment by
  the room `key` (our convention: the Roborock room name), then the display `name`, and only then an
  explicit `area_mappings` entry. Previously it looked up `area_mappings[key]` first, so a room whose
  HA area differs from its Roborock name (e.g. key `Corridor` mapped to area `hall`) failed to resolve
  a segment — the robot beeped but never went there. Other rooms only worked because their area id
  happened to equal the Roborock name.

## [0.9.0] - 2026-06-19

### Added

- **Dry / Wet view layers** — two toggle chips in the top-right of the map, each with a "how long ago"
  badge (the oldest room for that clean type). Toggling a layer shows that type's trace (Dry = `path`,
  Wet = `mop_path`) and colours the rooms by that type's age; with both on, rooms take the worse
  (more-overdue) of the two. This separates *seeing* (layers) from *acting* (presets).
- **Room age from the integration** — room colouring now reads `last_dry` / `last_wet` / `any` from the
  AnyVac sensor (per the active layer), falling back to the old `last_clean` helper entity when no
  integration sensor is set.

## [0.8.0] - 2026-06-19

### Added

- **Robot image rotation** — a *Robot image rotation* slider corrects the orientation of the robot
  image on the map (added on top of the live heading).

### Changed

- **Merged map renders each robot's own map** — in `merged` mode every shown vacuum now draws its own
  vacuum map over the shared floorplan, each with its **own opacity slider, blend, on/off (Hide map)
  and seating**, so the maps can be stacked and aligned independently. Opacity / blend / image / Hide
  map controls are now shown per vacuum in merged mode.
- **Base layer** — the standalone *Custom image* option was removed from the selector; choices are now
  *Vacuum map* and *Image + map* (a custom floorplan is the base in merged mode).

## [0.7.0] - 2026-06-19

### Added

- **Auto-filled vacuum sensors** — leave Status / Battery / Last clean / Progress / Current room /
  Error blank and the card resolves them automatically from the vacuum's device (matched by
  `translation_key` / `device_class`). Explicit config still wins.
- **Merged map mode** (`map_mode: merged`) — render **one shared map** with all shown vacuums
  overlaid (each robot's position + path in its own colour, seated by its own map transform), instead
  of one map per vacuum. Per-vacuum controls and status stay below the shared map. A *Map mode*
  selector was added to the editor. (First version: display + room overlays; map-click modes
  pin&go/zone stay per-vacuum and are best used in split mode for now.)

## [0.6.0] - 2026-06-19

### Added

- **Path styling** — *Path colour* and *Path width* options for the integration vector (the cleaning
  trail), set from the GUI.
- **Robot image on the map** — a *Robot image on map* toggle reuses the vacuum's configured status
  image (`image`) as the map marker (rotated to the robot's heading), with a *Robot image size*
  slider, instead of the default coloured dot.

### Changed

- **Editor hint on room Key** — the room *Key* field now notes it should match the room's name in the
  Roborock app, which the `native-auto` strategy pairs rooms by.

## [0.5.0] - 2026-06-19

### Added

- **Floorplan-only mode** — with an integration sensor selected, a *Hide vacuum map* toggle hides the
  Roborock map image and shows only your custom floorplan plus the vector robot and path.
- **Pin & Go and Zone cleaning use the integration calibration** — when an AnyVac sensor is selected,
  Pin & Go and the new **Zone** mode convert taps/drags to millimetres via the sensor's
  `calibration_points`, so they work with **no manual calibration**. Manual calibration remains the
  fallback when no integration sensor is set.
- **Zone cleaning** — a new *Zone* map tool: drag a rectangle on the map/floorplan, confirm, and the
  card sends `app_zoned_clean` for that area.

## [0.4.0] - 2026-06-19

### Added

- **Integration mode** — when an AnyVac companion sensor (`sensor.*_anyvac_map`) is selected for a
  vacuum, the card draws the robot (with heading) and the cleaning path as a vector overlay, using the
  `calibration_points` exposed by the sensor to map millimetres to map pixels. No manual calibration.
  In combined mode the vector is seated like the map overlay, so it lands on a custom floorplan.

## [0.3.7] - 2026-06-14

### Added

- **Overlay blend mode** (combined base) — a new *Overlay blend* option (`overlay_blend`:
  normal / lighten / screen / plus-lighter). Because the Roborock map draws the robot and the cleaned
  path as the *lightest* pixels, setting it to **lighten** makes the path and robot "punch through"
  onto a custom floorplan while the room fills blend away — a free, theme-robust way to isolate the
  trail without per-pixel colour keying.

## [0.3.6] - 2026-06-14

### Changed

- **Calibration is more hands-off** — after sending the robot to a calibration point, the card
  auto-refreshes the map several times while it drives (no need to press Refresh), and the third
  point starts closer to the dock so it is reachable more often (fewer "try another spot" retries).

## [0.3.5] - 2026-06-14

### Fixed

- **Calibration could be collinear** — the three calibration points could land on a single line
  (e.g. dock + east + west), leaving the transform unable to resolve one axis (Pin & Go always
  returned the dock's Y). Point 3 is now offered only perpendicular to point 2, and a guard rejects
  nearly collinear points. **Re-calibrate after updating.**

## [0.3.4] - 2026-06-14

### Fixed

- **Calibration anchored to the map layer** — in combined mode, calibration and Pin & Go now resolve
  clicks against the vacuum-map layer (where the robot and the millimetre coordinates actually live),
  undoing only the map's rotation/scale/offset, instead of the custom floorplan's. A small debug
  readout under the map shows the clicked %→mm so issues can be pinpointed. **Re-calibrate after
  updating.**

## [0.3.3] - 2026-06-14

### Fixed

- **Calibration accuracy in combined mode** — calibration and Pin & Go now anchor each click to the
  clicked layer's own content space (undoing its rotation / scale / offset via the element transform)
  instead of raw container coordinates. This removes the drift caused by the image base and the map
  overlay having different seatings (e.g. different scale), which made Pin & Go land off on both axes,
  worse toward the edges. **Re-calibrate after updating** — the stored calibration changes coordinate
  space.

## [0.3.2] - 2026-06-14

### Changed

- **Calibration alignment circle** — during calibration you place a robot-sized circle (with a centre
  dot) and press *Confirm*, instead of blind-tapping. Align the circle with the dock/robot edges for a
  precise point.

## [0.3.1] - 2026-06-14

### Added / Changed

- **Permanent "Refresh map" button** under the map (the official Roborock map refreshes mainly during
  cleaning; this forces an update).
- Calibration probing reworked — **"try another spot"** keeps a good baseline (~2.2 m) and rotates
  through directions instead of shrinking toward the dock, so calibration points stay well-spread and
  accurate; the map auto-refreshes after each move.

## [0.3.0] - 2026-06-14

### Added

- **Map calibration + Pin & Go** (Milestone 2) — an in-card guided wizard establishes a pixel↔mm
  transform (tap the dock; the card auto-drives the robot to two points; you mark it on the map).
  Once calibrated, a **Pin & Go** mode sends the robot to any point you tap. Calibration is stored
  per browser (localStorage).

## [0.2.0] - 2026-06-14

### Added

- **Configurable image base** — use a custom floorplan/photo as the card's base layer
  (`base: map | image | combined`). Point `image src` at a URL (SVG / WebP / PNG / JPG) and seat it
  with its own rotation / scale / offset. In `combined` mode the vacuum map (robot + path) overlays
  the image, with an **adjustable overlay opacity**. Clickable rooms work on any base.
- **Card height control** (`base_height`) — fix the card/stage height independently of the image's
  natural size; the image is fitted inside (`object-fit: contain`) and `scale`/offset seat it within.
- **Editor improvements** — Maps tab gains a *Base layer* selector, *Card height* and *Overlay
  opacity* sliders, and image source + transform fields. The click-to-place preview now shows the
  custom image when the base is image/combined.
- **Reorderable rooms** — drag the grip handle on a room in the Vacuums tab to reorder rooms
  (order propagates everywhere, including the room chips on the Maps tab).

## [0.1.0] - 2026-06-14

Initial release. AnyVac Card is built on the proven `roborock-vacuum-card` codebase (renamed and
re-homed), keeping its polished UI and editor as the foundation.

### Added

- **Multi-vacuum pill badges** — switch between vacuums; active/cleaning glow.
- **Configurable map** — camera/image map entity with rotation / scale / offset seating
  (slider-based in the editor, live preview).
- **Clickable rooms** — rectangle and point overlays; editor "select a room, click the map to place
  it" workflow.
- **Per-room "last cleaned" thresholds** — colour by age (reads helper entities for now; to be
  superseded by the companion integration).
- **Clean strategies** — `native` (`app_segment_clean`), `native-area` (`vacuum.clean_area`),
  `native-auto` (resolve segments via `roborock.get_maps`), `script`.
- **Glassy status card** — robot image, status label + colour, battery, last-clean, current room,
  error, progress.
- **Hold-to-activate actions** — START (per-room icons, time estimate, all/none), Pause / Resume /
  Dock, with a hold-ring fill animation.
- **Global actions** — whole-flat / cross-vacuum action badges.
- **GUI editor** — three tabs (Vacuums / Maps / Global).
