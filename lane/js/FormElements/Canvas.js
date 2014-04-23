var Canvas = function() {
	Panel.call(this);
	this._ieMode = browser.ie;
};
Util.extend(Canvas, Panel);
Canvas.type = "Canvas";
Canvas.func = {};
Canvas.addProperty("drawColor","#000000",{type:"color"});
Canvas.addProperty("lineWidth",1,{type:"int", changedAlways:true});
Canvas.on("afterDraw", function(){
	if (!this._elements.canvas.htmlElement.getContext){
		G_vmlCanvasManager.initElement(this._elements.canvas.htmlElement);
	}
});
Canvas.prototype.getContext = function(){
	if (!this._context){
		this._context = this._elements.canvas.htmlElement.getContext("2d");
	}
	return this._context;
	
}
Canvas.prototype.clear = function(){
	this._elements.canvas.htmlElement.width = this._elements.canvas.htmlElement.width
};

Canvas.prototype.drawLines = function(lines){
	this.beginPath();
	if (!lines.length){
		return;
	}
	for (var k in lines) {
		if (k == 0) {
			this.getContext().moveTo(lines[k][0],lines[k][1]);
		} else {
			this.getContext().lineTo(lines[k][0],lines[k][1]);
		}
	}
	this.stroke();
	//this.getContext().closePath();
	//this.getContext().stroke();
	//this.getContext().fill();
};
Canvas.prototype.drawLine = function(x, y, x1, y1) {
	this.getContext().moveTo(x,y);
	this.getContext().lineTo(x1,y1);
}

Canvas.prototype.applySizes = function(){
	if (this._elements.canvas.htmlElement.width != this._elements.canvas.width() ||
		this._elements.canvas.htmlElement.height != this._elements.canvas.height()){
		this._elements.canvas.htmlElement.width = this._elements.canvas.width();
		this._elements.canvas.htmlElement.height = this._elements.canvas.height();
	}
	
};
Canvas.prototype.beginPath = function(){
	this.getContext().beginPath();
	this.applyLineWidh();
	this.applyColor();
};
Canvas.prototype.fillText = function(text, x, y){
	this.getContext().fillText(text, x, y);
};

Canvas.prototype.stroke = function(){
	this.getContext().stroke();
};

Canvas.prototype.arc = function(x, y, r, r1, m, n){
	this.getContext().arc(x, y, r, r1, m, n);
	//this.getContext().arc(x, y, 2, 0, 2 * Math.PI, false);
};
Canvas.prototype.circle = function(x,y,r,fill){
	var context = this.getContext();
	context.moveTo(x + r, y);
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.moveTo(x+1, y);
	if (fill) {
	  context.fillStyle = fill;
	  context.fill();
	}
};
Canvas.prototype.applyColor = function(){
	this.getContext().strokeStyle = this._values.drawColor;
};

Canvas.prototype.applyLineWidh = function(){
	this.getContext().lineWidth = this._values.lineWidth;
};

Canvas.on("drawColorChanged", Canvas.prototype.applyColor);
Canvas.on("lineWidthChanged", Canvas.prototype.applyLineWidh);
