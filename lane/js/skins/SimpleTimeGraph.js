/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var SimpleTimeGraphSkin = {};
SimpleTimeGraphSkin.def = {
	hs:true,
	vs:true,
	c:[
		{
			hs:true,
			vs:true,
			horizontal:true,
			c:[
				{
					name:"leftAxisCanvas",
					width:120,
					borderWidth:[0,1,0,0],
					borderColor:"#000",
					params:{
						tag:"canvas"
					},
					vs:true
				},
				{
					name:"canvas",
					hs:true,
					vs:true,
					params:{
						tag:"canvas"
					}
				}
			]
		}
	]
};


