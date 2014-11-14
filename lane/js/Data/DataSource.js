/**
 * @constructor
 * @extends BaseObject
 */
var DataSource = function(){
	BaseObject.call(this);
};
Util.extend(DataSource, BaseObject);
DataSource.type = "DataSource";
DataSource.prototype.value = DataSource.addProperty("value", undefined);
DataSource.func = {};