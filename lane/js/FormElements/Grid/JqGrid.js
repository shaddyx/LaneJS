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
	
	
	/*var mydata = [
			{id:"1",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"2",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"3",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"4",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"5",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"6",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"7",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
		];
	for(var i=0;i<=mydata.length;i++)
		jQuery(this._tableElement).jqGrid('addRowData',i+1,mydata[i]);*/
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