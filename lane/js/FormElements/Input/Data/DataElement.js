var DataElement = function(){
	InputElement.call(this);
};
Util.extend(DataElement, InputElement);
DataElement.type = "DataElement";
DataElement.func = {};
DataElement.addProperty("dataSource",undefined,{type:"DataSource"});
DataElement.setDefault("value",undefined);

DataElement.func.dataSourceBeforeChanged = function(){
	this._v.dataSource && this._v.dataSource.removeListener("valueChanged",DataElement.prototype.updateValue,this);
};
DataElement.func.dataSourceChanged = function(){
	this._v.dataSource && this._v.dataSource.on("valueChanged",DataElement.prototype.updateValue,this);
	this.updateValue();
};

DataElement.prototype.updateValue = function(){
	this._v.dataSource && this.value(this._v.dataSource._v.value);
};

DataElement.prototype.valueChanged = function(){
	if (this._v.dataSource){
		this._v.dataSource.value(this._v.value);
	}
};

DataElement.on("dataSourceBeforeChanged", DataElement.func.dataSourceBeforeChanged);
DataElement.on("dataSourceChanged", DataElement.func.dataSourceChanged);
DataElement.on("valueChanged", DataElement.prototype.valueChanged);