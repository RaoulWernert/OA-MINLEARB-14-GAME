class Memory {
    constructor(game) {
        this.game = game;
        this.questions = [
            {id: 1, question: '1 x 1', answer: '1'},
            {id: 2, question: '1 x 2', answer: '2'},
            {id: 3, question: '1 x 3', answer: '3'},
            {id: 4, question: '1 x 4', answer: '4'},
            {id: 5, question: '1 x 5', answer: '5'},
            {id: 6, question: '1 x 6', answer: '6'},
            {id: 7, question: '1 x 7', answer: '7'},
            {id: 8, question: '1 x 8', answer: '8'},
            {id: 9, question: '1 x 9', answer: '9'},
            {id: 10, question: '1 x 10', answer: '10'},
            {id: 11, question: '1 x 11', answer: '11'},
            {id: 12, question: '1 x 12', answer: '12'},
        ];
        this.guessCount = 0;
    }

    init() {
        this.grid = document.createElement('section');
        this.guessCount = 0;
        this.matches = 0;
        this.firstGuess = null;

        this.grid.setAttribute('class', 'grid');
        $('#memory').append(this.grid);


        let cardstext = Array();
        this.questions.forEach(q =>{
            cardstext.push({id: q.id, text: q.question});
            cardstext.push({id: q.id, text: q.answer});
        });

        cardstext.sort(() => 0.5 - Math.random());
        cardstext.forEach(q => this.createCard(q));

        this.grid.addEventListener('click', this.onMouseClick.bind(this));
    }

    createCard(q){
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = q.id;

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.innerText = q.text;

        this.grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    }

    resetGuesses() {
        this.firstGuess = null;
        this.guessCount = 0;
    
        $('.selected').each(function(i) {
            this.classList.remove('selected');
        });
        
        if(this.matches >= this.questions.length){
            this.game.dispatchEvent(new Event('memory_finished'));
        }
    }

    onMouseClick(event) {
        let clicked = event.target.parentNode;
        let isCard = clicked.classList.contains('card') && clicked.nodeName !== 'SECTION';
    
        if (clicked === this.firstGuess || 
            this.guessCount >= 2 ||
            clicked.classList.contains('match') ||
            !isCard){
            return;
        }
        this.guessCount++;
        clicked.classList.add('selected');
        
        if(this.guessCount === 1){
            this.firstGuess = clicked;
            return;
        }
        if(this.firstGuess.dataset.name === clicked.dataset.name){
            this.matches++;
            $('.selected').each(function(i) {
                this.classList.add('match');
            });
        }
        setTimeout(this.resetGuesses.bind(this), 1200);
    }
}