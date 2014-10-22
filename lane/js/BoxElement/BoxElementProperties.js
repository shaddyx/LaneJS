/*
 * Box element properties
 * @@@dependsOn: BoxElement
 */
BoxElement.on("captionChanged",function(value){
	if (!this._baseClass.textUtils){
		this._baseClass.textUtils = new TextUtils();
		this._baseClass.textUtils._init();
	}
	//debugger;
	this._captionWidth = this._baseClass.textUtils.getStringWidth(value,{
		fontFamily: this._v.fontFamily
		,fontSize: this._v.fontSize
		,fontWeight: this._v.fontWeight
	});
	if (this._captionWidth){
		this._captionHeight = this._v.lineHeight;
	} else {
		this._captionHeight = 0;
	}
	
	this._horzOverflow || this.vMinWidth(this._captionWidth + this._v._dx);
	this._vertOverflow || this.vMinHeight(this._captionHeight + this._v._dy);
	/*BoxElement.__listeners._dxChanged.call(this);
	BoxElement.__listeners._dyChanged.call(this);*/
});
BoxElement.on("overflowChanged",function(value){
	/*
	 * TODO: implement this function
	 */
	//var oType = this._baseClass.OVERFLOW_MODE;
	this._horzOverflow = false;
	this._vertOverflow = false;
});

BoxElement.__listeners.recalcInnerWidth = function(){
	this._horzOverflow||this.innerWidth(this._v.width - this._v._dx);
};
BoxElement.__listeners.recalcInnerHeight= function(){
	this._vertOverflow||this.innerHeight(this._v.height - this._v._dy);
};

BoxElement.on("heightChanged",BoxElement.__listeners.recalcInnerHeight);
/*
 * minWidth can't be less than dx
 */

/*BoxElement.__listeners._dxChanged = function(value){
	this.minWidth(Math.max(this._v._dx + this._captionWidth,this._v.minWidth));
	this._baseClass.__listeners.recalcInnerWidth.call(this);
};

BoxElement.__listeners._dyChanged = function(value){
	this.minHeight(Math.max(value + this._captionheight,this._v.minHeight));
	this._baseClass.__listeners.recalcInnerHeight.call(this);
};*/

BoxElement.__listeners.minWidthChanged = function(value){
	this.width(Math.max(this._v.width));
};

BoxElement.__listeners.minHeightChanged = function(value){
	this.height(Math.max(this._v.height));
};


BoxElement.__listeners.vMinWidthChanged =function(value){
	this.width(Math.max(this._v.width,value));
}; 

BoxElement.__listeners.vMinHeightChanged = function(value){
	this.height(Math.max(this._v.height,value));
};

/*
 * before changed functions
 */
BoxElement.__listeners.widthBeforeChanged = function(value){
	var newVal = Math.max(value,this._v.vMinWidth,this._v.minWidth);
	if (newVal !== value){
		this.width(newVal);
		return false;
	}
};
BoxElement.__listeners.heightBeforeChanged = function(value){
	var newVal = Math.max(value,this._v.vMinHeight,this._v.minHeight);
	if (newVal !== value){
		this.height(newVal);
		return false;
	}
};
/**
 * the proprty list to spy onchange from relative element
 */
BoxElement.eventsToSpy = [/*'leftChanged','topChanged','widthChanged','heightChanged', "isDrawnChanged", "parentVisibleChanged"*/, "redrawed"];
BoxElement.__listeners.relativityBeforeChanged = function(value){
	if (value !== false && typeof value != "object") {
		throw new Error ("Relativity must be an object");
	}
	
	for (var k in BoxElement.eventsToSpy) {
		this._v.relativity && this._v.relativity.target.removePropertyChangedFunc(BoxElement.eventsToSpy[k], this.recalcRelativity, this);
	}
	
	if (value) {
		this.floating(true);
		for (var k in BoxElement.eventsToSpy) {
			value.target.on(BoxElement.eventsToSpy[k], this.recalcRelativity, this);
		}
	}
};

BoxElement.relativityAnchors = {
	leftTopInner:function(target, abs){
		return {left:abs.left,top:target.top()};
	},
	rightTopInner:function(target, abs){
		return {left:abs.left + target.width()-this.width(),top:abs.top};
	},
	rightBottomInner:function(target, abs){
		return {left:abs.left + target.width()-this.width(),top:abs.top + target.height()-this.height()};
	},
	middle:function(target, abs){
		return {left:abs.left + (target.width() - this.width()) / 2,top:abs.top + (target.height()-this.height()) / 2};
	},
	leftInner:function(target, abs){
		return {left:abs.left,top:abs.top};
	},
	bottom:function(target, abs){
		return {left:abs.left,top:abs.top + target._v.height};
	},
	rightInner:function(target, abs){
		return {left:abs.left + target.width() - this.width(),top:abs.top};
	},
	topInner:function(target, abs){
		return {left:abs.left, top:abs.top};
	}
};

BoxElement.prototype._applyRelativityResult = function(result){
	for (var k in result){
		this[k](result[k]);
	}
};
BoxElement.prototype.recalcRelativity = function(){
//	
//	TODO:realize this function
//
	var relativity = this._v.relativity;
	var target = relativity.target;
	if (relativity.anchor) {
		var chunks = relativity.anchor.split(",");
		var relativityResult = target.getAbsolutePosition();
		for (var k in chunks) {
			if (!BoxElement.relativityAnchors[chunks[k]]){
				throw new Error("No relativity anchor: " + chunks[k]);
			}
			relativityResult = BoxElement.relativityAnchors[chunks[k]].call(this,target, relativityResult);
		}
	}
	if (relativity.func) {
		relativityResult = relativity.func.call(this,target, relativityResult);
	}
	this._applyRelativityResult(relativityResult);
	if (relativity.spyVisible){
		this.visible(target.isParentsVisible());
	}
};


