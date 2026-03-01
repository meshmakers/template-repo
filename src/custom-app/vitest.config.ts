import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
          launch: {
            headless: true,
          },
        },
      ],
      screenshotFailures: false,
    },
  },
});
