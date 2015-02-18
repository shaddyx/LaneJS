var GridHeaderRow = function(grid) {
	GridRow.call(this, grid);
	this._objectToBuildCell = GridHeaderCell;
};
Util.extend(GridHeaderRow, GridRow);
GridHeaderRow.type = "GridHeaderRow";
GridHeaderRow.prototype.getSkin = function(){
	return GridHeaderSkin[this._v.skin];
};

GridHeaderRow.prototype.render = function(){
	for (var i = 0; i < this._grid._columns.length; i++){
		var caption = this._grid._columns[i]._v.dataColumn._v.caption;
		if (this._grid._v.sortColumn == this._grid._columns[i]._v.name){
			this._cells[i].showSort(this._grid._v.sortDirection ? GridHeaderCell.SORT_MODE.ask : GridHeaderCell.SORT_MODE.desk);
		} else {
			this._cells[i].showSort(GridHeaderCell.SORT_MODE.hide);
		}
		this._cells[i].value(caption);

	}
};
