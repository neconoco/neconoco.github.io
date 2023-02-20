  /*Sidebar gdtv video control script begins */
  pcsb_gdtvvid = {
    init:function(){
      if(document.getElementById && document.createTextNode){
        pcsb_gdtvvid.pcsbVideoDiv = document.getElementById('pcsbVideoDiv');
        pcsb_gdtvvid.pcsbVideoLink = document.getElementById('pcsbVideoLink');
        pcsb_gdtvvid.pcsbVideoLinkText = document.getElementById('pcsbVideoLinkText');
        if(typeof(pcsb_gdtv_videos) !== 'undefined' && typeof(pcsb_gdtv_videos_current_index) !== 'undefined') {
          if(pcsb_gdtv_videos.length > 1) {
            pcsb_gdtvvid.createNav();
          }
        }
      }
    },
    
    createNav:function(){
      var prve = document.getElementById('pcsb_prv');
      var nxte = document.getElementById('pcsb_nxt');
      pcsb_gdtvvid.prev = document.getElementById('pcsb_prvlnk');
      pcsb_gdtvvid.addEvent(pcsb_gdtvvid.prev, 'click', pcsb_gdtvvid.show);
      prve.appendChild(pcsb_gdtvvid.prev);
      pcsb_gdtvvid.next = document.getElementById('pcsb_nxtlnk');
      pcsb_gdtvvid.addEvent(pcsb_gdtvvid.next, 'click', pcsb_gdtvvid.show);
      nxte.appendChild(pcsb_gdtvvid.next);
    },
    
    show:function(e){
      if(this === pcsb_gdtvvid.next || this === pcsb_gdtvvid.prev){
          var addto = (this === pcsb_gdtvvid.next) ? 1 : -1;
          pcsb_gdtv_videos_current_index = pcsb_gdtv_videos_current_index + addto;
          if(pcsb_gdtv_videos_current_index < 0){
            pcsb_gdtv_videos_current_index = (pcsb_gdtv_videos.length-1);
          }
          if(pcsb_gdtv_videos_current_index > (pcsb_gdtv_videos.length-1)){
            pcsb_gdtv_videos_current_index = 0;
          }
          pcsb_gdtvvid.pcsbVideoDiv.style.backgroundImage = 'url(' + pcsb_gdtv_videos[pcsb_gdtv_videos_current_index].imageurl + ')';
          pcsb_gdtvvid.pcsbVideoDiv.title = pcsb_gdtv_videos[pcsb_gdtv_videos_current_index].tooltip;
          pcsb_gdtvvid.pcsbVideoLink.target = pcsb_gdtv_videos[pcsb_gdtv_videos_current_index].target;
          if (pcsb_gdtv_videos[pcsb_gdtv_videos_current_index].href.length > 0) {
            pcsb_gdtvvid.pcsbVideoLink.href = pcsb_gdtv_videos[pcsb_gdtv_videos_current_index].href;
            pcsb_gdtvvid.pcsbVideoLink.onclick = '';
          }
          else {
            pcsb_gdtvvid.pcsbVideoLink.href = 'javascript:{}';
            pcsb_gdtvvid.pcsbVideoLink.onclick = Function(pcsb_gdtv_videos[pcsb_gdtv_videos_current_index].onclick);
          }
          pcsb_gdtvvid.pcsbVideoLinkText.innerHTML = pcsb_gdtv_videos[pcsb_gdtv_videos_current_index].text;
      }
      if (e){
        pcsb_gdtvvid.cancelClick(e);
      }
    },
    
    addEvent:function( obj, type, fn ) {
      if ( obj.attachEvent ) {obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
      obj.attachEvent( 'on'+type, obj[type+fn] );} else
      obj.addEventListener( type, fn, false );
    },
    
    cancelClick:function(e){
      if (window.event) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }
      if (e && e.stopPropagation && e.preventDefault){
        e.stopPropagation();e.preventDefault();
      }
    }
    
  }
  /*Sidebar gdtv video control script ends */

  /* LSB Menu related script begins */
  function pcsb_showhide(id){
    if (document.getElementById) {
      var elem = document.getElementById(id);
      var bShow = 0;
      if (elem) {
        if (elem.style.display == "" || elem.style.display == "block")
          elem.style.display = "none";
        else {
          elem.style.display = "";
          bShow = 1;
        }
        pcsb_SetSidebarNodeState(id, bShow);
      }
    }
  }
  function pcsb_MyProductsOpen(){
    var id = 'pcsb_myproductsdiv';
    if (document.getElementById) {
      var elem = document.getElementById(id);
      if (elem) {
        if (elem.style.display == "none")
          pcsb_showhide(id);
      }
    }
  }
  function pcsb_MyProductsClose(){
    var id = 'pcsb_myproductsdiv';
    if (document.getElementById) {
      var elem = document.getElementById(id);
      if (elem) {
        if (elem.style.display != "none")
          pcsb_showhide(id);
      }
    }
  }
  function pcsb_MyProductsToggle(){
    pcsb_showhide('pcsb_myproductsdiv');
  }
  function pcsb_SetSidebarNodeState(nodename, state) {
    pcsb_cookie.pcsb_setCookie(nodename, state);
  }
  function pcsb_GetSidebarNodeState(nodename) {
    return pcsb_cookie.pcsb_getCookie(nodename);
  }

  pcsb_cookie = {
    pcsb_cookieInit:function(plid){
      pcsb_cookie._pcsb_plid = plid;
      pcsb_cookie._pcsb_cookiename = "LSBNodeStates";
    },
    pcsb_getCookie:function(nodename){
	    var valuepairs = pcsb_cookie._pcsb_getCookieValue();
	    if (null != valuepairs){
	      var arr = valuepairs.split("#");
	      for (i = 0;i < arr.length;++i){
	        var keyval = arr[i].split("-");
	        if (keyval[0] == nodename){
	          if (keyval.length > 1)
	            return keyval[1];
	          break;
	        }
	      }
	    }
	    return null;
    },
    pcsb_setCookie:function(nodename, value){
      var date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      var cookieStr = pcsb_cookie._pcsb_buildCookieString(nodename, value);
      pcsb_cookie._pcsb_setCookie(cookieStr, date, "/", pcsb_cookie._pcsb_getCookieDomain());
    },
    pcsb_showlaststate:function(nodeid, init){
      var bCookieVal = pcsb_cookie.pcsb_getCookie(nodeid);
      var bShow = (bCookieVal == null) ? (init == 1) : (bCookieVal == 1);
      if (document.getElementById){
        var elem = document.getElementById(nodeid);
        if (elem){
          if ((bShow && elem.style.display == "none") || (!bShow && elem.style.display != "none")){ pcsb_cookie._pcsb_showhide(nodeid); }
        }
      }
    },
    _pcsb_setCookie:function(value, expires, path, domain){
	    var curCookie = pcsb_cookie._pcsb_cookiename + pcsb_cookie._pcsb_plid + "=" + value +
	    ((expires) ? "; expires=" + expires.toGMTString() : "") +
	    ((path) ? "; path=" + path : "") +
	    ((domain) ? "; domain=" + domain : "");
	    document.cookie = curCookie;
	    if (window.sync_inapp){ syncPushLeftSidebar(value); }
    },
    _pcsb_showhide:function(id){
      if (document.getElementById){
        var elem = document.getElementById(id);
        if (elem){
          if (elem.style.display == "" || elem.style.display == "block")
            elem.style.display = "none";
          else
            elem.style.display = "";
        }
      }
    },
    _pcsb_getCookieValue:function(){
	    var dc = document.cookie;
	    var prefix = pcsb_cookie._pcsb_cookiename + pcsb_cookie._pcsb_plid + "=";
	    var begin = dc.indexOf("; " + prefix);
	    if (begin == -1){
		    begin = dc.indexOf(prefix);
		    if (begin != 0) return null;
	    } else
		    begin += 2;
	    var end = document.cookie.indexOf(";", begin);
	    if (end == -1) end = dc.length;
	    return unescape(dc.substring(begin + prefix.length, end));
    },
    _pcsb_buildCookieString:function(nodename, value){
      var retStr = "";
      var bNewKeyVal = true;
	    var valuepairs = pcsb_cookie._pcsb_getCookieValue();
	    if (null != valuepairs){
	      var arr = valuepairs.split("#");
	      for (i = 0;i < arr.length;++i){
	        var keyval = arr[i].split("-");
	        if (keyval[0] == nodename){
	          keyval[1] = value;
	          arr[i] = keyval.join("-");
	          bNewKeyVal = false;
	          break;
	        }
	      }
        retStr = arr.join("#");
	    }
      if (bNewKeyVal){
        if (retStr.length > 0) retStr += "#";
        retStr += (nodename + "-" + value);
      }
      return escape(retStr);
    },
    _pcsb_getCookieDomain:function(){
	    var hname = window.location.hostname;
	    var dname = '';
	    var tldstart = hname.lastIndexOf('.');
	    if (tldstart < 0){dname = '.' + hname;}
	    else{
		    if (hname.lastIndexOf('.', tldstart - 1) > -1){dname = hname.substr(hname.lastIndexOf('.', tldstart - 1));}
		    else{dname = '.' + hname;}
	    }
	    return dname;
    }
  }
  /* LSB Menu related script ends */
  
  /* Bob's Blog related script begins */
  pcsb_bobsblog_quote_ticker = {
    init: function(){
      if (document.getElementById) {
        pcsb_bobsblog_quote_ticker.quotes = new Array(
                                '"Great advice in your blog! Thanks!" <br />- Bob R.', 
                                '"Good stuff…fun and informative." <br />- Cape Cod Bri',
                                '"Cool suggestions!!" - Gary P.', 
                                '"Funny video Bob!" - Mark W.',
                                '"As usual - great video blog!" - Bret H.', 
                                '"Love your Rule #16" - Elizabeth S.',
                                '"Keep giving inspiration ~ we can use it." - Berry H.', 
                                '"You hit the nail right on the head…" <br />- Robert C.',
                                '"…one more reason to smile…" <br />- Gene S.',
                                '"That was fantastic." - Archer');
        pcsb_bobsblog_quote_ticker.currentQuoteIndex = -1;
        pcsb_bobsblog_quote_ticker.tickerDisplayElement = document.getElementById('pcsb_bobsblog_quote_span');
        pcsb_bobsblog_quote_ticker.timeoutId = null;
        pcsb_bobsblog_quote_ticker.showDuration = 10000;
        return true;
      }
      else
        return false;
    },
    start: function() {
      if (pcsb_bobsblog_quote_ticker.quotes.length > 0) {
        pcsb_bobsblog_quote_ticker.currentQuoteIndex = 0;
        pcsb_bobsblog_quote_ticker._showQuoteForShowDuration();
      }
    },
    stop: function(){
      if (pcsb_bobsblog_quote_ticker.currentQuoteIndex > -1){
        pcsb_bobsblog_quote_ticker._cancelSlideShow();
      }
    },
    _cancelSlideShow: function(){
      if(typeof pcsb_bobsblog_quote_ticker.timeoutId == "number") {
        window.clearTimeout(pcsb_bobsblog_quote_ticker.timeoutId);
        delete pcsb_bobsblog_quote_ticker.timeoutId;
      }
    },
    _showQuoteForShowDuration: function() {
      pcsb_bobsblog_quote_ticker._cancelSlideShow();
      pcsb_bobsblog_quote_ticker._showCurrentQuote();
      pcsb_bobsblog_quote_ticker.timeoutId = window.setTimeout('pcsb_bobsblog_quote_ticker._showNextQuote()', pcsb_bobsblog_quote_ticker.showDuration);
    },
    _showCurrentQuote: function() {
      var currentQuote = pcsb_bobsblog_quote_ticker.quotes[pcsb_bobsblog_quote_ticker.currentQuoteIndex];
      if (pcsb_bobsblog_quote_ticker.tickerDisplayElement.innerHTML != currentQuote) {
        pcsb_bobsblog_quote_ticker.tickerDisplayElement.innerHTML = currentQuote;
      }
    },
    _showNextQuote : function() {
      delete pcsb_bobsblog_quote_ticker.timeoutId;
      pcsb_bobsblog_quote_ticker.currentQuoteIndex = (pcsb_bobsblog_quote_ticker.currentQuoteIndex + 1) % pcsb_bobsblog_quote_ticker.quotes.length;
      pcsb_bobsblog_quote_ticker._showQuoteForShowDuration();
    }
  }
  /* Bob's blog related script ends */