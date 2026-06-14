# AnyVac Card

A modern, universal Home Assistant Lovelace card for robot vacuums.

Pick **where** to clean, not **how**: put a custom floorplan (or the vacuum's map) behind
clickable rooms, prepare 1–3 presets per vacuum, and clean a room — or the whole flat — in a
single tap. Room cleaning is **calibration-free** thanks to native Home Assistant Areas.

> Successor to the Roborock-only `roborock-vacuum-card`, rebuilt around a vendor-agnostic model.
> Roborock first; Valetudo and others to follow.

## Features

- **Configurable image base** — a custom photo / SVG floorplan, the vacuum's map, or both
  (`combined`).
- **Calibration-free room cleaning** — clickable rooms mapped to Home Assistant Areas, cleaned
  via native `vacuum.clean_area`. No pixel↔millimetre calibration required.
- **Presets** — 1–3 named presets per vacuum (suction, mop mode/intensity, water, repeats),
  decoupled from room selection. Set a per-vacuum default and just pick rooms.
- **Basic control** — start / pause / stop / dock / locate, plus select-all (whole flat).
- **Status** — mapped status label and colour, battery, current room, error, progress.
- **GUI editor** — configure everything (vacuums, rooms, presets, appearance) without writing YAML.

## Requirements

- A vacuum integration exposing a `vacuum.*` entity (Roborock official integration recommended).
- For calibration-free room cleaning: Home Assistant **2026.3+** (native `vacuum.clean_area`)
  with your vacuum's segments mapped to HA Areas (vacuum entity → settings → *Map vacuum
  segments to areas*). Older setups can use the `segment` or `script` clean strategies.

## Installation

### HACS (recommended)

1. HACS → **⋮** → **Custom repositories**.
2. Add `https://github.com/Michailjovic/anyvac-card` with category **Dashboard**.
3. Install **AnyVac Card** and reload your browser.

### Manual

Copy `dist/anyvac-card.js` to `config/www/` and add it as a dashboard resource
(`/local/anyvac-card.js`, type *JavaScript Module*).

## Configuration

Minimal:

```yaml
type: custom:anyvac-card
vacuums:
  - entity: vacuum.s8
```

Full example:

```yaml
type: custom:anyvac-card
base: image
vacuums:
  - entity: vacuum.s8
    name: S8
    clean_strategy: area          # area (default) | segment | script
    image_base:
      src: /local/anyvac/flat.svg
    regions:
      - id: kitchen
        name: Kitchen
        area_id: kitchen          # HA Area → used by vacuum.clean_area
        icon: mdi:silverware-fork-knife
        shape: { kind: rect, x: 10, y: 12, w: 28, h: 22 }   # percentages
      - id: living
        name: Living room
        area_id: living_room
        shape: { kind: rect, x: 40, y: 12, w: 35, h: 30 }
    presets:
      - id: dry_max
        name: Dry · max
        icon: mdi:fan
        default: true
        clean_type: dry
        suction: max
      - id: wet_deep
        name: Wet · deep
        icon: mdi:water
        clean_type: wet
        suction: "off"
        mop_mode: deep
        mop_mode_entity: select.s8_mop_mode
        water: medium
        water_entity: select.s8_water
```

### Options (summary)

| Card | Type | Description |
|------|------|-------------|
| `base` | `image` \| `map` \| `combined` | Default base layer (per-vacuum override available). |
| `vacuums` | list | One entry per vacuum. |
| `region_border_normal` / `region_border_selected` | number | Room outline widths (px). |
| `region_icon_hidden` | bool | Hide all room icons. |

| Vacuum | Type | Description |
|--------|------|-------------|
| `entity` | string | The `vacuum.*` entity (required). |
| `image_base.src` | string | Custom photo / SVG floorplan URL. |
| `map_source.entity` | string | Camera/image entity for the vacuum map. |
| `clean_strategy` | `area` \| `segment` \| `script` | How cleaning is issued (default `area`). |
| `regions` | list | Clickable rooms (see below). |
| `presets` | list | 1–3 cleaning presets (see below). |

| Region | Type | Description |
|--------|------|-------------|
| `id` / `name` | string | Identifier and label. |
| `area_id` | string | HA Area for `vacuum.clean_area`. |
| `segment_id` | number | Fallback for `app_segment_clean`. |
| `shape` | object | `{ kind: rect, x, y, w, h }` or `{ kind: point, x, y }` (percent). |

| Preset | Type | Description |
|--------|------|-------------|
| `name` / `icon` / `color` | string | Display. |
| `default` | bool | Use when the user just picks rooms. |
| `suction` | string | `vacuum.set_fan_speed` option. |
| `mop_mode` / `mop_intensity` / `water` | string | Target values for the bound `select` entities. |
| `mop_mode_entity` / `mop_intensity_entity` / `water_entity` | string | Entities to apply the above. |
| `repeats` | number | Passes per room. |

## Roadmap

- **Now:** configurable image base, calibration-free rooms, presets, basic control, editor.
- **Next:** calibrated interactive map (zones, pin & go, live robot position).
- **Later:** companion `anyvac` integration (clean-history thresholds, statistics), more vendors,
  built-in automation builder.

## License

MIT.
