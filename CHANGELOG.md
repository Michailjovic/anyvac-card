# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Rooms from the integration (real room polygons / names) for clickable cleaning on the floorplan.
- Responsive rebuild Phase B/C (docs/18): portrait profile per docs/12 (dock + START bar,
  floating map tools, stats trio, exact rotated-map fit, per-room vacuum pinning),
  landscape cockpit. Completion of the rebuild ships as **v1.0.0**.

## [0.43.0] - 2026-07-15

### Added

- **Robot error halo on the map** — when a vacuum's error entity reports an
  active error, a soft pulsing red glow now renders behind its robot marker
  in the integration vector overlay (`_renderIntegrationOverlay`), not just in
  the status card's error row. Shares the new `_hasError()` helper with the
  status card so both stay in sync. Blurred via a per-vacuum-entity SVG
  filter id (`avc-err-blur-<entity>`) to avoid `<defs>` id collisions when
  multiple vacuums render in merged mode.

## [0.42.4] - 2026-07-15

### Fixed

- **Integration-vector editor fields invisible without an explicit `integration_entity`**
  — "Hide vacuum map", path colour/width, mop band colour/opacity/width, robot
  image options, and "Import missing rooms" were gated in the editor on the raw
  `integration_entity` config key. Since docs/14 Fáze 3 the card (and the editor's
  own auto-seating) auto-resolve the AnyVac sensor from the entity registry, so
  most users never set that key — the whole section silently never appeared.
  The editor now uses the same `_intEntityFor` auto-resolve as rendering/seating,
  so the fields show whenever the integration is actually active.

## [0.42.3] - 2026-07-15

Requires integration ≥ 0.19.1 for the fix to take effect (the segments are built
on the backend; an older integration still sends a flat `path_dry_px`, which the
card still renders correctly as a single segment — no breaking change).

### Fixed

- **Finished dry trace looked like a scribble compared to the clean live trace**
  — `path_dry_px` is now a list of contiguous segments instead of one flat point
  list (integration 0.19.1). The card now draws one `<polyline>` per segment
  instead of one polyline across the whole array, so the straight line the
  browser used to draw across every excluded transit/mop-wash gap (one per room
  transition in a finished multi-room session) is gone.

## [0.42.2] - 2026-07-11

Second field pass (docs/18 §10b).

### Fixed

- **Landscape dead space** — the map track is now `auto` (intrinsic height) with
  tools directly under the map, status cards filling the rest of the left column
  and the dock owning the full right column (`rows: [9, auto, auto, 1fr]`).
- **Refresh moved to the badges row** (right edge) — the floating map-corner
  button sat in dead space next to the centred portrait map.
- **Per-room progress gauges in the dock** — the dry/wet `%` chips
  (`debug_room_progress`) render next to the age badges in dock rows, so live
  cleaning progress is visible in portrait again (status cards are not placed
  there). On-map room gauges are unchanged (upright via `.avc-rot`).

## [0.42.1] - 2026-07-11

First field pass over the 0.42.0 grid profiles — fixes from live screenshots.

### Fixed

- **Floating map tools removed** — per-vacuum tool columns overlaid (and blocked)
  the right side of the map, one column per vacuum. Landscape now places the
  `tools` region UNDER the map (new canonical rows `[9, 56, 35]`, tools row gets a
  per-vacuum name label); portrait gets a single floating refresh-all button
  (pin&go/zone are disabled in the rotated view anyway).
- **Layer toggles moved out of the rotated map** — they now render at map-REGION
  level (upright, top-right), never rotate with the portrait map and no longer
  collide with on-map gauges.
- **On-map chips counter-rotated in portrait** — room gauges, progress chips and
  room icons stay upright inside the 90° rotated map (`.avc-rot` wrapper).
- **Portrait badges row** — no wrapping (it cut off the third vacuum); compact
  badges with horizontal scroll instead. Stats trio renders only in landscape —
  the portrait START bar already shows the count + estimate.
- **Portrait dock** — compact: icon-only mode buttons, room rows without names
  (icon + dry/wet ages + avatars), smaller chips, so the 28 % column actually fits.

## [0.42.0] - 2026-07-11

