import initializeMap from "./scripts/map";
import merge from "./scripts/merge";
import { getRandomCountries } from "./scripts/generate_countries";
import { findConnection } from "./scripts/connected_countries";
import * as d3 from 'd3';
import { initializeGame } from "./scripts/startGame";
import { initializeGuessedCountries, guessedCountries } from "./scripts/guessed_countries"; 
import { shortestPathBFS } from "./scripts/shortest_path";


function selectRandomCountriesAndCheckConnection(mergedData) {
  const independentCountries = mergedData.filter(country => {
    const restCountriesInfo = country.restCountriesInfo;
    return restCountriesInfo && restCountriesInfo.independent === true && restCountriesInfo.borders.length !== 0;
  });

  const randomCountries = getRandomCountries(independentCountries);
  const [startCountry, endCountry] = randomCountries;

  if (findConnection(independentCountries, startCountry, endCountry)) {
    console.log(startCountry, endCountry);  //////

    const shortest = shortestPathBFS(independentCountries, startCountry, endCountry);
    const path = shortest.map(country => country.restCountriesInfo.name.common);
    console.log(path);   //////

    d3.selectAll('path.country')
      .classed('start-country', d => d.properties.name === startCountry)
      .classed('end-country', d => d.properties.name === endCountry);

    return [startCountry, endCountry];
  } else {
    return selectRandomCountriesAndCheckConnection(mergedData);
  }
}

initializeGame(() => {
  merge().then(mergedData => {
    const [startCountry, endCountry] = selectRandomCountriesAndCheckConnection(mergedData);
    initializeGuessedCountries(mergedData, startCountry, endCountry);
  });
});

console.log(guessedCountries); ////////

initializeMap();
