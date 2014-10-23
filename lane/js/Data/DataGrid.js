//
//@@/@dependsOn: DataOutOfRangeError
//
var DataGrid = function(){
	DataSource.call(this);
	this._data = [];
	this._columnsCache = {};
	this._visible = 0;
	this._currentRow = 0;
};

Util.extend(DataGrid, DataSource);
DataGrid.type = "DataGrid";
DataGrid.addProperty("columns",[]);

DataGrid.prototype._columnsChanged = function(value){
	this._columnsCache = {};
	for (var k in value){
		this._columnsCache[value[k]._v.name] = value[k];
	}
};

/**
 * function adds row 
 * @param row - rowData object
 */
DataGrid.prototype.add = function(row){
	if (typeof row !== "object") {
		throw new Error("Row must be an object");
	}
	var currentIndex = this._data.length - 1;
	var currentLast = this._data[currentIndex];
	for (var k in row) {
		if (this._columnsCache[k] == undefined){
			throw new Error("Error, column " + k + " is not exists in DataGrid");
		}
	}
	
	for (k in this._columnsCache == undefined) {
		if (!row[k]){
			throw new Error("Error, column " + k + " is not exists in row");
		}
	}
	
	var dataUnit = {
		data:row, 
		previous:currentIndex, 
		next:undefined
	};
	if (currentLast){
		currentLast.next = currentIndex + 1;
	}
	this._data.push(dataUnit);
	this._visible ++;
};

/**
 * function moves current focused row to current row + count elements
 * @param count
 */
DataGrid.prototype.move = function(count){
	this.moveTo(this._currentRow + count);
};

/**
 * function moves current focused row
 * @param index
 */
DataGrid.prototype.moveTo = function(index){
	if (index < 0 ){
		throw new DataOutOfRangeError("Cant move to negative index");
	}
	if (index > this._data.length - 1 ){
		throw new DataOutOfRangeError("Move index out of range");
	}
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
	return this._data.length - this._currentRow;
};


/**
 * function returns number of visible rows from current focused row to beginning of list
 * @returns
 */
DataGrid.prototype.visibleUp = function(){
	return this._currentRow;
};

DataGrid.prototype.visible = function(){
	return this._visible;
};

DataGrid.prototype.size = function(){
	return this._visible;
};

DataGrid.prototype.getRows = function(count, callBack){
	if (this._currentRow + count - 1> this._data.length) {
		throw new Error ("Data index is out of range [" + (this._currentRow + count) + "]");
	}
	
	if (this._currentRow < 0){
		throw new Error ("Data index is out of range [" + this._currentRow + "]");
	}
	
	for (var i = 0; i < count; i++){
		callBack(this._data[this._currentRow + i], this._currentRow + i);
	}
};

DataGrid.on("columnsChanged", DataGrid.prototype._columnsChanged);
