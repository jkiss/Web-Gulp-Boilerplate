/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:03:42 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 17:10:27
 */
'use strict'; 

var gulp       = require('gulp'),
    plumber    = require('gulp-plumber'),
    rev        = require('gulp-rev'),
    revFormat  = require('gulp-rev-format'),
    babel      = require('gulp-babel'),
    del        = require('del'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    connect    = require('gulp-connect');

module.exports = ()=>{
    del(['./build/scripts/*.js']);
    
    return gulp.src('./src/scripts/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(rename((path)=>{
                path.extname = '.min.js'
            }))
            .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/scripts'))
        .pipe(rev())
        .pipe(revFormat({
            prefix: '.',
            suffix: '.cache',
            lastExt: false
        }))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/scripts'))
        .pipe(connect.reload());
}