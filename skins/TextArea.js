var TextAreaSkin = {};
TextAreaSkin.def = {
	horizontal:true,
	cursor:"pointer",
	c:[
	   {
		   padding:[9,0,0,0],
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
					   tag:"TextArea",
					   css: 'background-color:white;padding:0;border:0;display:block !important; resize: none; outline: 0;'
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