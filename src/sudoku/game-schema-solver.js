var GameSchemaSolverSudoku = /** @class */ (function () {
    function GameSchemaSolverSudoku() {
    }
    /**
     * Find value in a 3x3 square
     * @param cells array of game cells
     * @param r row
     * @param c col
     * @param value true if value exists in square rooted in (r,c) cell
     * @deprecated
     */
    GameSchemaSolverSudoku.prototype.findInSquare = function (cells, r, c, value) {
        var found = true;
        var sr = Math.floor(r / 3);
        var sc = Math.floor(c / 3);
        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2
        for (var i = 0; i < 3 && !found; i++) {
            for (var j = 0; j < 3 && !found; j++) {
                found = cells[sr * 3 + i][sc * 3 + j].containsValue(value);
            }
        }
        return found;
    };
    /**
     * Find value in a column
     * @param cells array of game cells
     * @param c col
     * @param value true if value exists in column c
     * @deprecated
     */
    GameSchemaSolverSudoku.prototype.findInCol = function (cells, c, value) {
        var found = false;
        for (var i = 0; i < 9 && !found; i++) {
            found = cells[i][c].containsValue(value);
        }
        return found;
    };
    /**
     * Find value in a row
     * @param cells array of game cells
     * @param r row
     * @param value true if value exists in row r
     * @deprecated
     */
    GameSchemaSolverSudoku.prototype.findInRow = function (cells, r, value) {
        var found = false;
        for (var i = 0; i < 9 && !found; i++) {
            found = cells[r][i].containsValue(value);
        }
        return found;
    };
    GameSchemaSolverSudoku.prototype.removeFromSquare = function (cells, r, c, value) {
        var sr = Math.floor(r / 3);
        var sc = Math.floor(c / 3);
        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                cells[sr * 3 + i][sc * 3 + j].removeFromValues(value);
            }
        }
    };
    GameSchemaSolverSudoku.prototype.removeFromCol = function (cells, c, value) {
        for (var i = 0; i < 9; i++) {
            cells[i][c].removeFromValues(value);
        }
    };
    GameSchemaSolverSudoku.prototype.removeFromRow = function (cells, r, value) {
        for (var i = 0; i < 9; i++) {
            cells[r][i].removeFromValues(value);
        }
    };
    /**
     *
     * @param cells
     * @param workCells
     * @returns the number of solve cells in the step
     */
    GameSchemaSolverSudoku.prototype.step = function (cells, workCells) {
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                workCells[r][c].copyFrom(cells[r][c]);
            }
        }
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if (cells[r][c].getValue() !== 0) {
                    this.removeFromRow(workCells, r, cells[r][c].getValue());
                    this.removeFromCol(workCells, c, cells[r][c].getValue());
                    this.removeFromSquare(workCells, r, c, cells[r][c].getValue());
                }
            }
        }
        var solvedCells = 0;
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if (workCells[r][c].getValue() === 0 && workCells[r][c].getValues().length === 1) {
                    solvedCells++;
                    workCells[r][c].pickValue();
                    workCells[r][c].highlight(true);
                }
            }
        }
        // copy workCells to this.cells
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                cells[r][c].copyFrom(workCells[r][c]);
            }
        }
        return solvedCells;
    };
    return GameSchemaSolverSudoku;
}());
export { GameSchemaSolverSudoku };
//# sourceMappingURL=game-schema-solver.js.map