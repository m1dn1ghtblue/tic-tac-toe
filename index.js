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

	function getEmptyCells() {
		let empty = [];
		for (let i = 0; i < 3; ++i) {
			for (let j = 0; j < 3; ++j) {
				if (_field[i][j] === '') {
					empty.push([i, j]);
				}
			}
		}

		return empty;
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
		getEmptyCells,
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
const robotButton = document.getElementById('robot-icon');
const robotLabel = document.getElementById('robot-menu');

newGameButton.addEventListener('click', newGame);
restartButton.addEventListener('click', restart);
robotButton.addEventListener('click', switchRobot);

const cells = [];
let player1 = null;
let player2 = null;
let activePlayer = player1;
let playable = false;
let player2StateId = 0;

const easyBotIconUrl = './images/robot-easy.svg';
const hardBotIconUrl = './images/robot-hard.svg';
const botOffIconUrl = './images/robot-off.svg';

const playerStates = [
	{ active: false, name: 'Player 2', icon: botOffIconUrl, autoTurn: null },
	{ active: true, name: 'Easy bot', icon: easyBotIconUrl, autoTurn: randomTurn },
	{ active: true, name: 'Hard bot', icon: hardBotIconUrl, autoTurn: null },
];

newGame();

function newGame() {
	player1 = playerFactory('Player 1', true);
	player2 = playerFactory(playerStates[player2StateId].name, false, playerStates[player2StateId].autoTurn);

	activePlayer = player1;

	player1Label.classList.add('active');
	player2Label.classList.remove('active');
	player1NameLabel.innerText = player1.name;
	player2NameLabel.innerText = player2.name;

	updateScore();

	restart();
}

function switchRobot() {
	player2StateId = (player2StateId + 1) % playerStates.length;

	if (playerStates[player2StateId].active) {
		robotLabel.classList.add('active');
	} else {
		robotLabel.classList.remove('active');
	}

	robotButton.src = playerStates[player2StateId].icon;

	newGame();
}

function restart() {
	Game.reset();
	makeField();
	playable = true;
	restartButton.disabled = true;
	if (activePlayer.autoTurn) {
		activePlayer.autoTurn();
	}
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
			cells[i][j].addEventListener('click', makeTurn.bind(undefined, i, j));
		}
	}
}

function makeTurn(i, j) {
	if (!playable) {
		return;
	}

	const line = activePlayer.makeTurn(i, j);
	cells[i][j].innerText = activePlayer.mark;
	if (line) {
		win(line);
	}

	if (Game.getEmptyCells().length === 0) {
		stop();
	}

	switchActive();
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

	if (activePlayer.autoTurn && playable) {
		activePlayer.autoTurn();
	}
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

function randomTurn() {
	const empty = Game.getEmptyCells();
	const coordinates = empty[Math.floor(Math.random() * empty.length)];
	makeTurn(...coordinates);
}

function playerFactory(name, isXPlayer, autoTurn = null) {
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
		autoTurn,
	};
}
