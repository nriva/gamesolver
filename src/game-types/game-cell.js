var GameCell = /** @class */ (function () {
    function GameCell() {
        this.highlit = false;
    }
    GameCell.prototype.highlight = function (on) {
        this.highlit = on;
        return this.highlit;
    };
    GameCell.prototype.isHighlight = function () {
        return this.highlit;
    };
    return GameCell;
}());
export { GameCell };
//# sourceMappingURL=game-cell.js.map