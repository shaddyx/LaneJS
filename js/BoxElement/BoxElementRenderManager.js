BoxElement.runGlobalRender = function(){
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
	var left=this._values.padding[3];
	var top=this._values.padding[0];
	if (this._values.horizontal){
		left += this._values._alignDelta;
	} else {
		top += this._values._alignDelta;
	}
	for (var k = 0 ; k < this.c.length ; k++){
		var child = this.c[k];
		if (!child._values._virtualized && !child._values.floating && child._values.visible) {
			left += child._values._vMargin[3];
			top += child._values._vMargin[0];
			
			child.left(left + child._values._hDelta);
			child.top(top + child._values._vDelta);
			
			if (this._values.horizontal) {
				left += child._values.width + child._values._vMargin[1];
				top -= child._values._vMargin[0];
			} else {
				top += child._values.height + child._values._vMargin[2];
				left -= child._values._vMargin[3];
			}
		}
	}
};
/**
 * adds us to render queue, but only if our parent exists
 */
BoxElement.prototype.addToRenderQueue = function(me){
	if (this.parent&&!this._values.floating) {
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