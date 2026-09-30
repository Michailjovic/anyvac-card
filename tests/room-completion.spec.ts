import { test, expect, type Page } from "@playwright/test";

/**
 * Room completion chips (card 1.45.0, docs/45).
 *
 * Since integration 1.45.0 a room's `*_pct` is the share of the ORDERED work
 * done, passes included — a 2-pass kitchen after its first full pass reads
 * 50 %, not 97 %. Without a pass indicator that looks like a bug, so the chip
 * says which pass is running ("50% 1/2"). The persisted "last clean" badge
 * gains a warning when the robot finished but reached clearly less of the
 * room's reachable floor (`*_floor`) — a different message from "not done".
 *
 * Driven through the card's own render helpers on a mounted card: this pins the
 * attribute contract (field names and semantics), not a layout profile.
 */

const PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

async function mountCard(page: Page, attrs: Record<string, unknown>): Promise<void> {
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ attrs, PIXEL }) => {
      const w = window as any;
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        layout: {},
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            rooms: [{ key: "Kitchen", name: "Kitchen", segment: 16 }],
            image_base: { src: PIXEL },
            clean_action: { type: "native" },
          },
        ],
      });
      const now = new Date().toISOString();
      card.hass = {
        states: {
          "vacuum.my_roborock": {
            entity_id: "vacuum.my_roborock", state: "cleaning",
            attributes: { friendly_name: "Roborock" }, last_changed: now, last_updated: now,
          },
          "sensor.anyvac_my_roborock": {
            entity_id: "sensor.anyvac_my_roborock", state: "0",
            attributes: { schema_version: 3, ...attrs }, last_changed: now, last_updated: now,
          },
        },
        localize: (k: string) => k,
        language: "en",
        callService: async () => undefined,
        callWS: async () => ({}),
      };
      w.__mockHa.cardWrap.appendChild(card);
      w.__card = card;
    },
    { attrs, PIXEL }
  );
}

/** Render the live dry chip for Kitchen; returns [text, title]. */
function chip(page: Page): Promise<[string, string] | null> {
  return page.evaluate(async () => {
    const card = (window as any).__card;
    await card.updateComplete;
    const vac = card._config.vacuums[0];
    const room = vac.rooms[0];
    const p = card._roomProgForType(room, [vac], "dry");
    if (!p) return null;
    // A TemplateResult: strings + values — flatten to the chip's visible text.
    const flat = (t: any): string =>
      t && t.strings ? t.strings.map((s: string, i: number) => s + (i < t.values.length ? flat(t.values[i]) : "")).join("")
        : typeof t === "string" || typeof t === "number" ? String(t) : "";
    const markup = flat(card._renderProgChip(p));
    const suffix = /<small>([^<]*)<\/small>/.exec(markup)?.[1] ?? "";
    return [`${p.pct}|${suffix}`, p.title];
  });
}

function badge(page: Page, fmtThemed: boolean): Promise<{ text: string; warn: boolean }> {
  return page.evaluate(async (fmtThemed) => {
    const card = (window as any).__card;
    await card.updateComplete;
    const vac = card._config.vacuums[0];
    const cov = card._roomCoverageRec(vac, vac.rooms[0]);
    const fmt = (pct: number | null | undefined) => fmtThemed
      ? (pct == null || pct >= 100 ? "" : pct + "%")
      : (pct == null ? "—" : pct + "%");
    const tpl = card._renderCovBadge(cov, "dry", fmt);
    // A TemplateResult: strings + values. Enough to read the text and whether the
    // warning branch was taken, without depending on how the bundle exports lit.
    const flat = (t: any): string =>
      t && t.strings ? t.strings.map((s: string, i: number) => s + (i < t.values.length ? flat(t.values[i]) : "")).join("")
        : typeof t === "string" || typeof t === "number" ? String(t) : "";
    const html = flat(tpl);
    return { text: fmt(cov?.dry), warn: html.includes("dock-cov-warn") };
  }, fmtThemed);
}

test("a 2-pass room after its first pass reads 50% with a 1/2 pass marker", async ({ page }) => {
  await mountCard(page, {
    rooms_progress: {
      Kitchen: {
        dry_pct: 50, wet_pct: null, spatial_pct: 50, dry_floor: 96, dry_pass: 1, passes: 2,
        active: true, done: false, dry_calibrating: false, wet_calibrating: false,
      },
    },
  });
  const [text, title] = (await chip(page))!;
  expect(text).toBe("50|1/2");
  expect(title).toContain("pass 1 of 2");
  expect(title).toContain("96% of the reachable floor");
});

test("a single-pass room keeps the plain chip", async ({ page }) => {
  await mountCard(page, {
    rooms_progress: { Kitchen: { dry_pct: 73, dry_pass: 1, passes: 1, dry_floor: 70 } },
  });
  const [text] = (await chip(page))!;
  expect(text).toBe("73|S");
});

test("an older integration without pass fields still renders", async ({ page }) => {
  await mountCard(page, {
    rooms_progress: { Kitchen: { dry_pct: 40, dry_calibrating: true, spatial_pct: 40 } },
  });
  const [text, title] = (await chip(page))!;
  expect(text).toBe("40|S");
  expect(title).not.toContain("pass");
});

test("a finished room that reached little of its floor gets a warning, a normal one does not", async ({ page }) => {
  await mountCard(page, { rooms_coverage: { Kitchen: { dry: 100, dry_floor: 62 } } });
  let b = await badge(page, true);
  expect(b.text).toBe("");
  expect(b.warn).toBe(true);

  await mountCard(page, { rooms_coverage: { Kitchen: { dry: 100, dry_floor: 97 } } });
  b = await badge(page, true);
  expect(b.warn).toBe(false);

  await mountCard(page, { rooms_coverage: { Kitchen: { dry: 55, dry_floor: 60 } } });
  b = await badge(page, true);
  expect(b.text).toBe("55%");

  // Integration < 1.45.0: no *_floor at all -> never a warning.
  await mountCard(page, { rooms_coverage: { Kitchen: { dry: 80 } } });
  b = await badge(page, false);
  expect(b.text).toBe("80%");
  expect(b.warn).toBe(false);
});
