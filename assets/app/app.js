
var initCardStack = [
    {
    front: 'CARD FRONT', back: 'CARD BACK'
    }, 
    {
    front: 'CARD FRONT 2', back: 'CARD BACK 2'}
]

var currentGameStack = []
var discardStack = []

/*
 *  Init Game Cards cards
 *  
 *  Should populate game with data, and allow
 *  for future stacks.  
 *
 */


function checkLocalCardStack(){
 if(localStorage.getItem('initCardStack')){
   return true
 } else {
   return false
 }
}

// Could be extended in future, for now a bit wordy  

function initGameStack( checkedStack ){
  if( checkedStack == true ){
    return localStorage.getItem( 'initCardStack' )
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

/*
 * Card getting and Display 
 *
 */

function getTopCard( cardStack ){
  topCard = currentGameStack[0]
  return topCard
}

function displayCard( topCard ){
  $('figure#front').contents().replaceWith(topCard.front)
  $('figure#back').contents().replaceWith(topCard.back)

} 

function markCard( assesment ){
  if ( assesment === 'correct'){
    $('.card').attr('data-mark', 'correct')
  } else {
    $('.card').attr('data-mark', 'incorrect')
  }
}

function selecetCard() {
  var cardFront = $('figure#front').text()
  var cardBack = $('figure#back').text()   
  var dataMark = $('.card').attr('data-mark')
    return { front : cardFront, back : cardBack, mark : dataMark  } 
}

//move card and clears mark in DOM, might wa
//TODO: revaluate this structure 

function moveCard( selectedCard ){
    $('.card').attr('data-mark', '')
    if ( selectedCard.mark == 'correct' ){
      currentGameStack.push( selectedCard )
    } else {
      discardStack.push( selectedCard )
    }
}

   
