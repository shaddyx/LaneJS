function init(){
    //win.elements.componentTree
    //win.elements.mainContainer
    var componentTree = new ComponentTree();
    win.elements.componentTree.on("selectedNodeChanged", function(value){
        var component = win.elements.mainContainer.getElementById(value.id);
        win.elements.componentProperties.target(component);
    });
    componentTree.refresh();
};


var ComponentTree = function(){

};

ComponentTree.prototype.refresh = function(){
    var data = this.buildDataForCt();
    console.log(data);
    win.elements.componentTree.setData(data);
};

ComponentTree.prototype.buildDataForCt = function(){
    var data = win.elements.mainContainer.export({id:true});
    var obj = {};
    this._getDataFromComponent(data, obj);
    return obj;
};

ComponentTree.prototype._getDataFromComponent = function(component, treeData){
    var obj = {
        text:component.type
    };
    if (component.name){
        obj.text += "[" + component.name + "]"
    }
    for (var k in component.c){
        var child = this._getDataFromComponent(component.c[k], treeData);
        child.parent = component.id;
    }
    treeData[component.id] = obj;
    return obj;
}