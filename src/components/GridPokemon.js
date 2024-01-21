class GridPokemon extends HTMLElement {
    constructor() {
        super();
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.addEventListener('click', this.flipCard.bind(this));
    }

    connectedCallback() {
        this.fetchAndRenderData();
    }

    async fetchAndRenderData() {
        try {
            const pokemons = await this.fetchData();
            const shuffledPokemons = this.shuffleArray(pokemons);
            const selectedPokemons = shuffledPokemons.slice(0, 16).concat(shuffledPokemons.slice(0, 16));
            const finalShuffledPokemons = this.shuffleArray(selectedPokemons);
            this.render(finalShuffledPokemons);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async fetchData() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
        const data = await response.json();
        return data.results.map((pokemon, index) => ({...pokemon, isFlipped: false, finalIndex: index + 1}));
    }

    shuffleArray(array) {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    render(pokemons) {
        this.innerHTML = `
            <div class="grid grid-cols-4 gap-3 max-w-[400px] mx-auto">
                ${pokemons.map(pokemon => `
                    <card-pokemon
                        name="${pokemon.name}"
                        url="${pokemon.url}"
                        key="${pokemon.finalIndex}"
                    ></card-pokemon>
                `).join('')}
            </div>
        `;
    }

    flipCard(event) {
        const card = event.target.closest('.card');
        if (!card || this.lockBoard) return;

        card.classList.add('selected');

        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = card;
        } else {
            this.secondCard = card;
            this.checkForMatch();
        }
    }

    checkForMatch() {
        const isMatch = this.firstCard.dataset.key === this.secondCard.dataset.key;
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.removeEventListener('click', this.flipCard);
        this.secondCard.removeEventListener('click', this.flipCard);

        this.resetBoard();
    }

    unflipCards() {
        this.lockBoard = true;

        setTimeout(() => {
            this.firstCard.classList.add('animate-shake', 'animate-twice');
            this.secondCard.classList.add('animate-shake', 'animate-twice');
        }, 300);

        setTimeout(() => {
            this.firstCard.classList.remove('selected', 'animate-shake', 'animate-twice');
            this.secondCard.classList.remove('selected', 'animate-shake', 'animate-twice');

            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        [this.hasFlippedCard, this.lockBoard] = [false, false];
        [this.firstCard, this.secondCard] = [null, null];
    }
}

customElements.define('grid-pokemon', GridPokemon);
