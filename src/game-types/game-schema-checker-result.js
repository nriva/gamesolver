var GameSchemaCheckerResult = /** @class */ (function () {
    function GameSchemaCheckerResult() {
        this.resultMsg = '';
        this.err = false;
    }
    Object.defineProperty(GameSchemaCheckerResult.prototype, "resultMessage", {
        get: function () {
            return this.resultMsg;
        },
        set: function (value) {
            this.resultMsg = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameSchemaCheckerResult.prototype, "error", {
        get: function () {
            return this.err;
        },
        set: function (value) {
            this.err = value;
        },
        enumerable: false,
        configurable: true
    });
    return GameSchemaCheckerResult;
}());
export { GameSchemaCheckerResult };
//# sourceMappingURL=game-schema-checker-result.js.map