"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchema = void 0;
/**
 * C = Cell type
 */
var GameSchema = /** @class */ (function () {
    function GameSchema() {
        this.rowNumber = 0;
        this.colNumber = 0;
    }
    GameSchema.prototype.getRowNumber = function () {
        return this.rowNumber;
    };
    GameSchema.prototype.getColNumber = function () {
        return this.colNumber;
    };
    return GameSchema;
}());
exports.GameSchema = GameSchema;
//# sourceMappingURL=game-schema.js.map