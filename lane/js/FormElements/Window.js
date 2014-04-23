var Window = function() {
	FloatingContainer.call(this);
};
Util.extend(Window, FloatingContainer);
Window.type = "Window";
Window.func = {};
Window.buttons = {
	CLOSE:1,
	MINIMIZE:2,
	check:function(value){
		if (value != 1 && value != 2){
			throw new CoreException("Value: [" + value + "] is not in type Window.buttons");
		}
		return value;
	}
};
Window.addProperty("dragStarted", false);
Window.addProperty("openCentered", false);
Window.addProperty("draggable", true, {type:Types.boolean});
Window.addProperty("buttons", Window.buttons.CLOSE, {type:Window.buttons});
Window.addProperty("modal",false);
Window.prototype.checkButtons = function(){
	if(this._values.isDrawn){
		this._elements.minimizeButton && this._elements.minimizeButton.visible(this._values.buttons & Window.buttons.MINIMIZE);
		this._elements.closeButton && this._elements.closeButton.visible(this._values.buttons & Window.buttons.CLOSE);
	}
};
Window.prototype.close = function(){
	if (this.trigger("beforeClose") !==false){
		this.remove();
		this.trigger("closed");
	}
};
Window.func.afterDraw = function() {
	if (this.modal()){
		this._shutter = Util.createShutter({
			zIndex:this.zIndex()-1
		});
	}
	var my = this;
	var oldPosition = {};
	var dragStart = function() {
		if (!my.draggable()){
			return;
		}
		console.warn("drag started");
		var outer = my._values.outer;
		oldPosition.left = browser.mouseX();
		oldPosition.top = browser.mouseY();
		oldPosition.xOffset = browser.mouseX() - outer.left();
		oldPosition.yOffset = browser.mouseY() - outer.top();
		my.dragStarted(true);
	};
	a = this._elements.dragHandler;
	this._elements.dragHandler.on("mousedown", dragStart);
	this._dragStop = function() {
		console.log("mouseup");
		if (my.dragStarted()) {
			my.left(browser.mouseX() - oldPosition.xOffset);
			my.top(browser.mouseY() - oldPosition.yOffset);
			my.dragStarted(false);
		}
	};
	rootElement.on("mouseup", this._dragStop);
	this._move = function() {
		if (my._values.dragStarted) {
			my._values.outer.htmlElement.style.left = (browser.mouseX() - oldPosition.xOffset) + 'px';
			my._values.outer.htmlElement.style.top = (browser.mouseY() - oldPosition.yOffset) + 'px';
		}
	};
	rootElement.on("mousemove", this._move);
	
//	
//	buttons
//	
	this._elements.closeButton.on("click",function(){
		this.close();
	},this);
	this.checkButtons();
	this._values.outer.on("redrawed", function(){
		if (this._values.openCentered && !this.startTimer){
			this.startTimer = setTimeout(function(){
				my.left(rootElement.width()/2 - my.width()/2);
				my.top(rootElement.height()/2 - my.height()/2);
			},10);
		}
	},this);
};
Window.on("removed",function(){
	rootElement.removeListener("mouseup",this._dragStop);
	rootElement.removeListener("mousemove",this._move);
	if (this._shutter){
		this._shutter.remove();
	}
});

Window.on("keydown", function(e){
	var k = e.keyCode ? e.keyCode : e.charCode;
	if (k == 27) {
		this.close();
	}
});


Window.on("afterDraw", Window.func.afterDraw);
Window.on("buttonsChanged",Window.prototype.checkButtons);