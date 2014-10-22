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
	    	hs:true,
	    	vs:true,
	    	horizontal:true,
	    	c:[
	    	    {
			   		name:"content",
			   		hs:true,
			   		vs:true,
			   		borderWidth:[1,1,1,1],
			   		borderColor:"#000",
			   		overflow:BoxElement.OVERFLOW_MODE.hidden
		   		},
		   		{
		   			width:15,
		   			vs:true,
		   			c:[
		   			   {
		   				   backgroundColor:"#cccccc",
		   				   width:15,
		   				   height:15,
		   				   name:"scrollUp"
		   			   },
		   			   {
		   				  hs:true,
		   				  vs:true,
		   				  c:[
			   				   {
				   				   backgroundColor:"#cccccc",
				   				   width:10,
				   				   height:30,
				   				   left:2,
				   				   cursor:"pointer",
				   				   name:"vertScroll",
				   				   draggable:{
				   					   axis:"y"
				   				   }
			   				   }
		   				  ]
		   			   },
		   			   {
		   				   backgroundColor:"#cccccc",
		   				   width:15,
		   				   height:15,
		   				   name:"scrollDn"
		   				   
		   			   }
		   			   
		   			]
		   		}
	    	]
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
	borderColor:"0xffffff",
	overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridFooterCellSkin = {};
GridFooterCellSkin.def = {
	height:Constants.lineHeight,
	name:"caption",
	borderWidth:[0,1,0,0],
	borderColor:"0xffffff",
	overflow:BoxElement.OVERFLOW_MODE.hidden
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
	zIndex:3,
	width:5,
	height:100,
	floating:true,
	cursor:"col-resize",
	draggable:{
		axis:"x"
	},
	margin:[0,0,0,-1],
	c:[
	   {
		   width:1,
		   hs:true,
		   vs:true,
		   borderWidth:[0,0,0,1],
		   borderColor:"#000000"
	   }
	]
};