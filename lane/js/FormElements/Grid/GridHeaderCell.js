var GridHeaderCell = function(column, row) {
	GridTextCell.call(this, column, row);
};
Util.extend(GridHeaderCell, GridTextCell);
GridHeaderCell.type = "GridHeaderCell";
GridHeaderCell.buildCell = function(column, row){
	return new GridHeaderCell(column, row);
};
GridHeaderCell.SORT_MODE = {
	hide:0,
	ask:1,
	desk:2
};
GridHeaderCell.prototype.showSort = function(mode){
	if (!this._element){
		return;
	}
	//debugger;
	switch (mode){
		case GridHeaderCell.SORT_MODE.hide:
			this._element._elements.sortElement.visible(false);
			break;
		case GridHeaderCell.SORT_MODE.ask:
			this._element._elements.sortElement.visible(true);
			this._element._elements.sortElement.setStyleClassRec("sortAsk");
			break;
		case GridHeaderCell.SORT_MODE.desk:
			this._element._elements.sortElement.visible(true);
			this._element._elements.sortElement.setStyleClassRec("sortDesk");

	}
};

GridHeaderCell.prototype.getSkin = function(){
	return GridHeaderCellSkin[this._column._v.skin];
};

GridHeaderCell.prototype.columnClicked = function(){
	if (this._grid.sortColumn() == this.columnName()){
		this._grid.sortDirection(!this._grid.sortDirection());
	} else {
		this._grid.sortColumn(this.columnName());
	}
};

GridHeaderCell.prototype.build = function(){
	var struct = this.getSkin();
	if (!struct){
		throw new Error("No such skin:" + this._column._v.skin);
	}
	
	this._element = new BoxElement();
	this._element.build(struct);
	this._element.drawRec({target:this._row._element});
	this._element.on("click", this.columnClicked, this)
};
