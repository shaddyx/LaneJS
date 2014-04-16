var DataSource = function(){
	BaseObject.call(this);
	this.type = "DataSource";
};
Util.extend(DataSource, BaseObject);

DataSource.addProperty("value",undefined);


DataSource.func = {};