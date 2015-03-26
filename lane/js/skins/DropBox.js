/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var DropBoxSkin = {};
DropBoxSkin.def = {
	horizontal:true,
	cursor:"pointer",
	vAlign:BoxElement.ALIGN.middle,
	backgroundColor:"#FFFFFF",
	c:[
	   {
		   name:"caption"
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
					   tag:"select",
					   css: 'background-color:white;padding:0;border:0;display:block !important; '
				   },
				   selectable:true,
				   vs:true,
				   hs:true,
				   minWidth:30,
				   height:30,
				   name:"input"
			   }
		  ]
	   }
	  ]
};