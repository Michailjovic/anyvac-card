# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Rooms from the integration (real room polygons / names) for clickable cleaning on the floorplan.
- Milestone 3b: companion `anyvac` integration data layers (clean-history, statistics).

## [0.33.1] - 2026-06-26

### Added

- **`mobile_rotate: always`** forces the portrait rotation regardless of card width (good for testing
  on desktop), alongside `auto` (default, width-based) and `off`. `on` is treated as `always`.
- The edit-mode version chip now shows the **measured card width** (e.g. `v0.33.1 · 412w`), so you can
  see what the responsive detector reads and why auto did/didn't trigger.

## [0.33.0] - 2026-06-26

### Added

- **Responsive mobile map (experimental).** On a narrow card width (< 500 px, auto-detected via a
  ResizeObserver) the wide floorplan is **rotated to portrait** so it fills the card width and is
  readable on a phone instead of a thin letterbox. The map aspect is learned from the floorplan image
  (falls back to the default landscape ratio); the rotated height is capped so it can't run away on
  small screens. Disable with `mobile_rotate: off`. Controls outside the map (tools, status) stay
  upright; the in-map layer toggles rotate with the map for now (polish to follow).

## [0.32.0] - 2026-06-26

### Added

- **Mop band appearance is configurable in the GUI** (Maps tab, integration mode): Mop band colour,
  **opacity** and **width**. Drives the wet "sheen" on the map (config keys `mop_path_color`,
  `mop_band_opacity`, `mop_band_width`).
- **Debug tab shows calibration diagnostics** from the integration (v0.8.0+): raw path-point counts
  (`path pts (raw)`, `mop pts (raw)`) and `calib` — the last single-room calibration decision
  (confirmed rooms, clean type, duration, whether it wrote and the reason), so you can see exactly
  why an estimate did or didn't get recorded.

## [0.31.0] - 2026-06-26

### Changed

- **Global preset tiles now select, they don't run.** Tapping a tile selects it (highlights it, sets
  the plan mode and applies its room scope) and the plan preview shows the active preset's name; the
  clean is started from the plan's "Spustit · podrž" button. Cleaner separation of choosing vs running.

### Fixed

- **Orchestrated cleans now honour the repeat count.** The `app_segment_clean` command was sent
  without a repeat, so every orchestrated clean did a single pass. It now sends
  `params: [{ segments, repeat }]` with the pass count taken from the matching setting preset (or the
  clean action), so multi-pass cleans work. (native/native-auto; native-area repeat stays software.)

## [0.30.0] - 2026-06-26

### Added

- **Plan preview is now interactive.** The PLÁN ÚKLIDU panel gains a **Sucho / Mokro / Obojí** mode
  toggle (shows only the relevant dry/wet rows and builds the plan for that mode) and a **hold-to-run**
  "Spustit" button that runs exactly the previewed plan.
- **Plan reacts to the selected vacuums.** The orchestrator and the plan now only assign rooms to the
  vacuums whose badge is currently held/shown at the top, so you control which robots take part.

## [0.29.0] - 2026-06-26

### Added

- **Orchestration plan preview (Auto mode).** When rooms are selected in Auto mode, a compact
  "PLÁN ÚKLIDU" panel shows the plan as three rows: room icons (top), the vacuum assigned to the
  **dry** pass (broom row), and the vacuum assigned to the **wet** pass (water row). Each vacuum is a
  colour-coded 2-letter chip matching its accent, so you can see who cleans what — and judge the split
  — before holding a tile to run.

## [0.28.2] - 2026-06-26

### Fixed

- **Status card (the per-vacuum controller) layout restored.** A build-tooling bug dropped the
  `.status-left` / `.vac-img` / `.status-right` / `.status-row` CSS rules, so the controller lost its
  two-column grid (robot image left, status right) and rendered with an oversized image and stacked
  content. The CSS is now intact again.

## [0.28.1] - 2026-06-26

