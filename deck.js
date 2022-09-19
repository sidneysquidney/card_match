// takes an array and shuffles it - also changes original array object
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// makes an array of 25 - 2x each color, 1x black, then shuffles, returning array
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

// module.exports.celsiusToFahrenheit = celsiusToFahrenheit;
module.exports.makeDeck = makeDeck;
// console.log(makeDeck())