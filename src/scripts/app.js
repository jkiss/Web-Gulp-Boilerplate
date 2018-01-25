/*
 * @Author: Mr.B 
 * @Date: 2017-11-27 12:17:37 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2017-12-13 12:16:19
 */
'use strict'; 

// Polyfill
import './modules/pf_RAF'
import 'nk-device'

// TODO: Plug-in modular
// let jQuery = require('jquery')
import 'jquery-mousewheel'
import 'jquery.scrollto'
import 'jquery.html5loader'
import ScrollMagic from 'scrollmagic'
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min'

// GSAP
import {TweenMax, Power2, TimelineLite} from "gsap"
import Draggable from "gsap/Draggable"
import ScrollToPlugin from "gsap/ScrollToPlugin"

(function ($, win) {
    console.log(Draggable)
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
     * Your code here
     */



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