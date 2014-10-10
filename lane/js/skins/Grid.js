/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var GridSkin = {};
GridSkin.def = {
	//horizontal:true,
	c:[
	    {
	    	name:"header",
	    	height:Constants.lineHeight,
	    	hs:true,
	    	overflow:BoxElement.OVERFLOW_MODE.hidden
	    },
	   	{
	   		name:"content",
	   		hs:true,
	   		vs:true,
	   		borderWidth:[1,1,1,1],
	   		borderColor:"#000",
	   		overflow:BoxElement.OVERFLOW_MODE.hidden
	   	},
	   	{
	   		name:"footer",
	   		hs:true,
	   		height:Constants.lineHeight,
	   		overflow:BoxElement.OVERFLOW_MODE.hidden
	   	}
	]
};

GridRowSkin = {};
GridRowSkin.def = {
	height:Constants.lineHeight,
	horizontal:true,
    borderWidth:[0,0,1,0],
	borderColor:"#ccc",
	overflow:BoxElement.OVERFLOW_MODE.hidden,
	hovered:{
		backgroundColor:"#ccc"
	}
};

GridHeaderSkin = {};
GridHeaderSkin.def = {
	height:Constants.lineHeight,
	horizontal:true,
    borderWidth:[0,0,0,0],
	borderColor:"#000",
	overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridFooterSkin = {};
GridFooterSkin.def = {
	height:Constants.lineHeight,
	horizontal:true,
    borderWidth:[0,0,1,0],
	borderColor:"#000",
	overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridHeaderCellSkin = {};
GridHeaderCellSkin.def = {
	height:Constants.lineHeight,
	name:"caption",
	fontWeight:"bold",
	borderWidth:[0,1,0,0],
	borderColor:"0xffffff"
};

GridFooterCellSkin = {};
GridFooterCellSkin.def = {
	height:Constants.lineHeight,
	name:"caption",
	borderWidth:[0,1,0,0],
	borderColor:"0xffffff"
	
};

GridCellSkin = {};
GridCellSkin.def = {
	text:{
		name:"caption",
		height:Constants.lineHeight,
		overflow:BoxElement.OVERFLOW_MODE.hidden
	},
	img:{
		name:"img",
		width:16,
		height:16
	},
	tree:{
		c:[
		   {
			   name:"img",
			   width:16,
			   height:16
		   },
		   {
			   name:"caption",
			   width:1000,
			   overflow:BoxElement.OVERFLOW_MODE
		   }
		]
	}
};

GridHelperSkin = {
	width:3,
	cursor:"col-resize",
	c:[
	   {
		   margin:[0,0,0,1],
		   width:1,
		   hs:true,
		   borderWidth:[0,0,0,1],
		   borderColor:"#000000"
	   }
	]
};