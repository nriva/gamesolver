/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game-types/deep-solve.ts":
/*!**************************************!*\
  !*** ./src/game-types/deep-solve.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeepSolverMatrix": () => /* binding */ DeepSolverMatrix
/* harmony export */ });
class DeepSolverMatrix {
    constructor(matrix) {
        this.matrix = [];
        this.matrix = matrix;
    }
}


/***/ }),

/***/ "./src/game-types/game-cell.ts":
/*!*************************************!*\
  !*** ./src/game-types/game-cell.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameCell": () => /* binding */ GameCell
/* harmony export */ });
class GameCell {
    constructor() {
        this.highlighted = false;
        this.dirty = true;
        this.ALL_VALUES = [];
        this.value = 0;
    }
    isDirty() {
        return this.dirty;
    }
    setDirtyOff() {
        this.dirty = false;
    }
    /**
     * Get the value of the cell.
     */
    getValue() {
        return this.value;
    }
    getValueAsString() {
        return String(this.value);
    }
    setValue(value) {
        if (this.value !== value)
            this.dirty = true;
        this.value = value;
        return this.value;
    }
    initValue(value) {
        this.value = value;
        this.highlighted = false;
        this.dirty = true;
    }
    highlight(on = true) {
        if (this.highlighted !== on)
            this.dirty = true;
        this.highlighted = on;
        return this.highlighted;
    }
    isHighlighted() {
        return this.highlighted;
    }
    copyFrom(other) {
        this.value = other.value;
        this.highlighted = other.isHighlighted();
    }
}


/***/ }),

/***/ "./src/solitaire/game-cell.ts":
/*!************************************!*\
  !*** ./src/solitaire/game-cell.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameCellSolitaire": () => /* binding */ GameCellSolitaire
/* harmony export */ });
/* harmony import */ var _game_types_game_cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-types/game-cell */ "./src/game-types/game-cell.ts");

class GameCellSolitaire extends _game_types_game_cell__WEBPACK_IMPORTED_MODULE_0__.GameCell {
    solveWithValue(value) {
        this.setValue(value);
    }
    clone() {
        const other = new GameCellSolitaire();
        other.copyFrom(this);
        return other;
    }
    getValueAsString() {
        if (this.value === GameCellSolitaire.PEG_CELL)
            return "O";
        if (this.value === GameCellSolitaire.INVALID_CELL)
            return "X";
        return ' ';
    }
}
GameCellSolitaire.EMPTY_CELL = 0;
GameCellSolitaire.PEG_CELL = 1;
GameCellSolitaire.INVALID_CELL = 9;


/***/ }),

/***/ "./src/solitaire/game-schema-solver.ts":
/*!*********************************************!*\
  !*** ./src/solitaire/game-schema-solver.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameMoveMakerSolitaire": () => /* binding */ GameMoveMakerSolitaire,
/* harmony export */   "DeepSolverMatrixSolitaire": () => /* binding */ DeepSolverMatrixSolitaire
/* harmony export */ });
/* harmony import */ var _game_types_deep_solve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-types/deep-solve */ "./src/game-types/deep-solve.ts");
/* harmony import */ var _game_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-cell */ "./src/solitaire/game-cell.ts");


