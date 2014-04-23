var InputBox = function() {
	InputElement.call(this);
};
Util.extend(InputBox, InputElement);
InputBox.type = "InputBox";
//InputBox.addProperty("value","",{type:"text"});
InputBox.setDefault("value", "");
InputBox.addProperty("password",false,{type:"boolean"});
InputBox.func = {};
InputBox.func.afterDraw = function() {
	var my = this;
	this.updateValues();
	this._input = this._elements.input;
	//this._input.htmlElement.setAttribute("type",this._values.password?"password":"text");
	this._updateListeners();
	this.updatePassword();
};

InputBox.prototype.updateValues = function() {
	if (this._values.isDrawn && this._elements.input.htmlElement.value != this._values.value){
		this._elements.input.htmlElement.value = this._values.value;
	}
};
InputBox.prototype._updateListeners = function(){
	var my = this;
	if (browser.ie && parseInt(browser.version) < 10){
		Util.addListener(this._elements.input.htmlElement,"keyup", function(e) {
			var me = this;
			setTimeout(function(){
	    		return my.trigger("input", me.value);
	    	},0);
		});
	} else {
		Util.addListener(this._elements.input.htmlElement, "input", function(e){
			return my.trigger("input", this.value);
		});
	}
	
	
	Util.addListener(this._elements.input.htmlElement, "keyup", function(){
		my.value(this.value);
	});
};
InputBox.prototype.updatePassword = function(){
	if (this._values.isDrawn) {
		var old = this._input.htmlElement;
		var newValue = this._values.password?"password":"text";
		if (old.getAttribute("type") != newValue){
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

InputBox.on("afterDraw", InputBox.func.afterDraw);
InputBox.on("valueChanged", InputBox.prototype.updateValues);
InputBox.on("passwordChanged", InputBox.prototype.updatePassword);