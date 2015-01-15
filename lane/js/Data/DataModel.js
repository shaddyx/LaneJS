/**
 * Created by shaddy on 14.01.15.
 */
/**
 * @constructor
 * @extends BaseObject
 */
var DataModel = function(){
    BaseObject.call(this);
    this.____modelInputElements = {};
};
Util.extend(DataModel, BaseObject);
DataModel.type = "DataModel";
DataModel.func = {};
DataModel.prototype._addProperty = function(name, def, options){
    var my = this;
    this._v[name] = def;
    this[name] = function(value){
        if (value != undefined && my._v[name] !== value){
            this.trigger(name + 'BeforeChanged', value);
            my._v[name] = value;
            this.trigger(name + 'Changed', value);
        }
        return my._v[name];
    };
};

DataModel.prototype._removeProperty = function(){
    delete this._v[name];
    delete this[name];
};

DataModel.prototype.updateInputValues = function(){
    debugger;
    for (var k in this.____modelInputElements){
        var el = this.____modelInputElements[k];
        this[k](el._v.value);
    }
};

DataModel.prototype.addElement = function(element){
    this.____modelInputElements[element._v.name] = element;
    this._addProperty(element._v.name, element._v.value);
    element.on("valueChanged", this.updateInputValues, this);
    this.trigger("addedElement", element);
};

DataModel.prototype.removeElement = function(element){
    element.removeListener("valueChanged", this.updateInputValues, this);
    this._removeProperty(element._v.name);
    delete this.____modelInputElements[element._v.name];
    this.trigger("removedElement", element);
};
/**
 *
 * @param topElement {Container}
 */
DataModel.attachToInputElements = function(topElement, model){
    model = model || new DataModel();
    if (topElement instanceof Container){
        topElement.enumChilds(function(child){
            child.model(model)
        });
    } else {
        var type = topElement || "[Null or false object]";
        if (topElement instanceof BaseObject){
            type = topElement.toString();
        }
        throw new Error("Error, Container needs to attach DataModel to inputs, topElement");
    }
    return model;
};