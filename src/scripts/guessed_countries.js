let guessedCountries = [];

function capitalizeFirstLetters(input) {
  const commonWords = ["the", "of"];
  const words = input.toLowerCase().split(' ');

  const result = words.map((word, index) => {
    if (index === 0 || !commonWords.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  return result.join(' ');
}

export function initializeGuessedCountries(mergedData, startCountry, endCountry) {
  const submitButton = document.getElementById("submit-guess");
  const guessInput = document.getElementById("guess-input");

  guessedCountries.push(startCountry, endCountry);

  submitButton.addEventListener("click", () => {
    const guess = capitalizeFirstLetters(guessInput.value);
    if (guess) {
      const countryExists = mergedData.some((country) => {
        return country.properties.name.toLowerCase() === guess.toLowerCase();
      });

      if (!countryExists) {
        alert("Incorrect guess. Try again.");
      }
    }
  });
}
export { guessedCountries, capitalizeFirstLetters };