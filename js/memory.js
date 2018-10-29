class Memory {
    constructor() {
        this.cardTyps = [
            'blueshell',
            'star',
            'bobomb',
            'mario',
            'luigi',
            'peach',
            '1up',
            'mushroom',
            'thwomp',
            'bulletbill',
            'coin',
            'goomba',
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

        let gameGrid = this.cardTyps.concat(this.cardTyps);
        gameGrid.sort(() => 0.5 - Math.random());
        gameGrid.forEach(type =>{
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = type;

            const front = document.createElement('div');
            front.classList.add('front');

            const back = document.createElement('div');
            back.classList.add('back');
            back.style.backgroundImage = `url(${'img/memory/'+type+'.png'})`;

            this.grid.appendChild(card);
            card.appendChild(front);
            card.appendChild(back);
        });

        this.grid.addEventListener('click', this.onMouseClick.bind(this));
    }

    resetGuesses() {
        this.firstGuess = null;
        this.guessCount = 0;
    
        $('.selected').each(function(i) {
            this.classList.remove('selected');
        });
        
        if(this.matches >= this.cardTyps.length){
            location.reload();
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