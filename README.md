# Gulp Web Boilerplate

> 最基本的 Gulp静态页工作流模版，使项目更加统一，便于协作，可根据自身的需求添加、删除部分功能；
> 欢迎来提 Issues。

# Updates：

#### 2017-12-14:
1. 将 browserify 拆分为 dev 和 build 两个环境；
2. 预加载功能替换为 [jquery.html5loader](http://gianlucaguarini.com/jquery.html5loader/);

#### 2017-12-13:
1. 增加 EJS html template 功能；

#### 2017-12-12:
1. 增加 ES6 Module 语法，实现 JS 模块化；

#### 2017-12-7:
1. 模块化 gulp 任务；
2. 将资源统一放到 /src 下面；
3. 增加 [jquery.scrollto](https://github.com/flesler/jquery.scrollTo)、[ScrollMagic](https://github.com/janpaepke/ScrollMagic) 插件；

### 启动项目：

```javascript
npm run dev // development mode

npm run build // build deploy folder
```

### 特性：

1. 可以使用常用的的 ES6 语法，支持模块化；
2. css使用的[stylus](http://stylus-lang.com/)预编译模版，TJ大神的作品，更偏向于JS语法；
3. html文件里的自定义的js和css文件链接可以自动加版本号：\<script src="bundle.min.js?v=dsf6sk210"\>，解决CDN缓存问题；
4. 图片压缩，需要配合 imagemin 的插件使用：imageminJpegRecompress（图片链接暂时没加版本号）；
5. 自动启动本地服务器，自动刷新（Chrome需要安装livereload插件）；
6. 预加载：[jquery.html5loader](http://gianlucaguarini.com/jquery.html5loader/)；

### 前端兼容性查询：

1. [Can I Use](http://caniuse.com/)；
2. [MDN](https://developer.mozilla.org/zh-CN/)；

### 简单快速的教程：

1. [菜鸟教程](http://www.runoob.com/);

### Some Sample Code
```javascript
/********   ES6 modules   *********/
import {f1, Test} from './modules/test'

f1('Mr.B')
let test = new Test('Mr.B')
test.myName()


/******   Scroll Magic Sample   *******/
var sm_controller = new ScrollMagic.Controller(),
    wipe_animation = new TimelineMax()
        .to('#color_photo', 1, {x: '100%', ease: Linear.easeNone});

new ScrollMagic.Scene({
        triggerElement: '.intro-page',
        triggerHook: 'onLeave',
        duration: _win_height
    })
    .setTween(wipe_animation)
    .addTo(sm_controller);


/******   scroll to sample   *******/
_win.scrollTo('#', {
    duration: 300,
    offset: -80
})


/******   pin header navigation   *******/
var pin_wrapper = $('#pin_wrapper').get(0),
    nav_bar = $('#nav_bar');

_win.scroll(function(e){
    if(getBCR(pin_wrapper, 'top') < 0){
        !nav_bar.hasClass('pinned') && nav_bar.addClass('pinned');
    }else{
        nav_bar.hasClass('pinned') && nav_bar.removeClass('pinned');
    }
}).trigger('scroll')


/*********    sub page template    ********/
var sub_page_html = 
    `<h1 class="title">SLEEPING LAVENDER</h1>
    <p>To improve the quality of sleeping, we designed a interactive night lamp. People can not only play with it before going to bed, but also can comfort by its violet light. lavendern aroma, white noise sound and warm temperature. We hope that it will allow the people who seek peaceful nights to regain sweet dreams.</p>
    <div class="video-wrap">
        <iframe width="100%" height="100%" src="https://www.youtube.com/" frameborder="0" allowfullscreen></iframe>
    </div>
    <img src="images/lavender/lavender11.png" alt="Image">
    <h2>Usage Scenario</h2>
    <img src="images/lavender/lavender12.png" alt="Image">`.trim()


/*********    Preload    ********/
var preload_json = {
    'files': [
        {
            type: 'IMAGE',
            source: 'path/to/img.jpg',
            size: 620
        }
    ]
};
$.html5Loader({
    filesToLoad: preload_json,
    onBeforeLoad: ()=>{},
    onComplete: ()=>{},
    onElementLoaded: (obj, elm)=>{},
    onUpdate: (percentage)=>{
        console.log(percentage)
    }
});
```