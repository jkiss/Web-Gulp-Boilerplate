/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 17:27:13 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 18:26:38
 */
'use strict'; 

var gulp       = require('gulp'),
    babelify   = require('babelify'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber    = require('gulp-plumber');

// TODO: bundle js through modules
module.exports = ()=>{
    return browserify({
        entries: './src/scripts/app.js'  //指定打包入口文件
    })
    
    .transform(babelify, {
        presets: ['es2015']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
}