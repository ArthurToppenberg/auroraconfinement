import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 3,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'firefox',
    locale: 'en-GB',
    colorScheme: 'dark',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --hostname 127.0.0.1',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
