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

/***/ "./src/game-types/game-schema-checker-result.ts":
/*!******************************************************!*\
  !*** ./src/game-types/game-schema-checker-result.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameSchemaCheckerResult": () => /* binding */ GameSchemaCheckerResult
/* harmony export */ });
class GameSchemaCheckerResult {
    constructor() {
        this.resultMsg = '';
        this.err = false;
        this.sts = 0;
    }
    get resultMessage() {
        return this.resultMsg;
    }
    set resultMessage(value) {
        this.resultMsg = value;
    }
    get error() {
        return this.err;
    }
    set error(value) {
        this.err = value;
    }
    get status() {
        return this.sts;
    }
    set status(value) {
        this.sts = value;
    }
}


/***/ }),

/***/ "./src/sudoku/game-schema-checker.ts":
/*!*******************************************!*\
  !*** ./src/sudoku/game-schema-checker.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameSchemaCheckerSudoku": () => /* binding */ GameSchemaCheckerSudoku
/* harmony export */ });
/* harmony import */ var _game_types_game_schema_checker_result__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-types/game-schema-checker-result */ "./src/game-types/game-schema-checker-result.ts");

class GameSchemaCheckerSudoku {
    constructor() {
        this.incomplete = false;
        this.resultMessage = "";
    }
    check(schema, incomplete = false) {
        return this.checkMatrix(schema.getValues(), incomplete);
    }
    checkMatrix(matrix, incomplete = false) {
        this.incomplete = incomplete;
        let error = false;
        const result = new _game_types_game_schema_checker_result__WEBPACK_IMPORTED_MODULE_0__.GameSchemaCheckerResult();
        // this.checkResult = 'Checking rows...';
        for (let r = 0; r < 9 && !error; r++) {
            const positions = this.getRowPositions(r);
            error = this.checkPostions(matrix, r, positions, 'row');
        }
        // this.checkResult = 'Checking columns...';
        if (!error) {
            for (let c = 0; c < 9 && !error; c++) {
                const positions = this.getColPositions(c);
                error = this.checkPostions(matrix, c, positions, 'column');
            }
        }
        // this.checkResult = 'Checking squares...';
        if (!error) {
            for (let r = 0; r < 3 && !error; r++) {
                for (let c = 0; c < 3 && !error; c++) {
                    const positions = this.getSquarePositions(r, c);
                    error = this.checkPostions(matrix, '${r},${c}', positions, 'square');
                }
            }
        }
        if (!error) {
            result.error = false;
            result.resultMessage = 'Checked!';
        }
        else {
            result.error = true;
            result.resultMessage = this.resultMessage;
        }
        return result;
    }
    checkPostions(matrix, origin, positions, checkTypeMsg) {
        const counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let error = false;
        // tslint:disable-next-line: prefer-for-of
        for (let p = 0; p < positions.length; p++) {
            //console.log(`${checkTypeMsg} ${positions[p].row} , ${positions[p].col}`);
            counters[matrix[positions[p].row][positions[p].col]]++;
        }
        if (counters[0] > 0 && !this.incomplete) {
            this.resultMessage = `${checkTypeMsg} ${origin} not completely solved`;
            error = true;
        }
        if (!error) {
            const wrongindex = counters.findIndex((value, index, arr) => index === 0 ? false : value > 1);
            if (wrongindex !== -1) {
                this.resultMessage = `Number ${wrongindex} in present more than once in ${checkTypeMsg} ${origin}`;
                error = true;
            }
        }
        return error;
    }
    getRowPositions(currentrow) {
        const postions = [];
        for (let c = 0; c < 9; c++) {
            postions.push({ row: currentrow, col: c });
        }
        return postions;
    }
    getColPositions(currentcol) {
        const postions = [];
        for (let r = 0; r < 9; r++) {
            postions.push({ row: r, col: currentcol });
        }
        return postions;
    }
    getSquarePositions(sqrow, sqcol) {
        const postions = [];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                postions.push({ row: sqrow * 3 + r, col: sqcol * 3 + c });
            }
        }
        return postions;
    }
}


