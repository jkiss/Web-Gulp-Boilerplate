/*
 * @Author: Nokey 
 * @Date: 2016-11-21 22:32:04 
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-24 14:33:29
 */ 
;

(function($, win){

  // Public Parameters
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

  // Custom Code


  

}(jQuery, window));