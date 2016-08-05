var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var babelify = require('babelify')
var stringify = require('stringify')
var nodemon = require('gulp-nodemon')
var standard = require('gulp-standard')
var less = require('gulp-less')
var cleanCSS = require('gulp-clean-css')
var lesshint = require('gulp-lesshint')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

function compile (isProd) {
  var bundler = browserify('./client/index.js', { debug: true })
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] },
      minify: isProd
    })
    .transform('browserify-css', {
      autoInject: true,
      minify: isProd
    })
    .transform(babelify, {
      presets: ['es2015']
    })

  function rebundle () {
    return bundler.bundle()
      .on('error', function (err) {
        console.error(err)
        this.emit('end')
      })
      .pipe(source('bundle.js'))
  }

  var intermediate = rebundle()
  if (isProd) {
    return intermediate
      .pipe(ngAnnotate())
      .pipe(buffer())
      .pipe(rename('bundle.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./client/dist'))
  } else {
    return intermediate
      .pipe(gulp.dest('./client/dist'))
  }
}

gulp.task('build', function () {
  return compile()
})

gulp.task('compile-prod', function () {
  return compile(true)
})

gulp.task('jslint', function () {
  return gulp.src(['./**/*.js', '!/**/*.min.js', '!./client/dist/*', '!./node_modules/**/*'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('lesslint', function () {
  return gulp.src('./client/css/*.less')
    .pipe(lesshint())
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
    tasks: ['build'],
    ignore: ['client/dist/bundle.js']
  })
})

// gulp.task('browserify', function () {
//   // set up the browserify instance on a task basis
//   var b = browserify({
//     entries: './client/index.js',
//     debug: true
//   })

//   return b.transform('browserify-css', { autoInject: true })
//     .transform(babelify())
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(uglify())
//     .on('error', gutil.log)
//     .pipe(gulp.dest('client'))
// })
