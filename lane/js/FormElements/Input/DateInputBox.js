/**
 * @constructor
 * @extends InputBox
 */
var DateInputBox = function() {
	InputBox.call(this);
};
Util.extend(DateInputBox, InputBox);
DateInputBox.type = "DateInputBox";
DateInputBox.setDefault("value", new Date());
DateInputBox.setDefault("editable", false);
DateInputBox.setDefault("showSelect", true);
DateInputBox.addProperty("dateFormat", "MM/DD/YY");

DateInputBox.func.afterDraw = function() {
	var my = this;
//	this._input = this._elements.input;
	this._picker = new Pikaday({
		//field: this._input.htmlElement,
		format:this._v.dateFormat,
		onSelect: function(date) {
			var str = moment(date).format(my._v.dateFormat);
			my.value(str);
			my._elements.calendarContainer.visible(false);
		}
	});
	this._elements.calendarContainer.htmlElement.appendChild(this._picker.el);
};

DateInputBox.prototype.startSelection = function(){
	this._picker.setMoment(moment(this._value));
	this._elements.calendarContainer.visible(true);
};
DateInputBox.on("focusChanged", function(value){
	value || this._elements.calendarContainer.visible(false);
});
DateInputBox.on("remove", function(){
	this._picker&&this._picker.destroy();
});

DateInputBox.on("afterDraw", DateInputBox.func.afterDraw);
