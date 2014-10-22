/**
 * @@@dependsOn: Grid
 */
Grid.prototype.keyPressed = function(evt){
	var key = evt.keyCode || evt.which;
	console.log("Key pressed:", key);
	switch (key) {
		// up
		case 38:
			if (this._v.data.visibleUp()){
				this._v.data.move(-1);
				this.render();
			}
			break;
		// down
		case 40:
			if (this._v.data.visibleDown() > this._visibleRows){
				this._v.data.move(1);
				this.render();
			}

			break;
		//
		//	pageUp
		//
		case 33:
			var count = Math.min(this._visibleRows, this._v.data.visibleUp());
			this._v.data.move( -count);
			this.render();
			break;
		//
		//	pageDown
		//
		case 34:
			var count = Math.min(this._visibleRows, this._v.data.visibleDown() - this._visibleRows);
			this._v.data.move(count);
			this.render();
			break;
	}
};

Grid.on("keydown", Grid.prototype.keyPressed);