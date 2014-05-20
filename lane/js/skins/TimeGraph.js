var TimeGraphSkin = {};
TimeGraphSkin.def = {
	horizontal:true,
	c:[
	   	{
	   		name:"captionBox",
	   		width:60,
	   		borderWidth:[1,1,1,1],
	   		borderColor:"#000",
	   		vs:true
	   	},
	   	{
	   		name:"drawBox",
	   		hs:true,
	   		vs:true,
	   		borderWidth:[1,1,1,1],
	   		borderColor:"#000"
	   	}
	]
};


var TimeGraphBarSkin = {};
TimeGraphBarSkin.def = {
	name:"box",
	horizontal:true,
	floating:true,
	borderWidth:[2,2,2,2],
	borderColor:"#000",
	zIndex:10,
	hovered:{
		borderColor:"F7FF9C"
	}
};


