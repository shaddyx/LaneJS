var GridRow = function(grid) {
	BaseObject.call(this);
	this._grid = grid;
	this._cells = [];
};
Util.extend(GridRow, BaseObject);
GridRow.type = "GridRow";
GridRow.addProperty("skin",false);
GridRow.addProperty("height",false);
GridRow.prototype.draw = function(){
	this._element = this._grid._elements.content.buildTo(GridRowSkin[this._v.skin]);
	this.height(this._element._v.height);
};

GridRow.prototype.remove = function(){
	if (this._element){
		this._element.remove();
	}
	this._element = false;
};
/**
 * Vuilds cells to current row
 */
GridRow.prototype.buildCells = function(){
	if (this._cells.length != 0){
		throw new Error("Cells already exists in this row! Mb some error happened?");
	}
	for (var k in this._grid._columns){
		var skin = GridCellSkin[this._grid._v.skin];
		if (!skin){
			throw new Error("No such skin:" + this._grid._v.skin);
		}
		
		var struct = skin[this._grid._columns[k]._v.columnType];
		if (!struct){
			throw new Error("No such column type:" + this._grid._columns[k]._v.columnType);
		}
	}
};

