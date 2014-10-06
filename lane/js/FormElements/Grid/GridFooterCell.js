var GridFooterCell = function(column, row) {
	GridTextCell.call(this, column, row);
};
Util.extend(GridFooterCell, GridTextCell);
GridFooterCell.type = "GridFooterCell";

GridFooterCell.buildCell = function(column, row){
	return new GridHeaderCell(column, row);
};

GridFooterCell.prototype.getSkin = function(){
	return GridFooterCellSkin[this._column._v.skin];
};
GridFooterCell.prototype.build = function(){
	var struct = this.getSkin();
	if (!struct){
		throw new Error("No such skin:" + this._column._v.skin);
	}
	
	this._element = new BoxElement();
	this._element.build(struct);
	this._element.drawRec({target:this._row._element});
};
