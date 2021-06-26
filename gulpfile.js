'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var flatten = require('gulp-flatten');
var del = require('del');

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass.sync(
            {outputStyle: 'compressed'}
        ).on('error', sass.logError))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-images', function() {
    return gulp.src([
        './src/**/*.jpg',
        './src/**/*.jpeg',
        './src/**/*.png',
        './src/**/*.svg'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy-fonts', function() {
    return gulp.src([
        './src/**/*.woff',
        './src/**/*.woff2',
        './src/**/*.eot',
        './src/**/*.ttf'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('clean', function (done) {
    del.sync(['./dist/**']);
    done();
});

gulp.task('watch', function () {
    
    gulp.watch('./src/**/*.scss', gulp.series('sass'));

    gulp.watch([
        './src/**/*.jpg',
        './src/**/*.jpeg',
        './src/**/*.png',
        './src/**/*.svg'
    ], gulp.series('copy-images'));

    gulp.watch([
        './src/**/*.jpg',
        './src/**/*.jpeg',
        './src/**/*.png',
        './src/**/*.svg'
    ], gulp.series('copy-fonts'));

});

gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', gulp.series('sass'));
});

gulp.task('run', gulp.series('copy-images', 'copy-fonts',  'sass'));