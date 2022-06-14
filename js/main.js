import { settings, setHandlers } from "./settings.js";

import {
  canvas,
  ctx,
  pickup,
  death,
  fumny_pickup,
  fumny_death,
  pendos_death,
  pendosArr,
  title,
  gameAlert,
} from "./constants.js";

export const background = new Image();
background.src = "images/backgrounds/default.jpg";

let x = Math.floor(Math.random() * (canvas.width / 30)) * 30,
  y = Math.floor(Math.random() * (canvas.height / 30)) * 30,
  temp,
  width = 30,
  height = 30,
  dx,
  dy,
  delay = 40,
  sPoints = [],
  score = 0,
  lastStep,
  interval,
  gameMode = settings["game-mode"];

sPoints[0] = { x: x, y: y };

export const updateValues = () => {
  if (localStorage.getItem("settings")) {
    const parsed = JSON.parse(localStorage["settings"]);

    background.src = parsed["snake-bg-src"];

    settings.color = parsed["snake-color"];

    if (parsed["page-bg"] == "white") {
      document.body.classList.remove("black");
      document.querySelector(".user-score").classList.add("black-fz");
      title.classList.remove("neon-title");
    }

    delay = parsed.delay;

    gameMode = parsed["game-mode"];

    settings.borders = parsed.borders;
  }

  sPoints = [];
  temp = "";
  lastStep = "";
  score = 0;
  clearInterval(interval);
  x = Math.floor(Math.random() * (canvas.width / 30)) * 30;
  y = Math.floor(Math.random() * (canvas.height / 30)) * 30;
  document.querySelector(".score").textContent = 0;
};

const generatePoint = () => {
  do {
    dx = Math.floor(Math.random() * (canvas.width / 30)) * 30;
    dy = Math.floor(Math.random() * (canvas.height / 30)) * 30;
  } while (dx == x || dy == y);
};

const spawnPoint = () => {
  if (gameMode == "default") {
    ctx.fillStyle = "red";
    ctx.fillRect(dx, dy, width, height);
  } else {
    const img1 = new Image();
    img1.src = `images/skins/${gameMode}2.jpg`;
    ctx.drawImage(img1, dx, dy);
  }
  ctx.strokeRect(dx, dy, width, height);
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
    } else if (x <= -30 && temp !== "up" && temp !== "down") {
      x = canvas.width;
    } else if (x <= -30 && (temp === "up" || temp === "down")) {
      x = canvas.width - 30;
    }

    if (y >= canvas.height) {
      y = -30;
    } else if (y <= -30 && temp !== "right" && temp !== "left") {
      y = canvas.height;
    } else if (y <= -30 && (temp === "right" || temp === "left")) {
      y = canvas.height - 30;
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

const setAxis = (e) => {
  if (e.keyCode === 37 && temp !== "right" && lastStep !== "right") {
    temp = "left";
  } else if (e.keyCode === 38 && temp !== "down" && lastStep !== "down") {
    temp = "up";
  } else if (e.keyCode === 39 && temp !== "left" && lastStep !== "left") {
    temp = "right";
  } else if (e.keyCode === 40 && temp !== "up" && lastStep !== "up") {
    temp = "down";
  }
};

const game = () => {
  ctx.drawImage(background, 0, 0);
  spawnPoint();
  for (let i = 0; i < sPoints.length; i++) {
    if (gameMode == "default") {
      settings.color == "default"
        ? (ctx.fillStyle = "white")
        : (ctx.fillStyle = settings.color);
      ctx.fillRect(sPoints[i].x, sPoints[i].y, width, height);
    } else {
      const img2 = new Image();
      img2.src = `images/skins/${gameMode}1.jpg`;
      ctx.drawImage(img2, sPoints[i].x, sPoints[i].y);
    }
    ctx.strokeRect(sPoints[i].x, sPoints[i].y, width, height);
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
};

setHandlers();

export const main = () => {
  updateValues();
  document.addEventListener("keydown", setAxis);
  generatePoint();
  interval = setInterval(game, delay);
};

main();
