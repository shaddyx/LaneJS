/*
 * @@@dependsOn: BoxElement
 */
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
		BoxElement.__redrawInitiators = {};
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
			//console.log("initGlobalRedraw called...");
			my._redrawTimer = false;
			if (!browser.initialized){
				BoxElement.initGlobalRedraw();
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
		if (parent._v.floating) {
			return false;
		}
		parent = parent.parent;
	}
	return false;
};

BoxElement.prototype.isCanOverflowInMainDirection = function(){
	return (this._v.horizontal && this._horzOverflow) || !this._v.horizontal && this._vertOverflow;
};

BoxElement.prototype.isCanOverflowIn2Direction = function(){
	return (this._v.horizontal && this._vertOverflow) || (!this._v.horizontal && this._horzOverflow);
};

BoxElement.prototype.recalcMinSizes = function() {
	if (this.c.length && this._v.visible) {
		/*
		 * pre-calculating childs
		 */
		for ( var k = 0; k < this.c.length; k++) {
			this.c[k]._v.visible && !this.c[k]._v.floating && this.c[k].recalcMinSizes();
		}
		/*
		 * values to use for orientational side
		 */
		var sizeValue = this._v.horizontal ? 'width' : 'height';
		var innerSizeValue = this._v.horizontal ? 'innerWidth' : 'innerHeight';
		var vmSizeValue = this._v.horizontal ? 'vMinWidth' : 'vMinHeight';
		var msizeValue = this._v.horizontal ? 'minWidth' : 'minHeight';
		var stretchValue = this._v.horizontal ? 'hs' : 'vs';
		var dValue = this._v.hrizontal ? '_dx' : '_dy';
		/*
		 * calculating summ's
		 */
		
		
		var summ = 0;
		var marginSumm = 0;
		for ( var k = 0; k < this.c.length; k++) {
			var child = this.c[k];
			if(child._v.visible && !child._v.floating){
				if (child._v[stretchValue]) {
					summ += child._v[vmSizeValue];
				} else {
					summ += child._v[sizeValue];
				}
				marginSumm += child[this._v.horizontal?"_marginDx":"_marginDy"];
			}
		}
		summ += this._v[dValue];
	
		var newValue = Math.max(summ, this._v[msizeValue]);
		if (isNaN(newValue)) {
			debugger;
		}
		/*
		 * setting result
		 */
		
		if (this.isCanOverflowInMainDirection()) {
			this[innerSizeValue](Math.max(this._v[sizeValue] - this._v[dValue], newValue));
		} else {
			this[vmSizeValue](newValue + marginSumm);
		}
		
		
		/*
		 * value to use on anti-orientational side
		 */
		vmSizeValue = this._v.horizontal ? 'vMinHeight' : 'vMinWidth';
		innerSizeValue = this._v.horizontal ? 'innerHeight' : 'innerWidth';
		sizeValue = this._v.horizontal ? 'height' : 'width';
		stretchValue = this._v.horizontal ? 'vs' : 'hs';
		var marginD = this._v.horizontal?"_marginDy" : "_marginDx";
		var dValue = this._v.horizontal?"_dy" : "_dx";
		var max = 0;
		var marginMax = 0;
		for ( var k = 0; k < this.c.length; k++) {
			var child = this.c[k];
			if(child._v.visible && !child._v.floating){
				if (child._v[stretchValue]) {
					max = Math.max(child._v[vmSizeValue] + child[marginD], max);
				} else {
					max = Math.max(child._v[sizeValue] + child[marginD], max);
				}
				//marginMax = Math.max(marginMax, this[this._v.horizontal?"_marginDy":"_marginDx"]);
			}
		}
		max += this._v[dValue];
		/*
		 * setting result
		 */
		if (this.isCanOverflowIn2Direction()) {
			this[innerSizeValue](Math.max(this._v[sizeValue] - this._v[dValue], max));
		} else {
			this[vmSizeValue](max + marginMax);
		}
	} else {
		this._horzOverflow || this.vMinWidth(this._v._dx + this._captionWidth);
		this._vertOverflow || this.vMinHeight(this._v._dy + this._captionHeight);
	}
};

