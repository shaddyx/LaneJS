var GridSkin = {};
GridSkin.def = {
	//horizontal:true,
	c:[
	    {
	    	name:"header",
	    	height:Constants.lineHeight
	    },
	   	{
	   		name:"content",
	   		hs:true,
	   		vs:true,
	   		borderWidth:[1,1,1,1],
	   		borderColor:"#000",
	   		overflow:BoxElement.OVERFLOW_MODE.hiddenY,
	   	},
	   	{
	   		name:"footer",
	   		hs:true,
	   		height:Constants.lineHeight
	   	}
	]
};

GridRowSkin = {};
GridRowSkin.def = {
    height:Constants.lineHeight,
    borderWidth:[0,0,1,0],
	borderColor:"#ccc",
	hs:true,
	hovered:{
		backgroundColor:"#ccc"
	}
};



GridColumnSkin = {};
GridColumnSkin.def = {
	c:[
	   {
		   borderWidth:[1,1,1,1],
	   	   borderColor:"#000"
	   },
	   {
		   name:"caption",
		   fontWeight:"bold"
	   }
	]
};

