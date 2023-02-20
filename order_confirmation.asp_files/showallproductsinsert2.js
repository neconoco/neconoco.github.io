var atl_sap_targetDiv;
var atl_sap_siteUrl;
var atl_sap_is_ie6under;
var atl_sap_styles_id = 'atlInsertStyles';
var atl_sap_script_id = 'atlSapShowAllProductsInsert';
var atl_sap_querystring = '';

function atlSapShowElement(elmID) {
    for (i = 0; i < document.getElementsByTagName(elmID).length; i++) {
        obj = document.getElementsByTagName(elmID)[i];
        if (!obj || !obj.offsetParent) continue;
        if (is_ie && (obj.readyState == 4) && (obj.tagName.toUpperCase() == 'OBJECT')) continue;
        obj.style.visibility = '';
    }
}

function atlSapHideElement(elmID, overDiv) {
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

function atlSapInitialize(targetDiv, siteUrl) {
    atl_sap_siteUrl = siteUrl;
    atl_sap_targetDiv = targetDiv;
    var agt = navigator.userAgent.toLowerCase();
    var is_safari = agt.indexOf("safari") != -1;
    var is_ie = agt.indexOf("msie") != -1;
    var is_ie6under = false;
    if (is_ie) {
        atl_sap_is_ie6under = (agt.indexOf("msie 6") != -1 || agt.indexOf("msie 5") != -1 || agt.indexOf("msie 4") != -1);
    }
}

function atlSapInitializeEx(targetDiv, siteUrl, queryString) {
    atl_sap_querystring = queryString;
    atlSapInitialize(targetDiv, siteUrl);
}

function atlSapFindChildNode(node, findId) {
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

function atlSapShowInt() {
    if (atl_sap_targetDiv != null) {
        if (atl_sap_is_ie6under) {
            atlSapHideElement('SELECT', atl_sap_targetDiv);
        }
        atl_sap_targetDiv.style.display = 'block';
    }
}

function atlSapShow() {
    atlSapCallForContent();
}

function atlSapCallForContent() {
    var request = atl_sap_siteUrl + "Products/ShowAllProductsInsert.aspx";
    if (atl_sap_querystring.length == 0) {
        request = request + "?callback=atlSapFillDiv";
    }
    else {
        request = request + atl_sap_querystring + "&callback=atlSapFillDiv";
    }
    
    var head = document.getElementsByTagName("head").item(0);
    var existingNode = atlSapFindChildNode(head, atl_sap_script_id);

    var script = document.createElement("script");
    script.setAttribute("id", atl_sap_script_id);
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

function atlSapFillDiv(intlSelectionData) {
    if ((intlSelectionData != null) && (atl_sap_targetDiv != null)) {
        if (intlSelectionData.StyleSheet.length > 0) {
            var head = document.getElementsByTagName("head").item(0);
            var existingNode = atlSapFindChildNode(head, atl_sap_styles_id);
            if (existingNode == null) {
                var csslink = document.createElement("link");
                csslink.setAttribute("id", atl_sap_styles_id);
                csslink.setAttribute("type", "text/css");
                csslink.setAttribute("rel", "stylesheet");
                csslink.setAttribute("href", intlSelectionData.StyleSheet);
                csslink.setAttribute("media", "screen");
								head.appendChild(csslink);
            }
        }
        atl_sap_targetDiv.innerHTML = intlSelectionData.Html;

        atlSapShowInt();
    }
}

function atlSapClose() {
    if (atl_sap_targetDiv != null) {
        atl_sap_targetDiv.style.display = 'none';
        if (atl_sap_is_ie6under) {
            atlSapShowElement('SELECT');
        }
    }
}

function atlSapGoToUrl(url) {
    window.location = url;
}
