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
}

DataModel.prototype.addElement = function(element){
    this.____modelInputElements[element._v.name] = element;
    this._v.model.trigger("addedElement", element);
};


DataModel.prototype.removeElement = function(element){
    delete this.____modelInputElements[element._v.name];
    this._v.model.trigger("removedElement", element);
};

