var FieldSet = function() {
	Container.call(this);
	this.type = "FieldSet";
};

Util.extend(FieldSet, Container);
FieldSet.funcs = {};

FieldSet.funcs.updateCollapsed = function(){
	this.elements.container.visible(this._values.collapsed);
};

FieldSet.funcs.updateCollapsable = function(){
	this.elements.collapseButton.visible(this._values.collapsable);
};

FieldSet.on("collapsedChanged", FieldSet.funcs.updateCollapsed);
FieldSet.on("collapsableChanged", FieldSet.funcs.updateCollapsable);

FieldSet.addProperty("header", true,{type:"boolean"});
FieldSet.addProperty("collapsable", true,{type:"boolean"});
FieldSet.addProperty("collapsed", false,{type:"boolean"});