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
    deepSolve(row, col) {
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
            if (this.deepSolve(r, c + 1)) {
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
    if (solver.deepSolve(0, 0))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZGVlcC1zb2x2ZS50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZ2FtZS1zY2hlbWEtY2hlY2tlci1yZXN1bHQudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zdWRva3UvZ2FtZS1zY2hlbWEtY2hlY2tlci50cyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL3N1ZG9rdS9zdWRva3UtZGVlcC1zb2x2ZXIud29ya2VyLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvLi9zcmMvc3Vkb2t1L3N1ZG9rdS11dGlsLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLE1BQWUsZ0JBQWdCO0lBSWxDLFlBQVksTUFBa0I7UUFGcEIsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUc5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBSUo7Ozs7Ozs7Ozs7Ozs7OztBQ1ZNLE1BQU0sdUJBQXVCO0lBQXBDO1FBRVksY0FBUyxHQUFHLEVBQUUsQ0FBQztRQVVmLFFBQUcsR0FBRyxLQUFLLENBQUM7SUFTeEIsQ0FBQztJQWpCRyxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFF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RUFBRSxFQUFFO1FBQ2xCLElBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7S0FDSjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7R0FFRztBQUNJLFNBQVMsV0FBVyxDQUFDLE1BQWlCLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQzFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUNqQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUN4QixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7Ozs7Ozs7VUN4RUw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6InN1ZG9rdS1kZWVwLXNvbHZlci53b3JrZXIud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZXBTb2x2ZXJNYXRyaXgge1xyXG5cclxuICAgIHByb3RlY3RlZCBtYXRyaXg6IG51bWJlcltdW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYXRyaXg6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZGVlcFNvbHZlKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IGJvb2xlYW47XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0IHtcclxuXHJcbiAgICBwcml2YXRlIHJlc3VsdE1zZyA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVzdWx0TWVzc2FnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdE1zZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHJlc3VsdE1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVzdWx0TXNnID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlcnIgPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVycm9yKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVycm9yKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5lcnIgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lU2NoZW1hQ2hlY2tlciB9IGZyb20gXCIuLi9nYW1lLXR5cGVzL2dhbWUtc2NoZW1hLWNoZWNrZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNjaGVtYUNoZWNrZXJSZXN1bHQgfSBmcm9tIFwiLi4vZ2FtZS10eXBlcy9nYW1lLXNjaGVtYS1jaGVja2VyLXJlc3VsdFwiO1xyXG5pbXBvcnQgeyBHYW1lQ2VsbFN1ZG9rdSB9IGZyb20gXCIuL2dhbWUtY2VsbFwiO1xyXG5pbXBvcnQgeyBHYW1lU2NoZW1hU3Vkb2t1IH0gZnJvbSBcIi4vZ2FtZS1zY2hlbWFcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVNjaGVtYUNoZWNrZXJTdWRva3UgaW1wbGVtZW50cyBHYW1lU2NoZW1hQ2hlY2tlcjxHYW1lQ2VsbFN1ZG9rdSwgR2FtZVNjaGVtYVN1ZG9rdT4ge1xyXG5cclxuICAgIHByaXZhdGUgaW5jb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgcmVzdWx0TWVzc2FnZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgY2hlY2soc2NoZW1hOiBHYW1lU2NoZW1hU3Vkb2t1LCBpbmNvbXBsZXRlOiBib29sZWFuPWZhbHNlKTogR2FtZVNjaGVtYUNoZWNrZXJSZXN1bHQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrTWF0cml4KHNjaGVtYS5nZXRWYWx1ZXMoKSwgaW5jb21wbGV0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrTWF0cml4KG1hdHJpeDogbnVtYmVyW11bXSwgaW5jb21wbGV0ZTogYm9vbGVhbj1mYWxzZSk6IEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0IHtcclxuXHJcbiAgICAgICAgdGhpcy5pbmNvbXBsZXRlID1pbmNvbXBsZXRlO1xyXG5cclxuICAgICAgICBsZXQgZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0ID0gbmV3IEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0KCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuY2hlY2tSZXN1bHQgPSAnQ2hlY2tpbmcgcm93cy4uLic7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA5ICYmICFlcnJvcjsgcisrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgID0gdGhpcy5nZXRSb3dQb3NpdGlvbnMocik7XHJcbiAgICAgICAgICAgIGVycm9yID0gdGhpcy5jaGVja1Bvc3Rpb25zKG1hdHJpeCwgciwgcG9zaXRpb25zLCAncm93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuY2hlY2tSZXN1bHQgPSAnQ2hlY2tpbmcgY29sdW1ucy4uLic7XHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDkgJiYgIWVycm9yOyBjKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyAgPSB0aGlzLmdldENvbFBvc2l0aW9ucyhjKTtcclxuICAgICAgICAgICAgICAgIGVycm9yID0gdGhpcy5jaGVja1Bvc3Rpb25zKG1hdHJpeCwgYywgcG9zaXRpb25zLCAnY29sdW1uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5jaGVja1Jlc3VsdCA9ICdDaGVja2luZyBzcXVhcmVzLi4uJztcclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgMyAmJiAhZXJyb3I7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCAzICYmICFlcnJvcjsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zICA9IHRoaXMuZ2V0U3F1YXJlUG9zaXRpb25zKHIsIGMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gdGhpcy5jaGVja1Bvc3Rpb25zKG1hdHJpeCwgJyR7cn0sJHtjfScsIHBvc2l0aW9ucywgJ3NxdWFyZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlc3VsdC5yZXN1bHRNZXNzYWdlID0gJ0NoZWNrZWQhJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXN1bHQucmVzdWx0TWVzc2FnZSA9IHRoaXMucmVzdWx0TWVzc2FnZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tQb3N0aW9ucyhtYXRyaXg6IG51bWJlcltdW10sIG9yaWdpbjogYW55LCBwb3NpdGlvbnM6IHtyb3c6IG51bWJlciwgY29sOiBudW1iZXJ9W10sIGNoZWNrVHlwZU1zZzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgY291bnRlcnMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgbGV0IGVycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcHJlZmVyLWZvci1vZlxyXG4gICAgICAgIGZvciAobGV0IHAgPSAwOyBwIDwgcG9zaXRpb25zLmxlbmd0aDsgcCsrKSB7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGAke2NoZWNrVHlwZU1zZ30gJHtwb3NpdGlvbnNbcF0ucm93fSAsICR7cG9zaXRpb25zW3BdLmNvbH1gKTtcclxuICAgICAgICAgICAgY291bnRlcnNbIG1hdHJpeFtwb3NpdGlvbnNbcF0ucm93XVtwb3NpdGlvbnNbcF0uY29sXSBdKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY291bnRlcnNbMF0gPiAwICYmICF0aGlzLmluY29tcGxldGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRNZXNzYWdlID0gYCR7Y2hlY2tUeXBlTXNnfSAke29yaWdpbn0gbm90IGNvbXBsZXRlbHkgc29sdmVkYDtcclxuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25naW5kZXggPSBjb3VudGVycy5maW5kSW5kZXgoICh2YWx1ZSwgaW5kZXgsIGFycikgPT4gaW5kZXggPT09IDAgPyBmYWxzZSA6IHZhbHVlID4gMSk7XHJcbiAgICAgICAgICAgIGlmICh3cm9uZ2luZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRNZXNzYWdlID0gYE51bWJlciAke3dyb25naW5kZXh9IGluIHByZXNlbnQgbW9yZSB0aGFuIG9uY2UgaW4gJHtjaGVja1R5cGVNc2d9ICR7b3JpZ2lufWA7XHJcbiAgICAgICAgICAgICAgICBlcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXRSb3dQb3NpdGlvbnMoY3VycmVudHJvdzogbnVtYmVyKToge3JvdzogbnVtYmVyLCBjb2w6IG51bWJlcn1bXSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc3Rpb25zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA5OyBjKyspIHtcclxuICAgICAgICAgICAgcG9zdGlvbnMucHVzaCh7cm93OiBjdXJyZW50cm93LCBjb2w6IGN9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwb3N0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb2xQb3NpdGlvbnMoY3VycmVudGNvbDogbnVtYmVyKToge3JvdzogbnVtYmVyLCBjb2w6IG51bWJlcn1bXSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc3Rpb25zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA5OyByKyspIHtcclxuICAgICAgICAgICAgcG9zdGlvbnMucHVzaCh7cm93OiByLCBjb2w6IGN1cnJlbnRjb2x9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwb3N0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTcXVhcmVQb3NpdGlvbnMoc3Fyb3c6IG51bWJlciwgc3Fjb2w6IG51bWJlcik6IHtyb3c6IG51bWJlciwgY29sOiBudW1iZXJ9W10ge1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgMzsgcisrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMzsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBwb3N0aW9ucy5wdXNoKHtyb3c6IHNxcm93ICogMyArIHIsIGNvbDogc3Fjb2wgKiAzICsgY30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcG9zdGlvbnM7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEZWVwU29sdmVyTWF0cml4IH0gZnJvbSBcIi4uL2dhbWUtdHlwZXMvZGVlcC1zb2x2ZVwiO1xyXG5pbXBvcnQgeyBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSB9IGZyb20gXCIuL2dhbWUtc2NoZW1hLWNoZWNrZXJcIjtcclxuaW1wb3J0IHsgZ2V0Q2VsbFZhbHVlU2V0IH0gZnJvbSBcIi4vc3Vkb2t1LXV0aWxcIjtcclxuXHJcbmNvbnN0IGN0eDogV29ya2VyID0gc2VsZiBhcyBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVlcFNvbHZlck1hdHJpeFN1ZG9rdSBleHRlbmRzIERlZXBTb2x2ZXJNYXRyaXgge1xyXG5cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrZXI6IEdhbWVTY2hlbWFDaGVja2VyU3Vkb2t1ID0gbmV3IEdhbWVTY2hlbWFDaGVja2VyU3Vkb2t1KCk7XHJcblxyXG5cclxuICAgIHB1YmxpYyBkZWVwU29sdmUocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGxldCBjID0gY29sO1xyXG4gICAgICAgIGxldCByID0gcm93O1xyXG5cclxuICAgICAgICBpZihjID09PSA5KSB7XHJcbiAgICAgICAgICAgIHIrKztcclxuICAgICAgICAgICAgYz0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUocjw5ICYmIHRoaXMubWF0cml4W3JdW2NdIT09MCkge1xyXG4gICAgICAgICAgICBjKys7XHJcbiAgICAgICAgICAgIGlmKGM9PT05KSB7XHJcbiAgICAgICAgICAgICAgICByKys7XHJcbiAgICAgICAgICAgICAgICBjPTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHIgPT09IDkpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGVja2VyLmNoZWNrTWF0cml4KHRoaXMubWF0cml4KTtcclxuICAgICAgICAgICAgaWYoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogc3VjY2Vzcy8xIWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3J9LCR7Y306IGdpdmluZyB1cCFgKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2YWx1ZVNldCA9IGdldENlbGxWYWx1ZVNldCh0aGlzLm1hdHJpeCxyLGMpO1xyXG4gICAgICAgIC8vIHNjaGVtYS5nZXRDZWxsKHIsYykucHJvcG9zZVZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgLy8gMy4gc2ltcGxpZnkgdGhlIHNjaGVtYSB3aXRoIHRoaXMgdmFsdWVcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogVHJ5aW5nIHRvIGZpeCBjZWxsICR7dGhpcy5tYXRyaXhbcl1bY119IHdpdGggJHt2YWx1ZVNldH1gKTtcclxuICAgICAgICBmb3IoY29uc3QgdmFsdWUgb2YgdmFsdWVTZXQpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogVHJ5aW5nIHRvIGZpeCBjZWxsIHdpdGggJHt2YWx1ZX0gb2YgJHt2YWx1ZVNldH1gKTtcclxuICAgICAgICAgICAgdGhpcy5tYXRyaXhbcl1bY10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICd0cnlWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6ciwgJ2NvbCc6YywgJ3ZhbHVlJzogdmFsdWV9fSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2hlY2tlci5jaGVja01hdHJpeCh0aGlzLm1hdHJpeCk7XHJcbiAgICAgICAgICAgIGlmKCFyZXN1bHQuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3J9LCR7Y306IHN1Y2Nlc3Mgd2l0aCAke3ZhbHVlfSFgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3J9LCR7Y306IGdvaW5nIGRlZXBlcmApO1xyXG4gICAgICAgICAgICAvLyBpcyBub3Qgc29sdmVkOiBzZWFyY2ggYWdhaW5cclxuICAgICAgICAgICAgaWYodGhpcy5kZWVwU29sdmUociwgYysxKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogc3VjY2Vzcy8yIWApO1xyXG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHsgJ2V2ZW50VHlwZSc6ICdzZXRWYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6ciwgJ2NvbCc6YywgJ3ZhbHVlJzogdmFsdWV9IH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtyXVtjXSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3VuZG9WYWx1ZScsIGV2ZW50RGF0YTp7J3Jvdyc6ciwgJ2NvbCc6YywgJ3ZhbHVlJzogdmFsdWV9IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3J9LCR7Y306IGp1c3QgcmV0dXJuaW5nIGZhbHNlYCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxheShtaWxsaXNlY29uZHM6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbWlsbGlzZWNvbmRzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbmxldCBzb2x2ZXI6IERlZXBTb2x2ZXJNYXRyaXhTdWRva3U7XHJcblxyXG5jdHguYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBtYXRyaXggPSBldmVudC5kYXRhLm1hdHJpeDtcclxuICAgIHNvbHZlciA9IG5ldyBEZWVwU29sdmVyTWF0cml4U3Vkb2t1KG1hdHJpeCk7XHJcbiAgICBsZXQgc29sdXRpb25SZXN1bHQgPSBcIlJlc29sdXRpb24gZmFpbGVkLlwiXHJcbiAgICBpZihzb2x2ZXIuZGVlcFNvbHZlKDAsMCkpXHJcbiAgICAgICAgc29sdXRpb25SZXN1bHQgPSBcIlJlY3Vyc2l2ZSBzZWFyY2ggc3VjY2VlZGVkLlwiO1xyXG4gICAgY3R4LnBvc3RNZXNzYWdlKHsnZXZlbnRUeXBlJzogJ3N1Y2Nlc3MnLCAnbWF0cml4JzptYXRyaXgsICdzb2x1dGlvblJlc3VsdCc6IHNvbHV0aW9uUmVzdWx0IH0pO1xyXG59KTsiLCIgICAgLyoqXHJcbiAgICAgKiBGaW5kIHZhbHVlIGluIGEgM3gzIHNxdWFyZVxyXG4gICAgICogQHBhcmFtIGNlbGxzIGFycmF5IG9mIGdhbWUgY2VsbHNcclxuICAgICAqIEBwYXJhbSByIHJvd1xyXG4gICAgICogQHBhcmFtIGMgY29sXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgdHJ1ZSBpZiB2YWx1ZSBleGlzdHMgaW4gc3F1YXJlIHJvb3RlZCBpbiAocixjKSBjZWxsXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmaW5kSW5TcXVhcmUoY2VsbHM6IG51bWJlcltdW10sIHI6IG51bWJlciwgYzogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHNyID0gTWF0aC5mbG9vcihyIC8gMyk7XHJcbiAgICAgICAgY29uc3Qgc2MgPSBNYXRoLmZsb29yKGMgLyAzKTtcclxuXHJcbiAgICAgICAgLy8gMCwxLDIgLS0+IDBcclxuICAgICAgICAvLyAzLDQsNSAtLT4gMVxyXG4gICAgICAgIC8vIDYsNyw4IC0tPiAyXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMyAmJiAhZm91bmQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDMgJiYgIWZvdW5kOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gY2VsbHNbc3IgKiAzICsgaV1bc2MgKiAzICsgal0gPT09IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIHZhbHVlIGluIGEgY29sdW1uXHJcbiAgICAgKiBAcGFyYW0gY2VsbHMgYXJyYXkgb2YgZ2FtZSBjZWxsc1xyXG4gICAgICogQHBhcmFtIGMgY29sXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgdHJ1ZSBpZiB2YWx1ZSBleGlzdHMgaW4gY29sdW1uIGNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbkNvbChjZWxsczogbnVtYmVyW11bXSwgYzogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5ICYmICFmb3VuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvdW5kID0gIGNlbGxzW2ldW2NdID09PSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB2YWx1ZSBpbiBhIHJvd1xyXG4gICAgICogQHBhcmFtIGNlbGxzIGFycmF5IG9mIGdhbWUgY2VsbHNcclxuICAgICAqIEBwYXJhbSByIHJvd1xyXG4gICAgICogQHBhcmFtIHZhbHVlIHRydWUgaWYgdmFsdWUgZXhpc3RzIGluIHJvdyByXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmaW5kSW5Sb3coY2VsbHM6IG51bWJlcltdW10sIHI6IG51bWJlciwgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOSAmJiAhZm91bmQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGNlbGxzW3JdW2ldID09PSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRDZWxsVmFsdWVTZXQobWF0cml4OiBudW1iZXJbXVtdLCByOiBudW1iZXIsIGM6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCB2YWx1ZVNldDogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGk9MTtpPD05O2krKykge1xyXG4gICAgICAgICAgICBpZihjaGVja0lmU2FmZShtYXRyaXgsIHIsIGMsIGkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZVNldC5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWVTZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBzYWZlIHRvIHB1dCB2IGluIGNlbGwgbWF0cml4W3JdW2NdXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjaGVja0lmU2FmZShtYXRyaXg6bnVtYmVyW11bXSwgcjogbnVtYmVyLCBjOiBudW1iZXIsIHY6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoIWZpbmRJblJvdyhtYXRyaXgsIHIsIHYpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgIWZpbmRJbkNvbChtYXRyaXgsIGMsIHYpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgIWZpbmRJblNxdWFyZShtYXRyaXgsIHIsIGMsIHYpKTtcclxuICAgIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzBdIS4vc3JjL3N1ZG9rdS9zdWRva3UtZGVlcC1zb2x2ZXIud29ya2VyLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==