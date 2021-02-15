import { GameSchema } from "../game-types/game-schema";
import { GameSchemaSudoku } from "./game-schema";
import { GameSchemaSolverSudoku } from "./game-schema-solver";

export class GameSchemaGeneratorSudoku  {


    private solver:  GameSchemaSolverSudoku = new GameSchemaSolverSudoku();


    private N: number; // number of columns/rows.
    private SRN: number; // square root of N
    private K: number; // No. Of missing digits

    public mat: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    constructor(N: number, K: number) {

        this.N = N;
        this.K = K;

        // Compute square root of N
        const SRNd = Math.sqrt(N);
        this.SRN = Math.floor(SRNd);

        //this.mat = new number[N][N]; 
    }

    public generate(): GameSchema {
        this.fillValues();
        const schema = new GameSchemaSudoku();
        for(let row=0;row<9;row++)
            for(let col=0;col<9;col++)
                schema.getCell(row,col).initValue(this.mat[row][col]);
        return schema;
    }

    public fillValues(): void 	{
        // Fill the diagonal of SRN x SRN matrices
        this.fillDiagonal();

        // Fill remaining blocks
        this.fillRemaining(0, this.SRN);

        // Remove Randomly K digits to make game
        this.removeKDigits();
    }

    /** Fill the diagonal SRN number of SRN x SRN matrices  */
    private fillDiagonal(): void {

        for (let i = 0; i < this.N; i = i + this.SRN) {
            // for diagonal box, start coordinates->i==j 
            this.fillBox(i, i);
        }
    }

    /** Returns false if given 3 x 3 block contains num.  */
    /*
    private unUsedInBox(rowStart: number, colStart: number, num: number): boolean {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**  Fill a 3 x 3 matrix. */
    private fillBox(row: number, col: number): void {
        let num;
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                num = this.randomGenerator(this.N);
                while (this.solver.findInSquare(this.mat, row, col, num)) {  /*this.unUsedInBox(row, col, num)*/
                   num = this.randomGenerator(this.N);
                }
                this.mat[row + i][col + j] = num;
            }
        }
    }

    // Random generator
    private randomGenerator(num: number): number {
        let n = Math.floor((Math.random() * num + 1));
        if(n>num) n=num;
        return n;
    }

    /**
     * Check if safe to put in cell
     */
    private checkIfSafe(i: number, j: number, num: number): boolean {
        return (!this.solver.findInRow(this.mat, i, num)
                    && !this.solver.findInCol(this.mat, j, num)
                    && !this.solver.findInSquare(this.mat, i, j, num));
    }

    // check in the row for existence
    /*
    private unUsedInRow(i: number, num: number): boolean {
        for (let j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }
    */

    // check in the row for existence
    /*
    private unUsedInCol(j: number, num: number) : boolean {
        for (let i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }
    */

    // A recursive function to fill remaining
    // matrix
    private fillRemaining(i: number, j: number): boolean {

        if (j >= this.N && i < this.N - 1) {
            i = i + 1;
            j = 0;
        }
        if (i >= this.N && j >= this.N) {
            return true;
        }

        if (i < this.SRN) {
            if (j < this.SRN) {
                j = this.SRN;
            }
        } else if (i < this.N - this.SRN) {
            if (j === Math.floor(i / this.SRN) * this.SRN) {
                j = j + this.SRN;
            }
        } else {
            if (j === this.N - this.SRN) {
                i = i + 1;
                j = 0;
                if (i >= this.N) {
                    return true;
                }
            }
        }

        for (let num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                   return true;
                }
                this.mat[i][j] = 0;
            }
        }
        return false;
    }

    // Remove the K no. of digits to
    // complete game
    private removeKDigits(): void {
        let count = this.K;
        while (count !== 0) {
            const cellId = this.randomGenerator(this.N * this.N);

            // System.out.println(cellId);
            // extract coordinates i and j
            const i =  Math.floor(cellId / this.N);
            let j = cellId % 9;
            /*
            if (j !== 0) {
                j = j - 1;
            }*/

            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }
    }
}
