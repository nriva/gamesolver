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
import { GameCell } from "../game-types/game-cell";
var GameCellSudoku = /** @class */ (function (_super) {
    __extends(GameCellSudoku, _super);
    function GameCellSudoku() {
        var _this = _super.call(this) || this;
        _this.ALL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        _this.value = 0;
        _this.values = _this.ALL_VALUES;
        return _this;
    }
    GameCellSudoku.prototype.getValue = function () {
        return this.value;
    };
    GameCellSudoku.prototype.getValues = function () {
        return this.values;
    };
    GameCellSudoku.prototype.containsValue = function (value) {
        return this.values.indexOf(value) >= 0;
    };
    /**
     * Assign the solving valueto the cells
     * @param value the solving value
     */
    GameCellSudoku.prototype.assignValue = function (value) {
        // Cannot reset to zero!
        if (this.value !== 0 || value === 0) {
            return false;
        }
        this.value = value;
        this.values = [];
        return true;
    };
    /**
     * Init the value of the cell.
     * The values array is set to the default value ALL_VALUES except the param value it self
     * @param value the value
     */
    GameCellSudoku.prototype.initValue = function (value) {
        this.value = value;
        if (value === 0)
            this.values = this.ALL_VALUES.filter(function (elem, index, a) { return elem !== value; });
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
        this.highlit = other.isHighlight();
    };
    GameCellSudoku.prototype.removeFromValues = function (value) {
        this.values = this.values.filter(function (elem, index, a) { return elem !== value; });
    };
    GameCellSudoku.prototype.pickValue = function () {
        this.assignValue(this.values[0]);
    };
    return GameCellSudoku;
}(GameCell));
export { GameCellSudoku };
//# sourceMappingURL=game-cell.js.map