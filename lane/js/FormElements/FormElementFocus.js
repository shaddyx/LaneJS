/*
 * @@@dependsOn: FormElement
 */
FormElement.prototype.enumFocusParents = function(callBack){
	if (callBack.call(this, this) === false) {
		return false;
	}

	var parent = this._v.focusParent || this._v.parent;
	parent && parent.enumFocusParents(callBack);
};

FormElement.prototype.applyCurrentFocus = function(value){
	if (value){
		if (FormElement.currentFocus && FormElement.currentFocus !== this){
			//
			//	marking parent elements to avoid unFocus of focused
			//
			this.enumFocusParents(function(elem){
				//console.log("prefocus set to:", elem.id, elem._v.outer.htmlElement);
				elem.__preFocus = true;
			});
			//
			//	removing focus
			//
			FormElement.currentFocus.currentFocus(false);f
		}
		FormElement.currentFocus = this;
		this.enumFocusParents(function(){
			delete this.__preFocus;
			this.focus(true);
		});
	} else {
		if (FormElement.currentFocus === this){
			this.enumFocusParents(function(elem){
				if (!elem.__preFocus){
					elem.focus(false);
				} else {
					delete elem.__preFocus;
				}
			});
			FormElement.currentFocus = false;
		}
	}
};

FormElement.prototype.releaseFocus = function(){
	if (this._v.focus){
		if (this instanceof Container){
			this.enumChilds(function(el){
				if (el._v.focus){
					el.focus(false);
				}
			});	
		}
		var my = this;
		this.enumFocusParents(function(el){
			if (el !== my){
				el.currentFocus(true);
				return false;
			}
		});
	}
};

FormElement.on("visibleChanged", function(value){
	if (!value) this.releaseFocus();
});

FormElement.prototype.applyFocusStyle = function(){
	this.styleClass(this._v.focus ? "focused" : "unFocused");
};

FormElement.on("currentFocusChanged", FormElement.prototype.applyCurrentFocus);
FormElement.on("focusChanged", FormElement.prototype.applyFocusStyle);