Phase B of the responsive rebuild (docs/18): the portrait profile per docs/12, the
`dock` and `start` regions, floating map tools, per-room vacuum pinning and the
canonical default profiles. Requires integration ≥ 0.19.0 for pinning.

### Added

- **`dock` region** (docs/12 §3): selection, plan preview and pinning in one block —
  Dry/Wet/Both mode header, room rows (tap = toggle the backend-shared selection,
  compact dry/wet age chips), and per-pass **assignment avatars showing the backend's
  real plan** (`anyvac.plan`). In landscape (no `start` region) the dock carries the
  orchestrated run footer with the hold-to-run button and a rooms/minutes summary.
- **`start` region** (portrait bottom bar, docs/18 §7d): full-width thumb-zone
  hold-to-start that ALWAYS sends the orchestrated `anyvac.clean` intent; while
  anything runs it flips to a hold-to-cancel bar (`anyvac.cancel`; degraded mode
  pauses the cleaning vacuums instead).
- **Per-room vacuum pinning** (docs/18 §7e): tapping a room's assignment avatar in
  the dock cycles auto → vac1 → vac2 → auto via `anyvac.pin_room`; pins are
  backend-shared (`room_pins` sensor attribute), used by the planner as the default,
  highlighted with a pin ring, and auto-cleared after the room's clean.
- **Floating map tools** (grid mode): Refresh / Pin&Go / Zone as an icon-only
  column overlaid on the map edge (Roborock-app style); hint/confirm panels float
  along the bottom of the map region. The `tools` region remains for explicit
  old-style placement.
- **Stats trio** in the grid badges region: selected rooms · estimated minutes
  (max-across-vacuums display aid) · lowest battery.
- **`debug` config flag** (docs/18 §7c): raw geometry readouts in the grid UI hide
  behind it (off by default).

### Changed

- **Canonical docs/18 §4 default profiles**: landscape = map left (scrolls in split
  mode) + dock & status right; portrait = slim badges bar, tall rotated map, right
  thumb dock, full-width START bar (replaces the Phase-A interim defaults).
- **Exact rotated-map fit** (docs/18 §7): in grid mode the 90° rotated map is fitted
  into the measured map-region box — the legacy width × 1.4·viewport cap heuristic
  only applies without a `layout:` block.
- **Portrait single-vacuum focus** (docs/18 §7b): in split mode the portrait grid
  renders one vacuum; a badge tap SWITCHES the focus instead of toggling set
  membership. Landscape/merged behaviour unchanged.

## [0.41.0] - 2026-07-11

Phase A of the responsive rebuild (docs/18, ratified 2026-07-11): the two-profile
percentage-grid layout runtime. Without a `layout:` config block the card renders
exactly as before — the grid is strictly opt-in.

### Added

- **`src/layout.ts`** — layout runtime: profile picker (viewport aspect ratio vs.
  `threshold`, `orientation` force override), grid CSS generator (numeric tracks → `%`,
  strings like `1fr`/`auto`/`120px` pass through), height resolver (`viewport` →
  `calc(100svh - var(--header-height))` with a measured `innerHeight - rootTop`
  refinement; `container`; fixed CSS length), and `pval`/`papply` per-profile scalar
  resolvers (no second breakpoint system).
- **`layout:` config block** (`threshold`, `orientation`, `gap`, `height`,
  `portrait`/`landscape` profiles with `columns`/`rows`/`place`). Each profile is a
  complete design: regions are placed via `{row, col}` (CSS grid-line syntax, spans
  allowed); a region not placed in a profile is not rendered there. Per-region
  `overflow: hidden|auto` and `align`.
- **Named regions** (Phase A set): `badges`, `autobar`, `plan`, `map`, `tools`,
  `status`. The `dock` and `start` regions arrive with Phase B.
- Interim default profiles (documented in `layout.ts`) until the docs/18 §4 canonical
  defaults become possible in Phase B/C.
- `orientationchange` listener (rAF-coalesced with resize) re-picks the profile.

### Changed

- With a `layout:` block, the map's 90° portrait rotation is driven by the **portrait
  profile** instead of the card-width heuristic (`mobile_rotate` still force-overrides;
  legacy width heuristic unchanged without `layout:`).