BoxElement.prototype.reDraw = function(innerCall) {
	//console.log("called reDraw for element: " + this.id);
	/*
	 * optimization TODO: optimize this to recalc only top element ALWAYS!!!
	 */
	if (!this._v.visible) {
		return;
	}
	this._baseClass.lastRedrawed[this.id] = this;
	
	if (!innerCall) {
		this.recalcMinSizes();
	}
	//
	//	recalculating width if compress
	//
	if (this._v.hCompress && !this._v.hs){
		this.width(this._v.vMinWidth);
	}
	var stretchValue = this._v.horizontal ? 'width' : 'height';
	var secondaryStretchValue = this._v.horizontal ? 'height' : 'width';
	var secondaryStretchInnerValue = this._v.horizontal ? 'innerHeight' : 'innerWidth';
	var stretchvMin = this._v.horizontal ? 'vMinWidth' : 'vMinHeight';
	var secondaryAlign = this._v.horizontal ? 'vAlign' : 'hAlign';
	var marginD = this._v.horizontal ? '_marginDx' : '_marginDy';
	var stretchable = 0, 
		nonStretchable = 0, 
		toStretch = [], 
		nonStretch = [],
		toStretchSecondary = [];
	
	if (this.c.length) {
		for ( var k = 0; k < this.c.length; k++) {
			var child = this.c[k];
			//			
			// gathering children information to stretch
			//			
			if (child._v.visible && !child._v.floating) {
				nonStretchable += child[marginD];
				if (this._v.horizontal && child._v.hs
						|| !this._v.horizontal && child._v.vs) {
					stretchable += child._v[stretchValue];
					toStretch.push(child);
				} else {
					nonStretch.push(child);
					nonStretchable += child._v[stretchValue];
				}
				if (this._v.horizontal && child._v.vs
					|| !this._v.horizontal && child._v.hs){
					toStretchSecondary.push(child);
				} 
			}
		}

		//		
		// first stretch
		//		

		var		inner = this._v.horizontal ? this._v.innerWidth : this._v.innerHeight, 
				//
				//	TODO:investigate this!!!!
				//
				lastFreeSpace = this._v[stretchValue] - this._v[this._v.horizontal ? '_dx' : '_dy'] - this._v[stretchvMin], 	
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
				if (child && child._v.visible && !child._v.floating){
					ratio = child._v.sizeRatio / 100;
					var sizeToApply = Math.floor(newSize * ratio);
					if (sizeToApply < child._v[stretchvMin]) {
						child[stretchValue](child._v[stretchvMin]);
						skipInner += child._v[stretchValue];
						foundSmaller = true;
						toStretch[k] = undefined;
						skipCount ++;
					}
				}
			}
		} while (foundSmaller);
//		
//		setting new sizes for child nodes
//		
		var lastValue = lastInner - skipInner;
		var newSize = Math.floor(lastValue / (toStretch.length - skipCount));
		
		for ( var k = 0; k < toStretch.length; k++) {
			var child = toStretch[k];
			if (child && child._v.visible && !child._v.floating) {
				ratio = child._v.sizeRatio / 100;
				var sizeToApply = Math.ceil(newSize * ratio);
				if (sizeToApply - child._v[stretchvMin] > lastFreeSpace) {
					sizeToApply = lastFreeSpace + child._v[stretchvMin];
				}
				
				if (toStretch.length - skipCount != k + 1){
					lastValue -= child[stretchValue](sizeToApply);
				} else{
					child[stretchValue](lastValue);
					lastValue = 0;
				}
				lastFreeSpace -= child._v[stretchValue] - child._v[stretchvMin];
			}
		}
		marginD = this._v.horizontal ? '_marginDy' : '_marginDx';
		for ( var k = 0; k < toStretchSecondary.length; k++) {
			toStretchSecondary[k][secondaryStretchValue](this._v[secondaryStretchInnerValue] - toStretchSecondary[k][marginD]);
		}
		
		for (var k = 0; k < this.c.length; k++) {
			this.c[k].reDraw();
		}
//		
//		process aligns
//		
		
		if (lastValue) {
			var aToProcess = this._v.horizontal ? "hAlign": "vAlign";
			switch (this._v[aToProcess]){
				case this._baseClass.ALIGN.middle:
					this._alignDelta(Math.floor(lastValue/2));
					break;
				
				case this._baseClass.ALIGN.end:
					this._alignDelta(lastValue);
				break;
			}
		} else {
			this._alignDelta(0);
		}
		for (var k = 0; k < this.c.length; k++) {
			var secondaryDelta = this._v.horizontal ? '_vDelta' : '_hDelta';
			var sizeValue = this._v[secondaryStretchInnerValue];
			for (var k = 0; k < this.c.length; k++) {
				var child = this.c[k];
				if (this._v[secondaryAlign] === BoxElement.ALIGN.middle){
					child[secondaryDelta] ( Math.floor((sizeValue - child._v[secondaryStretchValue])/2));
				} else if (this._v[secondaryAlign] === BoxElement.ALIGN.end){
					child[secondaryDelta] (sizeValue - child._v[secondaryStretchValue]);
				}
			}
		}
	}
};
