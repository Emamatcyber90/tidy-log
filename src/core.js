(function(){
  /**
   * Global variables.
   */
  var tidyLog = window.tidyLog = {};

  /**
   * Default options.
   */
  tidyLog.options = {
    showTimeLabel:true,
    showPath:true,
    display:true,
    disable:false,
    recordLog:false
  };

  /**
   * Initialize a new `Logger` with given options.
   * 
   * @return {Logger} to start the log work
   * @api public
   */
  tidyLog.create = function(options){
    var localOptions = Object.create(this.options);
    tidyLog.util.replace(localOptions,options);
    return new tidyLog.Logger(localOptions);
  };

  /**
   * Config the default options.
   * 
   * @param  {Object} options 
   * @api public
   */
  tidyLog.config = function(options){
    if(typeof options === 'object'){
      tidyLog.util.replace(this.options,options);
    }
  };

  /**
   * Log
   */
  
  /**
   * Constructor for creating an log record.
   * 
   * @param {Array} which contains vars to log
   * @api private
   */
  tidyLog.Log = function(args){
    this.date = Date.now();
    this.vars = [];

    if(args){
      for(var i=0; i< args.length;i++){
        this.vars.push(args[i]);
      }
    }
  };

  /**
   * Format the time vars(hours, minutes, seconds) for display.
   * 
   * @param  {Number} hours or minutes or seconds
   * @return {String}
   * @api private
   */
  tidyLog.Log.prototype.timeFormat = function(value){  
    if(typeof value === 'number' && value<10){    
      return '0' + value;
    }
    return value;
  };

  /**
   * Get creation time of the log in HH:mm:ss
   * 
   * @return {String}
   * @api private
   */
  tidyLog.Log.prototype.getFormatedTime = function(){
    var date = new Date(this.date);  
    return this.timeFormat(date.getHours()) + ':' 
      + this.timeFormat(date.getMinutes()) + ':' 
      + this.timeFormat(date.getSeconds());
  };

  /**
   * Call `Console.log` with extra info from options.
   * 
   * @param  {Object} options
   * @api private
   */
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

  /**
   * Group
   */
  
  /**
   * Constructor of Group to manage and record logs.
   * 
   * @param {String} name of the new group
   * @param {Group} parent
   * @param {Object} options
   * @api private
   */
  tidyLog.Group = function(name,parent,options){
    this.options = options;
    this.name = name;
    this.parent = parent;
    this.childs = {};
    this.logs = [];
  };

  /**
   * Get the path(relationship between groups) in string.
   * 
   * @return {String} [description]
   * @api private
   */
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

  /**
   * Create a new log in `this` group.
   * 
   * @return {Log}
   * @api public
   */
  tidyLog.Group.prototype.log = function(){
    var options = this.options;
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

  /**
   * Get logs that created in `this` group.
   * 
   * @return {Array} of Log instances
   * @api public
   */
  tidyLog.Group.prototype.getLogs = function(){
    return this.logs;
  };

  /**
   * Recall `console.log` in all logs created by `this` group.
   * 
   * @api public
   */
  tidyLog.Group.prototype.logHistory = function(){
    var options = this.options,
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

  /**
   * Get an array of child groups in `this` groups.
   * 
   * @return {Array}
   * @api public
   */
  tidyLog.Group.prototype.getGroups = function(){
    return this.childs;
  };

  /**
   * Create a child group.
   * 
   * @param  {String} name of the new group
   * @return {Group}
   * @api public
   */
  tidyLog.Group.prototype.group = function(name){
    return this.childs[name] = new tidyLog.Group(name,this,this.options);
  };

  /**
   * Logger constructor.
   * The instances of Logger have their own options. 
   * 
   * @param {Object} options
   * @api private
   */
  tidyLog.Logger = function(options){    
    this.rootGroup = new tidyLog.Group('root',null,options);

    this.group = function(){
      return this.rootGroup.group.apply(this.rootGroup,arguments);
    };

    this.log = function(){
      return this.rootGroup.log.apply(this.rootGroup,arguments);
    };

    this.logHistory = function(){
      return this.rootGroup.logHistory.apply(this.rootGroup,arguments);
    };
  };

  tidyLog.util = {};

  tidyLog.util.replace = function(oriObj, newObj){
    for(var key in newObj){
      if(key in oriObj){
        oriObj[key] = newObj[key];
      }
    }
    return oriObj;
  };
})(window);