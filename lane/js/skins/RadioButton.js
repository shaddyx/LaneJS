/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var RadioButtonSkin = {};
RadioButtonSkin.def = {
	horizontal:true,
	cursor:"pointer",
	c:[
	   {
		   margin:[0,0,0,10],
		   name:"img",
		   backgroundImage:"img/RadioButton/no.png",
		   width:16,
		   height:16,
		   vAlign:BoxElement.ALIGN.middle
		   
	   },
	   {
		   name:"caption"
	   }
	  ]
};