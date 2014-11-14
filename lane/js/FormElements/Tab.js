var Tab = function(){
	Container.call(this);
};
Util.extend(Tab,Container);
Tab.type = "Tab";
Tab.funcs = {};

Tab.setDefault("visible", false);
Tab.prototype.selected = Tab.addProperty("selected", false,{type:"boolean"});
Tab.prototype.tabBar = Tab.addProperty("tabBar", false,{type:"TabBar"});
Tab.prototype.tabVisible = Tab.addProperty("tabVisible", true,{type:"boolean"});

Tab.funcs.selectedChanged = function(){
	this.visible(this._v.selected);
	if (this._v.selected) {
		this.tabBar().selectedTab(this);
	}
};
Tab.on("selectedChanged", Tab.funcs.selectedChanged);