import Map from "./scripts/map";
import * as d3 from "d3";


const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const svg = d3.select('body').append('svg').attr('width', windowWidth).attr('height', windowHeight);

// Code to update the SVG dimensions on window resize
window.addEventListener("resize", function () {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  svg.attr('width', windowWidth).attr('height', windowHeight);
});
