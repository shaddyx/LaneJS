Dialogs = {
	answers:{
		cancel:0,
		ok:1
	},
	confirm: function(caption, text, callBack){
		var struct = Util.cloneObject(DialogsSkin.confirm);
		struct.caption = caption;
		var win = FormElement.build(struct, rootElement)
		win.elements.text.caption(text);
		var calledCallBack = false;
		win.elements.okButton.on("click", function(){
			calledCallBack = true;
			callBack(this.answers.ok);
			win.close();
		},this);
		win.elements.cancelButton.on("click", function(){
			calledCallBack = true;
			callBack(this.answers.cancel);
			win.close();
		},this);
		
		win.on("closed", function(){
			if(!calledCallBack) {
				calledCallBack = true;
				callBack(this.answers.cancel);
			}
			
		},this);
	}
}