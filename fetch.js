//Const variabel som selektere den "første" .pokemonlist i dommen

const pokemonList = document.querySelector(".pokemonlist");

//Fetch api
//lav en funktion som konvertere mit response til json.
fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=181")
  //Opretter et response som retunere min data som json.
  //Data kan være hvilket som helst navn, men i dette tilfælde er det den samlede data for pokemonnerne
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    //Opretter løkke som iterer over hvert pokemon navn.
    //For hvert pokemon navn opretettes en unordered liste med deres navne.
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          //Const variabel oprettes og sørger for at hente de forskellige billeder af hver pokemon
          //Derefter bliver hvert billede tilføjet til klassen pokemonlist.
          //Og herefter bruges der innerHTML og template literals til at manipulere dommens elementer udfra js.

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
