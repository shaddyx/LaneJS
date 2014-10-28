/**
 * @@@dependsOn: Grid
 */
Grid.prototype.mouseWheel = function(e){
	if (this._v.locked){
		return;
	}
	if ((-e.direction > 0 && this._v.data.visibleDown() > this._visibleRows)
		||(-e.direction < 0 && this._v.data.visibleUp())){
		this._v.data.move( -e.direction );
		//this.render();
	}
};

Grid.on("afterDraw", function(){
	this._v.outer.on("mousewheel", this.mouseWheel, this);
});