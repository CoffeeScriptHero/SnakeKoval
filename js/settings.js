const btn = document.querySelector(`.settings-button`);
const modal = document.querySelector(`.game-settings`);
const selects = document.querySelectorAll(".settings-select");
const save_btn = document.querySelector(".save-button");

export { btn, modal, selects };

export function setHandlers() {
  btn.addEventListener("click", () => {
    modal.classList.toggle("display-none");
  });
  save_btn.addEventListener("click", () => {
    selects.forEach((select, index) => {
      console.log(select.value);
    });
  });
}
