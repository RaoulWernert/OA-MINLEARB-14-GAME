class MultipleChoice {
    constructor(data) {
        this.data = [];
        for(let i = 0; i < data.length; i++){
            this.data.push(new Question(data[i]));
        }
    }

    init() {
        this.score = 0;
        $('#game').load('games/multipleChoice.html', this.onLoad.bind(this));
    }

    onLoad(){
        this.question = null;
        var grid = $('#mcGrid')[0];
        grid.addEventListener('click', this.onMouseClick.bind(this));
    }

    nextQuestion(){
        let index = Math.floor(Math.random() * this.data.length);
        this.question = this.data[index];
        let questions = [...this.question.other];

        questions.push(this.question.correct);
        questions.sort(() => 0.5 - Math.random());

        $('#mcGrid').empty();

        questions.forEach(q => {
            const card = document.createElement('div');
            card.classList.add('mcCard');
            card.dataset.text = q;
            card.innerText = q;
            $('#mcGrid').append(card);
        });
        $('#mcQuestion').text(this.question.question);
    }

    onMouseClick(event) {
        let clicked = event.target;
        let isCard = clicked.classList.contains('mcCard') && clicked.nodeName !== 'SECTION';
        if(!isCard){
            return;
        }
        let isCorrect = this.question.isCorrect(clicked.innerText);
        if(isCorrect) {
            this.score++;
            this.nextQuestion();
        }
    }

    getScore(){
        return this.score;
    }

    disable(){
        $('#answerArea').blur();
        $('#answerArea').val('');
    }
}

class Question {
    constructor(data) {
        this.question = data['q'];
        this.correct = data['a'];
        this.other = [data['w1'], data['w2'], data['w3']];
    }
    isCorrect(answer){
        return this.correct === answer;
    }
}