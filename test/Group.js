describe('Group',function(){
  describe('fullPath',function(){
    var parentGroup = new tidyLog.Group('root',null),
      childGroup = new tidyLog.Group('child',parentGroup);

    it('should return "child"',function(){
      expect(childGroup.fullPath()).toEqual("child");
    });

    it('should return "xhr.child"',function(){
      expect(tidyLog.group('xhr').group('child').fullPath()).toEqual("xhr.child");
    });
  });

  describe('logHistory',function(){
    it('should be call consle.log() another 3 times',function(){
      tidyLog.config({
        recordLog:true
      });

      spyOn(console,'log');

      tidyLog.log('first log');
      tidyLog.log('second log');
      tidyLog.log('third log');

      tidyLog.logHistory();

      expect(console.log.calls.count()).toEqual(6);
    });
  });
});