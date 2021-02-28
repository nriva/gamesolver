"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_schema_1 = require("./sudoku/game-schema");
var game_schema_solver_1 = require("./sudoku/game-schema-solver");
function dump(matrix) {
    var rows = [];
    for (var i = 0; i < 9; i++) {
        var line = "";
        for (var j = 0; j < 9; j++) {
            line += String(matrix[i][j]);
        }
        rows.push(line);
    }
    return rows;
}
var solver = new game_schema_solver_1.GameSchemaSolverSudoku();
var solved = false;
// test demo
//const schema: GameSchemaSudoku = new GameSchemaSudoku(true);
// test
var schema = new game_schema_1.GameSchemaSudoku();
var testCase = [
    ' 3   8 12',
    '        8',
    '   342   ',
    '     1 23',
    '      791',
    '713      ',
    '9 1 3 2 4',
    '  74  635',
    '3 5 8 17 ',
];
schema.loadFrom(testCase);
/*
while(!solved) {
    solver.step(schema);
    solved = solver.isSolved();

    if(solver.isStopped())
        break;
}
*/
solver.matrix = schema.getValues();
solver.deepSolve(0, 0);
// console.log(solver.getSolutionResult());
var rows = dump(solver.matrix);
for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
    var row = rows_1[_i];
    console.log(row);
}
//# sourceMappingURL=test.js.map