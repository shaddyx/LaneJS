var Debug = function(uniq) {
	this._uniq = uniq;
	this._calls = 0;
};

Debug.allow = true;

Debug.prototype.dbg = function(){
	if (Debug.allow) debugger;
};

Debug.prototype.onTrue = function(value){
	if (value && Debug.allow) debugger;
};

Debug.prototype.onCall = function(val, showCalls){
	this._calls ++;
	if (showCalls){
		console.log(this._uniq + ":", this._calls);
	}
	if (this._calls == val && Debug.allow) debugger;
};

Debug.prototype.clearCalls = function(){
	this._calls = 0;
};

Debug.getUniq = function(key){
	if (!Debug.uniqMap){
		Debug.uniqMap = {};
	}
	if (!Debug.uniqMap[key]){
		Debug.uniqMap[key] = new Debug(key);
	}
	return Debug.uniqMap[key];
}


var debug = Debug.getUniq("global");