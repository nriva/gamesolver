"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchemaSolver = void 0;
var GameSchemaSolver = /** @class */ (function () {
    function GameSchemaSolver() {
        this.solved = false;
        this.solving = false;
        this.stopped = false;
        this.MAX_STEP_NUMBER = 99999;
        this.stepNumber = 0;
        this.solutionResult = "";
        this.lastSolvedCells = 0;
        this.solvedCells = 0;
    }
    GameSchemaSolver.prototype.getStepNumber = function () { return this.stepNumber; };
    GameSchemaSolver.prototype.getSolutionResult = function () { return this.solutionResult; };
    GameSchemaSolver.prototype.isSolving = function () { return this.solving; };
    GameSchemaSolver.prototype.isStopped = function () { return this.stopped; };
    GameSchemaSolver.prototype.isSolved = function () { return this.solved; };
    GameSchemaSolver.prototype.stop = function () {
        this.stopped = true;
        this.solving = false;
    };
    GameSchemaSolver.prototype.pause = function () {
        this.solving = false;
    };
    GameSchemaSolver.prototype.solve = function (schema) {
        this.stopped = false;
        this.solved = false;
        this.stepNumber = 0;
        this.solving = true;
        this.step(schema);
    };
    GameSchemaSolver.prototype.getLastSolvedCells = function () { return this.lastSolvedCells; };
    return GameSchemaSolver;
}());
exports.GameSchemaSolver = GameSchemaSolver;
//# sourceMappingURL=game-schema-solver.js.map