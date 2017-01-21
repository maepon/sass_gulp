var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'),
    plumber = require('gulp-plumber');


var prefixer_setting = { 
	browsers: [
	'last 2 versions',
	'ie > 9' ,
	'Android > 4'
	]
	};

gulp.task('sass', function () {
  gulp.src('scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer(prefixer_setting))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('css/'));
});

gulp.task('serve',['sass'],function(){
  var initObj = {server: '.'};

  bs.init(initObj);

  gulp.watch(['**/*.html'],bs.reload);
  gulp.watch(['css/**/*.css'],bs.reload);
  gulp.watch(['scss/**/*.scss'],['sass']);

});

gulp.task('default',['serve']);
