'use strict'

var browserify = require('browserify')
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')
var nodemon = require('gulp-nodemon')
var standard = require('gulp-standard')
var less = require('gulp-less')
var babelify = require('babelify')
var cleanCSS = require('gulp-clean-css')
var stringify = require('stringify')
var lesshint = require('gulp-lesshint')

gulp.task('browserify-dev', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './client/index.js',
    debug: true
  })
  .transform(stringify, {
    appliesTo: { includeExtensions: ['.hjs', '.html', '.whatever'] }
  })
  .add('./client/index.js')

  return b.transform('browserify-css', { autoInject: true })
    .transform(babelify.configure({
      extensions: ['es6']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('client/dist'))
})

gulp.task('browserify', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './client/index.js',
    debug: true
  })

  return b.transform('browserify-css', { autoInject: true })
    .transform(babelify())
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('client'))
})

gulp.task('jslint', function () {
  return gulp.src(['./client/**/*.js', '!./client/dist/*'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('lesslint', function () {
  return gulp.src('./client/css/*.less')
        .pipe(lesshint({
          failOnWarning: true
        }))
        .pipe(lesshint.reporter())
})

gulp.task('lint', ['jslint', 'lesslint'])

gulp.task('less', function () {
  return gulp.src(['./client/css/styles.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/css/'))
})

gulp.task('default', function () {
  nodemon({
    script: 'server/index.js',
    ext: 'js html less',
    env: { 'NODE_ENV': 'development' },
    tasks: ['browserify-dev', 'less'],
    ignore: ['client/dist/bundle.js']
  })
})

gulp.task('run', function () {
  nodemon({
    script: 'server/index.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'production' },
    tasks: ['browserify'],
    ignore: ['client/bundle.js']
  })
})
