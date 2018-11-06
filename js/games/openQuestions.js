class OpenQuestions {
    constructor() {
        this.dataOpenQuestions = [
            {question: '1 x 1', answer: '1'},
            {question: '1 x 2', answer: '2'},
            {question: '1 x 3', answer: '3'},
            {question: '1 x 4', answer: '4'},
            {question: '1 x 5', answer: '5'},
            {question: '1 x 6', answer: '6'},
            {question: '1 x 7', answer: '7'},
            {question: '1 x 8', answer: '8'},
            {question: '1 x 9', answer: '9'},
            {question: '1 x 10', answer: '10'},
            {question: '1 x 11', answer: '11'},
            {question: '1 x 12', answer: '12'}
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
        let answer = this.dataOpenQuestions[this.index].answer;
        if(input === answer){
            this.score++;
            this.nextQuestion();
        }
    }

    nextQuestion(){
        this.index = Math.floor(Math.random() * this.dataOpenQuestions.length);
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