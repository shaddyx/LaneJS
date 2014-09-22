/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var TabBarSkin = {};
TabBarSkin.def = {
	borderWidth:[0,0,0,0],
	borderRadius:[3,3,3,3],
	borderColor:"#CCC4A6",
	c:[
	   {
		   borderWidth:[0,0,1,0],
		   borderColor:"#CCC4A6",
		   name:"buttonContainer",
		   horizontal:true,
		   hs:true,
		   height:19
	   },
	   {
		   name:"inner",
		   hs:true,
		   vs:true
	   }
	]
};

var TabButtonSkin = {};
TabButtonSkin.def = {
	padding:[3,3,0,3],
	borderWidth:[1,1,0,1],
	borderRadius:[3,3,0,0],
	vs:true,
	borderColor:"#CCC4A6",
	margin:[1,0,0,1],
	name:"caption",
	cursor:"pointer",
	style:{
		selected:{
			borderColor:"#000000",
			backgroundColor:"rgb(231, 244, 249)"
		},
		notSelected:{
			borderColor:"#CCC4A6",
			backgroundColor:"#ffffff"
		}
	}
}