var atl_isi_targetDiv;
var atl_isi_siteUrl;
var atl_isi_cachedFlag;
var atl_isi_is_ie6under;
var atl_isi_styles_id = 'atlInsertStyles';
var atl_isi_script_id = 'atlIsiInternationalSelectionInsert';
var atl_isi_querystring = '';

function atlIsiShowElement(elmID) {
    for (i = 0; i < document.getElementsByTagName(elmID).length; i++) {
        obj = document.getElementsByTagName(elmID)[i];
        if (!obj || !obj.offsetParent) continue;
        if (is_ie && (obj.readyState == 4) && (obj.tagName.toUpperCase() == 'OBJECT')) continue;
        obj.style.visibility = '';
    }
}

function atlIsiHideElement(elmID, overDiv) {
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


function atlIsiInitializeEx(targetDiv, siteUrl, queryString) {
    atl_isi_querystring = queryString;
    atlIsiInitialize(targetDiv, siteUrl);
}

function atlIsiInitialize(targetDiv, siteUrl) {
    atl_isi_siteUrl = siteUrl;
    atl_isi_targetDiv = targetDiv;
    atl_isi_cachedFlag = false;
    var agt = navigator.userAgent.toLowerCase();
    var is_safari = agt.indexOf("safari") != -1;
    var is_ie = agt.indexOf("msie") != -1;
    var is_ie6under = false;
    if (is_ie) {
        atl_isi_is_ie6under = (agt.indexOf("msie 6") != -1 || agt.indexOf("msie 5") != -1 || agt.indexOf("msie 4") != -1);
    }
}

function atlIsiFindChildNode(node, findId) {
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

function atlIsiClearCache() {
    atl_isi_cachedFlag = false;
}

function atlIsiShowInt() {
    if (atl_isi_targetDiv != null) {
        if (atl_isi_is_ie6under) {
            atlIsiHideElement('SELECT', atl_isi_targetDiv);
        }
        atl_isi_targetDiv.style.display = 'block';
    }
}

function atlIsiShow() {
    if (atl_isi_cachedFlag == true) {
        atlIsiShowInt();
    }
    else {
        atlIsiCallForContent();
    }
}

function atlIsiCallForContent() {
	var request = atl_isi_siteUrl + "Cart/InternationalSelectionInsert.aspx";
  if (atl_isi_querystring.length == 0) {
      request = request + "?callback=atlIsiFillDiv";
  }
  else {
      request = request + atl_isi_querystring + "&callback=atlIsiFillDiv";
  }

    var head = document.getElementsByTagName("head").item(0);
    var existingNode = atlIsiFindChildNode(head, atl_isi_script_id);

    var script = document.createElement("script");
    script.setAttribute("id", atl_isi_script_id);
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

function atlIsiFillDiv(intlSelectionData) {
    if ((intlSelectionData != null) && (atl_isi_targetDiv != null)) {
        if (intlSelectionData.StyleSheet.length > 0) {
            var head = document.getElementsByTagName("head").item(0);
            var existingNode = atlIsiFindChildNode(head, atl_isi_styles_id);
            if (existingNode == null) {
                var csslink = document.createElement("link");
                csslink.setAttribute("id", atl_isi_styles_id);
                csslink.setAttribute("type", "text/css");
                csslink.setAttribute("rel", "stylesheet");
                csslink.setAttribute("href", intlSelectionData.StyleSheet);
                csslink.setAttribute("media", "screen");
								head.appendChild(csslink);
            }
        }
        atl_isi_targetDiv.innerHTML = intlSelectionData.Html;
        atl_isi_cachedFlag = true;

        atlIsiShowInt();
    }
}

function atlIsiClose() {
    if (atl_isi_targetDiv != null) {
        atl_isi_targetDiv.style.display = 'none';
        if (atl_isi_is_ie6under) {
            atlIsiShowElement('SELECT');
        }
    }
}

function atlIsiGoToUrl(url) {
    window.location = url;
}

function atlIsiCountryChange(countrySelectId, currencySelectId, matchSelectId) {
    var matchSelect = document.getElementById(matchSelectId);
    var countrySelect = document.getElementById(countrySelectId);
    var currencySelect = document.getElementById(currencySelectId);

    var preselectCurrency = '';
    var selectedCountryCode = countrySelect.options[countrySelect.selectedIndex].value;
    for (var i = 0; i < matchSelect.options.length; i++) {
        var matchOption = matchSelect.options[i];
        if (matchOption.text == selectedCountryCode) {
            preselectCurrency = matchOption.value;
            break;
        }
    }

    if (preselectCurrency.length > 0) {
        for (var j = 0; j < currencySelect.options.length; j++) {
            var currencyOption = currencySelect.options[j];
            if (currencyOption.value == preselectCurrency) {
                currencyOption.selected = true;
                var disclaimerdiv = document.getElementById("crncydisclaimer");
                if (preselectCurrency != "USD") {
                    disclaimerdiv.style.display = 'inline';
                }
                else {
                    disclaimerdiv.style.display = 'none';
                }
                break;
            }
        }
    }

    atlIsiShowOffer(selectedCountryCode, countrySelect);
}

function atlIsiShowOffer(selectedCountryCode, countrySelect) {
    for (var i = 0; i < countrySelect.options.length; i++) {
        var currentCountryCode = countrySelect.options[i].value;
        var offerDivId = 'isiOffer_' + currentCountryCode;
        var offerDiv = document.getElementById(offerDivId)
        if (offerDiv != null) {
            if (currentCountryCode == selectedCountryCode) {
                offerDiv.style.display = 'block';
            }
            else {
                offerDiv.style.display = 'none';
            }
        }
    }
}

function atlIsiSave(countrySelectId, currencySelectId, suffix) {
    var countrySelect = document.getElementById(countrySelectId);
    var currencySelect = document.getElementById(currencySelectId);

    var selectedCountryCode = countrySelect.options[countrySelect.selectedIndex].value;
    var selectedCurrency = currencySelect.options[currencySelect.selectedIndex].value;

    var currencyCookieName = 'currency' + suffix;
    atlIsiSetCookie(currencyCookieName, 'potableSourceStr=' + selectedCurrency);
    var flagCookieName = 'flag' + suffix;
    atlIsiSetCookie(flagCookieName, 'cflag=' + selectedCountryCode);

    if (window.sync_push_url) {
        syncPushCurrencyAndFlag(selectedCurrency, selectedCountryCode);
    }

    var r1 = new RegExp("[&|?]currencytype=[^&]*", "i");
    var redirect = window.location.href.replace(r1, '');
    var r2 = new RegExp("#.*", "");
    redirect = redirect.replace(r2, '');
    window.location.href = redirect;
}

function atlIsiCookieDomain() {
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

function atlIsiSetCookie(name, value) {
    var currentDT = new Date();
    var expires = new Date(Date.parse(currentDT.getDay() + "/" + currentDT.getMonth() + "/" + (currentDT.getFullYear() + 1)));
    var curCookie = name + "=" + value +
      "; expires=" + expires.toGMTString() + "; path=/; domain=" + atlIsiCookieDomain();
    document.cookie = curCookie;
}
function atlIsiGetCrncyType(suffix) {
    var CrncyTypeCookieName = 'currency' + suffix;
    var currency = atlIsiReadCookie(CrncyTypeCookieName);
    if (currency.length == 0) {
        currency = 'USD';
    }
    else {
        var equalpos = currency.indexOf('=');
        if ((equalpos > -1)&& (equalpos < currency.length)) {
            currency = currency.substring(equalpos + 1, currency.length);
        }
    }
    return currency;
}
function atlIsiGetFlag(suffix) {
    var flagCookieName = 'flag' + suffix;
    var flag = atlIsiReadCookie(flagCookieName);
    if (flag.length == 0) {
        flag = 'us';
    }
    else {
        var equalpos = flag.indexOf('=');
        if ((equalpos > -1)&& (equalpos < flag.length)) {
            flag = flag.substring(equalpos + 1, flag.length);
        }
    }
    return flag;
}

function atlIsiReadCookie(name) {
    var cookiecontent = new String();
    if (document.cookie.length > 0) {
    	var cookiename = name + '=';
	    var cookiebegin = document.cookie.indexOf(cookiename);
	    var cookieend = 0;
	    if(cookiebegin > -1) {
		    cookiebegin += cookiename.length;
		    cookieend = document.cookie.indexOf(";",cookiebegin);
		    if (cookieend < cookiebegin) {
		        cookieend = document.cookie.length; 
		    }
		    cookiecontent = document.cookie.substring(cookiebegin,cookieend);
		}
    }
    return unescape(cookiecontent);
}

function atlIsiChangeCurrency(currencySelectId, suffix) {
    var currencySelect = document.getElementById(currencySelectId);
    var selectedCurrency = currencySelect.options[currencySelect.selectedIndex].value;
    var disclaimerdiv = document.getElementById("crncydisclaimer");
    if (selectedCurrency != "USD") {
        disclaimerdiv.style.display = 'inline';
    }
    else {
        disclaimerdiv.style.display = 'none';
    } 
}    

