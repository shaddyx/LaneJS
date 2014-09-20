var GridRow = function(grid) {
	BaseObject.call(this);
	this._grid = grid;
	this._cells = [];
	this.cellsBuilt = false;
};
Util.extend(GridRow, BaseObject);
GridRow.type = "GridRow";
GridRow.addProperty("skin",false);
GridRow.addProperty("height",false);
GridRow.prototype.draw = function(){
	this._element = this._grid._elements.content.buildTo(GridRowSkin[this._v.skin]);
	this.height(this._element._v.height);
};
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
		var cell = GridCell.buildCell(this._grid._columns[k], this);
		cell.build();
	}
	this._cells.push(cell);
	this.cellsBuilt = true;
};

GridRow.prototype.removeCells = function(){
	for (var i=0; i < this._cells; i++){
		this._cells[i].remove();
	}
	this._cells = [];
	this.cellsBuilt = false;
};