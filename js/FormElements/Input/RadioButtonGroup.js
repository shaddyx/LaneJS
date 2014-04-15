var RadioButtonGroup = function() {
	Container.call(this);
	this._values.children.on("added",this._added);
	this.type = "RadioButtonGroup";
};
Util.extend(RadioButtonGroup, Container);
RadioButtonGroup.addProperty("checked",false,{type:"boolean"});
RadioButtonGroup.func = {};

RadioButtonGroup.prototype._added = function(element) {
	var my = this;
	element.on("checkedChanged",function(value){
		if (value){
			
		}
	});
};