function initializeGame(callback) {
  document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const startButton = document.getElementById("start-button");
    const easyRadio = document.getElementById("easy");
    const mediumRadio = document.getElementById("medium");
    const hardRadio = document.getElementById("hard");

    window.addEventListener("load", () => {
      popup.style.display = "block";
    });

    startButton.addEventListener("click", () => {
      if (easyRadio.checked || mediumRadio.checked || hardRadio.checked) {
        let selectedDifficulty = '';
        if (easyRadio.checked) {
          selectedDifficulty = "easy";
        } else if (mediumRadio.checked) {
          selectedDifficulty = "medium";
        } else if (hardRadio.checked) {
          selectedDifficulty = "hard";
        }

        popup.style.display = "none";

        callback(selectedDifficulty);
      } else {
        alert("Please select a difficulty level.");
      }
    });
  });
}

export { initializeGame };