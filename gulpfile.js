var gulp = require('gulp'),
  pkg = require('./package.json'),
  $ = require('gulp-load-plugins')(),
  colors = require('ansi-colors'),
  log = require('fancy-log'),
  del = require('del');

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;

var headerTemplate = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>)',
  ' * @link <%= pkg.author.url %>',
  ' * @maintainers',
  ' * <%for(var i in pkg.maintainers){%> <%=pkg.maintainers[i].name%> <<%-pkg.maintainers[i].email%>> (<%-pkg.maintainers[i].url%>)<%}%>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

var uglifyOptions = {
  output: {
    comments: 'some'
  }
}

// MAIN PATHS
var paths = {
  app: 'app/',
  scripts: 'src/'
}

var app = {
  name: pkg.name || 'app',
  dist: 'dist'
}

// SOURCES CONFIG
var source = {
  scripts: [paths.scripts + 'core.module.js',
    paths.scripts + '**/*.module.js',
    paths.scripts + '**/*.constant.js',
    paths.scripts + '**/*.provider.js',
    paths.scripts + '**/*.factory.js',
    paths.scripts + '**/*.service.js',
    paths.scripts + '**/*.filter.js',
    paths.scripts + '**/*.js'
  ]
};

//---------------
// TASKS
//---------------

// JS APP
gulp.task('scripts:core', function() {
  info('Building scripts..');
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(source.scripts)
    .pipe($.jsvalidate())
    .on('error', handleError)
    .pipe($.if(useSourceMaps, $.sourcemaps.init()))
    .pipe($.concat(app.name + '.js'))
    .pipe($.header(headerTemplate, {
      pkg: pkg
    }))
    .pipe(gulp.dest(app.dist))
    .pipe($.rename(app.name + '.min.js'))
    .pipe($.ngAnnotate())
    .on('error', handleError)
    .pipe($.uglify(uglifyOptions).on('error', handleError))
    .pipe($.if(useSourceMaps, $.sourcemaps.write('./')))
    .on('error', handleError)
    .pipe(gulp.dest(app.dist));
});


//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
  info('Watching source files..');

  gulp.watch(source.scripts, gulp.series('scripts:core'));

  startEditingMessage();
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

  info('Cleaning: ' + colors.blue(delconfig.join(', ')));
  // force: clean files outside current directory
  return del(delconfig, {
    force: true
  }, done);
});

//---------------
// MAIN TASKS
//---------------

gulp.task('prod', function(done) {
  info('Starting production build...');
  isProduction = true;
  done();
});

// build for production (minify)
gulp.task('build', gulp.series(
  'lint',
  'prod',
  'scripts:core', function (done) {
    done();
  }));

// default (no minify)
gulp.task('default', gulp.series('build', function (done) {
  done();
}));

gulp.task('usesources', function(done) {
  useSourceMaps = true;
  done();
});

// build with sourcemaps (no minify)
gulp.task('sourcemaps', gulp.series('usesources', 'default', function (done) {
  done();
}));


/////////////////////

function startEditingMessage() {
  info('************');
  info('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
  info('************');
}

// Error handler
function handleError(err) {
  error(err.toString());
  this.emit('end');
}

function error(msg) {
  log.error(colors.red.bold(msg));
}

// log to console using
function info(msg) {
  log.info(colors.blue.bold(msg));
}