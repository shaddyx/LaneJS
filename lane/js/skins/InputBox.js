/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var InputBoxSkin = {};
InputBoxSkin.__grid = {
	type:"Grid",
	showHeader:false,
	showFooter:false,
	hs:true,
	vs:true
	
};
InputBoxSkin.def = {
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
					height:30,
					width:300,
					minWidth:100,
					borderColor : "#79B7E7",
					borderWidth : [1,1,1,1],
					borderRadius : [3,3,3,3],
					backgroundColor:"#ffffff",
					name:"gridContainer",
					relativity:{
						target:"inputContainer",
						anchor:"bottom,width"
					}
				}
		  ]
	   }
	  ]
};