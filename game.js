const selectors = {
    title: document.querySelector('.title'),
    grid: document.querySelector('.grid'),
    score: document.querySelector('.score'),
    replay: document.querySelector('.replay'),
    count: document.querySelector('#count'),
    matches: document.querySelector('#matches'),
    blackIndex: document.querySelector('#black-index'),
    blackCount: document.querySelector('#black-count'),
    cards: document.querySelector('#cards')
};

const state = {
    gameStarted: false,
    matches: 0,
    count: 0,
    blackCount: 0,
    cards: [],
    blackIndex: null
};

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
    shuffle(cardsList);
    cardDict = {};
    for (c in cardsList) {
        cardDict['card-' + c] = cardsList[c];
    }
    // state.blackIndex = document.getElementsByClassName('card').filter(card => {return card.style.backgroundColor == 'black';}).id;    
    return cardDict;
}

function makeGrid() {
    let cardDict = makeDeck();
    let myHTML = '';
    for (let i = 0; i < 25; i++) {
      myHTML += '<div class="card" id="card-' + i + '"></div><div class="card-back" id="card-back-' + i + '"></div>';
    }
    selectors.grid.innerHTML = myHTML;
    for (let i = 0; i < 25; i++) {
        card = document.getElementById('card-' + i);
        card.style.backgroundColor = cardDict['card-' + i];
    }
    let deck = document.getElementsByClassName('card')
    for (let i = 0; i < deck.length; i++) {
        if (deck[i].style.backgroundColor === 'black') {
            state.blackIndex = i;
        }
    }
    selectors.score.innerHTML = state.blackIndex;
}
function changeScore() {
    state.count++;
    selectors.score.innerHTML = state.count;

    selectors.count.innerHTML = 'Count: ' + state.count;
    selectors.matches.innerHTML = 'Matches: ' + state.matches;
    selectors.blackIndex.innerHTML = 'Black Index: ' + state.blackIndex;
    selectors.blackCount.innerHTML = 'Black Count: ' + state.blackCount;
    selectors.cards.innerHTML = 'Cards: ' + state.cards;
    
}

function flip(id) {
    cardFront = document.getElementById('card-' + id);
    cardBack = document.getElementById('card-back-' + id);
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';
}

async function flipBack(id) {
    cardFront = document.getElementById('card-' + id);
    cardBack = document.getElementById('card-back-' + id)
    cardFront.style.display = 'none';
    cardBack.style.display = 'block';
}

function turn() {

    if (state.matches == 12) {
        selectors.score.innerHTML = 'Game Completed. Your score was ' + String(state.count);
    }
    else if (Number(state.cards[0]) === state.blackIndex ||  Number(state.cards[1]) === state.blackIndex) {
        state.blackCount++;
        if (state.blackCount > 1) {
            selectors.score.innerHTML = 'You Lose';
        }
        else {
            selectors.score.innerHTML = 'If you touch the black again you lose.';
        }
        for (let i = 0; i < state.cards.length; i++) {
            setTimeout(flipBack, 2000, state.cards[i]);
        }
        state.cards = [];
    }
    else {
        if (state.cards.length == 2) {
            let card1 = document.getElementById('card-' + state.cards[0]).style.backgroundColor;
            let card2 = document.getElementById('card-' + state.cards[1]).style.backgroundColor;
            if (card1 !== card2) {
                setTimeout(flipBack, 2000, state.cards[0]);
                setTimeout(flipBack, 2000, state.cards[1]);
            }
            else {
                state.matches++;
            }
            state.cards = [];
        }
    }
}
// must be a better way to implement than this
document.body.addEventListener( 'click', function ( event ) {
    if( event.target.className == 'card-back' ) {
        id = event.target.id.slice(10);
        flip(id);
        state.cards.push(id);
        changeScore();
        turn();
    };
  } );

window.addEventListener('load', makeGrid);

// better implementation than done on the selector
// timeout with the async and await better
// harder to spot bugs as program still runs - need good methods
// 