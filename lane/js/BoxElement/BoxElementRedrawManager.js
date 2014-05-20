BoxElement.runGlobalRedraw = function(innerCall) {
	if (this.die){
		return;
	}
	if (!innerCall) {
		SpeedUtil.start("GlobalRedraw");
		this.lastRedrawed = {};
		this.calls = 0;
	} else {
		this.calls ++;
		if (this.calls > 90) {
			debugger;
		}
		if (this.calls > 100) {
			this.die = true;
			throw new Error("Max redraw nesting level reached");
		}
	}
	
	/*
	 * applying properties before
	 */
	if (!innerCall) {
		for ( var k in this._applyBefore) {
			this._applyBefore[k].applyProperties(true);
		}
	}
	/*
	 * gathering elements to redraw array
	 */
	// throw new Exception("123412341234");
	var tmp = [];
	for ( var k in this._reDrawMap) {
		if (!this._reDrawMap[k]._parentInQueue()) {
			tmp.push(this._reDrawMap[k]);
		}
	}
	this._reDrawMap = {};

	/*
	 * redrawing elements
	 */
	for ( var k = 0; k < tmp.length; k++) {
		tmp[k].reDraw();
	}

	for ( var temp in this._reDrawMap) {
		BoxElement.__redrawInitiators = {}
		this.runGlobalRedraw(true);
		break;
	}

	if (this._redrawTimer) {
		clearTimeout(this._redrawTimer);
		this._redrawTimer = false;
	}
	/*
	 * applying properties after
	 */
	if (!innerCall) {
		this.runGlobalRender();
		
		
		for (var k in this.lastRedrawed) {
			this.lastRedrawed[k].trigger("redrawed");
		}
		for ( var temp in this._reDrawMap) {
			BoxElement.__redrawInitiators = {};
			this.runGlobalRedraw(true);
			break;
		}
		for ( var k in this._applyAfter) {
			this._applyAfter[k].applyProperties(false);
		}
		SpeedUtil.end("GlobalRedraw");
		
	}
};

/**
 * adds us to reDraw queue
 */
BoxElement.prototype.addToRedrawQueue = function() {
	if (!this._baseClass._redrawTimer) {
		this._baseClass.initGlobalRedraw();
	}
	this._baseClass._reDrawMap[this.id] = this;
	this._baseClass.initGlobalRedraw();
};
/**
 * inits global redraw
 */
BoxElement.initGlobalRedraw = function() {
	if (!this._redrawTimer) {
		/*
		 * try{"err"()}catch(e){ var stack = e.stack; }
		 */
		var my = this;
		this._redrawTimer = setTimeout(function() {
			console.log("initGlobalRedraw called...");
			my._redrawTimer = false;
			if (!browser.initialized){
				BoxElement.initGlobalRedraw
			} else {
				my.runGlobalRedraw();
			}
		}, 0);
	}
};
/**
 * returns true when parent of us is on reDrawQueue
 * 
 * @returns {Boolean}
 */
BoxElement.prototype._parentInQueue = function() {
	var parent = this.parent;
	while (parent) {
		if (this._baseClass._reDrawMap[parent.id]) {
			return true;
		}
		/*
		 * 
		 */
		if (parent._values.floating) {
			return false;
		}
		parent = parent.parent;
	}
	return false;
};
BoxElement.prototype.recalcMinSizes = function() {
	if (this.c.length && this._values.visible) {
		/*
		 * pre-calculating childs
		 */
		for ( var k = 0; k < this.c.length; k++) {
			this.c[k]._values.visible && !this.c[k]._values.floating && this.c[k].recalcMinSizes();
		}
		/*
		 * values to use for orientational side
		 */
		var sizeValue = this._values.horizontal ? 'width' : 'height';
		var vmSizeValue = this._values.horizontal ? 'vMinWidth' : 'vMinHeight';
		var msizeValue = this._values.horizontal ? 'minWidth' : 'minHeight';
		var stretchValue = this._values.horizontal ? 'hs' : 'vs';
		/*
		 * calculating summ's
		 */
		var summ = 0;
		var marginSumm = 0;
		for ( var k = 0; k < this.c.length; k++) {
			var child = this.c[k];
			if(child._values.visible && !child._values.floating){
				if (child._values[stretchValue]) {
					summ += child._values[vmSizeValue];
				} else {
					summ += child._values[sizeValue];
				}
				marginSumm += child[this._values.horizontal?"_marginDx":"_marginDy"];
			}
		}
		summ += this._values.horizontal ? this._values._dx : this._values._dy;
		
		var newValue = Math.max(summ, this._values[msizeValue]);
		if (isNaN(newValue)) {
			debugger;
		}
		/*
		 * setting result
		 */
		this[vmSizeValue](newValue + marginSumm);
		/*
		 * value to use on anti-orientational side
		 */
		vmSizeValue = this._values.horizontal ? 'vMinHeight' : 'vMinWidth';
		sizeValue = this._values.horizontal ? 'height' : 'width';
		stretchValue = this._values.horizontal ? 'vs' : 'hs';
		var marginD = this._values.horizontal?"_marginDy":"_marginDx";
		var max = 0;
		var marginMax = 0;
		for ( var k = 0; k < this.c.length; k++) {
			var child = this.c[k];
			if(child._values.visible && !child._values.floating){
				if (child._values[stretchValue]) {
					max = Math.max(child._values[vmSizeValue] + child[marginD], max);
				} else {
					max = Math.max(child._values[sizeValue] + child[marginD], max);
				}
				//marginMax = Math.max(marginMax, this[this._values.horizontal?"_marginDy":"_marginDx"]);
			}
		}
		max += this._values.horizontal ? this._values._dy : this._values._dx;
		/*
		 * setting result
		 */
		this[vmSizeValue](max + marginMax);
	} else {
		this._values.hs || this.vMinWidth(this._values._dx + this._captionWidth);
		this._values.vs || this.vMinHeight(this._values._dy + this._captionHeight);
	}
};

