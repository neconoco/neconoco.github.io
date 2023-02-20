var atl_sli_targetDiv;
var atl_sli_siteUrl;
var atl_sli_cachedFlag;
var atl_sli_is_ie6under;
var atl_sli_styles_id = 'atlInsertStyles';
var atl_sli_script_id = 'atlSliSsoLoginInsert';
var atl_sli_skipprompt = false;
var atl_sli_targeturl = '';
var atl_sli_spkey = '';
var atl_sli_querystring = '';

function atlSliShowElement(elmID) {
    for (i = 0; i < document.getElementsByTagName(elmID).length; i++) {
        obj = document.getElementsByTagName(elmID)[i];
        if (!obj || !obj.offsetParent) continue;
        if (is_ie && (obj.readyState == 4) && (obj.tagName.toUpperCase() == 'OBJECT')) continue;
        obj.style.visibility = '';
    }
}

function atlSliHideElement(elmID, overDiv) {
    for (i = 0; i < document.getElementsByTagName(elmID).length; i++) {
        obj = document.getElementsByTagName(elmID)[i];
        if (!obj || !obj.offsetParent) continue;
        // Find the element's offsetTop and offsetLeft relative to the BODY tag.
        objLeft = obj.offsetLeft - overDiv.offsetParent.offsetLeft;
        objTop = obj.offsetTop;
        objParent = obj.offsetParent;
        while ((objParent.tagName.toUpperCase() != 'BODY') && (objParent.tagName.toUpperCase() != 'HTML')) {
            objLeft += objParent.offsetLeft;
            objTop += objParent.offsetTop;
            objParent = objParent.offsetParent;
        }
        objHeight = obj.offsetHeight;
        objWidth = obj.offsetWidth;
        if ((overDiv.offsetLeft + overDiv.offsetWidth) <= objLeft);
        else if ((overDiv.offsetParent.offsetTop + overDiv.offsetHeight + 20) <= objTop);
        else if (overDiv.offsetParent.offsetTop >= eval(objTop + objHeight));
        else if (overDiv.offsetLeft >= eval(objLeft + objWidth));
        else {
            obj.style.visibility = 'hidden';
        }
    }
}

function atlSliInitializeEx(targetDiv, siteUrl, spkey, queryString) {
    atl_sli_querystring = queryString;
    atlSliInitialize(targetDiv, siteUrl, spkey);
}

function atlSliInitialize(targetDiv, siteUrl, spkey) {
    atl_sli_skipprompt = false;
    atl_sli_siteUrl = siteUrl;
    atl_sli_targetDiv = targetDiv;
    atl_sli_cachedFlag = false;
    atl_sli_spkey = spkey;
    var agt = navigator.userAgent.toLowerCase();
    var is_safari = agt.indexOf("safari") != -1;
    var is_ie = agt.indexOf("msie") != -1;
    var is_ie6under = false;
    if (is_ie) {
        atl_sli_is_ie6under = (agt.indexOf("msie 6") != -1 || agt.indexOf("msie 5") != -1 || agt.indexOf("msie 4") != -1);
    }
}

function atlSliSetSkipPrompt(skipPrompt) {
    atl_sli_skipprompt = skipPrompt;
}

function atlSliFindChildNode(node, findId) {
    var existingNode = null;
    if (node.hasChildNodes) {
        var currentNode = node.firstChild;
        while (currentNode != null) {
            if (currentNode.id == findId) {
                existingNode = currentNode;
                break;
            }
            currentNode = currentNode.nextSibling;
        }
    }
    return existingNode;
}

function atlSliClearCache() {
    atl_sli_cachedFlag = false;
}

function atlSliShowInt() {
    if (atl_sli_targetDiv != null) {
        if (atl_sli_is_ie6under) {
            atlSliHideElement('SELECT', atl_sli_targetDiv);
        }
        atl_sli_targetDiv.style.display = 'block';
    }
    var loginbox = document.getElementById('fossli_login');
    loginbox.focus();    
}

function atlSliShow() {
    if (atl_sli_cachedFlag == true) {
        atlSliShowInt();
    }
    else {
        atlSliCallForContent();
    }
}

function atlSliRedirectToAccountUrl(targetUrl) {
    if (atl_sli_skipprompt == true) {
        window.location = targetUrl;
    }
    else {
        atl_sli_targeturl = targetUrl;
        atlSliShow();
    }
}

function atlSliRedirectToAccountUrlWindow(targetUrl) {
    if (atl_sli_skipprompt == true) {
        window.open(targetUrl, "_blank");
    }
    else {
        var newWindowOpenerPageURL = atl_sli_siteUrl + "Sso/SSONewWindowOpener.htm?popupURL=" + encodeURIComponent(targetUrl) + "&redirectURL=" + encodeURIComponent(window.location.toString());
        atl_sli_targeturl = newWindowOpenerPageURL;
        atlSliShow();
    }
}

function atlSliCheckEnter(e) {
    var charCode;
    if (window.event) {
        e = window.event;
        charCode = window.event.keyCode;
    }
    else if (e) {
        charCode = e.which;
    }

    if (charCode == 13) {
        atlSliLoginClick(e);
        return false;
    }
    else {
        return true;
    }
}

function atlSliLoginClick(ev) {
    var loginbox = document.getElementById('fossli_login');
    var passwordbox = document.getElementById('fossli_password');
    pchj_loginex(loginbox.value, passwordbox.value, encodeURIComponent(atl_sli_targeturl), '13077', ev);
}

function atlSliCallForContent() {
	var request = atl_sli_siteUrl + "Sso/SsoLoginInsert.aspx";
  if (atl_sli_querystring.length == 0) {
      request = request + "?callback=atlSliFillDiv&spkey=" + atl_sli_spkey;
  }
  else {
      request = request + atl_sli_querystring + "&callback=atlSliFillDiv&spkey=" + atl_sli_spkey;
  }

    var head = document.getElementsByTagName("head").item(0);
    var existingNode = atlSliFindChildNode(head, atl_sli_script_id);

    var script = document.createElement("script");
    script.setAttribute("id", atl_sli_script_id);
    script.setAttribute("type", "text/javascript");
    script.setAttribute("language", "javascript");
    script.setAttribute("src", request);

    if (existingNode != null) {
        head.replaceChild(script, existingNode);
    }
    else {
        head.appendChild(script);
    }
}

function atlSliFillDiv(intlSelectionData) {
    if ((intlSelectionData != null) && (atl_sli_targetDiv != null)) {
        if (intlSelectionData.StyleSheet.length > 0) {
            var head = document.getElementsByTagName("head").item(0);
            var existingNode = atlSliFindChildNode(head, atl_sli_styles_id);
            if (existingNode == null) {
                var csslink = document.createElement("link");
                csslink.setAttribute("id", atl_sli_styles_id);
                csslink.setAttribute("type", "text/css");
                csslink.setAttribute("rel", "stylesheet");
                csslink.setAttribute("href", intlSelectionData.StyleSheet);
                csslink.setAttribute("media", "screen");
								head.appendChild(csslink);
            }
        }
        atl_sli_targetDiv.innerHTML = intlSelectionData.Html;
        atl_sli_cachedFlag = true;

        atlSliShowInt();
    }
}

function atlSliClose() {
    if (atl_sli_targetDiv != null) {
        atl_sli_targetDiv.style.display = 'none';
        if (atl_sli_is_ie6under) {
            atlSliShowElement('SELECT');
        }
        var loginbox = document.getElementById('fossli_login');
        loginbox.value = "";
        var passwordbox = document.getElementById('fossli_password');
        passwordbox.value = "";
    }
}

function atlSliGetQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return '';
} 
