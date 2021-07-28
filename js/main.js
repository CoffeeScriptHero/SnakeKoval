import {
  btn,
  modal,
  selects,
  setHandlers,
  saveBtn,
  resBtn,
  gameAlert,
  settings,
  header,
  title,
} from "./settings.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pickup = new Audio("../sounds/pickup.mp3");
const death = new Audio("../sounds/death.mp3");
const fumny_pickup = new Audio("../sounds/fumny-pickup.mp3");
const fumny_death = new Audio("../sounds/fumny-death.mp3");
const pendos1 = new Audio("../sounds/pendos1.mp3");
const pendos2 = new Audio("../sounds/pendos2.mp3");
const pendos3 = new Audio("../sounds/pendos3.mp3");
const pendos4 = new Audio("../sounds/pendos4.mp3");
const pendos_death = new Audio("../sounds/pendos-death.mp3");
const pendosArr = [pendos1, pendos2, pendos3, pendos4];
export const background = new Image();
background.src = "./images/backgrounds/default.jpg";

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
  isDead = false,
  gameMode = settings["game-mode"];

sPoints[0] = { x: x, y: y };

const updateValues = () => {
  if (localStorage.getItem("settings")) {
    const parsed = JSON.parse(localStorage["settings"]);
    parsed["snake-bg"]
      ? (background.src = parsed["snake-bg-src"])
      : (background.src = "../images/backgrounds/default.jpg");

    if (parsed["snake-color"]) {
      settings.color = parsed["snake-color"];
    }

    if (parsed["page-bg"] == "white") {
      document.body.classList.remove("black");
      title.classList.remove("neon-title");
    } else {
      document.body.classList.add("black");
      title.classList.add("neon-title");
    }

    if (parsed.delay) {
      delay = parsed.delay;
    }

    if (parsed["game-mode"]) {
      gameMode = parsed["game-mode"];
    }

    if (parsed.size) {
      if (parsed.size == "default") {
        canvas.width = 1350;
        canvas.height = 720;
        header.classList.remove("medium-width");
        title.classList.remove("smaller-fz");
      } else if (parsed.size == "medium") {
        canvas.width = 1140;
        canvas.height = 580;
        header.classList.add("medium-width");
        title.classList.add("smaller-fz");
      }
    }
    if (parsed.borders) {
      parsed.borders == "false"
        ? (settings.borders = false)
        : (settings.borders = true);
    }
  }
  sPoints = [];
  temp = "";
  lastStep = "";
  score = 0;
  x = Math.floor(Math.random() * (canvas.width / 30)) * 30;
  y = Math.floor(Math.random() * (canvas.height / 30)) * 30;
  document.querySelector(".score").textContent = 0;
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
    } else if (gameMode == "pendos") {
      pendosArr[Math.floor(Math.random() * 4)].play();
    }
    score++;
    document.querySelector(".score").textContent = score;
    generatePoint();
    return;
  }
  sPoints.pop();
};

const checkCoordinates = () => {
  if (!settings.borders) {
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
  } else if (settings.borders) {
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      checkDeath(true);
    }
  }
};

const checkDeath = (isDead) => {
  for (let i = 0; i < sPoints.length; i++) {
    if ((x == sPoints[i].x && y == sPoints[i].y) || isDead) {
      clearInterval(interval);
      if (gameMode == "default") {
        death.play();
      } else if (gameMode == "fumny") {
        fumny_death.play();
      } else if (gameMode == "pendos") {
        pendos_death.play();
      }
      gameAlert.classList.remove("display-none");
      gameAlert.querySelector(".score").textContent = score;
    }
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
  ctx.drawImage(background, 0, 0);

  spawnPoint();

  for (let i = 0; i < sPoints.length; i++) {
    if (gameMode == "default") {
      settings.color = "default"
        ? (ctx.fillStyle = "white")
        : (ctx.fillStyle = settings.color);
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

  checkDeath();

  sPoints.unshift({ x: x, y: y });

  checkCoordinates();
}

setHandlers();

export function main() {
  updateValues();
  document.addEventListener("keydown", setAxis);
  generatePoint();
  interval = setInterval(game, delay);
}

main();
