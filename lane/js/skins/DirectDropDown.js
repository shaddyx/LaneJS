/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@name:DirectDropDownSkin
 */
var DirectDropDownSkin = {};
DirectDropDownSkin.def = {
	backgroundColor:"#fff",
	borderColor:"#CCC",
	borderWidth:[1,1,1,1],
	horizontal:true,
	c:[
	   {
		 name:"caption"		 
	   },
	   {
		   hs:true,
		   margin:[3,3,0,3],
		   width:30,
		   height:19,
		   name:"value"
	   },
	   {
		   name:"openButton",
		   borderWidth:[1,1,1,1],
		   borderColor:"#ccc",
		   width:16,
		   height:16,
		   backgroundImage:"img/DirectDropDown/downIcon.png",
		   backgroundPosition:"0px 0px",
		   cursor:"pointer",
		   hovered:{
			   backgroundPosition:"0px -16px"
		   },
		   margin:[2,3,3,3]
	   }
	]
};
DirectDropDownSkin._dropContainer = {
	def:{
		backgroundColor:"#eee",
		floating:true,
		visible:false,
		zIndex:10000,
		width:400,
		height:400,
		left:100,
		top:100,
		borderWidth:[1,1,1,1],
		borderRadius:[3,3,3,3],
		padding:[3,3,3,3],
		borderColor:"#ccc",
		c:[
		   {
			   borderColor:"#ccc",
			   borderWidth:[1,1,1,1],
			   hs:true,
			   vs:true,
			   name:"inner"
		   }
		]
	}
}