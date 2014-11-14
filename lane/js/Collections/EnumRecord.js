var EnumRecord = function(){
	BaseObject.call(this);
};

Util.extend(EnumRecord,BaseObject);
EnumRecord.type = "EnumRecord";
EnumRecord.prototype.values = EnumRecord.addProperty("values", []);

EnumRecord.prototype.add = function(obj){
	
};

EnumRecord.prototype.each = function(callBack){
	for (var i = 0; i < this._v.values.length; i++){
		callBack(this._v.values[i]);
	}
};

EnumRecord.build = function(obj){
	var values = obj.values;
	var	en = new EnumRecord();
	
	for (var k in values) {
		en.add(values[k]);
	}
	return en;
};