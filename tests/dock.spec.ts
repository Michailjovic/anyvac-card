import { test, expect, type Page } from "@playwright/test";

/**
 * Dock sheet — capability gating and the start/stop toggle (card 1.3.0).
 *
 * Two things worth pinning down here, both of which fail silently rather than
 * loudly if they regress:
 *
 * 1. Which buttons appear. Until 1.3.0 this branched on a hand-maintained
 *    `dock_type` tier table with exactly three rungs (none / empty / full), so a
 *    dock that washes but cannot dry was inexpressible — it got a Dry button
 *    that did nothing. The backend now reports the dock's own capability flags
 *    (`dock_status.features`), and the tier survives only as the fallback for an
 *    older paired integration. Both paths are tested, because "the fallback
 *    quietly stopped working" is precisely the kind of thing nobody notices
 *    until someone with an old integration files a bug.
 *
 * 2. What a button does. Empty/wash/dry are cycles, so the button starts one and
 *    stops a running one. Running state is the backend's answer
 *    (`dock_status.running`), never re-derived here — and when the paired
 *    integration is too old to publish it, the button must stay a plain start
 *    rather than offering a Stop that may or may not correspond to reality.
 */

const PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

/** Everything a full wash+dry dock (an S8 MaxV Ultra) reports. */
const FULL_DOCK = {
  has_dock: true,
  is_collectable: true,
  is_washable: true,
  is_dryable: true,
};

interface MountOpts {
  /** `dock_status` as the integration publishes it; omit for no integration. */
  dockStatus?: Record<string, unknown> | null;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { dockStatus = { features: FULL_DOCK } } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ dockStatus, PIXEL }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        layout: {},
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            // Explicit, so the sheet does not depend on registry auto-resolve.
            integration_entity: "sensor.anyvac_my_roborock",
            rooms: [],
            image_base: { src: PIXEL },
            clean_action: { type: "native" },
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
          ...(dockStatus
            ? {
                "sensor.anyvac_my_roborock": {
                  entity_id: "sensor.anyvac_my_roborock",
                  state: "0",
                  attributes: { schema_version: 2, dock_status: dockStatus },
                  last_changed: now,
                  last_updated: now,
                },
              }
            : {}),
        },
        localize: (k: string) => k,
        language: "en",
        callService: async (domain: string, service: string, data: unknown) => {
          w.__calls.push({ domain, service, data });
        },
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.style.width = "1200px";
      w.__mockHa.cardWrap.style.height = "800px";
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { dockStatus, PIXEL }
  );
  // The sheet is opened by a button whose placement differs per layout profile;
  // this test is about the sheet's contents, not about finding that button.
  await page.evaluate(async () => {
    const card = (window as any).__card;
    card._dockSheetOpen = true;
    await card.updateComplete;
  });
}

/** Visible labels of the dock action buttons, in render order. */
function actionLabels(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const card = (window as any).__card;
    return Array.from(
      card.shadowRoot.querySelectorAll(".dock-sheet-action")
    ).map((b: any) => b.textContent.trim());
  });
}

async function clickAction(page: Page, label: string): Promise<void> {
  await page.evaluate((label) => {
    const card = (window as any).__card;
    const btn = Array.from(
      card.shadowRoot.querySelectorAll(".dock-sheet-action")
    ).find((b: any) => b.textContent.trim() === label) as HTMLElement | undefined;
    if (!btn) throw new Error(`no dock action button labelled "${label}"`);
    btn.click();
  }, label);
}

function calls(page: Page): Promise<any[]> {
  return page.evaluate(() => (window as any).__calls);
}

