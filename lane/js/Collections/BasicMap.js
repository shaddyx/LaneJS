var BasicMap = function(){
	BaseObject.call(this);
	this._data = {};
	this._keys = [];
};

Util.extend(BasicMap,BaseObject);
BasicMap.type = "BasicMap";
/*
 * returns element count
 */
BasicMap.prototype.count = BasicMap.addProperty("count",0);

BasicMap.prototype.hasKey = function(name){
	return this._data[name] != undefined;
};
BasicMap.prototype.put = function(name,element){
	if (this._data[name] == undefined){
		this.add(name, element);
	} else {
		if (this.trigger("beforeUpdate", name, element) !== false){
			this._data[name] = element;
			this.trigger("updated", element, name);
		}
	}
};
/**
 * @param name an element name
 * @param element an element too add into the collection
 * this method triggers <b>beforeAdd</b> and <b>added</b> events
 */
BasicMap.prototype.add = function(name,element){
	if (this._data[name] != undefined){
		throw new Error("element with key " + name + "already exists in HashMap");
	}
	if (this.trigger("beforeAdd", name, element) !== false){
		this._keys.push(name);
		this._data[name] = element;
		this.trigger("added", element, name);
	}
	this.count(this._keys.length);
	return element;
};
/**
 * @param index an element index
 */
BasicMap.prototype.getByIndex = function(index){
	var name = this._keys[index];
	if (!name) {
		throw new Error("There are no element with index " + index + " in map");
	}
	return this._data[name];
};
BasicMap.prototype.get = function(name){
	return this._data[name];
};

BasicMap.prototype.getKeys = function(){
	return this._keys;
};

/**
 * @param index an index of the element to remove
 * this method triggers <b>beforeRemoved</b> and <b>removed</b> events
 */
BasicMap.prototype.remove = function(name){
	if (!this._data[name]){
		throw new Error("There are no element " + name + " in map");
	} 
	var element = this._data[name];
	if (this.trigger("beforeRemove", name, this._data[name]) !== false){
		delete this._data[name];
		var index = Util.searchInArray(this._keys,name);
		if (index == -1){
			throw new Error("It can't be: Element exists in collection, but key absent!!!");
		}
		this._keys.splice(index,1);
		this.trigger("removed", element, name);
	}
	this.count(this._keys.length);
	return element;
};
/**
 * cleans a map
 */
BasicMap.prototype.clear = function(){
	while(this._keys.length){
		this.remove(this._keys[0]);
	}
};

BasicMap.prototype.each = function(callBack){
	for (var k in this._keys){
		var key = this._keys[k];
		var obj = this.get(key);
		callBack.call(obj, obj, key);
	}
};