BoxElement.prototype.reDraw = function(innerCall) {
	//console.log("called reDraw for element: " + this.id);
	/*
	 * optimization TODO: optimize this to recalc only top element ALWAYS!!!
	 */
	if (!this._values.visible) {
		return;
	}
	this._baseClass.lastRedrawed[this.id] = this;
	
	if (!innerCall) {
		this.recalcMinSizes();
	}
	//
	//	recalculating width if compress
	//
	if (this._values.hCompress && !this._values.hs){
		this.width(this._values.vMinWidth);
	}
	var stretchValue = this._values.horizontal ? 'width' : 'height';
	var secondaryStretchValue = this._values.horizontal ? 'height' : 'width';
	var secondaryStretchInnerValue = this._values.horizontal ? 'innerHeight' : 'innerWidth';
	var stretchvMin = this._values.horizontal ? 'vMinWidth' : 'vMinHeight';
	var secondaryAlign = this._values.horizontal ? 'vAlign' : 'hAlign';
	var marginD = this._values.horizontal ? '_marginDx' : '_marginDy';
	var stretchable = 0, 
		nonStretchable = 0, 
		toStretch = [], 
		nonStretch = [],
		toStretchSecondary = [];
	
	if (this.c.length) {
		for ( var k = 0; k < this.c.length; k++) {
			var child = this.c[k];
			//			
			// gathering childs information to stretch
			//			
			if (child._values.visible && !child._values.floating) {
				nonStretchable += child[marginD];
				if (this._values.horizontal && child._values.hs
						|| !this._values.horizontal && child._values.vs) {
					stretchable += child._values[stretchValue];
					toStretch.push(child);
				} else {
					nonStretch.push(child);
					nonStretchable += child._values[stretchValue];
				}
				if (this._values.horizontal && child._values.vs
					|| !this._values.horizontal && child._values.hs){
					toStretchSecondary.push(child);
				} 
			}
		}

		//		
		// first stretch
		//		

		var		inner = this._values.horizontal ? this._values.innerWidth : this._values.innerHeight, 
				lastFreeSpace = this._values[stretchValue] - this._values[stretchvMin], 	
				lastInner = inner - nonStretchable,
				skipInner = 0,
				skipCount = 0,
				foundSmaller,
				ratio;
		
		
		
		
//		
//		TODO: optimize this!!!
//		
		do {
			foundSmaller = false;
			for ( var k = 0; k < toStretch.length; k++) {
				var newSize = Math.floor((lastInner - skipInner) / (toStretch.length - skipCount));
				var child = toStretch[k];
				if (child && child._values.visible && !child._values.floating){
					ratio = child._values.sizeRatio / 100;
					var sizeToApply = newSize * ratio;
					if (sizeToApply < child._values[stretchvMin]) {
						child[stretchValue](child._values[stretchvMin]);
						skipInner += child._values[stretchValue];
						foundSmaller = true;
						toStretch[k] = undefined;
						skipCount ++;
					}
				}
			}
		} while (foundSmaller);
//		
//		setting new sizes
//		
		var lastValue = lastInner - skipInner;
		var newSize = Math.floor(lastValue / (toStretch.length - skipCount));
		
		for ( var k = 0; k < toStretch.length; k++) {
			var child = toStretch[k];
			if (child && child._values.visible && !child._values.floating) {
				ratio = child._values.sizeRatio / 100;
				var sizeToApply = Math.ceil(newSize * ratio);
				if (sizeToApply - child._values[stretchvMin] > lastFreeSpace) {
					sizeToApply = lastFreeSpace + child._values[stretchvMin];
				}
				
				if (toStretch.length - skipCount != k + 1){
					lastValue -= child[stretchValue](sizeToApply);
				} else{
					child[stretchValue](lastValue);
					lastValue = 0;
				}
				lastFreeSpace -= child._values[stretchValue] - child._values[stretchvMin];
			}
		}
		marginD = this._values.horizontal ? '_marginDy' : '_marginDx';
		for ( var k = 0; k < toStretchSecondary.length; k++) {
			toStretchSecondary[k][secondaryStretchValue](this._values[secondaryStretchInnerValue] - toStretchSecondary[k][marginD]);
		}
		
		for (var k = 0; k < this.c.length; k++) {
			this.c[k].reDraw();
		}
//		
//		process aligns
//		
		
		if (lastValue) {
			var aToProcess = this._values.horizontal ? "hAlign": "vAlign";
			switch (this._values[aToProcess]){
				case this._baseClass.ALIGN.middle:
					this._alignDelta(Math.floor(lastValue/2));
					break;
				
				case this._baseClass.ALIGN.end:
					this._alignDelta(lastValue);
				break;
			}
		} else {
			this._alignDelta = 0;
		}
		for (var k = 0; k < this.c.length; k++) {
			var secondaryDelta = this._values.horizontal ? '_vDelta' : '_hDelta';
			var sizeValue = this._values[secondaryStretchInnerValue];
			for (var k = 0; k < this.c.length; k++) {
				var child = this.c[k];
				if (this._values[secondaryAlign] === BoxElement.ALIGN.middle){
					child[secondaryDelta] ( Math.floor((sizeValue - child._values[secondaryStretchValue])/2));
				} else if (this._values[secondaryAlign] === BoxElement.ALIGN.end){
					child[secondaryDelta] (sizeValue - child._values[secondaryStretchValue]);
				}
			}
		}
	}
};
