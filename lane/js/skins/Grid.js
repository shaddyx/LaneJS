var GridSkin = {};
GridSkin.def = {
	//horizontal:true,
	c:[
	    {
	    	name:"header",
	    	height:Constants.lineHeight,
	    	caption:"header"
	    },
	   	{
	   		name:"content",
	   		hs:true,
	   		vs:true,
	   		borderWidth:[1,1,1,1],
	   		borderColor:"#000",
	   		overflow:BoxElement.OVERFLOW_MODE.hidden
	   	},
	   	{
	   		name:"footer",
	   		hs:true,
	   		height:Constants.lineHeight,
	   		caption:"footer"
	   	}
	]
};

GridRowSkin = {};
GridRowSkin.def = {
	height:Constants.lineHeight,
	hs:true,	
    borderWidth:[0,0,1,0],
	borderColor:"#ccc",
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

GridCellSkin = {};
GridCellSkin.def = {
	name:"caption"	
};
