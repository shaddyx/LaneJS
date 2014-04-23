var Types = {};
(function(){

	Types.Object = {
		name:"Object"
	};
	Types.Object.check = function(value, strict){
		return value;
	};
	
	
	Types.Int = Util.cloneType("Int",Types.Object, function(value, strict){
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
	
	Types.Float = Util.cloneType("Float",Types.Object, function(value, strict){
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
	
	Types.String = Util.cloneType("String",Types.Object, function(value, strict){
		return value.toString();
	});
})();





