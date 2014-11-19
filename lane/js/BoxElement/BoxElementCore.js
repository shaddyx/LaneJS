/*
 * Box element properties
 * @@@dependsOn: BoxElement
 */
BoxElement.prototype.getAbsolutePosition = function(){
	var left = 0;
	var top = 0;
	this.enumParents(function(parent){
		var padding;
		var scrollLeft = 0;
		var scrollTop = 0;
		var border;
		if (parent.parent){
			border = parent.parent._v.borderWidth;
			scrollLeft = parent.parent._v.scrollLeft;
			scrollTop = parent.parent._v.scrollTop;
		} else {
			padding = [0,0,0,0];
			border = [0,0,0,0];
		}
		
		left += parent._v.left + parent._v._vMargin[3] + border[3] + scrollLeft;
		top += parent._v.top + parent._v._vMargin[0] + border[0] + scrollTop;
		if (parent._v.horizontal){
			left += parent._v._alignDelta;
		} else {
			top += parent._v._alignDelta;
		}
	});
	return {left:left, top:top};
	
};


BoxElement.prototype.buildTo = function(struct, topEl) {
	var el = new BoxElement();
	el.build(struct, topEl);
	el.drawRec({target:this});
	return el;
};


BoxElement.prototype.setStyleClassRec = function(styleClass){
	this.styleClass(styleClass);
	for (var k in this.c){
		this.c[k].setStyleClassRec(styleClass);
	}
};

/**
 * builds
 * 
 * @param struct -
 *            element structure
 * @param _topEl
 *            {object} - top element (inner parameter)
 * @returns elementMap
 */
BoxElement.prototype.build = function(struct, _topEl) {
	if (!_topEl) {
		_topEl = this;
	}
	this._topEl = _topEl;
	if (struct.on) {
		for ( var k in struct.on) {
			this.on(k, struct.on[k], this);
		}
	}
	for ( var k in struct) {
		if (k === "on" || k === "params" || k === "defaults" || k === "rootBuild") {
			continue;
		}
		var prop = struct[k];
		if (k === "c") {
			for ( var x in prop) {
				var newEl;
				if (this._v._isDrawn) {
					newEl = new BoxElement(prop[x].params);
					newEl.build(prop[x], _topEl);
					newEl.drawRec({
						target : this
					});
				} else {
					newEl = this.appendChild(new BoxElement(prop[x].params));
					newEl.build(prop[x], _topEl);
				}
			}
		} else if (k === "import") {
			for (var x in prop){
				this[x](prop[x]);
			}
		} else {
			if (typeof (this[k]) === 'function') {
				this[k](prop);
			} else {
				throw new Error("BoxElement error, no such property:" + k);
			}
		}
	}
	if (this._v.name) {
		_topEl._elements[this._v.name] = this;
	}
	
	if (struct.rootBuild){
		this._rootElements = [];
		for (var k in struct.rootBuild){
			this._rootElements.push(rootElement.buildTo(struct.rootBuild[k], _topEl));
		}
	}
	return _topEl._elements;
};
/**
 * appends child to this element
 * 
 * @param el -
 *            element to append
 * @returns {BoxElement} appended element
 */
BoxElement.prototype.appendChild = function(el) {
	if (!(el instanceof BoxElement)) {
		throw new Error("BoxElementError: Cant append non-BoxElement to BoxElement!!!");
	}

	if (el.parent) {
		throw new Error("Cant append already appended element!");
	}
	if (this._v.caption){
		throw new Error("Can't add childs to element with caption!");
	}
	el.parent = this;
	this.c.push(el);
	el.neibourIndex = this.c.length - 1;
	this.addToRedrawQueue();
	if (this._isDrawn) {
		el.drawRec({
			target : this
		});
	}
	return el;
};
/**
 * Draws element recursively with childs
 * 
 * @param params
 */
BoxElement.prototype.drawRec = function(params, innerCall) {
	if (!this._v._isDrawn) {
		if (!(params.target instanceof BoxElement)) {
			throw new Error("element [" + this.toString() + "] drawRec must have parameter target (instanceof BoxElement)!!!");
		}

		if (this._v._virtualized) {
			throw new Error("Cant draw virtualized element [" + this.toString() + "]");
		}

		if (!this.parent) {
			params.target.appendChild(this);
			params.target.htmlInnerElement.appendChild(this.htmlElement);
		} else if (this.parent != params.target) {
			throw new Error("BoxElement [" + this.toString() + "] already has parent");
		}

		this._isDrawn(true);
		this.htmlElement.style.position = 'absolute';
		if (!this.params.noOverflow) {
			this.htmlElement.style.overflow = 'hidden';
		} 
		
		this.htmlElement.style.display = this._v._visible ? "block" : "none";
		this.parent.htmlInnerElement.appendChild(this.htmlElement);
	}

	for ( var k in this.c) {
		this.c[k].drawRec({
			target : this
		}, true);
	}
	this.addToRenderQueue();
	this._v.relativity && this.recalcRelativity();
};
/**
 * virtualizes htmlElement caution, virtualize draws an element
 * 
 * @param params
 */
BoxElement.prototype.virtualize = function(params) {
	if (!params.target) {
		throw new Error("Target must set");
	}
	if (this._v._isDrawn) {
		throw new Error("element [" + this.toString() + "] is already drawn, cant virtualize");
	}

	this.htmlElement = params.target;
	this.htmlInnerElement = params.target;
	this._isDrawn(true);
	this._virtualized(true);
	this.overflow(BoxElement.OVERFLOW_MODE.none);
};
/**
 * returns true if parents is visible
 */
