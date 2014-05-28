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
	   		borderColor:"#000"
	   	}
	]
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

