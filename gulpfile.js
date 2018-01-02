/*
 * @Author: Nokey 
 * @Date: 2016-11-22 15:30:31 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-01-02 10:14:34
 */
'use strict';

var runSequence = require('run-sequence'),
    gulp = require('./gulp')([
        'html',
        'stylus',
        'imgmin',
        'movemedia',
        'static',
        'clean',
        'server',
        'open',
        'browserify-dev',
        'browserify-build',
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
        ['browserify-dev'],
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
        ['browserify-dev'],
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
        ['browserify-build'],
        ['ejs'],
        cb);
});

/**
 * 启动Gulp，开始监听！:)
 */
gulp.task('watch', ['dev'], ()=>{
    gulp.watch(['./rev/**/*.json', './src/*.ejs', './src/pages/*.ejs', './src/ejs/*.ejs'], ['ejs']);
    gulp.watch(['./src/scripts/*.js', './src/scripts/modules/*.js'], ['browserify-dev']);
    gulp.watch('./src/stylus/**/*', ['stylus']);
    gulp.watch(['./src/scripts/plugins/**/*', './src/media/**/*'], ['static']);

    // 图片压缩放到build里，提高监听性能
    gulp.watch(['./src/media/**/*'], ['movemedia']);
});