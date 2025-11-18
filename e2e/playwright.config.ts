import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
