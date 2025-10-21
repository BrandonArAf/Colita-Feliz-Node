export default function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [ 
      { pattern: 'test-simple.js', watched: false }
    ],
    preprocessors: {},
    reporters: ['progress'],
    browsers: ['Chrome', 'ChromeHeadless'],
    singleRun: false,
  });
}
