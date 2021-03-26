import { GameCell } from "../game-types/game-cell";

export class GameCellSolitaire extends GameCell {

    public solveWithValue(value: number): void {
        this.setValue(value);
    }

    public static EMPTY_CELL = 0;
    public static PEG_CELL = 1;

    public static INVALID_CELL = 9;

    public clone(): GameCell {
        const other: GameCellSolitaire = new GameCellSolitaire();
        other.copyFrom(this);
        return other;    
    }

    public getValueAsString(): string {
        if(this.value===GameCellSolitaire.PEG_CELL)
            return "O";
        if(this.value===GameCellSolitaire.INVALID_CELL)
            return "X";
        return ' ';

    }

}