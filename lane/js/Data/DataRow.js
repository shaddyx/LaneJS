var DataRow = function(initial){
	for (var k in initial){
		this[k] = initial[k];
	}
};
DataRow.prototype.select = function(){
	this.dataGrid.selectedRow(this.current);
}