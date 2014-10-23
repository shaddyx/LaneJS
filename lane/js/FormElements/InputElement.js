var InputElement = function(){
	FormElement.call(this);
};
Util.extend(InputElement,FormElement);
InputElement.type = "InputElement";
InputElement.funcs = {};
InputElement.addProperty("value", false);
