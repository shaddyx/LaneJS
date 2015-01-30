/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var DateInputBoxSkin = {};
DateInputBoxSkin.__grid = {
	type:"Grid",
	showHeader:false,
	showFooter:false,
	hs:true,
	vs:true
	
};
DateInputBoxSkin.def = {
	horizontal:true,
	cursor:"pointer",
	vAlign:BoxElement.ALIGN.middle,
	backgroundColor:"#FFFFFF",
	c:[
	   {
		   name:"caption"
		   //vAlign:BoxElement.ALIGN.middle
	   },
	   {
		   hs:true,
		   vs:true,
		   borderColor:"#ccc",
		   borderWidth:[1,1,1,1],
		   borderRadius:[3,3,3,3],
		   name:"inputContainer",
		   horizontal:true,
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
			   },
			   {
				   vs:true,
				   lineHeight:10,
				   caption:"...",
				   cursor:"pointer",
				   name:"selectStartButton",
				   borderColor:"#ccc",
				   borderRadius:[2,2,2,2],
				   borderWidth:[1,1,1,1],
				   margin:[2,2,2,2]
			   }
		  ],
		  rootBuild:[
		        {
					floating : true,
					zIndex:topZIndex,
					visible:false,
					height:250,
					width:260,
					minWidth:100,
					name:"calendarContainer",
					relativity:{
						target:"inputContainer",
						anchor:"bottom"
					}
				}
		  ]
	   }
	  ]
};