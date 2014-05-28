var Column = function(params) {
	BaseObject.call(this);
	this._params = params;	
};
Util.extend(Column, BaseObject);
Column.type = "Column";

Column.prototype.init = function(){
	var skin = FormElement.getSkinForType("GridColumn","def");
	this.element = this._params.target.buildTo(skin);
};