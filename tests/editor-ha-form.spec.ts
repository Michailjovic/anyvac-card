import { test, expect, type Page } from "@playwright/test";

/**
 * docs/44 F6 — config editor on Home Assistant's own form elements (card 1.43.0).
 *
 * The harness has no real HA frontend, so `ha-selector` / `ha-expansion-panel`
 * are stubbed with the same public surface the editor relies on (`selector`,
 * `value`, `label`, `value-changed`; `expanded`, `header`, `secondary`,
 * `expanded-will-change`/`expanded-changed`). What would regress silently:
 *
 *  - the lazy loader: HA only defines these once some stock editor has been
 *    loaded — `loadCardHelpers` → a stock card's `getConfigElement()`;
 *  - every field goes through a selector of the right kind (entity domain
 *    filter, number range, select options…) and writes the same config keys
 *    the old inputs did;
 *  - opening the editor and every panel writes NOTHING (round-trip: open →
 *    save without touching = identical YAML);
 *  - `value-changed` never leaves the editor — only `config-changed` does;
 *  - one vacuum expanded at a time, ⋮ menu with a confirmed delete, role as
 *    a segmented control, no emoji in tabs/footer, `native-auto` shown as
 *    Native, and the stylesheet uses HA variables only.
 */

const STUBS = `
  class StubSelector extends HTMLElement {
    constructor() { super(); this.selector = {}; this.value = undefined; this.required = true; }
    connectedCallback() { this.dataset.kind = Object.keys(this.selector || {})[0] || ""; }
  }
  class StubPanel extends HTMLElement {
    constructor() { super(); this.expanded = false; }
    toggle() {
      const next = !this.expanded;
      this.dispatchEvent(new CustomEvent("expanded-will-change", { detail: { expanded: next } }));
      this.expanded = next;
      this.dispatchEvent(new CustomEvent("expanded-changed", { detail: { expanded: next } }));
    }
  }
  window.__defineHaStubs = () => {
    if (!customElements.get("ha-selector")) customElements.define("ha-selector", StubSelector);
    if (!customElements.get("ha-expansion-panel")) customElements.define("ha-expansion-panel", StubPanel);
  };
`;

interface Opts { stubs?: "now" | "lazy" | "none"; config?: Record<string, unknown> }

const BASE_CONFIG = {
  type: "custom:anyvac-card",
  map_mode: "merged",
  theme: "dark",
  rooms: [{ key: "Hall", name: "Hall", icon: "mdi:door", clean_time_dry: 7 }],
  global_presets: [{ id: "gp1", label: "After dinner", scope: "select", mode: "both" }],
  global_actions: [{ name: "Whole flat", color: "orange", watch_entities: ["vacuum.a"], action: { type: "script", entity_id: "script.x" } }],
  vacuums: [
    { entity: "vacuum.a", name: "S6", color: "#6FBF73", clean_type: "dry",
      clean_action: { type: "native-auto", repeat: 2 }, presets: [{ id: "p1", label: "Quick", repeat: 1 }] },
    { entity: "vacuum.b", name: "S8", color: "blue", clean_action: { type: "script", entity_id: "script.mop", variables: { a: "{{ entity }}" } } },
  ],
};

async function mount(page: Page, o: Opts = {}): Promise<void> {
  const { stubs = "now", config = BASE_CONFIG } = o;
  await page.addInitScript(STUBS);
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async ({ stubs, config }) => {
    const w = window as any;
    if (stubs === "now") w.__defineHaStubs();
    if (stubs === "lazy") {
      // What HA does: the form elements appear once a stock card's editor loads.
      w.loadCardHelpers = async () => ({
        createCardElement: async () => {
          class Stock extends HTMLElement { static async getConfigElement() { w.__defineHaStubs(); return document.createElement("div"); } }
          if (!customElements.get("stock-card")) customElements.define("stock-card", Stock);
          return document.createElement("stock-card");
        },
      });
    }
    await customElements.whenDefined("anyvac-card-editor");
    w.__fired = [];
    w.__leaked = [];
    document.addEventListener("value-changed", (e) => w.__leaked.push(e.type));
    const editor = document.createElement("anyvac-card-editor") as any;
    const now = new Date().toISOString();
    editor.hass = {
      states: {
        "vacuum.a": { entity_id: "vacuum.a", state: "docked", attributes: { fan_speed_list: ["quiet", "max"] }, last_changed: now, last_updated: now },
        "vacuum.b": { entity_id: "vacuum.b", state: "docked", attributes: {}, last_changed: now, last_updated: now },
      },
      entities: {}, areas: {}, services: {}, hassUrl: (p: string) => p,
      callService: async () => undefined, callWS: async () => ({}),
    };
    editor.setConfig(JSON.parse(JSON.stringify(config)));
    editor.addEventListener("config-changed", (e: CustomEvent) => w.__fired.push(e.detail.config));
    w.__mockHa.cardWrap.appendChild(editor);
    w.__editor = editor;
  }, { stubs, config });
  await page.waitForFunction(() => (window as any).__editor?._ha !== null);
  await page.evaluate(async () => { await (window as any).__editor.updateComplete; });
}

