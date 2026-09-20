import { test, expect, type Page } from "@playwright/test";

/**
 * Config editor (`<anyvac-card-editor>`) after the Maps-tab cleanup (docs/42
 * fáze L): the tab bar drops to Vacuums/Global, and everything the old Maps
 * tab used to own has moved somewhere else —
 *
 *  - `map.entity`, `integration_entity`, "Base layer" and the per-vacuum
 *    stage height moved into each vacuum's own new "Map & floorplan"
 *    section (Vacuums tab).
 *  - THIS vacuum's own floorplan-image tooling (snapshot/export-guide/crop,
 *    split mode only — no Visual-editor equivalent, since the backend's
 *    `set_floorplan_seat` override has no per-vacuum `image_base` slot)
 *    lives inside that same section, gated on `base: "image"|"combined"`.
 *  - Merged mode's shared room list (`_config.rooms`) — previously only
 *    editable from the Maps tab — gets its own "Rooms (shared)" section in
 *    the Global tab, alongside the card-level floorplan bootstrap field,
 *    stage height, and the cleaning-sequence reorder list.
 *
 * These are the first tests in this repo to exercise `<anyvac-card-editor>`
 * at all (the previous ones, `editor-seat-sync.spec.ts`, tested only the
 * now-removed backend-seat-sync machinery and were deleted with fáze L).
 */

interface MountOpts {
  mapMode?: "split" | "merged";
  vacuumOverrides?: Record<string, unknown>;
  cardOverrides?: Record<string, unknown>;
  intRooms?: Array<Record<string, unknown>>;
}

async function mountEditor(page: Page, opts: MountOpts = {}): Promise<void> {
  const { mapMode = "split", vacuumOverrides = {}, cardOverrides = {}, intRooms = [] } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => { await customElements.whenDefined("anyvac-card-editor"); });
  await page.evaluate(
    ({ mapMode, vacuumOverrides, cardOverrides, intRooms }) => {
      const w = window as any;
      w.__fired = [];
      const editor = document.createElement("anyvac-card-editor") as any;
      editor.hass = {
        states: {
          "vacuum.my_roborock": {
            entity_id: "vacuum.my_roborock", state: "docked",
            attributes: { friendly_name: "Roborock" },
            last_changed: new Date().toISOString(), last_updated: new Date().toISOString(),
          },
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock", state: "0",
            attributes: { schema_version: 2, rooms: intRooms },
            last_changed: new Date().toISOString(), last_updated: new Date().toISOString(),
          },
        },
        entities: {},
        services: { anyvac: { set_floorplan_seat: {}, snapshot_map_as_floorplan: {}, export_map_guide: {} } },
        hassUrl: (p: string) => p,
        callService: async () => undefined,
        callWS: async () => ({}),
      };
      editor.setConfig({
        type: "custom:anyvac-card",
        map_mode: mapMode,
        vacuums: [{
          entity: "vacuum.my_roborock", name: "Roborock", color: "green",
          rooms: [], clean_action: { type: "native" },
          ...vacuumOverrides,
        }],
        ...cardOverrides,
      });
      editor.addEventListener("config-changed", (e: CustomEvent) => { w.__fired.push(e.detail.config); });
      w.__mockHa.cardWrap.appendChild(editor);
      w.__editor = editor;
    },
    { mapMode, vacuumOverrides, cardOverrides, intRooms }
  );
  await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
}

/** Reads the editor's shadow root as plain text/HTML for simple assertions —
 *  the editor renders no nested custom elements deep enough to need more. */
function shadow(page: Page): Promise<string> {
  return page.evaluate(() => (window as any).__editor.shadowRoot.innerHTML);
}

function lastConfig(page: Page): Promise<any> {
  return page.evaluate(() => { const f = (window as any).__fired; return f[f.length - 1]; });
}

test.describe("Config editor tab bar (docs/42 fáze L)", () => {
  test("only Vacuums and Global remain — no Maps tab", async ({ page }) => {
    await mountEditor(page);
    const html = await shadow(page);
    expect(html).toContain("Vacuums");
    expect(html).toContain("Global");
    expect(html).not.toContain("🗺 Maps");
  });
});

