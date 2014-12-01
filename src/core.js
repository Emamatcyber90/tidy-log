var tidyLog = {};

tidyLog.options = {
  showTimeLabel:true
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

tidyLog.log = function(info){
  var outputArr = [];
  if(this.options.showTimeLabel){
    outputArr.push('['+(new Date()).valueOf()+']');
  }
  outputArr.push(info);
  console.log.apply(console,outputArr);
};