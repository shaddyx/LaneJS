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
Container.addProperty("children", false, {type:"BasicList", hidden:true});
Container.addProperty("overflow", BoxElement.OVERFLOW_MODE.none, {type:BoxElement.OVERFLOW_MODE});
Container.addProperty("horizontal", false, {type:"boolean"});
Container.addProperty("hAlign", BoxElement.ALIGN.begin, {type:BoxElement.ALIGN});
Container.addProperty("vAlign", BoxElement.ALIGN.begin, {type:BoxElement.ALIGN});
Container.addProperty("padding", [0,0,0,0], {type:"intArray", hidden:true});

Container.prototype.addChild = function(child){
	if (this._v.children.add(child)){
		child.parent(this);
		child.on("removed",this._childRemovedFunction);
	}
};

Container.prototype.removeChild = function(child){
	child.removeListener("removed",this._childRemovedFunction);
	if (!child._removed){
		child.remove();
	}
};

Container.prototype.clear = function(){
	this.children.clear();
};