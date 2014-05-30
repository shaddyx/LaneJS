var OldErrorObject = Error;
window.onerror = function(errorMsg, url, lineNumber, err){
	console.log("error:",errorMsg, url, lineNumber, err);
	return false;
};
SpeedUtil.start("main cycle");
var rootElement = BoxElement.virtualizeBody();
var win;
browser.imageBase("../../lane/");
browser.on("ready",function(){
	win = FormElement.build({
		type:"Window",
		left: 300,
		caption:"lane.js window",
		width:1200,
		height:400,
		c:[
			{
				type:"JqGrid",
				caption:"This is a grid",
				name:"grid",
				hs:true,
				vs:true,
				columns:{
					   test:{
						   name:"test",
						   width:100,
						   caption:"testC",
						   sortable:true/*,
						   formatter:function (cellvalue, options, rowObject ) {
						        return "<img src='" + cellvalue + "' />";
						   }*/
					   },
					   test1:{
						   name:"test1",
						   caption:"testC1"
					   },
					   test2:{
						   name:"test2",
						   caption:"testC2"
					   }
				}
			}
		]
	}, rootElement);
	win.elements.grid.add(1, {id:1, test:"234523452354", test1:"34563563456", test2:"12234523542354"});
	win.elements.grid.add("asdfasdfadsf", {id:1, test:"234523452354", test1:"34563563456", test2:"12234523542354"});
	win.elements.grid.add(3, {id:1, test:"234523452354", test1:"34563563456", test2:"12234523542354"});
	win.elements.grid.add(4, {id:1, test:"234523452354", test1:"34563563456", test2:"12234523542354"});
	win.elements.grid.update("asdfasdfadsf", {id:1, test:"updated", test1:"34563563456", test2:"sfgsdfgsdfg"});
});
