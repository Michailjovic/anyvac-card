import { test, expect, type Page } from "@playwright/test";

/**
 * Click geometry on a ROTATED map (card 1.3.1).
 *
 * `.avc-rot` turns the whole map block 90° when rotating fits the floorplan
 * better (docs/25 §4, extended to landscape in 0.81.1) and/or 180° for a manual
 * flip (docs/32). Until 1.3.1 the click inversion knew nothing about that
 * wrapper, so Pin & Go and Zone were simply disabled whenever it was in effect
 * (docs/13 A5) — which, for a tall/narrow floorplan in landscape, is always.
 * The buttons went grey and stayed grey, with no error anywhere.
 *
 * What is pinned down here:
 *
 * 1. The buttons are enabled at every angle. This is the reported symptom, and
 *    it is a one-line guard, so it is the one most likely to be re-added by
 *    someone "fixing" a rotation bug later.
 *
 * 2. A click lands where the user aimed, at every angle. Ground truth is the
 *    browser's own layout, never our own maths checked against itself: a probe
 *    node that copies the map <img>'s exact box and transform is mounted beside
 *    it, a marker inside it at a known fraction of that box is measured on
 *    screen, and that screen point is fed to `_clickToContent`. The browser
 *    computes the forward transform, the card computes the inverse; the two
 *    must meet. 0° passes before and after the fix; 90/180/270 only after.
 *
 * 3. A zone drawn on a rotated map produces the right box. Same probe, but
 *    through the actual pointer handlers, because zone drawing has its own
 *    coordinate path (`_wrapPct`/`_wrapPoint`) that percent-of-bounding-rect
 *    maths got wrong in a second, independent way: at 90°/270° the bounding
 *    rect has width and height swapped.
 */

/** A deliberately tall, narrow map (400x1600) — the shape that makes the fit
 *  heuristic want to rotate in landscape, which is what put the user's real
 *  floorplan into this state in the first place. */
const TALL_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='1600'>" +
      "<rect width='400' height='1600' fill='#333'/></svg>"
  );

interface MountOpts {
  /** 90° auto-rotation for fit (`mobile_rotate`, the forced-for-testing path). */
  rotate?: boolean;
  /** 180° manual flip (`layout.landscape.crop.flip`, docs/32). */
  flip?: boolean;
}

