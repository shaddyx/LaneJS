/**
 * standard button
 * @constructor
 */
var Button = function() {
	FormElement.call(this);
};
Util.extend(Button, FormElement);
Button.type = "Button";
