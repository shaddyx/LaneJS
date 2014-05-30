var JqGrid = function() {
	FormElement.call(this);
	this.columns(new TypedMap(JqGridColumn));
};
Util.extend(JqGrid, FormElement);
JqGrid.type = "JqGrid";
JqGrid.func = {};
JqGrid.addProperty("multiSelect", false, {type:"boolean"});
JqGrid.addProperty("columns", false, {type:"TypedMap"});

JqGrid.prototype.afterDraw = function(){
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
	this.grid = jQuery(this._tableElement).jqGrid({
		datatype: "local",
		height: this._values.height,
		width: this._values.width,
		hidegrid:false,
		//viewrecords: true,
		caption:this._values.caption,
		pager:this._elements.table.navigator,
	   	colNames:colNames,
	   	colModel:colModel,
	   	multiselect: this._values.multiSelect
	});
};


JqGrid.prototype.add = function(index, data){
	this.grid.jqGrid('addRowData', index, data);
};

JqGrid.prototype.del = function(index){
	this.grid.jqGrid('delRowData', index);
};

JqGrid.prototype.update = function(index, data){
	this.grid.jqGrid('setRowData', index, data);
};


JqGrid.on("afterDraw", JqGrid.prototype.afterDraw);
JqGrid.on(["widthChanged","heightChanged"], function(){
	var my = this;
	if (!this.timeout && this.grid){
		this.timeout = setTimeout(function(){
			this.timeout = false;
			my.grid&&my.grid.setGridWidth(my._values.width);
			my.grid&&my.grid.setGridHeight(my._values.height - 72);
		},0);
	}
});

JqGrid.on("captionChanged", function(value){
	this.grid && this.grid.jqGrid("setCaption", value);
});