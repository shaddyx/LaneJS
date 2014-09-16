var TimeGraphRuler = function(timeGraph) {
	BaseObject.call(this);
	this.type = 'TimeGraphRuler';
};
Util.extend(TimeGraphRuler, BaseObject);
TimeGraphRuler.addProperty("top",0);
TimeGraphRuler.addProperty("timeGraph",false);

TimeGraphRuler.prototype.build = function(timeGraph) {
	this.timeGraph = timeGraph;
	this._element = document.createElement("div");
	this.timeGraph.graphCanvas.htmlElement.appendChild(this._element);
	timeGraph.on("refresh", this.refresh);
};

TimeGraphRuler.prototype.refresh = function(){
	if (!this._element) {
		throw new Error("TimeGraphRuler is not initialized!");
	}
	var topPos = this._v.top + this.timeGraph.lineHeight / 2;
	this._element.style.top =  topPos+ "px";
	this._element.style.left = "0px";	
	this._element.style.width = this.timeGraph.maxWidth + "px";
	this._element.style.height = "0px";
	this._element.style.borderColor = "#000";
	this._element.style.borderWidth = "1px 0px 0px 0px";
	this._element.style.borderStyle = "solid";
	this._element.style.display = "block";
	this._element.style.position = "absolute";
	this._element.style.zIndex = "0";
};

TimeGraphRuler.prototype.remove = function(){
	this.timeGraph.graphCanvas.htmlElement.removeChild(this._element);
	this.timeGraph.removeListener("refresh", this.refresh);
};

TimeGraphRuler.prototype.isBuilt = function(){
	return this._element;
};