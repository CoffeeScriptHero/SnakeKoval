"use strict";

const draw = () => {
  let canvas = document.getElementById("tutorial");
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    let weed = canvas.getContext("2d");
    let x = 30,
      y = 30,
      width = 30,
      height = 30,
      delay = 80,
      dx,
      dy,
      timerId,
      temp;

    ctx.fillStyle = "#FF0000";

    const squareDelete = () => {
      return ctx.clearRect(x, y, width, height);
    };
    
    const squareAppear = () => {
      switch (x) {
        case 840:
          x = 0
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

      return ctx.fillRect(x, y, width, height);
    };

    let min = 0,
      max = 500;
    const weedRandom = (min, max) => {
      return Math.random() * (max - min + min);
    };

    const generateWeed = () => {
      dx = weedRandom(min, max);
      dy = weedRandom(min, max);
      return weed.fillRect(dx, dy, width, height);
    };

    const weedAppear = () => {
      weed.fillRect((dx = 0), (dy = 0), width, height);
      return (weed.fillStyle = "#FFF");
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
    let weedTimer;
    const weedCheck = () => {
      weedTimer = setTimeout(function check() {
        if (x === dx && y === dy) {
          generateWeed();
          weedAppear();
        }
        weedTimer = setTimeout(check, 100);
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

    weedAppear();

    squareAppear();

    weedCheck();
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
