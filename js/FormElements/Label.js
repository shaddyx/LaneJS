var Label = function(){
	FormElement.call(this);
	this.type = "Label";
};
Util.extend(Label,FormElement);
Label.funcs = {};
Label.addProperty("value", "");

Label.func.updateValue = function() {
	this._values.isDrawn && this._elements.label.caption(this._values.value);
};

Label.on("afterDraw", Label.func.updateValue);
Label.on("valueChanged", Label.func.updateValue);