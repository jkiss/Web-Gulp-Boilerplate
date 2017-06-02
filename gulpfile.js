/*
 * @Author: Nokey 
 * @Date: 2016-11-22 15:30:31 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-02 11:28:51
 */
'use strict'; 

var gulp                   = require('gulp'),
    babel                  = require('gulp-babel'),
    rename                 = require('gulp-rename'),
    uglify                 = require('gulp-uglify'),
    imagemin               = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    stylus                 = require('gulp-stylus'),
    concat                 = require('gulp-concat'),
    plumber                = require('gulp-plumber'),
    del                    = require('del'),
    sourcemaps             = require('gulp-sourcemaps'),
    rev                    = require('gulp-rev'),
    revFormat              = require('gulp-rev-format'),
    revReplace             = require('gulp-rev-replace'),
    runSequence            = require('run-sequence'),
    connect                = require('gulp-connect'),
    open                   = require('gulp-open');

/**
 * 替换HTML里的链接版本
 */
gulp.task('html', ()=>{
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

    gulp.src('./*.html')
        .pipe(plumber())
        .pipe(revReplace({
            manifest: manifest,
            modifyUnreved: modifyUnreved,
            modifyReved: modifyReved
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

/**
 * 转换ES6语法，并打包压缩JS
 */
gulp.task('es6', ()=>{
    del(['./build/scripts/*.js']);

    gulp.src('./src/scripts/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(babel({
                presets: ['es2015']
            }))
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
});

/**
 * 转换Stylus语法，并打包压缩css
 */
gulp.task('stylus', ()=>{
    del(['./build/styles/*.css']);

    gulp.src('./src/stylus/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            'include': 'node_modules'  // 可以直接用@import引入node_modules里的文件
        }))
        .pipe(gulp.dest('./build/styles'))
        .pipe(rev())
        .pipe(revFormat({
            prefix: '.',
            suffix: '.cache',
            lastExt: false
        }))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/styles'))
        .pipe(connect.reload());
});

/**
 * 压缩图片
 */
gulp.task('imgmin', ()=>{
    gulp.src('./src/images/**/*')
        .pipe(imagemin([
            imageminJpegRecompress(),
            imagemin.optipng(),  // 插件使用前需要安装：imagemin-optipng
            imagemin.gifsicle(),
            imagemin.svgo()
        ],{
            // verbose: true
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('./build/images'));
});

/**
 * 移动图片
 */
gulp.task('moveimg', ()=>{
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./build/images'))
        .pipe(connect.reload());
});

/**
 * 打包静态文件
 */
gulp.task('static', ()=>{
    gulp.src('./src/scripts/plugins/**/*')
        .pipe(gulp.dest('./build/scripts/plugins'))
        .pipe(connect.reload());

    gulp.src('./src/media/**/*')
        .pipe(gulp.dest('./build/media'))
        .pipe(connect.reload());

    gulp.src('./src/stylus/fonts/**/*')
        .pipe(gulp.dest('./build/styles/fonts'))
        .pipe(connect.reload());

    gulp.src('./favicon.png')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

/**
 * 清除build目录
 */
gulp.task('clean', ()=>
    del(['./build/**/*'])
);

/**
 * 启动本地服务器
 */
gulp.task('server', ()=>{
    connect.serverClose();
    connect.server({
        root: 'build',
        port: 8008,
        livereload: true
        // fallback: 'index.html'  // SPA可能需要设置此参数
    });
});

/**
 * 打开浏览器
 */
gulp.task('open', ()=>{
    setTimeout(()=>{
        gulp.src('')
            .pipe(open({
                uri: 'http://localhost:8008/'
            }));
    }, 3000);
});

/**
 * 初始化服务
 */
gulp.task('dev', (cb)=>{
    runSequence(
        ['clean'],
        ['static'],
        ['moveimg'],
        ['stylus'],
        ['es6'],
        ['html'],
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
        ['es6'],
        ['html'],
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
        ['es6'],
        ['html'],
        cb);
});

/**
 * 启动Gulp，开始监听！:)
 */
gulp.task('watch', ['dev'], ()=>{
    gulp.watch(['./rev/**/*.json', './*.html'], ['html']);
    gulp.watch('./src/scripts/*.js', ['es6']);
    gulp.watch('./src/stylus/*.styl', ['stylus']);
    gulp.watch(['./src/scripts/plugins/**/*', './src/images/**/*'], ['static']);

    // 图片压缩放到build里，提高监听性能
    gulp.watch('./src/images/**/*', ['moveimg']);
});