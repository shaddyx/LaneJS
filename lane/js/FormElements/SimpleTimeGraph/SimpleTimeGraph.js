
var SimpleTimeGraph = function() {
	Canvas.call(this);
};

Util.extend(SimpleTimeGraph, Canvas);
SimpleTimeGraph.type = "SimpleTimeGraph";
SimpleTimeGraph.types = {};
SimpleTimeGraph.func = {};
SimpleTimeGraph.prototype.data = SimpleTimeGraph.addProperty("data",undefined);
SimpleTimeGraph.prototype.axis = SimpleTimeGraph.addProperty("axis",undefined);
SimpleTimeGraph.prototype.xScale = SimpleTimeGraph.addProperty("xScale",0.0001);
SimpleTimeGraph.prototype.yScale = SimpleTimeGraph.addProperty("yScale",1);
SimpleTimeGraph.prototype.yStep = SimpleTimeGraph.addProperty("yStep",20);
SimpleTimeGraph.prototype.xOffset = SimpleTimeGraph.addProperty("xOffset",10);
SimpleTimeGraph.prototype.yOffset = SimpleTimeGraph.addProperty("yOffset",20);
SimpleTimeGraph.prototype.startTime = SimpleTimeGraph.addProperty("startTime",0)
SimpleTimeGraph.prototype.xRightOffset = SimpleTimeGraph.addProperty("xRightOffset",20);
SimpleTimeGraph.prototype.yBottomOffset = SimpleTimeGraph.addProperty("yBottomOffset",1);


SimpleTimeGraph.func.afterDraw = function(){
	this._elements.canvas.on("parentVisibleChanged", this.refresh, this);
	this._elements.canvas.on("widthChanged", this.refresh, this);
	this._elements.canvas.on("heightChanged", this.refresh, this);
	this._elements.canvas.on("mousewheel", function(e){
		if (e.direction > 0){
			this.xScale(this.xScale() * 1.25);
		} else {
			this.xScale(this.xScale() / 1.25);
		}
	}, this);

	this._canvas = this._elements.canvas.htmlElement;
	this._context = this._canvas.getContext('2d');
	this._leftAxisCanvas = this._elements.leftAxisCanvas.htmlElement;
	this._leftAxisContext = this._leftAxisCanvas.getContext('2d');
	this.refresh();
};

SimpleTimeGraph.prototype.drawVertGuideLines = function(){
	this._v.drawer.drawGuideLine.start(this, this._context);
	var timeStep = this._v.calculator.calcTimeStep(this);

	console.log("timeStep:", timeStep);
	var endTime = this._v.calculator.calcTimeFromX(this, this.__activeWidth);
	var startTime = this._v.startTime - (this._v.startTime % timeStep) + timeStep;
	console.log("endTime:", endTime);
	for (var time = startTime; time < endTime; time += timeStep){
		var x = this._v.xOffset + this._v.calculator.calcXCoord(this, time);
		this._v.drawer.drawGuideLine.draw(this, this._context, x, 5, this.__activeHeight);
		this._v.drawer.drawTopAxis(this, this._context, x, 10, moment(time).format("L hh:mm:ss"));
	}
	this._v.drawer.drawGuideLine.end(this, this._context);
};
SimpleTimeGraph.prototype.drawType = function (type, data) {
	if (!data) {
		return
	}
	console.log("Drawing type:", type);
	var entities = this._v.drawer.entities[type];
	entities.start(this, this._context);
	for (var i=0; i < data.length; i++){
		entities.draw(this, this._context, data[i][0], data[i][1], data[i][2], data[i][3]);
	}
	entities.end(this, this._context);
};


SimpleTimeGraph.prototype.refresh = function(){
	if (this._elements.canvas.width() < 10 || this._elements.canvas.height() < 10 || !this._v.data || !this._v.axis) {
		return;
	}
	this.clear();
	var data = this.data();
	if (this._v.startTime < this._v.minTime){
		this.startTime(this._v.minTime);
	}
	console.log("refreshing..", this._v.startTime);
	console.log("Redraw started");
	var w = this._elements.canvas.width();
	var h = this._elements.canvas.height();
	this._canvas.width = w;
	this._canvas.height = h;
	this._leftAxisCanvas.height = this._elements.leftAxisCanvas.height();
	this._leftAxisCanvas.width = this._elements.leftAxisCanvas.width();
	this.__activeHeight = h - this.yOffset() - this.yBottomOffset();
	this.__activeWidth = w - this.xOffset() - this.xRightOffset();
	console.log("active:",  this.__activeWidth, this.__activeHeight);
	if (this._v.axis.length == 0 || data.length == 0){
		console.log("Some is null:", data)
		this._reDrawing = false;
		return;
	}

	this.axisList = [];
	//
	//  drawing axis
	//
	for (var k in this._v.axis) {
		var name = this._v.axis[k].name;
		this.axisList[name] = {
			number: k,
			y: this._v.calculator.calcYCoord(this, k) + this._v.yOffset,
			axis: this._v.axis[k]
		};
		this._v.drawer.drawLeftAxisText(this, this._leftAxisContext, 0, this.axisList[name].y, name);
	}
	//
	//  drawing data
	//
	var toDraw = {};
	for (var i = 0; i < data.length; i++) {
		var record = data[i];
		var y = this.yOffset();
		if (record.axis !== false){
			var axis = this.axisList[record.axis];
			if (!axis) {
				debugger;
				throw new Error("Error, no such axis:" + record.axis);
			}
			y = axis.y;
		}
		var x = this._v.calculator.calcXCoord(this, record.time) + this._v.xOffset;
		var xTo = this._v.calculator.calcXCoord(this, record.time + (record.length === undefined ? 60000 : record.length)) + this._v.xOffset;
		if ((x < this._v.xOffset && xTo <this._v.xOffset) || (x > w && xTo > w)) {
			continue;
		}
		toDraw[record.type] = toDraw[record.type] || [];
		toDraw[record.type].push([x, y, xTo, record.color]);
	}
	this.drawVertGuideLines();
	this.drawType("ok", toDraw.ok);
	this.drawType("error", toDraw.error);
	this.drawType("label", toDraw.label);
	this.drawType("relock", toDraw.relock);
	this.drawType("discarded", toDraw.discarded);

};

SimpleTimeGraph.prototype.dataChanged = function(){

};

SimpleTimeGraph.on("afterDraw", SimpleTimeGraph.func.afterDraw);
SimpleTimeGraph.on("dataChanged", SimpleTimeGraph.prototype.dataChanged);
SimpleTimeGraph.on(["startTimeChanged", "minTimeChanged", "maxTimeChanged", "xScaleChanged"], SimpleTimeGraph.prototype.refresh);