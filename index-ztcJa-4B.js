(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();class c extends HTMLElement{connectedCallback(){this.fetchAndRenderData()}async fetchAndRenderData(){try{const t=await this.fetchData(),r=this.shuffleArray(t),n=r.slice(0,14).concat(r.slice(0,14)),e=this.shuffleArray(n);this.render(e)}catch(t){console.error("Error fetching data:",t)}}async fetchData(){return(await(await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")).json()).results.map((n,e)=>({...n,isFlipped:!1,finalIndex:e+1}))}shuffleArray(t){return t.slice().sort(()=>Math.random()-.5)}render(t){this.innerHTML=`
            <div class="grid grid-cols-4 gap-3 max-w-[400px] mx-auto">
                ${t.map(r=>`
                    <card-pokemon
                        name=${r.name}
                        url=${r.url}
                        key=${r.finalIndex}
                    ></card-pokemon>
                `).join("")}
            </div>
        `}}customElements.define("grid-pokemon",c);class i extends HTMLElement{connectedCallback(){this.render(),this.loadData()}async loadData(){const t=this.getAttribute("name"),r=this.getAttribute("url"),n=this.getAttribute("key");try{const s=await(await fetch(r)).json();this.render(t,s.sprites.front_default,n)}catch(e){console.error("Error fetching data:",e)}}render(t,r,n){this.innerHTML=`
            <div
                class="card"
                data-pokemon="${t}"
                data-key="${n}"
            >
                <div class="card-content">
                    <div class="front"></div>
                    <div class="back">
                        <img src="${r}" alt="${t}" />
                    </div>
                </div>
            </div>
        `,this.querySelector(".card").addEventListener("click",()=>this.handleCardClick())}handleCardClick(){this.querySelector(".card").classList.add("selected")}}customElements.define("card-pokemon",i);
