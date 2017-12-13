/*
 * @Author: Nokey 
 * @Date: 2016-11-22 15:30:31 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-12-13 11:59:18
 */
'use strict';

var runSequence = require('run-sequence'),
    gulp = require('./gulp')([
        'html',
        'es6',
        'stylus',
        'imgmin',
        'movemedia',
        'static',
        'clean',
        'server',
        'open',
        'browserify',
        'ejs'
    ]);

/**
 * 初始化服务
 */
gulp.task('dev', (cb)=>{
    runSequence(
        ['clean'],
        ['static'],
        ['movemedia'],
        ['stylus'],
        ['browserify'],
        ['ejs'],
        ['server'],
        ['open'],
        cb);
});

/**
 * Default
 */
gulp.task('default', (cb)=>{
    runSequence(
        ['clean'],
        ['static'],
        ['imgmin'],
        ['stylus'],
        ['browserify'],
        ['ejs'],
        cb);
});

/**
 * Build
 */
gulp.task('build', (cb)=>{
    runSequence(
        ['clean'],
        ['static'],
        ['imgmin'],
        ['stylus'],
        ['browserify'],
        ['ejs'],
        cb);
});

/**
 * 启动Gulp，开始监听！:)
 */
gulp.task('watch', ['dev'], ()=>{
    gulp.watch(['./rev/**/*.json', './src/*.ejs', './src/pages/*.ejs'], ['ejs']);
    gulp.watch('./src/scripts/*.js', ['browserify']);
    gulp.watch('./src/stylus/*.styl', ['stylus']);
    gulp.watch(['./src/scripts/plugins/**/*', './src/media/**/*'], ['static']);

    // 图片压缩放到build里，提高监听性能
    gulp.watch(['./src/media/images/**/*', './src/media/videos/**/*'], ['movemedia']);
});