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
	var month = 1000*60*60*24*30;
	var data = [];
	var dataMap = {
		881:false,
		883:false,
		884:false,
		885:false,
		886:false,
		887:false,
		888:false
	};
	var stop = false;
	while (!stop){
		for (var k in dataMap) {
			if (!dataMap[k]) {
				dataMap[k] = new TimeGraphBar();
				dataMap[k].time(Math.ceil(Math.random() * 1000*60*60*24*10));
				dataMap[k].length(200000000);
				dataMap[k].line(k);
				data.push(dataMap[k]);
			}
			var oldGraph = dataMap[k];
			var newElement = new TimeGraphBar();
			newElement.time(Math.ceil(oldGraph.time() + oldGraph.length() + Math.random() * 1000*60*60*24*10));
			newElement.length(200000000);
			newElement.line(k);
			if (newElement.time() + newElement.length() > month){
				stop = true;
			}
			dataMap[k] = newElement;
			data.push(newElement);
		}
	}
	
	win = FormElement.build({
		type:"Window",
		left: 300,
		caption:"lane.js window",
		width:1200,
		height:400,
		c:[
			{
				type:"TimeGraph",
				caption:"TimeGraph example",
				name:"timeGraph",
				hs:true,
				vs:true
			}
		]
	}, rootElement);
	var graph = win.elements.timeGraph;
	graph.data(data);
});
