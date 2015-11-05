/**
 * @constructor
 * @extends InputElement
 * @@@dependsOn: inputmask
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
InputBox.prototype.selectMode = InputBox.addProperty("selectMode",true);
InputBox.prototype.showSelect = InputBox.addProperty("showSelect",false);
InputBox.prototype.mask = InputBox.addProperty("mask",false);
InputBox.prototype.complete = InputBox.addProperty("complete",true);
InputBox.func = {};
InputBox.func.afterDraw = function() {
	var my = this;
	this._input = this._elements.input;
	this.updateValue();
	this._updateListeners();
	this.updatePassword();
	this.updateValueList();
	this._updateEditableEnabled();
	this.updateSelectButtonVisibility();
	this._updateMask();
	this._elements.selectStartButton.on("click", this._selectButtonClicked, this);
};

InputBox.prototype._updateMask = function(){
	if (this._v.isDrawn) {
		$(this._input.htmlElement).inputmask('remove');
		if (this._v.mask){
			var my = this;
			var mask = this._v.mask;
			var onincomplete = function(){
				my.complete(false);
			};

			var oncleared = function(){
				my.complete(true);
			};

			var oncomplete = function(){
				my.complete(true);
			}

			if (typeof mask == "string"){
				mask = {
					mask: mask,
					onincomplete:onincomplete,
					oncleared:oncleared,
					oncomplete:oncomplete,
					clearIncomplete: true
				};
			}
			$(this._input.htmlElement).inputmask(mask);
		}
	}
};

InputBox.prototype.updateValue = function() {
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
		var oldType = old.getAttribute("type") || old.type || "text";
		var newValue = this._v.password?"password":"text";
		if (oldType != newValue){
			var container = old.parentNode;
			var newInput = document.createElement("input");
			newInput.setAttribute("type",newValue);
			this._input.htmlElement = newInput;
			this._input.htmlInnerElement = newInput;
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
			this.updateValue();
		}
	}
};
InputBox.prototype._dataTypeBeforeChanged = function(value){
	if (typeof (value) === "string"){
		this.dataType(Types[value]);
		return false;
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
			this.trigger("editComplete");
			return false;
	}
};

InputBox.prototype._updateEditableEnabled = function(){
	if (this._v.isDrawn){
		if (!this._v.editable || !this._v.enabled){
			this._input.htmlInnerElement.setAttribute("readonly","");
		} else {
			this._input.htmlInnerElement.removeAttribute("readonly");
		}
	}
};

InputBox.on("focusChanged", function(value){
	var my = this;
	if (this._v.isDrawn){
		if (value){
			var interval = setInterval(function(){
				if (!my.focus() || this._removed){
					clearInterval(interval);
					return;
				}
				my._input.htmlInnerElement.focus();
				document.activeElement = my._input.htmlInnerElement;
			}, 10);
		} else {
			this.trigger("editComplete");
		}
	}
});

InputBox.on("selectionEnd", function(){
	this.trigger("editComplete");
});
//InputBox.on("enabledChanged", InputBox.prototype._updateEnabled);
InputBox.on("maskChanged", InputBox.prototype._updateMask);
InputBox.on("enabledChanged", InputBox.prototype._updateEditableEnabled);
InputBox.on("editableChanged", InputBox.prototype._updateEditableEnabled);
InputBox.on("afterDraw", InputBox.func.afterDraw);
InputBox.on("valueChanged", InputBox.prototype.updateValue);
InputBox.on("passwordChanged", InputBox.prototype.updatePassword);
InputBox.on("dataTypeChanged", InputBox.prototype._dataTypeChanged);
InputBox.on("dataTypeBeforeChanged", InputBox.prototype._dataTypeBeforeChanged);
InputBox.on("keydown", InputBox.prototype._inputBoxKeyListener);
