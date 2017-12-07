/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:49:46 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 17:11:07
 */
'use strict'; 

var gulp = require('gulp'),
    open = require('gulp-open');

module.exports = ()=>{
    // setTimeout(()=>{
    return gulp.src('')
            .pipe(open({
                uri: 'http://localhost:8008/'
            }));
    // }, 3000);
}