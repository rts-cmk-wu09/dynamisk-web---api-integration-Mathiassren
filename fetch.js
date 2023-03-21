const pokemonList = document.querySelector(".pokemonlist");

fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=181")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          const spriteUrl = data.sprites.front_default;
          pokemonList.innerHTML += `
            <section> 
            <div class="hp">
            <h4>HP</h4> 
            <i class="fa-solid fa-heart"></i>  
            </div>
            
            <div class="pokemon-name">
            <a href='abilities.html?name=${pokemon.name}'>${pokemon.name}</a>
            </div> 
            <img class="sprite" src="${spriteUrl}" alt="${pokemon.name} sprite">
            </section>
          `;
        });
    });
  });
