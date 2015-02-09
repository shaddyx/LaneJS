/**
 * @constructor
 * @extends InputBox
 */
var DateInputBox = function() {
	InputBox.call(this);
};
Util.extend(DateInputBox, InputBox);
DateInputBox.type = "DateInputBox";
DateInputBox.addProperty("value", new Date(), {
	cmpFunc:function(newVal, oldVal){
		return newVal.toString() === oldVal.toString();
	}
});

DateInputBox.setDefault("editable", false);
DateInputBox.setDefault("showSelect", true);
DateInputBox.addProperty("dateFormat", "MM/DD/YY");

DateInputBox.func.afterDraw = function() {
	var my = this;
	this._picker = new Pikaday({
		format:this._v.dateFormat,
		onSelect: function(date) {
			my.value(date);
			my._elements.calendarContainer.visible(false);
		}
	});
	this._elements.calendarContainer.htmlElement.appendChild(this._picker.el);
	this.updateValue();

};

DateInputBox.prototype.startSelection = function(){
	this._elements.calendarContainer.visible(true);
	this.updateValue();
};
/**
 * updates value of inputBox (overloaded function)
 */
DateInputBox.prototype.updateValue = function(){
	if (this._v.isDrawn && this._picker){
		var mmt;
		if (this._v.value instanceof Date) {
			mmt = moment(this._v.value);
		} else {
			mmt = moment(this._v.value, this._v.dateFormat);
		}
		this._elements.input.htmlInnerElement.value = mmt.format(this._v.dateFormat);
		this._picker.setDate(this._v.value, true);
	}
};
DateInputBox.on("focusChanged", function(value){
	value || this._elements.calendarContainer.visible(false);
});
DateInputBox.on("remove", function(){
	this._picker && this._picker.destroy();
});
DateInputBox.on("valueChanged", DateInputBox.prototype.updateValue);
DateInputBox.on("afterDraw", DateInputBox.func.afterDraw);
