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

function snakeDeleting(keyCode) {
  for (let i = 0; i < snakePoints.length; i++) {
    if (!temp) {
      temp = keyCode;
    }
    switch (temp) {
      case 37: //left
        snakePoints[i].delete(calculateCoord(i, -30, x), y);
        break;
      case 38: // up
        snakePoints[i].delete(x, calculateCoord(i, -30, y));
        break;
      case 39: // right
        snakePoints[i].delete(calculateCoord(i, 30, x), y);
        break;
      case 40: // down
        snakePoints[i].delete(x, calculateCoord(i, 30, y));
        break;
    }
  }
}

function snakeMove() {
  for (let i = 0; i < snakePoints.length; i++) {
    i === 0 ? snakePoints[i].appear() : snakePoints[i].makeStep(i);
  }
}

function calculateCoord(n, step, value) {
  return (value -= n * step);
}

function timeoutClean() {
  return timerId ? clearTimeout(timerId) : false;
}

function setTimer(letter, sign) {
  timerId = setTimeout(function tick() {
    snakeDeleting();
    if (sign === "+") {
      letter === "x" ? (x += 30) : (y += 30);
    } else if (sign === "-") {
      letter === "x" ? (x -= 30) : (y -= 30);
    }
    snakeMove();
    timerId = setTimeout(tick, delay);
  }, delay);
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
    } else {
      point.check();
      this.snake.fillStyle = "#33f3ff";
      this.snake.fillRect(x, y, width, height);
      return this.snake.strokeRect(x, y, width, height);
    }
  }

  delete(x2, y2) {
    if (typeof x2 !== "undefined" && typeof y2 !== "undefined") {
      return this.snake.clearRect(x2 - 1, y2 - 1, width + 2, height + 2);
    }
    return this.snake.clearRect(x - 1, y - 1, width + 2, height + 2);
  }

  makeStep(i) {
    switch (temp) {
      case 37:
        this.appear(calculateCoord(i, -30, x), y);
        break;
      case 38:
        this.appear(x, calculateCoord(i, -30, y));
        break;
      case 39:
        this.appear(calculateCoord(i, 30, x), y);
        break;
      case 40:
        this.appear(x, calculateCoord(i, 30, y));
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
      snakePoints.push(snakePoint);
      snakePoint.makeStep();
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
    window.addEventListener(`keydown`, (e) => {
      if (e.repeat || e.keyCode - temp === 2 || temp - e.keyCode === 2) {
        return;
      }

      timeoutClean();

      snakeDeleting(e.keyCode);

      switch (e.keyCode) {
        case 38:
          y -= 30;
          setTimer("y", "-");
          break;

        case 39:
          x += 30;
          setTimer("x", "+");
          break;

        case 37:
          x -= 30;
          setTimer("x", "-");
          break;

        case 40:
          y += 30;
          setTimer("y", "+");
          break;
      }
      temp = e.keyCode;
      snakeMove();
    });
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
