var DataColumn = function(){
	BaseObject.call(this);
};

Util.extend(DataColumn, DataSource);
DataColumn.type = "DataColumn";
DataColumn.addProperty("name","");
DataColumn.addProperty("columnType","text");
DataColumn.addProperty("caption","");
DataColumn.addProperty("footerText","");

DataColumn.build = function(columns){
	var result = [];
	for (var k in columns){
		var columnData = columns[k];
		var obj = new DataColumn();
		for (var x in columnData){
			obj[x](columnData[x]);
		}
		result.push(obj);
	}
	return result;
}