/*
export class GameSchemaSolverSolitaire extends GameSchemaSolver<GameCellSolitaire, GameSchemaSolitaire> {
    public step(schema: GameSchemaSolitaire): void {
        this.stopped = true;
        this.solving = false;
    }

    
    public findMoves(cellValues:number[][],r:number,c:number):number[][][] {
        const moves:number[][][] = [];
        let value;

        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4

        // 1:
        if(r>=1) {
            value = cellValues[r-1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r>=2) {
                    value = cellValues[r-2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r-1,c],[r-2,c]]);
                    }
                }
            }
        }

        // 2:
        if(c>=1) {
            value = cellValues[r][c-1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c>=2) {
                    value = cellValues[r][c-2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c-1],[r,c-2]]);
                    }
                }
            }
        }

        // 3:
        if(c<=5) {
            value = cellValues[r][c+1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c<=4) {
                    value = cellValues[r][c+2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c+1],[r,c+2]]);
                    }
                }
            }
        }

        // 4:
        if(r<=5) {
            value = cellValues[r+1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r<=4) {
                    value = cellValues[r+2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r+1,c],[r+2,c]]);
                    }
                }
            }
        }

        return moves;
    }

    public findAllMoves(cellValues:number[][]):{pegs:number,moves:number[][][]} {
        let allMoves: number[][][] = [];
        let pegNum = 0;
        for(let r=0;r<7;r++)
            for(let c=0;c<7;c++)
                if(cellValues[r][c] === GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, r,c);
                    if(moves.length>0)
                        allMoves = allMoves.concat(moves);

                }
        return {'pegs': pegNum, 'moves':allMoves};
    }

    public executeMove(cellValues:number[][], move: number[][]) {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.PEG_CELL;


    }

    public undoMove(cellValues:number[][], move: number[][]):void {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.EMPTY_CELL;
    }
    

} */
class GameMoveMakerSolitaire {
    static findMoves(cellValues, r, c) {
        const moves = [];
        let value;
        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4
        // 1:
        if (r >= 1) {
            value = cellValues[r - 1][c];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (r >= 2) {
                    value = cellValues[r - 2][c];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r - 1, c], [r - 2, c]]);
                    }
                }
            }
        }
        // 2:
        if (c >= 1) {
            value = cellValues[r][c - 1];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (c >= 2) {
                    value = cellValues[r][c - 2];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r, c - 1], [r, c - 2]]);
                    }
                }
            }
        }
        // 3:
        if (c <= 5) {
            value = cellValues[r][c + 1];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (c <= 4) {
                    value = cellValues[r][c + 2];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r, c + 1], [r, c + 2]]);
                    }
                }
            }
        }
        // 4:
        if (r <= 5) {
            value = cellValues[r + 1][c];
            if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                if (r <= 4) {
                    value = cellValues[r + 2][c];
                    if (value === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r, c], [r + 1, c], [r + 2, c]]);
                    }
                }
            }
        }
        return moves;
    }
    static findAllMoves(cellValues) {
        let allMoves = [];
        let pegNum = 0;
        for (let r = 0; r < 7; r++)
            for (let c = 0; c < 7; c++)
                if (cellValues[r][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, r, c);
                    if (moves.length > 0)
                        allMoves = allMoves.concat(moves);
                }
        return { 'pegs': pegNum, 'moves': allMoves };
    }
    static executeMove(cellValues, move) {
        if (move.length === 0)
            return false;
        const from = move[0];
        const middle = move[1];
        const to = move[2];
        if (cellValues[from[0]][from[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
            return false;
        if (cellValues[middle[0]][middle[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
            return false;
        if (cellValues[to[0]][to[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL)
            return false;
        cellValues[from[0]][from[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL;
        return true;
    }
    static undoMove(cellValues, move) {
        if (move.length === 0)
            return;
        const from = move[0];
        const middle = move[1];
        const to = move[2];
        if (cellValues[from[0]][from[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL)
            return;
        if (cellValues[middle[0]][middle[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL)
            return;
        if (cellValues[to[0]][to[1]] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
            return;
        cellValues[from[0]][from[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]] = _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
    }
}
// tslint:disable-next-line: max-classes-per-file
class DeepSolverMatrixSolitaire extends _game_types_deep_solve__WEBPACK_IMPORTED_MODULE_0__.DeepSolverMatrix {
    constructor(matrix, ctx) {
        super(matrix);
        // private solver: GameSchemaSolverSolitaire = new GameSchemaSolverSolitaire();
        this.solvingMoves = [];
        this.step = 0;
        this.ctx = ctx;
    }
    getSolvingMoves() {
        return this.solvingMoves;
    }
    hasIsolatedPegsB(cellValues) {
        let found = false;
        for (let r = 0; r < cellValues.length && !found; r++)
            for (let c = 0; c < cellValues[r].length && !found; c++)
                if (cellValues[r][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                    let pegs = 0;
                    if (r > 0)
                        if (cellValues[r - 1][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (c > 0)
                        if (cellValues[r][c - 1] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (r < cellValues.length - 1)
                        if (cellValues[r + 1][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (c < cellValues[r].length - 1)
                        if (cellValues[r][c + 1] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if (pegs === 0)
                        found = true;
                }
        return found;
    }
    hasIsolatedPegs(cellValues) {
        let ok = true;
        for (let r = 0; r < 7 && ok; r++)
            for (let c = 0; c < 7 && ok; c++)
                if (cellValues[r][c] === _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.PEG_CELL) {
                    if (r > 0)
                        ok = ok && cellValues[r - 1][c] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                    if (c > 0)
                        ok = ok && cellValues[r][c - 1] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                    if (r < 6)
                        ok = ok && cellValues[r + 1][c] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                    if (c < 6)
                        ok = ok && cellValues[r][c + 1] !== _game_cell__WEBPACK_IMPORTED_MODULE_1__.GameCellSolitaire.EMPTY_CELL;
                }
        return ok;
    }
    deepSolve(row, col) {
        // pruning
        const isolated = this.hasIsolatedPegs(this.matrix);
        const isolatedB = this.hasIsolatedPegsB(this.matrix);
        /*if(isolatedB!==isolated)
            console.log('Bingo!');
        */
        if (isolated)
            return false;
        const allMoves = GameMoveMakerSolitaire.findAllMoves(this.matrix);
        if (allMoves.pegs === 1)
            return true;
        const moves = allMoves.moves;
        for (let m = 0; m < moves.length; m++) {
            if (GameMoveMakerSolitaire.executeMove(this.matrix, moves[m])) {
                const from = moves[m][0];
                const middle = moves[m][1];
                const to = moves[m][2];
                /*
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
                */
                if (this.deepSolve(row + 1, col)) {
                    /*
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
                    */
                    this.solvingMoves.push(moves[m]);
                    return true;
                }
                else {
                    GameMoveMakerSolitaire.undoMove(this.matrix, moves[m]);
                    /*
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.PEG_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.PEG_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    */
                }
            }
            else {
                console.log("'Twas a wrong move!!!");
            }
        }
        return false;
    }
}


/***/ }),

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/solitaire/solitaire-deep-solver.worker.ts":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/solitaire/solitaire-deep-solver.worker.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_schema_solver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-schema-solver */ "./src/solitaire/game-schema-solver.ts");

const ctx = self;
ctx.addEventListener("message", (event) => {
    const matrix = event.data.matrix;
    const solver = new _game_schema_solver__WEBPACK_IMPORTED_MODULE_0__.DeepSolverMatrixSolitaire(matrix, ctx);
    let solutionResult = "Resolution failed.";
    if (solver.deepSolve(1, 3)) {
        solutionResult = "Recursive search succeeded.";
    }
    ctx.postMessage({ 'eventType': 'success',
        'matrix': matrix,
        'solutionResult': solutionResult,
        'solvingMoves': solver.getSolvingMoves() });
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/solitaire/solitaire-deep-solver.worker.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZGVlcC1zb2x2ZS50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZ2FtZS1jZWxsLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvLi9zcmMvc29saXRhaXJlL2dhbWUtY2VsbC50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL3NvbGl0YWlyZS9nYW1lLXNjaGVtYS1zb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zb2xpdGFpcmUvc29saXRhaXJlLWRlZXAtc29sdmVyLndvcmtlci50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFlLGdCQUFnQjtJQUlsQyxZQUFZLE1BQWtCO1FBRnBCLFdBQU0sR0FBZSxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztDQUlKOzs7Ozs7Ozs7Ozs7Ozs7QUNWTSxNQUFlLFFBQVE7SUFTMUI7UUFOVSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixVQUFLLEdBQVMsSUFBSSxDQUFDO1FBRW5CLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFHaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVNLE9B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QUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksMEVBQXlCLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELElBQUksY0FBYyxHQUFHLG9CQUFvQjtJQUN6QyxJQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3RCLGNBQWMsR0FBRyw2QkFBNkIsQ0FBQztLQUNsRDtJQUNELEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBQyxXQUFXLEVBQUUsU0FBUztRQUNqQyxRQUFRLEVBQUMsTUFBTTtRQUNmLGdCQUFnQixFQUFFLGNBQWM7UUFDaEMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBQyxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7VUNmSDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoic29saXRhaXJlLWRlZXAtc29sdmVyLndvcmtlci53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVlcFNvbHZlck1hdHJpeCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG1hdHJpeDogbnVtYmVyW11bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hdHJpeDogbnVtYmVyW11bXSkge1xyXG4gICAgICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkZWVwU29sdmUocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHJcbn0iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgR2FtZUNlbGwge1xyXG4gICAgcHJvdGVjdGVkIHZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIGhpZ2hsaWdodGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpcnR5OmJvb2xlYW49dHJ1ZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgQUxMX1ZBTFVFUzogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEaXJ0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXJ0eTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RGlydHlPZmYoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHZhbHVlIG9mIHRoZSBjZWxsLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWVBc1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBTdHJpbmcodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRWYWx1ZSh2YWx1ZTpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWUgIT09IHZhbHVlKVxyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBpbml0VmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgaGlnaGxpZ2h0KG9uOiBib29sZWFuID0gdHJ1ZSk6Ym9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaGlnaGxpZ2h0ZWQhPT1vbilcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQgPSBvbjtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNIaWdobGlnaHRlZCgpOmJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodGVkO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xvbmUoKSA6IEdhbWVDZWxsO1xyXG5cclxuICAgIHB1YmxpYyBjb3B5RnJvbShvdGhlcjogR2FtZUNlbGwpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gb3RoZXIudmFsdWU7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCA9IG90aGVyLmlzSGlnaGxpZ2h0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc29sdmVXaXRoVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8gcHVibGljIHNldE5ld1ZhbHVlU2V0KG5ld1ZhbHVlU2V0OiBudW1iZXJbXSwgb25seVNldHM6IGJvb2xlYW4gPSBmYWxzZSkge31cclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lQ2VsbCB9IGZyb20gXCIuLi9nYW1lLXR5cGVzL2dhbWUtY2VsbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVDZWxsU29saXRhaXJlIGV4dGVuZHMgR2FtZUNlbGwge1xyXG5cclxuICAgIHB1YmxpYyBzb2x2ZVdpdGhWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBFTVBUWV9DRUxMID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgUEVHX0NFTEwgPSAxO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSU5WQUxJRF9DRUxMID0gOTtcclxuXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogR2FtZUNlbGwge1xyXG4gICAgICAgIGNvbnN0IG90aGVyOiBHYW1lQ2VsbFNvbGl0YWlyZSA9IG5ldyBHYW1lQ2VsbFNvbGl0YWlyZSgpO1xyXG4gICAgICAgIG90aGVyLmNvcHlGcm9tKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBvdGhlcjsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZhbHVlQXNTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLnZhbHVlPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgIHJldHVybiBcIk9cIjtcclxuICAgICAgICBpZih0aGlzLnZhbHVlPT09R2FtZUNlbGxTb2xpdGFpcmUuSU5WQUxJRF9DRUxMKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJYXCI7XHJcbiAgICAgICAgcmV0dXJuICcgJztcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgRGVlcFNvbHZlck1hdHJpeCB9IGZyb20gXCIuLi9nYW1lLXR5cGVzL2RlZXAtc29sdmVcIjtcclxuaW1wb3J0IHsgR2FtZVNjaGVtYVNvbHZlciB9IGZyb20gXCIuLi9nYW1lLXR5cGVzL2dhbWUtc2NoZW1hLXNvbHZlclwiO1xyXG5pbXBvcnQgeyBHYW1lQ2VsbFNvbGl0YWlyZSB9IGZyb20gXCIuL2dhbWUtY2VsbFwiO1xyXG5pbXBvcnQgeyBHYW1lU2NoZW1hU29saXRhaXJlIH0gZnJvbSBcIi4vZ2FtZS1zY2hlbWFcIjtcclxuXHJcbi8qXHJcbmV4cG9ydCBjbGFzcyBHYW1lU2NoZW1hU29sdmVyU29saXRhaXJlIGV4dGVuZHMgR2FtZVNjaGVtYVNvbHZlcjxHYW1lQ2VsbFNvbGl0YWlyZSwgR2FtZVNjaGVtYVNvbGl0YWlyZT4ge1xyXG4gICAgcHVibGljIHN0ZXAoc2NoZW1hOiBHYW1lU2NoZW1hU29saXRhaXJlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNvbHZpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBmaW5kTW92ZXMoY2VsbFZhbHVlczpudW1iZXJbXVtdLHI6bnVtYmVyLGM6bnVtYmVyKTpudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIGNvbnN0IG1vdmVzOm51bWJlcltdW11bXSA9IFtdO1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgIC8vIGZpbmQgYWxsIHRoZSBtb3ZlcyBmcm9tIHg9cixjOiAyIHggM1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDRcclxuXHJcbiAgICAgICAgLy8gMTpcclxuICAgICAgICBpZihyPj0xKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyLTFdW2NdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKHI+PTIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbci0yXVtjXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbci0xLGNdLFtyLTIsY11dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgaWYoYz49MSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcl1bYy0xXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjPj0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MtMl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3IsYy0xXSxbcixjLTJdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAzOlxyXG4gICAgICAgIGlmKGM8PTUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MrMV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgaWYoYzw9NCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjKzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW1tyLGNdLFtyLGMrMV0sW3IsYysyXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gNDpcclxuICAgICAgICBpZihyPD01KSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyKzFdW2NdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKHI8PTQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcisyXVtjXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbcisxLGNdLFtyKzIsY11dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtb3ZlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluZEFsbE1vdmVzKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSk6e3BlZ3M6bnVtYmVyLG1vdmVzOm51bWJlcltdW11bXX0ge1xyXG4gICAgICAgIGxldCBhbGxNb3ZlczogbnVtYmVyW11bXVtdID0gW107XHJcbiAgICAgICAgbGV0IHBlZ051bSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCByPTA7cjw3O3IrKylcclxuICAgICAgICAgICAgZm9yKGxldCBjPTA7Yzw3O2MrKylcclxuICAgICAgICAgICAgICAgIGlmKGNlbGxWYWx1ZXNbcl1bY10gPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVnTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW92ZXMgPSB0aGlzLmZpbmRNb3ZlcyhjZWxsVmFsdWVzLCByLGMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vdmVzLmxlbmd0aD4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxNb3ZlcyA9IGFsbE1vdmVzLmNvbmNhdChtb3Zlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7J3BlZ3MnOiBwZWdOdW0sICdtb3Zlcyc6YWxsTW92ZXN9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlTW92ZShjZWxsVmFsdWVzOm51bWJlcltdW10sIG1vdmU6IG51bWJlcltdW10pIHtcclxuXHJcbiAgICAgICAgaWYobW92ZS5sZW5ndGg9PT0wKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGZyb20gPSBtb3ZlWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pZGRsZSA9IG1vdmVbMV07XHJcbiAgICAgICAgY29uc3QgdG8gPSBtb3ZlWzJdO1xyXG5cclxuICAgICAgICBjZWxsVmFsdWVzW2Zyb21bMF1dW2Zyb21bMV1dPUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgY2VsbFZhbHVlc1ttaWRkbGVbMF1dW21pZGRsZVsxXV09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW3RvWzBdXVt0b1sxXV09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEw7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5kb01vdmUoY2VsbFZhbHVlczpudW1iZXJbXVtdLCBtb3ZlOiBudW1iZXJbXVtdKTp2b2lkIHtcclxuXHJcbiAgICAgICAgaWYobW92ZS5sZW5ndGg9PT0wKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGZyb20gPSBtb3ZlWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pZGRsZSA9IG1vdmVbMV07XHJcbiAgICAgICAgY29uc3QgdG8gPSBtb3ZlWzJdO1xyXG5cclxuICAgICAgICBjZWxsVmFsdWVzW2Zyb21bMF1dW2Zyb21bMV1dPUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMO1xyXG4gICAgICAgIGNlbGxWYWx1ZXNbbWlkZGxlWzBdXVttaWRkbGVbMV1dPUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMO1xyXG4gICAgICAgIGNlbGxWYWx1ZXNbdG9bMF1dW3RvWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG59ICovXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZU1vdmVNYWtlclNvbGl0YWlyZSB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kTW92ZXMoY2VsbFZhbHVlczpudW1iZXJbXVtdLHI6bnVtYmVyLGM6bnVtYmVyKTpudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIGNvbnN0IG1vdmVzOm51bWJlcltdW11bXSA9IFtdO1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgIC8vIGZpbmQgYWxsIHRoZSBtb3ZlcyBmcm9tIHg9cixjOiAyIHggM1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDRcclxuXHJcbiAgICAgICAgLy8gMTpcclxuICAgICAgICBpZihyPj0xKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyLTFdW2NdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKHI+PTIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbci0yXVtjXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbci0xLGNdLFtyLTIsY11dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgaWYoYz49MSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcl1bYy0xXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjPj0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MtMl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3IsYy0xXSxbcixjLTJdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAzOlxyXG4gICAgICAgIGlmKGM8PTUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MrMV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgaWYoYzw9NCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjKzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW1tyLGNdLFtyLGMrMV0sW3IsYysyXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gNDpcclxuICAgICAgICBpZihyPD01KSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyKzFdW2NdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKHI8PTQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcisyXVtjXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbcisxLGNdLFtyKzIsY11dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtb3ZlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRBbGxNb3ZlcyhjZWxsVmFsdWVzOm51bWJlcltdW10pOntwZWdzOm51bWJlcixtb3ZlczpudW1iZXJbXVtdW119IHtcclxuICAgICAgICBsZXQgYWxsTW92ZXM6IG51bWJlcltdW11bXSA9IFtdO1xyXG4gICAgICAgIGxldCBwZWdOdW0gPSAwO1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8NztyKyspXHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0wO2M8NztjKyspXHJcbiAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2NdID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlZ051bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVzID0gdGhpcy5maW5kTW92ZXMoY2VsbFZhbHVlcywgcixjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb3Zlcy5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsTW92ZXMgPSBhbGxNb3Zlcy5jb25jYXQobW92ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4geydwZWdzJzogcGVnTnVtLCAnbW92ZXMnOmFsbE1vdmVzfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4ZWN1dGVNb3ZlKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSwgbW92ZTogbnVtYmVyW11bXSk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBpZihtb3ZlLmxlbmd0aD09PTApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vdmVbMF07XHJcbiAgICAgICAgY29uc3QgbWlkZGxlID0gbW92ZVsxXTtcclxuICAgICAgICBjb25zdCB0byA9IG1vdmVbMl07XHJcblxyXG5cclxuICAgICAgICBpZihjZWxsVmFsdWVzW2Zyb21bMF1dW2Zyb21bMV1dIT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1ttaWRkbGVbMF1dW21pZGRsZVsxXV0hPT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZihjZWxsVmFsdWVzW3RvWzBdXVt0b1sxXV0hPT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMO1xyXG4gICAgICAgIGNlbGxWYWx1ZXNbbWlkZGxlWzBdXVttaWRkbGVbMV1dPUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgY2VsbFZhbHVlc1t0b1swXV1bdG9bMV1dPUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB1bmRvTW92ZShjZWxsVmFsdWVzOm51bWJlcltdW10sIG1vdmU6IG51bWJlcltdW10pOnZvaWQge1xyXG5cclxuICAgICAgICBpZihtb3ZlLmxlbmd0aD09PTApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vdmVbMF07XHJcbiAgICAgICAgY29uc3QgbWlkZGxlID0gbW92ZVsxXTtcclxuICAgICAgICBjb25zdCB0byA9IG1vdmVbMl07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXSE9PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1ttaWRkbGVbMF1dW21pZGRsZVsxXV0hPT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKGNlbGxWYWx1ZXNbdG9bMF1dW3RvWzFdXSE9PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW21pZGRsZVswXV1bbWlkZGxlWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW3RvWzBdXVt0b1sxXV09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgIH0gICAgIFxyXG5cclxuXHJcbn1cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWNsYXNzZXMtcGVyLWZpbGVcclxuZXhwb3J0IGNsYXNzIERlZXBTb2x2ZXJNYXRyaXhTb2xpdGFpcmUgZXh0ZW5kcyBEZWVwU29sdmVyTWF0cml4IHtcclxuXHJcbiAgICAvLyBwcml2YXRlIHNvbHZlcjogR2FtZVNjaGVtYVNvbHZlclNvbGl0YWlyZSA9IG5ldyBHYW1lU2NoZW1hU29sdmVyU29saXRhaXJlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzb2x2aW5nTW92ZXM6bnVtYmVyW11bXVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBjdHg6YW55O1xyXG5cclxuICAgIHByaXZhdGUgc3RlcCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWF0cml4OiBudW1iZXJbXVtdLCBjdHg6YW55KSB7XHJcbiAgICAgICAgc3VwZXIobWF0cml4KTtcclxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U29sdmluZ01vdmVzKCk6IG51bWJlcltdW11bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29sdmluZ01vdmVzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGhhc0lzb2xhdGVkUGVnc0IoY2VsbFZhbHVlczpudW1iZXJbXVtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKGxldCByPTA7cjwgY2VsbFZhbHVlcy5sZW5ndGggICYmICFmb3VuZDtyKyspXHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0wO2M8IGNlbGxWYWx1ZXNbcl0ubGVuZ3RoICYmICFmb3VuZDtjKyspXHJcbiAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2NdPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVncyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocj4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3ItMV1bY109PT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZ3MrKztcclxuICAgICAgICAgICAgICAgICAgICBpZihjPjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxWYWx1ZXNbcl1bYy0xXT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVncysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHI8Y2VsbFZhbHVlcy5sZW5ndGgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyKzFdW2NdPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWdzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYzxjZWxsVmFsdWVzW3JdLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2MrMV09PT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZ3MrKztcclxuICAgICAgICAgICAgICAgICAgICBpZihwZWdzPT09MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGhhc0lzb2xhdGVkUGVncyhjZWxsVmFsdWVzOm51bWJlcltdW10pOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgb2sgPSB0cnVlO1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8NyAmJiBvaztyKyspXHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0wO2M8NyAmJiBvaztjKyspXHJcbiAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2NdPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyPjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rID0gb2sgJiYgY2VsbFZhbHVlc1tyLTFdW2NdIT09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgICAgICAgICAgICAgICAgICBpZihjPjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rID0gb2sgJiYgY2VsbFZhbHVlc1tyXVtjLTFdIT09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgICAgICAgICAgICAgICAgICBpZihyPDYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rID0gb2sgJiYgY2VsbFZhbHVlc1tyKzFdW2NdIT09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgICAgICAgICAgICAgICAgICBpZihjPDYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rID0gb2sgJiYgY2VsbFZhbHVlc1tyXVtjKzFdIT09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2s7XHJcbiAgICB9ICAgIFxyXG5cclxuXHJcbiAgICBwdWJsaWMgZGVlcFNvbHZlKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICAvLyBwcnVuaW5nXHJcbiAgICAgICAgY29uc3QgaXNvbGF0ZWQgPSB0aGlzLmhhc0lzb2xhdGVkUGVncyh0aGlzLm1hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgaXNvbGF0ZWRCID0gdGhpcy5oYXNJc29sYXRlZFBlZ3NCKHRoaXMubWF0cml4KTtcclxuXHJcbiAgICAgICAgLyppZihpc29sYXRlZEIhPT1pc29sYXRlZClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0JpbmdvIScpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYoaXNvbGF0ZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcblxyXG5cclxuICAgICAgICBjb25zdCBhbGxNb3ZlcyA9IEdhbWVNb3ZlTWFrZXJTb2xpdGFpcmUuZmluZEFsbE1vdmVzKHRoaXMubWF0cml4KTtcclxuICAgICAgICBpZihhbGxNb3Zlcy5wZWdzPT09MSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgY29uc3QgbW92ZXMgPSBhbGxNb3Zlcy5tb3ZlcztcclxuXHJcblxyXG4gICAgICAgIGZvcihsZXQgbT0wOyBtPG1vdmVzLmxlbmd0aDsgbSsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVNb3ZlTWFrZXJTb2xpdGFpcmUuZXhlY3V0ZU1vdmUodGhpcy5tYXRyaXgsIG1vdmVzW21dKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vdmVzW21dWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWlkZGxlID0gbW92ZXNbbV1bMV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0byA9IG1vdmVzW21dWzJdO1xyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndHJ5VmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBmcm9tWzBdLCAnY29sJzogZnJvbVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eD8ucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3RyeVZhbHVlJywgZXZlbnREYXRhOnsncm93JzogbWlkZGxlWzBdLCAnY29sJzogbWlkZGxlWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndHJ5VmFsdWUnLCBldmVudERhdGE6eydyb3cnOiB0b1swXSwgJ2NvbCc6IHRvWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5kZWVwU29sdmUocm93KzEsIGNvbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAnc2V0VmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBmcm9tWzBdLCAnY29sJzogZnJvbVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICdzZXRWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IG1pZGRsZVswXSwgJ2NvbCc6IG1pZGRsZVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICdzZXRWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IHRvWzBdLCAnY29sJzogdG9bMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29sdmluZ01vdmVzLnB1c2gobW92ZXNbbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTW92ZU1ha2VyU29saXRhaXJlLnVuZG9Nb3ZlKHRoaXMubWF0cml4LCBtb3Zlc1ttXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eD8ucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3VuZG9WYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IGZyb21bMF0sICdjb2wnOiBmcm9tWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd1bmRvVmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBtaWRkbGVbMF0sICdjb2wnOiBtaWRkbGVbMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eD8ucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3VuZG9WYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IHRvWzBdLCAnY29sJzogdG9bMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCInVHdhcyBhIHdyb25nIG1vdmUhISFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEZWVwU29sdmVyTWF0cml4U29saXRhaXJlIH0gZnJvbSBcIi4vZ2FtZS1zY2hlbWEtc29sdmVyXCI7XHJcblxyXG5jb25zdCBjdHg6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xyXG5cclxuY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgbWF0cml4ID0gZXZlbnQuZGF0YS5tYXRyaXg7XHJcbiAgICBjb25zdCBzb2x2ZXIgPSBuZXcgRGVlcFNvbHZlck1hdHJpeFNvbGl0YWlyZShtYXRyaXgsY3R4KTtcclxuICAgIGxldCBzb2x1dGlvblJlc3VsdCA9IFwiUmVzb2x1dGlvbiBmYWlsZWQuXCJcclxuICAgIGlmKHNvbHZlci5kZWVwU29sdmUoMSwzKSkge1xyXG4gICAgICAgIHNvbHV0aW9uUmVzdWx0ID0gXCJSZWN1cnNpdmUgc2VhcmNoIHN1Y2NlZWRlZC5cIjtcclxuICAgIH1cclxuICAgIGN0eC5wb3N0TWVzc2FnZSh7J2V2ZW50VHlwZSc6ICdzdWNjZXNzJ1xyXG4gICAgICAgICwgJ21hdHJpeCc6bWF0cml4XHJcbiAgICAgICAgLCAnc29sdXRpb25SZXN1bHQnOiBzb2x1dGlvblJlc3VsdFxyXG4gICAgICAgICwgJ3NvbHZpbmdNb3Zlcyc6IHNvbHZlci5nZXRTb2x2aW5nTW92ZXMoKX0pO1xyXG59KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzBdIS4vc3JjL3NvbGl0YWlyZS9zb2xpdGFpcmUtZGVlcC1zb2x2ZXIud29ya2VyLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==