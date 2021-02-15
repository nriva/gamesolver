import { GameSchemaChecker } from "../game-types/game-schema-checker";
import { GameSchemaCheckerResult } from "../game-types/game-schema-checker-result";


export class GameSchemaCheckerSudoku implements GameSchemaChecker {

    private incomplete: boolean = false;


    public check(cells: number[][], parameters?: any): GameSchemaCheckerResult {

        this.incomplete = parameters.incomplete;

        let error = false;
        let result: GameSchemaCheckerResult = new GameSchemaCheckerResult();

        // this.checkResult = 'Checking rows...';
        for (let r = 0; r < 9; r++) {

            const positions  = this.getRowPositions(r);
            result = this.chekPostions(cells, r, positions, 'row');
            error = error || result.error;
        }
        // this.checkResult = 'Checking columns...';
        if (!error) {
            for (let c = 0; c < 9; c++) {
                const positions  = this.getColPositions(c);
                result = this.chekPostions(cells, c, positions, 'column');
                error = error || result.error;
            }
        }
        // this.checkResult = 'Checking squares...';
        if (!error) {
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    const positions  = this.getSquarePositions(r, c);
                    result = this.chekPostions(cells, '${r},${c}', positions, 'square');
                    error = error || result.error;
                }
            }
        }
        if (!error) {
            result.error = false;
            result.resultMessage = 'Checked!';
        }

        return result;
    }

    chekPostions(cells: number[][], origin: any, positions: {row: number, col: number}[], checkTypeMsg: string)
                    : GameSchemaCheckerResult {
        const counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const r = new GameSchemaCheckerResult();
        r.error = true;

        // tslint:disable-next-line: prefer-for-of
        for (let p = 0; p < positions.length; p++) {
            counters[ cells[ positions[p].row ][ positions[p].col] ]++;
        }

        if (counters[0] > 0 && !this.incomplete) {
            r.resultMessage = 'Row ${r} not completely solved';
            r.error = true;
            return r;
        }

        const wrongindex = counters.findIndex( (value, index, arr) => index === 0 ? false : value > 1);
        if (wrongindex !== -1) {
            r.resultMessage = `Number ${wrongindex} in present more than once in ${checkTypeMsg} ${origin}`;
            r.error = true;
            return r;
        }

        return r;
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
