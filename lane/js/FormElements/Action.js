/**
 *
 * @constructor
 */
var Action = function() {
	BaseObject.call(this);
};
Util.extend(Action, BaseObject);
Action.type = "Action";

Action.prototype.perform = function(){
	this.trigger("onPerform", this._v.name);
};

Action.addProperty("img", false);
Action.addProperty("caption", false);
Action.addProperty("name", false);
Action.addProperty("visible", true);
