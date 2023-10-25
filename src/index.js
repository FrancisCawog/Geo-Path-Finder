import initializeMap from "./scripts/map";
import merge from "./scripts/merge";
import { getRandomCountries } from "./scripts/generate_countries";
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

async function selectRandomCountriesAndCheckConnection(mergedData) {
  const independentCountries = mergedData.filter(country => {
    const restCountriesInfo = country.restCountriesInfo;
    return restCountriesInfo && restCountriesInfo.independent === true && restCountriesInfo.borders.length !== 0;
  });

  while (true) {
    const randomCountries = getRandomCountries(independentCountries);
    const [startCountry, endCountry] = randomCountries;

    if (findConnection(independentCountries, startCountry, endCountry)) {

      shortest = shortestPathBFS(independentCountries, startCountry, endCountry);
      if (shortest.length > 5 ) {
        path = shortest.map(country => country.restCountriesInfo.name.common);
        console.log(path);

        document.getElementById("start-country").textContent = "Start Country: " + startCountry;
        document.getElementById("end-country").textContent = "End Country: " + endCountry;

        d3.selectAll('path.country')
          .classed('start-country', d => d.properties.name === startCountry)
          .classed('end-country', d => d.properties.name === endCountry);

        return [startCountry, endCountry];
      }
    }
  }
}

initializeGame(async () => {
  const data = await merge();
  mergedData = data;
  const [startCountry, endCountry] = await selectRandomCountriesAndCheckConnection(mergedData);
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
      renderShortestPathPopup(guessedCountries);
     } else {
       const shortestCountryNames = shortest.map(country => country.restCountriesInfo.name.common);
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
      path.forEach(countryName => {
        d3.selectAll('path.country')
          .filter(d => d.properties.name.toLowerCase() === countryName.toLowerCase())
          .classed('guessed', true);
      });
      renderGiveUpPopup(path);
    }
  });
});