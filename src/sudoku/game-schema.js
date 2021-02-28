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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchemaSudoku = void 0;
var game_schema_1 = require("../game-types/game-schema");
var game_cell_1 = require("./game-cell");
var jquery_1 = __importDefault(require("jquery"));
/**
 * The container of the cell, with a few utilities
 */
var GameSchemaSudoku = /** @class */ (function (_super) {
    __extends(GameSchemaSudoku, _super);
    //private solver: GameSchemaSolverSudoku = new GameSchemaSolverSudoku();
    function GameSchemaSudoku(demo) {
        if (demo === void 0) { demo = false; }
        var _this = _super.call(this) || this;
        // celle valorizzate nel processo di input
        _this.inputCells = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        // Esempio di partenza
        _this.demoCellValues = [
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
        _this.origCellValues = [
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
        _this.rowNumber = 9;
        _this.colNumber = 9;
        if (demo) {
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    _this.origCellValues[i][j] = _this.demoCellValues[i][j];
                }
            }
        }
        _this.initCells(_this.origCellValues);
        return _this;
    }
    GameSchemaSudoku.prototype.copyFrom = function (other) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.cells[i][j].copyFrom(other.cells[i][j]);
            }
        }
    };
    GameSchemaSudoku.prototype.dump = function () {
        var rows = [];
        for (var i = 0; i < 9; i++) {
            var line = "";
            for (var j = 0; j < 9; j++) {
                line += String(this.cells[i][j].getValue());
            }
            rows.push(line);
        }
        return rows;
    };
    GameSchemaSudoku.prototype.loadFrom = function (testCase) {
        for (var i = 0; i < 9; i++) {
            var line = testCase[i];
            for (var j = 0; j < 9; j++) {
                this.origCellValues[i][j] = Number(line.charAt(j));
            }
        }
        this.initCells(this.origCellValues);
    };
    GameSchemaSudoku.prototype.getCell = function (row, col) {
        return this.cells[row][col];
    };
    GameSchemaSudoku.prototype.getCellValue = function (row, col) {
        return this.cells[row][col].getValue();
    };
    GameSchemaSudoku.prototype.getCellValueSet = function (row, col) {
        return this.cells[row][col].getValueSet();
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
                cells[i][j] = new game_cell_1.GameCellSudoku();
            }
        }
        return cells;
    };
    GameSchemaSudoku.prototype.getCellHighlight = function (row, col) {
        return this.cells[row][col].isHighlighted();
    };
    GameSchemaSudoku.prototype.resetCells = function () {
        //this.round = 0;
        this.cells = this.createCells();
        //this.stopped = false;
    };
    GameSchemaSudoku.prototype.resetCellsToOrig = function () {
        //this.round = 0;
        this.initCellsValue(this.origCellValues);
        //this.stopped = false;
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
    GameSchemaSudoku.prototype.loadCellEditor = function (row, col) {
        for (var i = 1; i <= 9; i++)
            jquery_1.default('#cellCheck' + i).prop('checked', false);
        var cell = this.cells[row][col];
        if (cell.getValue() !== 0) {
            jquery_1.default('#cellCheck' + cell.getValue()).prop('checked', true);
        }
        else {
            cell.getValueSet().forEach(function (elem, i) {
                jquery_1.default('#cellCheck' + elem).prop('checked', true);
            });
        }
    };
    GameSchemaSudoku.prototype.confirmCellEdit = function (currentEditRow, currentEditCol) {
        for (var i = 1; i <= 9; i++) {
            var checked = jquery_1.default('#cellCheck' + i).prop('checked');
        }
        return true;
    };
    GameSchemaSudoku.prototype.initialize = function () {
        throw new Error('Method not implemented.');
    };
    GameSchemaSudoku.prototype.clone = function () {
        var schema = new GameSchemaSudoku();
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                schema.cells[row][col] = this.cells[row][col].clone();
            }
        }
        return schema;
    };
    GameSchemaSudoku.prototype.prepareForStep = function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.cells[i][j].highlight(false);
            }
        }
    };
    return GameSchemaSudoku;
}(game_schema_1.GameSchema));
exports.GameSchemaSudoku = GameSchemaSudoku;
//# sourceMappingURL=game-schema.js.map