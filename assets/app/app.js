/*************************
 *         
 *      DATA
 ***********************/
var initCardStack = [
    {
    front: 'CARD FRONT', back: 'CARD BACK'
    }, 
    {
    front: 'CARD FRONT 2', back: 'CARD BACK 2'}
]

var currentGameStack = []
var discardStack = []


/*************************************************
 *
 *
 *          EVENTS
 *
 *
 *************************************************/


//Document load, init Data

$(document).ready( 
    loadCards( initGameStack ( checkLocalCardStack ), currentGameStack)
)

//Keypress flips card

$(document).keydown(function( event ){
 event.preventDefault()   
 if ( event.which == 37 || event.which == 39 ) {
   var isFlipped = $('div.card').hasClass('flipped')
   if ( isFlipped == true ){
     $('div.card').removeClass('flipped')
   } else {
     $('div.card').addClass('flipped')
   }
 }
})


//button marks card 

$('button.mark').click( function (){
 markCard( $( this ).attr( 'data-ans' ) )
})

//button next card 

$('#next').click( function (){
  if ( $('.card').attr( 'data-mark' ) == '' ) {
   displayCard(getTopCard(currentGameStack)) 
  } else {
    moveCard(selecetCard())
    displayCard(getTopCard(currentGameStack))
  }
})

/*************************************************
 *  Init Game Cards cards
 *  
 *  Should populate game with data, and allow
 *  for future stacks.  
 *
 *
 * ***********************************************/


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


function displayCard( topCard ){
  $('.card').removeClass('flipped')
  $('figure#front p').contents().replaceWith(topCard.front)
  $('figure#back p').contents().replaceWith(topCard.back)

} 

/***********************************************
 *
 * Remove/Move card from play
 *
 ***********************************************/

function markCard( assesment ){
  if ( assesment === 'correct'){
    $('.card').attr('data-mark', 'correct')
  } else {
    $('.card').attr('data-mark', 'incorrect')
  }
}

function selecetCard() {
  var cardInPlay = currentGameStack.shift()  
  var dataMark = $('.card').attr('data-mark')
  cardInPlay.mark = dataMark  
    return cardInPlay 
}

//move card and clears mark in DOM, might wa
//TODO: revaluate this structure 

function moveCard( cardInPlay ){
    $('.card').attr('data-mark', '')
    if (cardInPlay.mark == 'correct' ){
      discardStack.push( cardInPlay )	 
    } else {
      currentGameStack.push( cardInPlay )
    }
}

   
