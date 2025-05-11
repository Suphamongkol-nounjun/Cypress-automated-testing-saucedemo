const { defineConfig } = require('cypress');
const { updateTestResult } = require('./cypress/utils/updateGoogleSheet');

module.exports = defineConfig({
  e2e: {
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