
var gameStack = [
    {
    front: 'CARD FRONT', back: 'CARD BACK'
    }, 
    {
    front: 'CARD FRONT 2', back: 'CARD BACK 2'}
]

function loadCards( storage, array ){
  storage = JSON.parse( storage )
  array = storage
  return array
}

function getTopCard( cardStack ){
  topCard = cardStack.shift()
  return topCard
}

function displayTopCard( topCard ){
  $('figure#front').contents().replaceWith(topCard.front)
  $('figure#back').contents().replaceWith(topCard.back)

} 


