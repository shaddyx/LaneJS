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
Grid.addProperty("locked", false);
Grid.addProperty("rowWidth", 0);
Grid.addProperty("showHeader", true);
Grid.addProperty("showFooter", false);
Grid.addProperty("rowHeight", undefined);
Grid.addProperty("topLine", false);
Grid.addProperty("_scrollerShown", false);
Grid.addProperty("_horzScrollerShown", false);


Grid.prototype._afterDraw = function() {
	this._elements.gridContentContainer.on(["heightChanged","widthChanged"], this.scheduleReDraw, this);
	this._rowSkin = this._v.skin;
	
	if (!GridRowSkin[this._rowSkin]){
		throw new Error("No skin " + this._rowSkin + " for GridRow!");
	}
	this._v.rowHeight || this.rowHeight(this._rowSkin.height);
	
	this._elements.vertScroll.on("dragEnded", this._vScrollerMoved, this);
	this._elements.horzScroll.on("drag", this._hScrollerMoved, this);	
	this.reBuild();
	//this.initKeyboard();
};

Grid.prototype.reBuild = function(){
	if (!this._v.isDrawn || !this._columns.length || !this._elements.content._v.width || !this._elements.content._v.height){
		this.scheduleReBuild(100);
		return;
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
	this.updateHeaderFooterVisibility();
};
Grid.prototype.updateHeaderFooterVisibility = function(){
	this._elements.header.visible(this._v.showHeader);
	this._elements.footer.visible(this._v.showFooter);
}
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
	if (!this._v.isDrawn) {
		return;
	}
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
	this.updateHeaderFooterVisibility();
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
		col.columnType(dataCol.columnType());
		col.caption(dataCol.caption());
		col.buildHelper();
		this._columns.push(col);
	}
	
	this.reBuild();
	this._v.data.on("dataUpdate", this.scheduleRender,this);
};

Grid.prototype._dataBeforeChanged = function(data){
	if (this._v.data){
		this._v.data.removeListener("dataUpdate", this.scheduleRender);
	}
}
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
		var lastSpace = this._rowWidth - 1;
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
		this._columns[i].rightBoundPos(right);
		this._columns[i].helperHeight(this._elements.gridContentContainer._v.height);
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

Grid.prototype.scheduleReBuild = function(time){
	time = time || 0;
	if (!this.reBuildTimer){
		var my = this;
		console.log("ReBuild scheduled");
		this.reBuildTimer = setTimeout(function(){
			my.reBuildTimer = false;
			my.reBuild();
		},time);
	}
};

Grid.prototype.scheduleRender = function(){
	if (!this.renderTimer){
		console.log("Render scheduled");
		var my = this;
		this.renderTimer = setTimeout(function(){
			my.renderTimer = false;
			my.render();
		},10);
	}
};
Grid.prototype.scheduleReDraw= function(){
	if (!this.reDrawTimer){
		console.log("Redraw scheduled");
		var my = this;
		this.reDrawTimer = setTimeout(function(){
			my.reDrawTimer = false;
			my.reDraw();
		},10);
	}
};
/**
 * renders grid data to grid
 */
