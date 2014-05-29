'use strict';
// Generated on 2014-03-21 using generator-browserify 0.2.2

var path = require('path'),
    gulp = require('gulp'),
    bower = 'app/bower_components',
    config = require(path.resolve(__dirname, 'package')).devConfig;

// Load plugins
var $ = require('gulp-load-plugins')();

// Styles
gulp.task('styles', function () {
    return gulp.src('app/less/app.less')
    // Leaving out recess support due to string interpolation missing in less v1.3 (which recess is dependent on)
    // .pipe($.recess())  
    .pipe($.less({
        style: 'expanded',
        loadPath: [bower]
    }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.csso())
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Scripts
gulp.task('scripts', function () {
    var stringify = require('stringify'),
        condition = typeof gulp.tasks.release !== 'undefined' ? gulp.tasks.release.running : false;
    return gulp.src('app/scripts/main.js')
        .pipe($.browserify({
            debug: true,
            transform: [
        'debowerify',
        stringify(['.html'])
      ],
            // Note: At this time it seems that you will also have to 
            // setup browserify-shims in package.json to correctly handle
            // the exclusion of vendor vendor libraries from your bundle
            extensions: ['.js'],
            external: ['lodash','jquery']
        }))

    .pipe($.if(condition, $.uglify()))
    .pipe(gulp.dest('dist/scripts'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Lint
gulp.task('lint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter(require('jshint-stylish')));
});

// Images
gulp.task('images', function () {
    return gulp.src(['app/images/**/*', bower + '/leaflet-bower/dist/images/*'])
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })) 
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {
        read: false
    }).pipe($.clean());
});

// Connect
gulp.task('connect', $.connect.server({
    root: __dirname + '/dist',
    port: 9000,
    livereload: {
        port: 35729
    },
    open: {
        file: 'index.html',
        browser: 'Google Chrome'
    },
    middleware: function connect(connect, o) {
        if (config.proxy.enabled === true) {
            var proxy = require('proxy-middleware'),
                memorize = require('connect-memorize'),
                url = require('url');
            
            var baseURL = config.proxy.backendURL,
                middlewares = [];

            config.proxy.routes.forEach(function(route) {
                middlewares.push(memorize({
                    match: '/' + route, // handle only urls starting with $expression
                    memorize: true, // store stuff
                    recall: true, // serve previously stored
                    storageDir: config.proxy.cacheDir
                }));
                middlewares.push(connect().use('/' + route, proxy(url.parse(baseURL + route))));
            });
            
            return middlewares;
        }
    }
}));

// Watch
gulp.task('watch', ['connect'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/less/**/*.less',
        'app/scripts/**/*.js',
        'app/images/**/*',
    ], $.connect.reload);


    // Watch .less files
    gulp.watch('app/less/**/*.less', ['styles']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);


    // Watch .html files
    gulp.watch('app/**/*.html', ['html']);

});

gulp.task('deploy', function() {
    var rsync = require('rsyncwrapper').rsync,
        path = require('path');

    return rsync({
        src: path.resolve(__dirname, 'dist/*'),
        dest: config.deployURI,
        ssh: true,
        recursive: true,
    }, function(error, stdout, stderr, cmd) {
        if (error) console.log(error.message);
    });
});

// TODO: Fix this!!1 Include libs
gulp.task('libs', function () {
    return gulp.src('app/scripts/lib/*.js')
        .pipe($.concat('libs.js'))
        .pipe(gulp.dest('dist/scripts/lib'))
        .pipe($.size())
        .pipe($.connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src(['app/bower_components/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('dist/fonts/'));
});

// Build
gulp.task('build', ['clean', 'html', 'styles', 'scripts', 'images', 'libs', 'fonts']);

// Dev Server
gulp.task('dev', ['clean', 'build', 'connect', 'watch']);

// Release task
gulp.task('release', function() {
    gulp.start('build');
});

// Default task
gulp.task('default', ['dev']);
