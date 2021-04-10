import { GameConfig } from "../game-types/game-config";
import { GameCellSolitaire } from "./game-cell";
import { GameSchemaSolitaire } from "./game-schema";

export enum EnglishIntialDisposition {
    FULL,
    CROSS,
    PLUS
}


// tslint:disable-next-line: max-classes-per-file
export class GameSchemaSolitaireEnglish extends GameSchemaSolitaire {

    constructor(gameConfig: GameConfig) {
        super(7, 7, gameConfig);
        this.rowNumber = 7;
        this.colNumber = 7;
        this.middleRow = 3;
        this.middleCol = 3;

    }


    public initDemoCells(): void {

        this.demoCellValues = [
            [9, 9, 1, 1, 1, 9, 9],
            [9, 9, 1, 1, 1, 9, 9],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [9, 9, 1, 1, 1, 9, 9],
            [9, 9, 1, 1, 1, 9, 9]];
    }

    public setOrigCellValues(): void {

        let cellValues:number[][];

        if(this.gameConfig.initialDisposition === EnglishIntialDisposition.CROSS) {
            cellValues = [
                [9, 9, 0, 0, 0, 9, 9],
                [9, 9, 0, 1, 0, 9, 9],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [9, 9, 0, 0, 0, 9, 9],
                [9, 9, 0, 0, 0, 9, 9]];
        } else if(this.gameConfig.initialDisposition === EnglishIntialDisposition.PLUS) {
            cellValues = [
                [9, 9, 0, 0, 0, 9, 9],
                [9, 9, 0, 1, 0, 9, 9],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [9, 9, 0, 1, 0, 9, 9],
                [9, 9, 0, 0, 0, 9, 9]];
        } else {
            cellValues = [
                [9, 9, 1, 1, 1, 9, 9],
                [9, 9, 1, 1, 1, 9, 9],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1],
                [9, 9, 1, 1, 1, 9, 9],
                [9, 9, 1, 1, 1, 9, 9]];
        }


        for(let r=0;r<this.rowNumber;r++)
            for(let c=0;c<this.rowNumber;c++)
                this.origCellValues[r][c] = cellValues[r][c];

    }


    public createCells(): GameCellSolitaire[][] {
        
        let cells: GameCellSolitaire[][] = Array();
        for(let r=0;r<this.rowNumber;r++) {
            cells.push([]);
            for(let c=0;c<this.colNumber;c++) {
                const cell = new GameCellSolitaire();

                if(r<2 && c<2 || r>4 && c<2 || r<2 && c>4 || r>4 && c>4)
                    cell.initValue(GameCellSolitaire.INVALID_CELL);
                else if(r=== this.middleRow && c=== this.middleCol)
                    cell.initValue(GameCellSolitaire.EMPTY_CELL);
                else
                    cell.initValue(GameCellSolitaire.PEG_CELL);
                cells[r].push(cell);
            }
        }
        return cells;
    }    


}