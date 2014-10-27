var JqGrid = function() {
	Panel.call(this);
	this.columns(new TypedMap(JqGridColumn));
	/*this.columns().on("added", function(){
		debugger;
	});*/
};
Util.extend(JqGrid, Panel);
JqGrid.type = "JqGrid";
JqGrid.func = {};
JqGrid.addProperty("multiSelect", false, {type:"boolean"});
JqGrid.addProperty("sortColumn",false);
JqGrid.addProperty("columns", false, {type:"TypedMap"});

JqGrid.prototype.afterDraw = function(){
	var my = this;
	this._tableElement = document.createElement("table");
	this._tableElement.setAttribute("id", "table" + this.id);
	this._elements.table.htmlElement.appendChild(this._tableElement);
	
	var colNames = [];
	var colModel = [];
	this.columns().each(function(){
		colNames.push(this.caption());
		colModel.push(this.toJqGridModel());
	});
	console.log(colModel);
	var params = {
			datatype: "local",
			height: this._v.height,
			width: this._v.width,
			hidegrid:false,
			//viewrecords: true,
			caption:this._v.caption,
			pager:this._elements.table.navigator,
		   	colNames:colNames,
		   	colModel:colModel,
		   	multiselect: this._v.multiSelect
	};
	if (this._v.sortColumn) {
		params.sortname = this._v.sortColumn; 
	}
	this.grid = jQuery(this._tableElement).jqGrid(params);
};


JqGrid.prototype.add = function( data){
	this.grid.jqGrid('addRowData', data.id, data);
	return data;
};

JqGrid.prototype.del = function(index){
	if (index instanceof Object) {
		index = index.id;
	}
	this.grid.jqGrid('delRowData', index);
};

JqGrid.prototype.update = function(data){
	this.grid.jqGrid('setRowData', data.id, data);
};


JqGrid.prototype.getNodeById = function(id){
	return this.grid.jqGrid('getLocalRow', id);
};

JqGrid.prototype.nodeExists = function(id){
	var ids = this.grid.jqGrid("getDataIDs")
	if (!ids.indexOf) {
		ids.indexOf = function(elem){
			for (var i = 0; i < this.length; i++) {
				if (this[i] === elem){
					return i;
				}
			}
			return -1;
		}
	}
	
	if (ids.indexOf(id) !== -1) {
		return true
	}
	return false;
};

JqGrid.prototype.syncNode = function(data){
	if (!this.nodeExists(data.id)) {
		return this.add(data);
	} else {
		this.update(data);
		data.__successUpdated = true;
	}
	return data;
};

JqGrid.prototype.removeNotFound = function(idList){
	
	if (idList instanceof Array) {
		//
		//		list to map optimization
		//
		var l = {};
		for (var k in idList){
			l[idList[k]] = 1;
		}
		idList = l;
	}
	var idToDataIndex = this.grid.jqGrid('getGridParam','_index');
	var absentList = [];
	
	for (var nodeId in idToDataIndex) {
		if (!idList[nodeId]){
			absentList.push(nodeId);
		}
	}
	
	for (var k in absentList) {
		this.del(absentList[k]);
	}
}


JqGrid.on("afterDraw", JqGrid.prototype.afterDraw);
JqGrid.on(["widthChanged","heightChanged", "visibleChanged"], function(){
	var my = this;
	if (!this.timeout && this.grid){
		this.timeout = setTimeout(function(){
			my.timeout = false;
			my.grid&&my.grid.setGridWidth(my._v.width);
			my.grid&&my.grid.setGridHeight(my._v.height - 27);
		},0);
	}
});

JqGrid.on("sortColumnChanged", function(value){
	this.grid && this.grid.jqGrid("sortGrid", value);
});
		
JqGrid.on("captionChanged", function(value){
	this.grid && this.grid.jqGrid("setCaption", value);
});