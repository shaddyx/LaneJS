var addWindow = {
    type:"Window",
    width:300,
    height:600,
    zIndex:10,
    c:[
        {
            type:"TreeList",
            name:"componentTree",
            hs:true,
            vs:true,
            contextMenu:{
                type:"PopupMenu",
                c:[
                    {
                        type:"MenuItem",
                        caption:"Add component",
                        name:"add"
                    },
                    {
                        type:"MenuItem",
                        caption:"Remove component",
                        name:"remove"
                    }
                ]
            }
        }
    ]
};