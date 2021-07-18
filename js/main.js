"use strict";

const canvas = document.getElementById("canvas");
let x = 30,
  y = 30,
  width = 30,
  height = 30,
  delay = 1000,
  dx = 270,
  dy = 210,
  timerId,
  temp,
  snakePoints = [];

function setTimer(letter, sign) {
  timerId = setTimeout(function tick() {
    for (let i = 0; i < snakePoints.length; i++) {
      snakePoints[i].delete();
    }
    if (sign === "+") {
      letter === "x" ? (x += 30) : (y += 30);
    } else if (sign === "-") {
      letter === "x" ? (x -= 30) : (y -= 30);
    }
    snakeMove();
    timerId = setTimeout(tick, delay);
  }, delay);
}

function timeoutClean() {
  if (timerId) {
    clearTimeout(timerId);
  }
}

class Snake {
  constructor() {
    this.snake = canvas.getContext("2d");
  }
  appear(x1, y1) {
    switch (x) {
      case canvas.width:
        x = 0;
        break;
      case -30:
        x = canvas.width - 30;
        break;
    }
    switch (y) {
      case canvas.height:
        y = 0;
        break;
      case -30:
        y = canvas.height - 30;
        break;
    }
    if (typeof x1 !== "undefined" && typeof y1 !== "undefined") {
      this.snake.fillRect(x1, y1, width, height);
      return this.snake.strokeRect(x1, y1, width, height);
    }
    point.check();
    this.snake.fillStyle = "#FFF";
    this.snake.fillRect(x, y, width, height);
    return this.snake.strokeRect(x, y, width, height);
  }
  delete() {
    return this.snake.clearRect(x - 1, y - 1, width + 2, height + 2);
  }
  makeStep() {
    switch (temp) {
      case 37:
        this.appear(x + 30, y);
        break;
      case 38:
        this.appear(x, y + 30);
        break;
      case 39:
        this.appear(x - 30, y);
        break;
      case 40:
        this.appear(x, y - 30);
        break;
    }
  }
}

class Point {
  constructor() {
    this.point = canvas.getContext("2d");
  }
  appear() {
    this.point.fillStyle = "#FF0000";
    return this.point.fillRect(dx, dy, width, height);
  }
  generate() {
    dx = Math.floor(Math.random() * 28) * 30;
    dy = Math.floor(Math.random() * 18) * 30;
  }
  delete() {
    return this.point.clearRect(dx, dy, width, height);
  }
  check() {
    if (x === dx && y === dy) {
      const snakePoint = new Snake();
      snakePoint.makeStep();
      snakePoints.push(snakePoint);
      this.delete();
      this.generate();
      this.appear();
    }
  }
}
class Game {
  constructor(canvas) {
    this.canvas = canvas;
  }

  listenKey(snake) {
    window.addEventListener(`keyup`, (e) => {
      if (
        (e.keyCode === 39 && temp === 37) ||
        (e.keyCode === 37 && temp === 39) ||
        (e.keyCode === 38 && temp === 40) ||
        (e.keyCode === 40 && temp === 38)
      ) {
        snakeMove();
        return;
      }

      timeoutClean();

      for (let i = 0; i < snakePoints.length; i++) {
        snakePoints[i].delete();
      }

      switch (e.code) {
        case "ArrowUp":
          y -= 30;
          setTimer("y", "-");
          break;

        case "ArrowRight":
          x += 30;
          setTimer("x", "+");
          break;

        case "ArrowLeft":
          x -= 30;
          setTimer("x", "-");
          break;

        case "ArrowDown":
          y += 30;
          setTimer("y", "+");
          break;
      }

      temp = e.keyCode;
      snakeMove();
    });
  }
}

function snakeMove() {
  for (let i = 0; i < snakePoints.length; i++) {
    i === 0 ? snakePoints[i].appear() : snakePoints[i].makeStep();
  }
}

const snake = new Snake();
const point = new Point();
const game = new Game(canvas);

window.addEventListener("load", () => {
  snake.appear();
  snakePoints.push(snake);
  point.appear();
  game.listenKey(snake);
});
