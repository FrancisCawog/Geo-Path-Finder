import * as d3 from 'd3';

const guessedCountries = []; 

export function initializeGuessedCountries(mergedData) {
  const submitButton = document.getElementById("submit-guess");
  const guessInput = document.getElementById("guess-input");

  submitButton.addEventListener("click", () => {
    const guess = guessInput.value;
    if (guess) {
      const countryExists = mergedData.some((country) => country.properties.name === guess);

      if (countryExists) {
        d3.selectAll('path.country')
          .filter(d => d.properties.name === guess)
          .classed('guessed', true);

        guessedCountries.push(guess);

        guessInput.value = "";
      } else {
        alert("Incorrect guess. Try again.");
      }
    }
  });
}

export { guessedCountries };