//
//@@/@dependsOn: DataOutOfRangeError
//@@@dependsOn: DataColumn
//
/**
 * @constructor
 * @extends DataSource
 */
var DataGrid = function(){
	DataSource.call(this);
	this._data = [];
	this._columnsCache = {};
	this._visible = 0;
	this._currentRow = 0;
};

Util.extend(DataGrid, DataSource);
DataGrid.type = "DataGrid";
DataGrid.prototype.columns = DataGrid.addProperty("columns",[]);

DataGrid.prototype._columnsChanged = function(value){
	this._columnsCache = {};
	for (var k in value){
		this._columnsCache[value[k]._v.name] = value[k];
	}
};

DataGrid.prototype.getByIndex = function(index){
	return this._data[index];
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
	
	var dataUnit = new DataRow();
	dataUnit.data = row;
	dataUnit.previous = currentIndex;
	dataUnit.previousVisible = currentIndex;
	dataUnit.current = this._data.length;
	dataUnit.dataGrid = this;
	if (currentLast){
		currentLast.next = currentIndex + 1;
	}
	this._data.push(dataUnit);
	this._visible ++;
	this.trigger("dataUpdate");
};

/**
 * function moves current focused row to current row + count elements
 * @param count
 */
DataGrid.prototype.moveCurrentRow = function(count){
	this.moveTo(this._currentRow + count);
};

/**
 * refreshes the view grids if (they are/it) connected
 */
DataGrid.prototype.refreshView = function(){
	this.trigger("dataUpdate");
};
/**
 * function moves current focused row
 * @param index
 */
DataGrid.prototype.moveTo = function(index){
	if (index < 0 ){
		throw new DataOutOfRangeError("Cant moveCurrentRow to negative index");
	}
	if (index > this._data.length - 1 ){
		throw new DataOutOfRangeError("Move index out of range");
	}
	this._currentRow = index;
	this.trigger("dataCursorMoved", this._currentRow);
};

/**
 * Function returns current focused row
 * @returns {DataRow} current row
 */
DataGrid.prototype.getCurrentRow = function(){
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
	return this._data.length - this._currentRow - 1;
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

DataGrid.prototype.find = function(findFunction){
	var found = false;
	this.each(function(row){
		if (found = findFunction.call(this, row) != undefined){
			return true;
		}
	});
	return found;
};

DataGrid.prototype.each = function(callBack){
	for (var k in this._data){
		if (callBack(this._data[k]) === true){
			return true;
		}
	}
};

DataGrid.prototype.getRows = function(from, count, callBack){
	if (typeof from == "object"){
		from = from.current;
	}
	if (from + count - 1> this._data.length) {
		throw new Error ("Data index is out of range [" + (this._currentRow + count) + "]");
	}
	
	if (from < 0){
		throw new Error ("Data index is out of range [" + this._currentRow + "]");
	}
	if (count > 0){
		for (var i = from; i < from + count; i ++){
			if (callBack(this._data[i], i) === false){
				return;
			}
		}
	} else {
		for (var i = from; i > from + count; i --){
			if (callBack(this._data[i], i) === false){
				return;
			}
		}
	}
	
};

/**
 * returns count of visible items
 * @param row
 * @returns
 */

DataGrid.prototype._getVisibleUpForRow = function(row){
	//
	//	warning, this method is only for dataGrid 
	//
	if (typeof row === "object"){
		row = row.current;
	}
	return row + 1;
};

DataGrid.prototype._getVisibleDownForRow = function(row){
	//
	//	warning, this method is only for dataGrid 
	//
	if (typeof row === "object"){
		row = row.current;
	}
	return this._visible - row;
};

DataGrid.prototype._getRelative = function(row, offset){
	return this._data[row.current + offset];
};
/**
 * removes element by index
 * @param index
 */
DataGrid.prototype.remove = function(index){
	var prev = this._data[index].previous;
	this._data.splice(index, 1);
	for (var i = index; i < this._data.length; i++){
		/** @type DataRow */
		var elem = this._data[i];
		elem.previous = prev;
		elem.previousVisible = prev;
		elem.next = i + 1;
		elem.nextVisible = i + 1;
		elem.current = i;
		prev = i;
	}
};

DataGrid.on("columnsChanged", DataGrid.prototype._columnsChanged);

/**
 * builds dataGrid
 * @returns DataGrid
 */
DataGrid.build = function(struct){
	var dataGrid = new DataGrid();
	var columns = DataColumn.build(struct.columns);
	dataGrid.columns(columns);
	if (struct.data){
		for (var k in struct.data){
			dataGrid.add(struct.data[k]);
		}
	}
	return dataGrid;
};




