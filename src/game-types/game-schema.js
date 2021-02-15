var GameSchema = /** @class */ (function () {
    function GameSchema() {
        this.solved = false;
        this.solving = false;
        this.stopped = false;
        this.round = 0;
        this.MAX_ROUNDS = 99999;
        this.rowNumber = 0;
        this.solutionResult = "";
        this.colNumber = 0;
    }
    GameSchema.prototype.getRowNumber = function () {
        return this.rowNumber;
    };
    GameSchema.prototype.getColNumber = function () {
        return this.colNumber;
    };
    GameSchema.prototype.isSolving = function () { return this.solving; };
    GameSchema.prototype.isStopped = function () { return this.stopped; };
    GameSchema.prototype.isSolved = function () { return this.solved; };
    GameSchema.prototype.getRoundNumber = function () { return this.round; };
    GameSchema.prototype.stop = function () {
        this.stopped = true;
        this.solving = false;
    };
    GameSchema.prototype.pause = function () {
        this.solving = false;
    };
    GameSchema.prototype.solve = function () {
        this.stopped = false;
        this.solved = false;
        this.round = 0;
        this.solving = true;
        this.step();
    };
    GameSchema.prototype.lastRound = function (solvedCells) {
        if (this.solved)
            this.solutionResult = 'Solved';
        else {
            if (this.stopped || this.round === this.MAX_ROUNDS)
                this.solutionResult = "Stopped afer " + this.round + " steps.";
        }
    };
    return GameSchema;
}());
export { GameSchema };
//# sourceMappingURL=game-schema.js.map