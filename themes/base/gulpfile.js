var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    minifyCss = require('gulp-minify-css');

var paths = {
    sassPath: './scss/',
    scriptPath: './js/',
    bowerPath: './bower_components/',
    buildPath: './../../public/build/'
};

gulp.task('default', ['styles', 'scripts']);

gulp.task('clean-scripts', function () {
    return gulp.src(paths.buildPath + '**/*.*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('styles', ['clean-scripts'], function () {
    console.log('Running Styles');

    gulp.src(paths.sassPath + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.buildPath));

    /*
    return sass(paths.sassPath, { sourcemap: true })
        .on('error', function (err) {
            console.error('Error', err.message);
        })

        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: '/source'
        }))

        .pipe(gulp.dest(paths.buildPath));
        */
});

gulp.task('scripts', function () {
    return gulp.src([
        paths.bowerPath + 'angular/angular.js',
        paths.bowerPath + 'jquery/dist/jquery.js',
        paths.scriptPath + '**/*.js'
    ])
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.buildPath));
});
