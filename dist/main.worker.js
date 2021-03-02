/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/sudoku/deep-solver-worker.ts":
/*!********************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/sudoku/deep-solver-worker.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeepSolveMatrix": () => /* binding */ DeepSolveMatrix
/* harmony export */ });
/* harmony import */ var _game_schema_checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-schema-checker */ "./src/sudoku/game-schema-checker.ts");
/* harmony import */ var _sudoku_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sudoku-util */ "./src/sudoku/sudoku-util.ts");
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
class DeepSolveMatrix {
    constructor(matrix) {
        this.checker = new _game_schema_checker__WEBPACK_IMPORTED_MODULE_0__.GameSchemaCheckerSudoku();
        this.matrix = [];
        this.matrix = matrix;
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
        const valueSet = (0,_sudoku_util__WEBPACK_IMPORTED_MODULE_1__.getCellValueSet)(this.matrix, r, c);
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
    solver = new DeepSolveMatrix(matrix);
    let solutionResult = "Resolution failed.";
    if (solver.deepSolve(0, 0))
        solutionResult = "Recursive serach succeeded";
    ctx.postMessage({ 'eventType': 'success', 'matrix': matrix, 'solutionResult': solutionResult });
});


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
/******/ 	__webpack_require__("./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/sudoku/deep-solver-worker.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZ2FtZS1zY2hlbWEtY2hlY2tlci1yZXN1bHQudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zdWRva3UvZGVlcC1zb2x2ZXItd29ya2VyLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvLi9zcmMvc3Vkb2t1L2dhbWUtc2NoZW1hLWNoZWNrZXIudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zdWRva3Uvc3Vkb2t1LXV0aWwudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSx1QkFBdUI7SUFBcEM7UUFFWSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBVWYsUUFBRyxHQUFHLEtBQUssQ0FBQztJQVN4QixDQUFDO0lBakJHLElBQVcsYUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQVcsYUFBYSxDQUFDLEtBQWE7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUlELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBVyxLQUFLLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztJ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UUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7R0FFRztBQUNJLFNBQVMsV0FBVyxDQUFDLE1BQWlCLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQzFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUNqQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUN4QixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7Ozs7Ozs7VUN4RUw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4ud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0IHtcclxuXHJcbiAgICBwcml2YXRlIHJlc3VsdE1zZyA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVzdWx0TWVzc2FnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdE1zZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHJlc3VsdE1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVzdWx0TXNnID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlcnIgPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVycm9yKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVycm9yKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5lcnIgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSB9IGZyb20gXCIuL2dhbWUtc2NoZW1hLWNoZWNrZXJcIjtcclxuaW1wb3J0IHsgZ2V0Q2VsbFZhbHVlU2V0IH0gZnJvbSBcIi4vc3Vkb2t1LXV0aWxcIjtcclxuXHJcbmNvbnN0IGN0eDogV29ya2VyID0gc2VsZiBhcyBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVlcFNvbHZlTWF0cml4IHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja2VyOiBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSA9IG5ldyBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSgpO1xyXG5cclxuICAgIHByaXZhdGUgbWF0cml4OiBudW1iZXJbXVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobWF0cml4OiBudW1iZXJbXVtdKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlZXBTb2x2ZShyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgbGV0IGMgPSBjb2w7XHJcbiAgICAgICAgbGV0IHIgPSByb3c7XHJcblxyXG4gICAgICAgIGlmKGMgPT09IDkpIHtcclxuICAgICAgICAgICAgcisrO1xyXG4gICAgICAgICAgICBjPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZShyPDkgJiYgdGhpcy5tYXRyaXhbcl1bY10hPT0wKSB7XHJcbiAgICAgICAgICAgIGMrKztcclxuICAgICAgICAgICAgaWYoYz09PTkpIHtcclxuICAgICAgICAgICAgICAgIHIrKztcclxuICAgICAgICAgICAgICAgIGM9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYociA9PT0gOSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNoZWNrZXIuY2hlY2tNYXRyaXgodGhpcy5tYXRyaXgpO1xyXG4gICAgICAgICAgICBpZighcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBzdWNjZXNzLzEhYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogZ2l2aW5nIHVwIWApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZhbHVlU2V0ID0gZ2V0Q2VsbFZhbHVlU2V0KHRoaXMubWF0cml4LHIsYyk7XHJcbiAgICAgICAgLy8gc2NoZW1hLmdldENlbGwocixjKS5wcm9wb3NlVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICAvLyAzLiBzaW1wbGlmeSB0aGUgc2NoZW1hIHdpdGggdGhpcyB2YWx1ZVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBUcnlpbmcgdG8gZml4IGNlbGwgJHt0aGlzLm1hdHJpeFtyXVtjXX0gd2l0aCAke3ZhbHVlU2V0fWApO1xyXG4gICAgICAgIGZvcihjb25zdCB2YWx1ZSBvZiB2YWx1ZVNldCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBUcnlpbmcgdG8gZml4IGNlbGwgd2l0aCAke3ZhbHVlfSBvZiAke3ZhbHVlU2V0fWApO1xyXG4gICAgICAgICAgICB0aGlzLm1hdHJpeFtyXVtjXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3RyeVZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX19KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGVja2VyLmNoZWNrTWF0cml4KHRoaXMubWF0cml4KTtcclxuICAgICAgICAgICAgaWYoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogc3VjY2VzcyB3aXRoICR7dmFsdWV9IWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogZ29pbmcgZGVlcGVyYCk7XHJcbiAgICAgICAgICAgIC8vIGlzIG5vdCBzb2x2ZWQ6IHNlYXJjaCBhZ2FpblxyXG4gICAgICAgICAgICBpZih0aGlzLmRlZXBTb2x2ZShyLCBjKzEpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBzdWNjZXNzLzIhYCk7XHJcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3NldFZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX0gfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W3JdW2NdID0gMDtcclxuICAgICAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndW5kb1ZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfToganVzdCByZXR1cm5pbmcgZmFsc2VgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGF5KG1pbGxpc2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxubGV0IHNvbHZlcjogRGVlcFNvbHZlTWF0cml4O1xyXG5cclxuY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgbWF0cml4ID0gZXZlbnQuZGF0YS5tYXRyaXg7XHJcbiAgICBzb2x2ZXIgPSBuZXcgRGVlcFNvbHZlTWF0cml4KG1hdHJpeCk7XHJcbiAgICBsZXQgc29sdXRpb25SZXN1bHQgPSBcIlJlc29sdXRpb24gZmFpbGVkLlwiXHJcbiAgICBpZihzb2x2ZXIuZGVlcFNvbHZlKDAsMCkpXHJcbiAgICAgICAgc29sdXRpb25SZXN1bHQgPSBcIlJlY3Vyc2l2ZSBzZXJhY2ggc3VjY2VlZGVkXCI7XHJcbiAgICBjdHgucG9zdE1lc3NhZ2UoeydldmVudFR5cGUnOiAnc3VjY2VzcycsICdtYXRyaXgnOm1hdHJpeCwgJ3NvbHV0aW9uUmVzdWx0Jzogc29sdXRpb25SZXN1bHQgfSk7XHJcbn0pOyIsImltcG9ydCB7IEdhbWVTY2hlbWFDaGVja2VyIH0gZnJvbSBcIi4uL2dhbWUtdHlwZXMvZ2FtZS1zY2hlbWEtY2hlY2tlclwiO1xyXG5pbXBvcnQgeyBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCB9IGZyb20gXCIuLi9nYW1lLXR5cGVzL2dhbWUtc2NoZW1hLWNoZWNrZXItcmVzdWx0XCI7XHJcbmltcG9ydCB7IEdhbWVTY2hlbWFTdWRva3UgfSBmcm9tIFwiLi9nYW1lLXNjaGVtYVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSBpbXBsZW1lbnRzIEdhbWVTY2hlbWFDaGVja2VyPEdhbWVTY2hlbWFTdWRva3U+IHtcclxuXHJcbiAgICBwcml2YXRlIGluY29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIHJlc3VsdE1lc3NhZ2U6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgcHVibGljIGNoZWNrKHNjaGVtYTogR2FtZVNjaGVtYVN1ZG9rdSwgaW5jb21wbGV0ZTogYm9vbGVhbj1mYWxzZSk6IEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja01hdHJpeChzY2hlbWEuZ2V0VmFsdWVzKCksIGluY29tcGxldGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja01hdHJpeChtYXRyaXg6IG51bWJlcltdW10sIGluY29tcGxldGU6IGJvb2xlYW49ZmFsc2UpOiBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5jb21wbGV0ZSA9aW5jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgbGV0IGVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCA9IG5ldyBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmNoZWNrUmVzdWx0ID0gJ0NoZWNraW5nIHJvd3MuLi4nO1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgOSAmJiAhZXJyb3I7IHIrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zICA9IHRoaXMuZ2V0Um93UG9zaXRpb25zKHIpO1xyXG4gICAgICAgICAgICBlcnJvciA9IHRoaXMuY2hlY2tQb3N0aW9ucyhtYXRyaXgsIHIsIHBvc2l0aW9ucywgJ3JvdycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmNoZWNrUmVzdWx0ID0gJ0NoZWNraW5nIGNvbHVtbnMuLi4nO1xyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA5ICYmICFlcnJvcjsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgID0gdGhpcy5nZXRDb2xQb3NpdGlvbnMoYyk7XHJcbiAgICAgICAgICAgICAgICBlcnJvciA9IHRoaXMuY2hlY2tQb3N0aW9ucyhtYXRyaXgsIGMsIHBvc2l0aW9ucywgJ2NvbHVtbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuY2hlY2tSZXN1bHQgPSAnQ2hlY2tpbmcgc3F1YXJlcy4uLic7XHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDMgJiYgIWVycm9yOyByKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMyAmJiAhZXJyb3I7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyAgPSB0aGlzLmdldFNxdWFyZVBvc2l0aW9ucyhyLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHRoaXMuY2hlY2tQb3N0aW9ucyhtYXRyaXgsICcke3J9LCR7Y30nLCBwb3NpdGlvbnMsICdzcXVhcmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXN1bHQucmVzdWx0TWVzc2FnZSA9ICdDaGVja2VkISc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0LnJlc3VsdE1lc3NhZ2UgPSB0aGlzLnJlc3VsdE1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrUG9zdGlvbnMobWF0cml4OiBudW1iZXJbXVtdLCBvcmlnaW46IGFueSwgcG9zaXRpb25zOiB7cm93OiBudW1iZXIsIGNvbDogbnVtYmVyfVtdLCBjaGVja1R5cGVNc2c6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGNvdW50ZXJzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgIGxldCBlcnJvciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1mb3Itb2ZcclxuICAgICAgICBmb3IgKGxldCBwID0gMDsgcCA8IHBvc2l0aW9ucy5sZW5ndGg7IHArKykge1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgJHtjaGVja1R5cGVNc2d9ICR7cG9zaXRpb25zW3BdLnJvd30gLCAke3Bvc2l0aW9uc1twXS5jb2x9YCk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzWyBtYXRyaXhbcG9zaXRpb25zW3BdLnJvd11bcG9zaXRpb25zW3BdLmNvbF0gXSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdW50ZXJzWzBdID4gMCAmJiAhdGhpcy5pbmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TWVzc2FnZSA9IGAke2NoZWNrVHlwZU1zZ30gJHtvcmlnaW59IG5vdCBjb21wbGV0ZWx5IHNvbHZlZGA7XHJcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ2luZGV4ID0gY291bnRlcnMuZmluZEluZGV4KCAodmFsdWUsIGluZGV4LCBhcnIpID0+IGluZGV4ID09PSAwID8gZmFsc2UgOiB2YWx1ZSA+IDEpO1xyXG4gICAgICAgICAgICBpZiAod3JvbmdpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0TWVzc2FnZSA9IGBOdW1iZXIgJHt3cm9uZ2luZGV4fSBpbiBwcmVzZW50IG1vcmUgdGhhbiBvbmNlIGluICR7Y2hlY2tUeXBlTXNnfSAke29yaWdpbn1gO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZ2V0Um93UG9zaXRpb25zKGN1cnJlbnRyb3c6IG51bWJlcik6IHtyb3c6IG51bWJlciwgY29sOiBudW1iZXJ9W10ge1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYysrKSB7XHJcbiAgICAgICAgICAgIHBvc3Rpb25zLnB1c2goe3JvdzogY3VycmVudHJvdywgY29sOiBjfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcG9zdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sUG9zaXRpb25zKGN1cnJlbnRjb2w6IG51bWJlcik6IHtyb3c6IG51bWJlciwgY29sOiBudW1iZXJ9W10ge1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgOTsgcisrKSB7XHJcbiAgICAgICAgICAgIHBvc3Rpb25zLnB1c2goe3JvdzogciwgY29sOiBjdXJyZW50Y29sfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcG9zdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3F1YXJlUG9zaXRpb25zKHNxcm93OiBudW1iZXIsIHNxY29sOiBudW1iZXIpOiB7cm93OiBudW1iZXIsIGNvbDogbnVtYmVyfVtdIHtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDM7IHIrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDM7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgcG9zdGlvbnMucHVzaCh7cm93OiBzcXJvdyAqIDMgKyByLCBjb2w6IHNxY29sICogMyArIGN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBvc3Rpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwiICAgIC8qKlxyXG4gICAgICogRmluZCB2YWx1ZSBpbiBhIDN4MyBzcXVhcmVcclxuICAgICAqIEBwYXJhbSBjZWxscyBhcnJheSBvZiBnYW1lIGNlbGxzXHJcbiAgICAgKiBAcGFyYW0gciByb3dcclxuICAgICAqIEBwYXJhbSBjIGNvbFxyXG4gICAgICogQHBhcmFtIHZhbHVlIHRydWUgaWYgdmFsdWUgZXhpc3RzIGluIHNxdWFyZSByb290ZWQgaW4gKHIsYykgY2VsbFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZmluZEluU3F1YXJlKGNlbGxzOiBudW1iZXJbXVtdLCByOiBudW1iZXIsIGM6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBzciA9IE1hdGguZmxvb3IociAvIDMpO1xyXG4gICAgICAgIGNvbnN0IHNjID0gTWF0aC5mbG9vcihjIC8gMyk7XHJcblxyXG4gICAgICAgIC8vIDAsMSwyIC0tPiAwXHJcbiAgICAgICAgLy8gMyw0LDUgLS0+IDFcclxuICAgICAgICAvLyA2LDcsOCAtLT4gMlxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMgJiYgIWZvdW5kOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzICYmICFmb3VuZDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGNlbGxzW3NyICogMyArIGldW3NjICogMyArIGpdID09PSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB2YWx1ZSBpbiBhIGNvbHVtblxyXG4gICAgICogQHBhcmFtIGNlbGxzIGFycmF5IG9mIGdhbWUgY2VsbHNcclxuICAgICAqIEBwYXJhbSBjIGNvbFxyXG4gICAgICogQHBhcmFtIHZhbHVlIHRydWUgaWYgdmFsdWUgZXhpc3RzIGluIGNvbHVtbiBjXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmaW5kSW5Db2woY2VsbHM6IG51bWJlcltdW10sIGM6IG51bWJlciwgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOSAmJiAhZm91bmQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3VuZCA9ICBjZWxsc1tpXVtjXSA9PT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgdmFsdWUgaW4gYSByb3dcclxuICAgICAqIEBwYXJhbSBjZWxscyBhcnJheSBvZiBnYW1lIGNlbGxzXHJcbiAgICAgKiBAcGFyYW0gciByb3dcclxuICAgICAqIEBwYXJhbSB2YWx1ZSB0cnVlIGlmIHZhbHVlIGV4aXN0cyBpbiByb3cgclxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZmluZEluUm93KGNlbGxzOiBudW1iZXJbXVtdLCByOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDkgJiYgIWZvdW5kOyBpKyspIHtcclxuICAgICAgICAgICAgZm91bmQgPSBjZWxsc1tyXVtpXSA9PT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Q2VsbFZhbHVlU2V0KG1hdHJpeDogbnVtYmVyW11bXSwgcjogbnVtYmVyLCBjOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTZXQ6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpPTE7aTw9OTtpKyspIHtcclxuICAgICAgICAgICAgaWYoY2hlY2tJZlNhZmUobWF0cml4LCByLCBjLCBpKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVTZXQucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlU2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgc2FmZSB0byBwdXQgdiBpbiBjZWxsIG1hdHJpeFtyXVtjXVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY2hlY2tJZlNhZmUobWF0cml4Om51bWJlcltdW10sIHI6IG51bWJlciwgYzogbnVtYmVyLCB2OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKCFmaW5kSW5Sb3cobWF0cml4LCByLCB2KVxyXG4gICAgICAgICAgICAgICAgICAgICYmICFmaW5kSW5Db2wobWF0cml4LCBjLCB2KVxyXG4gICAgICAgICAgICAgICAgICAgICYmICFmaW5kSW5TcXVhcmUobWF0cml4LCByLCBjLCB2KSk7XHJcbiAgICB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVswXSEuL3NyYy9zdWRva3UvZGVlcC1zb2x2ZXItd29ya2VyLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==