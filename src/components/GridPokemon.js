class GridPokemon extends HTMLElement {
    connectedCallback() {
        this.fetchAndRenderData();
    }

    async fetchAndRenderData() {
        try {
            const pokemons = await this.fetchData();
            const shuffledPokemons = this.shuffleArray(pokemons);
            const selectedPokemons = shuffledPokemons.slice(0, 14).concat(shuffledPokemons.slice(0, 14));
            const finalShuffledPokemons = this.shuffleArray(selectedPokemons);
            this.render(finalShuffledPokemons);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async fetchData() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
        const data = await response.json();
        return data.results.map((pokemon, index) => ({...pokemon, isFlipped: false, finalIndex: index+1}));
    }

    shuffleArray(array) {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    render(pokemons) {
        this.innerHTML = `
            <div class="grid grid-cols-4 gap-3 max-w-[400px] mx-auto">
                ${pokemons.map(pokemon => `
                    <card-pokemon
                        name=${pokemon.name}
                        url=${pokemon.url}
                        key=${pokemon.finalIndex}
                    ></card-pokemon>
                `).join('')}
            </div>
        `;
    }
}

customElements.define('grid-pokemon', GridPokemon);
