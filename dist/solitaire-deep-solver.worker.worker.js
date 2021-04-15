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
    deepSolve(level, row, col, ...params) {
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
                if (this.deepSolve(level + 1, row, col)) {
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
    if (solver.deepSolve(0, 1, 3)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZGVlcC1zb2x2ZS50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZ2FtZS1jZWxsLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvLi9zcmMvc29saXRhaXJlL2dhbWUtY2VsbC50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL3NvbGl0YWlyZS9nYW1lLXNjaGVtYS1zb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zb2xpdGFpcmUvc29saXRhaXJlLWRlZXAtc29sdmVyLndvcmtlci50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFlLGdCQUFnQjtJQUlsQyxZQUFZLE1BQWtCO1FBRnBCLFdBQU0sR0FBZSxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztDQUlKOzs7Ozs7Ozs7Ozs7Ozs7QUNWTSxNQUFlLFFBQVE7SUFTMUI7UUFOVSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixVQUFLLEdBQVMsSUFBSSxDQUFDO1FBRW5CLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFHaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVNLE9B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SyxFQUFFLEVBQUU7SUFDdEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDakMsTUFBTSxNQUFNLEdBQUcsSUFBSSwwRUFBeUIsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDekQsSUFBSSxjQUFjLEdBQUcsb0JBQW9CO0lBQ3pDLElBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQzFCLGNBQWMsR0FBRyw2QkFBNkIsQ0FBQztLQUNsRDtJQUNELEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBQyxXQUFXLEVBQUUsU0FBUztRQUNqQyxRQUFRLEVBQUMsTUFBTTtRQUNmLGdCQUFnQixFQUFFLGNBQWM7UUFDaEMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBQyxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7VUNmSDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoic29saXRhaXJlLWRlZXAtc29sdmVyLndvcmtlci53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVlcFNvbHZlck1hdHJpeCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG1hdHJpeDogbnVtYmVyW11bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hdHJpeDogbnVtYmVyW11bXSkge1xyXG4gICAgICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkZWVwU29sdmUobGV2ZWw6bnVtYmVyLCByb3c6IG51bWJlciwgY29sOiBudW1iZXIsIC4uLnBhcmFtczphbnlbXSk6IGJvb2xlYW47XHJcblxyXG59IiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdhbWVDZWxsIHtcclxuICAgIHByb3RlY3RlZCB2YWx1ZTogbnVtYmVyO1xyXG5cclxuICAgIHByb3RlY3RlZCBoaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByb3RlY3RlZCBkaXJ0eTpib29sZWFuPXRydWU7XHJcblxyXG4gICAgcHJvdGVjdGVkIEFMTF9WQUxVRVM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRGlydHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERpcnR5T2ZmKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB2YWx1ZSBvZiB0aGUgY2VsbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZhbHVlQXNTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0VmFsdWUodmFsdWU6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZih0aGlzLnZhbHVlICE9PSB2YWx1ZSlcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaW5pdFZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGhpZ2hsaWdodChvbjogYm9vbGVhbiA9IHRydWUpOmJvb2xlYW4ge1xyXG5cclxuICAgICAgICBpZih0aGlzLmhpZ2hsaWdodGVkIT09b24pXHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzSGlnaGxpZ2h0ZWQoKTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRlZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsb25lKCkgOiBHYW1lQ2VsbDtcclxuXHJcbiAgICBwdWJsaWMgY29weUZyb20ob3RoZXI6IEdhbWVDZWxsKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IG90aGVyLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQgPSBvdGhlci5pc0hpZ2hsaWdodGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IHNvbHZlV2l0aFZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIC8vIHB1YmxpYyBzZXROZXdWYWx1ZVNldChuZXdWYWx1ZVNldDogbnVtYmVyW10sIG9ubHlTZXRzOiBib29sZWFuID0gZmFsc2UpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgR2FtZUNlbGwgfSBmcm9tIFwiLi4vZ2FtZS10eXBlcy9nYW1lLWNlbGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lQ2VsbFNvbGl0YWlyZSBleHRlbmRzIEdhbWVDZWxsIHtcclxuXHJcbiAgICBwdWJsaWMgc29sdmVXaXRoVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRU1QVFlfQ0VMTCA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBFR19DRUxMID0gMTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIElOVkFMSURfQ0VMTCA9IDk7XHJcblxyXG4gICAgcHVibGljIGNsb25lKCk6IEdhbWVDZWxsIHtcclxuICAgICAgICBjb25zdCBvdGhlcjogR2FtZUNlbGxTb2xpdGFpcmUgPSBuZXcgR2FtZUNlbGxTb2xpdGFpcmUoKTtcclxuICAgICAgICBvdGhlci5jb3B5RnJvbSh0aGlzKTtcclxuICAgICAgICByZXR1cm4gb3RoZXI7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWYWx1ZUFzU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJPXCI7XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZT09PUdhbWVDZWxsU29saXRhaXJlLklOVkFMSURfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuIFwiWFwiO1xyXG4gICAgICAgIHJldHVybiAnICc7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IERlZXBTb2x2ZXJNYXRyaXggfSBmcm9tIFwiLi4vZ2FtZS10eXBlcy9kZWVwLXNvbHZlXCI7XHJcbmltcG9ydCB7IEdhbWVTY2hlbWFTb2x2ZXIgfSBmcm9tIFwiLi4vZ2FtZS10eXBlcy9nYW1lLXNjaGVtYS1zb2x2ZXJcIjtcclxuaW1wb3J0IHsgR2FtZUNlbGxTb2xpdGFpcmUgfSBmcm9tIFwiLi9nYW1lLWNlbGxcIjtcclxuaW1wb3J0IHsgR2FtZVNjaGVtYVNvbGl0YWlyZSB9IGZyb20gXCIuL2dhbWUtc2NoZW1hXCI7XHJcblxyXG4vKlxyXG5leHBvcnQgY2xhc3MgR2FtZVNjaGVtYVNvbHZlclNvbGl0YWlyZSBleHRlbmRzIEdhbWVTY2hlbWFTb2x2ZXI8R2FtZUNlbGxTb2xpdGFpcmUsIEdhbWVTY2hlbWFTb2xpdGFpcmU+IHtcclxuICAgIHB1YmxpYyBzdGVwKHNjaGVtYTogR2FtZVNjaGVtYVNvbGl0YWlyZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zb2x2aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZmluZE1vdmVzKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSxyOm51bWJlcixjOm51bWJlcik6bnVtYmVyW11bXVtdIHtcclxuICAgICAgICBjb25zdCBtb3ZlczpudW1iZXJbXVtdW10gPSBbXTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAvLyBmaW5kIGFsbCB0aGUgbW92ZXMgZnJvbSB4PXIsYzogMiB4IDNcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0XHJcblxyXG4gICAgICAgIC8vIDE6XHJcbiAgICAgICAgaWYocj49MSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbci0xXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPj0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3ItMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3ItMSxjXSxbci0yLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIGlmKGM+PTEpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MtMV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgaWYoYz49Mikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjLTJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW1tyLGNdLFtyLGMtMV0sW3IsYy0yXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMzpcclxuICAgICAgICBpZihjPD01KSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjKzFdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKGM8PTQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcl1bYysyXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbcixjKzFdLFtyLGMrMl1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDQ6XHJcbiAgICAgICAgaWYocjw9NSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcisxXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPD00KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3IrMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3IrMSxjXSxbcisyLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbmRBbGxNb3ZlcyhjZWxsVmFsdWVzOm51bWJlcltdW10pOntwZWdzOm51bWJlcixtb3ZlczpudW1iZXJbXVtdW119IHtcclxuICAgICAgICBsZXQgYWxsTW92ZXM6IG51bWJlcltdW11bXSA9IFtdO1xyXG4gICAgICAgIGxldCBwZWdOdW0gPSAwO1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8NztyKyspXHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0wO2M8NztjKyspXHJcbiAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2NdID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlZ051bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVzID0gdGhpcy5maW5kTW92ZXMoY2VsbFZhbHVlcywgcixjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb3Zlcy5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsTW92ZXMgPSBhbGxNb3Zlcy5jb25jYXQobW92ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4geydwZWdzJzogcGVnTnVtLCAnbW92ZXMnOmFsbE1vdmVzfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZU1vdmUoY2VsbFZhbHVlczpudW1iZXJbXVtdLCBtb3ZlOiBudW1iZXJbXVtdKSB7XHJcblxyXG4gICAgICAgIGlmKG1vdmUubGVuZ3RoPT09MClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmcm9tID0gbW92ZVswXTtcclxuICAgICAgICBjb25zdCBtaWRkbGUgPSBtb3ZlWzFdO1xyXG4gICAgICAgIGNvbnN0IHRvID0gbW92ZVsyXTtcclxuXHJcbiAgICAgICAgY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMO1xyXG4gICAgICAgIGNlbGxWYWx1ZXNbbWlkZGxlWzBdXVttaWRkbGVbMV1dPUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgY2VsbFZhbHVlc1t0b1swXV1bdG9bMV1dPUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuZG9Nb3ZlKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSwgbW92ZTogbnVtYmVyW11bXSk6dm9pZCB7XHJcblxyXG4gICAgICAgIGlmKG1vdmUubGVuZ3RoPT09MClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmcm9tID0gbW92ZVswXTtcclxuICAgICAgICBjb25zdCBtaWRkbGUgPSBtb3ZlWzFdO1xyXG4gICAgICAgIGNvbnN0IHRvID0gbW92ZVsyXTtcclxuXHJcbiAgICAgICAgY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW21pZGRsZVswXV1bbWlkZGxlWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW3RvWzBdXVt0b1sxXV09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgIH1cclxuICAgIFxyXG5cclxufSAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVNb3ZlTWFrZXJTb2xpdGFpcmUge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZE1vdmVzKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSxyOm51bWJlcixjOm51bWJlcik6bnVtYmVyW11bXVtdIHtcclxuICAgICAgICBjb25zdCBtb3ZlczpudW1iZXJbXVtdW10gPSBbXTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAvLyBmaW5kIGFsbCB0aGUgbW92ZXMgZnJvbSB4PXIsYzogMiB4IDNcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0XHJcblxyXG4gICAgICAgIC8vIDE6XHJcbiAgICAgICAgaWYocj49MSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbci0xXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPj0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3ItMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3ItMSxjXSxbci0yLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIGlmKGM+PTEpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3JdW2MtMV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgaWYoYz49Mikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjLTJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goW1tyLGNdLFtyLGMtMV0sW3IsYy0yXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMzpcclxuICAgICAgICBpZihjPD01KSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gY2VsbFZhbHVlc1tyXVtjKzFdO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgIGlmKGM8PTQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcl1bYysyXTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFtbcixjXSxbcixjKzFdLFtyLGMrMl1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDQ6XHJcbiAgICAgICAgaWYocjw9NSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNlbGxWYWx1ZXNbcisxXVtjXTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyPD00KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjZWxsVmFsdWVzW3IrMl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZXMucHVzaChbW3IsY10sW3IrMSxjXSxbcisyLGNdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kQWxsTW92ZXMoY2VsbFZhbHVlczpudW1iZXJbXVtdKTp7cGVnczpudW1iZXIsbW92ZXM6bnVtYmVyW11bXVtdfSB7XHJcbiAgICAgICAgbGV0IGFsbE1vdmVzOiBudW1iZXJbXVtdW10gPSBbXTtcclxuICAgICAgICBsZXQgcGVnTnVtID0gMDtcclxuICAgICAgICBmb3IobGV0IHI9MDtyPDc7cisrKVxyXG4gICAgICAgICAgICBmb3IobGV0IGM9MDtjPDc7YysrKVxyXG4gICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyXVtjXSA9PT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwZWdOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3ZlcyA9IHRoaXMuZmluZE1vdmVzKGNlbGxWYWx1ZXMsIHIsYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW92ZXMubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbE1vdmVzID0gYWxsTW92ZXMuY29uY2F0KG1vdmVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsncGVncyc6IHBlZ051bSwgJ21vdmVzJzphbGxNb3Zlc307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBleGVjdXRlTW92ZShjZWxsVmFsdWVzOm51bWJlcltdW10sIG1vdmU6IG51bWJlcltdW10pOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgaWYobW92ZS5sZW5ndGg9PT0wKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGZyb20gPSBtb3ZlWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pZGRsZSA9IG1vdmVbMV07XHJcbiAgICAgICAgY29uc3QgdG8gPSBtb3ZlWzJdO1xyXG5cclxuXHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1tmcm9tWzBdXVtmcm9tWzFdXSE9PSBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKGNlbGxWYWx1ZXNbbWlkZGxlWzBdXVttaWRkbGVbMV1dIT09IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYoY2VsbFZhbHVlc1t0b1swXV1bdG9bMV1dIT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIGNlbGxWYWx1ZXNbZnJvbVswXV1bZnJvbVsxXV09R2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTDtcclxuICAgICAgICBjZWxsVmFsdWVzW21pZGRsZVswXV1bbWlkZGxlWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMO1xyXG4gICAgICAgIGNlbGxWYWx1ZXNbdG9bMF1dW3RvWzFdXT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdW5kb01vdmUoY2VsbFZhbHVlczpudW1iZXJbXVtdLCBtb3ZlOiBudW1iZXJbXVtdKTp2b2lkIHtcclxuXHJcbiAgICAgICAgaWYobW92ZS5sZW5ndGg9PT0wKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGZyb20gPSBtb3ZlWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pZGRsZSA9IG1vdmVbMV07XHJcbiAgICAgICAgY29uc3QgdG8gPSBtb3ZlWzJdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNlbGxWYWx1ZXNbZnJvbVswXV1bZnJvbVsxXV0hPT0gR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKGNlbGxWYWx1ZXNbbWlkZGxlWzBdXVttaWRkbGVbMV1dIT09IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihjZWxsVmFsdWVzW3RvWzBdXVt0b1sxXV0hPT0gR2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgIHJldHVybjsgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNlbGxWYWx1ZXNbZnJvbVswXV1bZnJvbVsxXV09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEw7XHJcbiAgICAgICAgY2VsbFZhbHVlc1ttaWRkbGVbMF1dW21pZGRsZVsxXV09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEw7XHJcbiAgICAgICAgY2VsbFZhbHVlc1t0b1swXV1bdG9bMV1dPUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICB9ICAgICBcclxuXHJcblxyXG59XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1jbGFzc2VzLXBlci1maWxlXHJcbmV4cG9ydCBjbGFzcyBEZWVwU29sdmVyTWF0cml4U29saXRhaXJlIGV4dGVuZHMgRGVlcFNvbHZlck1hdHJpeCB7XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBzb2x2ZXI6IEdhbWVTY2hlbWFTb2x2ZXJTb2xpdGFpcmUgPSBuZXcgR2FtZVNjaGVtYVNvbHZlclNvbGl0YWlyZSgpO1xyXG5cclxuICAgIHByaXZhdGUgc29sdmluZ01vdmVzOm51bWJlcltdW11bXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OmFueTtcclxuXHJcbiAgICBwcml2YXRlIHN0ZXAgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hdHJpeDogbnVtYmVyW11bXSwgY3R4OmFueSkge1xyXG4gICAgICAgIHN1cGVyKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNvbHZpbmdNb3ZlcygpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvbHZpbmdNb3ZlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBoYXNJc29sYXRlZFBlZ3NCKGNlbGxWYWx1ZXM6bnVtYmVyW11bXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvcihsZXQgcj0wO3I8IGNlbGxWYWx1ZXMubGVuZ3RoICAmJiAhZm91bmQ7cisrKVxyXG4gICAgICAgICAgICBmb3IobGV0IGM9MDtjPCBjZWxsVmFsdWVzW3JdLmxlbmd0aCAmJiAhZm91bmQ7YysrKVxyXG4gICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyXVtjXT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZ3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHI+MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyLTFdW2NdPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWdzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYz4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsVmFsdWVzW3JdW2MtMV09PT1HYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZ3MrKztcclxuICAgICAgICAgICAgICAgICAgICBpZihyPGNlbGxWYWx1ZXMubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxWYWx1ZXNbcisxXVtjXT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVncysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGM8Y2VsbFZhbHVlc1tyXS5sZW5ndGgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyXVtjKzFdPT09R2FtZUNlbGxTb2xpdGFpcmUuUEVHX0NFTEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWdzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGVncz09PTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBoYXNJc29sYXRlZFBlZ3MoY2VsbFZhbHVlczpudW1iZXJbXVtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcclxuICAgICAgICBmb3IobGV0IHI9MDtyPDcgJiYgb2s7cisrKVxyXG4gICAgICAgICAgICBmb3IobGV0IGM9MDtjPDcgJiYgb2s7YysrKVxyXG4gICAgICAgICAgICAgICAgaWYoY2VsbFZhbHVlc1tyXVtjXT09PUdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocj4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbci0xXVtjXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYz4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbcl1bYy0xXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocjw2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbcisxXVtjXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYzw2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvayA9IG9rICYmIGNlbGxWYWx1ZXNbcl1bYysxXSE9PUdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfSAgICBcclxuXHJcblxyXG4gICAgcHVibGljIGRlZXBTb2x2ZShsZXZlbDpudW1iZXIsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgLi4ucGFyYW1zOmFueVtdKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIC8vIHBydW5pbmdcclxuICAgICAgICBjb25zdCBpc29sYXRlZCA9IHRoaXMuaGFzSXNvbGF0ZWRQZWdzKHRoaXMubWF0cml4KTtcclxuICAgICAgICBjb25zdCBpc29sYXRlZEIgPSB0aGlzLmhhc0lzb2xhdGVkUGVnc0IodGhpcy5tYXRyaXgpO1xyXG5cclxuICAgICAgICAvKmlmKGlzb2xhdGVkQiE9PWlzb2xhdGVkKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQmluZ28hJyk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZihpc29sYXRlZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGFsbE1vdmVzID0gR2FtZU1vdmVNYWtlclNvbGl0YWlyZS5maW5kQWxsTW92ZXModGhpcy5tYXRyaXgpO1xyXG4gICAgICAgIGlmKGFsbE1vdmVzLnBlZ3M9PT0xKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBjb25zdCBtb3ZlcyA9IGFsbE1vdmVzLm1vdmVzO1xyXG5cclxuXHJcbiAgICAgICAgZm9yKGxldCBtPTA7IG08bW92ZXMubGVuZ3RoOyBtKyspIHtcclxuICAgICAgICAgICAgaWYoR2FtZU1vdmVNYWtlclNvbGl0YWlyZS5leGVjdXRlTW92ZSh0aGlzLm1hdHJpeCwgbW92ZXNbbV0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gbW92ZXNbbV1bMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaWRkbGUgPSBtb3Zlc1ttXVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gbW92ZXNbbV1bMl07XHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd0cnlWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IGZyb21bMF0sICdjb2wnOiBmcm9tWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5FTVBUWV9DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndHJ5VmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBtaWRkbGVbMF0sICdjb2wnOiBtaWRkbGVbMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwgfX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd0cnlWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IHRvWzBdLCAnY29sJzogdG9bMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRlZXBTb2x2ZShsZXZlbCsxLCByb3csIGNvbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4Py5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAnc2V0VmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBmcm9tWzBdLCAnY29sJzogZnJvbVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICdzZXRWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IG1pZGRsZVswXSwgJ2NvbCc6IG1pZGRsZVsxXSwgJ3ZhbHVlJzogR2FtZUNlbGxTb2xpdGFpcmUuRU1QVFlfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICdzZXRWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IHRvWzBdLCAnY29sJzogdG9bMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29sdmluZ01vdmVzLnB1c2gobW92ZXNbbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTW92ZU1ha2VyU29saXRhaXJlLnVuZG9Nb3ZlKHRoaXMubWF0cml4LCBtb3Zlc1ttXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eD8ucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3VuZG9WYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IGZyb21bMF0sICdjb2wnOiBmcm9tWzFdLCAndmFsdWUnOiBHYW1lQ2VsbFNvbGl0YWlyZS5QRUdfQ0VMTCB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHg/LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd1bmRvVmFsdWUnLCBldmVudERhdGE6eydyb3cnOiBtaWRkbGVbMF0sICdjb2wnOiBtaWRkbGVbMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLlBFR19DRUxMIH19KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eD8ucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3VuZG9WYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6IHRvWzBdLCAnY29sJzogdG9bMV0sICd2YWx1ZSc6IEdhbWVDZWxsU29saXRhaXJlLkVNUFRZX0NFTEwgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCInVHdhcyBhIHdyb25nIG1vdmUhISFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEZWVwU29sdmVyTWF0cml4U29saXRhaXJlIH0gZnJvbSBcIi4vZ2FtZS1zY2hlbWEtc29sdmVyXCI7XHJcblxyXG5jb25zdCBjdHg6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xyXG5cclxuY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgbWF0cml4ID0gZXZlbnQuZGF0YS5tYXRyaXg7XHJcbiAgICBjb25zdCBzb2x2ZXIgPSBuZXcgRGVlcFNvbHZlck1hdHJpeFNvbGl0YWlyZShtYXRyaXgsY3R4KTtcclxuICAgIGxldCBzb2x1dGlvblJlc3VsdCA9IFwiUmVzb2x1dGlvbiBmYWlsZWQuXCJcclxuICAgIGlmKHNvbHZlci5kZWVwU29sdmUoMCwgMSwgMykpIHtcclxuICAgICAgICBzb2x1dGlvblJlc3VsdCA9IFwiUmVjdXJzaXZlIHNlYXJjaCBzdWNjZWVkZWQuXCI7XHJcbiAgICB9XHJcbiAgICBjdHgucG9zdE1lc3NhZ2UoeydldmVudFR5cGUnOiAnc3VjY2VzcydcclxuICAgICAgICAsICdtYXRyaXgnOm1hdHJpeFxyXG4gICAgICAgICwgJ3NvbHV0aW9uUmVzdWx0Jzogc29sdXRpb25SZXN1bHRcclxuICAgICAgICAsICdzb2x2aW5nTW92ZXMnOiBzb2x2ZXIuZ2V0U29sdmluZ01vdmVzKCl9KTtcclxufSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVswXSEuL3NyYy9zb2xpdGFpcmUvc29saXRhaXJlLWRlZXAtc29sdmVyLndvcmtlci50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=