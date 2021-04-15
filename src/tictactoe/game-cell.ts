import { GameCell } from "../game-types/game-cell";

export class GameCellTicTacToe extends GameCell {

    public static EMPTY_CELL = 0;
    public static PLAYER1_CELL = 1;
    public static PLAYER2_CELL = 2;

    public static PLAYER1_CELL_STRING = "X";
    public static PLAYER2_CELL_STRING = "O";


    public clone(): GameCell {
        const cell = new GameCellTicTacToe();
        cell.setValue(this.value);
        return cell;
    }
    public solveWithValue(value: number): void {
        this.value = value;
    }


    public getValueAsString(): string {
        return this.value=== GameCellTicTacToe.PLAYER1_CELL?
                                GameCellTicTacToe.PLAYER1_CELL_STRING:
                                GameCellTicTacToe.PLAYER2_CELL_STRING;
    }
}