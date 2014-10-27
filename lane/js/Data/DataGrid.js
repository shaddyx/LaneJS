//
//@@/@dependsOn: DataOutOfRangeError
//@@@dependsOn: DataColumn
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
DataGrid.addProperty("selectedRow", 0);

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
		current:this._data.length,
		next:undefined,
		selected:false
	};
	if (currentLast){
		currentLast.next = currentIndex + 1;
	}
	if (this._v.selectedRow == this._data.length){
		dataUnit.selected = true;
	}
	this._data.push(dataUnit);
	this._visible ++;
	this.trigger("dataUpdate");
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

DataGrid.prototype.each = function(callBack){
	for (var k in this._data){
		if (callBack(this._data[k]) === true){
			return;
		}
	}
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
//
//		selectin management
//
DataGrid.on("selectedRowBeforeChanged", function(newValue){
	this._data[this._v.selectedRow].selected = false;
});
//
//		selectin management
//
DataGrid.on("selectedRowChanged", function(newValue){
	this._data[newValue].selected = true;
	this.trigger("dataUpdate");
});

DataGrid.on("columnsChanged", DataGrid.prototype._columnsChanged);

/**
 * builds dataGrid 
 */
DataGrid.build = function(struct){
	var dataGrid = new DataGrid();
	var columns = DataColumn.build(struct.columns);
	dataGrid.columns(columns);
	return dataGrid;
};


