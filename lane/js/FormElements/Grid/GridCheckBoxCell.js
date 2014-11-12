var GridCheckBoxCell = function(column, row) {
	GridCell.call(this, column, row);
};
Util.extend(GridCheckBoxCell, GridCell);
GridCheckBoxCell.type = "GridCheckBoxCell";
GridCheckBoxCell.prototype.value = function(value){
	this._element._elements.img.setStyleClassRec(value ? "yes" : "no");
};
GridCheckBoxCell.on("click", function(cell, row){
	row.data[this._v.columnName] = !row.data[this._v.columnName];
	this.notifyDataUpdate();
});