async function mountCard(page: Page, opts: MountOpts = {}): Promise<void> {
  const { rotate = false, flip = false } = opts;
  await page.goto("/tests/harness/mock-ha.html");
  await page.waitForFunction(() => (window as any).__mockHaReady === true);
  await page.evaluate(async () => {
    await customElements.whenDefined("anyvac-card");
  });
  await page.evaluate(
    ({ rotate, flip, TALL_SVG }) => {
      const w = window as any;
      w.__calls = [];
      const card = document.createElement("anyvac-card") as any;
      card.setConfig({
        type: "custom:anyvac-card",
        layout: { landscape: { crop: { flip } } },
        // "always" is the documented force-rotation escape hatch; using it keeps
        // this test about the click maths instead of about the fit heuristic.
        mobile_rotate: rotate ? "always" : "off",
        map_mode: "split",
        vacuums: [
          {
            entity: "vacuum.my_roborock",
            name: "Roborock",
            integration_entity: "sensor.anyvac_my_roborock",
            map: { entity: "image.my_roborock_map" },
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
            attributes: { entity_picture: TALL_SVG },
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
    { rotate, flip, TALL_SVG }
  );
  // Two settle passes: the grid measures its map region after first paint, and
  // `_mapRotationDeg` deliberately answers 0 until it has (the renderer does not
  // rotate an unmeasured box either).
  await page.waitForFunction(
    () => (window as any).__card?._mapRegW > 4 && !!(window as any).__card.shadowRoot.querySelector("svg.map-vector"),
    null,
    { timeout: 10_000 }
  );
  await page.evaluate(async () => { await (window as any).__card.updateComplete; });
}

/** Screen point of the map image's own (fx, fy) fraction, as the BROWSER
 *  computes it: a probe box that copies the <img>'s resolved box and transform
 *  exactly, mounted as its sibling so it inherits the same ancestor chain
 *  (including `.avc-rot`), with a zero-size marker at the wanted fraction. */
function probe(page: Page, fx: number, fy: number): Promise<{ x: number; y: number }> {
  return page.evaluate(({ fx, fy }) => {
    const card = (window as any).__card;
    const img = card.shadowRoot.querySelector(".map-img") as HTMLElement;
    const cs = getComputedStyle(img);
    const box = document.createElement("div");
    box.style.position = "absolute";
    box.style.left = cs.left;
    box.style.top = cs.top;
    box.style.width = img.offsetWidth + "px";
    box.style.height = img.offsetHeight + "px";
    box.style.transformOrigin = cs.transformOrigin;
    box.style.transform = cs.transform;
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.left = fx * 100 + "%";
    dot.style.top = fy * 100 + "%";
    dot.style.width = "0";
    dot.style.height = "0";
    box.appendChild(dot);
    img.parentElement!.appendChild(box);
    const r = dot.getBoundingClientRect();
    box.remove();
    return { x: r.left, y: r.top };
  }, { fx, fy });
}

const ANGLES: Array<{ name: string; opts: MountOpts; deg: number }> = [
  { name: "upright (0°)", opts: {}, deg: 0 },
  { name: "rotated for fit (90°)", opts: { rotate: true }, deg: 90 },
  { name: "flipped (180°)", opts: { flip: true }, deg: 180 },
  { name: "rotated + flipped (270°)", opts: { rotate: true, flip: true }, deg: 270 },
];

// Spread across the image, deliberately off-centre and asymmetric in both axes:
// a point at the centre, or one mirrored about it, would survive a wrong angle.
const POINTS: Array<[number, number]> = [
  [0.25, 0.1],
  [0.8, 0.35],
  [0.5, 0.9],
];

test.describe("map click geometry under rotation (card 1.3.1)", () => {
  for (const { name, opts, deg } of ANGLES) {
    test(`${name}: the card knows its own rotation`, async ({ page }) => {
      await mountCard(page, opts);
      expect(await page.evaluate(() => (window as any).__card._mapRotationDeg())).toBe(deg);
    });

    test(`${name}: Pin & Go and Zone stay enabled`, async ({ page }) => {
      await mountCard(page, opts);
      const buttons = await page.evaluate(() =>
        Array.from((window as any).__card.shadowRoot.querySelectorAll(".mtbtn"))
          .filter((b: any) => /Pin & Go|Zone/.test(b.textContent))
          .map((b: any) => ({ label: b.textContent.trim(), disabled: b.disabled, title: b.title }))
      );
      expect(buttons.length).toBeGreaterThan(0);
      for (const b of buttons) {
        expect(b.disabled, `${b.label} disabled ("${b.title}")`).toBe(false);
      }
    });

    test(`${name}: a click maps back to the point it was aimed at`, async ({ page }) => {
      await mountCard(page, opts);
      for (const [fx, fy] of POINTS) {
        const pt = await probe(page, fx, fy);
        const got = await page.evaluate(
          ({ x, y }) => {
            const card = (window as any).__card;
            return card._clickToContent(card._config.vacuums[0], x, y);
          },
          pt
        );
        expect(got, `probe at ${fx * 100}%, ${fy * 100}% of the map image`).not.toBeNull();
        expect(got!.x).toBeCloseTo(fx * 100, 0);
        expect(got!.y).toBeCloseTo(fy * 100, 0);
      }
    });

    test(`${name}: a dragged zone box maps back to the rectangle drawn`, async ({ page }) => {
      await mountCard(page, opts);
      const [fx0, fy0] = [0.2, 0.15];
      const [fx1, fy1] = [0.7, 0.55];
      const a = await probe(page, fx0, fy0);
      const b = await probe(page, fx1, fy1);

      const zone = await page.evaluate(
        async ({ a, b }) => {
          const card = (window as any).__card;
          const vac = card._config.vacuums[0];
          // Arm zone mode so the click-catch layer mounts, then drive the real
          // handlers. Synthetic PointerEvents cannot be pointer-captured, so the
          // one call that needs a live pointer id is stubbed out — everything
          // else is the shipping code path.
          card._mapMode = "zone";
          card._modeEntity = vac.entity;
          await card.updateComplete;
          const cc = card.shadowRoot.querySelector(".map-clickcatch") as any;
          if (!cc) throw new Error("no .map-clickcatch");
          cc.setPointerCapture = () => {};
          const ev = (p: { x: number; y: number }) =>
            ({ currentTarget: cc, clientX: p.x, clientY: p.y, pointerId: 1 } as any);
          card._onZoneDown(vac, ev(a));
          card._onZoneMove(vac, ev(b));
          card._onZoneUp(vac, ev(b));
          await card.updateComplete;
          return card._zonePending?.[vac.entity] ?? null;
        },
        { a, b }
      );

      expect(zone).not.toBeNull();
      expect(zone!.x1).toBeCloseTo(fx0 * 100, 0);
      expect(zone!.y1).toBeCloseTo(fy0 * 100, 0);
      expect(zone!.x2).toBeCloseTo(fx1 * 100, 0);
      expect(zone!.y2).toBeCloseTo(fy1 * 100, 0);
    });
  }
});
