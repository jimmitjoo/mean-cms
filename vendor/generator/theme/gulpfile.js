var gulp = require('gulp'),
    clean = require('gulp-clean');

var paths = {
    sassPath: './scss/',
    scriptPath: './js/',
    bowerPath: './bower_components/',
    buildPath: './../../public/build/'
};

gulp.task('default', ['clean-build', 'styles', 'scripts']);

gulp.task('clean-build', function () {
    return gulp.src(paths.buildPath + '**/*.*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('styles', function () {
    console.log('Running Styles');
});

gulp.task('scripts', function () {
    console.log('Running Scripts');
});