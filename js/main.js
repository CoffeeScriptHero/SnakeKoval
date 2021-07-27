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

export const background = new Image();
background.src = "../images/backgrounds/default.jpg";

let x = Math.floor(Math.random() * (canvas.width / 30)) * 30,
  y = Math.floor(Math.random() * (canvas.height / 30)) * 30,
  temp,
  width = 30,
  height = 30,
  dx,
  dy,
  sPoints = [],
  score = 0,
  lastStep,
  interval;

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
  if (parsed["speed-select"]) {
    const speed = parsed["speed-select"];
    if (speed == "noob") settings.delay = 70;
    if (speed == "easy") settings.delay = 55;
    if (speed == "default") settings.delay = 40;
    if (speed == "fast") settings.delay = 25;
    if (speed == "omg") settings.delay = 5;
  }
}

const generatePoint = () => {
  do {
    dx = Math.floor(Math.random() * (canvas.width / 30)) * 30;
    dy = Math.floor(Math.random() * (canvas.height / 30)) * 30;
  } while (dx == x && dy == y);
};

const spawnPoint = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(dx, dy, width, height);
  ctx.strokeRect(dx, dy, width, height);
  ctx.lineWidth = "4px";
};

const check = () => {
  if (x == dx && y == dy) {
    sPoints.push();
    pickup.play();
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
    ctx.fillStyle = settings.color;
    ctx.fillRect(sPoints[i].x, sPoints[i].y, width, height);
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

  sPoints.forEach((elem, index) => {
    for (let i = 0; i < sPoints.length; i++) {
      if (i === index) return;
      if (elem.x === sPoints[i].x && elem.y === sPoints[i].y) {
        clearInterval(interval);
        death.play();
        gameAlert.classList.remove("display-none");
        gameAlert.querySelector(".score").textContent = score;
      }
    }
  });

  sPoints.unshift({ x: x, y: y });
}

setHandlers();

export function main() {
  (sPoints = []), (temp = ""), (lastStep = ""), (score = 0);
  document.addEventListener("keydown", setAxis);
  generatePoint();
  interval = setInterval(game, settings.delay);
}

main();
