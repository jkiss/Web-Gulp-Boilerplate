/*
 * @Author: CGTN-Fex
 */

// rAF poilyfill
; (function () {
  var lastTime = 0,
    vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
} ());

(function ($, win){
  /**
   * Public Parameters
   */
  var _win = $(win),
      _win_height = _win.height(),
      _win_width = _win.width(),
      _ua = win.navigator.userAgent.toLowerCase(),
      _isMac = /macintosh|mac os x/.test(_ua),
      _isIphone = /iphone/.test(_ua),
      _isIpad = /ipad/.test(_ua),
      _isAndroid = /android|adr|linux/.test(_ua),
      _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua),
      tap_event_name = _isMobile ? 'touchend' : 'click';

  var center_eles = $(".center-ele"),
      init_funcs = [];

  /**
   * Resize & Scroll
   */
  function resizeAll(){
    _win_height = _win.height();
    _win_width = _win.width();

  }

  $(win).resize(function () {
    resizeAll();
  });

  /**
   * ES6 example
   */
  class CarouselPoint{
    constructor(initState){
      var _me = this;
      // jQuery DOM
      this.dom = initState.dom;
      
      // TranslateX
      this.x = 0;
      
      // Scale()
      this.s = 0;
      
      // z-index
      this.z = 0;
      
      // 获取父组件属性
      this.A = initState.A;
      this.S = initState.S;
      this.Z = initState.Z;
      
      // 当前的总弧度
      this.rad = initState.rad;
      
      // 动画器
      this.tween = new TWEEN.Tween(_me)
                            .onStart(()=>{
                              _me.start();
                            })
                            .onUpdate(()=>{
                              _me.setState();
                            })
                            .onComplete(()=>{
                              _me.complete();
                            });
      
      // 动画时间
      this.time = initState.time;

      // afterChange event cb
      this.afterChange = initState.afterChange;

      // beforeChange event cb
      this.beforeChange = initState.beforeChange;
    }
    
    setState(){ // theta 是每次增加或减少的弧度值
      // this.rad += theta;
      var _me = this;
      _me.x = _me.A * _me.checkMinNum(Math.cos(_me.rad));
      // _me.s = _me.S * Math.sin(_me.rad) + 1;
      _me.s = _me.S * Math.sin(_me.rad) + 1 - _me.S;
      _me.z = parseInt(_me.Z * ((1 + _me.checkMinNum(Math.sin(_me.rad))) / 2));
      // Render
      _me.render();
      
      return _me;
    }
    
    checkMinNum(n){
      if(Math.abs(n) < 0.001){
        return 0;
      }
      return Math.floor(n * 1000) / 1000;
    }
    
    start(){
      console.log('This image Tween Start...');
      // 动画开始前取消 Focus 状态
      this.dom.removeClass('focus-3d');

      this.beforeChange();
    }
    
    complete(){
      console.log('This image Tween Complete...');
      // 检查当前元素是否在 Focus 位置
      if(this.x === 0 && this.z === this.Z){
        this.dom.addClass('focus-3d');
      }

      this.afterChange();
    }
    
    animate(theta){
      var _me = this;
      _me.tween.stop().to({rad: _me.rad + theta}, _me.time).start();
    }
    
    render(){
      var _me = this;
      _me.dom.css({
        'z-index': _me.z,
        '-webkit-transform': 'scale('+_me.s+') translate('+_me.x+'px,0)',
        '-ms-transform': 'scale('+_me.s+') translate('+_me.x+'px,0)',
        'transform': 'scale('+_me.s+') translate('+_me.x+'px,0)'
      });
    }
  }

  /**
   * Preload
   */
  function init() {
    var indexID = 0,
        pre_files = [],
        loader = new createjs.LoadQueue();

    // add preload images
    $('body').find('img').each(function (i, e) {
      pre_files.push({
        "id": "img" + indexID++,
        "src": $(e).attr('src')
      });
    });

    loader.addEventListener("complete", handleComplete);
    loader.addEventListener('progress', handleProgress);
    loader.addEventListener('error', handleError);

    // Start loading
    loader.loadManifest(pre_files);
    function handleComplete() {
      // console.log('Loading complete...');
      resizeAll();

      init_funcs.forEach((e)=>{
        e();
      });

    }
    function handleProgress(e) {
      var num = Math.floor(e.progress * 100);
      console.log(num);
    }
    function handleError(e) {
      console.error(e.title);
      console.dir(e.data);
    }

  }
  init();


  /**************      Tool     **************/
  function getBCR(ele, type) {
    if (type !== undefined) {
      return ele.getBoundingClientRect()[type];
    } else {
      return ele.getBoundingClientRect();
    }
  }

  function centerEle(ele_boxs) {
    ele_boxs.each(function (i, e) {
      var
        container = $(this),
        ele = container.find('.center-this'),
        eleRatio = ele.data('width') / ele.data('height'),
        containerRatio = container.outerWidth() / container.outerHeight();

      if (eleRatio >= containerRatio) {
        ele.css({ "width": "auto", "height": "100%" });
      } else {
        ele.css({ "width": "100%", "height": "auto" });
      }

      ele.css({
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "margin-top": -1 * ele.height() * 0.5 + "px",
        "margin-left": -1 * ele.width() * 0.5 + "px"
      });
    });
  }

} (jQuery, window));