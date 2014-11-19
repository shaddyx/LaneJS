/*
 * @@@dependsOn: InputBox
 */

InputBox.prototype._focusBeforeChanged = function(focus){
	if (focus && !this._v.focus){
		this.trigger("editStart");
	}
};

InputBox.on("focusBeforeChanged", InputBox.prototype._focusBeforeChanged);