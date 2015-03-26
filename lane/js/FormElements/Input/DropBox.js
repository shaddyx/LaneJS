/**
 * @constructor
 * @extends InputElement
 */
var DropBox = function() {
	InputElement.call(this);
};
Util.extend(DropBox, InputElement);
DropBox.type = "DropBox";
DropBox.setDefault("value", "");
/** @method */
DropBox.prototype.password = DropBox.addProperty("password",false,{type:"boolean"});
DropBox.prototype.values = DropBox.addProperty("values",[],{type:"array"});
DropBox.func = {};
DropBox.func.afterDraw = function() {
	var my = this;
	this._input = this._elements.input;
	this.updateValues();
	Util.addListener(this._input.htmlElement, "change", function(){
		var val = my._input.htmlElement.value;
		my.value(val);
		my.trigger("selectionEnd");
	});
};

DropBox.prototype._addItem = function(value){
	console.log("adding:" + value);
	var element = document.createElement("option");
	if (this._v.value == value){
		element.setAttribute("selected","selected");
	}
	element.innerHTML = value;
	this._input.htmlElement.appendChild(element);
};

DropBox.prototype.updateValues = function(){
	if (this._v.isDrawn){
		this._input.htmlElement.innerHTML = "";
		for (var k in this._v.values){
			this._addItem(this._v.values[k]);
		}
	}
};

DropBox.on("valuesChanged", DropBox.prototype.updateValues);
DropBox.on("valueChanged", DropBox.prototype.updateValues);
DropBox.on("afterDraw", DropBox.func.afterDraw);