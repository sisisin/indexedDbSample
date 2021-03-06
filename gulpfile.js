'use strict'

const gulp = require('gulp');
const babel = require('gulp-babel');
const watchify = require('gulp-watchify');

const jsPath = ['src/**.js'];
gulp.task('build', ['build:js']);
gulp.task('build:js'
  , () => gulp.src(jsPath, { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('_tmp')));

let watching = false;
gulp.task('enable-watch-mode', () => watching = true);

gulp.task('browserify', watchify((watchify) => {
  return gulp.src('_tmp/index.js')
    .pipe(watchify({ watch: watching }))
    .pipe(gulp.dest(''));
}));

gulp.task('watchify', ['enable-watch-mode', 'browserify']);

gulp.task('watch', ['build', 'enable-watch-mode', 'watchify'], () => {
  return gulp.watch(jsPath, ['build:js']);
});

gulp.task('default', ['build']);
