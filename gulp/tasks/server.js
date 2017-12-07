/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:44:07 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 17:11:18
 */
'use strict'; 

var connect = require('gulp-connect');

module.exports = ()=>{
    connect.serverClose();
    return connect.server({
        root: 'build',
        port: 8008,
        livereload: true
        // fallback: 'index.html'  // SPA可能需要设置此参数
    });
}