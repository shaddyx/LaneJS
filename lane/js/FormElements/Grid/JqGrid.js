var JqGrid = function() {
	FormElement.call(this);
};
Util.extend(JqGrid, FormElement);
JqGrid.type = "JqGrid";
JqGrid.func = {};

JqGrid.prototype.afterDraw = function(){
	this.grid = jQuery(this._elements.table.htmlElement).jqGrid({
		datatype: "local",
		height: this._values.height,
		width: this._values.width,
	   	colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
	   	colModel:[
	   		{name:'id',index:'id', width:60, sorttype:"int"},
	   		{name:'invdate',index:'invdate', width:90, sorttype:"date"},
	   		{name:'name',index:'name', width:100},
	   		{name:'amount',index:'amount', width:80, align:"right",sorttype:"float"},
	   		{name:'tax',index:'tax', width:80, align:"right",sorttype:"float"},		
	   		{name:'total',index:'total', width:80,align:"right",sorttype:"float"},		
	   		{name:'note',index:'note', width:150, sortable:false}		
	   	],
	   	//multiselect: true,
	   	//caption: "Manipulating Array Data"
	});
	var mydata = [
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
		jQuery(this._elements.table.htmlElement).jqGrid('addRowData',i+1,mydata[i]);
};

JqGrid.on("afterDraw", JqGrid.prototype.afterDraw);
/*JqGrid.on("afterDraw", function(){
	var my = this;
	setTimeout(function(){
		my.afterDraw();
	},1000);
});*/
JqGrid.on(["widthChanged","heightChanged"], function(){
	var my = this;
	/*my.grid&&my.grid.setGridWidth(my._values.width);
	my.grid&&my.grid.setGridHeight(my._values.height);*/
	if (!this.timeout){
		this.timeout = setTimeout(function(){
			this.timeout = false;
			my.grid&&my.grid.setGridWidth(my._values.width);
			my.grid&&my.grid.setGridHeight(my._values.height-22);
		},0);
	}
});