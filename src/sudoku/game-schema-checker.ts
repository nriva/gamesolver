import { GameSchemaChecker } from "../game-types/game-schema-checker";
import { GameSchemaCheckerResult } from "../game-types/game-schema-checker-result";
import { GameCellSudoku } from "./game-cell";
import { GameSchemaSudoku } from "./game-schema";


export class GameSchemaCheckerSudoku implements GameSchemaChecker<GameCellSudoku, GameSchemaSudoku> {

    private incomplete = false;

    private resultMessage = "";

    public check(schema: GameSchemaSudoku, parameters: any): GameSchemaCheckerResult {
        let incomplete = false;
        if(parameters!=null && typeof parameters.incomplete !== "undefined")
            incomplete = parameters.incomplete;
        return this.checkMatrix(schema.getValues(), incomplete);
    }

    public checkMatrix(matrix: number[][], incomplete=false): GameSchemaCheckerResult {

        this.incomplete =incomplete;

        let error = false;
        const result: GameSchemaCheckerResult = new GameSchemaCheckerResult();

        // this.checkResult = 'Checking rows...';
        for (let r = 0; r < 9 && !error; r++) {

            const positions  = this.getRowPositions(r);
            error = this.checkPostions(matrix, r, positions, 'row');
        }
        // this.checkResult = 'Checking columns...';
        if (!error) {
            for (let c = 0; c < 9 && !error; c++) {
                const positions  = this.getColPositions(c);
                error = this.checkPostions(matrix, c, positions, 'column');
            }
        }
        // this.checkResult = 'Checking squares...';
        if (!error) {
            for (let r = 0; r < 3 && !error; r++) {
                for (let c = 0; c < 3 && !error; c++) {
                    const positions  = this.getSquarePositions(r, c);
                    error = this.checkPostions(matrix, '${r},${c}', positions, 'square');
                }
            }
        }
        if (!error) {
            result.error = false;
            result.resultMessage = 'Checked!';
        } else {
            result.error = true;
            result.resultMessage = this.resultMessage;
        }


        return result;
    }

    private checkPostions(matrix: number[][], origin: any, positions: {row: number, col: number}[], checkTypeMsg: string): boolean {
        const counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let error = false;

        // tslint:disable-next-line: prefer-for-of
        for (let p = 0; p < positions.length; p++) {

            //console.log(`${checkTypeMsg} ${positions[p].row} , ${positions[p].col}`);
            counters[ matrix[positions[p].row][positions[p].col] ]++;
        }

        if (counters[0] > 0 && !this.incomplete) {
            this.resultMessage = `${checkTypeMsg} ${origin} not completely solved`;
            error = true;
        }

        if(!error) {
            const wrongindex = counters.findIndex( (value, index, arr) => index === 0 ? false : value > 1);
            if (wrongindex !== -1) {
                this.resultMessage = `Number ${wrongindex} in present more than once in ${checkTypeMsg} ${origin}`;
                error = true;
            }
        }

        return error;

    }



    getRowPositions(currentrow: number): {row: number, col: number}[] {

        const postions = [];
        for (let c = 0; c < 9; c++) {
            postions.push({row: currentrow, col: c});
        }

        return postions;
    }

    getColPositions(currentcol: number): {row: number, col: number}[] {

        const postions = [];
        for (let r = 0; r < 9; r++) {
            postions.push({row: r, col: currentcol});
        }

        return postions;
    }

    getSquarePositions(sqrow: number, sqcol: number): {row: number, col: number}[] {

        const postions = [];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                postions.push({row: sqrow * 3 + r, col: sqcol * 3 + c});
            }
        }

        return postions;
    }


}
