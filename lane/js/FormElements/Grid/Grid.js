var Grid = function() {
	FormElement.call(this);
	this._rows = [];
	this._columns = [];
	this._rowsHeight = 0;
	this._rowHeight = 0;
};
Util.extend(Grid, FormElement);
Grid.type = "Grid";
Grid.addProperty("data", false);

Grid.prototype._afterDraw = function() {
	this._elements.content.on(["heightChanged","widthChanged"], this.reDraw, this);
	this._rowSkin = this._v.skin;
	
	if (!GridRowSkin[this._rowSkin]){
		throw new Error("No skin " + this._rowSkin + " for GridRow!");
	}
	this._rowHeight = this._rowSkin.height;
	//console.log("Row height:" + this._rowsHeight);
	this.reBuild();
	this.reDraw();
};

Grid.prototype.reBuild= function(){
	if (!this._v.isDrawn){
		return;
	}
	console.log("Grid reBuild called");
	for (var i = 0; i<this._rows.length; i++ ){
		this._rows[i].reBuildCells();
	}
};
/**
 * function called after sizes changed
 */
Grid.prototype.reDraw = function(){
	if (!this._v.isDrawn){
		return;
	}
	console.log("Grid reBuild called");
	this.drawMissingRows();
	this.buildCells();
};
/**
 * function draws rows to content element in grid
 */
Grid.prototype.drawMissingRows = function(){
	//console.log("h:" + this._elements.content.height());
	var h = this._elements.content.height();
	if (h > this._rowsHeight){
		//	add rows
		console.log("trying to add rows");
		while (h > this._rowsHeight){
			this._addRow();
		}
	} else if (h * 2 < this._rowsHeight){
		console.log("trying to remove rows");
		while (h * 2 < this._rowsHeight){
			this._removeLastRow();
		}
	}
};
/**
 * adds row to tail of he list
 */
Grid.prototype._addRow = function(){
	var row = new GridRow(this);
	row.skin(this._rowSkin);
	row.draw(this._elements.content);
	if (row.height() == 0) {
		throw new Error("OOOOps, row height is 0, it can't be!");
	}
	this._rowsHeight += row.height();
	this._rows.push(row);
};
/**
 * removes last row from list
 */
Grid.prototype._removeLastRow = function(){
	if (this._rows.length > 0){
		var last = this._rows[this._rows.length - 1];
		last.remove();
		this._rowsHeight -= this._rowSkin.height;
		this._rows.length = this._rows.length - 1;
	}
};
/**
 * Draws cells to rows 
 */
Grid.prototype.buildCells = function(){
	for (var i = 0; i<this._rows.length; i++ ){
		if (!this._rows[i].cellsBuilt){
			this._rows[i].buildCells();
		}
	}
}

Grid.prototype._dataChanged = function(){
	for (var k in this._v.data._v.columns){
		var dataCol = this._v.data._v.columns;
		var col = new GridColumn();
		col.dataColumn(dataCol);
		this._columns.push(col);
	}
	this.reBuild();
};

Grid.on("afterDraw", Grid.prototype._afterDraw);
Grid.on("dataChanged", Grid.prototype._dataChanged);