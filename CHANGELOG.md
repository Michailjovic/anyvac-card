# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

AnyVac Card is rebased on the proven `roborock-vacuum-card` codebase (renamed and re-homed),
keeping its polished UI and editor as the foundation. New, vendor-agnostic functionality is layered
on top from here.

### Added (inherited from the original card)

- **Multi-vacuum pill badges** — switch between vacuums; active/cleaning glow.
- **Configurable map** — camera/image map entity with rotation / scale / offset **seating**
  (slider-based in the editor, live preview).
- **Clickable rooms** — rectangle and point overlays, click to select; editor "select a room,
  click the map to place it" workflow.
- **Per-room "last cleaned" thresholds** — colour by age (reads existing helper entities for now;
  to be superseded by the companion integration).
- **Clean strategies** — `native` (`app_segment_clean`), `native-area` (`vacuum.clean_area`),
  `native-auto` (resolve segments via `roborock.get_maps`), `script`.
- **Glassy status card** — robot image, status label + colour, battery, last-clean, current room,
  error, progress.
- **Hold-to-activate actions** — START (with per-room icons, time estimate, all/none), Pause /
  Resume / Dock, with the hold-ring fill animation.
- **Global actions** — whole-flat / cross-vacuum action badges.
- **GUI editor** — three tabs (Vacuums / Maps / Global): sensors, clean-action editor, room
  placement, map seating sliders, notifications and server-side tracker deploy.

### Planned next

- Graft the configurable **image base** (custom photo / SVG / WebP floorplan as the base layer,
  alongside or instead of the vacuum map).
- Milestone 2: calibrated interactive map (zones, pin & go, live robot position).
- Milestone 3: companion `anyvac` integration (clean-history, statistics) replacing the
  helper/blueprint backend.
