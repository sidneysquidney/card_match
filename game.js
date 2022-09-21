const selectors = {
    grid: document.querySelector('.grid'),
    score: document.querySelector('.score'),
    replay: document.querySelector('.replay'),
    // count: document.querySelector('#count'),
    // matches: document.querySelector('#matches'),
    // blackIndex: document.querySelector('#black-index'),
    // blackCount: document.querySelector('#black-count'),
    // cards: document.querySelector('#cards')
};

const state = {
    matches: 0,
    count: 0,
    blackCount: 0,
    cards: [],
    blackIndex: null
};

function resetState() {
    state.matches = 0;
    state.count = 0;
    state.blackCount = 0;
    state.cards = [];
    state.blackIndex = null;
}

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

// makes an array of 25 - 2x each icon, 1x carrot, then shuffles, 
// returns object in format {'card-0': 'wolf', 'card-1': 'bicep'...}
function makeDeck() {
    let icons = ['bicep', 'wolf', 'bear', 'weight', 'chicken', 'protein', 'karate', 
'wood', 'push', 'pull', 'fire', 'motorbike']
    let cardsList = [];
    for (i in icons) {
        cardsList.push(icons[i], icons[i]);
    }
    cardsList.push('carrot')
    shuffle(cardsList);
    cardDict = {};
    for (c in cardsList) {
        cardDict['card-' + c] = cardsList[c];
    }
    return cardDict;
}

// adds 25x card-front's class divs and 25x card-back's to the grid, 
// attaching the images shuffled with makeDeck, and locating blackIndex (carrot), for the state object
function makeGrid() {
    let cardDict = makeDeck();
    let myHTML = '';
    for (let i = 0; i < 25; i++) {
      myHTML += '<div class="card" id="card-' + i + '"></div><div class="card-back" id="card-back-' + i + '"></div>';
    }
    selectors.grid.innerHTML = myHTML;
    for (let i = 0; i < 25; i++) {
        card = document.getElementById('card-' + i);
        card.style.backgroundImage = 'url("images/' + cardDict['card-' + i] + '.png")'
        card.style.backgroundColor = 'white'
        if (window.innerWidth < 520) {
            card.style.backgroundSize = '58px 58px';
        }
        else {
            card.style.backgroundSize = '98px 98px';
        }
    }
    let deck = document.getElementsByClassName('card')
    for (let i = 0; i < deck.length; i++) {
        if (deck[i].style.backgroundImage === 'url("images/carrot.png")') {
            state.blackIndex = Number(i);
        }
    }
}

function changeScore() {
    state.count++;
    selectors.score.innerHTML = state.count;
    // selectors.count.innerHTML = 'Count: ' + state.count;
    // selectors.matches.innerHTML = 'Matches: ' + state.matches;
    // selectors.blackIndex.innerHTML = 'Black Index: ' + state.blackIndex;
    // selectors.blackCount.innerHTML = 'Black Count: ' + state.blackCount;
    // selectors.cards.innerHTML = 'Cards: ' + state.cards;
}

// takes an id, revealing card front and making invisible card back
function flip(id) {
    cardFront = document.getElementById('card-' + id);
    cardBack = document.getElementById('card-back-' + id);
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';
}

// takes an id, reveals card back, makes invisible card front
function flipBack(id) {
    cardFront = document.getElementById('card-' + id);
    cardBack = document.getElementById('card-back-' + id)
    cardFront.style.display = 'none';
    cardBack.style.display = 'block';
}

// removes ability to click cards and flip, take all card front and back divs making them invisible
// checks state - either 'win' or 'lose', setting the background image for the grid 
function endGame(state) {
    document.body.removeEventListener('click', cardEvent);
    cardFronts = document.getElementsByClassName('card');
    cardBacks = document.getElementsByClassName('card-back');
    for (let i = 0; i < cardFronts.length; i++) {
        cardFronts[i].style.display = 'none';
        cardBacks[i].style.display = 'none';
    }
    if (state === 'win') {
        document.getElementsByClassName('grid')[0].style.backgroundColor = 'black';
        document.getElementsByClassName('grid')[0].style.backgroundImage = 'url("images/win-cover.png")';
    }
    else {
        document.getElementsByClassName('grid')[0].style.backgroundColor = 'black';
        document.getElementsByClassName('grid')[0].style.backgroundImage = 'url("images/lose-cover.png")';
    }
}

// function occurs every time a move is made. if carrot is one of the cards, blackcount is incremented,
// if there's a match, mathces are incremented..., also determines whether or not game has ended
function turn() {
    if (Number(state.cards[0]) === state.blackIndex ||  Number(state.cards[1]) === state.blackIndex) {
        state.blackCount++;
        if (state.blackCount > 1) {
            selectors.score.innerHTML = 'You Lose';
            endGame('lose');
        }
        else {
            selectors.score.innerHTML = 'If you touch the carrot again, you lose.';
            for (let i = 0; i < state.cards.length; i++) {
                document.body.removeEventListener('click', cardEvent);
                setTimeout(flipBack, 2000, state.cards[i]);
                setTimeout(addClickCardEvent, 2000); 
            }
            state.cards = [];
        }
    }
    else {
        if (state.cards.length == 2) {
            let card1 = document.getElementById('card-' + state.cards[0]).style.backgroundImage;
            let card2 = document.getElementById('card-' + state.cards[1]).style.backgroundImage;
            if (card1 !== card2) {
                document.body.removeEventListener('click', cardEvent);
                setTimeout(flipBack, 2000, state.cards[0]);
                setTimeout(flipBack, 2000, state.cards[1]);
                setTimeout(addClickCardEvent, 2000); 
            }
            else {
                state.matches++;
            }
            state.cards = [];
        }
    }
    if (state.matches == 12) {
        selectors.score.innerHTML = 'Game Completed. Your score was ' + String(state.count);
        endGame('win');
    }
}

// function that is fired when a card is clicked - card flips, add card to cards array, change score, turn
function cardEvent(event) {
    if( event.target.className == 'card-back' ) {
        id = event.target.id.slice(10);
        flip(id);
        state.cards.push(id);
        changeScore();
        turn();
    };
  } ;

// adds ability to click cards 
function addClickCardEvent() {
    document.body.addEventListener( 'click', cardEvent);
}

// resets game, makes the grid, adds ability to click cards
function newGame() {
    resetState();
    makeGrid();
    document.body.addEventListener( 'click', cardEvent);
    selectors.replay.innerHTML = 'New Game';
}

// changes picture size of card-front divs when grid is resized 
function resize() {
    if (window.innerWidth < 520) {
        for (let i = 0; i < 25; i++) {
            card = document.getElementById('card-' + i);
            card.style.backgroundSize = '58px 58px';
        }
    }
    else {
        for (let i = 0; i < 25; i++) {
            card = document.getElementById('card-' + i);
            card.style.backgroundSize = '98px 98px';
        }
    }
}

// add event listeners to replay button - plays the game, and resize to change pics when resized
selectors.replay.addEventListener('click', newGame)
window.addEventListener('resize', resize)


// harder to spot bugs as program still runs - need good methods
// testing, git,  