import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
const src = readFileSync("src/anyvac-card.ts", "utf8");
const cst = readFileSync("src/const.ts", "utf8");
test("F2: one vocabulary for start/cancel in both orientations", () => {
  expect(src).not.toContain("Hold to start");
  expect(src).not.toContain("CANCEL · hold");
  expect(src).not.toContain("START ·");
  expect((src.match(/Cancel · hold/g) || []).length).toBeGreaterThanOrEqual(2);
  expect(src).toMatch(/\.start-bar--cancel \{\s*background: rgba\(var\(--avc-err-rgb\)/);
});
test("F3: default palette avoids the status colours", () => {
  const m = cst.match(/DEFAULT_VACUUM_PALETTE: string\[\] = \[([\s\S]*?)\];/)![1];
  for (const c of ["#52c41a", "#2196F3", "#faad14"]) expect(m.toLowerCase()).not.toContain(c.toLowerCase());
});