### Fixed

- **Auto global-preset tiles no longer stretch into a full-width banner.** They had `flex: 1`, so a
  single global preset filled the whole row and looked broken. They are now compact, content-sized
  tiles (icon + label + hold hint) that wrap, keeping the controller area tidy.

## [0.28.0] - 2026-06-26

### Fixed

- **A both-capable vacuum in an orchestrated `both` clean now finishes its dry pass before its wet
  pass.** It is assigned to both passes (e.g. S7 = dry+wet runs in the dry group with S6 and the wet
  group with S8), but its wet task now waits for its **own dry session to complete**
  (`anyvac_clean_finished` for itself), since one robot cannot clean dry and wet at the same time.
  Rooms cleaned dry by *other* robots are still gated per room via `anyvac_room_done`.

## [0.27.3] - 2026-06-26

### Fixed

- **A dry orchestrated pass now forces the mop off.** It previously took the mop intensity from the
  matched preset, so a vacuum whose only setting preset is a wet one would turn the water on during a
  dry pass (showing up as `clean_type: wet` on the backend). A dry pass now always sets mop intensity
  to `off` (and skips mop mode), so a `clean_type: dry` vacuum actually cleans dry.

## [0.27.2] - 2026-06-26

### Fixed

- **Work splits across robots even with no time estimates set.** The LPT balancer used a room's
  estimate as its weight; with no estimates configured every weight was 0, so the balancer collapsed
  back onto the first owner. Each room now counts at least 1, giving a round-robin split when
  estimates are absent.

## [0.27.1] - 2026-06-26

### Fixed

- **Orchestrated cleans now split the work across robots.** The assignment dumped every owned room on
  the first capable vacuum (so only one robot ran). It now distributes rooms across the capable owners
  by balancing estimated time (LPT greedy: biggest room → least-loaded robot), so e.g. bathroom + hall
  + kitchen are shared between S6 and S7 instead of all going to S6.

### Changed

- **Global preset tiles activate on hold**, with the same fill-ring animation as the vacuum
  controllers — so an orchestrated whole-home clean isn't triggered by an accidental tap.

## [0.27.0] - 2026-06-26

### Added

