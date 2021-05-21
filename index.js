"use strict";

const draw = () => {
  let canvas = document.getElementById("tutorial");
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    let weed = canvas.getContext("2d");
    let x = 50,
      y = 50,
      width = 10,
      height = 10,
      delay = 100,
      dx,
      dy,
      dWidth,
      dHeight,
      timerId;

    ctx.fillStyle = "#FF0000";

    const squareDelete = () => {
      return ctx.clearRect(x, y, width, height);
    };

    const squareAppear = () => {
      switch (x) {
        case 140:
          x = 0;
          break;

        case -10:
          x = 130;
          break;
      }

      switch (y) {
        case 190:
          y = 0;
          break;
        case -10:
          y = 180;
          break;
      }

      return ctx.fillRect(x, y, width, height);
    };

    const generateWeed = () => {
      return Math.random;
    };

    const weedAppear = () => {
      weed.fillRect((dx = 20), (dy = 20), width, height);
      return (weed.fillStyle = "#FFF");
    };

    const deleteWeed = () => {
      return weed.clearRect(dx, dy, width, height);
    };

    const pickUpWeed = () => {
      if (x === dx && y === dy) {
        deleteWeed();
      }
    };

    const timeoutClean = () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };

    const timerSet = (arg) => {
      switch (arg) {
        case "ArrowUp":
          timerId = setTimeout(function tick() {
            squareDelete();
            y -= 10;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
        case "ArrowRight":
          timerId = setTimeout(function tick() {
            squareDelete();
            x += 10;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
        case "ArrowLeft":
          timerId = setTimeout(function tick() {
            squareDelete();
            x -= 10;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
        case "ArrowDown":
          timerId = setTimeout(function tick() {
            squareDelete();
            y += 10;
            squareAppear();
            timerId = setTimeout(tick, delay);
          }, delay);
          break;
      }
    };

    weedAppear();

    squareAppear();

    window.addEventListener("keydown", (e) => {
      if (e.repeat) {
        squareAppear();
        return;
      }
      squareDelete();

      timeoutClean();

      switch (e.code) {
        case "ArrowUp":
          y -= 10;
          timerSet("ArrowUp");
          break;

        case "ArrowRight":
          x += 10;
          timerSet("ArrowRight");
          break;

        case "ArrowLeft":
          x -= 10;
          timerSet("ArrowLeft");
          break;

        case "ArrowDown":
          y += 10;
          timerSet("ArrowDown");
          break;
      }
      squareAppear();
    });
  }
};
window.addEventListener("load", draw());