/***/ }),

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/sudoku/sudoku-deep-solver.worker.ts":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/sudoku/sudoku-deep-solver.worker.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeepSolverMatrixSudoku": () => /* binding */ DeepSolverMatrixSudoku
/* harmony export */ });
/* harmony import */ var _game_types_deep_solve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-types/deep-solve */ "./src/game-types/deep-solve.ts");
/* harmony import */ var _game_schema_checker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-schema-checker */ "./src/sudoku/game-schema-checker.ts");
/* harmony import */ var _sudoku_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sudoku-util */ "./src/sudoku/sudoku-util.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const ctx = self;
class DeepSolverMatrixSudoku extends _game_types_deep_solve__WEBPACK_IMPORTED_MODULE_0__.DeepSolverMatrix {
    constructor() {
        super(...arguments);
        this.checker = new _game_schema_checker__WEBPACK_IMPORTED_MODULE_1__.GameSchemaCheckerSudoku();
    }
    deepSolve(level, row, col, ...params) {
        let c = col;
        let r = row;
        if (c === 9) {
            r++;
            c = 0;
        }
        while (r < 9 && this.matrix[r][c] !== 0) {
            c++;
            if (c === 9) {
                r++;
                c = 0;
            }
        }
        if (r === 9) {
            const result = this.checker.checkMatrix(this.matrix);
            if (!result.error) {
                // console.log(`${r},${c}: success/1!`);
                return true;
            }
            // console.log(`${r},${c}: giving up!`);
            return false;
        }
        const valueSet = (0,_sudoku_util__WEBPACK_IMPORTED_MODULE_2__.getCellValueSet)(this.matrix, r, c);
        // schema.getCell(r,c).proposeValue(value);
        // 3. simplify the schema with this value
        // console.log(`${r},${c}: Trying to fix cell ${this.matrix[r][c]} with ${valueSet}`);
        for (const value of valueSet) {
            // console.log(`${r},${c}: Trying to fix cell with ${value} of ${valueSet}`);
            this.matrix[r][c] = value;
            ctx.postMessage({ 'eventType': 'tryValue', eventData: { 'row': r, 'col': c, 'value': value } });
            const result = this.checker.checkMatrix(this.matrix);
            if (!result.error) {
                // console.log(`${r},${c}: success with ${value}!`);
                return true;
            }
            // console.log(`${r},${c}: going deeper`);
            // is not solved: search again
            if (this.deepSolve(level + 1, r, c + 1)) {
                // console.log(`${r},${c}: success/2!`);
                ctx.postMessage({ 'eventType': 'setValue', eventData: { 'row': r, 'col': c, 'value': value } });
                return true;
            }
            else {
                this.matrix[r][c] = 0;
                ctx.postMessage({ 'eventType': 'undoValue', eventData: { 'row': r, 'col': c, 'value': value } });
            }
        }
        // console.log(`${r},${c}: just returning false`);
        return false;
    }
}
function delay(milliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    });
}
let solver;
ctx.addEventListener("message", (event) => {
    const matrix = event.data.matrix;
    solver = new DeepSolverMatrixSudoku(matrix);
    let solutionResult = "Resolution failed.";
    if (solver.deepSolve(0, 0, 0))
        solutionResult = "Recursive search succeeded.";
    ctx.postMessage({ 'eventType': 'success', 'matrix': matrix, 'solutionResult': solutionResult });
});


/***/ }),

/***/ "./src/sudoku/sudoku-util.ts":
/*!***********************************!*\
  !*** ./src/sudoku/sudoku-util.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findInSquare": () => /* binding */ findInSquare,
