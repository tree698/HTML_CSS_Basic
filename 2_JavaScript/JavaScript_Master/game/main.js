'use strick';

const startBtn = document.querySelector('.start_btn');
const bgMusic = document.querySelector('.bg');
const carrotPullMusic = document.querySelector('.carrot_pull');
const bugPullMusic = document.querySelector('.bug_pull');
const alertMusic = document.querySelector('.alert');
const gameWinMusic = document.querySelector('.game_win');
const number = document.querySelector('.number');
const clickArea = document.querySelector('.click_area');
const gameOver = document.querySelector('.game_over');
const carrotSrc = '/2_JavaScript/JavaScript_Master/game/img/carrot.png'
const bugSrc = '/2_JavaScript/JavaScript_Master/game/img/bug.png'

const playIcon = document.createElement('i');
playIcon.innerHTML = `<i class="fas fa-caret-right"></i>`;
startBtn.appendChild(playIcon);
playIcon.style.fontSize = '50px';
playIcon.style.paddingLeft = '7px';

const time = document.querySelector('.time');
let minute = '00';
let second = '00';
time.textContent = `${minute}:${second}`;



function onPlay() {
    playIcon.innerHTML = `<i class="fas fa-pause"></i>`;
    playIcon.style.fontSize = '25px';
    playIcon.style.paddingRight = '6px'; 

    number.textContent = Math.floor(Math.random() * 10 + 1);
    bgMusic.play();
    
    let second = '10';
    time.textContent = `${minute}:${second}`;


    let downloadTimer = setInterval(function(){
        if(second < 0) {
            clearInterval(downloadTimer);
            bgMusic.pause();
        } else {
            time.textContent = `${minute}:${second}`;
        }
        second -= 1; 
    }, 1000);

    
    for (let i = 1; i <= number.textContent; i++) {
       createItem('carrot', carrotSrc);
       createItem('bug', bugSrc);
    }
};

let id = 0;
function createItem(name, src) {
    const item = document.createElement('img');
    item.setAttribute('class', name);
    item.setAttribute('src', src);
    item.setAttribute('data-id', id);
    clickArea.appendChild(item);
    clickArea.style.position = 'relative';
    item.style.position = 'absolute';
    item.style.top = Math.floor(Math.random() * 130 + 1) + 'px' ;
    item.style.left = Math.floor(Math.random() * 800 + 1) + 'px';
    id++;
    return item;
}

function clickCarrot(id) {
    carrotPullMusic.play()
    if(number.textContent === '0') {
        carrotPullMusic.pause();
        return;
    } else {
        number.textContent -= 1;
    }
    const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
    toBeDeleted.remove();
}

function clickBug(id) {
    endOfGame('YOU LOST');
}

function endOfGame(text) {
    startBtn.style.opacity = 0;
    alertMusic.play();
    bgMusic.pause();
    clearInterval(downloadTimer);
    gameOver.innerHTML = `<i class="fas fa-redo-alt"></i><br>${text}`;
    gameOver.style.backgroundColor = 'rgba(0,0,0,0.4)';
}

startBtn.addEventListener('click', onPlay);
clickArea.addEventListener(('click'), event => {
    const id =event.target.dataset.id;
    if(id % 2 === 0) {
        clickCarrot(id);
    } else if(id % 2 === 1) {
        clickBug(id);
    }
})

