class CardPokemon extends HTMLElement {
    connectedCallback() {
        this.render();
        this.loadData();
    }

    async loadData() {
        const name = this.getAttribute('name');
        const url = this.getAttribute('url');
        const key = this.getAttribute('key');

        try {
            const response = await fetch(url);
            const data = await response.json();
            this.render(name, data.sprites.front_default, key);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render(name, imageUrl, key) {
        this.innerHTML = `
            <div
                class="card animate-duration-200 animate-ease-in"
                data-pokemon="${name}"
                data-key="${key}"
            >
                <div class="lottie-animation"></div>
                <div class="card-content">
                    <div class="front"></div>
                    <div class="back">
                        <img src="${imageUrl}" alt="${name}" />
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('card-pokemon', CardPokemon);
