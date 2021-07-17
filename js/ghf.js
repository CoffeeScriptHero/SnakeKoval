"use strict";

const draw = () => {
  let canvas = document.getElementById("tutorial");
  if (canvas.getContext) {
    let snake = canvas.getContext("2d");
    let point = canvas.getContext("2d");
    let x = 30,
      y = 30,
      width = 30,
      height = 30,
      delay = 80,
      dx,
      dy,
      timerId,
      temp;

    snake.fillStyle = "#FF0000";

    const squareDelete = () => {
      return snake.clearRect(x, y, width, height);
    };

    const squareAppear = () => {
      switch (x) {
        case 840:
          x = 0;
          break;

        case -30:
          x = 810;
          break;
      }

      switch (y) {
        case 540:
          y = 0;
          break;

        case -30:
          y = 510;
          break;
      }

      return snake.fillRect(x, y, width, height);
    };

    let min = 0,
      max = 500;
    const pointRandom = (min, max) => {
      return Math.random() * (max - min + min);
    };

    const generatePoint = () => {
      dx = pointRandom(min, max);
      dy = pointRandom(min, max);
      return point.fillRect(dx, dy, width, height);
    };

    const pointAppear = () => {
      point.fillRect((dx = 0), (dy = 0), width, height);
      return (point.fillStyle = "#FFF");
    };

    const pickUpPoint = () => {
      if (x === dx && y === dy) {
        deletePoint();
      }
    };

    const timeoutClean = () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
    let pointTimer;
    const pointCheck = () => {
      pointTimer = setTimeout(function check() {
        if (x === dx && y === dy) {
          generatePoint();
          pointAppear();
        }
        pointTimer = setTimeout(check, 100);
      }, 100);
    };

    const timerSet = (arg) => {
      switch (arg) {
        case "ArrowUp":
          timerId = setTimeout(function tick() {
            squareDelete();
            y -= 30;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
        case "ArrowRight":
          timerId = setTimeout(function tick() {
            squareDelete();
            x += 30;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
        case "ArrowLeft":
          timerId = setTimeout(function tick() {
            squareDelete();
            x -= 30;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
        case "ArrowDown":
          timerId = setTimeout(function tick() {
            squareDelete();
            y += 30;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
      }
    };

    pointAppear();

    squareAppear();

    pointCheck();
    window.addEventListener("keyup", (e) => {
      if (e.repeat) {
        squareAppear();
        return;
      }

      if (
        (e.code === "ArrowUp" && temp === "ArrowDown") ||
        (e.code === "ArrowDown" && temp === "ArrowUp") ||
        (e.code === "ArrowRight" && temp === "ArrowLeft") ||
        (e.code === "ArrowLeft" && temp === "ArrowRight")
      ) {
        squareAppear();
        return;
      }

      squareDelete();

      timeoutClean();
      switch (e.code) {
        case "ArrowUp":
          y -= 30;
          timerSet("ArrowUp");
          break;

        case "ArrowRight":
          x += 30;
          timerSet("ArrowRight");
          break;

        case "ArrowLeft":
          x -= 30;
          timerSet("ArrowLeft");
          break;

        case "ArrowDown":
          y += 30;
          timerSet("ArrowDown");
          break;
      }
      temp = e.code;
      squareAppear();
    });
  }
};
window.addEventListener("load", draw());
// timerSet(arg) {
//   switch (arg) {
//     case "ArrowUp":
//       setTimer("y", "-");
//       break;
//     case "ArrowRight":
//       setTimer("x", "+");
//       break;
//     case "ArrowLeft":
//       setTimer("x", "-");
//       break;
//     case "ArrowDown":
//       setTimer("y", "+");
//       break;
//   }
// }
