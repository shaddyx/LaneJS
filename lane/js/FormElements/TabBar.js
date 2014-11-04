var TabBar = function() {
	Container.call(this);
	this.children().on("beforeAdd", this._beforeadd, this);
	this.children().on("added", this._added, this);
	this.children().on("removed", this._removed, this);
};
Util.extend(TabBar, Container);
TabBar.type = "TabBar";
TabBar.funcs = {};

TabBar.addProperty("selectedTab", false,{type:"Tab"});

TabBar.funcs.selectedTabChanged = function(tab){
	if (tab) {
		tab.selected(true);
	}
	this._refreshTabs(tab);
};

TabBar.prototype._beforeadd = function(tab){
	tab.hs(true);
	tab.vs(true);
	tab.tabBar(this);
	if (tab instanceof Tab){
		return true;
	} else {
		throw new Error("tabbar cant contain elements other then Tab");
		return false;
	}
};
TabBar.prototype._refreshTabs = function(activeTab){
	for (var k in this._v.children._data){
		var child = this._v.children._data[k];
		if (child != activeTab) {
			child.selected(false);
		}
	}
};
TabBar.prototype._added = function(tab){
	var my = this;
	var el = new BoxElement();
	el.build(TabButtonSkin[this._v.skin]);
	el.drawRec({target:this._elements.buttonContainer});
	el._elements.caption.caption(tab.caption());
	tab.button = el
	el.on("click", function(){
		tab.selected(true);
	});
	
	tab._selectedBeforeChanged = function(value){
		tab.button.setStyleClassRec(value ? "selected" : "notSelected");
		//this._setStyleClass(tab.button, value ? "selected" : "notSelected");
	};
	tab.on("selectedBeforeChanged", tab._selectedBeforeChanged);
	tab.on("tabVisibleChanged", function(val){
		el.visible(val);
	});
	el.visible(tab.tabVisible());
	if (!this.selectedTab()){
		this.selectedTab(tab);
	}
};

TabBar.prototype._removed = function(tab) {
	tab.button.remove();
	tab.removeListener("selectedBeforeChanged", tab._selectedBeforeChanged);
};

TabBar.on("selectedTabChanged", TabBar.funcs.selectedTabChanged);
//TabBar.on("collapsableChanged", TabBar.funcs.updateCollapsable);
//TabBar.addProperty("header", true,{type:"boolean"});
