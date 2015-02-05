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
DataGrid.prototype.loading = DataGrid.addProperty("loading",false);

DataGrid.prototype._columnsChanged = function(value){
	this._columnsCache = {};
	for (var k in value){
		this._columnsCache[value[k]._v.name] = value[k];
	}
};


DataGrid.prototype.clear = function(){
	this._data = [];
	this._currentRow = 0;
	this._visible = 0;
	this.trigger("dataUpdate");
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
	if (typeof index === "object"){
		index = index.current;
	}
	if (index < 0 ){
		throw new DataOutOfRangeError("Cant moveCurrentRow to negative index");
	}
	if (index > this._data.length - 1){
		if (this._data.length){
			console.log("There is no such index:" + index + " moving to " + (this._data.length - 1));
			index = this._data.length - 1;
		} else {
			index = 0;
		}
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


DataGrid.prototype.export = function(){
	var resultObject = {
		data:[],
		columns:[]
	}
	for (var x in this._columnsCache){
		/** @type {DataColumn} */
		var dataColumn = this._columnsCache[x];
		resultObject.columns.push(dataColumn.export());
	}
	for (var k in this._data){
		/** @type {DataRow} */
		var dataRow = this._data[k];
		var obj = {};
		for (var x in resultObject.columns){
			var column = resultObject.columns[x];
			obj[column.name] = dataRow.data[column.name];
		}
		resultObject.data.push(obj);
	}
	return resultObject;
};

DataGrid.prototype.load = function(obj){
	if (!obj) {
		throw new Error("Data must be an object");
	}
	var skipCells = false;
	if (obj.skipCells){
		if (obj.skipCells instanceof Array){
			skipCells = {};
			for (var k in obj.skipCells){
				skipCells[obj.skipCells[k]] = 1;
			}
		} else {
			skipCells = obj.skipCells;
		}
	}
	this.clear();
	obj.columns && this.columns(DataColumn.build(obj.columns));
	for (var k in obj.data){
		var object = obj.data[k];
		if (skipCells){
			object = {};
			for (var x in obj.data[k]){
				if (!skipCells[x]){
					object[x] = obj.data[k][x];
				}
			}
		}
		this.add(object);
	}
};

DataGrid.on("columnsChanged", DataGrid.prototype._columnsChanged);
DataGrid.on("loadingChanged", DataGrid.prototype.refreshView);

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