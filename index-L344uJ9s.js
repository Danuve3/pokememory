(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();document.addEventListener("contextmenu",function(i){i.preventDefault()});let o;document.addEventListener("touchstart",function(i){o=i.touches[0].clientY},{passive:!1});document.addEventListener("touchmove",function(i){i.touches[0].clientY-o>0&&i.preventDefault()},{passive:!1});class c extends HTMLElement{constructor(){super(),this.hasFlippedCard=!1,this.lockBoard=!1,this.firstCard=null,this.secondCard=null,this.addEventListener("click",this.flipCard.bind(this))}connectedCallback(){this.fetchAndRenderData()}async fetchAndRenderData(){try{const t=await this.fetchData(),s=this.shuffleArray(t),r=s.slice(0,16).concat(s.slice(0,16)),e=this.shuffleArray(r);this.render(e)}catch(t){console.error("Error fetching data:",t)}}async fetchData(){return(await(await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")).json()).results.map((r,e)=>({...r,isFlipped:!1,finalIndex:e+1}))}shuffleArray(t){return t.slice().sort(()=>Math.random()-.5)}render(t){this.innerHTML=`
            <div class="grid grid-cols-4 gap-3 max-w-[400px] mx-auto">
                ${t.map(s=>`
                    <card-pokemon
                        name="${s.name}"
                        url="${s.url}"
                        key="${s.finalIndex}"
                    ></card-pokemon>
                `).join("")}
            </div>
        `}flipCard(t){const s=t.target.closest(".card");!s||this.lockBoard||(s.classList.add("selected"),this.hasFlippedCard?(this.secondCard=s,this.checkForMatch()):(this.hasFlippedCard=!0,this.firstCard=s))}checkForMatch(){this.firstCard.dataset.key===this.secondCard.dataset.key?this.disableCards():this.unflipCards()}disableCards(){this.firstCard.removeEventListener("click",this.flipCard),this.secondCard.removeEventListener("click",this.flipCard),this.resetBoard()}unflipCards(){this.lockBoard=!0,setTimeout(()=>{this.firstCard.classList.add("animate-shake","animate-twice"),this.secondCard.classList.add("animate-shake","animate-twice")},300),setTimeout(()=>{this.firstCard.classList.remove("selected","animate-shake","animate-twice"),this.secondCard.classList.remove("selected","animate-shake","animate-twice"),this.resetBoard()},1e3)}resetBoard(){[this.hasFlippedCard,this.lockBoard]=[!1,!1],[this.firstCard,this.secondCard]=[null,null]}}customElements.define("grid-pokemon",c);class d extends HTMLElement{connectedCallback(){this.render(),this.loadData()}async loadData(){const t=this.getAttribute("name"),s=this.getAttribute("url"),r=this.getAttribute("key");try{const a=await(await fetch(s)).json();this.render(t,a.sprites.front_default,r)}catch(e){console.error("Error fetching data:",e)}}render(t,s,r){this.innerHTML=`
            <div
                class="card animate-duration-200 animate-ease-in"
                data-pokemon="${t}"
                data-key="${r}"
            >
                <div class="card-content">
                    <div class="front"></div>
                    <div class="back">
                        <img src="${s}" alt="${t}" />
                    </div>
                </div>
            </div>
        `}}customElements.define("card-pokemon",d);
