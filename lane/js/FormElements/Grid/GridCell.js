var GridCell = function(column, row) {
	BaseObject.call(this);
	this._row = row;
	this._grid = row._grid;
	this._column = column;
};
Util.extend(GridCell, BaseObject);
GridCell.type = "GridCell";


GridCell.buildCell = function(column, row){
	var obj;
	switch(column._v.columnType){
		case "text":
			obj = new GridTextCell(column, row);
			break;
		default:
			throw new Error("Error, no such column type:" + column._v.columnType);
	}
	return obj;
};
/**
 * returns cell skin structure
 * @returns
 */
GridCell.prototype.getSkin = function(){
	return GridCellSkin[this._column._v.skin];
};
/**
 * builds the cell structure
 */
GridCell.prototype.build = function(){
	var skin = this.getSkin();
	if (!skin){
		throw new Error("No such skin:" + this._column._v.skin);
	}
	var struct = skin[this._column._v.columnType];
	if (!struct){
		throw new Error("No such column type:" + this._column._v.columnType);
	}
	var st = {};
	for (var k in GridCellContainer){
		st[k] = GridCellContainer[k];
	}
	
	for (var k in struct){
		st[k] = struct[k];
	}
	if (!this._element){
		this._element = new BoxElement();
	}
	this._element.build(st);
	this._element.drawRec({target:this._row._element});
};

GridCell.prototype.remove = function(){
	if (!this._element){
		throw new Error("Cell is not drawn");
	}
	this._element.remove();
};


GridCell.prototype.clearContainer = function(){
	this._element.clear();
};

GridCell.prototype.restoreContainer = function(){
	this.build();
};

GridCell.prototype.width = function(value){
	if (!this._element){
		throw new Error("Cell is not drawn");
	}
	this._element.width(value);
}