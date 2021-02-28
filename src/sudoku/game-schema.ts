import { GameSchema } from '../game-types/game-schema';
import { GameCellSudoku } from './game-cell'
import { GameSchemaSolverSudoku } from './game-schema-solver';
import $ from 'jquery';


/**
 * The container of the cell, with a few utilities
 */
export class GameSchemaSudoku extends GameSchema<GameCellSudoku> {
    setOrigCells(row: number, col: number, value: number) {
        this.origCellValues[row][col] = value;
    }
    setValues(matrix: number[][], onlyUnsolved: boolean=false) {
        for(let r=0;r<9;r++)
            for(let c=0;c<9;c++)
                if(!onlyUnsolved || !this.cells[r][c].isSolved())
                    this.cells[r][c].solveWithValue(matrix[r][c]);
    }

    copyFrom(other: GameSchemaSudoku) {


        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.cells[i][j].copyFrom(other.cells[i][j]);
            }
        }

    }
    dump(): string[] {

        const rows: string[] = [];
        for (let i = 0; i < 9; i++) {
            let line = "";
            for (let j = 0; j < 9; j++) {
                line += String(this.cells[i][j].getValue());
            }
            rows.push(line);
        }

        return rows;

    }
    loadFrom(testCase: string[]) {


            for (let i = 0; i < 9; i++) {
                const line = testCase[i];
                for (let j = 0; j < 9; j++) {
                    this.origCellValues[i][j] = Number(line.charAt(j));
                }
            }

        this.initCells(this.origCellValues);
    }
    /**
     * The cells
     */
    private cells!: GameCellSudoku[][];

    // celle valorizzate nel processo di input
    private inputCells: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    // Esempio di partenza
    private demoCellValues: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]];


    // Celle prima dell'inizio della soluzione
    private origCellValues: number[][] = [
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

    //private solver: GameSchemaSolverSudoku = new GameSchemaSolverSudoku();


    constructor(demo: boolean = false) {

        super();
        this.rowNumber = 9;
        this.colNumber = 9;
        if(demo) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    this.origCellValues[i][j] = this.demoCellValues[i][j];
                }
            }

        }
        this.initCells(this.origCellValues);
    }

    public getCell(row:number, col:number): GameCellSudoku {
        return this.cells[row][col];
    }

    public getCellValue(row:number, col:number) : number {
        return this.cells[row][col].getValue();
    }

    public getCellValueSet(row:number, col:number) : number[] {
        return this.cells[row][col].getValueSet();
    }



    private initCellsValue(values: number[][]) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.cells[r][c].initValue(values[r][c]);
            }
        }
    }

    private initCells(origCells: number[][]): void {
        this.cells = this.createCells();
        this.initCellsValue(origCells);
    }

    public createCells(): GameCellSudoku[][] {
        const cells: GameCellSudoku[][] = new Array(9);
        for (let i = 0; i < 9; i++) {
            cells[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                cells[i][j] = new GameCellSudoku();
            }
        }
        return cells;
    }



    public getCellHighlight(row: number, col: number): boolean {
        return this.cells[row][col].isHighlighted();
    }



    public resetCells() {
        //this.round = 0;
        this.cells = this.createCells();
        //this.stopped = false;
    }

    public resetCellsToOrig() {
        //this.round = 0;
        this.initCellsValue(this.origCellValues);
        //this.stopped = false;
    }

    public getValues(): number[][] {

        const values: number[][] = Array(9);
        for (let i = 0; i < 9; i++) {
            values[i] = Array(9);
            for (let j = 0; j < 9; j++) {
                values[i][j] = this.cells[i][j].getValue();
            }
        }
        return values;
    }




    public setInputValue(row: number, col: number, value: number | string, confirm: boolean = true): void {

        let _value = 0;
        if(typeof value === "string")
            _value = value.length === 0 ? 0 : Number(value);
        else
            _value = value;

        this.inputCells[row][col] = _value;
        if (confirm) {
            this.cells[row][col].initValue(this.inputCells[row][col]);
        }
    }

    public confirmAllInputValue(): void {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.cells[row][col].initValue(this.inputCells[row][col]);
            }
      }
    }

    public loadCellEditor(row: number, col: number): void {
        for(let i=1;i<=9;i++)
            $('#cellCheck'+i).prop('checked', false);

        const cell = this.cells[row][col];
        if(cell.getValue()!==0) {
            $('#cellCheck'+cell.getValue()).prop('checked', true);

        } else {
            cell.getValueSet().forEach(
                (elem,i) => {
                    $('#cellCheck'+elem).prop('checked', true);
                }
            );
        }
    }


    public confirmCellEdit(currentEditRow: number, currentEditCol: number): boolean {

        for(let i=1;i<=9;i++) {
            let checked = $('#cellCheck'+i).prop('checked');
        }
        return true;
    }

    public initialize(): void {
        throw new Error('Method not implemented.');
    }

    public clone(): GameSchemaSudoku {

        const schema = new GameSchemaSudoku();

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {

                schema.cells[row][col] = this.cells[row][col].clone() as GameCellSudoku;
            }
        }
        return schema;
    }


    prepareForStep() {


        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.cells[i][j].highlight(false);
            }
        }
    }


}

