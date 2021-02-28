"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCell = void 0;
var GameCell = /** @class */ (function () {
    function GameCell() {
        this.highlighted = false;
    }
    GameCell.prototype.highlight = function (on) {
        this.highlighted = on;
        return this.highlighted;
    };
    GameCell.prototype.isHighlighted = function () {
        return this.highlighted;
    };
    return GameCell;
}());
exports.GameCell = GameCell;
//# sourceMappingURL=game-cell.js.map