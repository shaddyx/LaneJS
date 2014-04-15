var HourPicker = function() {
	InputElement.call(this);
	this.type = "HourPicker";
};
Util.extend(HourPicker, InputElement);
//HourPicker.addProperty("value","",{type:"text"});
HourPicker.setDefault("value", "", {type:"int"});
HourPicker.func = {};
HourPicker.func.afterDraw = function() {
	var my = this;
	this.updateValues();
	this._input = this._elements.input;
	this._elements.input.htmlElement.setAttribute("readonly","");
	
	this._elements.input.on("click", function(){
		if (this._win){
			return;
		}
		var skin = Util.cloneObject(HourPicker.windowStructure[this._values.skin || "def"]);
		skin.relativity = {
			target:this._elements.input,
			anchor:"bottom,leftInner"
		}
		this._win = FormElement.build(skin, rootElement);
		this._win.on("closed", function(){
			this._win = false;
		}, this);
		this.on("removed", function(){
			this._win&&this._win.remove();
		}, this);
		var rows = 6;
		var cols = 4;
		for (var y = 0; y< cols; y++){
			var row = BoxElement.build(HourPicker.rowStructure[this._values.skin || "def"], this._win._values.inner);
			for (var x = 1; x<= rows; x++){
				var element = BoxElement.build(HourPicker.elementStructure[this._values.skin || "def"], row);
				element.on("click", function(){
					my.value(this.__hour);
					my._win.close();
				});
				var captionElement = element._elements.caption || element;
				element.__hour = y * rows + x - 1;
				captionElement.caption(Util.padLeft(element.__hour));
				if (element.__hour == this._values.value) {
					element.styleClass("selected");
				} else {
					element.styleClass("notSelected");
				}
			}
		}	
	}, this);
	
};

HourPicker.prototype.updateValues = function() {
	if (this._values.isDrawn){
		this._elements.input.htmlElement.value = parseInt(this._values.value) + ":00";
	}
};

HourPicker.on("afterDraw", HourPicker.func.afterDraw);
HourPicker.on("valueChanged", HourPicker.prototype.updateValues);
