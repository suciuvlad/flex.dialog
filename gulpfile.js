var paths = {
  scripts: ['src/javascripts/flex.dialog.overlay.js',
            'src/javascripts/flex.dialog.js'],
  styles:  ['src/sass/*.scss']
};

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build', function () {
  gulp.src(paths.scripts)
    .pipe(concat('flex.dialog.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('compress', function() {
  gulp.src('lib/flex.dialog.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('lib'))
});


gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('lib'));
});

gulp.task('default',['build', 'compress', 'styles']);

gulp.task('watch', function() {
  gulp.watch(paths.scripts.concat(paths.styles), ['default']);
});
