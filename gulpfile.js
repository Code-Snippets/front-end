/**
 * Code Snippets - Gulp Task Manager
 * Author: Mihai Ionut Vilcu
 * Feb 2014
 */

// dependencies
var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// settings
var dev_dir = 'src',
    dev_sass = dev_dir + '/assets/scss',
    dev_js = dev_dir + '/assets/js',
    app_dir = 'app',
    app_js = app_dir + '/assets/js',
    app_css = app_dir + '/assets/css';

// compile sass
gulp.task('sass', function () {
return gulp.src(dev_sass + '/**/*.{scss,sass}')
           .pipe($.rubySass({ style : 'expanded' })).on('error', function(e){console.log('\x07',e.message);})
           .pipe($.filter('**/*.css'))
           .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
           .pipe(gulp.dest(app_css))
           .pipe($.connect.reload());
});

// copy files to the app folder
gulp.task('copy', function () {
  // anything but the files we compil
  return gulp.src([ dev_dir + '/**/*.*', '!'+ dev_dir +'/**/*.{js,scss,sass}' ])
             .pipe(gulp.dest(app_dir))
             .pipe($.connect.reload());
});

// Join js files
gulp.task('concat', function () {
  return gulp.src([dev_js + '/**/*.js'])
             .pipe($.debug())
             .pipe($.concat("app.js"))
             .pipe(gulp.dest(app_js))
             .pipe($.connect.reload());
});

// Connect to the server
gulp.task('connect', $.connect.server({
    root: __dirname,
    port: 9000,
    livereload: true,
    open: {
      browser: 'chrome' // if not working OS X browser: 'Google Chrome'
    }
}));


// the development task
gulp.task('default', ['sass', 'copy', 'concat', 'connect'], function() {

    // watch for sass files
    gulp.watch(dev_sass + '/**/*.{scss,sass}', ['sass']);

    // watch for js files
    gulp.watch(dev_js + '/**/*.js', ['concat']);

    // keep an eye on the index page also
    gulp.watch('index.html', function() {
      gulp.src('index.html').pipe($.connect.reload());
    });

    // watch for other files and copy them
    gulp.watch([dev_dir + '/**/*.*', '!'+ dev_dir +'/**/*.{js,scss,sass}'], ['copy']);

});


// the build task
gulp.task('build', ['sass', 'copy', 'concat']);
