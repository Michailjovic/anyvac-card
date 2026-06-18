# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Milestone 2 cont.: zone cleaning (drag a rectangle → `app_zoned_clean`), automatic robot detection
  (canvas frame-diff) so calibration needs no taps, live robot dot on the custom image.
- Milestone 3: companion `anyvac` integration (clean-history, statistics).

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
