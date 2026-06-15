# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added (Milestone 2 — in progress)

- **Map calibration + Pin & Go** — an in-card guided wizard establishes a pixel↔millimetre transform:
  tap the dock, then the card auto-drives the robot to two points (`app_goto_target`) and you tap it
  on the map. Calibration is stored per browser (localStorage). Once calibrated, a **Pin & Go** mode
  sends the robot to any point you tap. (First version, to be tuned on real hardware.)

### Planned

- Milestone 2 cont.: zone cleaning (drag a rectangle → `app_zoned_clean`), automatic robot detection
  (canvas frame-diff) so calibration needs no taps, live robot dot on the custom image.
- Milestone 3: companion `anyvac` integration (clean-history, statistics).

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
