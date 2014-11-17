/**
 * @@@dependsOn: Grid
 */
Grid.prototype.mouseWheel = function(e){
	if (this._v.locked || !this._v.data){
		return;
	}
	if ((-e.direction > 0 && this._v.data.visibleDown() > 1)
		||(-e.direction < 0 && this._v.data.visibleUp())){
		this._v.data.moveCurrentRow( -e.direction );
		this.render();
	}
	
};

Grid.on("afterDraw", function(){
	this._v.outer.on("mousewheel", this.mouseWheel, this);
});

Grid.on("cellClicked", function(cell, row){
	if (this._v.locked) {
		return;
	}
	this.selectedColumn(cell._column.name());
});
Grid.on("cellDblClicked", function(cell, row){
	if (this._v.locked) {
		return;
	}
	this.selectedColumn(cell._column.name());
	this.trigger("cellEdit", cell, row);
});