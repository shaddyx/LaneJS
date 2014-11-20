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
    this._grid.on("cellEdit", this.showEditor, this);
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
    this._data.clear();
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

PropertiesEditor.prototype.showEditor = function(){
    var row = this._grid._v.data.getCurrentRow();
    var container = this._grid.getCellContainer();
    this._editor = this.getEditor(row.data.type);
    this._editor.hs(true);
    this._editor.value(row.data.value);
    this._editor.draw({target:container});

    this._editor.focusParent(this._grid);
    this._editor.currentFocus(true);
    this._editor.startSelection();
    this._editor.on("editComplete", this.hideEditor , this);
    this._editor.on("focusChanged", function(value){
        if (this._editor && !value){
            this.hideEditor();
        }
    } , this);
};
PropertiesEditor.prototype.hideEditor = function(){
    if (!this._editor){
        return;
    }
    var row = this._grid._v.data.getCurrentRow();
    row.data.value = this._editor.value();
    this._v.target[row.data.name](this._editor.value());
    this._editor.remove();
    this._editor = false;
    this._grid.releaseCell();
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
            obj.editable(false);
            obj.dataType("boolean");
            return obj;
        default:
            return new InputBox();
    }
};
PropertiesEditor.on("afterDraw",PropertiesEditor.prototype._afterDraw);
PropertiesEditor.on("targetChanged",PropertiesEditor.prototype._targetChanged);


