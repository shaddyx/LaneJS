/**
 * Created by shaddy on 23.10.15.
 */
var Controller = function(){
    Scope.apply(this, arguments);
    this.elements = {};
    this.children = [];
    this.parentController = false;
};

Util.extend(Controller, Scope);
Controller.type = "Controller";
Controller.addProperty("root", false);

Controller.prototype.attach = function(element){
    if (!element || !element._v.name){
        throw new Error("Error, element[" + element + "]must be not null and have a name");
    }
    this.elements[element._v.name] = element;
    element.context(this);
};

Controller.prototype._drawComplete = function(){
    this.trigger("drawComplete");
    for (var k in this.children){
        this.children[k]._drawComplete();
    }
};
Controller.on("destroy", function(){
    if (this.destroyed){
        return;
    }
    for (var k in this.children){
        this.children.trigger("destroy");
    }
});