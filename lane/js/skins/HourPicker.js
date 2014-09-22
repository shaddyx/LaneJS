/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var HourPickerSkin = {};
HourPickerSkin.def = {
	horizontal:true,
	cursor:"pointer",
	c:[
	   {
		   padding:[9,0,0,0],
		   name:"caption"
		   //vAlign:BoxElement.ALIGN.middle
	   },
	   {
		   hs:true,
		   vs:true,
		   borderColor:"#ccc",
		   borderWidth:[1,1,1,1],
		   borderRadius:[3,3,3,3],
		   c:[
		       {
				   margin:[0,0,0,3],
				   params:{
					   tag:"input",
					   css: 'background-color:white;padding:0;border:0;display:block !important; '
				   },
				   selectable:true,
				   vs:true,
				   hs:true,
				   minWidth:30,
				   name:"input"
			   }
		  ]
	   }
	   
	  ]
};

HourPicker.windowStructure = {};
HourPicker.windowStructure.def = {
	type:"Window",
	width:100,
	height:100,
	caption:"Select hour",
	padding:[0,3,3,0]
};

HourPicker.elementStructure = {};
HourPicker.elementStructure.def = {
	width:32,
	height:32,
	borderWidth:[1,1,1,1],
	borderColor:"#1c94c4",
	backgroundColor:"#f6f6f6",
	color:"#1c94c4",
	margin:[3,0,0,3],
	caption:"00",
	hAlign:BoxElement.ALIGN.middle,
	padding:[8,0,0,0],
	cursor:"pointer",
	hovered:{
		borderColor:"#eb8f00",
		color:"#eb8f00"
	},
	style:{
		selected:{
			borderColor:"#eb8f00",
			color:"#eb8f00"
		}
	}
};
HourPicker.rowStructure = {};
HourPicker.rowStructure.def = {
		horizontal:true
};