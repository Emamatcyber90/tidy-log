var tidyLog = {};

tidyLog.options = {
  showTimeLabel:true
};

tidyLog.Log = function(){  
  this.date = Date.now();
  this.vars = arguments;
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

tidyLog.groups = new tidyLog.Group('root',null);

tidyLog.group = tidyLog.groups;

tidyLog.config = function(options){
  if(typeof options === 'object'){
    for(var key in options){
      if(key in this.options){
        this.options[key] = options[key];
      }
    } 
  }
};

tidyLog.log = function(info){
  var outputArr = [];
  if(this.options.showTimeLabel){
    outputArr.push('['+(new Date()).valueOf()+']');
  }
  outputArr.push(info);
  console.log.apply(console,outputArr);
};