
var args = require('yargs').argv,
    path = require('path'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    PluginError = $.util.PluginError,
    del = require('del');

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
    app: 'app/',
    scripts: 'src/'
}

var app = {
  name: require('./bower.json').name || require('./package.json').name || 'app',
  dist: 'dist'
}

// SOURCES CONFIG
var source = {
    scripts: [paths.scripts + 'core.module.js',
        paths.scripts + '**/*.module.js',
        paths.scripts + '**/*.js'
    ]
};

// BUILD TARGET CONFIG
var build = {
    scripts: paths.dist
};

// PLUGINS OPTIONS

var prettifyOpts = {
    indent_char: ' ',
    indent_size: 3,
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
};

var vendorUglifyOpts = {
};

//---------------
// TASKS
//---------------

// JS APP
gulp.task('scripts:core', function() {
    log('Building scripts..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat(app.name + '.js'))
        .pipe(gulp.dest(app.dist))
        .pipe($.rename(app.name + '.min.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.uglify().on('error', handleError))
        .pipe($.if(useSourceMaps, $.sourcemaps.write('./')))
        .on('error', handleError)
        .pipe(gulp.dest(app.dist));
});


//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
    log('Watching source files..');

    gulp.watch(source.scripts, ['scripts:core']);

});

// lint javascript
gulp.task('lint', function() {
    return gulp
        .src(source.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

// Remove all files from the build paths
gulp.task('clean', function(done) {
    var delconfig = [].concat(
        app.dist
    );

    log('Cleaning: ' + $.util.colors.blue(delconfig.join(', ')));
    // force: clean files outside current directory
    del(delconfig, {
        force: true
    }, done);
});

//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task('build', gulpsync.sync([
    'prod',
    'scripts:core'
]));

gulp.task('prod', function() {
    log('Starting production build...');
    isProduction = true;
});

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function() {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'scripts:core'
]));


/////////////////////

function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}