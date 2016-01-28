'use strict';

var gulp       = require('gulp');
var $          = require('gulp-load-plugins')();
var sync       = $.sync(gulp).sync;
var del        = require('del');
var browserify = require('browserify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var path       = require('path');

require('harmonize')();

var bundler = {
  w: null,
  init: function() {
    this.w = watchify(browserify({
      entries: ['./app/scripts/app.js'],
      insertGlobals: true,
      cache: {},
      packageCache: {}
    }));
  },
  bundle: function() {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('site.js'))
      .pipe(gulp.dest('app/scripts'));
  },
  watch: function() {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function() {
    this.w && this.w.close();
  }
};

gulp.task('styles', function() {
  return $.rubySass('app/styles/main.scss', {
      style: 'expanded',
      precision: 10,
      loadPath: ['bower_components']
    })
    .on('error', $.util.log.bind($.util, 'Sass Error'))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size());
});

gulp.task('scripts', function() {
  bundler.init();
  return bundler.bundle();
});

gulp.task('serve', function() {
  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      port: 9000,
      path: 'app/',
      directoryListing: true,
      open: true
    }));
});

gulp.task('set-production', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('minify:js', function() {
  return gulp.src('app/scripts/site.js')
    .pipe($.uglify())
    .pipe(source('site.min.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe($.size());
});

gulp.task('minify:css', function() {
  return gulp.src('app/styles/main.css')
    .pipe($.minifyCss())
    .pipe(source('main.min.css'))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size());
});

gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('bundle', ['styles', 'scripts']);

gulp.task('clean-bundle', sync(['clean', 'bundle']));

gulp.task('build', ['clean-bundle'], bundler.stop.bind(bundler));

gulp.task('build:production', sync(['set-production', 'build', 'minify']));

gulp.task('serve:production', sync(['build:production', 'serve']));

gulp.task('default', ['build']);

gulp.task('watch', sync(['bundle', 'serve']), function() {
  bundler.watch();
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
});
