var GridRow = function(grid) {
	BaseObject.call(this);
	this._grid = grid;
	this._cells = [];
	this.cellsBuilt = false;
	this._objectToBuildCell = GridCell;
};
Util.extend(GridRow, BaseObject);
GridRow.type = "GridRow";
GridRow.addProperty("skin",false);
GridRow.addProperty("height",false);


GridRow.prototype.width = function(value) {
	this._element.width(value);
};

GridRow.prototype.draw = function(target){
	this._element = target.buildTo(this._getSkin());
	this.height(this._element._v.height);
};
/**
 * returns row skin
 */
GridRow.prototype._getSkin = function(){
	return GridRowSkin[this._v.skin];
}

/**
 * 
 */
GridRow.prototype.remove = function(){
	this.removeCells();
	if (this._element){
		this._element.remove();
	}
	this._element = false;
};
/**
 * rebuilds cells to equal to current column status
 */
GridRow.prototype.reBuildCells = function(){
	this.removeCells();
	this.buildCells();
};
/**
 * Builds cells to current row
 */
GridRow.prototype.buildCells = function(){
	if (this.cellsBuilt){
		throw new Error("Cells already built, remove they first!");
	}
	
	for (var k in this._grid._columns){
		var cell = this._objectToBuildCell.buildCell(this._grid._columns[k], this);
		cell.build();
		this._cells.push(cell);
	}
	this.cellsBuilt = true;
};

GridRow.prototype.removeCells = function(){
	for (var i = 0; i < this._cells.length; i++){
		this._cells[i].remove();
	}
	this._cells = [];
	this.cellsBuilt = false;
};

GridRow.prototype.render = function(dataRow){
	for (var i = 0; i < this._grid._columns.length; i++){
		var name = this._grid._columns[i]._v.dataColumn._v.name;
		//
		//	todo: move this to cells clean/render method
		//
		if (dataRow != undefined){
			if (dataRow.data[name] == undefined){
				throw new Error ("Column with name " + name + " exists, but no data!");
			}
			this._cells[i].caption(dataRow.data[name]);
		} else {
			this._cells[i].caption("");
		}
	}
};

