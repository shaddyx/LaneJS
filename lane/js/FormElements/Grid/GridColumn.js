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
GridColumn.addProperty("hs", "");
//GridColumn.addProperty("rightBoundPos", 0);


GridColumn.on("widthBeforeChanged", function(val){
	if (val < this._v.minWidth){
		this.width(this._v.minWidth);
		return false;
	}
});

GridColumn.prototype.rightBoundPos = function(left){
	return this._helper.left(left)
};

GridColumn.prototype.buildHelper = function(){
	this._helper = this._grid._v.outer.buildTo(GridHelperSkin);
	this._helper.on("dragStarted", this._dragStarted, this);
	this._helper.on("dragEnded", this._dragEnded, this);
};

GridColumn.prototype.remove = function(){
	this._helper.remove();
};

GridColumn.prototype.helperHeight = function(height){
	this._helper.height(height);
};

GridColumn.prototype._dragStarted = function(){
	this._oldL = this._helper.left();
};

//
//		recalculating column width
//
GridColumn.prototype._dragEnded = function(){
	var newL = this._helper._v.left;
	var newW = this._v.width + (newL - this._oldL);
	var w = this.width(newW);
	this._grid.scheduleReDraw();
	//this.rightBoundPos(newL + (w - newW));
};