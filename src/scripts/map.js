import * as d3 from "d3";
import * as topojson from "topojson";

function initializeMap() {
  const windowWidth = document.querySelector("#map-container").clientWidth;
  const windowHeight = document.querySelector("#map-container").clientHeight;

  const svg = d3.select('#map-container')
    .append('svg')
    .attr('width', windowWidth)
    .attr('height', windowWidth / 2);

  const projection = d3.geoEquirectangular()
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
        .attr('d', path)
        .on('mouseover', function (event) {
          const countryClass = d3.select(this).attr('class');
          if (countryClass.includes('start-country') || countryClass.includes('end-country') || countryClass.includes('guessed')) {
            const countryName = d3.select(this).attr('data-country');
            showCountryNameTooltip(event, countryName);
          }
        })
        .on('mouseout', function () {
          hideCountryNameTooltip();
        });
    });
}

function showCountryNameTooltip(event, countryName) {
  const svg = d3.select('svg');
  
  const tooltipGroup = svg.append('g');
  
  // Calculate the text dimensions and update the white box accordingly
  const textDimensions = getTextDimensions(countryName, '14px Roboto'); 
  const boxWidth = textDimensions.width + 10;  // Adjust the padding as needed
  const boxHeight = textDimensions.height + 10;  // Adjust the padding as needed

  // Create a white background rectangle for the tooltip
  const tooltipRect = tooltipGroup
    .append('rect')
    .attr('class', 'tooltip-background')
    .attr('width', boxWidth)
    .attr('height', boxHeight)
    .style('fill', 'white');
  
  const [x, y] = d3.pointer(event);
  
  tooltipGroup.attr('transform', `translate(${x + 10}, ${y})`);
  
  // Calculate the text position to center it within the box
  const textX = boxWidth / 2; // Center horizontally
  const textY = boxHeight / 2; // Center vertically
  
  // Create a text element and set its coordinates relative to the background rectangle
  const tooltipText = tooltipGroup
    .append('text')
    .attr('class', 'country-tooltip')
    .style('font-family', 'Roboto')
    .style('font-size', '14px')
    .attr('x', textX)
    .attr('y', textY)
    .style('text-anchor', 'middle') // Center the text horizontally
    .style('dominant-baseline', 'middle') // Center the text vertically
    .text(countryName);
}

function hideCountryNameTooltip() {
  d3.selectAll('.tooltip-background, .country-tooltip').remove();
}

// Function to calculate text dimensions
function getTextDimensions(text, font) {
  const container = d3.select('body').append('div')
    .attr('class', 'hidden-text-container')
    .style('font', font)
    .text(text);
  const dimensions = container.node().getBoundingClientRect();
  container.remove();
  return dimensions;
}

export default initializeMap;