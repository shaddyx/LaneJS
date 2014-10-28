var GridFooterRow = function(grid) {
	GridRow.call(this, grid);
	this._objectToBuildCell = GridFooterCell;
};
Util.extend(GridFooterRow, GridRow);
GridFooterRow.type = "GridFooterRow";
GridFooterRow.prototype.getSkin = function(){
	return GridFooterSkin[this._v.skin];
};

GridFooterRow.prototype.render = function(dataRow){
	/*for (var i = 0; i < this._grid._columns.length; i++){
		var caption = this._grid._columns[i]._v.dataColumn._v.caption;
		this._cells[i].caption(caption);
	}*/
};