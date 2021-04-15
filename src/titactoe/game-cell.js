import { GameCell } from "../game-types/game-cell";
export class GameCellTicTacToe extends GameCell {
    clone() {
        const cell = new GameCellTicTacToe();
        cell.setValue(this.value);
        return cell;
    }
    solveWithValue(value) {
        this.value = value;
    }
    getValueAsString() {
        return this.value === GameCellTicTacToe.PLAYER1_CELL ?
            GameCellTicTacToe.PLAYER1_CELL_STRING :
            GameCellTicTacToe.PLAYER2_CELL_STRING;
    }
}
GameCellTicTacToe.EMPTY_CELL = 0;
GameCellTicTacToe.PLAYER1_CELL = 1;
GameCellTicTacToe.PLAYER2_CELL = 2;
GameCellTicTacToe.PLAYER1_CELL_STRING = "X";
GameCellTicTacToe.PLAYER2_CELL_STRING = "O";
//# sourceMappingURL=game-cell.js.map