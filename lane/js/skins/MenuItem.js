/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var MenuItemSkin = {
	def:{
		hs:true,
		backgroundColor:"#eee",
		c:[
		   {
			    hs:true,
			    horizontal:true,
				backgroundColor:"#eee",
				cursor:"pointer",
				vAlign:BoxElement.ALIGN.middle,
				hovered:{
					backgroundColor:"#39f"
				},
				c:[
				   {
					   name:"img",
					   width:16,
					   height:16
				   },
				   {
					   margin:[0,6,0,3],
					   name:"caption"
				   }
				]
		   }
		]
		
	}
};