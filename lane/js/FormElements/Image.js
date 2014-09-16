var Image = function() {
	Panel.call(this);
};
Util.extend(Image, Panel);
Image.type = "Image";
//Image.addProperty("img", false, {type:"image"});
/*Image.func = {};
Image.func.afterDraw = function() {
	if (this._v.isDrawn && this._elements.img){
		this._elements.img.backgroundImage(this._v.img);
	}
};
Image.on("afterDraw", Image.func.afterDraw);
Image.on("imgChanged", Image.func.afterDraw);*/


