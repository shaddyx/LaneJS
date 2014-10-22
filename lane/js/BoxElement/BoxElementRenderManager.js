/*
 * @@@dependsOn: BoxElement
 */
BoxElement.runGlobalRender = function(){
	//console.log("Running global render");
	var my = BoxElement;
	if (my._renderTimer){
		clearTimeout(my._renderTimer);
		my._renderTimer = false;
	}
	var temp=[];
	for (var k in my._renderMap){
		temp.push(my._renderMap[k]);
	}
	/*
	 * flushing render map
	 */
	my._renderMap={};
	/*
	 * running renders on elements
	 */
	for (var x in temp){
		temp[x].render();
	}
};
/**
 * function renders coordinates of our childs
 */
BoxElement.prototype.render = function(){
	var left=this._v.padding[3] + this._v.scrollLeft;
	var top=this._v.padding[0] + this._v.scrollTop;
	if (this._v.horizontal){
		left += this._v._alignDelta;
	} else {
		top += this._v._alignDelta;
	}
	for (var k = 0 ; k < this.c.length ; k++){
		var child = this.c[k];
		if (!child._v._virtualized && !child._v.floating && child._v.visible) {
			left += child._v._vMargin[3];
			top += child._v._vMargin[0];
			
			child.left(left + child._v._hDelta);
			child.top(top + child._v._vDelta);
			
			if (this._v.horizontal) {
				left += child._v.width + child._v._vMargin[1];
				top -= child._v._vMargin[0];
			} else {
				top += child._v.height + child._v._vMargin[2];
				left -= child._v._vMargin[3];
			}
		}
	}
};
/**
 * adds us to render queue, but only if our parent exists
 */
BoxElement.prototype.addToRenderQueue = function(me){
	if (this.parent&&!this._v.floating) {
		if (me){
			this._baseClass._renderMap[this.id] = this;
		} else {
			this._baseClass._renderMap[this.parent.id] = this.parent;
			if (!this._baseClass._renderTimer) {
				this._baseClass._renderTimer = setTimeout(BoxElement.runGlobalRender,0);
			}
		}
		
	}
	
};