var SpeedUtil = new function (){
	this.gTimeStart = 0;
	this.gTimeEnd = 0;
	this.time = {};
	this.lsTime = {};
	this.calls = {};
	this.clear = function(){
		this.calls = {};
		this.time = {};
		this.gTimeStart = 0;
	};
	this.clean = this.clear;
	this.show = function (sort){
		if (!sort) {
			sort = "time";
		}
		console.log('global time: ', this.gTimeEnd - this.gTimeStart );
		var toSort = [];
		for (var x in this.time){
			toSort.push({
				name:x
				,time:this.time[x]
				,calls:this.calls[x]
			});
		}
		if (sort){
			sortFunc = false;
			switch (sort) {
				case "calls":
					sortFunc = function(a,b){
						return a.calls - b.calls;
					}
					break;
				default:
					sortFunc = function(a,b){
						return a.time - b.time;
					}
				
			}
			toSort.sort(sortFunc);
		}
		for (var x in toSort){
			console.log(toSort[x].name, 'time: ' + toSort[x].time, 'calls: ' + toSort[x].calls);
		}
		
	};
	this.start = function (name){
		if (this.gTimeStart == 0){
			this.gTimeStart = (new Date).getTime();
		}
		if (!this.calls[name]){
			this.calls[name] = 0;
		}
		++this.calls[name];
		this.lsTime[name] = (new Date).getTime();
	};
	this.end = function (name){
		if (!this.time[name]){
			this.time[name] = 0;
		}
		this.time[name] += (new Date).getTime() - this.lsTime[name];
		this.gTimeEnd = (new Date).getTime();
	};
};