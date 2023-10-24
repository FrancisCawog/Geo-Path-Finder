import * as d3 from 'd3';

function renderShortestPathPopup() {
    const popup = d3.select('#shortest_route');
    popup.style('display', 'block');

    const closeButton = d3.select('#close-shortest-route');
    closeButton.on('click', function () {
      popup.style('display', 'none');
    })
    const newGameButton = d3.select('#new-game-button');
    newGameButton.on('click', function () {
        location.reload();
    });
};

function renderLongerPathPopup(shortestCountryNames, guessed_countries) {
  const score = Math.floor(shortestCountryNames.length / guessed_countries.length * 100);
  const popup = d3.select('#longer_route');
  popup.style('display', 'block');

  const scoreElement = d3.select('#longer_route').select('li:nth-child(2)');
  scoreElement.text(`Your score is: ${score}`);

  const pathYouPickedElement = d3.select('#longer_route').select('li:nth-child(4)');
  pathYouPickedElement.text(`The path you picked was: ${guessed_countries.join(' -> ')}`);

  const shortestPathElement = d3.select('#longer_route').select('li:nth-child(6)');
  shortestPathElement.text(`The shortest path was: ${shortestCountryNames.join(' -> ')}`);

  const closeButton = d3.select('#close-longer-route');
  closeButton.on('click', function () {
    popup.style('display', 'none');
  });
  const newGameButton = d3.select('#new-game-button');
    newGameButton.on('click', function () {
        location.reload();
    });
}

export { renderShortestPathPopup,  renderLongerPathPopup }