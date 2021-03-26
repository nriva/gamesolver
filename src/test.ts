import { GameSchemaSolitaire } from "./solitaire/game-schema";
import { DeepSolverMatrixSolitaire } from "./solitaire/game-schema-solver";
import { GameSchemaSudoku } from "./sudoku/game-schema";


function dump(matrix:number[][], rowNumber: number, colNumber: number): string[] {

    const rows: string[] = [];
    for (let i = 0; i < rowNumber; i++) {
        let line = "";
        for (let j = 0; j < colNumber; j++) {
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
/*
function testSudoku() {
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
    const matrix =  schema.getValues();

    const task: DeepSolverMatrixSudoku = new DeepSolverMatrixSudoku(matrix);

    task.deepSolve(0,0);

    const rows: string[] = dump(matrix);
    for(const row of rows)
        console.log(row);
}
*/
function testSolitaire() {
    const schema: GameSchemaSolitaire = new GameSchemaSolitaire(true);

    //schema.dump().forEach((e)=>console.log(e));
    const matrix = schema.getValues();
    const solver: DeepSolverMatrixSolitaire = new DeepSolverMatrixSolitaire(matrix, null);
    if(solver.deepSolve(1,3)) {
        dump(matrix,7,7).forEach((e,i)=>(console.log(String(i)+":"+e)));
        console.log('Solved!');
    }

    console.log('End.');
}

console.log('Start');
testSolitaire();






