const userInput = document.getElementById("search-input");
const submitBtn = document.getElementById("search-button");
const pokemonImage = document.getElementById("pokemon-image");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const searchPokedex = async () => {
  if (userInput.value === "") {
    return;
  }

  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInput.value.toLowerCase()}`);
    const data = await res.json();
    console.log(data);
    const { name, id, weight, height, types, stats, sprites } = data;

    pokemonImage.innerHTML = `
      <img src="${sprites.front_default}" id="sprite">
    `;

    pokemonName.innerHTML = name.toUpperCase();
    pokemonId.innerHTML = `#${id}`;

    pokemonWeight.innerHTML = `Weight: ${weight}`;
    pokemonHeight.innerHTML = `Height: ${height}`;
    pokemonTypes.innerHTML = types.map(type => `<span class="${type.type.name.toLowerCase()}">${type.type.name.toUpperCase()}</span>`).join(" ");

    hp.innerHTML = stats[0].base_stat;
    attack.innerHTML = stats[1].base_stat;
    defense.innerHTML = stats[2].base_stat;
    specialAttack.innerHTML = stats[3].base_stat;
    specialDefense.innerHTML = stats[4].base_stat;
    speed.innerHTML = stats[5].base_stat;
  }
  catch(err) {
    console.log(err);
    alert("Pokemon not found");
  }
}

submitBtn.addEventListener("click", searchPokedex);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchPokedex();
  }
})