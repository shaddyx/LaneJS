var Slider = function() {
	InputElement.call(this);
};
Util.extend(Slider, InputElement);
Slider.type = "Slider";
Slider.setDefault("value",0);
Slider.addProperty("range",0);

Slider.prototype.afterDraw = function(){
	this._elements.sliderContainer.on(["widthChanged","heightChanged"], this.updateRange, this);
	this._elements.slider.on("leftChanged", this.updateSliderPos, this);
	this.updateRange();
};
Slider.prototype.updateRange = function(){
	 if (this._values.isDrawn){
		 this._dxStep = (this._elements.sliderContainer._values.width - this._elements.slider._values.width) / this._values.range;
		 this._elements.slider.top(0);
		 this._elements.slider.draggable({
		   dragXStep:this._dxStep
		 });
		 this.updateValue();
	 }
};

Slider.prototype.updateValue = function(){
	if (this._values.isDrawn){
		this._elements.slider.left(this._dxStep * this._values.value);
	}
};

Slider.prototype.updateSliderPos = function(){
	if (this._values.isDrawn){
		this.value(this._elements.slider._values.left / this._dxStep);
	}
};

Slider.on("afterDraw",Slider.prototype.afterDraw);
Slider.on("rangeChanged", Slider.prototype.updateRange);
Slider.on("valueChanged", Slider.prototype.updateValue);