- **Auto tiles now run the real orchestrator (plan-builder).** Tapping a global preset no longer does
  the naive client fan-out — the card builds a **capability-aware plan** (each room → a dry-capable
  vacuum that owns it; for `mode: both`, a wet-capable vacuum follows, gated per room on the dry
  robot's `anyvac_room_done`) and calls the backend **`anyvac.run_job`** service, which executes it
  server-side (survives the dashboard closing). Clean commands are built per strategy (`native-area`
  → `vacuum.clean_area`; `native` / `native-auto` → `app_segment_clean` with resolved segment IDs),
  with mop/suction selects taken from the matching setting preset.
- **Global preset Mode** (Global tab): Dry only / Wet only / Dry then wet.

### Notes

- The `mode: both` per-room gate matches `anyvac_room_done` by room **name**, so a room's display
  name must match the Roborock room name. Requires the companion integration v0.7.0+ (`anyvac.run_job`
  + `anyvac_room_done`). `script` clean strategy is not orchestrated yet.

## [0.26.0] - 2026-06-26

### Added

- **Debug tab in the editor.** A new "🐞 Debug" tab shows the live, read-only values each vacuum's
  integration sensor is publishing — `clean_type`, `in_cleaning`, `vacuum_room_name`,
  `water_mode_name`, `fan_speed_name`, path / mop_path point counts, and the full `rooms_estimate` and
  `rooms_last_cleaned` payloads (plus a raw-attributes dump) — so you can verify the backend is
  writing data correctly without digging through Developer Tools.

## [0.25.0] - 2026-06-25

### Added

- **Auto-mode runtime (orchestrated cleans, v1).** When `ui_mode: auto`, a bar of global-preset tiles
  appears at the top of the card. Tapping a tile resolves its scope (whole flat / currently selected
  rooms / fixed room keys) and **fans the rooms out across vacuums**: each room is assigned to the
  first vacuum that owns it, those vacuums are selected and started in parallel. This is the naive v1
  allocation — the smart optimiser (capability match, wet-after-dry timing, collision avoidance) is
  the Level-3 backend orchestrator to follow. Per-vacuum controllers remain visible for room
  selection and manual control.

## [0.24.0] - 2026-06-25

### Added

- **Auto/Manual controller mode + global presets config (step A, config side).** The Global tab gains
  a **Controller Mode** select (Auto / Manual) and a **Global presets** section to add/edit/remove
  card-level targeted cleans (`global_presets`: id, label, icon, scope = whole flat / pick on map).
  These feed the upcoming Auto-mode orchestrated controller (runtime to follow).

### Changed

- **Active preset now drives the time estimate immediately.** For a vacuum with 2+ setting presets,
  picking one flips the shown estimate to that preset's mode (dry/wet) right away, instead of waiting
  for the live water mode to change after the clean starts.

## [0.23.0] - 2026-06-25

### Added

- **Setting presets are editable in the GUI editor** (Vacuums tab → new "Setting presets" section).
  Add / edit / remove named presets per vacuum with Label, Icon, Suction (from the vacuum's
  `fan_speed_list`), Mop mode / Mop intensity (options pulled from the Clean action's mop entities),
  and Repeat passes. Previously presets could only be set via YAML.

## [0.22.0] - 2026-06-25

### Added

- **Per-vacuum setting presets (Manual mode, step B).** A vacuum can now carry named setting bundles
  (`presets: [{id, label, icon, suction_level, mop_mode, mop_intensity, repeat}]`). They render as
  selectable chips above the START button (shown only when 2+ presets exist); the active preset's
  motor/mop settings are applied when the clean starts. When no `presets` are configured, a single
  default is synthesized from the legacy `clean_action`, so existing configs behave identically.
  (Data contract for setting/global presets + Auto/Manual `ui_mode` added to `types.ts`.)

### Changed

- **Mop trace gets a centre line.** The wet `mop_path` now draws a thin centre line on top of the
  translucent sheen band, so the wet trace reads as a path inside the band (matching the dry line).

## [0.21.0] - 2026-06-25

### Added

- **Separate mop (wet) trace as a "wet sheen" band.** The integration overlay now draws the dry
  vacuum trace (`path`) and the wet mop trace (`mop_path`) independently: the vacuum path stays a thin
  line, the mop path is rendered as a wider, translucent band beneath it. A run that vacuums *and*
  mops shows the thin line riding on the band, so a combined run is visually obvious. The dry layer
  toggle controls the line, the wet layer toggle controls the band. Band colour can be set with the
  new optional `mop_path_color` (defaults to a wet blue).

## [0.20.0] - 2026-06-25

### Added

- **Clean type is now editable in the GUI editor** (Vacuums tab, under Accent colour): Auto-detect /
  Dry only / Wet only / Both — follow live mode. Previously `clean_type` could only be set by editing
  YAML. "Auto-detect" keeps the prior heuristic (infers dry/wet from the clean action); the explicit
  options remove the ambiguity for dual-capable vacuums.

## [0.19.0] - 2026-06-25

### Added

- **Reads backend-calibrated clean-time estimates.** When the companion `anyvac` integration
  (v0.5.0+) is present, the per-room time estimate now prefers the value the backend has *learned*
  from real single-room cleans (`rooms_estimate`, per room name and clean type) over the static
  `clean_time_dry` / `clean_time_wet` config. Static values become the seed/fallback used until the
  backend has learned a room, and everything still degrades to config when no integration is set. This
  finally makes single-room time calibration work: the writable, type-aware store lives in the
  backend, so dry and wet estimates no longer fight over one value.

## [0.18.1] - 2026-06-24

### Fixed

- **Dual-capable vacuum showed the wrong time estimate** — a vacuum configured as `clean_type: both`
  (e.g. an S7 MaxV that both vacuums and mops) fell through to the wet estimate even for a dry run,
  so its dry clean borrowed another vacuum's wet `clean_time_wet`. The estimate now resolves a
  dual-capable vacuum to its *current* mode using the live backend `clean_type` (the integration
  sensor that follows the actual water mode), falling back to the configured clean action — so a dry
  run uses `clean_time_dry` and a wet run uses `clean_time_wet`.

## [0.18.0] - 2026-06-20

### Added

- **Per-clean-type time estimates** — rooms can carry a `clean_time_dry` and `clean_time_wet`, and the
  estimated cleaning time shown for a vacuum uses the one matching its clean-type role (dry/wet). So a
  dry vacuum shows the dry estimate and a mop vacuum the wet estimate for the same room; switching a
  vacuum's role flips its estimate. Falls back to `clean_time_mins` / the learned `clean_time_entity`.
  Editor (merged room editor) gains *Dry clean time* and *Wet clean time* fields.

## [0.17.2] - 2026-06-20

### Removed

- **3-point map alignment** — the experimental auto-alignment did not produce reliable results, so it
  was removed. Aligning a vacuum's map to the floorplan is done with the visual *Map seating* sliders
  (the faded overlay shows the alignment as you drag), which works reliably.

## [0.17.1] - 2026-06-20

### Fixed

- **3-point align now computes in the trace's coordinate space** — it derives the seating using the
  integration's `image_dims` (where the robot path is actually drawn) instead of the raw map PNG's
  pixel size. Previously the two had different aspect ratios, so the alignment lined up the map image
  but left the vector trace scattered.

## [0.17.0] - 2026-06-20

### Added

- **Optional 3-point map alignment** (merged) — a *3-point align* button in the Map seating section
  opens two panes (the vacuum map and the floorplan). Click the same recognisable point on both, 2–3
  times, then *Apply* and the card fits a similarity transform and writes the vacuum's
  rotation / scale / offset automatically — no more dragging the seating sliders. Manual sliders remain
  as the alternative. (Assumes the floorplan's own seating is identity.)

## [0.16.0] - 2026-06-20

### Changed

- **Editor UX cleanup + visual map seating (merged)** — the per-vacuum *Base layer* selector is hidden
  in merged mode (it is irrelevant there), the *Calibration* section is renamed *Map seating*, and the
  Maps-tab preview now shows the selected vacuum's native map **as a faded overlay on the shared
  floorplan**, so the seating sliders (rotation / scale / offset) are finally visual — you drag until
  the map lines up with the floorplan. Foundation for the upcoming one-click 3-point alignment.

## [0.15.0] - 2026-06-20

### Added

- **Editor GUI for the card-level merged config** (step 3 of the merged config rebuild) — in the Maps
  tab, when *Map mode* is **Merged**, the floorplan (Image src/rotation/scale/offset), card height and
  the room list are edited **card-level** (once for all vacuums): a *Shared floorplan* section, an
  *Add room* button, per-room Key / Name / Clean time / position / icon, and *Delete room* — all
  writing to the top-level `image_base` / `base_height` / `rooms`. In split mode the editor is
  unchanged (per-vacuum). Per-vacuum map seating, role and integration stay per the selected vacuum.

## [0.14.0] - 2026-06-20

### Added

- **Card-level room list** (step 2 of the merged config rebuild) — define `rooms` once at the top
  level of the card and every vacuum uses them: rectangles, selection (across vacuums), the hold
  dropdown and cleaning all read the shared list, and `native-auto` resolves each vacuum's segment by
  the room `key` (= Roborock name). No more configuring the same rooms per vacuum. Falls back to the
  per-vacuum `rooms` when no card-level list is set (backward compatible; split mode unchanged).

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
