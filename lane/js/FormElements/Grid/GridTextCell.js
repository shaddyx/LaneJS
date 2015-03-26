var GridTextCell = function(column, row) {
	GridCell.call(this, column, row);
};
Util.extend(GridTextCell, GridCell);
GridTextCell.type = "GridTextCell";
GridTextCell.prototype.value = function(value){
	value = value || '';
	this._element._elements.caption.caption(value.toString());
};