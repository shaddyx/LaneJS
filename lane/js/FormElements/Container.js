var Container = function(){
	FormElement.call(this);
	this.children(new BasicList());
	this.addPropertyTranslator([{name:'horizontal', target:"inner"}, {name:"padding", target:"inner"}, {name:"hAlign", target:"inner"}, {name:"vAlign", target:"inner"}, {name:"overflow", target:"inner"}]);
	this._v.children.on("removed", this.removeChild, this);
	var my = this;
	this._childRemovedFunction = function(){
		my.removeChild(this);
	};
};
Util.extend(Container,FormElement);
Container.type = "Container";
Container.funcs = {};
Container.prototype.children = Container.addProperty("children", false, {type:"BasicList", hidden:true, export:false});
Container.prototype.overflow = Container.addProperty("overflow", BoxElement.OVERFLOW_MODE.none, {type:BoxElement.OVERFLOW_MODE});
Container.prototype.horizontal = Container.addProperty("horizontal", false, {type:"boolean"});
Container.prototype.hAlign = Container.addProperty("hAlign", BoxElement.ALIGN.begin, {type:BoxElement.ALIGN});
Container.prototype.vAlign = Container.addProperty("vAlign", BoxElement.ALIGN.begin, {type:BoxElement.ALIGN});
Container.prototype.padding = Container.addProperty("padding", [0,0,0,0], {type:"intArray", hidden:true});
/**
 * adds child to this container
 * @param child
 */
Container.prototype.addChild = function(child){
	if (this._v.children.add(child)){
		child.parent(this);
		child.on("removed",this._childRemovedFunction);
	}
};
/**
 * removes given child
 * @param child
 */
Container.prototype.removeChild = function(child){
	if (this._v.children.indexOf(child)!= -1){
		this._v.children.removeObject(child);
	}

	child.removeListener("removed",this._childRemovedFunction);
	if (!child._removed){
		child.remove();
	}
};
/**
 * removes all children of this container
 */
Container.prototype.clear = function(){
	var childs = [];
	this._v.children.each(function(child){
		childs.push(child);
	});
	for (var k in childs){
		childs[k].remove();
	}
};
/**
 * searches element by given id
 * @param id
 * @returns {*}
 */
Container.prototype.getElementById = function(id){
	var found = false;
	if (this.id == id){
		return this;
	}
	this.enumChilds(function(){
		if (this.id != id){
			if (this instanceof Container){
				var result = this.getElementById(id);
				if (result){
					found = result;
					return false;
				}
			}
		} else {
			found = this;
			return false;
		}
	});
	return found;
};

/**
 * enumerates container childs
 * note that if callback returns false - enumeration will break
 * if true - this will skip current nesting level
 * @param callBack
 * @returns {boolean}
 */
Container.prototype.enumChilds = function(callBack){
	var children = this._v.children._data;
	for(var k in children){
		 var res = callBack.call(children[k], children[k]);
		 if (res === undefined && children[k] instanceof Container){
			 res = children[k].enumChilds(callBack);
		 }
		 if (res === true) {
			 continue;
		 }  else if (res === false) {
		 	 return false;
		 }
	}
};
/**
 * searches element by given id
 * @param name
 * @returns {*}
 */
Container.prototype.getElementByName = function(name){
	var found = false;
	if (this._v.name == name){
		return this;
	}
	this.enumChilds(function(){
		if (this._v.name === name){
			found = this;
			return false;
		}
	});
	return found;
};
