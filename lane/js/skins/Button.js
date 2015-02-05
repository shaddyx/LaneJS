/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@name:ButtonSkin
 */
var ButtonSkin = {};
ButtonSkin.__hoverStyle = {
	enabled:{
		hovered:{
			backgroundColor:"#fdf5ce",
			borderColor:"#c77405"
		},
		borderColor:"#ccc",
		backgroundColor:"#f6f6f6"
	},
	disabled:{
		hovered:false,
		borderColor:"#ccc",
		backgroundColor:"#f6f6f6"
	}
};
ButtonSkin.def = {
	borderWidth:[1,1,1,1],
	borderRadius:[5,5,5,5],
	cursor:"pointer",
	horizontal:true,
	defaults:{
		captionWidth:false,
		minWidth:30,
		minHeight:30
	},
	borderColor:"#ccc",
	backgroundColor:"#f6f6f6",
	style:ButtonSkin.__hoverStyle,
	c:[
	   {
		   hAlign:BoxElement.ALIGN.middle,
		   name:"caption",
		   padding:[6,4,0,4],
		   color:"#1c94c4",
		   hs:true
	   }
	],
	styleClass:"enabled"
};

ButtonSkin.img = {
		borderColor:"#ccc",
		borderWidth:[1,1,1,1],
		borderRadius:[5,5,5,5],
		cursor:"pointer",
		horizontal:true,
		defaults:{
			minWidth:30,
			minHeight:30,
		},
		style:ButtonSkin.__hoverStyle,
		name:"img",
		backgroundPosition:"center center",
		backgroundRepeat:"no-repeat",
		styleClass:"enabled"
};
ButtonSkin.link = {
	defaults:{
		captionWidth:false
	},
	horizontal:true,
	cursor:"pointer",
	c:[
	   {
		   name:"img",
		   width:16,
		   height:16
	   },
	   {
		   //margin:[5,0,0,3],
		   name:"caption",
		   hs:true,
		   textDecoration:"none",
		   color:"rgb(0, 0, 238)",
		   hovered:{
			   textDecoration:"underline"
		   }
	   }
	]
};

ButtonSkin.imgButton = {
		borderWidth:[1,1,1,1],
		borderRadius:[5,5,5,5],
		cursor:"pointer",
		horizontal:true,
		vAlign:BoxElement.ALIGN.middle,
		defaults:{
			minWidth:30,
			minHeight:30,
			captionWidth:false
		},
		hovered:{
			style:{
				disabled:{
					borderColor:"#ccc",
					backgroundColor:"#f6f6f6"
				},
				enabled:{
					backgroundColor:"#fdf5ce",
					borderColor:"#c77405"
				}
			}
		},
		style:{
			disabled:{
				borderColor:"#ccc",
				backgroundColor:"#f6f6f6"
			},
			enabled:{
				borderColor:"#ccc",
				backgroundColor:"#f6f6f6"
			}
		},
		c:[
		   {
			   hAlign:BoxElement.ALIGN.middle,
			   name:"caption",
               height:15,
			   color:"#1c94c4",
			   hs:true
		   },
		   {
			   name:"img",
			   width:22,
			   height:22,
			   vAlign:BoxElement.ALIGN.middle
		   }
		  ]
	};