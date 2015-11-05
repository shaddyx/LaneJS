/*
 * Box element properties
 * @@@dependsOn: SimpleTimeGraph
 */
SimpleTimeGraph.addProperty("calculator",{
	calcXCoord:function ($scope, time) {
	return Math.floor($scope._v.xScale * (time - $scope._v.startTime));
	},
	calcYCoord:function ($scope, n) {
		return Math.floor(n * $scope._v.yStep * $scope._v.yScale);
	},
	calcTimeDiff:function($scope, x){
		return Math.ceil(x / $scope._v.xScale);
	},
	calcTimeFromX:function($scope, x){
		return $scope._v.startTime + this.calcTimeDiff($scope, x);
	},
	calcTimeStep:function($scope){
		var timeStep = 1000;
		var minInterval = 100;
		var x1, x2;
		do {
			x1 = this.calcXCoord($scope, $scope._v.startTime);
			x2 = this.calcXCoord($scope, $scope._v.startTime + timeStep);
			timeStep *= 2;
		} while(x2 - x1 < minInterval);
		return timeStep;
	}
});
SimpleTimeGraph.addProperty("drawer",(function(){
	var triangleSize = 5;
	return {
		entities:{
			relock: {
				start: function($scope, ctx) {
					ctx.beginPath();
					ctx.fillStyle = '#ff0';
				},
				draw: function($scope, ctx, x, y, x1) {
					ctx.moveTo(x , y - triangleSize);
					ctx.lineTo(x + triangleSize, y - triangleSize);
					ctx.lineTo(x, y + triangleSize);
					ctx.lineTo(x - triangleSize, y - triangleSize);
					ctx.lineTo(x, y - triangleSize);

				},
				end: function($scope, ctx) {
					ctx.closePath();
					ctx.fill();
				}
			},
			discarded: {
				start: function($scope, ctx) {
				},
				draw: function($scope, ctx, x, y, x1) {
					ctx.beginPath();
					ctx.fillStyle = '#f0f';
					ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
					ctx.fill();
				},
				end: function($scope, ctx) {
				}
			},
			error: {
				start: function($scope, ctx) {
					ctx.beginPath();
					ctx.fillStyle = '#f00';
				},
				draw: function($scope, ctx, x, y, x1) {
					ctx.moveTo(x - triangleSize, y - triangleSize);
					ctx.lineTo(x + triangleSize, y - triangleSize);
					ctx.lineTo(x, y + triangleSize);
					ctx.lineTo(x - triangleSize, y - triangleSize);
				},
				end: function($scope, ctx) {
					ctx.closePath();
					ctx.fill();
				}
			},
			ok: {
				start: function($scope, ctx) {
					ctx.beginPath();
					ctx.fillStyle = '#0f0';
				},
				draw: function($scope, ctx, x, y, x1) {
					/*radius = 5;
					 ctx.arc(x, y, radius, 0, 2 * Math.PI, false);*/
					ctx.moveTo(x, y - triangleSize);
					ctx.lineTo(x1, y - triangleSize);
					ctx.lineTo(x1, y + triangleSize);
					ctx.lineTo(x, y + triangleSize);
					ctx.lineTo(x, y - triangleSize);
				},
				end: function($scope, ctx) {
					ctx.closePath();
					ctx.fill();
				}
			},
			label:{
				start: function($scope, ctx){
				},
				draw: function($scope, ctx, x, color){
					ctx.beginPath();
					ctx.strokeStyle = '#f00';
					ctx.moveTo(x, $scope.data.yOffset);
					ctx.lineTo(x, $scope.activeHeight - $scope.data.yOffset);
					ctx.stroke();
				},
				end:function($scope, ctx){

				}
			}
		},
		drawLeftAxisText:function($scope, ctx, x, y, text) {
			ctx.font = "10px Arial";
			ctx.fillText(text, x, y + 5);
		},
		drawTopAxis:function($scope, ctx, x, y, text){
			ctx.font = "10px Arial";
			ctx.fillText(text, x, y);
		},
		drawGuideLine:{
			start: function($scope, ctx) {
				ctx.beginPath();
			},
			draw: function($scope, ctx, x, y, height){
				ctx.beginPath();
				ctx.strokeStyle = "#ccc";
				ctx.moveTo(x, y);
				ctx.lineTo(x, y + height);
				ctx.stroke();
			},
			end: function($scope, ctx) {
				ctx.closePath();
				ctx.fill();
			}
		}
	};
})());