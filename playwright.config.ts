
import dotenv = require('dotenv');
dotenv.config();

const config = {
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  globalSetup: require.resolve('./global-setup'),
  use: {
    browserName: 'chromium',
    channel: 'chrome',
    video: 'on',
    headless: false,
    viewport: null,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
};

module.exports = config;
