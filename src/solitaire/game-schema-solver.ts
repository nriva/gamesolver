import { DeepSolverMatrix } from "../game-types/deep-solve";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { GameCellSolitaire } from "./game-cell";
import { GameSchemaSolitaire } from "./game-schema";

/*
export class GameSchemaSolverSolitaire extends GameSchemaSolver<GameCellSolitaire, GameSchemaSolitaire> {
    public step(schema: GameSchemaSolitaire): void {
        this.stopped = true;
        this.solving = false;
    }

    
    public findMoves(cellValues:number[][],r:number,c:number):number[][][] {
        const moves:number[][][] = [];
        let value;

        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4

        // 1:
        if(r>=1) {
            value = cellValues[r-1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r>=2) {
                    value = cellValues[r-2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r-1,c],[r-2,c]]);
                    }
                }
            }
        }

        // 2:
        if(c>=1) {
            value = cellValues[r][c-1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c>=2) {
                    value = cellValues[r][c-2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c-1],[r,c-2]]);
                    }
                }
            }
        }

        // 3:
        if(c<=5) {
            value = cellValues[r][c+1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c<=4) {
                    value = cellValues[r][c+2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c+1],[r,c+2]]);
                    }
                }
            }
        }

        // 4:
        if(r<=5) {
            value = cellValues[r+1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r<=4) {
                    value = cellValues[r+2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r+1,c],[r+2,c]]);
                    }
                }
            }
        }

        return moves;
    }

    public findAllMoves(cellValues:number[][]):{pegs:number,moves:number[][][]} {
        let allMoves: number[][][] = [];
        let pegNum = 0;
        for(let r=0;r<7;r++)
            for(let c=0;c<7;c++)
                if(cellValues[r][c] === GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, r,c);
                    if(moves.length>0)
                        allMoves = allMoves.concat(moves);

                }
        return {'pegs': pegNum, 'moves':allMoves};
    }

    public executeMove(cellValues:number[][], move: number[][]) {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.PEG_CELL;


    }

    public undoMove(cellValues:number[][], move: number[][]):void {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.EMPTY_CELL;
    }
    

} */

export class GameMoveMakerSolitaire {

    public static findMoves(cellValues:number[][],r:number,c:number):number[][][] {
        const moves:number[][][] = [];
        let value;

        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4

        // 1:
        if(r>=1) {
            value = cellValues[r-1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r>=2) {
                    value = cellValues[r-2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r-1,c],[r-2,c]]);
                    }
                }
            }
        }

        // 2:
        if(c>=1) {
            value = cellValues[r][c-1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c>=2) {
                    value = cellValues[r][c-2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c-1],[r,c-2]]);
                    }
                }
            }
        }

        // 3:
        if(c<=5) {
            value = cellValues[r][c+1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c<=4) {
                    value = cellValues[r][c+2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c+1],[r,c+2]]);
                    }
                }
            }
        }

        // 4:
        if(r<=5) {
            value = cellValues[r+1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r<=4) {
                    value = cellValues[r+2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r+1,c],[r+2,c]]);
                    }
                }
            }
        }

        return moves;
    }

    public static findAllMoves(cellValues:number[][]):{pegs:number,moves:number[][][]} {
        let allMoves: number[][][] = [];
        let pegNum = 0;
        for(let r=0;r<7;r++)
            for(let c=0;c<7;c++)
                if(cellValues[r][c] === GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, r,c);
                    if(moves.length>0)
                        allMoves = allMoves.concat(moves);

                }
        return {'pegs': pegNum, 'moves':allMoves};
    }

    public static executeMove(cellValues:number[][], move: number[][]) {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.PEG_CELL;


    }

    public static undoMove(cellValues:number[][], move: number[][]):void {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.EMPTY_CELL;
    }     


}

// tslint:disable-next-line: max-classes-per-file
export class DeepSolverMatrixSolitaire extends DeepSolverMatrix {

    // private solver: GameSchemaSolverSolitaire = new GameSchemaSolverSolitaire();

    private solvingMoves:number[][][] = [];

    private ctx:any;

    constructor(matrix: number[][], ctx:any) {
        super(matrix);
        this.ctx = ctx;
    }

    public getSolvingMoves(): number[][][] {
        return this.solvingMoves;
    }

    public hasIsolatedPegs(cellValues:number[][]): boolean {
        let ok = true;
        for(let r=0;r<7 && ok;r++)
            for(let c=0;c<7 && ok;c++)
                if(cellValues[r][c]===GameCellSolitaire.PEG_CELL) {
                    if(r>0)
                        ok = ok && cellValues[r-1][c]!==GameCellSolitaire.EMPTY_CELL;
                    if(c>0)
                        ok = ok && cellValues[r][c-1]!==GameCellSolitaire.EMPTY_CELL;
                    if(r<6)
                        ok = ok && cellValues[r+1][c]!==GameCellSolitaire.EMPTY_CELL;
                    if(c<6)
                        ok = ok && cellValues[r][c+1]!==GameCellSolitaire.EMPTY_CELL;
                }
        return ok;
    }




    public deepSolve(row: number, col: number): boolean {

        // pruning
        if(this.hasIsolatedPegs(this.matrix))
            return false;

        const allMoves = GameMoveMakerSolitaire.findAllMoves(this.matrix);
        if(allMoves.pegs===1)
            return true;

        const moves = allMoves.moves;

        for(let m=0;m<moves.length;m++) {
            GameMoveMakerSolitaire.executeMove(this.matrix, moves[m]);
            const from = moves[m][0];
            const middle = moves[m][1];
            const to = moves[m][2];
            /*
            this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
            this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
            this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
            */
            if(this.deepSolve(to[0],to[1])) {
                
                //this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                //this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                //this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
                this.solvingMoves.push(moves[m]);
                return true;
            } else {
                GameMoveMakerSolitaire.undoMove(this.matrix, moves[m]);
                /*
                this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.PEG_CELL }});
                this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.PEG_CELL }});
                this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                */
    
            }
        }

        return false;

    }
}