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

DateInputBox.prototype.editable = DateInputBox.setDefault("editable", false);
DateInputBox.prototype.showSelect = DateInputBox.setDefault("showSelect", true);
DateInputBox.prototype.dateFormat = DateInputBox.addProperty("dateFormat", "MM/DD/YY");
DateInputBox.prototype.maxDate = DateInputBox.addProperty("maxDate", false);
DateInputBox.prototype.minDate = DateInputBox.addProperty("minDate", false);

DateInputBox.func.afterDraw = function() {
	var my = this;
	this._picker = new Pikaday({
		format:this._v.dateFormat,
		onSelect: function(date) {
			my.value(date);
			my.trigger("selectionEnd", date);
			my._elements.calendarContainer.visible(false);
		}
	});
	this._elements.calendarContainer.htmlElement.appendChild(this._picker.el);
	this.updateMinMax();
	this.updateValue();
};
DateInputBox.prototype.stringifyValue = function(){
	return moment(this._v.value).format(this._v.dateFormat);
}
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

DateInputBox.prototype.updateMinMax = function(){
	if (this._v.isDrawn && this._picker){
		this._picker.setMaxDate(this._v.maxDate);
		this._picker.setMinDate(this._v.minDate);
	}
};

DateInputBox.prototype.setDate = function(date){
	this._v.value = date;
	this.updateValue();
}
DateInputBox.prototype.getDate = function(){
	return this._v.value;
}

DateInputBox.on("focusChanged", function(value){
	value || this._elements.calendarContainer.visible(false);
});
DateInputBox.on("remove", function(){
	this._picker && this._picker.destroy();
});


DateInputBox.on("valueChanged", DateInputBox.prototype.updateValue);
DateInputBox.on(["minDateChanged", "maxDateChanged"], DateInputBox.prototype.updateMinMax);
DateInputBox.on("afterDraw", DateInputBox.func.afterDraw);
