var HtmlBlock = function() {
	FormElement.call(this);
};
Util.extend(HtmlBlock, FormElement);
HtmlBlock.type = "HtmlBlock";
HtmlBlock.prototype.html = HtmlBlock.addProperty("html","",  {type:"string"});
HtmlBlock.prototype.updateHTML = function(){
	if (this._v.isDrawn){
		this._v.inner.htmlInnerElement.innerHTML = this._v.html;
	}
};

HtmlBlock.on("afterDraw", function(){
	this.updateHTML();
});

HtmlBlock.on("htmlChanged", HtmlBlock.prototype.updateHTML);