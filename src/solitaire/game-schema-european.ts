import { GameConfig } from "../game-types/game-config";
import { GameCellSolitaire } from "./game-cell";
import { GameSchemaSolitaire } from "./game-schema";


// tslint:disable-next-line: max-classes-per-file
export class GameSchemaSolitaireEuropean extends GameSchemaSolitaire {

    constructor(gameConfig: GameConfig) {
        super(7, 7, gameConfig);
        this.rowNumber = 7;
        this.colNumber = 7;
        this.middleRow = 3;
        this.middleCol = 3;

    }

    public initDemoCells(): void {

        this.demoCellValues = [
                [9, 9, 1, 0, 1, 9, 9],
                [9, 1, 1, 1, 1, 1, 9],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1],
                [9, 1, 1, 1, 1, 1, 9],
                [9, 9, 1, 1, 1, 9, 9]];
    }

    public setOrigCellValues(): void {

        const cellValues:number[][] = [
            [9, 9, 1, 0, 1, 9, 9],
            [9, 1, 1, 1, 1, 1, 9],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [9, 1, 1, 1, 1, 1, 9],
            [9, 9, 1, 1, 1, 9, 9]];
        

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

                if( ((r===0 || r===6) && (c===0 || c === 1 || c===5 || c === 6)) ||
                    ((r===1 || r===5) && (c===0 || c === 6)))
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