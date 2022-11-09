"use strict";

// Выбор элементов

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceElement = document.querySelector(".dice");

// Условия начала игры

let isPlaying, totalScrols, currentScore, activPlayer;

const newGame = function () {
  diceElement.classList.add("hidden");
  totalScrols = [0, 0];
  currentScore = 0;
  activPlayer = 0;
  isPlaying = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove(".player--active");
};

newGame();

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activPlayer}`).textContent = currentScore;
  activPlayer = activPlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

// Бросаем кубик

//1. Генерация рандомного числа
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;

    //2. Отображение числа на кубике

    diceElement.classList.remove("hidden");
    diceElement.src = `./img/dice${randomNumber}.png`;

    //3. Прибавляем значение кубика к текущему счёту если случайное число !==1, в ином случае передаём ход другому игроку

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activPlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// Оставить очки

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    // 1. Добавить текущие очки к общим очкам текущего игрока
    totalScrols[activPlayer] += currentScore;
    document.getElementById(`score--${activPlayer}`).textContent =
      totalScrols[activPlayer];
    const newLocal = totalScrols[activPlayer];
    //2. Если общие очки >= 100 то текущий игрок выйграл, иначе передаём ход другому игроку
    if (totalScrols[activPlayer] >= 10) {
      isPlaying = false;
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.remove("player--active");
    } else {
      switchActivePlayer();
    }
  }
});

// Новая игра

btnNew.addEventListener("click", newGame);
