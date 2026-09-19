import { test, expect, type Page } from "@playwright/test";

/**
 * docs/42 §9 fáze H — the Visual editor's tool-switcher row (Seat &
 * Appearance / Rooms / Floorplan & Calibrate) and its localStorage
 * "last used tool" persistence (docs/42 §8 bod 4). The Seat & Appearance
 * tool's own behaviour (drag/Save/Reset/override precedence) is covered by
 * `visual-editor.spec.ts` instead — this file stays scoped to the
 * tool-switcher shell, which is common to all three tools.
 */

const FLOORPLAN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>" +
      "<rect width='800' height='400' fill='#eee'/></svg>"
  );
const MAP_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
      "<rect width='200' height='200' fill='#369'/></svg>"
  );

async function mountCard(page: Page): Promise<void> {
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ FLOORPLAN_SVG, MAP_SVG }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        map_mode: "split",
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            map: { entity: "image.my_roborock_map" },
            image_base: { src: FLOORPLAN_SVG },
            base: "map",
            rooms: [],
          },
        ],
      });
      const now = new Date().toISOString();
      card.hass = {
        states: {
          "vacuum.my_roborock": {
            entity_id: "vacuum.my_roborock",
            state: "docked",
            attributes: { friendly_name: "Roborock" },
            last_changed: now,
            last_updated: now,
          },
          "image.my_roborock_map": {
            entity_id: "image.my_roborock_map",
            state: now,
            attributes: { entity_picture: MAP_SVG },
            last_changed: now,
            last_updated: now,
          },
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock",
            state: "0",
            attributes: {
              schema_version: 2,
              image_dims: { top: 0, left: 0, width: 100, height: 400, scale: 4, rotation: 0 },
              vacuum_position_px: { x: 200, y: 800, a: 0 },
              rooms: [],
            },
            last_changed: now,
            last_updated: now,
          },
        },
        services: { anyvac: { set_floorplan_seat: {} } },
        hassUrl: (path: string) => path,
        localize: (k: string) => k,
        language: "en",
        callService: async (domain: string, service: string, data: unknown) => {
          w.__calls.push({ domain, service, data });
        },
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = "1200px";
      w.__mockHa.cardWrap.style.height = "400px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { FLOORPLAN_SVG, MAP_SVG }
  );
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 || (window as any).__card?.updateComplete,
    null,
    { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

async function openVe(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._openAlign(card._config.vacuums[0]);
    await card.updateComplete;
  });
  await page.waitForFunction(
    () => !!(document.querySelector("anyvac-visual-editor") as any)?.shadowRoot?.querySelector(".ve-tool-row")
  );
}

function tabLabels(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const host = document.querySelector("anyvac-visual-editor");
    const btns = [...(host?.shadowRoot?.querySelectorAll(".ve-tool-tab") ?? [])] as HTMLElement[];
    return btns.map((b) => b.textContent?.trim() ?? "");
  });
}

function activeTab(page: Page): Promise<string | undefined> {
  return page.evaluate(() => {
    const host = document.querySelector("anyvac-visual-editor");
    const on = host?.shadowRoot?.querySelector(".ve-tool-tab.on") as HTMLElement | null;
    return on?.textContent?.trim();
  });
}

