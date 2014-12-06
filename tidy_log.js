var tidyLog = {};

tidyLog.options = {
  showTimeLabel:true,
  display:true,
  disable:false,
  recordLog:false
};

tidyLog.Log = function(args){
  this.date = Date.now();
  this.vars = [];
  for(var index in args){
    this.vars.push(args[index]);
  }
};

tidyLog.Log.prototype.formatTime = function(){
  var date = new Date(this.date);
  return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};

tidyLog.Group = function(name,parent){
  this.name = name;
  this.parent = parent;
  this.childs = {};
  this.logs = [];
};

tidyLog.Group.prototype.fullPath = function(){
  var node = this,
    path = '';
  while(node){
    path = node.name + ',' + path;
    node = node.parent;
  }  
  path = path.slice(0,path.length-1);
  return path;
};

tidyLog.Group.prototype.log = function(){
  var options = tidyLog.options;
  if(options.disable){
    return;
  }

  var log = new tidyLog.Log(arguments);
  
  if(options.display){
    if(options.showTimeLabel){
      var vars = [].concat(log.vars);
      vars.unshift('['+log.formatTime()+']');
      console.log.apply(console,vars);
    }else{
      console.log.apply(console,arguments);
    }
  }

  if(options.recordLog){
    this.logs.push(arguments);
  }

  return log;
};

tidyLog.Group.prototype.group = function(name){
  return this.childs[name] = new tidyLog.Group(name,this);
};

tidyLog.rootGroup = new tidyLog.Group('root',null);

tidyLog.group = function(){
  if(this.options.disable){
    return;
  }
  return this.rootGroup.group.apply(this.rootGroup,arguments);
};

tidyLog.log = function(){
  return this.rootGroup.log.apply(this.rootGroup,arguments);
}

tidyLog.config = function(options){
  if(typeof options === 'object'){
    for(var key in options){
      if(key in this.options){
        this.options[key] = options[key];
      }
    }
  }
};
