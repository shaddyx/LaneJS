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
GridColumn.addProperty("index", 0);
GridColumn.addProperty("minWidth", 10);
GridColumn.addProperty("caption", "");
GridColumn.addProperty("rightBoundPos", 0);

GridColumn.on("widthBeforeChanged", function(val){
	if (val < this._v.minWidth){
		return this._v.minWidth;
	}
});

GridColumn.on("rightBoundPosChanged", function(left){
	this._helper.left(left)
});

GridColumn.prototype.buildHelper = function(){
	this._helper = this._grid._v.outer.buildTo(GridHelperSkin);
};

GridColumn.prototype.remove = function(){
	this._helper.remove();
};

GridColumn.prototype.helperHeight = function(height){
	this._helper.height(height);
}