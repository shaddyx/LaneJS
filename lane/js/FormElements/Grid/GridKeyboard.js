/**
 * @@@dependsOn: Grid
 */
Grid.prototype.keyPressed = function(evt){
	if (this._v.locked || !this._v.data){
		return;
	}
	var key = evt.keyCode || evt.which;
	console.log("Grid key pressed:", key);
	switch (key) {
		// up
		case 38:
			if (this._v.data.visibleUp()){
				this._v.data.moveCurrentRow(-1);
				this.render();
			}
			break;
		// down
		case 40:
			if (this._v.data.visibleDown()){
				this._v.data.moveCurrentRow(1);
				this.render();
			}

			break;
		//
		//	pageUp
		//
		case 33:
			var count = Math.min(this._visibleRows, this._v.data.visibleUp());
			this._v.data.moveCurrentRow( - count);
			this.render();
			break;
		//
		//	pageDown
		//
		case 34:
			var count = Math.min(this._visibleRows, this._v.data.visibleDown() - 1);
			this._v.data.moveCurrentRow(count);
			this.render();
			break;
		//
		//	right
		//
		case 39:

			var col = this.getColumnByName(this._v.selectedColumn);
			if (col){
				if (this._columns[col._v.index + 1]){
					this.selectedColumn(this._columns[col._v.index + 1]._v.name);
				} else {
					this.selectedColumn(this._columns[0]._v.name);
				}

			} else {
				this.selectedColumn(false);
			}
			this.render();
			break;
		//
		//	left
		//
		case 37:
			var col = this.getColumnByName(this._v.selectedColumn);
			if (col){
				if (col._v.index > 0){
					this.selectedColumn(this._columns[col._v.index - 1]._v.name);
				} else {
					this.selectedColumn(this._columns[this._columns.length - 1]._v.name);
				}
			} else {
				this.selectedColumn(false);
			}
			this.render();
			break;
		//
		//	enter
		//
		case 13:
			if (this._v.locked) {
				return;
			}
			var col = this.getColumnByName(this._v.selectedColumn);
			this.trigger("cellEdit", col.name(), this._v.data.getCurrentRow());
			break;
	}
};

Grid.on("keydown", Grid.prototype.keyPressed);