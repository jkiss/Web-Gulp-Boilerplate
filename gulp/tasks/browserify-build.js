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
    buffer     = require('vinyl-buffer'),
    globby     = require('globby'),
    through    = require('through2'),
    gutil      = require('gulp-util'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    rename     = require('gulp-rename'),
    rev        = require('gulp-rev'),
    revFormat  = require('gulp-rev-format'),
    connect    = require('gulp-connect'),
    plumber    = require('gulp-plumber');

// TODO: bundle js through modules by import
module.exports = ()=>{
    return browserify({
        entries: './src/scripts/app.js'  //指定打包入口文件
    })
    .transform(babelify, {
        presets: [
            'es2015', 
            'env'
        ]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())

    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(rename((path)=>{
        path.extname = '.min.js'
    }))
    .pipe(uglify())
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