//import $ from 'jquery';

import { GameSchema } from '../game-types/game-schema';
import { GameCellSudoku } from './game-cell'


/**
 * The container of the cell, with a few utilities
 */
export class GameSchemaSudoku extends GameSchema<GameCellSudoku> {

    // public canGenerate(): boolean { return true; }

    public fromJSON(contents: string | ArrayBuffer): boolean {

        let data:any = null;
        if(typeof contents==="string")
            data = JSON.parse(contents);
        if(data==null)
            return false;

        let loaded: boolean = false;
        const values = data.values;
        if(values!=null) {
            this.initCellsValue( values );
            loaded = true;
        }

        const valueSets = data.valueSets;
        if(valueSets!=null) {
            this.initCellsValueSets( valueSets );
            loaded = true;
        }
        return loaded;
    }

    setOrigCells(row: number, col: number, value: number) {
        this.origCellValues[row][col] = value;
    }
    

    copyFrom(other: GameSchemaSudoku) {


        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.cells[i][j].copyFrom(other.cells[i][j]);
            }
        }

    }


    public toJSON() : string {
        const data = {values: this.getValues(),
            valueSets: this.getValueSets() };

        return JSON.stringify(data);
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

    // celle valorizzate nel processo di input
    private inputCells: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];




    // Celle prima dell'inizio della soluzione
    /*
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
    ];*/

    //private solver: GameSchemaSolverSudoku = new GameSchemaSolverSudoku();


    constructor(demo: boolean = false) {

        super(9,9, demo);
    }


    public initDemoCells(): void {
        this.demoCellValues = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
    }

    /*
    public getCell(row:number, col:number): GameCellSudoku {
        return this.cells[row][col];
    }
    */

    public getCellValue(row:number, col:number) : number {
        return this.cells[row][col].getValue();
    }

    public getCellValueSet(row:number, col:number) : number[] {
        return this.cells[row][col].getValueSet();
    }


    /*
    public initCellsValue(values: number[][]) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.cells[r][c].initValue(values[r][c]);
            }
        }
    }
    */

    initCellsValueSets(valueSets: number[][][]) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.cells[r][c].setNewValueSet(valueSets[r][c], true);
            }
        }

    }

    /*
    protected initCells(origCells: number[][]): void {
        this.cells = this.createCells();
        this.initCellsValue(origCells);
    }
    */

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





    /*
    public resetCells() {
        //this.round = 0;
        this.cells = this.createCells();
        //this.stopped = false;
    }
    */

    /*
    public resetCellsToOrig() {
        //this.round = 0;
        this.initCellsValue(this.origCellValues);
        //this.stopped = false;
    }
    */


    public getValueSets(): number[][][] {

        const values: number[][][] = Array(9);
        for (let i = 0; i < 9; i++) {
            values[i] = Array(9);
            for (let j = 0; j < 9; j++) {
                values[i][j] = Object.assign([], this.cells[i][j].getValueSet());
            }
        }
        return values;
    }




    /*
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
    */




    /*
    public initialize(): void {
        throw new Error('Method not implemented.');
    }
    */

    /*
    public clone(): GameSchemaSudoku {

        const schema = new GameSchemaSudoku();

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {

                schema.cells[row][col] = this.cells[row][col].clone() as GameCellSudoku;
            }
        }
        return schema;
    }
    */

    prepareForStep() {


        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.cells[i][j].highlight(false);
            }
        }
    }


}

