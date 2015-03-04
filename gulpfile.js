var paths = {
  scripts: ['src/javascripts/dialog.overlay.js',
            'src/javascripts/dialog.js'],
  styles:  ['src/sass/*.scss'],
};

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
  gulp.src(paths.scripts)
    .pipe(concat('dialog.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('compress', function() {
  gulp.src('lib/dialog.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('lib'))
});


gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('dialog.css'))
    .pipe(gulp.dest('lib'));
});

gulp.task('default',['build', 'compress', 'styles']);

gulp.task('watch', function() {
  gulp.watch(paths.scripts.concat(paths.styles), ['default']);
});
