/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:39:34 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-12-01 21:06:52
 */
'use strict'; 

var gulp    = require('gulp'),
    connect = require('gulp-connect');

module.exports = ()=>{
    gulp.src('./src/scripts/plugins/**/*')
        .pipe(gulp.dest('./build/scripts/plugins'))
        .pipe(connect.reload());

    gulp.src('./src/media/images/**/*')
        .pipe(gulp.dest('./build/images'))
        .pipe(connect.reload());

    gulp.src('./src/media/videos/**/*')
        .pipe(gulp.dest('./build/videos'))
        .pipe(connect.reload());

    gulp.src('./src/stylus/fonts/**/*')
        .pipe(gulp.dest('./build/styles/fonts'))
        .pipe(connect.reload());

    gulp.src('./src/static/**/*')
        .pipe(gulp.dest('./build/static'))
        .pipe(connect.reload());

    return gulp.src('./src/favicon.png')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
}