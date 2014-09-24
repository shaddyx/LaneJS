var GridFooterRow = function(grid) {
	GridRow.call(this, grid);
	this._objectToBuildCell = GridFooterCell;
};
Util.extend(GridFooterRow, GridRow);
GridFooterRow.type = "GridFooterRow";
GridFooterRow.prototype._getSkin = function(){
	return GridFooterSkin[this._v.skin];
};