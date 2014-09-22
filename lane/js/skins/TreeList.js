/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var TreeListSkin = {};
TreeListSkin.def = {
	vAlign:BoxElement.ALIGN.middle,
	c:[
	   {
		   hs:true,
		   vs:true,
		   name:"treeField",
		   selectable:true,
		   params:{
			   noOverflow:true,
			   css:"overflow:auto"
		   }
	   }
	]
};