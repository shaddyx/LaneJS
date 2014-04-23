var ChartLegend = function() {
	FormElement.call(this);
	this._oldCacheString = "";
};

Util.extend(ChartLegend, FormElement);
ChartLegend.type = "ChartLegend";
ChartLegend.addProperty("chartField",false);

ChartLegend.types = {};
ChartLegend.func = {};

ChartLegend.func.afterDraw = function(){
	this.refresh();
};

ChartLegend.func.chartFieldBeforeChanged = function(newValue){
	var oldValue = this._values.chartField;
	oldValue && oldValue.removeListener("dataChanged", ChartLegend.prototype.refresh, this);
	newValue && newValue.on("dataChanged", ChartLegend.prototype.refresh, this);
};

ChartLegend.prototype.refresh = function(){
	var chartField = this.chartField();
	if (!this.chartField()) {
		return;
	}
	var data = chartField._values.data;
	if (data){
		
		var chartCache = [];
		for (var k in data.datasets){
			var dataSet = data.datasets[k];
			chartCache.push(dataSet.caption);
			chartCache.push(dataSet.fillColor);
			chartCache.push(dataSet.pointColor);
			chartCache.push(dataSet.pointStrokeColor);
			chartCache.push(dataSet.strokeColor);
		}
		var cacheString = chartCache.join("|");
		if (this._oldCacheString != cacheString){
			this.rebuild();
			this._oldCacheString = cacheString
		}
	}
};

ChartLegend.prototype.rebuild = function(){
	var chartField = this.chartField();
	if (!this.chartField()) {
		return;
	}
	this._elements.inner.clear();
	var data = chartField._values.data;
	if (data){
		for (var k in data.datasets){
			var dataSet = data.datasets[k];
			var el = BoxElement.build(ChartLegendElementSkin.def, this._elements.inner);
			el._elements.caption.caption(dataSet.caption);
			var canvas = el._elements.legend.htmlElement;
			if (!canvas.getContext){
				G_vmlCanvasManager.initElement(canvas);
			}
			BoxElement.runGlobalRedraw();
			canvas.width = el._elements.legend.width();
			canvas.height = el._elements.legend.height();
			var context = canvas.getContext("2d");
			context.beginPath();
			context.fillStyle = dataSet.pointColor;
			context.strokeStyle = dataSet.strokeColor;
			context.lineWidth = 2;
			var w = el._elements.legend.width();
			switch (dataSet.type){
				//case "lines":
				case "curve":
					var circleR = 5;
					var y = el._elements.legend.height() / 2;
					context.moveTo(0, y);
					context.lineTo((w - circleR) / 2, y);
					context.moveTo(w / 2 + circleR, y);
					
					context.moveTo((w + circleR) / 2, y);
					context.lineTo(w, y);
					context.stroke();
					context.beginPath();
					context.arc(w / 2, y, circleR, 0, 2 * Math.PI);
					context.fill();
					break;
				case "lines":
					var y = el._elements.legend.height() / 2;
					context.moveTo(0, y);
					context.lineTo(w, y);
					break;
			}
			context.stroke();
			
		}
	}
};
ChartLegend.on("afterDraw", ChartLegend.func.afterDraw);
ChartLegend.on("chartFieldBeforeChanged", ChartLegend.func.chartFieldBeforeChanged);