const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const del = require('delete');

const { series, parallel } = gulp;
const src = path.join(__dirname, '../packages');
const isProduction = process.env.NODE_ENV === 'production';
const dist = path.join(__dirname, isProduction ? '../dist' : '../example/dist');
const ext = ['js', 'scss', 'json', 'wxml', 'wxs'];

function clean() {
    return del(['./dist/**']);
}

function copy(fileExt) {
    return gulp.src(`${src}/**/*.${fileExt}`).pipe(gulp.dest(dist));
}

function scss() {
    return (
        gulp
            .src([`${src}/**/*.scss`])
            .pipe(sass())
            .pipe(postcss())
            .pipe(cssmin())
            .pipe(
                rename((file) => {
                    file.extname = '.wxss';
                }),
            )
            .pipe(gulp.dest(dist))
    );
}

function js() {
    return (
        gulp
            .src([`${src}/**/*.js`])
            .pipe(babel())
            .pipe(gulp.dest(dist))
    );
}

function wxs() {
    return copy('wxs');
}
function json() {
    return copy('json');
}
function wxml() {
    return copy('wxml');
}

function watchTask(fileExt) {
    gulp.watch(`${src}/**/*.${fileExt}`, fileExt).on('change', (file) => {
        console.log('File has changed:', fileExt);
    });
}
function watch() {
    // watchTask(json);
    // watchTask(js);
    // watchTask(wxml);
    // watchTask(scss);
    // watchTask(wxs);
}


exports.scss = scss;
exports.js = js;
exports.wxs = wxs;
exports.json = json;
exports.wxml = wxml;
exports.clean = clean;
exports.watch = watch;
exports.dev = series(clean, parallel(json, js, wxml, scss, wxs));
exports.build = series(clean, parallel(json, js, wxml, scss, wxs));
