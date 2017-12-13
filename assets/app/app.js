
var initCardStack = [
    {
    front: 'CARD FRONT', back: 'CARD BACK'
    }, 
    {
    front: 'CARD FRONT 2', back: 'CARD BACK 2'}
]

var currentGameStack = []

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

function initGameStack( checkedStack ){
  if( checkedStack == true ){
    return localStorage.getItem( 'initCardStack' )
  } else {
    return localStorage.setItem( 'initCardStack', JSON.stringify(initCardStack))
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
 *
 *
 */

function getTopCard( cardStack ){
  topCard = cardStack.shift()
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
