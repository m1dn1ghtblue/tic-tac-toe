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
		if (_field[row][0] === _field[row][1] && _field[row][0] === _field[row][2]) {
			return [
				[row, 0],
				[row, 1],
				[row, 2],
			];
		}
		return null;
	}

	function _checkColumn(col) {
		if (_field[0][col] === '') {
			return false;
		}
		if (_field[0][col] === _field[1][col] && _field[0][col] === _field[2][col]) {
			return [
				[0, col],
				[1, col],
				[2, col],
			];
		}
		return null;
	}

	function _checkDiagonal() {
		if (_field[1][1] === '') {
			return false;
		}
		if (_field[1][1] === _field[0][0] && _field[1][1] === _field[2][2]) {
			return [
				[0, 0],
				[1, 1],
				[2, 2],
			];
		}
		if (_field[1][1] === _field[0][2] && _field[1][1] === _field[2][0]) {
			return [
				[0, 2],
				[1, 1],
				[2, 0],
			];
		}
		return null;
	}

	function _checkPosition(i, j) {
		if (!((i + j) % 2)) {
			// check corners and center
			const diagonal = _checkDiagonal();
			if (diagonal) {
				return diagonal;
			}
		}
		// check edges
		const row = _checkRow(i);
		if (row) {
			return row;
		}
		return _checkColumn(j);
	}

	return {
		getMark,
		putO,
		putX,
		reset,
	};
})();

const gameGrid = document.getElementById('game-field');
const newGameButton = document.getElementById('new-game-btn');
const player1Label = document.getElementById('player-1-label');
const player2Label = document.getElementById('player-2-label');
const player1NameLabel = document.getElementById('player-1-name');
const player2NameLabel = document.getElementById('player-2-name');
const player1ScoreLabel = document.getElementById('player-1-score');
const player2ScoreLabel = document.getElementById('player-2-score');
const restartButton = document.getElementById('restart-btn');
newGameButton.addEventListener('click', newGame);
restartButton.addEventListener('click', restart);

const cells = [];
let player1 = null;
let player2 = null;
let activePlayer = player1;
let turns = 0;
let playable = false;

newGame();

function newGame() {
	player1 = PlayerFactory('Player 1', true);
	player2 = PlayerFactory('Player 2', false);

	activePlayer = player1;

	player1Label.classList.add('active');
	player2Label.classList.remove('active');
	player1NameLabel.innerText = player1.name;
	player2NameLabel.innerText = player2.name;

	updateScore();

	restart();
}

function restart() {
	Game.reset();
	makeField();
	turns = 0;
	playable = true;
	restartButton.disabled = true;
}

function makeField() {
	while (gameGrid.firstChild) {
		gameGrid.removeChild(gameGrid.firstChild);
	}

	for (let i = 0; i < 3; ++i) {
		cells[i] = [];
		for (let j = 0; j < 3; ++j) {
			let cell = makeCell();
			cells[i].push(cell);
			cells[i][j].addEventListener('click', makeTurn.bind(cell, i, j));
		}
	}
}

function makeTurn(i, j) {
	if (!playable) {
		return;
	}

	try {
		const line = activePlayer.makeTurn(i, j);
		this.innerText = activePlayer.mark;
		if (line) {
			win(line);
		}

		switchActive();

		turns++;
		if (turns == 9) {
			stop();
		}
	} catch {
		console.log('cell is ocuupied!');
	}
}

function stop() {
	playable = false;
	restartButton.disabled = false;
}

function win(line) {
	for (let i = 0; i < 3; ++i) {
		cells[line[i][0]][line[i][1]].classList.add('win');
	}

	activePlayer.addScore();
	updateScore();
	stop();
}

function switchActive() {
	player1Label.classList.toggle('active');
	player2Label.classList.toggle('active');
	activePlayer = activePlayer === player1 ? player2 : player1;
}

function makeCell() {
	const cell = document.createElement('div');
	cell.classList.add('cell');
	gameGrid.appendChild(cell);

	return cell;
}

function updateScore() {
	player1ScoreLabel.innerText = player1.getScore();
	player2ScoreLabel.innerText = player2.getScore();
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
		makeTurn: isXPlayer ? Game.putX : Game.putO,
		mark: isXPlayer ? 'X' : 'O',
	};
}
