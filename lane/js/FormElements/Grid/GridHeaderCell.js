var GridHeaderCell = function(column, row) {
	GridTextCell.call(this, column, row);
};
Util.extend(GridHeaderCell, GridTextCell);
GridHeaderCell.type = "GridHeaderCell";
GridHeaderCell.buildCell = function(column, row){
	return new GridHeaderCell(column, row);
};
GridHeaderCell.prototype.getSkin = function(){
	return GridHeaderCellSkin[this._column._v.skin];
};


GridHeaderCell.prototype.build = function(){
	var struct = this.getSkin();
	if (!struct){
		throw new Error("No such skin:" + this._column._v.skin);
	}
	
	this._element = new BoxElement();
	this._element.build(struct);
	this._element.drawRec({target:this._row._element});
};