const upd = (page: Page) => page.evaluate(async () => { await (window as any).__editor.updateComplete; });
const fired = (page: Page) => page.evaluate(() => (window as any).__fired as any[]);
const selectors = (page: Page) => page.evaluate(() =>
  Array.from((window as any).__editor.shadowRoot.querySelectorAll("ha-selector")).map((s: any) => ({
    label: s.getAttribute("label"), selector: s.selector, value: s.value, required: s.required,
  })));
const setSel = (page: Page, label: string, value: unknown) => page.evaluate(async ({ label, value }) => {
  const ed = (window as any).__editor;
  const s = Array.from(ed.shadowRoot.querySelectorAll("ha-selector")).find((x: any) => x.getAttribute("label") === label) as any;
  if (!s) throw new Error("no selector " + label);
  s.dispatchEvent(new CustomEvent("value-changed", { detail: { value }, bubbles: true, composed: true }));
  await ed.updateComplete;
}, { label, value });

test("lazy loader: HA's form elements are pulled in through a stock card's config element", async ({ page }) => {
  await mount(page, { stubs: "lazy" });
  expect(await page.evaluate(() => (window as any).__editor._ha)).toBe(true);
  // Without HA at all (no loadCardHelpers), the editor falls back to plain inputs.
  await mount(page, { stubs: "none" });
  expect(await page.evaluate(() => (window as any).__editor._ha)).toBe(false);
  expect(await page.evaluate(() => (window as any).__editor.shadowRoot.querySelectorAll("ha-selector").length)).toBe(0);
});

test("fields are HA selectors of the right kind and write the same config keys", async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { (window as any).__editor._openVac = 0; });
  await upd(page);
  const sels = await selectors(page);
  expect(sels.find((s) => s.label === "Vacuum entity")).toMatchObject({ selector: { entity: { domain: "vacuum" } }, value: "vacuum.a" });
  expect(sels.find((s) => s.label === "Display name")).toMatchObject({ selector: { text: {} }, value: "S6", required: false });
  // ha-selector defaults `required` to true — only the vacuum entity may be required.
  expect(sels.filter((s) => s.required).map((s) => s.label)).toEqual(["Vacuum entity"]);
  await setSel(page, "Display name", "Kitchen robot");
  let cfg = (await fired(page)).at(-1);
  expect(cfg.vacuums[0].name).toBe("Kitchen robot");
  expect(cfg.vacuums[1]).toEqual(BASE_CONFIG.vacuums[1]);
  // Numbers keep their range; sliders clamp.
  await page.evaluate(() => { (window as any).__editor._toggleAction(0, true); });
  await upd(page);
  const rep = (await selectors(page)).find((s) => s.label === "Repeat passes");
  expect(rep?.selector).toEqual({ number: { min: 1, max: 3, step: 1, mode: "slider" } });
  await setSel(page, "Repeat passes", 9);
  cfg = (await fired(page)).at(-1);
  expect(cfg.vacuums[0].clean_action.repeat).toBe(3);
  // …and the selector's own event never leaves the editor.
  expect(await page.evaluate(() => (window as any).__leaked)).toEqual([]);
});

test("round-trip: opening the editor and every panel writes nothing", async ({ page }) => {
  await mount(page);
  await page.evaluate(async () => {
    const ed = (window as any).__editor;
    for (const i of [0, 1]) {
      ed._openVac = i;
      ed._toggleSensors(i, true); ed._toggleMap(i, true); ed._toggleAction(i, true); ed._togglePresets(i, true);
      await ed.updateComplete;
    }
    ed._tab = "global";
    ed._toggleRoom(-1, 0);
    ed._toggleGlobal(0);
    await ed.updateComplete;
    ed._tab = "debug";
    await ed.updateComplete;
  });
  expect(await fired(page)).toEqual([]);
  expect(await page.evaluate(() => (window as any).__editor._config)).toEqual(BASE_CONFIG);
});

test("one vacuum expanded at a time; the collapsed row is a summary", async ({ page }) => {
  await mount(page);
  const rows = () => page.evaluate(() => Array.from((window as any).__editor.shadowRoot.querySelectorAll(".acc-row")).map((r: any) => ({
    open: !!r.querySelector(".acc-body"), sub: r.querySelector(".acc-sub")?.textContent.trim(),
  })));
  // Two vacuums → both collapsed at first.
  expect((await rows()).slice(0, 2).map((r) => r.open)).toEqual([false, false]);
  expect((await rows())[0].sub).toBe("Dry · vacuum.a");
  for (const i of [0, 1]) {
    await page.evaluate((i) => { ((window as any).__editor.shadowRoot.querySelectorAll(".acc-header")[i] as HTMLElement).click(); }, i);
    await upd(page);
  }
  expect((await rows()).slice(0, 2).map((r) => r.open)).toEqual([false, true]);
});

