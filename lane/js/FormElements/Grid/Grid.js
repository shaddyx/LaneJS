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
	this._visibleRows = 0;
};
Util.extend(Grid, FormElement);
Grid.type = "Grid";
Grid.addProperty("data", false);
Grid.addProperty("rowWidth", 0);
Grid.addProperty("showHeader", 0);

Grid.prototype._afterDraw = function() {
	this._elements.content.on(["heightChanged","widthChanged"], this.reDraw, this);
	this._rowSkin = this._v.skin;
	
	if (!GridRowSkin[this._rowSkin]){
		throw new Error("No skin " + this._rowSkin + " for GridRow!");
	}
	this._rowHeight = this._rowSkin.height;
	this.reBuild();
	//this.initKeyboard();
};

Grid.prototype.reBuild = function(){
	if (!this._v.isDrawn || !this._columns.length || !this._elements.content._v.width || !this._elements.content._v.height){
		this.scheduleReBuild();
	}
	console.log("Grid reBuild called");
	for (var i = 0; i<this._rows.length; i++ ){
		this._rows[i].reBuildCells();
	}
	this._buildHeaderAndFooter();
	
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
	console.log("Grid reDraw called");
	this.drawMissingRows();
	this.calcVisibleRows();
	this.buildCells();
	this.reDrawColumns();
};

Grid.prototype.calcVisibleRows = function(){
	this._visibleRows = 0;
	var h = this._elements.content.height();
	var rowH = 0;
	for (var ri = 0; ri < this._rows.length; ri++ ){
		var row = this._rows[ri];
		rowH += row._v.height
		if (rowH <= h){
			this._visibleRows ++;
		}
	}
};

Grid.prototype._buildHeaderAndFooter = function(){
	if (!this._headerRow){
		this._headerRow = new GridHeaderRow(this);
		this._headerRow.skin(this._rowSkin);
		this._headerRow.draw(this._elements.header);
	}
	if (!this._footerRow){
		this._footerRow = new GridFooterRow(this);
		this._footerRow.skin(this._rowSkin);
		this._footerRow.draw(this._elements.footer);
	}
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
	if (this._headerRow){
		this._headerRow.cellsBuilt || this._headerRow.buildCells();
	}
	if (this._footerRow){
		this._footerRow.cellsBuilt || this._footerRow.buildCells();
	}
}
/**
 * calls when data changed, this function rebuilds local grid columns
 */
Grid.prototype._dataChanged = function(){
	while (this._columns.length) {
		this._columns[0].remove();
		this._columns.splice(0, 1);
	}
	
	for (var k = 0; k < this._v.data._v.columns.length; k++) {
		var dataCol = this._v.data._v.columns[k];
		var col = new GridColumn(this);
		col.index(k);
		col.dataColumn(dataCol);
		col.caption(dataCol.caption());
		col.buildHelper();
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
	//	reCalc column right bound position
	//
	
	var right = 0;
	for (i = 0; i < this._columns.length; i++) {
		right += this._columns[i]._v.width;
		console.log("right [" + i + "]",right);
		this._columns[i].rightBoundPos(right);
		this._columns[i].helperHeight(this._v.height);
	}
	//
	//		assigning columns sizes to cells
	//
	this._headerRow && this._headerRow.width(this._rowWidth);
	this._footerRow && this._footerRow.width(this._rowWidth);
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
		this._headerRow && this._headerRow._cells[i].width(this._columns[i]._v.width);
		this._footerRow && this._footerRow._cells[i].width(this._columns[i]._v.width);
	}
	
	this.scheduleRender();
};

Grid.prototype.scheduleReBuild = function(){
	if (!this.reBuildTimer){
		var my = this;
		console.log("ReBuild scheduled");
		this.reBuildTimer = setTimeout(function(){
			my.reBuildTimer = false;
			my.reBuild();
		},0);
	}
};

Grid.prototype.scheduleRender = function(){
	if (!this.renderTimer){
		console.log("Render scheduled");
		var my = this;
		this.renderTimer = setTimeout(function(){
			my.renderTimer = false;
			my.render();
		},0);
	}
};
Grid.prototype.scheduleReDraw= function(){
	if (!this.reDrawTimer){
		console.log("Redraw scheduled");
		var my = this;
		this.reDrawTimer = setTimeout(function(){
			my.reDrawTimer = false;
			my.reDraw();
		},0);
	}
};

Grid.prototype.render = function(){
	var my = this;
	var data = this._v.data;
	var rowIndex = 0;
	this._headerRow && this._headerRow.render();
	this._footerRow && this._footerRow.render();
	data.getRows(this._visibleRows,function(dataRow){
		my._rows[rowIndex].render(dataRow);
		rowIndex ++;
	});
	//
	//	update the scroll position
	//
	var contH = this._elements.vertScroll.parent._v.height;
	var h = this._elements.vertScroll._v.height;
	var scrollTop = (data.visibleUp() / data.visible()) * (contH - h);
	this._elements.vertScroll.top(scrollTop);
};




Grid.on("showHeader", Grid.prototype.scheduleReBuild);
Grid.on("afterDraw", Grid.prototype._afterDraw);
Grid.on("dataChanged", Grid.prototype._dataChanged);