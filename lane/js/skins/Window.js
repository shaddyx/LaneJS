/*
 * Box element properties
 * @@@dependsOn: BoxElement
 * @@@dependsOn: FormElement
 * @@@nameSuffix:Skin
 */
var WindowSkin = {
	def:{
		borderColor:"#ccc",
		borderWidth:[1,1,1,1],
		backgroundColor:"#ffffff",
		
		//backgroundColor:"#eeeeee",
		c:[
		   {
			   backgroundColor:"#79bbff",
			   borderColor:"#ccc",
			   margin:[3,3,3,3],
			   height:30,
			   //borderWidth:[0,0,1,0],
			   hs:true,
			   horizontal:true,
			   name:"dragHandler",
			   cursor:"pointer",
			   vAlign:BoxElement.ALIGN.middle,
			   c:[
			      {
			    	  name:"caption",
			    	  height:20,
			    	  padding:[0,0,0,3],
			    	  hs:true
			      },
			      {
			    	  name:"buttonContainer",
			    	  elementType:"buttonContainer",
			    	  horizontal:true,
			    	  hCompress:true,
			    	  padding:[2,2,2,2],
			    	  c:[
							{
								 width:16,
				  			   	 height:16,
								 borderColor:"#ccc",
								 borderWidth:[1,1,1,1],
								 borderRadius:[3,3,3,3],
								 cursor:"pointer",
								 name:"minimizeButton"
							},
				    	    {
				  			   	 width:16,
				  			   	 height:16,
				  			     cursor:"pointer",
				  			     name:"closeButton",
				  			     backgroundImage:"img/Window/close.png",
				  			     pressed:{
									 backgroundPosition:"0 -16px"
								 }
				    	    }
			    	  ]
			      }
			   ]
		   },
		   {
			   name:"inner",
			   hs:true,
			   vs:true,
			   padding:[5,5,5,5]
		   }
		],
		defaults:{
			captionWidth:false
		}
	}
};