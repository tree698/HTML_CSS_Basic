'use strick';

const startBtn = document.querySelector('.start_btn');
const audioElement = document.querySelector('audio');
const carrotNum = document.querySelector('.carrot_num');

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

    carrotNum.textContent = '7';
    audioElement.play();

    let second = '10';
    time.textContent = `${minute}:${second}`;
    let downloadTimer = setInterval(function(){
        if(second < 0) {
            clearInterval(downloadTimer);
            audioElement.pause();
        } else {
            time.textContent = `${minute}:${second}`;
        }
        second -= 1;
    }, 1000);

    const clickArea = document.querySelector('.click_area');
    const carrot = document.createElement('img');
    carrot.setAttribute('class', 'carrot_icon');
    carrot.setAttribute('src', '/2_JavaScript/JavaScript_Master/game/img/carrot.png');
    clickArea.appendChild(carrot);
    clickArea.style.position = 'relative';
    carrot.style.position = 'absolute';
    carrot.style.top = '50px';
    carrot.style.left = '100px';

};



startBtn.addEventListener('click', () => {
    onPlay();
});

