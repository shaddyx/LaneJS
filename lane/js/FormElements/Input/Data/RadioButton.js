var RadioButton = function() {
	DataElement.call(this);
};
Util.extend(RadioButton, DataElement);
RadioButton.type = "RadioButton";
RadioButton.setDefault("value",false);
RadioButton.prototype.triggerValue = RadioButton.addProperty("triggerValue",0,{type:"int"});
RadioButton.prototype.checked = RadioButton.addProperty("checked",0,{type:"boolean"});
RadioButton.func = {};

RadioButton.on("click", function(){
	this.value(this._v.triggerValue);
});

RadioButton.func.afterDraw = function() {
	this.updateChecked();
};

RadioButton.prototype.checkedChanged = function(){
	if (this._v.checked){
		this.value(this._v.triggerValue);
	}
	console.log("chedked[" + this.name() + "]:", this.checked());
	this._elements.img.backgroundImage(this._v.checked?"img/RadioButton/yes.png":"img/RadioButton/no.png");
};

RadioButton.prototype.updateChecked = function() {
	this.checked(this._v.value == this._v.triggerValue);
};

RadioButton.on("afterDraw", RadioButton.func.afterDraw);
RadioButton.on("triggerValueChanged", RadioButton.prototype.valueChanged);
RadioButton.on("valueChanged", RadioButton.prototype.updateChecked);
RadioButton.on("checkedChanged", RadioButton.prototype.checkedChanged);