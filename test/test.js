// it is so awesome you've included tests!

// unit testing will generally involve testing each of your functions with an expected input, and then check the function's output against the *expected* output. 

// this means you will need some setup for each test.

// aim for 100% test coverage though (Achievement Unlocked)

var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should


var loadCards = require('../assets/app/app.js')
var getTopCard = require('../assets/app/app.js')
var displayTopCard = require('../assets/app/app.js')

var testDeck = {
    front: 'this is the front',
    back: 'this is the back'
}


describe("Test that loadCards pulls from localStorage and return an array of objects with the same properties", function () {
    it('should return an object', function () {

        // you can move this setup to a before if you like
        // before callback will be executed before each test in an it-callback is executed
        var testStorage = {
            "Adm Adama": "Edward James Olmos",
            "President Roslin": "Mary McDonnell",
            "Captain Adama": "Jamie Bamber",
            "Gaius Baltar": "James Callis",
            "Number Six": "Tricia Helfer",
            "Kara Thrace": "Katee Sackehoff"
        }

        var localStore = JSON.stringify(testStorage)
        var newArray = []
        var expected = JSON.parse(localStore)
        var actual = loadCards(localStore, newArray)

        // can use expect .to .deepEqual() here
        assert.ownInclude(actual, expected, '== local storage as obj')
    })
})
