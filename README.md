# Gulp Web Boilerplate

> 最基本的 Gulp静态页工作流模版，使项目更加统一，便于协作，可根据自身的需求添加、删除部分功能；
> 欢迎来提 Issues。

# Updates：

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

1. 可以使用最新的 ES6 语法；
2. css使用的[stylus](http://stylus-lang.com/)预编译模版，TJ大神的作品，更偏向于JS语法；
3. html文件里的自定义的js和css文件链接可以自动加版本号：\<script src="bundle.min.js?v=dsf6sk210"\>，解决CDN缓存问题；
4. 图片压缩，需要配合 imagemin 的插件使用：imageminJpegRecompress（图片链接暂时没加版本号）；
5. 自动启动本地服务器，自动刷新（Chrome需要安装livereload插件）；

### 前端兼容性查询：

1. [Can I Use](http://caniuse.com/)；
2. [MDN](https://developer.mozilla.org/zh-CN/)；

### 简单快速的教程：

1. [菜鸟教程](http://www.runoob.com/);