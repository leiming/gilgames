'use strict';

module.exports = function (karma) {
  karma.set({

    frameworks: ['jasmine', 'browserify'],

    files: [
      'src/**/*.js',
      'test/**/*Spec.js'
    ],

    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*Spec.js': ['browserify']
    },

    browsers: ['Chrome'],

    logLevel: 'LOG_DEBUG',

    //singleRun: true,
    autoWatch: true,

    // browserify configuration
    browserify: {
      //debug    : true,
      transform: ['brfs', 'browserify-shim']
    }
  });
};
