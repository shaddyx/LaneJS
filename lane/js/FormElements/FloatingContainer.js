/**
 * container with absolute position
 * @constructor
 */
var FloatingContainer = function(){
	Container.call(this);
	this.addPropertyTranslator(['left','top', "zIndex", "relativity"]);
};

FloatingContainer.zIndex = 1000;
FloatingContainer.getNextZIndex = function(){
	return FloatingContainer.zIndex ++;
};
Util.extend(FloatingContainer,Container);
FloatingContainer.type = "FloatingContainer";
FloatingContainer.funcs = {};
FloatingContainer.prototype.zIndex = FloatingContainer.addProperty("zIndex",0,{type:"int"});
FloatingContainer.prototype.left = FloatingContainer.addProperty("left",0,{type:"int"});
FloatingContainer.prototype.top = FloatingContainer.addProperty("top",0,{type:"int"});
FloatingContainer.prototype.relativity = FloatingContainer.addProperty("relativity",false,{type:"object"});
FloatingContainer.funcs.onAfterDraw = function(){
	this._v.outer.floating(true);
};
FloatingContainer.funcs.beforeDraw = function(){
	if (this._v.zIndex === 0) {
		this.zIndex(FloatingContainer.getNextZIndex());
	}
};
FloatingContainer.on("beforeDraw", FloatingContainer.funcs.beforeDraw);
FloatingContainer.on("afterDraw",FloatingContainer.funcs.onAfterDraw);


