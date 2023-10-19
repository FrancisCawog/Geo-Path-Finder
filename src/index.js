// Your existing code to set up the map and SVG dimensions
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const svg = d3.select('body').append('svg').attr('width', windowWidth).attr('height', windowHeight);
const projection = d3.geoMercator().scale(200).translate([windowWidth / 2, windowHeight / 2]);
const path = d3.geoPath(projection);
const g = svg.append('g');

// Your code to load and render the map
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
  .then(data => {
    const countries = topojson.feature(data, data.objects.countries);

    g.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path);

    // Code to select and change the color of a specific country
    const targetCountryName = "Algeria"; // Replace with the actual country name you want to target
    const specificCountry = g.selectAll('path.country').filter(function (d) {
      return d.properties.name === targetCountryName;
    });

    specificCountry.style('fill', 'red'); // Change 'red' to your desired color
  });

// Your code to update the SVG dimensions on window resize
window.addEventListener("resize", function () {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  svg.attr('width', windowWidth).attr('height', windowHeight);
  // Update any other elements that depend on the window size here
});
