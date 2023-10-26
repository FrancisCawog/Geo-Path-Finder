import initializeMap from "./scripts/map";
import merge from "./scripts/merge";
import { getRandomCountries, countryList } from "./scripts/generate_countries";
import { findConnection } from "./scripts/connected_countries";
import * as d3 from 'd3';
import { initializeGame } from "./scripts/startGame";
import { initializeGuessedCountries, guessedCountries, capitalizeFirstLetters } from "./scripts/guessed_countries"; 
import { shortestPathBFS } from "./scripts/shortest_path";
import { doesPathExistBFS } from "./scripts/does_path_exist";
import { renderShortestPathPopup, renderLongerPathPopup, renderGiveUpPopup } from "./scripts/pop_up";

let mergedData;
let shortest;
let path;

async function selectRandomCountriesAndCheckConnection(mergedData, selectedDifficulty) {
  const independentCountries = mergedData.filter(country => {
    const restCountriesInfo = country.restCountriesInfo;
    return restCountriesInfo && restCountriesInfo.independent === true && restCountriesInfo.borders.length !== 0;
  });

  while (true) {
    const randomCountries = getRandomCountries(independentCountries);
    const [startCountry, endCountry] = randomCountries;

    if (findConnection(independentCountries, startCountry, endCountry)) {

      shortest = shortestPathBFS(independentCountries, startCountry, endCountry);
      if (
        (shortest.length < 7 && shortest.length > 2 && selectedDifficulty === "easy") ||
        (shortest.length > 7 && shortest.length < 10 && selectedDifficulty === "medium") ||
        (shortest.length > 10 && selectedDifficulty === "hard")
      ) {
        path = shortest.map(country => country.restCountriesInfo.name.common);
        console.log(path);
    
        document.getElementById("start-country").textContent = "Start: " + startCountry;
        document.getElementById("end-country").textContent = "End: " + endCountry;
    
        d3.selectAll('path.country')
          .classed('start-country', d => d.properties.name === startCountry)
          .classed('end-country', d => d.properties.name === endCountry);
    
        return [startCountry, endCountry];
      }    
    }
  }
}

const inputField = document.getElementById("guess-input");
const auto = document.getElementById("autocomplete");
const options = [];
let selectedOptionIndex = -1;

function updateOptionsDisplay() {
  auto.innerHTML = "";
  auto.style.display = "block";

  options.sort();

  options.forEach((item, index) => {
    const tag = document.createElement("li");
    tag.innerText = item;
    tag.addEventListener("click", (e) => {
      inputField.value = e.target.innerText;
      auto.style.display = "none";
    });
    if (index === selectedOptionIndex) {
      tag.classList.add("selected");
    }
    auto.append(tag);
  });
}

inputField.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  options.length = 0;
  selectedOptionIndex = -1;

  countryList(mergedData).forEach((countryName) => {
    if (countryName.toLowerCase().includes(searchTerm)) {
      options.push(countryName);
    }
  });

  if (options.length === 0) {
    auto.style.display = "none";
  } else {
    updateOptionsDisplay();
  }
});

inputField.addEventListener('keydown', (e) => {
  if (options.length === 0) {
    return;
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (selectedOptionIndex === -1) {
      selectedOptionIndex = options.length - 1;
    } else if (selectedOptionIndex > 0) {
      selectedOptionIndex--;
    }
    updateOptionsDisplay();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (selectedOptionIndex === -1) {
      selectedOptionIndex = 0;
    } else if (selectedOptionIndex < options.length - 1) {
      selectedOptionIndex++;
    }
    updateOptionsDisplay();
  } else if (e.key === "Enter") {
    if (selectedOptionIndex !== -1) {
      inputField.value = options[selectedOptionIndex];
      auto.style.display = "none";
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target !== inputField && e.target !== auto) {
    auto.style.display = "none";
  }
});


initializeGame(async (selectedDifficulty) => {
  console.log("Difficulty: " + selectedDifficulty);

  const data = await merge();
  mergedData = data;

  const [startCountry, endCountry] = await selectRandomCountriesAndCheckConnection(mergedData, selectedDifficulty);
  initializeGuessedCountries(mergedData, startCountry, endCountry);
  checkForPath();
});


console.log(guessedCountries);

initializeMap();

function checkForPath() {
  if (guessedCountries.length >= 2) {
    const pathExists = doesPathExistBFS(mergedData, guessedCountries);

    if (pathExists) {
     if (guessedCountries.length === shortest.length){
      document.getElementById("guess-input").disabled = true;
      document.getElementById("give-up").disabled = true;
      renderShortestPathPopup(guessedCountries);
     } else {
       const shortestCountryNames = shortest.map(country => country.restCountriesInfo.name.common);
        document.getElementById("guess-input").disabled = true;
        document.getElementById("give-up").disabled = true;
        renderLongerPathPopup(shortestCountryNames, guessedCountries);
     }
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById("submit-guess");
  const guessInput = document.getElementById("guess-input");

  function processGuess() {
    const guess = guessInput.value.toLowerCase();
    if (mergedData) {
      const countryExists = mergedData.some((country) => country.properties.name.toLowerCase() === guess);

      if (countryExists) {
        d3.selectAll('path.country')
          .filter(d => d.properties.name.toLowerCase() === guess)
          .classed('guessed', true);

        const capitalizedGuess = capitalizeFirstLetters(guess);

        if (!guessedCountries.includes(capitalizedGuess)){
          const positionToInsert = guessedCountries.length - 1;
          guessedCountries.splice(positionToInsert, 0, capitalizedGuess);
        }

        guessInput.value = "";
        checkForPath();
      }
    }
  }

  submitButton.addEventListener("click", processGuess);

  guessInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      processGuess();
    }
  });

  const newGameButton = d3.select('#new-game-button3');
    newGameButton.on('click', function () {
        location.reload();
    });

  const giveUpButton = d3.select('#give-up');
  giveUpButton.on('click', function () {
    if (path) {
      document.getElementById("guess-input").disabled = true;
      document.getElementById("give-up").disabled = true;
      path.forEach(countryName => {
        d3.selectAll('path.country')
          .filter(d => d.properties.name.toLowerCase() === countryName.toLowerCase())
          .classed('gaveUp', true);
      });
      renderGiveUpPopup(path);
    }
  });
});