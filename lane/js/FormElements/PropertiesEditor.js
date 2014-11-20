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
    this._grid.focusParent(this);
    this._grid.data(this._data);
    this._grid.on("cellEdit", this._cellEdit, this);
};
Util.extend(PropertiesEditor, FormElement);
PropertiesEditor.type = "PropertiesEditor";
PropertiesEditor.prototype.target = PropertiesEditor.addProperty("target",false);

PropertiesEditor.prototype._afterDraw = function(){
    this._grid.draw({target:this._elements.gridContainer});
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
        var record = {name:k, value:target[k](), type:type};
        if (!target._baseClass._properties[k].params.hideFromEditor){
            this._data.add(record);
        }
    }
};
PropertiesEditor.prototype._cellEdit = function(name, row){
    var my = this;
    var container = this._grid.getCellContainer(row.current, name);
    var editor = this.getEditor(row.data.type);
    editor.hs(true);
    editor.value(row.data.value);
    editor.draw({target:container});
    editor.focusParent(this._grid);
    editor.currentFocus(true);

    /*var focusFunc = function(value){
        if (!value){
            debugger;
            editor.remove();
        } else {
            editor.currentFocus(true);
        }
    };
    this.on("focusChanged", focusFunc);*/
    /*editor.on("endSelection", function(value){
        if (!editor){
            return;
        }
        row.data.value = editor.value();
        my._v.target[row.data.name](editor.value());
        my._grid.releaseCell();
        editor.remove();
        editor = false;
        my.removeListener("focusChanged",focusFunc);
        my._grid.currentFocus(true);
    });*/
};
/**
 * returns editor
 * @param type
 * @returns {FormElement}
 */
PropertiesEditor.prototype.getEditor = function(type){
    var type = type.name || type;
    switch (type){
        case "string":
            return new InputBox();
        case "int":
        case Types.int:
            return new InputBox();
        case "boolean":
        case Types.boolean:
            var obj = new InputBox();
            obj.dataType("boolean");
            return obj;
        default:
            return new InputBox();
    }
};
PropertiesEditor.on("afterDraw",PropertiesEditor.prototype._afterDraw);
PropertiesEditor.on("targetChanged",PropertiesEditor.prototype._targetChanged);


