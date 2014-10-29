var DataRow = function(initial){
	for (var k in initial){
		this[k] = initial[k];
	}
};

DataRow.prototype.select = function(){
	this.dataGrid.moveTo(this.current);
};

DataRow.prototype.visibleUp = function(){
	return this.dataGrid._getVisibleUpForRow(this);
};

DataRow.prototype.visibleDown = function(){
	return this.dataGrid._getVisibleDownForRow(this);
};

DataRow.prototype.getRelative = function(offset){
	return this.dataGrid._getRelative(this, offset);
};