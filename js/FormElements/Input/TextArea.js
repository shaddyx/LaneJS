var TextArea = function() {
	InputElement.call(this);
	this.type = "TextArea";
};
Util.extend(TextArea, InputElement);
TextArea.setDefault("value", "");
TextArea.setDefault("width", 100);
TextArea.setDefault("height", 100);
TextArea.func = {};
TextArea.func.afterDraw = function() {
	var my = this;
	this.updateValues();
	this._input = this._elements.input;
	Util.addListener(this._elements.input.htmlElement, "keyup", function(){
		my.value(this.value);
	});
};

TextArea.prototype.updateValues = function() {
	if (this._values.isDrawn){
		this._elements.input.htmlElement.value = this._values.value;
	}
};

TextArea.on("afterDraw", TextArea.func.afterDraw);
TextArea.on("valueChanged", TextArea.prototype.updateValues);
