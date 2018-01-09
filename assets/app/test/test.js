var assert = require('assert');
describe('Array', function (){
  describe('#indexOf()', function () {
    it('should be negative one when value is present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1) 
    })
  })
})
