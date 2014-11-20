/**
 * @constructor
 * @arguments BaseObject
 */
var FormElement = function(){
	BaseObject.call(this);
	this.id = FormElement.idCounter++;
	this.outer(new BoxElement());
	this.inner(this.outer());
	this._propertyTranslators = {};
	/** @type FormElement*/
	this.topElement = false;
	this.addPropertyTranslator(['opacity','hs', 'vs', {name:'width', back:true}, {name:'height', back:true}, 'sizeRatio', {name: "margin", back:true}, "visible", "minWidth", "minHeight"]);
	this.logicalChildren = [];
};
Util.extend(FormElement,BaseObject);
FormElement.type = "FormElement";
FormElement.funcs = {};
FormElement.idCounter = 0;
FormElement.prototype.opacity = FormElement.addProperty("opacity", true, {type:"int"});
FormElement.prototype.name = FormElement.addProperty("name","");
FormElement.prototype.parent = FormElement.addProperty("parent",false,{hideFromEditor:true});
FormElement.prototype.inner = FormElement.addProperty("inner",false,{hideFromEditor:true});
FormElement.prototype.img = FormElement.addProperty("img", false, {type:"image"});
FormElement.prototype.hint = FormElement.addProperty("hint", false, {type:"string"});
FormElement.prototype.outer = FormElement.addProperty("outer",false,{hideFromEditor:true});
FormElement.prototype.isDrawn = FormElement.addProperty("isDrawn",false, {type:"string", hideFromEditor:true});
FormElement.prototype.width = FormElement.addProperty("width",0, {type: "number"});
FormElement.prototype.height = FormElement.addProperty("height",20, {type: "number"});
FormElement.prototype.minWidth = FormElement.addProperty("minWidth",0, {type:"number"});
FormElement.prototype.minHeight = FormElement.addProperty("minHeight",0, {type:"number"});
FormElement.prototype.hs = FormElement.addProperty("hs",false, {type:"boolean"});
FormElement.prototype.vs = FormElement.addProperty("vs",false,{type:"boolean"});
FormElement.prototype.visible = FormElement.addProperty("visible",true,{type:"boolean"});
FormElement.prototype.skin = FormElement.addProperty("skin","def",{type:"string"});
FormElement.prototype.caption = FormElement.addProperty("caption","",{type:"string"});
FormElement.prototype.captionWidth = FormElement.addProperty("captionWidth",0);
FormElement.prototype.sizeRatio = FormElement.addProperty("sizeRatio",100,{type:"number"});
FormElement.prototype.margin = FormElement.addProperty("margin",[0,0,0,0]);
FormElement.prototype.enabled = FormElement.addProperty("enabled",true,{type:"boolean"});
FormElement.prototype.contextMenu = FormElement.addProperty("contextMenu",false);
FormElement.prototype.styleClass = FormElement.addProperty("styleClass",false, {type:"string"});
FormElement.prototype.logicalParent = FormElement.addProperty("logicalParent",false);
FormElement.prototype.focus = FormElement.addProperty("focus",false, {type: "boolean", hideFromEditor:true});
FormElement.prototype.focusParent = FormElement.addProperty("focusParent",false);
FormElement.prototype.currentFocus = FormElement.addProperty("currentFocus",false);


FormElement.currentFocus = false;


FormElement.prototype.applyImg = function(){
	if (this._v.isDrawn && this._elements.img){
		this._elements.img.backgroundImage(this._v.img);
	}
};

FormElement.prototype.enumParents = function(callBack){
	if (callBack(this) === false) {
		return false;
	}
	if (this._v.parent){
		return this._v.parent.enumParents(callBack);
	}
};

FormElement.prototype.addPropertyTranslator = function(property){
	if (property instanceof Array){
		for (var k in property){
			this.addPropertyTranslator(property[k]);
		}
		return;
	}
	if (typeof property !== "object" ){
		property = {
			name: property
		};
	}
	property.target = property.target || "outer";
	if (!property.name) {
		throw new Error("Property has no parameter name");
	}
	property.propertyTranslator = function(value){
		if (this._v.isDrawn){
			this._v[property.target][property.name](value);
		}
	};
	this.on(property.name + "Changed",property.propertyTranslator,this);
	this._propertyTranslators[property.name] = property;
};
/**
 * removes property translator
 * @param property
 */

FormElement.prototype.removePropertyTranslator = function(name){
	this.removeListener(name + "Changed",this._propertyTranslators[name].propertyTranslator,this);
	delete this._propertyTranslators[name];
};

