var ElementMap = function(){
	BasicMap.call(this);
};

Util.extend(ElementMap,BasicMap);

ElementMap.defaultKeygenFunction = function(element, k){
	return k;
};

ElementMap.prototype.update = function(params){
	if (!params) {
		throw new Exception("params must set!!!");
	}
	
	if (!params.update || !params.create || !params.keyGenerator) {
		throw new Exception("callBacks must set!!!");
	}
	
	if (!params.data) {
		throw new Exception("data must set!!!");
	}
	
	if (!params.keyGenerator){
		params.keyGenerator = this._basicClass.defaultKeygenFunction;
	}
	var added = {};
	for (var k in params.data) {
		var paramK = params.keyGenerator.call(this, params.data[k], k, params);
		var element;
		if (this.hasKey(paramK)){
			element = this.get(paramK)
			if (params.update.call(this, element, params.data[k], k, params)){
				this.trigger("updated", element, params.data[k], k, params);
			}
		} else {
			element = params.create.call(this, params.data[k], k, params);
			this.add(paramK, element);
		}
		params.postProcess&&params.postProcess(this, element, params.data[k], k, params);
		added[paramK] = 1;
	}
	var toRemove = [];
	for (var k in this._keys) {
		if (!added[this._keys[k]]) {
			toRemove.push(this._keys[k]);
		}
	}
	for (var k in toRemove) {
		var key = toRemove[k];
		var element = this._data[key];
		this.remove(key);
		this.trigger("removed", element, key);
	}
}