/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var GridSkin = {};
GridSkin._parts = {
	scroller:{
			width:15,
   			vs:true,
   			name:"vertScrollContainer",
   			visible:false,
   			c:[
   			   {
   				   backgroundColor:"#cccccc",
   				   width:15,
   				   height:15,
				   backgroundImage:"img/Grid/up.png",
				   backgroundPosition:"center center",
				   backgroundRepeat:"no-repeat",
   				   name:"scrollUp"
   			   },
   			   {
   				  hs:true,
   				  vs:true,
   				  c:[
	   				   {
		   				   backgroundColor:"#79B7E7",
		   				   width:13,
		   				   height:30,
		   				   left:1,
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
				   backgroundImage:"img/Grid/down.png",
				   backgroundPosition:"center center",
				   backgroundRepeat:"no-repeat",
   				   name:"scrollDn"
   				   
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
			   backgroundImage:"img/Grid/left.png",
			   backgroundPosition:"center center",
			   backgroundRepeat:"no-repeat",
			   name:"scrollLeft"
		   },
		   {
			  hs:true,
			  vs:true,
			  name:"horzScrollerSliderContainer",
			  on:{
					horzScrollerMoved:function(percentage, grid){
						var diff = grid._elements.gridContentContainer._v.innerWidth - grid._elements.gridContentContainer._v.width;
						grid._elements.gridContentContainer.scrollLeft(- diff * percentage / 100);
					}
			  },
			  c:[
			   {
				   backgroundColor:"#79B7E7",
   				   height:12,
   				   width:30,
   				   top:1,
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
			   backgroundImage:"img/Grid/right.png",
			   backgroundPosition:"center center",
			   backgroundRepeat:"no-repeat",
			   name:"scrollRight"
		   }
		]
   	}
}
GridSkin.def = {
	c:[
		{
			floating:true,
			zIndex:10,
			backgroundColor:"black",
			opacity:0.2,
			vAlign:BoxElement.ALIGN.middle,
			hAlign:BoxElement.ALIGN.middle,
			name:"loadingSpinner",
			relativity:{
				target:function(){
					return this._topEl;
				},
				anchor:"width, height",
				spyVisible:false,
				func:function(target, res){
					res.left = 0;
					res.top = 0;
					return res;
				}
			},
			c:[
				{
					width:220,
					height:19,
					backgroundImage:"/img/Grid/spinner.gif"
				}
			]
		},
		{
			horizontal:true,
			hs:true,
			vs:true,
			borderWidth:[1,1,1,1],
			style:{
				focused:{
					borderColor:"#79B7E7"
					//borderColor:"#FF0000"
				},
				unFocused:{
					borderColor:"#cccccc"
				}
			},
			c:[
				{
					hs:true,
					vs:true,
					name:"gridContentContainer",
					overflow:BoxElement.OVERFLOW_MODE.hidden,
					c:[
					    {
					    	name:"header",
					    	height:Constants.lineHeight,
					    	hs:true,
							backgroundImage:{from:"#EBEDEF",to:"#F7F7F8"}
					    },
					    {
					   		name:"content",
					   		hs:true,
					   		vs:true,
					   		borderWidth:[1,0,1,0],
					   		borderColor:"#79B7E7",
					   		overflow:BoxElement.OVERFLOW_MODE.hidden
				   		},
					   	{
					   		name:"footer",
					   		hs:true,
					   		height:Constants.lineHeight,
					   		overflow:BoxElement.OVERFLOW_MODE.hidden
					   	}
					]
				},
				GridSkin._parts.scroller
			]
		},
		GridSkin._parts.horzScroller
	]
};

GridRowSkin = {};
GridRowSkin.def = {
	height:Constants.rowHeight + 1,
	horizontal:true,
    borderWidth:[0,0,1,0],
	borderColor:"#79B7E7",
	styleClass:"clean",
	//overflow:BoxElement.OVERFLOW_MODE.hidden,
	style:{
		normal:{
			backgroundColor:"inherit",
			visible:true
		},
		selected:{
			backgroundColor:"#ccc",
			visible:true
		},
		clean:{
			visible:false
		}
	}
};

GridHeaderSkin = {};
GridHeaderSkin.def = {
	height:Constants.lineHeight,
	horizontal:true,
    borderWidth:[0,0,0,0],
    padding:[0,0,0,0],
	borderColor:"#79B7E7",
	//overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridFooterSkin = {};
GridFooterSkin.def = {
	height:Constants.lineHeight,
	horizontal:true,
	borderWidth:[0,0,0,0],
	padding:[0,0,0,0],
	borderColor:"#79B7E7",
	//overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridHeaderCellSkin = {};
GridHeaderCellSkin.def = {
	height:Constants.lineHeight,
	borderWidth:[0,1,0,0],
	borderColor:"#79B7E7",
	//name:"caption",
	cursor:"pointer",
	horizontal:true,
	c:[
		{
			name:"caption",
			fontWeight:"bold",
			hs:true,
			vs:true,
			overflow:BoxElement.OVERFLOW_MODE.hidden,
			hAlign:BoxElement.ALIGN.middle
		},
		{
			width:8,
			height:8,
			margin:[5,3,0,0],
			name:"sortElement",
			visible:false,
			style:{
				sortAsk:{
					backgroundImage:"/img/Grid/downArrow.png"
				},
				sortDesk:{
					backgroundImage:"/img/Grid/upArrow.png"
				}
			},
			styleClass:"sortAsk"
		}
	]
};

GridFooterCellSkin = {};
GridFooterCellSkin.def = {
	height:Constants.lineHeight,
	name:"caption",
	borderWidth:[0,1,0,0],
	borderColor:"#79B7E7",
	overflow:BoxElement.OVERFLOW_MODE.hidden
};

GridCellContainer = {
	overflow:BoxElement.OVERFLOW_MODE.hidden,
	height:Constants.rowHeight,
	borderWidth:[0,1,0,0],
	borderColor:"#79B7E7"
};

GridCellSkin = {
	__defaults:{
		style:{
			cellSelected:{
				backgroundColor:"#aacccc"
			},
			cellUnselected:{
				backgroundColor:"inherit"
			}
		}
	}
};

GridCellSkin.def = {
	text:{
		import:GridCellSkin.__defaults,
		cursor:"pointer",
		c:[
		   {
			   name:"caption",
			   height:Constants.rowHeight,
			   width:1000,
			   overflow:BoxElement.OVERFLOW_MODE.hidden
		   }
		]
	},
	img:{
		import:GridCellSkin.__defaults,
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
	checkbox:{
		import:GridCellSkin.__defaults,
		hAlign:BoxElement.ALIGN.middle,
		cursor:"pointer",
		c:[
		   {
				name:"img",
				width:16,
				height:16,
				styleClass:"no",
				style:{
					yes:{
						backgroundImage:"img/CheckBox/yes.png"
					},
					no:{
						backgroundImage:"img/CheckBox/no.png"
					}
				}
		   }
		]
	},
	tree:{
		import:GridCellSkin.__defaults,
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
	width:10,
	height:100,
	floating:true,
	cursor:"col-resize",
	draggable:{
		axis:"x"
	},
	margin:[0,0,0,-5],
	padding:[0,0,0,5],
	c:[
	   {
		   width:1,
		   hs:true,
		   vs:true,
		   borderColor:"#79B7E7",
		   style:{
				dragStarted:{
					borderWidth:[0,0,0,1]
				},
				dragEnded:{
					borderWidth:[0,0,0,0]
				}
			}
	   }
	]
};