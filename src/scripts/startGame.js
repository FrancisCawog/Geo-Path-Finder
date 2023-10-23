function initializeGame(callback) {
  document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const startButton = document.getElementById("start-button");

    window.addEventListener("load", () => {
      popup.style.display = "block";
    });

    startButton.addEventListener("click", () => {
      popup.style.display = "none";
      callback();
    });
  });
}

export { initializeGame };