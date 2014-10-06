var GridColumn = function(grid) {
	BaseObject.call(this);
	this._grid= grid;
};
Util.extend(GridColumn, BaseObject);
GridColumn.type = "GridColumn";
GridColumn.addProperty("columnType","text");
GridColumn.addProperty("dataColumn",null);
GridColumn.addProperty("skin","def");
GridColumn.addProperty("width", 10);
GridColumn.addProperty("minWidth", 10);
GridColumn.addProperty("caption", "");
GridColumn.on("widthBeforeChanged", function(val){
	if (val < this._v.minWidth){
		return this._v.minWidth;
	}
});

