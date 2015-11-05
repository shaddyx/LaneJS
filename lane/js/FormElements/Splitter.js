/**
 * Splitter, an element, which resizes elements, between which it is located
 * @constructor
 */
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
		var children = parent.children();
		var outer = this._v.outer;
		if (!outer.neibourIndex){
			throw new Error("Splitter can not be first child");
		}
		var element = children.get(outer.neibourIndex - 1);

		element.sizeRatio(this._v.percent);
	}
};
Splitter.prototype._afterDraw = function(){
	this._v.outer.on("mousedown", this.__startDrag, this);
	this._updatePercentage();
};
Splitter.prototype.__calcPercent = function(pos, size){
	return ((pos/(size/2)) * 100);
};
Splitter.prototype.__startDrag = function(){
	var my = this;
	var abs = this._v.outer.getAbsolutePosition();
	var outer = my._v.outer;
	this.dragStarted = {x: browser.mouseX() - abs.left, y: browser.mouseY() - abs.top};
	var horizontal = this.parent().horizontal();
	var helper = BoxElement.build(SplitterHelper[this.skin()][this.parent()._v.horizontal?"vertical":"horizontal"], rootElement);
	helper.width(outer.width());
	helper.height(outer.height());
	helper.left(abs.left);
	helper.top(abs.top);
	var moveFunction = function(){
		if (horizontal){
			helper.left(browser.mouseX() - this.dragStarted.x);
		} else {
			helper.top(browser.mouseY() - this.dragStarted.y);
		}
	};
	var upFunction = function(){
		my.dragStarted = false;
		helper.remove();
		document.body.removeEventListener("mouseup", upFunction);
		rootElement.removeListener("mousemove", moveFunction);
		if (horizontal){
			var newX = outer.left() + helper.left() - abs.left;
			var percent = my.__calcPercent(newX, my.parent().width());
			my.percent(percent);
		} else {
			var newY = outer.top() + helper.top() - abs.top;
			my.percent(my.__calcPercent(newY, my.parent().height()));
		}
	};
	rootElement.on("mousemove",moveFunction , this);
	document.body.addEventListener("mouseup", upFunction);

};
Splitter.on("percentChanged",Splitter.prototype._updatePercentage);
Splitter.on("afterDraw",Splitter.prototype._afterDraw);