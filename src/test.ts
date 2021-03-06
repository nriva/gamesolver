import { GameConfig } from "./game-types/game-config";
import { GameCellSolitaire } from "./solitaire/game-cell";
import { GameSchemaSolitaire } from "./solitaire/game-schema";
import { GameSchemaSolitaireEnglish } from "./solitaire/game-schema-english";
import { GameSchemaSolitaireEuropean } from "./solitaire/game-schema-european";
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
    // const schema: GameSchemaSolitaire = new GameSchemaSolitaireEnglish(true);
    const config: GameConfig = new GameConfig();

    config.demo = true;

    const schema: GameSchemaSolitaire = new GameSchemaSolitaireEnglish(config);
    //schema.getCell(3,3).setValue(GameCellSolitaire.PEG_CELL);
    //schema.getCell(0,2).setValue(GameCellSolitaire.EMPTY_CELL);
    const matrix = schema.getValues();
    const solver: DeepSolverMatrixSolitaire = new DeepSolverMatrixSolitaire(matrix, null);



    const testCase = [
        [9, 9, 0, 0, 0, 9, 9],
        [9, 1, 0, 0, 0, 1, 9],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [9, 1, 0, 0, 0, 1, 9],
        [9, 9, 0, 0, 0, 9, 9]
        ];

    // console.log(solver.hasIsolatedPegs(testCase));
    // schema.dump().forEach((e)=>console.log(e));

    if(solver.deepSolve(0, 0, 0)) {
        dump(matrix,7,7).forEach((e,i)=>(console.log(String(i+1)+":"+e)));
        console.log('Solved!');
    }
    const endDate = new Date();
    console.log('End ' + endDate.toLocaleTimeString());
    console.log(`Elapsed ${endDate.getTime() - startDate.getTime()} ms`);
}

const startDate = new Date();

console.log('Start ' + startDate.toLocaleTimeString());
testSolitaire();






