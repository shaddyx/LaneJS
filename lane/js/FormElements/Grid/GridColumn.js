var GridColumn = function(grid) {
	BaseObject.call(this);
	this._grid= grid;
};
Util.extend(GridColumn, BaseObject);
GridColumn.type = "GridColumn";
GridColumn.addProperty("columnType","text");
GridColumn.addProperty("dataColumn",null);
GridColumn.addProperty("skin","def");


