var BasicList = function(){
	BaseObject.call(this);
	this._data = [];
};

Util.extend(BasicList,BaseObject);
BasicList.type = "BasicList";
/**
 * @param element an element too add into the collection
 * this method triggers <b>beforeAdd</b> and <b>added</b> events
 */
BasicList.prototype.add = function(element){
	if (this.trigger("beforeAdd",element) !== false){
		this._data.push(element);
		this.trigger("added",element);
	} else {
		return false;
	}
	return element;
};

BasicList.prototype.get = function(index){
	return this._data[index];
};

/**
 * @param index an index of the element to remove
 * this method triggers <b>beforeRemoved</b> and <b>removed</b> events
 */
BasicList.prototype.remove = function(index){
	if (!this._data[index]){
		throw new Error("There are no element " + index + " in list");
	} 
	var element = this._data[index];
	if (this.trigger("beforeRemove",element,index) !== false){
		this._data.splice(index,1);
		this.trigger("removed",element);
	}
	return element;
};
/**
 * returns element count
 */
BasicList.prototype.count = function(){
	return this._data.length;
};
/**
 * cleans a list
 */
BasicList.prototype.clear = function(){
	while(this._data.length){
		this.remove(0);
	}
};

BasicList.prototype.each = function(callBack){
	for (var i = 0; i < this._data.length; i++){
		callBack(this._data[i]);
	}
};