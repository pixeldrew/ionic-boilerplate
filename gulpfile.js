var packageInfo = require('./package.json'),
    version = packageInfo.version,
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    requireConfig = require('./build.json'),
    rjs = require('gulp-requirejs'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert'),
    sequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    codeVersion = 'var appVersion="' + version + '";',
    codeCopyRight = "/**\n" + packageInfo.copyright + " " + packageInfo.author +"\n\n" + packageInfo.description + "\n */\n",
    paths = {
        sass: ['./css/**/*.scss']
    };

gulp.task('sass', function() {
    gulp.src('./css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./css/'));
});

gulp.task('requirejs', function() {
    return rjs(requireConfig)
        .pipe(gulp.dest('./'));
});

gulp.task('test', function() {

});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('build-clean', function() {
    return gulp.src('js/main.min.js', {read: false})
        .pipe(clean());
});

gulp.task('compress', function() {
    gulp.src('./js/main.min.js')
        .pipe(uglify())
        .pipe(insert.prepend(codeVersion))
        .pipe(insert.prepend(codeCopyRight))
        .pipe(gulp.dest('./js/'));
});

gulp.task('build', function(done) {
    sequence('build-clean','requirejs', 'compress', done);
});

gulp.task('default', ['build', 'sass']);
