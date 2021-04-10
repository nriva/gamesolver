import { GameCell } from "./game-cell";
import { GameConfig } from "./game-config";

/**
 * C = Cell type
 */
export abstract class GameSchema<C extends GameCell> {

    /**
     * Cell values bofoer starting the solution search
     */
    protected origCellValues: number[][] = [];
    /* = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
        , [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    */

    // FIX: don't like it
    protected demoCellValues: number[][] = [] /*
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];*/

    protected cells: C[][] = [];

    public abstract setOrigCellValues(): void;

    protected gameConfig: GameConfig


    constructor(rowNumber: number, colNumber: number, gameConfig: GameConfig) {
        this.rowNumber = rowNumber;
        this.colNumber = colNumber;

        this.gameConfig = gameConfig;

        this.origCellValues = this.createEmptyCells();

        if(gameConfig.demo) {
            this.initDemoCells();
            for (let i = 0; i < rowNumber; i++) {
                for (let j = 0; j < colNumber; j++) {
                    this.origCellValues[i][j] = this.demoCellValues[i][j];
                }
            }

        } else {
            this.setOrigCellValues();
        }
        this.initCells(this.origCellValues);
    }

    public createEmptyCells(): number[][] {
        const cells = Array(this.rowNumber);
        for(let r=0;r<this.rowNumber;r++) {
            cells[r] = Array();
            for(let c=0;c<this.colNumber;c++) {
                cells[r].push(0);
            }
        }
        return cells;
    }

    protected rowNumber: number = 0;
    public getRowNumber() : number {
        return this.rowNumber;
    }
    protected colNumber: number = 0;
    public getColNumber() : number {
        return this.colNumber;
    }

    public abstract createCells(): C[][];

    public abstract initDemoCells(): void;

    protected initCells(origCells: number[][]): void {
        this.cells = this.createCells();
        this.initCellsValue(origCells);
    }


    public resetCells() {
        this.cells = this.createCells();
    }

    public resetCellsToOrig() {
        this.initCellsValue(this.origCellValues);
    }

    /* I don't need these
    public abstract setInputValue(row: number, col: number, value: number | string, confirm: boolean): void;

    public abstract confirmAllInputValue() : void;
    */
    public getCellHighlight(row: number, col: number): boolean {
        return this.cells[row][col].isHighlighted();
    }

    public setCellsHiglight(on:boolean) {
        for(let r=0;r<this.rowNumber;r++)
            for(let c=0;c<this.rowNumber;c++)
                this.cells[r][c].highlight(on);
    }

    /* Do I need it?
    public abstract initialize(): void;
    */
    // Do I need it?
    // public abstract clone(): GameSchema<C>;

    public initCellsValue(values: number[][]) {
        for (let r = 0; r < this.rowNumber; r++) {
            for (let c = 0; c < this.colNumber; c++) {
                this.cells[r][c].initValue(values[r][c]);
            }
        }
    }

    public getValues(): number[][] {

        const values: number[][] = Array(this.rowNumber);
        for (let r = 0; r < this.rowNumber; r++) {
            values[r] = Array(this.colNumber);
            for (let c = 0; c < this.colNumber; c++) {
                values[r][c] = this.cells[r][c].getValue();
            }
        }
        return values;
    }




    public getCell(row:number, col:number): C {
        return this.cells[row][col];
    }

    public abstract fromJSON(contents: string | ArrayBuffer): boolean;
    public abstract toJSON() : string ;

    // public abstract getCellValueSet(row:number, col:number) : number[];


    public setValues(matrix: number[][]/*, onlyUnsolved: boolean=false*/) {
        for(let r=0;r<this.rowNumber;r++)
            for(let c=0;c<this.colNumber;c++)
                /*if(!onlyUnsolved || !this.cells[r][c].isSolved())*/
                    this.cells[r][c].solveWithValue(matrix[r][c]);
    }

    // public canSolve(): boolean { return false; }
    // public canEdit(): boolean { return false; }
    // public canGenerate(): boolean { return false; }
    public canUndoMove(): boolean { return false; }

    public undoLastMove(): void {}

    public executeMoves(moves:number[][][]) {
        for(let i=0;i<moves.length;i++) {
            const move = moves[i];
            this.executeMove(move);
        }
    }

    public executeMove(move: number[][]|undefined):void {}

    // Moved to GameSchemaEditable:
    /*
    public abstract loadCellEditor(row: number, col: number): void;
    public abstract confirmCellEdit(currentEditRow: number, currentEditCol: number): boolean;
    */


    public dump(): string[] {

        const rows: string[] = [];
        for (let i = 0; i < this.rowNumber; i++) {
            let line = "";
            for (let j = 0; j < this.colNumber; j++) {
                line += String(this.cells[i][j].getValueAsString());
            }
            rows.push(line);
        }

        return rows;

    }





}