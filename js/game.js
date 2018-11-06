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
    currentGame.nextQuestion();

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
    $('#popup').css('display', 'flex');
    $('#play-time').text(playTime + ' seconds');
}

let timer = null;
let memoryGame = null;
let currentGame = null;
const init = function() {
    $('#time-memory').text('0:00');
    $('#time-game').text('0:00');

    memoryGame = new Memory(this);
    memoryGame.init();
    this.addEventListener('memory_finished', onFinish.bind(this), false);

    currentGame = new OpenQuestions();
    currentGame.init();

    switchToMemory();
    $('#time-memory').text(timeLeft + ' Seconds');
    timer = setInterval(update, 1000);
}

const memoryTime = 30;
const gameTime = 20;
let playTime = 0;
let timeLeft = 0;
let playingMemory = true;

init();
