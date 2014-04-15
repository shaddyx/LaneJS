var InputElement = function(){
	FormElement.call(this);
	this.type = "InputElement";
};
Util.extend(InputElement,FormElement);
InputElement.funcs = {};
InputElement.addProperty("value", false, {type:"boolean"});
