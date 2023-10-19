import * as d3 from "d3";
import * as topojson from "topojson";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Create an SVG that covers the entire screen
const svg = d3.select('body')
  .append('svg')
  .attr('width', windowWidth)
  .attr('height', windowHeight);

// Define a projection to fit the entire map within the SVG and stretch the width
const projection = d3.geoEquirectangular()
  .fitWidth(windowWidth, { type: "Sphere" }) // Stretch the width to match windowWidth

// Create a path generator with the projection
const path = d3.geoPath(projection);

// Create a group for your map elements
const g = svg.append('g');

// Load the map data
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
  .then(data => {
    const countries = topojson.feature(data, data.objects.countries);

    // Apply the projection and data to the map
    g.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('data-country', d => d.properties.name)
      .attr('d', path);
  });

export default Map;

