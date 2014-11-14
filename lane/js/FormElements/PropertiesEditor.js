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
        var record = {name:k, value:target[k]()};
        this._data.add(record);
    }
};

PropertiesEditor.on("afterDraw",PropertiesEditor.prototype._afterDraw);
PropertiesEditor.on("targetChanged",PropertiesEditor.prototype._targetChanged);

