/*
 * @@@dependsOn: ChartField
 */
/*ChartField.types.curve = function(dataSet, params, options){
	var ratio, my = this;
	
	if (options.max != 0) {
		ratio = options.yFieldHeight / options.max;
	} else {
		ratio = 1;
	}
	
	if (ratio === undefined) {
		ratio = 1;
	}
	
	var count = dataSet.data.length;
	var lines = [];
	
	for (var x = 0; x < count; x ++){
		var realX = x * my._v.xStep + options.yLineOffset;
		var realY = options.yFieldHeight - (dataSet.data[x] * ratio) + options.xLineOffset;
		lines.push([realX, realY]);
	}
	this.lineWidth(options.lineWidth);
	my.drawColor(dataSet.strokeColor);
	my.drawLines(lines);

	my.beginPath();
	my.drawColor(dataSet.pointStrokeColor);
	for (var k in lines){
		my.circle(lines[k][0], lines[k][1] , 5, dataSet.pointColor);
	}
	my.stroke();
};

ChartField.types.lines = function(dataSet, params, options){
	this.beginPath();
	this.lineWidth(1);
	this.drawColor(dataSet.strokeColor);
	var realY = options.yFieldHeight + options.xLineOffset;
	var realY1 = realY - options.yFieldHeight;
	for (var x = 0; x < dataSet.data.length; x ++){
		if (dataSet.data[x]){
			var realX = x * this._v.xStep + options.yLineOffset;
			this.drawLine(realX, realY, realX, realY1);
		}	
	}
	this.stroke();
};*/