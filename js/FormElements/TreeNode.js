var TreeNode = function(params){
	BaseObject.call(this);
	this.tree = params.tree;
	this.c = [];
	this.id = params.id;
	this.parent = params.parent;
	if (!params.root) {
		params.opened = !!params.opened;
		this.htmlElement = document.createElement("li");
		this.htmlElement.setAttribute("id", "cell_" + this.id);
		this.htmlElement.className = "Node ExpandLeaf isLast";
		this.htmlElement.element = this;
		this.expandElement = this._createNode(this.htmlElement, "div", "Expand", {
			attributes : {
				expander : "1"
			}
		});
		this.contentElement = this._createNode(this.htmlElement, "div", "Content NotSelected");
		this.checkboxElement = this._createNode(this.contentElement, "span", "CheckBox", {
			css : {
				display : "none"
			},
			attributes : {
				checker:"true"
			}
		});
		this.imageElement = this._createNode(this.contentElement, "span", "Image", {
			css : {
				display : "none"
			}
		});
		
		this.textElement = this._createNode(this.contentElement, "span", "Text");
		this.text(params.text);
		this.opened(params.opened);
		params.img && this.img(params.img);
		this.canBeChecked(params.canBeChecked);
		this.checked(params.checked);
	} else {
		this.htmlElement = params.htmlElement;
	}
	this.type = "TreeNode";
};

Util.extend(TreeNode, BaseObject);

TreeNode.addProperty("text", undefined);
TreeNode.addProperty("img", undefined);
TreeNode.addProperty("opened", undefined);
TreeNode.addProperty("last", false);
TreeNode.addProperty("bgColor", false);
TreeNode.addProperty("selected", false);
TreeNode.addProperty("checked", false);
TreeNode.addProperty("canBeChecked", false);
TreeNode.on("canBeCheckedChanged", function(value) {
	this.checkboxElement.style.display = value?"block":"none";
});

TreeNode.on("checkedChanged", function(value) {
	var cls = this.checkboxElement.className;
	cls = cls.split("Checked").join('');
	this.checkboxElement.className = cls + (value ? " Checked" : "");	
});

TreeNode.on("bgColorChanged", function(bgColor) {
	if (bgColor) {
		this.htmlElement.style.backgroundColor =  bgColor;
	} else {
		this.htmlElement.style.backgroundColor = "inherit";
	}
});

TreeNode.on("selectedChanged", function(selected) {
	if (selected) {
		this.tree.selectedNode(this);
	}
	var cls = this.textElement.className;
	cls = cls.split("Selected").join('');
	this.textElement.className = cls + (selected ? " Selected" : "");	
});


TreeNode.on("textChanged", function(text){
	return this.textElement.innerHTML = text;
});

TreeNode.on("openedChanged",function(opened){
	var cls = this.htmlElement.className;
	cls = cls.split("ExpandClosed").join('');
	cls = cls.split("ExpandOpen").join('');
	this.htmlElement.className = cls + (opened ? " ExpandOpen" : " ExpandClosed");
});

TreeNode.on("imgChanged",function(img){
	this.imageElement.style.display = img ? "block" : "none";
	if (img) {
		this.imageElement.style.backgroundImage = "url(" + browser._values.imageBase + img + ")";
	} else {
		this.imageElement.style.backgroundImage = "";
	}
});

TreeNode.on("lastChanged", function(last) {
	var cls = this.htmlElement.className.split("isLast").join("");
	if (last) {
		cls += " isLast";
	}
	this.htmlElement.className = cls;
});

TreeNode.prototype._partition = function( left, right) {
	var items = this.c;
    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;
    while (i <= j) {

        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            items[i].swap(items[j]);
            i++;
            j--;
        }
    }
    return i;
};
TreeNode.prototype._qsort = function (data, compare, maxNestedLevel) {
	maxNestedLevel = maxNestedLevel || 100;
	this._qsNestedLvl = maxNestedLevel;
	var my = this;
    var a = data,
    f_compare = compare,
    f_change  = function(a,i,j){
    	a[i].swap(a[j]);
    };

	if (!a instanceof Array) { 
	    return undefined;
	};
	if (f_compare == undefined) { 
	    f_compare = function(a, b) {return ((a == b) ? 0 : ((a > b) ? 1 : -1));};
	};

	var qs = function (l, r)  {
		my._qsNestedLvl --;
		if (my._qsNestedLvl <= 0) {
			return;
		}
	    var i = l,
	        j = r,
	        x = a[Math.floor(Math.random()*(r-l+1))+l];
	
	    while(i <= j) {
	        while(f_compare(a[i], x) == -1) {i++;}
	        while(f_compare(a[j], x) == 1) {j--;}
	        if(i <= j) {f_change(a, i++, j--);}
	    };
	    if(l < j) {qs(l, j);}
	    if(i < r) {qs(i, r);}
	    my._qsNestedLvl ++;
	};
	
	qs(0, a.length-1);
};

