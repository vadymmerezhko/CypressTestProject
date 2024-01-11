const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,

  e2e: {
    experimentalStudio: true,
    "viewportWidth": 1280,
    "viewportHeight": 800,
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    baseUrl: "https://magento.softwaretestingboard.com",
    video: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        getClipboard: () => {
          return cy.window().then((win) => {
            return win.navigator.clipboard.readText();
          });
        },
      });
    },
  },
});