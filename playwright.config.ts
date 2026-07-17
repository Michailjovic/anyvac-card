import { defineConfig } from "@playwright/test";

// docs/21 §5e — layout hardening regression harness. Narrow, targeted scope:
// geometric behavior around edit-mode reparenting, backgrounded-tab measuring,
// and profile picking (tests/layout.spec.ts), not general card coverage.
export default defineConfig({
  testDir: "./tests",
  testMatch: /.*\.spec\.ts/,
  timeout: 15_000,
  fullyParallel: true,
  reporter: "list",
  webServer: {
    command: "node tests/harness/server.mjs",
    port: 8899,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:8899",
  },
});
