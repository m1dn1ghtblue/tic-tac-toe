'use strict';

class GameError extends Error {
	constructor(message) {
		super(message);
	}

	static InvalidCoordinates(i, j) {
		return new GameError(`Can't place mark on coordinates: ${i} ${j}`);
	}
}

const GameField = (function () {
	const _field = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];

	function reset() {
		for (let i = 0; i <= 2; ++i) {
			for (let j = 0; j <= 2; ++j) {
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

const PlayerFactory = function (name, isXPlayer) {
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
		turnFunction: isXPlayer ? GameField.putX : GameField.putO,
	};
};
