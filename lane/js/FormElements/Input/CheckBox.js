var CheckBox = function() {
	InputElement.call(this);
};
Util.extend(CheckBox, InputElement);
CheckBox.type = "CheckBox";
CheckBox.setDefault("value",false);
CheckBox.func = {};
CheckBox.func.afterDraw = function() {
	this._values.outer.on("click",function(){
		if (this.enabled()){
			this.trigger("click");
			this.value(!this.value());
		}
	},this);
	this.updateValue();
};
CheckBox.prototype.updateValue = function() {
	this._elements.img.backgroundImage(this._values.value?"img/CheckBox/yes.png":"img/CheckBox/no.png");
};


CheckBox.on("afterDraw", CheckBox.func.afterDraw);
CheckBox.on("valueChanged", CheckBox.prototype.updateValue);