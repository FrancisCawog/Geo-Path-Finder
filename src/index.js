import initializeMap from "./scripts/map";
import merge from "./scripts/merge";
import { getRandomCountries } from "./scripts/generate_countries";
import { findConnection } from "./scripts/connected_countries";
import * as d3 from 'd3';

function selectRandomCountriesAndCheckConnection(mergedData) {
const independentCountries = mergedData.filter(country => {
  const restCountriesInfo = country.restCountriesInfo;
  return restCountriesInfo && restCountriesInfo.independent === true && restCountriesInfo.borders.length !== 0;
});

  const randomCountries = getRandomCountries(independentCountries);
  const [startCountry, endCountry] = randomCountries;

    if (findConnection(independentCountries, startCountry, endCountry)) {
      console.log(startCountry, endCountry)
      d3.selectAll('path.country')
        .classed('start-country', d => d.properties.name === startCountry)
        .classed('end-country', d => d.properties.name === endCountry);
    } else {;
      selectRandomCountriesAndCheckConnection(mergedData);
    }
  }

merge().then(mergedData => {
  selectRandomCountriesAndCheckConnection(mergedData);
});

initializeMap();
