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

GridCell.prototype.getSkin = function(){
	return GridCellSkin[this._column._v.skin];
};
GridCell.prototype.build = function(){
	var skin = this.getSkin();
	if (!skin){
		throw new Error("No such skin:" + this._column._v.skin);
	}
	var struct = skin[this._column._v.columnType];
	if (!struct){
		throw new Error("No such column type:" + this._column._v.columnType);
	}
	this._element = new BoxElement();
	this._element.build(struct);
	this._element.drawRec({target:this._row._element});
};

GridCell.prototype.remove = function(){
	if (!this._element){
		throw new Error("Cell is not drawn");
	}
	this._element.remove();
};


GridCell.prototype.width = function(value){
	if (!this._element){
		throw new Error("Cell is not drawn");
	}
	this._element.width(value);
}