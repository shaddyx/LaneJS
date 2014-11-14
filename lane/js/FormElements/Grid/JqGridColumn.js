var JqGridColumn = function() {
	BaseObject.call(this);
};
Util.extend(JqGridColumn, BaseObject);
JqGridColumn.type = "JqGridColumn";
JqGridColumn.func = {};


JqGridColumn.prototype.name = JqGridColumn.addProperty("name", "");
JqGridColumn.prototype.caption = JqGridColumn.addProperty("caption", "");
JqGridColumn.prototype.width = JqGridColumn.addProperty("width", 0);
JqGridColumn.prototype.index = JqGridColumn.addProperty("index", "");
JqGridColumn.prototype.align = JqGridColumn.addProperty("align", "right");
JqGridColumn.prototype.sortType = JqGridColumn.addProperty("sortType", "");
JqGridColumn.prototype.sortable = JqGridColumn.addProperty("sortable", false);
JqGridColumn.prototype.formatter = JqGridColumn.addProperty("formatter", false);

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

