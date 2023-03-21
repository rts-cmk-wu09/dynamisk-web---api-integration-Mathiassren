import axios from "./node_modules/axios/dist/esm/axios.js";

const pokemonList = document.querySelector(".pokemonlist");

axios
  .get("https://pokeapi.co/api/v2/pokemon/")
  .then((response) => {
    const pokemonData = response.data.results;
    const pokemonListItems = pokemonData.map(async (pokemon) => {
      const pokemonListItem = document.createElement("div");
      pokemonListItem.classList.add("pokemon");

      const additionalDataResponse = await axios.get(pokemon.url);
      const additionalData = additionalDataResponse.data;

      pokemonListItem.innerHTML = `
        <h2>${additionalData.name}</h2>
        <img src="${additionalData.sprites.front_default}" alt="${
        additionalData.name
      }">
        <p>HP: ${additionalData.stats[0].base_stat}</p>
        <ul>
          ${additionalData.abilities
            .map((ability) => `<li>${ability.ability.name}</li>`)
            .join("")}
        </ul>
      `;

      return pokemonListItem;
    });
    Promise.all(pokemonListItems).then((pokemonItems) => {
      pokemonList.append(...pokemonItems);
    });
  })
  .catch((error) => {
    console.log(error);
  });
