import { GameSchemaCheckerResult } from "../game-types/game-schema-checker-result";
var GameSchemaCheckerSudoku = /** @class */ (function () {
    function GameSchemaCheckerSudoku() {
        this.incomplete = false;
    }
    GameSchemaCheckerSudoku.prototype.check = function (cells, parameters) {
        this.incomplete = parameters.incomplete;
        var error = false;
        var result = new GameSchemaCheckerResult();
        // this.checkResult = 'Checking rows...';
        for (var r = 0; r < 9; r++) {
            var positions = this.getRowPositions(r);
            result = this.chekPostions(cells, r, positions, 'row');
            error = error || result.error;
        }
        // this.checkResult = 'Checking columns...';
        if (!error) {
            for (var c = 0; c < 9; c++) {
                var positions = this.getColPositions(c);
                result = this.chekPostions(cells, c, positions, 'column');
                error = error || result.error;
            }
        }
        // this.checkResult = 'Checking squares...';
        if (!error) {
            for (var r = 0; r < 3; r++) {
                for (var c = 0; c < 3; c++) {
                    var positions = this.getSquarePositions(r, c);
                    result = this.chekPostions(cells, '${r},${c}', positions, 'square');
                    error = error || result.error;
                }
            }
        }
        if (!error) {
            result.error = false;
            result.resultMessage = 'Checked!';
        }
        return result;
    };
    GameSchemaCheckerSudoku.prototype.chekPostions = function (cells, origin, positions, checkTypeMsg) {
        var counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var r = new GameSchemaCheckerResult();
        r.error = true;
        // tslint:disable-next-line: prefer-for-of
        for (var p = 0; p < positions.length; p++) {
            counters[cells[positions[p].row][positions[p].col]]++;
        }
        if (counters[0] > 0 && !this.incomplete) {
            r.resultMessage = 'Row ${r} not completely solved';
            r.error = true;
            return r;
        }
        var wrongindex = counters.findIndex(function (value, index, arr) { return index === 0 ? false : value > 1; });
        if (wrongindex !== -1) {
            r.resultMessage = "Number " + wrongindex + " in present more than once in " + checkTypeMsg + " " + origin;
            r.error = true;
            return r;
        }
        return r;
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
export { GameSchemaCheckerSudoku };
//# sourceMappingURL=game-schema-checker.js.map