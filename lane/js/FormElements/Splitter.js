var Splitter = function(){
	FormElement.call(this);
	this.removePropertyTranslator("hs");
	this.removePropertyTranslator("vs");
	this.removePropertyTranslator("width");
	this.removePropertyTranslator("height");
};
Util.extend(Splitter,FormElement);
Splitter.type = "Splitter";
FormElement.prototype.percent = FormElement.addProperty("percent",100, {type:"float"});
/**
 * overriding component builder
 * @override
 * @param struct
 */
Splitter.prototype.componentBuilder = function(opts){
	if (!window[this.type + "Skin"]){
		throw new Error("No skin for:" + this.type);
	}
	if (!window[this.type + "Skin"][this.skin()]){
		throw new Error("No skin for:" + this.type);
	}
	this.buildComponent(window[this.type + "Skin"][this.skin()][opts.target._v.horizontal?"vertical":"horizontal"]);
};

Splitter.prototype._updatePercentage = function() {
	var parent = this.parent();
	if (parent){
		var element = parent.children().get(0);
		element.sizeRatio(this._v.percent)
	}
};
Splitter.prototype._afterDraw = function(){
	this._updatePercentage();
};
Splitter.on("percentChanged",Splitter.prototype._updatePercentage);
Splitter.on("afterDraw",Splitter.prototype._afterDraw);