/*
 * @@@dependsOn: BoxElement
 */
BoxElement._applyTimer = false;
BoxElement.prototype.applyProperties = function(before){
	if (!this.visible){
		return;
	}
	var propMap = before ? this._applyBefore : this._applyAfter;
	var properties = this._baseClass._properties;
	for (var prop in propMap){
		
		var propParams = properties[prop];
		if (propParams.applyer){
			propParams.applyer.call(this,this._v[prop]);
		} else {
			try{
				this.htmlElement.style[prop] = this._v[prop] + (propParams.htmlEnding || "");
			} catch (e){
				console.log("error property [" + prop + "]:" + this._v[prop] + (propParams.htmlEnding || ""));
			}
			
			//console.log("applying[" + prop + "]:" + this._v[prop],this.htmlElement);
		}
	}
	if (before){
		this._applyBefore = {};
		delete this._baseClass._applyBefore[this.id];
	} else {
		this._applyAfter = {};
		delete this._baseClass._applyAfter[this.id];
	}
	if (!this._firstApplyed){
		this._firstApplyed = true;
		this.trigger("firstApplyed");
	}
};

BoxElement.addPropertyApplyer("opacity",function(value){
	if (value !== undefined) {
		if (browser.ie && browser.version != 10) {
			value *= 100;
		    var oAlpha = this.htmlElement.filters['DXImageTransform.Microsoft.alpha'] || this.htmlElement.filters.alpha;
		    if (oAlpha) oAlpha.opacity = value;
		    else this.htmlElement.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity="+value+")";
		} else {
			this.htmlElement.style[browser.opacityProperty] = value;
		}
	}
});

BoxElement.addPropertyApplyer("top",function(value){
	if (this._v.floating){
		this.htmlInnerElement.style.top = (value + this._v.margin[0] + this.parent._v.scrollTop ) + "px";
	} else {
		this.htmlInnerElement.style.top = value + "px";
	}
});

BoxElement.addPropertyApplyer("left",function(value){
	if (this._v.floating){
		this.htmlInnerElement.style.left = (value + this._v.margin[3] + this.parent._v.scrollLeft) + "px";
	} else {
		this.htmlInnerElement.style.left = value + "px";
	}
});
//
//	TODO: remove this hack
//
BoxElement.on("scrollLeftChanged", function(){
	for (var k in this.c){
		var oldVal = this.c[k]._v.left; 
		this.c[k].left(-Infinity);
		this.c[k].left(oldVal);
	}
});

BoxElement.on("scrollTopChanged", function(){
	for (var k in this.c){
		var oldVal = this.c[k]._v.top; 
		this.c[k].top(-Infinity);
		this.c[k].top(oldVal);
	}
});

//
// ENDTODO: remove this hack
//

BoxElement.addPropertyApplyer("caption",function(value){
	this.htmlInnerElement.innerHTML = value;
});

BoxElement.addPropertyApplyer("margin",function(value){
	this.htmlInnerElement.style = "margin:" + value.join(" px") + "px";
});

BoxElement.addPropertyApplyer("borderWidth",function(value){
	this.htmlElement.style.borderWidth = value.join("px ") + "px";
});

BoxElement.addPropertyApplyer("visible",function(value){
	var my = this;
	setTimeout(function(){
		my.htmlElement.style.display = value?"block":"none";
	},100);
});

BoxElement.addPropertyApplyer("borderRadius",function(value){
	this.htmlElement.style[browser.propertiesMap.borderRadiusProperty] = value.join("px ") + "px";
});

BoxElement.addPropertyApplyer("elementType",function(value){
	this.htmlElement.setAttribute("elementType",value);
});

BoxElement.addPropertyApplyer("width",function(value){
	var elementRealWidth = value - ((browser.ie && browser.version != 10)?0:this._v._dx);
	this.htmlElement.style.width = elementRealWidth + 'px';
});
BoxElement.addPropertyApplyer("hAlign",function(value){
	switch (value) {
		case this._baseClass.ALIGN.begin:
			this.htmlElement.style.textAlign = "left";
			return;
		case this._baseClass.ALIGN.middle:
			this.htmlElement.style.textAlign = "center";
			return;
		case this._baseClass.ALIGN.end:
			this.htmlElement.style.textAlign = "right";
			return;
	}
	 
});

BoxElement.addPropertyApplyer("height",function(value){
	var elementRealHeight = value - ((browser.ie && browser.version != 10)?0:this._v._dy);
	this.htmlElement.style.height = elementRealHeight + 'px';
	
});

BoxElement.addPropertyApplyer("padding",function(value){
	this.htmlElement.style.padding = value.join("px ") + "px";
});

BoxElement.addPropertyApplyer("backgroundImage",function(value){
	if (value){
		if (value != 'none'){
			if (value.indexOf("http://") == -1 && value.indexOf("https://") == -1){
				value = value.split(' ').join('');
				this.htmlElement.style.backgroundImage = "url(" + browser._v.imageBase + value + ")";
			} else {
				this.htmlElement.style.backgroundImage = "url(" + value + ")";
			}
			
		}
		else{
			this.htmlElement.style.backgroundImage = "none";
		}
	}
});
BoxElement.addPropertyApplyer("selectable",function(value) {
	this.htmlElement.style[browser.propertiesMap.selectionProperty] = browser.propertiesMap.selectionPropertyValues[value?0:1]; 
	this.htmlInnerElement.style[browser.propertiesMap.selectionProperty] = browser.propertiesMap.selectionPropertyValues[value?0:1];
	if (value) {
		this.htmlElement.removeAttribute("unselectable");
	}
	else {
		//
		//TODO: add functionality to browser for this
		//
		this.htmlElement.setAttribute("unselectable","on");
		 
	}
});

