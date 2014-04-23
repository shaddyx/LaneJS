var Types = {};
(function(){

	Types.object = {
		name:"object"
	};
	Types.object.check = function(value, strict){
		return value;
	};
	
	
	Types.int = Util.cloneType("int",Types.object, function(value, strict){
		if (typeof value == "number"){
			return Math.floor(value);
		}
		newValue = parseInt(value);
		if (isNaN(newValue)){
			if (strict){
				throw new CoreException("Value: [" + value + "] is not of type:" + this.name);
			}
			newValue = 0;
		}
		return newValue;
	});
	
	Types.float = Util.cloneType("float",Types.object, function(value, strict){
		if (typeof value == "number"){
			return value;
		}
		value = parseFloat(value);
		if (isNaN(value)){
			if (strict){
				throw new CoreException("Value: [" + value + "] is not of type:" + this.name);
			}
			value = 0;
		}
		return value;
	});
	
	Types.string = Util.cloneType("string",Types.object, function(value, strict){
		return value.toString();
	});
	
	Types.boolean = Util.cloneType("boolean",Types.object, function(value, strict){
		return value.toString();
	});
	
	//	this is a BaseObject-specific type
	Types.BaseObjectInstance = Util.cloneType("Object",Types.object, function(value, baseObjectType){
		if (value instanceof baseObjectType){
			return value;
		}
				
		throw new CoreException("Value: [" + value + "] is not instance of type:" + baseObjectType.type);
	});
	
})();





