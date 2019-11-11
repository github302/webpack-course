function clean(cb) {
    console.log('clean');
    cb();
}
function build(cb) {
    console.log('build');
    cb();
}
function cssTranspile(cb) {
    // body omitted
    cb();
}

function cssMinify(cb) {
    // body omitted
    cb();
}

function jsTranspile(cb) {
    // body omitted
    cb();
}

function jsBundle(cb) {
    // body omitted
    cb();
}

function jsMinify(cb) {
    // body omitted
    cb();
}

function publish(cb) {
    // body omitted
    cb();
}

module.exports = {
    clean,
    build,
    cssTranspile,
    cssMinify,
    jsTranspile,
    jsBundle,
    jsMinify,
    publish,
};
