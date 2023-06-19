const { defineConfig } = require("cypress");

module.exports = defineConfig({

  //defaultCommandTimeout:100000,
  pageLoadTimeout: 100000,

  e2e: {

    setupNodeEvents(on, config) {
     
    },

    watchForFileChanges: false,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 10000,
    specPattern: 'cypress/integration/saucedemo/*.js'
  }

});