/*
 * @@@dependsOn: InputBox
 */

InputBox.prototype._focusBeforeChanged = function(focus){
	if (focus && !this._v.focus){
		this.trigger("editStart");
	}
};

/**
 * function calls when item in dropdown selected (private function)
 * @param col - column
 * @param row - row
 */
InputBox.prototype._itemSelected = function(col, row){
	this.value(row.data.field);
	this._elements.gridContainer.visible(false);
	this.currentFocus(true);
	this.trigger("editEnd");
};


InputBox.prototype.updateValueList = function(){
	if (this._v.values.length){
		this.editable(false);
		if (!this._grid){
			/** @type Grid */
			this._grid = FormElement.build(InputBoxSkin.__grid,this._elements.gridContainer);
			this._grid.on("cellClicked", this._itemSelected, this);
			this._grid.on("cellEdit", this._itemSelected, this);
			this._grid.focusParent(this);
		}
		var dataGrid = new DataGrid();
		dataGrid.columns(DataColumn.build([{
			name:"field",
			columnType:"text"
		}]));
		for (var i = 0; i < this._v.values.length; i++){
			dataGrid.add({field:this._v.values[i]});
		}

		this._grid.data(dataGrid);
		var h = Constants.rowHeight * this._v.values.length;
		if (h > Constants.maxInputDropDownHeightinRows * Constants.rowHeight){
			h = Constants.maxInputDropDownHeightinRows * Constants.rowHeight;
		}
		this._elements.gridContainer.height(h + 4);
	} else {
		this._grid && this._grid.remove();
		this.editable(true);
	}
};


InputBox.on("focusBeforeChanged", InputBox.prototype._focusBeforeChanged);