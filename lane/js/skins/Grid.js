/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var GridSkin = {};
GridSkin._parts = {
	scroller:{
    	hs:true,
    	vs:true,
    	horizontal:true,
    	c:[
    	    {
		   		name:"content",
		   		hs:true,
		   		vs:true,
		   		borderWidth:[1,1,1,1],
		   		borderColor:"#79B7E7",
		   		overflow:BoxElement.OVERFLOW_MODE.hidden
	   		},
	   		{
	   			width:15,
	   			vs:true,
	   			name:"vertScrollContainer",
	   			visible:false,
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
    horzScroller:{
   		hs:true,
   		horizontal:true,
   		visible:false,
   		height:15,
		name:"horzScrollContainer",
		c:[
		   {
			   backgroundColor:"#cccccc",
			   width:15,
			   height:15,
			   name:"scrollLeft"
		   },
		   {
			  hs:true,
			  vs:true,
			  name:"horzScrollerSliderContainer",
			  on:{
					horzScrollerMoved:function(percentage, grid){
						var diff = grid._elements.gridContentContainer._v.innerWidth - grid._elements.gridContentContainer._v.width;
						grid._elements.gridContentContainer.scrollLeft(- diff *percentage / 100);
						//grid._elements.content.scrollLeft(- diff *percentage / 100);
						//grid._elements.footer.scrollLeft(- diff *percentage / 100);
					}
			  },
			  c:[
			   {
   				   backgroundColor:"#cccccc",
   				   height:10,
   				   width:30,
   				   top:2,
   				   cursor:"pointer",
   				   name:"horzScroll",
   				   draggable:{
   					   axis:"x"
   				   }
			   }
			  ]
		   },
		   {
			   backgroundColor:"#cccccc",
			   width:15,
			   height:15,
			   name:"scrollRight"
		   }
		]
   	}
}
GridSkin.def = {
	c:[{
		hs:true,
		vs:true,
		name:"gridContentContainer",
		overflow:BoxElement.OVERFLOW_MODE.hidden,
		c:[
		    {
		    	name:"header",
		    	height:Constants.lineHeight,
		    	hs:true
		    },
		    GridSkin._parts.scroller,
		   	{
		   		name:"footer",
		   		hs:true,
		   		height:Constants.lineHeight,
		   		overflow:BoxElement.OVERFLOW_MODE.hidden
		   	}
		]
	},
	GridSkin._parts.horzScroller
	]
	
};

GridRowSkin = {};
GridRowSkin.def = {
	normal:{
		height:Constants.rowHeight,
		horizontal:true,
	    borderWidth:[0,0,1,0],
		borderColor:"#79B7E7",
		overflow:BoxElement.OVERFLOW_MODE.hidden
	},
	selected:{
		backgroundColor:"#ccc"
	},
	clean:{
		visible:false
	}
};

GridHeaderSkin = {};
GridHeaderSkin.def = {
	height:Constants.lineHeight,
	horizontal:true,
    borderWidth:[0,0,0,0],
    padding:[1,0,0,2],
	borderColor:"#79B7E7",
	//overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridFooterSkin = {};
GridFooterSkin.def = {
	height:Constants.lineHeight,
	horizontal:true,
    borderWidth:[0,0,1,0],
    padding:[1,0,0,1],
	borderColor:"#79B7E7",
	//overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridHeaderCellSkin = {};
GridHeaderCellSkin.def = {
	height:Constants.lineHeight,
	name:"caption",
	fontWeight:"bold",
	borderWidth:[0,1,0,0],
	borderColor:"0xffffff",
	hAlign:BoxElement.ALIGN.middle,
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

GridCellContainer = {
	overflow:BoxElement.OVERFLOW_MODE.hidden,
	height:Constants.rowHeight,
	borderWidth:[0,0,0,1],
	borderColor:"#79B7E7"
};

GridCellSkin = {};
GridCellSkin.def = {
	text:{
		cursor:"pointer",
		c:[
		   {
			   name:"caption",
			   height:Constants.rowHeight ,
			   overflow:BoxElement.OVERFLOW_MODE.hidden
		   }
		]
	},
	img:{
		hAlign:BoxElement.ALIGN.middle,
		cursor:"pointer",
		c:[
		   {
				name:"img",
				width:16,
				height:16
		   }
		]
	},
	tree:{
		cursor:"pointer",
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
	margin:[0,0,0,0],
	c:[
	   {
		   width:1,
		   hs:true,
		   vs:true,
		   //borderWidth:[0,0,0,1],
		   //borderColor:"#79B7E7"
	   }
	]
};