test.describe("Vacuums tab: Map & floorplan section (relocated fields)", () => {
  test("exposes map entity, integration entity, base layer and stage height", async ({ page }) => {
    await mountEditor(page);
    await page.evaluate(() => { const e = (window as any).__editor; e._toggleMap(0); });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    const html = await shadow(page);
    expect(html).toContain("Map &amp; floorplan");
    expect(html).toContain("Map image entity");
    expect(html).toContain("AnyVac sensor");
    expect(html).toContain("Base layer");
    expect(html).toContain("Stage height");
  });

  test("split mode + base: image shows the per-vacuum floorplan tools (no Visual-editor equivalent)", async ({ page }) => {
    await mountEditor(page, {
      vacuumOverrides: {
        base: "image", image_base: { src: "/local/anyvac/flat.svg" },
        map: { entity: "image.my_roborock_map" },
      },
    });
    await page.evaluate(() => { const e = (window as any).__editor; e._toggleMap(0); });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    const html = await shadow(page);
    expect(html).toContain("Floorplan image");
    expect(html).toContain("Image src (URL)");
    expect(html).toContain("Export guide layers");
  });

  test("base: map (default) hides the floorplan tools", async ({ page }) => {
    await mountEditor(page);
    await page.evaluate(() => { const e = (window as any).__editor; e._toggleMap(0); });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    const html = await shadow(page);
    expect(html).not.toContain("Export guide layers");
  });

  test("merged mode hides Base layer/Stage height here and points the Rooms section at the Global tab", async ({ page }) => {
    await mountEditor(page, { mapMode: "merged" });
    await page.evaluate(() => { const e = (window as any).__editor; e._toggleMap(0); });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    const html = await shadow(page);
    expect(html).toContain("set once for the whole card");
    expect(html).toContain("Rooms (shared)");
  });
});

test.describe("Global tab: merged-mode Floorplan + Rooms (shared) (docs/42 fáze L)", () => {
  test("Floorplan section bootstraps image_base.src and sets base_height", async ({ page }) => {
    await mountEditor(page, { mapMode: "merged" });
    await page.evaluate(() => { (window as any).__editor._tab = "global"; });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    let html = await shadow(page);
    expect(html).toContain("Floorplan");
    expect(html).toContain("Image src (URL)");
    expect(html).toContain("Stage height");

    await page.evaluate(() => { (window as any).__editor._setConfig({ image_base: { src: "/local/anyvac/flat.svg" } }); });
    const cfg = await lastConfig(page);
    expect(cfg.image_base.src).toBe("/local/anyvac/flat.svg");
  });

  test("Rooms (shared) lists _config.rooms, and add/delete write back to it", async ({ page }) => {
    await mountEditor(page, { mapMode: "merged", cardOverrides: { rooms: [{ key: "bedroom", name: "Bedroom", icon: "mdi:bed" }] } });
    await page.evaluate(() => { (window as any).__editor._tab = "global"; });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    let html = await shadow(page);
    expect(html).toContain("Bedroom");

    await page.evaluate(() => { (window as any).__editor._addEditedRoom(); });
    let cfg = await lastConfig(page);
    expect(cfg.rooms.length).toBe(2);

    await page.evaluate(() => { (window as any).__editor._deleteEditedRoom(0); });
    cfg = await lastConfig(page);
    expect(cfg.rooms.length).toBe(1);
    expect(cfg.rooms[0].key).not.toBe("bedroom");
  });

  test("editing a shared room's icon/clean-time via the merged accordion writes into _config.rooms, never vac.rooms", async ({ page }) => {
    await mountEditor(page, { mapMode: "merged", cardOverrides: { rooms: [{ key: "bedroom", name: "Bedroom", icon: "mdi:bed" }] } });
    await page.evaluate(() => {
      const e = (window as any).__editor;
      e._tab = "global";
      e._setEditedRoom(0, { clean_time_dry: 12 });
    });
    const cfg = await lastConfig(page);
    expect(cfg.rooms[0].clean_time_dry).toBe(12);
    expect(cfg.vacuums[0].rooms ?? []).toHaveLength(0);
  });

  test("cleaning-sequence section only appears once an AnyVac integration sensor and shared rooms both exist", async ({ page }) => {
    await mountEditor(page, { mapMode: "merged" });
    await page.evaluate(() => { (window as any).__editor._tab = "global"; });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    let html = await shadow(page);
    expect(html).not.toContain("Cleaning sequence");

    await mountEditor(page, {
      mapMode: "merged",
      vacuumOverrides: { integration_entity: "sensor.anyvac_my_roborock" },
      cardOverrides: { rooms: [{ key: "bedroom", name: "Bedroom" }] },
    });
    await page.evaluate(() => { (window as any).__editor._tab = "global"; });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    html = await shadow(page);
    expect(html).toContain("Cleaning sequence");
  });
});

test.describe("Split-mode per-vacuum room accordion: icon/icon_anchor/dry/wet fields (docs/42 fáze L)", () => {
  test("the room accordion exposes icon, icon anchor and dry/wet clean-time fields", async ({ page }) => {
    await mountEditor(page, { vacuumOverrides: { rooms: [{ key: "bedroom", name: "Bedroom", icon: "mdi:bed" }] } });
    await page.evaluate(() => {
      const e = (window as any).__editor;
      e._toggleRoom(0, 0);
    });
    await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
    const html = await shadow(page);
    expect(html).toContain("Icon anchor");
    expect(html).toContain("Est. dry clean time");
    expect(html).toContain("Est. wet clean time");
  });
});
