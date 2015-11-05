/**
 * Created by shaddy on 28.10.15.
 */
var Scope = function(){
    BaseObject.call(this);
    this.destroyed = false;
};

Util.extend(Scope, BaseObject);
Scope.type = "Scope";

Scope.prototype.destroy = function(){
    if (!this.destroyed){
        this.destroyed = true;
        this.trigger("destroy");
    }
};
Scope.on("destroy", function(){
    this.destroyed = true;
});