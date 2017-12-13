/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 12:17:37 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-12-13 12:16:19
 */
'use strict'; 

// Polyfill
import './modules/pf_RAF'

// TODO: Plug-in modular
// import './plugins/jquery.scrollTo.min'

(function ($, win) {
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


    /**
     * Resize
     */
    function resizeAll(){
        _win_height = _win.height();
        _win_width = _win.width();

    }

    $(win).resize(function () {
        resizeAll();
    });

    /**
     * Footer
     */
    var icon_wechat = $('#icon_wechat'),
    cctv_qr = $('#cctv_qr');

    icon_wechat.click(function(e){
        cctv_qr.hasClass('hide') ? cctv_qr.removeClass('hide') : cctv_qr.addClass('hide');
    });

    /**
     * Some Sample Code
     */
    /********   ES6 modules   *********/
    // import {f1, Test} from './modules/test'
    // f1('Mr.B')

    // let test = new Test('Mr.B')
    // test.myName();

    /******   Scroll Magic Sample   *******/
    // var sm_controller = new ScrollMagic.Controller(),
    //     wipe_animation = new TimelineMax()
    //         .to('#color_photo', 1, {x: '100%', ease: Linear.easeNone});

    // new ScrollMagic.Scene({
    //         triggerElement: '.intro-page',
    //         triggerHook: 'onLeave',
    //         duration: _win_height
    //     })
    //     .setTween(wipe_animation)
    //     .addTo(sm_controller);


    /******   scroll to sample   *******/
    // _win.scrollTo('#', {
    //     duration: 300,
    //     offset: -80
    // })

    /******   pin header navigation   *******/
    // var pin_wrapper = $('#pin_wrapper').get(0),
    //     nav_bar = $('#nav_bar');

    // _win.scroll(function(e){
    //     if(getBCR(pin_wrapper, 'top') < 0){
    //         !nav_bar.hasClass('pinned') && nav_bar.addClass('pinned');
    //     }else{
    //         nav_bar.hasClass('pinned') && nav_bar.removeClass('pinned');
    //     }
    // }).trigger('scroll')

    /*********    sub page template    ********/
    // var sub_page_html = 
    //     `<h1 class="title">SLEEPING LAVENDER</h1>
    //     <p>To improve the quality of sleeping, we designed a interactive night lamp. People can not only play with it before going to bed, but also can comfort by its violet light. lavendern aroma, white noise sound and warm temperature. We hope that it will allow the people who seek peaceful nights to regain sweet dreams.</p>
    //     <div class="video-wrap">
    //         <iframe width="100%" height="100%" src="https://www.youtube.com/" frameborder="0" allowfullscreen></iframe>
    //     </div>
    //     <img src="images/lavender/lavender11.png" alt="Image">
    //     <h2>Usage Scenario</h2>
    //     <img src="images/lavender/lavender12.png" alt="Image">`.trim()

    /**
     * 
     * 
     */
    function preload() {
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

            init_funcs.forEach((e) => {
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

    /**************      Tool     **************/
    function getBCR(ele, type) {
        if (type !== undefined) {
            return ele.getBoundingClientRect()[type];
        } else {
            return ele.getBoundingClientRect();
        }
    }

    /**
     * 水平垂直居中某一容器中的元素，现代浏览器可以用 background 或 flex 布局
     * 
     * @param {jquery dom array} ele_boxs 
     */
    function centerEle(ele_boxs) {
        ele_boxs.each(function(i, e){
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

}(jQuery, window));