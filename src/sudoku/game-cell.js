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
exports.GameCellSudoku = void 0;
var game_cell_1 = require("../game-types/game-cell");
var GameCellSudoku = /** @class */ (function (_super) {
    __extends(GameCellSudoku, _super);
    function GameCellSudoku() {
        var _this = _super.call(this) || this;
        _this.proposedValue = 0;
        _this.savedValues = [];
        _this.ALL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        _this.value = 0;
        _this.values = _this.ALL_VALUES;
        return _this;
    }
    GameCellSudoku.prototype.getValue = function () {
        return this.value;
    };
    GameCellSudoku.prototype.getValueSet = function () {
        return this.values;
    };
    /*
    public isValueInSet(value:number): boolean {
        return this.values.indexOf(value)>=0;
    }
    */
    /**
     * Assign the solving value to the cells
     * @param value the solving value
     */
    GameCellSudoku.prototype.solveWithValue = function (value) {
        // Cannot reset to zero!
        if (this.value !== 0 && value === 0) {
            throw new Error('Cannot assign value 0 to cell!');
        }
        this.value = value;
        this.values = [];
        this.highlighted = true;
    };
    /**
     * Init the value and the valueSet of the cell.
     * @param value the value
     */
    GameCellSudoku.prototype.initValue = function (value) {
        this.value = value;
        if (value === 0)
            this.values = Object.assign([], this.ALL_VALUES);
        else
            this.values = [];
    };
    /**
     * Copy value and set of possibile values from another cell
     * @param other the cell to copy from
     */
    GameCellSudoku.prototype.copyFrom = function (other) {
        this.value = other.value;
        this.values = Object.assign([], other.values);
        this.highlighted = other.isHighlighted();
    };
    GameCellSudoku.prototype.clone = function () {
        var other = new GameCellSudoku();
        other.copyFrom(this);
        return other;
    };
    /**
     * Returns true if solved
     * @param value
     */
    GameCellSudoku.prototype.removeFromValueSet = function (value) {
        if (this.values.find(function (elem) { return elem === value; })) {
            this.values = this.values.filter(function (elem, index, a) { return elem !== value; });
            if (this.values.length === 1) {
                // this.solveWithValue(value);
                return true;
            }
        }
        return false;
    };
    GameCellSudoku.prototype.solve = function () {
        if (this.values.length > 1)
            throw new Error('Cell cannot be solved, too many possibilities');
        this.solveWithValue(this.values[0]);
    };
    GameCellSudoku.prototype.isSolved = function () {
        return this.value !== 0;
    };
    GameCellSudoku.prototype.proposeValue = function (value) {
        this.proposedValue = value;
        this.value = value;
        this.savedValues = Object.assign([], this.values);
        this.values = [];
    };
    GameCellSudoku.prototype.undoProposeValue = function () {
        this.proposedValue = 0;
        this.value = 0;
        this.values = Object.assign([], this.savedValues);
        this.savedValues = [];
    };
    GameCellSudoku.prototype.confirmProposeValue = function () {
        this.values = Object.assign([], this.savedValues);
        this.value = 0;
        this.solveWithValue(this.proposedValue);
        this.proposedValue = 0;
        this.savedValues = [];
    };
    return GameCellSudoku;
}(game_cell_1.GameCell));
exports.GameCellSudoku = GameCellSudoku;
//# sourceMappingURL=game-cell.js.map