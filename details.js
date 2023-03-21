const params = new URLSearchParams(document.location.search);
const name = params.get("name");

fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then((response) => response.json())
  .then((pokemonData) => {
    document.querySelector("body").innerHTML += `
    `;

    // Fetch the abilities data for the selected Pokemon
    const abilitiesUrl = pokemonData.abilities[0].ability.url;

    fetch(abilitiesUrl)
      .then((response) => response.json())
      .then((abilityData) => {
        const abilityNames = abilityData.names
          .filter((name) => name.language.name === "en")
          .map((name) => name.name);

        const abilitiesElement = document.querySelector(".abilities");
        abilitiesElement.innerHTML = `
          <h2>Abilities:</h2>
          <div class="ability">
          <li>
          <a>
          ${pokemonData.forms[0].name}
          </a>
            ${abilityNames.map((ability) => `<li>${ability}</li>`).join("")}
          </li>
          </div>
        `;
      });
  });
