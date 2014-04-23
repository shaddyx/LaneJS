"use strict";
/*
 * @@@dependsOn: BoxElement
 */
/**
 * basic object, implements an event model 
 */
var BaseObject = function(){
	/*
	 * initializing important variables
	 */
	//			this line is harmfull!!!!
	this._baseClass = this.__proto__?this.__proto__.constructor:this.constructor;
	this._events = {};
	this._values = {};
	for (var k in this._baseClass._properties){
		this._values[k] = this._baseClass._properties[k].def;
	}
	this.type = this._baseClass.type;
};
BaseObject.type = "BaseObject";
BaseObject._events = {};
BaseObject._properties = {};
/**
 * add's a property to an object
 */
BaseObject.addProperty = function(name,defValue,params){
	params = params || {};
	var strict = false;
	if (params.type){
		if (typeof params.type == "string"){
			var tmpType = Types[params.type];
			if (!tmpType) {
				tmpType = window[params.type];
			}
			if (!tmpType) {
				console.log("Type: [" + params.type + "] is not found");
				delete params.type;
				//throw new CoreException("Type: [" + params.type + "] is not found");
			} else {
				params.type = tmpType;
			}
			
		}
		if (params.type && !params.type.check){
			if (params.type.type) {
				strict = params.type;
				params.type = Types.BaseObjectInstance;
			}
		}
	}
	
	
	this._properties[name] = {
		def:defValue,
		params:params
	};
	
		
	if (!params.changedAlways){
		this.prototype[name] = function(val){
			if (val != undefined){
				if (params.type) {
					val = params.type.check(val, strict);
				}
				if (val !== this._values[name]){
					if (this.trigger(name + "BeforeChanged" , val) !== false){
						this._values[name] = val;
						this.trigger(name + "Changed" , val);
					};
				}
			}
			
			return this._values[name];
		};
	} else {
		this.prototype[name] = function(val){
			if (val != undefined){
				if (params.type) {
					val = params.type.check(val, strict);
				}
				if (this.trigger(name + "BeforeChanged" , val) !== false){
					this._values[name] = val;
					this.trigger(name + "Changed" , val);
				};
			}
			return this._values[name];
		};
	}
	
};
BaseObject.setParams = function(name,params){
	if (!this._properties[name]) {
		throw new Error("No property with name: " + name);
	}
	this._properties[name].params = params;	
};
BaseObject.setDefault = function(name, def){
	if (!this._properties[name]) {
		throw new Error("No property with name: " + name);
	}
	this._properties[name].def = def;	
};
/**
 * add's event listener to the object
 */
BaseObject.on = function(name,func,obj,first){
	if (typeof name === "object"){
		for (var k in name){
			this.on(name[k],func,obj,first);
		}
		return;
	}
	
	if (func == undefined) {
		throw new Error("Error, event listener must be defnied for event: " + name);
	}
	
	this._events[name] = this._events[name] || [];
	if (first){
		this._events[name].unshift([func,obj]);
	} else {
		this._events[name].push([func,obj]);
	}
	
};

/**
 * triggers an event
 * @param name an event name
 */
BaseObject.prototype.trigger = function(name){
	//if no events 
	if (!this._events[name] && !this._baseClass._events[name]){
		return;
	}
	//console.log("firing event:",name);	
	var args = [];
	for (var k = 1; k < arguments.length; k ++)
	{
		args.push(arguments[k]);
	}
	/*
	 * triggering static listeners
	 */
	if (this._baseClass._events[name]){
		for (var k in this._baseClass._events[name]){
			if (this._baseClass._events[name][k][0].apply(this._baseClass._events[name][k][1] || this, args) === false){
				return false;
			}
		}
	}
	/*
	 * triggering dynamic listeners
	 */
	if (this._events[name]){
		for (var k in this._events[name]){
			if (this._events[name][k][0].apply(this._events[name][k][1] || this, args) === false){
				return false;
			}
		}
	}
};
/**
 * @param name - event name
 * @returns true if event is exists 
 */
BaseObject.prototype.hasListener = function(name){
	return (!!this._events[name] || !!this._baseClass._events[name]);
};

/**
 * add's event listener to the object
 */
BaseObject.prototype.on = function(name,func,obj,first){
	if (typeof name === "object"){
		for (var k in name){
			this.on(name[k],func,obj,first);
		}
		return;
	}
	if (func == undefined) {
		throw new Error("Error, event listener must be defnied for event: " + name);
	}
	this._events[name] = this._events[name] || [];
	if (first){
		this._events[name].unshift([func,obj]);
	} else {
		this._events[name].push([func,obj]);
	}
};

/**
 * add's event listener to the object
 */
BaseObject.prototype.removeListener = function(name,func,obj){
	if (!this._events[name]){
		return false;
	}
	if (func == undefined){
		this._events[name]=[];
		return true;
	}
	for (var k in this._events[name]){
		var event = this._events[name][k];
		if (event[0] == func){
			this._events[name].splice(k,1);
			return true;
		}
	}
	return false;
};