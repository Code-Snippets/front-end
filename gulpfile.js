/**
 * Code Snippets - Gulp Task Manager
 * Author: Mihai Ionut Vilcu
 * Feb 2014
 */

// dependencies
var gulp     = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// settings
var assets = './assets',
    sass_dir = assets + '/scss',
    css_dir = assets + '/css',
    js_dir = assets + '/js';

// compile sass
gulp.task('sass', function () {
return gulp.src(sass_dir + '/**/*.{scss,sass}')
           .pipe($.rubySass({ style : 'expanded' })).on('error', function(e){console.log('\x07',e.message);})
           .pipe($.filter('**/*.css'))
           .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
           .pipe(gulp.dest(css_dir))
           .pipe($.connect.reload());
});


// Connect
gulp.task('connect', $.connect.server({
    root: __dirname,
    port: 9000,
    livereload: true,
    open: {
      browser: 'chrome' // if not working OS X browser: 'Google Chrome'
    }
}));
gulp.task('reload', function () {
  return gulp.src([js_dir + '/**/*.js', 'index.html'])
             .pipe($.connect.reload());
});

// the development task
gulp.task('default', ['sass', 'connect'], function() {

    // watch for sass files
    gulp.watch(sass_dir + '/*.{scss,sass}', ['sass']);

    // livereload the necesary files
    gulp.watch([js_dir + '/**/*.js', 'index.html'], ['reload']);
});


// the build task
gulp.task('build', ['sass']);
