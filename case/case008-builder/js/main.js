function init(){
    var componentTree = new ComponentTree();
    mainWin.elements.componentTree.on("selectedNodeChanged", function(value){
        var component = mainWin.elements.mainContainer.getElementById(value.id);
        mainWin.elements.componentProperties.target(component);
    });
    componentTree.refresh();

};


var ComponentTree = function(){
    mainWin.elements.addButton.on("click", this.openAddWindow, this);
};


ComponentTree.prototype.openAddWindow = function(){
    FormElement.build(addWindow, rootElement);
};

ComponentTree.prototype.refresh = function(){
    var data = this.buildDataForCt();
    console.log(data);
    mainWin.elements.componentTree.setData(data);
};

ComponentTree.prototype.buildDataForCt = function(){
    var data = mainWin.elements.mainContainer.export({id:true});
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