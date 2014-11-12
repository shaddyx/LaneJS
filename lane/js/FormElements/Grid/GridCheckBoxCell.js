var GridCheckBoxCell = function(column, row) {
	GridCell.call(this, column, row);
};
Util.extend(GridCheckBoxCell, GridCell);
GridCheckBoxCell.type = "GridCheckBoxCell";
GridCheckBoxCell.prototype.value = function(value){
	this._element._element.setStyleClass(value ? "on" : "off");
};