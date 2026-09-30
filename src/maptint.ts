/**
 * maptint.ts — docs/44 F7 (V3): the Seat tool shows each vacuum's raw map
 * tinted into that vacuum's own colour on a neutral canvas, instead of the
 * vendor's saturated background and per-room colours — so it's obvious
 * which map is being aligned onto what.
 *
 * Tried live against real Roborock maps (HA 2026.9.4, three robots) before
 * building it: an SVG colour-matrix filter tints the (opaque) background
 * too, so the map became a big coloured rectangle; pixel recolouring with
 * the background keyed out reads well — rooms stay distinguishable by
 * luminance, walls stay dark. ~80–140 ms for a ~1200×2100 px map, once per
 * map image, and only while the Visual editor is open.
 */

export type Rgb = readonly [number, number, number];

/** "#rrggbb" → [r, g, b]; anything else → null. */
export function hexToRgb(hex: string | undefined): Rgb | null {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec((hex ?? "").trim());
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

/**
 * The map's background colour: the most common of the four corner pixels
 * (a vendor map is drawn on a uniform background; a room can touch at most
 * a corner or two). RGBA data, row-major.
 */
export function cornerBackground(data: ArrayLike<number>, w: number, h: number): Rgb {
  const at = (x: number, y: number): Rgb => {
    const i = (y * w + x) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const corners = [at(0, 0), at(w - 1, 0), at(0, h - 1), at(w - 1, h - 1)];
  let best = corners[0], bestN = 0;
  for (const c of corners) {
    const n = corners.filter((d) => d[0] === c[0] && d[1] === c[1] && d[2] === c[2]).length;
    if (n > bestN) { best = c; bestN = n; }
  }
  return best;
}

/**
 * In place: background-coloured (within `tol`, L1 distance) and
 * near-transparent pixels become fully transparent; every other pixel takes
 * `rgb` scaled by its own luminance (0.35…1.25×), which keeps room edges,
 * walls and furniture readable in a single hue.
 */
export function tintPixels(data: Uint8ClampedArray, bg: Rgb, rgb: Rgb, tol = 24): void {
  for (let i = 0; i < data.length; i += 4) {
    const d = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
    if (d < tol || data[i + 3] < 10) { data[i + 3] = 0; continue; }
    const k = 0.35 + 0.9 * ((0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]) / 255);
    data[i] = Math.min(255, rgb[0] * k);
    data[i + 1] = Math.min(255, rgb[1] * k);
    data[i + 2] = Math.min(255, rgb[2] * k);
  }
}

/** Load `url`, tint it, return an object URL — or null when the image
 *  can't be read back (e.g. a cross-origin map without CORS). */
export async function tintMapImage(url: string, hex: string): Promise<string | null> {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    await img.decode();
    const w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) return null;
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const g = canvas.getContext("2d", { willReadFrequently: true });
    if (!g) return null;
    g.drawImage(img, 0, 0);
    const px = g.getImageData(0, 0, w, h);
    tintPixels(px.data, cornerBackground(px.data, w, h), rgb);
    g.putImageData(px, 0, 0);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
    return blob ? URL.createObjectURL(blob) : null;
  } catch {
    return null;
  }
}
