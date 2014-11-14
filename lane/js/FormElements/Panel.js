var Panel = function() {
	Container.call(this);
	this.addPropertyTranslator(["borderRadius", "borderColor", "borderWidth", "backgroundColor"]);
};
Util.extend(Panel, Container);
Panel.type = "Panel";
Panel.prototype.borderRadius = Panel.addProperty("borderRadius", [0,0,0,0], {type:"array"});
Panel.prototype.backgroundColor = Panel.addProperty("backgroundColor", "none", {type:"color"});
Panel.prototype.borderColor = Panel.addProperty("borderColor", "#000", {type:"color"});
Panel.prototype.borderWidth = Panel.addProperty("borderWidth", [0,0,0,0], {type:"array"});