test("⋮ menu: move down, and delete only after confirming", async ({ page }) => {
  await mount(page);
  const click = (sel: string, i = 0) => page.evaluate(async ({ sel, i }) => {
    const ed = (window as any).__editor;
    (ed.shadowRoot.querySelectorAll(sel)[i] as HTMLElement).click();
    await ed.updateComplete;
  }, { sel, i });
  await click(".acc-row .menu-wrap .icon-btn");
  expect(await page.evaluate(() => Array.from((window as any).__editor.shadowRoot.querySelectorAll(".menu-item")).map((b: any) => b.textContent.trim())))
    .toEqual(["Move up", "Move down", "Delete"]);
  await click(".menu-item", 1); // Move down
  expect((await fired(page)).at(-1).vacuums.map((v: any) => v.name)).toEqual(["S8", "S6"]);
  const n = (await fired(page)).length;
  await click(".acc-row .menu-wrap .icon-btn");
  await click(".menu-item--danger");
  expect(await page.evaluate(() => (window as any).__editor.shadowRoot.querySelector(".menu-confirm")?.textContent.trim())).toBe("Delete S8?");
  await click(".menu-btn"); // Cancel
  expect((await fired(page)).length).toBe(n);
  await click(".acc-row .menu-wrap .icon-btn");
  await click(".menu-item--danger");
  await click(".menu-btn--danger");
  expect((await fired(page)).at(-1).vacuums.map((v: any) => v.name)).toEqual(["S6"]);
});

test("role is a segmented control; colour is a palette + custom; native-auto reads as Native", async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { (window as any).__editor._openVac = 0; });
  await upd(page);
  const segs = await page.evaluate(() => Array.from((window as any).__editor.shadowRoot.querySelectorAll(".acc-body .segmented")[0].querySelectorAll(".seg"))
    .map((b: any) => b.textContent.trim() + (b.getAttribute("aria-checked") === "true" ? "*" : "")));
  expect(segs).toEqual(["Auto", "Dry*", "Wet", "Both"]);
  await page.evaluate(async () => {
    const ed = (window as any).__editor;
    (ed.shadowRoot.querySelectorAll(".acc-body .segmented .seg")[0] as HTMLElement).click();
    await ed.updateComplete;
  });
  expect("clean_type" in (await fired(page)).at(-1).vacuums[0]).toBe(true);
  expect((await fired(page)).at(-1).vacuums[0].clean_type).toBeUndefined();
  // Palette swatch → hex; the current colour is marked.
  const sw = await page.evaluate(() => Array.from((window as any).__editor.shadowRoot.querySelectorAll(".acc-body .swatches .swatch--on")).length);
  expect(sw).toBe(1);
  // Clean action summary on the collapsed panel.
  const panel = await page.evaluate(() => Array.from((window as any).__editor.shadowRoot.querySelectorAll("ha-expansion-panel"))
    .map((p: any) => p.getAttribute("header") + " | " + p.getAttribute("secondary")));
  expect(panel).toContain("Clean action | Native (segments)");
  expect(panel.join(" ")).not.toContain("native-auto");
  expect(panel.find((p) => p.startsWith("Sensors"))).toBe("Sensors | Found automatically on the vacuum's device");
});

test("no emoji in tabs/footer; stylesheet uses HA variables only", async ({ page }) => {
  await mount(page);
  const text = await page.evaluate(() => {
    const r = (window as any).__editor.shadowRoot;
    return r.querySelector(".tabs-bar").textContent + r.querySelector(".editor-footer").textContent;
  });
  expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
  const css = await page.evaluate(() => {
    const C = customElements.get("anyvac-card-editor") as any;
    return (Array.isArray(C.styles) ? C.styles : [C.styles]).map((s: any) => s.cssText).join("\n");
  });
  expect(css.match(/#[0-9a-f]{3,6}\b/gi) ?? []).toEqual([]);
  expect(css.match(/rgba?\((?!var\()/g) ?? []).toEqual([]);
});

test("long hints stay one line until (i) expands them", async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { (window as any).__editor._openVac = 0; });
  await upd(page);
  const q = () => page.evaluate(() => (window as any).__editor.shadowRoot.querySelectorAll(".acc-body > .hint .hint-long").length);
  expect(await q()).toBe(0);
  await page.evaluate(async () => {
    const ed = (window as any).__editor;
    (ed.shadowRoot.querySelector(".acc-body > .hint .hint-more") as HTMLElement).click();
    await ed.updateComplete;
  });
  expect(await q()).toBe(1);
});