- Edit-mode version chip shows the active profile in grid mode.

## [0.40.0] - 2026-07-09

Fáze 3 of the backend-first canon (docs/14): the card switches to backend contract v2
(integration ≥ 0.18.0) and loses the last of its client-side smarts. A schema warning
banner appears when the integration is older than the card expects.

### Changed

- **Vector overlay reads px-space attributes** (`vacuum_position_px`, `path_dry_px`,
  `path_wet_px`) — the mm→px affine transform is gone from the card; the robot heading
  is derived in px space (y axis flip).
- **Auto-seating & room import use `rooms[].bbox_px`** — `seatfit.ts` lost `solve3` /
  `affineFromCalibration`; anchors and the editor's room import are built from the
  backend-transformed pixel bboxes.
- **Pin & go / zone clean send image PERCENTAGES** to `anyvac.goto` /
  `anyvac.zone_clean`; the pct→px→mm conversion is backend-side. The zone confirm
  dialog no longer shows mm dimensions (the card no longer knows any).
- **Orchestrated cleans send an INTENT** — `_runOrchestrated` is a thin
  `anyvac.clean` call (rooms + mode + per-kind vacuum roles from the config + settings
  from the presets). The whole client-side plan builder (`_assignByCap`,
  `_cleanCmdFor`, `_settingsForKind`, `_segmentFor`, `_roomCleanableBy`,
  `_roomEstMax`, `_duidOf`, run_job task assembly) was DELETED.
- **Plan preview is the backend's real plan** — fetched from the response-only
  `anyvac.plan` service (debounced), no local approximation.
- **Per-vacuum START uses `anyvac.clean`** restricted to that vacuum when the
  integration is present; direct `vacuum.*` commands remain only for the degraded
  (no-integration) mode.
