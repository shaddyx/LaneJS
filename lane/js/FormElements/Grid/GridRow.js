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
GridRow.addProperty("rowIndex", 0);

GridRow.prototype.width = function(value) {
	this._element.width(value);
};

GridRow.prototype.draw = function(target){
	this._element = target.buildTo(this.getSkin());
	this.height(this._element._v.height);
};
/**
 * returns row skin
 */
GridRow.prototype.getSkin = function(selected){
	if (selected === true){
		return GridRowSkin[this._v.skin].selected || GridRowSkin[this._v.skin];
	} else if (selected === false){
		return GridRowSkin[this._v.skin].clean || GridRowSkin[this._v.skin];
	} 
	return GridRowSkin[this._v.skin].normal || GridRowSkin[this._v.skin];
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
	this._cellsByName = {};
	for (var k in this._grid._columns){
		var cell = this._objectToBuildCell.buildCell(this._grid._columns[k], this);
		cell.build();
		this._cells.push(cell);
		this._cellsByName[cell._column._v.dataColumn._v.name] = cell;
		cell.columnName(cell._column._v.dataColumn._v.name);
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
/**
 * returns physical cell by name
 * @param name
 * @returns
 */
GridRow.prototype.getCellByName = function(name){
	for (var i = 0; i < this._grid._columns.length; i++){
		var colName = this._grid._columns[i]._v.dataColumn._v.name;
		if (colName == name) {
			return this._cells[i];
		}
	}
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
		} /*else {
			this._cells[i].caption("");
		}*/
	}
	
	this._grid.trigger("rowRender", this, dataRow);
};

GridRow.prototype.getCellByName = function(name){
	return this._cellsByName[name];
};

GridRow.prototype.setProperty = function(name, value){
	if (this._element._v[name]!= value){
		this._changed = this._changed || {};
		this._changed[name] = this._element._v[name];
		this._element[name](value);
	}
};

GridRow.prototype.restoreProperties = function(){
	if (this._changed){
		for (var name in this._changed)
		this._element[name](this._changed[name]);
	}
	this._changed = false;
	for (var i=0; i<this._cells.length; i++){
		this._cells[i].restoreProperties();
	}
};