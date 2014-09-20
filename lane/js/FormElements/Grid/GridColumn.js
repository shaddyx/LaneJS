var GridColumn = function(grid) {
	BaseObject.call(this);
	this._grid= grid;
	this._cells = [];
};
Util.extend(GridColumn, BaseObject);
GridColumn.type = "GridColumn";
GridColumn.addProperty("columnType","text");
GridColumn.addProperty("dataColumn",null);


