var Grid = function() {
	FormElement.call(this);
	this._rows = [];
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
	console.log("Row height:" + this._rowsHeight);
};

Grid.prototype.reDraw = function(){
	console.log("reDraw called");
	this._drawRows();
};

Grid.prototype._drawRows = function(){
	console.log("h:" + this._elements.content.height());
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
	var row = new GridRow();
	row.skin(this._rowSkin);
	row.draw(this._elements.content);
	if (row.height() == 0) {
		throw new Error("OOOOps");
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
}


Grid.on("afterDraw", Grid.prototype._afterDraw);