BoxElement.prototype.isParentsVisible = function() {
	if (!this._v.visible) {
		return false;
	}
	if (this.parent) {
		return this.parent.isParentsVisible();
	}
	return true;
};
/**
 * function recalculates distance between width/innerWidth, etc...
 */
BoxElement.prototype.__recalcDxDy = function() {
	var bCache = this._v.borderWidth;
	var pCache = this._v.padding;
	this._dx(bCache[1] + bCache[3] + pCache[1] + pCache[3]);
	this._dy(bCache[0] + bCache[2] + pCache[0] + pCache[2]);
};

BoxElement.prototype.__updateHorizontal = function() {
	if (this._v.horizontal) {
		this._rProps = {
			value : "width",
			vMinValue : "vMinWidth",
			minValue : "minWidth"
		};
	} else {
		this._rProps = {
			value : "height",
			vMinValue : "vMinHeight",
			minValue : "minHeight"
		};
	}
	;
};
/**
 * removes element and his childs
 */
BoxElement.prototype.remove = function() {
	if (this._removed) {
		console.log("Trying to remove already removed node");
		return;
	}
	if (this._rootElements){
		debugger;
		for (var k in this._rootElements){
			this._rootElements[k].remove();
		}
	}
	if (!elements[this.id]){
		debugger;
	}
	delete elements[this.id];
	this.htmlElement.parentNode.removeChild(this.htmlElement);
	var index = this.neibourIndex;
	this.parent.c.splice(index,1);
	this._removed = true;
	for (var k in this.parent.c){
		this.parent.c[k].neibourIndex = k;
	}
	while (this.c[0]){
		this.c[0].remove();
	}
	/*var toRemove = [];
	for ( var k in this.c) {
		toRemove.push(this.c[k]);
	}
	for ( var k in toRemove) {
		toRemove[k].remove();
	}*/
	this.trigger("removed");
	
};

/**
 * clears box element from children
 */
BoxElement.prototype.clear = function(){
	while(this.c[0]){
		this.c[0].remove();
	}
};
/**
 * sets properties from object and backups they to backup
 * @param properties - properties to apply
 * @param backup - object to backup
 */
BoxElement.prototype.setPropertiesWithBackup = function(properties, backup) {
	for ( var k in properties) {
		if (k == 'c') {
			for ( var x in properties.c) {
				var propertyMap = properties.c[x];
				var child = this._topEl.elements[x];
				if (!child) {
					console.warn("no element[" + x + "] when setting style");
				}
				if (!backup.c[x]) {
					backup.c[x] = {};
				}
				for ( var i in propertyMap) {
					backup.c[x][i] = child['_' + i];
					child[i](propertyMap[i]);
				}
			}
		} else {
			if (k === 'func') {
				properties.func.call(this);
			} else {
				backup[k] = this[k]();
				this[k](properties[k]);
			}
		}
	}
};

/**
 * restores properties backup
 * @param backup
 */
BoxElement.prototype.restoreProperties = function(backup) {
	var child = false;
	for ( var k in backup) {
		if (k != 'c') {
			this[k](backup[k]);
		} else {
			for ( var x in backup.c) {
				var childData = backup.c[x];
				child = this._topEl.elements[x];
				for ( var i in childData) {
					child[i](childData[i]);
				}
			}
		}
	}
};
BoxElement.prototype.enumChilds = function(callBack){
	for(var k in this.c){
		var res = callBack.call(this.c[k], this.c[k]);
		if (res === undefined){
			this.c[k].enumChilds(callBack);
		} else if (res === false) {
			break;
		}
	}
};
BoxElement.prototype.enumParents = function(callBack){
	if (callBack(this) === false){
		return
	}
	this.parent && this.parent.enumParents(callBack);
};

BoxElement.prototype.isOverflowedX = function(){
	return this._v.width - this._v._dx < this._v.innerWidth;
};

BoxElement.prototype.isOverflowedY = function(){
	return this._v.height - this._v._dy < this._v.innerheight;
};

BoxElement.build = function(struct, target){
	var el = new BoxElement();
	el.build(struct);
	if (target) {
		el.drawRec({target:target});
	}
	return el;
};

BoxElement.on("mouseover",function(){
	if (this._v.hovered && !this._hovered){
		if (!this._backup){
			this._backup = {};
		}
		if (!this._backup.hover) {
			this._backup.hover = {};
		}
		this.setPropertiesWithBackup(this._v.hovered, this._backup.hover);
		this._hovered = true;
	}
});

BoxElement.on("mouseout",function(){
	if (this._hovered) {
		this._hovered = false;
		this.restoreProperties(this._backup.hover);
	}
});




BoxElement.on("mousedown",function(){
	if (this._pressed) {
		return;
	}
	if (this._v.pressed) {
		if (!this._backup){
			this._backup = {};
		}
		if (!this._backup.pressed){
			this._backup.pressed = {};
		}
		this.setPropertiesWithBackup(this._v.pressed, this._backup.pressed);
		this._pressed = true;
	}
});

BoxElement.on("mouseup",function(){
	if (this._pressed) {
		this._pressed = false;
		this.restoreProperties(this._backup.pressed);
	}
});

