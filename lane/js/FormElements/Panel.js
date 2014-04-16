var Panel = function() {
	Container.call(this);
	this.type = "Panel";
	this.addPropertyTranslator(["borderRadius", "borderColor", "borderWidth", "backgroundColor"]);
};
Util.extend(Panel, Container);

Panel.addProperty("borderRadius", [0,0,0,0], {type:"array"});
Panel.addProperty("backgroundColor", "none", {type:"color"});
Panel.addProperty("borderColor", "#000", {type:"color"});
Panel.addProperty("borderWidth", [0,0,0,0], {type:"array"});
