"use strict";

let x = 30,
  y = 30,
  temp,
  width = 30,
  height = 30,
  delay = 50,
  dx = 270,
  dy = 210,
  sPoints = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = "../images/backgrounds/black.jpg";

sPoints[0] = { x: x, y: y };

const generatePoint = () => {
  while (dx == x && dy == y) {
    dx = Math.floor(Math.random() * (canvas.width / 30)) * 30;
    dy = Math.floor(Math.random() * (canvas.height / 30)) * 30;
  }
};

const spawnPoint = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(dx, dy, width, height);
};

const check = () => {
  if (x == dx && y == dy) {
    sPoints.push();
    generatePoint();
  } else {
    sPoints.pop();
  }
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
  if (e.keyCode === 37 && temp !== "right") {
    temp = "left";
  } else if (e.keyCode === 38 && temp !== "down") {
    temp = "up";
  } else if (e.keyCode === 39 && temp !== "left") {
    temp = "right";
  } else if (e.keyCode === 40 && temp !== "up") {
    temp = "down";
  }
}

const game = () => {
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

  check();

  if (temp == "left") {
    x -= 30;
  } else if (temp == "right") {
    x += 30;
  } else if (temp == "up") {
    y -= 30;
  } else if (temp == "down") {
    y += 30;
  }

  sPoints.unshift({ x: x, y: y });

  sPoints.forEach((elem, index) => {
    for (let i = 0; i < sPoints.length; i++) {
      if (i === index) return;
      if (elem.x === sPoints[i].x && elem.y === sPoints[i].y)
        clearInterval(interval);
    }
  });
};

document.addEventListener("keydown", setAxis);
let interval = setInterval(game, delay);
