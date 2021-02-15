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
import { GameSchema } from '../game-types/game-schema';
import { GameCellSudoku } from './game-cell';
import { GameSchemaSolverSudoku } from './game-schema-solver';
var GameSchemaSudoku = /** @class */ (function (_super) {
    __extends(GameSchemaSudoku, _super);
    function GameSchemaSudoku() {
        var _this = _super.call(this) || this;
        // celle valorizzate nel processo di input
        _this.inputCells = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        // Esempio di partenza
        _this.startupCells = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        // Celle prima dell'inizio della soluzione
        _this.origCells = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        _this.solver = new GameSchemaSolverSudoku();
        _this._solvedCells = 0;
        _this.rowNumber = 9;
        _this.colNumber = 9;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                _this.origCells[i][j] = _this.startupCells[i][j];
            }
        }
        _this.initCells(_this.origCells);
        return _this;
    }
    GameSchemaSudoku.prototype.initialize = function () {
        throw new Error('Method not implemented.');
    };
    GameSchemaSudoku.prototype.getCell = function (row, col) {
        return this.cells[row][col];
    };
    GameSchemaSudoku.prototype.initCellsValue = function (values) {
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                this.cells[r][c].initValue(values[r][c]);
            }
        }
    };
    GameSchemaSudoku.prototype.initCells = function (origCells) {
        this.cells = this.createCells();
        this.initCellsValue(origCells);
    };
    GameSchemaSudoku.prototype.createCells = function () {
        var cells = new Array(9);
        for (var i = 0; i < 9; i++) {
            cells[i] = new Array(9);
            for (var j = 0; j < 9; j++) {
                cells[i][j] = new GameCellSudoku();
            }
        }
        return cells;
    };
    GameSchemaSudoku.prototype.getCellValueRep = function (row, col) {
        var values = this.getCellValuesRep(row, col);
        var value = this.cells[row][col].getValue();
        return "" + (value === 0 ? '' : String(value)) + values;
    };
    GameSchemaSudoku.prototype.getCellValuesRep = function (row, col) {
        var html = '';
        var values = this.cells[row][col].getValues();
        if (values.length > 0) {
            var dim = 3;
            var fontSize = "xx-small";
            if (values.length <= 4) {
                dim = 2;
                fontSize = "x-small";
            }
            fontSize = "medium";
            var r = 0;
            var c = 0;
            html = "<table style=\"font-size: " + fontSize + "; margin-left: auto; margin-right: auto; width:100%\">";
            for (var index = 0; index < dim * dim; index++) {
                var value = '';
                if (index < values.length)
                    value = String(values[index]);
                c = index % dim;
                r = Math.floor(index / dim);
                if (c === 0)
                    html += '<tr>';
                html += "<td style=\"text-align: center\">" + value + "</td>";
                if (c === dim - 1)
                    html += '</tr>';
            }
            html += '</table>';
        }
        return html;
    };
    GameSchemaSudoku.prototype.getCellHighlight = function (row, col) {
        return this.cells[row][col].isHighlight();
    };
    GameSchemaSudoku.prototype.resetCells = function () {
        this.round = 0;
        this.cells = this.createCells();
        this.stopped = false;
    };
    GameSchemaSudoku.prototype.resetCellsToOrig = function () {
        this.round = 0;
        this.initCellsValue(this.origCells);
        this.stopped = false;
    };
    GameSchemaSudoku.prototype.solvedCells = function () {
        return this._solvedCells;
    };
    GameSchemaSudoku.prototype.step = function () {
        if (this.stopped) {
            return;
        }
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                this.cells[r][c].highlight(false);
            }
        }
        var workCells = this.createCells();
        this._solvedCells = this.solver.step(this.cells, workCells);
        this.solved = true;
        for (var r = 0; r < 9 && this.solved; r++) {
            for (var c = 0; c < 9 && this.solved; c++) {
                if (this.cells[r][c].getValue() === 0 /*|| this.cells[r][c].getValues().length > 0*/) {
                    this.solved = false;
                }
            }
        }
        this.round++;
        if (!(!this.solved && this.round <= this.MAX_ROUNDS && this._solvedCells > 0)) {
            this.solving = false;
            this.stopped = true;
            this.lastRound(this._solvedCells > 0);
        }
    };
    GameSchemaSudoku.prototype.getValues = function () {
        var values = Array(9);
        for (var i = 0; i < 9; i++) {
            values[i] = Array(9);
            for (var j = 0; j < 9; j++) {
                values[i][j] = this.cells[i][j].getValue();
            }
        }
        return values;
    };
    GameSchemaSudoku.prototype.setInputValue = function (row, col, value, confirm) {
        if (confirm === void 0) { confirm = true; }
        var _value = 0;
        if (typeof value === "string")
            _value = value.length === 0 ? 0 : Number(value);
        else
            _value = value;
        this.inputCells[row][col] = _value;
        if (confirm) {
            this.cells[row][col].initValue(this.inputCells[row][col]);
        }
    };
    GameSchemaSudoku.prototype.confirmAllInputValue = function () {
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                this.cells[row][col].initValue(this.inputCells[row][col]);
            }
        }
    };
    return GameSchemaSudoku;
}(GameSchema));
export { GameSchemaSudoku };
//# sourceMappingURL=game-schema.js.map