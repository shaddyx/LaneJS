/**
 *
 * @constructor
 */
var FieldSet = function() {
	Container.call(this);
};

Util.extend(FieldSet, Container);
FieldSet.type = "FieldSet";
FieldSet.funcs = {};

FieldSet.funcs.updateCollapsed = function(){
	this.elements.container.visible(this._v.collapsed);
};

FieldSet.funcs.updateCollapsable = function(){
	this.elements.collapseButton.visible(this._v.collapsable);
};

FieldSet.on("collapsedChanged", FieldSet.funcs.updateCollapsed);
FieldSet.on("collapsableChanged", FieldSet.funcs.updateCollapsable);

FieldSet.prototype.header = FieldSet.addProperty("header", true,{type:"boolean"});
FieldSet.prototype.collapsable = FieldSet.addProperty("collapsable", true,{type:"boolean"});
FieldSet.prototype.collapsed = FieldSet.addProperty("collapsed", false,{type:"boolean"});