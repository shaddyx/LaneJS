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
    if (this._rowWidth < this._elements.content._v.width){
        this._rowWidth = this._elements.content._v.width;
    }

    //
    //	calculating initial values
    //
    var columnsNonStretchWidth = 0,
        columnsStretchableWidth = 0,
        toStretch = [];
    for (i = 0; i < this._columns.length; i++) {
        var col = this._columns[i];
        if (col._v.hs){
            columnsStretchableWidth += col._v.width
            toStretch.push(col);
        } else {
            columnsNonStretchWidth += col._v.width;
        }
    }

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
            lastSpace -= col.width(Math.floor(col._v.width * ratio));
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