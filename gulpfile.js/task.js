const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const src = path.join(__dirname, 'packages');
const isProduction = process.env.NODE_ENV === 'production';
const dist = path.join(__dirname, isProduction ? 'dist' : 'example/dist');
const ext = ['json', 'wxml', 'wxs'];

function copy(fileExt) {
    return gulp.src([`${src}/**/*.${fileExt}`].pipe(gulp.dest(dist)));
}

gulp.task('compile-scss', () => gulp
    .src([`${src}/**/*.scss`])
    .pipe(sass())
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(
        rename((file) => {
            file.extname = '.wxss';
        }),
    )
    .pipe(gulp.dest(dist)));

function srciptsPipe(pipe) {
    return pipe
        .pipe(babel({
            presets: ['stage-0', 'es2015'],
            plugins: ['array-includes'],
        }));
}
// 编译 JS 文件
// gulp.task('compile-js', () => srciptsPipe(gulp.src([`${src}/**/*.js`]))
//     .pipe(gulp.dest(dist)));

gulp.task('compile-wxs', () => copy('wxs'));
gulp.task('compile-json', () => copy('json'));
gulp.task('compile-wxml', () => copy('wxml'));
// gulp.task('build', ext.map((fileExt) => `compile-${fileExt}`));
// gulp.task('build', gulp.series('compile-js', 'compile-scss', 'compile-wxs', 'compile-json', 'compile-wxml'), (done) => {
//     console.log('done', done);
// });

// if (!isProduction) {
//     ext.forEach((fileExt) => {
//         gulp.watch(`${src}/**/*.${fileExt}`, [`compile-${fileExt}`]);
//     });
// }
