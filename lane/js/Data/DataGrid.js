var DataGrid = function(){
	BaseObject.call(this);
	this.dataSet = {};
	this.head = "_head_node_id";
	this.dataSet[this.head] = {
		// head row
	};
};
Util.extend(DataGrid, BaseObject);

DataGrid.prototype.add = function(data){
	if (data instanceof Array) {
		for (var k in data) {
			var id = data[k].row.id;
			if (id === undefined) {
				throw new Error ("data row must have id!");
			}
			this.dataSet[k] = data;
			if (!data.parent) {
				data.parent = this.head;
			}
		}
	}
};



