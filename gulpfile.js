"use strict";

var gulp = require('gulp')
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var karma = require('karma').server
var plugins = require('gulp-load-plugins')()

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)
})

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done)
})

/**
 * Browserify the index.js to bundle.js
 */
gulp.task('browserify', function () {
  var bundleStream = browserify('./index.js').bundle()

  bundleStream
    .pipe(source('index.js'))
    .pipe(plugins.plumber())
    .pipe(plugins.rename('bundle.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['tdd']);"use strict";

