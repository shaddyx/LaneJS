/*
 * Box element
 */
var elements = {};
var BoxElement = function(params){
	if (!params){
		params = {};
	}
	BaseObject.call(this);

	/*
	 * generates unique id of element
	 */
	this.id = this._baseClass.uniqId++;
	this.params = params;
	elements[this.id] = this;
	this._applyBefore = {};
	this._applyAfter = {};
	this._vertOverflow = false;
	this._horzOverflow = false;
	//this._alignDelta = 0;
	/*this._hDelta = 0;
	this._vDelta = 0;*/
	this._marginDx = 0;
	this._marginDy = 0;
	this._captionWidth = 0;
	this._captionHeight = 0;
	if (this._baseClass._defaultApplyBefore){
		this._baseClass._applyBefore[this.id] = this;
		var defaultBefore = this._baseClass._defaultApplyBefore;
		for (var i = 0; i < defaultBefore.length; i ++){
			this._applyBefore[defaultBefore[i]] = 1;
		}
	}
	if (this._baseClass._defaultApplyAfter){
		this._baseClass._applyAfter[this.id] = this;
		var defaultAfter = this._baseClass._defaultApplyAfter;
		for (var i = 0; i < defaultAfter.length; i ++){
			this._applyAfter[defaultAfter[i]] = 1;
		}
	}
		
	/*
	 * creates an DOM element
	 */
	this.htmlElement = document.createElement(params.tag || 'div');
	if (params.css){
		
		this.htmlElement.style.cssText = params.css;
	}
	this.htmlElement.boxElement = this;
	this.htmlElement.setAttribute("id",this.id);

	/*
	 * for standard element we don't need create 2 elements
	 */
	this.htmlInnerElement = this.htmlElement;
	this.parent = false;
	this.c = [];
	this._elements = {};
	this._baseClass.initGlobalRedraw();
	this.__updateHorizontal();
	this._marginDx = 0;
	this._marginDy = 0;
};

Util.extend(BoxElement,BaseObject);
BoxElement.type = "BoxElement";

BoxElement.virtualizeBody = function(){
	if (!document.body.boxElement){
		var a = new BoxElement();
		
		a.virtualize({target:document.body});
		document.body.style.position = "absolute";
		document.body.style.overflow = "hidden";
		document.body.style.padding = "0";
		document.body.style.margin = "0";
		browser.on("sizeChanged",function(){
			a.width(this.width());
			a.height(this.height());
		});
		document.body.boxElement = a;
	}
	return document.body.boxElement;
};

BoxElement.__redrawInitiators = {};
BoxElement.__listeners = {};
BoxElement.__ocache = {};
BoxElement.__toStretchCache = {};
BoxElement.__nonStretchCache = {};
/**
 * reDraw mode for Box element 
 */
BoxElement.uniqId = 0;
BoxElement.REDRAW_MODE = {
	none:0
	,applyOnly:1
	,applyBefore:2
	,full:10
	,redrawParent:11
	,fullAndRenderMe:12
	,render:13
	,check:function(value){
		if (value == 0 ||
			value == 1 ||
			value == 2 ||
			value == 10 ||
			value == 11 ||
			value == 12
		) {
			return value;
		}
		throw new CoreException("Value: [" + value + "] is not in type BoxElement.REDRAW_MODE");
	}
};
BoxElement.OVERFLOW_MODE = {
	none:0
	,hidden:1
	,auto:2
	,overflowX:3
	,overflowY:4
	,hiddenX:5
	,hiddenY:6
	,check:function(value){
		if (value == 0 ||
				value == 1 ||
				value == 2 ||
				value == 3 ||
				value == 4 ||
				value == 5 ||
				value == 6
			) {
				return value;
			}
			throw new CoreException("Value: [" + value + "] is not in type BoxElement.OVERFLOW_MODE");
	}
};
BoxElement.PROPERTY_TYPE = {
	none:0
	,array:1
	,string:2
	,check:function(value){
		if (value == 0 ||
				value == 1 ||
				value == 2 
				
			) {
				return value;
			}
			throw new CoreException("Value: [" + value + "] is not in type BoxElement.PROPERTY_TYPE");
	}
};
BoxElement.ALIGN = {
	begin:0,
	middle:1,
	end:2,
	check:function(value){
		if (value == 0 ||
				value == 1 ||
				value == 2 
				
			) {
				return value;
			}
			throw new CoreException("Value: [" + value + "] is not in type BoxElement.ALIGN");
	}
};

