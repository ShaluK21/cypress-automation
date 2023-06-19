// plugins/index.js
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
};

const fs = require('fs');

module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    // Read the environment variables from cypress.env.json
    const envConfig = fs.readFileSync('cypress.env.json');
    const envVariables = JSON.parse(envConfig);

    // Set the environment variables in launchOptions
    if (browser.family === 'chromium') {
      launchOptions.env = {
        ...launchOptions.env,
        ...envVariables,
      };
    }

    return launchOptions;
  });

  return config;
};
