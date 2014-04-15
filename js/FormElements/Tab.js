var Tab = function(){
	Container.call(this);
	this.type = "Tab";
};
Util.extend(Tab,Container);
Tab.funcs = {};

Tab.setDefault("visible", false);
Tab.addProperty("selected", false,{type:"Tab"});
Tab.addProperty("tabBar", false,{type:"TabBar"});

Tab.funcs.selectedChanged = function(){
	this.visible(this._values.selected);
	if (this._values.selected) {
		this.tabBar().selectedTab(this);
	}
};
Tab.on("selectedChanged", Tab.funcs.selectedChanged);