FormElement.prototype.componentBuilder = function(opts){
	var skin = FormElement.getSkinForType(this.type, this._v.skin);
	this.buildComponent(skin);
	
};
FormElement.getSkinForType = function (type, skin){
	var skinStr = type + "Skin";
	if (!window[skinStr]){
		throw new Error("No skin for:" + type);
	}
	if (!window[skinStr][skin]){
		throw new Error("No skin [" + skin + "] for:" + type);
	}
	return window[type + "Skin"][skin];
};
/**
 * function builds an component from structure
 * @param struct
 */
FormElement.prototype.buildComponent = function(struct){
	if (struct.defaults){
		for (var k in struct.defaults){
			if (typeof this[k] === "function"){
				this[k](struct.defaults[k]);
			} else {
				throw new Error("Error, cant build component [" + this.type + "], property:" + k + " is undefined");
			}
		}
	}
	this._elements = this._v.outer.build(struct);
};

FormElement.prototype.draw = function(opts){
	if (!opts || !opts.target ){
		throw new Error("Cant draw to null target:" + this.type);
	}
	if (this.trigger("beforeDraw",opts) !== false) {
		this.componentBuilder(opts);
	}
	
	if (opts.target instanceof Container) {
		opts.target.addChild(this);
		opts.target._v.inner.appendChild(this._v.outer);
	} else if (opts.target instanceof BoxElement) {
		opts.target.appendChild(this._v.outer);
	}
	this.isDrawn(true);
	this._v.outer.elementType(this.type);
	this._v.outer.htmlElement.setAttribute("elementSkin", this._v.skin || "def");
	if (this instanceof Container){
		this.inner(this._elements.inner);
	}
	this._v.outer.on("contextMenu", function(e){
		this.trigger("contextMenu", e);
	}, this);
	this._v.outer.on("removed", function(){
		this.trigger("removed");
	}, this);
	this.trigger("afterDraw",opts);
	this.applyHint();
	this.applyFocusStyle();
	this._v.outer.on("click", this.tryToFocus,this);
};
FormElement.prototype.tryToFocus = function(){
	if (FormElement._focusLock){
		return;
	}
	FormElement._focusLock = setTimeout(function(){
		FormElement._focusLock = false;
	}, 0);
	if (!this._v.currentFocus){
		this.currentFocus(true);
	}
};
FormElement.prototype.remove = function(){
	this._removed = true;
	if (this.trigger("beforeRemove") !== false){
		this._v.outer.remove();
		this.trigger("removed");
	}
	this.releaseFocus();
};


FormElement.funcs.captionChanged = function(value){
	if (this._v.isDrawn && this._elements.caption){
		this._elements.caption.caption(value);
	}
};
FormElement.prototype._captionWidthChanged = function(){
	if (this._v.isDrawn && this._elements.caption) {
		if (this._v.captionWidth === false) {
			this._elements.caption.hs(true);
		} else {
			this._elements.caption.hs(false);
			this._elements.caption.width(this._v.captionWidth);
		}
	}
};

FormElement.funcs.afterDraw = function(){
	var my = this;
	this._v.outer.formElement = this;
	this._v.inner.formElement = this;
	this._elements.caption&&this._elements.caption.caption(this._v.caption);
	for (var propName in this._propertyTranslators){
		var propTranslator = this._propertyTranslators[propName];
		this._v[propTranslator.target][propName](this._v[propName]);
		if (propTranslator.back){
			(function(propTranslator){
				my._v[propTranslator.target].on(propTranslator.name + "Changed", function(value){
					this[propTranslator.name](value);
				},my);
			})(propTranslator);
		}
	}
	this._v.outer.htmlElement.setAttribute("elementName",this._v.name);
	this._v.outer.htmlElement.setAttribute("formElementId",this.id);
	this._captionWidthChanged();
	this.refreshEnabled();
	this.applyStyleClass();
	this.applyImg();
};

FormElement.prototype.addLogicalChild = function(child){
	this.logicalChildren.push(child);
	child.logicalParent(this);
};
/**
 * triggers events recursively to parents
 */
FormElement.prototype.triggerRec = function(name, event){
	if (this instanceof Container){
		this._v.children.each(function(el){
			el.triggerRec(name,event);
		});
	}
	this.trigger(name,event);
};
FormElement.prototype.enumChilds = function(callBack){
	for(var k in this.c){
		var res = callBack(this.c[k]);
		if (res === undefined){
			this.c[k].enumChilds(callBack);
		} else if (res === false) {
			break;
		}
	}
};

FormElement.prototype.refreshEnabled = function(){
	if (this._v.isDrawn){
		this._v.outer.setStyleClassRec(this._v.enabled?"enabled":"disabled");
		this._v.outer.opacity(this._v.enabled ? 1: 0.5);
	}
};


