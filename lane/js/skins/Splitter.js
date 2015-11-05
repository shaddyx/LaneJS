/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var SplitterSkin = {
	def:{
		vertical:{
			borderColor:"#ccc",
			borderWidth:[1,1,1,1],
			borderRadius:[2,2,2,2],
			cursor:"pointer",
			width:5,
			vs:true
		},
		horizontal:{
			borderColor:"#ccc",
			borderWidth:[1,1,1,1],
			borderRadius:[2,2,2,2],
			cursor:"pointer",
			hs:true,
			height:5
		}
	}
};

var SplitterHelper = {
	def:{
		vertical:{
			borderColor:"#ccc",
			borderWidth:[1,1,1,1],
			cursor:"pointer",
			width:5,
			vs:true,
			floating:true,
			zIndex:Constants.maxZindex
		},
		horizontal:{
			borderColor:"#ccc",
			borderWidth:[1,1,1,1],
			cursor:"pointer",
			hs:true,
			height:5,
			floating:true,
			zIndex:Constants.maxZindex
		}
	}
}