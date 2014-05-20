/**
 * @returns first available parent node, with type BoxElement
 */
BoxElement.prototype.nextBoxParent = function() {
	if (this.parentNode) {
		return this.parent;
	} else {
		var htmlElement = this.htmlElement;
		do {
			htmlElement = htmlElement.parentNode;
		} while (htmlElement && !htmlElement.boxElement && htmlElement != document.body);
		if (htmlElement && htmlElement.boxElement) {
			return htmlElement.boxElement;
		}
	}
	return false;
};

BoxElement.prototype.propagateEvent = function(name, event) {
	/*
	 * if single parameter than we must extract parameters
	 */
	if (event == undefined) {
		event = name;
		name = event.type;
	}
	var result;
	if ((result = this.trigger(name, event)) !== false) {
		if (this.formElement && this.formElement._values.enabled) {
			result = this.formElement.trigger(name, event);
			if (result === false) {
				return false;
			}
		}
		var parentTarget = this.nextBoxParent();
		if (parentTarget instanceof BoxElement) {
			result = parentTarget.propagateEvent(name, event);
			if (result === false) {
				return false;
			}
		}
	}
	return result;
};

/**
 * finds an BoxElement from given event
 */
BoxElement.findElementFromEvent = function(e) {
	var target = e.srcElement || e.target;
	if (!target) {
		console.log("event", e, "has no target");
		return;
	}
	while (target && (!target.boxElement && target != window)) {
		target = target.parentNode;
	}
	return target && target.boxElement;
};
/**
 * propagates event to target function
 */
BoxElement.targetEventFunction = function(e) {
	var target = BoxElement.findElementFromEvent(e);
	if (target) {
		e.boxElement = target;
		return target.propagateEvent(e);
	}
};

BoxElement.copyEvent = function(e){
	var res = {};
	for (var k in e){
		res[k] = e[k];
	}
	return res;
};


Util.addListener(document.body, 'mousedown',BoxElement.targetEventFunction);
Util.addListener(document.body, 'mouseup',BoxElement.targetEventFunction);
Util.addListener(document.body, 'click',BoxElement.targetEventFunction);
Util.addListener(document.body, 'mouseout',BoxElement.targetEventFunction);
Util.addListener(document.body, 'mouseover',BoxElement.targetEventFunction);
Util.addListener(document.body, 'mousemove',BoxElement.targetEventFunction);

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
    	var ev = BoxElement.copyEvent(e);
    	ev.type = "contextMenu";
    	var res = BoxElement.targetEventFunction(ev);
        if (res === false) {
        	e.preventDefault();
        }
        return res;
    }, false);
} else {
    document.attachEvent('oncontextmenu', function(e) {
    	e = BoxElement.copyEvent(e);
    	e.type = "contextMenu";
    	var res = BoxElement.targetEventFunction(e);
        if (res === false) {
        	window.event.returnValue = false;
        }
        return res;
    });
}
