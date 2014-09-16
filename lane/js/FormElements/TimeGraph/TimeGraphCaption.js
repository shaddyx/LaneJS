var TimeGraphCaption = function(timeGraph) {
	BaseObject.call(this);
	this.type = 'TimeGraphCaption';
};
Util.extend(TimeGraphCaption, BaseObject);
TimeGraphCaption.addProperty("top",0);
TimeGraphCaption.addProperty("timeGraph",false);
TimeGraphCaption.addProperty("caption","");

TimeGraphCaption.prototype.build = function(timeGraph) {
	this.timeGraph = timeGraph;
	this._element = document.createElement("div");
	this.timeGraph._elements.captionBox.htmlElement.appendChild(this._element);
	timeGraph.on("refresh", this.refresh);
};

TimeGraphCaption.prototype.refresh = function(){
	if (!this._element) {
		throw new Error("TimeGraphCaption is not initialized!");
	}
	var topPos = this._v.top + this.timeGraph.lineHeight / 2 - 7;
	this._element.style.top =  topPos + "px";
	this._element.style.position = "absolute";
	this._element.style.zIndex = "0";
	this._element.innerHTML = this._v.caption;
};

TimeGraphCaption.prototype.remove = function(){
	this.timeGraph._elements.captionBox.htmlElement.removeChild(this._element);
	this.timeGraph.removeListener("refresh", this.refresh);
};

TimeGraphCaption.prototype.isBuilt = function(){
	return this._element;
};