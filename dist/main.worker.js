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
        solutionResult = "Recursive search succeeded.";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL2dhbWUtdHlwZXMvZ2FtZS1zY2hlbWEtY2hlY2tlci1yZXN1bHQudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zdWRva3UvZGVlcC1zb2x2ZXItd29ya2VyLnRzIiwid2VicGFjazovL2dhbWVzb2x2ZXIvLi9zcmMvc3Vkb2t1L2dhbWUtc2NoZW1hLWNoZWNrZXIudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci8uL3NyYy9zdWRva3Uvc3Vkb2t1LXV0aWwudHMiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nYW1lc29sdmVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2FtZXNvbHZlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dhbWVzb2x2ZXIvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSx1QkFBdUI7SUFBcEM7UUFFWSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBVWYsUUFBRyxHQUFHLEtBQUssQ0FBQztJQVN4QixDQUFDO0lBakJHLElBQVcsYUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQVcsYUFBYSxDQUFDLEtBQWE7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUlELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBVyxLQUFLLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztJ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UUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7R0FFRztBQUNJLFNBQVMsV0FBVyxDQUFDLE1BQWlCLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQzFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUNqQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUN4QixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7Ozs7Ozs7VUN4RUw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4ud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdhbWVTY2hlbWFDaGVja2VyUmVzdWx0IHtcclxuXHJcbiAgICBwcml2YXRlIHJlc3VsdE1zZyA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVzdWx0TWVzc2FnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdE1zZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHJlc3VsdE1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVzdWx0TXNnID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlcnIgPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVycm9yKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVycm9yKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5lcnIgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSB9IGZyb20gXCIuL2dhbWUtc2NoZW1hLWNoZWNrZXJcIjtcclxuaW1wb3J0IHsgZ2V0Q2VsbFZhbHVlU2V0IH0gZnJvbSBcIi4vc3Vkb2t1LXV0aWxcIjtcclxuXHJcbmNvbnN0IGN0eDogV29ya2VyID0gc2VsZiBhcyBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVlcFNvbHZlTWF0cml4IHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja2VyOiBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSA9IG5ldyBHYW1lU2NoZW1hQ2hlY2tlclN1ZG9rdSgpO1xyXG5cclxuICAgIHByaXZhdGUgbWF0cml4OiBudW1iZXJbXVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobWF0cml4OiBudW1iZXJbXVtdKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlZXBTb2x2ZShyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgbGV0IGMgPSBjb2w7XHJcbiAgICAgICAgbGV0IHIgPSByb3c7XHJcblxyXG4gICAgICAgIGlmKGMgPT09IDkpIHtcclxuICAgICAgICAgICAgcisrO1xyXG4gICAgICAgICAgICBjPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZShyPDkgJiYgdGhpcy5tYXRyaXhbcl1bY10hPT0wKSB7XHJcbiAgICAgICAgICAgIGMrKztcclxuICAgICAgICAgICAgaWYoYz09PTkpIHtcclxuICAgICAgICAgICAgICAgIHIrKztcclxuICAgICAgICAgICAgICAgIGM9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYociA9PT0gOSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNoZWNrZXIuY2hlY2tNYXRyaXgodGhpcy5tYXRyaXgpO1xyXG4gICAgICAgICAgICBpZighcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBzdWNjZXNzLzEhYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogZ2l2aW5nIHVwIWApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZhbHVlU2V0ID0gZ2V0Q2VsbFZhbHVlU2V0KHRoaXMubWF0cml4LHIsYyk7XHJcbiAgICAgICAgLy8gc2NoZW1hLmdldENlbGwocixjKS5wcm9wb3NlVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICAvLyAzLiBzaW1wbGlmeSB0aGUgc2NoZW1hIHdpdGggdGhpcyB2YWx1ZVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBUcnlpbmcgdG8gZml4IGNlbGwgJHt0aGlzLm1hdHJpeFtyXVtjXX0gd2l0aCAke3ZhbHVlU2V0fWApO1xyXG4gICAgICAgIGZvcihjb25zdCB2YWx1ZSBvZiB2YWx1ZVNldCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBUcnlpbmcgdG8gZml4IGNlbGwgd2l0aCAke3ZhbHVlfSBvZiAke3ZhbHVlU2V0fWApO1xyXG4gICAgICAgICAgICB0aGlzLm1hdHJpeFtyXVtjXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3RyeVZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX19KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGVja2VyLmNoZWNrTWF0cml4KHRoaXMubWF0cml4KTtcclxuICAgICAgICAgICAgaWYoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogc3VjY2VzcyB3aXRoICR7dmFsdWV9IWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfTogZ29pbmcgZGVlcGVyYCk7XHJcbiAgICAgICAgICAgIC8vIGlzIG5vdCBzb2x2ZWQ6IHNlYXJjaCBhZ2FpblxyXG4gICAgICAgICAgICBpZih0aGlzLmRlZXBTb2x2ZShyLCBjKzEpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyfSwke2N9OiBzdWNjZXNzLzIhYCk7XHJcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyAnZXZlbnRUeXBlJzogJ3NldFZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX0gfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W3JdW2NdID0gMDtcclxuICAgICAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZSh7ICdldmVudFR5cGUnOiAndW5kb1ZhbHVlJywgZXZlbnREYXRhOnsncm93JzpyLCAnY29sJzpjLCAndmFsdWUnOiB2YWx1ZX0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cn0sJHtjfToganVzdCByZXR1cm5pbmcgZmFsc2VgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGF5KG1pbGxpc2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxubGV0IHNvbHZlcjogRGVlcFNvbHZlTWF0cml4O1xyXG5cclxuY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgbWF0cml4ID0gZXZlbnQuZGF0YS5tYXRyaXg7XHJcbiAgICBzb2x2ZXIgPSBuZXcgRGVlcFNvbHZlTWF0cml4KG1hdHJpeCk7XHJcbiAgICBsZXQgc29sdXRpb25SZXN1bHQgPSBcIlJlc29sdXRpb24gZmFpbGVkLlwiXHJcbiAgICBpZihzb2x2ZXIuZGVlcFNvbHZlKDAsMCkpXHJcbiAgICAgICAgc29sdXRpb25SZXN1bHQgPSBcIlJlY3Vyc2l2ZSBzZWFyY2ggc3VjY2VlZGVkLlwiO1xyXG4gICAgY3R4LnBvc3RNZXNzYWdlKHsnZXZlbnRUeXBlJzogJ3N1Y2Nlc3MnLCAnbWF0cml4JzptYXRyaXgsICdzb2x1dGlvblJlc3VsdCc6IHNvbHV0aW9uUmVzdWx0IH0pO1xyXG59KTsiLCJpbXBvcnQgeyBHYW1lU2NoZW1hQ2hlY2tlciB9IGZyb20gXCIuLi9nYW1lLXR5cGVzL2dhbWUtc2NoZW1hLWNoZWNrZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNjaGVtYUNoZWNrZXJSZXN1bHQgfSBmcm9tIFwiLi4vZ2FtZS10eXBlcy9nYW1lLXNjaGVtYS1jaGVja2VyLXJlc3VsdFwiO1xyXG5pbXBvcnQgeyBHYW1lU2NoZW1hU3Vkb2t1IH0gZnJvbSBcIi4vZ2FtZS1zY2hlbWFcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVNjaGVtYUNoZWNrZXJTdWRva3UgaW1wbGVtZW50cyBHYW1lU2NoZW1hQ2hlY2tlcjxHYW1lU2NoZW1hU3Vkb2t1PiB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbmNvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSByZXN1bHRNZXNzYWdlOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyBjaGVjayhzY2hlbWE6IEdhbWVTY2hlbWFTdWRva3UsIGluY29tcGxldGU6IGJvb2xlYW49ZmFsc2UpOiBHYW1lU2NoZW1hQ2hlY2tlclJlc3VsdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tNYXRyaXgoc2NoZW1hLmdldFZhbHVlcygpLCBpbmNvbXBsZXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tNYXRyaXgobWF0cml4OiBudW1iZXJbXVtdLCBpbmNvbXBsZXRlOiBib29sZWFuPWZhbHNlKTogR2FtZVNjaGVtYUNoZWNrZXJSZXN1bHQge1xyXG5cclxuICAgICAgICB0aGlzLmluY29tcGxldGUgPWluY29tcGxldGU7XHJcblxyXG4gICAgICAgIGxldCBlcnJvciA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogR2FtZVNjaGVtYUNoZWNrZXJSZXN1bHQgPSBuZXcgR2FtZVNjaGVtYUNoZWNrZXJSZXN1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5jaGVja1Jlc3VsdCA9ICdDaGVja2luZyByb3dzLi4uJztcclxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDkgJiYgIWVycm9yOyByKyspIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyAgPSB0aGlzLmdldFJvd1Bvc2l0aW9ucyhyKTtcclxuICAgICAgICAgICAgZXJyb3IgPSB0aGlzLmNoZWNrUG9zdGlvbnMobWF0cml4LCByLCBwb3NpdGlvbnMsICdyb3cnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5jaGVja1Jlc3VsdCA9ICdDaGVja2luZyBjb2x1bW5zLi4uJztcclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOSAmJiAhZXJyb3I7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zICA9IHRoaXMuZ2V0Q29sUG9zaXRpb25zKGMpO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0aGlzLmNoZWNrUG9zdGlvbnMobWF0cml4LCBjLCBwb3NpdGlvbnMsICdjb2x1bW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmNoZWNrUmVzdWx0ID0gJ0NoZWNraW5nIHNxdWFyZXMuLi4nO1xyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCAzICYmICFlcnJvcjsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDMgJiYgIWVycm9yOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgID0gdGhpcy5nZXRTcXVhcmVQb3NpdGlvbnMociwgYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSB0aGlzLmNoZWNrUG9zdGlvbnMobWF0cml4LCAnJHtyfSwke2N9JywgcG9zaXRpb25zLCAnc3F1YXJlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICByZXN1bHQuZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVzdWx0LnJlc3VsdE1lc3NhZ2UgPSAnQ2hlY2tlZCEnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5yZXN1bHRNZXNzYWdlID0gdGhpcy5yZXN1bHRNZXNzYWdlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1Bvc3Rpb25zKG1hdHJpeDogbnVtYmVyW11bXSwgb3JpZ2luOiBhbnksIHBvc2l0aW9uczoge3JvdzogbnVtYmVyLCBjb2w6IG51bWJlcn1bXSwgY2hlY2tUeXBlTXNnOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjb3VudGVycyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICBsZXQgZXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBwcmVmZXItZm9yLW9mXHJcbiAgICAgICAgZm9yIChsZXQgcCA9IDA7IHAgPCBwb3NpdGlvbnMubGVuZ3RoOyBwKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYCR7Y2hlY2tUeXBlTXNnfSAke3Bvc2l0aW9uc1twXS5yb3d9ICwgJHtwb3NpdGlvbnNbcF0uY29sfWApO1xyXG4gICAgICAgICAgICBjb3VudGVyc1sgbWF0cml4W3Bvc2l0aW9uc1twXS5yb3ddW3Bvc2l0aW9uc1twXS5jb2xdIF0rKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb3VudGVyc1swXSA+IDAgJiYgIXRoaXMuaW5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdE1lc3NhZ2UgPSBgJHtjaGVja1R5cGVNc2d9ICR7b3JpZ2lufSBub3QgY29tcGxldGVseSBzb2x2ZWRgO1xyXG4gICAgICAgICAgICBlcnJvciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdpbmRleCA9IGNvdW50ZXJzLmZpbmRJbmRleCggKHZhbHVlLCBpbmRleCwgYXJyKSA9PiBpbmRleCA9PT0gMCA/IGZhbHNlIDogdmFsdWUgPiAxKTtcclxuICAgICAgICAgICAgaWYgKHdyb25naW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdE1lc3NhZ2UgPSBgTnVtYmVyICR7d3JvbmdpbmRleH0gaW4gcHJlc2VudCBtb3JlIHRoYW4gb25jZSBpbiAke2NoZWNrVHlwZU1zZ30gJHtvcmlnaW59YDtcclxuICAgICAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9yO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGdldFJvd1Bvc2l0aW9ucyhjdXJyZW50cm93OiBudW1iZXIpOiB7cm93OiBudW1iZXIsIGNvbDogbnVtYmVyfVtdIHtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDk7IGMrKykge1xyXG4gICAgICAgICAgICBwb3N0aW9ucy5wdXNoKHtyb3c6IGN1cnJlbnRyb3csIGNvbDogY30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBvc3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbFBvc2l0aW9ucyhjdXJyZW50Y29sOiBudW1iZXIpOiB7cm93OiBudW1iZXIsIGNvbDogbnVtYmVyfVtdIHtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDk7IHIrKykge1xyXG4gICAgICAgICAgICBwb3N0aW9ucy5wdXNoKHtyb3c6IHIsIGNvbDogY3VycmVudGNvbH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBvc3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNxdWFyZVBvc2l0aW9ucyhzcXJvdzogbnVtYmVyLCBzcWNvbDogbnVtYmVyKToge3JvdzogbnVtYmVyLCBjb2w6IG51bWJlcn1bXSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc3Rpb25zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCAzOyByKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCAzOyBjKyspIHtcclxuICAgICAgICAgICAgICAgIHBvc3Rpb25zLnB1c2goe3Jvdzogc3Fyb3cgKiAzICsgciwgY29sOiBzcWNvbCAqIDMgKyBjfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwb3N0aW9ucztcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsIiAgICAvKipcclxuICAgICAqIEZpbmQgdmFsdWUgaW4gYSAzeDMgc3F1YXJlXHJcbiAgICAgKiBAcGFyYW0gY2VsbHMgYXJyYXkgb2YgZ2FtZSBjZWxsc1xyXG4gICAgICogQHBhcmFtIHIgcm93XHJcbiAgICAgKiBAcGFyYW0gYyBjb2xcclxuICAgICAqIEBwYXJhbSB2YWx1ZSB0cnVlIGlmIHZhbHVlIGV4aXN0cyBpbiBzcXVhcmUgcm9vdGVkIGluIChyLGMpIGNlbGxcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZpbmRJblNxdWFyZShjZWxsczogbnVtYmVyW11bXSwgcjogbnVtYmVyLCBjOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgc3IgPSBNYXRoLmZsb29yKHIgLyAzKTtcclxuICAgICAgICBjb25zdCBzYyA9IE1hdGguZmxvb3IoYyAvIDMpO1xyXG5cclxuICAgICAgICAvLyAwLDEsMiAtLT4gMFxyXG4gICAgICAgIC8vIDMsNCw1IC0tPiAxXHJcbiAgICAgICAgLy8gNiw3LDggLS0+IDJcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzICYmICFmb3VuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMyAmJiAhZm91bmQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSBjZWxsc1tzciAqIDMgKyBpXVtzYyAqIDMgKyBqXSA9PT0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgdmFsdWUgaW4gYSBjb2x1bW5cclxuICAgICAqIEBwYXJhbSBjZWxscyBhcnJheSBvZiBnYW1lIGNlbGxzXHJcbiAgICAgKiBAcGFyYW0gYyBjb2xcclxuICAgICAqIEBwYXJhbSB2YWx1ZSB0cnVlIGlmIHZhbHVlIGV4aXN0cyBpbiBjb2x1bW4gY1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZmluZEluQ29sKGNlbGxzOiBudW1iZXJbXVtdLCBjOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDkgJiYgIWZvdW5kOyBpKyspIHtcclxuICAgICAgICAgICAgZm91bmQgPSAgY2VsbHNbaV1bY10gPT09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIHZhbHVlIGluIGEgcm93XHJcbiAgICAgKiBAcGFyYW0gY2VsbHMgYXJyYXkgb2YgZ2FtZSBjZWxsc1xyXG4gICAgICogQHBhcmFtIHIgcm93XHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgdHJ1ZSBpZiB2YWx1ZSBleGlzdHMgaW4gcm93IHJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZpbmRJblJvdyhjZWxsczogbnVtYmVyW11bXSwgcjogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5ICYmICFmb3VuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvdW5kID0gY2VsbHNbcl1baV0gPT09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldENlbGxWYWx1ZVNldChtYXRyaXg6IG51bWJlcltdW10sIHI6IG51bWJlciwgYzogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU2V0OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaT0xO2k8PTk7aSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGNoZWNrSWZTYWZlKG1hdHJpeCwgciwgYywgaSkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlU2V0LnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZVNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHNhZmUgdG8gcHV0IHYgaW4gY2VsbCBtYXRyaXhbcl1bY11cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSWZTYWZlKG1hdHJpeDpudW1iZXJbXVtdLCByOiBudW1iZXIsIGM6IG51bWJlciwgdjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICghZmluZEluUm93KG1hdHJpeCwgciwgdilcclxuICAgICAgICAgICAgICAgICAgICAmJiAhZmluZEluQ29sKG1hdHJpeCwgYywgdilcclxuICAgICAgICAgICAgICAgICAgICAmJiAhZmluZEluU3F1YXJlKG1hdHJpeCwgciwgYywgdikpO1xyXG4gICAgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMF0hLi9zcmMvc3Vkb2t1L2RlZXAtc29sdmVyLXdvcmtlci50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=