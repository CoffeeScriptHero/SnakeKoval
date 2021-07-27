"use strict";
import {
  btn,
  modal,
  selects,
  setHandlers,
  saveBtn,
  resBtn,
  gameAlert,
  settings,
} from "./settings.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pickup = new Audio("../sounds/pickup.mp3");
const death = new Audio("../sounds/death.mp3");
const fumny_pickup = new Audio("../sounds/fumny-pickup.mp3");
const fumny_death = new Audio("../sounds/fumny-death.mp3");

export const background = new Image();
background.src = "../images/backgrounds/default.jpg";

let x = Math.floor(Math.random() * (canvas.width / 30)) * 30,
  y = Math.floor(Math.random() * (canvas.height / 30)) * 30,
  temp,
  width = 30,
  height = 30,
  dx,
  delay = 40,
  dy,
  sPoints = [],
  score = 0,
  lastStep,
  interval,
  gameMode = settings["game-mode"];

sPoints[0] = { x: x, y: y };

if (localStorage.getItem("settings")) {
  var parsed = JSON.parse(localStorage["settings"]);
  parsed["snake-bg"]
    ? (background.src = parsed["snake-bg-src"])
    : (background.src = "../images/backgrounds/default.jpg");

  if (parsed["snake-color"]) {
    settings.color = parsed["snake-color"];
  }

  if (parsed["page-bg"] == "white") {
    document.body.classList.remove("black");
    document.querySelector(".title").classList.remove("neon-title");
  } else {
    document.body.classList.add("black");
    document.querySelector(".title").classList.add("neon-title");
  }

  if (parsed["game-mode"]) {
    gameMode = parsed["game-mode"];
  }
}

const updateValues = () => {
  if (localStorage.getItem("settings")) {
    const locale_delay = JSON.parse(localStorage.getItem("settings")).delay;
    const locale_gameMode = JSON.parse(localStorage.getItem("settings"))[
      "game-mode"
    ];
    if (locale_delay) {
      delay = locale_delay;
    }
    if (locale_gameMode) {
      gameMode = locale_gameMode;
    }
  }
};

const generatePoint = () => {
  do {
    dx = Math.floor(Math.random() * (canvas.width / 30)) * 30;
    dy = Math.floor(Math.random() * (canvas.height / 30)) * 30;
  } while (dx == x && dy == y);
};

const spawnPoint = () => {
  if (gameMode == "default") {
    ctx.fillStyle = "red";
    ctx.fillRect(dx, dy, width, height);
    ctx.strokeRect(dx, dy, width, height);
  } else {
    const img1 = new Image();
    img1.src = `../images/skins/${gameMode}2.jpg`;
    ctx.drawImage(img1, dx, dy);
  }
};

const check = () => {
  if (x == dx && y == dy) {
    sPoints.push();
    if (gameMode == "default") {
      pickup.play();
    } else if (gameMode == "fumny") {
      fumny_pickup.play();
    }
    score++;
    generatePoint();
    return;
  }
  sPoints.pop();
};

const checkCoordinates = () => {
  if (x >= canvas.width) {
    x = -30;
  } else if (x <= -30) {
    x = canvas.width;
  }

  if (y >= canvas.height) {
    y = -30;
  } else if (y <= -30) {
    y = canvas.height;
  }
};

function setAxis(e) {
  if (e.keyCode === 37 && temp !== "right" && lastStep !== "right") {
    temp = "left";
  } else if (e.keyCode === 38 && temp !== "down" && lastStep !== "down") {
    temp = "up";
  } else if (e.keyCode === 39 && temp !== "left" && lastStep !== "left") {
    temp = "right";
  } else if (e.keyCode === 40 && temp !== "up" && lastStep !== "up") {
    temp = "down";
  }
}

function game() {
  checkCoordinates();
  ctx.drawImage(background, 0, 0);
  spawnPoint();
  for (let i = 0; i < sPoints.length; i++) {
    if (gameMode == "default") {
      ctx.fillStyle = settings.color;
      ctx.fillRect(sPoints[i].x, sPoints[i].y, width, height);
      ctx.strokeRect(sPoints[i].x, sPoints[i].y, width, height);
    } else {
      const img2 = new Image();
      img2.src = `../images/skins/${gameMode}1.jpg`;
      ctx.drawImage(img2, sPoints[i].x, sPoints[i].y);
    }
  }

  if (temp == "left") {
    x -= 30;
    lastStep = "left";
  } else if (temp == "right") {
    x += 30;
    lastStep = "right";
  } else if (temp == "up") {
    y -= 30;
    lastStep = "up";
  } else if (temp == "down") {
    y += 30;
    lastStep = "down";
  }

  check();

  sPoints.forEach((elem, index) => {
    for (let i = 0; i < sPoints.length; i++) {
      if (i === index) return;
      if (elem.x === sPoints[i].x && elem.y === sPoints[i].y) {
        clearInterval(interval);
        if (gameMode == "default") {
          death.play();
        } else if (gameMode == "fumny") {
          fumny_death.play();
        }
        gameAlert.classList.remove("display-none");
        gameAlert.querySelector(".score").textContent = score;
      }
    }
  });

  sPoints.unshift({ x: x, y: y });
}

setHandlers();

export function main() {
  updateValues();
  (sPoints = []), (temp = ""), (lastStep = ""), (score = 0);
  document.addEventListener("keydown", setAxis);
  generatePoint();
  interval = setInterval(game, delay);
}

main();
