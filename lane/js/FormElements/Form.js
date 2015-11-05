/**
 *
 * @constructor
 */
var Form = function() {
	Container.call(this);
};
Util.extend(Form, Container);
Form.type = "Form";
Form.prototype.findNextElement = function(currentElement){
	var elements = [];
	this.enumChilds(function(element){
		if (element instanceof InputElement){
			elements.push(element);
		}
	});
	var index = elements.indexOf(currentElement);
	if (elements.length ==0 || index === -1){
		return;
	}
	index ++;
	if (index >= elements.length){
		index = 0;
	}
	return elements[index];
};

Form.prototype.focusNext = function(){
	var el = this.findNextElement(FormElement.currentFocus);
	el && el.tryToFocus();
};
Form.on("keydown", function(evt){
	var key = evt.keyCode || evt.which;
	console.log("Grid key pressed:", key);
	switch (key) {
		//
		//	Tab
		//
		case 9:
			this.focusNext();
			break;
	}
});