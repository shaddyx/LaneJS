var Image = function() {
	Panel.call(this);
	this.type = "Image";
};
Util.extend(Image, Panel);
//Image.addProperty("img", false, {type:"image"});
/*Image.func = {};
Image.func.afterDraw = function() {
	if (this._values.isDrawn && this._elements.img){
		this._elements.img.backgroundImage(this._values.img);
	}
};
Image.on("afterDraw", Image.func.afterDraw);
Image.on("imgChanged", Image.func.afterDraw);*/


