exports.config = {
  tests: './test/feature/**/*.e2e.js',
  timeout: 10000,
  output: './.codeceptoutput',
  helpers: {
    WebDriverIO: {
  // url: 'http://localhost:3000',
     url: 'https://dev.reboot.otro.com',
      browser: 'chrome',

      waitForTimeout: 10000,
      desiredCapabilities: {
        chromeOptions: {
     // args: [ '--headless','--disable-gpu', '--window-size=1280,800'],
        args: ['--disable-gpu', '--window-size=1280,1200'],
        },
      },
    },
    FacebookUserHelper: {
      require: './test/feature/FacebookUserHelper.js',
    },
  },
  include: {
    I: './test/feature/codeceptCustomSteps.js',
  },
  bootstrap: false,
  mocha: {},
  name: 'web',
};