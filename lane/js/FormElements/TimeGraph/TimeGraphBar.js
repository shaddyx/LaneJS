var TimeGraphBar = function(timeGraph) {
	BaseObject.call(this);
	this.type = 'TimeGraphBar';
};
Util.extend(TimeGraphBar, BaseObject);

TimeGraphBar.prototype.backgroundColor = TimeGraphBar.addProperty("backgroundColor","#ff0000");
TimeGraphBar.prototype.borderColor = TimeGraphBar.addProperty("borderColor","#ff0000");
TimeGraphBar.prototype.time = TimeGraphBar.addProperty("time","");
TimeGraphBar.prototype.length = TimeGraphBar.addProperty("length",0);
TimeGraphBar.prototype.line = TimeGraphBar.addProperty("line","default");
TimeGraphBar.prototype.height = TimeGraphBar.addProperty("height",20);
TimeGraphBar.prototype.top = TimeGraphBar.addProperty("top",0);
TimeGraphBar.prototype.timeGraph = TimeGraphBar.addProperty("timeGraph",false);

TimeGraphBar.prototype.build = function(timeGraph) {
	this.timeGraph = timeGraph;
	this._element = this.timeGraph.graphCanvas.buildTo(TimeGraphBarSkin.def);
};

TimeGraphBar.prototype.refresh = function(){
	if (!this._element) {
		throw new Exception("TimeGraphBar is not initialized!");
	}
	var xRatio = this.timeGraph._v.xRatio;
	var leftValue = this._v.time;
	var lengthValue = this._v.length;
	var heightValue = this._v.height;
	this._element.left(leftValue * xRatio);
	this._element.top(this._v.top);
	this._element.height(heightValue);
	this._element.width(lengthValue * xRatio);
	this._element.backgroundColor(this._v.backgroundColor);
	
	/*this._element.style.left = (leftValue * xRatio) + "px";
	this._element.style.top =  this._v.top + "px";
	this._element.style.width = (lengthValue * xRatio) + "px";
	console.log(lengthValue, this._element.style.width);
	this._element.style.height = heightValue + "px";
	this._element.style.backgroundColor = this._v.backgroundColor;
	this._element.style.borderColor = this._v.borderColor;
	this._element.style.borderWidth = "1px";
	this._element.style.borderStyle = "solid";
	this._element.style.display = "block";
	this._element.style.position = "absolute";
	this._element.style.zIndex = "1";*/
};

TimeGraphBar.prototype.remove = function(){
	this._element.remove();
};

TimeGraphBar.prototype.isBuilt = function(){
	return this._element;
};