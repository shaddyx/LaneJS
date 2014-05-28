"use strict";
/*
 * TODO: optimize text utils
 */
var TextUtils = function(){
	BaseObject.call(this);
	this.charCodes = [[33, 126], [975, 1230], [8470, 8470], [8592, 8595]]; 
	this.symbolList = [];
	this.fontData = {};
};
Util.extend(TextUtils,BaseObject);

TextUtils.disableCache = true;

TextUtils.prototype._init = function(){
	/*
	 * creating element to width determination
	 */
	if (this._container) {
		return;
	}
	this._container = document.createElement('div');
	this._container.setAttribute("type", "textContainer");
	this._container.style.position = 'absolute';
	this._container.style.left = '0px';
	this._container.style.top = '0px';
	this._textCache = {};
	document.body.appendChild(this._container);
	/*
	 * creating symbol map
	 */
	for (var i in this.charCodes)
	for (var j = this.charCodes[i][0] ; j < this.charCodes[i][1] + 1 ; ++j)
	{
		this.symbolList.push(String.fromCharCode(j));
	}
	this._defaultFontKey = this.getFontKey(this._container);
};

TextUtils.prototype.getFontKey = function(object){
	if (!object){
		return this._defaultFontKey;
	}
	if (object.tagName) {
		var styleData = Util.getWindow(document).getComputedStyle(object, null);
		return styleData.fontFamily + "|" + styleData.fontSize + "|" + styleData.fontWeight;
	} else {
		return object.fontFamily + "|" + object.fontSize + "|" + object.fontWeight;
	}
	
};

TextUtils.prototype.getStringWidth = function(text,key){
	if (!key) {
		key = this._defaultFontKey;  
	} else if (typeof key != "String"){
		key = this.getFontKey(key);
	}
	var fontData = this.determineFontData(key);
	var textlen = text.length;
	var width = 0;
	for(var k = 0; k < textlen; k++){
		var s = text[k] || text.charAt(k);
		var w = fontData[s];
		if (!w){
			debugger;
		}
		width+=w;
	}
	if (width != 0){
		return width + 1;
	}
	return 0;
	
};
TextUtils.prototype.clearCache = function(){
	for (var k in localStorage){
		//console.log(k);
		lStorage.remove(k);
	}
};
TextUtils.prototype.determineFontData = function(key){
	
	if (!key){
		throw new Error("TextUtils error, key must set");
	}
	var fontData;
	if (!browser.ie && !TextUtils.disableCache){
		fontData = lStorage.getObject("tuCache_" + key) || this.fontData[key];
	} else {
		fontData = this.fontData[key];
	}
	
	if (fontData){
		return fontData;
	}
	var fontSpan = document.createElement('spann');
	var fontChunks = key.split("|");
	fontSpan.style.fontFamily = fontChunks[0];
	fontSpan.style.fontSize= fontChunks[1];
	fontSpan.style.fontWeight= fontChunks[2];
	this._container.appendChild(fontSpan);
	fontData = {};
	for (var x = 0; x < this.symbolList.length; ++x)
	{	
		fontData[this.symbolList[x]] = this._getTextWidth(fontSpan, this.symbolList[x]);
	}
	fontData['&'] = this._getTextWidth(fontSpan, '&amp;');
	fontData[' '] = this._getTextWidth(fontSpan, '&nbsp;');
	fontData['<'] = this._getTextWidth(fontSpan, '&lt;');
	fontData['>'] = this._getTextWidth(fontSpan, '&rt;');
	fontData['"'] = this._getTextWidth(fontSpan, '&quot;');
	fontData['\''] = this._getTextWidth(fontSpan, '&#039;');
	this.fontData[key] = fontData;
	if (!browser.ie && !TextUtils.disableCache){
		try{
			lStorage.setObject("tuCache_" + key, fontData);
		} catch (e){
			if (e.description == 'QUOTA_EXCEEDED_ERR') {
				console.log("no space in localStorage",e,e.toString());
			} else {
				throw e;
			}
		}
	}
	this._container.removeChild(fontSpan);
	return fontData;
};

TextUtils.prototype._getTextWidth = function(c,t){
	c.innerHTML= t;
	if (browser.ie) {
		return c.offsetWidth;
	}
	return c.getBoundingClientRect().width;
};

var textUtils;
browser.on("ready",function(){
	textUtils = new TextUtils();
	textUtils._init();
/*	var test = textUtils.getStringWidth("тестовый текст");
	console.log(test);*/
});
