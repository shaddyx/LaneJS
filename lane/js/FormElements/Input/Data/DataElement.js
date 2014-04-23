var DataElement = function(){
	InputElement.call(this);
};
Util.extend(DataElement, InputElement);
DataElement.type = "DataElement";
DataElement.func = {};
DataElement.addProperty("dataSource",undefined,{type:"DataSource"});
DataElement.setDefault("value",undefined);

DataElement.func.dataSourceBeforeChanged = function(){
	this._values.dataSource && this._values.dataSource.removeListener("valueChanged",DataElement.prototype.updateValue,this);
};
DataElement.func.dataSourceChanged = function(){
	this._values.dataSource && this._values.dataSource.on("valueChanged",DataElement.prototype.updateValue,this);
	this.updateValue();
};

DataElement.prototype.updateValue = function(){
	this._values.dataSource && this.value(this._values.dataSource._values.value);
};

DataElement.prototype.valueChanged = function(){
	if (this._values.dataSource){
		this._values.dataSource.value(this._values.value);
	}
}

DataElement.on("dataSourceBeforeChanged", DataElement.func.dataSourceBeforeChanged);
DataElement.on("dataSourceChanged", DataElement.func.dataSourceChanged);
DataElement.on("valueChanged", DataElement.prototype.valueChanged);