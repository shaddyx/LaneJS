/**
 * Created by shaddy on 28.10.15.
 */
var Dependency = function(context, params){
    this.context = context;
    this.singleton = params.singleton;
    this.name = params.name;
    this.constructor = params.constructor;
    this.params = params;
    this.__deps = params.args ? Dependency.__getDependencyNames(params.args) : [];
    this.__initFunc = params.args ? Dependency.__getFunc(params.args):function(){};
};

Util.extend(Dependency, BaseObject);
Dependency.type = "Dependency";

Dependency.prototype.getInstance = function(context){
    var scope = new this.constructor();
    scope.initFunction = this.__initFunc;
    scope.name = this.name;
    scope.context = context;
    scope.dependency = this;
    return scope;
};

Dependency.__getDependencyNames = function(args){
    var deps = [];
    for (var i = 0; i < args.length; i++){
        if (typeof(args[i]) == "string"){
            deps.push(args[i]);
        } else {
            break;
        }
    }
    return deps;
};

Dependency.__getFunc = function(args){
    for (var i = 0; i < args.length; i++){
        if (typeof(args[i]) == "function"){
            return args[i];
            break;
        }
    }
    return function(){};
};

