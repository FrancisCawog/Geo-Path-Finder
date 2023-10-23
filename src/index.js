import initializeMap from "./scripts/map";
import merge from "./scripts/merge";
import { getRandomCountries } from "./scripts/generate_countries";
import { findConnection } from "./scripts/connected_countries";
import * as d3 from 'd3';
import { initializeGame } from "./scripts/startGame";
import { initializeGuessedCountries, guessedCountries } from "./scripts/guessed_countries"; 
import { shortestPathBFS } from "./scripts/shortest_path";
import { doesPathExistBFS } from "./scripts/does_path_exist";

let mergedData;

function selectRandomCountriesAndCheckConnection(mergedData) {
  const independentCountries = mergedData.filter(country => {
    const restCountriesInfo = country.restCountriesInfo;
    return restCountriesInfo && restCountriesInfo.independent === true && restCountriesInfo.borders.length !== 0;
  });

  const randomCountries = getRandomCountries(independentCountries);
  const [startCountry, endCountry] = randomCountries;

  if (findConnection(independentCountries, startCountry, endCountry)) {
    console.log(startCountry, endCountry);  /////

    const shortest = shortestPathBFS(independentCountries, startCountry, endCountry);
    const path = shortest.map(country => country.restCountriesInfo.name.common);
    console.log(path);  /////

    d3.selectAll('path.country')
      .classed('start-country', d => d.properties.name === startCountry)
      .classed('end-country', d => d.properties.name === endCountry);

    return [startCountry, endCountry];
  } else {
    return selectRandomCountriesAndCheckConnection(mergedData);
  }
}

initializeGame(() => {
  merge().then(data => {
    mergedData = data;
    const [startCountry, endCountry] = selectRandomCountriesAndCheckConnection(mergedData);
    initializeGuessedCountries(mergedData, startCountry, endCountry);
    checkForPath();
  });
});

console.log(guessedCountries); //////

initializeMap();

function checkForPath() {
  if (guessedCountries.length >= 2) {
    const pathExists = doesPathExistBFS(mergedData, guessedCountries);

    if (pathExists) {
      console.log('A path exists between the first two guessed countries.');
    } else {
      console.log('No path exists between the first two guessed countries.');
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById("submit-guess");
  submitButton.addEventListener("click", () => {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value;
    if (mergedData) {
      const countryExists = mergedData.some((country) => country.properties.name === guess);

      if (countryExists) {
        d3.selectAll('path.country')
          .filter(d => d.properties.name === guess)
          .classed('guessed', true);

        guessedCountries.push(guess);

        guessInput.value = "";
        checkForPath();
      }
    }
  });
});