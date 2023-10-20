import * as d3 from "d3";
import * as topojson from "topojson";

function initializeMap() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const svg = d3.select('body')
    .append('svg')
    .attr('width', windowWidth)
    .attr('height', windowHeight);

  const projection = d3.geoEquirectangular()
    .fitWidth(windowWidth, { type: "Sphere" })

  const path = d3.geoPath(projection);
  const g = svg.append('g');

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
    .then(data => {
      const countries = topojson.feature(data, data.objects.countries);

      countries.features.forEach(country => {
        if (country.properties.name === "Macedonia") {
          country.properties.name = "North Macedonia";
        } else if (country.properties.name === "S. Sudan") {
          country.properties.name = "South Sudan";
        } else if (country.properties.name === "Côte d'Ivoire") {
          country.properties.name = "Ivory Coast";
        } else if (country.properties.name === "Dominican Rep.") {
          country.properties.name = "Dominican Republic";
        } else if (country.properties.name === "eSwatini") {
          country.properties.name = "Eswatini";
        } else if (country.properties.name === "Bosnia and Herz.") {
          country.properties.name = "Bosnia and Herzegovina";
        } else if (country.properties.name === "Eq. Guinea") {
          country.properties.name = "Equatorial Guinea";
        } else if (country.properties.name === "Dem. Rep. Congo") {
          country.properties.name = "Democratic Republic of the Congo";
        } else if (country.properties.name === "Vatican") {
          country.properties.name = "Vatican City";
        } else if (country.properties.name === "Congo") {
          country.properties.name = "Republic of the Congo";
        } else if (country.properties.name === "Central African Rep.") {
          country.properties.name = "Central African Republic";
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
