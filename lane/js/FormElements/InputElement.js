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
InputElement.addProperty("value", false);
InputElement.addProperty("model", false);
InputElement.addProperty("path", false);

InputElement.prototype._modelStateChanged = function(){
	var name = this.path === false ? this._v.name: this._v.path;
	if (this._v.model && name){
		this.value(this._v.model[name]());
	}
};

InputElement.on(["pathBeforeChanged", "nameBeforeChanged","modelBeforeChanged"], function(value){
	var name = this.path === false ? this._v.name: this._v.path;
	if (this._v.model && name){
		this._v.model.removeListener(name + "Changed", this._modelStateChanged, this);
	}
});

InputElement.on(["pathChanged", "nameChanged","modelChanged"], function(){
	var name = this.path === false ? this._v.name: this._v.path;
	if (this._v.model && name){
		this._v.model.on(name + "Changed", this._modelStateChanged, this);
	}
});