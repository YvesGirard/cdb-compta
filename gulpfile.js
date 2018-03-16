/**
 * Module Dependencies
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
//var config = require('./bs-config.json');
var config = require('./bs-config');
/**
 * Gulp Tasks
 */


gulp.task('browser-sync', ['nodemon'], function() {
  console.log(config);
  var cb = cb || function noop() { };

  browserSync.init(null,config);
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'src/server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
 // gulp.watch(['public/*.html'], reload);
  
});