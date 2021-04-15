import { GameConfig } from "../game-types/game-config";
import { GameSchema } from "../game-types/game-schema";
import { GameCellTicTacToe } from "./game-cell";

export class GameSchemaTicTacToe extends GameSchema<GameCellTicTacToe> {

    constructor(gameConfig: GameConfig) {
        super(3, 3, gameConfig);
    }

    public setOrigCellValues(): void {

    }
    public createCells(): GameCellTicTacToe[][] {

        const cells: GameCellTicTacToe[][] = [];
        for(let r=0;r<this.rowNumber;r++) {
            const row: GameCellTicTacToe[] = [];
            for(let c=0;c<this.colNumber;c++) {
                const cell = new GameCellTicTacToe();
                row.push(cell);
            }
            cells.push(row);
        }
        return cells;
    }

    public initDemoCells(): void {


    }

    public fromJSON(contents: string | ArrayBuffer): boolean {
        let data:any = null;
        if(typeof contents==="string")
            data = JSON.parse(contents);
        if(data==null)
            return false;

        this.setValues(data.values);
        return true;

    }
    public toJSON(): string {
        const data = { values: this.getValues() };
        return JSON.stringify(data);
    }

}