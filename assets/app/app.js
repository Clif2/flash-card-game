/*************************
 *         
 *      DATA
 * initCardStack questions from:
 * https://thatjsdude.com/interview/js2.html
 *
 ***********************/
var initCardStack = [
    { 
      front: 'What are the differences between null and undefined',
      back: 'undefined means, value of the variable is not define \n null means empty or non-existent value which is used by programmers to indicate no value.'
    },
    {
      front: 'What is "typeof []"',
      back: 'Object. Actually Array is derived from Object. If you want to check array use Array.isArray(arr)'
    },
    { front: 'What is "2+true"' ,
      back: '3. The plus operator between a number and a boolean or two boolean will convert boolean to number'
    },
    {
      front: 'What is "\'6\'+9"',
      back: '69'
    },
    {
      front: 'What is the value of "4+3+2+\'1\'"',
      back: '91. 4+3 results 7 and 7+2 is 9. Then 9 + "1"'
    },
    {
      front:'"null == undefined" evaluates?', 
      back: 'true'
    },
    {
      front: 'What is the value of "typeof null"' ,
      back: '"object"'
    },
    {
      front:'What is the value of "typeof(NaN)"' , 
      back: '"number"',
    },
    {
      front: 'Does "'false' == false"' , 
      back: 'No. Because, it\'s a string with length greater than 0. Only empty string is false'
    },
    {
      front:  'Is "'  '" is false?' ,
      back: 'No. Because, it\'s not an empty string. There is a white space in it.'
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

// Save CurrentGame or Delete localStorage if finished  

$( window ).on( 'beforeunload', function() {
  if ( currentGameStack[0] != null ) {
    localStorage.setItem( 'previousGame', JSON.stringify( currentGameStack ))
    localStorage.setItem( 'previousDiscard', JSON.stringify( discardStack))
  } else {
    localStorage.removeItem( 'previousGame')
    localStorage.removeItem( 'previousDiscard')  
  }

})




/*************************************************
 *   
 *  Populate game with data
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
//TODO Refactor 


function initGameStack( checkedStack ){
  if( checkedStack == true && localStorage.getItem( 'previousGame') == null){
    return localStorage.getItem( 'initCardStack' )
  } else if ( localStorage.getItem( 'previousGame' ) != null ) {
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

//move card and clears mark in DOM
//TODO: revaluate this structure 

function moveCard( cardInPlay ){
  $('.card').attr('data-mark', '')
    if (cardInPlay.mark == 'correct' ){
      discardStack.push( cardInPlay )	 
    } else {
        currentGameStack.push( cardInPlay )
    }
}

   
