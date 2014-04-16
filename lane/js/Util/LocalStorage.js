if (!window.localStorage){
	window.localStorage = new function () {
	    var el = document.createElement('div');
	    var st = 'localStorage';
	
	    el.style.display = 'none';
	    el.addBehavior('#default#userData');
	    document.body.appendChild(el);
	    
	    this._s = el;
	
	    var attrs = function () {
	        el.load(st);
	        var xml = el.XMLDocument;
	        xml.setProperty("SelectionLanguage", "XPath");
	
	        return xml.selectNodes("//ROOTSTUB/attribute::*");
	    }
	
	    this.length = 0;
	
	    var _len = function () {
	        this.length = attrs().length;
	    }
	
	    _len.call(this);
	    
	    this.setItem = function (name, value) {
	        var e;
	
	        try {
	            value = value === null ? 'null' : value.toString();    
	
	            this._s.setAttribute(name, value)
	            this._s.save(st);
	        } catch (e) {
	            if (e.number == -2147024857) {
	                throw {
	                    'description': 'QUOTA_EXCEEDED_ERR',
	                    'number' : 22,
	                    'message' : 'Quota exceed error'
	                }
	
	                throw e;
	            }
	        }
	
	        _len.call(this);
	    }
	    
	    this.getItem = function (name) {
	        this._s.load(st);
	        return this._s.getAttribute(name);
	    }
	
	    this.removeItem = function (name) {
	        this._s.removeAttribute(name);
	        this._s.save(st);
	        _len.call(this);
	    }
	
	    this.key = function (num) {
	        var e;
	        try {
	            return attrs()[num].name;
	        } catch (e) {
	            return null;
	        }
	    }
	
	    this.clear = function() {
	        var nodes = attrs()
	        for (var i = nodes.length-1; i>=0; i--) {
	            this._s.removeAttribute(nodes[i].name);
	        }
	
	        this._s.save(st);
	        this.length = 0;
	    }
	}
}
var LocalStorage = function(){
	
};

LocalStorage.prototype.setObject = function(name,value){
	this.set(name, JSON.stringify(value));
};
LocalStorage.prototype.getObject = function(name){
	var value = this.get(name);
	if (!value){
		return value;
	}
	return JSON.parse(value);
};
LocalStorage.prototype.set = function(name,value){
	localStorage.setItem(name,value);
	return value;
};

LocalStorage.prototype.get = function(name){
	return localStorage.getItem(name);
};
LocalStorage.prototype.remove = function(name){
	return localStorage.removeItem(name);
};

var lStorage = new LocalStorage();