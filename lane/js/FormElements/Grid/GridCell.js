var GridCell = function(column, row) {
	BaseObject.call(this);
	this._row = row;
	this._grid = row._grid;
	this._column = column;
	this._changed = false
};
Util.extend(GridCell, BaseObject);
GridCell.type = "GridCell";
GridCell._props = {
	backgroundColor:"inherit"
};
GridCell.prototype.columnName = GridCell.addProperty("columnName", "");
GridCell.prototype.selected = GridCell.addProperty("selected", false);

GridCell.buildCell = function(column, row){
	var obj;
	switch(column._v.columnType){
		case "text":
			obj = new GridTextCell(column, row);
			break;
		case "img":
			obj = new GridImgCell(column, row);
			break;
		case "checkbox":
			obj = new GridCheckBoxCell(column, row);
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
	this._element.removeListener("click", this._cellClicked, this);
	this._element.on("click", this._cellClicked, this);
	this._element.removeListener("dblClick", this._cellDblClicked, this);
	this._element.on("dblClick", this._cellDblClicked, this);
	this.updateSelected();
};

GridCell.prototype.remove = function(){
	if (!this._element){
		throw new Error("Cell is not drawn");
	}
	this._element.remove();
};


GridCell.prototype.returnContainer = function(){
	this._element.clear();
	return this._element;
};

GridCell.prototype.restoreContainer = function(){
	this._element.clear();
	this.build();
};

GridCell.prototype._cellDblClicked = function(){
	var row = this._grid._v.data.getByIndex(this._row._v.rowIndex);
	this.trigger("dblClick",this, row);
	this._grid.trigger("cellDblClicked", this, row);
};

GridCell.prototype._cellClicked = function(){
	var row = this._grid._v.data.getByIndex(this._row._v.rowIndex);
	if (row){
		row.select();
		this._grid.scheduleRender();
	}
	this.trigger("click",this, row);
	this._grid.trigger("cellClicked",this, row);
};

GridCell.prototype.width = function(value){
	if (!this._element){
		throw new Error("Cell is not drawn");
	}
	this._element.width(value);
};

GridCell.prototype.setProperty = function(name, value){
	if (name != this._baseClass._props[name]){
		this._changed = true;
		this._element[name](value);
	}
};

GridCell.prototype.restoreProperties = function(){
	if (this._changed){
		for (var name in this._baseClass._props){
			this._element[name](this._baseClass._props[name]);
		}
	}
	this._changed = false;
};

GridCell.prototype.notifyDataUpdate = function(){
	this._grid._v.data.trigger("dataUpdate");
};

GridCell.prototype.updateSelected = function(){
	this._element && this._element.setStyleClassRec(this._v.selected ? "cellSelected" : "cellUnselected");
};

GridCell.on("selectedChanged", GridCell.prototype.updateSelected);