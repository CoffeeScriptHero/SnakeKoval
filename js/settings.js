const btn = document.querySelector(`.settings-button`);
const modal = document.querySelector(`.game-settings`);
const selects = document.querySelectorAll(".settings-select");
const saveBtn = document.querySelector(".save-button");
const resBtn = document.querySelector(".game-restart");
const gameAlert = document.querySelector(".game-alert");
const closeBtn = document.querySelector(".close-button");
const firstAlert = document.querySelector(".first-alert");
const settings = { color: "default", "game-mode": "default", borders: false };
const header = document.querySelector(".snake-header");
const title = document.querySelector(".title");
const inputs = document.querySelectorAll("input");
//это следовало бы вынести в отдельный файл

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
import { background, main } from "./main.js";

//да и это впрочем
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
    const localeSettings = localStorage.getItem("settings");
    const parsedSettings = JSON.parse(localeSettings);
    if (parsedSettings === null) return;
    selects.forEach((select, index) => {
      if (parsedSettings[select.id]) {
        select.value = select.querySelector(
          `option[value="${parsedSettings[select.id]}"]`
        ).value;
      } else {
        select.value = select.querySelector(`option[value="default"]`).value;
      }
    });

    if (settings.borders == "false") {
      inputs[1].checked = true;
    } else {
      inputs[0].checked = true;
    }
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
            document.querySelector(".title").classList.remove("neon-title");
            document.body.classList.remove("black");
            settings["page-bg"] = "white";
          } else {
            document.querySelector(".title").classList.add("neon-title");
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
          settings["speed"] = select.value;
          break;
        case "size":
          settings.size = select.value;
          break;
      }
    });

    inputs[1].checked == true
      ? (settings.borders = "false")
      : (settings.borders = "true");

    if (settings["game-mode"] == "fumny") {
      const haha = new Audio("../sounds/haha.mp3");
      haha.play();
    } else if (settings["game-mode"] == "pendos") {
      const appear = new Audio("../sounds/pendos-appear.mp3");
      appear.play();
    }
    localStorage.setItem("settings", JSON.stringify(settings));
  });
}
