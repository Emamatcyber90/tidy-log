describe('core',function(){
  describe('config',function(){
    it('options.showTimeLabel should be true by default',function(){
      expect(tidyLog.options.showTimeLabel).toEqual(true);
    });
    it('options.showTimeLabel should be false',function(){
      tidyLog.config({
        showTimeLabel:false
      });
      expect(tidyLog.options.showTimeLabel).toEqual(false);
    });
  });
});