Grid.prototype.render = function(){
	if (this._v.locked){
		return;
	}
	var my = this;
	var data = this._v.data;
	var rowIndex = 0;
	this._headerRow && this._headerRow.render();
	this._footerRow && this._footerRow.render();
	//
	//		first we must check the cursor is visible 
	//
	this._updateHorzScrollerVisibility();
	var current = data.getCurrentRow();
	if (!current){
		return false;
	}
	if (!this._v.topLine){
		this.topLine(current);
	}
	
	if (current.visibleUp() < this._v.topLine.visibleUp()){
		this.topLine(current);
	} else if (current.visibleUp() > this._v.topLine.visibleUp() + this._visibleRows - 1){
		my.topLine(current.getRelative( - this._visibleRows + 1));
	};
	
	
	data.getRows(this._v.topLine, Math.min(this._visibleRows, this._v.topLine.visibleDown()),function(dataRow){
		my._rows[rowIndex].restoreProperties();
		my._rows[rowIndex].render(dataRow);
		my._rows[rowIndex].rowIndex(dataRow.current);
		rowIndex ++;
	});
	//
	//	cleaning last rows
	//
	for (var i = rowIndex; i < this._rows.length; i++) {
		my._rows[i].render(undefined);
	}
	//
	//	update the scroll position
	//
	
	this._updateScrollerVisibility();
	var contH = this._elements.vertScroll.parent._v.height;
	var h = this._elements.vertScroll._v.height;
	var scrollTop = Math.floor((data.visibleUp() / (data.visible() - this._visibleRows)) * (contH - h));
	this._elements.vertScroll.top(scrollTop);
	
};
/**
 * returns physical cell by row number (in dataSource) and column name
 * @param rowNumber
 * @param colName
 */
Grid.prototype.getCellContainer = function(rowNumber, colName){
	var my = this;
	var data = this._v.data;
	var diff = rowNumber - data.visibleUp();
	if (diff < 0) {
		data.moveTo(rowNumber);
	} else if (diff > this._visibleRows){
		data.move(diff - this._visibleRows + 1);
	}
	this.render();
	var rowIndex = 0;
	var found = undefined;
	data.getRows(data.getCurrentRow(), Math.min(this._visibleRows, this._v.data.visibleDown()),function(dataRow, currentRow){
		if (currentRow == rowNumber){
			found = my._rows[rowIndex];
		}
		rowIndex ++;
	});
	if (found){
		var cell = this.locked(found.getCellByName(colName));
		return cell.returnContainer();
	} else {
		this.locked(false);
	}
};

Grid.prototype.releaseCell = function(){
	var cell = this._v.locked;
	cell.restoreContainer();
	this.locked(false);
	this.render();
};

Grid.prototype._vScrollerMoved = function(){
	var data = this._v.data;
	var currTop = this._elements.vertScroll._v.top;
	var contH = this._elements.vertScroll.parent._v.height;
	var h = this._elements.vertScroll._v.height;
	var dataPos = (currTop == 0) ? 0 :
			((data.visible() - this._visibleRows) * (currTop / (contH - h)));
	dataPos = Math.floor(dataPos);
	console.log("moving to:" + dataPos);
	this._v.data.moveTo(dataPos);
	this.render();
};

Grid.prototype._hScrollerMoved = function(){
	var scrollW = this._elements.horzScroll._v.width;
	var scrollLeft = this._elements.horzScroll._v.left;
	var fullW = this._elements.horzScroll.parent._v.innerWidth - scrollW;
	var percent = (scrollLeft / fullW) * 100;
	for (var k in this._elements){
		this._elements[k].trigger("horzScrollerMoved", percent, this);
	}
	
	
};

Grid.prototype._updateScrollerVisibility = function(){
	this._elements.vertScrollContainer && this._elements.vertScrollContainer.visible(this._v.data && this._v.data.visible() > this._visibleRows);
};

Grid.prototype._updateHorzScrollerVisibility = function(){
	this._elements.horzScrollContainer && this._elements.horzScrollContainer.visible(this._elements.gridContentContainer.isOverflowedX());
};


Grid.on("rowRender", function(row, dataRow){
	if (dataRow.current == dataRow.dataGrid.getCurrentRow().current){
		var skin = row.getSkin(true);
		for (var k in skin){
			row.setProperty(k, skin[k]);
		}
	}
});



Grid.on("_scrollerShownChanged", Grid.prototype._updateScrollerVisibility);
Grid.on(["showHeaderChanged", "showFooterChanged"], Grid.prototype.scheduleReDraw);
Grid.on("afterDraw", Grid.prototype._afterDraw);
Grid.on("dataChanged", Grid.prototype._dataChanged);
Grid.on("dataBeforeChanged", Grid.prototype._dataBeforeChanged);