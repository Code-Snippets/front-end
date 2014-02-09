/**
 * Code Snippets - Gulp Task Manager
 * Author: Mihai Ionut Vilcu
 * Feb 2014
 */

// dependencies
var gulp     = require('gulp'),
    express  = require('express'),
    sass     = require('gulp-ruby-sass'),
    prefixer = require('gulp-autoprefixer'),
    filter   = require('gulp-filter'),
    lr       = require('tiny-lr')();


// settings
var assets = './assets',
    sass_dir = assets + '/scss',
    css_dir = assets + '/css',
    js_dir = assets + '/js',
    EXPRESS_PORT = 8080,
    LIVERELOAD_PORT = 35729,
    EXPRESS_ROOT = __dirname;


// compile sass
gulp.task('sass', function () {
return gulp.src(sass_dir + '/**/*.{scss,sass}')
           .pipe(sass({ style : 'expanded' })).on('error', function(e){console.log('\x07',e.message);})
           .pipe(filter('**/*.css'))
           .pipe(prefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
           .pipe(gulp.dest(css_dir));
});








// the development task
gulp.task('default', ['sass'], function() {
    // start up the server
    startExpress(EXPRESS_PORT, EXPRESS_ROOT);
    startLiveReload(LIVERELOAD_PORT);

    // watch for sass files
    gulp.watch(sass_dir + '/*.{scss,sass}', ['sass']);

    // livereload the necesary files
    gulp.watch(css_dir + '/**/*.css', notifyLivereload);
    gulp.watch(js_dir + '/**/*.js', notifyLivereload);
    gulp.watch('index.html', notifyLivereload);
});


// the build task
gulp.task('build', ['sass']);

// helper functions
function startExpress(port, root) {
    var app = express();

    port = port || 8080;
    root = root || __dirname;

    app.use(require('connect-livereload')());
    app.use(express.static(root));
    app.listen(port);
}

function startLiveReload(port) {
    port = port || 35729;
    lr.listen(port);
}

// Notifies livereload of changes detected
// by `gulp.watch()`
function notifyLivereload(event) {
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);

  lr.changed({
    body: {
      files: [fileName]
    }
  });
}
