var DataRow = function(initial){
	/*for (var k in initial){
		this[k] = initial[k];
	}*/
	this.data = false;
	this.previous = -1;
	this.previousVisible = -1;
	this.current = 0;
	this.next = undefined;
	this.nextVisible = undefined;
	this.visible = true;
	this.node = false;
	this.opened = true;
	this.level = 0;
	this.parent = false;
	this.lastVisible = -1;
	this.dataGrid = false;
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