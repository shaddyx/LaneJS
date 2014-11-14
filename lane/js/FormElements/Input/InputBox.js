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
	this.updateValues();
	this._input = this._elements.input;
	this._updateListeners();
	this.updatePassword();
	this.updateValueList();
	this._updateEditable();
};

InputBox.prototype.updateValues = function() {
	if (this._v.isDrawn && this._elements.input.htmlElement.value != this._v.value){
		this._elements.input.htmlElement.value = this._v.value.toString();
	}
};
InputBox.prototype._updateListeners = function(){
	var my = this;
	if (browser.ie && parseInt(browser.version) < 10){
		Util.addListener(this._elements.input.htmlElement,"keyup", function(e) {
			var me = this;
			setTimeout(function(){
	    		return my.trigger("input", me.value);
	    	},0);
		});
	} else {
		Util.addListener(this._elements.input.htmlElement, "input", function(e){
			return my.trigger("input", this.value);
		});
	}
	
	Util.addListener(this._elements.input.htmlElement, "keyup", function(){
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
};

InputBox.prototype.updateValueList = function(){
	if (this._v.values.length){
		this.editable(false);
		if (!this._grid){
			/** @type Grid */
			this._grid = FormElement.build(InputBoxSkin.__grid,this._elements.gridContainer);
			this._grid.on("cellClicked", this._itemSelected, this);
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
InputBox.prototype._updateValueListVisibility = function(){
	this._elements.gridContainer.visible(this._v.focus && this._v.values.length);
};
InputBox.prototype.updatePassword = function(){
	if (this._v.isDrawn) {
		var old = this._input.htmlElement;
		var newValue = this._v.password?"password":"text";
		if (old.getAttribute("type") != newValue){
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
			this._input.htmlElement.setAttribute("readonly","");
		} else {
			this._input.htmlElement.removeAttribute("readonly");
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
		debugger;
		this.values(this._v.dataType.enumerable);
	}
};

InputBox.on("focusChanged", InputBox.prototype._updateValueListVisibility);
InputBox.on("afterDraw", InputBox.func.afterDraw);
InputBox.on("valueChanged", InputBox.prototype.updateValues);
InputBox.on("passwordChanged", InputBox.prototype.updatePassword);
InputBox.on("editable", InputBox.prototype._updateEditable);
InputBox.on("dataTypeChanged", InputBox.prototype._dataTypeChanged);
InputBox.on("dataTypeBeforeChanged", InputBox.prototype._dataTypeBeforeChanged);