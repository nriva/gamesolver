import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { GameCellSudoku } from "./game-cell";
import { GameSchemaSudoku } from "./game-schema";
import { GameSchemaCheckerSudoku } from "./game-schema-checker";

export class GameSchemaSolverSudoku extends GameSchemaSolver<GameSchemaSudoku> {


    /**
     * Find value in a 3x3 square
     * @param cells array of game cells
     * @param r row
     * @param c col
     * @param value true if value exists in square rooted in (r,c) cell
     */
    public findInSquare(cells: number[][], r: number, c: number, value: number): boolean {

        let found = false;
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);

        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3 && !found; i++) {
            for (let j = 0; j < 3 && !found; j++) {
                found = cells[sr * 3 + i][sc * 3 + j] === value;
            }
        }
        return found;

    }

    /**
     * Find value in a column
     * @param cells array of game cells
     * @param c col
     * @param value true if value exists in column c
     */
    public findInCol(cells: number[][], c: number, value: number) {
        let found = false;
        for (let i = 0; i < 9 && !found; i++) {
            found =  cells[i][c] === value;
        }
        return found;
    }

    /**
     * Find value in a row
     * @param cells array of game cells
     * @param r row
     * @param value true if value exists in row r
     */
    public findInRow(cells: number[][], r: number, value: number) {
        let found = false;
        for (let i = 0; i < 9 && !found; i++) {
            found = cells[r][i] === value;
        }
        return found;
    }


    public removeFromSquare(cells: GameCellSudoku[][], r: number, c: number, value: number): number {
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);

        let solved = 0;

        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                solved += cells[sr * 3 + i][sc * 3 + j].removeFromValueSet(value)?1:0;
            }
        }

        return solved;

    }

    public removeFromCol(cells: GameCellSudoku[][], c: number, value: number): number {
        let solved = 0;
        for (let i = 0; i < 9; i++) {
            solved += cells[i][c].removeFromValueSet(value)?1:0;
        }

        return solved;
    }

    public removeFromRow(cells: GameCellSudoku[][], r: number, value: number) {
        let solved = 0;
        for (let i = 0; i < 9; i++) {
            solved += cells[r][i].removeFromValueSet(value)?1:0;
        }
        return solved;
    }

    private checker: GameSchemaCheckerSudoku = new GameSchemaCheckerSudoku();

    /**
     * Perform one step in the solution of the sudoku schema
     * @param cells the schema
     * @param workCells the working schema
     * @returns the number of solve cells in the step
     */
    public step(schema: GameSchemaSudoku): number {

        schema.prepareForStep();
        this.stepNumber++;

        const simplifyResult = this.simplify(schema);
        this.copyFromWorkCells(schema, simplifyResult.workCells);
        this.lastSolvedCells = simplifyResult.solved;


        const result = this.checker.check(schema);


        if(!result.error) {
            this.solved = true;
            this.solutionResult = `Solution found after ${this.stepNumber} semplifications`;
        } else {

            if(this.lastSolvedCells===0) {
                this.matrix = schema.getValues();
                if(this.deepSolve(0,0)) {
                    schema.setValues(this.matrix, true);
                    this.solved = true;
                    this.solutionResult = `Solution found after ${this.stepNumber} semplifications and recursive search`;
        
                } else {
                    this.stopped = true;
                    this.solutionResult = `Search stopped after ${this.stepNumber} semplifications`;
    
                }
            }
        }

        this.solvedCells += this.lastSolvedCells;

        return this.lastSolvedCells;

    }

    private copyToWorkCells(schema: GameSchemaSudoku,workCells: GameCellSudoku[][]): void {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                workCells[r][c].copyFrom(schema.getCell(r,c));
            }
        }
    }

    private copyFromWorkCells(schema: GameSchemaSudoku,workCells: GameCellSudoku[][]) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                schema.getCell(r, c).copyFrom(workCells[r][c]);
            }
        }
    }

    private simplify(schema: GameSchemaSudoku): {workCells: GameCellSudoku[][], solved: number} {

        const workCells: GameCellSudoku[][] = schema.createCells();
        this.copyToWorkCells(schema, workCells);

        let solved = 0;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const value = schema.getCell(r, c).getValue();
                if (value !== 0) {
                    solved += this.removeFromRow(workCells, r, value);
                    solved += this.removeFromCol(workCells, c, value);
                    solved += this.removeFromSquare(workCells, r, c , value);
                }
            }
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if(workCells[r][c].getValue()===0 && workCells[r][c].getValueSet().length===1) {
                    workCells[r][c].solve();
                    this.lastSolvedCells++;
                }

            }
        }

        return {"workCells": workCells, "solved": solved};
    }


    public matrix: number[][] = [];
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
        const valueSet = this.getCellValueSet(this.matrix,r,c);
        // schema.getCell(r,c).proposeValue(value);

        // 3. simplify the schema with this value

        // console.log(`${r},${c}: Trying to fix cell ${this.matrix[r][c]} with ${valueSet}`);
        for(const value of valueSet) {
            // console.log(`${r},${c}: Trying to fix cell with ${value} of ${valueSet}`);
            this.matrix[r][c] = value;
            const result = this.checker.checkMatrix(this.matrix);
            if(!result.error) {
                // console.log(`${r},${c}: success with ${value}!`);
                return true;
            }
            // console.log(`${r},${c}: going deeper`);
            // is not solved: search again
            if(this.deepSolve(r, c+1)) {
                // console.log(`${r},${c}: success/2!`);
                return true;
            } else {
                this.matrix[r][c] = 0;
            }
        }
        // console.log(`${r},${c}: just returning false`);
        return false;
    }
    getCellValueSet(matrix: number[][], r: number, c: number): number[] {
        const valueSet: number[] = [];
        for(let i=1;i<=9;i++) {
            if(this.checkIfSafe(matrix, r, c, i)) {
                valueSet.push(i);
            }
        }

        return valueSet;
    }

    /**
     * Check if safe to put in cell
     */
    private checkIfSafe(matrix:number[][], r: number, c: number, v: number): boolean {
        return (!this.findInRow(matrix, r, v)
                    && !this.findInCol(matrix, c, v)
                    && !this.findInSquare(matrix, r, c, v));
    }




}