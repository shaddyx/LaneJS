/**
 * @constructor
 * @extends InputElement
 */
var InputBox = function() {
	InputElement.call(this);
};
Util.extend(InputBox, InputElement);
InputBox.type = "InputBox";
InputBox.setDefault("value", "");
/** @method */
InputBox.prototype.password = InputBox.addProperty("password",false,{type:"boolean"});
InputBox.prototype.values = InputBox.addProperty("values",[],{type:"array"});
InputBox.prototype.dataType = InputBox.addProperty("dataType","string");
InputBox.prototype.editable = InputBox.addProperty("editable",true);
InputBox.func = {};
InputBox.func.afterDraw = function() {
	var my = this;
	this._input = this._elements.input;
	this.updateValues();
	this._updateListeners();
	this.updatePassword();
	this.updateValueList();
	this._updateEditable();
};
InputBox.prototype.updateValues = function() {
	if (this._v.isDrawn && this._elements.input.htmlInnerElement.value !== this._v.value){
		this._elements.input.htmlInnerElement.value = this._v.value.toString();
	}
};
/**
 * function updates listeners for input html element
 * @private
 */
InputBox.prototype._updateListeners = function(){
	var my = this;
	if (browser.ie && parseInt(browser.version) < 10){
		Util.addListener(this._elements.input.htmlInnerElement,"keyup", function(e) {
			var me = this;
			setTimeout(function(){
	    		return my.trigger("input", me.value);
	    	},0);
		});
	} else {
		Util.addListener(this._elements.input.htmlInnerElement, "input", function(e){
			return my.trigger("input", this.value);
		});
	}
	
	Util.addListener(this._elements.input.htmlInnerElement, "keyup", function(){
		my.value(this.value);
	});
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

InputBox.prototype._focusBeforeChanged = function(focus){
	if (focus && !this._v.focus){
		this.trigger("editStart");
	}
};

InputBox.prototype.updatePassword = function(){
	if (this._v.isDrawn) {
		var old = this._input.htmlElement;
		var oldType = old.getAttribute("type") || "text";
		var newValue = this._v.password?"password":"text";
		if (oldType != newValue){
			var container = old.parentNode;
			var newInput = document.createElement("input");
			newInput.setAttribute("type",newValue);
			this._input.htmlElement = newInput;
			var style;
			if (old.getComputedStyle){
				style = old.getComputedStyle();
			} else {
				style = old.currentStyle;
			}
			
			for (var k in style){
				try{
					newInput.style[k] = style[k];
				} catch (e) {
					console.log("Error setting style, ignoring",k);
				}
			}
			container.replaceChild(newInput, old);
			this._updateListeners();
		}
	}
};
InputBox.prototype._updateEditable = function(){
	if (this._v.isDrawn){
		if (!this._v.editable){
			this._input.htmlInnerElement.setAttribute("readonly","");
		} else {
			this._input.htmlInnerElement.removeAttribute("readonly");
		}
	}
};

InputBox.prototype._dataTypeBeforeChanged = function(value){
	if (typeof (value) === "string"){
		this.dataType(Types[value]);
		return;
	}
	if (this._v.dataType && this._v.enumerable){
		this.values([]);
	}
};
InputBox.prototype._dataTypeChanged = function(){
	if (this._v.dataType && this._v.dataType.enumerable){
		this.values(this._v.dataType.enumerable);
	}
};
InputBox.on("editStart", function(){
	this._elements.gridContainer.visible(this._v.values.length);
});
InputBox.prototype._inputBoxKeyListener = function(evt){
	var key = evt.keyCode || evt.which;
	switch (key){
		case 13:
			this.trigger("editEnd");
			break;
	}
};
InputBox.on("focusBeforeChanged", InputBox.prototype._focusBeforeChanged);
InputBox.on("afterDraw", InputBox.func.afterDraw);
InputBox.on("valueChanged", InputBox.prototype.updateValues);
InputBox.on("passwordChanged", InputBox.prototype.updatePassword);
InputBox.on("editable", InputBox.prototype._updateEditable);
InputBox.on("dataTypeChanged", InputBox.prototype._dataTypeChanged);
InputBox.on("dataTypeBeforeChanged", InputBox.prototype._dataTypeBeforeChanged);
InputBox.on("keydown", InputBox.prototype._inputBoxKeyListener);
InputBox.on(["keydown", "keyup", "keypress"], function(e){

	this._grid && this._grid.trigger(e.type, e);
});