//
//@@@ignoreDep: Error
//@@@dependsOn: Util
//
var DataOutOfRangeError = function(reason, nested){
	Error.call(this, reason);
	this.reason = reason;
	this.nested = nested;
};

Util.extend(DataOutOfRangeError, Error);


DataOutOfRangeError.prototype.toString = function(){
	return "DataOutOfRangeError:" + this.reason;
};