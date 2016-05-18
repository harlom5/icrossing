"use strict";
// Organized with inspiration from Mike Valstar's solution:
// http://mikevalstar.com/post/fast-gulp-browserify-babelify-watchify-react-build/

var babelify   = require('babelify'),
    browserify = require('browserify'),
        buffer     = require('vinyl-buffer'),
        coffeeify  = require('coffeeify'),
        gulp       = require('gulp'),
        livereload = require('gulp-livereload'),
        merge      = require('merge'),
        rename     = require('gulp-rename'),
        source     = require('vinyl-source-stream'),
        sourceMaps = require('gulp-sourcemaps'),
        watchify   = require('watchify');

var config = {
    js: {
        src: './main.js',       // Entry point
        outputDir: './build/',  // Directory to save budle to
        mapDir: './maps/',      // Subdirectory to save maps to
        outputFile: 'bundle.js' // Name to use for bundle
    },
};

function bundle (bundler) {
    // Add options to add to bundler passed as parameter
    bundler
      .bundle()                                    // Start bundle
      .pipe(source(config.js.src))                   // Entry point
      .pipe(buffer())                              // Convert to gulp pipeline
      .pipe(rename(config.js.outputFile))          // Rename output from 'amin.js'
                                                   //   to 'bundle.js'
      .pipe(sourceMaps.init({ loadMaps : true }))  // Strip inline source maps
      .pipe(sourceMaps.write(config.js.mapDir))    // Save source maps to their
                                                   //   own directory
      .pipe(gulp.dest(config.js.outputDir))        // Save 'bundle' to build/
      .pipe(livereload());                         // Reload browser if relevant
}

// Watch task: Bundle, kick off live reload server, nd rebundle/reload on
//   file changes
gulp.task('watch', function () {
    livereload.listen();
    var args = merge(watchify.args, { debug : true});
    var bundler = browserify(config.js.src, args)
                   .plugin(watchify, { ignoreWatch: ['**/node_modules'] })
                   .transform(coffeeify)
                   .transform(babelify, { presets : [ 'es2015' ] });

    bundle(bundler);

    bundler.on('update', function () {
      console.log('bundler update', bundle, bundle.bundler);
      bundle(bundler);
    });
});

// Bundle task: Just spit out a bundle and source maps
gulp.task('bundle', function () {
    var bundler = browserify(config.js.src)
                    .transform(coffeeify)
                    .transform(babelify, { presets : [ 'es2015' ] });

    bundle(bundler);
})