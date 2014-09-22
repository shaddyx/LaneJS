/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var InputBoxSkin = {};
InputBoxSkin.def = {
	horizontal:true,
	cursor:"pointer",
	vAlign:BoxElement.ALIGN.middle,
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