/*
 * @Author: Nokey 
 * @Date: 2017-12-12 23:16:08 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-12-12 23:38:43
 */
'use strict'; 

var gulp       = require('gulp'),
    ejs        = require('gulp-ejs'),
    gutil      = require('gulp-util'),
    plumber    = require('gulp-plumber'),
    revReplace = require('gulp-rev-replace'),
    connect    = require('gulp-connect');

module.exports = ()=>{
    var manifest = gulp.src('./rev/**/*.json');
    function modifyUnreved(filename){
      return filename;
    }
    function modifyReved(filename){
      // filename是：bundle.69cef10fff.cache.css的一个文件名
      // 在这里才发现刚才用gulp-rev-format的作用了吧？就是为了做正则匹配，
      if (filename.indexOf('.cache') > -1) {
        // 通过正则和relace得到版本号：69cef10fff
        const _version = filename.match(/\.[\w]*\.cache/)[0].replace(/(\.|cache)*/g, '');

        // 把版本号和gulp-rev-format生成的字符去掉，剩下的就是原文件名：bundle.css
        const _filename = filename.replace(/\.[\w]*\.cache/, '');

        // 重新定义文件名和版本号：bundle.css?v=69cef10fff
        filename = _filename + '?v=' + _version;

        // 返回由gulp-rev-replace替换文件名
        return filename;  
      }  
      return filename;  
    }

    return gulp.src(['./src/*.ejs', './src/pages/*.ejs'], { 
            base: 'src'
        })
        .pipe(plumber())
        .pipe(ejs({
            msg: 'Hello Gulp!'
        }, {}, {
            ext: '.html'
        })
        .on('error', gutil.log))
        .pipe(revReplace({
            manifest: manifest,
            modifyUnreved: modifyUnreved,
            modifyReved: modifyReved
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
}