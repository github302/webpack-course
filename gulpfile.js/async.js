const { src, dest } = require('gulp');
const { EventEmitter } = require('events');
const { exec } = require('child_process');

function streamTask() {
    return src('*.js')
        .pipe(dest('dist'));
}

// promise task
function promiseTask() {
    return Promise.resolve('the value is ignored');
}

function eventEmitterTask() {
    const emitter = new EventEmitter();
    setTimeout(() => emitter.emit('finish'), 250);
    return emitter;
}


function childProcessTask() {
    return exec('date');
}

module.exports = {
    streamTask,
    promiseTask,
    eventEmitterTask,
    childProcessTask,
};
