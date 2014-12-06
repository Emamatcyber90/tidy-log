describe('Log',function(){
  describe('vars',function(){
    var testString = 'test string',
      log = new tidyLog.Log([testString,{name:'test object'}]);

    it('should have two elements in vars',function(){
      expect(log.vars.length).toEqual(2);
      expect(log.vars[0]).toEqual(testString);
      expect(typeof log.vars[1]).toEqual('object');
    });
  });

  describe('date',function(){
    var log = new tidyLog.Log();
    it('should have int `date`',function(){
      expect(typeof log.date).toEqual('number');
    });
  });
})