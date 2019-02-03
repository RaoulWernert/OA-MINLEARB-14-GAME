const switchToMemory = function() {
    $('#game').addClass('disabled-game');
    $('#memory').removeClass('disabled-game');

    currentGame.disable();

    timeLeft = memoryTime + currentGame.getScore();
    playingMemory = true;
}
const switchToGame = function() {
    $('#memory').addClass('disabled-game');
    $('#game').removeClass('disabled-game');

    memoryGame.resetGuesses();

    let i = Math.floor(Math.random() * games.length);
    currentGame = games[i];
    currentGame.init();

    setTimeout(() => currentGame.nextQuestion(), 300);

    timeLeft = gameTime;
    playingMemory = false;
}
const update = function() {
    timeLeft--;
    playTime++;

    if(timeLeft < 0){
        if(playingMemory){
            switchToGame();
        }else{
            switchToMemory();
        }
    }

    if(playingMemory){
        $('#time-memory').text(timeLeft + ' Seconds');
    }else{
        $('#time-game').text(timeLeft + ' Seconds');
    }
}

const onFinish = function(event) {
    clearInterval(timer);
    $('#popup-finish').css('display', 'flex');
    $('#play-time').text(playTime + ' seconds');
}

const init = function() {
    $('#time-memory').text('0:00');
    $('#time-game').text('0:00');
    this.addEventListener('memory_finished', onFinish.bind(this), false);
    
    $('#game').addClass('disabled-game');
    $('#memory').removeClass('disabled-game');
}

function startGame(){
    timeLeft = memoryTime;
    memoryGame.init();

    playingMemory = true;

    $('#time-memory').text(timeLeft + ' Seconds');
    timer = setInterval(update, 1000);

    $('#popup-import').toggle(false);
}

function onGameImport(){
    let str = $('#import-textarea').val();
    let data = JSON.parse(atob(str));
    
    memoryGame = new Memory(this, data['mem']);
    
    if(data['mcE']){
        games.push(new MultipleChoice(data['mc']));
    }
    if(data['oqE']){
        games.push(new OpenQuestions(data['oq']));
    }

    startGame();
}

const memoryTime = 30;
const gameTime = 20;
let playTime = 0;
let timeLeft = 0;
let playingMemory = true;
let timer = null;
let memoryGame = null;
let currentGame = null;
let gameData = {};
let games = [];

init();