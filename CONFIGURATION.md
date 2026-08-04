# AnyVac Card — Configuration Reference

This is the exhaustive reference for every config key `anyvac-card` accepts. It
is intentionally dense — most people will never need most of it, since the
[GUI editor](README.md#setting-it-up-from-the-gui-editor) writes almost all of this for you, and the
[Quick start](README.md#quick-start) needs only a handful of lines. Come here
when you want to know exactly what a key does, what it defaults to, or
whether it still matters once the [`anyvac` integration](../anyvac/README.md)
is active.

Ready-to-paste configs live in [`examples/`](examples/) — start there if you
just want something that works.

## How to read this document

Every field below is annotated with when it applies:

- **Always** — matters with or without the `anyvac` integration.
- **Degraded only** — only read when the vacuum has no active `anyvac`
  integration sensor. Once the integration takes over, the card calls
  `anyvac.clean`/`anyvac.plan` instead and these fields are ignored (see
  [Card vs. integration](README.md#card--integration-two-halves-of-one-thing)).
- **Integration only** — only meaningful with the integration active
  (server-side rendering data, orchestration).
- **Merged only** — only meaningful when `map_mode: merged`.

Everything is optional unless stated otherwise — the whole card boots from
`vacuums: [{entity: vacuum.your_vacuum}]`.

---

## Top-level card config

| Key | Type | Default | Applies | Notes |
|---|---|---|---|---|
| `type` | string | — | Always | `custom:anyvac-card`. Required, set by the card picker. |
| `vacuums` | `VacuumConfig[]` | — | Always | Required, at least one entry. See [Per-vacuum config](#per-vacuum-config). |
| `map_mode` | `"split" \| "merged"` | `"split"` | Always | `split` = one map per vacuum. `merged` = one shared map for all vacuums — see [Image base / floorplan](#image-base--floorplan) and [cross-vacuum room names](#merged-mode-cross-vacuum-room-names). |
| `image_base` | `ImageBaseConfig` | — | Merged only | The shared floorplan image, set once on the card instead of per vacuum. See [Image base / floorplan](#image-base--floorplan). |
| `base_height` | number (px) | auto | Merged only | Shared card height. `0`/unset = auto height. |
| `rooms` | `RoomConfig[]` | `[]` | Merged only | The shared room list. In `split` mode, rooms are configured per vacuum instead (`vacuums[].rooms`). See [Room config](#room-config). |
| `global_actions` | `GlobalAction[]` | `[]` | Always | Whole-flat / cross-vacuum action badges. See [Global actions](#global-actions). |
| `room_border_normal` | number (px) | `2` | Always | Room overlay border width when not selected. |
| `room_border_selected` | number (px) | `4` | Always | Room overlay border width when selected. |
| `room_thresholds` | `RoomThreshold[]` | see below | Always | Room border colour by last-clean age. Ordered `{days, color}` rules, ascending, first match wins; older than the last rule = red. Default: `≤2d #2ecc71`, `≤5d #faad14`, `≤10d #ff9800`. |
| `room_icon_hidden` | boolean | `false` | Always | Hide every room overlay icon globally. |
| `area_mappings` | `Record<room_key, area_id>` | — | Degraded only, `native-area` strategy | Maps a room key to an HA Area, for the `native-area` clean action. Irrelevant once the integration is active. |
| `ui_mode` | `"auto" \| "manual"` | `"auto"` | Always | `auto` = one orchestrated controller (Dry/Wet/Both + map-tap room selection + Start). `manual` = one controller card per robot. |
| `mobile_rotate` | `"auto" \| "always" \| "off"` | `"auto"` | Always, only when `layout` is **not** set | Legacy width-based map rotation heuristic. Ignored once `layout` is configured — see [Layout](#layout-responsive-grid). |
| `global_presets` | `GlobalPreset[]` | `[]` | Integration only, `ui_mode: auto` | Card-level targeted cleans ("After dinner", "Whole home", …). See [Presets](#presets). |
| `orchestrator` | `OrchestratorPolicy` | see below | Integration only | Default orchestration policy, overridable per global preset. |
| `debug_room_progress` | boolean | `false` | Integration only | Draws a live per-room coverage gauge on the map. Testing aid, not for everyday use. |
| `debug_dense_dock` | boolean | `false` | Always, portrait only | Restores the pre-1.0 dense portrait room list (age/pin/assigned-vacuum per row) instead of the minimalist map-tap cockpit. Landscape's dock/picker sidebar always shows the room list regardless of this flag. |
| `layout` | `LayoutConfig` | unset | Always | Opts into the responsive percentage-grid layout. See [Layout](#layout-responsive-grid). |
| `debug` | boolean | `false` | Always | Shows raw debug readouts (geometry, plan response, etc.) in the production grid UI. |

`OrchestratorPolicy`:

| Key | Type | Default | Notes |
|---|---|---|---|
| `avoid_dry_wet_collision` | boolean | `true` | Never run a dry and wet pass on the same room at the same time. |
| `priority` | `"speed" \| "fewer_robots"` | `"speed"` | Load-balancing preference when multiple capable vacuums are available. |

---

## Per-vacuum config

Each entry in `vacuums[]`:

| Key | Type | Default | Applies | Notes |
|---|---|---|---|---|
| `entity` | string | — | Always | Required. The `vacuum.*` entity. |
| `name` | string | entity's friendly name | Always | Display name. |
| `image` | string | — | Always | Path to an avatar image, e.g. `/local/vacuums/s8.png`. |
| `color` | `VacuumColor` (hex string) | position-based, see [`DEFAULT_VACUUM_PALETTE`](src/const.ts) | Always | Any `#rrggbb`/`#rgb` hex, or the legacy names `"green"`/`"blue"`/`"orange"`. Unset vacuums each get a distinct default colour by position in the array. |
| `status_entity` | string | auto-resolved | Always | Raw Roborock status sensor. Auto-resolves from the vacuum's own HA device via `translation_key`; only set to override. |
| `battery_entity` | string | auto-resolved | Always | Same auto-resolve behaviour as `status_entity`. |
| `last_clean_entity` | string | — | Degraded only | Legacy `input_datetime` fallback for "last cleaned" age. The card never writes it. |
| `progress_entity` | string | auto-resolved | Always | Cleaning progress sensor. |
| `current_room_entity` | string | — | Degraded only | Legacy fallback for "which room is being cleaned right now". |
| `error_entity` | string | auto-resolved | Always | Error/fault sensor. |
| `base` | `"image" \| "map" \| "combined"` | `"map"` if `image_base.src` unset, else inferred from what's explicitly configured | Always | Which layer is the card's foundation: your own floorplan photo, the vacuum's own SLAM map, or both stacked. |
| `image_base` | `ImageBaseConfig` | — | Split mode only (merged uses the card-level one) | See [Image base / floorplan](#image-base--floorplan). |
| `base_height` | number (px) | auto | Split mode only | Per-vacuum card height. |
| `overlay_opacity` | number (0–100) | `55` | `base: combined`, or merged with a shared floorplan | Opacity of the vacuum's own raw map drawn over the floorplan. |
| `overlay_blend` | string (CSS `mix-blend-mode`) | `"normal"` | Same as above | E.g. `"lighten"` to isolate the path over the floorplan. |
| `integration_entity` | string | auto-resolved | Integration only | The `sensor.*_anyvac_map` entity. Auto-resolves; override only if you have an unusual setup. |
| `clean_type` | `"dry" \| "wet" \| "both"` | auto-detected from live `mop_signal` (integration) or `clean_action` (degraded) | Always | The vacuum's own cleaning **capability** — not the runtime Dry/Wet/Both switch on the controller. Set explicitly on a mixed-capability fleet if auto-detect guesses wrong. |
| `presets` | `SettingPreset[]` | `[]` | `ui_mode: manual` | Named "how" bundles shown as chips on this vacuum's controller. Needs 2+ entries to render any chips. See [Presets](#presets). |
| `hide_map` | boolean | `false` | Integration only | Hide the vacuum's own raw SLAM map image; show only the floorplan + vector robot/path. |
| `path_color` | string (hex) | the vacuum's own `color` | Integration only | Dry-path stroke colour. |
| `mop_path_color` | string (hex) | a fixed wet blue | Integration only | Wet (mop) trace band colour. Deliberately not defaulted to the vacuum's colour — kept as a universal "this was mopped" signal. |
| `mop_band_opacity` | number (0–100) | `28` | Integration only | |
| `mop_band_width` | number (% of default) | `100` | Integration only | |
| `path_width` | number (% of default) | `100` | Integration only | |
| `robot_image_on_map` | boolean | `false` | Integration only | Draw `image` as the map marker instead of a plain dot. |
| `robot_size` | number (% of default) | `100` | Integration only, needs `robot_image_on_map` | |
| `robot_image_rotation` | number (deg) | `0` | Integration only, needs `robot_image_on_map` | Extra rotation to correct the avatar's own orientation. |
| `map` | `MapConfig` | — | Split mode only | See [Map config](#map-config). |
| `rooms` | `RoomConfig[]` | `[]` | Split mode only (merged uses the card-level one) | See [Room config](#room-config). |
| `clean_action` | `CleanAction` | `{type: "native"}` | Degraded only | See [Clean action strategies](#clean-action-strategies-degraded-mode-only). |

---

## Map config

`vacuums[].map` (split mode only — merged mode has no per-vacuum map config):

| Key | Type | Default | Notes |
|---|---|---|---|
| `entity` | string | auto-resolved | The `image.*` map entity. Auto-resolves to the currently-live map candidate on the vacuum's HA device (picks the one actually reporting a picture, since multi-floor vacuums can have one `image.*` per saved floor) — override only if auto-resolve picks the wrong one. |
| `rotation` | number (deg) | `0` | Manual seating only. |
| `scale` | number | `1` | Manual seating only. |
| `offset_x` / `offset_y` | number | `0` | Manual seating only. |
| `seat` | `"auto" \| "manual"` | `"auto"` | `auto` fits the vacuum's own map onto the shared floorplan from matching room anchors (needs the integration + a floorplan + at least one room whose name matches). `manual` uses `rotation`/`scale`/`offset_x`/`offset_y` above. |

## Image base / floorplan

`image_base` (card-level in merged mode, `vacuums[].image_base` in split mode):

| Key | Type | Default | Notes |
|---|---|---|---|
| `src` | string | — | Required to use a floorplan. URL/path to the image, e.g. `/local/anyvac/s8_maxv_ultra.png`. The Maps tab's **"Use this vacuum's current map as floorplan"** button fills this automatically via `anyvac.snapshot_map_as_floorplan` — no manual file upload needed. |
| `rotation` | number (deg) | `0` | |
| `scale` | number | `1` | |
| `offset_x` / `offset_y` | number | `0` | |

**Merged mode without a floorplan** overlays every vacuum's raw map at 1:1
scale, unaligned — the editor warns about this on the Map mode selector. Set
a shared floorplan first.

---

## Room config

Entries in `rooms[]` (card-level for merged, `vacuums[].rooms` for split):

| Key | Type | Default | Applies | Notes |
|---|---|---|---|---|
| `key` | string | — | Always | Required, unique ID. **Must match the room's name in the Roborock app** (case-sensitive) — this is how the integration and, in merged mode, multiple vacuums' room lists are cross-matched. |
| `name` | string | — | Always | Required. Display name (can differ from `key`). |
| `icon` | string (`mdi:*`) | numbered default icon | Always | Optional in rectangle mode. New rooms cycle through numbered icons (`mdi:numeric-1-circle`, …) by default so overlapping rooms stay visually distinct while you place them — change freely. |
| `icon_anchor` | `"none" \| "tl" \| "t" \| "tr" \| "l" \| "c" \| "r" \| "bl" \| "b" \| "br"` | `"c"` | Always | Where the icon sits inside the room's overlay box. `"none"` hides it for this room. |
| `map_x` / `map_y` | number (%) | live from integration | Always | **Omit both** to let the room's position track the integration's live geometry automatically (renames/re-shapes in the Roborock app show up with no manual re-import). **Set both** for a fixed position — required in degraded mode, and doubles as a fit anchor for auto-seating in merged mode. |
| `map_w` / `map_h` | number (%) | — | Always | Setting either activates rectangle mode (a drawn box instead of a point marker). Drag the box or its corner handles in the editor preview. |
| `segment_id` | number | — | Degraded only, `native`/`native-auto` strategy | Roborock segment ID. Find via Developer Tools → the vacuum's `roborock.get_maps` attributes — not needed at all once the integration is active. |
| `area_id` | string | — | Degraded only, `native-area` strategy | Per-room override of the card-level `area_mappings`. |
| `clean_time_mins` | number | — | Degraded only | Legacy flat estimate, superseded by `clean_time_dry`/`clean_time_wet`. |
| `clean_time_dry` | number (minutes) | — | Degraded only | Fallback dry-clean time estimate when there's no `clean_time_entity` and no integration. |
| `clean_time_wet` | number (minutes) | — | Degraded only | Same, for a wet (mop) clean. |
| `clean_time_entity` | string (`input_number`) | — | Degraded only | Legacy read-only fallback estimate. The card never writes it. |
| `last_clean_entity` | string (`input_datetime`) | — | Degraded only | Legacy read-only fallback for room age. The card never writes it. |

With the integration active, per-room timing, coverage %, and history are all
computed and learned server-side (`rooms_estimate`, `rooms_progress`,
`rooms_coverage` on the integration sensor) — none of the `clean_time_*`/
`*_entity` fallbacks above are read.

### Merged mode: cross-vacuum room names

In merged mode, if two vacuums both know a room called `"Kitchen"` (each in
its *own* Roborock app configuration), the card treats them as the same
physical room — this is what makes orchestration (which robot cleans what)
and shared map anchoring work. If your vacuums' apps use different names for
the same room, either rename them to match in the manufacturer app, or add
one room entry per vacuum's own name (they just won't be treated as the same
room for orchestration purposes). The Maps tab flags room names on the
current vacuum that don't match anything already placed.

---

## Clean action strategies (degraded mode only)

`vacuums[].clean_action` — **ignored entirely once the `anyvac` integration
is active for that vacuum** (`anyvac.clean` is called instead, driven by
`ui_mode`/presets/global presets). Only relevant for degraded-mode direct
`vacuum.*` control.

| `type` | Fields | Notes |
|---|---|---|
| `"native"` | `repeat?`, `suction_level?`, `mop_mode_entity?`, `mop_mode?`, `mop_intensity_entity?`, `mop_intensity?` | Sends `vacuum.send_command app_segment_clean` with the room's `segment_id`. |
| `"native-area"` | same fields (`repeat` unused) | Uses `vacuum.clean_area` with the room's `key`/`area_mappings` entry as the area — no `segment_id` needed. No software repeat (removed for being unsafe around mop washing); `repeat` is ignored. |
| `"native-auto"` | same fields | Legacy alias, behaves identically to `"native"`. No longer offered in the editor — existing configs still work, but the editor rewrites this value to `"native"` once touched. |
| `"script"` | `entity_id`, `variables?` | Calls a custom script instead, with an object of template variables (tokens like `{{ entity }}`, `{{ selected_segments }}` are available — see the editor's Clean action section for the full token list). |

---

## Presets

Two different concepts, both called "presets" but scoped differently:

### Setting presets (`vacuums[].presets`, manual mode)

Named **"how"** bundles for a single vacuum, shown as chips on its own
controller card. You pick one, then pick rooms on the map.

| Key | Type | Notes |
|---|---|---|
| `id` | string | Stable ID, required. |
| `label` | string | Required. |
| `icon` | string (`mdi:*`) | |
| `suction_level` | string | |
| `mop_mode` | string | |
| `mop_intensity` | string | |
| `repeat` | number | |

Needs at least 2 entries to render any chips at all. Clean type (dry/wet/
both) is derived from these values, never stored separately.

### Global presets (`global_presets`, auto mode)

Card-level **"what"** targets — the user taps one, the integration decides
who/how. Requires the integration (needs `anyvac.clean`'s orchestration).

| Key | Type | Default | Notes |
|---|---|---|---|
| `id` | string | — | Required. |
| `label` | string | — | Required. |
| `icon` | string (`mdi:*`) | — | |
| `scope` | `"all" \| "select" \| string[]` | — | Required. `"all"` = whole flat, `"select"` = pick rooms on the map at run time, or a fixed list of room keys. |
| `mode` | `"dry" \| "wet" \| "both"` | `"dry"` | `"both"` runs a dry pass then a wet pass, wet gated per-room on that room's own dry completion. |
| `steps` | `CleanStep[]` | — | Optional ordered steps for more complex sequences. |
| `policy` | `OrchestratorPolicy` | card-level `orchestrator` | Per-preset override. |

`CleanStep`: `rooms?` (room keys; empty = whole scope), `suction_level?`,
`mop_mode?`, `mop_intensity?`, `repeat?`.

---

## Global actions

`global_actions[]` — badges that trigger one action across all vacuums
(e.g. a single "Clean whole flat" button wired to your own script):

| Key | Type | Default | Notes |
|---|---|---|---|
| `name` | string | — | Required. |
| `image` | string | — | |
| `color` | `VacuumColor` | `"orange"` | |
| `watch_entities` | string[] | — | Vacuum entities to watch; the badge glows while any is cleaning. |
| `action` | `GlobalActionCall` | — | Required. Either `{type: "script", entity_id, variables?}` or `{type: "service", service: "domain.service", data?}`. |

---

## Layout (responsive grid)

`layout` opts the card into a viewport-sized percentage grid with separate
portrait/landscape profiles, instead of the older unconstrained render.
Easiest path: the editor's Global tab → **"Fit card to available screen
space"** toggle sets `layout: {}`, which activates the system with sensible
built-in defaults — no further YAML needed for the common case.

| Key | Type | Default | Notes |
|---|---|---|---|
| `threshold` | number | `1.0` | Aspect-ratio cutoff (`availW/availH`) below which the card picks the portrait profile. |
| `orientation` | `"auto" \| "portrait" \| "landscape"` | `"auto"` | Force a profile instead of auto-detecting from the card's own box. |
| `gap` | string (CSS length) | — | Grid gap. |
| `height` | `"viewport" \| "container" \| <CSS length>` | `"viewport"` | What the grid's total height is measured against. |
| `portrait` / `landscape` | `ProfileGridConfig` | see `DEFAULT_PROFILES` in [`src/layout.ts`](src/layout.ts) | Per-profile overrides — advanced, YAML-only (no GUI fields beyond the flip toggles below). |

`ProfileGridConfig` (advanced, per profile):

| Key | Type | Notes |
|---|---|---|
| `columns` / `rows` | `Array<number \| string>` | Numbers are treated as a proportional share (`fr`) of the available space; strings pass through as raw CSS track sizes (`"1fr"`, `"auto"`, `"120px"`). Setting any of `columns`/`rows`/`place` opts this profile out of the computed defaults entirely. |
| `place` | object | Manual region placement overrides. |
| `crop` | `MapCropConfig` | See below. |
| `topology` | `"auto" \| "split" \| "stack"` | Portrait only. `auto` (default) computes whether map+dock should sit side-by-side or stacked, from the floorplan's aspect ratio. |

`MapCropConfig`:

| Key | Type | Default | Notes |
|---|---|---|---|
| `fit` | `"contain" \| "cover"` | `"contain"` | |
| `offset_x` / `offset_y` | number (-100..100) | `0` | Only meaningful with `fit: "cover"`. |
| `mapOrientation` | `"auto" \| "normal" \| "rotated"` | `"auto"` | Whether the floorplan rotates 90° to better fill the map region. `auto` picks whichever orientation fits bigger. |
| `flip` | boolean | `false` | An independent further 180° on top of `mapOrientation`, for a floorplan that renders upside-down relative to how you look at the room. Exposed in the editor as **"Flip portrait/landscape map 180°"**; also toggleable live (per-browser, not saved to config) from the meta bar / dock. |

---

## `anyvac` integration services

The card calls these itself — you generally don't need to call them
directly — but they're useful from your own automations/scripts. Full field
docs are in Home Assistant's Developer Tools → Actions (search `anyvac`),
generated from
[`services.yaml`](../anyvac/custom_components/anyvac/services.yaml).

| Service | Purpose |
|---|---|
| `anyvac.clean` | Send a clean intent (rooms + `dry`/`wet`/`both`). The backend resolves capability, load-balances across capable vacuums, applies pins, and runs the job server-side. This is what the Start button calls. |
| `anyvac.plan` | Same planner as `anyvac.clean`, response-only — returns the assignment/ETA preview without starting anything. |
| `anyvac.goto` | Pin & go — send a vacuum to one point, given as % of the map image. |
| `anyvac.zone_clean` | Clean a rectangular zone, given as two opposite corners in % of the map image. |
| `anyvac.cancel` | Stop any running AnyVac job(s), optionally returning vacuums to base. |
| `anyvac.select_rooms` | Change the shared room selection (set/add/remove/toggle/clear). |
| `anyvac.pin_room` | Pin a room to a specific vacuum for a given pass (dry/wet), overriding automatic assignment. Auto-clears once that pass is actually cleaned. |
| `anyvac.set_layers` | Set shared dry/wet path visibility on the map (synced across browsers). |
| `anyvac.set_room_sequence` | Replace the stored room cleaning order (for sequence-aware ETA) — should mirror the order configured in the Roborock app. |
| `anyvac.reset_learning` | Clear learned clean-time estimates and/or coverage baselines, e.g. after moving furniture or resetting a robot's map. |
| `anyvac.dock_empty` / `dock_wash` / `dock_dry` / `dock_pump` / `dock_self_clean` | Manual dock control (empty dustbin, wash/dry mop, pump, Fill&Drain self-clean) — mirrors the manufacturer app's Dock Control sheet. Shown/hidden per vacuum based on detected dock capability. |
| `anyvac.snapshot_map_as_floorplan` | Save a map image entity's current picture as a static file and return its URL — powers the Maps tab's "Use this vacuum's current map as floorplan" button. |

`anyvac.run_job` also exists but is an internal executor (not documented
here or in the editor) — use `anyvac.clean`/`anyvac.plan` instead.

---

## See also

- [`README.md`](README.md) — quick start, GUI editor walkthrough, screenshots.
- [`examples/`](examples/) — ready-to-paste configs.
- [`../anyvac/README.md`](../anyvac/README.md) — companion integration setup and full attribute/entity reference.
