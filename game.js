// tried to import modules from deck.js but didn't work, so putting modules to the top of file

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// makes an array of 25 - 2x each color, 1x black, then shuffles, 
// returns object in format {'card-0': 'red', 'card-1': 'blue'...}
function makeDeck() {
    let colors = ['red', 'green', 'blue', 'yellow', 'brown', 'white',
        'gold', 'gray', 'turquoise', 'orange', 'pink', 'purple'];
    let cardsList = [];
    for (c in colors) {
        cardsList.push(colors[c], colors[c]);
        }
    cardsList.push('black');
    shuffle(cardsList)
    cardDict = {}
    for (c in cardsList) {
        cardDict['card-' + c] = cardsList[c]
    }
    return cardDict
}

let count = 0;
let title = document.querySelector('.title');
let grid = document.querySelector('.grid');
let score = document.querySelector('.score');
score.innerHTML = count
let replay = document.querySelector('.replay');

function changeColor(event) {
    if (event.target.style.color === 'red') {
        event.target.style.color = 'green';
    }
    else {
        event.target.style.color = 'red';
    }
}

function makeGrid() {
    let cardDict = makeDeck()
    let myHTML = '';
    for (let i = 0; i < 25; i++) {
      myHTML += '<div class="card" id="card-' + i + '"></div><div class="card-back" id="card-back-' + i + '"></div>';
    }
    grid.innerHTML = myHTML
    for (let i = 0; i < 25; i++) {
        card = document.getElementById('card-' + i);
        card.style.backgroundColor = cardDict['card-' + i]
    }
}

function showFront() {
    cardFront = document.getElementById('card-0')
    cardBack = document.getElementById('card-back-0')
    cardTest = document.getElementById('card-back-1')
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';
    cardTest.style.backgroundColor = 'green'
}

function changeScore() {
    count += 1;
    score.innerHTML = count
}

function flip(id) {
    cardFront = document.getElementById('card-' + id)
    cardBack = document.getElementById('card-back-' + id)
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';
}

function flipBack(id) {
    cardFront = document.getElementById('card-' + id)
    cardBack = document.getElementById('card-back-' + id)
    cardFront.style.display = 'none';
    cardBack.style.display = 'block';
}

window.addEventListener('load', makeGrid);
title.addEventListener('click', changeScore);
title.addEventListener('click', changeColor);
title.addEventListener('click', showFront);

document.body.addEventListener( 'click', function ( event ) {
    if( event.target.className == 'card-back' ) {
        id = event.target.id.slice(10)
        flip(id)
        changeScore()
        setTimeout(flipBack, 2000, id)
    };
  } );

addEventListener('load', () => {
    title.innerHTML = 'New Game losers';
});



// made back of card default. next make event happen (make front visible on click element)