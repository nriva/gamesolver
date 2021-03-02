import { DeepSolveMatrix } from "./sudoku/deep-solver-worker";
import { GameSchemaSudoku } from "./sudoku/game-schema";
import { GameSchemaSolverSudoku } from "./sudoku/game-schema-solver";

function dump(matrix:number[][]): string[] {

    const rows: string[] = [];
    for (let i = 0; i < 9; i++) {
        let line = "";
        for (let j = 0; j < 9; j++) {
            line += String(matrix[i][j]);
        }
        rows.push(line);
    }

    return rows;

}

// const solver: GameSchemaSolverSudoku = new GameSchemaSolverSudoku();
// let solved = false;

// test demo
//const schema: GameSchemaSudoku = new GameSchemaSudoku(true);

// test
const schema: GameSchemaSudoku = new GameSchemaSudoku();

const testCase = [
    ' 3   8 12', // 534678912
    '        8', // 672195348
    '   342   ', // 198342567 
    '     1 23', // 859761423
    '      791', // 426853791
    '713      ', // 713924856
    '9 1 3 2 4', // 961537284
    '  74  635', // 287419635
    '3 5 8 17 ', // 345286179
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
const matrix =  schema.getValues();

const task: DeepSolveMatrix = new DeepSolveMatrix(matrix);

task.deepSolve(0,0);

// console.log(solver.getSolutionResult());

const rows: string[] = dump(matrix);
for(const row of rows)
    console.log(row);






