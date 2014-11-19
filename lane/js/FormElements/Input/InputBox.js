/**
 * @constructor
 * @extends InputElement
 */
var InputBox = function() {
	InputElement.call(this);
};
Util.extend(InputBox, InputElement);
InputBox.type = "InputBox";
InputBox.setDefault("value", "");
/** @method */
InputBox.prototype.password = InputBox.addProperty("password",false,{type:"boolean"});
InputBox.prototype.values = InputBox.addProperty("values",[],{type:"array"});
InputBox.prototype.dataType = InputBox.addProperty("dataType","string");
InputBox.prototype.editable = InputBox.addProperty("editable",true);
InputBox.func = {};
InputBox.func.afterDraw = function() {
	var my = this;
	this._input = this._elements.input;
	this.updateValues();
	this._updateListeners();
	this.updatePassword();
	this.updateValueList();
	this._updateEditable();
	this._elements.selectStartButton.on("click", this.startSelection, this);
};
InputBox.prototype.updateValues = function() {
	if (this._v.isDrawn && this._elements.input.htmlInnerElement.value !== this._v.value){
		this._elements.input.htmlInnerElement.value = this._v.value.toString();
	}
};
/**
 * function updates listeners for input html element
 * @private
 */
InputBox.prototype._updateListeners = function(){
	var my = this;
	if (browser.ie && parseInt(browser.version) < 10){
		Util.addListener(this._elements.input.htmlInnerElement,"keyup", function(e) {
			var me = this;
			setTimeout(function(){
	    		return my.trigger("input", me.value);
	    	},0);
		});
	} else {
		Util.addListener(this._elements.input.htmlInnerElement, "input", function(e){
			return my.trigger("input", this.value);
		});
	}
	
	Util.addListener(this._elements.input.htmlInnerElement, "keyup", function(){
		my.value(this.value);
	});
};



InputBox.prototype.updatePassword = function(){
	if (this._v.isDrawn) {
		var old = this._input.htmlElement;
		var oldType = old.getAttribute("type") || "text";
		var newValue = this._v.password?"password":"text";
		if (oldType != newValue){
			var container = old.parentNode;
			var newInput = document.createElement("input");
			newInput.setAttribute("type",newValue);
			this._input.htmlElement = newInput;
			var style;
			if (old.getComputedStyle){
				style = old.getComputedStyle();
			} else {
				style = old.currentStyle;
			}
			for (var k in style){
				try{
					newInput.style[k] = style[k];
				} catch (e) {
					console.log("Error setting style, ignoring",k);
				}
			}
			container.replaceChild(newInput, old);
			this._updateListeners();
		}
	}
};

InputBox.prototype._dataTypeBeforeChanged = function(value){
	if (typeof (value) === "string"){
		this.dataType(Types[value]);
		return;
	}
	if (this._v.dataType && this._v.enumerable){
		this.values([]);
	}
};
InputBox.prototype._dataTypeChanged = function(){
	if (this._v.dataType && this._v.dataType.enumerable){
		this.values(this._v.dataType.enumerable);
	}
};

InputBox.prototype._inputBoxKeyListener = function(evt){
	var key = evt.keyCode || evt.which;
	switch (key){
		case 13:
			this.trigger("selectionEnd");
			break;
	}
};
InputBox.prototype._updateEditable = function(){
	if (this._v.isDrawn){
		if (!this._v.editable){
			this._input.htmlInnerElement.setAttribute("readonly","");
		} else {
			this._input.htmlInnerElement.removeAttribute("readonly");
		}
	}
};

InputBox.on("editable", InputBox.prototype._updateEditable);
InputBox.on("afterDraw", InputBox.func.afterDraw);
InputBox.on("valueChanged", InputBox.prototype.updateValues);
InputBox.on("passwordChanged", InputBox.prototype.updatePassword);
InputBox.on("dataTypeChanged", InputBox.prototype._dataTypeChanged);
InputBox.on("dataTypeBeforeChanged", InputBox.prototype._dataTypeBeforeChanged);
InputBox.on("keydown", InputBox.prototype._inputBoxKeyListener);
InputBox.on(["keydown", "keyup", "keypress"], function(e){
	this._grid && this._grid.trigger(e.type, e);
});