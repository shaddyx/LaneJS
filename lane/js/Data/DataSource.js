var DataSource = function(){
	BaseObject.call(this);
};
Util.extend(DataSource, BaseObject);
DataSource.type = "DataSource";
DataSource.addProperty("value",undefined);
DataSource.func = {};