- **`integration_entity` is auto-resolved** from the entity registry (the AnyVac map
  sensor sits on the vacuum's device); the config key remains as an explicit override.
- **Editor Debug tab** shows `schema_version`, `pipeline_ok` and `bbox_px` geometry.

### Removed

- native-auto dynamic segment resolution via `roborock.get_maps` (docs/14 §3.7) —
  with the integration the backend resolves segments; without it the card only uses
  configured `segment_id`s.
- All client-side affine/mm math (docs/14 §3.6): `solve3`, `affineFromCalibration`,
  `_affine`, `_intAffine`, `_intMapToVac`, `_cmdMm`-era helpers, `_gotoMm`.

## [0.39.0] - 2026-07-02

### Changed

- **Dry/wet layer toggles are now backend-shared** (integration ≥0.14.0): the choice
  survives page refreshes and syncs across browsers/devices, like the room selection.
  Without the integration the local per-tab behaviour remains.

## [0.38.1] - 2026-07-02

### Fixed

- **Room-corner progress gauges finally show up in merged mode.** The gauge read
  `rooms_progress` from the representative (FIRST) vacuum only — with a kitchen-only
  robot first in the config, every other room's gauge stayed empty. Values are now
  aggregated across all shown vacuums.
- **Two gauges per room — dry and wet** (matching the layer menus): dry ring in the best
  dry vacuum's colour, wet ring in wet-blue, `~` while the coverage baseline is still
  calibrating. Pairs with integration 0.13.0, where point-based attribution makes them
  fill from the first poll instead of after a ~60 s confirmation lag.

## [0.38.0] - 2026-07-02

Auto-seating (docs/15): maps align themselves onto the shared floorplan.

### Added

- **Automatic map seating (`seat: auto`, the new default).** Each vacuum's map is fitted
  onto the floorplan by a least-squares similarity transform whose anchors are the room
  rectangles already drawn on the floorplan, paired **by name** with the room bboxes the
  integration reads from that robot's map (key = Roborock room name). No clicking, no
  sliders. Rotation snaps to 90° steps. The fit is recomputed from live sensor data, so
  it **self-heals when the robot remaps** or the map trim changes — the failure mode
  that silently broke manual seating. A robot whose map has only ONE shared room (e.g.
  a kitchen-only robot) is seated from that room's centre + size, with orientation
  estimated from its shape. Robots on a different floor match no rooms and keep manual
  seating. Hand-drawn room differences between robots are fine — each robot is fitted
  independently against the floorplan and the imprecision shows up in the fit error.
- **Fit quality in the editor**: the Maps tab shows anchors used, the computed
  rotation/scale/offset and an RMS fit error (warns above 3 % — usually a wrong room
  key or rectangle). `seat: manual` keeps the old slider behaviour per vacuum.
- **Room import from a vacuum** (editor, Maps tab): adds the rooms this robot's map
  knows that are missing on the floorplan, placed through its current seat — one button
  covers both the initial import from the reference (whole-home) robot and later
  supplementing rooms only another robot has (it gets seated via the rooms you already
  share, or its manual seat).
- Editor map preview now uses the floorplan's real aspect ratio instead of a hard-coded
  27.5 % box, so what you position in the editor matches the card.

### Removed

- Orphaned 3-point align tool remnants (`_alignApply` + handlers + styles) — it was
  never wired into the UI (which is why it never worked); its similarity-fit maths now
  powers the auto-seat in `seatfit.ts`.

## [0.37.0] - 2026-07-02

Backend-first purge (docs/14 canon, Phase 1 + frontend part of Phase 3). The card no longer
tracks cleaning sessions — the `anyvac` integration (≥0.12.0) is the single source of truth.

### Removed (**breaking** — superseded by the integration)

- **Client-side in-flight cleaning tracking.** The card treated the vacuum entity's
  `docked` transition as end-of-clean, but a mid-clean mop wash reports `docked`
  (HA roborock `STATE_CODE_TO_STATE`), so every mop wash prematurely "finished" the
  session — writing timestamps, mis-calibrating room times, clearing the selection and,
  worst, restarting `vacuum.clean_area` repeat passes mid-wash. Session tracking now
  lives in the integration (`in_cleaning` + raw status, mop-wash aware).
- **Software repeat for `native-area`** (unsafe, see above). Configured `repeat` values
  are ignored for `native-area` until server-side repeat lands with `anyvac.clean`.
- **Manual 3-point map calibration** (localStorage, goto-probing). It assumed the dock at
  map origin and trusted commanded targets over the robot's real position. Pin & Go and
  Zone now require the integration sensor (`calibration_points`) plus a map entity.
- **Helper writes**: the card never writes `input_datetime` / `input_number` room helpers
  anymore; they remain read-only display fallbacks. `single_room_time` option removed.
- **Ticker notifications, notify-script caller and the cleaning-tracker blueprint**
  (including the editor deploy UI and helper creators). Build notifications from the
  integration events (`anyvac_clean_started/finished/room_done`) and its bundled
  blueprints. `notify`, `notify_script` and `backend` config keys are ignored.
- The card no longer fires or subscribes to `roborock_card_event`.

### Fixed

- **Click-to-mm used the wrong map with multiple vacuums.** `_clickToContent` grabbed the
  first `.map-img` in the DOM, so Pin & Go / Zone clicks for robot B were computed in robot
  A's map space (different seating). The click now targets the clicked vacuum's own map
  element (`data-entity`), and the floorplan is no longer used as a (geometrically wrong)
  fallback.
- **Merged mode + `hide_map` broke click geometry**: the hidden map is now rendered at
  opacity 0 instead of being skipped, so it can anchor the click transform.
- **Map tools are disabled in the rotated (narrow/mobile) view** — the click inversion
  does not account for the wrapper rotation yet, so commands were misplaced there.
- **Auto-resolved sensors could stay unwatched forever**: the watched-entity cache is no
  longer frozen before the entity registry is loaded.
- Dry trace now prefers the integration's segmented `path_dry` (cleaning-only points; no
  transit / mop-wash / goto driving mixed into the dry layer), falling back to `path` on
  older integrations; wet trace prefers `path_wet`.
- Global preset scope now applies to the backend-shared selection when the integration
  provides one (previously it silently only set the local selection).
- Live clean-type fallback derives from the vacuum's configured role instead of guessing
  "wet" from the mere presence of mop entities.

## [0.36.5] - 2026-06-27

### Fixed

