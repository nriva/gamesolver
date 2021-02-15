import $ from "jquery";
import { GameSchemaSudoku } from "./sudoku/game-schema";
import { GameSchemaGeneratorSudoku } from "./sudoku/game-schema-generator";
import { GameSchemaSolverSudoku } from "./sudoku/game-schema-solver";
import css from "./style.css";
import PrimeWorker from "worker-loader!./sudoku/worker";
var schema = new GameSchemaSudoku();
var solver = new GameSchemaSolverSudoku();
var worker = new PrimeWorker();
worker.onmessage = function (event) {
    $('#messages').text(event.data.primes);
    console.log(event.data.primes);
};
var solving = false;
var solvingPaused = false;
var solvingStopped = false;
function loadAllValues() {
    $('#roundNumber').text(schema.getRoundNumber());
    var solvedCells = schema.solvedCells();
    if (solvedCells > 0) {
        $('#solvedCells').css('display', 'inline');
        $('#solvedCellsNum').text(solvedCells);
    }
    else {
        $('#solvedCells').css('display', 'none');
    }
    for (var row = 0; row < schema.getRowNumber(); row++)
        for (var col = 0; col < schema.getColNumber(); col++) {
            var value = schema.getCellValueRep(row, col);
            if (value != null) {
                $("#cell" + (row + 1) + (col + 1)).html(value);
                if (schema.getCellHighlight(row, col))
                    $("#cell" + (row + 1) + (col + 1)).parent().addClass('highlight');
                else
                    $("#cell" + (row + 1) + (col + 1)).parent().removeClass('highlight');
            }
        }
}
function resetBtnClick() {
    schema.resetCellsToOrig();
    loadAllValues();
}
function solveBtnClick() {
    solveGame();
}
function stopBtnClick() {
    solvingStopped = true;
    solving = false;
}
function pauseBtnClick() {
    solvingPaused = true;
    solving = false;
}
function stepBtnClick() {
    stepGame();
}
function editBtnClick() {
    console.log('starting worker...');
    worker.postMessage({ limit: 2000 });
}
function generateBtnClick() {
    var generator = new GameSchemaGeneratorSudoku(9, 10);
    schema = generator.generate();
    loadAllValues();
}
function solveGame() {
    solving = true;
    solvingStopped = false;
    solvingPaused = false;
    stepGame();
}
function stepGame() {
    schema.step();
    loadAllValues();
    if (schema.isSolved() || schema.isStopped()) {
        solving = false;
        $('#solutionResult').text(" - " + schema.solutionResult);
    }
    if (solving) {
        setTimeout(function () { return stepGame(); }, 1000);
    }
}
var SolutionHandler = /** @class */ (function () {
    function SolutionHandler() {
    }
    SolutionHandler.prototype.handleResult = function (result) {
        throw new Error("Method not implemented.");
    };
    return SolutionHandler;
}());
var colutionHandler = new SolutionHandler();
function init() {
    console.log(css.classNames);
    //$('.cellValue').text('0');
    $("#resetBtn").on("click", resetBtnClick);
    $("#solveBtn").on("click", solveBtnClick);
    $("#stopBtn").on("click", stopBtnClick);
    $("#pauseBtn").on("click", pauseBtnClick);
    $("#stepBtn").on("click", stepBtnClick);
    $("#editBtn").on("click", editBtnClick);
    $("#generateBtn").on("click", generateBtnClick);
    loadAllValues();
}
$(function () {
    init();
});
//# sourceMappingURL=index.js.map