describe('Group',function(){
  describe('fullPath',function(){
    var parentGroup = new tidyLog.Group('parent',null),
      childGroup = new tidyLog.Group('child',parentGroup);

    it('should return "parent,child"',function(){
      expect(childGroup.fullPath()).toEqual("parent,child");
    });

    it('should return "root,child"',function(){
      expect(tidyLog.group('child').fullPath()).toEqual("root,child");
    });
  });
});