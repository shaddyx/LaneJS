var GridRow = function(grid) {
	BaseObject.call(this);
	this._grid = grid;
	this._cells = [];
};
Util.extend(GridRow, BaseObject);
GridRow.type = "GridRow";
GridRow.addProperty("skin",false);
GridRow.addProperty("height",false);
GridRow.prototype.draw = function(contentElement){
	this._element = contentElement.buildTo(GridRowSkin[this._v.skin]);
	this.height(this._element._v.height);
	this.reDraw();
};

GridRow.prototype.remove = function(){
	if (this._element){
		this._element.remove();
	}
	this._element = false;
};

GridRow.prototype.reDraw = function(){
	
};
