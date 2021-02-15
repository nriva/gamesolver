import { GameCellSudoku } from "./game-cell";
import { GameSchemaSudoku } from "./game-schema";

export class GameSchemaSolverSudoku {

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


    public removeFromSquare(cells: GameCellSudoku[][], r: number, c: number, value: number) {
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);


        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[sr * 3 + i][sc * 3 + j].removeFromValues(value);
            }
        }

    }

    public removeFromCol(cells: GameCellSudoku[][], c: number, value: number) {
        for (let i = 0; i < 9; i++) {
            cells[i][c].removeFromValues(value);
        }
    }

    public removeFromRow(cells: GameCellSudoku[][], r: number, value: number) {
        for (let i = 0; i < 9; i++) {
            cells[r][i].removeFromValues(value);
        }

    }

    /**
     * 
     * @param cells 
     * @param workCells 
     * @returns the number of solve cells in the step
     */
    public step(cells: GameCellSudoku[][], workCells: GameCellSudoku[][]): number {

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                workCells[r][c].copyFrom(cells[r][c]);
            }
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (cells[r][c].getValue() !== 0) {
                    this.removeFromRow(workCells, r, cells[r][c].getValue());
                    this.removeFromCol(workCells, c, cells[r][c].getValue());
                    this.removeFromSquare(workCells, r, c , cells[r][c].getValue());
                }
            }
        }

        let solvedCells = 0;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (workCells[r][c].getValue() === 0 && workCells[r][c].getValues().length === 1) {
                    solvedCells++;
                    workCells[r][c].pickValue();
                    workCells[r][c].highlight(true);
                }
            }
        }

        // copy workCells to this.cells
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                cells[r][c].copyFrom(workCells[r][c]);
            }
        }

        return solvedCells;

    }


}