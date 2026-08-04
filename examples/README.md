# Example configs

Copy-paste starting points. Each one is a complete, valid card config on its
own — adjust entity IDs to match your own setup. See
[`../CONFIGURATION.md`](../CONFIGURATION.md) for what every key does.

| File | Scenario |
|---|---|
| [`01-minimal-single-vacuum.yaml`](01-minimal-single-vacuum.yaml) | One vacuum, `anyvac` integration active. Smallest config that works. |
| [`02-merged-multi-vacuum.yaml`](02-merged-multi-vacuum.yaml) | Two or more vacuums sharing one floorplan/map, orchestrated together. |
| [`03-manual-mode-presets.yaml`](03-manual-mode-presets.yaml) | Per-robot controllers with named "how" presets (`ui_mode: manual`), no orchestration. |
| [`04-degraded-mode.yaml`](04-degraded-mode.yaml) | No `anyvac` integration — the card driving a vacuum directly via `vacuum.*` services. |
