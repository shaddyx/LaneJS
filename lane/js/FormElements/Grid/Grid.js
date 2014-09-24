/**
 * @@@dependsOn: DataGrid
 */
var Grid = function() {
	FormElement.call(this);
	this._rows = [];
	this._columns = [];
	this._rowsHeight = 0;
	this._rowHeight = 0;
	this._rowWidth = 0;
};
Util.extend(Grid, FormElement);
Grid.type = "Grid";
Grid.addProperty("data", false);
Grid.addProperty("rowWidth", 0);

Grid.prototype._afterDraw = function() {
	this._elements.content.on(["heightChanged","widthChanged"], this.reDraw, this);
	this._rowSkin = this._v.skin;
	
	if (!GridRowSkin[this._rowSkin]){
		throw new Error("No skin " + this._rowSkin + " for GridRow!");
	}
	this._rowHeight = this._rowSkin.height;
	this.reBuild();
	this._buildHeaderAndFooter();
	//this.initKeyboard();
};

Grid.prototype.reBuild= function(){
	if (!this._v.isDrawn || !this._columns.length || !this._elements.content._v.width || !this._elements.content._v.height){
		return;
	}
	console.log("Grid reBuild called");
	for (var i = 0; i<this._rows.length; i++ ){
		this._rows[i].reBuildCells();
	}
	this._headerRow.reBuildCells();
	this._footerRow.reBuildCells();
	this.reDraw();
};
/**
 * function called after sizes changed
 */
Grid.prototype.reDraw = function(){
	if (!this._v.isDrawn || !this._elements.content._v.width || !this._elements.content._v.height){
		return;
	}
	console.log("Grid reBuild called");
	this.drawMissingRows();
	this.buildCells();
	this.reDrawColumns();
};

Grid.prototype._buildHeaderAndFooter = function(){
	this._headerRow = new GridHeaderRow(this);
	this._headerRow.skin(this._rowSkin);
	this._headerRow.draw(this._elements.header);
	this._footerRow = new GridFooterRow(this);
	this._footerRow.skin(this._rowSkin);
	this._footerRow.draw(this._elements.footer);
};


/**
 * function draws rows to content element in grid
 */
Grid.prototype.drawMissingRows = function(){
	//
	//		draw missing rows
	//
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
	this._headerRow.cellsBuilt || this._headerRow.buildCells();
	this._footerRow.cellsBuilt || this._footerRow.buildCells();
}
/**
 * calls when data changed, this function rebuilds local grid columns
 */
Grid.prototype._dataChanged = function(){
	for (k = 0; k < this._v.data._v.columns.length; k++) {
		var dataCol = this._v.data._v.columns[k];
		var col = new GridColumn();
		col.dataColumn(dataCol);
		this._columns.push(col);
	}
	this.reBuild();
};
/**
 * reCalculates columns width's if columns sum size is lower than free space size 
 */
Grid.prototype.reDrawColumns = function(){
	if (!this._elements.content._v.width){
		return;
	}
	if (this._rowWidth < this._elements.content._v.width){
		this._rowWidth = this._elements.content._v.width;
	}
	
	var columnsFullWidth = 0;
	for (i = 0; i < this._columns.length; i++) {
		columnsFullWidth += this._columns[i]._v.width; 
	}
	
	if (columnsFullWidth < this._rowWidth){
		var ratio = this._rowWidth / columnsFullWidth;
		var lastSpace = this._rowWidth;
		var i;
		for (i = 0; i < this._columns.length - 1; i++) {
			lastSpace -= this._columns[i].width(Math.floor(this._columns[i]._v.width * ratio));
		}
		this._columns[i].width(lastSpace);
	}
	
	//
	//		assigning columns sizes to cells
	//
	this._headerRow.width(this._rowWidth);
	this._footerRow.width(this._rowWidth);
	for (var ri = 0; ri < this._rows.length; ri++ ){
		var row = this._rows[ri];
		row.width(this._rowWidth);
		for (i = 0; i < this._columns.length; i++) {
			row._cells[i].width(this._columns[i]._v.width);
		}
	}
	
	//
	//			Applying header and footer cell sizes
	//
	for (i = 0; i < this._columns.length; i++) {
		this._headerRow._cells[i].width(this._columns[i]._v.width);
		this._footerRow._cells[i].width(this._columns[i]._v.width);
	}
	
	this.scheduleRender();
};

Grid.prototype.scheduleRender = function(){
	if (!this.renderTimer){
		var my = this;
		this.renderTimer = setTimeout(function(){
			my.renderTimer = false;
			my.render();
		},0);
	}
};

Grid.prototype.render = function(){
	var my = this;
	var data = this._v.data;
	var rowIndex = 0;
	data.getRows(this._rows.length,function(dataRow){
		my._rows[rowIndex].render(dataRow);
		rowIndex ++;
	});
};



Grid.on("afterDraw", Grid.prototype._afterDraw);
Grid.on("dataChanged", Grid.prototype._dataChanged);