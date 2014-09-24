var GridTextCell = function(column, row) {
	GridCell.call(this, column, row);
};
Util.extend(GridTextCell, GridCell);
GridTextCell.type = "GridTextCell";
GridTextCell.prototype.caption = function(value){
	this._element._elements.caption.caption(value);
};