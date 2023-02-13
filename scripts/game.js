'use strict';

class GameError extends Error {
	constructor(message) {
		super(message);
	}

	static InvalidCoordinates(i, j) {
		return new GameError(`Can't place mark on coordinates: ${i} ${j}`);
	}
}

export const Game = (function () {
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

	function clearCell(i, j) {
		_field[i][j] = '';
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
		clearCell,
	};
})();
