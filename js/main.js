"use strict";

const canvas = document.getElementById("canvas");
let x = 30,
  y = 30,
  width = 30,
  height = 30,
  delay = 70,
  dx = 0,
  dy = 0,
  timerId,
  temp,
  snakePoints = [];

function setTimer(letter, sign) {
  timerId = setTimeout(function tick() {
    snake.delete();
    if (sign === "+") {
      letter === "x" ? (x += 30) : (y += 30);
    } else if (sign === "-") {
      letter === "x" ? (x -= 30) : (y -= 30);
    }
    snake.appear();
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
    point.check();
    this.snake.fillStyle = "#FFF";
    if (typeof x1 !== "undefined" && typeof y1 !== "undefined") {
      this.snake.fillRect(x1, y1, width, height);
      return this.snake.strokeRect(x1, y1, width, height);
    }
    this.snake.fillRect(x, y, width, height);
    return this.snake.strokeRect(x, y, width, height);
  }
  delete() {
    return this.snake.clearRect(x - 1, y - 1, width + 2, height + 2);
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
    this.point.fillStyle = "#FF0000";
    return this.point.fillRect(dx, dy, width, height);
  }
  delete() {
    return this.point.clearRect(dx, dy, width, height);
  }
  check() {
    if (x === dx && y === dy) {
      // const snakePoint = new Snake();
      // snakePoints.push(snakePoint.appear(x - 20, y - 20));
      // console.log(snakePoints);
      this.delete();
      this.generate();
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
        snake.appear();
        return;
      }

      snake.delete();

      timeoutClean();

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

      snake.appear();
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
