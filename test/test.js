var assert = require('chai').assert
var expect = require('chai').expect 
var should = require('chai').should 

var addTwo = require('../assets/app/app.js')

describe("Test the behavior of addTwo()", function () {
    it('should return 2 when given 1 and 1 via expect()', function () {
	expect(addTwo(1, 1)).to.be.equal(2)
        })
})
