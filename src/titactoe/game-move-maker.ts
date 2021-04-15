import { GameMoveMaker } from "../game-types/game-move-maker";
import { GameCellTicTacToe } from "./game-cell";

export class GameMoveMakerTiocTacToe implements GameMoveMaker {

    findMoves(cellValues: number[][], conditions:any): number[][][] {
        
        const moves: number[][][] = [];

        if(conditions!=null) {
            if(typeof conditions.player !== "undefined") {
                for(let r=0;r<cellValues.length;r++)
                    for(let c=0;c<cellValues[r].length;c++) {
                        if(cellValues[r][c] === GameCellTicTacToe.EMPTY_CELL) {
                            const move:number[] = [];
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
    findAllMoves(cellValues: number[][]): number[][][] {
        throw new Error("Method not implemented.");
    }
    executeMove(cellValues: number[][], move: number[][]): boolean {
        const cell = move[0];
        cellValues[cell[0]][cell[1]] = cell[2];
        return true;
    }

    undoMove(cellValues: number[][], move: number[][]): void {
        const cell = move[0];
        cellValues[cell[0]][cell[1]] = GameCellTicTacToe.EMPTY_CELL;
    }
    
}