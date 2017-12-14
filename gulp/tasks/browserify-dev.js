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
    sourcemaps = require('gulp-sourcemaps'),
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
    .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))

        .pipe(rename((path)=>{
            path.extname = '.min.js'
        }))
        .pipe(uglify())
    .pipe(sourcemaps.write('.'))
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

// module.exports = ()=>{
//     // gulp 希望任务能返回一个 stream，因此我们在这里创建一个
//     var bundledStream = through();
    
//     bundledStream
//         // 将输出的 stream 转化成为一个包含 gulp 插件所期许的一些属性的 stream
//         .pipe(source('app.js'))
//         // 剩下的部分，和你往常缩写的一样。
//         // 这里我们直接拷贝 Browserify + Uglify2 范例的代码。
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//             // 在这里将相应 gulp 插件加入管道
//             .pipe(uglify())
//             .on('error', gutil.log)
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('./build/scripts/'));

//     // "globby" 替换了往常的 "gulp.src" 为 Browserify
//     // 创建的可读 stream。
//     globby(['./src/scripts/app.js'], (err, entries)=>{
//         // 确保任何从 globby 发生的错误都被捕获到
//         if (err) {
//             bundledStream.emit('error', err);
//             return;
//         }

//         // 创建 Browserify 实例
//         var b = browserify({
//             entries: entries,
//             debug: true,
//             transform: [babelify]
//         });

//         // 将 Browserify stream 接入到我们之前创建的 stream 中去
//         // 这里是 gulp 式管道正式开始的地方
//         b.bundle().pipe(bundledStream);
//     });

//     // 最后，我们返回这个 stream，这样 gulp 会知道什么时候这个任务会完成
//     return bundledStream;
// }