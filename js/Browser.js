"use strict";
var topZIndex = 2147483647;
var BrowserObject = function() {
	//	
	// BrowserObject must be a singleton
	//	
	if (BrowserObject.instance) {
		return BrowserObject.instance;
	}
	BrowserObject.instance = this;
	BaseObject.call(this);
	this.firefox = false;
	this.chrome = false;
	this.ie = false;
	this.safari = false;
	this.opera = false;
	this.name = "ie";
	this.version = 0;
	this.initialized = false;
	/*
	 * 
	 * getting browser params
	 * 
	 */
};

Util.extend(BrowserObject, BaseObject);

BrowserObject.addProperty("imageBase", "");
BrowserObject.addProperty("width", false);
BrowserObject.addProperty("height", false);
BrowserObject.addProperty("mouseX", false);
BrowserObject.addProperty("mouseY", false);

BrowserObject.prototype.init = function() {
	this.initialized = true;
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('opera') != -1) {
		this.opera = true;
	} else if (userAgent.indexOf('chrome') != -1) {
		this.chrome = true;
	} else {
		if (navigator.appCodeName == 'Mozilla') {
			if (navigator.userAgent.indexOf('MSIE') != -1) {
				this.ie = true;
				
				this.version = (new RegExp("compatible; MSIE ([0-9\.]{1,4})","g")).exec(navigator.userAgent)[1];
			} else {
				this.firefox = true;
			}
		}
	}
	if (this.firefox)
		this.name = "firefox";
	if (this.chrome)
		this.name = "chrome";
	if (this.ie)
		this.name = "ie";
	if (this.safari)
		this.name = "safari";
	if (this.opera)
		this.name = "opera";
	/*
	 * localstorage fix
	 */
	if (!window.localStorage) {
		window.localStorage = {};
	}
	var propertiesMap = {
		firefox : {
			borderRadiusProperty : "borderRadius",
			selectionProperty : "MozUserSelect",
			selectionPropertyValues : [ 'text', "-moz-none" ],
			shadowProperty : 'MozBoxShadow',
			transitionProperty : 'MozTransition',
			transformProperty : "MozTransform"
		},
		chrome : {
			borderRadiusProperty : "webkitBorderRadius",
			selectionProperty : "webkitUserSelect",
			selectionPropertyValues : [ 'text', "none" ],
			shadowProperty : 'webkitBoxShadow',
			transitionProperty : 'webkitTransition',
			transformProperty : "webkitTransform"
		},
		ie : {
			borderRadiusProperty : "borderRadius",
			selectionProperty : "UserSelect",
			selectionPropertyValues : [ 'text', "none" ],
			shadowProperty : 'boxShadow',
			transitionProperty : 'transition',
			transformProperty : "oTransform"
		},
		opera : {
			borderRadiusProperty : "borderRadius",
			selectionProperty : "OUserSelect",
			selectionPropertyValues : [ 'text', "none" ],
			shadowProperty : 'boxShadow',
			transitionProperty : 'OTransition',
			transformProperty : "msTransform",
			opacityProperty : "msTransform"
		}
	};
	if (typeof document.body.style.opacity == 'string') {
		// CSS3 compliant (Moz 1.7+, Safari 1.2+, Opera 9)
		this.opacityProperty = 'opacity';
	}
	else if (typeof document.body.style.MozOpacity == 'string') {
		// Mozilla 1.6 и младше, Firefox 0.8
		this.opacityProperty = 'MozOpacity';
	}
	else if (typeof document.body.style.KhtmlOpacity == 'string') {
		// Konqueror 3.1, Safari 1.1
		this.opacityProperty = 'KhtmlOpacity';
	}
	else if (document.body.filters && navigator.appVersion.match(/MSIE ([\d.]+);/)[1]>=5.5) {
		// Internet Exploder 5.5+
		this.opacityProperty = 'filter';
	}
	this.propertiesMap = propertiesMap[this.name];
};

BrowserObject.on([ "widthChanged", "heightChanged" ], function() {
	this.trigger("sizeChanged");
});

var browser = new BrowserObject();

BrowserObject.mouseMoveFunction = function(e) {
		var x,y;
		if (browser.ie) {
			x = event.clientX + document.body.scrollLeft;
			y = event.clientY + document.body.scrollTop;
		} else {
			x = e.pageX;
			y = e.pageY;
		}
		if (x < 0) {
			x = 0;
		}
		if (y < 0) {
			y = 0;
		}
		var tmpE = {};
		for ( var k in e) {
			tmpE[k] = e[k];
		}
		tmpE.type = "mousemove";
		browser.mouseX(x);
		browser.mouseY(y);
		browser.trigger(tmpE);
		return true;
};
Util.addListener(document.body, 'mousemove', BrowserObject.mouseMoveFunction);


/**
 * triggering ready to Browser
 */
window.onload = function() {
	browser.init();
	browser.trigger("ready");
	window.onresize = function() {
		var winW = 0, winH = 0;
		if (document.body && document.body.offsetWidth) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
		if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
			winW = document.documentElement.offsetWidth;
			winH = document.documentElement.offsetHeight;
		}
		if (window.innerWidth && window.innerHeight) {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		browser.width(winW);
		browser.height(winH);
	};
	window.onresize();
};
