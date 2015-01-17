var DirectDropDown = function(){
	FormElement.call(this);
	this.childElements = [];
};
Util.extend(DirectDropDown,FormElement);
DirectDropDown.type = "DirectDropDown";
DirectDropDown.prototype.minRows = DirectDropDown.addProperty("minRows",15);
DirectDropDown.prototype.maxRows = DirectDropDown.addProperty("maxRows",30);
DirectDropDown.funcs = {};
DirectDropDown.prototype.value = DirectDropDown.addProperty("value", "");
DirectDropDown.func.updateValue = function(val) {
	this._elements.value.caption(val.text);
};

DirectDropDown.func.afterDraw = function(){
	var el = new BoxElement();
	el.build(DirectDropDownSkin._dropContainer.def);
	el.drawRec({target:rootElement});
	el.relativity({
		target:this._v.outer,
		anchor:"leftInner,bottom",
		spyVisible:false
	});
	
	this.floatingElement = el;
	this.outer().on("click", DirectDropDown.prototype.open, this);
};

DirectDropDown.prototype.open = function() {
	if (!this.enabled()) {
		return false;
	}
	if (this.floatingElement._v.visible){
		this.close();
		return false;
	}
	this.floatingElement.visible(true);
	var my = this;
	setTimeout(function(){
		rootElement.on("click", DirectDropDown.prototype.close, my);
	},100);
	return false;
};

DirectDropDown.prototype.close = function() {
	this.floatingElement.visible(false);
	rootElement.removeListener("click", DirectDropDown.prototype.close, this);
};

DirectDropDown.prototype.createElement = function(element){
	var my = this;
	if (!this.childElements[this.elementCounter]) {
		this.childElements[this.elementCounter] = document.createElement("div");
		this.childElements[this.elementCounter].className = "DirectDropDown";
		Util.addListener(this.childElements[this.elementCounter], "click", function(){
			my.value(this.data);
			my.close();
		});
	}
	var el = this.childElements[this.elementCounter];
	var inner = this._v.inner;
	el.w = this._baseClass.textUtils.getStringWidth(element.text,{
		fontFamily: inner._v.fontFamily
		,fontSize: inner._v.fontSize
		,fontWeight: inner._v.fontWeight
	});
	el.innerHTML = element.text;
	el.style.color = element.color || "#000000";
	el.data = element;
	this.floatingElement._elements.inner.htmlElement.appendChild(el);
	this.elementCounter ++;
	return el;
};

DirectDropDown.prototype.values = function(elements) {
	for (var k in this.childElements){
		this.childElements[k].style.display = "none";
	}
	this.elementCounter = 0;
	if (!this._baseClass.textUtils){
		this._baseClass.textUtils = new TextUtils();
		this._baseClass.textUtils._init();
	}
	var inner = this._v.inner;
	var maxWidth = 0;
	for (var k in elements) {
		var el = this.createElement(elements[k]);
		elements[k].id = k;
		maxWidth = Math.max(maxWidth, el.w);
	}
	var count = this.elementCounter;
	var max = [0,0]
	for (var y = this._v.maxRows - 1; y >= this._v.minRows; y --){
		var res = count % y;
		if (res === 0) {
			res = 100000;
		}
		if (res > max[0]) {
			max = [res, y];
		}
	}
	if (max[1] === 0) {
		max[0, this._v.maxRows];
	}
	/*console.log("max:",max);
	console.log("maxWidth:",maxWidth);*/
	var x = 0, canRepeat = true;
	var lineHeight = 19,
		maxX = 1,
		maxY = 0
	for (var x = 0 ; canRepeat; x ++){
		for (var y = 0; y < max[1]; y++) {
				var index = y + x * max[1];
				if (index == count) {
					canRepeat = false;
					break;
				}
				var el = this.childElements[index];
				el.style.width = maxWidth + "px"
				el.style.height = lineHeight + "px"
				el.style.top = y * lineHeight;
				el.style.left = x * (maxWidth + 2) + "px";
				el.style.display = "block";
				maxY = Math.max(maxY, y + 1);
		}
		maxX = Math.max(maxX, x + 1); 
	}
	if (max[0] == 100000 || max[0] == 0) {
		maxX --;
	}
	this.floatingElement.height(lineHeight * maxY + this.floatingElement._v._dx);
	this.floatingElement.width((maxWidth + 2) * maxX + this.floatingElement._v._dy);
};
DirectDropDown.on("afterDraw", DirectDropDown.func.afterDraw);
DirectDropDown.on("valueChanged", DirectDropDown.func.updateValue);