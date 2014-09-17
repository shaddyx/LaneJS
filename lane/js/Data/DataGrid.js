var DataGrid = function(){
	BaseObject.call(this);
	this._data = [];
	this._currentRow = undefined;
};
Util.extend(DataGrid, DataSource);
DataGrid.type = "DataGrid";
DataGrid.addProperty("visible",0);

/**
 * function adds row 
 * @param row - rowData object
 */
DataGrid.prototype.add = function(row){
	if (typeof row !== "object") {
		throw new Error("Row must be an object");
	}
	this._data.push({data:row});
	this.visible(this._v.visible + 1);
};

/**
 * function moves current focused row to current row + count elements
 * @param count
 */
DataGrid.prototype.move = function(count){
	this._currentRow = count;
};

/**
 * function moves current focused row
 * @param index
 */
DataGrid.prototype.moveTo = function(index){
	this._currentRow = index;
};

/**
 * Function returns current focused row
 * @returns current row
 */
DataGrid.prototype.currentRow = function(){
	if (this._currentRow == undefined && this._data.length){
		this._currentRow = 0;
	}
	return this._data[this._currentRow];
};

/**
 * function returns number of visible rows from current focused row to end of list
 * @returns
 */
DataGrid.prototype.visibleDown = function(){
	if (this._curentRow != undefined){
		return this._data.length - this._curentRow;
	}
};


/**
 * function returns number of visible rows from current focused row to beginning of list
 * @returns
 */
DataGrid.prototype.visibleDown = function(){
	if (this._curentRow != undefined){
		return this._curentRow - 1;
	}
};