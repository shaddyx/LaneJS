var FloatingContainer = function(){
	Container.call(this);
	this.type = "FloatingContainer";
	this.addPropertyTranslator(['left','top', "zIndex", "relativity"]);
};

FloatingContainer.zIndex = 1000;
FloatingContainer.getNextZIndex = function(){
	return FloatingContainer.zIndex ++;
};
Util.extend(FloatingContainer,Container);
FloatingContainer.funcs = {};
FloatingContainer.addProperty("zIndex",0,{type:"int"});
FloatingContainer.addProperty("left",0,{type:"int"});
FloatingContainer.addProperty("top",0,{type:"int"});
FloatingContainer.addProperty("relativity",false,{type:"object"});
FloatingContainer.funcs.onAfterDraw = function(){
	this._values.outer.floating(true);
};
FloatingContainer.funcs.beforeDraw = function(){
	if (this._values.zIndex === 0) {
		this.zIndex(FloatingContainer.getNextZIndex());
	}
};
FloatingContainer.on("beforeDraw", FloatingContainer.funcs.beforeDraw);
FloatingContainer.on("afterDraw",FloatingContainer.funcs.onAfterDraw);


