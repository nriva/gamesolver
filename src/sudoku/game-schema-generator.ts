import { GameSchema } from "../game-types/game-schema";
import { GameSchemaGenerator } from "../game-types/game-schema-generator";
import { GameSchemaSudoku } from "./game-schema";
import { GameSchemaSolverSudoku } from "./game-schema-solver";
import { findInCol, findInRow, findInSquare } from "./sudoku-util";

export class GameSchemaGeneratorSudoku extends GameSchemaGenerator<GameSchemaSudoku>  {


    private solver:  GameSchemaSolverSudoku = new GameSchemaSolverSudoku();


    private size: number;
    // Size of an inner square
    private squareSize: number;
    private missingDigits: number;

    public mat: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    constructor(size: number, missingDigits: number) {

        super();
        this.size = size;
        this.missingDigits = missingDigits;

        const s = Math.sqrt(size);
        this.squareSize = Math.floor(s);
    }

    public generate(): GameSchemaSudoku {
        this.fillValues();
        const schema = new GameSchemaSudoku();
        schema.createCells()
        for(let row=0;row<this.size;row++)
            for(let col=0;col<this.size;col++) {
                schema.getCell(row,col).initValue(this.mat[row][col]);
                schema.setOrigCells(row,col,this.mat[row][col]);
            }
        return schema;
    }

    public fillValues(): void 	{
        // Fill the diagonal of SRN x SRN matrices
        this.fillDiagonal();

        // Fill remaining blocks
        this.fillRemaining(0, this.squareSize);

        // Remove Randomly K digits to make game
        this.removeKDigits();
    }

    private fillDiagonal(): void {

        for (let i = 0; i < this.size; i = i + this.squareSize) {
            // for diagonal box, start coordinates->i==j 
            this.fillBox(i, i);
        }
    }

    private fillBox(row: number, col: number): void {
        let num;
        for (let i = 0; i < this.squareSize; i++) {
            for (let j = 0; j < this.squareSize; j++) {
                num = this.randomGenerator(this.size);
                while (findInSquare(this.mat, row, col, num)) {
                   num = this.randomGenerator(this.size);
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
        return (!findInRow(this.mat, i, num)
                    && !findInCol(this.mat, j, num)
                    && !findInSquare(this.mat, i, j, num));
    }

    private fillRemaining(i: number, j: number): boolean {

        if (j >= this.size && i < this.size - 1) {
            i = i + 1;
            j = 0;
        }
        if (i >= this.size && j >= this.size) {
            return true;
        }

        if (i < this.squareSize) {
            if (j < this.squareSize) {
                j = this.squareSize;
            }
        } else if (i < this.size - this.squareSize) {
            if (j === Math.floor(i / this.squareSize) * this.squareSize) {
                j = j + this.squareSize;
            }
        } else {
            if (j === this.size - this.squareSize) {
                i = i + 1;
                j = 0;
                if (i >= this.size) {
                    return true;
                }
            }
        }

        for (let num = 1; num <= this.size; num++) {
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
        let count = this.missingDigits;
        while (count !== 0) {
            const cellId = this.randomGenerator(this.size * this.size)-1;

            // System.out.println(cellId);
            // extract coordinates i and j
            const i =  Math.floor(cellId / this.size);
            const j = cellId % 9;
            /*
            if (j !== 0) {
                j = j - 1;
            }*/

            // console.log(`putting hole in ${i}, ${j}`)
            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }
    }
}
