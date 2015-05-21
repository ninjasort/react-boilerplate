/**
 * Gulp
 */
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify   = require('watchify');
var babelify   = require('babelify');
var server     = require('gulp-webserver');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var rename     = require('gulp-rename');
var babel      = require('gulp-babel');
var uglify     = require('gulp-uglify');
var jshint     = require('gulp-jshint');

var componentName = 'component';
var config = {
    stylesWatch: './src/styles/**/*.scss',
    stylesEntry: './src/styles/' + componentName + '.scss',
    componentWatch: './src/**/*.{jsx, js}',
    componentEntry: './src/' + componentName + '.jsx',
    assetsSrc: './src/assets/**/*',
    assetsDest: './dist/assets',
    bundleEntry: './src/app.jsx'
};

/**
 * Lint JS
 */
gulp.task('lint', function () {
  return gulp.src([
      config.componentEntry,
      config.bundleEntry
    ])
    .pipe(babel())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Assets
 */
gulp.task('assets', function () {
  return gulp.src(config.assetsSrc)
    .pipe(gulp.dest(config.assetsDest));
});

/**
 * Styles
 */
gulp.task('styles', function () {
  return gulp.src(config.stylesEntry)
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Styles Dist
 */
gulp.task('build:styles', function () {
  return gulp.src(config.stylesEntry)
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'compressed'
    }))
    .pipe(rename(componentName + '.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Build node module
 */
gulp.task('build:npm', function () {
  return gulp.src(config.componentEntry)
    .pipe(babel())
    .pipe(rename(componentName + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename(componentName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 * Default
 */
gulp.task('default', ['lint', 'styles', 'assets'], function () {
  var w = watchify(
        browserify(config.bundleEntry, {extensions: '.jsx'})
      );
    w.transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.log(err.fileName, err.lineNumber, err.description);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

/**
 * Watch
 */
gulp.task('watch', ['default'], function () {
  gulp.watch([config.stylesWatch, config.componentWatch], ['dist']);
  return gulp.src('.').pipe(server());
});

/**
 * Dist
 */
gulp.task('dist', ['default', 'build:styles', 'build:npm']);
