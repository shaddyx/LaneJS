var GridCellCell = function(params) {
	BaseObject.call(this);
	this._mustRedraw = true;
	this._params = params; 
	this.id = this._baseClass.__uniq++; 
};
Util.extend(GridCell, BaseObject);
GridCell.type = "GridCellCell";
GridCell.__uniq = 0;

GridCell.addProperty("width", 0);
GridCell.addProperty("minWidth", 0);
GridCell.addProperty("height", 0);
GridCell.addProperty("left", 0);
GridCell.addProperty("top", 0);
GridCell.addProperty("caption", "");


GridCell.prototype.init = function(){
	
};


GridCell.pritotype.apply = function(){

};

GridCell.on("captionChanged", function(value) {
	
});