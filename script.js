'use strict';
// Let's go...... No giving up!!!!!

const gameBoard = document.querySelector('.board');
const cells = document.querySelectorAll('[data-cell]');
const winMes = document.querySelector('.winning-message');
const winMesText = document.getElementById('winningMessageText');
const restart = document.getElementById('restartButton');
const player1 = 'x';
const player2 = 'circle';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let isPlayer2Turn = false;

const start = function () {
  isPlayer2Turn = false;
  cells.forEach(cell => {
    cell.classList.remove(player1);
    cell.classList.remove(player2);
    cell.removeEventListener('click', cellClick);
    cell.addEventListener('click', cellClick, { once: true });
  });
  hoverBoard();
  winMes.classList.remove('show');
};

restart.addEventListener('click', start);

const cellClick = function (e) {
  const cell = e.target;
  const currentClass = isPlayer2Turn ? player2 : player1;
  placeCell(cell, currentClass);
  if (win(currentClass)) {
    gameEnd(false);
  } else if (isDraw()) {
    gameEnd(true);
  } else {
    toggleTurns();
    hoverBoard();
  }
};

const gameEnd = function (draw) {
  if (draw) {
    winMesText.innerHTML = 'The game ended in a draw';
  } else {
    winMesText.innerHTML = `Player ${isPlayer2Turn ? '2' : '1'} wins`;
  }
  winMes.classList.add('show');
};

const isDraw = function () {
  return [...cells].every(cell => {
    return cell.classList.contains(player1) || cell.classList.contains(player2);
  });
};

const placeCell = function (cell, currentClass) {
  cell.classList.add(currentClass);
};

const toggleTurns = function () {
  isPlayer2Turn = !isPlayer2Turn;
};

const hoverBoard = function () {
  board.classList.remove(player1);
  board.classList.remove(player2);
  if (isPlayer2Turn) {
    board.classList.add(player2);
  } else {
    board.classList.add(player1);
  }
};

const win = function (currentClass) {
  return winCombos.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

const init = function () {
  start();
};

init();
