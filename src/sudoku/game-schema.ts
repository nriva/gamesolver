import { GameSchema } from '../game-types/game-schema';
import { GameCellSudoku } from './game-cell'
import { GameSchemaSolverSudoku } from './game-schema-solver';
import $ from 'jquery';


export class GameSchemaSudoku extends GameSchema {




    /**
     * Celle effettive
     */
    private cells!: GameCellSudoku[][];

    // celle valorizzate nel processo di input
    private inputCells: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    // Esempio di partenza
    private startupCells: number[][] = [
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
    private origCells: number[][] = [
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

    private solver: GameSchemaSolverSudoku = new GameSchemaSolverSudoku();


    constructor() {

        super();
        this.rowNumber = 9;
        this.colNumber = 9;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.origCells[i][j] = this.startupCells[i][j];
            }
        }

        this.initCells(this.origCells);
    }

    public getCell(row:number, col:number): GameCellSudoku {
        return this.cells[row][col];
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

    private createCells(): GameCellSudoku[][] {
        const cells: GameCellSudoku[][] = new Array(9);
        for (let i = 0; i < 9; i++) {
            cells[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                cells[i][j] = new GameCellSudoku();
            }
        }
        return cells;
    }


    public getCellValueRep(row: number, col: number): string | null {
        const values = this.getCellValuesRep(row, col);
        const value = this.cells[row][col].getValue();
        return `${ value === 0 ? '' : String(value)}${values}`;
    }

    public getCellValuesRep(row: number, col: number): string | null {
        let html = '';
        const values = this.cells[row][col].getValues();
        if (values.length > 0) {

            let dim = 3;
            let fontSize="xx-small";
            if(values.length<=4) {
                dim = 2;
                fontSize="x-small";
            }

            fontSize = "medium";
            let r = 0;
            let c = 0;
            html = `<table style="font-size: ${fontSize}; margin-left: auto; margin-right: auto; width:100%">`;

            for(let index=0;index<dim*dim;index++)  {

                let value = '';

                if(index<values.length)
                    value = String(values[index]);

                c = index % dim;
                r = Math.floor( index / dim);
                if(c===0)
                    html += '<tr>';
                html += `<td style="text-align: center">${value}</td>`;
                if(c===dim-1)
                    html += '</tr>';
            }

            html += '</table>';
        }
        return html;
    }

    public getCellHighlight(row: number, col: number): boolean {
        return this.cells[row][col].isHighlight();
    }



    public resetCells() {
        this.round = 0;
        this.cells = this.createCells();
        this.stopped = false;
    }

    public resetCellsToOrig() {
        this.round = 0;
        this.initCellsValue(this.origCells);
        this.stopped = false;
    }

    private _solvedCells = 0;

    public solvedCells(): number {
        return this._solvedCells;
    }



    public step(): void {

        if (this.stopped) { return; }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.cells[r][c].highlight(false);
            }
        }

        const workCells: GameCellSudoku[][] = this.createCells();
        this._solvedCells = this.solver.step(this.cells, workCells);

        this.solved = true;
        for (let r = 0; r < 9 && this.solved; r++) {
            for (let c = 0; c < 9 && this.solved; c++) {
                if (this.cells[r][c].getValue() === 0 /*|| this.cells[r][c].getValues().length > 0*/) {
                    this.solved = false;
                }
            }
        }

        this.round++;

        if (!(!this.solved && this.round <= this.MAX_ROUNDS && this._solvedCells > 0)) {

            this.solving = false;
            this.stopped = true;

            this.lastRound(this._solvedCells > 0);
        }

    }



    getValues(): number[][] {

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
            cell.getValues().forEach(
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

}

