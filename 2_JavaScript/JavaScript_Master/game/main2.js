'use strict';

const CARROT_COUNT = 20;
const BUG_COUNT = 5;
const ITEM_SIZE = 80;
const GAME_DURATION_SEC = 10;

const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');

const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');

let started = false;
let timer = undefined;
let score = 0;


gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    }
    else {
        startGame();
    }
    // started = !started;
});

popUpRefresh.addEventListener('click', () => {
    // initGame();
    // showGameBtn();
    // startTimer();
    hidePopUpWithText();
    playSound(bgSound);
    startGame();
})

gameField.addEventListener('click', onFieldClick);


function stopGame() {
    started = false;
    stopTimer();
    hideGameBtn();
    showPopUpWithText('REPLAY?');
    playSound(alertSound);
    pauseSound(bgSound);
};

function startGame() {
    started = true;
    playSound(bgSound);
    initGame();
    showStopBtn();
    showTimerAndScore();
    startTimer();
};

function finishGame(win) {
    started = false;
    stopTimer();
    hideGameBtn();
    showPopUpWithText(win ? 'You Won!' : 'You Lost!');
    pauseSound(bgSound);
    if(win) {
        playSound(gameWinSound);
    } else {
        playSound(alertSound);
    }
};


function initGame() {
    score = 0;
    gameField.innerHTML = '';
    gameScore.textContent = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, './img/carrot.png');
    addItem('bug', BUG_COUNT, './img/bug.png');
    // playSound(bgSound);
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

function showStopBtn() {
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTime(remainingTimeSec);

    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            // finishGame(false);
            finishGame(CARROT_COUNT == score);
            // playSound(alertSound);
            return;
        } 
        updateTime(--remainingTimeSec);
        // if (remainingTimeSec === 0) {
        //     finishGame(false);
        //     alert.play();
        // }
    }, 1000)
}

function updateTime(sec) {
    // let minute = parseInt(sec / 60); 
    const minutes = Math.floor(sec / 60);
    const second = sec % 60;
    gameTimer.innerHTML = `${minutes}:${second}`;
}

function stopTimer() {
    clearInterval(timer);
}

// function showGameBtn() {
//     gameBtn.style.visibility = 'visible';
// }

function hideGameBtn() {
    gameBtn.style.visibility = 'hidden';
}

function showPopUpWithText(text) {
    popUp.classList.remove('pop-up__hide');
    popUpMessage.textContent = text;
}

function hidePopUpWithText() {
    popUp.classList.add('pop-up__hide');
}

function onFieldClick(event) {
    const target = event.target;
    if(target.matches('.carrot')) {
        playSound(carrotSound);
        target.remove();
        score++;
        // updateScore(score)
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            playSound(gameWinSound);
            finishGame(true);
            // playSound(alertSound);
        }
    } else if (target.matches('.bug')) {
        playSound(bugSound);
        finishGame(false);
    } 
};

function updateScoreBoard() {
    // gameScore.textContent = `${CARROT_COUNT - score}`;
    gameScore.textContent = CARROT_COUNT - score;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function pauseSound(sound) {
    sound.pause();
}








