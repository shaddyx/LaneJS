var GridColumn = function(grid) {
	BaseObject.call(this);
	this._grid= grid;
};
Util.extend(GridColumn, BaseObject);
GridColumn.type = "GridColumn";
GridColumn.prototype.columnType = GridColumn.addProperty("columnType","text");
GridColumn.prototype.dataColumn = GridColumn.addProperty("dataColumn",null);
GridColumn.prototype.skin = GridColumn.addProperty("skin","def");
GridColumn.prototype.width = GridColumn.addProperty("width", 10);
GridColumn.prototype.index = GridColumn.addProperty("index", 0);
GridColumn.prototype.minWidth = GridColumn.addProperty("minWidth", 10);
GridColumn.prototype.caption = GridColumn.addProperty("caption", "");
GridColumn.prototype.hs = GridColumn.addProperty("hs", "");
//GridColumn.prototype.rightBoundPos = GridColumn.addProperty("rightBoundPos", 0);


GridColumn.on("widthBeforeChanged", function(val){
	if (val < this._v.minWidth){
		this.width(this._v.minWidth);
		return false;
	}
});

GridColumn.prototype.rightBoundPos = function(left){
	if (!this._helper){
		this.buildHelper();
	}
	return this._helper.left(left)
};

GridColumn.prototype.buildHelper = function(){
	if (this._grid._v.isDrawn){
		this._helper = this._grid._elements.gridContentContainer.buildTo(GridHelperSkin);
		this._helper.on("dragStarted", this._dragStarted, this);
		this._helper.on("dragEnded", this._dragEnded, this);
	}
};

GridColumn.prototype.remove = function(){
	if (this._helper){
		this._helper.remove();
	}
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