var Context = function(){
    BaseObject.call(this);
    this.instances = {};
    this.dependencies = {}
};

Util.extend(Context, BaseObject);
Context.type = "Context";
Context.prototype.addDependency = function(dependency){
    if (this.dependencies[dependency.name] != undefined){
        debugger;
        throw new Error("Dependency with name:" + dependency.name + " already exists");
    }
    this.dependencies[dependency.name] = dependency;
};

Context.prototype.getDependency = function(name){
    if (!this.dependencies[name]){
        debugger;
        throw new Error("Error, dependency with name:" + name + " is not found, in:" + this);
    }
    return this.dependencies[name];
};

Context.prototype.getDependencyInstance = function(name){
    var dep = this.getDependency(name);
    if (dep.singleton){
        if (!this.instances[name]){
            this.instances[name] = dep.getInstance(this);
        }
        return this.instances[name];
    } else {
        return this.getDependency(name).getInstance(this);
    }
};

Context.prototype.initDependency = function(name){
    var dep = this.getDependency(name);
    var instance = this.getDependencyInstance(name);
    var args = [];
    for (var k in dep.__deps){
        args.push(this.getDependencyInstance(dep.__deps[k]));
    }
    console.log("initializing:", name);
    instance.initFunction.apply(instance, args);
    return instance;
};

Context.prototype.init = function(){
    for (var name in this.dependencies){
        var dep = this.getDependencyInstance(name);
        console.log("instance:", dep);
    }
    for (var name in this.instances){
        this.initDependency(name);
    }
    for (var name in this.instances){
        this.instances[name].trigger("initComplete");
    }
};
