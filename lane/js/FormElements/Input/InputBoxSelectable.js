/*
 * @@@dependsOn: InputBox
 */

InputBox.prototype.updateSelectButtonVisibility = function(){
	this._v.isDrawn && this._elements.selectStartButton.visible(this._v.showSelect);
};
/**
 * function calls when item in dropdown selected (private function)
 * @param col - column
 * @param row - row
 */
InputBox.prototype._itemSelected = function(col, row){
	this.value(row.data.field);
	this.endSelection();
};

InputBox.prototype.updateValueList = function(){
	if (this._v.values.length){
		//this.editable(false);
		if (!this._grid){
			/** @type Grid */
			this._grid = FormElement.build(InputBoxSkin.__grid,this._elements.gridContainer);
			//this._grid.on("cellClicked", this._itemSelected, this);
			this._grid.on("cellMouseUp", this._itemSelected, this);
			this._grid.on("cellEdit", this._itemSelected, this);
			this._grid.on("focusChanged", this._selectionFocusChange, this);
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
		var h = Constants.gridRowHeightForSelectable * this._v.values.length;
		if (h > Constants.maxInputDropDownHeightinRows * Constants.gridRowHeightForSelectable){
			h = Constants.maxInputDropDownHeightinRows * Constants.gridRowHeightForSelectable;
		}
		this._elements.gridContainer.height(h + Constants.gridInnerPadding);
	} else {
		this._grid && this._grid.remove();
		//this.editable(true);
	}
};

InputBox.prototype.startSelection = function(){
	if (this._grid && !this._elements.gridContainer._v.visible){
		this._elements.gridContainer.visible(this._v.values.length);
		this._grid.focusParent(this);
		this._grid.currentFocus(true);
		this.trigger("selectionStart");
	}
};

InputBox.prototype._selectionFocusChange = function(value){
	if (!value){
		this.endSelection();
	}
};

InputBox.prototype.endSelection = function(){
	if (this._grid && this._elements.gridContainer._v.visible) {
		this._elements.gridContainer.visible(false);
		this.currentFocus(true);
		this.trigger("selectionEnd");
	}
};

InputBox.prototype._selectButtonClicked = function(){
	this.tryToFocus();
	this.startSelection();
};
InputBox.on("showSelectChanged", InputBox.prototype.updateSelectButtonVisibility);
/*InputBox.on(["keydown", "keyup", "keypress"], function(e){
	this._grid && this._elements.gridContainer._v.visible && this._grid.trigger(e.type, e);
});*/