/**
 * Menu item
 * @constructor
 */
var MenuItem = function(){
	FormElement.call(this);
};
Util.extend(MenuItem,FormElement);
MenuItem.type = "MenuItem";
MenuItem.prototype.img = MenuItem.addProperty("img", false, {type:"image"});
MenuItem.setDefault("hs",true);
MenuItem.func = {};
MenuItem.func.afterDraw = function() {
	var my = this;
	this._v.outer.on("click",function(){
		this.enumParents(function(element){
			if (element instanceof PopupMenu){
				element.trigger("menuItemPressed", my);
			}
		});
	},this);
	this.applyImg();
};
MenuItem.prototype.applyImg = function(){
	if (this._v.isDrawn && this._elements.img){
		this._elements.img.backgroundImage(this._v.img);
	}
};

MenuItem.on("imgChanged", MenuItem.prototype.applyImg);

MenuItem.on("afterDraw", MenuItem.func.afterDraw);