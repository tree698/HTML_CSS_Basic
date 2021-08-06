'use strict';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const ITEM_SIZE = 80;


const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();




function initGame() {
    // gameField.innerHTML = ''
    addItem('carrot', CARROT_COUNT, './img/carrot.png');
    addItem('bug', BUG_COUNT, './img/bug.png');
};

function addItem(className, count, itemPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - ITEM_SIZE;
    const y2 = fieldRect.height = ITEM_SIZE;
    for(let i = 1; i <= count; i ++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', itemPath);
        item.style.position = 'absolute';
        gameField.appendChild(item);
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`
    }
};

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
initGame()




