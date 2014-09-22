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
	    	caption:"header"
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
	   		caption:"footer"
	   	}
	]
};

GridRowSkin = {};
GridRowSkin.def = {
	height:Constants.lineHeight,
	hs:true,
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
	c:[
	   {
		   borderWidth:[1,1,1,1],
	   	   borderColor:"#000"
	   },
	   {
		   name:"caption",
		   fontWeight:"bold"
	   }
	]
};

GridFooterSkin = {};
GridFooterSkin.def = {
	c:[
	   {
		   borderWidth:[1,1,1,1],
	   	   borderColor:"#000"
	   },
	   {
		   name:"caption"
	   }
	]
};

GridCellSkin = {};
GridCellSkin.def = {
	text:{
		name:"caption",
		//width:1000,
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
