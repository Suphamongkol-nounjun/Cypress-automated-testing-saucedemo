const { defineConfig } = require('cypress');
const { updateTestResult } = require('./cypress/utils/updateGoogleSheet');

module.exports = defineConfig({
  projectId: "zb7opy",
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      on('task', {
        async updateTestResult({ testCaseId, status }) {
          await updateTestResult(testCaseId, status);
          return null;
        }
      });
    },
  },
});