//
//@@/@dependsOn: DataOutOfRangeError
//@@@dependsOn: DataColumn
//
/**
 * @constructor
 * @extends DataGrid
 */
var DataTreeGrid = function(){
	DataGrid.call(this);
};

Util.extend(DataTreeGrid, DataGrid);
DataTreeGrid.type = "DataTreeGrid";

/**
 * function adds row 
 * @param row - rowData object
 */
DataTreeGrid.prototype.add = function(row){
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

	var dataRow = new DataRow();
	dataRow.data = row;
	dataRow.previous = currentIndex;
	dataRow.previousVisible = currentIndex;
	dataRow.current = this._data.length;
	dataRow.dataGrid = this;

	if (currentLast){
		currentLast.next = currentIndex + 1;
	}
	this._data.push(dataRow);
	this._visible ++;
	this.trigger("dataUpdate");
	this.trigger("dataModified");
	return dataRow;
};

/**
 * builds DataTreeGrid 
 */
DataTreeGrid.build = function(struct){
	var dataTreeGrid = new DataTreeGrid();
	var columns = DataColumn.build(struct.columns);
	DataTreeGrid.columns(columns);
	return dataTreeGrid;
};




