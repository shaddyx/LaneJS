var GridHeaderRow = function(grid) {
	GridRow.call(this, grid);
	this._objectToBuildCell = GridHeaderCell;
};
Util.extend(GridHeaderRow, GridRow);
GridHeaderRow.type = "GridHeaderRow";
GridHeaderRow.prototype._getSkin = function(){
	return GridHeaderSkin[this._v.skin];
};
