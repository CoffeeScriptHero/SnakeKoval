const btn = document.querySelector(`.settings-button`);
const modal = document.querySelector(`.game-settings`);
const selects = document.querySelectorAll(".settings-select");
const saveBtn = document.querySelector(".save-button");
const resBtn = document.querySelector(".game-restart");
const gameAlert = document.querySelector(".game-alert");
const closeBtn = document.querySelector(".close-button");
const firstAlert = document.querySelector(".first-alert");
const settings = { color: "white", "game-mode": "default", borders: false };
const header = document.querySelector(".snake-header");
const title = document.querySelector(".title");

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
    const parsedSettings = JSON.parse(localStorage.getItem("settings"));
    selects.forEach((select, index) => {
      if (!localeSettings || !parsedSettings[select.id]) {
        select.value = select.querySelector(`option[value="default"]`).value;
      } else {
        // console.log(
        //   (select.value = select.querySelector(
        //     `option[value="${parsedSettings[select.id]}"]`
        //   ).value)
        // );
        select.value = select.querySelector(
          `option[value="${parsedSettings[select.id]}"]`
        ).value;
      }
    });

    modal.querySelectorAll("input").forEach((input) => {
      input.hasAttribute("checked")
        ? (input.checked = true)
        : (input.checked = false);
    });
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
          select.value == "default"
            ? (settings.color = "white")
            : (settings.color = select.value);
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
    const input = modal.querySelector(`input[value="no"]`);
    input.checked == true
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
