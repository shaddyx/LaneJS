/**
 * @constructor
 * @extends FormElement
 */
var InputElement = function(){
	FormElement.call(this);
};
Util.extend(InputElement,FormElement);
InputElement.type = "InputElement";
InputElement.funcs = {};
InputElement.prototype.value = InputElement.addProperty("value", false);
InputElement.prototype.model = InputElement.addProperty("model", false);

InputElement.prototype.modelStateChanged = function(){
	this.value(this._v.model._v[this._v.name]);
};

InputElement.on(["nameBeforeChanged", "modelBeforeChanged"], function(value){
	if (this._v.model && this._v.name){
		this._v.model.removeListener(this._v.name + "Changed", this.modelStateChanged, this);
		this._v.model.removeElement(this);
	}
});

InputElement.on(["nameChanged", "modelChanged"], function(){
	if (this._v.model && this._v.name){
		this._v.model.on(this._v.name + "Changed", this.modelStateChanged, this);
		this._v.model.addElement(this);
	}
});