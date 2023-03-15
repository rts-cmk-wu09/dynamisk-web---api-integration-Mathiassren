//Her har jeg oprettet en funktion som sørger for at få hver enkelt pokemons evner vist på et nyt site.
//Fuldstændig samme fetch metode som vist under dette stykke js.
function displayAbilityDetails(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((pokemonData) => {
      const abilities = pokemonData.abilities.map(
        (ability) => ability.ability.name
      );

      const markup = `
      <html>
          <head>
            <link rel="stylesheet" type="text/css" href="poke.css">
          </head>
          <body>
            <section class="ability-details">
              <h3>${name} Abilities:</h3>
              <ul>
                ${abilities.map((ability) => `<li>${ability}</li>`).join("")}
              </ul> 
            </section> 
          </body>
        </html>
      `;
      const newWindow = window.open("");
      newWindow.document.write(markup);
    })
    .catch((error) => console.log(error));
}

//Henter data fra pokemon Api. En liste på tyve pokemonner da vores limit er sat til 20.
//Vi laver derefter en then funktion, som sørger for at responsen returneres som json data.

fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
  .then((res) => {
    return res.json();
  })
  //Derefter opretter vi en løkke, der itererer over hvert pokemonnavn i JSON-filen. "name" er den data, vi gerne vil have vist.
  //Vi sørger også for, at denne data returneres som JSON-data.
  //Vi opretter herefter en konstant variabel med en markup-streng. I denne streng opretter vi et array og en template-streng ved hjælp af backticks.
  //Her kan vi oprette de HTML-elementer, vi har brug for, for at vise navnene og sprites(billeder).
  //queryselector selektere det første ul element i vores dom. Da der kun er én ul bruger jeg denne metode.
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((res) => res.json())
        .then((pokemonData) => {
          const markup = `
          <section onclick="displayAbilityDetails('${pokemon.name}')">
            <h3>${pokemon.name}</h3>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name} front sprite" class="front-sprite">
            <img src="${pokemonData.sprites.back_default}" alt="${pokemon.name} back sprite" class="back-sprite">
          </section>`;
          document.querySelector("ul").insertAdjacentHTML("beforeend", markup);
        })
        .catch((error) => console.log(error));
    });
  })
  .catch((error) => console.log(error));
