var GridColumn = function(params) {
	BaseObject.call(this);
	this._params = params;
};
Util.extend(GridColumn, BaseObject);
GridColumn.type = "GridColumn";

GridColumn.prototype.init = function(){
	var skin = FormElement.getSkinForType("GridGridColumn","def");
	this.element = this._params.target.buildTo(skin);
};