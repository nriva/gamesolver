import { DeepSolverMatrix } from "../game-types/deep-solve";
import { GameCellTicTacToe } from "./game-cell";
import { GameMoveMakerTiocTacToe } from "./game-move-maker";
import { ChekResultTictacToe, GameSchemaCheckerTicTacToe } from "./game-schema-checker";

export class DeepSolverMatrixTicTacToe extends DeepSolverMatrix {

    private solvingMoves:number[][][] = [];

    public getSolvingMoves(): number[][][] {
        return this.solvingMoves;
    }

    private moveMaker = new GameMoveMakerTiocTacToe();

    private checker = new GameSchemaCheckerTicTacToe();

    private targetPlayerIndex = -1;

    private scores = new Map<string,number>();

    public deepSolve(level: number, row: number, col: number, ...params:any[]): boolean {
        const solved = this._deepSolve(this.matrix,  level, row, col, params);
        let maxValue = 0;
        // if(solved) {
            this.scores.forEach(
                (v) => {if(v>maxValue) maxValue = v}
            )
            this.scores.forEach(
                (v, k) => { if(v===maxValue) this.solvingMoves.push(JSON.parse(k)) }
            )
        // }

        return true /* solved */;

    }

    private cloneMatrix(orig: number[][]): number[][] {
        const clone:number[][]  = [];

        for(let r=0;r<orig.length;r++) {
            const row = []
            for(let c=0;c<orig[r].length;c++) {
                row.push(orig[r][c]);
            }
            clone.push(row);
        }

        return clone;
    }

    public _deepSolve(cells: number[][], level: number, row: number, col: number, ...params:any[]): boolean {

        let playerIndex = -1;
        if(level === 0 && params.length>0 && this.targetPlayerIndex===-1) {
            this.targetPlayerIndex = Number(params[0]);
            playerIndex = this.targetPlayerIndex;
        }

        if(level > 0 && params.length>0) {
            playerIndex = Number(params[0]);
        }

        let topLevelMove:number[][] = [];

        if(level > 0 && params.length>1) {
            topLevelMove = params[1];
        }

        const result = this.checker.checkMatrix(cells);
        if(level>0) {
            if((result.status === ChekResultTictacToe.RESULT_WIN_PLAYER1 && this.targetPlayerIndex===1)
                ||
            (result.status === ChekResultTictacToe.RESULT_WIN_PLAYER2 && this.targetPlayerIndex===2)) {
                this.setScore(topLevelMove, 2);
                return true;
            }
            if(result.status === ChekResultTictacToe.RESULT_WIN_PLAYER1 && this.targetPlayerIndex===2)
                return false;
            if(result.status === ChekResultTictacToe.RESULT_WIN_PLAYER2 && this.targetPlayerIndex===1)
                return false;
            if(result.status === ChekResultTictacToe.RESULT_DRAW) {
                this.setScore(topLevelMove, 1);
                return false;
            }
        } else {
            if((result.status === ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER1 && this.targetPlayerIndex===1)
                ||
            (result.status === ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER2 && this.targetPlayerIndex===2)) {
                // I am about to win!
                const _move = this.checker.getMoveToWin();
                if(_move.length>0)
                    this.setScore(_move, Number.MAX_SAFE_INTEGER);
                return true;
            }
            if((result.status === ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER1 && this.targetPlayerIndex===2)
                ||
                (result.status === ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER2 && this.targetPlayerIndex===1)) {
                // I am about to lose!
                const _move = this.checker.getMoveToWin();
                
                if(_move.length>0) {
                    const p = _move[0][2] === GameCellTicTacToe.PLAYER1_CELL? GameCellTicTacToe.PLAYER2_CELL: GameCellTicTacToe.PLAYER1_CELL;
                    _move[0][2] = p;
                    this.setScore(_move, Number.MAX_SAFE_INTEGER);
                }
                return false;
                }
        }

        const moves = this.moveMaker.findMoves(cells, {player:playerIndex});

        if(playerIndex=== 1)
            playerIndex = 2;
        else
            playerIndex = 1;

        for(let m=0; m<moves.length; m++) {
            if(this.moveMaker.executeMove(cells, moves[m])) {
                // if(this._deepSolve(level+1, row, col, playerIndex)) {
                   /*if(level===0)
                        this.solvingMoves.push(moves[m]);*/
                    // return true;
                    const newCells = this.cloneMatrix(cells);
                    if(level===0)
                        this._deepSolve(newCells, level+1, row, col, playerIndex, moves[m]);
                    else
                        this._deepSolve(newCells, level+1, row, col, playerIndex, topLevelMove);
                // }
            }
        }

        return false;


    }
    

    private setScore(topLevelMove: number[][], value:number) {
        const m = JSON.stringify(topLevelMove);
        let v = value;
        if (this.scores.has(m)) {
            const x = this.scores.get(m);
            if (typeof x !== "undefined")
                if(x<Number.MAX_SAFE_INTEGER)
                    v = x + value;
                else
                    v = x;
        }
        this.scores.set(m, v);
    }
}