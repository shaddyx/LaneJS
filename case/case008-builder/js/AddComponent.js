var AddComponent = function(){
    this._data = {
        containers:{text:"containers"},
        formElements:{text:"formElements"},
    };
    this.element = FormElement.build(addWindow, rootElement);
};

AddComponent.prototype.close = function(){
    this.element.close();
};


AddComponent.prototype.addComponent = function(componentData){
    if (!componentData){
        throw new Error("Component data must set");
    }
    this._data[componentData.component.type] = {
        text:componentData.component.type,
        img:componentData.img,
        parent:componentData.group
    }
};