/*
 * cache maps
 */
BoxElement._applyBefore = {};
BoxElement._applyAfter = {};
BoxElement._reDrawMap = {};
BoxElement._renderMap = {};
BoxElement._defaultApplyBefore = false;
BoxElement._defaultApplyAfter = false;

BoxElement.addProperty = function(name,defValue,props){
	var props = props || {};
	var html = props.html;
	var rm = props.rm;
	var rmCache = BoxElement.REDRAW_MODE;
	BaseObject.addProperty.call(this, name, defValue);
	this._properties[name].html = props.html;
	this._properties[name].rm = rm;
	this._properties[name].type = props.type || BoxElement.PROPERTY_TYPE.none;
	this._properties[name].htmlEnding = props.htmlEnding;
	if (props.defaultApply){
		if (props.rm === BoxElement.REDRAW_MODE.applyBefore) {
			if (!BoxElement._defaultApplyBefore){
				BoxElement._defaultApplyBefore = []; 
			} 
			this._defaultApplyBefore.push(name);
		} else {
			if (!BoxElement._defaultApplyAfter){
				BoxElement._defaultApplyAfter = []; 
			} 
			this._defaultApplyAfter.push(name);
		}
	}
	
	/*
	 * property wrapper
	 */
	var o = this.prototype[name]; 
	this.prototype[name] = function(value){
		var changed = value != this._v[name];
		if (!changed && props.type == BoxElement.PROPERTY_TYPE.array){
			for (var i = 0; i < value.length; i++){
				if (value[i] != this._v[name][i]){
					changed = true;
					break;
				}
			}
		}
		if (value != undefined && changed){
			if (rm){
				/*
				 * adding to reDraw queue
				 */
				switch(rm){
					case rmCache.applyBefore:
						this._baseClass._applyBefore[this.id] = this;
						this._applyBefore[name] = 1;
						this.addToRedrawQueue();
						break;
					case rmCache.full:
						this._baseClass._applyAfter[this.id] = this;
						if (html) {
							this._applyAfter[name] = 1;
						}
						this.addToRedrawQueue();
						this.addToRenderQueue();
						break;
					case rmCache.redrawParent:
						this._baseClass._applyAfter[this.id] = this;
						if (html) {
							this._applyAfter[name] = 1;
						}
						if (this.parent){
							if (!this._baseClass.__redrawInitiators[name]){
								 this._baseClass.__redrawInitiators[name] = 0;
							}
							this._baseClass.__redrawInitiators[name] ++;
							this.parent.addToRedrawQueue();
							this.addToRenderQueue();
						}
						break;
					case rmCache.applyOnly:
						this._baseClass._applyAfter[this.id] = this;
						this._applyAfter[name] = 1;
						this._baseClass.initGlobalRedraw();
						break;
					case rmCache.render:
						this.addToRenderQueue(true);
						break;
					case rmCache.fullAndRenderMe:
						this._baseClass._applyAfter[this.id] = this;
						if (html) {
							this._applyAfter[name] = 1;
						}
						
						if (!this._baseClass.__redrawInitiators[name]){
							 this._baseClass.__redrawInitiators[name] = 0;
						}
						this._baseClass.__redrawInitiators[name] ++;
						
						this.addToRedrawQueue();
						this.addToRenderQueue(true);
						break;
				}
				
			}
			props.recalcDxDy && this.__recalcDxDy();
		}
		return o.call(this,value);
	};
};
BoxElement.prototype.getDebugInfo = function(){
	var obj = {
		w:this._v.width
		,h:this._v.height
		,hs:this._v.hs
		,vs:this._v.vs
		,vMinWidth:this._v.vMinWidth
		,vMinHeight:this._v.vMinHeight
		,c:[]
	};
	for(var k in this.c){
		obj.c.push(this.c[k].getDebugInfo());
	}
	return obj;
};

BoxElement.addPropertyApplyer = function(name,func){
	this._properties[name].applyer = func;
};
BoxElement.addProperty("_isDrawn",false);
BoxElement.addProperty("_virtualized",false);
BoxElement.addProperty("name",false);
/*
 * distance,between width/height and innerWidth/innerHeight
 */
