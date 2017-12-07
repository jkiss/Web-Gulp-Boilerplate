/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:22:21 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 17:12:12
 */
'use strict'; 

var gulp      = require('gulp'),
    plumber   = require('gulp-plumber'),
    rev       = require('gulp-rev'),
    revFormat = require('gulp-rev-format'),
    stylus    = require('gulp-stylus'),
    del       = require('del'),
    connect   = require('gulp-connect');

module.exports = ()=>{
    del(['./build/styles/*.css']);
    
    return gulp.src('./src/stylus/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            'include': 'node_modules'  // 可以直接用@import引入node_modules里的文件
        }))
        .pipe(gulp.dest('./build/styles'))
        .pipe(rev())
        .pipe(revFormat({
            prefix: '.',
            suffix: '.cache',
            lastExt: false
        }))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/styles'))
        .pipe(connect.reload());
}