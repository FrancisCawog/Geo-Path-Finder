import initializeMap from "./scripts/map";

initializeMap();

const svg = d3.select('svg');
window.addEventListener("resize", function () {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  svg.attr('width', windowWidth).attr('height', windowHeight);
});
