var Label = function(){
	FormElement.call(this);
};
Util.extend(Label,FormElement);
Label.type = "Label";
Label.funcs = {};
Label.addProperty("value", "");

Label.func.updateValue = function() {
	this._values.isDrawn && this._elements.label.caption(this._values.value);
};

Label.on("afterDraw", Label.func.updateValue);
Label.on("valueChanged", Label.func.updateValue);