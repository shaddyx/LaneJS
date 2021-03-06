/**
 * @@@dependsOn: Grid
 */

/**
 * reCalculates columns width's if columns sum size is lower than free space size
 */
Grid.prototype.reDrawColumns = function(){
    if (!this._elements.content._v.width){
        return;
    }
    if (window.stopRefresh){
        debugger;
        return;
    }
    //
    //	calculating initial values
    //
    var columnsNonStretchWidth = 0,
        columnsStretchableWidth = 0,
        toStretch = [];
    for (i = 0; i < this._columns.length; i++) {
        var col = this._columns[i];
        if (col._v.hs && !col.__temporaryNotStretchable){
            columnsStretchableWidth += col._v.width;
            toStretch.push(col);
        } else {
            delete col.__temporaryNotStretchable;
            columnsNonStretchWidth += col._v.width;
        }
    }
    var calculatedRowWidth = columnsNonStretchWidth + columnsStretchableWidth;
    this._rowWidth = Math.max(this._elements.gridContentContainer._v.width, calculatedRowWidth);

    //
    //	reDrawing widths
    //
    var spaceToStretch = this._rowWidth - columnsNonStretchWidth;
    if (spaceToStretch > columnsStretchableWidth){
        var ratio = spaceToStretch / columnsStretchableWidth;
        var lastSpace = spaceToStretch;
        var i;
        for (i = 0; i < toStretch.length - 1; i++) {
            var col = toStretch[i];
            var colW = Math.floor(col._v.width * ratio);
            lastSpace -= col.width(colW);
        }
        toStretch[i] && toStretch[i].width(lastSpace);
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
    //
    //
    this._rowWidth = right;
    //
    //		assigning columns sizes to cells
    //
    //
    //			Applying header and footer cell sizes
    //
    for (i = 0; i < this._columns.length; i++) {
        this._headerRow && this._headerRow._cells[i].width(this._columns[i]._v.width);
        this._footerRow && this._footerRow._cells[i].width(this._columns[i]._v.width);
    }

    this._elements.gridContentContainer.recalcMinSizes();
    this._headerRow && this._headerRow.width(this._rowWidth);
    this._footerRow && this._footerRow.width(this._rowWidth);
    this._elements.content.width(this._rowWidth);
    //console.log("rowWidth", this._rowWidth);

    for (var ri = 0; ri < this._rows.length; ri++ ){
        var row = this._rows[ri];
        row.width(this._rowWidth);
        for (i = 0; i < this._columns.length; i++) {
            row._cells[i].width(this._columns[i]._v.width);
        }
    }



    this.scheduleRender();
};