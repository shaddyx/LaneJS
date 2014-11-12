var Types = {};
(function() {

	Types.object = {
		name : "object",
		check : function(value, strict) {
			return value;
		},
		fromString:function (str){
			throw new Error("Error, can't convert [" + this.name + "] from string");
		}
	};

	Types.int = Util.cloneType("int", Types.object, {
		check : function(value, strict) {
			if (typeof value == "number") {
				return Math.floor(value);
			}
			newValue = parseInt(value);
			if (isNaN(newValue)) {
				if (strict) {
					throw new CoreException("Value: [" + value + "] is not of type:" + this.name);
				}
				newValue = 0;
			}
			return newValue;
		}
	});

	Types.float = Util.cloneType("float", Types.object,{
		check:function(value, strict) {
			if (typeof value == "number") {
				return value;
			}
			value = parseFloat(value);
			if (isNaN(value)) {
				if (strict) {
					throw new CoreException("Value: [" + value
							+ "] is not of type:" + this.name);
				}
				value = 0;
			}
			return value;
		}
	});

	Types.string = Util.cloneType("string", Types.object, {
		check:function(value,strict) {
			return value.toString();
		}
	});

	Types.boolean = Util.cloneType("boolean", Types.object, {
		check:function(value, strict) {
			return !!value;
		}
	});

	Types.array = Util.cloneType("array", Types.object,{
		check:function(value, strict) {
			if (value instanceof Array) {
				return value;
			}
			if (typeof value == "string") {
				var result = [];
				for (var i = 0; i < value.length; i++) {
					result.push(value[i]);
				}
				return result;
			} else {
				throw new CoreException("Value: [" + value
						+ "] is not of type:" + this.name);
			}
		}
	});

	Types.intArray = Util.cloneType("intArray", Types.array,{
		check:function(value,strict) {
			value = this.parentType.check(value);
			for (var i = 0; i < value.length; i++) {
				value[i] = Types.int.check(value[i]);
			}
			return value;
		}
	});

	// this is a BaseObject-specific type
	Types.BaseObjectInstance = Util.cloneType("BaseObjectInstance", Types.object,{
		check: function(value, baseObjectType) {
			if (value instanceof baseObjectType) {
				return value;
			}
			throw new CoreException("Value: [" + value
					+ "] is not instance of type:" + baseObjectType.type);
		}
	});

	Types.TypedMap = Util.cloneType("TypedMap", Types.object, {
		check:function(value,basicMapType, map) {
			if (value instanceof TypedMap) {
				return value;
			}
			if (typeof value === "object" && map instanceof TypedMap) {
				// debugger;
				for ( var k in value) {
					var objClass = value[k];
					if (!(objClass instanceof map.elementType())) {
						var objClass = map.elementType();
						objClass = new objClass();
						if (objClass instanceof BaseObject) {
							objClass.applyValues(value[k]);
						}
					}
					map.add(k, objClass);
				}
				return map;
			}
			throw new CoreException("Value: [" + value
					+ "] is not instance of type:" + baseObjectType.type);
		}
	});

	// this is a Object-specific type
	Types.ObjectValue = Util.cloneType("ObjectValue", Types.object, {
		check:function(value, objectType) {
			for ( var k in objectType) {
				if (value == objectType[k]) {
					return value;
				}
			}
			throw new CoreException("Value: [" + value + "] is not in type:"
					+ objectType.type);
		}
	});
})();