- **Orchestration assigned rooms to vacuums that can't clean them.** In merged mode every vacuum
  nominally "owns" all card-level rooms, so a robot on a different map / home (e.g. an `s6_kitchen`
  robot vs the `jirsikova` apartment) was assigned a room it has no segment for — its task produced no
  command and was silently dropped, so only the other robot ran. Assignment now only picks vacuums
  that can actually clean the room (a resolvable segment, or the room present on the vacuum's own map).
- **Segment lookup matched by display name instead of key.** `_segmentFor` paired the integration's
  room (named by the Roborock app name = the card `key`) against the card *display name*, so a renamed
  room (key `Corridor`, name `Hall`) resolved to no segment. It now matches by `key` first.

## [0.36.4] - 2026-06-27

### Fixed

- **Orchestration only ran the first vacuum.** Two bugs: (1) the plan was built only across the
  *shown* tab's vacuum (`_planVacuums`) instead of all configured robots, so other robots — incl. the
  wet one in a `both` clean — were never assigned; orchestration now spans **all** vacuums. (2) The
  wet pass was gated on each room by its **display name**, but `anyvac_room_done` reports the room by
  its integration name (= the room `key`), so the gate never released; it now gates by `key`. With
  both fixed, a `both` clean splits dry across dry robots and releases the wet robot per room.

## [0.36.3] - 2026-06-27

### Fixed

- **"Cleaning order" field now also in the merged-map room editor.** In `map_mode: merged` rooms are
  defined at the card level (top-level `rooms:`) and edited in the Maps tab, not the per-vacuum
  accordion — so the order field added in 0.36.2 was invisible there. It is now shown in the Maps-tab
  room editor too.

## [0.36.2] - 2026-06-27

### Added

- **Per-room "Cleaning order" field** in the room editor (Vacuums tab). A 1-based sequence number,
  set per room to match the Roborock app's cleaning order. Stored as `seq` on the room config — the
  foundation for sequence-aware multi-room progress and target-aware calibration (it does not change
  behaviour yet).

## [0.36.1] - 2026-06-27

### Fixed

- **Per-second timer didn't tick (jumped every 30 s).** The live interpolation only applied to the
  "current" room, matched by display name against the integration's room — but a room whose card name
  differs from the integration name (e.g. card "Hall" = integration "Corridor") never matched, so the
  timer fell back to the raw 30 s-poll value. The current room is now matched by `key` or `name`, so
  the `mm:ss` clock ticks every second again.

## [0.36.0] - 2026-06-27

### Added

- **Normalised coverage % (~100 % for a fully cleaned room).** The gauges now read the integration's
  baseline-normalised `dry_pct` / `wet_pct` (v0.11.0+). Until a room has been fully cleaned once, the
  raw bbox % is shown with a `~` marker (e.g. `73~`) to flag it is still calibrating.
- **Per-second live timer in `mm:ss / mm:ss` (elapsed / estimate).** The debug strip ticks every
  second (instead of jumping every 30 s) for the room being cleaned. While paused or stuck, both the
  elapsed and the estimate keep ticking up equally, so the timer keeps moving but the progress doesn't
  advance. The clock only runs (and only re-renders this card) while a vacuum is cleaning/paused.

## [0.35.5] - 2026-06-27

### Changed

- **Two coverage gauges per room: dry and wet, side by side.** The debug strip now shows a separate
  dry gauge (vacuum trace, in the vacuum's colour) and wet gauge (mop trace, blue) per room, plus the
  live time spent — reading the new `dry_pct` / `wet_pct` from the integration (v0.10.3+). The per-layer
  menus likewise show the matching layer's coverage.
- **Debug progress is shown permanently again** (no longer hidden when the vacuum is docked) — it is a
  debug aid for now.

## [0.35.4] - 2026-06-27

### Changed

- **Debug room progress only shows while a vacuum is actively cleaning.** A docked / idle robot no
  longer shows a stale coverage % (e.g. "Hall 69%" after the clean finished). The chip, the controller
  strip and the map gauge all hide when the vacuum is not cleaning.
- **Per-layer (dry/wet) menus show only the matching clean type, coloured by the vacuum.** The dry
  menu shows progress from dry-capable vacuums and the wet menu from wet-capable ones (a dual vacuum
  shows in both), and the % is now coloured with the vacuum's own colour instead of a generic scale —
  so wet pass-throughs no longer bleed into the dry list and vice versa.
- **Controller strip shows the time spent in the room again, next to the %** (e.g. `Living room 24%S · 12m30s`).

## [0.35.3] - 2026-06-27

### Added

- **Elapsed-time fallback in the debug progress strip.** When a room has neither spatial coverage nor
  a time ratio (e.g. no learned estimate yet), the strip now shows the live elapsed cleaning time
  (`25m01s`) so the currently-cleaned room still shows a value that changes during a clean.
- **Room geometry in the Debug tab.** A `rooms (geometry)` block lists each room's `x0/y0/x1/y1` +
  `pos_x/pos_y`, to diagnose why spatial coverage is unavailable (the spatial % needs room bounding
  boxes from the parser).

## [0.35.2] - 2026-06-27

### Fixed

- **Broken status-card styling (a build regression in 0.35.1).** A missing CSS brace left the progress
  bar rule unclosed, which cascaded into the status/controller layout. Restored.

### Added

- **Per-room progress strip inside the status card.** With `debug_room_progress` on, the controller
  now shows a per-room % line (spatial coverage, or the time ratio with an `S`/`T` marker when spatial
  is unavailable) — visible right where you watch a vacuum during a clean, not only in the map room
  menus.

## [0.35.1] - 2026-06-27

### Changed

- **Debug room progress is now visible without map room overlays.** The progress % chip is now also
  shown in the room menus (the hold-to-expand layer menu and the room list), next to the dry/wet ages,
  so it appears even when rooms are not placed as overlays on the map. The gauge/chip now **falls back
  to the time ratio** when spatial coverage is unavailable (e.g. the parser does not expose room
  bounding boxes), with an `S`/`T` marker showing which metric is displayed. Still gated behind
  `debug_room_progress`.

## [0.35.0] - 2026-06-27

### Added

- **Debug per-room progress gauge.** With `debug_room_progress: true` (toggle in the editor's Debug
  tab), each room on the map shows a small circular % gauge of cleaning coverage, read live from the
  companion integration's `rooms_progress` (integration v0.10.0+). The Debug tab also lists the full
  `rooms_progress` payload — spatial coverage % and a time ratio (elapsed vs learned estimate) plus the
  raw inputs (visited/total cells, elapsed/est seconds) — so a clean can be watched and cross-checked.
  Off by default; a testing aid, not for everyday cards. Spatial % is approximate (the room box
  includes furniture, so it plateaus below 100%).

## [0.34.3] - 2026-06-27

### Fixed

- **Flaky card-width detection.** The width came solely from a `ResizeObserver` on the host, which
  fires inconsistently inside some Home Assistant containers (panel view, editor preview, masonry
  columns), so the measured width updated only sometimes. Width is now re-measured via
  `getBoundingClientRect()` from both the `ResizeObserver` and a `window` `resize` listener, coalesced
  into a single animation-frame tick, so it tracks the real width reliably.

## [0.34.2] - 2026-06-27

### Fixed

- **Backend room selection did not redraw the card live.** The integration map sensor (which now
  carries `selected_rooms`) was not in the card's watched-entity set, so `shouldUpdate` ignored its
  state changes and the selection only reflected after some other watched entity changed (e.g.
  clicking an active control). The integration entity is now watched, so a selection made on the phone
  or PC redraws everywhere immediately.

## [0.34.1] - 2026-06-27

### Fixed

- **Card width measured 0 (`0w` chip, `mobile_rotate: auto` never triggering).** The host element had
  no block layout box, so the `ResizeObserver` read a `contentRect` width of 0. The host is now
  `display: block` and the width is also seeded from `getBoundingClientRect()` on first render, so the
  measured width is correct and width-based portrait auto-rotation works.

## [0.34.0] - 2026-06-26

### Changed

- **Room selection is now shared via the backend** (integration v0.9.0+). When the companion
  integration is present, selecting rooms reads/writes the backend `selected_rooms` (via the
  `anyvac.select_rooms` service) instead of per-browser local state, so phone and PC show the same
  selection and it feeds the orchestrator. Falls back to local per-browser state when no integration
  is configured.

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
