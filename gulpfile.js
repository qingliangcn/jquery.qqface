var gulp = require("gulp");
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");



gulp.task('lint', function() {
    return gulp.src('./jquery.qqface.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('js', function() {
    return gulp.src('jquery.qqface.js')
        .pipe(uglify())
        .pipe(rename('jquery.qqface.min.js'))
        .pipe(gulp.dest('./'));
});