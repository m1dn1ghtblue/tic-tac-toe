'use strict';

class GameError extends Error {
	constructor(message) {
		super(message);
	}

	static InvalidCoordinates(i, j) {
		return new GameError(`Can't place mark on coordinates: ${i} ${j}`);
	}
}

const Game = (function () {
	const _field = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];

	function reset() {
		for (let i = 0; i < 3; ++i) {
			for (let j = 0; j < 3; ++j) {
				_field[i][j] = '';
			}
		}
	}

	function putX(i, j) {
		return _putMark(i, j, 'x');
	}

	function putO(i, j) {
		return _putMark(i, j, 'o');
	}

	function getMark(i, j) {
		return _field[i][j];
	}

	function _putMark(i, j, mark) {
		if (i >= 0 && i <= 2 && j >= 0 && j <= 2 && _field[i][j] === '') {
			_field[i][j] = mark;
			return _checkPosition(i, j);
		}

		throw GameError.InvalidCoordinates(i, j);
	}

	function _checkRow(row) {
		if (_field[row][0] === '') {
			return false;
		}
		return _field[row][0] === _field[row][1] && _field[row][0] === _field[row][2];
	}

	function _checkColumn(col) {
		if (_field[0][col] === '') {
			return false;
		}
		return _field[0][col] === _field[1][col] && _field[0][col] === _field[2][col];
	}

	function _checkDiagonal() {
		if (_field[1][1] === '') {
			return false;
		}
		return (
			(_field[1][1] === _field[0][0] && _field[1][1] === _field[2][2]) ||
			(_field[1][1] === _field[0][2] && _field[1][1] === _field[2][0])
		);
	}

	function _checkPosition(i, j) {
		if (!((i + j) % 2)) {
			// check corners and center
			if (_checkDiagonal()) {
				return true;
			}
		}
		// check edges
		return _checkRow(i) || _checkColumn(j);
	}

	return {
		getMark,
		putO,
		putX,
		reset,
	};
})();

const gameGrid = document.getElementById('game-field');
const restartButton = document.getElementById('restart-btn');
const player1Label = document.getElementById('player-1-label');
const player2Label = document.getElementById('player-2-label');
const player1NameLabel = document.getElementById('player-1-name');
const player2NameLabel = document.getElementById('player-2-name');
const player1ScoreLabel = document.getElementById('player-1-score');
const player2ScoreLabel = document.getElementById('player-2-score');
restartButton.addEventListener('click', reset);

const cells = [];
let player1 = null;
let player2 = null;
let player1Turn = true;

reset();

function reset() {
	player1 = PlayerFactory('Player 1', true);
	player2 = PlayerFactory('Player 2', false);
	player1Turn = true;

	player1Label.classList.add('active');
	player2Label.classList.remove('active');
	player1NameLabel.innerText = player1.name;
	player2NameLabel.innerText = player2.name;

	player1ScoreLabel.innerText = player1.getScore();
	player2ScoreLabel.innerText = player2.getScore();

	Game.reset();

	while (gameGrid.firstChild) {
		gameGrid.removeChild(gameGrid.firstChild);
	}

	for (let i = 0; i < 3; ++i) {
		cells[i] = [];
		for (let j = 0; j < 3; ++j) {
			cells[i].push(makeCell());
		}
	}
}

function switchActive() {
	player1Label.classList.toggle('active');
	player2Label.classList.toggle('active');
	player1Turn = !player1Turn;
}

function makeCell() {
	const cell = document.createElement('div');
	cell.classList.add('cell');
	gameGrid.appendChild(cell);

	return cell;
}

function PlayerFactory(name, isXPlayer) {
	let _score = 0;
	function addScore() {
		_score++;
	}

	function getScore() {
		return _score;
	}

	return {
		name,
		addScore,
		getScore,
		turnFunction: isXPlayer ? Game.putX : Game.putO,
	};
}
