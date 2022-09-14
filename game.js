let count = 0;
let title = document.querySelector('.title');
let grid = document.querySelector('.grid');
let score = document.querySelector('.score');
let replay = document.querySelector('.replay');

function changeColor() {
    if (title.style.color === 'red') {
        title.style.color = 'green';
    }
    else {
        title.style.color = 'red';
    }
    
}

title.addEventListener('click', changeColor);

addEventListener('load', () => {
    title.innerHTML = 'New Game';
});