TreeNode.prototype.sort = function(cmpFunc, maxNestedLevel){
	for (var i = 0; i < this.c.length; i++) {
		this.c[i].sort(cmpFunc, maxNestedLevel);
	}	
	this._qsort(this.c, cmpFunc, maxNestedLevel);
};


TreeNode.prototype._createNode = function(parent, type, className, params) {
	params = params || {};
	var node = document.createElement(type);
	node.className = className;
	parent.appendChild(node);
	if (params.attributes) {
		for ( var k in params.attributes) {
			node.setAttribute(k, params.attributes[k]);
		}
	}
	if (params.css) {
		for ( var k in params.css) {
			node.style[k] = params.css[k];
		}
	}
	return node;
};

TreeNode.prototype.swap = function(element) {
	if (element.parent != this.parent) {
		throw new Error("You can only swap elements with same parent");
	}
	var temp = this.parent.c[this.index];
	this.parent.c[this.index] = element;
	this.parent.c[element.index] = temp;
	try{
		Util.swapDomElements(this.htmlElement, element.htmlElement);
	} catch(e){
		console.error("Swap failed!", e);
	}
	
	this.parent.refresh();
};

TreeNode.prototype.collapseAll = function(){
	this.enumerate(function(){
		this.opened(false);
	});
};

TreeNode.prototype.expandAll = function(){
	this.enumerate(function(){
		this.opened(true);
	});
};

TreeNode.prototype.checkAll = function(mode){
	this.enumerate(function(){
		if (this.canBeChecked()){
			this.checked(mode);
		}
	});
};

TreeNode.prototype.enumerate = function(callBack, opts){
	if (!opts){
		opts = {};
	}
	for (var k in this.c) {
		callBack.call(this.c[k], this.c[k]);
		if (opts.recursive !== false) {
			this.c[k].enumerate(callBack, opts);
		}
	}
	
}
TreeNode.prototype.refresh = function() {
	this.tree.parity = !this.tree.parity;
	
	for ( var k in this.c) {
		if (k != this.c.length - 1) {
			if (this.c[k]._values.last) {
				this.c[k].last(false);
			}
		} else {
			this.c[k].last(true);
		}
		this.c[k].index = k;
	}
};
/**
 * inserts a node into the tree
 * @param childNode
 */
TreeNode.prototype.addChild = function(childNode) {
	if (!this.childContainer) {
		this.childContainer = document.createElement("ul");
		this.childContainer.className = "Container";
		this.htmlElement.appendChild(this.childContainer);
	}
	this.childContainer.appendChild(childNode.htmlElement);
	this.c.push(childNode);
	var cls = this.htmlElement.className;
	cls = cls.split("ExpandLeaf").join('');
	this.htmlElement.className = cls;
	childNode.parent = this;
	this.refresh();
};

TreeNode.prototype.getNext = function(){
	if (this.parent){
		var found = false;
		for (var k in this.parent.c){
			if (this.parent.c[k] == this){
				found = k;
				break;
			}
		}
		
		if (found !== false){
			if (this.parent.c[parseInt(k) + 1]) {
				return this.parent.c[parseInt(k) + 1];
			} else {
				return this.parent.getNext();
			}
		}
	}
};


TreeNode.prototype.getPrev = function(){
	if (this.parent){
		var found = false;
		for (var k in this.parent.c){
			if (this.parent.c[k] == this){
				found = k;
				break;
			}
		}
		if (found !== false){
			if (k != 0){
				return this.parent.c[k - 1];
			} else {
				return this.parent;
			}
		}
	}
};
TreeNode.prototype.remove = function () {
	while (this.c.length) {
			this.c[0].remove(true);
	}
	this.c.length = 0;
	this.htmlElement.parentNode.removeChild(this.htmlElement);
	this.tree.trigger("beforeRemove", this);
	for (var k in this.parent.c){
		if (this.parent.c[k] == this){
			this.parent.c.splice(k,1);
			return;
		}
	}
};