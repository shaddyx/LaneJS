/**
 * @constructor
 * @extends InputBox
 */
var TimeInputBox = function() {
	InputBox.call(this);
};
Util.extend(TimeInputBox, InputBox);
TimeInputBox.type = "TimeInputBox";
TimeInputBox.mask = "99:99";
TimeInputBox.defaultValue = "00:00";
TimeInputBox.addProperty("value", TimeInputBox.defaultValue);
TimeInputBox.setDefault("mask", TimeInputBox.mask);

TimeInputBox.func.afterDraw = function() {

};

TimeInputBox.prototype.completeChanged = function(value){
	if (!value){
		this.mask(false);
		this.value(TimeInputBox.defaultValue);
		this.mask(TimeInputBox.mask);
		this.complete(true);
	}
};

TimeInputBox.on("afterDraw", TimeInputBox.func.afterDraw);
TimeInputBox.on("completeChanged", TimeInputBox.prototype.completeChanged);
