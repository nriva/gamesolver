import { GameCellTicTacToe } from "./game-cell";
export class GameMoveMakerTiocTacToe {
    findMoves(cellValues, conditions) {
        const moves = [];
        if (conditions != null) {
            if (typeof conditions.player !== "undefined") {
                for (let r = 0; r < cellValues.length; r++)
                    for (let c = 0; c < cellValues[r].length; c++) {
                        if (cellValues[r][c] === GameCellTicTacToe.EMPTY_CELL) {
                            const move = [];
                            move.push(r);
                            move.push(c);
                            move.push(conditions.player);
                            moves.push([move]);
                        }
                    }
            }
        }
        return moves;
    }
    findAllMoves(cellValues) {
        throw new Error("Method not implemented.");
    }
    executeMove(cellValues, move) {
        const cell = move[0];
        cellValues[cell[0]][cell[1]] = cell[2];
        return true;
    }
    undoMove(cellValues, move) {
        const cell = move[0];
        cellValues[cell[0]][cell[1]] = GameCellTicTacToe.EMPTY_CELL;
    }
}
//# sourceMappingURL=game-move-maker.js.map