test.describe("dock sheet (card 1.3.0)", () => {
  test("a full dock offers every action", async ({ page }) => {
    await mountCard(page);
    expect(await actionLabels(page)).toEqual([
      "Empty",
      "Wash",
      "Dry",
      "Pump",
      "Self-clean",
    ]);
  });

  test("an auto-empty-only dock offers only Empty", async ({ page }) => {
    await mountCard(page, {
      dockStatus: {
        features: {
          has_dock: true,
          is_collectable: true,
          is_washable: false,
          is_dryable: false,
        },
      },
    });
    expect(await actionLabels(page)).toEqual(["Empty"]);
  });

  test("a wash-but-not-dry dock gets no Dry button", async ({ page }) => {
    // The case the old three-rung dock_type tier could not express: it would
    // have called this "full" and shown a Dry button that does nothing.
    await mountCard(page, {
      dockStatus: {
        features: {
          has_dock: true,
          is_collectable: true,
          is_washable: true,
          is_dryable: false,
        },
      },
    });
    expect(await actionLabels(page)).toEqual(["Empty", "Wash", "Pump", "Self-clean"]);
  });

  test("a running cycle turns its button into Stop", async ({ page }) => {
    await mountCard(page, {
      dockStatus: { features: FULL_DOCK, running: { empty: false, wash: true, dry: false } },
    });
    // Only the washing button changes; the others stay startable.
    expect(await actionLabels(page)).toEqual([
      "Empty",
      "Stop",
      "Dry",
      "Pump",
      "Self-clean",
    ]);
    const running = await page.evaluate(() =>
      Array.from(
        (window as any).__card.shadowRoot.querySelectorAll(".dock-sheet-action.running")
      ).map((b: any) => b.textContent.trim())
    );
    expect(running).toEqual(["Stop"]);
  });

  test("Stop sends action: stop, and a start sends action: start", async ({ page }) => {
    await mountCard(page, {
      dockStatus: { features: FULL_DOCK, running: { empty: false, wash: true, dry: false } },
    });
    await clickAction(page, "Stop");
    await clickAction(page, "Empty");
    expect(await calls(page)).toEqual([
      {
        domain: "anyvac",
        service: "dock_wash",
        data: { entity_id: "vacuum.my_roborock", action: "stop" },
      },
      {
        domain: "anyvac",
        service: "dock_empty",
        data: { entity_id: "vacuum.my_roborock", action: "start" },
      },
    ]);
  });

  test("pump and self-clean take no action parameter", async ({ page }) => {
    // Neither has a documented stop command, so neither grew the parameter.
    await mountCard(page);
    await clickAction(page, "Pump");
    expect((await calls(page))[0].data).toEqual({ entity_id: "vacuum.my_roborock" });
  });

  test("an integration that reports no running state leaves plain start buttons", async ({ page }) => {
    await mountCard(page, { dockStatus: { features: FULL_DOCK } });
    expect(await actionLabels(page)).not.toContain("Stop");
    await clickAction(page, "Wash");
    expect((await calls(page))[0].data).toEqual({
      entity_id: "vacuum.my_roborock",
      action: "start",
    });
  });

  test("without capability flags it falls back to the dock_type tier", async ({ page }) => {
    // An older paired integration publishes dock_status but no `features`.
    await mountCard(page, { dockStatus: { dock_type: 10 } });
    expect(await actionLabels(page)).toEqual([
      "Empty",
      "Wash",
      "Dry",
      "Pump",
      "Self-clean",
    ]);

    await mountCard(page, { dockStatus: { dock_type: 1 } });
    expect(await actionLabels(page)).toEqual(["Empty"]);
  });

  test("an all-null features block falls back rather than hiding everything", async ({ page }) => {
    // What the backend publishes when the library renamed the flags: unknown,
    // not "confirmed absent". Hiding every button would be the worse guess.
    await mountCard(page, {
      dockStatus: {
        dock_type: 10,
        features: { has_dock: null, is_collectable: null, is_washable: null, is_dryable: null },
      },
    });
    expect(await actionLabels(page)).toEqual([
      "Empty",
      "Wash",
      "Dry",
      "Pump",
      "Self-clean",
    ]);
  });
});
