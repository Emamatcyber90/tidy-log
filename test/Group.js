describe('Group',function(){
  describe('fullPath',function(){
    var parentGroup = new tidyLog.Group('parent',null),
      childGroup = new tidyLog.Group('child',parentGroup);

    it('should return "parent,child"',function(){
      expect(childGroup.fullPath()).toEqual("parent,child");
    });
  });
});