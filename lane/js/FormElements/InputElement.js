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

InputElement.prototype._modelStateChanged = function(){
	this.value(this._v.model[this._v.name]());
	for (var k in this._v.model.____modelInputElements){
		this._v.model.____modelInputElements.trigger("modelStateChanged", this, this._v._name);
	}
};

InputElement.on(["pathBeforeChanged", "modelBeforeChanged"], function(value){
	if (this._v.model && this._v.name){
		this._v.model.removeListener(this._v.name + "Changed", this._modelStateChanged, this);
		this._v.model.trigger("removedInputElement");
		delete this._v.model.____modelInputElements[this._v.name];
	}
});

InputElement.on(["pathChanged", "modelChanged"], function(){
	if (this._v.model && this._v.name){
		this._v.model.on(this._v.name + "Changed", this._modelStateChanged, this);
		this._v.model.____modelInputElements = this._v.model.____modelInputElements || {};
		this._v.model.____modelInputElements[this._v.name] = this;
		this._v.model.trigger("addedInputElement");
	}
});