test.describe("Visual editor tool-switcher (docs/42 §9 fáze H)", () => {
  test("shows all three tools, Seat & Appearance active by default", async ({ page }) => {
    await mountCard(page);
    await openVe(page);
    expect(await tabLabels(page)).toEqual(["Seat & Appearance", "Rooms", "Floorplan & Calibrate"]);
    expect(await activeTab(page)).toBe("Seat & Appearance");
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("seat");
  });

  test("switching to Rooms renders its own canvas/side-panel, not the placeholder or the seat gizmo (docs/42 §9 fáze I)", async ({ page }) => {
    await mountCard(page);
    await openVe(page);
    await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor");
      const btns = [...(host!.shadowRoot!.querySelectorAll(".ve-tool-tab"))] as HTMLElement[];
      btns.find((b) => b.textContent?.includes("Rooms"))!.click();
    });
    await page.evaluate(async () => { await (window as any).__card.updateComplete; });
    const state = await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor");
      const root = host!.shadowRoot!;
      return {
        veTool: (window as any).__card._veTool,
        hasRoomsSession: !!(window as any).__card._roomsSession,
        hasPlaceholder: !!root.querySelector(".ve-placeholder"),
        hasGizmo: !!root.querySelector(".align-gizmo"),
        hasSeatSidePanel: !!root.querySelector(".align-side-panel"),
      };
    });
    expect(state.veTool).toBe("rooms");
    expect(state.hasRoomsSession).toBe(true);
    expect(state.hasPlaceholder).toBe(false);
    expect(state.hasGizmo).toBe(false);
    // Rooms has its own `.align-side-panel` body (border sliders/area picker),
    // just not the Seat & Appearance one's gizmo/appearance fields — real
    // coverage of its OWN content lives in rooms-tool.spec.ts.
    expect(state.hasSeatSidePanel).toBe(true);
  });

  test("switching to Floorplan & Calibrate also renders its own placeholder", async ({ page }) => {
    await mountCard(page);
    await openVe(page);
    await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor");
      const btns = [...(host!.shadowRoot!.querySelectorAll(".ve-tool-tab"))] as HTMLElement[];
      btns.find((b) => b.textContent?.includes("Floorplan"))!.click();
    });
    await page.evaluate(async () => { await (window as any).__card.updateComplete; });
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("floorplan");
    expect(await activeTab(page)).toBe("Floorplan & Calibrate");
  });

  test("the last-used tool persists across close/reopen via localStorage (docs/42 §8 bod 4)", async ({ page }) => {
    await mountCard(page);
    await openVe(page);
    await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor");
      const btns = [...(host!.shadowRoot!.querySelectorAll(".ve-tool-tab"))] as HTMLElement[];
      btns.find((b) => b.textContent?.includes("Rooms"))!.click();
    });
    await page.evaluate(async () => {
      const card = (window as any).__card;
      card._closeAlign();
      await card.updateComplete;
    });
    expect(await page.evaluate(() => !!document.querySelector("anyvac-visual-editor"))).toBe(false);

    await openVe(page);
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("rooms");
    expect(await activeTab(page)).toBe("Rooms");
  });

  test("switching vacuum via the picker chip preserves the current tool instead of reloading from storage", async ({ page }) => {
    // Second vacuum on the same floorplan so the picker chip actually renders.
    await page.goto("/tests/harness/mock-ha.html");
    await page.waitForFunction(() => (window as any).__mockHaReady === true);
    await page.evaluate(async () => { await customElements.whenDefined("anyvac-card"); });
    await mountCard(page);
    await page.evaluate(({ FLOORPLAN_SVG, MAP_SVG }) => {
      const card = (window as any).__card;
      const now = new Date().toISOString();
      card._config.vacuums.push({
        entity: "vacuum.second", name: "Second", integration_entity: "sensor.anyvac_second",
        map: { entity: "image.second_map" }, image_base: { src: FLOORPLAN_SVG }, base: "map", rooms: [],
      });
      card.hass = {
        ...card.hass,
        states: {
          ...card.hass.states,
          "vacuum.second": { entity_id: "vacuum.second", state: "docked", attributes: { friendly_name: "Second" }, last_changed: now, last_updated: now },
          "image.second_map": { entity_id: "image.second_map", state: now, attributes: { entity_picture: MAP_SVG }, last_changed: now, last_updated: now },
          "sensor.anyvac_second": {
            entity_id: "sensor.anyvac_second", state: "0",
            attributes: {
              schema_version: 2,
              image_dims: { top: 0, left: 0, width: 100, height: 400, scale: 4, rotation: 0 },
              vacuum_position_px: { x: 200, y: 800, a: 0 }, rooms: [],
            },
            last_changed: now, last_updated: now,
          },
        },
      };
    }, { FLOORPLAN_SVG, MAP_SVG });
    await page.evaluate(async () => { await (window as any).__card.requestUpdate(); await (window as any).__card.updateComplete; });

    await openVe(page);
    await page.evaluate(() => {
      const host = document.querySelector("anyvac-visual-editor");
      const btns = [...(host!.shadowRoot!.querySelectorAll(".ve-tool-tab"))] as HTMLElement[];
      btns.find((b) => b.textContent?.includes("Rooms"))!.click();
    });
    await page.evaluate(async () => {
      const host = document.querySelector("anyvac-visual-editor");
      const chip = [...(host!.shadowRoot!.querySelectorAll(".align-vac-chip"))].find(
        (b) => b.textContent?.includes("Second")
      ) as HTMLElement;
      chip.click();
      await (window as any).__card.updateComplete;
    });
    expect(await page.evaluate(() => (window as any).__card._alignSession?.vacuum)).toBe("vacuum.second");
    expect(await page.evaluate(() => (window as any).__card._veTool)).toBe("rooms");
  });
});
