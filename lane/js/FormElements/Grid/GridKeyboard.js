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
			try{
				this._v.data.move(-1);
			} catch (e){
				if (e instanceof DataOutOfRangeError){
					console.log("Data is out of range");
				} else {
					throw e;
				}
			}
			this.render();
			break;
			break;
		// down
		case 40:
			try{
				this._v.data.move(1);
			} catch (e){
				if (e instanceof DataOutOfRangeError){
					console.log("Data is out of range");
				} else {
					throw e;
				}
			}
			this.render();
			break;
			
		case 33:
			try {
				this._v.data.move(- (this._rows.length - 1));
			} catch (e){
				if (e instanceof DataOutOfRangeError){
					console.log("Data is out of range");
				} else {
					throw e;
				}
			}
			
			this.render();
			break;
		case 34:
			try{
				
				this._v.data.move(this._rows.length - 1);
			} catch (e){
				if (e instanceof DataOutOfRangeError){
					console.log("Data is out of range");
				} else {
					throw e;
				}
			}
			this.render();
			break;
	}
};

Grid.on("keydown", Grid.prototype.keyPressed);