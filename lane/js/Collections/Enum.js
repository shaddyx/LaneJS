var Enum = function(){
	BaseObject.call(this);
};

Util.extend(Enum,BaseObject);
Enum.type = "Enum";
Enum.addProperty("values", []);
Enum.prototype.each = function(callBack){
	for (var i = 0; i < this._v.values.length; i++){
		callBack(this._v.values[i]);
	}
};

Enum.prototype.fromSrting = function(){
	
};

Enum.build = function(values){
	var	en = new Enum();
	en.values(values);
	return en;
};