FormElement.prototype.applyHint = function(){
	if (this._v.isDrawn){
		if (this._v.hint){
			this._v.outer.htmlElement.setAttribute("title",this._v.hint);
		} else {
			this._v.outer.htmlElement.removeAttribute("title");
		}
	}
};
FormElement.prototype.applyStyleClass = function(){
	var my = this;
	this._v.outer.enumChilds(function(){
		if (my._v.inner === this){
			return true;
		}
		this.styleClass(my._v.styleClass);
	});
};

FormElement.on("hintChanged", FormElement.prototype.applyHint);
FormElement.on("imgChanged", FormElement.prototype.applyImg);
FormElement.on("styleClassChanged",FormElement.prototype.applyStyleClass);
FormElement.on("enabledChanged",FormElement.prototype.refreshEnabled);
FormElement.on("captionWidthChanged",FormElement.prototype._captionWidthChanged);
FormElement.on("captionChanged",FormElement.funcs.captionChanged);
FormElement.on("afterDraw",FormElement.funcs.afterDraw);

FormElement._apply = function(el, struct){
	for (var k in struct){
		if (typeof el[k] != "function"){
			throw new Error("Error, there are no property " + k + " in " + el);
		}
		el[k](struct[k]);
	}
};

FormElement.build = function(struct, target, map, topElement){
	var topLevel = false;
	if (!map) {
		topLevel = true;
		map = {};
	}
	if (!struct.type) {
		throw new Error ("Error building FormElement: type must set");
	}
	if (!window[struct.type]){
		throw new Error ("Error building FormElement[" + struct.type + "] not found");
	}
	var el = new window[struct.type]();
	if (!topElement ){
		topElement = el;
	}
	el.topElement = topElement;
	if (struct.importFrom){
		if (struct.importFrom instanceof Array){
			for (var k in struct.importFrom){
				this._apply(el, struct.importFrom[k]);
			}  
		} else {
			this._apply(el, struct.importFrom);
		}
		
	}
	if (struct.on){
		for (var k in struct.on){
			el.on(k, struct.on[k]);
		}
	}
	
	for (var k in struct){
		if (k === "type" || k === "c" || k === "importFrom" || k === "on" || k === "defaults"){
			continue;
		} 
		if (k === "name"){
			map[struct.name] = el;
		}
		if (el[k] == undefined) {
			var objString = el;
			if (el.type) {
				objString = "[" + el.type + "]";
			}
			throw new Error("Object " + objString + " has no property " + k);
		}
		el[k](struct[k]);
	}
	el.draw({ target: target });
	if (struct.c) {
		for (var k in struct.c){
			this.build(struct.c[k], el, map, topElement);
		}
	}
	el.elements = map;
	if (topLevel) {
		el.triggerRec("buildFinished", el);
	}
	return el;
};
/**
 * function fills topElement input elements from data
 */
FormElement.fillForm = function(topElement, data, options){
	options = options || {};
	var elements = topElement;
	if (elements.elements) {
		elements = elements.elements;
	}
	for (var k in data) {
		var propName = k;
		var targetPropName = k;
		if (options.map && options.map[k]) {
			targetPropName = options.map[k];
		} 
		elements[targetPropName].value(data[propName]);
	}
};

FormElement.getData = function(topElement, options, data){
	options = options || {};
	data = data || {};
	
	if (topElement instanceof Container) {
		for (var k in topElement._v.children._data){
			var el = topElement._v.children._data[k];
			FormElement.getData(el, options, data);
		}
	}
	if ((topElement instanceof InputElement) && topElement._v.name) {
		data[topElement._v.name] = topElement._v.value;
	}
	return data;
};
FormElement.func.contextMenu = function(e){
	if (FormElement.func.popupMenu){
		FormElement.func.popupMenu.hide();
	}
	var menu = this._v.contextMenu;
	if (menu) {
		if (!(menu instanceof PopupMenu)){
			menu = PopupMenu.build(menu);
			menu.component(this);
		}
		menu.visible(true);
		FormElement.func.popupMenu = menu;
		return false;
	}
};
FormElement.on("contextMenu", FormElement.func.contextMenu);

FormElement._eventListener = function(e){
	if (FormElement.currentFocus){
		return FormElement.currentFocus.enumFocusParents(function(parent){
			return parent.trigger(e.type, e);
		});
	}
};
Util.addListener(document, "keydown", FormElement._eventListener);
Util.addListener(document, "keyup", FormElement._eventListener);
Util.addListener(document, "keypress", FormElement._eventListener);