BoxElement.addProperty("_dx",0);
BoxElement.addProperty("_dy",0);
BoxElement.addProperty("_vMargin",[0,0,0,0],{rm:BoxElement.REDRAW_MODE.full, type:BoxElement.PROPERTY_TYPE.array});
BoxElement.addProperty("_hDelta",0,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("_vDelta",0,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("_alignDelta",0,{rm:BoxElement.REDRAW_MODE.full});
/*
 * reDraw properties
 */
BoxElement.addProperty("minWidth",0);
BoxElement.addProperty("minHeight",0);
BoxElement.addProperty("vMinWidth",0);
BoxElement.addProperty("vMinHeight",0);

/*
 *
 */
BoxElement.addProperty("caption","",{html:true, rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("floating",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("visible",true,{html:true, rm:BoxElement.REDRAW_MODE.redrawParent, defaultApply:true});
BoxElement.addProperty("left",0,{html:true, rm:BoxElement.REDRAW_MODE.applyOnly, htmlEnding:'px',defaultApply:true});
BoxElement.addProperty("top",0,{html:true, rm:BoxElement.REDRAW_MODE.applyOnly, htmlEnding:'px',defaultApply:true});
BoxElement.addProperty("scrollLeft",0,{html:true, rm:BoxElement.REDRAW_MODE.render, htmlEnding:'px',defaultApply:true});
BoxElement.addProperty("scrollTop",0,{html:true, rm:BoxElement.REDRAW_MODE.render, htmlEnding:'px',defaultApply:true});
BoxElement.addProperty("hs",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("vs",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("hCompress",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("vCompress",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("vAlign",BoxElement.ALIGN.begin,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("hAlign",BoxElement.ALIGN.begin,{html:true, rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("width",0,{html:true, rm:BoxElement.REDRAW_MODE.redrawParent,htmlEnding:'px'});
BoxElement.addProperty("sizeRatio",100,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("height",0,{html:true, rm:BoxElement.REDRAW_MODE.redrawParent,htmlEnding:'px'});
BoxElement.addProperty("innerWidth",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("innerHeight",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("lineHeight",15,{html:true, rm:BoxElement.REDRAW_MODE.full,defaultApply:true, htmlEnding:'px'});
BoxElement.addProperty("horizontal",false,{rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("fontColor","none",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("textDecoration","none",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("backgroundColor","transparent",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("backgroundImage","none",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});		
BoxElement.addProperty("backgroundPosition","",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("backgroundRepeat","",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("cursor",false,{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("fontWeight","normal",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly,defaultApply:true});
BoxElement.addProperty("fontSize","13px",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly,defaultApply:true});
BoxElement.addProperty("fontFamily","Arial",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly,defaultApply:true});
BoxElement.addProperty("color","",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("cursor",false,{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("selectable",false,{html:true,rm:BoxElement.REDRAW_MODE.applyOnly,defaultApply:true});		//,defaultApply:true
BoxElement.addProperty("borderWidth",[0,0,0,0],{html:true,rm:BoxElement.REDRAW_MODE.full, type:BoxElement.PROPERTY_TYPE.array, defaultApply:true, recalcDxDy:true});
BoxElement.addProperty("padding",[0,0,0,0],{html:true,rm:BoxElement.REDRAW_MODE.fullAndRenderMe, type:BoxElement.PROPERTY_TYPE.array, recalcDxDy:true});
BoxElement.addProperty("margin",[0,0,0,0],{rm:BoxElement.REDRAW_MODE.full, type:BoxElement.PROPERTY_TYPE.array});
BoxElement.addProperty("borderRadius",[0,0,0,0],{html:true,rm:BoxElement.REDRAW_MODE.applyOnly, type:BoxElement.PROPERTY_TYPE.array});
BoxElement.addProperty("borderColor","#000",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("borderStyle","solid",{html:true,rm:BoxElement.REDRAW_MODE.applyOnly, defaultApply:true});
BoxElement.addProperty("overflow",BoxElement.OVERFLOW_MODE.none,{html:true, rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("elementType",false,{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("zIndex",0,{html:true,rm:BoxElement.REDRAW_MODE.applyOnly, defaultApply:true});
BoxElement.addProperty("opacity",1,{html:true,rm:BoxElement.REDRAW_MODE.applyOnly});
BoxElement.addProperty("spacing", 0, {rm:BoxElement.REDRAW_MODE.full});
BoxElement.addProperty("hovered",false);
BoxElement.addProperty("style",false);
BoxElement.addProperty("styleClass",false);
BoxElement.addProperty("relativity",false);
BoxElement.addProperty("pressed",false);
BoxElement.addProperty("style",false);
BoxElement.addProperty("draggable",false);


