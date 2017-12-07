/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:32:41 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 17:10:40
 */
'use strict'; 

var gulp       = require('gulp'),
    imagemin   = require('gulp-imagemin'),
    Recompress = require('imagemin-jpeg-recompress');

module.exports = ()=>{
    return gulp.src('./src/media/images/**/*')
        .pipe(imagemin([
            Recompress(),
            imagemin.optipng(),  // 插件使用前需要安装：imagemin-optipng
            imagemin.gifsicle(),
            imagemin.svgo()
        ],{
            verbose: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('./build/images'));
}