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
});