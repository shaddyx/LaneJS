/**
 * @@@dependsOn: Grid
 */
Grid.prototype.keyPressed = function(evt){
	var key = evt.keyCode || evt.which;
	console.log("Key pressed:", key);
	switch (key) {
		// up
		case 38:
			//if (this._v.data.visibleDown)
			this._v.data.move(-1);
			this.render();
			break;
			break;
		// down
		case 40:
			this._v.data.move(1);
			this.render();
			break;
			
		case 33:
			this._v.data.move(- (this._rows.length - 1));
			this.render();
			break;
		case 34:
			this._v.data.move(this._rows.length - 1);
			this.render();
			break;
			
	}
};

Grid.on("keydown", Grid.prototype.keyPressed);