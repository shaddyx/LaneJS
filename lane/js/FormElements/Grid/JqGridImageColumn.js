var JqGridImageColumn = function(grid) {
	FormElement.call(this);
	this._grid = grid;
};
Util.extend(JqGridImageColumn, JqGridColumn);
JqGridImageColumn.type = "JqGridImageColumn";
JqGridImageColumn.func = {};

JqGridImageColumn.prototype.formatter = function(){
	return function (cellvalue, options, rowObject ) {
        return "<img src='" + cellvalue + "' />";
    };
};

