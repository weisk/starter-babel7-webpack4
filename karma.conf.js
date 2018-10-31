'use strict';

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],

    files: [
      { pattern: 'src/test.js' }
    ],

    preprocessors: {
      'src/test.js': ['webpack']
    },

    webpack: {
      mode: 'development'
    },

    reporters: ['dots'],

    browsers: ['ChromiumHeadless'],
    customLaunchers: {
      "ChromiumHeadless": {
        base: "Chromium",
        flags: [
          "--headless",
          " --remote-debugging-port=9222",
          // https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          "--disable-gpu",
        ],
      },
    }
  });
};
