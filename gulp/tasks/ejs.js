/*
 * @Author: Nokey 
 * @Date: 2017-12-12 23:16:08 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-12-12 23:38:43
 */
'use strict'; 

var ejs = require('gulp-ejs'),
    gutil = require('gulp-util');

// TODO: ejs template
module.exports = ()=>{
    gulp.src(['./src/*.html', './src/pages/*.html'])
        .pipe(ejs({
            msg: 'Hello Gulp!'
        }, {}, {

        })
        .on('error', gutil.log))
        .pipe(gulp.dest('./dist'))
}