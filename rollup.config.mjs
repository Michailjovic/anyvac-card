import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

/**
 * The bundle shipped unminified until 1.1.0, which cost roughly half the
 * download on every dashboard load. Measured on the 1.1.0 source:
 *
 *   unminified          486.3 KiB raw / 133.7 KiB gzip
 *   minified            252.5 KiB raw /  66.3 KiB gzip
 *   minified + names    254.2 KiB raw /  66.6 KiB gzip   <- what we ship
 *
 * No source map, on purpose: HACS installs only `anyvac-card.js` (see
 * hacs.json / release.yml), so a `sourceMappingURL` would point at a file that
 * is never installed — a guaranteed 404 in every user's devtools. Instead
 * `keep_fnames`/`keep_classnames` buys back readable stack traces for 0.3 KiB
 * gzipped, which matters because field reports on this card routinely arrive
 * as a pasted console trace.
 *
 * Property mangling stays off (terser's default), so the HA-facing surface —
 * `setConfig`, `getCardSize`, `hass`, `@state` fields read live from the
 * console during field diagnosis — keeps its names too.
 */
export default {
  input: "src/index.ts",
  output: {
    file: "dist/anyvac-card.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript({
      declaration: false,
      sourceMap: false,
    }),
    terser({
      keep_fnames: true,
      keep_classnames: true,
      format: {
        preamble: "/* AnyVac Card — https://github.com/Michailjovic/anyvac-card */",
      },
    }),
  ],
};
