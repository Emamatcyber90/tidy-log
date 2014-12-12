describe('Group',function(){
  describe('fullPath',function(){
    var logger = tidyLog.create(),    
      parentGroup = new tidyLog.Group('root',null),
      childGroup = new tidyLog.Group('child',parentGroup);

    it('should return "child"',function(){
      expect(childGroup.fullPath()).toEqual("child");
    });

    it('should return "xhr.child"',function(){
      expect(logger.group('xhr').group('child').fullPath()).toEqual("xhr.child");
    });
  });

  describe('logHistory',function(){
    it('should be call consle.log() another 3 times',function(){
      tidyLog.config({
        recordLog:true
      });

      var logger = tidyLog.create();      
      spyOn(console,'log');

      logger.log('first log');
      logger.log('second log');
      logger.log('third log');

      logger.logHistory();

      expect(console.log.calls.count()).toEqual(6);
    });
  });
});