/* harmony export */   "findInCol": () => /* binding */ findInCol,
/* harmony export */   "findInRow": () => /* binding */ findInRow,
/* harmony export */   "getCellValueSet": () => /* binding */ getCellValueSet,
/* harmony export */   "checkIfSafe": () => /* binding */ checkIfSafe
/* harmony export */ });
/**
 * Find value in a 3x3 square
 * @param cells array of game cells
 * @param r row
 * @param c col
 * @param value true if value exists in square rooted in (r,c) cell
 */
function findInSquare(cells, r, c, value) {
    let found = false;
    const sr = Math.floor(r / 3);
    const sc = Math.floor(c / 3);
    // 0,1,2 --> 0
    // 3,4,5 --> 1
    // 6,7,8 --> 2
    for (let i = 0; i < 3 && !found; i++) {
        for (let j = 0; j < 3 && !found; j++) {
            found = cells[sr * 3 + i][sc * 3 + j] === value;
        }
    }
    return found;
}
/**
 * Find value in a column
 * @param cells array of game cells
 * @param c col
 * @param value true if value exists in column c
 */
function findInCol(cells, c, value) {
    let found = false;
    for (let i = 0; i < 9 && !found; i++) {
        found = cells[i][c] === value;
    }
    return found;
}
/**
 * Find value in a row
 * @param cells array of game cells
 * @param r row
 * @param value true if value exists in row r
 */
function findInRow(cells, r, value) {
    let found = false;
    for (let i = 0; i < 9 && !found; i++) {
        found = cells[r][i] === value;
    }
    return found;
}
function getCellValueSet(matrix, r, c) {
    const valueSet = [];
    for (let i = 1; i <= 9; i++) {
        if (checkIfSafe(matrix, r, c, i)) {
            valueSet.push(i);
        }
    }
    return valueSet;
}
/**
 * Check if safe to put v in cell matrix[r][c]
 */
