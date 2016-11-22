/*
 * @Author: Nokey 
 * @Date: 2016-11-22 15:30:31 
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-22 16:11:01
 */
'use strict'; 

const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const stylus = require('gulp-stylus');

gulp.task('es6', ()=>
    gulp.src('./src/scripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename('X.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
);

gulp.task('stylus', ()=>
    gulp.src('./src/stylus/*.styl')
        .pipe(stylus())
        .pipe(rename('X.min.css'))
        .pipe(gulp.dest('./build/styles'))
);

gulp.task('static', ()=>{
    gulp.src('./src/scripts/plugins/**/*.*')
        .pipe(gulp.dest('./build/scripts'));

    gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('./build/images'));
});

gulp.task('watch', ['es6'], ()=>{
    gulp.watch('./src/scripts/*.js', ['es6']);
    gulp.watch('./src/stylus/*.styl', ['stylus']);
    gulp.watch('./src/scripts/plugins/**/*.*', ['static']);
    gulp.watch('./src/images/**/*.*', ['static']);
});
