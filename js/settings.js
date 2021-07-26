const btn = document.querySelector(`.settings-button`);
const modal = document.querySelector(`.game-settings`);
const selects = document.querySelectorAll(".settings-select");
const saveBtn = document.querySelector(".save-button");
const resBtn = document.querySelector(".game-restart");
const gameAlert = document.querySelector(".game-alert");

export { btn, modal, selects, saveBtn, resBtn, gameAlert };
import main from "./main.js";

export function setHandlers() {
  resBtn.addEventListener("click", () => {
    gameAlert.classList.add("display-none");
    main();
  });
  btn.addEventListener("click", () => {
    modal.classList.toggle("display-none");
    selects.forEach((select, index) => {
      select.value = select.querySelector(`option[value="default"]`).value;
    });
  });
  saveBtn.addEventListener("click", () => {
    selects.forEach((select, index) => {
      console.log(select.value);
    });
  });
}
