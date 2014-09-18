var GridCell = function(params) {
	BaseObject.call(this);
	this._element = new BoxElement();
};
Util.extend(GridCell, BaseObject);
BoxElement.type = "GridCell";




/*GridCell.on("captionChanged", function(value) {
	
});*/	