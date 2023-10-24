import * as d3 from "d3";
import * as topojson from "topojson";

function initializeMap() {
  debugger;
  const windowWidth = document.querySelector("#map-container").clientWidth;
  const windowHeight = document.querySelector("#map-container").clientHeight;

  const svg = d3.select('#map-container')
    .append('svg')
    .attr('width', windowWidth)
    .attr('height', windowWidth / 2);

  const projection = d3.geoEquirectangular()
    // .fitWidth(windowWidth, { type: "Sphere" })
    .fitSize([windowWidth, windowWidth / 2], { type: "Sphere"});

  const path = d3.geoPath(projection);
  const g = svg.append('g');

  const countryNameChanges = {
    "Macedonia": "North Macedonia",
    "S. Sudan": "South Sudan",
    "Côte d'Ivoire": "Ivory Coast",
    "Dominican Rep.": "Dominican Republic",
    "eSwatini": "Eswatini",
    "Bosnia and Herz.": "Bosnia and Herzegovina",
    "Eq. Guinea": "Equatorial Guinea",
    "Dem. Rep. Congo": "Democratic Republic of the Congo",
    "Vatican": "Vatican City",
    "Congo": "Republic of the Congo",
    "Central African Rep.": "Central African Republic",
  };

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
    .then(data => {
      const countries = topojson.feature(data, data.objects.countries);

      countries.features.forEach(country => {
        const newName = countryNameChanges[country.properties.name];
        if (newName) {
          country.properties.name = newName;
        } else if (country.properties.name === "Kosovo") {
          country.id = "383";
        }
      });

      g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('data-country', d => d.properties.name)
        .attr('d', path);
    });
}

export default initializeMap;