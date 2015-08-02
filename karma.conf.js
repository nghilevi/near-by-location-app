module.exports = function(config) {
  config.set({


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery','jasmine'],
    // list of files / patterns to load in the browser
    files: [
      //'bower_components/angular/angular.js',
      //'bower_components/angular-mocks/angular-mocks.js',
      //'bower_components/angular-route/angular-route.js',
      //'bower_components/angular-animate/angular-animate.js',
      //'bower_components/angularjs-geolocation/src/geolocation.js',

      //
      //'src/scripts/**/*.js',
      //'test/unit/**/*.js',

      //'bower_components/jquery/dist/jquery.js', //important for jasmine-jquery to run
      //'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'test/lab/spec/**/*.js' //TODO remove this
    ],

    // list of files to exclude
    exclude: [
      'src/scripts/services-old.js',
      'test/unit/fSBaseUrlSpec.js',
      'test/unit/searchServiceSpec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/scripts/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage','progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine-jquery'
    ],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

