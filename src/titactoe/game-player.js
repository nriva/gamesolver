import { GamePlayer, PlayerKind } from "../game-types/game-player-manager";
import { GameMoveMakerTiocTacToe } from "./game-move-maker";
// tslint:disable-next-line: max-classes-per-file
export class GamePlayerHuman extends GamePlayer {
    constructor(name, index) {
        super(name, index, PlayerKind.HUMAN);
    }
    makeMove(schemaManager) {
        return;
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}
// tslint:disable-next-line: max-classes-per-file
export class GamePlayerCPURandom extends GamePlayer {
    constructor(name, index) {
        super(name, index, PlayerKind.CPU);
        this.moveMaker = new GameMoveMakerTiocTacToe();
    }
    makeMove(schemaManager) {
        console.log("Making move " + this.name);
        const schema = schemaManager.getSchema();
        const values = schema.getValues();
        const moves = this.moveMaker.findMoves(values, { player: this.index + 1 });
        let i = 0;
        if (moves.length > 1) {
            i = getRandomIntInclusive(0, moves.length - 1);
        }
        this.moveMaker.executeMove(values, moves[i]);
        schema.setValues(values);
        this.makingMove = false;
    }
}
//# sourceMappingURL=game-player.js.map