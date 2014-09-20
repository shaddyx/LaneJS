var GridTextCell = function(column, row) {
	GridCell.call(this, column, row);
};
Util.extend(GridTextCell, GridCell);
GridTextCell.type = "GridTextCell";




/*GridTextCell.on("captionChanged", function(value) {
	
});*/	