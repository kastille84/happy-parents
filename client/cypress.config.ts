import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.baseUrl = 'http://localhost:3000';
      config.specPattern = 'cypress/integration/**/*.{js,jsx,ts,tsx}';
      config.excludeSpecPattern = ['**/1-getting-started/*', '**/2-advanced-examples/*'];
      config.video = false;
      config.retries = {
        "runMode": 2, // for when running on the cli
        "openMode": 1 // for when you have the cypress app open
      };
      config.viewportHeight = 1080;
      config.viewportWidth = 1920;
      return config;
    },
  },
});
