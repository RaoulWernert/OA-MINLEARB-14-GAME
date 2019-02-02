class OpenQuestions {
    constructor(data) {
        this.dataOpenQuestions = data;
    }

    init() {
        this.index = -1;
        this.score = 0;
        $('#game').load('games/openQuestions.html', this.onLoad.bind(this));
    }

    onLoad(){
        var button = $('#answerButton')[0];
        button.addEventListener('click', this.onMouseClick.bind(this));

        $("#answerArea").keypress(this.onAnswerAreaKeyPress.bind(this));
    }

    onAnswerAreaKeyPress(e){
        if(e.which == 13) {
            this.onMouseClick(e);
            e.preventDefault();
        }
    }

    onMouseClick(event) {
        let input = $('#answerArea').val();
        $('#answerArea').val('');
        let answer = this.dataOpenQuestions[this.index].a;
        if(input === answer){
            this.score++;
            this.nextQuestion();
        }
    }

    nextQuestion(){
        this.index = Math.floor(Math.random() * this.dataOpenQuestions.length);
        let data = this.dataOpenQuestions[this.index];
        $('#questionContainer').text(data.q);
        $('#answerArea').val('');
    }

    getScore(){
        return this.score;
    }

    disable(){
        $('#answerArea').blur();
        $('#answerArea').val('');
    }
}