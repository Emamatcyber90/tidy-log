var tidyLog = {};

tidyLog.create = function(options){
  return new tidyLog.Logger(options);
};

tidyLog.options = {
  showTimeLabel:true,
  showPath:true,
  display:true,
  disable:false,
  recordLog:false
};

tidyLog.config = function(options){
  if(typeof options === 'object'){
    for(var key in options){
      if(key in this.options){
        this.options[key] = options[key];
      }
    }
  }
};

// Log
tidyLog.Log = function(args){
  this.date = Date.now();
  this.vars = [];

  if(args){
    for(var i=0; i< args.length;i++){
      this.vars.push(args[i]);
    }
  }
};

tidyLog.Log.prototype.timeFormat = function(value){  
  if(typeof value === 'number' && value<10){    
    return '0' + value;
  }
  return value;
};

tidyLog.Log.prototype.getFormatedTime = function(){
  var date = new Date(this.date);  
  return this.timeFormat(date.getHours()) + ':' 
    + this.timeFormat(date.getMinutes()) + ':' 
    + this.timeFormat(date.getSeconds());
};

tidyLog.Log.prototype.displayLog = function(options){
  var vars = [].concat(this.vars);
  if(options.path){
    var path = options.path;
    vars.unshift('('+options.path+')');
  }
  if(options.showTimeLabel){
    vars.unshift('['+this.getFormatedTime()+']');    
  }
  console.log.apply(console,vars);  
};

// Group
tidyLog.Group = function(name,parent){
  this.name = name;
  this.parent = parent;
  this.childs = {};
  this.logs = [];
};

tidyLog.Group.prototype.fullPath = function(){
  var node = this,
    path = '';
  while(node.parent){
    path = node.name + '.' + path;
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
    log.displayLog({
      showTimeLabel:options.showTimeLabel,
      path:options.showPath?this.fullPath():''
    });
  }

  if(options.recordLog){
    this.logs.push(log);
  }

  return log;
};

tidyLog.Group.prototype.getLogs = function(){
  return this.logs;
};

tidyLog.Group.prototype.logHistory = function(){
  var options = tidyLog.options,
    log = null,
    fullPath = this.fullPath();

  for(var index in this.logs){
    log = this.logs[index];
    log.displayLog({
      showTimeLabel:options.showTimeLabel,
      path:options.showPath?fullPath:''
    });
  }
};

tidyLog.Group.prototype.getGroups = function(){
  return this.childs;
};

tidyLog.Group.prototype.group = function(name){
  return this.childs[name] = new tidyLog.Group(name,this);
};

tidyLog.Logger = function(options){
  this.rootGroup = new tidyLog.Group('root',null);

  this.group = function(){
    if(tidyLog.options.disable){
      return;
    }
    return this.rootGroup.group.apply(this.rootGroup,arguments);
  };

  this.log = function(){
    return this.rootGroup.log.apply(this.rootGroup,arguments);
  };

  this.logHistory = function(){
    return this.rootGroup.logHistory.apply(this.rootGroup,arguments);
  };
};