function checkIfSafe(matrix, r, c, v) {
    return (!findInRow(matrix, r, v)
        && !findInCol(matrix, c, v)
        && !findInSquare(matrix, r, c, v));
}


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
/******/ 	__webpack_require__("./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/sudoku/sudoku-deep-solver.worker.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZGVlcC1zb2x2ZS50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZ2FtZS1zY2hlbWEtY2hlY2tlci1yZXN1bHQudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zdWRva3UvZ2FtZS1zY2hlbWEtY2hlY2tlci50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL3N1ZG9rdS9zdWRva3UtZGVlcC1zb2x2ZXIud29ya2VyLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvLi9zcmMvc3Vkb2t1L3N1ZG9rdS11dGlsLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLE1BQWUsZ0JBQWdCO0lBSWxDLFlBQVksTUFBa0I7UUFGcEIsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUc5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBSUo7Ozs7Ozs7Ozs7Ozs7OztBQ1ZNLE1BQU0sdUJBQXVCO0lBQXBDO1FBRVksY0FBUyxHQUFHLEVBQUUsQ0FBQztRQVVmLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFVWixRQUFHLEdBQUcsQ0FBQyxDQUFDO0lBVXBCLENBQUM7SUE1QkcsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFD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ImZpbGUiOiJzdWRva3UtZGVlcC1zb2x2ZXIud29ya2VyLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEZWVwU29sdmVyTWF0cml4IHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbWF0cml4OiBudW1iZXJbXVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobWF0cml4OiBudW1iZXJbXVtdKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGRlZXBTb2x2ZShsZXZlbDpudW1iZXIsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgLi4ucGFyYW1zOmFueVtdKTogYm9vbGVhbjtcclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgR2FtZVNjaGVtYUNoZWNrZXJSZXN1bHQge1xyXG5cclxuICAgIHByaXZhdGUgcmVzdWx0TXNnID0gJyc7XHJcblxyXG4gICAgcHVibGljIGdldCByZXN1bHRNZXNzYWdlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0TXNnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcmVzdWx0TWVzc2FnZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRNc2cgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVyciA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZXJyb3IoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZXJyb3IodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmVyciA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RzID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXR1cygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN0YXR1cyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdHMgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgR2FtZVNjaGVtYUNoZWNrZXIgfSBmcm9tIFwiLi4vZ2FtZS10eXBlcy9nYW1lLXNjaGVtYS1jaGVja2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0IH0gZnJvbSBcIi4uL2dhbWUtdHlwZXMvZ2FtZS1zY2hlbWEtY2hlY2tlci1yZXN1bHRcIjtcclxuaW1wb3J0IHsgR2FtZUNlbGxTdWRva3UgfSBmcm9tIFwiLi9nYW1lLWNlbGxcIjtcclxuaW1wb3J0IHsgR2FtZVNjaGVtYVN1ZG9rdSB9IGZyb20gXCIuL2dhbWUtc2NoZW1hXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVTY2hlbWFDaGVja2VyU3Vkb2t1IGltcGxlbWVudHMgR2FtZVNjaGVtYUNoZWNrZXI8R2FtZUNlbGxTdWRva3UsIEdhbWVTY2hlbWFTdWRva3U+IHtcclxuXHJcbiAgICBwcml2YXRlIGluY29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIHJlc3VsdE1lc3NhZ2U6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgcHVibGljIGNoZWNrKHNjaGVtYTogR2FtZVNjaGVtYVN1ZG9rdSwgaW5jb21wbGV0ZTogYm9vbGVhbj1mYWxzZSk6IEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja01hdHJpeChzY2hlbWEuZ2V0VmFsdWVzKCksIGluY29tcGxldGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja01hdHJpeChtYXRyaXg6IG51bWJlcltdW10sIGluY29tcGxldGU6IGJvb2xlYW49ZmFsc2UpOiBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5jb21wbGV0ZSA9aW5jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgbGV0IGVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCA9IG5ldyBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmNoZWNrUmVzdWx0ID0gJ0NoZWNraW5nIHJvd3MuLi4nO1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgOSAmJiAhZXJyb3I7IHIrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zICA9IHRoaXMuZ2V0Um93UG9zaXRpb25zKHIpO1xyXG4gICAgICAgICAgICBlcnJvciA9IHRoaXMuY2hlY2tQb3N0aW9ucyhtYXRyaXgsIHIsIHBvc2l0aW9ucywgJ3JvdycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmNoZWNrUmVzdWx0ID0gJ0NoZWNraW5nIGNvbHVtbnMuLi4nO1xyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA5ICYmICFlcnJvcjsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgID0gdGhpcy5nZXRDb2xQb3NpdGlvbnMoYyk7XHJcbiAgICAgICAgICAgICAgICBlcnJvciA9IHRoaXMuY2hlY2tQb3N0aW9ucyhtYXRyaXgsIGMsIHBvc2l0aW9ucywgJ2NvbHVtbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuY2hlY2tSZXN1bHQgPSAnQ2hlY2tpbmcgc3F1YXJlcy4uLic7XHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDMgJiYgIWVycm9yOyByKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMyAmJiAhZXJyb3I7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyAgPSB0aGlzLmdldFNxdWFyZVBvc2l0aW9ucyhyLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHRoaXMuY2hlY2tQb3N0aW9ucyhtYXRyaXgsICcke3J9LCR7Y30nLCBwb3NpdGlvbnMsICdzcXVhcmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXN1bHQucmVzdWx0TWVzc2FnZSA9ICdDaGVja2VkISc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0LnJlc3VsdE1lc3NhZ2UgPSB0aGlzLnJlc3VsdE1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrUG9zdGlvbnMobWF0cml4OiBudW1iZXJbXVtdLCBvcmlnaW46IGFueSwgcG9zaXRpb25zOiB7cm93OiBudW1iZXIsIGNvbDogbnVtYmVyfVtdLCBjaGVja1R5cGVNc2c6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGNvdW50ZXJzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgIGxldCBlcnJvciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1mb3Itb2ZcclxuICAgICAgICBmb3IgKGxldCBwID0gMDsgcCA8IHBvc2l0aW9ucy5sZW5ndGg7IHArKykge1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgJHtjaGVja1R5cGVNc2d9ICR7cG9zaXRpb25zW3BdLnJvd30gLCAke3Bvc2l0aW9uc1twXS5jb2x9YCk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzWyBtYXRyaXhbcG9zaXRpb25zW3BdLnJvd11bcG9zaXRpb25zW3BdLmNvbF0gXSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdW50ZXJzWzBdID4gMCAmJiAhdGhpcy5pbmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TWVzc2FnZSA9IGAke2NoZWNrVHlwZU1zZ30gJHtvcmlnaW59IG5vdCBjb21wbGV0ZWx5IHNvbHZlZGA7XHJcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ2luZGV4ID0gY291bnRlcnMuZmluZEluZGV4KCAodmFsdWUsIGluZGV4LCBhcnIpID0+IGluZGV4ID09PSAwID8gZmFsc2UgOiB2YWx1ZSA+IDEpO1xyXG4gICAgICAgICAgICBpZiAod3JvbmdpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0TWVzc2FnZSA9IGBOdW1iZXIgJHt3cm9uZ2luZGV4fSBpbiBwcmVzZW50IG1vcmUgdGhhbiBvbmNlIGluICR7Y2hlY2tUeXBlTXNnfSAke29yaWdpbn1gO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZ2V0Um93UG9zaXRpb25zKGN1cnJlbnRyb3c6IG51bWJlcik6IHtyb3c6IG51bWJlciwgY29sOiBudW1iZXJ9W10ge1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYysrKSB7XHJcbiAgICAgICAgICAgIHBvc3Rpb25zLnB1c2goe3JvdzogY3VycmVudHJvdywgY29sOiBjfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcG9zdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sUG9zaXRpb25zKGN1cnJlbnRjb2w6IG51bWJlcik6IHtyb3c6IG51bWJlciwgY29sOiBudW1iZXJ9W10ge1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgOTsgcisrKSB7XHJcbiAgICAgICAgICAgIHBvc3Rpb25zLnB1c2goe3JvdzogciwgY29sOiBjdXJyZW50Y29sfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcG9zdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3F1YXJlUG9zaXRpb25zKHNxcm93OiBudW1iZXIsIHNxY29sOiBudW1iZXIpOiB7cm93OiBudW1iZXIsIGNvbDogbnVtYmVyfVtdIHtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDM7IHIrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDM7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgcG9zdGlvbnMucHVzaCh7cm93OiBzcXJvdyAqIDMgKyByLCBjb2w6IHNxY29sICogMyArIGN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBvc3Rpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGVlcFNvbHZlck1hdHJpeCB9IGZyb20gXCIuLi9nYW1lLXR5cGVzL2RlZXAtc29sdmVcIjtcclxuaW1wb3J0IHsgR2FtZVNjaGVtYUNoZWNrZXJTdWRva3UgfSBmcm9tIFwiLi9nYW1lLXNjaGVtYS1jaGVja2VyXCI7XHJcbmltcG9ydCB7IGdldENlbGxWYWx1ZVNldCB9IGZyb20gXCIuL3N1ZG9rdS11dGlsXCI7XHJcblxyXG5jb25zdCBjdHg6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZXBTb2x2ZXJNYXRyaXhTdWRva3UgZXh0ZW5kcyBEZWVwU29sdmVyTWF0cml4IHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja2VyOiBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSA9IG5ldyBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSgpO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZGVlcFNvbHZlKGxldmVsOm51bWJlciwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCAuLi5wYXJhbXM6YW55W10pOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgbGV0IGMgPSBjb2w7XHJcbiAgICAgICAgbGV0IHIgPSByb3c7XHJcblxyXG4gICAgICAgIGlmKGMgPT09IDkpIHtcclxuICAgICAgICAgICAgcisrO1xyXG4gICAgICAgICAgICBjPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZShyPDkgJiYgdGhpcy5tYXRyaXhbcl1bY10hPT0wKSB7XHJcbiAgICAgICAgICAgIGMrKztcclxuICAgICAgICAgICAgaWYoYz09PTkpIHtcclxuICAgICAgICAgICAgICAgIHIrKztcclxuICAgICAgICAgICAgICAgIGM9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYociA9PT0gOSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNoZWNrZXIuY2hlY2tNYXRyaXgodGhpcy5tYXRyaXgpO1xyXG4gICAgICAgICAgICBpZighcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBzdWNjZXNzLzEhYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogZ2l2aW5nIHVwIWApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZhbHVlU2V0ID0gZ2V0Q2VsbFZhbHVlU2V0KHRoaXMubWF0cml4LHIsYyk7XHJcbiAgICAgICAgLy8gc2NoZW1hLmdldENlbGwocixjKS5wcm9wb3NlVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICAvLyAzLiBzaW1wbGlmeSB0aGUgc2NoZW1hIHdpdGggdGhpcyB2YWx1ZVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBUcnlpbmcgdG8gZml4IGNlbGwgJHt0aGlzLm1hdHJpeFtyXVtjXX0gd2l0aCAke3ZhbHVlU2V0fWApO1xyXG4gICAgICAgIGZvcihjb25zdCB2YWx1ZSBvZiB2YWx1ZVNldCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBUcnlpbmcgdG8gZml4IGNlbGwgd2l0aCAke3ZhbHVlfSBvZiAke3ZhbHVlU2V0fWApO1xyXG4gICAgICAgICAgICB0aGlzLm1hdHJpeFtyXVtjXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3RyeVZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX19KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGVja2VyLmNoZWNrTWF0cml4KHRoaXMubWF0cml4KTtcclxuICAgICAgICAgICAgaWYoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogc3VjY2VzcyB3aXRoICR7dmFsdWV9IWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogZ29pbmcgZGVlcGVyYCk7XHJcbiAgICAgICAgICAgIC8vIGlzIG5vdCBzb2x2ZWQ6IHNlYXJjaCBhZ2FpblxyXG4gICAgICAgICAgICBpZih0aGlzLmRlZXBTb2x2ZShsZXZlbCsxLCByLCBjKzEpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBzdWNjZXNzLzIhYCk7XHJcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3NldFZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX0gfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W3JdW2NdID0gMDtcclxuICAgICAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndW5kb1ZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfToganVzdCByZXR1cm5pbmcgZmFsc2VgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGF5KG1pbGxpc2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxubGV0IHNvbHZlcjogRGVlcFNvbHZlck1hdHJpeFN1ZG9rdTtcclxuXHJcbmN0eC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IG1hdHJpeCA9IGV2ZW50LmRhdGEubWF0cml4O1xyXG4gICAgc29sdmVyID0gbmV3IERlZXBTb2x2ZXJNYXRyaXhTdWRva3UobWF0cml4KTtcclxuICAgIGxldCBzb2x1dGlvblJlc3VsdCA9IFwiUmVzb2x1dGlvbiBmYWlsZWQuXCJcclxuICAgIGlmKHNvbHZlci5kZWVwU29sdmUoMCwgMCwgMCkpXHJcbiAgICAgICAgc29sdXRpb25SZXN1bHQgPSBcIlJlY3Vyc2l2ZSBzZWFyY2ggc3VjY2VlZGVkLlwiO1xyXG4gICAgY3R4LnBvc3RNZXNzYWdlKHsnZXZlbnRUeXBlJzogJ3N1Y2Nlc3MnLCAnbWF0cml4JzptYXRyaXgsICdzb2x1dGlvblJlc3VsdCc6IHNvbHV0aW9uUmVzdWx0IH0pO1xyXG59KTsiLCIgICAgLyoqXHJcbiAgICAgKiBGaW5kIHZhbHVlIGluIGEgM3gzIHNxdWFyZVxyXG4gICAgICogQHBhcmFtIGNlbGxzIGFycmF5IG9mIGdhbWUgY2VsbHNcclxuICAgICAqIEBwYXJhbSByIHJvd1xyXG4gICAgICogQHBhcmFtIGMgY29sXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgdHJ1ZSBpZiB2YWx1ZSBleGlzdHMgaW4gc3F1YXJlIHJvb3RlZCBpbiAocixjKSBjZWxsXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmaW5kSW5TcXVhcmUoY2VsbHM6IG51bWJlcltdW10sIHI6IG51bWJlciwgYzogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHNyID0gTWF0aC5mbG9vcihyIC8gMyk7XHJcbiAgICAgICAgY29uc3Qgc2MgPSBNYXRoLmZsb29yKGMgLyAzKTtcclxuXHJcbiAgICAgICAgLy8gMCwxLDIgLS0+IDBcclxuICAgICAgICAvLyAzLDQsNSAtLT4gMVxyXG4gICAgICAgIC8vIDYsNyw4IC0tPiAyXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMyAmJiAhZm91bmQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDMgJiYgIWZvdW5kOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gY2VsbHNbc3IgKiAzICsgaV1bc2MgKiAzICsgal0gPT09IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIHZhbHVlIGluIGEgY29sdW1uXHJcbiAgICAgKiBAcGFyYW0gY2VsbHMgYXJyYXkgb2YgZ2FtZSBjZWxsc1xyXG4gICAgICogQHBhcmFtIGMgY29sXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgdHJ1ZSBpZiB2YWx1ZSBleGlzdHMgaW4gY29sdW1uIGNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbkNvbChjZWxsczogbnVtYmVyW11bXSwgYzogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5ICYmICFmb3VuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvdW5kID0gIGNlbGxzW2ldW2NdID09PSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB2YWx1ZSBpbiBhIHJvd1xyXG4gICAgICogQHBhcmFtIGNlbGxzIGFycmF5IG9mIGdhbWUgY2VsbHNcclxuICAgICAqIEBwYXJhbSByIHJvd1xyXG4gICAgICogQHBhcmFtIHZhbHVlIHRydWUgaWYgdmFsdWUgZXhpc3RzIGluIHJvdyByXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmaW5kSW5Sb3coY2VsbHM6IG51bWJlcltdW10sIHI6IG51bWJlciwgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOSAmJiAhZm91bmQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGNlbGxzW3JdW2ldID09PSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRDZWxsVmFsdWVTZXQobWF0cml4OiBudW1iZXJbXVtdLCByOiBudW1iZXIsIGM6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCB2YWx1ZVNldDogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGk9MTtpPD05O2krKykge1xyXG4gICAgICAgICAgICBpZihjaGVja0lmU2FmZShtYXRyaXgsIHIsIGMsIGkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZVNldC5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWVTZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBzYWZlIHRvIHB1dCB2IGluIGNlbGwgbWF0cml4W3JdW2NdXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjaGVja0lmU2FmZShtYXRyaXg6bnVtYmVyW11bXSwgcjogbnVtYmVyLCBjOiBudW1iZXIsIHY6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoIWZpbmRJblJvdyhtYXRyaXgsIHIsIHYpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgIWZpbmRJbkNvbChtYXRyaXgsIGMsIHYpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgIWZpbmRJblNxdWFyZShtYXRyaXgsIHIsIGMsIHYpKTtcclxuICAgIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzBdIS4vc3JjL3N1ZG9rdS9zdWRva3UtZGVlcC1zb2x2ZXIud29ya2VyLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==