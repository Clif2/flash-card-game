var assert = require('chai').assert
var expect = require('chai').expect 
var should = require('chai').should 

var loadCards = require('../assets/app/app.js')

describe("Test that loadCards pulls from localStorage and return an array of objects with the same properties", function () {
    it('should return an object', function () {
      var testStorage = {
        "Adm Adama" : "Edward James Olmos",
	"President Roslin" : "Mary McDonnell",
	"Captain Adama" : "Jamie Bamber",
	"Gaius Baltar" : "James Callis",
	"Number Six" : "Tricia Helfer",
	"Kara Thrace" : "Katee Sackehoff" }

      var localStore = JSON.stringify(testStorage)
      var newArray =  [] 
      var expected = JSON.parse(localStore)
      var actual = loadCards(localStore, newArray)	
      assert.ownInclude(actual, expected, '== local storage as obj')})
})
