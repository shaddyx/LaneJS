"use strict";
if (typeof console == "undefined"){
	var console = {
		error:function(){
		},
		log:function(){
		},
		info:function(){
		},
		dir:function(){
		},
		warn:function(){
		}
	};
}

var Util = {};
/**
 * extends JavaScript class from parent class
 * 
 * @param child
 *            {object} child object
 * @param parent
 *            {object} parent object
 */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() { };
        F.prototype = o;
        return new F();
    };
}


Util.extend = function(child, parent) {
	child.func = {};
	// extends prototype
	if (child.__extended) {
		for ( var k in parent.prototype) {
			child.prototype[k] = parent.prototype[k];
		}
	} else {
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;
		child.__extended = true;
		child.superClass = parent;
	}
	child.addProperty = parent.addProperty;
	child.setDefault = parent.setDefault;
	child.on = parent.on;
	/*child.addProperty = parent.addProperty;
	child.addProperty = parent.addProperty;*/
	/*for (var k in parent){
		if(k!="_events"
			&&k!="_properties"
			&&k!="prototype"
		){
			child[k] = parent[k];
		}
	}*/
	
	child._events = this.cloneEventObject(child._events,parent._events);
	child._properties = this.cloneObject(parent._properties);
	
	return child.prototype;
};
/**
 * function clones object and returns resulting object. Caution, function is
 * non-cross-link-safe!!!
 * 
 * @param o
 *            in object
 * @returns resulting object
 */
Util.cloneObject = function(o) {
	if (!o || ('object' !== typeof o)) {
		return o;
	}

	if (typeof o.clone === 'function') {
		return o.clone();
	}

	var c = ('function' === typeof o.pop) ? [] : {}, v;
	for ( var p in o) {
		if (o.hasOwnProperty(p)) {
			v = o[p];
			if (v && ('object' === typeof v)) {
				c[p] = this.cloneObject(v);
			} else {
				c[p] = v;
			}
		}
	}
	return c;
};
Util.cloneArray = function(arr){
	return arr.slice(0,arr.length);
};
/**
 * clones event object from parent to child
 * @param child
 * @param parent
 * @returns
 */
Util.cloneEventObject = function(child,parent)
{
	if (!child)
	{
		child={};
	}
	for (var k in parent)
	{
		if (!child[k])
		{
			child[k]=[];
		}
		for (var x in parent[k])
		{
			child[k].push(parent[k][x]);
		}
	}
	return child;
};
/**
 * function searches an element in array
 * @param array
 * @param element
 * @returns index of element in array, or -1 if not found
 */
Util.searchInArray = function(array, element){
	if (array.indexOf != undefined){
		return array.indexOf(element);
	}
	for (var k = 0; k < array.length; k++){
		if (array[k] == element){
			return k;
		}
	}
	return -1;
};
/**
 * swaps elements
 */
Util.swapDomElements = function (obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);

    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);

    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);
};

Util.trim = function(str){
	str = str.toString();
    var begin = 0;
    var end = str.length - 1;
    while (begin <= end && str.charCodeAt(begin) < 33) { ++begin; }
    while (end > begin && str.charCodeAt(end) < 33) { --end; }
    return str.substr(begin, end - begin + 1);
};

Util.createShutter = function(params){
	if (!params) {
		params = {};
	}
	var shutter = new BoxElement();
	var applyProps = function(){
		shutter.width(rootElement.width());
		shutter.height(rootElement.height());
	};
	shutter.build({
		floating:true,
		backgroundColor:"#000",
		opacity:params.opacity || 0.5,
		zIndex:params.zIndex || 50
	});
	rootElement.on("widthChanged", applyProps);
	rootElement.on("heightChanged", applyProps);
	shutter.drawRec({target:rootElement});
	shutter.removeShutter = function(){
		shutter.remove();
		rootElement.removeListener("widthChanged", applyProps);
		rootElement.removeListener("heightChanged", applyProps);
	};
	shutter.on("removed", shutter.removeShutter, shutter);
	applyProps();
	return shutter;
};
Util.padLeft = function(s, symbol, n){
	s = s.toString();
	while(s.length < n) {
		s = symbol + s;
	}
	return s;
};
Util.addListener = function(elem, evnt, func){
	if (elem.addEventListener) {
		return elem.addEventListener(evnt, function(e) {
	    	var res = func.call(e.srcElement || e.target, e);
	        if (res === false) {
	        	e.preventDefault();
	        }
	        return res;
	    }, false);
	} else {
		return elem.attachEvent("on" + evnt, function(e) {
			var res = func.call(e.srcElement || e.target, e);
	        if (res === false) {
	        	window.event.returnValue = false;
	        }
	        return res;
	    });
	}
};
Util.getWindow = function(elem){
	return elem.defaultView || elem.parentWindow;
};


if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        };
        return this;
    };
};
Util.o = function(params){
	if (!params.constructor){
		params.constructor = function(){
			if (params.extend){
				params.extend.apply(this,arguments);
			}
		};
	}
	var o = params.constructor;
	if (params.extend){
		this.extend(o, params.extend);
		o.prototype.__super = function(){
			params.extend.apply(this,arguments);
		};
	}
	if (params.properties){
		for (var k in params.properties){
			var property = params.properties[k];
			if (typeof property === "string"){
				o.addProperty(property);
			} else {
				o.addProperty.apply(o,property);
			}
		}
	}
	if (params.methods){
		for (var k in params.methods){
			o.prototype[k] = params.methods[k];
		}
	}
	if (params.events){
		for (var k in params.events){
			o.on(k,params.events[k]);
		}
	}
	return o;
};
Util.fillObject = function(object, data){
	for (var k in data) {
		object[k](data[k]);
	}
};

/**
 * function clones Type object
 */
Util.cloneType = function(name, parentType, checkFunction){
	
	var newType = this.cloneObject(parentType);
	newType.name = name;
	newType.parentType = parentType;
	newType.check = checkFunction;
	return newType;
};
