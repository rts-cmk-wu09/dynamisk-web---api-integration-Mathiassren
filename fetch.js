//Data bliver hentet via ekstern api.
//Response sørger for at retunere responsen som json.
fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
  .then((res) => {
    return res.json();
  })
  //Data bliver hentet fra arrayet i json og et loop sørger for at for hvert pokemon navn, bliver navnet udskrevet i ul listen -
  //da vi sørger for at selekterer vores ul. Jeg bruger querySelector som vælger det det første ul i html, og da der kun er en, er det denne metode jeg bruger
  //
  .then((data) => {
    data.results.forEach((pokemons) => {
      const markup = `<li>${pokemons.name}</li>`;

      document.querySelector("ul").insertAdjacentHTML("beforeend", markup);
    });
  })
  .catch((error) => console.log(error));
