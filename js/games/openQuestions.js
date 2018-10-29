class OpenQuestions {
    constructor() {
        this.dataOpenQuestions = [
            {question: '1', answer: '1'},
            {question: '2', answer: '2'},
            {question: '3', answer: '3'},
            {question: '4', answer: '4'},
            {question: '5', answer: '5'},
            {question: '6', answer: '6'},
            {question: '7', answer: '7'},
            {question: '8', answer: '8'}
        ];
    }

    init() {
        this.index = -1;
        this.score = 0;
        $('#game').load('games/openQuestions.html', this.onLoad.bind(this));
    }

    onLoad(){
        var button = $('#answerButton')[0];
        button.addEventListener('click', this.onMouseClick.bind(this));

        this.nextQuestion();
    }

    onMouseClick(event) {
        let input = $('#answerArea').val();
        let answer = this.dataOpenQuestions[this.index].answer;
        if(input === answer){
            this.score++;
            this.nextQuestion();
        }
    }

    nextQuestion(){
        this.index++;
        let data = this.dataOpenQuestions[this.index];
        $('#questionContainer').text(data.question);
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