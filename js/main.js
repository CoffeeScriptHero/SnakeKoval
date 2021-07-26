"use strict";

import { btn, modal, selects, setHandlers } from "./settings.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = "../images/backgrounds/blue.jpg";

let x = Math.floor(Math.random() * (canvas.width / 30)) * 30,
  y = Math.floor(Math.random() * (canvas.height / 30)) * 30,
  temp,
  width = 30,
  height = 30,
  delay = 20,
  dx,
  dy,
  sPoints = [],
  score = 0,
  lastStep,
  timerId;

sPoints[0] = { x: x, y: y };

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
  console.log(lastStep);
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
    // const img2 = new Image();
    // img2.src = "../js/gfd.PNG";
    ctx.fillStyle = "white";
    ctx.fillRect(sPoints[i].x, sPoints[i].y, width, height);
    ctx.strokeRect(sPoints[i].x, sPoints[i].y, width, height);
    // ctx.drawImage(img2, sPoints[i].x, sPoints[i].y);
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
      if (elem.x === sPoints[i].x && elem.y === sPoints[i].y)
        clearInterval(interval);
    }
  });

  sPoints.unshift({ x: x, y: y });
}

document.addEventListener("keydown", setAxis);
generatePoint();
setHandlers();

let interval = setInterval(game, delay);
