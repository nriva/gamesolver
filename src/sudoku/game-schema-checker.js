"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchemaCheckerSudoku = void 0;
var game_schema_checker_result_1 = require("../game-types/game-schema-checker-result");
var GameSchemaCheckerSudoku = /** @class */ (function () {
    function GameSchemaCheckerSudoku() {
        this.incomplete = false;
        this.resultMessage = "";
    }
    GameSchemaCheckerSudoku.prototype.check = function (schema, incomplete) {
        if (incomplete === void 0) { incomplete = false; }
        return this.checkMatrix(schema.getValues(), incomplete);
    };
    GameSchemaCheckerSudoku.prototype.checkMatrix = function (matrix, incomplete) {
        if (incomplete === void 0) { incomplete = false; }
        this.incomplete = incomplete;
        var error = false;
        var result = new game_schema_checker_result_1.GameSchemaCheckerResult();
        // this.checkResult = 'Checking rows...';
        for (var r = 0; r < 9 && !error; r++) {
            var positions = this.getRowPositions(r);
            error = this.checkPostions(matrix, r, positions, 'row');
        }
        // this.checkResult = 'Checking columns...';
        if (!error) {
            for (var c = 0; c < 9 && !error; c++) {
                var positions = this.getColPositions(c);
                error = this.checkPostions(matrix, c, positions, 'column');
            }
        }
        // this.checkResult = 'Checking squares...';
        if (!error) {
            for (var r = 0; r < 3 && !error; r++) {
                for (var c = 0; c < 3 && !error; c++) {
                    var positions = this.getSquarePositions(r, c);
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
    };
    GameSchemaCheckerSudoku.prototype.checkPostions = function (matrix, origin, positions, checkTypeMsg) {
        var counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var error = false;
        // tslint:disable-next-line: prefer-for-of
        for (var p = 0; p < positions.length; p++) {
            //console.log(`${checkTypeMsg} ${positions[p].row} , ${positions[p].col}`);
            counters[matrix[positions[p].row][positions[p].col]]++;
        }
        if (counters[0] > 0 && !this.incomplete) {
            this.resultMessage = checkTypeMsg + " " + origin + " not completely solved";
            error = true;
        }
        if (!error) {
            var wrongindex = counters.findIndex(function (value, index, arr) { return index === 0 ? false : value > 1; });
            if (wrongindex !== -1) {
                this.resultMessage = "Number " + wrongindex + " in present more than once in " + checkTypeMsg + " " + origin;
                error = true;
            }
        }
        return error;
    };
    GameSchemaCheckerSudoku.prototype.getRowPositions = function (currentrow) {
        var postions = [];
        for (var c = 0; c < 9; c++) {
            postions.push({ row: currentrow, col: c });
        }
        return postions;
    };
    GameSchemaCheckerSudoku.prototype.getColPositions = function (currentcol) {
        var postions = [];
        for (var r = 0; r < 9; r++) {
            postions.push({ row: r, col: currentcol });
        }
        return postions;
    };
    GameSchemaCheckerSudoku.prototype.getSquarePositions = function (sqrow, sqcol) {
        var postions = [];
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                postions.push({ row: sqrow * 3 + r, col: sqcol * 3 + c });
            }
        }
        return postions;
    };
    return GameSchemaCheckerSudoku;
}());
exports.GameSchemaCheckerSudoku = GameSchemaCheckerSudoku;
//# sourceMappingURL=game-schema-checker.js.map