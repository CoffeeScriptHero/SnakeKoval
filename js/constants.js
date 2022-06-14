//main.js constants
export const canvas =
  screen.width <= 1600
    ? document.getElementById("laptop-canvas")
    : document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const pickup = new Audio("./sounds/pickup.mp3");
export const death = new Audio("./sounds/death.mp3");
export const fumny_pickup = new Audio("./sounds/fumny-pickup.mp3");
export const fumny_death = new Audio("./sounds/fumny-death.mp3");
export const pendos1 = new Audio("./sounds/pendos1.mp3");
export const pendos2 = new Audio("./sounds/pendos2.mp3");
export const pendos3 = new Audio("./sounds/pendos3.mp3");
export const pendos4 = new Audio("./sounds/pendos4.mp3");
export const pendos_death = new Audio("./sounds/pendos-death.mp3");
export const pendosArr = [pendos1, pendos2, pendos3, pendos4];

//settings.js constants
export const btn = document.querySelector(`.settings-button`);
export const modal = document.querySelector(`.game-settings`);
export const selects = document.querySelectorAll(".settings-select");
export const saveBtn = document.querySelector(".save-button");
export const resBtn = document.querySelector(".game-restart");
export const gameAlert = document.querySelector(".game-alert");
export const closeBtn = document.querySelector(".close-button");
export const firstAlert = document.querySelector(".first-alert");
export const title = document.querySelector(".title");
export const inputs = document.querySelectorAll("input");
export const score = document.querySelector(".user-score");
