const button = document.querySelector(`.settings`);
const modal = document.querySelector(`.game-alert`);

button.addEventListener("click", () => {
  button.classList.toggle("clicked");
  if (button.classList.contains("clicked")) {
    modal.classList.remove("display-none");
  }
});
