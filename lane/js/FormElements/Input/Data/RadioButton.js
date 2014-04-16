var RadioButton = function() {
	DataElement.call(this);
	this.type = "RadioButton";
};
Util.extend(RadioButton, DataElement);
RadioButton.setDefault("value",false);
RadioButton.addProperty("triggerValue",0,{type:"int"});
RadioButton.addProperty("checked",0,{type:"boolean"});
RadioButton.func = {};

RadioButton.on("click", function(){
	this.value(this._values.triggerValue);
});

RadioButton.func.afterDraw = function() {
	this.updateChecked();
};

RadioButton.prototype.checkedChanged = function(){
	if (this._values.checked){
		this.value(this._values.triggerValue);
	}
	console.log("chedked[" + this.name() + "]:", this.checked());
	this._elements.img.backgroundImage(this._values.checked?"img/RadioButton/yes.png":"img/RadioButton/no.png");
};

RadioButton.prototype.updateChecked = function() {
	this.checked(this._values.value == this._values.triggerValue);
};

RadioButton.on("afterDraw", RadioButton.func.afterDraw);
RadioButton.on("triggerValueChanged", RadioButton.prototype.valueChanged);
RadioButton.on("valueChanged", RadioButton.prototype.updateChecked);
RadioButton.on("checkedChanged", RadioButton.prototype.checkedChanged);