BoxElement.__listeners.marginChanged = function(margin){
	//
	//	TODO: add spacings and other
	//
	this._vMargin(margin);
};

BoxElement.on("_vMarginChanged",function(){
	var margin=this._v._vMargin;
	this._marginDx = margin[1]+margin[3];
	this._marginDy = margin[0]+margin[2];
});

BoxElement.__listeners.styleClassChanged = function(){
	var styleClass = this._v.styleClass;
	var style = this._v.style;
	if (style && style[styleClass]){
		var styleObject = style[styleClass];
		for (var k in styleObject){
			this[k](styleObject[k]);
		}
	}
};

BoxElement.prototype._visibleChanged = function(value){
	this.htmlElement.style.display = value ? "block" : "none";
	this._parentVisibleChanged(value);
};

BoxElement.prototype._parentVisibleChanged = function(value){
	this.trigger("parentVisibleChanged", value);
	for (var k in this.c) {
		this.c[k]._parentVisibleChanged(value);
	}
};

BoxElement.prototype._draggableChanged = function(value){
	if (value) {
		if (typeof value != "object") {
			value = {};
		}
		if (!value.axis){
			value.axis = "xy";
		}
		var dragByX = value.axis.indexOf("x") != -1;
		var dragByY = value.axis.indexOf("y") != -1;
		
		this.floating(true);
		this._dragListeners = {
			mouseDown:function(){
				if (!this._dragStartPoint && this.trigger('dragStarted') !== false)	{
					this._dragStartPoint = {
						x:browser.mouseX() - this._v.left,
						y:browser.mouseY() - this._v.top
					};
				}
			},
			mouseMove:function(){
				if (this._dragStartPoint) {
					var newX = browser.mouseX() - this._dragStartPoint.x;
					var newY = browser.mouseY() - this._dragStartPoint.y;
					if (value.dragXStep) {
						newX =  value.dragXStep * Math.round( newX / value.dragXStep);
					}
					if (value.dragYStep) {
						newY =  value.dragYStep * Math.round( newY / value.dragYStep);
					}
					var maxX = this.parent.innerWidth() - this.width();
					var maxY = this.parent.innerHeight() - this.height();
					newX = newX > 0 ? newX : 0;
					newY = newY > 0 ? newY : 0;
					newX = newX < maxX ? newX : maxX;
					newY = newY < maxY ? newY : maxY;
					
					if (dragByX){
						this.left(newX);
					}
					if (dragByY){
						this.top(newY);
					}
				}
			},
			stopDragging:function(){
				if (this._dragStartPoint && this._dragListeners && this.trigger('dragEnded') !== false){
					this._dragStartPoint = false;
				}
			},
			removeListeners:function(){
				this.removeListener("mousedown", this._dragListeners.mouseDown, this);
				rootElement.removeListener("mousemove", this._dragListeners.mouseMove, this);
				rootElement.removeListener("mouseup", this._dragListeners.stopDragging, this);
			}
		};
		this.on("mousedown", this._dragListeners.mouseDown, this);
		rootElement.on("mousemove", this._dragListeners.mouseMove, this);
		rootElement.on("mouseup", this._dragListeners.stopDragging, this);
		this.on("removed", function(){
			this._dragListeners.removeListeners.call(this);
		}, this);
	} else {
		this._dragListeners.removeListeners.call(this);
	}
};

BoxElement.prototype._draggableBeforeChanged = function(){
	if (this._dragListeners){
		this._dragListeners.removeListeners.call(this);
	}
};

BoxElement.on("draggableBeforeChanged", BoxElement.prototype._draggableBeforeChanged);
BoxElement.on("draggableChanged", BoxElement.prototype._draggableChanged);
BoxElement.on("visibleChanged", BoxElement.prototype._visibleChanged);
BoxElement.on("styleClassChanged",BoxElement.__listeners.styleClassChanged);
BoxElement.on("styleChanged",BoxElement.__listeners.styleClassChanged);
BoxElement.on("marginChanged",BoxElement.__listeners.marginChanged);
BoxElement.on("widthBeforeChanged",BoxElement.__listeners.widthBeforeChanged);
BoxElement.on("relativityBeforeChanged",BoxElement.__listeners.relativityBeforeChanged);
BoxElement.on("heightBeforeChanged",BoxElement.__listeners.heightBeforeChanged);
BoxElement.on("vMinHeightChanged",BoxElement.__listeners.vMinHeightChanged);
BoxElement.on("vMinWidthChanged",BoxElement.__listeners.vMinWidthChanged);
BoxElement.on("minHeightChanged",BoxElement.__listeners.minHeightChanged);
BoxElement.on("horizontalChanged",BoxElement.prototype.__updateHorizontal);
BoxElement.on("widthChanged",BoxElement.__listeners.recalcInnerWidth);
BoxElement.on(["borderWidthChanged","paddingChanged","marginChanged"],BoxElement.prototype.__recalcDxDy);
/*BoxElement.on("_dxChanged",BoxElement.__listeners._dxChanged);
BoxElement.on("_dyChanged",BoxElement.__listeners._dyChanged);*/
BoxElement.on("minWidthChanged",BoxElement.__listeners.minWidthChanged);




