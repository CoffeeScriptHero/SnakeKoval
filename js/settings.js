const btn = document.querySelector(`.settings-button`);
const modal = document.querySelector(`.game-settings`);
const selects = document.querySelectorAll(".settings-select");
const saveBtn = document.querySelector(".save-button");
const resBtn = document.querySelector(".game-restart");
const gameAlert = document.querySelector(".game-alert");
const closeBtn = document.querySelector(".close-button");
const firstAlert = document.querySelector(".first-alert");
const settings = {
  color: "default",
  "game-mode": "default",
  borders: false,
  "page-bg": "default",
};
const header = document.querySelector(".snake-header");
const title = document.querySelector(".title");
const inputs = document.querySelectorAll("input");
const score = document.querySelector(".user-score");

export {
  btn,
  modal,
  selects,
  saveBtn,
  resBtn,
  gameAlert,
  settings,
  header,
  title,
};
import { background, main, updateValues } from "./main.js";

inputs[1].checked = true;

export function setHandlers() {
  closeBtn.addEventListener("click", () => {
    firstAlert.classList.add("display-none");
    localStorage.setItem("firstVisit", true);
  });

  resBtn.addEventListener("click", () => {
    gameAlert.classList.add("display-none");
    main();
  });

  btn.addEventListener("click", () => {
    if (
      !gameAlert.classList.contains("display-none") ||
      !firstAlert.classList.contains("display-none")
    )
      return;
    modal.classList.toggle("display-none");

    const parsedSettings = JSON.parse(localStorage.getItem("settings"));

    if (parsedSettings === null) {
      selects.forEach((select) => {
        select.value = select.querySelector(`option[value="default"]`).value;
      });
    } else {
      selects.forEach((select) => {
        select.value = select.querySelector(
          `option[value="${parsedSettings[select.id]}"]`
        ).value;
      });
    }

    settings.borders == false
      ? (inputs[1].checked = true)
      : (inputs[0].checked = true);
  });

  saveBtn.addEventListener("click", () => {
    modal.classList.add("display-none");
    selects.forEach((select, index) => {
      switch (select.id) {
        case "snake-bg":
          background.src = `../images/backgrounds/${select.value}.jpg`;
          (settings["snake-bg-src"] = background.src),
            (settings["snake-bg"] = select.value);
          break;
        case "snake-color":
          settings.color = select.value;
          settings["snake-color"] = settings.color;
          break;
        case "page-bg":
          if (select.value == "white") {
            title.classList.remove("neon-title");
            score.classList.add("black-fz");
            document.body.classList.remove("black");
            settings["page-bg"] = "white";
          } else {
            title.classList.add("neon-title");
            score.classList.remove("black-fz");
            document.body.classList.add("black");
            settings["page-bg"] = "default";
          }
          break;
        case "game-mode":
          settings["game-mode"] = select.value;
          break;
        case "speed":
          if (select.value == "noob") {
            settings.delay = 70;
          } else if (select.value == "easy") {
            settings.delay = 55;
          } else if (select.value == "default") {
            settings.delay = 40;
          } else if (select.value == "fast") {
            settings.delay = 25;
          } else if (select.value == "very-fast") {
            settings.delay = 15;
          } else if (select.value == "omg") {
            settings.delay = 1;
          }
          settings.speed = select.value;
          break;
      }
    });

    if (settings["game-mode"] == "fumny") {
      const fumny_appear = new Audio("../sounds/fumny-appear.mp3");
      fumny_appear.play();
    } else if (settings["game-mode"] == "pendos") {
      const pendos_appear = new Audio("../sounds/pendos-appear.mp3");
      pendos_appear.play();
    }

    inputs[1].checked == true
      ? (settings.borders = false)
      : (settings.borders = true);

    localStorage.setItem("settings", JSON.stringify(settings));

    main();
  });
}
