/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
	// webpackBootstrap
	/******/ 'use strict';
	/******/ var __webpack_modules__ = {
		/***/ './scripts/game.js':
			/*!*************************!*\
  !*** ./scripts/game.js ***!
  \*************************/
			/***/ (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
				eval(
					"__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n\r\n\r\nclass GameError extends Error {\r\n\tconstructor(message) {\r\n\t\tsuper(message);\r\n\t}\r\n\r\n\tstatic InvalidCoordinates(i, j) {\r\n\t\treturn new GameError(`Can't place mark on coordinates: ${i} ${j}`);\r\n\t}\r\n}\r\n\r\nconst Game = (function () {\r\n\tconst _field = [\r\n\t\t['', '', ''],\r\n\t\t['', '', ''],\r\n\t\t['', '', ''],\r\n\t];\r\n\r\n\tfunction reset() {\r\n\t\tfor (let i = 0; i < 3; ++i) {\r\n\t\t\tfor (let j = 0; j < 3; ++j) {\r\n\t\t\t\t_field[i][j] = '';\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tfunction putX(i, j) {\r\n\t\treturn _putMark(i, j, 'x');\r\n\t}\r\n\r\n\tfunction putO(i, j) {\r\n\t\treturn _putMark(i, j, 'o');\r\n\t}\r\n\r\n\tfunction getMark(i, j) {\r\n\t\treturn _field[i][j];\r\n\t}\r\n\r\n\tfunction clearCell(i, j) {\r\n\t\t_field[i][j] = '';\r\n\t}\r\n\r\n\tfunction getEmptyCells() {\r\n\t\tlet empty = [];\r\n\t\tfor (let i = 0; i < 3; ++i) {\r\n\t\t\tfor (let j = 0; j < 3; ++j) {\r\n\t\t\t\tif (_field[i][j] === '') {\r\n\t\t\t\t\tempty.push([i, j]);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn empty;\r\n\t}\r\n\r\n\tfunction _putMark(i, j, mark) {\r\n\t\tif (i >= 0 && i <= 2 && j >= 0 && j <= 2 && _field[i][j] === '') {\r\n\t\t\t_field[i][j] = mark;\r\n\t\t\treturn _checkPosition(i, j);\r\n\t\t}\r\n\r\n\t\tthrow GameError.InvalidCoordinates(i, j);\r\n\t}\r\n\r\n\tfunction _checkRow(row) {\r\n\t\tif (_field[row][0] === '') {\r\n\t\t\treturn false;\r\n\t\t}\r\n\t\tif (_field[row][0] === _field[row][1] && _field[row][0] === _field[row][2]) {\r\n\t\t\treturn [\r\n\t\t\t\t[row, 0],\r\n\t\t\t\t[row, 1],\r\n\t\t\t\t[row, 2],\r\n\t\t\t];\r\n\t\t}\r\n\t\treturn null;\r\n\t}\r\n\r\n\tfunction _checkColumn(col) {\r\n\t\tif (_field[0][col] === '') {\r\n\t\t\treturn false;\r\n\t\t}\r\n\t\tif (_field[0][col] === _field[1][col] && _field[0][col] === _field[2][col]) {\r\n\t\t\treturn [\r\n\t\t\t\t[0, col],\r\n\t\t\t\t[1, col],\r\n\t\t\t\t[2, col],\r\n\t\t\t];\r\n\t\t}\r\n\t\treturn null;\r\n\t}\r\n\r\n\tfunction _checkDiagonal() {\r\n\t\tif (_field[1][1] === '') {\r\n\t\t\treturn false;\r\n\t\t}\r\n\t\tif (_field[1][1] === _field[0][0] && _field[1][1] === _field[2][2]) {\r\n\t\t\treturn [\r\n\t\t\t\t[0, 0],\r\n\t\t\t\t[1, 1],\r\n\t\t\t\t[2, 2],\r\n\t\t\t];\r\n\t\t}\r\n\t\tif (_field[1][1] === _field[0][2] && _field[1][1] === _field[2][0]) {\r\n\t\t\treturn [\r\n\t\t\t\t[0, 2],\r\n\t\t\t\t[1, 1],\r\n\t\t\t\t[2, 0],\r\n\t\t\t];\r\n\t\t}\r\n\t\treturn null;\r\n\t}\r\n\r\n\tfunction _checkPosition(i, j) {\r\n\t\tif (!((i + j) % 2)) {\r\n\t\t\t// check corners and center\r\n\t\t\tconst diagonal = _checkDiagonal();\r\n\t\t\tif (diagonal) {\r\n\t\t\t\treturn diagonal;\r\n\t\t\t}\r\n\t\t}\r\n\t\t// check edges\r\n\t\tconst row = _checkRow(i);\r\n\t\tif (row) {\r\n\t\t\treturn row;\r\n\t\t}\r\n\t\treturn _checkColumn(j);\r\n\t}\r\n\r\n\treturn {\r\n\t\tgetMark,\r\n\t\tputO,\r\n\t\tputX,\r\n\t\treset,\r\n\t\tgetEmptyCells,\r\n\t\tclearCell,\r\n\t};\r\n})();\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./scripts/game.js?"
				);

				/***/
			},

		/***/ './scripts/index.js':
			/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
			/***/ (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
				eval(
					"__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./scripts/game.js\");\n\r\n\r\n\r\nconst gameGrid = document.getElementById('game-field');\r\nconst newGameButton = document.getElementById('new-game-btn');\r\nconst player1Label = document.getElementById('player-1-label');\r\nconst player2Label = document.getElementById('player-2-label');\r\nconst player1NameLabel = document.getElementById('player-1-name');\r\nconst player2NameLabel = document.getElementById('player-2-name');\r\nconst player1ScoreLabel = document.getElementById('player-1-score');\r\nconst player2ScoreLabel = document.getElementById('player-2-score');\r\nconst restartButton = document.getElementById('restart-btn');\r\nconst robotButton = document.getElementById('robot-icon');\r\nconst robotLabel = document.getElementById('robot-menu');\r\n\r\nnewGameButton.addEventListener('click', newGame);\r\nrestartButton.addEventListener('click', restart);\r\nrobotButton.addEventListener('click', switchRobot);\r\n\r\nconst cells = [];\r\nlet player1 = null;\r\nlet player2 = null;\r\nlet activePlayer = player1;\r\nlet playable = false;\r\nlet player2StateId = 0;\r\n\r\nconst easyBotIconUrl = './images/robot-easy.svg';\r\nconst hardBotIconUrl = './images/robot-hard.svg';\r\nconst botOffIconUrl = './images/robot-off.svg';\r\n\r\nconst playerStates = [\r\n\t{ active: false, name: 'Player 2', icon: botOffIconUrl, autoTurn: null },\r\n\t{ active: true, name: 'Easy bot', icon: easyBotIconUrl, autoTurn: randomTurn },\r\n\t{ active: true, name: 'Hard bot', icon: hardBotIconUrl, autoTurn: smartTurn },\r\n];\r\n\r\nnewGame();\r\n\r\nfunction newGame() {\r\n\tplayer1 = playerFactory('Player 1', true);\r\n\tplayer2 = playerFactory(playerStates[player2StateId].name, false, playerStates[player2StateId].autoTurn);\r\n\r\n\tactivePlayer = player1;\r\n\r\n\tplayer1Label.classList.add('active');\r\n\tplayer2Label.classList.remove('active');\r\n\tplayer1NameLabel.innerText = player1.name;\r\n\tplayer2NameLabel.innerText = player2.name;\r\n\r\n\tupdateScore();\r\n\r\n\trestart();\r\n}\r\n\r\nfunction switchRobot() {\r\n\tplayer2StateId = (player2StateId + 1) % playerStates.length;\r\n\r\n\tif (playerStates[player2StateId].active) {\r\n\t\trobotLabel.classList.add('active');\r\n\t} else {\r\n\t\trobotLabel.classList.remove('active');\r\n\t}\r\n\r\n\trobotButton.src = playerStates[player2StateId].icon;\r\n\r\n\tnewGame();\r\n}\r\n\r\nfunction restart() {\r\n\t_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.reset();\r\n\tmakeField();\r\n\tplayable = true;\r\n\trestartButton.disabled = true;\r\n\tif (activePlayer.autoTurn) {\r\n\t\tactivePlayer.autoTurn();\r\n\t}\r\n}\r\n\r\nfunction makeField() {\r\n\twhile (gameGrid.firstChild) {\r\n\t\tgameGrid.removeChild(gameGrid.firstChild);\r\n\t}\r\n\r\n\tfor (let i = 0; i < 3; ++i) {\r\n\t\tcells[i] = [];\r\n\t\tfor (let j = 0; j < 3; ++j) {\r\n\t\t\tlet cell = makeCell();\r\n\t\t\tcells[i].push(cell);\r\n\t\t\tcells[i][j].addEventListener('click', makeTurn.bind(undefined, i, j));\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction makeTurn(i, j) {\r\n\tif (!playable) {\r\n\t\treturn;\r\n\t}\r\n\r\n\tconst line = activePlayer.makeTurn(i, j);\r\n\tcells[i][j].innerText = activePlayer.mark;\r\n\tif (line) {\r\n\t\twin(line);\r\n\t}\r\n\r\n\tif (_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.getEmptyCells().length === 0) {\r\n\t\tstop();\r\n\t}\r\n\r\n\tswitchActive();\r\n}\r\n\r\nfunction stop() {\r\n\tplayable = false;\r\n\trestartButton.disabled = false;\r\n}\r\n\r\nfunction win(line) {\r\n\tfor (let i = 0; i < 3; ++i) {\r\n\t\tcells[line[i][0]][line[i][1]].classList.add('win');\r\n\t}\r\n\r\n\tactivePlayer.addScore();\r\n\tupdateScore();\r\n\tstop();\r\n}\r\n\r\nfunction switchActive() {\r\n\tplayer1Label.classList.toggle('active');\r\n\tplayer2Label.classList.toggle('active');\r\n\tactivePlayer = activePlayer === player1 ? player2 : player1;\r\n\r\n\tif (activePlayer.autoTurn && playable) {\r\n\t\tactivePlayer.autoTurn();\r\n\t}\r\n}\r\n\r\nfunction makeCell() {\r\n\tconst cell = document.createElement('div');\r\n\tcell.classList.add('cell');\r\n\tgameGrid.appendChild(cell);\r\n\r\n\treturn cell;\r\n}\r\n\r\nfunction updateScore() {\r\n\tplayer1ScoreLabel.innerText = player1.getScore();\r\n\tplayer2ScoreLabel.innerText = player2.getScore();\r\n}\r\n\r\nfunction randomTurn() {\r\n\tconst empty = _game_js__WEBPACK_IMPORTED_MODULE_0__.Game.getEmptyCells();\r\n\tconst coordinates = empty[Math.floor(Math.random() * empty.length)];\r\n\tmakeTurn(...coordinates);\r\n}\r\n\r\nfunction smartTurn() {\r\n\tconst empty = _game_js__WEBPACK_IMPORTED_MODULE_0__.Game.getEmptyCells();\r\n\r\n\tlet maxScore = -Infinity;\r\n\tlet optimalMove = empty[0];\r\n\tfor (let i = 0; i < empty.length; ++i) {\r\n\t\tlet score = solver(_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.putO(...empty[i]), false);\r\n\t\t_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.clearCell(...empty[i]);\r\n\t\tconsole.log(`cell[${empty[i][0]}][${empty[i][1]}]: ${score}`);\r\n\t\tif (score > maxScore) {\r\n\t\t\tmaxScore = score;\r\n\t\t\toptimalMove = empty[i];\r\n\t\t}\r\n\t}\r\n\tconsole.log(maxScore);\r\n\tmakeTurn(...optimalMove);\r\n}\r\n\r\nfunction solver(line, oTurn) {\r\n\tif (line) {\r\n\t\treturn oTurn === true ? -1 : 1;\r\n\t}\r\n\tconst empty = _game_js__WEBPACK_IMPORTED_MODULE_0__.Game.getEmptyCells();\r\n\tif (empty.length === 0) {\r\n\t\treturn 0;\r\n\t}\r\n\r\n\tif (oTurn) {\r\n\t\tlet maxScore = -2;\r\n\t\tfor (let i = 0; i < empty.length; ++i) {\r\n\t\t\tlet score = solver(_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.putO(...empty[i]), false);\r\n\t\t\tif (score > maxScore) {\r\n\t\t\t\tmaxScore = score;\r\n\t\t\t}\r\n\t\t\t_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.clearCell(...empty[i]);\r\n\t\t}\r\n\r\n\t\treturn maxScore;\r\n\t} else {\r\n\t\tlet minScore = 2;\r\n\t\tfor (let i = 0; i < empty.length; ++i) {\r\n\t\t\tlet score = solver(_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.putX(...empty[i]), true);\r\n\t\t\tif (score < minScore) {\r\n\t\t\t\tminScore = score;\r\n\t\t\t}\r\n\t\t\t_game_js__WEBPACK_IMPORTED_MODULE_0__.Game.clearCell(...empty[i]);\r\n\t\t}\r\n\t\treturn minScore;\r\n\t}\r\n}\r\n\r\nfunction playerFactory(name, isXPlayer, autoTurn = null) {\r\n\tlet _score = 0;\r\n\tfunction addScore() {\r\n\t\t_score++;\r\n\t}\r\n\r\n\tfunction getScore() {\r\n\t\treturn _score;\r\n\t}\r\n\r\n\treturn {\r\n\t\tname,\r\n\t\taddScore,\r\n\t\tgetScore,\r\n\t\tmakeTurn: isXPlayer ? _game_js__WEBPACK_IMPORTED_MODULE_0__.Game.putX : _game_js__WEBPACK_IMPORTED_MODULE_0__.Game.putO,\r\n\t\tmark: isXPlayer ? 'X' : 'O',\r\n\t\tautoTurn,\r\n\t};\r\n}\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./scripts/index.js?"
				);

				/***/
			},

		/******/
	};
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		});
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/************************************************************************/
	/******/ /* webpack/runtime/define property getters */
	/******/ (() => {
		/******/ // define getter functions for harmony exports
		/******/ __webpack_require__.d = (exports, definition) => {
			/******/ for (var key in definition) {
				/******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
					/******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
					/******/
				}
				/******/
			}
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/hasOwnProperty shorthand */
	/******/ (() => {
		/******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/make namespace object */
	/******/ (() => {
		/******/ // define __esModule on exports
		/******/ __webpack_require__.r = (exports) => {
			/******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				/******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
				/******/
			}
			/******/ Object.defineProperty(exports, '__esModule', { value: true });
			/******/
		};
		/******/
	})();
	/******/
	/************************************************************************/
	/******/
	/******/ // startup
	/******/ // Load entry module and return exports
	/******/ // This entry module can't be inlined because the eval devtool is used.
	/******/ var __webpack_exports__ = __webpack_require__('./scripts/index.js');
	/******/
	/******/
})();
