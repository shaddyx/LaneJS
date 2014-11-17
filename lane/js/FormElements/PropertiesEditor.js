var PropertiesEditor = function() {
    FormElement.call(this);
    /** @type Grid */
    this._grid = new Grid();
    this._grid.hs(true);
    this._grid.vs(true);
    this._data = DataGrid.build({
       columns:[
           {
               caption:"name",
               name:"name"
           },
           {
               caption:"value",
               name:"value"
           },
           {
               caption:"type",
               name:"type"
           }
       ]
    });
    this._grid.data(this._data);
};
Util.extend(PropertiesEditor, FormElement);
PropertiesEditor.type = "PropertiesEditor";
PropertiesEditor.prototype.target = PropertiesEditor.addProperty("target",false);

PropertiesEditor.prototype._afterDraw = function(){
    this._grid.draw({target:this._v.inner});
    this._targetChanged();
};

/**
 *
 * @private
 */
PropertiesEditor.prototype._targetChanged = function(){
    /** @type BaseObject **/
    var target = this._v.target;
    if (!target || !this._v.isDrawn){
        return;
    }


    for (var k in target._baseClass._properties){
        var type = target._baseClass._properties[k].params.type;
        if (!type){
            type = "string";
        }
        var record = {name:k, value:target[k](), type:type.toString()};
        if (!target._baseClass._properties[k].params.hideFromEditor){
            this._data.add(record);
        }

    }
};

PropertiesEditor.prototype.getEditor = function(type){
    var type = type.name || type;
    switch (type){
        case "string":
            return new InputBox();
        case "int":
            return new InputBox();
        case "boolean":
            var obj = new InputBox();
            obj.valueType("boolean");
            return obj;
        default:
            return new InputBox();
    }
};

PropertiesEditor.on("afterDraw",PropertiesEditor.prototype._afterDraw);
PropertiesEditor.on("targetChanged",PropertiesEditor.prototype._targetChanged);

