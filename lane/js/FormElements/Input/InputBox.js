var InputBox = function() {
	InputElement.call(this);
};
Util.extend(InputBox, InputElement);
InputBox.type = "InputBox";
InputBox.setDefault("value", "");
InputBox.addProperty("password",false,{type:"boolean"});
InputBox.addProperty("values",[1],{type:"array"});
InputBox.func = {};
InputBox.func.afterDraw = function() {
	var my = this;
	this.updateValues();
	this._input = this._elements.input;
	//this._input.htmlElement.setAttribute("type",this._v.password?"password":"text");
	this._updateListeners();
	this.updatePassword();
	this.updateValueList();
};

InputBox.prototype.updateValues = function() {
	if (this._v.isDrawn && this._elements.input.htmlElement.value != this._v.value){
		this._elements.input.htmlElement.value = this._v.value;
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
InputBox.prototype.updateValueList = function(){
	if (this._v.values.length){
		if (!this._grid){
			this._grid = FormElement.build(InputBoxSkin.__grid,this._elements.gridContainer); 
		}
		var dataGrid = new DataGrid();
		dataGrid.columns(DataColumn.build([{
			   name:"field",
			   caption:"blablabla",
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
		console.log("h:",h);
		this._elements.gridContainer.height(h + 4);
	} else {
		this._grid && this._grid.remove();
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
InputBox.on("focusChanged", InputBox.prototype._updateValueListVisibility);
InputBox.on("afterDraw", InputBox.func.afterDraw);
InputBox.on("valueChanged", InputBox.prototype.updateValues);
InputBox.on("passwordChanged", InputBox.prototype.updatePassword);