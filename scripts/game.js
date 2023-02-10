const Game = (function () {
	const _field = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];

	function putX(i, j) {
		_putMark(i, j, 'x');
	}

	function putO(i, j) {
		_putMark(i, j, 'o');
	}

	function getMark(i, j) {
		return _field[i][j];
	}

	function _putMark(i, j, mark) {
		if (i >= 0 && i <= 2 && j >= 0 && j < 2) {
			if (_field[i][j] === '') {
				_field[i][j] = mark;
			} else {
				throw new Error('Cannot put a mark in occupied cell');
			}

			return _checkPosition(i, j);
		}

		throw new Error('invalid field coordinates');
	}

	function _checkRow(row) {
		return _field[row][0] === _field[row][1] && _field[row][0] === _field[row][2];
	}

	function _checkColumn(col) {
		return _field[0][col] === _field[1][col] && _field[0][col] === _field[2][col];
	}

	function _checkDiagonal() {
		return (
			(_field[1][1] === _field[0][0] && _field[1][1] === _field[2][2]) ||
			(_field[1][1] === _field[0][2] && _field[1][1] === _field[2][0])
		);
	}

	function _checkPosition(i, j) {
		if ((i + j) % 2) {
			// corners and center
			if (_checkDiagonal()) {
				return true;
			}
		}
		// edges too
		return _checkRow(i) || _checkColumn(j);
	}

	return {
		getMark,
		putO,
		putX,
	};
})();
