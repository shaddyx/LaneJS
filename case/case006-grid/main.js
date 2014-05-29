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
				vs:true
			}
		]
	}, rootElement);
});
