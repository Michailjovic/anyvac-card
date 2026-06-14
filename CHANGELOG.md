# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Universal contract (`types.ts`)** — vendor-agnostic card config and runtime `VacuumModel`
  (capabilities / state / map / commands). Map source is format-agnostic and multi-source;
  calibration is optional (advanced map only).
- **Configurable image base** — custom photo / SVG floorplan, vacuum map, or `combined`.
- **Calibration-free clickable rooms** — percentage rectangles / points placed over the base,
  each mapped to a Home Assistant Area.
- **Presets** — 1–3 named presets per vacuum (suction, mop mode/intensity, water, repeats),
  decoupled from room selection; a per-vacuum default preset.
- **Room cleaning** — defaults to native `vacuum.clean_area` (HA Areas, calibration-free),
  with `app_segment_clean` and script strategies as alternatives.
- **Basic control** — start / pause / stop / dock / locate, room selection and select-all.
- **Status panel** — mapped status label + colour, battery, current room, error, progress.
- **GUI editor** — tabbed (Vacuums / Map / Presets / Global).
