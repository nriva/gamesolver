import { GameSchema } from "../game-types/game-schema";
import { GameCellTicTacToe } from "./game-cell";
export class GameSchemaTicTacToe extends GameSchema {
    constructor(gameConfig) {
        super(3, 3, gameConfig);
    }
    setOrigCellValues() {
    }
    createCells() {
        const cells = [];
        for (let r = 0; r < this.rowNumber; r++) {
            const row = [];
            for (let c = 0; c < this.colNumber; c++) {
                const cell = new GameCellTicTacToe();
                row.push(cell);
            }
            cells.push(row);
        }
        return cells;
    }
    initDemoCells() {
    }
    fromJSON(contents) {
        throw new Error("Method not implemented.");
    }
    toJSON() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=game-schema.js.map