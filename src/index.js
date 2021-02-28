"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
var game_schema_1 = require("./sudoku/game-schema");
var game_schema_generator_1 = require("./sudoku/game-schema-generator");
var game_schema_solver_1 = require("./sudoku/game-schema-solver");
var style_css_1 = __importDefault(require("./style.css"));
var worker_1 = __importDefault(require("worker-loader!./sudoku/worker"));
var game_schema_manager_1 = require("./sudoku/game-schema-manager");
var schema = new game_schema_1.GameSchemaSudoku(true);
var solver = new game_schema_solver_1.GameSchemaSolverSudoku();
var schemaManager = new game_schema_manager_1.GameSchemaManagerSodoku(schema);
var worker = new worker_1.default();
worker.onmessage = function (event) {
    jquery_1.default('#messages').text(event.data.primes);
    console.log(event.data.primes);
};
var solving = false;
var solvingPaused = false;
var solvingStopped = false;
var editing = false;
var currentEditRow = 0;
var currentEditCol = 0;
var startGeneration = null;
function loadAllValues() {
    jquery_1.default('#roundNumber').text(solver.getStepNumber());
    var solvedCells = solver.getLastSolvedCells();
    if (solvedCells > 0) {
        jquery_1.default('#solvedCells').css('display', 'inline');
        jquery_1.default('#solvedCellsNum').text(solvedCells);
    }
    else {
        jquery_1.default('#solvedCells').css('display', 'none');
    }
    for (var row = 0; row < schema.getRowNumber(); row++)
        for (var col = 0; col < schema.getColNumber(); col++) {
            var value = schemaManager.getCellValueRep(row, col);
            if (value != null) {
                jquery_1.default("#cell" + (row + 1) + (col + 1)).html(value);
                if (schema.getCellHighlight(row, col))
                    jquery_1.default("#cell" + (row + 1) + (col + 1)).parent().addClass('highlight');
                else
                    jquery_1.default("#cell" + (row + 1) + (col + 1)).parent().removeClass('highlight');
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
    //console.log('starting worker...')
    //worker.postMessage({ limit: 2000 });
    editing = true;
}
function generateBtnClick() {
    if (!startGeneration) {
        startGeneration = true;
        jquery_1.default('.inputGenerate').removeClass('hidden');
        return;
    }
    var val = 0;
    if (startGeneration) {
        val = Number(jquery_1.default('#generateHolesTxt').val());
        if (isNaN(val))
            return;
        jquery_1.default('.inputGenerate').addClass('hidden');
        startGeneration = false;
    }
    var generator = new game_schema_generator_1.GameSchemaGeneratorSudoku(9, val);
    schema = generator.generate();
    schemaManager = new game_schema_manager_1.GameSchemaManagerSodoku(schema);
    loadAllValues();
}
function confirmEditBtnClick() {
    if (!editing)
        return;
    schema.confirmCellEdit(currentEditRow, currentEditCol);
    jquery_1.default('#cellEditor').css('display', 'none');
}
function solveGame() {
    solving = true;
    solvingStopped = false;
    solvingPaused = false;
    stepGame();
}
function stepGame() {
    solver.step(schema);
    loadAllValues();
    if (solver.isSolved() || solver.isStopped()) {
        solving = false;
        jquery_1.default('#solutionResult').text("- " + solver.getSolutionResult());
    }
    if (solving) {
        setTimeout(function () { return stepGame(); }, 100);
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
//const solutionHandler: SolutionHandler = new SolutionHandler();
function init() {
    console.log(style_css_1.default.classNames);
    //$('.cellValue').text('0');
    jquery_1.default("#resetBtn").on("click", resetBtnClick);
    jquery_1.default("#solveBtn").on("click", solveBtnClick);
    jquery_1.default("#stopBtn").on("click", stopBtnClick);
    jquery_1.default("#pauseBtn").on("click", pauseBtnClick);
    jquery_1.default("#stepBtn").on("click", stepBtnClick);
    jquery_1.default("#editBtn").on("click", editBtnClick);
    jquery_1.default("#generateBtn").on("click", generateBtnClick);
    jquery_1.default("#confirmEditBtn").on("click", confirmEditBtnClick);
    jquery_1.default('.cellCkeck').on('change', function (e) { console.log('changed ' + e); });
    jquery_1.default('.gametablecell').on('dblclick', function (e) {
        if (!editing)
            return;
        jquery_1.default('#cellEditor').css('display', 'inline');
        var cell = e.currentTarget;
        var span = cell.children.item(0);
        var id = span.id.substring(span.id.length - 2);
        currentEditRow = Number(id.substring(0, 1)) - 1;
        currentEditCol = Number(id.substring(1)) - 1;
        schema.loadCellEditor(currentEditRow, currentEditCol);
    });
    loadAllValues();
}
jquery_1.default(function () {
    init();
});
//# sourceMappingURL=index.js.map