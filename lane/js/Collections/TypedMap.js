var TypedMap = function(type){
	BasicMap.call(this);
	this.elementType(type);
};
Util.extend(TypedMap,BasicMap);
TypedMap.type = "TypedMap";
/*
 * returns element count
 */
TypedMap.prototype.elementType = TypedMap.addProperty("elementType",false);

TypedMap.prototype.add = function(name, obj){
	this._baseClass.superClass.prototype.add.apply(this,arguments);
};