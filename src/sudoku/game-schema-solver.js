"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchemaSolverSudoku = void 0;
var game_schema_solver_1 = require("../game-types/game-schema-solver");
var game_schema_checker_1 = require("./game-schema-checker");
var GameSchemaSolverSudoku = /** @class */ (function (_super) {
    __extends(GameSchemaSolverSudoku, _super);
    function GameSchemaSolverSudoku() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checker = new game_schema_checker_1.GameSchemaCheckerSudoku();
        _this.matrix = [];
        return _this;
    }
    /**
     * Find value in a 3x3 square
     * @param cells array of game cells
     * @param r row
     * @param c col
     * @param value true if value exists in square rooted in (r,c) cell
     */
    GameSchemaSolverSudoku.prototype.findInSquare = function (cells, r, c, value) {
        var found = false;
        var sr = Math.floor(r / 3);
        var sc = Math.floor(c / 3);
        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2
        for (var i = 0; i < 3 && !found; i++) {
            for (var j = 0; j < 3 && !found; j++) {
                found = cells[sr * 3 + i][sc * 3 + j] === value;
            }
        }
        return found;
    };
    /**
     * Find value in a column
     * @param cells array of game cells
     * @param c col
     * @param value true if value exists in column c
     */
    GameSchemaSolverSudoku.prototype.findInCol = function (cells, c, value) {
        var found = false;
        for (var i = 0; i < 9 && !found; i++) {
            found = cells[i][c] === value;
        }
        return found;
    };
    /**
     * Find value in a row
     * @param cells array of game cells
     * @param r row
     * @param value true if value exists in row r
     */
    GameSchemaSolverSudoku.prototype.findInRow = function (cells, r, value) {
        var found = false;
        for (var i = 0; i < 9 && !found; i++) {
            found = cells[r][i] === value;
        }
        return found;
    };
    GameSchemaSolverSudoku.prototype.removeFromSquare = function (cells, r, c, value) {
        var sr = Math.floor(r / 3);
        var sc = Math.floor(c / 3);
        var solved = 0;
        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                solved += cells[sr * 3 + i][sc * 3 + j].removeFromValueSet(value) ? 1 : 0;
            }
        }
        return solved;
    };
    GameSchemaSolverSudoku.prototype.removeFromCol = function (cells, c, value) {
        var solved = 0;
        for (var i = 0; i < 9; i++) {
            solved += cells[i][c].removeFromValueSet(value) ? 1 : 0;
        }
        return solved;
    };
    GameSchemaSolverSudoku.prototype.removeFromRow = function (cells, r, value) {
        var solved = 0;
        for (var i = 0; i < 9; i++) {
            solved += cells[r][i].removeFromValueSet(value) ? 1 : 0;
        }
        return solved;
    };
    /**
     * Perform one step in the solution of the sudoku schema
     * @param cells the schema
     * @param workCells the working schema
     * @returns the number of solve cells in the step
     */
    GameSchemaSolverSudoku.prototype.step = function (schema) {
        schema.prepareForStep();
        this.stepNumber++;
        var simplifyResult = this.simplify(schema);
        this.copyFromWorkCells(schema, simplifyResult.workCells);
        this.lastSolvedCells = simplifyResult.solved;
        var result = this.checker.check(schema);
        if (!result.error) {
            this.solved = true;
            this.solutionResult = "Solution found after " + this.stepNumber + " steps";
        }
        else {
            if (this.lastSolvedCells === 0) {
                this.stopped = true;
                this.solutionResult = "Search stopped after " + this.stepNumber + " steps";
                this.matrix = schema.getValues();
                this.deepSolve(0, 0);
            }
        }
        this.solvedCells += this.lastSolvedCells;
        return this.lastSolvedCells;
    };
    GameSchemaSolverSudoku.prototype.copyToWorkCells = function (schema, workCells) {
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                workCells[r][c].copyFrom(schema.getCell(r, c));
            }
        }
    };
    GameSchemaSolverSudoku.prototype.copyFromWorkCells = function (schema, workCells) {
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                schema.getCell(r, c).copyFrom(workCells[r][c]);
            }
        }
    };
    GameSchemaSolverSudoku.prototype.simplify = function (schema) {
        var workCells = schema.createCells();
        this.copyToWorkCells(schema, workCells);
        var solved = 0;
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                var value = schema.getCell(r, c).getValue();
                if (value !== 0) {
                    solved += this.removeFromRow(workCells, r, value);
                    solved += this.removeFromCol(workCells, c, value);
                    solved += this.removeFromSquare(workCells, r, c, value);
                }
            }
        }
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if (workCells[r][c].getValue() === 0 && workCells[r][c].getValueSet().length === 1) {
                    workCells[r][c].solve();
                    this.lastSolvedCells++;
                }
            }
        }
        return { "workCells": workCells, "solved": solved };
    };
    GameSchemaSolverSudoku.prototype.deepSolve = function (row, col) {
        // 1. find first unsolved cell
        var c = col;
        var r = row;
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
            var result = this.checker.checkMatrix(this.matrix);
            if (!result.error) {
                console.log(r + "," + c + ": success/1!");
                return true;
            }
            console.log(r + "," + c + ": giving up!");
            return false;
        }
        // 2. pick the first possibile value
        var valueSet = this.getCellValueSet(this.matrix, r, c);
        // schema.getCell(r,c).proposeValue(value);
        // 3. simplify the schema with this value
        console.log(r + "," + c + ": Trying to fix cell " + this.matrix[r][c] + " with " + valueSet);
        for (var _i = 0, valueSet_1 = valueSet; _i < valueSet_1.length; _i++) {
            var value = valueSet_1[_i];
            console.log(r + "," + c + ": Trying to fix cell with " + value + " of " + valueSet);
            this.matrix[r][c] = value;
            var result = this.checker.checkMatrix(this.matrix);
            if (!result.error) {
                console.log(r + "," + c + ": success with " + value + "!");
                return true;
            }
            console.log(r + "," + c + ": going deeper");
            // is not solved: search again
            if (this.deepSolve(r, c + 1)) {
                console.log(r + "," + c + ": success/2!");
                return true;
            }
            else {
                this.matrix[r][c] = 0;
            }
        }
        console.log(r + "," + c + ": just returning false");
        return false;
    };
    GameSchemaSolverSudoku.prototype.getCellValueSet = function (matrix, r, c) {
        var valueSet = [];
        for (var i = 1; i <= 9; i++) {
            if (this.checkIfSafe(matrix, r, c, i)) {
                valueSet.push(i);
            }
        }
        return valueSet;
    };
    /**
 * Check if safe to put in cell
 */
    GameSchemaSolverSudoku.prototype.checkIfSafe = function (matrix, r, c, v) {
        return (!this.findInRow(matrix, r, v)
            && !this.findInCol(matrix, c, v)
            && !this.findInSquare(matrix, r, c, v));
    };
    return GameSchemaSolverSudoku;
}(game_schema_solver_1.GameSchemaSolver));
exports.GameSchemaSolverSudoku = GameSchemaSolverSudoku;
//# sourceMappingURL=game-schema-solver.js.map