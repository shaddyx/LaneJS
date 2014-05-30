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

JqGridColumn.prototype.toJqGridModel = function(){
	var model = {
			name:this._values.name,
			index:this._values.name,
			width:this._values.width,
			align:this._values.align,
			sorttype:this._values.sortType,
			sortable:this._values.sortable
	};
	if (this._values.formatter) {
		model.formatter = this._values.formatter;
	}
	return model; 
};

