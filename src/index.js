import initializeMap from "./scripts/map";
import merge from "./scripts/merge";
import { getRandomCountries } from "./scripts/generate_countries";
import * as d3 from 'd3';

merge().then(mergedData => {
  if (Array.isArray(mergedData)) {
    const randomCountries = getRandomCountries(mergedData);

    if (randomCountries.length === 2) {
      const [startCountry, endCountry] = randomCountries;

      console.log('startCountry:', startCountry);
      console.log('endCountry:', endCountry);

      d3.selectAll('path.country')
        .classed('start-country', d => d.properties.name === startCountry)
        .classed('end-country', d => d.properties.name === endCountry);
    }
  }
});

initializeMap();
