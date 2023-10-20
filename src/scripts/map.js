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
