// excellent program organization, naming practices, and scoping of each function's purposes. I think in some cases you could have functions be slightly less granular, but I think you started to realize this and in general your code is very-well thought out and clean



/*************************
 *         
 *      DATA
 *
 *************************/

// Refactoring for Object Oriented Solution
  // move global vars into constructor, event listner attaching
  // turn functions into methods
    // remove function keyword
  // change all global variables to reference instance properties this.stack, this.discard

class Game {
  constructor () {
    this.stack = [
      {
        front: 'CARD FRONT', back: 'CARD BACK'
      }, {
        front: 'CARD FRONT 2', back: 'CARD BACK 2'
      }
    ]
    this.discarded = []

    // bind event handler functions here if you are using this inside of them instead of the event target. example:
    //this.handleSubmit = this.handleSubmit.bind(this)
    // the above line will set/fix the context to the current context (the value of this) at the time the statement is evaluated
  }

}

var initCardStack = [
  {
    front: 'CARD FRONT', back: 'CARD BACK'
  }, {
    front: 'CARD FRONT 2', back: 'CARD BACK 2'
  }
]

var currentGameStack = []
var discardStack = []


/*************************************************
 *
 *          EVENTS
 *
 *************************************************/


//Document load, init Data

//can use defer on the script tag as well
$(document).ready( 
    // do you mean to pass checkLocalCardStack as a reference? either way, it's just returning a boolean
    loadCards( initGameStack ( checkLocalCardStack ), currentGameStack)
)

//Keypress flips card

$(document).keydown(function( event ){
 event.preventDefault()   
 if ( event.which == 37 || event.which == 39 ) {
   var isFlipped = $('div.card').hasClass('flipped') // use instead .toggleClass
   if ( isFlipped == true ){
     $('div.card').removeClass('flipped')
   } else {
     $('div.card').addClass('flipped')
   }
 }
})


// Save CurrentGame or Delete localStorage if finished  

$( window ).on( 'beforeunload', function() { // Nice touch!
  if ( currentGameStack[0] != null ) {
    localStorage.setItem( 'previousGame', JSON.stringify( currentGameStack ))
    localStorage.setItem( 'previousDiscard', JSON.stringify( discardStack))
  } else {
    localStorage.removeItem( 'previousGame')
    localStorage.removeItem( 'previousDiscard')  
  }
})

//button marks card 

$('button.mark').click( function (){ // can also pass event here
  markCard( $( this ).attr( 'data-ans' ) )
})

// alternative to using this
// $('button.mark').click( function (event){ // can also pass event here
//   markCard( $( event.target ).attr( 'data-ans' ) )
// })

//button next card 

$('#next').click( function (){
  if ( $('.card').attr( 'data-mark' ) == '' ) {
   displayCard(getTopCard(currentGameStack)) 
  } else {
    moveCard(selectCard())
    displayCard(getTopCard(currentGameStack))
  }
})

/*************************************************
 *   
 *  Populate game with data
 *
 * ***********************************************/

function checkLocalCardStack(){ // I think you're just passing this function as a reference and don't actually need it
  if (localStorage.getItem('initCardStack')){
    return true
  } else {
    return false
  }
}

// Could be extended in future, for now a bit wordy 
//TODO Refactor 


function initGameStack( checkedStack ){ //not sure this function needs this parameter
  //I would handle fetching from local storage here
  if (checkedStack && localStorage.getItem( 'previousGame') == null) {
    return localStorage.getItem( 'initCardStack' )
  } else if ( localStorage.getItem( 'previousGame' ) ) {
    //Side-effect I'd like to remove
    loadCards(localStorage.getItem( 'previousDiscard'), discardStack )
    return localStorage.getItem( 'previousGame')
  } else {
    localStorage.setItem( 'initCardStack', JSON.stringify(initCardStack))
    return localStorage.getItem( 'initCardStack' )
  }
}

function loadCards( storage, array ){
  storage = JSON.parse( storage )
  storage.forEach(function(element) {
    array.push(element)
  }) 
  return array
}

/***********************************************
 *
 * Card getting and Display 
 *
 ***********************************************/

function getTopCard( cardStack ){
  if (currentGameStack[0] != null) { 
    topCard = currentGameStack[0]
      return topCard
  } else {
    topCard = {front : 'FIN', back : 'FIN'}
      return topCard
  }  
}


function displayCard( topCard ){ //nice, elegant use of jQuery methods
  $('.card').removeClass('flipped')
  $('figure#front p').contents().replaceWith(topCard.front)
  $('figure#back p').contents().replaceWith(topCard.back) 
} 

/***********************************************
 *
 * Remove/Move card from play
 *
 ***********************************************/

function markCard( assessment ) { // might call this param card instead of assessment
  if ( assessment === 'correct'){
    $('.card').attr('data-mark', 'correct')
  } else {
    $('.card').attr('data-mark', 'incorrect')
  }
}

function selectCard() { //could potentially group this with your other function(s) that involve(s) changing/marking cards, but maybe with moveCard
  var cardInPlay = currentGameStack.shift()
  var dataMark = $('.card').attr('data-mark')
  cardInPlay.mark = dataMark
  return cardInPlay 
}

//move card and clears mark in DOM
//TODO: revaluate this structure 

// One suggestion for re-evaluating this structure
// I think you could combine moveCard and markCard and the checking into one concise function, I think you have redundant checks essentially.

function moveCard( cardInPlay ){
  $('.card').attr('data-mark', '')
    if (cardInPlay.mark == 'correct' ){
      discardStack.push( cardInPlay )	 
    } else {
      currentGameStack.push( cardInPlay )
    }
}
