var TimeGraph = function() {
	FormElement.call(this);
	this.type = 'TimeGraph';
};

Util.extend(TimeGraph, FormElement);
TimeGraph.addProperty("data",[]);
TimeGraph.addProperty("xRatio",0.000001);
TimeGraph.addProperty("yRatio",1);

TimeGraph.prototype._afterDraw = function(){
	this.graphCanvas = this._elements.drawBox;
	this.graphCanvas.htmlElement.style.overflow = "auto";
	/*this.scrollDiv = document.createElement("div");
	this.scrollDiv.style.display = "block";
	this.graphCanvas.htmlElement.appendChild(this.scrollDiv);*/
	a = this.graphCanvas; 
	this.scrollbarWidth = Util.getScrollbarWidth();
};

TimeGraph.on("afterDraw", TimeGraph.prototype._afterDraw);


TimeGraph.prototype.refresh = function(){
	var data = this._v.data;
	
	var dataMap = {};
	var lineList = [];
	var captionList = [];
	var lineCount = 0;
	var maxWidth = 0;
	for (var k in data) {
		 var element = data[k];
		 maxWidth = Math.max(maxWidth, (element._v.time + element._v.length) * this._v.xRatio);
		 var line = element.line();
		 if (!dataMap[line]) {
			 dataMap[line] = [];
			 lineCount ++;
			 lineList.push(line);
		 }
		 dataMap[line].push(element);
	}
	//this.scrollDiv.style.width = maxWidth + "px";
	var lineMap = {};
	lineList.sort(function(a, b) {
		return dataMap[a].length - dataMap[b].length;
	});
	if (this.lineMap){
		for (var k in this.lineMap) {
			this.lineMap[k].remove();
		}
	}
	if (this.captionList){
		for (var k in this.captionList) {
			this.captionList[k].remove();
		}
	}
	var lineHeight = (this.height() - this.scrollbarWidth - 2) / lineCount;
	var pos = 0;
	for (var k in lineList) {
		lineMap[lineList[k]] = new TimeGraphRuler();
		lineMap[lineList[k]].build(this);
		lineMap[lineList[k]].top(Math.floor(pos));
		
		captionList[lineList[k]] = new TimeGraphCaption();
		captionList[lineList[k]].build(this);
		captionList[lineList[k]].top(Math.floor(pos));
		captionList[lineList[k]].caption(lineList[k]);
		pos += lineHeight;
	}
	
	this.dataMap = dataMap;
	this.lineList = lineList;
	this.lineCount = lineCount;
	this.lineMap = lineMap;
	this.maxWidth = maxWidth;
	this.lineHeight = lineHeight;
	this.captionList = captionList;
	
	for (var k in lineMap) {
		lineMap[k].refresh();
		captionList[k].refresh();
	}
	
	for (var k in data) {
		if (!data[k].isBuilt()){
			data[k].build(this);
		}
		data[k].height(lineHeight - 3);
		data[k].top(lineMap[data[k]._v.line]._v.top);
		data[k].refresh();
	}
	this.trigger("refreshed");
};

TimeGraph.prototype.drawGrid = function(){
	
};

TimeGraph.on(["heightChanged","widthChanged","dataChanged"], TimeGraph.prototype.refresh);

