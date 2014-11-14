var Slider = function() {
	InputElement.call(this);
};
Util.extend(Slider, InputElement);
Slider.type = "Slider";
Slider.setDefault("value",0);
Slider.prototype.range = Slider.addProperty("range",0);

Slider.prototype.afterDraw = function(){
	this._elements.sliderContainer.on(["widthChanged","heightChanged"], this.updateRange, this);
	this._elements.slider.on("leftChanged", this.updateSliderPos, this);
	this.updateRange();
};
Slider.prototype.updateRange = function(){
	 if (this._v.isDrawn){
		 this._dxStep = (this._elements.sliderContainer._v.width - this._elements.slider._v.width) / this._v.range;
		 this._elements.slider.top(0);
		 this._elements.slider.draggable({
		   dragXStep:this._dxStep
		 });
		 this.updateValue();
	 }
};

Slider.prototype.updateValue = function(){
	if (this._v.isDrawn){
		this._elements.slider.left(this._dxStep * this._v.value);
	}
};

Slider.prototype.updateSliderPos = function(){
	if (this._v.isDrawn){
		this.value(this._elements.slider._v.left / this._dxStep);
	}
};

Slider.on("afterDraw",Slider.prototype.afterDraw);
Slider.on("rangeChanged", Slider.prototype.updateRange);
Slider.on("valueChanged", Slider.prototype.updateValue);
