function e(){const e=new URLSearchParams({api_key:"live_P2Spxc1aBtbpL0qSmUXZGLjJn7MNbol18Wj7A0liYsyvJzqeNmL2lGZTrxZnladk"});return fetch(`https://api.thecatapi.com/v1/breeds?${e}`).then((e=>{if(console.log(e),!e.ok)throw new Error(e.status);return e.json()})).catch((e=>console.log(e)))}const t=document.querySelector(".breed-select");t.addEventListener("change",(function(e){e=t.value;const n=new URLSearchParams({api_key:"live_P2Spxc1aBtbpL0qSmUXZGLjJn7MNbol18Wj7A0liYsyvJzqeNmL2lGZTrxZnladk",breed_ids:e});return fetch(`https://api.thecatapi.com/v1/images/search?${n}`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).catch((e=>console.log(e)))}));const n=document.querySelector(".cat-info");document.querySelector(".loader").style.display="none";document.querySelector(".error").style.display="none",e().then((e=>{const n=e.map((({id:e,name:t})=>`<option value =${e}>${t}</option>`)).join("");t.insertAdjacentHTML("beforeend",n)})),e().then((e=>{const t=e.map((({url:e,name:t,description:n,temperament:o})=>`<h2>${t}</h2><p>${n}</p><p>Temperament: ${o}</p><img src='${e}' alt='${t}' width='200'>`)).join("");n.insertAdjacentHTML("beforeend",t)}));
//# sourceMappingURL=index.0bf5156a.js.map
