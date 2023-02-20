var atl_chi_marketplace = '0';
var atl_chi_targetDiv;
var atl_chi_siteUrl;
var atl_chi_cachedFlag;
var atl_chi_is_ie6under;
var atl_chi_styles_id = 'atlInsertStyles';
var atl_chi_script_id = 'atlChiCartHeaderInsert';
var atl_chi_curchanged = false;
var atl_chi_skipshow = false;
var atl_chi_querystring = '';

function atlChiShowElement(elmID) {
    for (i = 0; i < document.getElementsByTagName(elmID).length; i++) {
        obj = document.getElementsByTagName(elmID)[i];
        if (!obj || !obj.offsetParent) continue;
        if (is_ie && (obj.readyState == 4) && (obj.tagName.toUpperCase() == 'OBJECT')) continue;
        obj.style.visibility = '';
    }
}

function atlChiHideElement(elmID, overDiv) {
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

function atlChiInitializeEx(targetDiv, siteUrl, queryString) {
    atl_chi_querystring = queryString;
    atlChiInitialize(targetDiv, siteUrl);
}

function atlChiInitialize(targetDiv, siteUrl) {
    atl_chi_siteUrl = siteUrl;
    atl_chi_targetDiv = targetDiv;
    atl_chi_cachedFlag = false;
    var agt = navigator.userAgent.toLowerCase();
    var is_safari = agt.indexOf("safari") != -1;
    var is_ie = agt.indexOf("msie") != -1;
    var is_ie6under = false;
    if (is_ie) {
        atl_chi_is_ie6under = (agt.indexOf("msie 6") != -1 || agt.indexOf("msie 5") != -1 || agt.indexOf("msie 4") != -1);
    }
}

function atlChiFindChildNode(node, findId) {
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

function atlChiClearCache() {
    atl_chi_cachedFlag = false;
}

function atlChiShowInt() {
    if (atl_chi_targetDiv != null) {
        if (atl_chi_is_ie6under) {
            atlChiHideElement('SELECT', atl_chi_targetDiv);
        }
        atl_chi_targetDiv.style.display = 'block';
    }
}

function atlChiShow(currency) {
    atlChiShowEx(currency, '');
}

function atlChiShowEx(currency, marketplace) {
    if (atl_chi_cachedFlag == true) {
        atlChiShowInt();
    }
    else {
        atlChiCallForContentEx(currency, marketplace);
    }
}

function atlChiCallForContent(currency) {
    atlChiCallForContentEx(currency, '');
}

function atlChiCallForContentEx(currency, marketplace) {
    var request = atl_chi_siteUrl + "Cart/CartHeaderInsert.aspx";
    if (atl_chi_querystring.length == 0) {
        request = request + "?callback=atlChiFillDiv";
    }
    else {
        request = request + atl_chi_querystring + "&callback=atlChiFillDiv";
    }

    if ((currency != null) && (currency != '')) {
        request = request + "&currencyType=" + currency;
    }

    if ((marketplace != null) && (marketplace != '')) {
        request = request + "&marketplace=" + marketplace;
    }

    var head = document.getElementsByTagName("head").item(0);
    var existingNode = atlChiFindChildNode(head, atl_chi_script_id);

    var script = document.createElement("script");
    script.setAttribute("id", atl_chi_script_id);
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

function atlChiFillDiv(cartData) {
    if ((cartData != null) && (atl_chi_targetDiv != null)) {
        if (cartData.StyleSheet.length > 0) {
            var head = document.getElementsByTagName("head").item(0);
            var existingNode = atlChiFindChildNode(head, atl_chi_styles_id);
            if (existingNode == null) {
                var csslink = document.createElement("link");
                csslink.setAttribute("id", atl_chi_styles_id);
                csslink.setAttribute("type", "text/css");
                csslink.setAttribute("rel", "stylesheet");
                csslink.setAttribute("href", cartData.StyleSheet);
                csslink.setAttribute("media", "screen");
                head.appendChild(csslink);
            }
        }
        atl_chi_targetDiv.innerHTML = cartData.Html;
        atl_chi_cachedFlag = true;

        if (!atl_chi_skipshow)
            atlChiShowInt();
    }
}

function atlChiClose() {
    atl_chi_skipshow = false;
    if (atl_chi_targetDiv != null) {
        atl_chi_targetDiv.style.display = 'none';
        if (atl_chi_is_ie6under) {
            atlChiShowElement('SELECT');
        }
        if (atl_chi_curchanged) {
            var r1 = new RegExp("[&|?]currencytype=[^&]*", "i");
            var redirect = window.location.href.replace(r1, '');
            var r2 = new RegExp("#.*", "");
            redirect = redirect.replace(r2, '');
            window.location.href = redirect;
        }
    }
}

function atlChiGoToUrl(url) {
    window.location = url;
}

function atlChiChangeCurrency(currencySelectId, suffix) {
    atlChiChangeCurrencyEx(currencySelectId, suffix, '');
}

function atlChiChangeCurrencyEx(currencySelectId, suffix, marketplace) {
    var currencySelect = document.getElementById(currencySelectId);
    var selectedCurrency = currencySelect.options[currencySelect.selectedIndex].value;
    var currencyCookieName = 'currency' + suffix;
    atlChiSetCookie(currencyCookieName, 'potableSourceStr=' + selectedCurrency);
    atl_chi_curchanged = true;
    if (window.sync_inapp) {
        if (sync_inapp != 'gdtv') {
            syncPushCurrency(selectedCurrency);
        }
    }
    atl_chi_skipshow = true;
    atlChiCallForContentEx(selectedCurrency, marketplace);
}

function atlChiShowMarketplaceTab() {
    atl_chi_skipshow = true;
    atlChiCallForContentEx('', 'true');
}

function atlChiShowStandardTab() {
    atl_chi_skipshow = true;
    atlChiCallForContentEx('', 'false');
}

function atlChiCookieDomain() {
    var hname = window.location.hostname;
    var tldstart = hname.lastIndexOf('.');
    if (tldstart < 0) {
        return '.' + hname;
    }
    else {
        var dname = '';
        if (hname.lastIndexOf('.', tldstart - 1) > -1) {
            dname = hname.substr(hname.lastIndexOf('.', tldstart - 1));
        }
        else {
            dname = '.' + hname;
        }
        return dname;
    }
}

function atlChiSetCookie(name, value) {
    var currentDT = new Date();
    var expires = new Date(Date.parse(currentDT.getDay() + "/" + currentDT.getMonth() + "/" + (currentDT.getFullYear() + 1)));
    var curCookie = name + "=" + value +
      "; expires=" + expires.toGMTString() + "; path=/; domain=" + atlChiCookieDomain();
    document.cookie = curCookie;
}
