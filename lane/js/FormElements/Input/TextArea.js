/**
 * @extends InputElement
 * @constructor
 */
var TextArea = function() {
	InputElement.call(this);
};
Util.extend(TextArea, InputElement);
TextArea.type = "TextArea";
TextArea.setDefault("value", "");
TextArea.setDefault("width", 100);
TextArea.setDefault("height", 100);
TextArea.func = {};
TextArea.func.afterDraw = function() {
	var my = this;
	/**
	 *
	 * @type BoxElement
	 * @private
	 */
	this._input = this._elements.input;
	this.updateValues();
	this.updateEnabled();
	Util.addListener(this._elements.input.htmlElement, "keyup", function(){
		my.value(this.value);
	});
};

TextArea.prototype.updateEnabled = function() {
	if (this._v.isDrawn) {
		this._v.enabled || this._input.htmlElement.setAttribute("disabled", "disabled");
		this._v.enabled && this._input.htmlElement.removeAttribute("disabled");
	}
};
TextArea.prototype.updateValues = function() {
	if (this._v.isDrawn){
		this._elements.input.htmlElement.value = this._v.value;
	}
};

TextArea.on("afterDraw", TextArea.func.afterDraw);
TextArea.on("valueChanged", TextArea.prototype.updateValues);
TextArea.on("enabledChanged", TextArea.prototype.updateEnabled);
