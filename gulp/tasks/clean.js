/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 15:41:04 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-11-27 17:09:39
 */
'use strict'; 

var gulp = require('gulp'),
    del  = require('del');

module.exports = ()=>{
    return del(['./build/**/*'])
}