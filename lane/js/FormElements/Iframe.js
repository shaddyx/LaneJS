/**
 * html iframe element
 * @constructor
 */
var Iframe = function() {
	FormElement.call(this);
};
Util.extend(Iframe, FormElement);
Iframe.type = "Iframe";
Iframe.prototype.html = Iframe.addProperty("src","",  {type:"string"});
Iframe.prototype.updateSrc = function(){
	if (this._v.isDrawn){
		this._elements.iFrame.htmlInnerElement.src = this._v.src;
	}
};

Iframe.on("afterDraw", function(){
	this.updateSrc();
});

Iframe.on("srcChanged", Iframe.prototype.updateSrc);