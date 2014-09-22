/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@name:DialogsSkin
 */
DialogsSkin = {
	confirm:{
		type:"Window",
		width:300,
		openCentered:true,
		padding:[3,3,3,3],
		c:[{
			margin:[5,0,0,0],
			type:"Span",
			name:"text",
			height:19
		   },
		   {
			   margin:[5,0,0,0],
			   type:"Panel",
			   hs:true,
			   horizontal:true,
			   hAlign:BoxElement.ALIGN.end,
			   c:[
			      {
			    	  type:"Button",
			    	  caption:"OK",
			    	  width:75,
			    	  name:"okButton"
			    	
			      },
			      {
			    	  margin:[0,0,0,7],
			    	  type:"Button",
			    	  caption:"Cancel",
			    	  width:75,
			    	  name:"cancelButton"
			      }
			   ]
		   }
		]
	}
}