/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@name:FieldSetSkin
 */
var FieldSetSkin = {};
FieldSetSkin.def = {
	borderWidth:[1,1,1,1],
	borderRadius:[3,3,3,3],
	borderColor:"#000",
	c:[
	   {
		   borderWidth:[0,0,1,0],
		   borderColor:"#000",
		   name:"caption",
		   hs:true
	   },
	   {
		   name:"inner",
		   hs:true,
		   vs:true
	   }
	],
	defaults:{
		captionWidth:false
	}
};