import { DeepSolverMatrix } from "../game-types/deep-solve";
import { GameSchemaCheckerSudoku } from "./game-schema-checker";
import { getCellValueSet } from "./sudoku-util";

const ctx: Worker = self as any;

export class DeepSolverMatrixSudoku extends DeepSolverMatrix {


    private checker: GameSchemaCheckerSudoku = new GameSchemaCheckerSudoku();


    public deepSolve(row: number, col: number): boolean {

        let c = col;
        let r = row;

        if(c === 9) {
            r++;
            c=0;
        }

        while(r<9 && this.matrix[r][c]!==0) {
            c++;
            if(c===9) {
                r++;
                c=0;
            }
        }

        if(r === 9) {
            const result = this.checker.checkMatrix(this.matrix);
            if(!result.error) {
                // console.log(`${r},${c}: success/1!`);
                return true;
            }

            // console.log(`${r},${c}: giving up!`);
            return false;
        }
        const valueSet = getCellValueSet(this.matrix,r,c);
        // schema.getCell(r,c).proposeValue(value);

        // 3. simplify the schema with this value

        // console.log(`${r},${c}: Trying to fix cell ${this.matrix[r][c]} with ${valueSet}`);
        for(const value of valueSet) {
            // console.log(`${r},${c}: Trying to fix cell with ${value} of ${valueSet}`);
            this.matrix[r][c] = value;
            ctx.postMessage({ 'eventType': 'tryValue', eventData:{'row':r, 'col':c, 'value': value}});
            const result = this.checker.checkMatrix(this.matrix);
            if(!result.error) {
                // console.log(`${r},${c}: success with ${value}!`);
                return true;
            }
            // console.log(`${r},${c}: going deeper`);
            // is not solved: search again
            if(this.deepSolve(r, c+1)) {
                // console.log(`${r},${c}: success/2!`);
                ctx.postMessage({ 'eventType': 'setValue', eventData:{'row':r, 'col':c, 'value': value} });
                return true;
            } else {
                this.matrix[r][c] = 0;
                ctx.postMessage({ 'eventType': 'undoValue', eventData:{'row':r, 'col':c, 'value': value} });
            }
        }
        // console.log(`${r},${c}: just returning false`);
        return false;
    }
}

async function delay(milliseconds: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

let solver: DeepSolverMatrixSudoku;

ctx.addEventListener("message", (event) => {
    const matrix = event.data.matrix;
    solver = new DeepSolverMatrixSudoku(matrix);
    let solutionResult = "Resolution failed."
    if(solver.deepSolve(0,0))
        solutionResult = "Recursive search succeeded.";
    ctx.postMessage({'eventType': 'success', 'matrix':matrix, 'solutionResult': solutionResult });
});