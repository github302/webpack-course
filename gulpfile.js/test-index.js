const gulp = require('gulp');
const {
    streamTask,
    promiseTask,
    eventEmitterTask,
    childProcessTask,
} = require('./async');
const {
    clean,
    build,
    cssTranspile,
    cssMinify,
    jsTranspile,
    jsBundle,
    jsMinify,
    publish,
} = require('./demo');

const { series, parallel } = gulp;

// gulp.task是过去编写task的方式
// 新的方式是定义一个方法，并将方法注册在exports上，必须使用exports.的方式注册任务，这样才能在命令行gulp build执行任务，
// 并且可以用gulp --task查看当前文件下gulp的所有任务
exports.build = build;
exports.clean = clean;

// series 按顺序执行任务
// exports.default = series(clean, build);

// parallel 并发执行，同时执行
exports.default = parallel(clean, build);

// series 和 parallel可以互相嵌套
exports.combine = series(
    clean,
    parallel(
        cssTranspile,
        series(jsTranspile, jsBundle),
    ),
    parallel(cssMinify, jsMinify),
    publish,
);

exports.async = parallel(streamTask, promiseTask, eventEmitterTask, childProcessTask);
