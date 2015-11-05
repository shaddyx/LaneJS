/**
 * Created by shaddy on 23.10.15.
 */
var Application = function(){
    Context.apply(this, arguments);
};

Util.extend(Application, Context);
Application.type = "Application";

Application.create = function(name, initFunc){
    return (new Application(name, initFunc));
};

Application.prototype.service = function(name, args){
    return this.addDependency(new Dependency(this, {
        name:name,
        args:args,
        constructor:Service,
        singleton:true
    }));
};

Application.prototype.controller = function(name, args){
    return this.addDependency(new Dependency(this, {
        name:name,
        args:args,
        constructor:Controller,
        singleton:false
    }));
};


