var DataColumn = function(){
	BaseObject.call(this);
};

Util.extend(DataColumn, DataSource);
DataColumn.type = "DataColumn";
DataColumn.prototype.name = DataColumn.addProperty("name","");
DataColumn.prototype.columnType = DataColumn.addProperty("columnType","text");
DataColumn.prototype.caption = DataColumn.addProperty("caption","");
DataColumn.prototype.footerText = DataColumn.addProperty("footerText","");
DataColumn.prototype.width = DataColumn.addProperty("width", 0);
DataColumn.prototype.hs = DataColumn.addProperty("hs", true);
DataColumn.prototype.visible = DataColumn.addProperty("visible", true);
DataColumn.prototype.sortable = DataColumn.addProperty("sortable", false, {type:"boolean"});

DataColumn.build = function(columns){
	var result = [];
	for (var k in columns){
		var columnData = columns[k];
		if (columnData instanceof DataColumn){
			result.push(columnData);
		} else {
			var obj = new DataColumn();
			obj.name(k);
			for (var x in columnData){
				if (x == "type"){
					continue;
				}
				if (typeof obj[x] !== "function"){
					debugger;
					throw new Error("Error, there is no column:" + x);
				}
				obj[x](columnData[x]);
			}
			result.push(obj);
		}
	}
	return result;
}