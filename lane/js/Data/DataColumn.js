var DataColumn = function(){
	BaseObject.call(this);
};

Util.extend(DataColumn, DataSource);
DataColumn.type = "DataColumn";
DataColumn.addProperty("name","");
DataColumn.addProperty("columnType","text");
DataColumn.addProperty("caption","");
DataColumn.addProperty("footerText","");
DataColumn.addProperty("width", 0);
DataColumn.addProperty("hs", true);
DataColumn.addProperty("visible", true);
DataColumn.addProperty("sortable", false, {type:"boolean"});

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
				obj[x](columnData[x]);
			}
			result.push(obj);
		}
	}
	return result;
}