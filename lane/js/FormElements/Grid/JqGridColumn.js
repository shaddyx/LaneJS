var JqGridColumn = function() {
	BaseObject.call(this);
};
Util.extend(JqGridColumn, BaseObject);
JqGridColumn.type = "JqGridColumn";
JqGridColumn.func = {};


JqGridColumn.addProperty("name", "");
JqGridColumn.addProperty("caption", "");
JqGridColumn.addProperty("width", 0);
JqGridColumn.addProperty("index", "");
JqGridColumn.addProperty("align", "right");
JqGridColumn.addProperty("sortType", "");
JqGridColumn.addProperty("sortable", false);
JqGridColumn.addProperty("formatter", false);

JqGridColumn.prototype.toJqGridModel = function(){
	var model = {
			name:this._v.name,
			index:this._v.name,
			width:this._v.width,
			align:this._v.align,
			sorttype:this._v.sortType,
			sortable:this._v.sortable
	};
	if (this._v.formatter) {
		model.formatter = this._v.formatter;
	}
	return model; 
};

