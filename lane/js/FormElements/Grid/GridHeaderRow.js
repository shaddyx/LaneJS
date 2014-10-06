var GridHeaderRow = function(grid) {
	GridRow.call(this, grid);
	this._objectToBuildCell = GridHeaderCell;
};
Util.extend(GridHeaderRow, GridRow);
GridHeaderRow.type = "GridHeaderRow";
GridHeaderRow.prototype._getSkin = function(){
	return GridHeaderSkin[this._v.skin];
};

GridHeaderRow.prototype.render = function(){
	for (var i = 0; i < this._grid._columns.length; i++){
		var caption = this._grid._columns[i]._v.dataColumn._v.caption;
		this._cells[i].caption(caption);
	}
};
