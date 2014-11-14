var PopupMenu = function() {
	FloatingContainer.call(this);
};
Util.extend(PopupMenu, FloatingContainer);
PopupMenu.type = "PopupMenu";
PopupMenu.prototype.component = PopupMenu.addProperty("component", false, {type:"FormElement"});

PopupMenu.build = function(struct){
	if (struct.type != "PopupMenu") {
		throw new Error("Structure of PopupMenu must start from PopupMenu");
	}
	return FormElement.build(struct, rootElement);
};

PopupMenu.prototype.recalcPosition = function(){
	a = this.outer();
	this.left(browser.mouseX());
	this.top(browser.mouseY());
	this.zIndex(topZIndex);
};
PopupMenu.prototype.hide = function(){
	this.remove();
}
PopupMenu.func.afterDraw = function() {
	this.recalcPosition();
	rootElement.on("click",PopupMenu.prototype.hide,this);
};

PopupMenu.func.removed = function() {
	rootElement.removeListener("click",PopupMenu.prototype.hide,this);
};

PopupMenu.on("afterDraw", PopupMenu.func.afterDraw);
PopupMenu.on("visibleChanged", PopupMenu.prototype.recalcPosition);
PopupMenu.on("removed", PopupMenu.func.removed);
PopupMenu.on("menuItemPressed", function(el){
	//console.log(el.caption());
	if (this._v.component) {
		this._v.component.trigger("menuItemPressed", el);
	}
});