var RadioButtonGroup = function() {
	Container.call(this);
	this._dataSource = new DataSource();
	var my = this;
	this._dataSource.on("valueChanged", function(value){
		console.log("value is:", value);
		my.value(value);
	}, this);
	this._v.children.on("added",this._added, this);
};
Util.extend(RadioButtonGroup, Container);
RadioButtonGroup.type = "RadioButtonGroup";
RadioButtonGroup.addProperty("value", false);

RadioButtonGroup.prototype._added = function(element) {
	element.dataSource(this._dataSource);
};
RadioButtonGroup.on("valueChanged", function(value){
	this._dataSource.value(value);
});