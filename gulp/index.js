/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:02:32 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 17:06:28
 */
'use strict'; 

var gulp = require('gulp');

module.exports = (tasks) => {
    tasks.forEach((name) => {
        gulp.task(name, require('./tasks/' + name));
    });

    return gulp;
};